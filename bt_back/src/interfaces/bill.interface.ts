import { Document } from 'mongoose';

export interface Bill extends Document {
  readonly month: number;
  readonly day: number;
  readonly name: string;
  readonly amount: string;
  readonly paid: boolean;
  readonly reference: string;
  readonly year: string;
}
