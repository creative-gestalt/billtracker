export interface Bill {
  _id: string;
  month: number;
  name: string;
  day: number;
  amount: string;
  paid: boolean;
  reference: string;
  year: string;
}

export interface Complete {
  name: string;
  complete: boolean;
}
