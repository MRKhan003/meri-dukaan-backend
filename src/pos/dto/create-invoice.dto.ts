import { IsArray, IsInt, IsOptional, IsString, IsUUID, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class InvoiceItemDto {
  @ApiProperty({
    example: 'abc-123-def-456-ghi',
    description: 'Product UUID',
  })
  @IsUUID()
  productId: string;

  @ApiProperty({
    example: 5,
    description: 'Quantity to purchase',
    minimum: 1,
  })
  @IsInt()
  @Min(1)
  qty: number;
}

export class CreateInvoiceDto {
  @ApiProperty({
    example: '4158f662-9e15-42ef-9c4e-345b9465693c',
    description: 'Store UUID',
  })
  @IsUUID()
  storeId: string;

  @ApiProperty({
    example: 'e8e79c5a-016d-49ef-9186-7eb34583762e',
    description: 'Worker UUID (must be SALES user)',
  })
  @IsUUID()
  workerId: string;

  @ApiProperty({
    type: [InvoiceItemDto],
    example: [
      {
        productId: 'abc-123-def-456-ghi',
        qty: 5,
      },
    ],
    description: 'Array of invoice items',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => InvoiceItemDto)
  items: InvoiceItemDto[];

  @ApiProperty({
    example: 'INV-2026-001',
    description: 'Optional client invoice reference',
    required: false,
  })
  @IsOptional()
  @IsString()
  clientInvoiceRef?: string;
}

