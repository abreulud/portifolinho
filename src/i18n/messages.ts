import type {
  ExperienceEntry,
  Post,
  ProfileStat,
  Project,
  SocialLink,
  ToolboxColumn
} from '@/types/content'

export type Locale = 'pt' | 'en'
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
  }
  posts: {
    eyebrow: string
    sectionTitle: string
    featuredLabel: string
    readArticle: string
    viewAllPosts: string
    archiveTitle: string
    archiveIntro: string
    inProgressLabel: string
    placeholderLabel: string
    comingSoon: string
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
    pageEyebrow: string
    pageTitle: string
    pageIntro: string
    newLabel: string
    liveLabel: string
    inProgressLabel: string
    problemLabel: string
    resultLabel: string
    sourceCode: string
    viewDemo: string
    viewProject: string
    backToProjects: string
    notFoundTitle: string
    notFoundText: string
    comingSoon: string
    viewAllProjects: string
    items: Project[]
  }
  footer: {
    createdBy: string
    location: string
    availability: string
  }
}

export const availableLocales: Locale[] = ['pt', 'en']

export const localeNames: Record<Locale, string> = {
  pt: 'Português',
  en: 'English'
}

export const localeCodes: Record<Locale, string> = {
  pt: 'pt-BR',
  en: 'en-US'
}

export const navigationItems: { key: NavigationKey; path: string }[] = [
  { key: 'home', path: '/' },
  { key: 'experience', path: '/experiencia' },
  { key: 'projects', path: '/projetos' },
  { key: 'blog', path: '/blog' }
]

