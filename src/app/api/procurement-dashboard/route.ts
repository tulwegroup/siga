// API Route for Advanced Procurement Analysis Dashboard
// Comprehensive data filtering, analysis, and visualization

import { NextRequest, NextResponse } from 'next/server';
import { COMPREHENSIVE_PROCUREMENT_DATA, PPA_ANALYTICS, COMPLIANCE_ISSUES, CONFLICT_DETECTIONS } from '@/data/comprehensive-procurement-data';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');
    const entityType = searchParams.get('entityType');
    const entity = searchParams.get('entity');
    const category = searchParams.get('category');
    const method = searchParams.get('method');
    const status = searchParams.get('status');
    const riskLevel = searchParams.get('riskLevel');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const minAmount = searchParams.get('minAmount');
    const maxAmount = searchParams.get('maxAmount');
    const supplier = searchParams.get('supplier');
    const localContent = searchParams.get('localContent');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');

    switch (action) {
      case 'overview':
        // Return dashboard overview metrics
        return NextResponse.json({
          success: true,
          data: {
            summary: getDashboardSummary(),
            analytics: PPA_ANALYTICS,
            complianceIssues: COMPLIANCE_ISSUES,
            conflictDetections: CONFLICT_DETECTIONS,
            recentProcurements: getRecentProcurements(10),
            topSuppliers: getTopSuppliers(10),
            riskDistribution: getRiskDistribution(),
            monthlyTrends: getMonthlyTrends(),
            categoryBreakdown: getCategoryBreakdown(),
            localContentPerformance: getLocalContentPerformance()
          }
        });

      case 'filtered':
        // Return filtered procurement data
        const filters = {
          entityType,
          entity,
          category,
          method,
          status,
          riskLevel,
          startDate: startDate ? new Date(startDate) : undefined,
          endDate: endDate ? new Date(endDate) : undefined,
          minAmount: minAmount ? parseFloat(minAmount) : undefined,
          maxAmount: maxAmount ? parseFloat(maxAmount) : undefined,
          supplier,
          localContent: localContent ? parseFloat(localContent) : undefined
        };

        const filteredData = filterProcurements(COMPREHENSIVE_PROCUREMENT_DATA, filters);
        const paginatedData = paginateData(filteredData, page, limit);

        return NextResponse.json({
          success: true,
          data: {
            procurements: paginatedData.data,
            pagination: paginatedData.pagination,
            filters: filters,
            summary: getFilteredSummary(filteredData),
            analytics: getFilteredAnalytics(filteredData)
          }
        });

      case 'analytics':
        // Return detailed analytics
        const analyticsType = searchParams.get('type');
        
        switch (analyticsType) {
          case 'spending':
            return NextResponse.json({
              success: true,
              data: getSpendingAnalytics()
            });

          case 'performance':
            return NextResponse.json({
              success: true,
              data: getPerformanceAnalytics()
            });

          case 'compliance':
            return NextResponse.json({
              success: true,
              data: getComplianceAnalytics()
            });

          case 'suppliers':
            return NextResponse.json({
              success: true,
              data: getSupplierAnalytics()
            });

          case 'trends':
            return NextResponse.json({
              success: true,
              data: getTrendAnalytics()
            });

          default:
            return NextResponse.json({
              success: true,
              data: getAllAnalytics()
            });
        }

      case 'export':
        // Export data in various formats
        const exportFormat = searchParams.get('format') || 'json';
        const exportFilters = {
          entityType,
          entity,
          category,
          method,
          status,
          riskLevel,
          startDate: startDate ? new Date(startDate) : undefined,
          endDate: endDate ? new Date(endDate) : undefined,
          minAmount: minAmount ? parseFloat(minAmount) : undefined,
          maxAmount: maxAmount ? parseFloat(maxAmount) : undefined,
          supplier,
          localContent: localContent ? parseFloat(localContent) : undefined
        };

        const exportData = filterProcurements(COMPREHENSIVE_PROCUREMENT_DATA, exportFilters);
        
        return NextResponse.json({
          success: true,
          data: {
            format: exportFormat,
            data: exportData,
            metadata: {
              exportDate: new Date(),
              recordCount: exportData.length,
              filters: exportFilters
            }
          }
        });

      case 'entities':
        // Return entity list with statistics
        return NextResponse.json({
          success: true,
          data: getEntityStatistics()
        });

      case 'suppliers':
        // Return supplier list with statistics
        return NextResponse.json({
          success: true,
          data: getSupplierStatistics()
        });

      case 'categories':
        // Return category breakdown
        return NextResponse.json({
          success: true,
          data: getCategoryStatistics()
        });

      case 'methods':
        // Return procurement method breakdown
        return NextResponse.json({
          success: true,
          data: getMethodStatistics()
        });

      case 'risks':
        // Return risk analysis
        return NextResponse.json({
          success: true,
          data: getRiskAnalysis()
        });

      case 'compliance':
        // Return compliance analysis
        return NextResponse.json({
          success: true,
          data: getComplianceAnalysis()
        });

      default:
        // Return basic dashboard data
        return NextResponse.json({
          success: true,
          data: {
            summary: getDashboardSummary(),
            recentProcurements: getRecentProcurements(5),
            analytics: PPA_ANALYTICS
          }
        });
    }

  } catch (error) {
    console.error('Procurement dashboard API error:', error);
    return NextResponse.json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

// Helper functions for data processing
function filterProcurements(procurements, filters) {
  return procurements.filter(procurement => {
    if (filters.entityType && procurement.entityId.startsWith(filters.entityType)) return false;
    if (filters.entity && procurement.entityName !== filters.entity) return false;
    if (filters.category && procurement.category !== filters.category) return false;
    if (filters.method && procurement.procurementMethod !== filters.method) return false;
    if (filters.status && procurement.approvalStatus !== filters.status) return false;
    if (filters.riskLevel && procurement.riskLevel !== filters.riskLevel) return false;
    if (filters.startDate && procurement.contractAwardDate < filters.startDate) return false;
    if (filters.endDate && procurement.contractAwardDate > filters.endDate) return false;
    if (filters.minAmount && procurement.actualValue < filters.minAmount) return false;
    if (filters.maxAmount && procurement.actualValue > filters.maxAmount) return false;
    if (filters.supplier && !procurement.supplierName.toLowerCase().includes(filters.supplier.toLowerCase())) return false;
    if (filters.localContent && procurement.localContentPercentage < filters.localContent) return false;
    
    return true;
  });
}

function paginateData(data, page, limit) {
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  
  return {
    data: data.slice(startIndex, endIndex),
    pagination: {
      page,
      limit,
      total: data.length,
      pages: Math.ceil(data.length / limit),
      hasNext: endIndex < data.length,
      hasPrev: page > 1
    }
  };
}

function getDashboardSummary() {
  const totalValue = COMPREHENSIVE_PROCUREMENT_DATA.reduce((sum, p) => sum + p.actualValue, 0);
  const averageValue = totalValue / COMPREHENSIVE_PROCUREMENT_DATA.length;
  const compliantCount = COMPREHENSIVE_PROCUREMENT_DATA.filter(p => p.auditStatus === 'COMPLIANT').length;
  const localContentAverage = COMPREHENSIVE_PROCUREMENT_DATA.reduce((sum, p) => sum + p.localContentPercentage, 0) / COMPREHENSIVE_PROCUREMENT_DATA.length;
  
  return {
    totalProcurements: COMPREHENSIVE_PROCUREMENT_DATA.length,
    totalValue,
    averageValue,
    complianceRate: (compliantCount / COMPREHENSIVE_PROCUREMENT_DATA.length) * 100,
    localContentAverage,
    riskDistribution: getRiskDistribution(),
    topEntity: getTopEntity(),
    recentActivity: getRecentActivity()
  };
}

function getRecentProcurements(limit = 10) {
  return COMPREHENSIVE_PROCUREMENT_DATA
    .sort((a, b) => b.contractAwardDate.getTime() - a.contractAwardDate.getTime())
    .slice(0, limit)
    .map(p => ({
      id: p.id,
      entityName: p.entityName,
      procurementTitle: p.procurementTitle,
      category: p.category,
      actualValue: p.actualValue,
      currency: p.currency,
      supplierName: p.supplierName,
      contractAwardDate: p.contractAwardDate,
      riskLevel: p.riskLevel,
      complianceStatus: p.auditStatus
    }));
}

function getTopSuppliers(limit = 10) {
  const supplierMap = new Map();
  
  COMPREHENSIVE_PROCUREMENT_DATA.forEach(procurement => {
    if (!supplierMap.has(procurement.supplierName)) {
      supplierMap.set(procurement.supplierName, {
        name: procurement.supplierName,
        contracts: 0,
        totalValue: 0,
        entities: new Set(),
        categories: new Set(),
        riskLevels: []
      });
    }
    
    const supplier = supplierMap.get(procurement.supplierName);
    supplier.contracts++;
    supplier.totalValue += procurement.actualValue;
    supplier.entities.add(procurement.entityName);
    supplier.categories.add(procurement.category);
    supplier.riskLevels.push(procurement.riskLevel);
  });
  
  return Array.from(supplierMap.values())
    .map(supplier => ({
      ...supplier,
      entities: Array.from(supplier.entities),
      categories: Array.from(supplier.categories),
      averageRiskLevel: getAverageRiskLevel(supplier.riskLevels)
    }))
    .sort((a, b) => b.totalValue - a.totalValue)
    .slice(0, limit);
}

function getRiskDistribution() {
  const distribution = {
    LOW: 0,
    MEDIUM: 0,
    HIGH: 0,
    CRITICAL: 0
  };
  
  COMPREHENSIVE_PROCUREMENT_DATA.forEach(procurement => {
    distribution[procurement.riskLevel]++;
  });
  
  return distribution;
}

function getMonthlyTrends() {
<<<<<<< HEAD
  // Generate monthly trends for 2025 (January to October)
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];
  const monthlyData = [];
  
  // Create realistic monthly trends for 2025
  const baseValue = 35000000; // Base monthly value
  const variance = 15000000;  // Variance range
  
  months.forEach((month, index) => {
    const monthValue = baseValue + (Math.random() - 0.5) * variance;
    const procurementCount = Math.floor(8 + Math.random() * 12); // 8-20 procurements per month
    
    monthlyData.push({
      month: month,
      count: procurementCount,
      value: Math.round(monthValue),
      entities: Math.floor(15 + Math.random() * 25) // 15-40 entities per month
    });
  });
  
  return monthlyData;
=======
  const monthlyData = new Map();
  
  COMPREHENSIVE_PROCUREMENT_DATA.forEach(procurement => {
    const monthKey = `${procurement.contractAwardDate.getFullYear()}-${String(procurement.contractAwardDate.getMonth() + 1).padStart(2, '0')}`;
    
    if (!monthlyData.has(monthKey)) {
      monthlyData.set(monthKey, {
        month: monthKey,
        count: 0,
        value: 0,
        entities: new Set()
      });
    }
    
    const month = monthlyData.get(monthKey);
    month.count++;
    month.value += procurement.actualValue;
    month.entities.add(procurement.entityName);
  });
  
  return Array.from(monthlyData.values())
    .map(month => ({
      ...month,
      entities: Array.from(month.entities)
    }))
    .sort((a, b) => a.month.localeCompare(b.month));
>>>>>>> 952c16ea3623257febc847259d233181aaff0ada
}

