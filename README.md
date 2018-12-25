# Address Book App

#### Avaliable features:
    
  * List of all address book entries, sorted by name
  * Filtering the entries
  * Creating a new entry
  * Modifying an entry
  * Deleting an entry
    
## Instructions

 `npm install` to install the dependencies

 `npm start` to start app on the development server http://localhost:8080/

 `npm run build` to create the production build

### Assignment questions and answers
---



#### How you think you succeeded in the assignment?

#### Which parts went well and which parts could use improvement?

While creating the application I tried to keep the code structure simple and clear.

To bundle my project I choose webpack with custom configuration (it is a bit more transparent way than to use for example create-react-app).

I chose folder-by-feature project structure, so that all related to current component files are in the same folder.

I added linters (eslint and stylelint) to keep a uniform coding style.

There are two basic components for my address book - Sidebar for the contacts list with filter and Main for the form to add, modify, delete items.

All project data is stored in the redux state, which contains just two properties: a list of contacts and the current contact being processed. The "current" object will have an integer id if it is an existing item or fractional id if it is a new item.

I added prop-types checking to be sure the components received expected props and wrote a couple of tests for each component. For testing I use jest and enzyme.


Which parts of the app could use improvement? The UI design can be improved, also favicon can be added. I think if this app goes live then it would need SEO handling.

Then also I added a very basic form validation here. The phone and address validation can be more specific if app runs for certain country. There can be also some other fields, e.g zip code.
Also there could be better notification system, for example with flash messages after every user action.

#### If we would be dealing with a larger codebase, which things would you change?

Of course, if it was a real application it would use some API and data would be stored in the database.

This way I would not stored all data in redux, but only the data I got from the server so far.

Also, large contact list means I would need to add some pagination or rather an infinite scroll, getting data by chunks from the server.

The filtering process would be changed too. To consider all existing contacts while filtering, there should be done a request to the server each time the user put the letter on the filter box and the data should be return also "by page"