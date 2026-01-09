import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Headers,
  Res,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { Response } from 'express';
import { PosService } from './pos.service';
import { ScanDto } from './dto/scan.dto';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '@prisma/client';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import * as fs from 'fs';
import * as path from 'path';

@ApiTags('POS')
@ApiBearerAuth('JWT-auth')
@Controller('pos')
export class PosController {
  constructor(private readonly posService: PosService) {}

  @Post('scan')
  @Roles(UserRole.SALES, UserRole.ADMIN)
  @ApiOperation({ summary: 'Scan product QR code', description: 'Scan QR code (SKU) and get product details with available stock' })
  @ApiResponse({ status: 200, description: 'Product found' })
  @ApiResponse({ status: 400, description: 'Invalid request' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  async scan(@Body() scanDto: ScanDto, @CurrentUser() user: any) {
    return this.posService.scanProduct(scanDto.storeId, scanDto.qrValue);
  }

  @Post('invoices')
  @Roles(UserRole.SALES, UserRole.ADMIN)
  @ApiOperation({ 
    summary: 'Create invoice', 
    description: 'Create a new invoice with items. This is a transactional operation that validates store, worker, locks inventory, checks stock, creates invoice, updates inventory, generates PDF, and emits WebSocket events.' 
  })
  @ApiResponse({ status: 201, description: 'Invoice created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid request or insufficient stock' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async createInvoice(
    @Body() createInvoiceDto: CreateInvoiceDto,
    @Headers('idempotency-key') idempotencyKey: string,
    @CurrentUser() user: any,
  ) {
    // Validate worker permissions
    if (user.id !== createInvoiceDto.workerId && user.role !== UserRole.ADMIN) {
      throw new Error('Unauthorized: Worker ID does not match current user');
    }

    return this.posService.createInvoice(createInvoiceDto, idempotencyKey);
  }

  @Get('invoices/:id')
  @Roles(UserRole.SALES, UserRole.ADMIN, UserRole.INVENTORY)
  @ApiOperation({ summary: 'Get invoice details', description: 'Retrieve full invoice details including all items' })
  @ApiParam({ name: 'id', description: 'Invoice ID', type: String })
  @ApiResponse({ status: 200, description: 'Invoice found' })
  @ApiResponse({ status: 404, description: 'Invoice not found' })
  async getInvoice(@Param('id') id: string) {
    return this.posService.getInvoice(id);
  }

  @Get('invoices/:id/pdf')
  @Roles(UserRole.SALES, UserRole.ADMIN, UserRole.INVENTORY)
  @ApiOperation({ summary: 'Get invoice PDF', description: 'Download invoice PDF file' })
  @ApiParam({ name: 'id', description: 'Invoice ID', type: String })
  @ApiResponse({ status: 200, description: 'PDF file', content: { 'application/pdf': {} } })
  @ApiResponse({ status: 404, description: 'PDF not found' })
  async getInvoicePdf(@Param('id') id: string, @Res() res: Response) {
    const invoice = await this.posService.getInvoice(id);
    
    if (!invoice.pdfUrl) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: 'PDF not found' });
    }

    const filePath = path.join(process.cwd(), invoice.pdfUrl);
    
    if (!fs.existsSync(filePath)) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: 'PDF file not found' });
    }

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `inline; filename="invoice-${id}.pdf"`);
    
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
  }
}