const sharedStack = ['Python', 'TypeScript', 'Vue.js', 'SQL', 'Linux', 'Burp Suite', 'OWASP']

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
      profilePhoto: 'Foto de Ludmilla Abreu'
    },
    profile: {
      cardLabel: 'perfil',
      roleStart: 'Estudante de Ciência da Computação, focada em',
      webSecurity: 'cibersegurança',
      roleConnector: 'e',
      backendDevelopment: 'desenvolvimento back-end',
      availability: 'disponível para projetos e oportunidades',
      stats: [
        { value: '4', label: 'CTFs concluídos' },
        { value: '0', label: 'write-ups publicados' },
        { value: '2+', label: 'anos de experiência' }
      ],
      socialLinks: [
        {
          label: 'baixar currículo',
          href: '/CV%20-%20Ludmilla%20Abreu%20%28Tecnologia%29.pdf',
          glyph: '↓',
          primary: true,
          download: 'CV - Ludmilla Abreu (Tecnologia).pdf'
        },
        { label: 'linkedin', href: 'https://linkedin.com/in/ludmilla-abreu', glyph: '↗' },
        { label: 'github', href: 'https://github.com/abreulud', glyph: '⌘' }
      ]
    },
    posts: {
      eyebrow: '~/blog',
      sectionTitle: 'Publicações recentes',
      featuredLabel: 'write-up em destaque',
      readArticle: 'ler artigo',
      viewAllPosts: 'ver todas as publicações',
      archiveTitle: 'Minhas publicações',
      archiveIntro:
        'Pesquisas, artigos e write-ups sobre segurança e desenvolvimento.',
      inProgressLabel: 'em andamento',
      placeholderLabel: 'em breve',
      comingSoon: 'Em breve',
      items: [
        {
          slug: 'oceansec-osint',
          title: 'OceanSec: Atividade de Coleta de Informações (OSINT)',
          excerpt:
            'Uma análise OSINT de uma empresa fictícia de serviços de cibersegurança, com o mapeamento de documentos sensíveis, repositórios, ativos e sistemas internos da organização.',
          category: 'writeup',
          locked: true
        },
        {
          slug: 'proxima-publicacao',
          title: 'Próxima publicação',
          excerpt: 'Este espaço será preenchido com um novo conteúdo em breve.',
          category: 'learning',
          placeholder: true
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
      toolboxLabel: 'tecnologias & ferramentas',
      entries: [
        {
          slug: 'security-researcher',
          period: 'Dez 2025 — agora · 8 meses',
          company: 'QuIIN',
          role: 'Pesquisadora IT em Criptografia Quântica',
          description:
            'Pesquisa em integração de sistemas CV-QKD com redes clássicas, adaptando protocolos TLS e PKI para o consumo de chaves criptográficas por hardware quântico. Desenvolvimento de um proxy para testar APIs REST via HTTPS com certificados digitais pós-quânticos, assim como a escrita de relatórios técnicos e documentação científica.',
          skills: ['Go', 'Linux', 'TLS', 'PKI', 'REST API', 'Shell Script', 'VirtualBox']
        },
        {
          slug: 'tecnologia e dados',
          period: 'Dez 2024 — Dez 2025 · 1 ano',
          company: 'Sicoob',
          role: 'Estagiária de Tecnologia',
          description:
            'Prestei suporte técnico a usuários internos em demandas de hardware, software, acessos e sistemas. Participei de projetos de migração de dados, automação de processos e documentação técnica.',
          skills: ['SQL Server', 'ASP.NET', 'JavaScript', 'AnyDesk', 'EDR CrowdStrike']
        },
        {
          slug: 'redes',
          period: 'Abr 2024 — Dez 2024 · 9 meses',
          company: 'Saltur',
          role: 'Estagiária de TI',
          description:
            'Atuei com suporte a hardware, software e redes, incluindo manutenção de switches e atendimento de chamados. Também auxiliei em sistemas internos e na implantação de uma aplicação governamental durante o Carnaval.',
          skills: ['GLPI', 'C#', 'HTML/CSS', 'Redes', 'Active Directory']
        },
        {
          slug: 'suporte-tecnico-unip',
          period: 'Nov 2023 — Abr 2024 · 6 meses',
          company: 'UNIP',
          role: 'Estagiária de TI',
          description:
            'Realizei manutenção e formatação de computadores, instalação de sistemas operacionais. Atualizações de documentos no sistema interno da universidade e cadastro biométrico de estudantes, assim como apoio nas rotinas administrativas.',
          skills: ['Hardware', 'Suporte Técnico', 'Administração']
        }
      ],
      toolbox: [
        { label: '~/Desenvolvimento', items: ['Python', 'Go', 'JavaScript', 'SQL', 'REST API'] },
        { label: '~/Redes e Segurança', items: ['TCP/IP · DNS', 'TLS/PKI', 'Wireshark', 'Nmap', 'Burp Suite', 'EDR/XDR'] },
        { label: '~/Sistemas e Suporte', items: ['Linux', 'Windows', 'Docker', 'Grafana', 'Git/GitHub'] }
      ]
    },
    projects: {
      eyebrow: '~/projetos',
      sectionTitle: 'Meus projetos',
      pageEyebrow: '~/projetos',
      pageTitle: 'Minhas construções',
      pageIntro:
        'Projetos acadêmicos e experiências digitais documentados do problema às decisões de implementação.',
      newLabel: 'Novo!',
      liveLabel: 'disponível',
      inProgressLabel: 'em andamento',
      problemLabel: 'Problema',
      resultLabel: 'Resultado',
      sourceCode: 'código-fonte',
      viewDemo: 'ver demo',
      viewProject: 'ver projeto',
      backToProjects: 'voltar aos projetos',
      notFoundTitle: 'Projeto não encontrado',
      notFoundText: 'Este projeto não existe ou ainda não possui uma página publicada.',
      comingSoon: 'Em breve',
      viewAllProjects: 'ver todos os projetos',
      items: [
        {
          slug: 'projeto-conclusao-ciencia-computacao',
          index: '01',
          tag: 'TCC',
          title: 'Projeto de Conclusão de Ciência da Computação',
          topics: ['Criptografia', 'Proxy', 'TLS'],
          status: 'in-progress',
          locked: true
        },
        {
          slug: 'modelagem-computacional',
          index: '02',
          tag: 'machine learning',
          title: 'Modelagem computacional do consumo de energia',
          impact: {
            problem: 'identificar perfis semelhantes de consumo e perdas em uma base sem rótulos.',
            result:
              'O objetivo deste projeto é agrupar bairros e regiões de Salvador conforme seus perfis de consumo de energia elétrica, permitindo monitorar quais áreas da cidade apresentam maior consumo.'
          },
          publishedAt: '2026-06-17',
          repoUrl: 'https://github.com/abreulud/ModelagemComputacional',
          status: 'live',
          coverImage: '/project-media/modelagem-computacional/capa-grafico-linha.png',
          coverAlt: 'Gráfico de linha ascendente que representa uma evolução simulada do consumo de energia.',
          coverZoom: true,
          detailImage: '/project-media/modelagem-computacional/grafico-clusters.png',
          detailImageAlt:
            'Gráfico de dispersão dos bairros de Salvador agrupados por perfil de consumo de energia.',
          hasDetails: true
        },
        {
          slug: 'guitar-desktop',
          index: '03',
          tag: 'experiência web',
          title: 'Guitar Desktop',
          impact: {
            problem: 'gravar guitarra exigia alternar entre câmera, backing tracks e referências.',
            result:
              'Este projeto é um desktop retrô inspirado no Windows XP e nas interfaces dos anos 2000. Ele serve como cenário interativo para fazer anotações de músicas, gravar performances e reproduzir backing tracks.'
          },
          publishedAt: '2026-08-14',
          repoUrl: 'https://github.com/abreulud/guitar_desktop',
          demoUrl: 'https://abreulud.github.io/guitar_desktop/',
          status: 'live',
          coverImage: '/project-media/guitar-desktop/desktop.webp',
          coverAlt: 'Guitar Desktop com webcam, player, anotações, arquivos e cifras abertas.',
          hasDetails: true
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
      profilePhoto: 'Photo of Ludmilla Abreu'
    },
    profile: {
      cardLabel: 'profile',
      roleStart: 'Computer Science student focused on',
      webSecurity: 'cybersecurity',
      roleConnector: 'and',
      backendDevelopment: 'back-end development',
      availability: 'available for projects and opportunities',
      stats: [
        { value: '4', label: 'CTFs completed' },
        { value: '0', label: 'write-ups published' },
        { value: '2+', label: 'years of experience' }
      ],
      socialLinks: [
        {
          label: 'download resume',
          href: '/CV%20-%20Ludmilla%20Abreu%20%28Tecnologia%29.pdf',
          glyph: '↓',
          primary: true,
          download: 'CV - Ludmilla Abreu (Tecnologia).pdf'
        },
        { label: 'linkedin', href: 'https://linkedin.com/in/ludmilla-abreu', glyph: '↗' },
        { label: 'github', href: 'https://github.com/abreulud', glyph: '⌘' }
      ]
    },
    posts: {
      eyebrow: '~/blog',
      sectionTitle: 'Recent posts',
      featuredLabel: 'featured write-up',
      readArticle: 'read article',
      viewAllPosts: 'view all posts',
      archiveTitle: 'All posts',
      archiveIntro:
        'Technical notes, research and write-ups on security, development and continuous learning.',
      inProgressLabel: 'in progress',
      placeholderLabel: 'coming soon',
      comingSoon: 'Coming soon',
      items: [
        {
          slug: 'oceansec-osint',
          title: 'OceanSec: Information Gathering Activity (OSINT)',
          excerpt:
            'An OSINT analysis of a fictional cybersecurity services company, mapping sensitive documents, repositories, assets and internal systems.',
          category: 'writeup',
          locked: true
        },
        {
          slug: 'next-publication',
          title: 'Next publication',
          excerpt: 'This space will be filled with new content soon.',
          category: 'learning',
          placeholder: true
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
      toolboxLabel: 'technologies & tools',
      entries: [
        {
          slug: 'security-researcher',
          period: 'Dec 2025 — present · 8 months',
          company: 'QuIIN',
          role: 'IT Researcher in Quantum Cryptography',
          description:
            'Research on integrating CV-QKD systems with classical networks, adapting TLS and PKI protocols for the consumption of cryptographic keys by quantum hardware. Development of a proxy to test REST APIs over HTTPS using post-quantum digital certificates, as well as technical reports and scientific documentation related to the research project.',
          skills: ['Go', 'Linux', 'TLS', 'PKI', 'REST API', 'Shell Script', 'VirtualBox']
        },
        {
          slug: 'technology-and-data',
          period: 'Dec 2024 — Dec 2025 · 1 year',
          company: 'Sicoob',
          role: 'Technology Intern',
          description:
            'Provided technical support to internal users with hardware, software, access and system issues. Participated in data migration, process automation and technical documentation projects.',
          skills: ['SQL Server', 'ASP.NET', 'JavaScript', 'AnyDesk', 'EDR CrowdStrike']
        },
        {
          slug: 'networks',
          period: 'Apr 2024 — Dec 2024 · 9 months',
          company: 'Saltur',
          role: 'IT Intern',
          description:
            'Provided hardware, software and network support, including switch maintenance and help desk requests. Also assisted with internal systems and the deployment of a government application during Carnival.',
          skills: ['GLPI', 'C#', 'HTML/CSS', 'Networking', 'Active Directory']
        },
        {
          slug: 'technical-support-unip',
          period: 'Nov 2023 — Apr 2024 · 6 months',
          company: 'UNIP',
          role: 'IT Intern',
          description:
            'Performed computer maintenance and formatting, and operating system installation. Updated documents in the university’s internal system and registered students’ biometric data, as well as supporting administrative routines.',
          skills: ['Hardware', 'Technical Support', 'Administration']
        }
      ],
      toolbox: [
        { label: '~/Development', items: ['Python', 'Go', 'JavaScript', 'SQL', 'REST API'] },
        { label: '~/Networks & Security', items: ['TCP/IP · DNS', 'TLS/PKI', 'Wireshark', 'Nmap', 'Burp Suite', 'EDR/XDR'] },
        { label: '~/Systems & Support', items: ['Linux', 'Windows', 'Docker', 'Grafana', 'Git/GitHub'] }
      ]
    },
    projects: {
      eyebrow: '~/projects',
      sectionTitle: 'My projects',
      pageEyebrow: '~/projects',
      pageTitle: 'My Builds',
      pageIntro:
        'Academic projects and digital experiences documented from the problem to implementation decisions.',
      newLabel: 'New!',
      liveLabel: 'available',
      inProgressLabel: 'in progress',
      problemLabel: 'Problem',
      resultLabel: 'Result',
      sourceCode: 'source code',
      viewDemo: 'view demo',
      viewProject: 'view project',
      backToProjects: 'back to projects',
      notFoundTitle: 'Project not found',
      notFoundText: 'This project does not exist or does not have a published page yet.',
      comingSoon: 'Coming soon',
      viewAllProjects: 'view all projects',
      items: [
        {
          slug: 'computer-science-capstone-project',
          index: '01',
          tag: 'TCC',
          title: 'Computer Science Capstone Project',
          topics: ['Cryptography', 'Proxy', 'TLS'],
          status: 'in-progress',
          locked: true
        },
        {
          slug: 'modelagem-computacional',
          index: '02',
          tag: 'machine learning',
          title: 'Computational modeling of energy consumption',
          impact: {
            problem: 'identify similar consumption and loss profiles in an unlabeled dataset.',
            result:
              'The goal of this project is to group neighborhoods and regions of Salvador by their electricity consumption profiles, making it possible to monitor which areas of the city consume the most energy.'
          },
          publishedAt: '2026-06-17',
          repoUrl: 'https://github.com/abreulud/ModelagemComputacional',
          status: 'live',
          coverImage: '/project-media/modelagem-computacional/capa-grafico-linha.png',
          coverAlt: 'Upward line chart representing a simulated evolution in energy consumption.',
          coverZoom: true,
          detailImage: '/project-media/modelagem-computacional/grafico-clusters.png',
          detailImageAlt:
            'Scatter plot of Salvador neighborhoods grouped by energy consumption profile.',
          hasDetails: true
        },
        {
          slug: 'guitar-desktop',
          index: '03',
          tag: 'web experience',
          title: 'Guitar Desktop',
          impact: {
            problem: 'recording guitar required switching between camera, backing tracks and references.',
            result:
              'This project is a retro desktop inspired by Windows XP and 2000s-era interfaces. It serves as an interactive setting for taking song notes, recording performances and playing backing tracks.'
          },
          publishedAt: '2026-08-14',
          repoUrl: 'https://github.com/abreulud/guitar_desktop',
          demoUrl: 'https://abreulud.github.io/guitar_desktop/',
          status: 'live',
          coverImage: '/project-media/guitar-desktop/desktop.webp',
          coverAlt: 'Guitar Desktop with webcam, player, notes, files and guitar tabs open.',
          hasDetails: true
        }
      ]
    },
    footer: {
      createdBy: 'Created by Ludmilla A.',
      location: 'Salvador, Brazil',
      availability: 'available for new projects'
    }
  }
}

export { sharedStack as techStack }
