// Placeholder SharePoint keyword service. Replace with the real implementation when available.

export const SHAREPOINT_WORKBOOK_URL = '';

export interface KeywordRankingItem {
  id: string;
  [key: string]: any;
}

export const SharePointKeywordService = {
  getSyncStatus(): { status: 'idle'; lastSynced: null } {
    return { status: 'idle', lastSynced: null };
  },
  getTopTagsForBlog(_blogSlug: string, _limit: number): string[] {
    return [];
  },
  async triggerLiveSync(): Promise<{ status: 'idle'; lastSynced: null }> {
    return { status: 'idle', lastSynced: null };
  },
};
