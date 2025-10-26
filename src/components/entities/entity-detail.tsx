'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Building2, 
  Users, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Calendar,
  DollarSign,
  Shield,
  Activity,
  FileText,
  User,
  Mail,
  Phone,
  Globe
} from 'lucide-react';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

interface EntityDetail {
  id: string;
  entityId: string;
  name: string;
  category: string;
  sector: string;
  parentMinistry: string;
  status: string;
  contactEmail?: string;
  contactPhone?: string;
  website?: string;
  description?: string;
  establishedDate?: string;
  boardMembers: Array<{
    id: string;
    name: string;
    position: string;
    isChairperson: boolean;
    appointmentDate?: string;
    termEndDate?: string;
    email?: string;
  }>;
  riskScores: Array<{
    period: string;
    overallScore: number;
    financialRisk: number;
    operationalRisk: number;
    governanceRisk: number;
    complianceRisk: number;
  }>;
  complianceLogs: Array<{
    id: string;
    requirement: string;
    category: string;
    status: string;
    dueDate: string;
    completedDate?: string;
    assignedTo: string;
    notes?: string;
  }>;
  kpiData: Array<{
    period: string;
    revenue: number;
    profit: number;
    assets: number;
    liabilities: number;
    roa: number;
    roe: number;
    debtToEquity: number;
    employeeCount: number;
    serviceDeliveryIndex: number;
    customerSatisfaction: number;
  }>;
  dividends: Array<{
    year: number;
    amountDeclared: number;
    amountPaid: number;
    status: string;
  }>;
  guarantees: Array<{
    guaranteeType: string;
    amount: number;
    currency: string;
    issuedDate: string;
    status: string;
    purpose: string;
  }>;
}

interface EntityDetailProps {
  entityId: string;
}

