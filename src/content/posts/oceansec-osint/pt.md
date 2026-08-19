# OceanSec: do domínio inicial à correlação de achados em uma investigação OSINT

> Atividade de Coleta de Informações da Pacific Sec · Módulo 1 · julho de 2026

## Introdução

Este texto reúne a minha experiência na atividade de OSINT do processo de capacitação e seleção da Pacific Sec. O alvo era a OceanSec, uma empresa fictícia, e o ponto de partida fornecido foi apenas o domínio `oceansec.com`.

Mais do que produzir uma lista de subdomínios, o objetivo era entender como as informações públicas se relacionavam. Um registro DNS podia levar a outro domínio; um comentário no código-fonte podia revelar um endpoint; e um repositório aparentemente esquecido podia fornecer a pista necessária para encontrar uma exposição mais relevante.

Ao revisar o meu relatório, percebi que eu já havia documentado bem a enumeração, a infraestrutura e três exposições importantes, mas deixei de registrar algumas etapas do caminho oficial. Por isso, este writeup separa o que foi validado durante a minha investigação das lacunas que identifiquei depois. Essa distinção é importante para não apresentar como evidência própria algo que eu não cheguei a confirmar na execução original.

## Escopo e regras da atividade

A investigação foi realizada entre 17 e 21 de julho de 2026, considerando apenas dados relacionados à OceanSec e aos domínios descobertos por evidências do próprio ecossistema.

O escopo permitia:

- pesquisa em mecanismos de busca, páginas públicas, código-fonte, DNS, certificados, repositórios e storages;
- enumeração passiva e brute force controlado de subdomínios;
- fuzzing moderado de diretórios e arquivos;
- validação de credenciais, tokens ou outros acessos válidos, caso fossem encontrados dentro do escopo.

Não utilizei scanners automatizados de vulnerabilidade nem ações destrutivas. Também tratei resultados passivos como candidatos até que pudessem ser relacionados a uma resposta DNS, HTTP ou a uma evidência direta. Quando encontrei placeholders, referências históricas ou respostas uniformes de bloqueio, não os classifiquei automaticamente como credenciais ou arquivos existentes.

Por se tratar de um texto para blog, não reproduzo dados pessoais, hashes, tokens ou credenciais. O foco está no raciocínio, na origem das evidências, na validação e no impacto.

## Como conduzi a investigação

Organizei o trabalho em quatro etapas:

1. reconhecimento inicial do domínio e do negócio;
2. descoberta e validação de domínios, subdomínios e serviços;
3. correlação entre páginas, código, repositórios e buckets;
4. análise do impacto e separação entre achados confirmados e hipóteses.

As principais ferramentas utilizadas foram Google Dorks, DevTools, WHOIS, `dig`, transparência de certificados, Subfinder, Amass, Gobuster DNS, `curl`, OpenSSL, FFUF, Git/GitHub, `wget`, `grep` e `ripgrep`.

## 1. Reconhecimento inicial

Comecei pelo domínio `oceansec.com`, realizando pesquisas pelo nome da empresa e por páginas indexadas. O site institucional levou a outros pontos de interesse, principalmente:

| Endereço | Função identificada |
| --- | --- |
| `oceansec.com` | Site institucional da empresa. |
| `dev.oceansec.com` | Portal de desenvolvimento e documentação técnica. |
| `labs.oceansec.com` | Laboratório e área de pesquisas. |
| `investidores.oceansec.com` | Área de Relações com Investidores. |

Também examinei o código-fonte, o `sitemap.xml`, o `robots.txt` e o `security.txt`. Esses arquivos ajudaram a encontrar caminhos administrativos, referências a ambientes de staging, contatos de segurança, o programa de Bug Bounty e páginas que não estavam necessariamente destacadas na navegação principal.

Na camada de infraestrutura, o WHOIS e os registros DNS indicaram o uso de GoDaddy com privacidade de registro, Cloudflare como camada de DNS e entrega, e Microsoft 365 para e-mail. A análise dos certificados mostrou um certificado wildcard para `*.oceansec.com`, enquanto os registros SPF, MX e TXT ajudaram a confirmar relações com serviços externos.

