import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { ALL_GHANA_ENTITIES } from '@/data/ghana-entities';

async function initializeDatabase() {
  try {
    const existingCount = await db.entity.count();
    
    if (existingCount === 0) {
      console.log('🌱 Initializing database with Ghana entities...');
      
      // Transform and insert entities
      const entitiesToInsert = ALL_GHANA_ENTITIES.map(entity => ({
        entityId: entity.entityId,
        name: entity.name,
        category: entity.category,
        sector: entity.sector,
        parentMinistry: entity.parentMinistry,
        status: entity.status,
        contactEmail: entity.contactEmail || null,
        contactPhone: entity.contactPhone || null,
        website: entity.website || null,
        address: entity.address || null,
        description: entity.description || null,
        establishedDate: entity.establishedDate || null,
        lastUpdated: new Date(),
        createdAt: new Date()
      }));

      // Insert entities in batches
      const batchSize = 50;
      for (let i = 0; i < entitiesToInsert.length; i += batchSize) {
        const batch = entitiesToInsert.slice(i, i + batchSize);
        await db.entity.createMany({
          data: batch
        });
      }
      
      console.log(`✅ Database initialized with ${entitiesToInsert.length} entities`);
    }
  } catch (error) {
    console.error('Database initialization failed:', error);
    // In serverless environments, the database might not be available
    // We'll fall back to in-memory data
  }
}

function getInMemoryDashboardData() {
  // Calculate entity counts by category
  const entityCounts = ALL_GHANA_ENTITIES.reduce((acc, entity) => {
    const existing = acc.find(item => item.category === entity.category);
    if (existing) {
      existing._count.id += 1;
    } else {
      acc.push({
        category: entity.category,
        _count: { id: 1 }
      });
    }
    return acc;
  }, [] as { category: string; _count: { id: number } }[]);

  // Calculate sector distribution
  const sectorCounts = ALL_GHANA_ENTITIES.reduce((acc, entity) => {
    const existing = acc.find(item => item.sector === entity.sector);
    if (existing) {
      existing._count.id += 1;
    } else {
      acc.push({
        sector: entity.sector,
        _count: { id: 1 }
      });
    }
    return acc;
  }, [] as { sector: string; _count: { id: number } }[]);

  // Calculate status distribution
  const statusCounts = ALL_GHANA_ENTITIES.reduce((acc, entity) => {
    const existing = acc.find(item => item.status === entity.status);
    if (existing) {
      existing._count.id += 1;
    } else {
      acc.push({
        status: entity.status,
        _count: { id: 1 }
      });
    }
    return acc;
  }, [] as { status: string; _count: { id: number } }[]);

  return {
    overview: {
      totalEntities: ALL_GHANA_ENTITIES.length,
      entityCounts,
      sectorCounts,
      statusCounts
    },
    risk: {
      low: 30,
      medium: 45,
      high: 20,
      critical: 5
    },
    compliance: {
      compliant: 65,
      pending: 20,
      overdue: 10,
      nonCompliant: 5
    },
    portfolio: {
      totalAssets: 45600000000,
      totalRevenue: 8900000000,
      totalEmployees: 125000,
      dividendOwed: 340000000,
      guaranteesOutstanding: 2100000000
    }
  };
}

export async function GET() {
  try {
    // Try to initialize and use database
    await initializeDatabase();

    // Try to get data from database
    try {
      const entityCounts = await db.entity.groupBy({
        by: ['category'],
        _count: {
          id: true
        }
      });

      const sectorCounts = await db.entity.groupBy({
        by: ['sector'],
        _count: {
          id: true
        }
      });

      const statusCounts = await db.entity.groupBy({
        by: ['status'],
        _count: {
          id: true
        }
      });

      const totalEntities = await db.entity.count();

      const dashboardData = {
        overview: {
          totalEntities,
          entityCounts,
          sectorCounts,
          statusCounts
        },
        risk: {
          low: 30,
          medium: 45,
          high: 20,
          critical: 5
        },
        compliance: {
          compliant: 65,
          pending: 20,
          overdue: 10,
          nonCompliant: 5
        },
        portfolio: {
          totalAssets: 45600000000,
          totalRevenue: 8900000000,
          totalEmployees: 125000,
          dividendOwed: 340000000,
          guaranteesOutstanding: 2100000000
        }
      };

      return NextResponse.json(dashboardData);
    } catch (dbError) {
      console.error('Database query failed, using in-memory data:', dbError);
      // Fallback to in-memory data
      const dashboardData = getInMemoryDashboardData();
      return NextResponse.json(dashboardData);
    }
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    // Final fallback to in-memory data
    const dashboardData = getInMemoryDashboardData();
    return NextResponse.json(dashboardData);
  }
}