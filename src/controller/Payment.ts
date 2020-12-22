import express, { Application, Request, Response } from 'express'

class Payment {
  static getPaymentHistory(req: Request, res: Response) {
    res.send(req.body)
  }

  static newPayment(req: Request, res: Response) {}

  static updatePayment(req: Request, res: Response) {}

  static deletePayment(req: Request, res: Response) {}
}

export default Payment
