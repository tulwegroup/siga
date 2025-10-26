import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const entity = await db.entity.findUnique({
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

    if (!entity) {
      return NextResponse.json({ error: 'Entity not found' }, { status: 404 });
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
    return NextResponse.json({ error: 'Failed to fetch entity details' }, { status: 500 });
  }
}