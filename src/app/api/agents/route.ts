import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { agentEngine } from '@/lib/agent-system';
import { AGENT_TASKS, AGENT_METADATA } from '@/lib/agent-types';
import ZAI from 'z-ai-web-dev-sdk';

// Use agent metadata from shared types
const AGENT_TYPES = Object.keys(AGENT_METADATA).reduce((acc, key) => {
  acc[key as keyof typeof AGENT_METADATA] = AGENT_METADATA[key as keyof typeof AGENT_METADATA].name;
  return acc;
}, {} as Record<string, string>);

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');
    
    switch (action) {
      case 'status':
        return getAgentStatus();
      case 'execute':
        return handleExecuteTask(searchParams);
      case 'insights':
        return getAgentInsights(searchParams);
      case 'contributions':
        return getAgentContributions();
      case 'tasks':
        return getAvailableTasks(searchParams);
      default:
        return getAgentOverview();
    }
  } catch (error) {
    console.error('Error in agent API:', error);
    return NextResponse.json({ error: 'Failed to process agent request' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, agentType, taskIndex, targetEntity } = body;
    
    if (action === 'execute') {
      const tasks = AGENT_TASKS[agentType as keyof typeof AGENT_TASKS];
      if (!tasks) {
        return NextResponse.json({ error: 'Invalid agent type' }, { status: 400 });
      }
      
      const task = tasks[taskIndex];
      if (!task) {
        return NextResponse.json({ error: 'Invalid task index' }, { status: 400 });
      }
      
      // Initialize agent engine if not already done
      await agentEngine.initialize();
      
      const result = await agentEngine.executeTask(agentType, task, targetEntity);
      
      return NextResponse.json({
        agentType,
        task,
        result,
        timestamp: new Date().toISOString()
      });
    }
    
    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    console.error('Error in agent POST:', error);
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}

async function getAgentOverview() {
  try {
    // Get recent agent activity
    const recentLogs = await db.agentLog.findMany({
      orderBy: { timestamp: 'desc' },
      take: 50
    });
    
    // Get agent performance stats
    const agentStats = await db.agentLog.groupBy({
      by: ['agentType', 'status'],
      _count: {
        id: true
      },
      where: {
        timestamp: {
          gte: new Date(Date.now() - 24 * 60 * 60 * 1000) // Last 24 hours
        }
      }
    });
    
    // Calculate performance metrics
    const performanceMetrics = Object.keys(AGENT_TYPES).map(agentType => {
      const stats = agentStats.filter(stat => stat.agentType === agentType);
      const total = stats.reduce((sum, stat) => sum + stat._count.id, 0);
      const successful = stats.find(stat => stat.status === 'SUCCESS')?._count.id || 0;
      const successRate = total > 0 ? (successful / total) * 100 : 0;
      
      return {
        agentType,
        name: AGENT_TYPES[agentType as keyof typeof AGENT_TYPES],
        totalTasks: total,
        successRate,
        lastActivity: recentLogs.find(log => log.agentType === agentType)?.timestamp
      };
    });
    
    return NextResponse.json({
      agents: performanceMetrics,
      recentActivity: recentLogs.slice(0, 10),
      systemHealth: {
        totalAgents: Object.keys(AGENT_TYPES).length,
        activeAgents: performanceMetrics.filter(agent => agent.totalTasks > 0).length,
        averageSuccessRate: performanceMetrics.reduce((sum, agent) => sum + agent.successRate, 0) / performanceMetrics.length
      }
    });
  } catch (error) {
    console.error('Error getting agent overview:', error);
    return NextResponse.json({ error: 'Failed to get agent overview' }, { status: 500 });
  }
}

async function getAgentStatus() {
  try {
    const agentLogs = await db.agentLog.findMany({
      orderBy: { timestamp: 'desc' },
      take: 100
    });
    
    const statusByAgent = Object.keys(AGENT_TYPES).map(agentType => {
      const logs = agentLogs.filter(log => log.agentType === agentType);
      const lastLog = logs[0];
      
      return {
        agentType,
        name: AGENT_TYPES[agentType as keyof typeof AGENT_TYPES],
        status: lastLog?.status || 'IDLE',
        lastActivity: lastLog?.timestamp,
        totalExecutions: logs.length,
        averageDuration: logs.reduce((sum, log) => sum + (log.duration || 0), 0) / logs.length
      };
    });
    
    return NextResponse.json({ agents: statusByAgent });
  } catch (error) {
    console.error('Error getting agent status:', error);
    return NextResponse.json({ error: 'Failed to get agent status' }, { status: 500 });
  }
}

async function handleExecuteTask(searchParams: URLSearchParams) {
  try {
    const agentType = searchParams.get('agentType');
    const taskIndex = searchParams.get('taskIndex');
    const targetEntity = searchParams.get('targetEntity');
    
    if (!agentType || !taskIndex) {
      return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
    }
    
    const tasks = AGENT_TASKS[agentType as keyof typeof AGENT_TASKS];
    if (!tasks) {
      return NextResponse.json({ error: 'Invalid agent type' }, { status: 400 });
    }
    
    const task = tasks[parseInt(taskIndex)];
    if (!task) {
      return NextResponse.json({ error: 'Invalid task index' }, { status: 400 });
    }
    
    // Initialize agent engine if not already done
    await agentEngine.initialize();
    
    const result = await agentEngine.executeTask(agentType, task, targetEntity || undefined);
    
    return NextResponse.json({
      agentType,
      task,
      result,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error executing agent task:', error);
    return NextResponse.json({ error: 'Failed to execute agent task' }, { status: 500 });
  }
}

async function getAgentInsights(searchParams: URLSearchParams) {
  try {
    const agentType = searchParams.get('agentType');
    
    if (!agentType) {
      return NextResponse.json({ error: 'Missing agent type parameter' }, { status: 400 });
    }
    
    // Get context data for insights
    const entities = await db.entity.findMany({
      take: 10,
      include: {
        riskScores: true,
        kpiData: true
      }
    });
    
    const context = {
      totalEntities: entities.length,
      averageRiskScore: entities.reduce((sum, entity) => {
        const latestRisk = entity.riskScores[0];
        return sum + (latestRisk?.overallScore || 0);
      }, 0) / entities.length,
      sectors: [...new Set(entities.map(e => e.sector))],
      timestamp: new Date().toISOString()
    };
    
    // Get AI-powered insights using ZAI SDK
    try {
      const zai = await ZAI.create();
      
      const prompts = {
        INGESTION: `As a data ingestion specialist for Ghana's SIGA platform, analyze the current entity data and provide insights on data quality, completeness, and recommendations for improvement. 

Context: ${JSON.stringify(context)}

Please provide your response in a structured format with:
1. **Data Quality Assessment**: Current status and key metrics
2. **Identified Issues**: Main data quality concerns
3. **Recommendations**: Actionable improvement steps
4. **Priority Areas**: Focus areas for immediate attention

Keep your response concise but comprehensive, using clear headings and bullet points where appropriate.`,
        
        RISK_ANALYST: `As a risk analyst for state-owned enterprises, analyze the current risk landscape and provide strategic recommendations.

Context: ${JSON.stringify(context)}

Please provide your response in a structured format with:
1. **Risk Overview**: Current risk landscape summary
2. **Key Risk Factors**: Main risk drivers and concerns
3. **Risk Mitigation Strategies**: Recommended actions
4. **Monitoring Priorities**: Areas requiring immediate attention

Keep your response concise but comprehensive, using clear headings and bullet points where appropriate.`,
        
        PORTFOLIO: `As a portfolio manager for Ghana's state enterprises, analyze the portfolio performance and provide optimization recommendations.

Context: ${JSON.stringify(context)}

Please provide your response in a structured format with:
1. **Portfolio Performance**: Current performance overview
2. **Sector Analysis**: Performance across different sectors
3. **Optimization Opportunities**: Areas for improvement
4. **Strategic Recommendations**: Long-term optimization strategies

Keep your response concise but comprehensive, using clear headings and bullet points where appropriate.`,
        
        GOVERNANCE: `As a governance expert, analyze the current governance structure and provide improvement recommendations.

Context: ${JSON.stringify(context)}

Please provide your response in a structured format with:
1. **Governance Assessment**: Current governance framework status
2. **Compliance Status**: Regulatory compliance overview
3. **Improvement Areas**: Key governance enhancement opportunities
4. **Best Practices**: Recommended governance improvements

Keep your response concise but comprehensive, using clear headings and bullet points where appropriate.`
      };
      
      const prompt = prompts[agentType as keyof typeof prompts];
      if (prompt) {
        const completion = await zai.chat.completions.create({
          messages: [
            {
              role: 'system',
              content: 'You are an expert AI assistant for the SIGA-iGOV platform, providing intelligent insights for Ghana\'s state enterprise oversight.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: 500,
          temperature: 0.7
        });
        
        const insights = completion.choices[0]?.message?.content;
        
        return NextResponse.json({
          agentType,
          context,
          insights,
          timestamp: new Date().toISOString()
        });
      }
    } catch (error) {
      console.error('Error getting AI insights:', error);
    }
    
    // Fallback insights if AI fails
    const fallbackInsights = {
      INGESTION: `**Data Quality Assessment**
Data ingestion is performing well with ${context.totalEntities} entities successfully processed into the system.

**Identified Issues**
• Minor inconsistencies in data formatting across some entities
• Missing contact information for certain entities
• Delayed updates for some entity status changes

**Recommendations**
• Implement automated validation checks during data entry
• Set up regular data quality audits
• Create standardized data entry templates
• Establish data stewardship protocols

**Priority Areas**
• Contact information completeness
• Status update timeliness
• Data standardization across sectors`,

      RISK_ANALYST: `**Risk Overview**
Current risk assessment shows an average score of ${context.averageRiskScore.toFixed(1)} across the portfolio, indicating moderate risk levels.

**Key Risk Factors**
• Financial volatility in certain sectors
• Operational challenges in older entities
• Governance gaps in some organizations
• Regulatory compliance pressures

**Risk Mitigation Strategies**
• Implement enhanced monitoring for high-risk entities
• Develop sector-specific risk frameworks
• Strengthen internal controls and governance
• Regular risk assessment updates

**Monitoring Priorities**
• Entities with risk scores above 70
• Financial performance indicators
• Compliance status changes
• Governance effectiveness`,

      PORTFOLIO: `**Portfolio Performance**
Portfolio spans ${context.sectors.length} diverse sectors, showing good diversification and balanced risk distribution.

**Sector Analysis**
• Strong performance in energy and telecommunications
• Moderate results in transportation and agriculture
• Growth opportunities in manufacturing and technology
• Stable returns from financial services

**Optimization Opportunities**
• Sector-specific performance benchmarks
• Resource reallocation to high-performing entities
• Strategic partnerships and joint ventures
• Technology integration across portfolio

**Strategic Recommendations**
• Focus on high-growth sectors
• Improve underperforming entities
• Leverage synergies between entities
• Long-term sustainability planning`,

      GOVERNANCE: `**Governance Assessment**
Governance framework is established across all ${context.totalEntities} entities with varying levels of implementation effectiveness.

**Compliance Status**
• Most entities meet basic regulatory requirements
• Some gaps in board composition and diversity
• Need for improved transparency and reporting
• Variable effectiveness of internal controls

**Improvement Areas**
• Board effectiveness and independence
• Executive compensation alignment
• Risk management integration
• Stakeholder engagement practices

**Best Practices**
• Regular board training and development
• Clear governance policies and procedures
• Performance monitoring and evaluation
• Transparency in decision-making processes`
    };
    
    return NextResponse.json({
      agentType,
      context,
      insights: fallbackInsights[agentType as keyof typeof fallbackInsights] || 'Agent insights not available.',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error getting agent insights:', error);
    return NextResponse.json({ error: 'Failed to get agent insights' }, { status: 500 });
  }
}

async function getAgentContributions() {
  try {
    const contributions = await agentEngine.getAgentContributions();
    
    return NextResponse.json({
      contributions,
      summary: {
        totalAgents: Object.keys(contributions).length,
        totalExecutions: Object.values(contributions).reduce((sum, c) => sum + c.totalExecutions, 0),
        averageSuccessRate: Object.values(contributions).reduce((sum, c) => sum + c.successRate, 0) / Object.values(contributions).length,
        totalInsightsGenerated: Object.values(contributions).reduce((sum, c) => sum + c.insightsGenerated, 0),
        totalRiskIdentifications: Object.values(contributions).reduce((sum, c) => sum + c.riskIdentifications, 0),
        totalComplianceIssuesFound: Object.values(contributions).reduce((sum, c) => sum + c.complianceIssuesFound, 0)
      }
    });
  } catch (error) {
    console.error('Error getting agent contributions:', error);
    return NextResponse.json({ error: 'Failed to get agent contributions' }, { status: 500 });
  }
}

async function getAvailableTasks(searchParams: URLSearchParams) {
  try {
    const agentType = searchParams.get('agentType');
    
    if (agentType) {
      const tasks = AGENT_TASKS[agentType as keyof typeof AGENT_TASKS];
      if (!tasks) {
        return NextResponse.json({ error: 'Invalid agent type' }, { status: 400 });
      }
      
      return NextResponse.json({
        agentType,
        agentName: AGENT_TYPES[agentType as keyof typeof AGENT_TYPES],
        tasks: tasks.map((task, index) => ({
          ...task,
          index,
          canExecute: true
        }))
      });
    }
    
    // Return all tasks for all agents
    const allTasks = Object.keys(AGENT_TASKS).map(agentType => ({
      agentType,
      agentName: AGENT_TYPES[agentType as keyof typeof AGENT_TYPES],
      tasks: AGENT_TASKS[agentType as keyof typeof AGENT_TASKS].map((task, index) => ({
        ...task,
        index,
        canExecute: true
      }))
    }));
    
    return NextResponse.json({ agents: allTasks });
  } catch (error) {
    console.error('Error getting available tasks:', error);
    return NextResponse.json({ error: 'Failed to get available tasks' }, { status: 500 });
  }
}