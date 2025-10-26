// Comprehensive Software Asset Management Data
// Enhanced tracking across all Ghana state entities with detailed analysis

export interface ComprehensiveSoftwareLicense {
  id: string;
  entityId: string;
  entityName: string;
  softwareName: string;
  vendor: string;
  category: 'ERP' | 'CRM' | 'FINANCIAL' | 'HR' | 'BI' | 'SECURITY' | 'PRODUCTIVITY' | 'SPECIALIZED' | 'DEVELOPMENT' | 'DATABASE';
  licenseType: 'SUBSCRIPTION' | 'PERPETUAL' | 'FREEMIUM' | 'OPEN_SOURCE' | 'TRIAL';
  totalLicenses: number;
  usedLicenses: number;
  availableLicenses: number;
  utilizationRate: number;
  annualCost: number;
  currency: 'GHS' | 'USD' | 'EUR';
  purchaseDate: Date;
  expiryDate: Date;
  renewalDate?: Date;
  autoRenewal: boolean;
  sharable: boolean;
  consolidationOpportunity: boolean;
  supportLevel: 'BASIC' | 'STANDARD' | 'PREMIUM' | 'ENTERPRISE';
  deploymentType: 'ON_PREMISE' | 'CLOUD' | 'HYBRID';
  accessLevel: 'USER' | 'POWER_USER' | 'ADMIN' | 'DEVELOPER';
  complianceStatus: 'COMPLIANT' | 'OVER_UTILIZED' | 'UNDER_UTILIZED' | 'EXPIRED' | 'EXPIRING_SOON';
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  businessCriticality: 'LOW' | 'MEDIUM' | 'HIGH' | 'MISSION_CRITICAL';
  dataSensitivity: 'PUBLIC' | 'INTERNAL' | 'CONFIDENTIAL' | 'RESTRICTED';
  integrationPoints: string[];
  dependencies: string[];
  userDepartments: string[];
  costCenter: string;
  budgetCode: string;
  procurementReference: string;
  vendorContractNumber: string;
  technicalContact: string;
  businessOwner: string;
  lastAuditDate: Date;
  nextAuditDate: Date;
  auditFindings: string[];
  securityCertifications: string[];
  performanceMetrics: SoftwarePerformanceMetrics;
  usageAnalytics: SoftwareUsageAnalytics;
  optimizationRecommendations: OptimizationRecommendation[];
}

export interface SoftwarePerformanceMetrics {
  uptime: number;
  responseTime: number;
  errorRate: number;
  userSatisfaction: number;
  systemLoad: number;
  availability: number;
  lastUpdated: Date;
}

export interface SoftwareUsageAnalytics {
  dailyActiveUsers: number;
  weeklyActiveUsers: number;
  monthlyActiveUsers: number;
  peakUsageTime: string;
  averageSessionDuration: number;
  featureUtilization: Record<string, number>;
  departmentUsage: Record<string, number>;
  userGrowthRate: number;
  churnRate: number;
  lastAnalyzed: Date;
}

export interface OptimizationRecommendation {
  id: string;
  type: 'CONSOLIDATION' | 'DECOMMISSION' | 'UPGRADE' | 'DOWNGRADE' | 'REASSIGN' | 'CLOUD_MIGRATION';
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  title: string;
  description: string;
  potentialSavings: number;
  implementationEffort: 'LOW' | 'MEDIUM' | 'HIGH';
  timeline: string;
  risks: string[];
  benefits: string[];
  affectedUsers: number;
  dependencies: string[];
  recommendedDate: Date;
}

export interface SoftwareVendor {
  vendorId: string;
  vendorName: string;
  country: string;
  vendorType: 'LOCAL' | 'INTERNATIONAL' | 'JOINT_VENTURE';
  isSME: boolean;
  totalContracts: number;
  totalValue: number;
  complianceScore: number;
  reliabilityScore: number;
  supportQuality: number;
  innovationScore: number;
  pricingCompetitiveness: number;
  contractHistory: VendorContractHistory[];
  riskFactors: string[];
  strengths: string[];
  weaknesses: string[];
  marketPosition: 'LEADER' | 'CHALLENGER' | 'NICHE' | 'EMERGING';
  certifications: string[];
  partnerships: string[];
}

export interface VendorContractHistory {
  contractId: string;
  entityName: string;
  softwareName: string;
  startDate: Date;
  endDate: Date;
  value: number;
  complianceIssues: number;
  renewalCount: number;
  satisfactionScore: number;
}

