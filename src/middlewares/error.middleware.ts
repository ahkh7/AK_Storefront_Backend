//import
import { Response, Request } from 'express'
import err from './error.interface'

// function
const errorMiddleware = (error: err, _req: Request, res: Response) => {
   const status = error.status || 500
   const message = error.message || 'minor error'
   res.status(status).json({ status, message })
}

export default errorMiddleware
