'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
  Calculator
} from 'lucide-react';

interface Procurement {
  id: string;
  entityId: string;
  entityName: string;
  procurementId: string;
  title: string;
  category: string;
  vendor: string;
  value: number;
  currency: string;
  procurementMethod: string;
  status: string;
  awardDate: string | null;
  contractStartDate: string | null;
  contractEndDate: string | null;
  description: string;
  evaluationCriteria: string[];
  complianceScore: number;
  riskLevel: string;
  procurementOfficer: string;
  department: string;
  justification: string;
  alternativesConsidered: number;
  negotiationSavings: number;
  benchmarkPrice: number;
  marketCompetitiveness: string;
  deliveryTimeline: string;
  paymentTerms: string;
  penalties: string;
  performanceGuarantee: string;
  insuranceRequirement: string;
  sustainabilityScore: number;
  localContentPercentage: number;
  smesParticipated: number;
  smesAwarded: number;
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
    averageLocalContent: number;
    totalSMEsParticipated: number;
    totalSMEsAwarded: number;
    smeSuccessRate: number;
    averageSustainabilityScore: number;
  };
  categoryBreakdown: Record<string, { count: number; value: number; compliance: number }>;
  methodBreakdown: Record<string, { count: number; value: number; compliance: number }>;
  vendorBreakdown: Record<string, { count: number; value: number; compliance: number }>;
  riskDistribution: {
    LOW: number;
    MEDIUM: number;
    HIGH: number;
  };
}