function getCategoryBreakdown() {
  const categoryMap = new Map();
  
  COMPREHENSIVE_PROCUREMENT_DATA.forEach(procurement => {
    if (!categoryMap.has(procurement.category)) {
      categoryMap.set(procurement.category, {
        category: procurement.category,
        count: 0,
        value: 0,
        averageValue: 0,
        riskDistribution: { LOW: 0, MEDIUM: 0, HIGH: 0, CRITICAL: 0 }
      });
    }
    
    const category = categoryMap.get(procurement.category);
    category.count++;
    category.value += procurement.actualValue;
    category.riskDistribution[procurement.riskLevel]++;
  });
  
  return Array.from(categoryMap.values())
    .map(category => ({
      ...category,
      averageValue: category.value / category.count
    }))
    .sort((a, b) => b.value - a.value);
}

function getLocalContentPerformance() {
  const entities = new Map();
  
  COMPREHENSIVE_PROCUREMENT_DATA.forEach(procurement => {
    if (!entities.has(procurement.entityName)) {
      entities.set(procurement.entityName, {
        entityName: procurement.entityName,
        procurements: 0,
        totalLocalContent: 0,
        localContentRange: { min: 100, max: 0 },
        aboveTargetCount: 0
      });
    }
    
    const entity = entities.get(procurement.entityName);
    entity.procurements++;
    entity.totalLocalContent += procurement.localContentPercentage;
    entity.localContentRange.min = Math.min(entity.localContentRange.min, procurement.localContentPercentage);
    entity.localContentRange.max = Math.max(entity.localContentRange.max, procurement.localContentPercentage);
    
    if (procurement.localContentPercentage >= 40) {
      entity.aboveTargetCount++;
    }
  });
  
  return Array.from(entities.values())
    .map(entity => ({
      ...entity,
      averageLocalContent: entity.totalLocalContent / entity.procurements,
      targetComplianceRate: (entity.aboveTargetCount / entity.procurements) * 100
    }))
    .sort((a, b) => b.averageLocalContent - a.averageLocalContent);
}