## 2. Enumeração e validação da superfície pública

Os nomes encontrados em buscas, certificados, páginas e repositórios foram tratados como candidatos. Depois, fiz uma enumeração DNS controlada para separar o que realmente resolvia do que aparecia apenas em fontes passivas.

O Gobuster confirmou nomes como:

```text
dev.oceansec.com
api.oceansec.com
intranet.oceansec.com
investidores.oceansec.com
labs.oceansec.com
vpn.oceansec.com
portal.oceansec.com
internal-git.oceansec.com
hml-web-01.oceansec.com
internal-k8s.oceansec.com
api-dev-finance.oceansec.com
```

Os subdomínios `dev`, `api`, `intranet`, `investidores`, `labs` e `vpn` foram validados por HTTP, com redirecionamento para HTTPS e resposta 200. Outros nomes apareceram na enumeração, mas não foram tratados como serviços públicos confirmados apenas por terem sido encontrados no DNS.

Também realizei fuzzing moderado no domínio principal. O FFUF confirmou `robots.txt` com HTTP 200. As demais respostas apresentaram o mesmo status 403 e o mesmo tamanho de resposta, então registrei o resultado como bloqueio inconclusivo. A validação manual de `/admin-portal/` retornou 404, o que foi documentado como resultado negativo, e não como indício de que o caminho existia.

### 2.1. Domínios relacionados

Na investigação original, correlacionei os seguintes domínios e hosts:

| Domínio ou host | Como se relacionou com a OceanSec | Situação registrada |
| --- | --- | --- |
| `oceansec.com` | Domínio fornecido no enunciado e validado por DNS, HTTP e TLS. | Confirmado. |
| `pessoas-oceansec.com` | Referenciado no ecossistema de documentação e relacionado ao gateway de pessoas. | Raiz acessível; o serviço dependia de um subdomínio específico. |
| `oceansec.github.io/oceansec-docs` | Página publicada a partir do repositório público `OceanSec/oceansec-docs`. | Confirmado. |

Uma lacuna importante da minha primeira versão foi não registrar o segundo domínio previsto no escopo: `oceansec.store`. O caminho oficial mostrava que ele poderia ser descoberto a partir de um registro TXT de `oceansec.com`, cujo valor em Base64 decodificava para `loja.oceansec.store`. A partir dele, ainda seria possível relacionar os subdomínios `admin`, `financeiro`, `crm`, `loja`, `cdn` e `checkout`, usando transparência de certificados e brute force DNS.

Essa descoberta reforça uma lição que ficou muito clara para mim: registros TXT não servem apenas para validar e-mail ou serviços. Eles também podem carregar referências operacionais e devem ser analisados como parte da superfície pública.

### 2.2. Pessoas, páginas e documentos

O domínio `pessoas-oceansec.com` indicava que existia um gateway de pessoas, mas a raiz informava que o serviço dependia de um subdomínio correto. O caminho oficial relacionava esse domínio a uma API de Recursos Humanos encontrada no código-fonte do portal de vagas:

```text
https://api-hr.pessoas-oceansec.com/api/colaboradores
```

Essa etapa não foi concluída na minha investigação original. Também não cheguei a documentar o Notion público associado ao domínio, que poderia ser encontrado por outro registro TXT após a descoberta do endpoint de Recursos Humanos. De acordo com o writeup oficial, esse Notion expunha referências à VPN, a servidores, ao domínio de status, a clientes estratégicos e ao bucket `logs-oceansec`.

Além das páginas da própria OceanSec, o material oficial indicava dois documentos públicos que poderiam ampliar a análise de negócio:

- um contrato simulado com a CorpBank;
- um relatório simulado de teste de invasão para a FinSecureWeb.

