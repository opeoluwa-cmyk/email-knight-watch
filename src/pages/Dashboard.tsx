
import React from "react";
import StatCard from "@/components/dashboard/StatCard";
import EmailTrafficChart from "@/components/dashboard/EmailTrafficChart";
import EmailSecurityPieChart from "@/components/dashboard/EmailSecurityPieChart";
import SecurityStatusSection from "@/components/dashboard/SecurityStatusSection";
import RecentAlertsSection from "@/components/dashboard/RecentAlertsSection";
import SecurityTipsSection from "@/components/dashboard/SecurityTipsSection";
import { 
  statCards, 
  recentAlerts, 
  emailChartData, 
  phishingDistributionData 
} from "@/components/dashboard/DashboardData";

const Dashboard = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-knight-navy">Welcome Back</h1>
        <p className="text-gray-500">Here's what's happening with your email security</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {statCards.map((card, index) => (
          <StatCard 
            key={index}
            title={card.title}
            value={card.value}
            description={card.description}
            icon={card.icon}
            color={card.color}
          />
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <EmailTrafficChart data={emailChartData} />
        <EmailSecurityPieChart data={phishingDistributionData} />
      </div>

      <SecurityStatusSection />
      <RecentAlertsSection alerts={recentAlerts as any} />
      <SecurityTipsSection />
    </div>
  );
};

export default Dashboard;
