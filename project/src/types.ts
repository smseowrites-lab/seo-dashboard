// Placeholder shared types. Replace with the real definitions when available.

export type TaskStatus =
  | 'pending'
  | 'in_progress'
  | 'completed'
  | 'skipped'
  | 'ai_detected'
  | 'ai_recommended'
  | 'awaiting_approval'
  | 'ai_processing'
  | 'approved'
  | 'needs_revision';

export interface TaskRecommendation {
  id: string;
  [key: string]: any;
}

export interface CompetitorEvent {
  id: string;
  [key: string]: any;
}

export interface AeoOpportunity {
  id: string;
  [key: string]: any;
}

export interface GeoOpportunity {
  id: string;
  [key: string]: any;
}

export interface TechnicalSeoIssue {
  id: string;
  [key: string]: any;
}

export interface AuditLogEntry {
  id: string;
  [key: string]: any;
}

export interface AbmAccount {
  id: string;
  [key: string]: any;
}

export interface UtmLinkItem {
  id: string;
  [key: string]: any;
}

export interface InternalLinkOpportunity {
  id: string;
  [key: string]: any;
}

export interface CarouselSlide {
  id: string;
  [key: string]: any;
}