Esses documentos não foram incorporados ao meu relatório original. Caso eu refaça a atividade, pretendo começar a registrar desde o início a origem de cada documento, o que ele acrescenta ao mapa da empresa e se a informação foi apenas observada ou também validada em outra fonte.

## 3. Análise do negócio

Com as informações públicas e expostas, foi possível compreender a OceanSec como uma empresa fictícia de segurança da informação com atuação em diferentes frentes:

| Aspecto | Interpretação construída durante a investigação |
| --- | --- |
| O que é | Uma empresa de segurança com presença institucional, laboratório de pesquisa e áreas técnicas. |
| Serviços | Segurança ofensiva e defensiva, Bug Bounty, suporte, integrações e documentação técnica. |
| Estrutura | Engenharia, AppSec, Red Team, infraestrutura, TI, pessoas, investidores, suporte e operações. |
| Tecnologias | Cloudflare, AWS S3, CloudFront, API Gateway, EKS/Kubernetes, Jenkins, GitHub Pages, Microsoft 365, SSO, LDAP, MFA, CloudTrail e WAF. |
| Relações externas | AWS, Cloudflare, Microsoft 365, GitHub, Let's Encrypt e integrações com APIs de parceiros. |
| Modelo de negócio | O site apresentava serviços, planos e preços, mas não encontrei valores financeiros ou faturamento que pudessem ser validados. |

Também encontrei nomes de pessoas em documentos e repositórios, como Lucas Silva, Marcos Silva e Marta Carvalho, além de contatos de segurança publicados em `security.txt`. Não tratei esses nomes como confirmação de funcionários reais, pois o cenário era fictício e a fonte, sozinha, não sustentava essa conclusão.

## 4. Informações mapeadas

As principais informações identificadas foram:

- configuração de DNS, e-mail e serviços externos;
- certificado wildcard e nomes históricos relacionados à OceanSec;
- contatos de segurança, chave PGP e política de divulgação;
- páginas de desenvolvimento, investidores, laboratório, intranet e VPN;
- referências a LDAP, SSO, MFA, Jenkins, Kubernetes/EKS, APIs, staging e redes privadas;
- três repositórios públicos na organização da OceanSec;
- buckets S3 com listagem anônima e outros que retornavam 403;
- nomes de logs, regiões, aplicações, convenções internas e estruturas documentais.

O ponto central foi a correlação. Um nome isolado no DNS poderia parecer pouco relevante, mas ganhava contexto quando aparecia também em uma página, em um repositório ou no nome de um objeto armazenado na nuvem.

## 5. Achados confirmados na minha investigação

### 5.1. Listagem anônima de buckets S3

#### Onde encontrei

Os nomes dos buckets apareceram em documentação e comentários públicos, principalmente nas referências do DevHub a ambientes financeiros, sincronização entre staging e produção e caminhos de logs.

#### Como validei

Testei os nomes individualmente e comparei as respostas. Os buckets `assets-oceansec`, `logs-oceansec` e `ri-oceansec` retornaram HTTP 200 com respostas XML de `ListBucketResult`. Já `oceansec-red-ops-prod` e `oceansec-logs-temp` retornaram HTTP 403.

Essa comparação foi importante porque um 403 não prova que um bucket esteja publicamente listável. Da mesma forma, o 200 confirmou a listagem dos objetos, mas não significou que eu tivesse leitura anônima de todo o conteúdo.

#### O que ficou exposto

O bucket `logs-oceansec` listou objetos com nomes como:

```text
aws-cloudtrail-us-east-1-2026-06-18.jsonl
cliente-portal-app-2026-06-18.log
cliente.oceansec.internal-domain-2026-06-18.log
endpoint-sso-miami-q1-2026-06-18.log
vpn.oceansec.com-2026-06-18.log
```

O bucket `ri-oceansec` apresentou prefixos como `comunicados/`, `governanca/`, `relatorios/` e `reports/`.

Mesmo sem confirmar a leitura anônima do conteúdo de todos os objetos, os nomes já revelavam aplicações, regiões, rotinas de logging, ambientes internos e convenções de nomenclatura.

