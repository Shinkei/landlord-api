import { model, Schema, Model, Document } from 'mongoose'

interface IPayment extends Document {
  contractId: number
  description: string
  value: number
  time: Date
  isImported: boolean
  createdAt: Date
  updatedAt: Date
  isDeleted: boolean
}

const PaymentSchema: Schema = new Schema({
  contractId: { type: Number, required: true },
  description: { type: String },
  value: { type: Number, required: true },
  time: { type: Date },
  isImported: { type: Boolean },
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date, required: true },
  isDeleted: { type: Boolean },
})

const PaymentModel: Model<IPayment> = model('Payment', PaymentSchema)

export { IPayment, PaymentModel }
