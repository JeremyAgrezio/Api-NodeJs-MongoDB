import debug from 'debug'
require('dotenv').load()
const log = debug('app')

let applicationEnvVars = [ 'APP_ENVIRONMENT', 'PORT' ]

let mongoEnvVars = [ 'MONGO_HOSTNAME', 'MONGO_PORT', 'MONGO_DATABASE' ]

applicationEnvVars = [ ...applicationEnvVars, ...mongoEnvVars ]

let unusedEnvVars = applicationEnvVars.filter((i) => !process.env[i])

if (unusedEnvVars.length) {
  log('Required ENV variables are not set: [' + unusedEnvVars.join(', ') + ']')
  process.exit(1)
}

const { app } = require('./server/app.js')

app.listen(process.env.PORT)
