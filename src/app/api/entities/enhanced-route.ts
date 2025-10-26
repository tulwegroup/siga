import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { ENHANCED_GHANA_ENTITIES, ENTITY_COUNTS } from '@/data/ghana-entities-enhanced';

export async function GET() {
  try {
    let entities;
    try {
      entities = await db.entity.findMany({
        orderBy: { name: 'asc' },
        include: {
          boardMembers: true,
          financialReports: true,
          itInfrastructure: true,
          softwareLicenses: true
        }
      });
    } catch (dbError) {
      console.warn('Database connection failed, returning fallback data:', dbError);
      entities = ENHANCED_GHANA_ENTITIES.map(entity => ({
        ...entity,
        id: entity.entityId,
        boardMembers: entity.boardMembers || [],
        financialReports: entity.financialReports || [],
        itInfrastructure: entity.itInfrastructure || [],
        softwareLicenses: entity.softwareLicenses || []
      }));
    }
    
    return NextResponse.json(entities);
  } catch (error) {
    console.error('Error fetching entities:', error);
    return NextResponse.json(ENHANCED_GHANA_ENTITIES.map(entity => ({
      ...entity,
      id: entity.entityId,
      boardMembers: entity.boardMembers || [],
      financialReports: entity.financialReports || [],
      itInfrastructure: entity.itInfrastructure || [],
      softwareLicenses: entity.softwareLicenses || []
    })));
  }
}

export async function POST() {
  try {
    // Clear existing data
    await db.entity.deleteMany();
    
    console.log(`Populating database with ${ENTITY_COUNTS.TOTAL} enhanced Ghana entities...`);
    console.log(`SOEs: ${ENTITY_COUNTS.SOES}, JVCs: ${ENTITY_COUNTS.JVCS}, OSEs: ${ENTITY_COUNTS.OSES}`);
    
    let totalCreated = 0;
    
    // Insert entities with their enhanced data
    for (const entity of ENHANCED_GHANA_ENTITIES) {
      try {
        const createdEntity = await db.entity.create({
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
            address: entity.address,
            description: entity.description,
            establishedDate: entity.establishedDate,
            
            // Create board members
            boardMembers: {
              create: entity.boardMembers.map(member => ({
                name: member.name,
                position: member.position,
                appointmentDate: member.appointmentDate,
                termEndDate: member.termEndDate,
                isChairperson: member.isChairperson,
                email: member.email,
                phone: member.phone,
                qualifications: member.qualifications,
                experience: member.experience
              }))
            },
            
            // Create financial reports
            financialReports: {
              create: entity.financialReports.map(report => ({
                year: report.year,
                quarter: report.quarter,
                reportType: report.quarter ? 'QUARTERLY' : 'ANNUAL',
                revenue: report.revenue,
                expenses: report.expenses,
                profit: report.profit,
                assets: report.assets,
                liabilities: report.liabilities,
                equity: report.equity,
                cashFlow: report.cashFlow,
                auditor: report.auditor,
                auditOpinion: report.auditOpinion
              }))
            },
            
            // Create IT infrastructure
            itInfrastructure: {
              create: entity.itInfrastructure.map(it => ({
                category: it.category as any,
                name: it.name,
                vendor: it.vendor,
                version: it.version,
                annualCost: it.annualCost,
                hasDataCenter: it.hasDataCenter,
                dataCenterLocation: it.dataCenterLocation,
                hasDisasterRecovery: it.hasDisasterRecovery,
                drLocation: it.drLocation,
                cloudProvider: it.cloudProvider,
                serverCount: it.serverCount,
                storageCapacity: it.storageCapacity,
                securityCertifications: it.securityCertifications
              }))
            },
            
            // Create software licenses
            softwareLicenses: {
              create: entity.softwareLicenses.map(license => ({
                softwareName: license.softwareName,
                vendor: license.vendor,
                licenseType: license.licenseType as any,
                licenseModel: 'SUBSCRIPTION' as any,
                totalLicenses: license.totalLicenses,
                usedLicenses: license.usedLicenses,
                annualCost: license.annualCost,
                expiryDate: license.expiryDate,
                sharable: license.sharable,
                consolidationOpportunity: license.consolidationOpportunity
              }))
            }
          }
        });
        
        totalCreated++;
        console.log(`Created entity: ${entity.name} (${entity.entityId})`);
        
      } catch (error) {
        console.error(`Error creating entity ${entity.entityId}:`, error);
      }
    }
    
    console.log(`Successfully created ${totalCreated} out of ${ENHANCED_GHANA_ENTITIES.length} entities`);
    
    return NextResponse.json({ 
      message: 'Enhanced Ghana entities database populated successfully',
      counts: ENTITY_COUNTS,
      created: totalCreated,
      attempted: ENHANCED_GHANA_ENTITIES.length
    });
  } catch (error) {
    console.error('Error creating enhanced Ghana entities:', error);
    return NextResponse.json({ error: 'Failed to create enhanced Ghana entities' }, { status: 500 });
  }
}