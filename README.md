# loopback-author-mixin
Mixin that allows to set content author based on the current logged in user.

### Installation

```
npm install loopback-author-mixin --save
```


### Config

Edit `server/model-config.js` file.

```
...
"_meta": {
  "sources": [
    ...
  ],
  "mixins": [
    "loopback/common/mixins",
    "loopback/server/mixins",
    "../common/mixins"          // add this line
  ]
}
...
```

Then edit your `model.json` file (eg. `common/models/article.json`);

```
{
  "name": "Article",
  "base": "PersistedModel",
  "idInjection": true,
  "mixins": {
    "ContentAuthor": true       // add this line; default field
  },
  "properties": { ... },
  "relations": {
    "author": {                 // add relation if necessary
      "type": "belongsTo",
      "model": "User",
      "foreignKey": ""
    }  
}
```
By default `authorId` will be populated with current user ID.

If you want to use different field name, you need to pass options to the mixin:
```
  "mixins": {
    "ContentAuthor": {
      "authorField": "userId"
    }
  },
```  

Now every time that you create new instance of the Article model it will have author field 
populated.

