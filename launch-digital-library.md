Let's build a digital library application to help us keep track of the books on our wishlist that we want to read!

## Learning Goals

- **Monolithic structure**. Work with a monolith application to become comfortable with app configuration and folder organization.
- **Database-backed application**. Apply Knex migrations and Objection models with a PostgreSQL database for interacting with data.
- **Validating data**. Understand the importance of defining database and model level validations that are in sync within the application for appropriate error messages.

## Getting Started

From your challenges directory, run the following:

```no-highlight
et get launch-digital-library
cd launch-digital-library
yarn install
```

Next, create your database, then get the app running:

```no-highlight
createdb launch_digital_library_development
yarn run dev
```

You can check `server/src/config/getDatabaseUrl.cjs` to verify that is the correct database name for this application!

Navigating to <http://localhost:3000/books> should display the header `My Book Wishlist`.

## Instructions

This is a multi-part challenge, you should not expect to complete this assignment in one sitting. There will be other lessons you will need to complete in order to gain the knowledge and experience for this challenge.

**Complete each part before moving onto the next!**

Make sure you take a look at the files you are provided with. A couple to highlight:

- `booksRouter.js` has been created and is ready for routes to be added, and `Book.js` has been created with an empty class inside.
- `App.js`, within the folder `client/src/components`, is our top-level React component that displays the current text on the webpage. It includes a React `BrowserRouter`.
- `BooksList.js` includes a fetch call within the `useEffect()` to grab all of the books. For each book, it displays a `BookItem` component.
- `BookItem.js` shows the title and author of a book, and links the user to the show page.
- `BookShow.js` is responsible for displaying all of the book details.
- `BookForm.js` has the new book form, error handling, a custom `handleChange`, and a POST fetch request.

## Core User Stories

Use the user stories and acceptance criteria below to guide you as you build this application. Read through all 3 parts of the user stories to get an idea of how this application will be structured.

- What data types will be used in your migration?
- Which attributes are required or optional?
- What React components will you need to create?
- What routes are needed (front-end and back-end)?

### Part 1: View Your Book Wishlist

```no-highlight
As an avid book reader
I want to see a list of all books
So that I can see which books I want to read
```

Acceptance Criteria:

- I can visit the books index page at `/books`
- On the books index page there is an `h1` header to let me know this is my collection of books, of "My Book Wishlist"
- There should be a list of all book titles retrieved from the database

Implementation Details:

- You should create a `books` table with a required string of `title`, a required string of `author`, a required integer of `pageCount`, an optional string of `description`, and an optional boolean of `fiction`
- You will need to update the provided `Book` Model to have Objection functionality
- Finally, you will need to build an API endpoint for GET requests to "/api/v1/books" which serves up all books in a format that the `BooksList` component can render to the page
- Be sure to account for any errors that occur in your API endpoint!

### Part 2: View a Book

```no-highlight
As an avid book reader
I want to view the details of a book
So that I can learn more about the book
```

Acceptance Criteria:

- On the books index page, the title of each book should be a link to that book's show page at the "/books/:id" path
- A book show page should include its title, author, description, page count, and whether or not it is fiction

Implementation Details:

- You will need to create an API endpoint for GET requests to "/api/v1/book/:id" which responds with a single book's data in a format that the `BookShow` component can render to the page

**Tips:**

- The node REPL console has been configured so you can create sample data through the console (add any classes you create to `server/src/models/index.js` so you have access to them!)

### Part 3: Add New Books

```no-highlight
As an avid book reader
I want to add books to my list
So that I can read more books
```

Acceptance Criteria:

- Navigating to `/books/new` should display a form for creating a new book
- When the form is submitted successfully, I should be redirected to the book's index page and see the new book in my list
- When there are errors persisting, I will stay on my page with the form still filled out (but no errors will appear _yet_)

Implementation Details:

- Your form has been set up to send a POST request to "/api/v1/books" upon submission
- Create the corresponding API endpoint to persist the submitted form data to the database

### Part 4: Model Validation

```no-highlight
As an avid book reader
I want to properly validate my books
So that I can persist valid data in the database
```

Acceptance Criteria:

- If the form submission is unsuccessful, I should stay on the same page with the form, and any model-level errors are visible on the screen

Implementation Details:

