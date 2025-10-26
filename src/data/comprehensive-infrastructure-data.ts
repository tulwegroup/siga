// Comprehensive Infrastructure Monitoring Data
// Enhanced tracking across all Ghana state entities with detailed performance metrics

export interface ComprehensiveInfrastructure {
  id: string;
  entityId: string;
  entityName: string;
  siteName: string;
  siteType: 'DATA_CENTER' | 'SERVER_ROOM' | 'CLOSET' | 'CLOUD_REGION' | 'DISASTER_RECOVERY' | 'EDGE_LOCATION';
  location: string;
  region: string;
  status: 'ACTIVE' | 'MAINTENANCE' | 'DECOMMISSIONED' | 'PLANNED';
  certificationLevel: 'TIER_I' | 'TIER_II' | 'TIER_III' | 'TIER_IV' | 'NONE';
  totalArea: number; // sq meters
  itArea: number; // sq meters
  powerCapacity: number; // kW
  powerUsed: number; // kW
  coolingCapacity: number; // kW
  coolingUsed: number; // kW
  rackCount: number;
  racksUsed: number;
  racksAvailable: number;
  pueRating: number; // Power Usage Effectiveness
  uptime: number; // percentage
  temperature: number; // Celsius
  humidity: number; // percentage
  securityLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  accessControl: string[];
  fireSuppression: string;
  monitoringSystems: string[];
  backupSystems: string[];
  networkConnectivity: NetworkConnectivity;
  powerSystems: PowerSystems;
  coolingSystems: CoolingSystems;
  securitySystems: SecuritySystems;
  environmentalMonitoring: EnvironmentalMonitoring;
  performanceMetrics: InfrastructurePerformanceMetrics;
  capacityMetrics: CapacityMetrics;
  costMetrics: CostMetrics;
  sustainabilityMetrics: SustainabilityMetrics;
  riskAssessment: RiskAssessment;
  maintenanceSchedule: MaintenanceSchedule[];
  incidents: InfrastructureIncident[];
  upgrades: InfrastructureUpgrade[];
  staff: InfrastructureStaff[];
  compliance: ComplianceStatus;
}

export interface NetworkConnectivity {
  primaryProvider: string;
  secondaryProvider: string;
  bandwidth: number; // Mbps
  bandwidthUsed: number; // Mbps
  connectionType: 'FIBER' | 'COPPER' | 'WIRELESS' | 'SATELLITE';
  latency: number; // ms
  packetLoss: number; // percentage
  uptime: number; // percentage
  redundancyLevel: 'NONE' | 'PARTIAL' | 'FULL';
  ipv6Support: boolean;
  cdnIntegration: boolean;
  loadBalancing: boolean;
}

export interface PowerSystems {
  primarySource: string;
  backupSource: string;
  upsCapacity: number; // kVA
  upsRuntime: number; // minutes
  generatorCapacity: number; // kVA
  fuelCapacity: number; // liters
  fuelRuntime: number; // hours
  powerDistribution: string;
  redundancyLevel: 'N' | 'N+1' | 'N+2' | '2N' | '2N+1';
  monitoringSystem: string;
  automaticTransfer: boolean;
  maintenanceHistory: PowerMaintenanceRecord[];
}

export interface PowerMaintenanceRecord {
  date: Date;
  type: 'ROUTINE' | 'EMERGENCY' | 'UPGRADE';
  description: string;
  duration: number; // hours
  impact: string;
  cost: number;
}

export interface CoolingSystems {
  primarySystem: string;
  secondarySystem: string;
  coolingType: 'AIR' | 'LIQUID' | 'HYBRID';
  totalCapacity: number; // kW
  usedCapacity: number; // kW
  efficiency: number; // percentage
  redundancyLevel: 'NONE' | 'PARTIAL' | 'FULL';
  controlSystem: string;
  hotAisleContainment: boolean;
  coldAisleContainment: boolean;
  freeCooling: boolean;
  maintenanceHistory: CoolingMaintenanceRecord[];
}

export interface CoolingMaintenanceRecord {
  date: Date;
  type: 'ROUTINE' | 'EMERGENCY' | 'UPGRADE';
  description: string;
  duration: number; // hours
  impact: string;
  cost: number;
}

export interface SecuritySystems {
  accessControl: string;
  surveillance: string;
  intrusionDetection: string;
  fireDetection: string;
  suppressionSystem: string;
  securityLevel: number; // 1-10
  guards24x7: boolean;
  biometricAccess: boolean;
  visitorManagement: boolean;
  vehicleControl: boolean;
  perimeterSecurity: string;
  incidentResponse: string;
}

export interface EnvironmentalMonitoring {
  temperatureSensors: number;
  humiditySensors: number;
  leakDetection: boolean;
  airQualityMonitoring: boolean;
  pressureMonitoring: boolean;
  vibrationMonitoring: boolean;
  powerMonitoring: boolean;
  environmentalAlerts: EnvironmentalAlert[];
}

export interface EnvironmentalAlert {
  id: string;
  type: 'TEMPERATURE' | 'HUMIDITY' | 'LEAK' | 'POWER' | 'COOLING';
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  message: string;
  timestamp: Date;
  resolved: boolean;
  resolutionTime?: number; // minutes
}

export interface InfrastructurePerformanceMetrics {
  cpuUtilization: number;
  memoryUtilization: number;
  storageUtilization: number;
  networkUtilization: number;
  responseTime: number; // ms
  throughput: number; // Mbps
  errorRate: number; // percentage
  availability: number; // percentage
  meanTimeBetweenFailures: number; // hours
  meanTimeToRepair: number; // hours
  serviceLevelAgreement: number; // percentage
  performanceScore: number; // 1-100
  lastUpdated: Date;
}

export interface CapacityMetrics {
  rackUtilization: number; // percentage
  powerUtilization: number; // percentage
  coolingUtilization: number; // percentage
  spaceUtilization: number; // percentage
  networkUtilization: number; // percentage
  storageCapacity: number; // TB
  storageUsed: number; // TB
  storageAvailable: number; // TB
  growthRate: number; // percentage per month
  projectedExhaustion: Date;
  capacityScore: number; // 1-100
  recommendations: string[];
}

export interface CostMetrics {
  monthlyPowerCost: number;
  monthlyCoolingCost: number;
  monthlyMaintenanceCost: number;
  monthlyStaffCost: number;
  monthlySoftwareCost: number;
  monthlyNetworkCost: number;
  totalMonthlyCost: number;
  costPerRack: number;
  costPerkW: number;
  pueCost: number;
  costTrend: number; // percentage change
  budgetUtilization: number; // percentage
  costOptimizationOpportunities: CostOptimizationOpportunity[];
}

export interface CostOptimizationOpportunity {
  id: string;
  type: 'POWER' | 'COOLING' | 'SPACE' | 'MAINTENANCE' | 'STAFF';
  description: string;
  potentialSavings: number;
  implementationCost: number;
  paybackPeriod: number; // months
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  impact: string;
}

export interface SustainabilityMetrics {
  carbonFootprint: number; // tons CO2 per year
  energyConsumption: number; // MWh per year
  renewableEnergyPercentage: number;
  waterUsage: number; // cubic meters per year
  wasteGenerated: number; // kg per year
  wasteRecycled: number; // kg per year
  greenCertification: string;
  sustainabilityScore: number; // 1-100
  improvementInitiatives: SustainabilityInitiative[];
}

export interface SustainabilityInitiative {
  id: string;
  name: string;
  description: string;
  startDate: Date;
  targetDate: Date;
  status: 'PLANNED' | 'IN_PROGRESS' | 'COMPLETED';
  expectedReduction: number; // percentage
  actualReduction?: number; // percentage
  cost: number;
}

