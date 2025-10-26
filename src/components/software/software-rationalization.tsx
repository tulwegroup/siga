'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Monitor, 
  DollarSign, 
  AlertTriangle, 
  TrendingUp,
  Package,
  Shield,
  Target,
  BarChart3,
  PieChart,
  Filter,
  Download,
  Settings,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react';

interface SoftwareLicense {
  id: string;
  entityId: string;
  entityName: string;
  softwareName: string;
  vendor: string;
  licenseType: string;
  totalLicenses: number;
  usedLicenses: number;
  annualCost: number;
  expiryDate: string;
  category: string;
  department: string;
  utilizationRate: number;
  lastAuditDate: string;
  complianceStatus: string;
  sharable: boolean;
  consolidationOpportunity: boolean;
  potentialSavings: number;
  riskLevel: string;
}

interface SoftwareAnalytics {
  overview: {
    totalSoftware: number;
    totalCost: number;
    totalLicenses: number;
    usedLicenses: number;
    utilizationRate: number;
    highRiskCount: number;
    nonCompliantCount: number;
    consolidationOpportunities: number;
    totalPotentialSavings: number;
  };
  categoryBreakdown: Record<string, { count: number; cost: number; licenses: number }>;
  vendorBreakdown: Record<string, { count: number; cost: number; licenses: number }>;
  riskDistribution: {
    LOW: number;
    MEDIUM: number;
    HIGH: number;
  };
}

export function SoftwareRationalization() {
  const [software, setSoftware] = useState<SoftwareLicense[]>([]);
  const [analytics, setAnalytics] = useState<SoftwareAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: 'all',
    riskLevel: 'all',
    entityId: 'all'
  });

  useEffect(() => {
    fetchSoftwareData();
  }, [filters]);

  const fetchSoftwareData = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (filters.category !== 'all') params.append('category', filters.category);
      if (filters.riskLevel !== 'all') params.append('riskLevel', filters.riskLevel);
      if (filters.entityId !== 'all') params.append('entityId', filters.entityId);

      const response = await fetch(`/api/software-rationalization?${params}`);
      const data = await response.json();
      
      setSoftware(data.software);
      setAnalytics(data.analytics);
    } catch (error) {
      console.error('Error fetching software data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return `GHS ${(amount / 1000).toFixed(0)}K`;
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'LOW': return 'text-green-600 bg-green-50';
      case 'MEDIUM': return 'text-yellow-600 bg-yellow-50';
      case 'HIGH': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getComplianceColor = (status: string) => {
    switch (status) {
      case 'COMPLIANT': return 'text-green-600';
      case 'NON_COMPLIANT': return 'text-red-600';
      default: return 'text-yellow-600';
    }
  };

  const handleOptimization = async (softwareId: string, softwareData: any) => {
    try {
      const response = await fetch('/api/software-rationalization', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'optimize',
          softwareId,
          data: softwareData
        })
      });
      
      const result = await response.json();
      console.log('Optimization recommendations:', result.recommendations);
    } catch (error) {
      console.error('Error getting optimization recommendations:', error);
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
          <h2 className="text-2xl font-bold">Software Rationalization</h2>
          <p className="text-muted-foreground">
            Optimize software licenses and reduce IT costs across all entities
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
            <CardTitle className="text-sm font-medium">Total Software</CardTitle>
            <Monitor className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics?.overview.totalSoftware}</div>
            <p className="text-xs text-muted-foreground">
              Across all entities
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Annual Cost</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {analytics && formatCurrency(analytics.overview.totalCost)}
            </div>
            <p className="text-xs text-muted-foreground">
              Software licensing
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Utilization Rate</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics?.overview.utilizationRate}%</div>
            <p className="text-xs text-muted-foreground">
              License utilization
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Potential Savings</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {analytics && formatCurrency(analytics.overview.totalPotentialSavings)}
            </div>
            <p className="text-xs text-muted-foreground">
              Optimization opportunities
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
          <div className="flex gap-4">
            <Select value={filters.category} onValueChange={(value) => setFilters(prev => ({ ...prev, category: value }))}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Productivity">Productivity</SelectItem>
                <SelectItem value="ERP">ERP</SelectItem>
                <SelectItem value="Database">Database</SelectItem>
                <SelectItem value="Design">Design</SelectItem>
                <SelectItem value="Engineering">Engineering</SelectItem>
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
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="licenses">Licenses</TabsTrigger>
          <TabsTrigger value="optimization">Optimization</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
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
                  Software distribution by category
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analytics && Object.entries(analytics.categoryBreakdown).map(([category, data]) => (
                    <div key={category} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{category}</span>
                        <span className="text-sm text-muted-foreground">
                          {data.count} software • {formatCurrency(data.cost)}
                        </span>
                      </div>
                      <Progress value={(data.cost / analytics.overview.totalCost) * 100} className="h-2" />
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
                  Software license risk levels
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analytics && Object.entries(analytics.riskDistribution).map(([level, count]) => (
                    <div key={level} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className={`text-sm font-medium px-2 py-1 rounded ${getRiskColor(level)}`}>
                          {level}
                        </span>
                        <span className="text-sm text-muted-foreground">{count} software</span>
                      </div>
                      <Progress value={(count / analytics.overview.totalSoftware) * 100} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="licenses" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Software Licenses</CardTitle>
              <CardDescription>
                Detailed view of all software licenses across entities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {software.map((license) => (
                  <div key={license.id} className="border rounded-lg p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">{license.softwareName}</h3>
                        <p className="text-sm text-muted-foreground">{license.entityName} • {license.department}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getRiskColor(license.riskLevel)}>
                          {license.riskLevel}
                        </Badge>
                        {license.consolidationOpportunity && (
                          <Badge variant="outline">Consolidation Opportunity</Badge>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Vendor:</span>
                        <p className="font-medium">{license.vendor}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Licenses:</span>
                        <p className="font-medium">{license.usedLicenses}/{license.totalLicenses}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Utilization:</span>
                        <p className="font-medium">{license.utilizationRate}%</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Annual Cost:</span>
                        <p className="font-medium">{formatCurrency(license.annualCost)}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          {license.complianceStatus === 'COMPLIANT' ? (
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          ) : (
                            <XCircle className="h-4 w-4 text-red-600" />
                          )}
                          <span className={getComplianceColor(license.complianceStatus)}>
                            {license.complianceStatus.replace('_', ' ')}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>Expires: {new Date(license.expiryDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleOptimization(license.id, license)}
                      >
                        Optimize
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="optimization" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Consolidation Opportunities</CardTitle>
                <CardDescription>
                  Software that can be consolidated across entities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {software.filter(s => s.consolidationOpportunity).map((license) => (
                    <div key={license.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{license.softwareName}</h4>
                        <span className="text-green-600 font-medium">
                          Save {formatCurrency(license.potentialSavings)}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {license.entityName} • {license.totalLicenses} licenses
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Underutilized Software</CardTitle>
                <CardDescription>
                  Software with low utilization rates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {software.filter(s => s.utilizationRate < 50).map((license) => (
                    <div key={license.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{license.softwareName}</h4>
                        <span className="text-orange-600 font-medium">
                          {license.utilizationRate}% utilized
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {license.usedLicenses}/{license.totalLicenses} licenses used
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Compliance Status</CardTitle>
              <CardDescription>
                Software license compliance across all entities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {software.filter(s => s.complianceStatus !== 'COMPLIANT').map((license) => (
                  <div key={license.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{license.softwareName}</h4>
                      <Badge variant="destructive">
                        {license.complianceStatus.replace('_', ' ')}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {license.entityName} • Last audit: {new Date(license.lastAuditDate).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}