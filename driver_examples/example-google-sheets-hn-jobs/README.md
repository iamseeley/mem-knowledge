# Watch HN jobs with Google Sheets

This is a simple example of how to use the Membrane Google Sheets Driver to watch Hacker News for new jobs and add them to a Google Sheet.

## How to use

Paste the following URL into your browser to open the directory using the Membrane VSCode Extension.

vscode://membrane.membrane/directory/example-google-sheets-hn-jobs

Run `:configure` and add the keywords you want to watch for.

Edit the memconfig.json file and add your Google Sheets API key and Spreadsheet ID  in the following line:

````json
"sheet": "membrane-driver-google-sheets:spreadsheets.one(id:\"<spreadsheetId>\").sheets.one(sheetId:<sheetId>)",
````