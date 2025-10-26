// Agent System Types and Constants - Shared between client and server

export interface AgentTask {
  id: string;
  name: string;
  description: string;
  category: string;
  estimatedDuration: number; // in seconds
  successRate: number; // percentage
  contribution: string;
  dataImpact: string[];
}

export interface AgentExecution {
  id: string;
  agentType: string;
  task: AgentTask;
  targetEntity?: string;
  startTime: Date;
  endTime?: Date;
  status: 'RUNNING' | 'SUCCESS' | 'FAILED' | 'ERROR';
  result?: any;
  metrics?: {
    recordsProcessed: number;
    dataGenerated: any[];
    insightsGenerated: string[];
    errors: string[];
  };
}

export interface AgentContribution {
  agentType: string;
  totalExecutions: number;
  successRate: number;
  averageDuration: number;
  totalRecordsProcessed: number;
  insightsGenerated: number;
  dataQualityImprovements: number;
  riskIdentifications: number;
  complianceIssuesFound: number;
  lastContribution: Date;
  keyAchievements: string[];
}

// Real Agent Tasks with Actual Contributions
export const AGENT_TASKS: Record<string, AgentTask[]> = {
  INGESTION: [
    {
      id: 'scrape-siga-website',
      name: 'Scrape SIGA Website',
      description: 'Extract entity data from SIGA official website',
      category: 'Data Collection',
      estimatedDuration: 120,
      successRate: 95,
      contribution: 'Automated entity data collection from official sources',
      dataImpact: ['entities', 'contact_info', 'status_updates'],
    },
    {
      id: 'normalize-entity-data',
      name: 'Normalize Entity Data',
      description: 'Standardize entity data formats and structures',
      category: 'Data Processing',
      estimatedDuration: 60,
      successRate: 98,
      contribution: 'Ensures data consistency across all entities',
      dataImpact: ['data_quality', 'standardization', 'validation'],
    },
    {
      id: 'validate-data-completeness',
      name: 'Validate Data Completeness',
      description: 'Check for missing or incomplete entity information',
      category: 'Data Quality',
      estimatedDuration: 45,
      successRate: 92,
      contribution: 'Identifies data gaps and quality issues',
      dataImpact: ['data_quality', 'completeness_reports', 'action_items'],
    },
    {
      id: 'update-entity-registry',
      name: 'Update Entity Registry',
      description: 'Update central entity registry with new information',
      category: 'Data Management',
      estimatedDuration: 30,
      successRate: 99,
      contribution: 'Maintains up-to-date entity information',
      dataImpact: ['entity_registry', 'change_logs', 'audit_trail'],
    },
  ],
  DATA_ARCHITECT: [
    {
      id: 'optimize-database-schema',
      name: 'Optimize Database Schema',
      description: 'Analyze and improve database performance',
      category: 'Database Optimization',
      estimatedDuration: 90,
      successRate: 88,
      contribution: 'Improves system performance and query speed',
      dataImpact: ['database_performance', 'query_optimization', 'indexing'],
    },
    {
      id: 'design-new-data-models',
      name: 'Design New Data Models',
      description: 'Create data models for new requirements',
      category: 'Data Modeling',
      estimatedDuration: 120,
      successRate: 85,
      contribution: 'Enables new features and capabilities',
      dataImpact: ['data_models', 'schema_evolution', 'feature_enablement'],
    },
    {
      id: 'create-data-migration-scripts',
      name: 'Create Data Migration Scripts',
      description: 'Develop scripts for data structure changes',
      category: 'Data Migration',
      estimatedDuration: 150,
      successRate: 82,
      contribution: 'Ensures smooth data transitions',
      dataImpact: ['migration_scripts', 'data_integrity', 'rollback_plans'],
    },
    {
      id: 'validate-data-integrity',
      name: 'Validate Data Integrity',
      description: 'Check data consistency and relationships',
      category: 'Data Quality',
      estimatedDuration: 60,
      successRate: 94,
      contribution: 'Maintains data quality and consistency',
      dataImpact: ['data_integrity', 'relationship_validation', 'quality_reports'],
    },
  ],
  DSL_BUILDER: [
    {
      id: 'parse-legal-acts',
      name: 'Parse Legal Acts',
      description: 'Convert legal texts into DSL rules',
      category: 'Legal Processing',
      estimatedDuration: 180,
      successRate: 78,
      contribution: 'Transforms legal requirements into executable rules',
      dataImpact: ['dsl_rules', 'compliance_automation', 'legal_mapping'],
    },
    {
      id: 'generate-compliance-bundles',
      name: 'Generate Compliance Bundles',
      description: 'Create comprehensive compliance packages',
      category: 'Compliance Management',
      estimatedDuration: 120,
      successRate: 85,
      contribution: 'Automates compliance requirement generation',
      dataImpact: ['compliance_bundles', 'requirement_tracking', 'automation'],
    },
    {
      id: 'update-rule-engine',
      name: 'Update Rule Engine',
      description: 'Deploy new DSL rules to the system',
      category: 'Rule Management',
      estimatedDuration: 60,
      successRate: 92,
      contribution: 'Keeps compliance rules current',
      dataImpact: ['rule_engine', 'compliance_logic', 'real_time_checks'],
    },
    {
      id: 'validate-dsl-syntax',
      name: 'Validate DSL Syntax',
      description: 'Check DSL rules for syntax and logic errors',
      category: 'Quality Assurance',
      estimatedDuration: 45,
      successRate: 96,
      contribution: 'Ensures rule quality and reliability',
      dataImpact: ['dsl_validation', 'error_detection', 'quality_metrics'],
    },
  ],
  GOVERNANCE: [
    {
      id: 'populate-governance-data',
      name: 'Populate Governance Data',
      description: 'Fill entity governance information',
      category: 'Data Population',
      estimatedDuration: 90,
      successRate: 87,
      contribution: 'Completes governance profiles for all entities',
      dataImpact: ['governance_data', 'board_composition', 'policies'],
    },
    {
      id: 'assign-compliance-checklists',
      name: 'Assign Compliance Checklists',
      description: 'Generate entity-specific compliance requirements',
      category: 'Compliance Management',
      estimatedDuration: 60,
      successRate: 91,
      contribution: 'Creates tailored compliance requirements',
      dataImpact: ['compliance_checklists', 'entity_requirements', 'automation'],
    },
    {
      id: 'generate-board-reports',
      name: 'Generate Board Reports',
      description: 'Create comprehensive board governance reports',
      category: 'Reporting',
      estimatedDuration: 75,
      successRate: 89,
      contribution: 'Provides insights into board effectiveness',
      dataImpact: ['board_reports', 'governance_metrics', 'recommendations'],
    },
    {
      id: 'monitor-governance-changes',
      name: 'Monitor Governance Changes',
      description: 'Track and analyze governance modifications',
      category: 'Change Management',
      estimatedDuration: 45,
      successRate: 93,
      contribution: 'Identifies governance trends and issues',
      dataImpact: ['change_tracking', 'trend_analysis', 'issue_identification'],
    },
  ],
  RISK_ANALYST: [
    {
      id: 'calculate-risk-scores',
      name: 'Calculate Risk Scores',
      description: 'Compute comprehensive risk assessments',
      category: 'Risk Assessment',
      estimatedDuration: 120,
      successRate: 91,
      contribution: 'Provides quantitative risk measurements',
      dataImpact: ['risk_scores', 'risk_factors', 'assessment_reports'],
    },
    {
      id: 'identify-risk-anomalies',
      name: 'Identify Risk Anomalies',
      description: 'Detect unusual patterns and risk indicators',
      category: 'Anomaly Detection',
      estimatedDuration: 90,
      successRate: 84,
      contribution: 'Early warning system for emerging risks',
      dataImpact: ['anomaly_detection', 'early_warnings', 'risk_alerts'],
    },
    {
      id: 'generate-risk-reports',
      name: 'Generate Risk Reports',
      description: 'Create detailed risk analysis reports',
      category: 'Reporting',
      estimatedDuration: 75,
      successRate: 88,
      contribution: 'Comprehensive risk documentation',
      dataImpact: ['risk_reports', 'trend_analysis', 'mitigation_strategies'],
    },
    {
      id: 'update-risk-models',
      name: 'Update Risk Models',
      description: 'Refine risk calculation algorithms',
      category: 'Model Improvement',
      estimatedDuration: 150,
      successRate: 79,
      contribution: 'Improves risk prediction accuracy',
      dataImpact: ['risk_models', 'algorithm_updates', 'accuracy_metrics'],
    },
  ],
  PORTFOLIO: [
    {
      id: 'aggregate-portfolio-metrics',
      name: 'Aggregate Portfolio Metrics',
      description: 'Calculate portfolio-wide performance indicators',
      category: 'Portfolio Analysis',
      estimatedDuration: 60,
      successRate: 94,
      contribution: 'Provides holistic portfolio view',
      dataImpact: ['portfolio_metrics', 'performance_indicators', 'trends'],
    },
    {
      id: 'generate-sector-comparisons',
      name: 'Generate Sector Comparisons',
      description: 'Compare performance across sectors',
      category: 'Comparative Analysis',
      estimatedDuration: 90,
      successRate: 87,
      contribution: 'Enables sector-based insights',
      dataImpact: ['sector_analysis', 'benchmarking', 'performance_comparison'],
    },
    {
      id: 'create-optimization-recommendations',
      name: 'Create Optimization Recommendations',
      description: 'Generate portfolio improvement suggestions',
      category: 'Optimization',
      estimatedDuration: 120,
      successRate: 76,
      contribution: 'Strategic portfolio improvement guidance',
      dataImpact: ['optimization_recommendations', 'strategic_planning', 'improvement_areas'],
    },
    {
      id: 'update-portfolio-dashboards',
      name: 'Update Portfolio Dashboards',
      description: 'Refresh portfolio visualization data',
      category: 'Data Visualization',
      estimatedDuration: 30,
      successRate: 98,
      contribution: 'Maintains current portfolio insights',
      dataImpact: ['dashboard_data', 'visualizations', 'real_time_updates'],
    },
  ],
  TRANSPARENCY: [
    {
      id: 'generate-public-apis',
      name: 'Generate Public APIs',
      description: 'Create open data access endpoints',
      category: 'API Development',
      estimatedDuration: 150,
      successRate: 83,
      contribution: 'Enables public access to oversight data',
      dataImpact: ['public_apis', 'open_data', 'transparency_enhancement'],
    },
    {
      id: 'create-data-visualizations',
      name: 'Create Data Visualizations',
      description: 'Develop public-facing data visualizations',
      category: 'Data Visualization',
      estimatedDuration: 120,
      successRate: 85,
      contribution: 'Makes complex data accessible to public',
      dataImpact: ['visualizations', 'public_dashboards', 'data_stories'],
    },
    {
      id: 'update-transparency-portal',
      name: 'Update Transparency Portal',
      description: 'Refresh public portal content and data',
      category: 'Portal Management',
      estimatedDuration: 45,
      successRate: 92,
      contribution: 'Keeps public information current',
      dataImpact: ['portal_content', 'data_updates', 'user_experience'],
    },
    {
      id: 'validate-data-accessibility',
      name: 'Validate Data Accessibility',
      description: 'Ensure data meets accessibility standards',
      category: 'Accessibility',
      estimatedDuration: 60,
      successRate: 89,
      contribution: 'Ensures inclusive data access',
      dataImpact: ['accessibility_compliance', 'usability', 'inclusivity'],
    },
  ],
  TRAINING: [
    {
      id: 'create-training-modules',
      name: 'Create Training Modules',
      description: 'Develop governance training content',
      category: 'Content Development',
      estimatedDuration: 180,
      successRate: 81,
      contribution: 'Builds governance capacity',
      dataImpact: ['training_content', 'learning_materials', 'curriculum'],
    },
    {
      id: 'generate-certification-quizzes',
      name: 'Generate Certification Quizzes',
      description: 'Create assessment tools for certification',
      category: 'Assessment',
      estimatedDuration: 90,
      successRate: 86,
      contribution: 'Validates governance knowledge',
      dataImpact: ['assessments', 'certification_tools', 'knowledge_validation'],
    },
    {
      id: 'track-training-completion',
      name: 'Track Training Completion',
      description: 'Monitor and report on training progress',
      category: 'Progress Tracking',
      estimatedDuration: 30,
      successRate: 95,
      contribution: 'Ensures training program effectiveness',
      dataImpact: ['training_metrics', 'completion_rates', 'effectiveness_reports'],
    },
    {
      id: 'update-training-content',
      name: 'Update Training Content',
      description: 'Refresh and improve training materials',
      category: 'Content Management',
      estimatedDuration: 120,
      successRate: 84,
      contribution: 'Keeps training current and relevant',
      dataImpact: ['content_updates', 'relevance_maintenance', 'continuous_improvement'],
    },
  ],
  AUDIT: [
    {
      id: 'parse-audit-reports',
      name: 'Parse Audit Reports',
      description: 'Extract insights from audit documents',
      category: 'Document Processing',
      estimatedDuration: 150,
      successRate: 77,
      contribution: 'Automates audit report analysis',
      dataImpact: ['audit_findings', 'insight_extraction', 'automation'],
    },
    {
      id: 'generate-findings-summaries',
      name: 'Generate Findings Summaries',
      description: 'Create concise audit finding summaries',
      category: 'Analysis',
      estimatedDuration: 90,
      successRate: 85,
      contribution: 'Makes audit findings actionable',
      dataImpact: ['finding_summaries', 'action_items', 'recommendations'],
    },
    {
      id: 'track-recommendations',
      name: 'Track Recommendations',
      description: 'Monitor implementation of audit recommendations',
      category: 'Implementation Tracking',
      estimatedDuration: 60,
      successRate: 88,
      contribution: 'Ensures audit follow-through',
      dataImpact: ['recommendation_tracking', 'implementation_status', 'accountability'],
    },
    {
      id: 'monitor-audit-compliance',
      name: 'Monitor Audit Compliance',
      description: 'Track compliance with audit requirements',
      category: 'Compliance Monitoring',
      estimatedDuration: 45,
      successRate: 91,
      contribution: 'Maintains audit compliance standards',
      dataImpact: ['compliance_monitoring', 'standards_adherence', 'continuous_monitoring'],
    },
  ],
  COORDINATOR: [
    {
      id: 'schedule-agent-tasks',
      name: 'Schedule Agent Tasks',
      description: 'Coordinate and schedule agent activities',
      category: 'Task Management',
      estimatedDuration: 30,
      successRate: 96,
      contribution: 'Optimizes agent workflow efficiency',
      dataImpact: ['task_schedules', 'workflow_optimization', 'efficiency_metrics'],
    },
    {
      id: 'monitor-agent-performance',
      name: 'Monitor Agent Performance',
      description: 'Track and analyze agent effectiveness',
      category: 'Performance Monitoring',
      estimatedDuration: 45,
      successRate: 94,
      contribution: 'Ensures agent system health',
      dataImpact: ['performance_metrics', 'health_monitoring', 'optimization_opportunities'],
    },
    {
      id: 'handle-inter-agent-communication',
      name: 'Handle Inter-Agent Communication',
      description: 'Manage data flow between agents',
      category: 'Communication Management',
      estimatedDuration: 60,
      successRate: 92,
      contribution: 'Coordinates agent collaboration',
      dataImpact: ['communication_logs', 'data_flow', 'collaboration_metrics'],
    },
    {
      id: 'optimize-system-resources',
      name: 'Optimize System Resources',
      description: 'Balance system load and resource allocation',
      category: 'Resource Management',
      estimatedDuration: 90,
      successRate: 87,
      contribution: 'Maximizes system efficiency',
      dataImpact: ['resource_optimization', 'load_balancing', 'performance_tuning'],
    },
  ],
};

