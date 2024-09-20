# Membrane Feed Generator

The Membrane Feed Generator is a program that enables easy creation and management of RSS feeds. This module provides actions to configure feeds, add items, categories, and contributors, and generate RSS feeds.

## How to use

Paste the following URL into your browser to open the directory using the Membrane VSCode Extension.

vscode://membrane.membrane/directory/membrane-program-rss

Install the npm dependencies
```bash
npm install membrane feed
```

Run `:configure` to configure the feed generator. This will create a new feed with the given name and options. If a feed with the given name already exists, it will be overwritten.

example data for `:configure`
```javascript
{
    feed: "myFeed",
    feedOptions: {
      title: "My Awesome Feed",
      description: "This is an example RSS feed",
      link: "https://example.com",
    }
}
```

### Serving Feeds

To serve feeds, you can use the program endpoint url. The endpoint responds to different paths:

`https://{EndpointUrl}/:` Returns a JSON object with a list of available feed names.
`https://{EndpointUrl}/<feedName>:` Returns the generated RSS feed in XML format.




