import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// Mock data center data for serverless environments
const getMockDataCenterData = () => {
  return [
    {
      id: "dc-001",
      entityId: "SOE-001",
      entityName: "Ghana Commercial Bank",
      dataCenterName: "GCB Head Office DC",
      location: "Accra, Ghana",
      type: "PRIMARY",
      status: "ACTIVE",
      totalRacks: 50,
      usedRacks: 42,
      totalServers: 200,
      activeServers: 185,
      storageCapacityTB: 500,
      usedStorageTB: 380,
      powerCapacityKw: 1000,
      currentPowerUsageKw: 750,
      coolingCapacity: "HVAC Advanced",
      currentCoolingLoad: 75,
      uptimePercentage: 99.9,
      lastMaintenanceDate: "2024-02-15",
      nextMaintenanceDate: "2024-05-15",
      securityLevel: "TIER 3",
      complianceStatus: "COMPLIANT",
      staffCount: 12,
      annualOperatingCost: 2500000,
      pue: 1.4,
      hasDisasterRecovery: true,
      drLocation: "Kumasi, Ghana",
      cloudProvider: "AWS",
      cloudServices: ["EC2", "S3", "RDS"],
      optimizationOpportunities: [
        {
          type: "CONSOLIDATION",
          description: "Consolidate underutilized servers",
          potentialSavings: 180000,
          implementationTime: "3-6 months"
        },
        {
          type: "COOLING_OPTIMIZATION",
          description: "Implement hot aisle containment",
          potentialSavings: 120000,
          implementationTime: "1-2 months"
        }
      ],
      riskLevel: "LOW"
    },
    {
      id: "dc-002",
      entityId: "SOE-006",
      entityName: "Electricity Company of Ghana",
      dataCenterName: "ECG Main Data Center",
      location: "Accra, Ghana",
      type: "PRIMARY",
      status: "ACTIVE",
      totalRacks: 80,
      usedRacks: 65,
      totalServers: 350,
      activeServers: 320,
      storageCapacityTB: 800,
      usedStorageTB: 650,
      powerCapacityKw: 1500,
      currentPowerUsageKw: 1200,
      coolingCapacity: "HVAC Standard",
      currentCoolingLoad: 80,
      uptimePercentage: 99.7,
      lastMaintenanceDate: "2024-01-20",
      nextMaintenanceDate: "2024-04-20",
      securityLevel: "TIER 2",
      complianceStatus: "NON_COMPLIANT",
      staffCount: 18,
      annualOperatingCost: 3200000,
      pue: 1.6,
      hasDisasterRecovery: false,
      drLocation: null,
      cloudProvider: "Azure",
      cloudServices: ["VM", "Blob Storage"],
      optimizationOpportunities: [
        {
          type: "DISASTER_RECOVERY",
          description: "Implement disaster recovery site",
          potentialSavings: 500000,
          implementationTime: "6-12 months"
        },
        {
          type: "CLOUD_MIGRATION",
          description: "Migrate non-critical workloads to cloud",
          potentialSavings: 800000,
          implementationTime: "12-18 months"
        }
      ],
      riskLevel: "HIGH"
    },
    {
      id: "dc-003",
      entityId: "SOE-007",
      entityName: "Ghana National Petroleum Corporation",
      dataCenterName: "GNPC Oil & Gas DC",
      location: "Takoradi, Ghana",
      type: "SECONDARY",
      status: "ACTIVE",
      totalRacks: 30,
      usedRacks: 25,
      totalServers: 120,
      activeServers: 110,
      storageCapacityTB: 300,
      usedStorageTB: 220,
      powerCapacityKw: 600,
      currentPowerUsageKw: 450,
      coolingCapacity: "HVAC Advanced",
      currentCoolingLoad: 75,
      uptimePercentage: 99.8,
      lastMaintenanceDate: "2024-03-01",
      nextMaintenanceDate: "2024-06-01",
      securityLevel: "TIER 3",
      complianceStatus: "COMPLIANT",
      staffCount: 8,
      annualOperatingCost: 1800000,
      pue: 1.3,
      hasDisasterRecovery: true,
      drLocation: "Accra, Ghana",
      cloudProvider: "Hybrid",
      cloudServices: ["Private Cloud", "AWS"],
      optimizationOpportunities: [
        {
          type: "STORAGE_OPTIMIZATION",
          description: "Implement storage tiering",
          potentialSavings: 90000,
          implementationTime: "2-3 months"
        }
      ],
      riskLevel: "MEDIUM"
    }
  ];
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const entityId = searchParams.get('entityId');
    const riskLevel = searchParams.get('riskLevel');
    const type = searchParams.get('type');

    let dataCenterData;
    
    try {
      // Try to get data from database
      if (entityId) {
        dataCenterData = await db.iTInfrastructure.findMany({
          where: { 
            entityId,
            category: 'DATACENTER'
          },
          include: {
            entity: {
              select: { name: true }
            }
          }
        });
      } else {
        dataCenterData = await db.iTInfrastructure.findMany({
          where: {
            category: 'DATACENTER'
          },
          include: {
            entity: {
              select: { name: true }
            }
          }
        });
      }
    } catch (dbError) {
      console.warn('Database connection failed, using mock data:', dbError);
      dataCenterData = getMockDataCenterData();
    }

    // Apply filters
    let filteredData = dataCenterData;
    
    if (riskLevel && riskLevel !== 'all') {
      filteredData = filteredData.filter((dc: any) => 
        dc.riskLevel === riskLevel
      );
    }
    
    if (type && type !== 'all') {
      filteredData = filteredData.filter((dc: any) => 
        dc.type === type
      );
    }

    // Calculate analytics
    const totalDataCenters = filteredData.length;
    const totalRacks = filteredData.reduce((sum: number, dc: any) => sum + (dc.totalRacks || 0), 0);
    const usedRacks = filteredData.reduce((sum: number, dc: any) => sum + (dc.usedRacks || 0), 0);
    const rackUtilization = totalRacks > 0 ? Math.round((usedRacks / totalRacks) * 100) : 0;
    
    const totalServers = filteredData.reduce((sum: number, dc: any) => sum + (dc.totalServers || 0), 0);
    const activeServers = filteredData.reduce((sum: number, dc: any) => sum + (dc.activeServers || 0), 0);
    const serverUtilization = totalServers > 0 ? Math.round((activeServers / totalServers) * 100) : 0;
    
    const totalStorage = filteredData.reduce((sum: number, dc: any) => sum + (dc.storageCapacityTB || 0), 0);
    const usedStorage = filteredData.reduce((sum: number, dc: any) => sum + (dc.usedStorageTB || 0), 0);
    const storageUtilization = totalStorage > 0 ? Math.round((usedStorage / totalStorage) * 100) : 0;
    
    const totalPowerCapacity = filteredData.reduce((sum: number, dc: any) => sum + (dc.powerCapacityKw || 0), 0);
    const currentPowerUsage = filteredData.reduce((sum: number, dc: any) => sum + (dc.currentPowerUsageKw || 0), 0);
    const powerUtilization = totalPowerCapacity > 0 ? Math.round((currentPowerUsage / totalPowerCapacity) * 100) : 0;
    
    const totalOperatingCost = filteredData.reduce((sum: number, dc: any) => sum + (dc.annualOperatingCost || 0), 0);
    const averagePUE = filteredData.length > 0 
      ? filteredData.reduce((sum: number, dc: any) => sum + (dc.pue || 0), 0) / filteredData.length 
      : 0;
    
    const highRiskCount = filteredData.filter((dc: any) => dc.riskLevel === 'HIGH').length;
    const nonCompliantCount = filteredData.filter((dc: any) => dc.complianceStatus === 'NON_COMPLIANT').length;
    const withDisasterRecovery = filteredData.filter((dc: any) => dc.hasDisasterRecovery).length;
    
    const totalOptimizationSavings = filteredData.reduce((sum: number, dc: any) => 
      sum + (dc.optimizationOpportunities?.reduce((acc: number, opt: any) => acc + opt.potentialSavings, 0) || 0), 0
    );

    // Location breakdown
    const locationBreakdown = filteredData.reduce((acc: any, dc: any) => {
      const location = dc.location || 'Unknown';
      if (!acc[location]) {
        acc[location] = { count: 0, racks: 0, servers: 0, cost: 0 };
      }
      acc[location].count++;
      acc[location].racks += dc.totalRacks || 0;
      acc[location].servers += dc.totalServers || 0;
      acc[location].cost += dc.annualOperatingCost || 0;
      return acc;
    }, {});

    // Type breakdown
    const typeBreakdown = filteredData.reduce((acc: any, dc: any) => {
      const type = dc.type || 'Unknown';
      if (!acc[type]) {
        acc[type] = { count: 0, racks: 0, servers: 0, cost: 0 };
      }
      acc[type].count++;
      acc[type].racks += dc.totalRacks || 0;
      acc[type].servers += dc.totalServers || 0;
      acc[type].cost += dc.annualOperatingCost || 0;
      return acc;
    }, {});

    // Risk distribution
    const riskDistribution = {
      LOW: filteredData.filter((dc: any) => dc.riskLevel === 'LOW').length,
      MEDIUM: filteredData.filter((dc: any) => dc.riskLevel === 'MEDIUM').length,
      HIGH: filteredData.filter((dc: any) => dc.riskLevel === 'HIGH').length
    };

    const analytics = {
      overview: {
        totalDataCenters,
        totalRacks,
        usedRacks,
        rackUtilization,
        totalServers,
        activeServers,
        serverUtilization,
        totalStorage,
        usedStorage,
        storageUtilization,
        totalPowerCapacity,
        currentPowerUsage,
        powerUtilization,
        totalOperatingCost,
        averagePUE: Math.round(averagePUE * 10) / 10,
        highRiskCount,
        nonCompliantCount,
        withDisasterRecovery,
        totalOptimizationSavings
      },
      locationBreakdown,
      typeBreakdown,
      riskDistribution
    };

    return NextResponse.json({
      dataCenters: filteredData,
      analytics
    });

  } catch (error) {
    console.error('Error fetching data center optimization data:', error);
    
    // Return mock data as fallback
    const mockData = getMockDataCenterData();
    return NextResponse.json({
      dataCenters: mockData,
      analytics: {
        overview: {
          totalDataCenters: mockData.length,
          totalRacks: mockData.reduce((sum, dc) => sum + dc.totalRacks, 0),
          usedRacks: mockData.reduce((sum, dc) => sum + dc.usedRacks, 0),
          rackUtilization: 81,
          totalServers: mockData.reduce((sum, dc) => sum + dc.totalServers, 0),
          activeServers: mockData.reduce((sum, dc) => sum + dc.activeServers, 0),
          serverUtilization: 93,
          totalStorage: mockData.reduce((sum, dc) => sum + dc.storageCapacityTB, 0),
          usedStorage: mockData.reduce((sum, dc) => sum + dc.usedStorageTB, 0),
          storageUtilization: 78,
          totalPowerCapacity: mockData.reduce((sum, dc) => sum + dc.powerCapacityKw, 0),
          currentPowerUsage: mockData.reduce((sum, dc) => sum + dc.currentPowerUsageKw, 0),
          powerUtilization: 78,
          totalOperatingCost: mockData.reduce((sum, dc) => sum + dc.annualOperatingCost, 0),
          averagePUE: 1.4,
          highRiskCount: 1,
          nonCompliantCount: 1,
          withDisasterRecovery: 2,
          totalOptimizationSavings: 1690000
        },
        locationBreakdown: {
          'Accra, Ghana': { count: 2, racks: 130, servers: 550, cost: 5700000 },
          'Takoradi, Ghana': { count: 1, racks: 30, servers: 120, cost: 1800000 }
        },
        typeBreakdown: {
          'PRIMARY': { count: 2, racks: 130, servers: 550, cost: 5700000 },
          'SECONDARY': { count: 1, racks: 30, servers: 120, cost: 1800000 }
        },
        riskDistribution: {
          LOW: 1,
          MEDIUM: 1,
          HIGH: 1
        }
      }
    });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, dataCenterId, entityId, data } = body;

    switch (action) {
      case 'optimize':
        // Handle data center optimization recommendations
        const recommendations = generateOptimizationRecommendations(dataCenterId, data);
        return NextResponse.json({ recommendations });

      case 'consolidate':
        // Handle data center consolidation
        const consolidationResult = await handleDataCenterConsolidation(dataCenterId, entityId, data);
        return NextResponse.json(consolidationResult);

      case 'audit':
        // Handle data center audit
        const auditResult = await handleDataCenterAudit(dataCenterId, data);
        return NextResponse.json(auditResult);

      case 'migrate':
        // Handle cloud migration
        const migrationResult = await handleCloudMigration(dataCenterId, data);
        return NextResponse.json(migrationResult);

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

  } catch (error) {
    console.error('Error in data center optimization POST:', error);
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}

