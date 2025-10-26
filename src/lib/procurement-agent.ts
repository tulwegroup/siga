// AI Agent for Procurement Compliance and Conflict Detection
// Advanced monitoring and analysis system for PPA oversight

import { ProcurementRecord, ComplianceIssue, ConflictDetection } from '@/data/comprehensive-procurement-data';
import ZAI from 'z-ai-web-dev-sdk';

export interface AgentAnalysis {
  id: string;
  timestamp: Date;
  analysisType: 'COMPLIANCE_CHECK' | 'CONFLICT_DETECTION' | 'DUPLICATE_ANALYSIS' | 'RISK_ASSESSMENT';
  scope: string;
  findings: AgentFinding[];
  recommendations: AgentRecommendation[];
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  confidence: number;
  processedRecords: number;
  issuesIdentified: number;
}

export interface AgentFinding {
  id: string;
  type: 'COMPLIANCE_VIOLATION' | 'CONFLICT_OF_INTEREST' | 'DUPLICATE_PROCUREMENT' | 'BUDGET_ANOMALY' | 'TIMELINE_VIOLATION' | 'LOCAL_CONTENT_SHORTFALL';
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  title: string;
  description: string;
  affectedProcurements: string[];
  entities: string[];
  individuals: string[];
  financialImpact: number;
  regulatoryBreach: string[];
  evidence: string[];
  detectedDate: Date;
  confidence: number;
}

export interface AgentRecommendation {
  id: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  category: 'IMMEDIATE_ACTION' | 'INVESTIGATION' | 'POLICY_CHANGE' | 'SYSTEM_IMPROVEMENT';
  title: string;
  description: string;
  actionSteps: string[];
  responsibleParty: string;
  timeline: string;
  expectedOutcome: string;
  relatedFindings: string[];
}

export interface ProcurementPattern {
  pattern: string;
  frequency: number;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  description: string;
  examples: string[];
  mitigation: string;
}

export interface SupplierRiskProfile {
  supplierId: string;
  supplierName: string;
  riskScore: number;
  riskFactors: string[];
  contractHistory: {
    totalContracts: number;
    totalValue: number;
    complianceIssues: number;
    performanceScore: number;
  };
  redFlags: string[];
  recommendations: string[];
}

export class ProcurementComplianceAgent {
  private zai: any;
  private isActive: boolean = false;
  private analysisHistory: AgentAnalysis[] = [];
  private supplierRiskProfiles: Map<string, SupplierRiskProfile> = new Map();

  constructor() {
    this.initializeAgent();
  }

  private async initializeAgent() {
    try {
      this.zai = await ZAI.create();
      this.isActive = true;
      console.log('Procurement Compliance Agent initialized successfully');
    } catch (error) {
      console.error('Failed to initialize Procurement Compliance Agent:', error);
      this.isActive = false;
    }
  }

  // Main analysis orchestrator
  async analyzeProcurementData(procurements: ProcurementRecord[]): Promise<AgentAnalysis> {
    if (!this.isActive) {
      throw new Error('Agent not initialized');
    }

    const analysisId = `ANALYSIS-${Date.now()}`;
    const startTime = new Date();

    console.log(`Starting comprehensive procurement analysis for ${procurements.length} records`);

    try {
      // Run multiple analysis types
      const complianceFindings = await this.checkCompliance(procurements);
      const conflictFindings = await this.detectConflicts(procurements);
      const duplicateFindings = await this.analyzeDuplicates(procurements);
      const riskFindings = await this.assessRisks(procurements);

      // Consolidate findings
      const allFindings = [
        ...complianceFindings,
        ...conflictFindings,
        ...duplicateFindings,
        ...riskFindings
      ];

      // Generate recommendations
      const recommendations = await this.generateRecommendations(allFindings, procurements);

      // Calculate overall risk level
      const riskLevel = this.calculateOverallRiskLevel(allFindings);

      // Create analysis report
      const analysis: AgentAnalysis = {
        id: analysisId,
        timestamp: startTime,
        analysisType: 'COMPLIANCE_CHECK',
        scope: 'FULL_PROCUREMENT_DATASET',
        findings: allFindings,
        recommendations,
        riskLevel,
        confidence: this.calculateConfidence(allFindings),
        processedRecords: procurements.length,
        issuesIdentified: allFindings.length
      };

      // Store analysis
      this.analysisHistory.push(analysis);

      // Update supplier risk profiles
      await this.updateSupplierRiskProfiles(procurements, allFindings);

      console.log(`Analysis completed: ${allFindings.length} findings, ${recommendations.length} recommendations`);
      return analysis;

    } catch (error) {
      console.error('Analysis failed:', error);
      throw error;
    }
  }

