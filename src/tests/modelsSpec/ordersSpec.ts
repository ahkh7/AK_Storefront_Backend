// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ? ============================= import =============================
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
import Order from '../../types/order.type'
import OrderModel from '../../models/order.model'
import db from '../../database'

import User from '../../types/user.type'
import UserModel from '../../models/user.model'
const userModel = new UserModel()

const orderModel = new OrderModel()
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ? =============================   =============================
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

describe('Order Model tests', () => {
   describe('exists', () => {
      it('create', () => {
         expect(orderModel.createOr).toBeDefined()
      })
      it('view All', () => {
         expect(orderModel.allOr).toBeDefined()
      })
      it('view Order', () => {
         expect(orderModel.oneOr).toBeDefined()
      })
   })
})
