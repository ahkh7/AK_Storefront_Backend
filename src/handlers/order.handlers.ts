// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ? ============================= Import =============================
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
import { Request, Response, NextFunction } from 'express'
import OrderModel from '../models/order.model'
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ? =============================   =============================
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const orderModel = new OrderModel()

// -------------------------------------
// * _____________ create ____________
// -------------------------------------
export const createOr = async (
   req: Request,
   res: Response,
   next: NextFunction
) => {
   try {
      // const { status, userId } = req.body
      const order = await orderModel.createOr(req.body)
      res.json({
         status: 'success',
         data: order,
         message: 'order created'
      })
   } catch (error) {
      next(error)
   }
}
// -------------------------------------
// * _____________ get all ____________
// -------------------------------------
export const allOr = async (
   req: Request,
   res: Response,
   next: NextFunction
) => {
   try {
      const orders = await orderModel.allOr()
      res.json({
         status: 'success',
         data: orders,
         message: 'All orders'
      })
   } catch (error) {
      next(error)
   }
}
// -------------------------------------
// * _____________ get order ____________
// -------------------------------------
export const oneOr = async (
   req: Request,
   res: Response,
   next: NextFunction
) => {
   try {
      const orders = await orderModel.oneOr(req.params.id as unknown as string)
      res.json({
         status: 'success',
         data: orders,
         message: 'orders for this user'
      })
   } catch (error) {
      next(error)
   }
}