  // Compliance checking
  private async checkCompliance(procurements: ProcurementRecord[]): Promise<AgentFinding[]> {
    const findings: AgentFinding[] = [];

    for (const procurement of procurements) {
      // Check budget compliance
      if (procurement.actualValue > procurement.estimatedValue * 1.1) {
        findings.push({
          id: `COMP-${Date.now()}-${Math.random()}`,
          type: 'BUDGET_ANOMALY',
          severity: this.calculateSeverity(procurement.actualValue / procurement.estimatedValue),
          title: 'Budget Exceeded',
          description: `Contract value exceeded estimate by ${((procurement.actualValue / procurement.estimatedValue - 1) * 100).toFixed(1)}%`,
          affectedProcurements: [procurement.id],
          entities: [procurement.entityName],
          individuals: [procurement.approvedBy],
          financialImpact: procurement.actualValue - procurement.estimatedValue,
          regulatoryBreach: ['Public Procurement Act 2003, Section 42'],
          evidence: [`Original estimate: ${procurement.estimatedValue}`, `Final value: ${procurement.actualValue}`],
          detectedDate: new Date(),
          confidence: 0.95
        });
      }

      // Check local content requirements
      if (procurement.localContentPercentage < 40 && procurement.category !== 'CONSULTANCY') {
        findings.push({
          id: `LC-${Date.now()}-${Math.random()}`,
          type: 'LOCAL_CONTENT_SHORTFALL',
          severity: 'MEDIUM',
          title: 'Local Content Requirement Not Met',
          description: `Local content of ${procurement.localContentPercentage}% is below the 40% threshold`,
          affectedProcurements: [procurement.id],
          entities: [procurement.entityName],
          individuals: [procurement.approvedBy],
          financialImpact: 0,
          regulatoryBreach: ['Local Content Policy, 2020'],
          evidence: [`Local content achieved: ${procurement.localContentPercentage}%`],
          detectedDate: new Date(),
          confidence: 0.90
        });
      }

      // Check procurement method compliance
      if (procurement.procurementMethod === 'DIRECT_PROCUREMENT' && procurement.estimatedValue > 50000) {
        findings.push({
          id: `PM-${Date.now()}-${Math.random()}`,
          type: 'COMPLIANCE_VIOLATION',
          severity: 'HIGH',
          title: 'Inappropriate Procurement Method',
          description: 'Direct procurement used for high-value contract without proper justification',
          affectedProcurements: [procurement.id],
          entities: [procurement.entityName],
          individuals: [procurement.approvedBy],
          financialImpact: procurement.actualValue,
          regulatoryBreach: ['Public Procurement Act 2003, Section 33'],
          evidence: [`Method: ${procurement.procurementMethod}`, `Value: ${procurement.actualValue}`],
          detectedDate: new Date(),
          confidence: 0.88
        });
      }

      // Check timeline compliance
      const awardTimeline = procurement.contractAwardDate.getTime() - procurement.tenderClosingDate.getTime();
      const daysToAward = awardTimeline / (1000 * 60 * 60 * 24);
      
      if (daysToAward > 90) {
        findings.push({
          id: `TL-${Date.now()}-${Math.random()}`,
          type: 'TIMELINE_VIOLATION',
          severity: 'MEDIUM',
          title: 'Delayed Contract Award',
          description: `Contract awarded ${daysToAward.toFixed(0)} days after tender closing, exceeding 90-day limit`,
          affectedProcurements: [procurement.id],
          entities: [procurement.entityName],
          individuals: [procurement.approvedBy],
          financialImpact: 0,
          regulatoryBreach: ['Public Procurement Act 2003, Section 40'],
          evidence: [`Days to award: ${daysToAward.toFixed(0)}`],
          detectedDate: new Date(),
          confidence: 0.92
        });
      }
    }

    return findings;
  }