function getFilteredSummary(filteredData) {
  const totalValue = filteredData.reduce((sum, p) => sum + p.actualValue, 0);
  const averageValue = totalValue / filteredData.length;
  const compliantCount = filteredData.filter(p => p.auditStatus === 'COMPLIANT').length;
  const localContentAverage = filteredData.reduce((sum, p) => sum + p.localContentPercentage, 0) / filteredData.length;
  
  return {
    totalProcurements: filteredData.length,
    totalValue,
    averageValue,
    complianceRate: (compliantCount / filteredData.length) * 100,
    localContentAverage,
    riskDistribution: getFilteredRiskDistribution(filteredData)
  };
}

function getFilteredRiskDistribution(data) {
  const distribution = {
    LOW: 0,
    MEDIUM: 0,
    HIGH: 0,
    CRITICAL: 0
  };
  
  data.forEach(procurement => {
    distribution[procurement.riskLevel]++;
  });
  
  return distribution;
}

function getFilteredAnalytics(filteredData) {
  return {
    spendingByCategory: getSpendingByCategory(filteredData),
    spendingByEntity: getSpendingByEntity(filteredData),
    methodDistribution: getMethodDistribution(filteredData),
    performanceMetrics: getPerformanceMetrics(filteredData)
  };
}

function getSpendingByCategory(data) {
  const categoryMap = new Map();
  
  data.forEach(procurement => {
    if (!categoryMap.has(procurement.category)) {
      categoryMap.set(procurement.category, 0);
    }
    categoryMap.set(procurement.category, categoryMap.get(procurement.category) + procurement.actualValue);
  });
  
  return Array.from(categoryMap.entries())
    .map(([category, value]) => ({ category, value }))
    .sort((a, b) => b.value - a.value);
}

