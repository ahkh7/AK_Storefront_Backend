// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ? ============================= Import =============================
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
import { Request, Response, NextFunction } from 'express'
import config from '../config'
import jwt from 'jsonwebtoken'
import Error from './error.interface'
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ? ============================= Middleware =============================
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// -------------------------------------
// * _____________ error function ____________
// -------------------------------------
const validError = (next: NextFunction) => {
   const error: Error = new Error('please login')
   error.status = 401
   next(error)
}
// -------------------------------------
// * _____________ the middleware ____________
// -------------------------------------

const validToken = async (req: Request, res: Response, next: NextFunction) => {
   try {
      const authHead = req.get('Authorization')
      if (authHead) {
         const bearer = authHead.split(' ')[0].toLowerCase()
         const token = authHead.split(' ')[1]
         if (token && bearer === 'bearer') {
            const decode = jwt.verify(
               token,
               config.tokenSecret as unknown as string
            )
            if (decode) {
               next()
            } else {
               // const err: Error = new Error ('login first')
               // err.status = 401
               // next(error)
               validError(next)
            }
         } else {
            // const err: Error = new Error ('login first')
            // err.status = 401
            // next(error)
            validError(next)
         }
      } else {
         // const err: Error = new Error ('login first')
         // err.status = 401
         // next(error)
         validError(next)
      }
   } catch (error) {
      // const err: Error = new Error ('login first')
      // err.status = 401
      // next(error)
      validError(next)
   }
}

export default validToken