#### Impacto

Essa exposição reduziria o esforço necessário para um atacante mapear ativos e processos da empresa. Os metadados poderiam apoiar engenharia social, escolha de alvos e preparação de ataques direcionados.

### 5.2. Documentação técnica interna publicada

#### Onde encontrei

O material estava no repositório público `OceanSec/oceansec-docs` e também na página publicada em `oceansec.github.io/oceansec-docs/`, relacionada ao portal `dev.oceansec.com`.

#### Como validei

Clonei os repositórios para análise local e pesquisei os arquivos com `grep` e `ripgrep`. Isso permitiu manter a origem de cada informação e revisar os resultados sem repetir acessos desnecessários ao ambiente remoto.

#### O que ficou exposto

Entre as referências encontradas estavam:

- `internal-k8s.oceansec.com`;
- `hml-web-01.oceansec.com`;
- `api-dev-finance.oceansec.com`;
- `internal-git.oceansec.com`;
- os endereços privados `10.0.12.18` e `10.0.12.5`;
- a rede `10.0.99.0/24` e referências à faixa `10.0.45.x`;
- Kubernetes 1.27/EKS, Jenkins 2.150 e PHP 7.4.33;
- SSO, LDAP, MFA e APIs internas;
- sincronização entre os buckets `finance-prod` e `finance-staging`.

Os tokens observados eram placeholders. Por isso, não os classifiquei como credenciais válidas.

#### Impacto

A documentação diminuía o esforço para compreender a arquitetura, os fluxos de autenticação e os ambientes de maior interesse. Além do risco técnico, ela poderia ajudar na criação de pretextos convincentes para engenharia social.

### 5.3. Repositórios públicos com material sensível

#### Onde encontrei

A organização pública da OceanSec no GitHub mantinha três projetos relevantes:

- `OceanSec/oceansec-docs`;
- `OceanSec/reports`;
- `OceanSec/apt-evasion-toolkit`.

#### O que analisei

O repositório `reports` descrevia referências a JWT/HS256 legado, divulgação por DNS, staging, CI/CD, gateways, backups e diretórios `.git`. Já o `apt-evasion-toolkit` estava marcado no README como `RESTRICTED - OCEANSEC RED TEAM ONLY`, embora permanecesse público.

O projeto também expunha código e configurações de um loader C2, incluindo endpoint CloudFront, temporização e User-Agent. O token observado era um placeholder, não uma credencial atual confirmada.

Analisei tanto os arquivos atuais quanto o histórico Git e diferenciei arquivos do projeto de artefatos locais do clone, como `.git/hooks/*.sample`.

#### Impacto

A publicação revelava capacidades ofensivas, padrões de comunicação e problemas de segurança que, mesmo sem fornecer uma credencial válida, poderiam orientar reconhecimento, evasão e ataques direcionados.

## 6. Achados que ficaram fora da minha primeira versão

Esta é a parte que eu mais precisava organizar. Ao comparar o relatório com o writeup oficial, percebi que a minha investigação parou em exposições importantes, mas não avançou até algumas correlações que eram obrigatórias para a pontuação completa.

### 6.1. Arquivos de infraestrutura no bucket `assets-oceansec`

Eu confirmei a listagem do bucket `assets-oceansec`, mas não documentei a análise da pasta `Infra`. O caminho esperado era:

```text
assets-oceansec
  -> listagem dos objetos
  -> pasta Infra
  -> arquivos Terraform e variáveis
  -> informações internas e credenciais
```

Esse ponto deve ser tratado como uma lacuna da minha execução original, e não como um achado validado por mim. Em um ambiente real, arquivos de infraestrutura podem revelar arquitetura, nomes de recursos, segredos de autenticação e caminhos para obtenção de acesso inicial.

### 6.2. QR Code e senhas de Wi-Fi

Outra etapa prevista envolvia o bucket `oceansec-media-corp`, referenciado pela intranet. Entre os objetos havia imagens de eventos, fotos de equipamentos, crachás e um QR Code.

