# Stay up to date with Github - Discord tracker

This is a Membrane program that integrates with GitHub's Webhook feature to send a message to a Discord channel whenever a commit is made to a specific GitHub repository.

## Requirements

Create a new Discord Webhook URL by following these steps:
Go to your Discord server settings.
- Click on "Integrations" in the sidebar.
- Click on "Webhooks" and then "Create Webhook."
- Choose the channel where you want the notifications to be sent and customize the name and avatar for the webhook (optional).
- Click on "Copy Webhook URL" to copy the URL to your clipboard.

Run `:configure` with the following arguments:

`DISCORD_WEBHOOK_URL`: Paste the Discord Webhook URL you copied earlier.
`repo`: The GitHub repository you want to track. For example, `user/example-github`.

## How to use

Paste the following URL in your browser to open the directory inside the Membrane VSCode Extension.

vscode://membrane.membrane/directory/example-github-discord-tracker