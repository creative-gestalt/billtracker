import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Bill } from './interfaces/bill.interface';
import { AddBillDto } from './dto/add-bill.dto';

@Injectable()
export class AppService {
  constructor(@InjectModel('Bill') private readonly billModel: Model<Bill>) {}

  async getBills(): Promise<Bill[]> {
    return await this.billModel.find().exec();
  }

  async addBill(addBillDto: AddBillDto): Promise<Bill> {
    return await this.billModel.insertMany(addBillDto);
  }

  async deleteBills(bills): Promise<any> {
    return this.billModel.deleteMany({ _id: { $in: bills } });
  }

  async deleteBillFromMonths(bills): Promise<any> {
    return this.billModel.deleteMany({ _id: { $in: bills } });
  }

  async updateBill(billID: string, addBillDto: AddBillDto): Promise<Bill> {
    return this.billModel.findByIdAndUpdate(billID, addBillDto, { new: true });
  }
}