export function ProcurementAnalysis() {
  const [procurements, setProcurements] = useState<Procurement[]>([]);
  const [analytics, setAnalytics] = useState<ProcurementAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: 'all',
    status: 'all',
    riskLevel: 'all',
    entityId: 'all'
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

      const response = await fetch(`/api/procurement-analysis?${params}`);
      const data = await response.json();
      
      setProcurements(data.procurements);
      setAnalytics(data.analytics);
    } catch (error) {
      console.error('Error fetching procurement data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number, currency: string = 'GHS') => {
    if (amount >= 1000000) {
      return `${currency} ${(amount / 1000000).toFixed(1)}M`;
    } else if (amount >= 1000) {
      return `${currency} ${(amount / 1000).toFixed(0)}K`;
    }
    return `${currency} ${amount}`;
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'LOW': return 'text-green-600 bg-green-50';
      case 'MEDIUM': return 'text-yellow-600 bg-yellow-50';
      case 'HIGH': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'AWARDED': return 'text-green-600 bg-green-50';
      case 'UNDER_EVALUATION': return 'text-blue-600 bg-blue-50';
      case 'PENDING_APPROVAL': return 'text-yellow-600 bg-yellow-50';
      case 'CONTRACT_NEGOTIATION': return 'text-purple-600 bg-purple-50';
      default: return 'text-gray-600 bg-gray-50';
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

  const handleAnalysis = async (procurementId: string, procurementData: any) => {
    try {
      const response = await fetch('/api/procurement-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'analyze',
          procurementId,
          data: procurementData
        })
      });
      
      const result = await response.json();
      console.log('Procurement analysis:', result.analysis);
    } catch (error) {
      console.error('Error getting procurement analysis:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Procurement Analysis</h2>
          <p className="text-muted-foreground">
            Analyze procurement processes and optimize vendor management
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Configure
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
            <div className="text-2xl font-bold">{analytics?.overview.totalProcurements}</div>
            <p className="text-xs text-muted-foreground">
              Across all entities
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
              {analytics && formatCurrency(analytics.overview.totalValue)}
            </div>
            <p className="text-xs text-muted-foreground">
              Contract value
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Compliance Score</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics?.overview.averageComplianceScore}%</div>
            <p className="text-xs text-muted-foreground">
              Average compliance
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
              {analytics && formatCurrency(analytics.overview.totalNegotiationSavings)}
            </div>
            <p className="text-xs text-muted-foreground">
              {analytics?.overview.totalSavingsPercentage}% savings rate
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Local Content</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics?.overview.averageLocalContent}%</div>
            <p className="text-xs text-muted-foreground">
              Average local content
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">SME Success Rate</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics?.overview.smeSuccessRate}%</div>
            <p className="text-xs text-muted-foreground">
              {analytics?.overview.totalSMEsAwarded}/{analytics?.overview.totalSMEsParticipated} awarded
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sustainability Score</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics?.overview.averageSustainabilityScore}%</div>
            <p className="text-xs text-muted-foreground">
              Environmental impact
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 flex-wrap">
            <Select value={filters.category} onValueChange={(value) => setFilters(prev => ({ ...prev, category: value }))}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="SOFTWARE">Software</SelectItem>
                <SelectItem value="INFRASTRUCTURE">Infrastructure</SelectItem>
                <SelectItem value="SERVICES">Services</SelectItem>
                <SelectItem value="GOODS">Goods</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filters.status} onValueChange={(value) => setFilters(prev => ({ ...prev, status: value }))}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="AWARDED">Awarded</SelectItem>
                <SelectItem value="UNDER_EVALUATION">Under Evaluation</SelectItem>
                <SelectItem value="PENDING_APPROVAL">Pending Approval</SelectItem>
                <SelectItem value="CONTRACT_NEGOTIATION">Contract Negotiation</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filters.riskLevel} onValueChange={(value) => setFilters(prev => ({ ...prev, riskLevel: value }))}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Risk Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Risk Levels</SelectItem>
                <SelectItem value="LOW">Low Risk</SelectItem>
                <SelectItem value="MEDIUM">Medium Risk</SelectItem>
                <SelectItem value="HIGH">High Risk</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="procurements">Procurements</TabsTrigger>
          <TabsTrigger value="vendors">Vendors</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
          <TabsTrigger value="optimization">Optimization</TabsTrigger>
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
                  {analytics && Object.entries(analytics.categoryBreakdown).map(([category, data]) => (
                    <div key={category} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{category}</span>
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
          </div>
        </TabsContent>

        <TabsContent value="procurements" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Procurement Portfolio</CardTitle>
              <CardDescription>
                Detailed view of all procurement activities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {procurements.map((procurement) => (
                  <div key={procurement.id} className="border rounded-lg p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">{procurement.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {procurement.entityName} • {procurement.procurementId}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getRiskColor(procurement.riskLevel)}>
                          {procurement.riskLevel}
                        </Badge>
                        <Badge className={getStatusColor(procurement.status)}>
                          {procurement.status.replace('_', ' ')}
                        </Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Value:</span>
                        <p className="font-medium">{formatCurrency(procurement.value, procurement.currency)}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Vendor:</span>
                        <p className="font-medium">{procurement.vendor}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Method:</span>
                        <p className="font-medium">{procurement.procurementMethod.replace('_', ' ')}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Compliance:</span>
                        <p className="font-medium">{procurement.complianceScore}%</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Local Content:</span>
                        <p className="font-medium">{procurement.localContentPercentage}%</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">SMEs:</span>
                        <p className="font-medium">{procurement.smesAwarded}/{procurement.smesParticipated}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Sustainability:</span>
                        <p className="font-medium">{procurement.sustainabilityScore}%</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Savings:</span>
                        <p className="font-medium text-green-600">
                          {formatCurrency(procurement.negotiationSavings, procurement.currency)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Award className="h-4 w-4 text-muted-foreground" />
                          <span className={getCompetitivenessColor(procurement.marketCompetitiveness)}>
                            {procurement.marketCompetitiveness} competitiveness
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span>{procurement.alternativesConsidered} alternatives</span>
                        </div>
                      </div>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleAnalysis(procurement.id, procurement)}
                      >
                        Analyze
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vendors" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Vendor Analysis</CardTitle>
              <CardDescription>
                Vendor performance and relationship analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analytics && Object.entries(analytics.vendorBreakdown).map(([vendor, data]) => (
                  <div key={vendor} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{vendor}</h4>
                      <span className="text-sm text-muted-foreground">
                        {data.count} contracts • {formatCurrency(data.value)}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Shield className="h-4 w-4 text-muted-foreground" />
                        <span>Compliance: {Math.round(data.compliance / data.count)}%</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calculator className="h-4 w-4 text-muted-foreground" />
                        <span>Avg: {formatCurrency(data.value / data.count)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Compliance Overview</CardTitle>
                <CardDescription>
                  Procurement compliance metrics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Average Compliance Score</span>
                    <span className="text-2xl font-bold text-green-600">
                      {analytics?.overview.averageComplianceScore}%
                    </span>
                  </div>
                  <Progress value={analytics?.overview.averageComplianceScore} className="h-3" />
                  
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">
                        {analytics?.overview.awardedContracts}
                      </div>
                      <p className="text-sm text-muted-foreground">Awarded</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        {analytics?.overview.underEvaluation}
                      </div>
                      <p className="text-sm text-muted-foreground">Under Evaluation</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Risk Assessment</CardTitle>
                <CardDescription>
                  Procurement risk distribution
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analytics && Object.entries(analytics.riskDistribution).map(([level, count]) => (
                    <div key={level} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className={`text-sm font-medium px-2 py-1 rounded ${getRiskColor(level)}`}>
                          {level} Risk
                        </span>
                        <span className="text-sm text-muted-foreground">{count} procurements</span>
                      </div>
                      <Progress value={(count / analytics.overview.totalProcurements) * 100} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="optimization" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Savings Opportunities</CardTitle>
                <CardDescription>
                  Identified cost-saving opportunities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">
                      {analytics && formatCurrency(analytics.overview.totalNegotiationSavings)}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Total Savings Achieved
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Savings Rate</span>
                      <span className="font-medium">{analytics?.overview.totalSavingsPercentage}%</span>
                    </div>
                    <Progress value={analytics?.overview.totalSavingsPercentage} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Local Content & SMEs</CardTitle>
                <CardDescription>
                  Local content and SME participation metrics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Average Local Content</span>
                      <span className="font-medium">{analytics?.overview.averageLocalContent}%</span>
                    </div>
                    <Progress value={analytics?.overview.averageLocalContent} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">SME Success Rate</span>
                      <span className="font-medium">{analytics?.overview.smeSuccessRate}%</span>
                    </div>
                    <Progress value={analytics?.overview.smeSuccessRate} className="h-2" />
                  </div>
                  
                  <div className="text-center text-sm text-muted-foreground">
                    {analytics?.overview.totalSMEsAwarded} of {analytics?.overview.totalSMEsParticipated} SMEs awarded contracts
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}