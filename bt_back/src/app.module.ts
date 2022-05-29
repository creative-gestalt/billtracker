import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BillsSchema } from './schemas/bills.schema';

const url = '192.168.1.250';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Bill', schema: BillsSchema }]),
    MongooseModule.forRoot(`mongodb://${url}/bill-tracker`, {
      useNewUrlParser: true,
      useFindAndModify: false,
    }),
    AppModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
