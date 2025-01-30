import React from 'react';
import { Activity, Car, AlertTriangle, TrendingUp, Clock } from 'lucide-react';
import { cn } from "../lib/utils";

const AnalysisCard = ({ title, icon: Icon, children, className = "" }) => (
  <div className={`bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 p-8 border border-blue-100 hover:border-blue-200 transform hover:-translate-y-1 ${className}`}>
    <div className="flex items-center gap-4 mb-6">
      <div className="p-3 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-inner">
        <Icon className="w-6 h-6 text-blue-600" />
      </div>
      <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
        {title}
      </h3>
    </div>
    {children}
  </div>
);

const SignalIndicator = ({ signal }) => {
  const colors = {
    red: 'from-red-500 to-rose-600',
    yellow: 'from-yellow-400 to-amber-500',
    green: 'from-green-400 to-emerald-500'
  };

  return (
    <div className="flex flex-col items-center">
      <div className={`w-32 h-32 rounded-full bg-gradient-to-br ${colors[signal]} shadow-xl glow-${signal} animate-pulse-slow`}>
        <div className="w-full h-full rounded-full bg-white/20 backdrop-blur-sm transform hover:scale-105 transition-transform duration-300" />
      </div>
      <p className="mt-4 text-lg font-bold uppercase tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-gray-700 to-gray-900">
        {signal}
      </p>
    </div>
  );
};

const TrafficAnalysisDisplay = ({ analysis }) => {
  console.log('Analysis data:', analysis);
  
  if (!analysis) {
    console.log('No analysis data available');
    return null;
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Main Status Display */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-50 rounded-3xl p-10 shadow-2xl border border-blue-100">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        
        <div className="relative">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 mb-2">
              Real-Time Traffic Analysis
            </h2>
            <p className="text-gray-600">Powered by TrafficHive AI</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="glass-card p-8 rounded-2xl text-center transform hover:scale-105 transition-all duration-300">
              <TrendingUp className="w-8 h-8 text-blue-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Traffic Density Level</h3>
              <p className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                {analysis.trafficFlow.status}
              </p>
            </div>

            <div className="glass-card p-8 rounded-2xl text-center transform scale-110 z-10 shadow-2xl">
              <SignalIndicator signal={analysis.trafficFlow.suggestedSignal} />
            </div>

            <div className="glass-card p-8 rounded-2xl text-center transform hover:scale-105 transition-all duration-300">
              <Clock className="w-8 h-8 text-blue-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Wait Time</h3>
              <p className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                {analysis.trafficFlow.waitTime}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Analysis Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <AnalysisCard title="Traffic Density Analysis" icon={Activity}>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Density Level</span>
              <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                analysis.trafficDensity.level === 'high' ? 'bg-gradient-to-r from-red-50 to-red-100 text-red-700' :
                analysis.trafficDensity.level === 'medium' ? 'bg-gradient-to-r from-yellow-50 to-yellow-100 text-yellow-700' :
                'bg-gradient-to-r from-green-50 to-green-100 text-green-700'
              }`}>
                {analysis.trafficDensity.level.toUpperCase()}
              </span>
            </div>
            <p className="text-gray-600 leading-relaxed">{analysis.trafficDensity.description}</p>
          </div>
        </AnalysisCard>

        <AnalysisCard title="Vehicle Analysis" icon={Car}>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Total Vehicles:</span>
              <span className="text-lg font-semibold text-blue-600">
                {analysis.vehicleAnalysis.totalCount}
              </span>
            </div>
            <p className="text-gray-600 text-sm">{analysis.vehicleAnalysis.composition}</p>
          </div>
        </AnalysisCard>

        <AnalysisCard 
          title="Safety Assessment" 
          icon={AlertTriangle}
          className="col-span-full"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg flex flex-col items-center justify-center">
              <h4 className="font-medium text-gray-900 mb-4">Risk Level</h4>
              <div className="mb-3">
                <AlertTriangle 
                  className={cn(
                    "w-16 h-16 transition-colors duration-300",
                    {
                      'text-red-500': analysis.safetyAssessment.riskLevel === 'high',
                      'text-yellow-500': analysis.safetyAssessment.riskLevel === 'medium',
                      'text-green-500': analysis.safetyAssessment.riskLevel === 'low'
                    }
                  )} 
                />
              </div>
              <span 
                className={cn(
                  "px-3 py-1 rounded-full text-sm font-medium transition-colors duration-300",
                  {
                    'bg-red-100 text-red-700': analysis.safetyAssessment.riskLevel === 'high',
                    'bg-yellow-100 text-yellow-700': analysis.safetyAssessment.riskLevel === 'medium',
                    'bg-green-100 text-green-700': analysis.safetyAssessment.riskLevel === 'low'
                  }
                )}
              >
                {analysis.safetyAssessment.riskLevel.toUpperCase()}
              </span>
            </div>
            
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Concerns</h4>
              <p className="text-sm text-gray-600">{analysis.safetyAssessment.concerns}</p>
            </div>
            
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Recommendations</h4>
              <p className="text-sm text-gray-600">{analysis.safetyAssessment.recommendations}</p>
            </div>
          </div>
        </AnalysisCard>
      </div>
    </div>
  );
};

export default TrafficAnalysisDisplay; 