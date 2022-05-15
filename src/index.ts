// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ? ============================= Import =============================
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
import express, { Application, Request, Response } from 'express'
import errorMiddleware from './middlewares/error.middleware'
import config from './config'
import routes from './routes'
import helmet from 'helmet'
import morgan from 'morgan'

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ? ============================= SERVER =============================
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const app = express()

const port = config.port

app.listen(port, () => {
   console.log(`Server port:${port}`)
})
app.use(express.json())

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ? ============================= ROUTES =============================
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
app.get('/', (req: Request, res: Response) => {
   // error
   res.json({
      message: 'another error',
      data: req.body
   })
})
//////////////////////////////////////

app.use('/api', routes)

// -------------------------------------
// * _____________ middlewares ____________
// -------------------------------------
app.use(morgan('short'))
app.use(helmet())

// -------------------------------------
// * _____________ handling errors ____________
// -------------------------------------
app.use(errorMiddleware)
//////////////////////////////////////
app.use((_: Request, res: Response) => {
   res.status(404).json({
      message: 'main error'
   })
})

export default app