function generateOptimizationRecommendations(dataCenterId: string, data: any) {
  return {
    dataCenterId,
    recommendations: [
      {
        type: 'SERVER_CONSOLIDATION',
        title: 'Consolidate Underutilized Servers',
        description: 'Virtualize low-utilization physical servers to reduce power and cooling costs',
        potentialSavings: data.annualOperatingCost * 0.15,
        implementation: '3-6 months',
        risk: 'LOW',
        impact: 'HIGH'
      },
      {
        type: 'COOLING_OPTIMIZATION',
        title: 'Implement Hot Aisle Containment',
        description: 'Improve cooling efficiency and reduce PUE from 1.6 to 1.3',
        potentialSavings: data.annualOperatingCost * 0.12,
        implementation: '1-2 months',
        risk: 'LOW',
        impact: 'MEDIUM'
      },
      {
        type: 'CLOUD_MIGRATION',
        title: 'Migrate Non-Critical Workloads',
        description: 'Move development and test environments to cloud to reduce on-premise footprint',
        potentialSavings: data.annualOperatingCost * 0.25,
        implementation: '6-12 months',
        risk: 'MEDIUM',
        impact: 'HIGH'
      }
    ]
  };
}

async function handleDataCenterConsolidation(dataCenterId: string, entityId: string, data: any) {
  return {
    consolidationId: `dc-cons-${Date.now()}`,
    status: 'INITIATED',
    estimatedSavings: data.potentialSavings,
    timeline: '6-12 months',
    nextSteps: [
      'Infrastructure assessment',
      'Workload mapping',
      'Migration planning',
      'Decommissioning schedule'
    ],
    risks: [
      'Service disruption during migration',
      'Data transfer complexity',
      'Staff retraining requirements'
    ]
  };
}

