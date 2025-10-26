'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { AgentDashboard } from '@/components/agents/agent-dashboard';
import { EntityTable } from '@/components/entities/entity-table';
import { SoftwareRationalization } from '@/components/software/software-rationalization';
import { DataCenterOptimization } from '@/components/datacenter/data-center-optimization';
import { ComprehensiveProcurementDashboard } from '@/components/procurement/comprehensive-procurement-dashboard';
import { 
  Building2, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Users, 
  DollarSign,
  Shield,
  Activity,
  BarChart3,
  PieChart
} from 'lucide-react';

interface Entity {
  id: string;
  entityId: string;
  name: string;
  category: string;
  sector: string;
  parentMinistry: string;
  status: string;
}

interface DashboardData {
  overview: {
    totalEntities: number;
    entityCounts: Array<{ category: string; _count: { id: number } }>;
    sectorCounts: Array<{ sector: string; _count: { id: number } }>;
    statusCounts: Array<{ status: string; _count: { id: number } }>;
  };
  risk: {
    low: number;
    medium: number;
    high: number;
    critical: number;
  };
  compliance: {
    compliant: number;
    pending: number;
    overdue: number;
    nonCompliant: number;
  };
  portfolio: {
    totalAssets: number;
    totalRevenue: number;
    totalEmployees: number;
    dividendOwed: number;
    guaranteesOutstanding: number;
  };
}

export default function Home() {
  const [entities, setEntities] = useState<Entity[]>([]);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [entitiesRes, dashboardRes] = await Promise.all([
        fetch('/api/entities'),
        fetch('/api/dashboard')
      ]);

      if (!entitiesRes.ok || !dashboardRes.ok) {
        throw new Error('Failed to fetch data');
      }

      const entitiesData = await entitiesRes.json();
      const dashboardData = await dashboardRes.json();

      setEntities(entitiesData);
      setDashboardData(dashboardData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return `GHS ${(amount / 1000000000).toFixed(1)}B`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'bg-green-500';
      case 'UNDER_RESTRUCTURING': return 'bg-yellow-500';
      case 'INACTIVE': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'low': return 'text-green-600';
      case 'medium': return 'text-yellow-600';
      case 'high': return 'text-orange-600';
      case 'critical': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const handleEntityClick = (entity: Entity) => {
    // Open entity detail in new window or navigate to entity page
    window.open(`/entity?id=${entity.id}`, '_blank');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Shield className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-3xl font-bold">SIGA-iGOV</h1>
                <p className="text-muted-foreground">
                  State Interests and Governance Authority - Oversight Intelligence Platform
                </p>
              </div>
            </div>
            <Badge variant="outline" className="text-sm">
              {entities.length} Entities Monitored
            </Badge>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Entities</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardData?.overview.totalEntities}</div>
              <p className="text-xs text-muted-foreground">
                SOEs, JVCs & OSEs
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Portfolio Assets</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {dashboardData && formatCurrency(dashboardData.portfolio.totalAssets)}
              </div>
              <p className="text-xs text-muted-foreground">
                Total state assets
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {dashboardData?.portfolio.totalEmployees.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                Across all entities
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Compliance Rate</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardData?.compliance.compliant}%</div>
              <p className="text-xs text-muted-foreground">
                Entities compliant
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="entities">Entities</TabsTrigger>
            <TabsTrigger value="software">Software</TabsTrigger>
            <TabsTrigger value="infrastructure">Infrastructure</TabsTrigger>
            <TabsTrigger value="procurement">Procurement</TabsTrigger>
            <TabsTrigger value="risk">Risk Analysis</TabsTrigger>
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="agents">AI Agents</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Entity Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="h-5 w-5" />
                    Entity Distribution
                  </CardTitle>
                  <CardDescription>
                    Breakdown by entity category
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {dashboardData?.overview.entityCounts.map((item) => (
                      <div key={item.category} className="flex items-center justify-between">
                        <span className="text-sm font-medium">{item.category}</span>
                        <Badge variant="secondary">{item._count.id}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Sector Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Sector Distribution
                  </CardTitle>
                  <CardDescription>
                    Entities by economic sector
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {dashboardData?.overview.sectorCounts.map((item) => (
                      <div key={item.sector} className="flex items-center justify-between">
                        <span className="text-sm font-medium">{item.sector}</span>
                        <Badge variant="secondary">{item._count.id}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="entities" className="space-y-6">
            <EntityTable entities={entities} onEntityClick={handleEntityClick} />
          </TabsContent>

          <TabsContent value="software" className="space-y-6">
            <SoftwareRationalization />
          </TabsContent>

          <TabsContent value="infrastructure" className="space-y-6">
            <DataCenterOptimization />
          </TabsContent>

          <TabsContent value="procurement" className="space-y-6">
            <ComprehensiveProcurementDashboard />
          </TabsContent>

          <TabsContent value="risk" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Risk Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    Risk Distribution
                  </CardTitle>
                  <CardDescription>
                    Current risk levels across all entities
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(dashboardData?.risk || {}).map(([level, count]) => (
                      <div key={level} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className={`text-sm font-medium capitalize ${getRiskColor(level)}`}>
                            {level}
                          </span>
                          <span className="text-sm">{count}%</span>
                        </div>
                        <Progress value={count} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Compliance Overview */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    Compliance Status
                  </CardTitle>
                  <CardDescription>
                    Regulatory compliance across entities
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(dashboardData?.compliance || {}).map(([status, count]) => (
                      <div key={status} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium capitalize">
                            {status.replace('_', ' ')}
                          </span>
                          <span className="text-sm">{count}%</span>
                        </div>
                        <Progress value={count} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="portfolio" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Financial Metrics */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5" />
                    Financial Metrics
                  </CardTitle>
                  <CardDescription>
                    Portfolio financial overview
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Total Revenue</span>
                      <span className="text-sm font-bold">
                        {dashboardData && formatCurrency(dashboardData.portfolio.totalRevenue)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Dividends Owed</span>
                      <span className="text-sm font-bold text-red-600">
                        {dashboardData && formatCurrency(dashboardData.portfolio.dividendOwed)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">State Guarantees</span>
                      <span className="text-sm font-bold">
                        {dashboardData && formatCurrency(dashboardData.portfolio.guaranteesOutstanding)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Portfolio Activity */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Portfolio Activity
                  </CardTitle>
                  <CardDescription>
                    Recent portfolio movements
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Q3 2024 Performance</span>
                        <Badge variant="secondary">Latest</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Portfolio showing strong recovery with 8.3% revenue growth compared to Q2 2024.
                      </p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Risk Assessment Update</span>
                        <Badge variant="outline">Weekly</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        3 entities moved to high-risk category requiring immediate intervention.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="agents" className="space-y-6">
            <AgentDashboard />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}