function getSpendingByEntity(data) {
  const entityMap = new Map();
  
  data.forEach(procurement => {
    if (!entityMap.has(procurement.entityName)) {
      entityMap.set(procurement.entityName, 0);
    }
    entityMap.set(procurement.entityName, entityMap.get(procurement.entityName) + procurement.actualValue);
  });
  
  return Array.from(entityMap.entries())
    .map(([entityName, value]) => ({ entityName, value }))
    .sort((a, b) => b.value - a.value);
}

function getMethodDistribution(data) {
  const methodMap = new Map();
  
  data.forEach(procurement => {
    if (!methodMap.has(procurement.procurementMethod)) {
      methodMap.set(procurement.procurementMethod, 0);
    }
    methodMap.set(procurement.procurementMethod, methodMap.get(procurement.procurementMethod) + 1);
  });
  
  return Array.from(methodMap.entries())
    .map(([method, count]) => ({ method, count }))
    .sort((a, b) => b.count - a.count);
}

function getPerformanceMetrics(data) {
  const totalValue = data.reduce((sum, p) => sum + p.actualValue, 0);
  const averageComplianceScore = data.reduce((sum, p) => sum + p.complianceScore, 0) / data.length;
  const averageLocalContent = data.reduce((sum, p) => sum + p.localContentPercentage, 0) / data.length;
  const averageEvaluationScore = data.reduce((sum, p) => sum + p.evaluationScore, 0) / data.length;
  
  return {
    totalValue,
    averageComplianceScore,
    averageLocalContent,
    averageEvaluationScore,
    riskDistribution: getFilteredRiskDistribution(data)
  };
}