export function EntityDetail({ entityId }: EntityDetailProps) {
  const [entity, setEntity] = useState<EntityDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEntityDetails();
  }, [entityId]);

  const fetchEntityDetails = async () => {
    try {
      const response = await fetch(`/api/entities/${entityId}`);
      if (!response.ok) throw new Error('Failed to fetch entity details');
      const data = await response.json();
      setEntity(data);
    } catch (error) {
      console.error('Error fetching entity details:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return `GHS ${(amount / 1000000).toFixed(1)}M`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'bg-green-500';
      case 'UNDER_RESTRUCTURING': return 'bg-yellow-500';
      case 'INACTIVE': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getRiskColor = (score: number) => {
    if (score < 30) return 'text-green-600';
    if (score < 60) return 'text-yellow-600';
    if (score < 80) return 'text-orange-600';
    return 'text-red-600';
  };

  const getComplianceColor = (status: string) => {
    switch (status) {
      case 'COMPLIANT': return 'bg-green-100 text-green-800';
      case 'PENDING': return 'bg-yellow-100 text-yellow-800';
      case 'OVERDUE': return 'bg-red-100 text-red-800';
      case 'NON_COMPLIANT': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!entity) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Entity Not Found</h2>
          <p className="text-muted-foreground">The requested entity could not be found.</p>
        </div>
      </div>
    );
  }

  const latestRiskScore = entity.riskScores?.[0];
  const latestKpi = entity.kpiData?.[0];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Building2 className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-3xl font-bold">{entity.name}</h1>
                <p className="text-muted-foreground">
                  {entity.sector} • {entity.parentMinistry}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline">{entity.entityId}</Badge>
              <Badge variant="secondary">{entity.category}</Badge>
              <div className={`w-3 h-3 rounded-full ${getStatusColor(entity.status)}`} />
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Risk Score</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${getRiskColor(latestRiskScore?.overallScore || 0)}`}>
                {latestRiskScore?.overallScore || 0}/100
              </div>
              <p className="text-xs text-muted-foreground">
                Current risk level
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {latestKpi ? formatCurrency(latestKpi.revenue) : 'N/A'}
              </div>
              <p className="text-xs text-muted-foreground">
                Latest period
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Employees</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {latestKpi?.employeeCount?.toLocaleString() || 'N/A'}
              </div>
              <p className="text-xs text-muted-foreground">
                Current workforce
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Compliance</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {entity.complianceLogs?.length > 0 
                  ? Math.round((entity.complianceLogs.filter(log => log.status === 'COMPLIANT').length / entity.complianceLogs.length) * 100)
                  : 0}%
              </div>
              <p className="text-xs text-muted-foreground">
                Compliance rate
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="risk">Risk Analysis</TabsTrigger>
            <TabsTrigger value="governance">Governance</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Entity Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5" />
                    Entity Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {entity.description ? (
                      <p className="text-sm text-muted-foreground">{entity.description}</p>
                    ) : (
                      <p className="text-sm text-muted-foreground italic">No description available</p>
                    )}
                    <div>
                      <h4 className="font-semibold mb-2">Contact Information</h4>
                      <div className="space-y-2">
                        {entity.contactEmail && (
                          <div className="flex items-center gap-2 text-sm">
                            <Mail className="h-4 w-4" />
                            <span>{entity.contactEmail}</span>
                          </div>
                        )}
                        {entity.contactPhone && (
                          <div className="flex items-center gap-2 text-sm">
                            <Phone className="h-4 w-4" />
                            <span>{entity.contactPhone}</span>
                          </div>
                        )}
                        {entity.website && (
                          <div className="flex items-center gap-2 text-sm">
                            <Globe className="h-4 w-4" />
                            <a href={entity.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                              {entity.website}
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                    {entity.establishedDate && (
                      <div>
                        <h4 className="font-semibold mb-2">Established</h4>
                        <p className="text-sm text-muted-foreground">
                          {new Date(entity.establishedDate).toLocaleDateString()}
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Current Risk Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    Current Risk Assessment
                  </CardTitle>
                  <CardDescription>
                    Risk breakdown for {latestRiskScore?.period}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Financial Risk</span>
                        <span className={`text-sm ${getRiskColor(latestRiskScore?.financialRisk || 0)}`}>
                          {latestRiskScore?.financialRisk || 0}%
                        </span>
                      </div>
                      <Progress value={latestRiskScore?.financialRisk || 0} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Operational Risk</span>
                        <span className={`text-sm ${getRiskColor(latestRiskScore?.operationalRisk || 0)}`}>
                          {latestRiskScore?.operationalRisk || 0}%
                        </span>
                      </div>
                      <Progress value={latestRiskScore?.operationalRisk || 0} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Governance Risk</span>
                        <span className={`text-sm ${getRiskColor(latestRiskScore?.governanceRisk || 0)}`}>
                          {latestRiskScore?.governanceRisk || 0}%
                        </span>
                      </div>
                      <Progress value={latestRiskScore?.governanceRisk || 0} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Compliance Risk</span>
                        <span className={`text-sm ${getRiskColor(latestRiskScore?.complianceRisk || 0)}`}>
                          {latestRiskScore?.complianceRisk || 0}%
                        </span>
                      </div>
                      <Progress value={latestRiskScore?.complianceRisk || 0} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Revenue Trend */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Revenue Trend
                  </CardTitle>
                  <CardDescription>
                    Monthly revenue performance (last 12 months)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-muted-foreground">
                    <div className="text-center">
                      <TrendingUp className="h-8 w-8 mx-auto mb-2" />
                      <p>Revenue Trend Chart</p>
                      <p className="text-xs">Chart temporarily disabled for build</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Profitability */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5" />
                    Profitability Metrics
                  </CardTitle>
                  <CardDescription>
                    ROA and ROE trends
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-muted-foreground">
                    <div className="text-center">
                      <DollarSign className="h-8 w-8 mx-auto mb-2" />
                      <p>Profitability Metrics Chart</p>
                      <p className="text-xs">Chart temporarily disabled for build</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="risk" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Risk Score Trends
                </CardTitle>
                <CardDescription>
                  Quarterly risk assessment trends
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-muted-foreground">
                  <div className="text-center">
                    <AlertTriangle className="h-8 w-8 mx-auto mb-2" />
                    <p>Risk Score Trends Chart</p>
                    <p className="text-xs">Chart temporarily disabled for build</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="governance" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Board Members */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Board Composition
                  </CardTitle>
                  <CardDescription>
                    Current board members and their roles
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {entity.boardMembers?.length > 0 ? (
                      entity.boardMembers.map((member) => (
                        <div key={member.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <User className="h-5 w-5 text-muted-foreground" />
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="font-semibold">{member.name}</h4>
                              {member.isChairperson && (
                                <Badge variant="default">Chairperson</Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">{member.position}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-muted-foreground">
                            Appointed: {member.appointmentDate ? new Date(member.appointmentDate).toLocaleDateString() : 'N/A'}
                          </p>
                          {member.termEndDate && (
                            <p className="text-xs text-muted-foreground">
                              Term ends: {new Date(member.termEndDate).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                      </div>
                    ))
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        <User className="h-8 w-8 mx-auto mb-2" />
                        <p>No board members information available</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Governance Documents */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Governance Framework
                  </CardTitle>
                  <CardDescription>
                    Key governance documents and policies
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 border rounded-lg">
                      <h4 className="font-semibold mb-1">Board Charter</h4>
                      <p className="text-sm text-muted-foreground">Version 2.1 • Effective 2023-01-15</p>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <h4 className="font-semibold mb-1">Code of Conduct</h4>
                      <p className="text-sm text-muted-foreground">Version 3.0 • Effective 2023-06-01</p>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <h4 className="font-semibold mb-1">Audit Committee Charter</h4>
                      <p className="text-sm text-muted-foreground">Version 1.5 • Effective 2022-11-20</p>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <h4 className="font-semibold mb-1">Remuneration Policy</h4>
                      <p className="text-sm text-muted-foreground">Version 1.2 • Effective 2023-03-10</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="compliance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  Compliance Status
                </CardTitle>
                <CardDescription>
                  Current compliance requirements and status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {entity.complianceLogs?.length > 0 ? (
                    entity.complianceLogs.map((log) => (
                      <div key={log.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-semibold">{log.requirement}</h4>
                            <Badge className={getComplianceColor(log.status)}>
                              {log.status.replace('_', ' ')}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              Due: {new Date(log.dueDate).toLocaleDateString()}
                            </span>
                            <span>Assigned to: {log.assignedTo}</span>
                          </div>
                          {log.notes && (
                            <p className="text-sm text-muted-foreground mt-2">{log.notes}</p>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <CheckCircle className="h-8 w-8 mx-auto mb-2" />
                      <p>No compliance data available</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}