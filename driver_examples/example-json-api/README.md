# JSON API example on Membrane

Example of a Membrane program that serves a simple REST JSON API that can store arbitrary objects on any path.

## How to use

[Install directly from VSCode](vscode://membrane.membrane/directory/example-json-api) (requires Membrane Extension) or clone this repo in your Membrane workspace.

Then you can use `curl` to store and retrieve some data

```
# Store some data
curl https://<program-url.hook.membrane.io>/contact/1 --data 'first=john&last=doe'
curl https://<program-url.hook.membrane.io>/contact/2 --json '{ "first": "jane", "last": "doe" }'

# Then retrieve it as JSON
curl https://<program-url.hook.membrane.io>/contact/1'
{"first":"john","last":"doe"}

# You can also delete any previously set path
curl https://<program-url.hook.membrane.io>/contact/1 -XDELETE
```

## Related

- [HTMX example](https://github.com/juancampa/membrane-example-htmx): HTMX-based example which doesn't refresh the entire page.
- [HTML example](https://github.com/juancampa/membrane-example-html): Basic HTML example
