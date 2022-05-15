// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ? ============================= import =============================
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

import Order from '../types/order.type'
import db from '../database'
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ? ============================= Model =============================
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

class OrderModel {
   // -------------------------------------
   // * _____________ Create ____________
   // -------------------------------------
   async createOr(order: Order): Promise<Order> {
      try {
         const connection = await db.connect()
         const sql = `INSERT INTO orders (status,userId) VALUES($1, $2) RETURNING *`
         const result = await connection.query(sql, [
            order.status,
            order.userId
         ])
         connection.release()
         return result.rows[0]
      } catch (error) {
         throw new Error(
            `Unable to create (${status}): ${(error as Error).message}`
         )
      }
   }
   // -------------------------------------
   // * _____________ Get all Orders ____________
   // -------------------------------------
   async allOr(): Promise<Order[]> {
      try {
         const connection = await db.connect()
         const sql = `SELECT * FROM orders `
         const result = await connection.query(sql)
         connection.release()
         return result.rows
      } catch (error) {
         throw new Error(`no orders to show : ${(error as Error).message}`)
      }
   }
   // -------------------------------------
   // * _____________ Get Order ____________
   // -------------------------------------
   async oneOr(userId: string): Promise<Order> {
      try {
         const connection = await db.connect()
         const sql = `SELECT * FROM orders WHERE userId=($1)`
         const result = await connection.query(sql, [userId])
         connection.release()
         return result.rows[0]
      } catch (error) {
         throw new Error(
            `this user have not orders ${userId} : ${(error as Error).message}`
         )
      }
   }
}

export default OrderModel
