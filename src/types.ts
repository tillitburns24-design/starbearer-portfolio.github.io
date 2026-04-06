export type MediaType = 'image' | 'video' | 'videoGrid' | 'text' | 'divider' | 'bubble' | 'markdown' | 'grid' | 'pdf';

export interface MediaItem {
  type: MediaType;
  hideFooter?: boolean;
  url?: string;
  urls?: string[];
  content?: string;
  caption?: string;
}

export interface Work {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  longDescription?: string;
  media: MediaItem[];
  details: {
    label: string;
    value: string;
  }[];
}

export interface Category {
  id: string;
  title: string;
  works: Work[];
}

export interface Contact {
  label: string;
  value: string;
  link?: string;
}
