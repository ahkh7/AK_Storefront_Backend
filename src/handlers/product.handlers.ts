// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ? ============================= Import =============================
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

import { Request, Response, NextFunction } from 'express'
import ProductModel from '../models/product.model'
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ? =============================   =============================
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const productModel = new ProductModel()

// -------------------------------------
// * _____________ Create ____________
// -------------------------------------
export const createPr = async (
   req: Request,
   res: Response,
   next: NextFunction
) => {
   try {
      const product = await productModel.createPr(req.body)
      res.json({
         status: 'success',
         data: { ...product },
         message: 'created'
      })
   } catch (error) {
      next(error)
   }
}
// -------------------------------------
// * _____________ All products ____________
// -------------------------------------
export const allPr = async (
   req: Request,
   res: Response,
   next: NextFunction
) => {
   try {
      const products = await productModel.allPr()
      res.json({
         status: 'success',
         data: products,
         message: 'these are all products'
      })
   } catch (error) {
      next(error)
   }
}
// -------------------------------------
// * _____________ One product ____________
// -------------------------------------
export const onePr = async (
   req: Request,
   res: Response,
   next: NextFunction
) => {
   try {
      const product = await productModel.onePr(
         req.params.id as unknown as string
      )
      res.json({
         status: 'success',
         data: product,
         message: 'this is the product'
      })
   } catch (error) {
      next(error)
   }
}
