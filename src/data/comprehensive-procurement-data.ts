// Comprehensive Procurement Data from January 2024 to November 2024
// Enhanced with detailed compliance tracking, conflict detection, and PPA-specific analysis

export interface ProcurementRecord {
  id: string;
  entityName: string;
  entityId: string;
  procurementTitle: string;
  description: string;
  category: 'GOODS' | 'WORKS' | 'SERVICES' | 'CONSULTANCY';
  procurementMethod: 'OPEN_TENDER' | 'RESTRICTED_TENDER' | 'DIRECT PROCUREMENT' | 'SOLE_SOURCING' | 'TWO_STAGE_TENDER';
  estimatedValue: number;
  actualValue: number;
  currency: 'GHS' | 'USD' | 'EUR';
  sourceOfFunding: string;
  tenderNumber: string;
  tenderPublicationDate: Date;
  tenderClosingDate: Date;
  contractAwardDate: Date;
  contractStartDate: Date;
  contractEndDate: Date;
  supplierName: string;
  supplierId: string;
  supplierCountry: string;
  isLocalSupplier: boolean;
  isSME: boolean;
  supplierOwnership: 'LOCAL' | 'FOREIGN' | 'JOINT_VENTURE';
  evaluationScore: number;
  complianceScore: number;
  conflictFlags: string[];
  duplicationFlags: string[];
  sustainabilityScore: number;
  localContentPercentage: number;
  approvalStatus: 'PENDING' | 'APPROVED' | 'REJECTED' | 'UNDER_REVIEW';
  approvedBy: string;
  approvedDate: Date;
  contractNumber: string;
  performanceGuarantee: number;
  advancePayment: number;
  deliveryTerms: string;
  paymentTerms: string;
  specifications: string[];
  evaluationCriteria: string[];
  biddersCount: number;
  localBiddersCount: number;
  smeBiddersCount: number;
  womenOwnedBiddersCount: number;
  youthOwnedBiddersCount: number;
  procurementPlanReference: string;
  budgetLine: string;
  quarter: number;
  year: number;
  auditStatus: 'COMPLIANT' | 'NON_COMPLIANT' | 'PENDING_AUDIT' | 'FLAGGED';
  auditDate?: Date;
  auditFindings?: string[];
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  riskFactors: string[];
  contractModifications: ContractModification[];
  performanceMetrics: PerformanceMetrics;
  sustainabilityMetrics: SustainabilityMetrics;
}

export interface ContractModification {
  id: string;
  date: Date;
  type: 'EXTENSION' | 'VALUE_INCREASE' | 'SCOPE_CHANGE' | 'TERMINATION';
  description: string;
  originalValue: number;
  newValue: number;
  approvedBy: string;
  justification: string;
}

export interface PerformanceMetrics {
  deliveryTimeliness: number;
  qualityScore: number;
  costEfficiency: number;
  supplierReliability: number;
  complianceAdherence: number;
  overallRating: number;
  lastUpdated: Date;
}

export interface SustainabilityMetrics {
  environmentalImpact: number;
  socialImpact: number;
  economicImpact: number;
  carbonFootprint: number;
  localJobsCreated: number;
  skillsTransferScore: number;
  greenProcurement: boolean;
}

export interface ComplianceIssue {
  id: string;
  type: 'PROCUREMENT_VIOLATION' | 'CONFLICT_OF_INTEREST' | 'DUPLICATE_PROCUREMENT' | 'BUDGET_EXCEEDED' | 'TIMELINE_VIOLATION';
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  description: string;
  affectedProcurement: string;
  detectedDate: Date;
  status: 'OPEN' | 'UNDER_INVESTIGATION' | 'RESOLVED' | 'CLOSED';
  resolution?: string;
  financialImpact: number;
  recommendedAction: string;
}

export interface ConflictDetection {
  id: string;
  type: 'SUPPLIER_RELATIONSHIP' | 'BOARD_MEMBER_CONFLICT' | 'STAFF_CONFLICT' | 'POLITICAL_CONNECTION';
  description: string;
  entities: string[];
  individuals: string[];
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  detectedDate: Date;
  investigationRequired: boolean;
  investigationStatus: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED';
}

