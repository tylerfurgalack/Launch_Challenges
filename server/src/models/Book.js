const { Model } = require("objection")

class Book extends Model {
  static get tableName() {
    return "books"
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["title", "author", "pageCount"],
      properties: {
        title: { type: "string", minLength: 1 },
        author: { type: "string", minLength: 1 },
        pageCount: { type: "integer" },
        description: { type: "string", minLength: 20 },
        fiction: { type: "boolean" },
      },
    }
  }
}

module.exports = Book