export interface RiskAssessment {
  overallRiskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  riskFactors: RiskFactor[];
  mitigationStrategies: MitigationStrategy[];
  insuranceCoverage: string;
  disasterRecoveryPlan: boolean;
  businessContinuityPlan: boolean;
  lastRiskAssessment: Date;
  nextRiskAssessment: Date;
}

export interface RiskFactor {
  id: string;
  category: 'NATURAL_DISASTER' | 'POWER_FAILURE' | 'COOLING_FAILURE' | 'SECURITY_BREACH' | 'NETWORK_OUTAGE' | 'HARDWARE_FAILURE';
  probability: number; // 1-10
  impact: number; // 1-10
  riskScore: number; // probability * impact
  description: string;
  mitigation: string;
  status: 'MITIGATED' | 'MONITORED' | 'ACCEPTED';
}

export interface MitigationStrategy {
  id: string;
  riskFactorId: string;
  description: string;
  implementationDate: Date;
  effectiveness: number; // percentage
  cost: number;
  responsible: string;
}

export interface MaintenanceSchedule {
  id: string;
  type: 'PREVENTIVE' | 'CORRECTIVE' | 'PREDICTIVE';
  title: string;
  description: string;
  scheduledDate: Date;
  duration: number; // hours
  frequency: string;
  responsible: string;
  status: 'SCHEDULED' | 'IN_PROGRESS' | 'COMPLETED' | 'OVERDUE';
  impact: string;
  cost: number;
}

export interface InfrastructureIncident {
  id: string;
  type: 'POWER_OUTAGE' | 'COOLING_FAILURE' | 'NETWORK_OUTAGE' | 'SECURITY_BREACH' | 'HARDWARE_FAILURE' | 'SOFTWARE_FAILURE';
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  title: string;
  description: string;
  startTime: Date;
  endTime?: Date;
  duration?: number; // minutes
  impact: string;
  affectedSystems: string[];
  rootCause: string;
  resolution: string;
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';
  reportedBy: string;
  assignedTo: string;
  cost: number;
  lessonsLearned: string;
}

export interface InfrastructureUpgrade {
  id: string;
  type: 'HARDWARE' | 'SOFTWARE' | 'NETWORK' | 'POWER' | 'COOLING' | 'SECURITY';
  title: string;
  description: string;
  justification: string;
  estimatedCost: number;
  actualCost?: number;
  startDate: Date;
  endDate?: Date;
  status: 'PLANNED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  impact: string;
  benefits: string[];
  risks: string[];
  vendor: string;
  projectManager: string;
  approvalDate: Date;
  approvedBy: string;
}

export interface InfrastructureStaff {
  id: string;
  name: string;
  position: string;
  department: string;
  email: string;
  phone: string;
  certifications: string[];
  skills: string[];
  experience: number; // years
  shift: string;
  onCall: boolean;
  trainingRecords: TrainingRecord[];
}

export interface TrainingRecord {
  id: string;
  courseName: string;
  provider: string;
  startDate: Date;
  endDate: Date;
  certification: boolean;
  expiryDate?: Date;
  score?: number;
  cost: number;
}

export interface ComplianceStatus {
  iso27001Certified: boolean;
  iso27001ExpiryDate?: Date;
  iso9001Certified: boolean;
  iso9001ExpiryDate?: Date;
  soc2Compliant: boolean;
  soc2ReportDate?: Date;
  pciDssCompliant: boolean;
  pciDssExpiryDate?: Date;
  hipaaCompliant: boolean;
  gdprCompliant: boolean;
  localRegulations: string[];
  lastAuditDate: Date;
  nextAuditDate: Date;
  auditFindings: AuditFinding[];
  complianceScore: number; // 1-100
}

export interface AuditFinding {
  id: string;
  category: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  description: string;
  recommendation: string;
  dueDate: Date;
  status: 'OPEN' | 'IN_PROGRESS' | 'CLOSED';
  responsible: string;
}