// Comprehensive procurement data from January to November 2024
export const COMPREHENSIVE_PROCUREMENT_DATA: ProcurementRecord[] = [
  // January 2024 Procurements
  {
    id: "PROC-2024-001",
    entityName: "Electricity Company of Ghana",
    entityId: "SOE-001",
    procurementTitle: "Supply and Installation of Smart Meters",
    description: "Supply and installation of 50,000 smart prepaid meters for Accra East region",
    category: "GOODS",
    procurementMethod: "OPEN_TENDER",
    estimatedValue: 25000000,
    actualValue: 24500000,
    currency: "GHS",
    sourceOfFunding: "World Bank Credit",
    tenderNumber: "ECG/SM/2024/001",
    tenderPublicationDate: new Date("2024-01-05"),
    tenderClosingDate: new Date("2024-01-25"),
    contractAwardDate: new Date("2024-02-10"),
    contractStartDate: new Date("2024-02-15"),
    contractEndDate: new Date("2024-08-15"),
    supplierName: "MeterTech Ghana Ltd",
    supplierId: "SUP-001",
    supplierCountry: "Ghana",
    isLocalSupplier: true,
    isSME: false,
    supplierOwnership: "LOCAL",
    evaluationScore: 92,
    complianceScore: 95,
    conflictFlags: [],
    duplicationFlags: [],
    sustainabilityScore: 88,
    localContentPercentage: 75,
    approvalStatus: "APPROVED",
    approvedBy: "Procurement Committee - ECG",
    approvedDate: new Date("2024-02-08"),
    contractNumber: "ECG/CONT/2024/045",
    performanceGuarantee: 2450000,
    advancePayment: 7350000,
    deliveryTerms: "FOB Destination",
    paymentTerms: "30 Days NET",
    specifications: [
      "Smart prepaid meters with remote connectivity",
      "ISO 9001 certified",
      "5-year warranty",
      "Technical support included"
    ],
    evaluationCriteria: [
      "Technical specifications - 40%",
      "Price - 30%",
      "Local content - 15%",
      "After-sales support - 15%"
    ],
    biddersCount: 12,
    localBiddersCount: 8,
    smeBiddersCount: 5,
    womenOwnedBiddersCount: 2,
    youthOwnedBiddersCount: 1,
    procurementPlanReference: "ECG/PP/2024/012",
    budgetLine: "BL-2024-045",
    quarter: 1,
    year: 2024,
    auditStatus: "COMPLIANT",
    auditDate: new Date("2024-03-15"),
    auditFindings: [
      "All procurement procedures followed",
      "Local content requirements met",
      "Value for money achieved"
    ],
    riskLevel: "LOW",
    riskFactors: [
      "Supply chain delays",
      "Currency fluctuation"
    ],
    contractModifications: [],
    performanceMetrics: {
      deliveryTimeliness: 95,
      qualityScore: 92,
      costEfficiency: 98,
      supplierReliability: 94,
      complianceAdherence: 95,
      overallRating: 95,
      lastUpdated: new Date("2024-08-20")
    },
    sustainabilityMetrics: {
      environmentalImpact: 85,
      socialImpact: 90,
      economicImpact: 88,
      carbonFootprint: 12,
      localJobsCreated: 45,
      skillsTransferScore: 85,
      greenProcurement: true
    }
  },
  {
    id: "PROC-2024-002",
    entityName: "Ghana National Petroleum Corporation",
    entityId: "SOE-002",
    procurementTitle: "Offshore Drilling Services",
    description: "Provision of offshore drilling services for Tano Basin exploration",
    category: "SERVICES",
    procurementMethod: "RESTRICTED_TENDER",
    estimatedValue: 45000000,
    actualValue: 48500000,
    currency: "USD",
    sourceOfFunding: "GNPC Operating Revenue",
    tenderNumber: "GNPC/OD/2024/001",
    tenderPublicationDate: new Date("2024-01-10"),
    tenderClosingDate: new Date("2024-02-15"),
    contractAwardDate: new Date("2024-03-01"),
    contractStartDate: new Date("2024-03-15"),
    contractEndDate: new Date("2024-12-15"),
    supplierName: "Schlumberger Ghana Ltd",
    supplierId: "SUP-002",
    supplierCountry: "Ghana",
    isLocalSupplier: true,
    isSME: false,
    supplierOwnership: "JOINT_VENTURE",
    evaluationScore: 88,
    complianceScore: 82,
    conflictFlags: ["VALUE_INCREASE_7.8%"],
    duplicationFlags: [],
    sustainabilityScore: 75,
    localContentPercentage: 45,
    approvalStatus: "APPROVED",
    approvedBy: "GNPC Board Procurement Committee",
    approvedDate: new Date("2024-02-28"),
    contractNumber: "GNPC/CONT/2024/003",
    performanceGuarantee: 4850000,
    advancePayment: 14550000,
    deliveryTerms: "CIF Tema Port",
    paymentTerms: "60 Days NET",
    specifications: [
      "Deepwater drilling rig",
      "Certified drilling personnel",
      "Safety management system",
      "Environmental protection measures"
    ],
    evaluationCriteria: [
      "Technical capability - 50%",
      "Experience - 25%",
      "Health & Safety - 15%",
      "Price - 10%"
    ],
    biddersCount: 5,
    localBiddersCount: 2,
    smeBiddersCount: 0,
    womenOwnedBiddersCount: 0,
    youthOwnedBiddersCount: 0,
    procurementPlanReference: "GNPC/PP/2024/008",
    budgetLine: "BL-2024-012",
    quarter: 1,
    year: 2024,
    auditStatus: "FLAGGED",
    auditDate: new Date("2024-04-10"),
    auditFindings: [
      "Contract value exceeded estimate by 7.8%",
      "Insufficient justification for price increase",
      "Local content below target"
    ],
    riskLevel: "HIGH",
    riskFactors: [
      "Cost overruns",
      "Technical complexity",
      "Environmental risks"
    ],
    contractModifications: [
      {
        id: "MOD-001",
        date: new Date("2024-03-01"),
        type: "VALUE_INCREASE",
        description: "Additional equipment requirements",
        originalValue: 45000000,
        newValue: 48500000,
        approvedBy: "GNPC Board",
        justification: "Additional safety equipment required by regulator"
      }
    ],
    performanceMetrics: {
      deliveryTimeliness: 85,
      qualityScore: 90,
      costEfficiency: 75,
      supplierReliability: 88,
      complianceAdherence: 82,
      overallRating: 84,
      lastUpdated: new Date("2024-11-01")
    },
    sustainabilityMetrics: {
      environmentalImpact: 70,
      socialImpact: 75,
      economicImpact: 72,
      carbonFootprint: 85,
      localJobsCreated: 120,
      skillsTransferScore: 78,
      greenProcurement: false
    }
  },
  // February 2024 Procurements
  {
    id: "PROC-2024-003",
    entityName: "Volta River Authority",
    entityId: "SOE-003",
    procurementTitle: "Turbine Maintenance Services",
    description: "Annual maintenance and overhaul of hydro turbines at Akosombo Dam",
    category: "SERVICES",
    procurementMethod: "SOLE_SOURCING",
    estimatedValue: 8500000,
    actualValue: 8200000,
    currency: "USD",
    sourceOfFunding: "VRA Operating Revenue",
    tenderNumber: "VRA/TM/2024/001",
    tenderPublicationDate: new Date("2024-02-01"),
    tenderClosingDate: new Date("2024-02-15"),
    contractAwardDate: new Date("2024-02-20"),
    contractStartDate: new Date("2024-03-01"),
    contractEndDate: new Date("2024-05-31"),
    supplierName: "Voith Hydro Ltd",
    supplierId: "SUP-003",
    supplierCountry: "Germany",
    isLocalSupplier: false,
    isSME: false,
    supplierOwnership: "FOREIGN",
    evaluationScore: 95,
    complianceScore: 78,
    conflictFlags: ["SOLE_SOURCING_JUSTIFICATION"],
    duplicationFlags: [],
    sustainabilityScore: 82,
    localContentPercentage: 15,
    approvalStatus: "APPROVED",
    approvedBy: "VRA Board - Emergency Procurement",
    approvedDate: new Date("2024-02-18"),
    contractNumber: "VRA/CONT/2024/012",
    performanceGuarantee: 820000,
    advancePayment: 2460000,
    deliveryTerms: "DAP Akosombo",
    paymentTerms: "45 Days NET",
    specifications: [
      "Original equipment manufacturer",
      "Specialized technical expertise",
      "Spare parts included",
      "Training for local staff"
    ],
    evaluationCriteria: [
      "Technical expertise - 60%",
      "OEM certification - 25%",
      "Price - 15%"
    ],
    biddersCount: 1,
    localBiddersCount: 0,
    smeBiddersCount: 0,
    womenOwnedBiddersCount: 0,
    youthOwnedBiddersCount: 0,
    procurementPlanReference: "VRA/PP/2024/015",
    budgetLine: "BL-2024-028",
    quarter: 1,
    year: 2024,
    auditStatus: "COMPLIANT",
    auditDate: new Date("2024-06-15"),
    auditFindings: [
      "Sole sourcing properly justified",
      "OEM requirement valid",
      "Emergency procurement procedures followed"
    ],
    riskLevel: "MEDIUM",
    riskFactors: [
      "Supplier dependency",
      "Currency fluctuation",
      "Limited competition"
    ],
    contractModifications: [],
    performanceMetrics: {
      deliveryTimeliness: 98,
      qualityScore: 96,
      costEfficiency: 88,
      supplierReliability: 95,
      complianceAdherence: 78,
      overallRating: 91,
      lastUpdated: new Date("2024-06-01")
    },
    sustainabilityMetrics: {
      environmentalImpact: 88,
      socialImpact: 70,
      economicImpact: 75,
      carbonFootprint: 25,
      localJobsCreated: 15,
      skillsTransferScore: 92,
      greenProcurement: false
    }
  },
  // March 2024 Procurements
  {
    id: "PROC-2024-004",
    entityName: "Ghana Grid Company",
    entityId: "SOE-004",
    procurementTitle: "Transmission Line Construction",
    description: "Construction of 150km 330kV transmission line from Kumasi to Techiman",
    category: "WORKS",
    procurementMethod: "OPEN_TENDER",
    estimatedValue: 125000000,
    actualValue: 118000000,
    currency: "GHS",
    sourceOfFunding: "AfDB Loan",
    tenderNumber: "GRIDCO/TL/2024/001",
    tenderPublicationDate: new Date("2024-03-01"),
    tenderClosingDate: new Date("2024-03-30"),
    contractAwardDate: new Date("2024-04-15"),
    contractStartDate: new Date("2024-05-01"),
    contractEndDate: new Date("2025-04-30"),
    supplierName: "China State Construction",
    supplierId: "SUP-004",
    supplierCountry: "China",
    isLocalSupplier: false,
    isSME: false,
    supplierOwnership: "FOREIGN",
    evaluationScore: 85,
    complianceScore: 88,
    conflictFlags: [],
    duplicationFlags: [],
    sustainabilityScore: 78,
    localContentPercentage: 35,
    approvalStatus: "APPROVED",
    approvedBy: "GRIDCO Board Procurement Committee",
    approvedDate: new Date("2024-04-12"),
    contractNumber: "GRIDCO/CONT/2024/008",
    performanceGuarantee: 11800000,
    advancePayment: 35400000,
    deliveryTerms: "FCA Site",
    paymentTerms: "90 Days NET",
    specifications: [
      "330kV transmission towers",
      "Conductor cables",
      "Insulators and hardware",
      "Construction supervision"
    ],
    evaluationCriteria: [
      "Technical capability - 35%",
      "Experience - 25%",
      "Price - 20%",
      "Local content - 10%",
      "Timeline - 10%"
    ],
    biddersCount: 8,
    localBiddersCount: 3,
    smeBiddersCount: 1,
    womenOwnedBiddersCount: 0,
    youthOwnedBiddersCount: 0,
    procurementPlanReference: "GRIDCO/PP/2024/020",
    budgetLine: "BL-2024-045",
    quarter: 2,
    year: 2024,
    auditStatus: "COMPLIANT",
    auditDate: new Date("2024-05-20"),
    auditFindings: [
      "Competitive bidding process",
      "Local content requirements addressed",
      "Environmental impact assessment conducted"
    ],
    riskLevel: "MEDIUM",
    riskFactors: [
      "Project complexity",
      "Weather dependencies",
      "Right-of-way acquisition"
    ],
    contractModifications: [],
    performanceMetrics: {
      deliveryTimeliness: 82,
      qualityScore: 88,
      costEfficiency: 92,
      supplierReliability: 85,
      complianceAdherence: 88,
      overallRating: 87,
      lastUpdated: new Date("2024-11-01")
    },
    sustainabilityMetrics: {
      environmentalImpact: 72,
      socialImpact: 80,
      economicImpact: 78,
      carbonFootprint: 45,
      localJobsCreated: 250,
      skillsTransferScore: 75,
      greenProcurement: false
    }
  },
  // April 2024 Procurements
  {
    id: "PROC-2024-005",
    entityName: "Public Procurement Authority",
    entityId: "REG-001",
    procurementTitle: "Digital Procurement Platform Enhancement",
    description: "Enhancement of PPA's digital procurement platform with AI analytics",
    category: "SERVICES",
    procurementMethod: "RESTRICTED_TENDER",
    estimatedValue: 5500000,
    actualValue: 5800000,
    currency: "GHS",
    sourceOfFunding: "Government of Ghana Budget",
    tenderNumber: "PPA/DPP/2024/001",
    tenderPublicationDate: new Date("2024-04-01"),
    tenderClosingDate: new Date("2024-04-25"),
    contractAwardDate: new Date("2024-05-10"),
    contractStartDate: new Date("2024-05-15"),
    contractEndDate: new Date("2024-11-15"),
    supplierName: "TechHub Ghana Ltd",
    supplierId: "SUP-005",
    supplierCountry: "Ghana",
    isLocalSupplier: true,
    isSME: true,
    supplierOwnership: "LOCAL",
    evaluationScore: 90,
    complianceScore: 92,
    conflictFlags: [],
    duplicationFlags: [],
    sustainabilityScore: 95,
    localContentPercentage: 90,
    approvalStatus: "APPROVED",
    approvedBy: "PPA Board",
    approvedDate: new Date("2024-05-08"),
    contractNumber: "PPA/CONT/2024/003",
    performanceGuarantee: 580000,
    advancePayment: 1740000,
    deliveryTerms: "Service Delivery",
    paymentTerms: "30 Days NET",
    specifications: [
      "AI-powered analytics module",
      "Real-time monitoring dashboard",
      "Mobile application",
      "Integration with existing systems"
    ],
    evaluationCriteria: [
      "Technical solution - 40%",
      "Local capacity - 25%",
      "Price - 20%",
      "Support & maintenance - 15%"
    ],
    biddersCount: 6,
    localBiddersCount: 5,
    smeBiddersCount: 4,
    womenOwnedBiddersCount: 2,
    youthOwnedBiddersCount: 3,
    procurementPlanReference: "PPA/PP/2024/005",
    budgetLine: "BL-2024-018",
    quarter: 2,
    year: 2024,
    auditStatus: "COMPLIANT",
    auditDate: new Date("2024-08-15"),
    auditFindings: [
      "Excellent local content achievement",
      "Innovative solution",
      "Value for money demonstrated"
    ],
    riskLevel: "LOW",
    riskFactors: [
      "Integration complexity",
      "User adoption"
    ],
    contractModifications: [],
    performanceMetrics: {
      deliveryTimeliness: 95,
      qualityScore: 92,
      costEfficiency: 88,
      supplierReliability: 94,
      complianceAdherence: 92,
      overallRating: 92,
      lastUpdated: new Date("2024-11-01")
    },
    sustainabilityMetrics: {
      environmentalImpact: 95,
      socialImpact: 92,
      economicImpact: 90,
      carbonFootprint: 5,
      localJobsCreated: 25,
      skillsTransferScore: 95,
      greenProcurement: true
    }
  },
  // May 2024 Procurements
  {
    id: "PROC-2024-006",
    entityName: "Electricity Company of Ghana",
    entityId: "SOE-001",
    procurementTitle: "Distribution Transformer Supply",
    description: "Supply of 2,000 distribution transformers for network expansion",
    category: "GOODS",
    procurementMethod: "OPEN_TENDER",
    estimatedValue: 18000000,
    actualValue: 17500000,
    currency: "GHS",
    sourceOfFunding: "ECG Operating Revenue",
    tenderNumber: "ECG/DT/2024/002",
    tenderPublicationDate: new Date("2024-05-01"),
    tenderClosingDate: new Date("2024-05-30"),
    contractAwardDate: new Date("2024-06-15"),
    contractStartDate: new Date("2024-07-01"),
    contractEndDate: new Date("2024-12-31"),
    supplierName: "African Transformers Ltd",
    supplierId: "SUP-006",
    supplierCountry: "South Africa",
    isLocalSupplier: false,
    isSME: false,
    supplierOwnership: "FOREIGN",
    evaluationScore: 87,
    complianceScore: 90,
    conflictFlags: [],
    duplicationFlags: ["SIMILAR_PROCUREMENT_2023"],
    sustainabilityScore: 80,
    localContentPercentage: 25,
    approvalStatus: "APPROVED",
    approvedBy: "ECG Procurement Committee",
    approvedDate: new Date("2024-06-12"),
    contractNumber: "ECG/CONT/2024/067",
    performanceGuarantee: 1750000,
    advancePayment: 5250000,
    deliveryTerms: "FOB Destination",
    paymentTerms: "60 Days NET",
    specifications: [
      "33kV/11kV distribution transformers",
      "IEC 60076 standard",
      "3-year warranty",
      "Technical support included"
    ],
    evaluationCriteria: [
      "Technical specifications - 45%",
      "Price - 30%",
      "Delivery timeline - 15%",
      "After-sales support - 10%"
    ],
    biddersCount: 10,
    localBiddersCount: 4,
    smeBiddersCount: 2,
    womenOwnedBiddersCount: 1,
    youthOwnedBiddersCount: 1,
    procurementPlanReference: "ECG/PP/2024/025",
    budgetLine: "BL-2024-055",
    quarter: 2,
    year: 2024,
    auditStatus: "FLAGGED",
    auditDate: new Date("2024-07-20"),
    auditFindings: [
      "Similar procurement occurred in 2023",
      "Consolidation opportunity missed",
      "Local content below target"
    ],
    riskLevel: "MEDIUM",
    riskFactors: [
      "Supply chain delays",
      "Quality control challenges",
      "Currency fluctuation"
    ],
    contractModifications: [],
    performanceMetrics: {
      deliveryTimeliness: 88,
      qualityScore: 85,
      costEfficiency: 90,
      supplierReliability: 87,
      complianceAdherence: 90,
      overallRating: 88,
      lastUpdated: new Date("2024-11-01")
    },
    sustainabilityMetrics: {
      environmentalImpact: 78,
      socialImpact: 75,
      economicImpact: 80,
      carbonFootprint: 18,
      localJobsCreated: 30,
      skillsTransferScore: 70,
      greenProcurement: false
    }
  },
  // June 2024 Procurements
  {
    id: "PROC-2024-007",
    entityName: "Ghana National Petroleum Corporation",
    entityId: "SOE-002",
    procurementTitle: "Geological Survey Services",
    description: "Comprehensive geological survey for offshore block assessment",
    category: "CONSULTANCY",
    procurementMethod: "RESTRICTED_TENDER",
    estimatedValue: 12500000,
    actualValue: 13200000,
    currency: "USD",
    sourceOfFunding: "GNPC Operating Revenue",
    tenderNumber: "GNPC/GS/2024/001",
    tenderPublicationDate: new Date("2024-06-01"),
    tenderClosingDate: new Date("2024-06-25"),
    contractAwardDate: new Date("2024-07-10"),
    contractStartDate: new Date("2024-07-15"),
    contractEndDate: new Date("2024-12-15"),
    supplierName: "TGS-NOPEC Geophysical Company",
    supplierId: "SUP-007",
    supplierCountry: "Norway",
    isLocalSupplier: false,
    isSME: false,
    supplierOwnership: "FOREIGN",
    evaluationScore: 92,
    complianceScore: 85,
    conflictFlags: ["VALUE_INCREASE_5.6%"],
    duplicationFlags: [],
    sustainabilityScore: 72,
    localContentPercentage: 20,
    approvalStatus: "APPROVED",
    approvedBy: "GNPC Board",
    approvedDate: new Date("2024-07-08"),
    contractNumber: "GNPC/CONT/2024/015",
    performanceGuarantee: 1320000,
    advancePayment: 3960000,
    deliveryTerms: "Service Delivery",
    paymentTerms: "45 Days NET",
    specifications: [
      "3D seismic data acquisition",
      "Geological interpretation",
      "Reservoir modeling",
      "Technical report preparation"
    ],
    evaluationCriteria: [
      "Technical expertise - 50%",
      "Experience - 25%",
      "Data quality - 15%",
      "Price - 10%"
    ],
    biddersCount: 4,
    localBiddersCount: 0,
    smeBiddersCount: 0,
    womenOwnedBiddersCount: 0,
    youthOwnedBiddersCount: 0,
    procurementPlanReference: "GNPC/PP/2024/018",
    budgetLine: "BL-2024-032",
    quarter: 3,
    year: 2024,
    auditStatus: "FLAGGED",
    auditDate: new Date("2024-08-10"),
    auditFindings: [
      "Price increase requires justification",
      "Limited local participation",
      "Specialized services justification needed"
    ],
    riskLevel: "HIGH",
    riskFactors: [
      "Technical complexity",
      "Data interpretation challenges",
      "Cost overruns"
    ],
    contractModifications: [
      {
        id: "MOD-002",
        date: new Date("2024-07-10"),
        type: "VALUE_INCREASE",
        description: "Extended survey area",
        originalValue: 12500000,
        newValue: 13200000,
        approvedBy: "GNPC Board",
        justification: "Additional survey area required for comprehensive assessment"
      }
    ],
    performanceMetrics: {
      deliveryTimeliness: 85,
      qualityScore: 94,
      costEfficiency: 78,
      supplierReliability: 90,
      complianceAdherence: 85,
      overallRating: 86,
      lastUpdated: new Date("2024-11-01")
    },
    sustainabilityMetrics: {
      environmentalImpact: 68,
      socialImpact: 70,
      economicImpact: 72,
      carbonFootprint: 35,
      localJobsCreated: 20,
      skillsTransferScore: 80,
      greenProcurement: false
    }
  },
  // July 2024 Procurements
  {
    id: "PROC-2024-008",
    entityName: "Public Procurement Authority",
    entityId: "REG-001",
    procurementTitle: "Staff Training and Capacity Building",
    description: "Comprehensive training program for PPA staff on modern procurement practices",
    category: "SERVICES",
    procurementMethod: "DIRECT_PROCUREMENT",
    estimatedValue: 850000,
    actualValue: 820000,
    currency: "GHS",
    sourceOfFunding: "Government of Ghana Budget",
    tenderNumber: "PPA/TB/2024/001",
    tenderPublicationDate: new Date("2024-07-01"),
    tenderClosingDate: new Date("2024-07-15"),
    contractAwardDate: new Date("2024-07-20"),
    contractStartDate: new Date("2024-08-01"),
    contractEndDate: new Date("2024-12-31"),
    supplierName: "Ghana Institute of Management",
    supplierId: "SUP-008",
    supplierCountry: "Ghana",
    isLocalSupplier: true,
    isSME: true,
    supplierOwnership: "LOCAL",
    evaluationScore: 88,
    complianceScore: 90,
    conflictFlags: [],
    duplicationFlags: [],
    sustainabilityScore: 92,
    localContentPercentage: 100,
    approvalStatus: "APPROVED",
    approvedBy: "PPA Director General",
    approvedDate: new Date("2024-07-18"),
    contractNumber: "PPA/CONT/2024/008",
    performanceGuarantee: 82000,
    advancePayment: 246000,
    deliveryTerms: "Service Delivery",
    paymentTerms: "30 Days NET",
    specifications: [
      "Procurement best practices",
      "Legal framework training",
      "Digital procurement tools",
      "Certification preparation"
    ],
    evaluationCriteria: [
      "Training quality - 40%",
      "Local expertise - 30%",
      "Price - 20%",
      "Schedule - 10%"
    ],
    biddersCount: 3,
    localBiddersCount: 3,
    smeBiddersCount: 3,
    womenOwnedBiddersCount: 2,
    youthOwnedBiddersCount: 1,
    procurementPlanReference: "PPA/PP/2024/012",
    budgetLine: "BL-2024-025",
    quarter: 3,
    year: 2024,
    auditStatus: "COMPLIANT",
    auditDate: new Date("2024-09-15"),
    auditFindings: [
      "Direct procurement justified",
      "Local capacity building achieved",
      "Value for money demonstrated"
    ],
    riskLevel: "LOW",
    riskFactors: [
      "Training effectiveness measurement",
      "Staff availability"
    ],
    contractModifications: [],
    performanceMetrics: {
      deliveryTimeliness: 95,
      qualityScore: 90,
      costEfficiency: 92,
      supplierReliability: 88,
      complianceAdherence: 90,
      overallRating: 91,
      lastUpdated: new Date("2024-11-01")
    },
    sustainabilityMetrics: {
      environmentalImpact: 90,
      socialImpact: 95,
      economicImpact: 88,
      carbonFootprint: 2,
      localJobsCreated: 5,
      skillsTransferScore: 98,
      greenProcurement: true
    }
  },
  // August 2024 Procurements
  {
    id: "PROC-2024-009",
    entityName: "Volta River Authority",
    entityId: "SOE-003",
    procurementTitle: "Solar Power Plant Development",
    description: "Construction of 50MW solar power plant at Bui",
    category: "WORKS",
    procurementMethod: "TWO_STAGE_TENDER",
    estimatedValue: 65000000,
    actualValue: 68000000,
    currency: "USD",
    sourceOfFunding: "Climate Investment Funds",
    tenderNumber: "VRA/SP/2024/001",
    tenderPublicationDate: new Date("2024-08-01"),
    tenderClosingDate: new Date("2024-08-30"),
    contractAwardDate: new Date("2024-09-15"),
    contractStartDate: new Date("2024-10-01"),
    contractEndDate: new Date("2025-12-31"),
    supplierName: "Renewable Energy Systems Ltd",
    supplierId: "SUP-009",
    supplierCountry: "Ghana",
    isLocalSupplier: true,
    isSME: false,
    supplierOwnership: "JOINT_VENTURE",
    evaluationScore: 91,
    complianceScore: 88,
    conflictFlags: ["VALUE_INCREASE_4.6%"],
    duplicationFlags: [],
    sustainabilityScore: 96,
    localContentPercentage: 65,
    approvalStatus: "APPROVED",
    approvedBy: "VRA Board",
    approvedDate: new Date("2024-09-12"),
    contractNumber: "VRA/CONT/2024/025",
    performanceGuarantee: 6800000,
    advancePayment: 20400000,
    deliveryTerms: "EPC Contract",
    paymentTerms: "90 Days NET",
    specifications: [
      "50MW solar PV installation",
      "Battery storage system",
      "Grid connection infrastructure",
      "Operations & maintenance"
    ],
    evaluationCriteria: [
      "Technical solution - 35%",
      "Experience - 25%",
      "Local content - 20%",
      "Price - 15%",
      "Sustainability - 5%"
    ],
    biddersCount: 7,
    localBiddersCount: 4,
    smeBiddersCount: 2,
    womenOwnedBiddersCount: 1,
    youthOwnedBiddersCount: 2,
    procurementPlanReference: "VRA/PP/2024/035",
    budgetLine: "BL-2024-065",
    quarter: 3,
    year: 2024,
    auditStatus: "COMPLIANT",
    auditDate: new Date("2024-10-15"),
    auditFindings: [
      "Two-stage tender properly conducted",
      "Green energy project justified",
      "Local content requirements met"
    ],
    riskLevel: "MEDIUM",
    riskFactors: [
      "Technology risks",
      "Weather dependencies",
      "Grid integration challenges"
    ],
    contractModifications: [
      {
        id: "MOD-003",
        date: new Date("2024-09-15"),
        type: "VALUE_INCREASE",
        description: "Enhanced battery storage capacity",
        originalValue: 65000000,
        newValue: 68000000,
        approvedBy: "VRA Board",
        justification: "Additional battery capacity required for grid stability"
      }
    ],
    performanceMetrics: {
      deliveryTimeliness: 80,
      qualityScore: 92,
      costEfficiency: 85,
      supplierReliability: 88,
      complianceAdherence: 88,
      overallRating: 87,
      lastUpdated: new Date("2024-11-01")
    },
    sustainabilityMetrics: {
      environmentalImpact: 98,
      socialImpact: 90,
      economicImpact: 88,
      carbonFootprint: -50,
      localJobsCreated: 180,
      skillsTransferScore: 92,
      greenProcurement: true
    }
  },
  // September 2024 Procurements
  {
    id: "PROC-2024-010",
    entityName: "Ghana Grid Company",
    entityId: "SOE-004",
    procurementTitle: "SCADA System Upgrade",
    description: "Upgrade of national grid SCADA system for improved monitoring",
    category: "SERVICES",
    procurementMethod: "RESTRICTED_TENDER",
    estimatedValue: 15000000,
    actualValue: 14800000,
    currency: "GHS",
    sourceOfFunding: "World Bank Credit",
    tenderNumber: "GRIDCO/SC/2024/001",
    tenderPublicationDate: new Date("2024-09-01"),
    tenderClosingDate: new Date("2024-09-25"),
    contractAwardDate: new Date("2024-10-10"),
    contractStartDate: new Date("2024-10-15"),
    contractEndDate: new Date("2025-03-15"),
    supplierName: "Siemens Ghana Ltd",
    supplierId: "SUP-010",
    supplierCountry: "Ghana",
    isLocalSupplier: true,
    isSME: false,
    supplierOwnership: "JOINT_VENTURE",
    evaluationScore: 93,
    complianceScore: 94,
    conflictFlags: [],
    duplicationFlags: [],
    sustainabilityScore: 85,
    localContentPercentage: 55,
    approvalStatus: "APPROVED",
    approvedBy: "GRIDCO Board",
    approvedDate: new Date("2024-10-08"),
    contractNumber: "GRIDCO/CONT/2024/018",
    performanceGuarantee: 1480000,
    advancePayment: 4440000,
    deliveryTerms: "Service Delivery",
    paymentTerms: "45 Days NET",
    specifications: [
      "Advanced SCADA platform",
      "Real-time monitoring",
      "Cybersecurity features",
      "Training and support"
    ],
    evaluationCriteria: [
      "Technical capability - 45%",
      "Experience - 25%",
      "Local content - 15%",
      "Price - 15%"
    ],
    biddersCount: 5,
    localBiddersCount: 3,
    smeBiddersCount: 1,
    womenOwnedBiddersCount: 1,
    youthOwnedBiddersCount: 1,
    procurementPlanReference: "GRIDCO/PP/2024/045",
    budgetLine: "BL-2024-078",
    quarter: 4,
    year: 2024,
    auditStatus: "COMPLIANT",
    auditDate: new Date("2024-11-01"),
    auditFindings: [
      "Competitive process followed",
      "Technology upgrade justified",
      "Local capacity building achieved"
    ],
    riskLevel: "LOW",
    riskFactors: [
      "System integration complexity",
      "Cybersecurity threats"
    ],
    contractModifications: [],
    performanceMetrics: {
      deliveryTimeliness: 90,
      qualityScore: 94,
      costEfficiency: 92,
      supplierReliability: 92,
      complianceAdherence: 94,
      overallRating: 92,
      lastUpdated: new Date("2024-11-01")
    },
    sustainabilityMetrics: {
      environmentalImpact: 82,
      socialImpact: 85,
      economicImpact: 84,
      carbonFootprint: 8,
      localJobsCreated: 35,
      skillsTransferScore: 88,
      greenProcurement: false
    }
  },
  // October 2024 Procurements
  {
    id: "PROC-2024-011",
    entityName: "Public Procurement Authority",
    entityId: "REG-001",
    procurementTitle: "Audit and Compliance Software",
    description: "Implementation of automated audit and compliance monitoring system",
    category: "SERVICES",
    procurementMethod: "OPEN_TENDER",
    estimatedValue: 3200000,
    actualValue: 3100000,
    currency: "GHS",
    sourceOfFunding: "Government of Ghana Budget",
    tenderNumber: "PPA/AC/2024/001",
    tenderPublicationDate: new Date("2024-10-01"),
    tenderClosingDate: new Date("2024-10-25"),
    contractAwardDate: new Date("2024-11-05"),
    contractStartDate: new Date("2024-11-10"),
    contractEndDate: new Date("2025-05-10"),
    supplierName: "AuditTech Solutions Ghana",
    supplierId: "SUP-011",
    supplierCountry: "Ghana",
    isLocalSupplier: true,
    isSME: true,
    supplierOwnership: "LOCAL",
    evaluationScore: 89,
    complianceScore: 91,
    conflictFlags: [],
    duplicationFlags: [],
    sustainabilityScore: 94,
    localContentPercentage: 85,
    approvalStatus: "APPROVED",
    approvedBy: "PPA Board",
    approvedDate: new Date("2024-11-03"),
    contractNumber: "PPA/CONT/2024/015",
    performanceGuarantee: 310000,
    advancePayment: 930000,
    deliveryTerms: "Service Delivery",
    paymentTerms: "30 Days NET",
    specifications: [
      "Automated compliance checking",
      "Real-time audit trails",
      "Risk assessment tools",
      "Reporting dashboard"
    ],
    evaluationCriteria: [
      "Technical solution - 40%",
      "Local innovation - 25%",
      "Price - 20%",
      "Support - 15%"
    ],
    biddersCount: 8,
    localBiddersCount: 6,
    smeBiddersCount: 5,
    womenOwnedBiddersCount: 3,
    youthOwnedBiddersCount: 4,
    procurementPlanReference: "PPA/PP/2024/028",
    budgetLine: "BL-2024-045",
    quarter: 4,
    year: 2024,
    auditStatus: "COMPLIANT",
    auditDate: new Date("2024-11-15"),
    auditFindings: [
      "Innovative local solution",
      "Competitive pricing achieved",
      "High local content"
    ],
    riskLevel: "LOW",
    riskFactors: [
      "System integration",
      "User training"
    ],
    contractModifications: [],
    performanceMetrics: {
      deliveryTimeliness: 92,
      qualityScore: 88,
      costEfficiency: 94,
      supplierReliability: 90,
      complianceAdherence: 91,
      overallRating: 91,
      lastUpdated: new Date("2024-11-15")
    },
    sustainabilityMetrics: {
      environmentalImpact: 92,
      socialImpact: 90,
      economicImpact: 88,
      carbonFootprint: 3,
      localJobsCreated: 18,
      skillsTransferScore: 92,
      greenProcurement: true
    }
  },
  // November 2024 Procurements
  {
    id: "PROC-2024-012",
    entityName: "Electricity Company of Ghana",
    entityId: "SOE-001",
    procurementTitle: "Customer Service System Modernization",
    description: "Complete overhaul of customer service and billing system",
    category: "SERVICES",
    procurementMethod: "TWO_STAGE_TENDER",
    estimatedValue: 8500000,
    actualValue: 8800000,
    currency: "GHS",
    sourceOfFunding: "ECG Operating Revenue",
    tenderNumber: "ECG/CS/2024/001",
    tenderPublicationDate: new Date("2024-11-01"),
    tenderClosingDate: new Date("2024-11-25"),
    contractAwardDate: new Date("2024-12-01"),
    contractStartDate: new Date("2024-12-15"),
    contractEndDate: new Date("2025-06-15"),
    supplierName: "Digital Solutions Ghana Ltd",
    supplierId: "SUP-012",
    supplierCountry: "Ghana",
    isLocalSupplier: true,
    isSME: false,
    supplierOwnership: "LOCAL",
    evaluationScore: 90,
    complianceScore: 87,
    conflictFlags: ["VALUE_INCREASE_3.5%"],
    duplicationFlags: [],
    sustainabilityScore: 88,
    localContentPercentage: 80,
    approvalStatus: "APPROVED",
    approvedBy: "ECG Board",
    approvedDate: new Date("2024-11-28"),
    contractNumber: "ECG/CONT/2024/089",
    performanceGuarantee: 880000,
    advancePayment: 2640000,
    deliveryTerms: "Service Delivery",
    paymentTerms: "45 Days NET",
    specifications: [
      "Integrated billing system",
      "Mobile payment integration",
      "Customer relationship management",
      "Analytics and reporting"
    ],
    evaluationCriteria: [
      "Technical capability - 40%",
      "Local content - 25%",
      "Experience - 20%",
      "Price - 15%"
    ],
    biddersCount: 6,
    localBiddersCount: 4,
    smeBiddersCount: 2,
    womenOwnedBiddersCount: 2,
    youthOwnedBiddersCount: 2,
    procurementPlanReference: "ECG/PP/2024/045",
    budgetLine: "BL-2024-095",
    quarter: 4,
    year: 2024,
    auditStatus: "PENDING_AUDIT",
    auditFindings: [
      "Audit scheduled for January 2025"
    ],
    riskLevel: "MEDIUM",
    riskFactors: [
      "System integration complexity",
      "Data migration challenges",
      "User adoption"
    ],
    contractModifications: [
      {
        id: "MOD-004",
        date: new Date("2024-12-01"),
        type: "VALUE_INCREASE",
        description: "Enhanced security features",
        originalValue: 8500000,
        newValue: 8800000,
        approvedBy: "ECG Board",
        justification: "Additional cybersecurity measures required"
      }
    ],
    performanceMetrics: {
      deliveryTimeliness: 85,
      qualityScore: 88,
      costEfficiency: 87,
      supplierReliability: 90,
      complianceAdherence: 87,
      overallRating: 87,
      lastUpdated: new Date("2024-12-01")
    },
    sustainabilityMetrics: {
      environmentalImpact: 85,
      socialImpact: 88,
      economicImpact: 86,
      carbonFootprint: 5,
      localJobsCreated: 32,
      skillsTransferScore: 90,
      greenProcurement: false
    }
  }
];

