var Disqus = require('disqus'),
    Slack = require('node-slack');

var Matterqus = function(config) {
  this.config = config;
  this.forums = config.disqus.forums.split(',');
  this.mattermost = new Slack(config.mattermost.webhook);
  this.disqus = new Disqus(config.disqus.authentication);
  this.lastChecked = new Date();
};

Matterqus.prototype.start = function() {
  var milliseconds = this.config.interval * 1000;
  this.interval = setInterval(this.checkAll.bind(this), milliseconds);
  this.checkAll();
};

Matterqus.prototype.stop = function() {
  clearInterval(this.interval);
};

Matterqus.prototype.checkAll = function() {
  this.forums.forEach(this.checkForum, this);
};

Matterqus.prototype.checkForum = function(forum) {
  var options = this.config.disqus.options || {};
  options.limit = this.config.disqus.limit;
  options.forum = forum;
  options.related = 'thread';

  var callback = this.checkComments.bind(this, forum);
  this.disqus.request('posts/list', options, callback);
};

Matterqus.prototype.checkComments = function(forum, data) {
  var response;

  if (data.error) {
    response = JSON.parse(data.error.body).response;
    return console.log('[' + forum + '] Something went wrong: ' + response);
  }
  else {
    response = JSON.parse(data).response;
  }

  if (!response.length) {
    return console.log('[' + forum + '] No comments found.');
  }

  // The creation time of the most recent comment.
  var lastCommentTime;

  var i;
  for (i = 0; i < response.length; i++) {
    var commentTime = new Date(response[i].createdAt);

    if (commentTime > this.lastChecked) {
      var message = this.buildMessage(response[i]);

      this.sendMessage(message, forum);

      if (!lastCommentTime) {
        lastCommentTime = commentTime;
      }
    }
  }

  if (lastCommentTime) {
    this.lastChecked = lastCommentTime;
  }
};

Matterqus.prototype.buildMessage = function(comment) {
  var url = comment.thread.link + '#comment-' + comment.id;

  var message = comment.author.name + ' posted <'+ url +'|a new comment> ' +
                'on <' + comment.thread.link + '|' + comment.thread.title + '>:' +
                '\n' + comment.raw_message;

  return message;
};

Matterqus.prototype.sendMessage = function(message, forum) {
  var options = this.config.mattermost.options || {};
  options.text = message;

  if (this.config.mattermost.mention) {
    options.link_names = 1;
    options.text = '@' + this.config.mattermost.mention.split(',').join(' @') + ' ' + options.text;
  }

  this.mattermost.send(options, function(error) {
    if (error) {
      return console.log('[' + forum + '] Something went wrong: ' + error);
    }

    console.log('[' + forum + '] New Disqus comment! Message sent to Mattermost.');
  });
};

module.exports = Matterqus;
