import { Pool } from 'pg'
import config from '../config'

// pool
const pool = new Pool({
   host: config.host,
   database: config.database,
   user: config.user,
   password: config.password,
   port: parseInt(config.dbPort as string, 10),
   max: 20,
   idleTimeoutMillis: 30000,
   connectionTimeoutMillis: 2000
})

// pool error
pool.on('error', (error: Error) => {
   console.error(`Err: ${error.message}`)
})

export default pool
