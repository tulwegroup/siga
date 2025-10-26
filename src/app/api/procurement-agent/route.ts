// API Route for Procurement Compliance Agent
// Advanced AI-powered procurement analysis and monitoring

import { NextRequest, NextResponse } from 'next/server';
import { procurementAgent, AgentAnalysis } from '@/lib/procurement-agent';
import { COMPREHENSIVE_PROCUREMENT_DATA } from '@/data/comprehensive-procurement-data';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');
    const analysisId = searchParams.get('analysisId');
    const supplierName = searchParams.get('supplier');

    switch (action) {
      case 'analyze':
        // Run comprehensive analysis
        const analysis = await procurementAgent.analyzeProcurementData(COMPREHENSIVE_PROCUREMENT_DATA);
        return NextResponse.json({
          success: true,
          data: analysis,
          message: 'Analysis completed successfully'
        });

      case 'history':
        // Get analysis history
        const history = procurementAgent.getAnalysisHistory();
        return NextResponse.json({
          success: true,
          data: history,
          count: history.length
        });

      case 'supplier-risk':
        // Get specific supplier risk profile
        if (supplierName) {
          const riskProfile = procurementAgent.getSupplierRiskProfile(supplierName);
          if (riskProfile) {
            return NextResponse.json({
              success: true,
              data: riskProfile
            });
          } else {
            return NextResponse.json({
              success: false,
              message: 'Supplier risk profile not found'
            }, { status: 404 });
          }
        } else {
          // Get all supplier risk profiles
          const allProfiles = procurementAgent.getAllSupplierRiskProfiles();
          return NextResponse.json({
            success: true,
            data: allProfiles,
            count: allProfiles.length
          });
        }

      case 'report':
        // Generate detailed report
        if (analysisId) {
          try {
            const report = await procurementAgent.generateReport(analysisId);
            return NextResponse.json({
              success: true,
              data: { report, analysisId },
              message: 'Report generated successfully'
            });
          } catch (error) {
            return NextResponse.json({
              success: false,
              message: 'Failed to generate report',
              error: error instanceof Error ? error.message : 'Unknown error'
            }, { status: 500 });
          }
        } else {
          return NextResponse.json({
            success: false,
            message: 'Analysis ID required for report generation'
          }, { status: 400 });
        }

      default:
        // Return agent status and overview
        return NextResponse.json({
          success: true,
          data: {
            agentActive: true,
            totalProcurements: COMPREHENSIVE_PROCUREMENT_DATA.length,
            analysisCount: procurementAgent.getAnalysisHistory().length,
            supplierRiskProfiles: procurementAgent.getAllSupplierRiskProfiles().length,
            lastAnalysis: procurementAgent.getAnalysisHistory().slice(-1)[0]?.timestamp || null
          }
        });
    }

  } catch (error) {
    console.error('Procurement agent API error:', error);
    return NextResponse.json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, procurements, analysisId } = body;

    switch (action) {
      case 'analyze-custom':
        // Analyze custom procurement data
        if (!procurements || !Array.isArray(procurements)) {
          return NextResponse.json({
            success: false,
            message: 'Valid procurements array required'
          }, { status: 400 });
        }

        const customAnalysis = await procurementAgent.analyzeProcurementData(procurements);
        return NextResponse.json({
          success: true,
          data: customAnalysis,
          message: 'Custom analysis completed successfully'
        });

      case 'generate-report':
        // Generate report for specific analysis
        if (!analysisId) {
          return NextResponse.json({
            success: false,
            message: 'Analysis ID required'
          }, { status: 400 });
        }

        try {
          const report = await procurementAgent.generateReport(analysisId);
          return NextResponse.json({
            success: true,
            data: { report, analysisId },
            message: 'Report generated successfully'
          });
        } catch (error) {
          return NextResponse.json({
            success: false,
            message: 'Failed to generate report',
            error: error instanceof Error ? error.message : 'Unknown error'
          }, { status: 500 });
        }

      default:
        return NextResponse.json({
          success: false,
          message: 'Invalid action'
        }, { status: 400 });
    }

  } catch (error) {
    console.error('Procurement agent POST error:', error);
    return NextResponse.json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}