// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ? ============================= import =============================
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

import User from '../../types/user.type'
import db from '../../database'
import UserModel from '../../models/user.model'
import supertest from 'supertest'
import app from '../../index'

const supApp = supertest(app)
const userModel = new UserModel()
let testToken = ''
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ? =============================   =============================
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

describe('Users API Tests ', () => {
   // ===================== create user for testing on it
   const user = {
      email: 'gmail1@gmail',
      user_name: 'user',
      first_name: 'first',
      last_name: 'last',
      password: 'pass23'
   } as User
   beforeAll(async () => {
      const createdUser = await userModel.createNew(user)
      user.user_id = createdUser.user_id
   })
   // afterAll(async () => {
   //    const connection = await db.connect()
   //    const sql = 'DELETE FROM users;'
   //    await connection.query(sql)
   //    connection.release()
   // })
   // -------------------------------------
   // * _____________ test authentication ____________
   // -------------------------------------
   describe('authenticate', () => {
      it('get = token', async () => {
         const res = await supApp
            .post('/api/users/authenticate')
            .set('Content-type', 'application/json')
            .send({
               email: 'gmail1@gmail',
               password: 'pass23'
            })
         expect(res.status).toBe(200)
         const { user_id, email, token: userToken } = res.body.data
         expect(user_id).toBe(user.user_id)
         expect(email).toBe('gmail1@gmail')
         testToken = userToken
      })

      it('wrong email or pass', async () => {
         const res = await supApp
            .post('/api/users/authenticate')
            .set('Content-type', 'application/json')
            .send({
               email: 'wrong@gmail.com',
               password: 'wrong'
            })
         expect(res.status).toBe(401)
      })
   })
   // -------------------------------------
   // * _____________ CRUD ____________
   // -------------------------------------
   describe('User CRUD tests', () => {
      it('create', async () => {
         const res = await supApp
            .post('/api/users/')
            .set('Content-type', 'application/json')
            .set('Authorization', `Bearer ${testToken}`)
            .send({
               email: 'gmail2@gmail',
               user_name: 'user',
               first_name: 'first',
               last_name: 'last',
               password: 'pass23'
            } as User)
         expect(res.status).toBe(200)
         const { email, user_name, first_name, last_name } = res.body.data
         expect(email).toBe('gmail2@gmail')
         expect(user_name).toBe('user')
         expect(first_name).toBe('first')
         expect(last_name).toBe('last')
      })

      it('view all', async () => {
         const res = await supApp
            .get('/api/users/')
            .set('Content-type', 'application/json')
            .set('Authorization', `Bearer ${testToken}`)
         expect(res.status).toBe(200)
      })

      it('View one', async () => {
         const res = await supApp
            .get(`/api/users/${user.user_id}`)
            .set('Content-type', 'application/json')
            .set('Authorization', `Bearer ${testToken}`)
         expect(res.status).toBe(200)
         expect(res.body.data.user_name).toBe('user')
         expect(res.body.data.email).toBe('gmail1@gmail')
      })

      it('update', async () => {
         const res = await supApp
            .patch(`/api/users/${user.user_id}`)
            .set('Content-type', 'application/json')
            .set('Authorization', `Bearer ${testToken}`)
            .send({
               ...user,
               user_name: 'user123',
               first_name: 'yasser',
               last_name: 'omar'
            })
         expect(res.status).toBe(200)

         const { user_id, email, user_name, first_name, last_name } =
            res.body.data
         expect(user_id).toBe(user.user_id)
         expect(email).toBe(user.email)
         expect(user_name).toBe('user123')
         expect(first_name).toBe('yasser')
         expect(last_name).toBe('omar')
      })

      it('delete', async () => {
         const res = await supApp
            .delete(`/api/users/${user.user_id}`)
            .set('Content-type', 'application/json')
            .set('Authorization', `Bearer ${testToken}`)
         expect(res.status).toBe(200)
         expect(res.body.data.user_id).toBe(user.user_id)
         expect(res.body.data.user_name).toBe('user123')
      })
   })
})
