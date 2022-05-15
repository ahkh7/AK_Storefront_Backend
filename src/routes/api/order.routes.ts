// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ? ============================= Import =============================
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
import { Router } from 'express'
import * as handlers from '../../handlers/order.handlers'
import validateToken from '../../middlewares/auth.middleware'
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ? =============================   =============================
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const routes = Router()

routes
   .route('/')
   .post(validateToken, handlers.createOr)
   .get(validateToken, handlers.allOr)
routes.route('/:id').get(validateToken, handlers.oneOr)

export default routes
