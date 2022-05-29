import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AddBillDto } from './dto/add-bill.dto';
import { Bill } from './interfaces/bill.interface';
import { ValidateObjectId } from './shared/pipes/validate-object-id.pipes';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('getBills')
  async getBills(@Res() res) {
    const bills = await this.appService.getBills();
    return res.status(HttpStatus.OK).json(bills);
  }

  @Post('addBill')
  async addBills(@Res() res, @Body() addBillDto: AddBillDto) {
    const bills = await this.appService.addBill(addBillDto);
    return res.status(HttpStatus.OK).json({
      message: 'Bills added successfully.',
      bills: bills,
    });
  }

  @Post('deleteBills')
  async deleteBills(@Res() res, @Body() bills: Bill[]) {
    const deletedBills = this.appService.deleteBills(bills);
    return res.status(HttpStatus.OK).json({
      message: 'Bills have been deleted.',
      bills: deletedBills,
    });
  }

  @Post('deleteBillFromMonths')
  async deleteBillFromMonths(@Res() res, @Body() bills: Bill[]) {
    const deletedBills = this.appService.deleteBillFromMonths(bills);
    return res.status(HttpStatus.OK).json({
      message: 'Bills have been deleted.',
      bills: deletedBills,
    });
  }

  @Put('updateBill')
  async updateBill(
    @Res() res,
    @Query('billID', new ValidateObjectId()) billID,
    @Body() addBillDto: AddBillDto,
  ) {
    const bill = this.appService.updateBill(billID, addBillDto);
    return res.status(HttpStatus.OK).json(bill);
  }
}
