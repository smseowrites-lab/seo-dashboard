// Placeholder copilot engine. Replace with the real implementation when available.

export interface CopilotResponse {
  content: string;
  [key: string]: any;
}

export function generateConversationTitle(query: string): string {
  return query.slice(0, 40);
}

export async function processCopilotQuery(..._args: any[]): Promise<CopilotResponse> {
  return {
    content: 'The AI assistant is not connected yet in this preview.',
  };
}
