'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Server, 
  HardDrive, 
  Zap, 
  Thermometer,
  MapPin,
  Shield,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Cloud,
  BarChart3,
  PieChart,
  Filter,
  Download,
  Settings,
  Activity,
  Database,
  Power
} from 'lucide-react';

interface DataCenter {
  id: string;
  entityId: string;
  entityName: string;
  dataCenterName: string;
  location: string;
  type: string;
  status: string;
  totalRacks: number;
  usedRacks: number;
  totalServers: number;
  activeServers: number;
  storageCapacityTB: number;
  usedStorageTB: number;
  powerCapacityKw: number;
  currentPowerUsageKw: number;
  coolingCapacity: string;
  currentCoolingLoad: number;
  uptimePercentage: number;
  lastMaintenanceDate: string;
  nextMaintenanceDate: string;
  securityLevel: string;
  complianceStatus: string;
  staffCount: number;
  annualOperatingCost: number;
  pue: number;
  hasDisasterRecovery: boolean;
  drLocation: string | null;
  cloudProvider: string;
  cloudServices: string[];
  optimizationOpportunities: Array<{
    type: string;
    description: string;
    potentialSavings: number;
    implementationTime: string;
  }>;
  riskLevel: string;
}

interface DataCenterAnalytics {
  overview: {
    totalDataCenters: number;
    totalRacks: number;
    usedRacks: number;
    rackUtilization: number;
    totalServers: number;
    activeServers: number;
    serverUtilization: number;
    totalStorage: number;
    usedStorage: number;
    storageUtilization: number;
    totalPowerCapacity: number;
    currentPowerUsage: number;
    powerUtilization: number;
    totalOperatingCost: number;
    averagePUE: number;
    highRiskCount: number;
    nonCompliantCount: number;
    withDisasterRecovery: number;
    totalOptimizationSavings: number;
  };
  locationBreakdown: Record<string, { count: number; racks: number; servers: number; cost: number }>;
  typeBreakdown: Record<string, { count: number; racks: number; servers: number; cost: number }>;
  riskDistribution: {
    LOW: number;
    MEDIUM: number;
    HIGH: number;
  };
}

