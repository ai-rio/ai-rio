export type ResourceCategory =
  | 'blog'
  | 'guide'
  | 'tutorial'
  | 'documentation'
  | 'video'
  | 'podcast'
  | 'book'
  | 'course'
  | 'tool'
  | 'library';

export interface Resource {
  id: string;
  title: string;
  description: string;
  url: string;
  category: ResourceCategory;
  tags?: string[];
  publishedAt?: Date;
  author?: string;
}

// Add missing export
export type ProfitabilityStatus = 'healthy' | 'warning' | 'crisis';
