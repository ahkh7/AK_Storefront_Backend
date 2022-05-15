// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ? ============================= import =============================
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

import Product from '../types/product.type'
import db from '../database'
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ? ============================= Model =============================
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

class ProductModel {
   // -------------------------------------
   // * _____________ Create ____________
   // -------------------------------------
   async createPr(product: Product): Promise<Product> {
      try {
         const connection = await db.connect()
         const sql = `INSERT INTO products (product_name, category, price) VALUES ($1, $2, $3) RETURNING *`
         const result = await connection.query(sql, [
            product.product_name,
            product.category,
            product.price
         ])
         connection.release()
         return result.rows[0]
      } catch (error) {
         throw new Error(
            `problem in creating the product (${product.product_name}): ${
               (error as Error).message
            }`
         )
      }
   }
   // -------------------------------------
   // * _____________ All products ____________
   // -------------------------------------
   async allPr(): Promise<Product[]> {
      try {
         const connection = await db.connect()
         const sql = `SELECT * FROM products`
         const result = await connection.query(sql)
         connection.release()
         return result.rows
      } catch (error) {
         throw new Error(
            `problem in showing the product ${(error as Error).message}`
         )
      }
   }
   // -------------------------------------
   // * _____________ one product ____________
   // -------------------------------------
   async onePr(id: string): Promise<Product> {
      try {
         const connection = await db.connect()
         const sql = `SELECT * FROM products WHERE product_id=($1)`
         const result = await connection.query(sql, [id])
         connection.release()
         return result.rows[0]
      } catch (error) {
         throw new Error(
            `please insert correct product id ${(error as Error).message}`
         )
      }
   }
}

export default ProductModel
