import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { ALL_GHANA_ENTITIES, ENTITY_COUNTS } from '@/data/ghana-entities';

export async function GET() {
  try {
    const entities = await db.entity.findMany({
      orderBy: { name: 'asc' }
    });
    
    return NextResponse.json(entities);
  } catch (error) {
    console.error('Error fetching entities:', error);
    return NextResponse.json({ error: 'Failed to fetch entities' }, { status: 500 });
  }
}

export async function POST() {
  try {
    // Clear existing entities
    await db.entity.deleteMany();
    
    console.log(`Populating database with ${ENTITY_COUNTS.TOTAL} Ghana entities...`);
    console.log(`SOEs: ${ENTITY_COUNTS.SOES}, JVCs: ${ENTITY_COUNTS.JVCS}, OSEs: ${ENTITY_COUNTS.OSES}`);
    
    // Insert all Ghana entities in batches to avoid overwhelming the database
    const batchSize = 50;
    const batches = [];
    
    for (let i = 0; i < ALL_GHANA_ENTITIES.length; i += batchSize) {
      batches.push(ALL_GHANA_ENTITIES.slice(i, i + batchSize));
    }
    
    let totalCreated = 0;
    
    for (const batch of batches) {
      const createdEntities = await Promise.all(
        batch.map(async (entity) => {
          try {
            return await db.entity.create({
              data: {
                entityId: entity.entityId,
                name: entity.name,
                category: entity.category,
                sector: entity.sector,
                parentMinistry: entity.parentMinistry,
                status: entity.status,
                contactEmail: entity.contactEmail,
                contactPhone: entity.contactPhone,
                website: entity.website,
                description: entity.description,
                establishedDate: entity.establishedDate
              }
            });
          } catch (error) {
            console.error(`Error creating entity ${entity.entityId}:`, error);
            return null;
          }
        })
      );
      
      const validEntities = createdEntities.filter(entity => entity !== null);
      totalCreated += validEntities.length;
      
      console.log(`Batch completed: ${validEntities.length}/${batch.length} entities created`);
    }
    
    console.log(`Successfully created ${totalCreated} out of ${ALL_GHANA_ENTITIES.length} entities`);
    
    return NextResponse.json({ 
      message: 'Ghana entities database populated successfully',
      counts: ENTITY_COUNTS,
      created: totalCreated,
      attempted: ALL_GHANA_ENTITIES.length
    });
  } catch (error) {
    console.error('Error creating Ghana entities:', error);
    return NextResponse.json({ error: 'Failed to create Ghana entities' }, { status: 500 });
  }
}