'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  ShoppingCart, 
  DollarSign, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  XCircle,
  Users,
  Building,
  Award,
  FileText,
  BarChart3,
  PieChart,
  Filter,
  Download,
  Settings,
  Target,
  Shield,
  Globe,
  Calculator,
  Brain,
  Search,
  Eye,
  Calendar,
  MapPin,
  Clock,
  Zap,
  Activity,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  Star,
  ThumbsUp,
  ThumbsDown,
  AlertCircle,
  Info,
  ChevronRight,
  Loader2
} from 'lucide-react';

interface ComprehensiveProcurement {
  id: string;
  procurementId: string;
  title: string;
  entityName: string;
  category: string;
  procurementMethod: string;
  estimatedValue: number;
  actualValue: number;
  currency: string;
  planningStartDate: string;
  planningEndDate: string;
  tenderPublicationDate: string;
  bidSubmissionDeadline: string;
  evaluationStartDate: string;
  evaluationEndDate: string;
  contractAwardDate: string;
  contractStartDate: string;
  contractEndDate: string;
  status: string;
  description: string;
  evaluationCriteria: string[];
  complianceScore: number;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  procurementOfficer: string;
  department: string;
  justification: string;
  alternativesConsidered: number;
  negotiationSavings: number;
  benchmarkPrice: number;
  marketCompetitiveness: 'LOW' | 'MEDIUM' | 'HIGH';
  deliveryTimeline: string;
  paymentTerms: string;
  penalties: string;
  performanceGuarantee: string;
  insuranceRequirement: string;
  sustainabilityScore: number;
  localContentPercentage: number;
  smesParticipated: number;
  smesAwarded: number;
  womenOwnedBusinesses: number;
  youthOwnedBusinesses: number;
  auditFindings: string[];
  riskFactors: string[];
  mitigationMeasures: string[];
  performanceMetrics: {
    onTimeDelivery: boolean;
  withinBudget: boolean;
  qualityScore: number;
  complianceRating: string;
  };
  sustainabilityMetrics: {
    carbonFootprintReduction: number;
    energyEfficiency: number;
    wasteReduction: number;
    localEconomicImpact: number;
  };
}

interface ProcurementAnalytics {
  overview: {
    totalProcurements: number;
    totalValue: number;
    averageComplianceScore: number;
    awardedContracts: number;
    underEvaluation: number;
    pendingApproval: number;
    totalNegotiationSavings: number;
    totalSavingsPercentage: number;
    highRiskCount: number;
    mediumRiskCount: number;
    lowRiskCount: number;
    criticalRiskCount: number;
    averageLocalContent: number;
    totalSMEsParticipated: number;
    totalSMEsAwarded: number;
    smeSuccessRate: number;
    averageSustainabilityScore: number;
    totalCarbonReduction: number;
    totalEconomicImpact: number;
  };
  categoryBreakdown: Record<string, { count: number; value: number; compliance: number }>;
  methodBreakdown: Record<string, { count: number; value: number; compliance: number }>;
  riskDistribution: Record<string, number>;
  quarterlyTrends: Array<{
    quarter: string;
    count: number;
    value: number;
    entities: string[];
  }>;
  topSuppliers: Array<{
    name: string;
    contracts: number;
    totalValue: number;
    complianceScore: number;
    riskLevel: string;
  }>;
  complianceAnalysis: {
    overallCompliance: number;
    commonViolations: Array<{
      type: string;
      count: number;
      severity: string;
      description: string;
    }>;
    improvementAreas: Array<{
      area: string;
      currentScore: number;
      targetScore: number;
      recommendations: string[];
    }>;
  };
}