  // Conflict detection
  private async detectConflicts(procurements: ProcurementRecord[]): Promise<AgentFinding[]> {
    const findings: AgentFinding[] = [];
    
    // Group by supplier
    const supplierGroups = new Map<string, ProcurementRecord[]>();
    procurements.forEach(p => {
      if (!supplierGroups.has(p.supplierName)) {
        supplierGroups.set(p.supplierName, []);
      }
      supplierGroups.get(p.supplierName)!.push(p);
    });

    // Check for supplier concentration
    for (const [supplier, contracts] of supplierGroups) {
      if (contracts.length > 3) {
        findings.push({
          id: `SC-${Date.now()}-${Math.random()}`,
          type: 'CONFLICT_OF_INTEREST',
          severity: 'MEDIUM',
          title: 'Supplier Concentration Risk',
          description: `Supplier ${supplier} awarded ${contracts.length} contracts, potential dependency risk`,
          affectedProcurements: contracts.map(c => c.id),
          entities: [...new Set(contracts.map(c => c.entityName))],
          individuals: [...new Set(contracts.map(c => c.approvedBy))],
          financialImpact: contracts.reduce((sum, c) => sum + c.actualValue, 0),
          regulatoryBreach: ['Public Procurement Act 2003, Section 64'],
          evidence: [`Contract count: ${contracts.length}`, `Total value: ${contracts.reduce((sum, c) => sum + c.actualValue, 0)}`],
          detectedDate: new Date(),
          confidence: 0.85
        });
      }
    }

    // Check for rapid successive awards to same supplier
    for (const [supplier, contracts] of supplierGroups) {
      const sortedContracts = contracts.sort((a, b) => a.contractAwardDate.getTime() - b.contractAwardDate.getTime());
      
      for (let i = 1; i < sortedContracts.length; i++) {
        const daysDiff = (sortedContracts[i].contractAwardDate.getTime() - sortedContracts[i-1].contractAwardDate.getTime()) / (1000 * 60 * 60 * 24);
        
        if (daysDiff < 30) {
          findings.push({
            id: `RS-${Date.now()}-${Math.random()}`,
            type: 'CONFLICT_OF_INTEREST',
            severity: 'HIGH',
            title: 'Rapid Successive Awards',
            description: `Supplier ${supplier} awarded contracts ${daysDiff.toFixed(0)} days apart`,
            affectedProcurements: [sortedContracts[i-1].id, sortedContracts[i].id],
            entities: [sortedContracts[i-1].entityName, sortedContracts[i].entityName],
            individuals: [sortedContracts[i-1].approvedBy, sortedContracts[i].approvedBy],
            financialImpact: sortedContracts[i-1].actualValue + sortedContracts[i].actualValue,
            regulatoryBreach: ['Public Procurement Act 2003, Section 66'],
            evidence: [`Days between awards: ${daysDiff.toFixed(0)}`],
            detectedDate: new Date(),
            confidence: 0.90
          });
        }
      }
    }

    return findings;
  }

  // Duplicate procurement analysis
  private async analyzeDuplicates(procurements: ProcurementRecord[]): Promise<AgentFinding[]> {
    const findings: AgentFinding[] = [];

    // Group by similar descriptions
    const descriptionGroups = new Map<string, ProcurementRecord[]>();
    
    procurements.forEach(procurement => {
      const keywords = this.extractKeywords(procurement.description);
      const key = keywords.slice(0, 3).join('-');
      
      if (!descriptionGroups.has(key)) {
        descriptionGroups.set(key, []);
      }
      descriptionGroups.get(key)!.push(procurement);
    });

    // Check for potential duplicates
    for (const [key, similarProcurements] of descriptionGroups) {
      if (similarProcurements.length > 1) {
        const timeSpan = Math.max(...similarProcurements.map(p => p.contractAwardDate.getTime())) - 
                        Math.min(...similarProcurements.map(p => p.contractAwardDate.getTime()));
        const daysDiff = timeSpan / (1000 * 60 * 60 * 24);

        if (daysDiff < 365) { // Within a year
          findings.push({
            id: `DP-${Date.now()}-${Math.random()}`,
            type: 'DUPLICATE_PROCUREMENT',
            severity: 'MEDIUM',
            title: 'Potential Duplicate Procurement',
            description: `${similarProcurements.length} similar procurements identified within ${daysDiff.toFixed(0)} days`,
            affectedProcurements: similarProcurements.map(p => p.id),
            entities: [...new Set(similarProcurements.map(p => p.entityName))],
            individuals: [...new Set(similarProcurements.map(p => p.approvedBy))],
            financialImpact: similarProcurements.reduce((sum, p) => sum + p.actualValue, 0),
            regulatoryBreach: ['Public Procurement Act 2003, Section 28'],
            evidence: [`Similar procurements: ${similarProcurements.length}`, `Time span: ${daysDiff.toFixed(0)} days`],
            detectedDate: new Date(),
            confidence: 0.75
          });
        }
      }
    }

    return findings;
  }

