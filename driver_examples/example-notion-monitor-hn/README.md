# Hacker News Tracker (Notion)

This is a Membrane program that fetches top news stories from an API, filters them based on user-provided keywords, and appends the matching stories to a Notion page.

The program is configured to run every hour to fetch the latest top stories.

## How to use

Paste the following URL in your browser to open the directory inside the Membrane VSCode Extension.

vscode://membrane.membrane/directory/example-notion-monitor-hn

Run `:configure` with the following arguments:

`keywords`: A comma-separated list of keywords to filter the news stories by. For example, `bitcoin,ethereum`.

`notionPageId`: The ID of the Notion page to append the matching stories to. For example, `a1b2c3d4e5f6g7h8i9j0`.