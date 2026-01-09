import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class InventoryService {
  constructor(private prisma: PrismaService) {}

  async getInventoryByStore(storeId: string) {
    return this.prisma.inventory.findMany({
      where: { storeId },
      include: {
        product: {
          include: {
            brand: true,
            category: true,
          },
        },
      },
    });
  }

  async getInventoryByProduct(productId: string) {
    return this.prisma.inventory.findMany({
      where: { productId },
      include: {
        store: true,
      },
    });
  }

  async getInventoryMovements(filters: {
    storeId?: string;
    productId?: string;
    from?: Date;
    to?: Date;
  }) {
    return this.prisma.inventoryMovement.findMany({
      where: {
        ...(filters.storeId && { storeId: filters.storeId }),
        ...(filters.productId && { productId: filters.productId }),
        ...(filters.from || filters.to
          ? {
              createdAt: {
                ...(filters.from && { gte: filters.from }),
                ...(filters.to && { lte: filters.to }),
              },
            }
          : {}),
      },
      include: {
        product: true,
        store: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }
}

