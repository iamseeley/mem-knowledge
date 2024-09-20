# Notion Driver

This [driver](https://membrane.io) lets you interact with the Notion.so API through your Membrane graph.

To setup Notion driver follow these steps:

1: Create an [integration](https://www.notion.com/my-integrations)

2: Get the [Internal Integration Token](https://www.notion.so/my-integrations)

3: Share a [database with your integration](https://developers.notion.com/docs/create-a-notion-integration#step-2-share-a-database-with-your-integration)
Capabilities

# Schema

### Types
```javascript
<Root>
    - Fields
        blocks -> Ref <BlocksCollection>
        databases -> Ref <DatabasesCollection>
        users -> Ref <UsersCollection>
        pages -> Ref <PagesCollection>
    - Actions
        configure -> Void
<BlocksCollection>
    - Fields
        one(id) -> Ref <Block>
<DatabasesCollection>
    - Fields
        one(id) -> Ref <Database>
<UsersCollection>
    - Fields
        one(id) -> Ref <User>
<PagesCollection>
    - Fields
        one(id) -> Ref <Page>
<Block>
    - Fields
        id -> String
        created_time -> String
        has_children -> Boolean
        last_edit_time -> String
        object -> String
        paragraph -> String
        type -> String
<Database>
    - Fields
        id -> String
        created_time -> String
        last_edited_time -> String
        object -> String
        title -> String
        properties -> String
<User>
    - Fields
        id -> String
        name -> String
        avatar_url -> String
        type -> String
        object -> String
        person -> String
<Page>
    - Fields
        id -> String
        created_time -> String
        last_edited_time -> String
        object -> String
        properties -> String
        parent -> String
        archived -> Boolean
```