  // Risk assessment
  private async assessRisks(procurements: ProcurementRecord[]): Promise<AgentFinding[]> {
    const findings: AgentFinding[] = [];

    // High-value procurements
    const highValueThreshold = 100000000; // 100 million GHS
    const highValueProcurements = procurements.filter(p => p.actualValue > highValueThreshold);

    highValueProcurements.forEach(procurement => {
      findings.push({
        id: `HV-${Date.now()}-${Math.random()}`,
        type: 'BUDGET_ANOMALY',
        severity: 'HIGH',
        title: 'High-Value Procurement Risk',
        description: `High-value contract requires enhanced oversight`,
        affectedProcurements: [procurement.id],
        entities: [procurement.entityName],
        individuals: [procurement.approvedBy],
        financialImpact: procurement.actualValue,
        regulatoryBreach: ['Public Procurement Act 2003, Section 47'],
        evidence: [`Contract value: ${procurement.actualValue}`],
        detectedDate: new Date(),
        confidence: 0.95
      });
    });

    // Single bidder situations
    const singleBidderProcurements = procurements.filter(p => p.biddersCount === 1);
    
    singleBidderProcurements.forEach(procurement => {
      if (procurement.procurementMethod !== 'SOLE_SOURCING') {
        findings.push({
          id: `SB-${Date.now()}-${Math.random()}`,
          type: 'COMPLIANCE_VIOLATION',
          severity: 'HIGH',
          title: 'Single Bidder Without Sole Sourcing',
          description: 'Only one bidder received for non-sole sourcing procurement',
          affectedProcurements: [procurement.id],
          entities: [procurement.entityName],
          individuals: [procurement.approvedBy],
          financialImpact: procurement.actualValue,
          regulatoryBreach: ['Public Procurement Act 2003, Section 35'],
          evidence: [`Bidders: ${procurement.biddersCount}`, `Method: ${procurement.procurementMethod}`],
          detectedDate: new Date(),
          confidence: 0.92
        });
      }
    });

    return findings;
  }

