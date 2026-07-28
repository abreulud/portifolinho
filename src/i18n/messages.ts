import type {
  CredibilityBadge,
  ExperienceEntry,
  Post,
  ProfileStat,
  Project,
  SocialLink,
  ToolboxColumn
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
  experience: {
    eyebrow: string
    pageTitle: string
    intro: string
    positionsLabel: string
    ongoingLabel: string
    toolboxLabel: string
    entries: ExperienceEntry[]
    toolbox: ToolboxColumn[]
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
    experience: {
      eyebrow: '~/experiência',
      pageTitle: 'Experiência',
      intro:
        'Experiências em tecnologia, pesquisa e segurança organizadas como um log: o que fiz, o que aprendi e o impacto gerado.',
      positionsLabel: 'posições',
      ongoingLabel: 'em constante aprendizado',
      toolboxLabel: 'toolbox',
      entries: [
        {
          slug: 'security-researcher',
          period: 'Dez 2025 — agora',
          company: 'QuIIN',
          role: 'Pesquisadora IT em Criptografia Quântica',
          description:
            'Integrei sistemas de CV-QKD a redes de computadores utilizando TCP/IP, adaptando protocolos TLS e PKI para o consumo de chaves criptográficas por hardware quântico. Desenvolvi um proxy para testar APIs REST via HTTPS com certificados digitais pós-quânticos, assim como relatórios técnicos e documentação científica relacionados ao projeto de pesquisa.',
          skills: ['Go', 'Linux', 'TLS', 'PKI', ' REST API', 'Shell Script', 'VirtualBox']
        },
        {
          slug: 'tecnologia e dados',
          period: 'Dez 2024 — Dez 2025',
          company: 'Sicoob',
          role: 'Estagiária de Tecnologia',
          description:
            'Prestei suporte técnico a usuários internos em demandas de hardware, software, acessos e sistemas. Participei de projetos de migração de dados, automação de processos e documentação técnica.',
          skills: ['SQL Server', 'ASP.NET', 'JavaScript', 'AnyDesk', 'EDR CrowdStrike']
        },
        {
          slug: 'redes',
          period: 'Abr 2024 — Dez 2024',
          company: 'Saltur',
          role: 'Estagiária de TI',
          description:
            'Atuei com suporte a hardware, software e redes, incluindo manutenção de switches e atendimento de chamados. Também auxiliei em sistemas internos e na implantação de uma aplicação governamental durante o Carnaval.',
          skills: ['GLPI', 'C#', 'HTML/CSS', 'Redes', 'Active Directory']
        }
      ],
      toolbox: [
        { label: '~/Desenvolvimento', items: ['Python', 'Go', 'JavaScript', 'SQL', 'Rest API'] },
        { label: '~/Redes e Segurança', items: ['TCP/IP · DNS', 'TLS/PKI', 'Wireshark', 'Nmap', 'BurpSuite', 'EDR/XDR'] },
        { label: '~/Sistemas e Suporte', items: ['Linux', 'Windows', 'Docker', 'Grafana', 'Git/GitHub'] },
       /* { label: '~/Dados', items: ['SQL Server', 'Power BI', 'Excel'] }*/

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
          status: 'live',
          coverImage: '/covers/recon-map.svg'
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
          status: 'live',
          coverImage: '/covers/privacy-checklist.svg'
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
    experience: {
      eyebrow: '~/experience',
      pageTitle: 'Experience',
      intro:
        'Experience in technology, research and security organized as a log: what I did, what I learned and the impact it had.',
      positionsLabel: 'positions',
      ongoingLabel: 'always learning',
      toolboxLabel: 'toolbox',
      entries: [
        {
          slug: 'security-researcher',
          period: 'Dec 2025 — present',
          company: 'QuIIN',
          role: 'IT Researcher in Quantum Cryptography',
          description:
            'Integrated Continuous-Variable Quantum Key Distribution (CV-QKD) systems with computer networks using TCP/IP, adapting TLS and PKI protocols for cryptographic key consumption by quantum hardware. Developed a proxy for testing REST APIs over HTTPS using post-quantum digital certificates. Prepared technical reports and scientific documentation related to the research project.',
          skills: ['Go', 'Linux', 'TLS', 'PKI', 'REST API', 'Shell Script', 'VirtualBox']
        },
        {
          slug: 'technology-and-data',
          period: 'Dec 2024 — Dec 2025',
          company: 'Sicoob',
          role: 'Technology Intern',
          description:
            'Provided technical support to internal users with hardware, software, access and system issues. Participated in data migration, process automation and technical documentation projects.',
          skills: ['SQL Server', 'ASP.NET', 'JavaScript', 'AnyDesk', 'EDR CrowdStrike']
        },
        {
          slug: 'networks',
          period: 'Apr 2024 — Dec 2024',
          company: 'Saltur',
          role: 'IT Intern',
          description:
            'Provided hardware, software and network support, including switch maintenance and help desk requests. Also assisted with internal systems and the deployment of a government application during Carnival.',
          skills: ['GLPI', 'C#', 'HTML/CSS', 'Networking', 'Active Directory']
        }
      ],
      toolbox: [
        { label: '01 / offensive', items: ['Burp Suite', 'Nmap · ffuf', 'Metasploit'] },
        { label: '02 / code', items: ['Python', 'JavaScript', 'Shell · Git'] },
        { label: '03 / systems', items: ['Linux', 'Networks', 'Docker'] }
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
          status: 'live',
          coverImage: '/covers/recon-map.svg'
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
          status: 'live',
          coverImage: '/covers/privacy-checklist.svg'
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
    experience: {
      eyebrow: '~/experiencia',
      pageTitle: 'Experiencia',
      intro:
        'Experiencias en tecnología, investigación y seguridad organizadas como un log: qué hice, qué aprendí y el impacto que tuvo.',
      positionsLabel: 'posiciones',
      ongoingLabel: 'en aprendizaje constante',
      toolboxLabel: 'toolbox',
      entries: [
        {
          slug: 'security-researcher',
          period: 'Dic 2025 — actualidad',
          company: 'QuIIN',
          role: 'Investigadora de TI en Criptografía Cuántica',
          description:
            'Integré sistemas de distribución cuántica de claves de variable continua (CV-QKD) con redes de computadoras mediante TCP/IP, adaptando protocolos TLS y PKI para el consumo de claves criptográficas por hardware cuántico. Desarrollé un proxy para probar APIs REST sobre HTTPS utilizando certificados digitales poscuánticos. Elaboré informes técnicos y documentación científica relacionados con el proyecto de investigación.',
          skills: ['Go', 'Linux', 'TLS', 'PKI', 'REST API', 'Shell Script', 'VirtualBox']
        },
        {
          slug: 'technology-and-data',
          period: 'Dic 2024 — Dic 2025',
          company: 'Sicoob',
          role: 'Pasante de Tecnología',
          description:
            'Brindé soporte técnico a usuarios internos en cuestiones de hardware, software, accesos y sistemas. Participé en proyectos de migración de datos, automatización de procesos y documentación técnica.',
          skills: ['SQL Server', 'ASP.NET', 'JavaScript', 'AnyDesk', 'EDR CrowdStrike']
        },
        {
          slug: 'networks',
          period: 'Abr 2024 — Dic 2024',
          company: 'Saltur',
          role: 'Pasante de TI',
          description:
            'Trabajé con soporte de hardware, software y redes, incluyendo mantenimiento de switches y atención de solicitudes. También colaboré con sistemas internos y con la implementación de una aplicación gubernamental durante el Carnaval.',
          skills: ['GLPI', 'C#', 'HTML/CSS', 'Redes', 'Active Directory']
        }
      ],
      toolbox: [
        { label: '01 / offensive', items: ['Burp Suite', 'Nmap · ffuf', 'Metasploit'] },
        { label: '02 / code', items: ['Python', 'JavaScript', 'Shell · Git'] },
        { label: '03 / systems', items: ['Linux', 'Networks', 'Docker'] }
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
          status: 'live',
          coverImage: '/covers/recon-map.svg'
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
          status: 'live',
          coverImage: '/covers/privacy-checklist.svg'
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
