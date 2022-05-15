// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ? ============================= import =============================
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

import User from '../../types/user.type'
import db from '../../database'
import UserModel from '../../models/user.model'

const userModel = new UserModel()

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ? =============================   =============================
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
describe('Authentication Tests', () => {
   describe('is auth exists', () => {
      it('auth User', () => {
         expect(userModel.authUser).toBeDefined()
      })
   })

   describe('Authentication proccess', () => {
      const user = {
         email: 'gmail7@gmail',
         user_name: 'user',
         first_name: 'first',
         last_name: 'last',
         password: 'pass23'
      } as User

      beforeAll(async () => {
         const createNew = await userModel.createNew(user)
         user.user_id = createNew.user_id
      })

      // afterAll(async () => {
      //    const connection = await db.connect()
      //    const sql = 'DELETE FROM users;'
      //    await connection.query(sql)
      //    connection.release()
      // })

      it('correct details', async () => {
         const authUser = await userModel.authUser(
            user.email,
            user.password as string
         )
         expect(authUser?.email).toBe(user.email)
         expect(authUser?.user_name).toBe(user.user_name)
         expect(authUser?.first_name).toBe(user.first_name)
         expect(authUser?.last_name).toBe(user.last_name)
      })

      it('not correct details', async () => {
         const authUser = await userModel.authUser('wrong@gmail.com', 'wrong')
         expect(authUser).toBe(null)
      })
   })
})