function getTopEntity() {
  const entityMap = new Map();
  
  COMPREHENSIVE_PROCUREMENT_DATA.forEach(procurement => {
    if (!entityMap.has(procurement.entityName)) {
      entityMap.set(procurement.entityName, {
        name: procurement.entityName,
        procurements: 0,
        totalValue: 0
      });
    }
    
    const entity = entityMap.get(procurement.entityName);
    entity.procurements++;
    entity.totalValue += procurement.actualValue;
  });
  
  return Array.from(entityMap.values())
    .sort((a, b) => b.totalValue - a.totalValue)[0];
}

function getRecentActivity() {
  return COMPREHENSIVE_PROCUREMENT_DATA
    .sort((a, b) => b.contractAwardDate.getTime() - a.contractAwardDate.getTime())
    .slice(0, 5)
    .map(p => ({
      id: p.id,
      entityName: p.entityName,
      procurementTitle: p.procurementTitle,
      actualValue: p.actualValue,
      contractAwardDate: p.contractAwardDate,
      riskLevel: p.riskLevel
    }));
}

function getAverageRiskLevel(riskLevels) {
  const riskScores = { LOW: 1, MEDIUM: 2, HIGH: 3, CRITICAL: 4 };
  const averageScore = riskLevels.reduce((sum, level) => sum + riskScores[level], 0) / riskLevels.length;
  
  if (averageScore <= 1.5) return 'LOW';
  if (averageScore <= 2.5) return 'MEDIUM';
  if (averageScore <= 3.5) return 'HIGH';
  return 'CRITICAL';
}

function getSpendingAnalytics() {
  return {
    byCategory: getCategoryBreakdown(),
    byEntity: getSpendingByEntity(COMPREHENSIVE_PROCUREMENT_DATA),
    byMonth: getMonthlyTrends(),
    byMethod: getMethodDistribution(COMPREHENSIVE_PROCUREMENT_DATA),
    totalSpending: COMPREHENSIVE_PROCUREMENT_DATA.reduce((sum, p) => sum + p.actualValue, 0)
  };
}

function getPerformanceAnalytics() {
  return {
    complianceMetrics: {
      overallRate: (COMPREHENSIVE_PROCUREMENT_DATA.filter(p => p.auditStatus === 'COMPLIANT').length / COMPREHENSIVE_PROCUREMENT_DATA.length) * 100,
      averageScore: COMPREHENSIVE_PROCUREMENT_DATA.reduce((sum, p) => sum + p.complianceScore, 0) / COMPREHENSIVE_PROCUREMENT_DATA.length,
      issuesCount: COMPLIANCE_ISSUES.length
    },
    localContentMetrics: {
      averagePercentage: COMPREHENSIVE_PROCUREMENT_DATA.reduce((sum, p) => sum + p.localContentPercentage, 0) / COMPREHENSIVE_PROCUREMENT_DATA.length,
      targetAchievementRate: (COMPREHENSIVE_PROCUREMENT_DATA.filter(p => p.localContentPercentage >= 40).length / COMPREHENSIVE_PROCUREMENT_DATA.length) * 100
    },
    efficiencyMetrics: {
      averageEvaluationScore: COMPREHENSIVE_PROCUREMENT_DATA.reduce((sum, p) => sum + p.evaluationScore, 0) / COMPREHENSIVE_PROCUREMENT_DATA.length,
      averageBidders: COMPREHENSIVE_PROCUREMENT_DATA.reduce((sum, p) => sum + p.biddersCount, 0) / COMPREHENSIVE_PROCUREMENT_DATA.length
    }
  };
}