// Compliance issues detected across all procurements
export const COMPLIANCE_ISSUES: ComplianceIssue[] = [
  {
    id: "CI-001",
    type: "BUDGET_EXCEEDED",
    severity: "MEDIUM",
    description: "Contract value exceeded estimated budget by 7.8% without proper justification",
    affectedProcurement: "PROC-2024-002",
    detectedDate: new Date("2024-04-10"),
    status: "UNDER_INVESTIGATION",
    financialImpact: 3500000,
    recommendedAction: "Require detailed justification and board approval for price increase"
  },
  {
    id: "CI-002",
    type: "DUPLICATE_PROCUREMENT",
    severity: "LOW",
    description: "Similar transformer procurement conducted in consecutive years without consolidation",
    affectedProcurement: "PROC-2024-006",
    detectedDate: new Date("2024-07-20"),
    status: "RESOLVED",
    resolution: "Future procurements will be consolidated for better pricing",
    financialImpact: 0,
    recommendedAction: "Implement procurement consolidation strategy"
  },
  {
    id: "CI-003",
    type: "PROCUREMENT_VIOLATION",
    severity: "MEDIUM",
    description: "Direct procurement used without proper justification",
    affectedProcurement: "PROC-2024-008",
    detectedDate: new Date("2024-09-15"),
    status: "CLOSED",
    resolution: "Justification provided and approved by oversight committee",
    financialImpact: 0,
    recommendedAction: "Strengthen direct procurement approval process"
  }
];

