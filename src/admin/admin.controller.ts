import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { AnalyticsService } from './analytics.service';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '@prisma/client';

@ApiTags('Admin')
@ApiBearerAuth('JWT-auth')
@Controller('admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly analyticsService: AnalyticsService,
  ) {}

  @Get('filters')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Get filter options', description: 'Get all available filter options for admin dashboard (stores, regions, cities, brands, etc.)' })
  @ApiResponse({ status: 200, description: 'Filter options' })
  @ApiResponse({ status: 401, description: 'Unauthorized - Admin role required' })
  async getFilters() {
    return this.adminService.getFilters();
  }

  @Get('analytics/summary')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Get dashboard summary', description: 'Get summary metrics for admin dashboard (total sales, invoices, AOV, etc.)' })
  @ApiQuery({ name: 'from', required: false, type: String, description: 'Start date (YYYY-MM-DD)' })
  @ApiQuery({ name: 'to', required: false, type: String, description: 'End date (YYYY-MM-DD)' })
  @ApiQuery({ name: 'storeId', required: false, type: String, description: 'Filter by store ID' })
  @ApiResponse({ status: 200, description: 'Summary metrics' })
  async getSummary(@Query() query: any) {
    return this.analyticsService.getSummary(query);
  }

  @Get('analytics/sales-trend')
  @Roles(UserRole.ADMIN)
  async getSalesTrend(@Query() query: any) {
    return this.analyticsService.getSalesTrend(query);
  }

  @Get('analytics/brand-distribution')
  @Roles(UserRole.ADMIN)
  async getBrandDistribution(@Query() query: any) {
    return this.analyticsService.getBrandDistribution(query);
  }

  @Get('analytics/market-share')
  @Roles(UserRole.ADMIN)
  async getMarketShare(@Query() query: any) {
    return this.analyticsService.getMarketShare(query);
  }

  @Get('analytics/brands')
  @Roles(UserRole.ADMIN)
  async getBrands(@Query() query: any) {
    return this.analyticsService.getBrands(query);
  }

  @Get('analytics/top-skus')
  @Roles(UserRole.ADMIN)
  async getTopSkus(@Query() query: any) {
    return this.analyticsService.getTopSkus(query);
  }
}