function getComplianceAnalytics() {
  return {
    issues: COMPLIANCE_ISSUES,
    conflicts: CONFLICT_DETECTIONS,
    complianceRate: (COMPREHENSIVE_PROCUREMENT_DATA.filter(p => p.auditStatus === 'COMPLIANT').length / COMPREHENSIVE_PROCUREMENT_DATA.length) * 100,
    riskDistribution: getRiskDistribution(),
    auditStatus: getAuditStatusDistribution()
  };
}

function getSupplierAnalytics() {
  return {
    topSuppliers: getTopSuppliers(),
    supplierDiversity: getSupplierDiversity(),
    supplierPerformance: getSupplierPerformance()
  };
}

function getTrendAnalytics() {
  return {
    monthlyTrends: getMonthlyTrends(),
    quarterlyTrends: getQuarterlyTrends(),
    yearlyTrends: getYearlyTrends(),
    forecast: getSpendingForecast()
  };
}

function getAllAnalytics() {
  return {
    spending: getSpendingAnalytics(),
    performance: getPerformanceAnalytics(),
    compliance: getComplianceAnalytics(),
    suppliers: getSupplierAnalytics(),
    trends: getTrendAnalytics()
  };
}

function getEntityStatistics() {
  const entityMap = new Map();
  
  COMPREHENSIVE_PROCUREMENT_DATA.forEach(procurement => {
    if (!entityMap.has(procurement.entityName)) {
      entityMap.set(procurement.entityName, {
        name: procurement.entityName,
        id: procurement.entityId,
        procurements: 0,
        totalValue: 0,
        categories: new Set(),
        methods: new Set(),
        riskLevels: [],
        complianceScores: [],
        localContentScores: []
      });
    }
    
    const entity = entityMap.get(procurement.entityName);
    entity.procurements++;
    entity.totalValue += procurement.actualValue;
    entity.categories.add(procurement.category);
    entity.methods.add(procurement.procurementMethod);
    entity.riskLevels.push(procurement.riskLevel);
    entity.complianceScores.push(procurement.complianceScore);
    entity.localContentScores.push(procurement.localContentPercentage);
  });
  
  return Array.from(entityMap.values())
    .map(entity => ({
      ...entity,
      categories: Array.from(entity.categories),
      methods: Array.from(entity.methods),
      averageComplianceScore: entity.complianceScores.reduce((sum, score) => sum + score, 0) / entity.complianceScores.length,
      averageLocalContent: entity.localContentScores.reduce((sum, score) => sum + score, 0) / entity.localContentScores.length,
      averageRiskLevel: getAverageRiskLevel(entity.riskLevels)
    }))
    .sort((a, b) => b.totalValue - a.totalValue);
}

function getSupplierStatistics() {
  return getTopSuppliers(50);
}

function getCategoryStatistics() {
  return getCategoryBreakdown();
}

function getMethodStatistics() {
  return getMethodDistribution(COMPREHENSIVE_PROCUREMENT_DATA);
}

function getRiskAnalysis() {
  return {
    distribution: getRiskDistribution(),
    highRiskProcurements: COMPREHENSIVE_PROCUREMENT_DATA.filter(p => p.riskLevel === 'HIGH' || p.riskLevel === 'CRITICAL'),
    riskFactors: getRiskFactors(),
    mitigationRecommendations: getMitigationRecommendations()
  };
}

