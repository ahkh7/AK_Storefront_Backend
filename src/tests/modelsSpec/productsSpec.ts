// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ? ============================= import =============================
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

import Product from '../../types/product.type'
import db from '../../database'
import ProductModel from '../../models/product.model'

const productModel = new ProductModel()
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ? =============================   =============================
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// -------------------------------------
// * _____________ Describe____________
// -------------------------------------

describe('Product Model tests', () => {
   describe('exists', () => {
      it('view All', () => {
         expect(productModel.allPr).toBeDefined()
      })
      it('view one', () => {
         expect(productModel.onePr).toBeDefined()
      })
      it('create', () => {
         expect(productModel.createPr).toBeDefined()
      })
   })
   // -------------------------------------
   // * _____________ Describe____________
   // -------------------------------------

   describe('proccess', () => {
      const product = {
         product_name: 'gmail10@gmail',
         category: 'category',
         price: 1500
      } as Product

      beforeAll(async () => {
         const createPr = await productModel.createPr(product)
         product.product_id = createPr.product_id
      })

      // afterAll(async () => {
      //    const connection = await db.connect()
      //    const sql = 'DELETE FROM products;'
      //    await connection.query(sql)
      //    connection.release()
      // })

      it('create', async () => {
         const createPr = await productModel.createPr({
            product_name: 'gmail11@gmail',
            category: 'category',
            price: 1500
         } as Product)
         expect(createPr).toEqual({
            product_id: createPr.product_id,
            product_name: 'gmail11@gmail',
            category: 'category',
            price: 1500
         } as Product)
      })

      it('view one product', async () => {
         const onePr = await productModel.onePr(
            product.product_id as unknown as string
         )
         expect(onePr.product_id).toBe(product.product_id)
         expect(onePr.product_name).toBe(product.product_name)
         expect(onePr.category).toBe(product.category)
         expect(onePr.price).toBe(product.price)
      })

      // it('view all product', async () => {
      //    const allPr = await productModel.allPr()
      //    expect(allPr.length).toBe(2)
      // })
   })
})
