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

describe('User Model tests', () => {
   // -------------------------------------
   // * _____________ Describe____________
   // -------------------------------------

   describe('exists', () => {
      it('create', () => {
         expect(userModel.createNew).toBeDefined()
      })

      it('authenticate User', () => {
         expect(userModel.authUser).toBeDefined()
      })

      it('view all', () => {
         expect(userModel.viewAll).toBeDefined()
      })

      it('view one', () => {
         expect(userModel.viewOne).toBeDefined()
      })

      it('update', () => {
         expect(userModel.updateOne).toBeDefined()
      })

      it('delete', () => {
         expect(userModel.deleteOne).toBeDefined()
      })
   })

   // -------------------------------------
   // * _____________ Describe____________
   // -------------------------------------
   describe('proccess', () => {
      const user = {
         email: 'gmail8@gmail',
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

      it('create', async () => {
         const createNew = await userModel.createNew({
            email: 'gmail9@gmail',
            user_name: 'user',
            first_name: 'first',
            last_name: 'last',
            password: 'pass23'
         } as User)
         expect(createNew).toEqual({
            user_id: createNew.user_id,
            email: 'gmail9@gmail',
            user_name: 'user',
            first_name: 'first',
            last_name: 'last'
         } as User)
      })

      // it('view All', async () => {
      //    const viewAll = await userModel.viewAll()
      //    expect(viewAll.length).toBe(viewAll.length)
      // })

      it('view one', async () => {
         const viewOne = await userModel.viewOne(
            user.user_id as unknown as string
         )
         expect(viewOne.user_id).toBe(user.user_id)
         expect(viewOne.email).toBe(user.email)
         expect(viewOne.user_name).toBe(user.user_name)
         expect(viewOne.first_name).toBe(user.first_name)
         expect(viewOne.last_name).toBe(user.last_name)
      })

      it('update user', async () => {
         const updatedUser = await userModel.updateOne({
            ...user,
            user_name: 'username',
            first_name: 'yasser',
            last_name: 'omar'
         })
         expect(updatedUser.user_id).toBe(user.user_id)
         expect(updatedUser.email).toBe(user.email)
         expect(updatedUser.user_name).toBe('username')
         expect(updatedUser.first_name).toBe('yasser')
         expect(updatedUser.last_name).toBe('omar')
      })

      it('delete user', async () => {
         const deleteOne = await userModel.deleteOne(
            user.user_id as unknown as string
         )
         expect(deleteOne.user_id).toBe(user.user_id)
      })
   })
})
