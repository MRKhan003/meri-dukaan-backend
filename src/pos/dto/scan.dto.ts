import { IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ScanDto {
  @ApiProperty({
    example: '4158f662-9e15-42ef-9c4e-345b9465693c',
    description: 'Store UUID',
  })
  @IsUUID()
  storeId: string;

  @ApiProperty({
    example: 'COKE-330ML',
    description: 'QR code value (Product SKU)',
  })
  @IsString()
  qrValue: string;
}