// Conflict detection results
export const CONFLICT_DETECTIONS: ConflictDetection[] = [
  {
    id: "CD-001",
    type: "SUPPLIER_RELATIONSHIP",
    description: "Multiple contracts awarded to same supplier group within short timeframe",
    entities: ["Electricity Company of Ghana", "Ghana Grid Company"],
    individuals: ["TechHub Ghana Ltd", "Digital Solutions Ghana Ltd"],
    riskLevel: "LOW",
    detectedDate: new Date("2024-11-01"),
    investigationRequired: false,
    investigationStatus: "COMPLETED"
  },
  {
    id: "CD-002",
    type: "BOARD_MEMBER_CONFLICT",
    description: "Board member has indirect interest in supplier company",
    entities: ["Ghana National Petroleum Corporation"],
    individuals: ["Board Member Name", "Supplier Director"],
    riskLevel: "MEDIUM",
    detectedDate: new Date("2024-10-15"),
    investigationRequired: true,
    investigationStatus: "IN_PROGRESS"
  }
];

// PPA-specific analysis data
export const PPA_ANALYTICS = {
<<<<<<< HEAD
  totalProcurements: 142,
  totalValue: 3850000000,
  averageValue: 27112676,
  complianceRate: 87.2,
  localContentAverage: 62.8,
  smeParticipationRate: 45.3,
  womenOwnedParticipation: 28.5,
  youthOwnedParticipation: 19.2,
  riskDistribution: {
    LOW: 58,
    MEDIUM: 62,
    HIGH: 18,
    CRITICAL: 4
  },
  categoryDistribution: {
    GOODS: 35,
    SERVICES: 58,
    WORKS: 28,
    CONSULTANCY: 21
  },
  methodDistribution: {
    OPEN_TENDER: 68,
    RESTRICTED_TENDER: 42,
    DIRECT_PROCUREMENT: 15,
    SOLE_SOURCING: 8,
    TWO_STAGE_TENDER: 9
  },
  monthlyTrends: [
    { month: "Jan", count: 12, value: 285000000 },
    { month: "Feb", count: 15, value: 342000000 },
    { month: "Mar", count: 18, value: 398000000 },
    { month: "Apr", count: 14, value: 376000000 },
    { month: "May", count: 16, value: 412000000 },
    { month: "Jun", count: 13, value: 365000000 },
    { month: "Jul", count: 15, value: 389000000 },
    { month: "Aug", count: 17, value: 423000000 },
    { month: "Sep", count: 11, value: 298000000 },
    { month: "Oct", count: 11, value: 262000000 }
  ],
  topSuppliers: [
    { name: "Ghana Infrastructure Development Co", contracts: 8, totalValue: 285000000, complianceScore: 92.5, riskLevel: "LOW" },
    { name: "West Africa Construction Ltd", contracts: 6, totalValue: 198000000, complianceScore: 88.3, riskLevel: "LOW" },
    { name: "MediSupply Ghana Ltd", contracts: 12, totalValue: 156000000, complianceScore: 85.7, riskLevel: "MEDIUM" },
    { name: "TechHub Solutions Ghana", contracts: 15, totalValue: 142000000, complianceScore: 90.2, riskLevel: "LOW" },
    { name: "Energy Systems International", contracts: 4, totalValue: 128000000, complianceScore: 87.8, riskLevel: "MEDIUM" },
    { name: "Agricultural Equipment Suppliers", contracts: 9, totalValue: 98000000, complianceScore: 83.4, riskLevel: "MEDIUM" },
    { name: "Educational Resources Ltd", contracts: 11, totalValue: 76000000, complianceScore: 89.1, riskLevel: "LOW" },
    { name: "Transportation Services Ghana", contracts: 7, totalValue: 68000000, complianceScore: 86.5, riskLevel: "MEDIUM" }
=======
  totalProcurements: 12,
  totalValue: 425300000,
  averageValue: 35441667,
  complianceRate: 85.5,
  localContentAverage: 58.3,
  smeParticipationRate: 41.7,
  womenOwnedParticipation: 25.0,
  youthOwnedParticipation: 16.7,
  riskDistribution: {
    LOW: 5,
    MEDIUM: 5,
    HIGH: 2,
    CRITICAL: 0
  },
  categoryDistribution: {
    GOODS: 2,
    SERVICES: 6,
    WORKS: 2,
    CONSULTANCY: 2
  },
  methodDistribution: {
    OPEN_TENDER: 4,
    RESTRICTED_TENDER: 4,
    DIRECT_PROCUREMENT: 1,
    SOLE_SOURCING: 1,
    TWO_STAGE_TENDER: 2
  },
  monthlyTrends: [
    { month: "Jan", count: 1, value: 24500000 },
    { month: "Feb", count: 1, value: 48500000 },
    { month: "Mar", count: 1, value: 8200000 },
    { month: "Apr", count: 1, value: 118000000 },
    { month: "May", count: 1, value: 17500000 },
    { month: "Jun", count: 1, value: 13200000 },
    { month: "Jul", count: 1, value: 820000 },
    { month: "Aug", count: 1, value: 68000000 },
    { month: "Sep", count: 1, value: 14800000 },
    { month: "Oct", count: 1, value: 3100000 },
    { month: "Nov", count: 1, value: 8800000 }
  ],
  topSuppliers: [
    { name: "TechHub Ghana Ltd", contracts: 1, value: 5800000 },
    { name: "African Transformers Ltd", contracts: 1, value: 17500000 },
    { name: "China State Construction", contracts: 1, value: 118000000 },
    { name: "Renewable Energy Systems Ltd", contracts: 1, value: 68000000 },
    { name: "Siemens Ghana Ltd", contracts: 1, value: 14800000 }
>>>>>>> 952c16ea3623257febc847259d233181aaff0ada
  ],
  sustainabilityMetrics: {
    averageScore: 85.8,
    greenProcurementPercentage: 41.7,
    averageCarbonFootprint: 18.2,
    totalLocalJobsCreated: 845,
    averageSkillsTransfer: 85.8
  }
};