// Comprehensive infrastructure data for all entities
export const COMPREHENSIVE_INFRASTRUCTURE_DATA: ComprehensiveInfrastructure[] = [
  // ECG Data Center
  {
    id: "INF-ECG-001",
    entityId: "SOE-001",
    entityName: "Electricity Company of Ghana",
    siteName: "ECG Head Office Data Center",
    siteType: "DATA_CENTER",
    location: "Accra, Ghana",
    region: "Greater Accra",
    status: "ACTIVE",
    certificationLevel: "TIER_III",
    totalArea: 500,
    itArea: 350,
    powerCapacity: 1000,
    powerUsed: 750,
    coolingCapacity: 800,
    coolingUsed: 600,
    rackCount: 50,
    racksUsed: 40,
    racksAvailable: 10,
    pueRating: 1.4,
    uptime: 99.9,
    temperature: 22,
    humidity: 45,
    securityLevel: "HIGH",
    accessControl: ["Biometric", "Key Card", "PIN"],
    fireSuppression: "FM-200",
    monitoringSystems: ["SCADA", "BMS", "NMS"],
    backupSystems: ["UPS", "Generator", "Dual Power Feeds"],
    networkConnectivity: {
      primaryProvider: "MTN Business",
      secondaryProvider: "Vodafone Business",
      bandwidth: 1000,
      bandwidthUsed: 650,
      connectionType: "FIBER",
      latency: 5,
      packetLoss: 0.1,
      uptime: 99.95,
      redundancyLevel: "FULL",
      ipv6Support: true,
      cdnIntegration: true,
      loadBalancing: true
    },
    powerSystems: {
      primarySource: "ECG Grid",
      backupSource: "Diesel Generator",
      upsCapacity: 500,
      upsRuntime: 30,
      generatorCapacity: 800,
      fuelCapacity: 5000,
      fuelRuntime: 24,
      powerDistribution: "Dual Bus",
      redundancyLevel: "2N",
      monitoringSystem: "Schneider Electric",
      automaticTransfer: true,
      maintenanceHistory: [
        {
          date: new Date("2024-10-15"),
          type: "ROUTINE",
          description: "Monthly generator testing",
          duration: 2,
          impact: "None",
          cost: 500
        }
      ]
    },
    coolingSystems: {
      primarySystem: "Liebert CRAC",
      secondarySystem: "Standby CRAC",
      coolingType: "AIR",
      totalCapacity: 800,
      usedCapacity: 600,
      efficiency: 85,
      redundancyLevel: "N+1",
      controlSystem: "Building Management System",
      hotAisleContainment: true,
      coldAisleContainment: true,
      freeCooling: false,
      maintenanceHistory: [
        {
          date: new Date("2024-09-20"),
          type: "ROUTINE",
          description: "Quarterly maintenance",
          duration: 4,
          impact: "Minimal",
          cost: 2000
        }
      ]
    },
    securitySystems: {
      accessControl: "HID Global",
      surveillance: "Axis Cameras",
      intrusionDetection: "Bosch",
      fireDetection: "Notifier",
      suppressionSystem: "FM-200",
      securityLevel: 8,
      guards24x7: true,
      biometricAccess: true,
      visitorManagement: true,
      vehicleControl: true,
      perimeterSecurity: "Fence with motion sensors",
      incidentResponse: "24/7 monitoring team"
    },
    environmentalMonitoring: {
      temperatureSensors: 20,
      humiditySensors: 20,
      leakDetection: true,
      airQualityMonitoring: true,
      pressureMonitoring: true,
      vibrationMonitoring: false,
      powerMonitoring: true,
      environmentalAlerts: [
        {
          id: "ALERT-001",
          type: "TEMPERATURE",
          severity: "MEDIUM",
          message: "Temperature spike in Rack Row A",
          timestamp: new Date("2024-11-01T14:30:00"),
          resolved: true,
          resolutionTime: 15
        }
      ]
    },
    performanceMetrics: {
      cpuUtilization: 65,
      memoryUtilization: 70,
      storageUtilization: 80,
      networkUtilization: 65,
      responseTime: 150,
      throughput: 650,
      errorRate: 0.2,
      availability: 99.9,
      meanTimeBetweenFailures: 8760,
      meanTimeToRepair: 60,
      serviceLevelAgreement: 99.9,
      performanceScore: 88,
      lastUpdated: new Date("2024-11-01")
    },
    capacityMetrics: {
      rackUtilization: 80,
      powerUtilization: 75,
      coolingUtilization: 75,
      spaceUtilization: 70,
      networkUtilization: 65,
      storageCapacity: 500,
      storageUsed: 400,
      storageAvailable: 100,
      growthRate: 5,
      projectedExhaustion: new Date("2026-06-01"),
      capacityScore: 75,
      recommendations: [
        "Plan for storage expansion in Q2 2025",
        "Monitor power capacity trends",
        "Consider cloud migration for non-critical workloads"
      ]
    },
    costMetrics: {
      monthlyPowerCost: 45000,
      monthlyCoolingCost: 25000,
      monthlyMaintenanceCost: 15000,
      monthlyStaffCost: 30000,
      monthlySoftwareCost: 20000,
      monthlyNetworkCost: 10000,
      totalMonthlyCost: 145000,
      costPerRack: 3625,
      costPerkW: 193.33,
      pueCost: 58000,
      costTrend: 5.2,
      budgetUtilization: 85,
      costOptimizationOpportunities: [
        {
          id: "COST-OPT-001",
          type: "COOLING",
          description: "Implement free cooling during night hours",
          potentialSavings: 5000,
          implementationCost: 15000,
          paybackPeriod: 3,
          priority: "MEDIUM",
          impact: "Reduced cooling costs by 20%"
        }
      ]
    },
    sustainabilityMetrics: {
      carbonFootprint: 1200,
      energyConsumption: 2400,
      renewableEnergyPercentage: 5,
      waterUsage: 500,
      wasteGenerated: 100,
      wasteRecycled: 80,
      greenCertification: "None",
      sustainabilityScore: 65,
      improvementInitiatives: [
        {
          id: "SUST-001",
          name: "Solar Panel Installation",
          description: "Install solar panels on roof for renewable energy",
          startDate: new Date("2024-12-01"),
          targetDate: new Date("2025-03-31"),
          status: "PLANNED",
          expectedReduction: 15,
          cost: 500000
        }
      ]
    },
    riskAssessment: {
      overallRiskLevel: "MEDIUM",
      riskFactors: [
        {
          id: "RISK-001",
          category: "POWER_FAILURE",
          probability: 3,
          impact: 8,
          riskScore: 24,
          description: "Grid power instability",
          mitigation: "Backup generator and UPS systems",
          status: "MITIGATED"
        },
        {
          id: "RISK-002",
          category: "COOLING_FAILURE",
          probability: 2,
          impact: 7,
          riskScore: 14,
          description: "Cooling system failure",
          mitigation: "N+1 redundancy with standby units",
          status: "MITIGATED"
        }
      ],
      mitigationStrategies: [
        {
          id: "MIT-001",
          riskFactorId: "RISK-001",
          description: "Monthly generator testing and fuel management",
          implementationDate: new Date("2024-01-01"),
          effectiveness: 95,
          cost: 6000,
          responsible: "Facilities Manager"
        }
      ],
      insuranceCoverage: "All-risk infrastructure insurance",
      disasterRecoveryPlan: true,
      businessContinuityPlan: true,
      lastRiskAssessment: new Date("2024-09-01"),
      nextRiskAssessment: new Date("2025-03-01")
    },
    maintenanceSchedule: [
      {
        id: "MAINT-001",
        type: "PREVENTIVE",
        title: "Quarterly UPS Maintenance",
        description: "Inspect and test UPS systems",
        scheduledDate: new Date("2024-12-15"),
        duration: 4,
        frequency: "Quarterly",
        responsible: "Electrical Engineer",
        status: "SCHEDULED",
        impact: "Minimal",
        cost: 3000
      }
    ],
    incidents: [
      {
        id: "INC-001",
        type: "POWER_OUTAGE",
        severity: "MEDIUM",
        title: "Brief power fluctuation",
        description: "Grid power fluctuation caused UPS to activate",
        startTime: new Date("2024-10-20T15:30:00"),
        endTime: new Date("2024-10-20T15:35:00"),
        duration: 5,
        impact: "No service impact",
        affectedSystems: ["None"],
        rootCause: "Grid instability",
        resolution: "Systems switched to UPS automatically",
        status: "CLOSED",
        reportedBy: "Monitoring System",
        assignedTo: "Operations Team",
        cost: 0,
        lessonsLearned: "UPS systems functioned correctly"
      }
    ],
    upgrades: [
      {
        id: "UPG-001",
        type: "NETWORK",
        title: "Network Infrastructure Upgrade",
        description: "Upgrade core network switches to 10Gbps",
        justification: "Increasing bandwidth requirements",
        estimatedCost: 100000,
        actualCost: 95000,
        startDate: new Date("2024-08-01"),
        endDate: new Date("2024-08-15"),
        status: "COMPLETED",
        impact: "Improved network performance",
        benefits: ["10x bandwidth increase", "Better reliability", "Future-proofing"],
        risks: ["Downtime during installation"],
        vendor: "Cisco Systems",
        projectManager: "Network Manager",
        approvalDate: new Date("2024-07-15"),
        approvedBy: "IT Director"
      }
    ],
    staff: [
      {
        id: "STAFF-001",
        name: "Kwame Asante",
        position: "Data Center Manager",
        department: "IT",
        email: "k.asante@ecg.com.gh",
        phone: "+233-244-123456",
        certifications: ["CCNA", "PMP", "ITIL"],
        skills: ["Data Center Management", "Network Administration", "Project Management"],
        experience: 10,
        shift: "Day",
        onCall: true,
        trainingRecords: [
          {
            id: "TRAIN-001",
            courseName: "Advanced Data Center Management",
            provider: "APMP",
            startDate: new Date("2024-06-01"),
            endDate: new Date("2024-06-05"),
            certification: true,
            expiryDate: new Date("2027-06-01"),
            score: 95,
            cost: 5000
          }
        ]
      }
    ],
    compliance: {
      iso27001Certified: true,
      iso27001ExpiryDate: new Date("2025-12-31"),
      iso9001Certified: true,
      iso9001ExpiryDate: new Date("2025-06-30"),
      soc2Compliant: false,
      soc2ReportDate: undefined,
      pciDssCompliant: false,
      pciDssExpiryDate: undefined,
      hipaaCompliant: false,
      gdprCompliant: false,
      localRegulations: ["Data Protection Act 2012"],
      lastAuditDate: new Date("2024-09-15"),
      nextAuditDate: new Date("2025-09-15"),
      auditFindings: [
        {
          id: "AUDIT-001",
          category: "Physical Security",
          severity: "LOW",
          description: "Update visitor management procedures",
          recommendation: "Implement digital visitor management system",
          dueDate: new Date("2024-12-31"),
          status: "IN_PROGRESS",
          responsible: "Security Manager"
        }
      ],
      complianceScore: 92
    }
  },
  // GNPC Data Center
  {
    id: "INF-GNPC-001",
    entityId: "SOE-002",
    entityName: "Ghana National Petroleum Corporation",
    siteName: "GNPC Headquarters Data Center",
    siteType: "DATA_CENTER",
    location: "Accra, Ghana",
    region: "Greater Accra",
    status: "ACTIVE",
    certificationLevel: "TIER_III",
    totalArea: 400,
    itArea: 280,
    powerCapacity: 800,
    powerUsed: 600,
    coolingCapacity: 650,
    coolingUsed: 480,
    rackCount: 40,
    racksUsed: 32,
    racksAvailable: 8,
    pueRating: 1.45,
    uptime: 99.8,
    temperature: 21,
    humidity: 48,
    securityLevel: "CRITICAL",
    accessControl: ["Biometric", "Key Card", "PIN", "Mantrap"],
    fireSuppression: "Novec 1230",
    monitoringSystems: ["SCADA", "BMS", "NMS", "VMS"],
    backupSystems: ["UPS", "Generator", "Dual Power Feeds", "Battery Backup"],
    networkConnectivity: {
      primaryProvider: "MTN Business",
      secondaryProvider: "AirtelTigo Business",
      bandwidth: 500,
      bandwidthUsed: 350,
      connectionType: "FIBER",
      latency: 8,
      packetLoss: 0.2,
      uptime: 99.9,
      redundancyLevel: "FULL",
      ipv6Support: true,
      cdnIntegration: false,
      loadBalancing: true
    },
    powerSystems: {
      primarySource: "ECG Grid",
      backupSource: "Diesel Generator",
      upsCapacity: 400,
      upsRuntime: 45,
      generatorCapacity: 600,
      fuelCapacity: 4000,
      fuelRuntime: 20,
      powerDistribution: "Dual Bus",
      redundancyLevel: "2N+1",
      monitoringSystem: "Eaton",
      automaticTransfer: true,
      maintenanceHistory: [
        {
          date: new Date("2024-10-10"),
          type: "ROUTINE",
          description: "Bi-weekly generator testing",
          duration: 1,
          impact: "None",
          cost: 300
        }
      ]
    },
    coolingSystems: {
      primarySystem: "Stulz CRAC",
      secondarySystem: "Standby CRAC",
      coolingType: "AIR",
      totalCapacity: 650,
      usedCapacity: 480,
      efficiency: 82,
      redundancyLevel: "N+1",
      controlSystem: "Siemens Desigo",
      hotAisleContainment: true,
      coldAisleContainment: true,
      freeCooling: false,
      maintenanceHistory: [
        {
          date: new Date("2024-09-15"),
          type: "ROUTINE",
          description: "Monthly filter replacement",
          duration: 2,
          impact: "None",
          cost: 1500
        }
      ]
    },
    securitySystems: {
      accessControl: "Suprema",
      surveillance: "Hikvision",
      intrusionDetection: "Honeywell",
      fireDetection: "Siemens",
      suppressionSystem: "Novec 1230",
      securityLevel: 9,
      guards24x7: true,
      biometricAccess: true,
      visitorManagement: true,
      vehicleControl: true,
      perimeterSecurity: "High-security fence with electric gates",
      incidentResponse: "Armed response team"
    },
    environmentalMonitoring: {
      temperatureSensors: 16,
      humiditySensors: 16,
      leakDetection: true,
      airQualityMonitoring: true,
      pressureMonitoring: true,
      vibrationMonitoring: true,
      powerMonitoring: true,
      environmentalAlerts: []
    },
    performanceMetrics: {
      cpuUtilization: 70,
      memoryUtilization: 75,
      storageUtilization: 85,
      networkUtilization: 70,
      responseTime: 180,
      throughput: 350,
      errorRate: 0.3,
      availability: 99.8,
      meanTimeBetweenFailures: 4380,
      meanTimeToRepair: 90,
      serviceLevelAgreement: 99.5,
      performanceScore: 85,
      lastUpdated: new Date("2024-11-01")
    },
    capacityMetrics: {
      rackUtilization: 80,
      powerUtilization: 75,
      coolingUtilization: 74,
      spaceUtilization: 70,
      networkUtilization: 70,
      storageCapacity: 300,
      storageUsed: 255,
      storageAvailable: 45,
      growthRate: 8,
      projectedExhaustion: new Date("2025-12-01"),
      capacityScore: 72,
      recommendations: [
        "Immediate storage expansion required",
        "Consider cloud archival solution",
        "Plan for rack space expansion"
      ]
    },
    costMetrics: {
      monthlyPowerCost: 36000,
      monthlyCoolingCost: 20000,
      monthlyMaintenanceCost: 12000,
      monthlyStaffCost: 25000,
      monthlySoftwareCost: 18000,
      monthlyNetworkCost: 8000,
      totalMonthlyCost: 119000,
      costPerRack: 3718.75,
      costPerkW: 198.33,
      pueCost: 52200,
      costTrend: 6.5,
      budgetUtilization: 90,
      costOptimizationOpportunities: [
        {
          id: "COST-OPT-002",
          type: "STORAGE",
          description: "Implement data archiving to cloud",
          potentialSavings: 8000,
          implementationCost: 25000,
          paybackPeriod: 3,
          priority: "HIGH",
          impact: "Reduced storage costs by 30%"
        }
      ]
    },
    sustainabilityMetrics: {
      carbonFootprint: 960,
      energyConsumption: 1920,
      renewableEnergyPercentage: 0,
      waterUsage: 400,
      wasteGenerated: 80,
      wasteRecycled: 60,
      greenCertification: "None",
      sustainabilityScore: 55,
      improvementInitiatives: [
        {
          id: "SUST-002",
          name: "Energy Efficiency Audit",
          description: "Conduct comprehensive energy efficiency audit",
          startDate: new Date("2024-11-15"),
          targetDate: new Date("2024-12-15"),
          status: "IN_PROGRESS",
          expectedReduction: 10,
          cost: 20000
        }
      ]
    },
    riskAssessment: {
      overallRiskLevel: "MEDIUM",
      riskFactors: [
        {
          id: "RISK-003",
          category: "SECURITY_BREACH",
          probability: 2,
          impact: 9,
          riskScore: 18,
          description: "Corporate espionage risk",
          mitigation: "Enhanced security measures and monitoring",
          status: "MITIGATED"
        },
        {
          id: "RISK-004",
          category: "HARDWARE_FAILURE",
          probability: 4,
          impact: 6,
          riskScore: 24,
          description: "Aging infrastructure",
          mitigation: "Planned hardware refresh cycle",
          status: "MONITORED"
        }
      ],
      mitigationStrategies: [
        {
          id: "MIT-002",
          riskFactorId: "RISK-003",
          description: "24/7 security monitoring and armed response",
          implementationDate: new Date("2024-01-01"),
          effectiveness: 98,
          cost: 15000,
          responsible: "Security Director"
        }
      ],
      insuranceCoverage: "Comprehensive corporate insurance",
      disasterRecoveryPlan: true,
      businessContinuityPlan: true,
      lastRiskAssessment: new Date("2024-08-01"),
      nextRiskAssessment: new Date("2025-02-01")
    },
    maintenanceSchedule: [
      {
        id: "MAINT-002",
        type: "PREVENTIVE",
        title: "Monthly Security Systems Check",
        description: "Test all security systems and cameras",
        scheduledDate: new Date("2024-12-01"),
        duration: 2,
        frequency: "Monthly",
        responsible: "Security Team",
        status: "SCHEDULED",
        impact: "None",
        cost: 1000
      }
    ],
    incidents: [],
    upgrades: [
      {
        id: "UPG-002",
        type: "SECURITY",
        title: "Security System Upgrade",
        description: "Upgrade CCTV and access control systems",
        justification: "Enhanced security requirements",
        estimatedCost: 80000,
        actualCost: 78000,
        startDate: new Date("2024-09-01"),
        endDate: new Date("2024-09-20"),
        status: "COMPLETED",
        impact: "Improved security monitoring",
        benefits: ["4K cameras", "AI analytics", "Better access control"],
        risks: ["Privacy concerns"],
        vendor: "Hikvision",
        projectManager: "Security Manager",
        approvalDate: new Date("2024-08-15"),
        approvedBy: "Security Director"
      }
    ],
    staff: [
      {
        id: "STAFF-002",
        name: "Dr. Ama Mensah",
        position: "Infrastructure Manager",
        department: "IT",
        email: "a.mensah@gnpcghana.com",
        phone: "+233-244-234567",
        certifications: ["CISSP", "PMP", "ITIL"],
        skills: ["Infrastructure Management", "Security", "Compliance"],
        experience: 12,
        shift: "Day",
        onCall: true,
        trainingRecords: [
          {
            id: "TRAIN-002",
            courseName: "Advanced Security Management",
            provider: "ISC2",
            startDate: new Date("2024-07-01"),
            endDate: new Date("2024-07-10"),
            certification: true,
            expiryDate: new Date("2027-07-01"),
            score: 92,
            cost: 8000
          }
        ]
      }
    ],
    compliance: {
      iso27001Certified: true,
      iso27001ExpiryDate: new Date("2025-09-30"),
      iso9001Certified: true,
      iso9001ExpiryDate: new Date("2025-03-31"),
      soc2Compliant: false,
      soc2ReportDate: undefined,
      pciDssCompliant: false,
      pciDssExpiryDate: undefined,
      hipaaCompliant: false,
      gdprCompliant: false,
      localRegulations: ["Data Protection Act 2012", "Petroleum Commission Regulations"],
      lastAuditDate: new Date("2024-08-15"),
      nextAuditDate: new Date("2025-08-15"),
      auditFindings: [],
      complianceScore: 95
    }
  },
  // VRA Data Center
  {
    id: "INF-VRA-001",
    entityId: "SOE-003",
    entityName: "Volta River Authority",
    siteName: "Akosombo Control Center",
    siteType: "DATA_CENTER",
    location: "Akosombo, Ghana",
    region: "Eastern",
    status: "ACTIVE",
    certificationLevel: "TIER_II",
    totalArea: 300,
    itArea: 200,
    powerCapacity: 600,
    powerUsed: 450,
    coolingCapacity: 500,
    coolingUsed: 380,
    rackCount: 30,
    racksUsed: 25,
    racksAvailable: 5,
    pueRating: 1.5,
    uptime: 99.7,
    temperature: 23,
    humidity: 50,
    securityLevel: "HIGH",
    accessControl: ["Key Card", "PIN"],
    fireSuppression: "FM-200",
    monitoringSystems: ["SCADA", "BMS"],
    backupSystems: ["UPS", "Generator"],
    networkConnectivity: {
      primaryProvider: "Vodafone Business",
      secondaryProvider: "MTN Business",
      bandwidth: 200,
      bandwidthUsed: 150,
      connectionType: "FIBER",
      latency: 12,
      packetLoss: 0.3,
      uptime: 99.8,
      redundancyLevel: "PARTIAL",
      ipv6Support: false,
      cdnIntegration: false,
      loadBalancing: false
    },
    powerSystems: {
      primarySource: "VRA Grid",
      backupSource: "Diesel Generator",
      upsCapacity: 300,
      upsRuntime: 60,
      generatorCapacity: 500,
      fuelCapacity: 3000,
      fuelRuntime: 16,
      powerDistribution: "Single Bus",
      redundancyLevel: "N+1",
      monitoringSystem: "ABB",
      automaticTransfer: true,
      maintenanceHistory: [
        {
          date: new Date("2024-10-05"),
          type: "ROUTINE",
          description: "Monthly generator load test",
          duration: 1,
          impact: "None",
          cost: 400
        }
      ]
    },
    coolingSystems: {
      primarySystem: "Carrier CRAC",
      secondarySystem: "Standby Units",
      coolingType: "AIR",
      totalCapacity: 500,
      usedCapacity: 380,
      efficiency: 78,
      redundancyLevel: "N",
      controlSystem: "Carrier Controls",
      hotAisleContainment: false,
      coldAisleContainment: false,
      freeCooling: false,
      maintenanceHistory: [
        {
          date: new Date("2024-09-10"),
          type: "ROUTINE",
          description: "Quarterly maintenance",
          duration: 3,
          impact: "Minimal",
          cost: 1800
        }
      ]
    },
    securitySystems: {
      accessControl: "ADT",
      surveillance: "Dahua",
      intrusionDetection: "Paradox",
      fireDetection: "Simplex",
      suppressionSystem: "FM-200",
      securityLevel: 7,
      guards24x7: true,
      biometricAccess: false,
      visitorManagement: true,
      vehicleControl: false,
      perimeterSecurity: "Chain-link fence",
      incidentResponse: "On-site security team"
    },
    environmentalMonitoring: {
      temperatureSensors: 12,
      humiditySensors: 12,
      leakDetection: true,
      airQualityMonitoring: false,
      pressureMonitoring: false,
      vibrationMonitoring: false,
      powerMonitoring: true,
      environmentalAlerts: []
    },
    performanceMetrics: {
      cpuUtilization: 60,
      memoryUtilization: 65,
      storageUtilization: 70,
      networkUtilization: 75,
      responseTime: 200,
      throughput: 150,
      errorRate: 0.5,
      availability: 99.7,
      meanTimeBetweenFailures: 2920,
      meanTimeToRepair: 120,
      serviceLevelAgreement: 99.0,
      performanceScore: 78,
      lastUpdated: new Date("2024-11-01")
    },
    capacityMetrics: {
      rackUtilization: 83,
      powerUtilization: 75,
      coolingUtilization: 76,
      spaceUtilization: 67,
      networkUtilization: 75,
      storageCapacity: 200,
      storageUsed: 140,
      storageAvailable: 60,
      growthRate: 3,
      projectedExhaustion: new Date("2027-12-01"),
      capacityScore: 78,
      recommendations: [
        "Monitor rack space utilization",
        "Plan for network upgrade",
        "Consider hot aisle containment"
      ]
    },
    costMetrics: {
      monthlyPowerCost: 27000,
      monthlyCoolingCost: 15000,
      monthlyMaintenanceCost: 10000,
      monthlyStaffCost: 20000,
      monthlySoftwareCost: 12000,
      monthlyNetworkCost: 5000,
      totalMonthlyCost: 89000,
      costPerRack: 3560,
      costPerkW: 197.78,
      pueCost: 40500,
      costTrend: 4.8,
      budgetUtilization: 80,
      costOptimizationOpportunities: [
        {
          id: "COST-OPT-003",
          type: "POWER",
          description: "Optimize power distribution",
          potentialSavings: 3000,
          implementationCost: 10000,
          paybackPeriod: 3,
          priority: "MEDIUM",
          impact: "Reduced power costs by 10%"
        }
      ]
    },
    sustainabilityMetrics: {
      carbonFootprint: 720,
      energyConsumption: 1440,
      renewableEnergyPercentage: 20,
      waterUsage: 300,
      wasteGenerated: 60,
      wasteRecycled: 45,
      greenCertification: "None",
      sustainabilityScore: 70,
      improvementInitiatives: [
        {
          id: "SUST-003",
          name: "Hydro Power Optimization",
          description: "Optimize use of hydro power for data center",
          startDate: new Date("2024-10-01"),
          targetDate: new Date("2024-12-31"),
          status: "IN_PROGRESS",
          expectedReduction: 25,
          cost: 15000
        }
      ]
    },
    riskAssessment: {
      overallRiskLevel: "MEDIUM",
      riskFactors: [
        {
          id: "RISK-005",
          category: "NATURAL_DISASTER",
          probability: 3,
          impact: 8,
          riskScore: 24,
          description: "Flooding risk from Volta River",
          mitigation: "Elevated location and flood barriers",
          status: "MITIGATED"
        }
      ],
      mitigationStrategies: [
        {
          id: "MIT-003",
          riskFactorId: "RISK-005",
          description: "Regular flood risk assessment",
          implementationDate: new Date("2024-01-01"),
          effectiveness: 90,
          cost: 5000,
          responsible: "Facilities Manager"
        }
      ],
      insuranceCoverage: "Flood and disaster insurance",
      disasterRecoveryPlan: true,
      businessContinuityPlan: true,
      lastRiskAssessment: new Date("2024-07-01"),
      nextRiskAssessment: new Date("2025-01-01")
    },
    maintenanceSchedule: [
      {
        id: "MAINT-003",
        type: "PREVENTIVE",
        title: "SCADA System Maintenance",
        description: "Preventive maintenance for SCADA systems",
        scheduledDate: new Date("2024-12-10"),
        duration: 6,
        frequency: "Quarterly",
        responsible: "Control Systems Engineer",
        status: "SCHEDULED",
        impact: "Minimal",
        cost: 2500
      }
    ],
    incidents: [
      {
        id: "INC-002",
        type: "NETWORK_OUTAGE",
        severity: "MEDIUM",
        title: "Network connectivity issue",
        description: "Fiber optic cable damage",
        startTime: new Date("2024-09-15T10:00:00"),
        endTime: new Date("2024-09-15T14:00:00"),
        duration: 240,
        impact: "Reduced monitoring capability",
        affectedSystems: ["Remote monitoring"],
        rootCause: "Construction damage to fiber cable",
        resolution: "Temporary wireless backup activated",
        status: "CLOSED",
        reportedBy: "Network Team",
        assignedTo: "External Provider",
        cost: 2000,
        lessonsLearned: "Need diverse routing for critical connections"
      }
    ],
    upgrades: [],
    staff: [
      {
        id: "STAFF-003",
        name: "Kwame Boateng",
        position: "Control Systems Engineer",
        department: "Operations",
        email: "k.boateng@vra.com",
        phone: "+233-244-345678",
        certifications: ["SCADA", "PLC"],
        skills: ["Control Systems", "SCADA", "Industrial Networks"],
        experience: 8,
        shift: "Shift",
        onCall: true,
        trainingRecords: []
      }
    ],
    compliance: {
      iso27001Certified: false,
      iso27001ExpiryDate: undefined,
      iso9001Certified: true,
      iso9001ExpiryDate: new Date("2025-08-31"),
      soc2Compliant: false,
      soc2ReportDate: undefined,
      pciDssCompliant: false,
      pciDssExpiryDate: undefined,
      hipaaCompliant: false,
      gdprCompliant: false,
      localRegulations: ["Energy Commission Regulations"],
      lastAuditDate: new Date("2024-06-15"),
      nextAuditDate: new Date("2025-06-15"),
      auditFindings: [
        {
          id: "AUDIT-002",
          category: "Security",
          severity: "MEDIUM",
          description: "Upgrade access control system",
          recommendation: "Implement biometric access control",
          dueDate: new Date("2025-03-31"),
          status: "OPEN",
          responsible: "Security Manager"
        }
      ],
      complianceScore: 78
    }
  },
  // GRIDCO Data Center
  {
    id: "INF-GRIDCO-001",
    entityId: "SOE-004",
    entityName: "Ghana Grid Company",
    siteName: "System Control Center",
    siteType: "DATA_CENTER",
    location: "Accra, Ghana",
    region: "Greater Accra",
    status: "ACTIVE",
    certificationLevel: "TIER_III",
    totalArea: 350,
    itArea: 250,
    powerCapacity: 700,
    powerUsed: 525,
    coolingCapacity: 600,
    coolingUsed: 450,
    rackCount: 35,
    racksUsed: 28,
    racksAvailable: 7,
    pueRating: 1.42,
    uptime: 99.95,
    temperature: 22,
    humidity: 46,
    securityLevel: "CRITICAL",
    accessControl: ["Biometric", "Key Card", "PIN", "Mantrap"],
    fireSuppression: "Novec 1230",
    monitoringSystems: ["SCADA", "BMS", "NMS", "VMS"],
    backupSystems: ["UPS", "Generator", "Dual Power Feeds", "Battery Backup"],
    networkConnectivity: {
      primaryProvider: "MTN Business",
      secondaryProvider: "Vodafone Business",
      bandwidth: 300,
      bandwidthUsed: 200,
      connectionType: "FIBER",
      latency: 6,
      packetLoss: 0.1,
      uptime: 99.98,
      redundancyLevel: "FULL",
      ipv6Support: true,
      cdnIntegration: false,
      loadBalancing: true
    },
    powerSystems: {
      primarySource: "ECG Grid",
      backupSource: "Diesel Generator",
      upsCapacity: 350,
      upsRuntime: 40,
      generatorCapacity: 600,
      fuelCapacity: 4000,
      fuelRuntime: 20,
      powerDistribution: "Dual Bus",
      redundancyLevel: "2N",
      monitoringSystem: "Schneider Electric",
      automaticTransfer: true,
      maintenanceHistory: [
        {
          date: new Date("2024-10-12"),
          type: "ROUTINE",
          description: "Weekly generator testing",
          duration: 1,
          impact: "None",
          cost: 350
        }
      ]
    },
    coolingSystems: {
      primarySystem: "Liebert CRAC",
      secondarySystem: "Standby CRAC",
      coolingType: "AIR",
      totalCapacity: 600,
      usedCapacity: 450,
      efficiency: 84,
      redundancyLevel: "N+1",
      controlSystem: "Building Management System",
      hotAisleContainment: true,
      coldAisleContainment: true,
      freeCooling: false,
      maintenanceHistory: [
        {
          date: new Date("2024-09-18"),
          type: "ROUTINE",
          description: "Monthly maintenance",
          duration: 3,
          impact: "Minimal",
          cost: 2200
        }
      ]
    },
    securitySystems: {
      accessControl: "HID Global",
      surveillance: "Axis Cameras",
      intrusionDetection: "Bosch",
      fireDetection: "Notifier",
      suppressionSystem: "Novec 1230",
      securityLevel: 9,
      guards24x7: true,
      biometricAccess: true,
      visitorManagement: true,
      vehicleControl: true,
      perimeterSecurity: "High-security fence with motion sensors",
      incidentResponse: "Armed response team"
    },
    environmentalMonitoring: {
      temperatureSensors: 14,
      humiditySensors: 14,
      leakDetection: true,
      airQualityMonitoring: true,
      pressureMonitoring: true,
      vibrationMonitoring: true,
      powerMonitoring: true,
      environmentalAlerts: []
    },
    performanceMetrics: {
      cpuUtilization: 55,
      memoryUtilization: 60,
      storageUtilization: 75,
      networkUtilization: 67,
      responseTime: 120,
      throughput: 200,
      errorRate: 0.1,
      availability: 99.95,
      meanTimeBetweenFailures: 17520,
      meanTimeToRepair: 30,
      serviceLevelAgreement: 99.9,
      performanceScore: 92,
      lastUpdated: new Date("2024-11-01")
    },
    capacityMetrics: {
      rackUtilization: 80,
      powerUtilization: 75,
      coolingUtilization: 75,
      spaceUtilization: 71,
      networkUtilization: 67,
      storageCapacity: 250,
      storageUsed: 187.5,
      storageAvailable: 62.5,
      growthRate: 4,
      projectedExhaustion: new Date("2027-06-01"),
      capacityScore: 80,
      recommendations: [
        "Monitor storage growth trends",
        "Plan for network capacity expansion",
        "Consider cloud backup solutions"
      ]
    },
    costMetrics: {
      monthlyPowerCost: 31500,
      monthlyCoolingCost: 17500,
      monthlyMaintenanceCost: 11000,
      monthlyStaffCost: 22000,
      monthlySoftwareCost: 14000,
      monthlyNetworkCost: 6000,
      totalMonthlyCost: 102000,
      costPerRack: 3642.86,
      costPerkW: 194.29,
      pueCost: 44730,
      costTrend: 5.5,
      budgetUtilization: 82,
      costOptimizationOpportunities: [
        {
          id: "COST-OPT-004",
          type: "COOLING",
          description: "Implement variable speed fans",
          potentialSavings: 2500,
          implementationCost: 8000,
          paybackPeriod: 3,
          priority: "MEDIUM",
          impact: "Reduced cooling costs by 15%"
        }
      ]
    },
    sustainabilityMetrics: {
      carbonFootprint: 840,
      energyConsumption: 1680,
      renewableEnergyPercentage: 10,
      waterUsage: 350,
      wasteGenerated: 70,
      wasteRecycled: 56,
      greenCertification: "None",
      sustainabilityScore: 68,
      improvementInitiatives: [
        {
          id: "SUST-004",
          name: "Solar Panel Feasibility Study",
          description: "Assess feasibility of solar panel installation",
          startDate: new Date("2024-11-01"),
          targetDate: new Date("2024-12-31"),
          status: "IN_PROGRESS",
          expectedReduction: 20,
          cost: 10000
        }
      ]
    },
    riskAssessment: {
      overallRiskLevel: "LOW",
      riskFactors: [
        {
          id: "RISK-006",
          category: "NETWORK_OUTAGE",
          probability: 2,
          impact: 7,
          riskScore: 14,
          description: "Network connectivity failure",
          mitigation: "Multiple redundant connections",
          status: "MITIGATED"
        }
      ],
      mitigationStrategies: [
        {
          id: "MIT-004",
          riskFactorId: "RISK-006",
          description: "Multiple diverse network paths",
          implementationDate: new Date("2024-01-01"),
          effectiveness: 95,
          cost: 12000,
          responsible: "Network Manager"
        }
      ],
      insuranceCoverage: "Critical infrastructure insurance",
      disasterRecoveryPlan: true,
      businessContinuityPlan: true,
      lastRiskAssessment: new Date("2024-08-15"),
      nextRiskAssessment: new Date("2025-02-15")
    },
    maintenanceSchedule: [
      {
        id: "MAINT-004",
        type: "PREVENTIVE",
        title: "SCADA System Backup Test",
        description: "Monthly SCADA system backup verification",
        scheduledDate: new Date("2024-12-05"),
        duration: 2,
        frequency: "Monthly",
        responsible: "SCADA Engineer",
        status: "SCHEDULED",
        impact: "None",
        cost: 800
      }
    ],
    incidents: [],
    upgrades: [
      {
        id: "UPG-003",
        type: "HARDWARE",
        title: "Server Upgrade",
        description: "Upgrade critical SCADA servers",
        justification: "End-of-life hardware replacement",
        estimatedCost: 120000,
        actualCost: 115000,
        startDate: new Date("2024-07-01"),
        endDate: new Date("2024-07-15"),
        status: "COMPLETED",
        impact: "Improved system reliability",
        benefits: ["Better performance", "Extended support", "Enhanced security"],
        risks: ["Downtime during migration"],
        vendor: "Dell Technologies",
        projectManager: "Infrastructure Manager",
        approvalDate: new Date("2024-06-15"),
        approvedBy: "CTO"
      }
    ],
    staff: [
      {
        id: "STAFF-004",
        name: "Yaa Nkrumah",
        position: "SCADA System Manager",
        department: "System Control",
        email: "y.nkrumah@gridcoghana.com",
        phone: "+233-244-456789",
        certifications: ["SCADA", "PMP", "ITIL"],
        skills: ["SCADA Management", "Network Operations", "Critical Infrastructure"],
        experience: 15,
        shift: "Day",
        onCall: true,
        trainingRecords: [
          {
            id: "TRAIN-003",
            courseName: "Advanced SCADA Security",
            provider: "ISA",
            startDate: new Date("2024-08-01"),
            endDate: new Date("2024-08-07"),
            certification: true,
            expiryDate: new Date("2027-08-01"),
            score: 94,
            cost: 6000
          }
        ]
      }
    ],
    compliance: {
      iso27001Certified: true,
      iso27001ExpiryDate: new Date("2025-10-31"),
      iso9001Certified: true,
      iso9001ExpiryDate: new Date("2025-04-30"),
      soc2Compliant: false,
      soc2ReportDate: undefined,
      pciDssCompliant: false,
      pciDssExpiryDate: undefined,
      hipaaCompliant: false,
      gdprCompliant: false,
      localRegulations: ["Energy Commission Regulations", "Grid Code"],
      lastAuditDate: new Date("2024-09-01"),
      nextAuditDate: new Date("2025-09-01"),
      auditFindings: [],
      complianceScore: 94
    }
  },
  // PPA Data Center
  {
    id: "INF-PPA-001",
    entityId: "REG-001",
    entityName: "Public Procurement Authority",
    siteType: "SERVER_ROOM",
    location: "Accra, Ghana",
    region: "Greater Accra",
    status: "ACTIVE",
    certificationLevel: "TIER_I",
    totalArea: 100,
    itArea: 60,
    powerCapacity: 100,
    powerUsed: 70,
    coolingCapacity: 80,
    coolingUsed: 55,
    rackCount: 8,
    racksUsed: 6,
    racksAvailable: 2,
    pueRating: 1.6,
    uptime: 99.5,
    temperature: 24,
    humidity: 52,
    securityLevel: "MEDIUM",
    accessControl: ["Key Card", "PIN"],
    fireSuppression: "FM-200",
    monitoringSystems: ["BMS", "NMS"],
    backupSystems: ["UPS", "Generator"],
    networkConnectivity: {
      primaryProvider: "MTN Business",
      secondaryProvider: "Vodafone Business",
      bandwidth: 100,
      bandwidthUsed: 60,
      connectionType: "FIBER",
      latency: 15,
      packetLoss: 0.2,
      uptime: 99.7,
      redundancyLevel: "PARTIAL",
      ipv6Support: true,
      cdnIntegration: true,
      loadBalancing: false
    },
    powerSystems: {
      primarySource: "ECG Grid",
      backupSource: "Diesel Generator",
      upsCapacity: 50,
      upsRuntime: 30,
      generatorCapacity: 100,
      fuelCapacity: 500,
      fuelRuntime: 8,
      powerDistribution: "Single Bus",
      redundancyLevel: "N",
      monitoringSystem: "APC",
      automaticTransfer: true,
      maintenanceHistory: [
        {
          date: new Date("2024-10-08"),
          type: "ROUTINE",
          description: "Monthly UPS test",
          duration: 0.5,
          impact: "None",
          cost: 200
        }
      ]
    },
    coolingSystems: {
      primarySystem: "Split AC Units",
      secondarySystem: "Portable AC",
      coolingType: "AIR",
      totalCapacity: 80,
      usedCapacity: 55,
      efficiency: 70,
      redundancyLevel: "NONE",
      controlSystem: "Thermostat",
      hotAisleContainment: false,
      coldAisleContainment: false,
      freeCooling: false,
      maintenanceHistory: [
        {
          date: new Date("2024-09-12"),
          type: "ROUTINE",
          description: "Quarterly AC service",
          duration: 2,
          impact: "None",
          cost: 800
        }
      ]
    },
    securitySystems: {
      accessControl: "Local Security",
      surveillance: "IP Cameras",
      intrusionDetection: "Basic Alarm",
      fireDetection: "Smoke Detectors",
      suppressionSystem: "FM-200",
      securityLevel: 5,
      guards24x7: false,
      biometricAccess: false,
      visitorManagement: true,
      vehicleControl: false,
      perimeterSecurity: "Building security",
      incidentResponse: "Building management"
    },
    environmentalMonitoring: {
      temperatureSensors: 4,
      humiditySensors: 4,
      leakDetection: false,
      airQualityMonitoring: false,
      pressureMonitoring: false,
      vibrationMonitoring: false,
      powerMonitoring: true,
      environmentalAlerts: []
    },
    performanceMetrics: {
      cpuUtilization: 50,
      memoryUtilization: 55,
      storageUtilization: 60,
      networkUtilization: 60,
      responseTime: 250,
      throughput: 60,
      errorRate: 0.8,
      availability: 99.5,
      meanTimeBetweenFailures: 2160,
      meanTimeToRepair: 180,
      serviceLevelAgreement: 99.0,
      performanceScore: 72,
      lastUpdated: new Date("2024-11-01")
    },
    capacityMetrics: {
      rackUtilization: 75,
      powerUtilization: 70,
      coolingUtilization: 69,
      spaceUtilization: 60,
      networkUtilization: 60,
      storageCapacity: 50,
      storageUsed: 30,
      storageAvailable: 20,
      growthRate: 6,
      projectedExhaustion: new Date("2026-09-01"),
      capacityScore: 70,
      recommendations: [
        "Plan for infrastructure upgrade",
        "Consider cloud migration",
        "Improve cooling efficiency"
      ]
    },
    costMetrics: {
      monthlyPowerCost: 4500,
      monthlyCoolingCost: 2500,
      monthlyMaintenanceCost: 2000,
      monthlyStaffCost: 5000,
      monthlySoftwareCost: 3000,
      monthlyNetworkCost: 2000,
      totalMonthlyCost: 19000,
      costPerRack: 3166.67,
      costPerkW: 271.43,
      pueCost: 7200,
      costTrend: 7.2,
      budgetUtilization: 75,
      costOptimizationOpportunities: [
        {
          id: "COST-OPT-005",
          type: "INFRASTRUCTURE",
          description: "Migrate to cloud services",
          potentialSavings: 8000,
          implementationCost: 20000,
          paybackPeriod: 2.5,
          priority: "HIGH",
          impact: "Reduced infrastructure costs by 40%"
        }
      ]
    },
    sustainabilityMetrics: {
      carbonFootprint: 120,
      energyConsumption: 240,
      renewableEnergyPercentage: 0,
      waterUsage: 50,
      wasteGenerated: 20,
      wasteRecycled: 15,
      greenCertification: "None",
      sustainabilityScore: 60,
      improvementInitiatives: [
        {
          id: "SUST-005",
          name: "Green IT Initiative",
          description: "Implement green IT practices",
          startDate: new Date("2024-11-01"),
          targetDate: new Date("2025-03-31"),
          status: "PLANNED",
          expectedReduction: 15,
          cost: 5000
        }
      ]
    },
    riskAssessment: {
      overallRiskLevel: "MEDIUM",
      riskFactors: [
        {
          id: "RISK-007",
          category: "POWER_FAILURE",
          probability: 4,
          impact: 6,
          riskScore: 24,
          description: "Limited backup power capacity",
          mitigation: "Upgrade UPS and generator systems",
          status: "MONITORED"
        }
      ],
      mitigationStrategies: [
        {
          id: "MIT-005",
          riskFactorId: "RISK-007",
          description: "Regular power system testing",
          implementationDate: new Date("2024-01-01"),
          effectiveness: 80,
          cost: 2400,
          responsible: "IT Manager"
        }
      ],
      insuranceCoverage: "Basic office insurance",
      disasterRecoveryPlan: true,
      businessContinuityPlan: false,
      lastRiskAssessment: new Date("2024-06-01"),
      nextRiskAssessment: new Date("2024-12-01")
    },
    maintenanceSchedule: [
      {
        id: "MAINT-005",
        type: "PREVENTIVE",
        title: "Server Maintenance",
        description: "Monthly server health checks",
        scheduledDate: new Date("2024-12-08"),
        duration: 2,
        frequency: "Monthly",
        responsible: "IT Support",
        status: "SCHEDULED",
        impact: "Minimal",
        cost: 500
      }
    ],
    incidents: [
      {
        id: "INC-003",
        type: "COOLING_FAILURE",
        severity: "MEDIUM",
        title: "AC Unit Failure",
        description: "Primary AC unit failed",
        startTime: new Date("2024-08-15T16:00:00"),
        endTime: new Date("2024-08-15T18:00:00"),
        duration: 120,
        impact: "Increased temperature",
        affectedSystems: ["All servers"],
        rootCause: "Compressor failure",
        resolution: "Portable AC units deployed",
        status: "CLOSED",
        reportedBy: "Temperature monitoring",
        assignedTo: "Maintenance Team",
        cost: 1500,
        lessonsLearned: "Need redundant cooling system"
      }
    ],
    upgrades: [],
    staff: [
      {
        id: "STAFF-005",
        name: "Kofi Annan",
        position: "IT Manager",
        department: "IT",
        email: "k.annan@ppa.gov.gh",
        phone: "+233-244-567890",
        certifications: ["ITIL", "PMP"],
        skills: ["IT Management", "Network Administration", "System Administration"],
        experience: 6,
        shift: "Day",
        onCall: true,
        trainingRecords: []
      }
    ],
    compliance: {
      iso27001Certified: false,
      iso27001ExpiryDate: undefined,
      iso9001Certified: false,
      iso9001ExpiryDate: undefined,
      soc2Compliant: false,
      soc2ReportDate: undefined,
      pciDssCompliant: false,
      pciDssExpiryDate: undefined,
      hipaaCompliant: false,
      gdprCompliant: false,
      localRegulations: ["Data Protection Act 2012"],
      lastAuditDate: new Date("2024-05-15"),
      nextAuditDate: new Date("2025-05-15"),
      auditFindings: [
        {
          id: "AUDIT-003",
          category: "Infrastructure",
          severity: "MEDIUM",
          description: "Upgrade cooling systems",
          recommendation: "Install redundant cooling systems",
          dueDate: new Date("2025-01-31"),
          status: "OPEN",
          responsible: "IT Manager"
        }
      ],
      complianceScore: 72
    }
  }
];