- The Book model should include `jsonSchema` validations that mirror the constraints defined in the database schema
  - `title` and `author` are both strings and required
  - `pageCount` must be an integer and required
  - `description` is a string with a minimum length of 20 characters (_optional property_)
  - `fiction` is a boolean value (_optional property_)
- Update your POST API endpoint to handle any validation errors, returning a `422 Unprocessable Entity` error if the validation fails
- In the event of any other errors, return a `500 Internal Server Error`
- Remember to clean your user input using the provided `cleanUserInput` service before attempting to persist!

**Tips:**

- For some attributes, you may consider including additional accepted data types
- Check the [JSON Schema][jsonSchemaGuide] documentation for the validation options that are available
- The service helpers for `cleanUserInput` and `translateServerErrors` have been provided for you to use in order to display error messages

## Non-Core User Stories

### Bonus: Podcasts

Along with books, there are also many great podcasts to listen to! In our app, we should include a section dedicated to podcasts.

```no-highlight
As a podcast enthusiast
I want to see a list of podcasts
So that I know which ones I have already saved
```

Acceptance Criteria:

- Visiting `/podcasts` should display a list of all podcast names from the database
- There is a link at the top of the `Podcasts` page to bring the user to the `Books` index page
- In addition, there is a link at the top of the `Books` index page to bring the user to the `Podcasts` index page

```no-highlight
As a podcast enthusiast
I want to see details of a podcast
So that I pick which podcast to listen to
```

Acceptance Criteria:

- The name of each podcast listed on the podcasts index page is a link to its show page
- The podcast show page should display the podcast name, genre, and URL
- All attributes for a podcast are required - take a look at the [JSON Schema][jsonSchemaGuide] documentation to try out validations! For example, validate that the URL format includes the protocol `https://`

**Tips:**

- What routes will be needed?
- What components will be required?
- Use the node REPL console to create podcasts for sample data on your page

### Bonus: Create Seeders

- Define a seeder for Books to help populate data
- Define another seeder for Podcasts

### Bonus: Add a Uniqueness Validation

- Write a migration to update your `title` column in your `books` table to be unique (do some research on how to alter an existing table!)
- Add a uniqueness model-level validation to your `title` field
- Be sure to have this validation handled in the same way as all other model-level validations!

### Bonus: Cypress Testing

- Write your own Cypress tests for this application
- Within the `e2e` Cypress folder, test files have been created for you to fill in
- Your feature tests should include the Books index page, Book show page, and submitting a new Book
- For more Cypress practice, write feature tests for the Bonus Podcast section!

**Tips:**

- Make sure you first read this week's article `Running Cypress in Monolith Apps` before starting this section
- Reference back to Week 2 articles on how to write Cypress tests
- The [Cypress documentation][cypressDocumentation] has some great tips on writing quality tests!

### Bonus: Styling 

Time to style the app! For all of the these steps, ensure that you are using Foundation for aligning any elements. 

##### App Layout 

- Choose two accent colors for your color scheme. At least one should not be white or black. 
- Make a header and footer for your application. Ensure that the header includes the name of your application on the top left of the screen. Navigation links should exist in the right hand side of the navbar. The app name and links should all have heavier font weights than normal, and the links should not display underlines. 
- The link for adding a new book e.g. "Add New Book" should appear as a button. Ensure that when a user hovers over this button, that the button changes in a discernable way e.g. the color turns from orange to light-orange (indicating to the user that this element can be interacted with).

##### Book and Podcast List Pages
- If using `li` tags, no bullet should appear next to each book or podcast tile. 
- Each book or podcast should have have some amount of margin to separate it from other elements 
- Continue to add least one or more styling decision(s) to this page

##### Forms in the website: 
- the form element itself should have a background color (ideally a lighter colored background)
- the form should have margin such that it is centered on the screen, and is not touching an other elements
- should have form fields that are only as wide as are needed e.g. the `pageCount` field should be small, since most books only will never need more than 4 characters. 
- no form field should take up the full width of the form
- Continue to add least one or more styling decision(s) to this page

##### Show Page:
- Add a column `image` to the books table and the podcasts table, using two migrations (one for each column)
- When adding a new book or podcast, an optional string field of "Image" should appear in the form, so that a user may provide an image URL for their book or podcast. 
- When a user visits the book or podcast show page, the image should appear on the page
- The image of the book/podcast should appear on the right 50% of the screen (ensure that the image is not too big that it overflows). While the attributes of a book/podcast should appear on the left hand side of the screen. 
- Experiment with different font sizes and font weights for each of the attributes of a book/podcast. 


