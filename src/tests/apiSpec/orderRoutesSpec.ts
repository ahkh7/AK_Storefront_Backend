// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ? ============================= import =============================
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
import UserModel from '../../models/user.model'
import app from '../../index'
import db from '../../database'
import User from '../../types/user.type'
import Order from '../../types/order.type'
import supertest from 'supertest'
import ProductModel from '../../models/product.model'
import Product from '../../types/product.type'
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ? =============================   =============================
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const userModel = new UserModel()
const supApp = supertest(app)
const productModel = new ProductModel()

let testToken = ''
let createdOrder: Order

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ? =============================   =============================
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
describe('Orders API tests', () => {
   // ===================== user for testing on it
   const user = {
      email: 'gmail6@gmail',
      user_name: 'user',
      first_name: 'first',
      last_name: 'last',
      password: 'pass123'
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
   it('get = token', async () => {
      const res = await supApp
         .post('/api/users/authenticate')
         .set('Content-type', 'application/json')
         .send({
            email: 'gmail6@gmail',
            password: 'pass123'
         })
      expect(res.status).toBe(200)
      const { token: userToken } = res.body.data
      testToken = userToken
   })
   // ===================== CRUD tests
   it('create', async () => {
      const res = await supApp
         .post('/api/orders/')
         .set('Content-type', 'application/json')
         .set('Authorization', `Bearer ${testToken}`)
         .send({
            status: 'delivered',
            userId: user.user_id as unknown as number
         } as Order)
      expect(res.status).toBe(200)
      // console.log(res.body.data)
   })

   it('view Order By User ID', async () => {
      const res = await supApp
         .get(`/api/orders/${user.user_id}`)
         .set('Content-type', 'application/json')
         .set('Authorization', `Bearer ${testToken}`)
      expect(res.status).toBe(200)
   })
})
