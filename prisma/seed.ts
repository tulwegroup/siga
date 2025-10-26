import { PrismaClient } from '@prisma/client';
import { ALL_GHANA_ENTITIES } from '../src/data/ghana-entities';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Clear existing entities
  await prisma.entity.deleteMany();
  console.log('🗑️  Cleared existing entities');

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

  console.log(`📝 Prepared ${entitiesToInsert.length} entities for insertion`);

  // Insert entities in batches
  const batchSize = 50;
  for (let i = 0; i < entitiesToInsert.length; i += batchSize) {
    const batch = entitiesToInsert.slice(i, i + batchSize);
    await prisma.entity.createMany({
      data: batch
    });
    console.log(`✅ Inserted batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(entitiesToInsert.length / batchSize)}`);
  }

  console.log(`🎉 Successfully seeded ${entitiesToInsert.length} Ghana entities!`);
  
  // Log summary
  const totalEntities = await prisma.entity.count();
  const soeCount = await prisma.entity.count({ where: { category: 'SOE' } });
  const jvcCount = await prisma.entity.count({ where: { category: 'JVC' } });
  const oseCount = await prisma.entity.count({ where: { category: 'OSE' } });
  
  console.log('\n📊 Database Summary:');
  console.log(`   Total Entities: ${totalEntities}`);
  console.log(`   SOEs: ${soeCount}`);
  console.log(`   JVCs: ${jvcCount}`);
  console.log(`   OSEs: ${oseCount}`);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });