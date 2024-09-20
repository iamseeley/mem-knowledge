# Update Cargo.toml Version in a repository

This is a Membrane program that updates the version in a Cargo.toml file in a GitHub repository and creates a commit with the changes.

## How to use

Paste the following URL in your browser to open the directory inside the Membrane VSCode Extension.

vscode://membrane.membrane/directory/example-update-cargo-version

Run `:configure` with the following arguments: 

`repository`: The GitHub repository you want to update. For example, `user/example-github`.

example usage:

```bash
curl -X POST -d "version=1.2.3" https://{PROGRAM_ENDPOINT_URL}/update
```
