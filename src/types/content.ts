export interface ProfileStat {
  value: string
  label: string
}

export interface SocialLink {
  label: string
  href: string
  glyph: string
  primary?: boolean
}

export interface CredibilityBadge {
  label: string
  icon?: string
  live?: boolean
}

export type PostCategory = 'ctf' | 'web-security' | 'privacy' | 'write-up' | 'learning'

export interface Post {
  slug: string
  title: string
  excerpt: string
  category: PostCategory
  publishedAt: string
  readingTimeMinutes: number
  featured?: boolean
}

export interface ExperienceEntry {
  slug: string
  period: string
  company: string
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
  impact: ProjectImpact
  repoUrl: string
  demoUrl?: string
  status: ProjectStatus
  coverImage?: string
}
