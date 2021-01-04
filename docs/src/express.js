import path from 'path'

import express from 'express'

import pwrcExpress from '@pwrc/express'

const app = express()

app.use('/', express.static(path.resolve(process.cwd(), 'public')))

app.use('/*', pwrcExpress())

const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`🚀 App started on port http://localhost:${port}`)
})
