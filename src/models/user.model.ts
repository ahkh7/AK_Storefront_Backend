// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ? ============================= import =============================
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

import User from '../types/user.type'
import db from '../database'
import config from '../config'
import bcrypt from 'bcrypt'

// -------------------------------------
// * _____________ Hashing ____________
// -------------------------------------
const hashFunc = (pass: string) => {
   const salt = parseInt(config.salt as string, 10)
   return bcrypt.hashSync(`${pass}${config.pepper}`, salt)
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ? ============================= Model =============================
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
class UserModel {
   // -------------------------------------
   // * _____________ Create ____________
   // -------------------------------------
   async createNew(user: User): Promise<User> {
      try {
         const connection = await db.connect()
         const sql = `INSERT INTO users (email, user_name, first_name, last_name, password) values ($1, $2, $3, $4, $5)
            RETURNING user_id, email, user_name, first_name, last_name`
         const result = await connection.query(sql, [
            user.email,
            user.user_name,
            user.first_name,
            user.last_name,
            hashFunc(user.password as string)
         ])
         connection.release()
         return result.rows[0]
      } catch (error) {
         throw new Error(
            `problem in creating (${user.user_name}): ${
               (error as Error).message
            }`
         )
      }
   }
   // -------------------------------------
   // * _____________ All users ____________
   // -------------------------------------
   async viewAll(): Promise<User[]> {
      try {
         const connection = await db.connect()
         const sql = `SELECT user_id, email, user_name, first_name, last_name from users`
         const result = await connection.query(sql)
         connection.release()
         return result.rows
      } catch (error) {
         throw new Error(`problem in showing users ${(error as Error).message}`)
      }
   }
   // -------------------------------------
   // * _____________ One User ____________
   // -------------------------------------
   async viewOne(id: string): Promise<User> {
      try {
         const connection = await db.connect()
         const sql = `SELECT user_id, email, user_name, first_name, last_name from users where user_id=($1)`
         const result = await connection.query(sql, [id])
         connection.release()
         return result.rows[0]
      } catch (error) {
         throw new Error(`insert correct id  ${(error as Error).message}`)
      }
   }
   // -------------------------------------
   // * _____________ update User ____________
   // -------------------------------------
   async updateOne(user: User): Promise<User> {
      try {
         const connection = await db.connect()
         const sql = `UPDATE users 
            SET email=$1, user_name=$2, first_name=$3, last_name=$4, password=$5 
            WHERE user_id=$6 
            RETURNING user_id, email, user_name, first_name, last_name`
         const result = await connection.query(sql, [
            user.email,
            user.user_name,
            user.first_name,
            user.last_name,
            hashFunc(user.password as string),
            user.user_id
         ])
         connection.release()
         return result.rows[0]
      } catch (error) {
         throw new Error(
            `problem in updating the user: ${user.user_name} ${
               (error as Error).message
            }`
         )
      }
   }
   // -------------------------------------
   // * _____________ delete User ____________
   // -------------------------------------
   async deleteOne(id: string): Promise<User> {
      try {
         const connection = await db.connect()
         const sql = `DELETE FROM users
            WHERE user_id = ($1)
            RETURNING user_id, email, user_name, first_name, last_name`
         const result = await connection.query(sql, [id])
         connection.release()
         return result.rows[0]
      } catch (error) {
         throw new Error(
            `problem in deleting: ${id} ${(error as Error).message}`
         )
      }
   }
   // -------------------------------------
   // * _____________ Authenticate ____________
   // -------------------------------------
   async authUser(email: string, password: string): Promise<User | null> {
      try {
         const connection = await db.connect()
         const sql = `SELECT password FROM users WHERE email=$1`
         const result = await connection.query(sql, [email])
         if (result.rows.length) {
            const { password: hashPass } = result.rows[0]
            const validPass = bcrypt.compareSync(
               `${password}${config.pepper}`,
               hashPass
            )
            if (validPass) {
               const userInfo = await connection.query(
                  `SELECT user_id, email, user_name, first_name, last_name FROM users WHERE email=$1`,
                  [email]
               )
               return userInfo.rows[0]
            }
         }
         connection.release()
         return null
      } catch (error) {
         throw new Error(
            `please insert correct e-mail and password ${
               (error as Error).message
            }`
         )
      }
   }
}
export default UserModel