### Bonus: Search Functionality 

- When navigating to `/books`, there is a form at the top of the page (above the existing list). The form allows a user to search for a book based on the title of a book or the book's author. 
- There should be one input field that will take a "query" from the user. There should also be a dropdown, that allows the user to select to search either by "author" or "title". You may need to research how to make a dropdown with the [select-element][select-element-mdn]
- Submitting the form should send a `GET` request to a `/api/v1/books/search` endpoint. The structure of the body of the request will depend on the dropdown selection chosen 

Example:
```json
{
  "search": {
    "query": "The Fellowship of the Ring",
    "attribute": "title"
  }
}
```
- You'll need to use one of the "Find" methods from Objection, and you may decide to start with the `where` query. 
- Once you have your results, update state with the returned results so that the initial list of books no longer displays, and only books matching the search query are shown
- You need only find exact matches for a search. E.g. Searching "Fellowship" should not result in a match for "The Fellowship of the Ring

### Bonus: A More Robust `cleanUserInput` 

To get around the fact that user inputs come across HTTP requests as strings, we've advised that you edit JSON Schema Validations to allow for strings on a field that would usually only allow integers. Let's make a more `cleanUserInput` function so that our JSON Schema validations can be more strict. 

- Change your `pageCount` JSON Schema validation to *only* allow integers. Strings should no longer be allowed 
- Make a new file `cleanBookInput` in your `services` folder. Populate it with a `cleanBookInput` that looks identical to your existing `cleanUserInput` function. 
- Update `cleanBookInput`, which will only be run in the `booksRouter`, to specifically check the `pageCount` field. If a `pageCount` field is present, and the value of the field is an integer, convert the integer to a string

```js
const cleanBookInput = formInput => {
  Object.keys(formInput).forEach(field => {
    
    // additional if statement to check the pageCount field

    if(formInput[field] === "") {
      delete formInput[field]
    }
  })
  return formInput
}

export default cleanUserInput
```

An example converted input might be this data:

```js
{
  book: {
    title: "The Two Towers"
    author: "J.R.R. Tolkien",
    pageCount: "352"
  }
}
```
to this: 
```js
{
  book: {
    title: "The Two Towers"
    author: "J.R.R. Tolkien",
    pageCount: 352
  }
}
```

### Bonus: Creator's Table 

It is well known that those that write books, often love to start their own podcasts! Let's add a `creators` table to our application, and new functionality for creators. 

```no-highlight
As a nerd
I want to see a list of creators
So that I know whose creations to follow
```

Acceptance Criteria:
- At the `"/creators"` path, I can see a list of all creators in the app
- A creator should have a `firstName`, `lastName` attribute. A creator should also have a `podcaster` boolean attribute, and an `author` boolean attribute. These attributes should be true if the creator is a podcaster or author respectively. Add validations that you think would be necessary for these fields. 
- Creator a seeder for a few creators that might have both a podcast and a book (you can make someone up!). Ensure that this seeder is run before any existing book seeder or podcast seeder. 

```no-highlight
As a nerd
I want to see a creator's works
So that I can consume all of their creations
```
- When navigating to `"/creators/:id"` I should see all of the information about the creator with that `id`, plus the creator's podcasts and books that they have created

- You will need to make two new migrations, one to add a `creatorId` to the `books` table, and another to add a `creatorId` to the `podcasts` table. Both should be integers, and should be optional for the time being. 
- Update your book seeder and podcast seeder data to have `creatorId`s supplied. If you opted to have your `creatorId` be an optional value, then you don't need to add this `id` to each record. 

- When navigating to `"/creators/:id"`, you'll make a standard fetch, but on the backend you will first need to retrieve the creator with that id. Then, you will need two `where` queries to grab the podcasts of the creator, and the books of that creator. Add all three (creator, books, podcasts) to your JSON response to display on the page. 

[jsonSchemaGuide]:https://json-schema.org/understanding-json-schema/index.html
[cypressDocumentation]:https://docs.cypress.io/guides/getting-started/writing-your-first-test.html#Write-your-first-test
[select-element-mdn]:https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select
