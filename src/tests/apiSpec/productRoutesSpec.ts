// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ? ============================= import =============================
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
import Product from '../../types/product.type'
import db from '../../database'
import ProductModel from '../../models/product.model'
import supertest from 'supertest'
import app from '../../index'
import User from '../../types/user.type'
import UserModel from '../../models/user.model'

const userModel = new UserModel()

const supApp = supertest(app)
const productModel = new ProductModel()
let testToken = ''
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ? =============================   =============================
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

describe('Products API tests ', () => {
   // ===================== product for testing on it
   const product = {
      product_name: 'gmail3@gmail',
      category: 'category',
      price: 1500
   } as Product
   beforeAll(async () => {
      const createProduct = await productModel.createPr(product)
      product.product_id = createProduct.product_id
   })
   // afterAll(async () => {
   //    const connection = await db.connect()
   //    const sql = 'DELETE FROM products;'
   //    await connection.query(sql)
   //    connection.release()
   // })
   // ===================== user for testing on it
   const user = {
      email: 'gmail4@gmail',
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
   // ===================== the authenticate for test user
   it('get = token', async () => {
      const res = await supApp
         .post('/api/users/authenticate')
         .set('Content-type', 'application/json')
         .send({
            email: 'gmail4@gmail',
            password: 'pass23'
         })
      expect(res.status).toBe(200)
      const { user_id, email, token: userToken } = res.body.data
      // expect(user_id).toBe(user.user_id)
      // expect(email).toBe('gmail4@gmail')
      testToken = userToken
   })
   // -------------------------------------
   // * _____________ CRUD ____________
   // -------------------------------------

   describe('Product CRUD tests', () => {
      it('create', async () => {
         const res = await supApp
            .post('/api/products/')
            .set('Content-type', 'application/json')
            .set('Authorization', `Bearer ${testToken}`)
            .send({
               product_name: 'gmail3@gmail',
               category: 'category',
               price: 1500
            } as Product)
         expect(res.status).toBe(200)
         // const { product_name, category, price } = res.body.data
         // expect(product_name).toBe('gmail3@gmail')
         // expect(category).toBe('category')
         // expect(price).toBe(1500)
      })

      it('view all', async () => {
         const res = await supApp
            .get('/api/products/')
            .set('Content-type', 'application/json')
            .set('Authorization', `Bearer ${testToken}`)
         expect(res.status).toBe(200)
         // expect(res.body.data.length).toBe(2)
      })

      it('View one', async () => {
         const res = await supApp
            .get(`/api/products/${product.product_id}`)
            .set('Content-type', 'application/json')
            .set('Authorization', `Bearer ${testToken}`)
         expect(res.status).toBe(200)
         // expect(res.body.data.product_name).toBe('gmail3@gmail')
         // expect(res.body.data.category).toBe('category')
         // expect(res.body.data.price).toBe(1500)
      })
   })
})
