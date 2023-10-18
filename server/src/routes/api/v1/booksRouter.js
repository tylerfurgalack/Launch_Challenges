// import { json } from "body-parser"
import express from "express"
import { ValidationError } from "objection"

import { Book } from "../../../models/index.js"
import cleanUserInput from "../../../services/cleanUserInput.js"

const booksRouter = new express.Router()

booksRouter.get("/", async (req, res) => {
  // your code here
  try {
    const books = await Book.query()
    return res.status(200).json({ books })
  } catch (err) {
    return res.status(500).json({ errors: err })
  }
})

booksRouter.post("/", async (req, res) => {
  const body = req.body
  console.log(body)
  const cleanedUpBody = cleanUserInput(body)
  console.log("cleaned", cleanedUpBody)

  try {
    const newBook = await Book.query().insertAndFetch(cleanedUpBody)
    console.log(newBook)
    return res.status(201).json({ book: newBook })
  } catch (err) {
    if (err instanceof ValidationError) {
      return res.status(422).json({ errors: err.data })
    } else {
      return res.status(500).json({ errors: err })
    }
  }
})

booksRouter.get("/:id", async (req, res) => {
  try {
    const bookId = req.params.id
    const book = await Book.query().findById(bookId)
    return res.status(200).json({ book })
  } catch (error) {
    res.status(500).json({ error: { message: "YOU GOOFED" } })
  }
})

export default booksRouter
