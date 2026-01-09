import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async getFilters() {
    const [regions, cities, stores, categories, manufacturers, brands] = await Promise.all([
      this.prisma.store.findMany({
        select: { region: true },
        distinct: ['region'],
      }),
      this.prisma.store.findMany({
        select: { city: true },
        distinct: ['city'],
      }),
      this.prisma.store.findMany({
        select: { id: true, name: true, region: true, city: true },
      }),
      this.prisma.category.findMany({
        select: { id: true, name: true, parentId: true },
      }),
      this.prisma.manufacturer.findMany({
        select: { id: true, name: true },
      }),
      this.prisma.brand.findMany({
        include: {
          manufacturer: {
            select: { name: true },
          },
        },
      }),
    ]);

    return {
      regions: regions.map((r) => r.region),
      cities: cities.map((c) => c.city),
      stores: stores.map((s) => ({
        id: s.id,
        name: s.name,
        region: s.region,
        city: s.city,
      })),
      categories: categories.map((c) => ({
        id: c.id,
        name: c.name,
        parentId: c.parentId,
      })),
      manufacturers: manufacturers.map((m) => ({
        id: m.id,
        name: m.name,
      })),
      brands: brands.map((b) => ({
        id: b.id,
        name: b.name,
        manufacturerId: b.manufacturerId,
        manufacturerName: b.manufacturer.name,
      })),
    };
  }
}

