const express = require('express')
const app = express()
const PORT = 4000

app.use(express.json())

// array to store snippets
const snippets = require('./seedData.json')

// generate a unique ID for each snippet
let id = snippets.length

// create a new snippet
app.post('/snippets', (req, res) => {
  const { lang, code } = req.body

  // basic validation
  if (!lang || !code) {
    return res
      .status(400)
      .json({ error: 'A language and code are required fields' })
  }

  const snippet = {
    id: ++id,
    lang,
    code
  }

  snippets.push(snippet)
  res.status(201).json(snippet)
})

// get all snippets
app.get('/snippets', (req, res) => {
  const { lang } = req.query

  if (lang) {
    const filteredCupcakes = cupcakes.filter(
      cupcake => cupcake.flavor.toLowerCase() === flavor.toLowerCase()
    )
    return res.json(filteredCupcakes)
  }

  res.json(cupcakes)
})

// get a snippet by ID
app.get('/cupcakes/:id', (req, res) => {
  const cupcakeId = parseInt(req.params.id)
  const cupcake = cupcakes.find(cupcake => cupcake.id === cupcakeId)

  if (!cupcake) {
    return res.status(404).json({ error: 'Cupcake not found' })
  }

  res.json(cupcake)
})

// start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})