export function DataCenterOptimization() {
  const [dataCenters, setDataCenters] = useState<DataCenter[]>([]);
  const [analytics, setAnalytics] = useState<DataCenterAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    riskLevel: 'all',
    type: 'all',
    entityId: 'all'
  });

  useEffect(() => {
    fetchDataCenterData();
  }, [filters]);

  const fetchDataCenterData = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (filters.riskLevel !== 'all') params.append('riskLevel', filters.riskLevel);
      if (filters.type !== 'all') params.append('type', filters.type);
      if (filters.entityId !== 'all') params.append('entityId', filters.entityId);

      const response = await fetch(`/api/data-center-optimization?${params}`);
      const data = await response.json();
      
      setDataCenters(data.dataCenters);
      setAnalytics(data.analytics);
    } catch (error) {
      console.error('Error fetching data center data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return `GHS ${(amount / 1000000).toFixed(1)}M`;
  };

  const formatStorage = (tb: number) => {
    if (tb >= 1000) {
      return `${(tb / 1000).toFixed(1)} PB`;
    }
    return `${tb} TB`;
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

  const handleOptimization = async (dataCenterId: string, dataCenterData: any) => {
    try {
      const response = await fetch('/api/data-center-optimization', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'optimize',
          dataCenterId,
          data: dataCenterData
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
          <h2 className="text-2xl font-bold">Data Center Optimization</h2>
          <p className="text-muted-foreground">
            Optimize infrastructure utilization and reduce operational costs
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
            <CardTitle className="text-sm font-medium">Data Centers</CardTitle>
            <Server className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics?.overview.totalDataCenters}</div>
            <p className="text-xs text-muted-foreground">
              Across all entities
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Utilization</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics?.overview.rackUtilization}%</div>
            <p className="text-xs text-muted-foreground">
              Rack utilization rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">PUE Rating</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics?.overview.averagePUE}</div>
            <p className="text-xs text-muted-foreground">
              Power usage effectiveness
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
              {analytics && formatCurrency(analytics.overview.totalOptimizationSavings)}
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
            <Select value={filters.type} onValueChange={(value) => setFilters(prev => ({ ...prev, type: value }))}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="PRIMARY">Primary</SelectItem>
                <SelectItem value="SECONDARY">Secondary</SelectItem>
                <SelectItem value="DR">Disaster Recovery</SelectItem>
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
          <TabsTrigger value="infrastructure">Infrastructure</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="optimization">Optimization</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Location Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Location Breakdown
                </CardTitle>
                <CardDescription>
                  Data centers by geographic location
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analytics && Object.entries(analytics.locationBreakdown).map(([location, data]) => (
                    <div key={location} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{location}</span>
                        <span className="text-sm text-muted-foreground">
                          {data.count} DCs • {data.racks} racks
                        </span>
                      </div>
                      <Progress value={(data.cost / analytics.overview.totalOperatingCost) * 100} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Type Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Server className="h-5 w-5" />
                  Type Breakdown
                </CardTitle>
                <CardDescription>
                  Data centers by operational type
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analytics && Object.entries(analytics.typeBreakdown).map(([type, data]) => (
                    <div key={type} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{type}</span>
                        <span className="text-sm text-muted-foreground">
                          {data.count} DCs • {data.servers} servers
                        </span>
                      </div>
                      <Progress value={(data.cost / analytics.overview.totalOperatingCost) * 100} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="infrastructure" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Infrastructure Overview</CardTitle>
              <CardDescription>
                Detailed infrastructure metrics for all data centers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dataCenters.map((dc) => (
                  <div key={dc.id} className="border rounded-lg p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">{dc.dataCenterName}</h3>
                        <p className="text-sm text-muted-foreground">{dc.entityName} • {dc.location}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getRiskColor(dc.riskLevel)}>
                          {dc.riskLevel}
                        </Badge>
                        <Badge variant="outline">{dc.type}</Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Racks:</span>
                        <p className="font-medium">{dc.usedRacks}/{dc.totalRacks}</p>
                        <Progress value={(dc.usedRacks / dc.totalRacks) * 100} className="h-1 mt-1" />
                      </div>
                      <div>
                        <span className="text-muted-foreground">Servers:</span>
                        <p className="font-medium">{dc.activeServers}/{dc.totalServers}</p>
                        <Progress value={(dc.activeServers / dc.totalServers) * 100} className="h-1 mt-1" />
                      </div>
                      <div>
                        <span className="text-muted-foreground">Storage:</span>
                        <p className="font-medium">{formatStorage(dc.usedStorageTB)}/{formatStorage(dc.storageCapacityTB)}</p>
                        <Progress value={(dc.usedStorageTB / dc.storageCapacityTB) * 100} className="h-1 mt-1" />
                      </div>
                      <div>
                        <span className="text-muted-foreground">Power:</span>
                        <p className="font-medium">{dc.currentPowerUsageKw}/{dc.powerCapacityKw} kW</p>
                        <Progress value={(dc.currentPowerUsageKw / dc.powerCapacityKw) * 100} className="h-1 mt-1" />
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Activity className="h-4 w-4 text-muted-foreground" />
                          <span>PUE: {dc.pue}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Shield className="h-4 w-4 text-muted-foreground" />
                          <span>{dc.securityLevel}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          {dc.hasDisasterRecovery ? (
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          ) : (
                            <XCircle className="h-4 w-4 text-red-600" />
                          )}
                          <span>DR: {dc.hasDisasterRecovery ? 'Yes' : 'No'}</span>
                        </div>
                      </div>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleOptimization(dc.id, dc)}
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

        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Power Efficiency</CardTitle>
                <CardDescription>
                  Power usage effectiveness (PUE) ratings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dataCenters.map((dc) => (
                    <div key={dc.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{dc.dataCenterName}</span>
                        <span className={`text-sm font-medium ${
                          dc.pue <= 1.3 ? 'text-green-600' : 
                          dc.pue <= 1.5 ? 'text-yellow-600' : 'text-red-600'
                        }`}>
                          PUE: {dc.pue}
                        </span>
                      </div>
                      <Progress 
                        value={Math.max(0, Math.min(100, (2 - dc.pue) * 100))} 
                        className="h-2" 
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Uptime Performance</CardTitle>
                <CardDescription>
                  Data center availability metrics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dataCenters.map((dc) => (
                    <div key={dc.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{dc.dataCenterName}</span>
                        <span className={`text-sm font-medium ${
                          dc.uptimePercentage >= 99.9 ? 'text-green-600' : 
                          dc.uptimePercentage >= 99.5 ? 'text-yellow-600' : 'text-red-600'
                        }`}>
                          {dc.uptimePercentage}% uptime
                        </span>
                      </div>
                      <Progress value={dc.uptimePercentage} className="h-2" />
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
                <CardTitle>Optimization Opportunities</CardTitle>
                <CardDescription>
                  Identified cost-saving opportunities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dataCenters.map((dc) => (
                    <div key={dc.id} className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">{dc.dataCenterName}</h4>
                      <div className="space-y-2">
                        {dc.optimizationOpportunities.map((opp, index) => (
                          <div key={index} className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">{opp.description}</span>
                            <span className="text-green-600 font-medium">
                              Save {formatCurrency(opp.potentialSavings)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cloud Migration Potential</CardTitle>
                <CardDescription>
                  Hybrid cloud opportunities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dataCenters.map((dc) => (
                    <div key={dc.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{dc.dataCenterName}</h4>
                        <div className="flex items-center gap-1">
                          <Cloud className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{dc.cloudProvider}</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {dc.cloudServices.map((service, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {service}
                          </Badge>
                        ))}
                      </div>
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
                Data center compliance and security status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dataCenters.filter(dc => dc.complianceStatus !== 'COMPLIANT').map((dc) => (
                  <div key={dc.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{dc.dataCenterName}</h4>
                      <Badge variant="destructive">
                        {dc.complianceStatus.replace('_', ' ')}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {dc.entityName} • Security Level: {dc.securityLevel}
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