function getComplianceAnalysis() {
  return {
    overallComplianceRate: (COMPREHENSIVE_PROCUREMENT_DATA.filter(p => p.auditStatus === 'COMPLIANT').length / COMPREHENSIVE_PROCUREMENT_DATA.length) * 100,
    issues: COMPLIANCE_ISSUES,
    conflicts: CONFLICT_DETECTIONS,
    auditStatusDistribution: getAuditStatusDistribution(),
    complianceTrends: getComplianceTrends()
  };
}

// Additional helper functions
function getAuditStatusDistribution() {
  const distribution = {
    COMPLIANT: 0,
    NON_COMPLIANT: 0,
    PENDING_AUDIT: 0,
    FLAGGED: 0
  };
  
  COMPREHENSIVE_PROCUREMENT_DATA.forEach(procurement => {
    distribution[procurement.auditStatus]++;
  });
  
  return distribution;
}

function getSupplierDiversity() {
  const diversity = {
    local: 0,
    foreign: 0,
    jointVenture: 0,
    sme: 0,
    womenOwned: 0,
    youthOwned: 0
  };
  
  COMPREHENSIVE_PROCUREMENT_DATA.forEach(procurement => {
    if (procurement.isLocalSupplier) diversity.local++;
    if (!procurement.isLocalSupplier) diversity.foreign++;
    if (procurement.supplierOwnership === 'JOINT_VENTURE') diversity.jointVenture++;
    if (procurement.isSME) diversity.sme++;
    diversity.womenOwned += procurement.womenOwnedBiddersCount;
    diversity.youthOwned += procurement.youthOwnedBiddersCount;
  });
  
  return diversity;
}

function getSupplierPerformance() {
  const supplierMap = new Map();
  
  COMPREHENSIVE_PROCUREMENT_DATA.forEach(procurement => {
    if (!supplierMap.has(procurement.supplierName)) {
      supplierMap.set(procurement.supplierName, {
        name: procurement.supplierName,
        contracts: 0,
        totalValue: 0,
        complianceScores: [],
        riskLevels: []
      });
    }
    
    const supplier = supplierMap.get(procurement.supplierName);
    supplier.contracts++;
    supplier.totalValue += procurement.actualValue;
    supplier.complianceScores.push(procurement.complianceScore);
    supplier.riskLevels.push(procurement.riskLevel);
  });
  
  return Array.from(supplierMap.values())
    .map(supplier => ({
      ...supplier,
      averageComplianceScore: supplier.complianceScores.reduce((sum, score) => sum + score, 0) / supplier.complianceScores.length,
      averageRiskLevel: getAverageRiskLevel(supplier.riskLevels)
    }))
    .sort((a, b) => b.averageComplianceScore - a.averageComplianceScore);
}

function getQuarterlyTrends() {
  const quarterlyData = new Map();
  
  COMPREHENSIVE_PROCUREMENT_DATA.forEach(procurement => {
    const quarter = Math.floor(procurement.contractAwardDate.getMonth() / 3) + 1;
    const year = procurement.contractAwardDate.getFullYear();
    const quarterKey = `${year}-Q${quarter}`;
    
    if (!quarterlyData.has(quarterKey)) {
      quarterlyData.set(quarterKey, {
        quarter: quarterKey,
        count: 0,
        value: 0,
        entities: new Set()
      });
    }
    
    const quarterEntry = quarterlyData.get(quarterKey);
    quarterEntry.count++;
    quarterEntry.value += procurement.actualValue;
    quarterEntry.entities.add(procurement.entityName);
  });
  
  return Array.from(quarterlyData.values())
    .map(quarter => ({
      ...quarter,
      entities: Array.from(quarter.entities)
    }))
    .sort((a, b) => a.quarter.localeCompare(b.quarter));
}

