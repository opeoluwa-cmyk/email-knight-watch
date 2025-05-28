
import { apiRequest } from './api';

export interface DashboardStats {
  scannedEmails: number;
  threatsDetected: number;
  protectionScore: number;
}

export interface RecentAlert {
  id: number;
  title: string;
  source: string;
  time: string;
  severity: 'high' | 'medium' | 'low';
}

export interface EmailChartData {
  name: string;
  total: number;
  phishing: number;
}

export interface PhishingDistribution {
  name: string;
  value: number;
  color: string;
}

export const dashboardService = {
  async getStats(): Promise<DashboardStats> {
    return apiRequest('/dashboard/stats');
  },

  async getRecentAlerts(): Promise<RecentAlert[]> {
    return apiRequest('/dashboard/alerts');
  },

  async getEmailChartData(): Promise<EmailChartData[]> {
    return apiRequest('/dashboard/email-chart');
  },

  async getPhishingDistribution(): Promise<PhishingDistribution[]> {
    return apiRequest('/dashboard/phishing-distribution');
  }
};
