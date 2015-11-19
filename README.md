# matterqus

***

[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

This simple application monitors a Disqus forum (website) and sends a
notification to a Mattermost channel when a new comment is made in said forum.
Can be easily deployed to Heroku.

To configure the application, either edit config.js or set the following
environment variables:

```
MATTERQUS_DISQUS_API_KEY=[your api key]
MATTERQUS_DISQUS_API_SECRET=[your api secret]
MATTERQUS_DISQUS_ACCESS_TOKEN=[your access token]
MATTERQUS_DISQUS_FORUM=[your forum's shortname]
MATTERQUS_MATTERMOST_WEBHOOK=[your incoming webhook's url]
```

It's possible to check for comments on multiple forums simultaneously. To do so,
enter their shortnames as a comma seperated list, for example `cats,stuff`.

Your Disqus API key, secret and access token can be found by creating an
application on https://disqus.com/api/applications/.

Your Disqus forum's shortname can be found on the settings page for your site
(https://disqus.com/admin/, select your site under Settings).

Finally, you need to set up an Incoming WebHook for Mattermost

Optional environment variables:
```
MATTERQUS_INTERVAL=60       		# Seconds between each check (60 by default)
MATTERQUS_DISQUS_LIMIT=25   		# Number of comments to check (25 by default, max 100)
MATTERQUS_MATTERMOST_MENTION=joe 	# Users to mention when notification arrives
```

The server will request every X seconds (`MATTERQUS_INTERVAL`) the Y most recent
comments (`MATTERQUS_DISQUS_LIMIT`) to check for new ones. If your forum may
receive more than 25 new comments in a 60 second window, tweak those two
variables to your liking.

Some more configuration options for Disqus and Mattermost are available in config.js.


***

## Notes

This application was built using:
* [disqus](https://github.com/hay/node-disqus)
* [node-mattermost](https://github.com/jonathanwiesel/node-mattermost)

Based on:
* [slackus](https://github.com/jonathanwiesel/slackus)

***

## License

[http://jonathanwiesel.mit-license.org/](http://jonathanwiesel.mit-license.org/)
