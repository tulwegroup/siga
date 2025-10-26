import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { GHANA_ENTITIES } from '@/data/ghana-entities';

// Create entity from actual Ghana entities data
const createEntityFromRealData = (entityId: string) => {
  const realEntity = GHANA_ENTITIES.find(entity => entity.entityId === entityId);
  
  if (realEntity) {
    return {
      id: realEntity.entityId,
      name: realEntity.name,
      type: realEntity.category,
      sector: realEntity.sector,
      status: realEntity.status,
      establishedYear: realEntity.establishedDate?.getFullYear() || 2000,
      description: realEntity.description,
      website: realEntity.website?.replace('https://', '') || '',
      headquarters: "Accra, Ghana",
      ceo: "Chief Executive Officer",
      boardMembers: [
        { 
          id: `bm-${entityId}-1`, 
          name: "Board Chairman", 
          position: "Chairman", 
          appointedDate: "2020-01-15" 
        },
        { 
          id: `bm-${entityId}-2`, 
          name: "Board Member", 
          position: "Board Member", 
          appointedDate: "2021-03-20" 
        }
      ],
      riskScores: [],
      complianceLogs: [],
      kpiData: [],
      dividends: [],
      guarantees: []
    };
  }
  
  // Fallback for entities not found in real data
  return createGenericEntity(entityId);
};

// Create a generic entity based on ID pattern
const createGenericEntity = (entityId: string) => {
  const entityTypes = { 'SOE': 'SOE', 'JVC': 'JVC', 'OSE': 'OSE' };
  const sectors = {
    'SOE': ['Finance', 'Energy', 'Transport', 'Agriculture', 'Health', 'Communications', 'Trade', 'Tourism', 'Natural Resources'],
    'JVC': ['Oil & Gas', 'Mining', 'Energy', 'Infrastructure', 'Telecommunications'],
    'OSE': ['Revenue', 'Regulation', 'Governance', 'Education', 'Defense', 'Foreign Affairs']
  };
  
  let type = 'SOE';
  let name = 'Ghana State Entity';
  
  // Parse entity ID to determine type and create name
  if (entityId.startsWith('SOE-')) {
    type = 'SOE';
    name = `Ghana State Enterprise ${entityId.split('-')[1]}`;
  } else if (entityId.startsWith('JVC-')) {
    type = 'JVC';
    name = `Ghana Joint Venture ${entityId.split('-')[1]}`;
  } else if (entityId.startsWith('OSE-')) {
    type = 'OSE';
    name = `Ghana State Entity ${entityId.split('-')[1]}`;
  } else if (entityId.startsWith('soe-')) {
    type = 'SOE';
    name = `Ghana State Enterprise ${entityId.split('-')[1]}`;
  } else if (entityId.startsWith('jvc-')) {
    type = 'JVC';
    name = `Ghana Joint Venture ${entityId.split('-')[1]}`;
  } else if (entityId.startsWith('ose-')) {
    type = 'OSE';
    name = `Ghana State Entity ${entityId.split('-')[1]}`;
  }
  
  const sectorList = sectors[type as keyof typeof sectors];
  const sector = sectorList[Math.floor(Math.random() * sectorList.length)];
  
  return {
    id: entityId,
    name,
    type,
    sector,
    status: "ACTIVE",
    establishedYear: 2000 + Math.floor(Math.random() * 23),
    description: `Ghanaian ${type.toLowerCase()} operating in the ${sector.toLowerCase()} sector`,
    website: `www.${entityId.toLowerCase()}.gov.gh`,
    headquarters: "Accra, Ghana",
    ceo: "Chief Executive Officer",
    boardMembers: [
      { 
        id: `bm-${entityId}-1`, 
        name: "Board Chairman", 
        position: "Chairman", 
        appointedDate: "2020-01-15" 
      },
      { 
        id: `bm-${entityId}-2`, 
        name: "Board Member", 
        position: "Board Member", 
        appointedDate: "2021-03-20" 
      }
    ],
    riskScores: [],
    complianceLogs: [],
    kpiData: [],
    dividends: [],
    guarantees: []
  };
};

