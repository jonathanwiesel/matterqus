var config = module.exports = {};
config.disqus = {};
config.mattermost = {};

// Number of seconds between each check (optional, default 60).
config.interval = process.env.MATTERQUS_INTERVAL;

// The number of recent comments to check (optional, default 25, max 100).
config.disqus.limit = process.env.MATTERQUS_DISQUS_LIMIT;

// Disqus forum to check, specified by its shortname (required).
// To check multiple forums, enter their shortnames separated by comma.
config.disqus.forums = process.env.MATTERQUS_DISQUS_FORUM;

// Disqus authentication (required).
config.disqus.authentication = {
  api_secret: process.env.MATTERQUS_DISQUS_API_SECRET,
  api_key: process.env.MATTERQUS_DISQUS_API_KEY,
  access_token: process.env.MATTERQUS_DISQUS_ACCESS_TOKEN,
};

// URL of your Mattermost Incoming WebHook (required).
config.mattermost.webhook = process.env.MATTERQUS_MATTERMOST_WEBHOOK;

// Users to mention in Mattermost channel when notification arrives, comma separated.
config.mattermost.mention = process.env.MATTERQUS_MATTERMOST_MENTION;

// Additional options for messages posted to Mattermost (optional).
// Overrides the webhook's settings, see Setup Instructions for your webhook.
config.slack.options = {
  // mattermost examples:
  // username: 'Santa Claus',
  // icon_emoji: ':santa:',
  // icon_url: 'http://northpole.com/santa.jpg',
  // channel: '#workshop',
  // channel: '@helper',
  // attachments: [ ... ],
};

// Additional options for API requests to Disqus (optional).
// See https://disqus.com/api/docs/posts/list/.
config.disqus.options = {};