De acordo com o writeup oficial, o QR Code direcionava para um Notion com senhas de Wi-Fi de eventos e do escritório principal. A intranet também simulava a exposição de informações como endereço IP, número de AnyDesk e patrimônio de equipamento.

Eu não havia identificado nem validado esse encadeamento no relatório original. O impacto, caso confirmado, seria maior do que uma simples exposição de imagem, pois as senhas poderiam facilitar acesso à rede interna e funcionar como caminho de acesso inicial.

### 6.3. Exposição de `.git/config` e `backup.sql`

O repositório `reports` fornecia uma pista para procurar arquivos sensíveis em `api.oceansec.com`. Os caminhos esperados eram:

```text
https://api.oceansec.com/.git/config
https://api.oceansec.com/backup.sql
```

O `.git/config` expunha um token de acesso ao GitHub, uma referência à branch `oceansec` e o caminho para o repositório privado `core-api-internal`. O `backup.sql` continha informações internas e hashes de senha.

Eu mencionei referências a diretórios `.git` no repositório `reports`, mas não confirmei esses dois arquivos nos endpoints. Portanto, essa correlação também fica registrada aqui como etapa que faltou na minha investigação.

### 6.4. API de colaboradores e dados de 105 funcionários

Esse era um dos achados de maior complexidade. A correlação mínima esperada era:

```text
job-board
  -> endpoint api-hr.pessoas-oceansec.com/api/colaboradores
  -> api.oceansec.com/.git/config
  -> token do GitHub e branch oceansec
  -> repositório privado core-api-internal
  -> histórico da branch oceansec
  -> segredo usado para assinar JWT
  -> API de colaboradores
  -> dados de 105 funcionários
```

O objetivo não era apenas encontrar o endpoint, mas validar o encadeamento completo: obter o código do repositório privado, recuperar o segredo no histórico, gerar um JWT válido e demonstrar o acesso aos dados.

Eu não completei essa cadeia na execução original e não obtive os dados dos funcionários. O que o meu relatório demonstrou foi a existência de referências a pessoas, sistemas e documentação interna, mas não esse acesso autenticado.

### 6.5. Client Integration API e dados de 10 clientes

O segundo achado de maior complexidade partia de `academy.oceansec.com`, que não constou entre os ativos que eu havia validado. O fluxo esperado era:

```text
academy.oceansec.com
  -> endpoint integration-client-api.oceansec.com/v1/integrations
  -> algoritmo e emissor do JWT
  -> emissor oceansec-grafana-exporter
  -> grafana.oceansec.com
  -> reconstrução do segredo no datasource
  -> JWT válido
  -> dados de 10 clientes
```

Essa etapa mostrava como uma pista aparentemente pequena, como o valor do campo `iss`, podia conectar uma API a um Grafana e permitir a validação do impacto.

Assim como no caso da API de colaboradores, eu não executei essa cadeia na investigação original. Ela deve ser apresentada como uma etapa que ficou faltando, não como um acesso que eu realizei.

## 7. O que eu faria diferente em uma nova execução

Depois dessa revisão, eu mudaria principalmente a forma de registrar o trabalho:

1. manteria uma tabela única com `origem`, `evidência`, `status de validação` e `impacto`;
2. registraria todos os registros TXT antes de passar para a enumeração de subdomínios;
3. separaria desde o início domínios confirmados, candidatos passivos e recursos apenas referenciados;
4. acompanharia cada pista até o próximo ativo, em vez de encerrar a análise ao encontrar a primeira exposição;
5. revisaria o histórico Git e arquivos de configuração sempre que um repositório apontasse para outro ambiente;
6. documentaria claramente a diferença entre listar um objeto, ler o seu conteúdo e provar que um dado é válido;
7. preservaria as evidências com capturas, requisições e respostas, sempre sem reproduzir segredos ou dados pessoais no relatório final.

## Conclusão

