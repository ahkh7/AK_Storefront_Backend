// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ? ============================= Import =============================
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
import { Request, Response, NextFunction } from 'express'
import UserModel from '../models/user.model'
import config from '../config'
import jwt from 'jsonwebtoken'
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ? =============================   =============================
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const userModel = new UserModel()
// -------------------------------------
// * _____________ Create ____________
// -------------------------------------
export const createNew = async (
   req: Request,
   res: Response,
   next: NextFunction
) => {
   try {
      const user = await userModel.createNew(req.body)
      res.json({
         status: 'success',
         data: { ...user },
         message: 'created'
      })
   } catch (error) {
      next(error)
   }
}
// -------------------------------------
// * _____________ All users ____________
// -------------------------------------
export const viewAll = async (
   req: Request,
   res: Response,
   next: NextFunction
) => {
   try {
      const users = await userModel.viewAll()
      res.json({
         status: 'success',
         data: users,
         message: 'all users'
      })
   } catch (error) {
      next(error)
   }
}
// -------------------------------------
// * _____________ One User ____________
// -------------------------------------
export const viewOne = async (
   req: Request,
   res: Response,
   next: NextFunction
) => {
   try {
      const user = await userModel.viewOne(req.params.id as unknown as string)
      res.json({
         status: 'success',
         data: user,
         message: 'the user you asked for'
      })
   } catch (error) {
      next(error)
   }
}
// -------------------------------------
// * _____________ update User ____________
// -------------------------------------
export const updateOne = async (
   req: Request,
   res: Response,
   next: NextFunction
) => {
   try {
      const user = await userModel.updateOne(req.body)
      res.json({
         status: 'success',
         data: user,
         message: 'updated!'
      })
   } catch (error) {
      next(error)
   }
}

// -------------------------------------
// * _____________ delete User ____________
// -------------------------------------
export const deleteOne = async (
   req: Request,
   res: Response,
   next: NextFunction
) => {
   try {
      const user = await userModel.deleteOne(req.params.id as unknown as string)
      res.json({
         status: 'success',
         data: user,
         message: 'deleted!'
      })
   } catch (error) {
      next(error)
   }
}
// -------------------------------------
// * _____________ Authenticate ____________
// -------------------------------------
export const authUser = async (
   req: Request,
   res: Response,
   next: NextFunction
) => {
   try {
      const { email, password } = req.body
      const user = await userModel.authUser(email, password)
      const token = jwt.sign({ user }, config.tokenSecret as unknown as string)
      if (!user) {
         return res.status(401).json({
            status: 'error',
            message: 'please insert correct info'
         })
      }
      return res.json({
         status: 'success',
         data: { ...user, token },
         message: 'login-successfully'
      })
   } catch (error) {
      next(error)
   }
}
