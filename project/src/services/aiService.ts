// Placeholder AI rephrasing. Replace with the real implementation when available.

export interface RephraseOption {
  id: string;
  label: string;
  style: string;
}

export const REPHRASE_STYLES: RephraseOption[] = [
  { id: 'professional', label: 'Professional', style: 'professional' },
  { id: 'friendly', label: 'Friendly', style: 'friendly' },
  { id: 'concise', label: 'Concise', style: 'concise' },
];

export function generateRephrasedText(originalText: string, _style: RephraseOption): string {
  return originalText;
}
