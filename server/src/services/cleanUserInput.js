const cleanUserInput = (formInput) => {
  Object.keys(formInput).forEach((field) => {
    if (typeof formInput[field] === "string") {
      console.log("after string check", formInput[field])
      if (formInput[field].trim() === "") {
        delete formInput[field]
      }
    }
    if (field === "pageCount") {
      formInput[field] = parseInt(formInput[field])
    }
  })
  return formInput
}

export default cleanUserInput
