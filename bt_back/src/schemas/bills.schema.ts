import * as mongoose from 'mongoose';

export const BillsSchema = new mongoose.Schema({
  month: Number,
  day: Number,
  name: String,
  amount: String,
  paid: Boolean,
  reference: String,
  year: String,
});