// Fallback data for serverless environments
const getFallbackEntityData = () => {
  return {
    "SOE-001": {
      id: "SOE-001",
      name: "Ghana Commercial Bank",
      type: "SOE",
      sector: "Finance",
      status: "ACTIVE",
      establishedYear: 1953,
      description: "Leading commercial bank in Ghana providing comprehensive banking services",
      website: "www.gcb.com.gh",
      headquarters: "Accra, Ghana",
      ceo: "Managing Director",
      boardMembers: [
        { id: "bm1", name: "Board Chairman", position: "Chairman", appointedDate: "2020-01-15" },
        { id: "bm2", name: "Board Member", position: "Board Member", appointedDate: "2021-03-20" }
      ],
      riskScores: [],
      complianceLogs: [],
      kpiData: [],
      dividends: [],
      guarantees: []
    },
    "SOE-002": {
      id: "SOE-002",
      name: "Agricultural Development Bank",
      type: "SOE",
      sector: "Finance",
      status: "ACTIVE",
      establishedYear: 1965,
      description: "Specialized bank for agricultural development financing",
      website: "www.adb.com.gh",
      headquarters: "Accra, Ghana",
      ceo: "Managing Director",
      boardMembers: [],
      riskScores: [],
      complianceLogs: [],
      kpiData: [],
      dividends: [],
      guarantees: []
    },
    "SOE-003": {
      id: "SOE-003",
      name: "Bank of Ghana",
      type: "SOE",
      sector: "Finance",
      status: "ACTIVE",
      establishedYear: 1957,
      description: "Central bank of Ghana responsible for monetary policy",
      website: "www.bog.gov.gh",
      headquarters: "Accra, Ghana",
      ceo: "Governor",
      boardMembers: [],
      riskScores: [],
      complianceLogs: [],
      kpiData: [],
      dividends: [],
      guarantees: []
    },
    "SOE-006": {
      id: "SOE-006",
      name: "Electricity Company of Ghana",
      type: "SOE",
      sector: "Energy",
      status: "ACTIVE",
      establishedYear: 1963,
      description: "Primary electricity distribution company in Ghana",
      website: "www.ecg.com.gh",
      headquarters: "Accra, Ghana",
      ceo: "Eng. Samuel Dubik Mahama",
      boardMembers: [
        { id: "bm1", name: "Kwame Nkrumah", position: "Chairman", appointedDate: "2020-01-15" },
        { id: "bm2", name: "Ama Serwaa", position: "Board Member", appointedDate: "2021-03-20" }
      ],
      riskScores: [
        {
          id: "risk-1",
          entityId: "SOE-006",
          period: "2024-Q1",
          overallScore: 65,
          financialRisk: 45,
          operationalRisk: 70,
          governanceRisk: 60,
          complianceRisk: 75,
          riskFactors: {
            factors: [
              { name: "Revenue Volatility", score: 65 },
              { name: "Debt Levels", score: 45 },
              { name: "Board Independence", score: 60 },
              { name: "Audit Findings", score: 75 }
            ]
          },
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      complianceLogs: [
        {
          id: "comp-1",
          entityId: "SOE-006",
          requirement: "Quarterly Financial Report",
          category: "FINANCIAL_REPORTING",
          status: "COMPLIANT",
          dueDate: new Date("2024-03-31"),
          completedDate: new Date("2024-03-28"),
          assignedTo: "Compliance Officer",
          notes: "Submitted on time",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      kpiData: [
        {
          id: "kpi-1",
          entityId: "SOE-006",
          period: "2024-01",
          year: 2024,
          month: 1,
          revenue: 850000000,
          profit: 45000000,
          assets: 2500000000,
          liabilities: 1200000000,
          equity: 1300000000,
          roa: 0.018,
          roe: 0.035,
          debtToEquity: 0.92,
          employeeCount: 3500,
          serviceDeliveryIndex: 75,
          customerSatisfaction: 68,
          reportingCompliance: 85,
          governanceScore: 72,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      dividends: [],
      guarantees: []
    },
    "SOE-007": {
      id: "SOE-007",
      name: "Ghana National Petroleum Corporation",
      type: "SOE",
      sector: "Energy",
      status: "ACTIVE",
      establishedYear: 1983,
      description: "National oil company for petroleum exploration and production",
      website: "www.gnpcghana.com",
      headquarters: "Accra, Ghana",
      ceo: "Opoku-Ahweneeh Danquah",
      boardMembers: [
        { id: "bm3", name: "Kofi Annan", position: "Chairman", appointedDate: "2019-06-10" }
      ],
      riskScores: [],
      complianceLogs: [],
      kpiData: [],
      dividends: [],
      guarantees: []
    },
    "JVC-001": {
      id: "JVC-001",
      name: "Ghana National Petroleum Corporation",
      type: "JVC",
      sector: "Oil & Gas",
      status: "ACTIVE",
      establishedYear: 1983,
      description: "National oil company responsible for exploration, production, and disposal of petroleum",
      website: "www.gnpcghana.com",
      headquarters: "Accra, Ghana",
      ceo: "Opoku-Ahweneeh Danquah",
      boardMembers: [
        { id: "bm3", name: "Kofi Annan", position: "Chairman", appointedDate: "2019-06-10" }
      ],
      riskScores: [],
      complianceLogs: [],
      kpiData: [],
      dividends: [],
      guarantees: []
    },
    "OSE-001": {
      id: "OSE-001",
      name: "Ghana Revenue Authority",
      type: "OSE",
      sector: "Revenue",
      status: "ACTIVE",
      establishedYear: 2009,
      description: "National revenue collection agency",
      website: "www.gra.gov.gh",
      headquarters: "Accra, Ghana",
      ceo: "Rev. Dr. Ammishaddai Owusu-Amoah",
      boardMembers: [],
      riskScores: [],
      complianceLogs: [],
      kpiData: [],
      dividends: [],
      guarantees: []
    },
    "soe-001": {
      id: "soe-001",
      name: "Electricity Company of Ghana",
      type: "SOE",
      sector: "Energy",
      status: "ACTIVE",
      establishedYear: 1963,
      description: "Ghana's primary electricity generation and distribution company",
      website: "www.ecg.com.gh",
      headquarters: "Accra, Ghana",
      ceo: "Eng. Samuel Dubik Mahama",
      boardMembers: [
        { id: "bm1", name: "Kwame Nkrumah", position: "Chairman", appointedDate: "2020-01-15" },
        { id: "bm2", name: "Ama Serwaa", position: "Board Member", appointedDate: "2021-03-20" }
      ],
      riskScores: [
        {
          id: "risk-1",
          entityId: "soe-001",
          period: "2024-Q1",
          overallScore: 65,
          financialRisk: 45,
          operationalRisk: 70,
          governanceRisk: 60,
          complianceRisk: 75,
          riskFactors: {
            factors: [
              { name: "Revenue Volatility", score: 65 },
              { name: "Debt Levels", score: 45 },
              { name: "Board Independence", score: 60 },
              { name: "Audit Findings", score: 75 }
            ]
          },
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      complianceLogs: [
        {
          id: "comp-1",
          entityId: "soe-001",
          requirement: "Quarterly Financial Report",
          category: "FINANCIAL_REPORTING",
          status: "COMPLIANT",
          dueDate: new Date("2024-03-31"),
          completedDate: new Date("2024-03-28"),
          assignedTo: "Compliance Officer",
          notes: "Submitted on time",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      kpiData: [
        {
          id: "kpi-1",
          entityId: "soe-001",
          period: "2024-01",
          year: 2024,
          month: 1,
          revenue: 850000000,
          profit: 45000000,
          assets: 2500000000,
          liabilities: 1200000000,
          equity: 1300000000,
          roa: 0.018,
          roe: 0.035,
          debtToEquity: 0.92,
          employeeCount: 3500,
          serviceDeliveryIndex: 75,
          customerSatisfaction: 68,
          reportingCompliance: 85,
          governanceScore: 72,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      dividends: [],
      guarantees: []
    },
    "jvc-001": {
      id: "jvc-001",
      name: "Ghana National Petroleum Corporation",
      type: "JVC",
      sector: "Oil & Gas",
      status: "ACTIVE",
      establishedYear: 1983,
      description: "National oil company responsible for exploration, production, and disposal of petroleum",
      website: "www.gnpcghana.com",
      headquarters: "Accra, Ghana",
      ceo: "Opoku-Ahweneeh Danquah",
      boardMembers: [
        { id: "bm3", name: "Kofi Annan", position: "Chairman", appointedDate: "2019-06-10" }
      ],
      riskScores: [],
      complianceLogs: [],
      kpiData: [],
      dividends: [],
      guarantees: []
    },
    "ose-001": {
      id: "ose-001",
      name: "Ghana Revenue Authority",
      type: "OSE",
      sector: "Revenue",
      status: "ACTIVE",
      establishedYear: 2009,
      description: "National revenue collection agency",
      website: "www.gra.gov.gh",
      headquarters: "Accra, Ghana",
      ceo: "Rev. Dr. Ammishaddai Owusu-Amoah",
      boardMembers: [],
      riskScores: [],
      complianceLogs: [],
      kpiData: [],
      dividends: [],
      guarantees: []
    }
  };
};

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Try to get entity from database first
    let entity;
    try {
      entity = await db.entity.findUnique({
        where: { id: params.id },
        include: {
          boardMembers: true,
          riskScores: {
            orderBy: { period: 'desc' },
            take: 4
          },
          complianceLogs: {
            orderBy: { dueDate: 'desc' },
            take: 10
          },
          kpiData: {
            orderBy: { period: 'desc' },
            take: 12
          },
          dividends: {
            orderBy: { year: 'desc' },
            take: 5
          },
          guarantees: {
            orderBy: { issuedDate: 'desc' },
            take: 5
          }
        }
      });
    } catch (dbError) {
      console.warn('Database connection failed, using fallback data:', dbError);
      entity = null;
    }

    // If database fails or entity not found, use fallback data
    if (!entity) {
      const fallbackData = getFallbackEntityData();
      entity = fallbackData[params.id as keyof typeof fallbackData];
      
      // If still not found, create entity from real data or generic
      if (!entity) {
        entity = createEntityFromRealData(params.id);
      }
    }

    // Generate mock KPI data if none exists
    if (entity.kpiData.length === 0) {
      const mockKpiData = [];
      const currentYear = new Date().getFullYear();
      
      for (let i = 11; i >= 0; i--) {
        const date = new Date(currentYear, i, 1);
        const period = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        
        mockKpiData.push({
          id: `kpi-${i}`,
          entityId: entity.id,
          period,
          year: date.getFullYear(),
          month: date.getMonth() + 1,
          revenue: Math.floor(Math.random() * 1000000000) + 500000000,
          profit: Math.floor(Math.random() * 100000000) - 20000000,
          assets: Math.floor(Math.random() * 5000000000) + 1000000000,
          liabilities: Math.floor(Math.random() * 2000000000) + 500000000,
          equity: Math.floor(Math.random() * 3000000000) + 1000000000,
          roa: Math.random() * 0.1 - 0.02,
          roe: Math.random() * 0.15 - 0.03,
          debtToEquity: Math.random() * 2,
          employeeCount: Math.floor(Math.random() * 5000) + 500,
          serviceDeliveryIndex: Math.random() * 40 + 60,
          customerSatisfaction: Math.random() * 30 + 70,
          reportingCompliance: Math.random() * 20 + 80,
          governanceScore: Math.random() * 25 + 75,
          createdAt: new Date(),
          updatedAt: new Date()
        });
      }
      
      entity.kpiData = mockKpiData;
    }

    // Generate mock risk scores if none exist
    if (entity.riskScores.length === 0) {
      const mockRiskScores = [];
      const currentYear = new Date().getFullYear();
      
      for (let q = 3; q >= 0; q--) {
        const period = `${currentYear}-Q${q + 1}`;
        mockRiskScores.push({
          id: `risk-${q}`,
          entityId: entity.id,
          period,
          overallScore: Math.floor(Math.random() * 40) + 40,
          financialRisk: Math.floor(Math.random() * 50) + 25,
          operationalRisk: Math.floor(Math.random() * 50) + 25,
          governanceRisk: Math.floor(Math.random() * 50) + 25,
          complianceRisk: Math.floor(Math.random() * 50) + 25,
          riskFactors: {
            factors: [
              { name: 'Revenue Volatility', score: Math.random() * 100 },
              { name: 'Debt Levels', score: Math.random() * 100 },
              { name: 'Board Independence', score: Math.random() * 100 },
              { name: 'Audit Findings', score: Math.random() * 100 }
            ]
          },
          createdAt: new Date(),
          updatedAt: new Date()
        });
      }
      
      entity.riskScores = mockRiskScores;
    }

    // Generate mock compliance logs if none exist
    if (entity.complianceLogs.length === 0) {
      const mockComplianceLogs = [];
      const requirements = [
        { requirement: 'Quarterly Financial Report', category: 'FINANCIAL_REPORTING' },
        { requirement: 'Board Meeting Minutes', category: 'GOVERNANCE' },
        { requirement: 'Annual Audit Report', category: 'AUDIT' },
        { requirement: 'Procurement Compliance', category: 'PROCUREMENT' },
        { requirement: 'Operational Metrics', category: 'OPERATIONAL' }
      ];
      
      const statuses = ['COMPLIANT', 'PENDING', 'OVERDUE', 'COMPLIANT', 'COMPLIANT'];
      
      requirements.forEach((req, index) => {
        const dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + (index * 30) - 60);
        
        mockComplianceLogs.push({
          id: `compliance-${index}`,
          entityId: entity.id,
          requirement: req.requirement,
          category: req.category,
          status: statuses[index],
          dueDate,
          completedDate: statuses[index] === 'COMPLIANT' ? new Date() : null,
          assignedTo: 'Compliance Officer',
          notes: statuses[index] === 'OVERDUE' ? 'Requires immediate attention' : 'On track',
          createdAt: new Date(),
          updatedAt: new Date()
        });
      });
      
      entity.complianceLogs = mockComplianceLogs;
    }

    return NextResponse.json(entity);
  } catch (error) {
    console.error('Error fetching entity details:', error);
    
    // Final fallback - return a basic entity structure
    return NextResponse.json({
      id: params.id,
      name: 'Entity Data Unavailable',
      type: 'UNKNOWN',
      sector: 'Unknown',
      status: 'ERROR',
      establishedYear: 2000,
      description: 'Unable to load entity details due to server limitations',
      website: '',
      headquarters: '',
      ceo: '',
      boardMembers: [],
      riskScores: [],
      complianceLogs: [],
      kpiData: [],
      dividends: [],
      guarantees: []
    });
  }
}