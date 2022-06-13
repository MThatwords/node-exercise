const express = require('express')
const app = express()
const logger = require('./loggerMiddleware')
const cors = require('cors')

app.use(cors())
app.use(express.json())
// midelware
app.use(logger)
let notes = [
  {
    id: 1,
    content: 'Estoy revisando la pagina',
    date: '2019-05-30t19:20:14/2',
    important: true
  },
  {
    id: 2,
    content: 'Ver los video de optimizacion',
    date: '2019-05-30t19:20:14/2',
    important: true
  },
  {
    id: 3,
    content: 'Repasar los retos',
    date: '2019-05-30t19:20:14/2',
    important: true
  },
  {
    id: 4,
    content: 'hola retos de mid',
    date: '2019-05-31t20:20:14/2',
    important: true
  }
]

// const app = http.createServer((req, res) => {
//   res.writeHead(200, { 'Content-type': 'application/json' })
//   res.end(JSON.stringify(notes))
// })

app.get('/', (req, res) => {
  res.send('<h1>Hello Everyone</h1>')
})

app.get('/api/notes', (req, res) => {
  res.json(notes)
})

app.get('/api/notes/:id', (req, res) => {
  console.log(req.path)
  const id = Number(req.params.id)
  const note = notes.find(note => note.id === id)
  if (note) {
    res.json(note)
  } else {
    res.status(404).end()
  }
})

// get.delete('/api/notes/:id', (req, res) => {
//   const id = Number(req.params.id)
//   notes = notes.filter(note => note.id !== id)
//   res.status(204).end
// })

app.post('/api/notes', (req, res) => {
  const note = req.body

  if (!note || !note.content) {
    return res.status(400).json({
      error: 'content is missing'
    })
  }

  const ids = notes.map(note => note.id)
  const maxId = Math.max(...ids)

  const newNote = {
    id: maxId + 1,
    content: note.content,
    important: typeof note.important !== 'undefined' ? note.important : false,
    date: new Date().toISOString()
  }
  notes = notes.concat(newNote)

  res.json(newNote)
})

app.use((req, res) => {
  res.status(404).json({
    error: 'Not found'
  })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`server running on por ${PORT}`)
})

/* git clone https://github.com/midudev/notes-app-full-stack-bootcamp.git
cd notes-app-full-stack-bootcamp
installar las dependencias ni 15:58
npm run start
....
code .
src/services/notes.js

20:30
npm ibstall cors -E// en el servidor
*/
