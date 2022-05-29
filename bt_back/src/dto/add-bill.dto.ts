export class AddBillDto {
  readonly month: number;
  readonly day: number;
  readonly name: string;
  readonly amount: string;
  readonly paid: boolean;
  readonly reference: string;
  readonly year: string;
}