export interface SoftwareConsolidationOpportunity {
  id: string;
  softwareName: string;
  category: string;
  currentVendors: string[];
  entitiesUsing: string[];
  totalLicenses: number;
  totalAnnualCost: number;
  potentialSavings: number;
  consolidationComplexity: 'LOW' | 'MEDIUM' | 'HIGH';
  recommendedVendor: string;
  businessImpact: 'LOW' | 'MEDIUM' | 'HIGH';
  implementationTimeline: string;
  risks: string[];
  benefits: string[];
  stakeholderApproval: string[];
}

// Comprehensive software data for all entities
export const COMPREHENSIVE_SOFTWARE_DATA: ComprehensiveSoftwareLicense[] = [
  // ECG Software Licenses
  {
    id: "SW-ECG-001",
    entityId: "SOE-001",
    entityName: "Electricity Company of Ghana",
    softwareName: "SAP S/4HANA",
    vendor: "SAP",
    category: "ERP",
    licenseType: "SUBSCRIPTION",
    totalLicenses: 500,
    usedLicenses: 450,
    availableLicenses: 50,
    utilizationRate: 90,
    annualCost: 2500000,
    currency: "USD",
    purchaseDate: new Date("2022-01-15"),
    expiryDate: new Date("2025-12-31"),
    renewalDate: new Date("2025-12-01"),
    autoRenewal: true,
    sharable: false,
    consolidationOpportunity: true,
    supportLevel: "ENTERPRISE",
    deploymentType: "HYBRID",
    accessLevel: "USER",
    complianceStatus: "COMPLIANT",
    riskLevel: "MEDIUM",
    businessCriticality: "MISSION_CRITICAL",
    dataSensitivity: "CONFIDENTIAL",
    integrationPoints: ["Oracle Financials", "Power BI", "Custom Billing System"],
    dependencies: ["Oracle Database", "Microsoft SQL Server"],
    userDepartments: ["Finance", "HR", "Operations", "Procurement", "IT"],
    costCenter: "CC-IT-001",
    budgetCode: "BG-2024-IT-015",
    procurementReference: "ECG-PROC-2022-045",
    vendorContractNumber: "SAP-GH-ECG-2022",
    technicalContact: "IT Director",
    businessOwner: "CFO",
    lastAuditDate: new Date("2024-06-15"),
    nextAuditDate: new Date("2024-12-15"),
    auditFindings: ["Optimal utilization", "Good compliance"],
    securityCertifications: ["ISO 27001", "SOC 2", "GDPR"],
    performanceMetrics: {
      uptime: 99.8,
      responseTime: 1.2,
      errorRate: 0.5,
      userSatisfaction: 85,
      systemLoad: 65,
      availability: 99.9,
      lastUpdated: new Date("2024-11-01")
    },
    usageAnalytics: {
      dailyActiveUsers: 420,
      weeklyActiveUsers: 445,
      monthlyActiveUsers: 450,
      peakUsageTime: "14:00-16:00",
      averageSessionDuration: 180,
      featureUtilization: {
        "Financial Module": 95,
        "HR Module": 80,
        "Procurement Module": 85,
        "Operations Module": 90
      },
      departmentUsage: {
        "Finance": 95,
        "HR": 85,
        "Operations": 90,
        "Procurement": 88,
        "IT": 75
      },
      userGrowthRate: 5.2,
      churnRate: 2.1,
      lastAnalyzed: new Date("2024-11-01")
    },
    optimizationRecommendations: [
      {
        id: "REC-SAP-001",
        type: "CONSOLIDATION",
        priority: "MEDIUM",
        title: "Consider SAP S/4HANA Cloud Migration",
        description: "Migrate to cloud version for better scalability and reduced maintenance",
        potentialSavings: 500000,
        implementationEffort: "HIGH",
        timeline: "12-18 months",
        risks: ["Data migration complexity", "User resistance", "Downtime during migration"],
        benefits: ["Reduced infrastructure costs", "Automatic updates", "Better scalability"],
        affectedUsers: 450,
        dependencies: ["Oracle Database", "Custom integrations"],
        recommendedDate: new Date("2025-01-01")
      }
    ]
  },
  {
    id: "SW-ECG-002",
    entityId: "SOE-001",
    entityName: "Electricity Company of Ghana",
    softwareName: "Microsoft Office 365",
    vendor: "Microsoft",
    category: "PRODUCTIVITY",
    licenseType: "SUBSCRIPTION",
    totalLicenses: 6500,
    usedLicenses: 6200,
    availableLicenses: 300,
    utilizationRate: 95.4,
    annualCost: 1200000,
    currency: "USD",
    purchaseDate: new Date("2021-06-01"),
    expiryDate: new Date("2025-06-30"),
    renewalDate: new Date("2025-06-01"),
    autoRenewal: true,
    sharable: false,
    consolidationOpportunity: false,
    supportLevel: "STANDARD",
    deploymentType: "CLOUD",
    accessLevel: "USER",
    complianceStatus: "COMPLIANT",
    riskLevel: "LOW",
    businessCriticality: "HIGH",
    dataSensitivity: "INTERNAL",
    integrationPoints: ["SharePoint", "Teams", "Outlook"],
    dependencies: ["Azure Active Directory"],
    userDepartments: ["All Departments"],
    costCenter: "CC-IT-002",
    budgetCode: "BG-2024-IT-020",
    procurementReference: "ECG-PROC-2021-078",
    vendorContractNumber: "MS-GH-ECG-2021",
    technicalContact: "IT Support Manager",
    businessOwner: "HR Director",
    lastAuditDate: new Date("2024-09-15"),
    nextAuditDate: new Date("2025-03-15"),
    auditFindings: ["Excellent utilization", "Cost-effective"],
    securityCertifications: ["ISO 27001", "SOC 2", "FedRAMP"],
    performanceMetrics: {
      uptime: 99.9,
      responseTime: 0.8,
      errorRate: 0.2,
      userSatisfaction: 90,
      systemLoad: 45,
      availability: 99.95,
      lastUpdated: new Date("2024-11-01")
    },
    usageAnalytics: {
      dailyActiveUsers: 5800,
      weeklyActiveUsers: 6100,
      monthlyActiveUsers: 6200,
      peakUsageTime: "09:00-11:00",
      averageSessionDuration: 240,
      featureUtilization: {
        "Outlook": 98,
        "Word": 95,
        "Excel": 92,
        "PowerPoint": 85,
        "Teams": 88,
        "SharePoint": 75
      },
      departmentUsage: {
        "Finance": 95,
        "HR": 92,
        "Operations": 88,
        "Procurement": 90,
        "IT": 98,
        "Engineering": 85
      },
      userGrowthRate: 3.5,
      churnRate: 1.2,
      lastAnalyzed: new Date("2024-11-01")
    },
    optimizationRecommendations: [
      {
        id: "REC-O365-001",
        type: "DOWNGRADE",
        priority: "LOW",
        title: "Review License Tiers",
        description: "Some users may only need basic licenses",
        potentialSavings: 150000,
        implementationEffort: "MEDIUM",
        timeline: "2-3 months",
        risks: ["User dissatisfaction", "Feature loss"],
        benefits: ["Cost savings", "Better license optimization"],
        affectedUsers: 800,
        dependencies: ["Azure Active Directory"],
        recommendedDate: new Date("2024-12-01")
      }
    ]
  },
  // GNPC Software Licenses
  {
    id: "SW-GNPC-001",
    entityId: "SOE-002",
    entityName: "Ghana National Petroleum Corporation",
    softwareName: "Oracle E-Business Suite",
    vendor: "Oracle",
    category: "ERP",
    licenseType: "SUBSCRIPTION",
    totalLicenses: 300,
    usedLicenses: 280,
    availableLicenses: 20,
    utilizationRate: 93.3,
    annualCost: 3200000,
    currency: "USD",
    purchaseDate: new Date("2021-03-15"),
    expiryDate: new Date("2025-12-31"),
    renewalDate: new Date("2025-12-01"),
    autoRenewal: true,
    sharable: false,
    consolidationOpportunity: true,
    supportLevel: "ENTERPRISE",
    deploymentType: "ON_PREMISE",
    accessLevel: "USER",
    complianceStatus: "COMPLIANT",
    riskLevel: "MEDIUM",
    businessCriticality: "MISSION_CRITICAL",
    dataSensitivity: "RESTRICTED",
    integrationPoints: ["Petrel", "Financial Systems", "Production Systems"],
    dependencies: ["Oracle Database", "WebLogic Server"],
    userDepartments: ["Finance", "Operations", "Geoscience", "HR"],
    costCenter: "CC-IT-003",
    budgetCode: "BG-2024-IT-025",
    procurementReference: "GNPC-PROC-2021-012",
    vendorContractNumber: "ORCL-GH-GNPC-2021",
    technicalContact: "IT Infrastructure Manager",
    businessOwner: "CFO",
    lastAuditDate: new Date("2024-07-15"),
    nextAuditDate: new Date("2025-01-15"),
    auditFindings: ["High utilization", "Critical system well-maintained"],
    securityCertifications: ["ISO 27001", "NIST", "SOC 2"],
    performanceMetrics: {
      uptime: 99.7,
      responseTime: 1.5,
      errorRate: 0.8,
      userSatisfaction: 82,
      systemLoad: 78,
      availability: 99.8,
      lastUpdated: new Date("2024-11-01")
    },
    usageAnalytics: {
      dailyActiveUsers: 265,
      weeklyActiveUsers: 275,
      monthlyActiveUsers: 280,
      peakUsageTime: "10:00-12:00",
      averageSessionDuration: 200,
      featureUtilization: {
        "Financial Module": 92,
        "Supply Chain": 88,
        "Project Management": 85,
        "HR Module": 78
      },
      departmentUsage: {
        "Finance": 95,
        "Operations": 90,
        "Geoscience": 85,
        "HR": 80
      },
      userGrowthRate: 4.2,
      churnRate: 1.8,
      lastAnalyzed: new Date("2024-11-01")
    },
    optimizationRecommendations: [
      {
        id: "REC-ORCL-001",
        type: "CLOUD_MIGRATION",
        priority: "HIGH",
        title: "Migrate to Oracle Cloud",
        description: "Move to Oracle Cloud Infrastructure for better performance and cost management",
        potentialSavings: 800000,
        implementationEffort: "HIGH",
        timeline: "18-24 months",
        risks: ["Migration complexity", "Data security", "Business disruption"],
        benefits: ["Reduced infrastructure costs", "Better scalability", "Enhanced security"],
        affectedUsers: 280,
        dependencies: ["Oracle Database", "Custom integrations"],
        recommendedDate: new Date("2025-06-01")
      }
    ]
  },
  {
    id: "SW-GNPC-002",
    entityId: "SOE-002",
    entityName: "Ghana National Petroleum Corporation",
    softwareName: "Petrel",
    vendor: "Schlumberger",
    category: "SPECIALIZED",
    licenseType: "SUBSCRIPTION",
    totalLicenses: 50,
    usedLicenses: 45,
    availableLicenses: 5,
    utilizationRate: 90,
    annualCost: 2100000,
    currency: "USD",
    purchaseDate: new Date("2022-01-10"),
    expiryDate: new Date("2024-12-31"),
    renewalDate: new Date("2024-12-01"),
    autoRenewal: true,
    sharable: true,
    consolidationOpportunity: true,
    supportLevel: "PREMIUM",
    deploymentType: "ON_PREMISE",
    accessLevel: "POWER_USER",
    complianceStatus: "COMPLIANT",
    riskLevel: "HIGH",
    businessCriticality: "MISSION_CRITICAL",
    dataSensitivity: "RESTRICTED",
    integrationPoints: ["Oracle E-Business Suite", "Geological Databases"],
    dependencies: ["High-performance computing cluster", "Specialized hardware"],
    userDepartments: ["Geoscience", "Reservoir Engineering"],
    costCenter: "CC-GEO-001",
    budgetCode: "BG-2024-GEO-010",
    procurementReference: "GNPC-PROC-2022-005",
    vendorContractNumber: "SLB-GH-GNPC-2022",
    technicalContact: "Geoscience IT Lead",
    businessOwner: "Head of Geoscience",
    lastAuditDate: new Date("2024-08-15"),
    nextAuditDate: new Date("2025-02-15"),
    auditFindings: ["Critical for operations", "Highly specialized"],
    securityCertifications: ["ISO 27001", "Industry-specific certifications"],
    performanceMetrics: {
      uptime: 99.5,
      responseTime: 2.1,
      errorRate: 1.2,
      userSatisfaction: 88,
      systemLoad: 85,
      availability: 99.7,
      lastUpdated: new Date("2024-11-01")
    },
    usageAnalytics: {
      dailyActiveUsers: 42,
      weeklyActiveUsers: 44,
      monthlyActiveUsers: 45,
      peakUsageTime: "08:00-10:00",
      averageSessionDuration: 300,
      featureUtilization: {
        "Seismic Interpretation": 95,
        "Reservoir Modeling": 92,
        "Well Planning": 88,
        "Data Integration": 85
      },
      departmentUsage: {
        "Geoscience": 95,
        "Reservoir Engineering": 90
      },
      userGrowthRate: 6.5,
      churnRate: 0.5,
      lastAnalyzed: new Date("2024-11-01")
    },
    optimizationRecommendations: [
      {
        id: "REC-PETREL-001",
        type: "CONSOLIDATION",
        priority: "MEDIUM",
        title: "Share Licenses with Other Entities",
        description: "Consider license sharing with other oil & gas entities",
        potentialSavings: 500000,
        implementationEffort: "MEDIUM",
        timeline: "6-12 months",
        risks: ["Coordination complexity", "Usage conflicts"],
        benefits: ["Cost savings", "Better utilization", "Inter-agency cooperation"],
        affectedUsers: 45,
        dependencies: ["Inter-agency agreements"],
        recommendedDate: new Date("2025-03-01")
      }
    ]
  },
  // VRA Software Licenses
  {
    id: "SW-VRA-001",
    entityId: "SOE-003",
    entityName: "Volta River Authority",
    softwareName: "Siemens WinCC",
    vendor: "Siemens",
    category: "SPECIALIZED",
    licenseType: "PERPETUAL",
    totalLicenses: 25,
    usedLicenses: 20,
    availableLicenses: 5,
    utilizationRate: 80,
    annualCost: 1500000,
    currency: "USD",
    purchaseDate: new Date("2020-05-15"),
    expiryDate: new Date("2025-06-30"),
    renewalDate: new Date("2025-06-01"),
    autoRenewal: false,
    sharable: false,
    consolidationOpportunity: false,
    supportLevel: "PREMIUM",
    deploymentType: "ON_PREMISE",
    accessLevel: "ADMIN",
    complianceStatus: "COMPLIANT",
    riskLevel: "HIGH",
    businessCriticality: "MISSION_CRITICAL",
    dataSensitivity: "RESTRICTED",
    integrationPoints: ["SCADA Systems", "Power Generation Systems"],
    dependencies: ["Industrial control systems", "Specialized hardware"],
    userDepartments: ["Operations", "Engineering", "Maintenance"],
    costCenter: "CC-OPS-001",
    budgetCode: "BG-2024-OPS-015",
    procurementReference: "VRA-PROC-2020-025",
    vendorContractNumber: "SIEM-GH-VRA-2020",
    technicalContact: "Control Systems Engineer",
    businessOwner: "Head of Operations",
    lastAuditDate: new Date("2024-09-15"),
    nextAuditDate: new Date("2025-03-15"),
    auditFindings: ["Critical infrastructure", "Good security practices"],
    securityCertifications: ["ISO 27001", "IEC 62443", "NERC CIP"],
    performanceMetrics: {
      uptime: 99.9,
      responseTime: 0.5,
      errorRate: 0.1,
      userSatisfaction: 92,
      systemLoad: 55,
      availability: 99.95,
      lastUpdated: new Date("2024-11-01")
    },
    usageAnalytics: {
      dailyActiveUsers: 18,
      weeklyActiveUsers: 19,
      monthlyActiveUsers: 20,
      peakUsageTime: "06:00-08:00",
      averageSessionDuration: 480,
      featureUtilization: {
        "Monitoring": 98,
        "Control": 95,
        "Alarming": 92,
        "Reporting": 85
      },
      departmentUsage: {
        "Operations": 95,
        "Engineering": 88,
        "Maintenance": 85
      },
      userGrowthRate: 2.5,
      churnRate: 0.8,
      lastAnalyzed: new Date("2024-11-01")
    },
    optimizationRecommendations: [
      {
        id: "REC-WINCC-001",
        type: "UPGRADE",
        priority: "MEDIUM",
        title: "Upgrade to Latest Version",
        description: "Upgrade to WinCC 8.0 for enhanced features and security",
        potentialSavings: 0,
        implementationEffort: "HIGH",
        timeline: "6-9 months",
        risks: ["System downtime", "Training requirements", "Compatibility issues"],
        benefits: ["Enhanced security", "New features", "Better performance"],
        affectedUsers: 20,
        dependencies: ["Hardware upgrades", "System testing"],
        recommendedDate: new Date("2025-02-01")
      }
    ]
  },
  // GRIDCO Software Licenses
  {
    id: "SW-GRIDCO-001",
    entityId: "SOE-004",
    entityName: "Ghana Grid Company",
    softwareName: "Advanced SCADA Platform",
    vendor: "Siemens",
    category: "SPECIALIZED",
    licenseType: "SUBSCRIPTION",
    totalLicenses: 100,
    usedLicenses: 85,
    availableLicenses: 15,
    utilizationRate: 85,
    annualCost: 2800000,
    currency: "USD",
    purchaseDate: new Date("2023-01-15"),
    expiryDate: new Date("2026-01-15"),
    renewalDate: new Date("2025-12-15"),
    autoRenewal: true,
    sharable: false,
    consolidationOpportunity: false,
    supportLevel: "ENTERPRISE",
    deploymentType: "HYBRID",
    accessLevel: "ADMIN",
    complianceStatus: "COMPLIANT",
    riskLevel: "HIGH",
    businessCriticality: "MISSION_CRITICAL",
    dataSensitivity: "RESTRICTED",
    integrationPoints: ["Power Grid Systems", "Weather Systems", "Market Systems"],
    dependencies: ["High-speed network", "Redundant systems"],
    userDepartments: ["System Control", "Engineering", "Planning"],
    costCenter: "CC-CTRL-001",
    budgetCode: "BG-2024-CTRL-020",
    procurementReference: "GRIDCO-PROC-2023-008",
    vendorContractNumber: "SIEM-GH-GRIDCO-2023",
    technicalContact: "SCADA System Manager",
    businessOwner: "Head of System Control",
    lastAuditDate: new Date("2024-10-15"),
    nextAuditDate: new Date("2025-04-15"),
    auditFindings: ["Excellent system reliability", "Good security posture"],
    securityCertifications: ["ISO 27001", "IEC 62443", "NERC CIP"],
    performanceMetrics: {
      uptime: 99.99,
      responseTime: 0.3,
      errorRate: 0.05,
      userSatisfaction: 94,
      systemLoad: 60,
      availability: 99.995,
      lastUpdated: new Date("2024-11-01")
    },
    usageAnalytics: {
      dailyActiveUsers: 80,
      weeklyActiveUsers: 83,
      monthlyActiveUsers: 85,
      peakUsageTime: "24/7 Operations",
      averageSessionDuration: 480,
      featureUtilization: {
        "Real-time Monitoring": 98,
        "Control Operations": 95,
        "Data Analysis": 88,
        "Reporting": 85
      },
      departmentUsage: {
        "System Control": 98,
        "Engineering": 90,
        "Planning": 85
      },
      userGrowthRate: 4.0,
      churnRate: 0.3,
      lastAnalyzed: new Date("2024-11-01")
    },
    optimizationRecommendations: [
      {
        id: "REC-SCADA-001",
        type: "CONSOLIDATION",
        priority: "LOW",
        title: "Optimize License Allocation",
        description: "Review and optimize license allocation across shifts",
        potentialSavings: 200000,
        implementationEffort: "LOW",
        timeline: "1-2 months",
        risks: ["Minimal operational impact"],
        benefits: ["Cost savings", "Better utilization"],
        affectedUsers: 85,
        dependencies: ["Shift scheduling"],
        recommendedDate: new Date("2024-12-01")
      }
    ]
  },
  // PPA Software Licenses
  {
    id: "SW-PPA-001",
    entityId: "REG-001",
    entityName: "Public Procurement Authority",
    softwareName: "e-Procurement Platform",
    vendor: "Local Tech Hub",
    category: "SPECIALIZED",
    licenseType: "SUBSCRIPTION",
    totalLicenses: 500,
    usedLicenses: 450,
    availableLicenses: 50,
    utilizationRate: 90,
    annualCost: 2500000,
    currency: "GHS",
    purchaseDate: new Date("2023-06-01"),
    expiryDate: new Date("2025-12-31"),
    renewalDate: new Date("2025-12-01"),
    autoRenewal: true,
    sharable: false,
    consolidationOpportunity: false,
    supportLevel: "ENTERPRISE",
    deploymentType: "HYBRID",
    accessLevel: "USER",
    complianceStatus: "COMPLIANT",
    riskLevel: "MEDIUM",
    businessCriticality: "MISSION_CRITICAL",
    dataSensitivity: "CONFIDENTIAL",
    integrationPoints: ["Government Systems", "Banking Systems", "Reporting Systems"],
    dependencies: ["Database servers", "Backup systems"],
    userDepartments: ["All Departments"],
    costCenter: "CC-IT-001",
    budgetCode: "BG-2024-IT-030",
    procurementReference: "PPA-PROC-2023-003",
    vendorContractNumber: "LTH-GH-PPA-2023",
    technicalContact: "IT Director",
    businessOwner: "Executive Director",
    lastAuditDate: new Date("2024-11-01"),
    nextAuditDate: new Date("2025-05-01"),
    auditFindings: ["Good local solution", "High user satisfaction"],
    securityCertifications: ["ISO 27001", "ISO 9001", "PCI DSS"],
    performanceMetrics: {
      uptime: 99.8,
      responseTime: 1.0,
      errorRate: 0.3,
      userSatisfaction: 88,
      systemLoad: 70,
      availability: 99.9,
      lastUpdated: new Date("2024-11-01")
    },
    usageAnalytics: {
      dailyActiveUsers: 420,
      weeklyActiveUsers: 440,
      monthlyActiveUsers: 450,
      peakUsageTime: "10:00-15:00",
      averageSessionDuration: 180,
      featureUtilization: {
        "Tender Management": 95,
        "Bid Evaluation": 92,
        "Contract Management": 88,
        "Reporting": 85,
        "Supplier Management": 82
      },
      departmentUsage: {
        "Procurement": 95,
        "Finance": 88,
        "Legal": 85,
        "IT": 90,
        "Management": 92
      },
      userGrowthRate: 8.5,
      churnRate: 1.5,
      lastAnalyzed: new Date("2024-11-01")
    },
    optimizationRecommendations: [
      {
        id: "REC-EPROC-001",
        type: "UPGRADE",
        priority: "MEDIUM",
        title: "Enhance AI Capabilities",
        description: "Add AI-powered analytics and automation features",
        potentialSavings: 0,
        implementationEffort: "MEDIUM",
        timeline: "6-9 months",
        risks: ["Development delays", "User adoption"],
        benefits: ["Improved efficiency", "Better insights", "Automation"],
        affectedUsers: 450,
        dependencies: ["AI models", "Additional computing resources"],
        recommendedDate: new Date("2025-03-01")
      }
    ]
  }
];

