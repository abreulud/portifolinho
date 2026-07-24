import type {
  CredibilityBadge,
  Post,
  ProfileStat,
  Project,
  SocialLink
} from '@/types/content'

export type Locale = 'pt' | 'en' | 'es'
export type NavigationKey = 'home' | 'experience' | 'projects' | 'blog'

export interface SiteMessages {
  navigation: Record<NavigationKey, string>
  accessibility: {
    mainNavigation: string
    languageSelector: string
    switchToLightTheme: string
    switchToDarkTheme: string
    techStack: string
    activityIndicators: string
    profilePhoto: string
    seeAll: string
  }
  profile: {
    cardLabel: string
    roleStart: string
    webSecurity: string
    roleConnector: string
    backendDevelopment: string
    availability: string
    stats: ProfileStat[]
    socialLinks: SocialLink[]
    badges: CredibilityBadge[]
  }
  posts: {
    eyebrow: string
    sectionTitle: string
    featuredLabel: string
    readArticle: string
    items: Post[]
  }
  projects: {
    eyebrow: string
    sectionTitle: string
    problemLabel: string
    resultLabel: string
    sourceCode: string
    viewDemo: string
    comingSoon: string
    items: Project[]
  }
  footer: {
    createdBy: string
    location: string
    availability: string
  }
}

export const availableLocales: Locale[] = ['pt', 'en', 'es']

export const localeNames: Record<Locale, string> = {
  pt: 'Português',
  en: 'English',
  es: 'Español'
}

export const localeCodes: Record<Locale, string> = {
  pt: 'pt-BR',
  en: 'en-US',
  es: 'es-ES'
}

export const navigationItems: { key: NavigationKey; path: string }[] = [
  { key: 'home', path: '/' },
  { key: 'experience', path: '/experiencia' },
  { key: 'projects', path: '/projetos' },
  { key: 'blog', path: '/blog' }
]

const sharedStack = ['Python', 'Burp Suite', 'Linux', 'Nmap', 'OWASP Top 10']

