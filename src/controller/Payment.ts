import express, { Application, Request, Response } from 'express'
import { isDate } from 'util'
import { IPayment, PaymentModel } from '../model/payment'

class Payment {
  /**
   * get all payments for all contracts
   */
  static async getPaymentHistory(req: Request, res: Response) {
    const payments: Array<IPayment> = await PaymentModel.find({
      isDeleted: false,
    })
    let sum: number = payments.reduce((acc: number, payment: IPayment) => {
      return (acc += payment.value)
    }, 0)
    res.status(200)
    res.send({ sum, items: payments })
  }

  /**
   * get all payments for an specific contract
   */
  static async getPaymentHistoryForContract(req: Request, res: Response) {
    const contractId: number = parseInt(req.params.contractId)
    if (!contractId) {
      res.status(400)
      res.send({ message: 'One or more fields are missing' })
    }
    const payments: Array<IPayment> = await PaymentModel.find({
      contractId,
      isDeleted: false,
    })
    let sum: number = payments.reduce((acc: number, payment: IPayment) => {
      return (acc += payment.value)
    }, 0)
    res.status(200)
    res.send({ sum, items: payments })
  }

  /**
   * creates a new Payment entry
   */
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

    res.status(200)
    res.send({ success: true })
  }

  /**
   * Update a payment by the id
   */
  static async updatePayment(req: Request, res: Response) {
    const paymentId: string = req.params.paymentId
    const { contractId, description, value, time } = req.body

    const updateObject: {
      contractId?: number
      description?: string
      value?: number
      time?: Date
      updatedAt: Date
    } = {
      updatedAt: new Date(),
    }

    if (contractId) {
      updateObject['contractId'] = contractId
    }
    if (description) {
      updateObject['description'] = description
    }
    if (value) {
      updateObject['value'] = value
    }
    if (time) {
      updateObject['time'] = time
    }

    try {
      const payment: IPayment | null = await PaymentModel.findOneAndUpdate(
        { _id: paymentId },
        updateObject,
        { new: true }
      )
      res.status(200)
      res.send(payment)
    } catch (error) {
      res.status(500)
      res.send({ message: error.message })
    }
  }

  /**
   * updates the field isDeleted for an payment with an specific id
   */
  static async deletePayment(req: Request, res: Response) {
    const paymentId: string = req.params.paymentId

    try {
      const payment: IPayment | null = await PaymentModel.updateOne(
        { _id: paymentId },
        { isDeleted: true }
      )
      res.status(200)
      res.send({ deleted: true })
    } catch (error) {
      res.status(500)
      res.send({ message: error.message })
    }
  }
}

export default Payment