interface AIAgentAnalysis {
  complianceCheck: {
    overallScore: number;
    violations: Array<{
      type: string;
      severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
      description: string;
      recommendation: string;
      regulatoryReference: string;
    }>;
    recommendations: string[];
  };
  conflictDetection: {
    conflicts: Array<{
      type: string;
      entities: string[];
      description: string;
      riskLevel: string;
      recommendation: string;
    }>;
    riskScore: number;
  };
  duplicateAnalysis: {
    duplicates: Array<{
      procurements: string[];
      similarity: number;
      potentialSavings: number;
      recommendation: string;
    }>;
    consolidationOpportunities: number;
    estimatedSavings: number;
  };
  riskAssessment: {
    overallRisk: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
    riskFactors: Array<{
      factor: string;
      impact: string;
      probability: string;
      mitigation: string;
    }>;
    mitigationPlan: string[];
  };
  supplierRiskProfile: {
    overallRisk: string;
    riskFactors: Array<{
      category: string;
      score: number;
      description: string;
    }>;
    recommendations: string[];
  };
  report: {
    summary: string;
    keyFindings: string[];
    actionItems: Array<{
      priority: 'HIGH' | 'MEDIUM' | 'LOW';
      action: string;
      deadline: string;
      responsible: string;
    }>;
    confidence: number;
  };
}

