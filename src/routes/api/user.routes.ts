// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ? ============================= Import =============================
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

import { Router } from 'express'
import * as handlers from '../../handlers/user.handlers'
import validToken from '../../middlewares/auth.middleware'
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ? =============================   =============================
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const routes = Router()

routes.route('/').get(validToken, handlers.viewAll).post(handlers.createNew)
routes
   .route('/:id')
   .get(validToken, handlers.viewOne)
   .patch(validToken, handlers.updateOne)
   .delete(validToken, handlers.deleteOne)

routes.route('/authenticate').post(handlers.authUser)

export default routes
