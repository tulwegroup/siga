import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { ALL_GHANA_ENTITIES } from '@/data/ghana-entities';

export async function POST() {
  try {
    // Check if database is already populated
    const existingCount = await db.entity.count();
    
    if (existingCount > 0) {
      return NextResponse.json({ 
        message: 'Database already initialized',
        count: existingCount 
      });
    }

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
    let insertedCount = 0;
    
    for (let i = 0; i < entitiesToInsert.length; i += batchSize) {
      const batch = entitiesToInsert.slice(i, i + batchSize);
      await db.entity.createMany({
        data: batch
      });
      insertedCount += batch.length;
    }

    // Get final counts
    const totalEntities = await db.entity.count();
    const soeCount = await db.entity.count({ where: { category: 'SOE' } });
    const jvcCount = await db.entity.count({ where: { category: 'JVC' } });
    const oseCount = await db.entity.count({ where: { category: 'OSE' } });

    return NextResponse.json({
      message: 'Database initialized successfully',
      summary: {
        totalEntities,
        soeCount,
        jvcCount,
        oseCount,
        insertedCount
      }
    });

  } catch (error) {
    console.error('Error initializing database:', error);
    return NextResponse.json({ 
      error: 'Failed to initialize database' 
    }, { status: 500 });
  }
}

export async function GET() {
  try {
    const totalEntities = await db.entity.count();
    const soeCount = await db.entity.count({ where: { category: 'SOE' } });
    const jvcCount = await db.entity.count({ where: { category: 'JVC' } });
    const oseCount = await db.entity.count({ where: { category: 'OSE' } });

    return NextResponse.json({
      initialized: totalEntities > 0,
      summary: {
        totalEntities,
        soeCount,
        jvcCount,
        oseCount
      }
    });
  } catch (error) {
    console.error('Error checking database status:', error);
    return NextResponse.json({ 
      error: 'Failed to check database status' 
    }, { status: 500 });
  }
}