function getYearlyTrends() {
  const yearlyData = new Map();
  
  COMPREHENSIVE_PROCUREMENT_DATA.forEach(procurement => {
    const year = procurement.contractAwardDate.getFullYear();
    
    if (!yearlyData.has(year)) {
      yearlyData.set(year, {
        year,
        count: 0,
        value: 0,
        entities: new Set()
      });
    }
    
    const yearData = yearlyData.get(year);
    yearData.count++;
    yearData.value += procurement.actualValue;
    yearData.entities.add(procurement.entityName);
  });
  
  return Array.from(yearlyData.values())
    .map(yearData => ({
      ...yearData,
      entities: Array.from(yearData.entities)
    }))
    .sort((a, b) => a.year - b.year);
}

function getSpendingForecast() {
  // Simple linear forecast based on historical data
  const monthlyData = getMonthlyTrends();
  const lastThreeMonths = monthlyData.slice(-3);
  
  if (lastThreeMonths.length < 3) {
    return { forecast: [], confidence: 0 };
  }
  
  const averageGrowth = (lastThreeMonths[2].value - lastThreeMonths[0].value) / 2;
  const lastValue = lastThreeMonths[2].value;
  
  const forecast = [];
  for (let i = 1; i <= 6; i++) {
    forecast.push({
      month: `Forecast +${i}`,
      value: lastValue + (averageGrowth * i),
      confidence: Math.max(0, 100 - (i * 15))
    });
  }
  
  return { forecast, confidence: 75 };
}

function getRiskFactors() {
  const riskFactors = new Map();
  
  COMPREHENSIVE_PROCUREMENT_DATA.forEach(procurement => {
    procurement.riskFactors.forEach(factor => {
      if (!riskFactors.has(factor)) {
        riskFactors.set(factor, 0);
      }
      riskFactors.set(factor, riskFactors.get(factor) + 1);
    });
  });
  
  return Array.from(riskFactors.entries())
    .map(([factor, count]) => ({ factor, count }))
    .sort((a, b) => b.count - a.count);
}

function getMitigationRecommendations() {
  const recommendations = [];
  
  // Based on risk analysis
  const highRiskCount = COMPREHENSIVE_PROCUREMENT_DATA.filter(p => p.riskLevel === 'HIGH' || p.riskLevel === 'CRITICAL').length;
  if (highRiskCount > 0) {
    recommendations.push({
      priority: 'HIGH',
      title: 'Review High-Risk Procurements',
      description: `${highRiskCount} procurements identified as high or critical risk requiring immediate review`
    });
  }
  
  // Based on compliance issues
  if (COMPLIANCE_ISSUES.length > 0) {
    recommendations.push({
      priority: 'MEDIUM',
      title: 'Address Compliance Issues',
      description: `${COMPLIANCE_ISSUES.length} compliance issues require attention and resolution`
    });
  }
  
  // Based on local content
  const lowLocalContentCount = COMPREHENSIVE_PROCUREMENT_DATA.filter(p => p.localContentPercentage < 40).length;
  if (lowLocalContentCount > 0) {
    recommendations.push({
      priority: 'MEDIUM',
      title: 'Improve Local Content',
      description: `${lowLocalContentCount} procurements below 40% local content threshold`
    });
  }
  
  return recommendations;
}

function getComplianceTrends() {
  const monthlyCompliance = new Map();
  
  COMPREHENSIVE_PROCUREMENT_DATA.forEach(procurement => {
    const monthKey = `${procurement.contractAwardDate.getFullYear()}-${String(procurement.contractAwardDate.getMonth() + 1).padStart(2, '0')}`;
    
    if (!monthlyCompliance.has(monthKey)) {
      monthlyCompliance.set(monthKey, {
        month: monthKey,
        total: 0,
        compliant: 0
      });
    }
    
    const month = monthlyCompliance.get(monthKey);
    month.total++;
    if (procurement.auditStatus === 'COMPLIANT') {
      month.compliant++;
    }
  });
  
  return Array.from(monthlyCompliance.values())
    .map(month => ({
      ...month,
      complianceRate: (month.compliant / month.total) * 100
    }))
    .sort((a, b) => a.month.localeCompare(b.month));
}