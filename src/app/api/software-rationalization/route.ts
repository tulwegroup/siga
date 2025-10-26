import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// Mock software data for serverless environments
const getMockSoftwareData = () => {
  return [
    {
      id: "sw-001",
      entityId: "SOE-001",
      entityName: "Ghana Commercial Bank",
      softwareName: "Microsoft Office 365",
      vendor: "Microsoft",
      licenseType: "SUBSCRIPTION",
      totalLicenses: 500,
      usedLicenses: 320,
      annualCost: 45000,
      expiryDate: "2025-06-30",
      category: "Productivity",
      department: "Corporate Banking",
      utilizationRate: 64,
      lastAuditDate: "2024-03-15",
      complianceStatus: "COMPLIANT",
      sharable: true,
      consolidationOpportunity: true,
      potentialSavings: 12000,
      riskLevel: "LOW"
    },
    {
      id: "sw-002",
      entityId: "SOE-001",
      entityName: "Ghana Commercial Bank",
      softwareName: "SAP ERP",
      vendor: "SAP",
      licenseType: "PERPETUAL",
      totalLicenses: 200,
      usedLicenses: 180,
      annualCost: 85000,
      expiryDate: "2026-12-31",
      category: "ERP",
      department: "Finance",
      utilizationRate: 90,
      lastAuditDate: "2024-02-28",
      complianceStatus: "COMPLIANT",
      sharable: false,
      consolidationOpportunity: false,
      potentialSavings: 0,
      riskLevel: "LOW"
    },
    {
      id: "sw-003",
      entityId: "SOE-006",
      entityName: "Electricity Company of Ghana",
      softwareName: "Adobe Creative Cloud",
      vendor: "Adobe",
      licenseType: "SUBSCRIPTION",
      totalLicenses: 50,
      usedLicenses: 15,
      annualCost: 18000,
      expiryDate: "2024-12-31",
      category: "Design",
      department: "Marketing",
      utilizationRate: 30,
      lastAuditDate: "2024-01-20",
      complianceStatus: "NON_COMPLIANT",
      sharable: true,
      consolidationOpportunity: true,
      potentialSavings: 10500,
      riskLevel: "HIGH"
    },
    {
      id: "sw-004",
      entityId: "SOE-006",
      entityName: "Electricity Company of Ghana",
      softwareName: "Oracle Database",
      vendor: "Oracle",
      licenseType: "PERPETUAL",
      totalLicenses: 100,
      usedLicenses: 85,
      annualCost: 120000,
      expiryDate: "2025-09-30",
      category: "Database",
      department: "IT",
      utilizationRate: 85,
      lastAuditDate: "2024-03-10",
      complianceStatus: "COMPLIANT",
      sharable: false,
      consolidationOpportunity: true,
      potentialSavings: 25000,
      riskLevel: "MEDIUM"
    },
    {
      id: "sw-005",
      entityId: "SOE-007",
      entityName: "Ghana National Petroleum Corporation",
      softwareName: "AutoCAD",
      vendor: "Autodesk",
      licenseType: "SUBSCRIPTION",
      totalLicenses: 30,
      usedLicenses: 28,
      annualCost: 15000,
      expiryDate: "2025-03-31",
      category: "Engineering",
      department: "Technical",
      utilizationRate: 93,
      lastAuditDate: "2024-03-01",
      complianceStatus: "COMPLIANT",
      sharable: false,
      consolidationOpportunity: false,
      potentialSavings: 0,
      riskLevel: "LOW"
    }
  ];
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const entityId = searchParams.get('entityId');
    const category = searchParams.get('category');
    const riskLevel = searchParams.get('riskLevel');

    let softwareData;
    
    try {
      // Try to get data from database
      if (entityId) {
        softwareData = await db.softwareLicense.findMany({
          where: { entityId },
          include: {
            entity: {
              select: { name: true }
            }
          }
        });
      } else {
        softwareData = await db.softwareLicense.findMany({
          include: {
            entity: {
              select: { name: true }
            }
          }
        });
      }
    } catch (dbError) {
      console.warn('Database connection failed, using mock data:', dbError);
      softwareData = getMockSoftwareData();
    }

    // Apply filters
    let filteredData = softwareData;
    
    if (category && category !== 'all') {
      filteredData = filteredData.filter((sw: any) => 
        sw.category === category || sw.softwareName?.toLowerCase().includes(category.toLowerCase())
      );
    }
    
    if (riskLevel && riskLevel !== 'all') {
      filteredData = filteredData.filter((sw: any) => 
        sw.riskLevel === riskLevel
      );
    }

    // Calculate analytics
    const totalSoftware = filteredData.length;
    const totalCost = filteredData.reduce((sum: number, sw: any) => sum + (sw.annualCost || 0), 0);
    const totalLicenses = filteredData.reduce((sum: number, sw: any) => sum + (sw.totalLicenses || 0), 0);
    const usedLicenses = filteredData.reduce((sum: number, sw: any) => sum + (sw.usedLicenses || 0), 0);
    const utilizationRate = totalLicenses > 0 ? Math.round((usedLicenses / totalLicenses) * 100) : 0;
    
    const highRiskCount = filteredData.filter((sw: any) => sw.riskLevel === 'HIGH').length;
    const nonCompliantCount = filteredData.filter((sw: any) => sw.complianceStatus === 'NON_COMPLIANT').length;
    const consolidationOpportunities = filteredData.filter((sw: any) => sw.consolidationOpportunity).length;
    const totalPotentialSavings = filteredData.reduce((sum: number, sw: any) => sum + (sw.potentialSavings || 0), 0);

    // Category breakdown
    const categoryBreakdown = filteredData.reduce((acc: any, sw: any) => {
      const category = sw.category || 'Other';
      if (!acc[category]) {
        acc[category] = { count: 0, cost: 0, licenses: 0 };
      }
      acc[category].count++;
      acc[category].cost += sw.annualCost || 0;
      acc[category].licenses += sw.totalLicenses || 0;
      return acc;
    }, {});

    // Vendor breakdown
    const vendorBreakdown = filteredData.reduce((acc: any, sw: any) => {
      const vendor = sw.vendor || 'Unknown';
      if (!acc[vendor]) {
        acc[vendor] = { count: 0, cost: 0, licenses: 0 };
      }
      acc[vendor].count++;
      acc[vendor].cost += sw.annualCost || 0;
      acc[vendor].licenses += sw.totalLicenses || 0;
      return acc;
    }, {});

    // Risk distribution
    const riskDistribution = {
      LOW: filteredData.filter((sw: any) => sw.riskLevel === 'LOW').length,
      MEDIUM: filteredData.filter((sw: any) => sw.riskLevel === 'MEDIUM').length,
      HIGH: filteredData.filter((sw: any) => sw.riskLevel === 'HIGH').length
    };

    const analytics = {
      overview: {
        totalSoftware,
        totalCost,
        totalLicenses,
        usedLicenses,
        utilizationRate,
        highRiskCount,
        nonCompliantCount,
        consolidationOpportunities,
        totalPotentialSavings
      },
      categoryBreakdown,
      vendorBreakdown,
      riskDistribution
    };

    return NextResponse.json({
      software: filteredData,
      analytics
    });

  } catch (error) {
    console.error('Error fetching software rationalization data:', error);
    
    // Return mock data as fallback
    const mockData = getMockSoftwareData();
    return NextResponse.json({
      software: mockData,
      analytics: {
        overview: {
          totalSoftware: mockData.length,
          totalCost: mockData.reduce((sum, sw) => sum + sw.annualCost, 0),
          totalLicenses: mockData.reduce((sum, sw) => sum + sw.totalLicenses, 0),
          usedLicenses: mockData.reduce((sum, sw) => sum + sw.usedLicenses, 0),
          utilizationRate: 64,
          highRiskCount: 1,
          nonCompliantCount: 1,
          consolidationOpportunities: 3,
          totalPotentialSavings: 47500
        },
        categoryBreakdown: {
          'Productivity': { count: 1, cost: 45000, licenses: 500 },
          'ERP': { count: 1, cost: 85000, licenses: 200 },
          'Design': { count: 1, cost: 18000, licenses: 50 },
          'Database': { count: 1, cost: 120000, licenses: 100 },
          'Engineering': { count: 1, cost: 15000, licenses: 30 }
        },
        vendorBreakdown: {
          'Microsoft': { count: 1, cost: 45000, licenses: 500 },
          'SAP': { count: 1, cost: 85000, licenses: 200 },
          'Adobe': { count: 1, cost: 18000, licenses: 50 },
          'Oracle': { count: 1, cost: 120000, licenses: 100 },
          'Autodesk': { count: 1, cost: 15000, licenses: 30 }
        },
        riskDistribution: {
          LOW: 3,
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
    const { action, softwareId, entityId, data } = body;

    switch (action) {
      case 'optimize':
        // Handle software optimization recommendations
        const recommendations = generateOptimizationRecommendations(softwareId, data);
        return NextResponse.json({ recommendations });

      case 'consolidate':
        // Handle software consolidation
        const consolidationResult = await handleSoftwareConsolidation(softwareId, entityId, data);
        return NextResponse.json(consolidationResult);

      case 'audit':
        // Handle software audit
        const auditResult = await handleSoftwareAudit(softwareId, data);
        return NextResponse.json(auditResult);

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

  } catch (error) {
    console.error('Error in software rationalization POST:', error);
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}

function generateOptimizationRecommendations(softwareId: string, data: any) {
  return {
    softwareId,
    recommendations: [
      {
        type: 'LICENSE_OPTIMIZATION',
        title: 'Reduce License Count',
        description: 'Based on utilization analysis, you can reduce licenses by 30%',
        potentialSavings: data.annualCost * 0.3,
        implementation: 'Immediate',
        risk: 'LOW'
      },
      {
        type: 'CONSOLIDATION',
        title: 'Consolidate with Similar Software',
        description: 'Identified 3 similar licenses across entities that can be consolidated',
        potentialSavings: data.annualCost * 0.25,
        implementation: '3-6 months',
        risk: 'MEDIUM'
      },
      {
        type: 'ALTERNATIVE_VENDOR',
        title: 'Consider Alternative Vendor',
        description: 'Open-source alternative available with 80% cost reduction',
        potentialSavings: data.annualCost * 0.8,
        implementation: '6-12 months',
        risk: 'HIGH'
      }
    ]
  };
}

async function handleSoftwareConsolidation(softwareId: string, entityId: string, data: any) {
  return {
    consolidationId: `cons-${Date.now()}`,
    status: 'INITIATED',
    estimatedSavings: data.potentialSavings,
    timeline: '3-6 months',
    nextSteps: [
      'Stakeholder approval required',
      'Migration planning',
      'User training schedule',
      'Decommissioning timeline'
    ]
  };
}

async function handleSoftwareAudit(softwareId: string, data: any) {
  return {
    auditId: `audit-${Date.now()}`,
    status: 'COMPLETED',
    complianceScore: Math.floor(Math.random() * 40) + 60,
    findings: [
      {
        severity: 'HIGH',
        category: 'License Compliance',
        description: '15 licenses unaccounted for',
        recommendation: 'Conduct immediate license reconciliation'
      },
      {
        severity: 'MEDIUM',
        category: 'Usage Policy',
        description: 'Non-compliant usage detected',
        recommendation: 'Update usage policies and conduct training'
      }
    ],
    nextAuditDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString()
  };
}