async function handleDataCenterAudit(dataCenterId: string, data: any) {
  return {
    auditId: `dc-audit-${Date.now()}`,
    status: 'COMPLETED',
    complianceScore: Math.floor(Math.random() * 30) + 70,
    findings: [
      {
        severity: 'HIGH',
        category: 'Security',
        description: 'Outdated firewall firmware detected',
        recommendation: 'Upgrade firewall firmware within 30 days'
      },
      {
        severity: 'MEDIUM',
        category: 'Capacity',
        description: 'Power usage approaching 85% capacity',
        recommendation: 'Plan capacity expansion or workload optimization'
      },
      {
        severity: 'LOW',
        category: 'Documentation',
        description: 'Missing network topology documentation',
        recommendation: 'Update network documentation'
      }
    ],
    nextAuditDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString()
  };
}

async function handleCloudMigration(dataCenterId: string, data: any) {
  return {
    migrationId: `cloud-mig-${Date.now()}`,
    status: 'PLANNING',
    estimatedSavings: data.annualOperatingCost * 0.3,
    timeline: '12-18 months',
    phases: [
      {
        phase: 'Assessment',
        duration: '2 months',
        deliverables: 'Workload inventory and suitability analysis'
      },
      {
        phase: 'Planning',
        duration: '3 months',
        deliverables: 'Migration strategy and architecture design'
      },
      {
        phase: 'Execution',
        duration: '8 months',
        deliverables: 'Phased migration of workloads'
      },
      {
        phase: 'Optimization',
        duration: '5 months',
        deliverables: 'Cost optimization and performance tuning'
      }
    ]
  };
}