// Software vendor data
export const SOFTWARE_VENDORS: SoftwareVendor[] = [
  {
    vendorId: "V-001",
    vendorName: "SAP",
    country: "Germany",
    vendorType: "INTERNATIONAL",
    isSME: false,
    totalContracts: 3,
    totalValue: 8500000,
    complianceScore: 92,
    reliabilityScore: 90,
    supportQuality: 88,
    innovationScore: 85,
    pricingCompetitiveness: 75,
    contractHistory: [
      {
        contractId: "SAP-GH-ECG-2022",
        entityName: "Electricity Company of Ghana",
        softwareName: "SAP S/4HANA",
        startDate: new Date("2022-01-15"),
        endDate: new Date("2025-12-31"),
        value: 2500000,
        complianceIssues: 0,
        renewalCount: 0,
        satisfactionScore: 85
      }
    ],
    riskFactors: ["High dependency", "Complex licensing", "Currency fluctuation"],
    strengths: ["Market leader", "Comprehensive solutions", "Strong support"],
    weaknesses: ["High cost", "Complex implementation", "Vendor lock-in"],
    marketPosition: "LEADER",
    certifications: ["ISO 27001", "SOC 2", "ISO 9001"],
    partnerships: ["Microsoft", "Amazon", "Google"]
  },
  {
    vendorId: "V-002",
    vendorName: "Microsoft",
    country: "USA",
    vendorType: "INTERNATIONAL",
    isSME: false,
    totalContracts: 5,
    totalValue: 4200000,
    complianceScore: 95,
    reliabilityScore: 94,
    supportQuality: 92,
    innovationScore: 90,
    pricingCompetitiveness: 85,
    contractHistory: [
      {
        contractId: "MS-GH-ECG-2021",
        entityName: "Electricity Company of Ghana",
        softwareName: "Microsoft Office 365",
        startDate: new Date("2021-06-01"),
        endDate: new Date("2025-06-30"),
        value: 1200000,
        complianceIssues: 0,
        renewalCount: 1,
        satisfactionScore: 90
      }
    ],
    riskFactors: ["Market dominance", "Privacy concerns", "Frequent updates"],
    strengths: ["Wide adoption", "Strong ecosystem", "Good support"],
    weaknesses: ["Privacy issues", "Complex licensing", "Vendor lock-in"],
    marketPosition: "LEADER",
    certifications: ["ISO 27001", "SOC 2", "FedRAMP", "GDPR"],
    partnerships: ["Thousands of partners globally"]
  },
  {
    vendorId: "V-003",
    vendorName: "Local Tech Hub",
    country: "Ghana",
    vendorType: "LOCAL",
    isSME: true,
    totalContracts: 2,
    totalValue: 5500000,
    complianceScore: 88,
    reliabilityScore: 85,
    supportQuality: 90,
    innovationScore: 92,
    pricingCompetitiveness: 95,
    contractHistory: [
      {
        contractId: "LTH-GH-PPA-2023",
        entityName: "Public Procurement Authority",
        softwareName: "e-Procurement Platform",
        startDate: new Date("2023-06-01"),
        endDate: new Date("2025-12-31"),
        value: 2500000,
        complianceIssues: 0,
        renewalCount: 0,
        satisfactionScore: 88
      }
    ],
    riskFactors: ["Limited resources", "Scalability concerns", "Key person risk"],
    strengths: ["Local knowledge", "Cost-effective", "Flexible"],
    weaknesses: ["Limited scale", "Resource constraints", "Brand recognition"],
    marketPosition: "NICHE",
    certifications: ["ISO 27001", "ISO 9001"],
    partnerships: ["Microsoft", "Google", "Local universities"]
  }
];

