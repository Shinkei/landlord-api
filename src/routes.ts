import { Router } from 'express'
import Payment from './controller/Payment'

const router: Router = Router()

router.get('/payments', Payment.getPaymentHistory)
router.get('/payments/:contractId', Payment.getPaymentHistoryForContract)
router.post('/payments', Payment.newPayment)
router.put('/payments/:paymentId', Payment.updatePayment)
router.delete('/payments/:paymentId', Payment.deletePayment)

export default router
