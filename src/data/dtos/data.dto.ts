import { ApiProperty } from "@nestjs/swagger";

export class Data {
  date: string;
  income: number;
  type: string;
  name: string;
  account: string;
}

export class CreateData {
  @ApiProperty({
    required: true
  })
  readonly path: string;
}