A atividade me mostrou que OSINT não é apenas encontrar o maior número possível de subdomínios. O trabalho mais importante está em entender o contexto de cada descoberta e perceber quando duas informações, que parecem independentes, formam uma cadeia de risco.

Na minha execução, consegui mapear uma parte ampla da superfície pública da OceanSec, validar subdomínios e confirmar a listagem anônima de buckets, a publicação de documentação técnica interna e a existência de repositórios públicos com material sensível. Também aprendi a tratar resultados inconclusivos com mais cuidado: um 403 uniforme não prova que um arquivo existe, um placeholder não é uma credencial e um candidato passivo precisa de validação antes de entrar como ativo confirmado.

Ao comparar o meu trabalho com o writeup oficial, entendi também onde a investigação poderia ter avançado: `oceansec.store`, o Notion público, arquivos de infraestrutura, o QR Code com senhas de Wi-Fi, `.git/config`, `backup.sql` e as duas cadeias de APIs. Mesmo não tendo validado esses últimos achados na execução original, documentá-los agora tornou mais claro o que faltou e quais técnicas eu preciso praticar.

Como estudante de Ciência da Computação, considero que essa foi a principal contribuição da atividade para a minha formação: aprender a transformar observações dispersas em hipóteses verificáveis, validar o impacto com responsabilidade e escrever as conclusões de forma que outra pessoa consiga acompanhar o raciocínio.

## Modelagem de ameaças

Como complemento à investigação de OSINT, também analisei a OceanSec pela perspectiva de modelagem de ameaças. Essa etapa ajudou a transformar os achados técnicos em cenários de risco e a entender por que determinadas exposições seriam especialmente relevantes para o negócio.

### Core do negócio

A OceanSec é uma empresa de soluções de segurança da informação que oferece serviços de segurança ofensiva, defensiva e infraestrutura tecnológica para outras empresas. Por trabalhar com clientes corporativos, o seu negócio depende diretamente da confiança.

Isso significa que a confidencialidade das informações processadas, como relatórios, dados de clientes, configurações, integrações e conteúdos da intranet, é essencial. A integridade das ferramentas próprias e dos ambientes de nuvem também é importante, pois uma alteração nesses componentes poderia afetar tanto a operação interna quanto os clientes atendidos.

Por esse motivo, uma exposição não representaria apenas um problema técnico isolado. Ela poderia comprometer a credibilidade da empresa e a confiança que sustenta o seu relacionamento com outras organizações.

### Objetivos de um possível atacante

Com base na superfície identificada, considerei dois objetivos principais:

1. **Vazamento de dados corporativos:** obter bases com informações sensíveis de clientes e dados pessoais de funcionários, buscando lucro por extorsão ou venda de informações na Dark Web.
2. **Infiltração na cadeia de suprimentos:** comprometer o ambiente interno ou as ferramentas de desenvolvimento da OceanSec, como o `apt-evasion-toolkit`, e aproveitar a confiança da empresa para distribuir código malicioso ou atingir redes de parceiros.

O segundo cenário é especialmente preocupante para uma empresa de segurança. O impacto não ficaria limitado aos sistemas da OceanSec, porque uma ferramenta, atualização ou integração comprometida poderia alcançar outras organizações.

### Ativos primários e secundários

Separei os ativos em duas categorias: os que concentram o valor principal do negócio e os que podem funcionar como ponto de entrada ou apoio para um ataque.

#### Ativos primários

- APIs críticas, como `integration-client-api.oceansec.com` e `api-hr.pessoas-oceansec.com`, que processariam dados pessoais de funcionários e informações de integrações;
- repositórios privados de código, especialmente `core-api-internal`, além das ferramentas relacionadas ao Red Team;
- banco de dados de clientes e topologias de rede, que poderiam conter informações sigilosas das empresas atendidas;
- sistemas internos de monitoramento, operação e gestão.

#### Ativos secundários

