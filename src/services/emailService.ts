
import { apiRequest } from './api';

export interface Email {
  id: string;
  sender: string;
  subject: string;
  receivedAt: string;
  status: 'safe' | 'suspicious' | 'phishing';
  score: number;
  content?: string;
  indicators?: string[];
  headers?: Record<string, any>;
  attachments?: string[];
}

export interface EmailFilters {
  search?: string;
  status?: string;
  page?: number;
  limit?: number;
}

export interface EmailListResponse {
  emails: Email[];
  total: number;
  page: number;
  totalPages: number;
}

export const emailService = {
  async getEmails(filters: EmailFilters = {}): Promise<EmailListResponse> {
    const searchParams = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined) {
        searchParams.append(key, value.toString());
      }
    });

    return apiRequest(`/emails?${searchParams.toString()}`);
  },

  async getEmailById(id: string): Promise<Email> {
    return apiRequest(`/emails/${id}`);
  },

  async markEmailAsSafe(id: string): Promise<void> {
    await apiRequest(`/emails/${id}/mark-safe`, {
      method: 'PUT',
    });
  },

  async quarantineEmail(id: string): Promise<void> {
    await apiRequest(`/emails/${id}/quarantine`, {
      method: 'PUT',
    });
  },

  async deleteEmail(id: string): Promise<void> {
    await apiRequest(`/emails/${id}`, {
      method: 'DELETE',
    });
  },

  async scanNewEmails(): Promise<void> {
    await apiRequest('/emails/scan', {
      method: 'POST',
    });
  }
};