export const messages: Record<Locale, SiteMessages> = {
  pt: {
    navigation: {
      home: 'home',
      experience: 'experiência',
      projects: 'projetos',
      blog: 'blog'
    },
    accessibility: {
      mainNavigation: 'Navegação principal',
      languageSelector: 'Selecionar idioma',
      switchToLightTheme: 'Mudar para o tema claro',
      switchToDarkTheme: 'Mudar para o tema escuro',
      techStack: 'Principais tecnologias',
      activityIndicators: 'Indicadores de atividade',
      profilePhoto: 'Foto de Ludmilla Abreu',
      seeAll: 'Ver todos'
    },
    profile: {
      cardLabel: 'perfil',
      roleStart: 'Estudante de Ciência da Computação, focada em',
      webSecurity: 'segurança web',
      roleConnector: 'e',
      backendDevelopment: 'desenvolvimento back-end',
      availability: 'disponível para projetos e oportunidades',
      stats: [
        { value: '4', label: 'CTFs concluídos' },
        { value: '0', label: 'write-ups publicados' },
        { value: '2+', label: 'anos de experiência' }
      ],
      socialLinks: [
        { label: 'baixar currículo', href: '/cv-ludmilla.pdf', glyph: '↓', primary: true },
        { label: 'linkedin', href: 'https://linkedin.com/in/ludmilla-abreu', glyph: '↗' },
        { label: 'github', href: 'https://github.com/abreulud', glyph: '⌘' }
      ],
      badges: [
        { label: '312 contribuições · 12 meses', live: true },
        { label: 'top 8% · HackTheBox', icon: '🏆' }
      ]
    },
    posts: {
      eyebrow: '~/blog',
      sectionTitle: 'Publicações recentes',
      featuredLabel: 'write-up em destaque',
      readArticle: 'ler artigo',
      items: [
        {
          slug: 'do-reconhecimento-ao-root',
          title: 'Do reconhecimento ao root: anatomia de um laboratório Linux',
          excerpt:
            'Uma análise do processo, das hipóteses que falharam e das decisões que levaram à exploração.',
          category: 'ctf',
          publishedAt: '2026-07-21',
          readingTimeMinutes: 12,
          featured: true
        },
        {
          slug: 'recon-map',
          title: 'Recon map',
          excerpt: 'automação · python · osint',
          category: 'write-up',
          publishedAt: '2026-07-10',
          readingTimeMinutes: 6
        },
        {
          slug: 'privacy-lab',
          title: 'Privacy lab',
          excerpt: 'hardening · linux · pesquisa',
          category: 'privacy',
          publishedAt: '2026-06-28',
          readingTimeMinutes: 8
        }
      ]
    },
    projects: {
      eyebrow: '~/projetos',
      sectionTitle: 'Meus projetos',
      problemLabel: 'Problema',
      resultLabel: 'Resultado',
      sourceCode: 'código-fonte',
      viewDemo: 'ver demo',
      comingSoon: 'em breve',
      items: [
        {
          slug: 'recon-map',
          index: '01',
          tag: 'tool',
          title: 'Recon map',
          impact: {
            problem: 'o reconhecimento manual consumia cerca de 40 minutos por alvo.',
            result: 'o pipeline reduziu esse tempo para 6 minutos e foi usado em 5 labs próprios.'
          },
          repoUrl: 'https://github.com/ludmilla/recon-map',
          demoUrl: 'https://recon-map.ludmilla.dev',
          status: 'live'
        },
        {
          slug: 'privacy-checklist',
          index: '03',
          tag: 'lab',
          title: 'Privacy checklist',
          impact: {
            problem: 'guias de privacidade existentes usavam linguagem alarmista.',
            result: 'um checklist gradual teve mais de 240 acessos orgânicos no primeiro mês.'
          },
          repoUrl: 'https://github.com/ludmilla/privacy-checklist',
          demoUrl: 'https://privacy-checklist.ludmilla.dev',
          status: 'live'
        }
      ]
    },
    footer: {
      createdBy: 'Criado por Ludmilla A.',
      location: 'Salvador, BR',
      availability: 'disponível para novos projetos'
    }
  },
  en: {
    navigation: {
      home: 'home',
      experience: 'experience',
      projects: 'projects',
      blog: 'blog'
    },
    accessibility: {
      mainNavigation: 'Main navigation',
      languageSelector: 'Select language',
      switchToLightTheme: 'Switch to light theme',
      switchToDarkTheme: 'Switch to dark theme',
      techStack: 'Main technologies',
      activityIndicators: 'Activity indicators',
      profilePhoto: 'Photo of Ludmilla Abreu',
      seeAll: 'View all'
    },
    profile: {
      cardLabel: 'profile',
      roleStart: 'Computer Science student focused on',
      webSecurity: 'web security',
      roleConnector: 'and',
      backendDevelopment: 'back-end development',
      availability: 'available for projects and opportunities',
      stats: [
        { value: '4', label: 'CTFs completed' },
        { value: '0', label: 'write-ups published' },
        { value: '2+', label: 'years of experience' }
      ],
      socialLinks: [
        { label: 'download resume', href: '/cv-ludmilla.pdf', glyph: '↓', primary: true },
        { label: 'linkedin', href: 'https://linkedin.com/in/ludmilla-abreu', glyph: '↗' },
        { label: 'github', href: 'https://github.com/abreulud', glyph: '⌘' }
      ],
      badges: [
        { label: '312 contributions · 12 months', live: true },
        { label: 'top 8% · HackTheBox', icon: '🏆' }
      ]
    },
    posts: {
      eyebrow: '~/blog',
      sectionTitle: 'Recent posts',
      featuredLabel: 'featured write-up',
      readArticle: 'read article',
      items: [
        {
          slug: 'do-reconhecimento-ao-root',
          title: 'From reconnaissance to root: anatomy of a Linux lab',
          excerpt:
            'An analysis of the process, the hypotheses that failed, and the decisions that led to exploitation.',
          category: 'ctf',
          publishedAt: '2026-07-21',
          readingTimeMinutes: 12,
          featured: true
        },
        {
          slug: 'recon-map',
          title: 'Recon map',
          excerpt: 'automation · python · osint',
          category: 'write-up',
          publishedAt: '2026-07-10',
          readingTimeMinutes: 6
        },
        {
          slug: 'privacy-lab',
          title: 'Privacy lab',
          excerpt: 'hardening · linux · research',
          category: 'privacy',
          publishedAt: '2026-06-28',
          readingTimeMinutes: 8
        }
      ]
    },
    projects: {
      eyebrow: '~/projects',
      sectionTitle: 'My projects',
      problemLabel: 'Problem',
      resultLabel: 'Result',
      sourceCode: 'source code',
      viewDemo: 'view demo',
      comingSoon: 'coming soon',
      items: [
        {
          slug: 'recon-map',
          index: '01',
          tag: 'tool',
          title: 'Recon map',
          impact: {
            problem: 'manual reconnaissance took around 40 minutes per target.',
            result: 'the pipeline cut that time to 6 minutes and was used in 5 personal labs.'
          },
          repoUrl: 'https://github.com/ludmilla/recon-map',
          demoUrl: 'https://recon-map.ludmilla.dev',
          status: 'live'
        },
        {
          slug: 'privacy-checklist',
          index: '03',
          tag: 'lab',
          title: 'Privacy checklist',
          impact: {
            problem: 'existing privacy guides relied on alarmist language.',
            result: 'a gradual checklist reached over 240 organic visits in its first month.'
          },
          repoUrl: 'https://github.com/ludmilla/privacy-checklist',
          demoUrl: 'https://privacy-checklist.ludmilla.dev',
          status: 'live'
        }
      ]
    },
    footer: {
      createdBy: 'Created by Ludmilla A.',
      location: 'Salvador, Brazil',
      availability: 'available for new projects'
    }
  },
  es: {
    navigation: {
      home: 'inicio',
      experience: 'experiencia',
      projects: 'proyectos',
      blog: 'blog'
    },
    accessibility: {
      mainNavigation: 'Navegación principal',
      languageSelector: 'Seleccionar idioma',
      switchToLightTheme: 'Cambiar al tema claro',
      switchToDarkTheme: 'Cambiar al tema oscuro',
      techStack: 'Tecnologías principales',
      activityIndicators: 'Indicadores de actividad',
      profilePhoto: 'Foto de Ludmilla Abreu',
      seeAll: 'Ver todos'
    },
    profile: {
      cardLabel: 'perfil',
      roleStart: 'Estudiante de Ciencias de la Computación enfocada en',
      webSecurity: 'seguridad web',
      roleConnector: 'y',
      backendDevelopment: 'desarrollo back-end',
      availability: 'disponible para proyectos y oportunidades',
      stats: [
        { value: '4', label: 'CTFs completados' },
        { value: '0', label: 'write-ups publicados' },
        { value: '2+', label: 'años de experiencia' }
      ],
      socialLinks: [
        { label: 'descargar currículum', href: '/cv-ludmilla.pdf', glyph: '↓', primary: true },
        { label: 'linkedin', href: 'https://linkedin.com/in/ludmilla-abreu', glyph: '↗' },
        { label: 'github', href: 'https://github.com/abreulud', glyph: '⌘' }
      ],
      badges: [
        { label: '312 contribuciones · 12 meses', live: true },
        { label: 'top 8% · HackTheBox', icon: '🏆' }
      ]
    },
    posts: {
      eyebrow: '~/blog',
      sectionTitle: 'Publicaciones recientes',
      featuredLabel: 'write-up destacado',
      readArticle: 'leer artículo',
      items: [
        {
          slug: 'do-reconhecimento-ao-root',
          title: 'Del reconocimiento al root: anatomía de un laboratorio Linux',
          excerpt:
            'Un análisis del proceso, las hipótesis que fallaron y las decisiones que llevaron a la explotación.',
          category: 'ctf',
          publishedAt: '2026-07-21',
          readingTimeMinutes: 12,
          featured: true
        },
        {
          slug: 'recon-map',
          title: 'Recon map',
          excerpt: 'automatización · python · osint',
          category: 'write-up',
          publishedAt: '2026-07-10',
          readingTimeMinutes: 6
        },
        {
          slug: 'privacy-lab',
          title: 'Privacy lab',
          excerpt: 'hardening · linux · investigación',
          category: 'privacy',
          publishedAt: '2026-06-28',
          readingTimeMinutes: 8
        }
      ]
    },
    projects: {
      eyebrow: '~/proyectos',
      sectionTitle: 'Mis proyectos',
      problemLabel: 'Problema',
      resultLabel: 'Resultado',
      sourceCode: 'código fuente',
      viewDemo: 'ver demo',
      comingSoon: 'próximamente',
      items: [
        {
          slug: 'recon-map',
          index: '01',
          tag: 'tool',
          title: 'Recon map',
          impact: {
            problem: 'el reconocimiento manual tardaba unos 40 minutos por objetivo.',
            result: 'el pipeline redujo ese tiempo a 6 minutos y se usó en 5 laboratorios propios.'
          },
          repoUrl: 'https://github.com/ludmilla/recon-map',
          demoUrl: 'https://recon-map.ludmilla.dev',
          status: 'live'
        },
        {
          slug: 'privacy-checklist',
          index: '03',
          tag: 'lab',
          title: 'Privacy checklist',
          impact: {
            problem: 'las guías de privacidad existentes utilizaban un lenguaje alarmista.',
            result: 'una lista gradual superó las 240 visitas orgánicas durante el primer mes.'
          },
          repoUrl: 'https://github.com/ludmilla/privacy-checklist',
          demoUrl: 'https://privacy-checklist.ludmilla.dev',
          status: 'live'
        }
      ]
    },
    footer: {
      createdBy: 'Creado por Ludmilla A.',
      location: 'Salvador, Brasil',
      availability: 'disponible para nuevos proyectos'
    }
  }
}

export { sharedStack as techStack }