- buckets S3 públicos ou expostos, como `assets-oceansec`, `logs-oceansec` e `oceansec-media-corp`;
- portais, subdomínios e infraestrutura pública, incluindo `academy.oceansec.com`, `grafana.oceansec.com`, o portal de vagas e servidores web;
- gateways VPN e serviços de acesso remoto;
- artefatos vazados, como `.git/config`, QR Codes em fotos corporativas e chaves antigas armazenadas no código.

Essa separação mostra que um ativo secundário, como um bucket ou um arquivo de configuração, pode ser tão importante quanto o ativo final. Mesmo que ele não contenha diretamente a base de clientes, pode fornecer credenciais, contexto ou acesso para chegar até ela.

### Caminhos de ataque

#### Objetivo 1: vazamento de dados corporativos

**Caminho 1 - Autenticação a partir de uma chave exposta no código-fonte**

```text
.git/config em api.oceansec.com
  -> token do GitHub
  -> repositório privado core-api-internal
  -> histórico de commits
  -> segredo usado para assinar o JWT
  -> token de autenticação forjado
  -> acesso indevido à API de colaboradores
  -> exfiltração de dados de funcionários
```

Esse caminho reúne várias das lacunas que identifiquei ao revisar o meu relatório. O risco não estaria apenas no arquivo `.git/config`, mas na possibilidade de usar a credencial exposta para alcançar um repositório privado e recuperar um segredo no histórico.

**Caminho 2 - Reconstrução de token em uma ferramenta de visualização**

```text
academy.oceansec.com
  -> identificação do emissor de tokens
  -> grafana.oceansec.com
  -> endpoint de drilldown
  -> recuperação do segredo JWT do painel
  -> criação de token forjado
  -> consumo não autorizado da Client Integration API
  -> exfiltração de dados de clientes
```

Nesse cenário, o valor do campo `iss` funcionaria como uma pista para relacionar a API ao Grafana. Uma informação aparentemente pequena, quando combinada com um endpoint exposto, poderia permitir a construção de um token válido.

#### Objetivo 2: infiltração na cadeia de suprimentos

**Caminho 1 - Comprometimento da infraestrutura de nuvem**

```text
listagem anônima de assets-oceansec
  -> arquivos Terraform e variáveis na pasta Infra
  -> credenciais AWS em texto claro
  -> acesso ao ambiente corporativo de nuvem
  -> alteração de código nos ambientes de deploy
  -> distribuição de software malicioso para clientes
```

Esse caminho mostra por que a simples listagem de um bucket não deveria ser tratada como um achado superficial. Se os arquivos de infraestrutura contiverem credenciais válidas, a exposição pode evoluir de reconhecimento para comprometimento do ambiente de nuvem e da cadeia de entrega.

**Caminho 2 - Engenharia social a partir de mídia pública**

```text
fotos corporativas em oceansec-media-corp
  -> QR Code visível em uma imagem
  -> quadro público do Notion
  -> referências à VPN e senhas de Wi-Fi interno
  -> acesso não autorizado à rede física ou à VPN
  -> movimentação lateral
  -> comprometimento de código-fonte e sistemas internos
```

Esse cenário evidencia que imagens e materiais de eventos também fazem parte da superfície de exposição. Um detalhe no fundo de uma foto pode conter uma informação mais sensível do que o conteúdo principal da publicação.

### Considerações finais da modelagem

A modelagem de ameaças complementou a investigação porque ajudou a conectar ativos, objetivos e caminhos de ataque. Os achados de OSINT deixaram de ser apenas uma lista de domínios, buckets e repositórios e passaram a representar possíveis etapas de uma intrusão.

O principal aprendizado foi perceber que o risco aumenta quando uma exposição secundária permite alcançar um ativo primário. Um arquivo de configuração pode levar a um repositório privado; um repositório pode levar a um segredo; e um segredo pode permitir acesso a dados de clientes ou funcionários.

## Referência

- [Writeup oficial da atividade OceanSec](https://github.com/PacificSecurity/oceansec_writeup)
