# Stay up to date with Github to Slack

This is a Membrane program that integrates with GitHub's Webhook feature to send a message to a Slack channel whenever a commit is made to a specific GitHub repository.

## Requirements

Create a new [Slack Webhook URL](https://api.slack.com/messaging/webhooks)

Copy the Webhook URL: Once the channel is selected, Slack will generate a unique Webhook URL for you. Copy this URL to your clipboard.

Run `:configure` with the following arguments:

`slackUrl`: Paste the slack Webhook URL you copied earlier.
`repo`: The GitHub repository you want to track. For example, `user/example-github`.

## How to use

Paste the following URL in your browser to open the directory inside the Membrane VSCode Extension.

vscode://membrane.membrane/directory/example-github-slack-tracker