// Agent metadata for UI
export const AGENT_METADATA = {
  INGESTION: {
    name: 'Data Ingestion Agent',
    description: 'Automates data collection and processing',
    icon: '📥',
    color: 'blue',
  },
  DATA_ARCHITECT: {
    name: 'Data Architect Agent',
    description: 'Designs and optimizes data structures',
    icon: '🏗️',
    color: 'purple',
  },
  DSL_BUILDER: {
    name: 'DSL Builder Agent',
    description: 'Converts legal requirements into executable rules',
    icon: '⚖️',
    color: 'green',
  },
  GOVERNANCE: {
    name: 'Governance Agent',
    description: 'Monitors governance compliance and structures',
    icon: '🏛️',
    color: 'orange',
  },
  RISK_ANALYST: {
    name: 'Risk Analyst Agent',
    description: 'Identifies and assesses enterprise risks',
    icon: '⚠️',
    color: 'red',
  },
  PORTFOLIO: {
    name: 'Portfolio Agent',
    description: 'Analyzes portfolio performance and optimization',
    icon: '📊',
    color: 'cyan',
  },
  TRANSPARENCY: {
    name: 'Transparency Agent',
    description: 'Manages public data access and transparency',
    icon: '🔍',
    color: 'indigo',
  },
  TRAINING: {
    name: 'Training Agent',
    description: 'Develops and manages governance training',
    icon: '🎓',
    color: 'pink',
  },
  AUDIT: {
    name: 'Audit Agent',
    description: 'Processes audit reports and tracks compliance',
    icon: '🔎',
    color: 'yellow',
  },
  COORDINATOR: {
    name: 'Coordinator Agent',
    description: 'Orchestrates agent system operations',
    icon: '🎯',
    color: 'gray',
  },
};