  // Generate recommendations
  private async generateRecommendations(findings: AgentFinding[], procurements: ProcurementRecord[]): Promise<AgentRecommendation[]> {
    const recommendations: AgentRecommendation[] = [];

    // Analyze finding patterns
    const findingTypes = new Map<string, AgentFinding[]>();
    findings.forEach(finding => {
      if (!findingTypes.has(finding.type)) {
        findingTypes.set(finding.type, []);
      }
      findingTypes.get(finding.type)!.push(finding);
    });

    // Generate recommendations based on patterns
    for (const [type, typeFindings] of findingTypes) {
      switch (type) {
        case 'BUDGET_ANOMALY':
          recommendations.push({
            id: `REC-BUD-${Date.now()}`,
            priority: 'HIGH',
            category: 'POLICY_CHANGE',
            title: 'Strengthen Budget Estimation Process',
            description: 'Implement more rigorous budget estimation and approval processes',
            actionSteps: [
              'Require detailed cost breakdown for estimates > 1M GHS',
              'Implement independent review for high-value estimates',
              'Establish variance threshold of 5% for automatic review'
            ],
            responsibleParty: 'PPA Board + Entity Procurement Units',
            timeline: '30 days',
            expectedOutcome: 'Reduce budget overruns by 50%',
            relatedFindings: typeFindings.map(f => f.id)
          });
          break;

        case 'LOCAL_CONTENT_SHORTFALL':
          recommendations.push({
            id: `REC-LC-${Date.now()}`,
            priority: 'MEDIUM',
            category: 'POLICY_CHANGE',
            title: 'Enhance Local Content Monitoring',
            description: 'Strengthen local content requirements and monitoring',
            actionSteps: [
              'Implement pre-qualification local content assessment',
              'Require local content implementation plans',
              'Establish quarterly local content reporting'
            ],
            responsibleParty: 'PPA Monitoring Unit',
            timeline: '60 days',
            expectedOutcome: 'Achieve 70% average local content',
            relatedFindings: typeFindings.map(f => f.id)
          });
          break;

        case 'CONFLICT_OF_INTEREST':
          recommendations.push({
            id: `REC-CF-${Date.now()}`,
            priority: 'URGENT',
            category: 'IMMEDIATE_ACTION',
            title: 'Investigate Supplier Relationships',
            description: 'Conduct thorough investigation of potential conflicts',
            actionSteps: [
              'Audit all contracts with identified suppliers',
              'Review approval processes and authorities',
              'Implement supplier rotation policy'
            ],
            responsibleParty: 'PPA Investigation Unit + Auditor General',
            timeline: '14 days',
            expectedOutcome: 'Identify and resolve all conflicts',
            relatedFindings: typeFindings.map(f => f.id)
          });
          break;

        case 'DUPLICATE_PROCUREMENT':
          recommendations.push({
            id: `REC-DP-${Date.now()}`,
            priority: 'MEDIUM',
            category: 'SYSTEM_IMPROVEMENT',
            title: 'Implement Procurement Consolidation',
            description: 'System to identify and consolidate similar procurements',
            actionSteps: [
              'Deploy AI-powered duplicate detection',
              'Establish framework for procurement consolidation',
              'Create centralized procurement planning'
            ],
            responsibleParty: 'PPA IT Unit + Procurement Planning',
            timeline: '90 days',
            expectedOutcome: 'Reduce duplicate procurements by 80%',
            relatedFindings: typeFindings.map(f => f.id)
          });
          break;
      }
    }

    return recommendations;
  }

  // Helper methods
  private extractKeywords(description: string): string[] {
    const stopWords = ['the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by'];
    return description.toLowerCase()
      .split(/\s+/)
      .filter(word => word.length > 3 && !stopWords.includes(word))
      .slice(0, 5);
  }

