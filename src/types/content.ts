export interface ProfileStat {
  value: string
  label: string
}

export interface SocialLink {
  label: string
  href: string
  glyph: string
  primary?: boolean
  download?: string
}

export type PostCategory =
  | 'ctf'
  | 'web-security'
  | 'privacy'
  | 'writeup'
  | 'learning'

export interface Post {
  slug: string
  title: string
  excerpt: string
  category: PostCategory
  publishedAt?: string
  readingTimeMinutes?: number
  featured?: boolean
  locked?: boolean
  placeholder?: boolean
}

export interface ExperienceEntry {
  slug: string
  period: string
  company: string
  location?: string
  role: string
  description: string
  skills: string[]
}

export interface ToolboxColumn {
  label: string
  items: string[]
}

export type ProjectStatus = 'live' | 'in-progress'

export interface ProjectImpact {
  problem: string
  result: string
}

export interface Project {
  slug: string
  index: string
  tag: string
  title: string
  impact?: ProjectImpact
  topics?: string[]
  publishedAt?: string
  repoUrl?: string
  demoUrl?: string
  status: ProjectStatus
  coverImage?: string
  coverAlt?: string
  coverZoom?: boolean
  detailImage?: string
  detailImageAlt?: string
  hasDetails?: boolean
  locked?: boolean
}
