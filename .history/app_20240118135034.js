const express = require('express')
const app = express()
const PORT = 4000

app.use(express.json())

const snippets = require('./seedData.json')

let id = snippets.length

app.post('/snippets', (req, res) => {
  const { language, code } = req.body

  // basic validation
  if (!language || !code) {
    return res
      .status(400)
      .json({ error: 'A language and code are required fields' })
  }

  const snippet = {
    id: ++id,
    language,
    code
  }

  snippets.push(snippet)
  res.status(201).json(snippet)
})


app.get('/snippets', (req, res) => {
  const { lang } = req.query

  if (lang.trim()) {
    const filteredSnippets = snippets.filter(
      snippet => snippet.language.toLowerCase() === lang.toLowerCase().trim()
    )
    if (filteredSnippets.length === 0) {
      return res
        .status(400)
        .json({ error: 'No snippets match search'})

    }
    return res.json(filteredSnippets)
  }

  res.json(snippets)
})


app.get('/snippets/:id', (req, res) => {
  const snippetId = parseInt(req.params.id)
  const snippet = snippets.find(snippet => snippet.id === snippetId)

  if (!snippet) {
    return res.status(404).json({ error: 'Snippet not found' })
  }

  res.json(snippet)
})


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})