  private calculateSeverity(ratio: number): 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' {
    if (ratio > 1.5) return 'CRITICAL';
    if (ratio > 1.3) return 'HIGH';
    if (ratio > 1.1) return 'MEDIUM';
    return 'LOW';
  }

  private calculateOverallRiskLevel(findings: AgentFinding[]): 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' {
    const criticalCount = findings.filter(f => f.severity === 'CRITICAL').length;
    const highCount = findings.filter(f => f.severity === 'HIGH').length;
    
    if (criticalCount > 0) return 'CRITICAL';
    if (highCount > 3) return 'HIGH';
    if (highCount > 0 || findings.length > 10) return 'MEDIUM';
    return 'LOW';
  }

  private calculateConfidence(findings: AgentFinding[]): number {
    if (findings.length === 0) return 1.0;
    const totalConfidence = findings.reduce((sum, f) => sum + f.confidence, 0);
    return totalConfidence / findings.length;
  }

  private async updateSupplierRiskProfiles(procurements: ProcurementRecord[], findings: AgentFinding[]) {
    // Update supplier risk profiles based on new findings
    const supplierContracts = new Map<string, ProcurementRecord[]>();
    
    procurements.forEach(p => {
      if (!supplierContracts.has(p.supplierName)) {
        supplierContracts.set(p.supplierName, []);
      }
      supplierContracts.get(p.supplierName)!.push(p);
    });

    for (const [supplierName, contracts] of supplierContracts) {
      const supplierFindings = findings.filter(f => 
        f.affectedProcurements.some(id => contracts.some(c => c.id === id))
      );

      const riskScore = this.calculateSupplierRiskScore(contracts, supplierFindings);
      
      const riskProfile: SupplierRiskProfile = {
        supplierId: contracts[0].supplierId,
        supplierName,
        riskScore,
        riskFactors: this.extractRiskFactors(supplierFindings),
        contractHistory: {
          totalContracts: contracts.length,
          totalValue: contracts.reduce((sum, c) => sum + c.actualValue, 0),
          complianceIssues: supplierFindings.length,
          performanceScore: this.calculatePerformanceScore(contracts)
        },
        redFlags: this.extractRedFlags(supplierFindings),
        recommendations: this.generateSupplierRecommendations(riskScore, supplierFindings)
      };

      this.supplierRiskProfiles.set(supplierName, riskProfile);
    }
  }

  private calculateSupplierRiskScore(contracts: ProcurementRecord[], findings: AgentFinding[]): number {
    let baseScore = 50;
    
    // Adjust based on findings
    findings.forEach(finding => {
      switch (finding.severity) {
        case 'CRITICAL': baseScore += 25; break;
        case 'HIGH': baseScore += 15; break;
        case 'MEDIUM': baseScore += 10; break;
        case 'LOW': baseScore += 5; break;
      }
    });

    // Adjust based on contract performance
    const avgComplianceScore = contracts.reduce((sum, c) => sum + c.complianceScore, 0) / contracts.length;
    baseScore += (100 - avgComplianceScore) * 0.2;

    return Math.min(100, Math.max(0, baseScore));
  }

  private extractRiskFactors(findings: AgentFinding[]): string[] {
    const factors = new Set<string>();
    findings.forEach(f => {
      factors.add(f.type);
      f.regulatoryBreach.forEach(rb => factors.add(rb));
    });
    return Array.from(factors);
  }

  private calculatePerformanceScore(contracts: ProcurementRecord[]): number {
    if (contracts.length === 0) return 0;
    return contracts.reduce((sum, c) => sum + c.complianceScore, 0) / contracts.length;
  }

  private extractRedFlags(findings: AgentFinding[]): string[] {
    return findings
      .filter(f => f.severity === 'HIGH' || f.severity === 'CRITICAL')
      .map(f => f.title);
  }

  private generateSupplierRecommendations(riskScore: number, findings: AgentFinding[]): string[] {
    const recommendations: string[] = [];
    
    if (riskScore > 75) {
      recommendations.push('Consider suspension from future tenders');
      recommendations.push('Require full audit of all contracts');
    } else if (riskScore > 50) {
      recommendations.push('Enhanced monitoring required');
      recommendations.push('Additional documentation for future contracts');
    } else if (riskScore > 25) {
      recommendations.push('Regular compliance checks');
    }

    return recommendations;
  }

  // Public methods
  getAnalysisHistory(): AgentAnalysis[] {
    return this.analysisHistory;
  }

  getSupplierRiskProfile(supplierName: string): SupplierRiskProfile | undefined {
    return this.supplierRiskProfiles.get(supplierName);
  }

  getAllSupplierRiskProfiles(): SupplierRiskProfile[] {
    return Array.from(this.supplierRiskProfiles.values());
  }

  async generateReport(analysisId: string): Promise<string> {
    const analysis = this.analysisHistory.find(a => a.id === analysisId);
    if (!analysis) {
      throw new Error('Analysis not found');
    }

    try {
      const prompt = `Generate a comprehensive procurement compliance report based on the following analysis:

Analysis ID: ${analysis.id}
Date: ${analysis.timestamp}
Risk Level: ${analysis.riskLevel}
Processed Records: ${analysis.processedRecords}
Issues Identified: ${analysis.issuesIdentified}

Key Findings:
${analysis.findings.map(f => `- ${f.title}: ${f.description} (Severity: ${f.severity})`).join('\n')}

Recommendations:
${analysis.recommendations.map(r => `- ${r.title}: ${r.description}`).join('\n')}

Please format this as a professional report with executive summary, detailed findings, and actionable recommendations.`;

      const response = await this.zai.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: 'You are an expert procurement compliance analyst generating official reports for the Public Procurement Authority of Ghana.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 2000,
        temperature: 0.7
      });

      return response.choices[0]?.message?.content || 'Report generation failed';
    } catch (error) {
      console.error('Report generation failed:', error);
      throw error;
    }
  }
}

// Singleton instance
export const procurementAgent = new ProcurementComplianceAgent();