export function ComprehensiveProcurementDashboard() {
  const [procurements, setProcurements] = useState<ComprehensiveProcurement[]>([]);
  const [analytics, setAnalytics] = useState<ProcurementAnalytics | null>(null);
  const [aiAnalysis, setAiAnalysis] = useState<AIAgentAnalysis | null>(null);
  const [loading, setLoading] = useState(true);
  const [aiLoading, setAiLoading] = useState(false);
  const [selectedProcurement, setSelectedProcurement] = useState<ComprehensiveProcurement | null>(null);
  const [filters, setFilters] = useState({
    category: 'all',
    status: 'all',
    riskLevel: 'all',
    entityId: 'all',
    dateRange: 'all',
    minAmount: '',
    maxAmount: '',
    showOnlyViolations: false,
    showOnlyHighRisk: false
  });

  useEffect(() => {
    fetchProcurementData();
  }, [filters]);

  const fetchProcurementData = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (filters.category !== 'all') params.append('category', filters.category);
      if (filters.status !== 'all') params.append('status', filters.status);
      if (filters.riskLevel !== 'all') params.append('riskLevel', filters.riskLevel);
      if (filters.entityId !== 'all') params.append('entityId', filters.entityId);
      if (filters.dateRange !== 'all') params.append('dateRange', filters.dateRange);
      if (filters.minAmount) params.append('minAmount', filters.minAmount);
      if (filters.maxAmount) params.append('maxAmount', filters.maxAmount);
      if (filters.showOnlyViolations) params.append('showOnlyViolations', 'true');
      if (filters.showOnlyHighRisk) params.append('showOnlyHighRisk', 'true');

      const response = await fetch(`/api/procurement-dashboard?${params}`);
      const result = await response.json();
      
      // Handle the actual API response structure
      if (result.success && result.data) {
        setProcurements(result.data.recentProcurements || []);
        setAnalytics(result.data.analytics || null);
      } else {
        // Fallback for different response structure
        setProcurements(result.procurements || []);
        setAnalytics(result.analytics || null);
      }
    } catch (error) {
      console.error('Error fetching procurement data:', error);
    } finally {
      setLoading(false);
    }
  };

  const runAIAnalysis = async () => {
    try {
      setAiLoading(true);
      const response = await fetch('/api/procurement-agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'comprehensive-analysis',
          procurements: procurements.slice(0, 5), // Analyze top 5 for demo
          analytics: analytics
        })
      });
      
      const data = await response.json();
      setAiAnalysis(data.analysis);
    } catch (error) {
      console.error('Error running AI analysis:', error);
    } finally {
      setAiLoading(false);
    }
  };

  const formatCurrency = (amount: number, currency: string = 'GHS') => {
    if (amount >= 1000000000) {
      return `${currency} ${(amount / 1000000000).toFixed(2)}B`;
    } else if (amount >= 1000000) {
      return `${currency} ${(amount / 1000000).toFixed(1)}M`;
    } else if (amount >= 1000) {
      return `${currency} ${(amount / 1000).toFixed(0)}K`;
    }
    return `${currency} ${amount.toLocaleString()}`;
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'LOW': return 'text-green-600 bg-green-50 border-green-200';
      case 'MEDIUM': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'HIGH': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'CRITICAL': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'AWARDED': return 'text-green-600 bg-green-50 border-green-200';
      case 'UNDER_EVALUATION': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'PENDING_APPROVAL': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'CONTRACT_NEGOTIATION': return 'text-purple-600 bg-purple-50 border-purple-200';
      case 'PLANNING': return 'text-gray-600 bg-gray-50 border-gray-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getCompetitivenessColor = (level: string) => {
    switch (level) {
      case 'HIGH': return 'text-green-600';
      case 'MEDIUM': return 'text-yellow-600';
      case 'LOW': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const exportReport = async () => {
    try {
      const response = await fetch('/api/procurement-dashboard/export', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          filters,
          analytics,
          procurements,
          aiAnalysis
        })
      });
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `procurement-report-${new Date().toISOString().split('T')[0]}.pdf`;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting report:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading comprehensive procurement data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Comprehensive Procurement Dashboard</h2>
          <p className="text-muted-foreground">
            AI-powered procurement analysis and compliance monitoring for 175+ state entities
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={exportReport}>
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button onClick={runAIAnalysis} disabled={aiLoading}>
            {aiLoading ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Brain className="h-4 w-4 mr-2" />
            )}
            Run AI Analysis
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Procurements</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics?.totalProcurements || 0}</div>
            <p className="text-xs text-muted-foreground">
              Jan - Nov 2024
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {analytics && formatCurrency(analytics.totalValue)}
            </div>
            <p className="text-xs text-muted-foreground">
              Contract value across all entities
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Compliance Score</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics?.complianceRate || 0}%</div>
            <p className="text-xs text-muted-foreground">
              Average compliance rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Savings Achieved</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {analytics && formatCurrency(analytics.totalValue * 0.067)} {/* Estimated 6.7% savings */}
            </div>
            <p className="text-xs text-muted-foreground">
              Estimated savings rate
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Additional Strategic Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Local Content</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics?.localContentAverage || 0}%</div>
            <p className="text-xs text-muted-foreground">
              Supporting local businesses
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">SME Success Rate</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics?.smeParticipationRate || 0}%</div>
            <p className="text-xs text-muted-foreground">
              SME participation rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sustainability</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics?.sustainabilityMetrics?.averageScore || 0}%</div>
            <p className="text-xs text-muted-foreground">
              Environmental impact score
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Carbon Reduction</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {analytics?.sustainabilityMetrics?.totalLocalJobsCreated || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              Local jobs created
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Advanced Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Advanced Filters
          </CardTitle>
          <CardDescription>
            Filter procurements by multiple criteria for detailed analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="category">Category</Label>
              <Select value={filters.category} onValueChange={(value) => setFilters(prev => ({ ...prev, category: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="SOFTWARE">Software</SelectItem>
                  <SelectItem value="INFRASTRUCTURE">Infrastructure</SelectItem>
                  <SelectItem value="SERVICES">Services</SelectItem>
                  <SelectItem value="GOODS">Goods</SelectItem>
                  <SelectItem value="CONSULTING">Consulting</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="status">Status</Label>
              <Select value={filters.status} onValueChange={(value) => setFilters(prev => ({ ...prev, status: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="AWARDED">Awarded</SelectItem>
                  <SelectItem value="UNDER_EVALUATION">Under Evaluation</SelectItem>
                  <SelectItem value="PENDING_APPROVAL">Pending Approval</SelectItem>
                  <SelectItem value="CONTRACT_NEGOTIATION">Contract Negotiation</SelectItem>
                  <SelectItem value="PLANNING">Planning</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="riskLevel">Risk Level</Label>
              <Select value={filters.riskLevel} onValueChange={(value) => setFilters(prev => ({ ...prev, riskLevel: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="All Risk Levels" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Risk Levels</SelectItem>
                  <SelectItem value="CRITICAL">Critical</SelectItem>
                  <SelectItem value="HIGH">High</SelectItem>
                  <SelectItem value="MEDIUM">Medium</SelectItem>
                  <SelectItem value="LOW">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="dateRange">Date Range</Label>
              <Select value={filters.dateRange} onValueChange={(value) => setFilters(prev => ({ ...prev, dateRange: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="All Time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2024-Q1">Q1 2024</SelectItem>
                  <SelectItem value="2024-Q2">Q2 2024</SelectItem>
                  <SelectItem value="2024-Q3">Q3 2024</SelectItem>
                  <SelectItem value="2024-Q4">Q4 2024</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
            <div>
              <Label htmlFor="minAmount">Min Amount (GHS)</Label>
              <Input
                id="minAmount"
                type="number"
                placeholder="0"
                value={filters.minAmount}
                onChange={(e) => setFilters(prev => ({ ...prev, minAmount: e.target.value }))}
              />
            </div>

            <div>
              <Label htmlFor="maxAmount">Max Amount (GHS)</Label>
              <Input
                id="maxAmount"
                type="number"
                placeholder="10000000"
                value={filters.maxAmount}
                onChange={(e) => setFilters(prev => ({ ...prev, maxAmount: e.target.value }))}
              />
            </div>

            <div className="flex items-end space-x-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="showOnlyViolations"
                  checked={filters.showOnlyViolations}
                  onCheckedChange={(checked) => setFilters(prev => ({ ...prev, showOnlyViolations: checked as boolean }))}
                />
                <Label htmlFor="showOnlyViolations">Show Violations Only</Label>
              </div>
            </div>

            <div className="flex items-end space-x-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="showOnlyHighRisk"
                  checked={filters.showOnlyHighRisk}
                  onCheckedChange={(checked) => setFilters(prev => ({ ...prev, showOnlyHighRisk: checked as boolean }))}
                />
                <Label htmlFor="showOnlyHighRisk">Show High Risk Only</Label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="procurements">Procurements</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
          <TabsTrigger value="ai-analysis">AI Analysis</TabsTrigger>
          <TabsTrigger value="suppliers">Suppliers</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Category Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5" />
                  Category Breakdown
                </CardTitle>
                <CardDescription>
                  Procurement distribution by category
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analytics && Object.entries(analytics.categoryDistribution || {}).map(([category, count]) => (
                    <div key={category} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{category}</span>
                        <span className="text-sm text-muted-foreground">
                          {count} items
                        </span>
                      </div>
                      <Progress value={(count / analytics.totalProcurements) * 100} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Risk Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Risk Distribution
                </CardTitle>
                <CardDescription>
                  Risk levels across all procurements
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analytics && Object.entries(analytics.riskDistribution || {}).map(([risk, count]) => (
                    <div key={risk} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className={`text-sm font-medium capitalize ${getRiskColor(risk)}`}>
                          {risk}
                        </span>
                        <span className="text-sm">{count}</span>
                      </div>
                      <Progress value={(count / analytics.totalProcurements) * 100} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quarterly Trends */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Quarterly Trends
              </CardTitle>
              <CardDescription>
                Procurement activity and spending trends
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analytics?.monthlyTrends?.map((trend) => (
                  <div key={trend.month} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{trend.month} 2024</span>
                      <span className="text-sm text-muted-foreground">
                        {trend.count} procurements • {formatCurrency(trend.value)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="procurements" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5" />
                  Procurement Records
                </span>
                <Badge variant="outline">{procurements.length} records</Badge>
              </CardTitle>
              <CardDescription>
                Detailed procurement information with full lifecycle tracking
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {procurements.map((procurement) => (
                  <div key={procurement.id} className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer" onClick={() => setSelectedProcurement(procurement)}>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h4 className="font-semibold">{procurement.procurementTitle || procurement.title}</h4>
                        <p className="text-sm text-muted-foreground">{procurement.entityName}</p>
                      </div>
                      <div className="flex flex-col items-end space-y-1">
                        <Badge className={getStatusColor(procurement.complianceStatus || procurement.status)}>
                          {(procurement.complianceStatus || procurement.status)?.replace('_', ' ')}
                        </Badge>
                        <Badge className={getRiskColor(procurement.riskLevel)}>
                          {procurement.riskLevel}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Value:</span>
                        <p className="font-medium">{formatCurrency(procurement.actualValue, procurement.currency)}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Category:</span>
                        <p className="font-medium">{procurement.category}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Supplier:</span>
                        <p className="font-medium">{procurement.supplierName || 'N/A'}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Award Date:</span>
                        <p className="font-medium">{procurement.contractAwardDate ? new Date(procurement.contractAwardDate).toLocaleDateString() : 'N/A'}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Method Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Procurement Methods
                </CardTitle>
                <CardDescription>
                  Distribution by procurement method
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analytics && Object.entries(analytics.methodBreakdown).map(([method, data]) => (
                    <div key={method} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{method.replace('_', ' ')}</span>
                        <span className="text-sm text-muted-foreground">
                          {data.count} items • {formatCurrency(data.value)}
                        </span>
                      </div>
                      <Progress value={(data.value / analytics.overview.totalValue) * 100} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Compliance Analysis */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Compliance Analysis
                </CardTitle>
                <CardDescription>
                  Common violations and improvement areas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analytics?.complianceAnalysis.commonViolations.map((violation, idx) => (
                    <div key={idx} className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-sm">{violation.type}</span>
                        <Badge variant={violation.severity === 'HIGH' ? 'destructive' : 'secondary'}>
                          {violation.severity}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-1">{violation.description}</p>
                      <p className="text-xs">Occurrences: {violation.count}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Compliance Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  Compliance Overview
                </CardTitle>
                <CardDescription>
                  Overall compliance metrics and scores
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-green-600">
                      {analytics?.complianceRate || 0}%
                    </div>
                    <p className="text-sm text-muted-foreground">Average Compliance Score</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Compliant Procurements</span>
                      <span className="text-sm font-medium">
                        {procurements.filter(p => p.complianceStatus === 'COMPLIANT').length}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Pending Audit</span>
                      <span className="text-sm font-medium">
                        {procurements.filter(p => p.complianceStatus === 'PENDING_AUDIT').length}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Under Review</span>
                      <span className="text-sm font-medium">
                        {procurements.filter(p => p.complianceStatus && p.complianceStatus !== 'COMPLIANT' && p.complianceStatus !== 'PENDING_AUDIT').length}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Improvement Areas */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Improvement Areas
                </CardTitle>
                <CardDescription>
                  Key areas for compliance enhancement
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analytics?.complianceAnalysis.improvementAreas.map((area, idx) => (
                    <div key={idx} className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-sm">{area.area}</span>
                        <span className="text-xs text-muted-foreground">
                          {area.currentScore}% → {area.targetScore}%
                        </span>
                      </div>
                      <Progress value={(area.currentScore / area.targetScore) * 100} className="h-2 mb-2" />
                      <div className="text-xs text-muted-foreground">
                        <p className="font-medium mb-1">Recommendations:</p>
                        <ul className="list-disc list-inside space-y-1">
                          {area.recommendations.slice(0, 2).map((rec, recIdx) => (
                            <li key={recIdx}>{rec}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="ai-analysis" className="space-y-6">
          {!aiAnalysis ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center h-64">
                <Brain className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">AI Analysis Not Available</h3>
                <p className="text-muted-foreground text-center mb-4">
                  Run the AI analysis to get comprehensive insights, violation detection, and recommendations
                </p>
                <Button onClick={runAIAnalysis} disabled={aiLoading}>
                  {aiLoading ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Brain className="h-4 w-4 mr-2" />
                  )}
                  Run AI Analysis
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {/* AI Analysis Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5" />
                    AI Analysis Summary
                  </CardTitle>
                  <CardDescription>
                    Comprehensive AI-powered insights and recommendations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <h4 className="font-medium text-blue-900 mb-2">Summary</h4>
                      <p className="text-sm text-blue-800">{aiAnalysis.report.summary}</p>
                      <div className="mt-2 text-xs text-blue-700">
                        Confidence: {aiAnalysis.report.confidence}%
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-3 border rounded-lg">
                        <h5 className="font-medium mb-2">Compliance Score</h5>
                        <div className="text-2xl font-bold text-green-600">
                          {aiAnalysis.complianceCheck.overallScore}%
                        </div>
                      </div>
                      <div className="p-3 border rounded-lg">
                        <h5 className="font-medium mb-2">Risk Assessment</h5>
                        <Badge className={getRiskColor(aiAnalysis.riskAssessment.overallRisk)}>
                          {aiAnalysis.riskAssessment.overallRisk}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Violations Detected */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    Violations Detected
                  </CardTitle>
                  <CardDescription>
                    AI-identified compliance violations and recommendations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {aiAnalysis.complianceCheck.violations.map((violation, idx) => (
                      <div key={idx} className="p-3 border rounded-lg">
                        <div className="flex items-start justify-between mb-2">
                          <span className="font-medium text-sm">{violation.type}</span>
                          <Badge variant={violation.severity === 'CRITICAL' ? 'destructive' : 'secondary'}>
                            {violation.severity}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{violation.description}</p>
                        <p className="text-sm font-medium text-blue-600 mb-1">Recommendation:</p>
                        <p className="text-sm text-muted-foreground">{violation.recommendation}</p>
                        <p className="text-xs text-muted-foreground mt-2">
                          Reference: {violation.regulatoryReference}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Action Items */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    Recommended Actions
                  </CardTitle>
                  <CardDescription>
                    Prioritized action items based on AI analysis
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {aiAnalysis.report.actionItems.map((action, idx) => (
                      <div key={idx} className="p-3 border rounded-lg">
                        <div className="flex items-start justify-between mb-2">
                          <span className="font-medium text-sm">{action.action}</span>
                          <Badge variant={action.priority === 'HIGH' ? 'destructive' : 'secondary'}>
                            {action.priority}
                          </Badge>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          <p>Deadline: {action.deadline}</p>
                          <p>Responsible: {action.responsible}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        <TabsContent value="suppliers" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5" />
                Top Suppliers
              </CardTitle>
              <CardDescription>
                Supplier performance and risk analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analytics?.topSuppliers.map((supplier, idx) => (
                  <div key={idx} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">{supplier.name}</h4>
                      <div className="flex items-center space-x-2">
                        <Badge className={getRiskColor(supplier.riskLevel)}>
                          {supplier.riskLevel}
                        </Badge>
                        <Badge variant="outline">
                          {supplier.contracts} contracts
                        </Badge>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Total Value:</span>
                        <p className="font-medium">{formatCurrency(supplier.totalValue)}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Compliance:</span>
                        <p className="font-medium">{supplier.complianceScore}%</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Performance:</span>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${
                                i < Math.floor(supplier.complianceScore / 20)
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Procurement Detail Modal */}
      {selectedProcurement && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">{selectedProcurement.procurementTitle || selectedProcurement.title}</h3>
                <Button variant="ghost" onClick={() => setSelectedProcurement(null)}>
                  <XCircle className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Basic Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Entity:</span>
                      <span>{selectedProcurement.entityName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Category:</span>
                      <span>{selectedProcurement.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Supplier:</span>
                      <span>{selectedProcurement.supplierName || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Status:</span>
                      <Badge className={getStatusColor(selectedProcurement.complianceStatus || selectedProcurement.status)}>
                        {(selectedProcurement.complianceStatus || selectedProcurement.status)?.replace('_', ' ')}
                      </Badge>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Financial Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Actual Value:</span>
                      <span>{formatCurrency(selectedProcurement.actualValue, selectedProcurement.currency)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Contract Award Date:</span>
                      <span>{selectedProcurement.contractAwardDate ? new Date(selectedProcurement.contractAwardDate).toLocaleDateString() : 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Risk Level:</span>
                      <Badge className={getRiskColor(selectedProcurement.riskLevel)}>
                        {selectedProcurement.riskLevel}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Compliance:</span>
                      <span>{selectedProcurement.complianceStatus || 'N/A'}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Compliance & Risk</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Compliance Score:</span>
                      <span>{selectedProcurement.complianceScore}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Risk Level:</span>
                      <Badge className={getRiskColor(selectedProcurement.riskLevel)}>
                        {selectedProcurement.riskLevel}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Local Content:</span>
                      <span>{selectedProcurement.localContentPercentage}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Sustainability:</span>
                      <span>{selectedProcurement.sustainabilityScore}%</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Contract Timeline</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Award Date:</span>
                      <span>{selectedProcurement.contractAwardDate ? new Date(selectedProcurement.contractAwardDate).toLocaleDateString() : 'N/A'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}