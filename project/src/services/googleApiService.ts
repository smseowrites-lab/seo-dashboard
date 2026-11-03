// Placeholder Google API service. Replace with the real implementation when available.

export interface LiveAnalyticsSummary {
  [key: string]: any;
}

export interface GscPageMetric {
  [key: string]: any;
}

export interface BlogActionRecommendation {
  id: string;
  [key: string]: any;
}

export type GoogleAuthStatus = 'disconnected';

export const GoogleApiService = {
  getAuthStatus(): GoogleAuthStatus {
    return 'disconnected';
  },
  async requestAuthToken(): Promise<GoogleAuthStatus> {
    return 'disconnected';
  },
  async fetchLiveAnalyticsSummary(): Promise<LiveAnalyticsSummary | null> {
    return null;
  },
  async getBlogRecommendations(): Promise<BlogActionRecommendation[]> {
    return [];
  },
};
