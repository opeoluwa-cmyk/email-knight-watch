
import React from "react";
import { useQuery } from "@tanstack/react-query";
import StatCard from "@/components/dashboard/StatCard";
import EmailTrafficChart from "@/components/dashboard/EmailTrafficChart";
import EmailSecurityPieChart from "@/components/dashboard/EmailSecurityPieChart";
import SecurityStatusSection from "@/components/dashboard/SecurityStatusSection";
import RecentAlertsSection from "@/components/dashboard/RecentAlertsSection";
import SecurityTipsSection from "@/components/dashboard/SecurityTipsSection";
import { dashboardService } from "@/services/dashboardService";
import { 
  statCards, 
  recentAlerts, 
  emailChartData, 
  phishingDistributionData 
} from "@/components/dashboard/DashboardData";

const Dashboard = () => {
  const { data: stats, isLoading: statsLoading, error: statsError } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: dashboardService.getStats,
  });

  const { data: alerts, isLoading: alertsLoading } = useQuery({
    queryKey: ['dashboard-alerts'],
    queryFn: dashboardService.getRecentAlerts,
  });

  const { data: chartData, isLoading: chartLoading } = useQuery({
    queryKey: ['dashboard-email-chart'],
    queryFn: dashboardService.getEmailChartData,
  });

  const { data: phishingData, isLoading: phishingLoading } = useQuery({
    queryKey: ['dashboard-phishing-distribution'],
    queryFn: dashboardService.getPhishingDistribution,
  });

  // Fallback to mock data if API fails
  const displayStats = stats || {
    scannedEmails: statCards[0].value,
    threatsDetected: statCards[1].value,
    protectionScore: statCards[2].value
  };

  const displayAlerts = alerts || recentAlerts;
  const displayChartData = chartData || emailChartData;
  const displayPhishingData = phishingData || phishingDistributionData;

  if (statsError) {
    console.log('Dashboard stats error (using fallback data):', statsError);
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-knight-navy">Welcome Back</h1>
        <p className="text-gray-500">Here's what's happening with your email security</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <StatCard 
          title="Emails Scanned"
          value={String(displayStats.scannedEmails)}
          description="Last 24 hours"
          icon={statCards[0].icon}
          color={statCards[0].color}
        />
        <StatCard 
          title="Threats Detected"
          value={String(displayStats.threatsDetected)}
          description="Active threats blocked"
          icon={statCards[1].icon}
          color={statCards[1].color}
        />
        <StatCard 
          title="Protection Score"
          value={`${displayStats.protectionScore}%`}
          description="Security rating"
          icon={statCards[2].icon}
          color={statCards[2].color}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <EmailTrafficChart data={displayChartData} />
        <EmailSecurityPieChart data={displayPhishingData} />
      </div>

      <SecurityStatusSection />
      <RecentAlertsSection alerts={displayAlerts as any} />
      <SecurityTipsSection />
      
      {(statsLoading || alertsLoading || chartLoading || phishingLoading) && (
        <div className="text-center text-sm text-gray-500">
          Loading dashboard data...
        </div>
      )}
    </div>
  );
};

export default Dashboard;