// Infrastructure analytics summary
export const INFRASTRUCTURE_ANALYTICS_SUMMARY = {
  totalSites: 5,
  totalRacks: 163,
  totalPowerCapacity: 3200,
  totalPowerUsed: 2395,
  averagePUE: 1.474,
  averageUptime: 99.77,
  totalArea: 1650,
  totalITArea: 1140,
  totalMonthlyCost: 455000,
  averageUtilization: {
    rack: 79.6,
    power: 74.8,
    cooling: 73.8,
    space: 67.6,
    network: 67.4
  },
  certificationDistribution: {
    "TIER_IV": 0,
    "TIER_III": 3,
    "TIER_II": 1,
    "TIER_I": 1,
    "NONE": 0
  },
  securityDistribution: {
    "CRITICAL": 2,
    "HIGH": 2,
    "MEDIUM": 1,
    "LOW": 0
  },
  riskDistribution: {
    "LOW": 1,
    "MEDIUM": 4,
    "HIGH": 0,
    "CRITICAL": 0
  },
  sustainabilityMetrics: {
    totalCarbonFootprint: 3840,
    totalEnergyConsumption: 7680,
    averageRenewablePercentage: 7,
    totalWaterUsage: 1600,
    totalWasteGenerated: 330,
    totalWasteRecycled: 262,
    averageSustainabilityScore: 65.6
  },
  complianceMetrics: {
    iso27001Certified: 3,
    iso9001Certified: 4,
    averageComplianceScore: 86.2,
    totalAuditFindings: 4,
    openAuditFindings: 3
  },
  performanceMetrics: {
    averageAvailability: 99.77,
    averageResponseTime: 180,
    averageErrorRate: 0.38,
    averagePerformanceScore: 83
  },
  costOptimization: {
    totalPotentialSavings: 28500,
    totalImplementationCost: 88000,
    averagePaybackPeriod: 2.9,
    highPriorityOpportunities: 2
  }
};