// Software consolidation opportunities
export const SOFTWARE_CONSOLIDATION_OPPORTUNITIES: SoftwareConsolidationOpportunity[] = [
  {
    id: "CONSOL-001",
    softwareName: "Office Productivity Suite",
    category: "PRODUCTIVITY",
    currentVendors: ["Microsoft", "Google"],
    entitiesUsing: ["ECG", "GNPC", "VRA", "GRIDCO", "PPA"],
    totalLicenses: 15000,
    totalAnnualCost: 3500000,
    potentialSavings: 700000,
    consolidationComplexity: "MEDIUM",
    recommendedVendor: "Microsoft",
    businessImpact: "MEDIUM",
    implementationTimeline: "12-18 months",
    risks: ["User resistance", "Data migration", "Training requirements"],
    benefits: ["Cost savings", "Standardization", "Better collaboration"],
    stakeholderApproval: ["IT Directors", "Heads of Departments"]
  },
  {
    id: "CONSOL-002",
    softwareName: "ERP System",
    category: "ERP",
    currentVendors: ["SAP", "Oracle"],
    entitiesUsing: ["ECG", "GNPC"],
    totalLicenses: 800,
    totalAnnualCost: 5700000,
    potentialSavings: 1140000,
    consolidationComplexity: "HIGH",
    recommendedVendor: "SAP",
    businessImpact: "HIGH",
    implementationTimeline: "24-36 months",
    risks: ["Business disruption", "Data migration complexity", "High implementation cost"],
    benefits: ["Significant cost savings", "Process standardization", "Better integration"],
    stakeholderApproval: ["Board of Directors", "CFOs", "IT Directors"]
  }
];

// Software analytics summary
export const SOFTWARE_ANALYTICS_SUMMARY = {
  totalLicenses: 8475,
  totalAnnualCost: 20800000,
  averageUtilizationRate: 89.2,
  complianceRate: 95.5,
  highRiskLicenses: 4,
  missionCriticalLicenses: 6,
  consolidationOpportunities: 8,
  potentialSavings: 2840000,
  vendorDistribution: {
    "International": 65,
    "Local": 25,
    "Joint Venture": 10
  },
  categoryDistribution: {
    "ERP": 15,
    "PRODUCTIVITY": 45,
    "SPECIALIZED": 25,
    "SECURITY": 5,
    "OTHER": 10
  },
  deploymentDistribution: {
    "CLOUD": 40,
    "ON_PREMISE": 35,
    "HYBRID": 25
  },
  riskDistribution: {
    "LOW": 45,
    "MEDIUM": 35,
    "HIGH": 15,
    "CRITICAL": 5
  }
};