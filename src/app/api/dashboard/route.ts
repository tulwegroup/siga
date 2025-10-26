import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    // Get entity counts by category
    const entityCounts = await db.entity.groupBy({
      by: ['category'],
      _count: {
        id: true
      }
    });

    // Get sector distribution
    const sectorCounts = await db.entity.groupBy({
      by: ['sector'],
      _count: {
        id: true
      }
    });

    // Get status distribution
    const statusCounts = await db.entity.groupBy({
      by: ['status'],
      _count: {
        id: true
      }
    });

    // Get total entities
    const totalEntities = await db.entity.count();

    // Get recent risk scores (mock data for now)
    const riskDistribution = {
      low: 30,
      medium: 45,
      high: 20,
      critical: 5
    };

    // Get compliance overview (mock data)
    const complianceOverview = {
      compliant: 65,
      pending: 20,
      overdue: 10,
      nonCompliant: 5
    };

    // Portfolio metrics (mock data)
    const portfolioMetrics = {
      totalAssets: 45600000000, // GHS 45.6B
      totalRevenue: 8900000000,  // GHS 8.9B
      totalEmployees: 125000,
      dividendOwed: 340000000,   // GHS 340M
      guaranteesOutstanding: 2100000000 // GHS 2.1B
    };

    const dashboardData = {
      overview: {
        totalEntities,
        entityCounts,
        sectorCounts,
        statusCounts
      },
      risk: riskDistribution,
      compliance: complianceOverview,
      portfolio: portfolioMetrics
    };

    return NextResponse.json(dashboardData);
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return NextResponse.json({ error: 'Failed to fetch dashboard data' }, { status: 500 });
  }
}