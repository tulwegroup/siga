import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// Mock procurement data for serverless environments
const getMockProcurementData = () => {
  return [
    {
      id: "proc-001",
      entityId: "SOE-001",
      entityName: "Ghana Commercial Bank",
      procurementId: "GCB-2024-001",
      title: "Banking Software License Renewal",
      category: "SOFTWARE",
      vendor: "Microsoft",
      value: 450000,
      currency: "GHS",
      procurementMethod: "DIRECT",
      status: "AWARDED",
      awardDate: "2024-01-15",
      contractStartDate: "2024-02-01",
      contractEndDate: "2025-01-31",
      description: "Annual renewal of Microsoft Office 365 licenses for corporate banking operations",
      evaluationCriteria: ["Technical Compliance", "Price", "Vendor Reputation", "Support Quality"],
      complianceScore: 85,
      riskLevel: "LOW",
      procurementOfficer: "Kwame Asante",
      department: "IT",
      justification: "Critical software for banking operations, no viable alternatives",
      alternativesConsidered: 2,
      negotiationSavings: 50000,
      benchmarkPrice: 500000,
      marketCompetitiveness: "MEDIUM",
      deliveryTimeline: "30 days",
      paymentTerms: "Net 30",
      penalties: "2% per month late delivery",
      performanceGuarantee: "10% of contract value",
      insuranceRequirement: "Professional Indemnity Insurance",
      sustainabilityScore: 72,
      localContentPercentage: 15,
      smesParticipated: 3,
      smesAwarded: 1
    },
    {
      id: "proc-002",
      entityId: "SOE-006",
      entityName: "Electricity Company of Ghana",
      procurementId: "ECG-2024-015",
      title: "Smart Grid Infrastructure Upgrade",
      category: "INFRASTRUCTURE",
      vendor: "Siemens Ghana",
      value: 2500000,
      currency: "GHS",
      procurementMethod: "COMPETITIVE",
      status: "UNDER_EVALUATION",
      awardDate: null,
      contractStartDate: null,
      contractEndDate: null,
      description: "Installation of smart meters and grid management systems",
      evaluationCriteria: ["Technical Capability", "Experience", "Price", "Local Content", "After-sales Support"],
      complianceScore: 78,
      riskLevel: "MEDIUM",
      procurementOfficer: "Ama Mensah",
      department: "Engineering",
      justification: "Modernization of electricity distribution infrastructure",
      alternativesConsidered: 5,
      negotiationSavings: 0,
      benchmarkPrice: 2800000,
      marketCompetitiveness: "HIGH",
      deliveryTimeline: "180 days",
      paymentTerms: "Progress payments",
      penalties: "Liquidated damages",
      performanceGuarantee: "15% of contract value",
      insuranceRequirement: "Comprehensive insurance",
      sustainabilityScore: 85,
      localContentPercentage: 35,
      smesParticipated: 8,
      smesAwarded: 0
    },
    {
      id: "proc-003",
      entityId: "SOE-007",
      entityName: "Ghana National Petroleum Corporation",
      procurementId: "GNPC-2024-008",
      title: "Seismic Data Processing Software",
      category: "SERVICES",
      vendor: "Schlumberger",
      value: 1200000,
      currency: "USD",
      procurementMethod: "RESTRICTED",
      status: "CONTRACT_NEGOTIATION",
      awardDate: null,
      contractStartDate: null,
      contractEndDate: null,
      description: "Specialized software for oil exploration data analysis",
      evaluationCriteria: ["Technical Expertise", "Data Security", "Support", "Price"],
      complianceScore: 92,
      riskLevel: "LOW",
      procurementOfficer: "Joseph Yamoah",
      department: "Exploration",
      justification: "Specialized technical requirement with limited vendor pool",
      alternativesConsidered: 3,
      negotiationSavings: 150000,
      benchmarkPrice: 1350000,
      marketCompetitiveness: "LOW",
      deliveryTimeline: "90 days",
      paymentTerms: "Milestone-based",
      penalties: "Performance-based penalties",
      performanceGuarantee: "20% of contract value",
      insuranceRequirement: "Professional liability insurance",
      sustainabilityScore: 68,
      localContentPercentage: 10,
      smesParticipated: 2,
      smesAwarded: 0
    },
    {
      id: "proc-004",
      entityId: "SOE-018",
      entityName: "Ghana Cocoa Board",
      procurementId: "COCOBOD-2024-012",
      title: "Fertilizer Supply Contract",
      category: "GOODS",
      vendor: "Yara Ghana",
      value: 850000,
      currency: "GHS",
      procurementMethod: "OPEN",
      status: "AWARDED",
      awardDate: "2024-02-10",
      contractStartDate: "2024-03-01",
      contractEndDate: "2024-12-31",
      description: "Supply of NPK fertilizers for cocoa farmers",
      evaluationCriteria: ["Quality", "Price", "Delivery Capacity", "Storage Facilities"],
      complianceScore: 88,
      riskLevel: "LOW",
      procurementOfficer: "Adwoa Serwaa",
      department: "Agriculture",
      justification: "Essential input for cocoa production season",
      alternativesConsidered: 8,
      negotiationSavings: 120000,
      benchmarkPrice: 970000,
      marketCompetitiveness: "HIGH",
      deliveryTimeline: "Seasonal delivery",
      paymentTerms: "Letter of Credit",
      penalties: "Supply shortage penalties",
      performanceGuarantee: "5% of contract value",
      insuranceRequirement: "Goods insurance",
      sustainabilityScore: 90,
      localContentPercentage: 45,
      smesParticipated: 12,
      smesAwarded: 5
    },
    {
      id: "proc-005",
      entityId: "SOE-013",
      entityName: "Ghana Ports and Harbours Authority",
      procurementId: "GPHA-2024-020",
      title: "Port Equipment Maintenance",
      category: "SERVICES",
      vendor: "Liebherr",
      value: 1800000,
      currency: "GHS",
      procurementMethod: "SINGLE_SOURCE",
      status: "PENDING_APPROVAL",
      awardDate: null,
      contractStartDate: null,
      contractEndDate: null,
      description: "Annual maintenance contract for port cranes and equipment",
      evaluationCriteria: ["Technical Capability", "Spare Parts Availability", "Response Time", "Price"],
      complianceScore: 75,
      riskLevel: "HIGH",
      procurementOfficer: "Kofi Boateng",
      department: "Operations",
      justification: "OEM-specific equipment requires specialized maintenance",
      alternativesConsidered: 1,
      negotiationSavings: 0,
      benchmarkPrice: 1800000,
      marketCompetitiveness: "LOW",
      deliveryTimeline: "Ongoing",
      paymentTerms: "Quarterly payments",
      penalties: "Service level agreement penalties",
      performanceGuarantee: "10% of contract value",
      insuranceRequirement: "Equipment insurance",
      sustainabilityScore: 70,
      localContentPercentage: 20,
      smesParticipated: 4,
      smesAwarded: 1
    }
  ];
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const entityId = searchParams.get('entityId');
    const category = searchParams.get('category');
    const status = searchParams.get('status');
    const riskLevel = searchParams.get('riskLevel');

    let procurementData;
    
    try {
      // Try to get data from database
      if (entityId) {
        procurementData = await db.procurement.findMany({
          where: { entityId },
          include: {
            entity: {
              select: { name: true }
            }
          }
        });
      } else {
        procurementData = await db.procurement.findMany({
          include: {
            entity: {
              select: { name: true }
            }
          }
        });
      }
    } catch (dbError) {
      console.warn('Database connection failed, using mock data:', dbError);
      procurementData = getMockProcurementData();
    }

    // Apply filters
    let filteredData = procurementData;
    
    if (category && category !== 'all') {
      filteredData = filteredData.filter((proc: any) => 
        proc.category === category
      );
    }
    
    if (status && status !== 'all') {
      filteredData = filteredData.filter((proc: any) => 
        proc.status === status
      );
    }
    
    if (riskLevel && riskLevel !== 'all') {
      filteredData = filteredData.filter((proc: any) => 
        proc.riskLevel === riskLevel
      );
    }

    // Calculate analytics
    const totalProcurements = filteredData.length;
    const totalValue = filteredData.reduce((sum: number, proc: any) => sum + (proc.value || 0), 0);
    const averageComplianceScore = filteredData.length > 0 
      ? filteredData.reduce((sum: number, proc: any) => sum + (proc.complianceScore || 0), 0) / filteredData.length 
      : 0;
    
    const awardedContracts = filteredData.filter((proc: any) => proc.status === 'AWARDED').length;
    const underEvaluation = filteredData.filter((proc: any) => proc.status === 'UNDER_EVALUATION').length;
    const pendingApproval = filteredData.filter((proc: any) => proc.status === 'PENDING_APPROVAL').length;
    
    const totalNegotiationSavings = filteredData.reduce((sum: number, proc: any) => sum + (proc.negotiationSavings || 0), 0);
    const totalBenchmarkValue = filteredData.reduce((sum: number, proc: any) => sum + (proc.benchmarkPrice || 0), 0);
    const totalSavingsPercentage = totalBenchmarkValue > 0 ? (totalNegotiationSavings / totalBenchmarkValue) * 100 : 0;
    
    const highRiskCount = filteredData.filter((proc: any) => proc.riskLevel === 'HIGH').length;
    const mediumRiskCount = filteredData.filter((proc: any) => proc.riskLevel === 'MEDIUM').length;
    const lowRiskCount = filteredData.filter((proc: any) => proc.riskLevel === 'LOW').length;
    
    const averageLocalContent = filteredData.length > 0 
      ? filteredData.reduce((sum: number, proc: any) => sum + (proc.localContentPercentage || 0), 0) / filteredData.length 
      : 0;
    
    const totalSMEsParticipated = filteredData.reduce((sum: number, proc: any) => sum + (proc.smesParticipated || 0), 0);
    const totalSMEsAwarded = filteredData.reduce((sum: number, proc: any) => sum + (proc.smesAwarded || 0), 0);
    const smeSuccessRate = totalSMEsParticipated > 0 ? (totalSMEsAwarded / totalSMEsParticipated) * 100 : 0;
    
    const averageSustainabilityScore = filteredData.length > 0 
      ? filteredData.reduce((sum: number, proc: any) => sum + (proc.sustainabilityScore || 0), 0) / filteredData.length 
      : 0;

    // Category breakdown
    const categoryBreakdown = filteredData.reduce((acc: any, proc: any) => {
      const category = proc.category || 'Other';
      if (!acc[category]) {
        acc[category] = { count: 0, value: 0, compliance: 0 };
      }
      acc[category].count++;
      acc[category].value += proc.value || 0;
      acc[category].compliance += proc.complianceScore || 0;
      return acc;
    }, {});

    // Method breakdown
    const methodBreakdown = filteredData.reduce((acc: any, proc: any) => {
      const method = proc.procurementMethod || 'Unknown';
      if (!acc[method]) {
        acc[method] = { count: 0, value: 0, compliance: 0 };
      }
      acc[method].count++;
      acc[method].value += proc.value || 0;
      acc[method].compliance += proc.complianceScore || 0;
      return acc;
    }, {});

    // Vendor breakdown
    const vendorBreakdown = filteredData.reduce((acc: any, proc: any) => {
      const vendor = proc.vendor || 'Unknown';
      if (!acc[vendor]) {
        acc[vendor] = { count: 0, value: 0, compliance: 0 };
      }
      acc[vendor].count++;
      acc[vendor].value += proc.value || 0;
      acc[vendor].compliance += proc.complianceScore || 0;
      return acc;
    }, {});

    // Risk distribution
    const riskDistribution = {
      LOW: lowRiskCount,
      MEDIUM: mediumRiskCount,
      HIGH: highRiskCount
    };

    const analytics = {
      overview: {
        totalProcurements,
        totalValue,
        averageComplianceScore: Math.round(averageComplianceScore),
        awardedContracts,
        underEvaluation,
        pendingApproval,
        totalNegotiationSavings,
        totalSavingsPercentage: Math.round(totalSavingsPercentage),
        highRiskCount,
        mediumRiskCount,
        lowRiskCount,
        averageLocalContent: Math.round(averageLocalContent),
        totalSMEsParticipated,
        totalSMEsAwarded,
        smeSuccessRate: Math.round(smeSuccessRate),
        averageSustainabilityScore: Math.round(averageSustainabilityScore)
      },
      categoryBreakdown,
      methodBreakdown,
      vendorBreakdown,
      riskDistribution
    };

    return NextResponse.json({
      procurements: filteredData,
      analytics
    });

  } catch (error) {
    console.error('Error fetching procurement analysis data:', error);
    
    // Return mock data as fallback
    const mockData = getMockProcurementData();
    return NextResponse.json({
      procurements: mockData,
      analytics: {
        overview: {
          totalProcurements: mockData.length,
          totalValue: mockData.reduce((sum, proc) => sum + proc.value, 0),
          averageComplianceScore: 84,
          awardedContracts: 2,
          underEvaluation: 1,
          pendingApproval: 1,
          totalNegotiationSavings: 320000,
          totalSavingsPercentage: 7,
          highRiskCount: 1,
          mediumRiskCount: 1,
          lowRiskCount: 3,
          averageLocalContent: 25,
          totalSMEsParticipated: 29,
          totalSMEsAwarded: 7,
          smeSuccessRate: 24,
          averageSustainabilityScore: 77
        },
        categoryBreakdown: {
          'SOFTWARE': { count: 1, value: 450000, compliance: 85 },
          'INFRASTRUCTURE': { count: 1, value: 2500000, compliance: 78 },
          'SERVICES': { count: 2, value: 3000000, compliance: 84 },
          'GOODS': { count: 1, value: 850000, compliance: 88 }
        },
        methodBreakdown: {
          'DIRECT': { count: 1, value: 450000, compliance: 85 },
          'COMPETITIVE': { count: 1, value: 2500000, compliance: 78 },
          'RESTRICTED': { count: 1, value: 1200000, compliance: 92 },
          'OPEN': { count: 1, value: 850000, compliance: 88 },
          'SINGLE_SOURCE': { count: 1, value: 1800000, compliance: 75 }
        },
        vendorBreakdown: {
          'Microsoft': { count: 1, value: 450000, compliance: 85 },
          'Siemens Ghana': { count: 1, value: 2500000, compliance: 78 },
          'Schlumberger': { count: 1, value: 1200000, compliance: 92 },
          'Yara Ghana': { count: 1, value: 850000, compliance: 88 },
          'Liebherr': { count: 1, value: 1800000, compliance: 75 }
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
    const { action, procurementId, data } = body;

    switch (action) {
      case 'analyze':
        // Handle procurement analysis
        const analysis = generateProcurementAnalysis(procurementId, data);
        return NextResponse.json({ analysis });

      case 'optimize':
        // Handle procurement optimization
        const optimization = generateOptimizationRecommendations(procurementId, data);
        return NextResponse.json({ optimization });

      case 'audit':
        // Handle procurement audit
        const auditResult = await handleProcurementAudit(procurementId, data);
        return NextResponse.json(auditResult);

      case 'benchmark':
        // Handle price benchmarking
        const benchmarkResult = await handlePriceBenchmarking(procurementId, data);
        return NextResponse.json(benchmarkResult);

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

  } catch (error) {
    console.error('Error in procurement analysis POST:', error);
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}

function generateProcurementAnalysis(procurementId: string, data: any) {
  return {
    procurementId,
    analysis: {
      complianceAssessment: {
        score: data.complianceScore,
        issues: [
          {
            severity: 'MEDIUM',
            category: 'Documentation',
            description: 'Missing technical specifications annex',
            recommendation: 'Attach complete technical specifications'
          }
        ]
      },
      riskAssessment: {
        overallRisk: data.riskLevel,
        riskFactors: [
          {
            factor: 'Vendor Concentration',
            level: 'MEDIUM',
            mitigation: 'Develop alternative vendor relationships'
          },
          {
            factor: 'Price Volatility',
            level: 'LOW',
            mitigation: 'Include price escalation clauses'
          }
        ]
      },
      valueAssessment: {
        marketPosition: data.marketCompetitiveness,
        savingsAchieved: data.negotiationSavings,
        valueForMoney: data.complianceScore > 80 ? 'GOOD' : 'NEEDS_IMPROVEMENT'
      }
    }
  };
}

function generateOptimizationRecommendations(procurementId: string, data: any) {
  return {
    procurementId,
    recommendations: [
      {
        type: 'TIMING_OPTIMIZATION',
        title: 'Strategic Timing',
        description: 'Align procurement with fiscal year planning for better budget utilization',
        potentialSavings: data.value * 0.05,
        implementation: 'Next procurement cycle',
        impact: 'MEDIUM'
      },
      {
        type: 'BUNDLING',
        title: 'Contract Bundling',
        description: 'Bundle similar requirements across entities for volume discounts',
        potentialSavings: data.value * 0.08,
        implementation: '6-12 months',
        impact: 'HIGH'
      },
      {
        type: 'LOCAL_CONTENT',
        title: 'Local Content Enhancement',
        description: 'Increase local SME participation to meet statutory requirements',
        potentialSavings: data.value * 0.03,
        implementation: 'Immediate',
        impact: 'LOW'
      }
    ]
  };
}

async function handleProcurementAudit(procurementId: string, data: any) {
  return {
    auditId: `proc-audit-${Date.now()}`,
    status: 'COMPLETED',
    complianceScore: Math.floor(Math.random() * 20) + 75,
    findings: [
      {
        severity: 'HIGH',
        category: 'Procurement Process',
        description: 'Insufficient competition in vendor selection',
        recommendation: 'Expand vendor outreach and consider open tendering'
      },
      {
        severity: 'MEDIUM',
        category: 'Documentation',
        description: 'Incomplete evaluation criteria documentation',
        recommendation: 'Standardize evaluation documentation templates'
      },
      {
        severity: 'LOW',
        category: 'Contract Management',
        description: 'Missing performance monitoring clauses',
        recommendation: 'Include KPI-based performance monitoring'
      }
    ],
    recommendations: [
      'Implement procurement management system',
      'Enhance vendor database',
      'Standardize evaluation processes',
      'Improve contract monitoring'
    ],
    nextAuditDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString()
  };
}

async function handlePriceBenchmarking(procurementId: string, data: any) {
  return {
    benchmarkId: `price-bench-${Date.now()}`,
    currentPrice: data.value,
    benchmarkData: [
      {
        source: 'Public Sector Average',
        price: data.benchmarkPrice,
        variance: ((data.value - data.benchmarkPrice) / data.benchmarkPrice) * 100
      },
      {
        source: 'Private Sector Average',
        price: data.benchmarkPrice * 0.9,
        variance: ((data.value - (data.benchmarkPrice * 0.9)) / (data.benchmarkPrice * 0.9)) * 100
      },
      {
        source: 'Regional Average',
        price: data.benchmarkPrice * 1.1,
        variance: ((data.value - (data.benchmarkPrice * 1.1)) / (data.benchmarkPrice * 1.1)) * 100
      }
    ],
    marketPosition: data.marketCompetitiveness,
    recommendations: [
      'Consider price negotiation if above market average',
      'Document price justification for single-source procurements',
      'Implement regular price benchmarking process'
    ]
  };
}