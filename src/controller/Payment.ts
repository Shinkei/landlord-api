import express, { Application, Request, Response } from 'express'
import { isDate } from 'util'
import { IPayment, PaymentModel } from '../model/payment'

class Payment {
  static async getPaymentHistory(req: Request, res: Response) {
    const payments: Array<IPayment> = await PaymentModel.find({})
    let sum: number = payments.reduce((acc: number, payment: IPayment) => {
      return (acc += payment.value)
    }, 0)
    res.send({ sum, items: payments })
  }

  static async newPayment(req: Request, res: Response) {
    const { contractId, description, value, time } = req.body

    if (!contractId || !description || !value) {
      res.sendStatus(400).send({ message: 'One or more fields are missing' })
    }
    const payment: IPayment = new PaymentModel({
      contractId,
      description,
      value,
      time: time || new Date(),
      isImported: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      isDeleted: false,
    })

    try {
      await payment.save()
    } catch (error) {
      res.sendStatus(500).send({ message: error.message })
    }

    res.sendStatus(200)
    res.send({ success: true })
  }

  static updatePayment(req: Request, res: Response) {}

  static deletePayment(req: Request, res: Response) {}
}

export default Payment
