/**
 * Todo o texto do site, em português (pt) e inglês (en).
 * Para editar o portfólio, quase sempre basta mexer neste arquivo.
 *
 * Projetos profissionais estão anonimizados: sem nome da empresa, de clientes
 * ou números do negócio. Os painéis demo usam uma empresa fictícia e dados sintéticos.
 */

export type Lang = 'pt' | 'en'

export type Capability = { title: string; text: string; tools: string[] }
export type Experience = { company: string; role: string; period: string; current?: boolean; bullets: string[] }
export type Link = { label: string; url: string; primary?: boolean }
export type CaseStudy = {
  id: string
  title: string
  /** Rótulo curto da aba. */
  tab: string
  kind: string
  status?: string
  summary: string
  problem: string
  outcomes: string[]
  /** Etapas do fluxo, desenhadas como diagrama. */
  flow?: string[]
  tags: string[]
  tech: string[]
  code?: { caption: string; snippet: string }
  /** Galeria do painel esquerdo: prints, fluxo, números antes/depois e código. */
  gallery: Slide[]
  links?: Link[]
}
export type Slide =
  | { kind: 'image'; src: string; caption: string }
  | { kind: 'flow'; caption: string }
  | { kind: 'code'; caption: string }
  | { kind: 'metric'; caption: string; items: { before: string; after: string; label: string }[] }
export type SideProject = {
  id: string
  title: string
  kind: string
  text: string
  tags: string[]
  url?: string
}
export type StackGroup = { group: string; items: string[] }
export type Certification = { title: string; issuer: string; meta?: string; url?: string }
export type Fact = { label: string; value: string }
export type Stat = { value: string; label: string }
export type Stage = { title: string; sub: string }

export type Content = {
  meta: { title: string; description: string }
  ui: {
    nav: { about: string; work: string; experience: string; projects: string; tv: string; contact: string }
    seeProjects: string
    downloadCv: string
    themeLight: string
    themeDark: string
    switchLang: string
    photoAlt: string
    lens: { role: string; summary: string; hint: string }
    tv: { title: string; lead: string; next: string; prev: string; channel: string; channels: { code: string; text: string }[] }
    pipeline: { title: string; caption: string; stages: Stage[]; alt: string }
    about: { title: string; lead: string; tabs: { who: string; path: string; stack: string; certs: string } }
    work: { title: string; lead: string }
    experience: { title: string; lead: string }
    projects: {
      title: string
      lead: string
      note: string
      dataGroup: string
      devGroup: string
      problem: string
      outcomes: string
      details: string
      flow: string
      openDemo: string
      code: string
      previewOf: string
      hint: string
      of: string
      prevProject: string
      nextProject: string
    }
    stack: { title: string; lead: string }
    certifications: { title: string; lead: string }
    github: { title: string; lead: string; error: string; seeOnGitHub: string; all: string; noDescription: string; updated: string }
    contact: { title: string; text: string }
    footer: { madeWith: string; data: string; dimension: string; ducks: string }
  }
  profile: { name: string; short: string; status: string; role: string; summary: string; location: string }
  about: string[]
  facts: Fact[]
  capabilities: Capability[]
  experience: Experience[]
  stats: Stat[]
  cases: CaseStudy[]
  side: SideProject[]
  stack: StackGroup[]
  certifications: Certification[]
}

export const links = {
  email: 'josevmartines2@gmail.com',
  github: 'https://github.com/JoseViniciusMM',
  githubUser: 'JoseViniciusMM',
  linkedin: 'https://www.linkedin.com/in/josemmartines/',
  /** Coloque a foto em public/foto.jpg (retrato 4:5). Sem o arquivo, aparece o card com as iniciais. */
  photo: 'foto.jpg',
  /** Coloque o currículo em public/curriculo.pdf. Sem o arquivo, o botão some. */
  cv: 'curriculo.pdf',
}

const gh = (repo: string) => `https://github.com/JoseViniciusMM/${repo}`

const normalizarSnippet = `def normalizar_colunas(df):
    """Reconstrói 'Métrica (unidade)' a partir da coluna
    'Unidade' vizinha e limpa cabeçalhos duplicados."""
    novas, cols = [], list(df.columns)
    for i, col in enumerate(cols):
        nome = re.sub(r"\\.\\d+$", "", str(col)).strip()
        if nome.startswith("Unidade"):
            continue
        prox = cols[i + 1] if i + 1 < len(cols) else ""
        if str(prox).startswith("Unidade"):
            unidade = df[prox].dropna().astype(str).iloc[0]
            nome = f"{nome} ({unidade.strip()})"
        novas.append((col, nome))
    return df[[c for c, _ in novas]].set_axis(
        [n for _, n in novas], axis=1)`

const daxSnippet = `-- Calendário explícito no lugar de CALENDARAUTO()
Calendario =
ADDCOLUMNS (
    CALENDAR ( DATE ( 2022, 1, 1 ), DATE ( 2027, 12, 31 ) ),
    "AnoFiscal", "FY " & ( YEAR ( [Date] ) + IF ( MONTH ( [Date] ) >= 11, 1, 0 ) ),
    "AnoMes", YEAR ( [Date] ) * 100 + MONTH ( [Date] )
)`

const pt: Content = {
  meta: {
    title: 'José Vinícius Martines | Analista de Dados & BI',
    description:
      'Portfólio de José Vinícius Martines, analista de dados e desenvolvedor. Python, SQL Server, Power BI, automação e APIs.',
  },
  ui: {
    nav: { about: 'Sobre', work: 'O que faço', experience: 'Trajetória', projects: 'Projetos', tv: 'Dimensões', contact: 'Contato' },
    seeProjects: 'Ver projetos',
    downloadCv: 'Baixar currículo',
    themeLight: 'Ativar modo claro',
    themeDark: 'Ativar modo escuro',
    switchLang: 'Switch to English',
    photoAlt: 'Foto de José Vinícius Martines',
    lens: {
      role: 'Domador de planilhas e de robôs',
      summary: 'Em outra dimensão, um clique resolve tudo. Nesta aqui eu automatizo, confiro a fonte e documento a regra.',
      hint: 'passe o mouse no texto: é a versão de outra dimensão',
    },
    tv: {
      title: 'Enquanto isso, em outras dimensões',
      lead: 'TV a cabo interdimensional. Troque de canal para ver como seria meu trabalho em outras realidades.',
      next: 'Próximo canal',
      prev: 'Canal anterior',
      channel: 'Canal',
      channels: [
        { code: 'C-137', text: 'Esta aqui. Tudo funciona, mas eu confiro a fonte mesmo assim.' },
        { code: 'J-19', text: 'As planilhas chegam com o cabeçalho padronizado. Todas. Sempre.' },
        { code: 'R-7', text: 'O robô em Selenium não quebra quando o site muda de layout.' },
        { code: 'BI-35', text: 'Ninguém pede "só mais uma coluna" no relatório na sexta às 17h.' },
        { code: 'D-6', text: 'Todo dado é um dado de seis faces e a análise sai no sorteio.' },
        { code: 'PATO-1', text: 'Os patos fazem o ETL. Eu só reviso o pull request.' },
      ],
    },
    pipeline: {
      title: 'Por onde o dado passa no meu trabalho',
      caption: 'Do portal ao WhatsApp do gestor',
      stages: [
        { title: 'Fontes', sub: 'portais, APIs, ERP' },
        { title: 'Coleta', sub: 'robôs em Python' },
        { title: 'Banco', sub: 'SQL Server' },
        { title: 'Modelo', sub: 'Power BI e DAX' },
        { title: 'Entrega', sub: 'painel, WhatsApp, e-mail' },
      ],
      alt: 'Fluxo de dados: fontes como portais, APIs e ERP; coleta com robôs em Python; gravação no SQL Server; modelo no Power BI; entrega por painel, WhatsApp e e-mail',
    },
    about: {
      title: 'Sobre',
      lead: 'Quem sou, por onde passei, com o que trabalho e o que estudei.',
      tabs: { who: 'Quem sou', path: 'Trajetória', stack: 'Stack', certs: 'Certificações' },
    },
    work: { title: 'O que eu faço', lead: 'Cada área com as ferramentas que uso nela.' },
    experience: { title: 'Trajetória', lead: 'Do suporte de TI à análise e engenharia de dados.' },
    projects: {
      title: 'Projetos',
      lead: 'Do dado bruto à entrega: coleta, banco, modelo e automação.',
      note: 'Os projetos profissionais estão anonimizados: sem nome da empresa, de clientes ou números do negócio. Os painéis demo usam a Norte Máquinas, uma empresa fictícia, com dados sintéticos gerados em Python.',
      dataGroup: 'Dados',
      devGroup: 'Além dos painéis',
      problem: 'O problema',
      outcomes: 'O que eu fiz',
      details: 'Detalhes técnicos',
      flow: 'Fluxo',
      openDemo: 'Abrir painel demo',
      code: 'Código',
      previewOf: 'Prévia do painel',
      hint: 'Em cada projeto: o problema, o que eu fiz, os detalhes técnicos e, quando tem, o painel demo para clicar.',
      of: 'de',
      prevProject: 'Projeto anterior',
      nextProject: 'Próximo projeto',
    },
    stack: { title: 'Stack', lead: 'A família: ferramentas de confiança, cada uma no seu lugar.' },
    certifications: { title: 'Certificações', lead: 'Cursos ligados a dados e desenvolvimento. Os que têm seta abrem a credencial verificável.' },
    github: {
      title: 'No GitHub',
      lead: 'Repositórios públicos com atividade recente, direto da API.',
      error: 'Os repositórios não carregaram agora.',
      seeOnGitHub: 'Ver direto no GitHub',
      all: 'Todos os repositórios',
      noDescription: 'Sem descrição.',
      updated: 'atualizado',
    },
    contact: {
      title: 'Vamos conversar?',
      text: 'Quer trocar ideia sobre dados, automação, Power BI ou algum projeto? Me chama por e-mail ou LinkedIn.',
    },
    footer: {
      madeWith: 'Feito com React, TypeScript e Tailwind. Hospedado no GitHub Pages.',
      data: 'Painéis demo com dados sintéticos.',
      dimension: 'Feito nesta dimensão. Provavelmente.',
      ducks: 'Uma família de patos atravessando o rodapé',
    },
  },
  profile: {
    name: 'José Vinícius Martines',
    short: 'José Vinícius',
    status: 'Python · SQL Server · Power BI · automação',
    role: 'Analista de Dados & BI',
    summary:
      'Construo pipelines em Python e SQL Server, modelos Power BI e automações que levam o dado de portais e APIs até a mão de quem decide.',
    location: 'Vilhena, Rondônia',
  },
  about: [
    'Sou analista de dados em Vilhena, Rondônia. Cuido do caminho inteiro do dado: robôs que coletam de portais e APIs, banco SQL Server, modelos Power BI e automações que entregam os números por WhatsApp e e-mail para quem decide.',
    'Gosto de soluções simples e diretas, de conferir o número com a fonte e de documentar regras e decisões para que o próximo consiga continuar. Em paralelo, curso Análise e Desenvolvimento de Sistemas no IFRO, onde construo APIs, aplicações web e testes.',
  ],
  facts: [
    { label: 'Graduação', value: 'Análise e Desenvolvimento de Sistemas, IFRO (2025, em andamento)' },
    { label: 'Técnico', value: 'Informática, IFRO (2020–2022)' },
    { label: 'Local', value: 'Vilhena, Rondônia' },
    { label: 'Idiomas', value: 'Português nativo, inglês básico (em estudo)' },
  ],
  capabilities: [
    {
      title: 'Pipelines e ETL',
      text: 'Levo dados de APIs, planilhas e portais para o SQL Server, com normalização, carga em lote e log de erros.',
      tools: ['Python', 'pandas', 'SQL Server', 'pyodbc', 'APIs REST'],
    },
    {
      title: 'Power BI e modelagem',
      text: 'Modelos que respondem rápido e batem com a fonte: calendário fiscal, relacionamentos sem ambiguidade e DAX revisado.',
      tools: ['Power BI', 'DAX', 'Power Query', 'Modelagem dimensional'],
    },
    {
      title: 'Automação e RPA',
      text: 'Robôs que fazem o trabalho repetitivo em portais web que não têm API, com tratamento para quando a tela muda.',
      tools: ['Selenium', 'Python', 'Agendador de tarefas'],
    },
    {
      title: 'Integrações e entrega',
      text: 'O relatório chega pronto para quem precisa: exportação do Power BI por API e envio por WhatsApp e e-mail.',
      tools: ['Power BI REST API', 'WhatsApp API', 'SMTP', 'Microsoft Graph', 'SharePoint'],
    },
    {
      title: 'Desenvolvimento web e APIs',
      text: 'APIs REST, front ends e testes, construídos na graduação e em projetos próprios.',
      tools: ['Node.js', 'TypeScript', 'React', 'Next.js', 'MongoDB', 'Kotlin'],
    },
    {
      title: 'Documentação e regras',
      text: 'Regras de negócio, fontes e decisões registradas num vault de conhecimento, para o número ter explicação.',
      tools: ['Obsidian', 'Markdown', 'Claude Code', 'MCP'],
    },
  ],
  experience: [
    {
      company: 'Rede de concessionárias de máquinas agrícolas e de construção',
      role: 'Analista de Dados (CSC)',
      period: 'abr/2026 – atual',
      current: true,
      bullets: [
        'Pipelines em Python e SQL Server com dados de telemetria, laboratório de óleo, ERP e plataformas do fabricante.',
        'Modelos Power BI para o pós-venda: saúde da frota, licenças, contratos de garantia estendida, carteira e conexão do parque.',
        'Automação do envio semanal de indicadores por WhatsApp e e-mail, com recorte por supervisor.',
        'Correção de performance e de regras em modelos Power BI existentes, com as decisões documentadas.',
      ],
    },
    {
      company: 'Rede de concessionárias de máquinas agrícolas e de construção',
      role: 'Analista de Customer Experience',
      period: 'mai/2025 – abr/2026',
      bullets: [
        'Pesquisas de satisfação (NPS) de serviços e painel de acompanhamento em Power BI.',
        'Sincronização de chamados técnicos por API com o SQL Server.',
        'Manual de procedimentos da área e rotinas de BI.',
      ],
    },
    {
      company: 'EFA Itapirem, Ji-Paraná (RO)',
      role: 'Técnico de TI',
      period: 'abr/2023 – jan/2024',
      bullets: ['Help desk, redes e manutenção de equipamentos.', 'Aulas de informática para os alunos.'],
    },
  ],
  stats: [
    { value: '7', label: 'estudos de caso em dados' },
    { value: '4', label: 'robôs de coleta' },
    { value: '2', label: 'painéis demo interativos' },
    { value: '6', label: 'projetos de software' },
  ],
  cases: [
    {
      id: 'envio',
      title: 'Envio automático de BI por WhatsApp e e-mail',
      tab: 'Envio de BI',
      gallery: [
        { kind: 'image', src: 'projects/nps-1.png', caption: 'Indicadores do ciclo e grupos por filial' },
        { kind: 'image', src: 'projects/nps-2.png', caption: 'Tabela do e-mail e prévia do WhatsApp por supervisor' },
        { kind: 'flow', caption: 'Do Power BI à mensagem, sem arquivo no disco' },
      ],
      kind: 'Automação e APIs',
      summary: 'Toda sexta, cada supervisor recebe no WhatsApp a tabela das suas filiais, e a gestão recebe o geral por e-mail.',
      problem:
        'A performance das pesquisas de satisfação era repassada à mão: abrir o painel, filtrar, tirar print e mandar para cada pessoa. Tomava tempo e às vezes saía com o filtro errado.',
      outcomes: [
        'Exportação da página pela API do Power BI com Service Principal, recorte do visual na memória e envio, sem salvar arquivo no disco.',
        'WhatsApp por API com **filtro por supervisor**: cada um recebe só as suas filiais. E-mail com a tabela no corpo e o PDF em anexo.',
        'Chave liga/desliga por canal, período acumulado do ciclo e tarefa agendada no servidor.',
        'Dois comportamentos da API (filtro ignorado numa página e posição do recorte) documentados como soluções reutilizáveis.',
      ],
      flow: ['Power BI Service', 'API ExportTo', 'Recorte em memória', 'WhatsApp e e-mail'],
      tags: ['Python', 'Power BI REST API', 'Service Principal', 'WhatsApp API', 'SMTP', 'Interativo'],
      tech: [
        'Autenticação de aplicativo (Service Principal), sem depender do login de uma pessoa.',
        'Filtros passados na exportação; a imagem é recortada pelas coordenadas do visual na página.',
        'Configuração por arquivo .env: canais, listas e recorte, sem mexer no código.',
        'O painel demo mostra os indicadores e a prévia da mensagem que cada supervisor recebe.',
      ],
      links: [
        { label: 'Abrir painel demo', url: 'demos/nps.html', primary: true },
        { label: 'Código', url: 'https://github.com/JoseViniciusMM/JoseViniciusMM.github.io/tree/main/public/demos' },
      ],
    },
    {
      id: 'robos',
      title: 'Robôs de coleta das plataformas do fabricante',
      tab: 'Robôs de coleta',
      gallery: [
        { kind: 'metric', caption: 'Antes e depois das correções', items: [{ before: '8 de 192', after: '168 de 168', label: 'colunas reconhecidas na planilha' }, { before: 'MERGE por linha', after: 'lotes de 1.000', label: 'sincronização de chamados' }, { before: 'rollback do arquivo', after: 'commit parcial + log', label: 'linhas duplicadas na carga' }] },
        { kind: 'code', caption: 'Normalização dos cabeçalhos' },
        { kind: 'flow', caption: 'Do portal ao banco' },
      ],
      kind: 'RPA e engenharia de dados',
      summary: 'Telemetria, chamados técnicos e licenças, que só existiam em portais web, passaram a chegar sozinhos ao banco.',
      problem:
        'Relatórios de telemetria das máquinas, chamados técnicos e licenças ficavam em portais diferentes do fabricante. Alguém baixava as planilhas à mão, e a carga no banco falhava sem avisar.',
      outcomes: [
        'Robôs em Python e Selenium para telemetria, portal de casos e gestão de licenças. Onde existe API, uso a API.',
        'Sincronização de chamados trocou um MERGE linha a linha por UPDATE e INSERT em lote, em **blocos de 1.000**.',
        'Normalização dos cabeçalhos da planilha de telemetria: de **8 para 168** das 168 colunas esperadas reconhecidas.',
        'Commit parcial com resumo agrupado dos erros, no lugar do rollback que descartava o arquivo inteiro por poucas linhas duplicadas.',
      ],
      flow: ['Portais e APIs', 'Robô Python', 'Normalização', 'SQL Server'],
      tags: ['Python', 'Selenium', 'SQL Server', 'pyodbc', 'Microsoft Graph', 'IBGE API'],
      tech: [
        'Telas React/MUI: iframes que mudam de nome, pop-ups de onboarding, StaleElementReference e modais de exportação em duas etapas.',
        'Integração com SharePoint via Microsoft Graph, com paginação, e geocodificação de cidades pela API do IBGE.',
        'Variáveis de ambiente lidas na hora da chamada, timeout em toda requisição e transação com rollback.',
        'Logs com servidor e banco de destino, para descartar gravação no lugar errado.',
      ],
      code: { caption: 'Normalização dos cabeçalhos da planilha de telemetria (trecho simplificado)', snippet: normalizarSnippet },
    },
    {
      id: 'oleo',
      title: 'Saúde da frota por análise de óleo',
      tab: 'Saúde da frota',
      gallery: [
        { kind: 'image', src: 'projects/oleo-1.png', caption: 'Visão geral com filtros de período, filial e segmento' },
        { kind: 'image', src: 'projects/oleo-2.png', caption: 'Condição por família e tempo do laudo até a OS' },
        { kind: 'image', src: 'projects/oleo-3.png', caption: 'Lista de ação: críticos sem ordem de serviço' },
        { kind: 'flow', caption: 'Caminho do dado, do laboratório ao pós-venda' },
      ],
      kind: 'ETL, SQL Server e Power BI',
      summary: 'Laudos de laboratório cruzados com o ERP e o parque de máquinas, para transformar laudo crítico em atendimento.',
      problem:
        'Os laudos de análise de óleo ficavam num portal do laboratório, longe do ERP e do cadastro de máquinas. Ninguém via, num lugar só, quais máquinas estavam críticas, em que filial, e se o laudo virou serviço.',
      outcomes: [
        'ETL em Python que lê laudos e status pela API do laboratório e grava no SQL Server, no lugar da planilha intermediária.',
        'Cruzamento **laudo × parque × ERP** pelo chassi normalizado, com uma tabela de vínculo. Os chassis sem par viraram lista de correção na fonte.',
        'Funil do laudo ao atendimento e uma coluna de tratativa por laudo, que resolveu a lentidão da tabela de tratativas.',
        'Calendário fiscal de novembro a outubro, visão R12 e regras de negócio documentadas uma a uma.',
      ],
      flow: ['API do laboratório', 'ETL em Python', 'SQL Server', 'Modelo Power BI', 'Lista de ação do pós-venda'],
      tags: ['Python', 'SQL Server', 'Power BI', 'DAX', 'API REST', 'Interativo'],
      tech: [
        'Chave de cruzamento: chassi em maiúsculas e sem espaços, igual nas três fontes.',
        'Status da amostra separado do resultado: abertas e canceladas vêm da listagem de status, finalizadas vêm dos laudos.',
        'Amostra ainda no cliente fica fora do painel por decisão de negócio.',
        'Segunda fase em andamento: ordens de serviço do ERP com chassi, para medir o atendimento após o laudo de forma exata.',
      ],
      links: [
        { label: 'Abrir painel demo', url: 'demos/oleo.html', primary: true },
        { label: 'Código', url: 'https://github.com/JoseViniciusMM/JoseViniciusMM.github.io/tree/main/public/demos' },
      ],
    },
    {
      id: 'modelagem',
      title: 'Performance e regras em modelos Power BI',
      tab: 'Modelos Power BI',
      gallery: [
        { kind: 'metric', caption: 'Antes e depois no modelo', items: [{ before: '149 de 188', after: '0', label: 'tabelas de data automáticas no modelo' }, { before: '≈ 2,9 milhões', after: '2.191', label: 'linhas no calendário' }] },
        { kind: 'code', caption: 'Calendário com ano fiscal' },
        { kind: 'flow', caption: 'Como cada correção foi feita' },
      ],
      kind: 'Modelagem e DAX',
      summary: 'Modelos de pós-venda mais leves, com relacionamentos sem ambiguidade e números que batem com a fonte.',
      problem:
        'Modelos grandes demoravam a responder e alguns gráficos mostravam períodos errados ou clientes faltando. As regras de cálculo estavam só na cabeça de quem montou.',
      outcomes: [
        'Auto Date/Time desligado: **149 das 188** tabelas do modelo eram tabelas de data automáticas.',
        'Calendário trocado de CALENDARAUTO(), que gerava cerca de **2,9 milhões** de linhas, por um CALENDAR explícito com ano fiscal.',
        'Relacionamentos ambíguos em torno de uma tabela central M:N resolvidos com chaves de data truncada e USERELATIONSHIP.',
        'Regras de conversão, de máquina atendida e de conexão da telemetria escritas e aprovadas com a gestão.',
      ],
      flow: ['Diagnóstico', 'Correção no modelo', 'Conferência com a fonte', 'Regra documentada'],
      tags: ['Power BI', 'DAX', 'Power Query', 'Modelagem dimensional', 'MCP'],
      tech: [
        'Leitura e edição do modelo pelo Power BI Modeling MCP, conectado ao Power BI Desktop.',
        'Painel de NPS com mais de 100 medidas DAX, seis dimensões auxiliares e uma chave sintética para as OS sem número de chamado.',
        'Medidas lentas identificadas (FILTER linha a linha e TODAY() volátil) e listadas para reescrita.',
        'Plano de correção antes de mudar o modelo, com totais conferidos depois.',
      ],
      code: { caption: 'Calendário com ano fiscal de novembro a outubro (exemplo)', snippet: daxSnippet },
    },
    {
      id: 'aor',
      title: 'Mapa de área de atuação',
      tab: 'Mapa de atuação',
      gallery: [
        { kind: 'flow', caption: 'Das fronteiras do IBGE ao mapa no Power BI' },
      ],
      kind: 'Geodados e Power BI',
      summary: 'Fronteiras dos estados geradas em Python para desenhar a área de atuação de cada filial no Power BI.',
      problem: 'O mapa do Power BI não tinha os contornos dos estados atendidos, e a área de cada filial era explicada em planilha.',
      outcomes: [
        'Script com geopandas e a API do IBGE que gera o GeoJSON dos estados.',
        'Camada de referência no Azure Maps do Power BI, com borda e preenchimento ajustados.',
        'Fonte da tabela de atuação lida de uma pasta do SharePoint.',
      ],
      flow: ['API do IBGE', 'geopandas', 'GeoJSON', 'Azure Maps no Power BI'],
      tags: ['Python', 'geopandas', 'IBGE API', 'Power BI', 'SharePoint'],
      tech: ['Polígonos simplificados para o arquivo ficar leve no relatório.', 'Conector de pasta do SharePoint para a planilha de atuação.'],
    },
    {
      id: 'chassi',
      title: 'Enriquecimento de contatos por chassi',
      tab: 'Contatos por chassi',
      gallery: [
        { kind: 'flow', caption: 'Do nome escrito de vários jeitos ao telefone na base' },
      ],
      kind: 'Qualidade de dados',
      summary: 'Telefones de clientes trazidos para a base de equipamentos, mesmo com nomes escritos de jeitos diferentes.',
      problem: 'A base de equipamentos não tinha telefone, e o nome do mesmo cliente aparecia escrito de formas diferentes em cada planilha.',
      outcomes: [
        'Correspondência aproximada de nomes com rapidfuzz (token_sort_ratio, **limiar de 85**).',
        'Projeto separado em carga, cruzamento, exportação e aplicação.',
      ],
      flow: ['Base de equipamentos', 'Base de contatos', 'Fuzzy matching', 'Base enriquecida'],
      tags: ['Python', 'pandas', 'rapidfuzz'],
      tech: ['Módulos loader, merger, exporter e app.', 'Limiar escolhido olhando os pares aceitos e recusados perto do corte.'],
    },
    {
      id: 'vida',
      title: 'Vida do equipamento',
      tab: 'Vida do equipamento',
      gallery: [
        { kind: 'flow', caption: 'Fases do chassi, do pedido à entrega' },
      ],
      kind: 'Desenho de processo',
      status: 'Em levantamento',
      summary: 'Linha do tempo por chassi, do pedido ao cliente, com checklist, fotos e assinatura em cada mudança de posse.',
      problem: 'Não há registro único do que aconteceu com a máquina entre o pedido à fábrica e a entrega: quem recebeu, em que estado e quem assinou.',
      outcomes: [
        'Fluxo de **8 fases e 3 destinos** desenhado com as áreas envolvidas.',
        'Portais de pedido, faturamento, embarque e checklist mapeados como fontes.',
        'Regras levantadas em reunião e registradas para aprovação.',
      ],
      flow: ['Pedido', 'Faturamento', 'Embarque', 'Recebimento', 'Preparação', 'Entrega'],
      tags: ['Processos', 'Requisitos', 'Diagramas'],
      tech: ['Próximo passo: estudo de viabilidade entre ferramenta pronta, app próprio ou aba no CRM.', 'Riscos mapeados: portais sem API e adesão ao checklist.'],
    },
  ],
  side: [
    {
      id: 'pamine',
      title: 'PAMINE',
      kind: 'API REST · Node.js',
      text: 'Sistema de gestão de viveiros municipais: autenticação, usuários, inventário de sementeiras e estufas, lotes e log de auditoria. Arquitetura em camadas com MongoDB.',
      tags: ['Node.js', 'MongoDB', 'API REST'],
      url: gh('api-viveiro-municipal'),
    },
    {
      id: 'doai',
      title: 'DoaÍ',
      kind: 'Front end · React',
      text: 'Projeto acadêmico de banco de doações, com front end em React e Next.js.',
      tags: ['React', 'Next.js'],
    },
    {
      id: 'fila',
      title: 'FilaCidadã',
      kind: 'Back end · Kotlin',
      text: 'API de gerenciamento de filas para a disciplina de orientação a objetos, com camada de serviço, máquina de estados e documentação em PDF.',
      tags: ['Kotlin', 'Ktor'],
      url: gh('project-api-kotlin'),
    },
    {
      id: 'panorama',
      title: 'Panorama BR',
      kind: 'Web · Next.js',
      text: 'Consulta de endereços brasileiros a partir de uma API pública.',
      tags: ['Next.js', 'TypeScript'],
      url: gh('panorama-br'),
    },
    {
      id: 'pdv',
      title: 'PDV em TypeScript',
      kind: 'Aplicação · SQLite',
      text: 'Ponto de venda com persistência em SQLite, e um CRUD irmão aplicando as boas práticas da disciplina.',
      tags: ['TypeScript', 'SQLite'],
      url: gh('pdv-typescript'),
    },
    {
      id: 'cypress',
      title: 'Testes E2E com Cypress',
      kind: 'Qualidade · Testes',
      text: 'Testes ponta a ponta sobre o MVP de um banco digital.',
      tags: ['Cypress', 'JavaScript'],
      url: gh('test-project-cypress'),
    },
  ],
  stack: [
    { group: 'Linguagens', items: ['Python', 'SQL (T-SQL)', 'DAX', 'TypeScript', 'JavaScript', 'Kotlin', 'C#'] },
    { group: 'Dados e BI', items: ['Power BI', 'Power Query', 'SQL Server', 'pandas', 'geopandas', 'Excel'] },
    { group: 'Automação e integrações', items: ['Selenium', 'APIs REST', 'Power BI REST API', 'Microsoft Graph', 'SharePoint', 'WhatsApp API'] },
    { group: 'Desenvolvimento', items: ['Node.js', 'React', 'Next.js', 'MongoDB', 'SQLite', 'Prisma', 'Cypress'] },
    { group: 'Sistemas', items: ['Protheus (TOTVS)', 'Plataformas de telemetria de máquinas'] },
    { group: 'Ferramentas', items: ['Git e GitHub', 'Docker', 'conda', 'Figma', 'Obsidian', 'Claude Code e MCP'] },
  ],
  certifications: [
    { title: 'Microsoft Power BI para Business Intelligence e Data Science', issuer: 'Data Science Academy', meta: '72 h · 2026', url: 'https://mycourse.app/F3afOs0IEgboptslz' },
    { title: 'Fundamentos de Data Science e Inteligência Artificial', issuer: 'Data Science Academy', meta: '24 h · 2026', url: 'https://mycourse.app/qoCgvcxcGfJA29Cbv' },
    { title: 'API Beginner Learning Path', issuer: 'Postman Academy', meta: '2026', url: 'https://verify.skilljar.com/c/45tg8mycmau6' },
    { title: 'Enterprise Admin Learning Path', issuer: 'Postman Academy', meta: '2026', url: 'https://verify.skilljar.com/c/eor5esy58ieo' },
    { title: 'Organizational Analysis', issuer: 'Stanford Online, via Coursera', meta: '25 h · 2025', url: 'https://coursera.org/verify/VVQOEGD74IZL' },
    { title: 'Machine Learning Pipelines with Azure ML Studio', issuer: 'Coursera Project Network', meta: '2023', url: 'https://coursera.org/verify/W45QMW2QCAMY' },
    { title: 'Use SurveyMonkey to Create a Survey and Analyze Results', issuer: 'Coursera Project Network', meta: '2023', url: 'https://coursera.org/verify/78M2VAE25TKN' },
    { title: 'Learning with Python', issuer: 'Enap, Escola Virtual.Gov', meta: '20 h · 2023' },
    { title: 'Noções básicas de rede', issuer: 'Cisco Networking Academy, IFRO', meta: '2025' },
    { title: 'Fundamentos de TI: hardware e software', issuer: 'Fundação Bradesco, Escola Virtual', meta: '7 h · 2025' },
    { title: 'Excel', issuer: 'Plantar Educação', meta: '3 h · 2023' },
    { title: 'Introdução ao Django (oficina)', issuer: 'IFRO Campus Ji-Paraná', meta: '4 h · 2022' },
    { title: 'Explicando a Lei Geral de Proteção de Dados (LGPD)', issuer: 'Plantar Educação', meta: '2023' },
  ],
}

const en: Content = {
  meta: {
    title: 'José Vinícius Martines | Data & BI Analyst',
    description:
      'Portfolio of José Vinícius Martines, data analyst and developer. Python, SQL Server, Power BI, automation and APIs.',
  },
  ui: {
    nav: { about: 'About', work: 'What I do', experience: 'Experience', projects: 'Projects', tv: 'Dimensions', contact: 'Contact' },
    seeProjects: 'See projects',
    downloadCv: 'Download résumé',
    themeLight: 'Switch to light mode',
    themeDark: 'Switch to dark mode',
    switchLang: 'Mudar para português',
    photoAlt: 'Photo of José Vinícius Martines',
    lens: {
      role: 'Tamer of spreadsheets and robots',
      summary: 'In another dimension one click fixes everything. In this one I automate, check the source and document the rule.',
      hint: 'hover the text: it is the version from another dimension',
    },
    tv: {
      title: 'Meanwhile, in other dimensions',
      lead: 'Interdimensional cable. Change the channel to see my job in other realities.',
      next: 'Next channel',
      prev: 'Previous channel',
      channel: 'Channel',
      channels: [
        { code: 'C-137', text: 'This one. Everything works, but I still check the source.' },
        { code: 'J-19', text: 'Spreadsheets arrive with standardized headers. All of them. Always.' },
        { code: 'R-7', text: "The Selenium robot doesn't break when the site changes its layout." },
        { code: 'BI-35', text: 'Nobody asks for "just one more column" on Friday at 5 pm.' },
        { code: 'D-6', text: 'Every data point is a six-sided die and the analysis is a coin toss.' },
        { code: 'DUCK-1', text: 'The ducks run the ETL. I just review the pull request.' },
      ],
    },
    pipeline: {
      title: 'Where data travels in my work',
      caption: "From the portal to the manager's WhatsApp",
      stages: [
        { title: 'Sources', sub: 'portals, APIs, ERP' },
        { title: 'Collection', sub: 'Python robots' },
        { title: 'Database', sub: 'SQL Server' },
        { title: 'Model', sub: 'Power BI and DAX' },
        { title: 'Delivery', sub: 'report, WhatsApp, email' },
      ],
      alt: 'Data flow: sources such as portals, APIs and ERP; collection with Python robots; storage in SQL Server; Power BI model; delivery by report, WhatsApp and email',
    },
    about: {
      title: 'About',
      lead: 'Who I am, where I have worked, what I use and what I studied.',
      tabs: { who: 'Who I am', path: 'Experience', stack: 'Stack', certs: 'Certifications' },
    },
    work: { title: 'What I do', lead: 'Each area with the tools I use in it.' },
    experience: { title: 'Experience', lead: 'From IT support to data analysis and engineering.' },
    projects: {
      title: 'Projects',
      lead: 'From raw data to delivery: collection, database, model and automation.',
      note: 'Work projects are anonymized: no company, client names or business figures. The demo dashboards use Norte Máquinas, a fictional company, with synthetic data generated in Python.',
      dataGroup: 'Data',
      devGroup: 'Beyond dashboards',
      problem: 'The problem',
      outcomes: 'What I did',
      details: 'Technical details',
      flow: 'Flow',
      openDemo: 'Open demo dashboard',
      code: 'Code',
      previewOf: 'Dashboard preview',
      hint: 'In each project: the problem, what I did, the technical details and, when there is one, a demo dashboard to click.',
      of: 'of',
      prevProject: 'Previous project',
      nextProject: 'Next project',
    },
    stack: { title: 'Stack', lead: 'The family: trusted tools, each in its place.' },
    certifications: { title: 'Certifications', lead: 'Courses related to data and development. The ones with an arrow open the verifiable credential.' },
    github: {
      title: 'On GitHub',
      lead: 'Public repositories with recent activity, straight from the API.',
      error: "The repositories didn't load right now.",
      seeOnGitHub: 'See them on GitHub',
      all: 'All repositories',
      noDescription: 'No description.',
      updated: 'updated',
    },
    contact: {
      title: "Let's talk?",
      text: 'Want to talk about data, automation, Power BI or a project? Reach me by email or LinkedIn.',
    },
    footer: {
      madeWith: 'Built with React, TypeScript and Tailwind. Hosted on GitHub Pages.',
      data: 'Demo dashboards use synthetic data.',
      dimension: 'Made in this dimension. Probably.',
      ducks: 'A family of ducks swimming across the footer',
    },
  },
  profile: {
    name: 'José Vinícius Martines',
    short: 'José Vinícius',
    status: 'Python · SQL Server · Power BI · automation',
    role: 'Data & BI Analyst',
    summary:
      'I build Python and SQL Server pipelines, Power BI models and automations that take data from portals and APIs to the people who make decisions.',
    location: 'Vilhena, Rondônia, Brazil',
  },
  about: [
    'I am a data analyst based in Vilhena, Rondônia, Brazil. I own the whole path of the data: robots that collect from portals and APIs, a SQL Server database, Power BI models and automations that deliver the numbers by WhatsApp and email to the people who decide.',
    "I like simple, direct solutions, checking every number against the source and documenting rules and decisions so the next person can pick up where I left off. I'm also studying Systems Analysis and Development at IFRO, where I build APIs, web apps and tests.",
  ],
  facts: [
    { label: 'Degree', value: 'Systems Analysis and Development, IFRO (2025, in progress)' },
    { label: 'Technical', value: 'IT technician, IFRO (2020–2022)' },
    { label: 'Location', value: 'Vilhena, Rondônia, Brazil' },
    { label: 'Languages', value: 'Portuguese (native), English (basic, studying)' },
  ],
  capabilities: [
    {
      title: 'Pipelines and ETL',
      text: 'I move data from APIs, spreadsheets and portals into SQL Server, with normalization, batch loads and error logs.',
      tools: ['Python', 'pandas', 'SQL Server', 'pyodbc', 'REST APIs'],
    },
    {
      title: 'Power BI and modeling',
      text: 'Models that respond fast and match the source: fiscal calendar, unambiguous relationships and reviewed DAX.',
      tools: ['Power BI', 'DAX', 'Power Query', 'Dimensional modeling'],
    },
    {
      title: 'Automation and RPA',
      text: 'Robots that do the repetitive work on web portals with no API, and cope when the screen changes.',
      tools: ['Selenium', 'Python', 'Task Scheduler'],
    },
    {
      title: 'Integrations and delivery',
      text: 'Reports reach the right people ready to read: Power BI export by API and delivery by WhatsApp and email.',
      tools: ['Power BI REST API', 'WhatsApp API', 'SMTP', 'Microsoft Graph', 'SharePoint'],
    },
    {
      title: 'Web development and APIs',
      text: 'REST APIs, front ends and tests, built in college and in personal projects.',
      tools: ['Node.js', 'TypeScript', 'React', 'Next.js', 'MongoDB', 'Kotlin'],
    },
    {
      title: 'Documentation and rules',
      text: 'Business rules, sources and decisions recorded in a knowledge vault, so every number has an explanation.',
      tools: ['Obsidian', 'Markdown', 'Claude Code', 'MCP'],
    },
  ],
  experience: [
    {
      company: 'Agricultural and construction equipment dealership network',
      role: 'Data Analyst (CSC)',
      period: 'Apr 2026 – present',
      current: true,
      bullets: [
        'Python and SQL Server pipelines with telemetry, oil lab, ERP and manufacturer platform data.',
        'Power BI models for after-sales: fleet health, licenses, extended warranty contracts, portfolio and fleet connectivity.',
        'Automated weekly KPI delivery by WhatsApp and email, filtered per supervisor.',
        'Performance and rule fixes in existing Power BI models, with decisions documented.',
      ],
    },
    {
      company: 'Agricultural and construction equipment dealership network',
      role: 'Customer Experience Analyst',
      period: 'May 2025 – Apr 2026',
      bullets: [
        'Service satisfaction (NPS) surveys and a Power BI tracking dashboard.',
        'Technical ticket sync from an API into SQL Server.',
        "The team's procedures manual and BI routines.",
      ],
    },
    {
      company: 'EFA Itapirem, Ji-Paraná (Brazil)',
      role: 'IT Technician',
      period: 'Apr 2023 – Jan 2024',
      bullets: ['Help desk, networks and hardware maintenance.', 'Computer classes for students.'],
    },
  ],
  stats: [
    { value: '7', label: 'data case studies' },
    { value: '4', label: 'collection robots' },
    { value: '2', label: 'interactive demo dashboards' },
    { value: '6', label: 'software projects' },
  ],
  cases: [
    {
      id: 'envio',
      title: 'Automated BI delivery by WhatsApp and email',
      tab: 'BI delivery',
      gallery: [
        { kind: 'image', src: 'projects/nps-1.png', caption: 'Cycle KPIs and groups by branch' },
        { kind: 'image', src: 'projects/nps-2.png', caption: 'Email table and WhatsApp preview per supervisor' },
        { kind: 'flow', caption: 'From Power BI to the message, no file on disk' },
      ],
      kind: 'Automation and APIs',
      summary: 'Every Friday each supervisor gets their branches on WhatsApp, and management gets the full view by email.',
      problem:
        'Survey performance was shared by hand: open the report, filter, take a screenshot and send it to each person. It took time and sometimes went out with the wrong filter.',
      outcomes: [
        'Page export through the Power BI API with a Service Principal, visual cropped in memory and sent, with no file saved to disk.',
        'WhatsApp by API **filtered per supervisor**, so each one only gets their branches. Email with the table in the body and the PDF attached.',
        'On/off switch per channel, cycle-to-date period and a scheduled task on the server.',
        'Two API behaviors (a filter ignored on one page and crop position) documented as reusable fixes.',
      ],
      flow: ['Power BI Service', 'ExportTo API', 'In-memory crop', 'WhatsApp and email'],
      tags: ['Python', 'Power BI REST API', 'Service Principal', 'WhatsApp API', 'SMTP', 'Interactive'],
      tech: [
        "App authentication (Service Principal), not tied to anyone's login.",
        "Filters passed on export; the image is cropped by the visual's coordinates on the page.",
        'Configured through a .env file: channels, lists and crop, without touching code.',
        'The demo dashboard shows the KPIs and a preview of the message each supervisor receives.',
      ],
      links: [
        { label: 'Open demo dashboard', url: 'demos/nps.html', primary: true },
        { label: 'Code', url: 'https://github.com/JoseViniciusMM/JoseViniciusMM.github.io/tree/main/public/demos' },
      ],
    },
    {
      id: 'robos',
      title: 'Collection robots for manufacturer platforms',
      tab: 'Collection robots',
      gallery: [
        { kind: 'metric', caption: 'Before and after the fixes', items: [{ before: '8 of 192', after: '168 of 168', label: 'columns recognized in the spreadsheet' }, { before: 'row-by-row MERGE', after: 'batches of 1,000', label: 'ticket sync' }, { before: 'whole-file rollback', after: 'partial commit + log', label: 'duplicate rows in a load' }] },
        { kind: 'code', caption: 'Header normalization' },
        { kind: 'flow', caption: 'From the portal to the database' },
      ],
      kind: 'RPA and data engineering',
      summary: 'Telemetry, technical tickets and licenses, once only on web portals, now reach the database on their own.',
      problem:
        "Machine telemetry reports, technical tickets and licenses lived in different manufacturer portals. Someone downloaded spreadsheets by hand, and database loads failed silently.",
      outcomes: [
        'Python and Selenium robots for telemetry, the case portal and license management. Where there is an API, I use the API.',
        'Ticket sync moved from a row-by-row MERGE to batched UPDATE and INSERT, in **chunks of 1,000**.',
        'Header normalization for the telemetry spreadsheet: from **8 to 168** of the 168 expected columns recognized.',
        'Partial commit with a grouped error summary, instead of a rollback that dropped the whole file over a few duplicate rows.',
      ],
      flow: ['Portals and APIs', 'Python robot', 'Normalization', 'SQL Server'],
      tags: ['Python', 'Selenium', 'SQL Server', 'pyodbc', 'Microsoft Graph', 'IBGE API'],
      tech: [
        'React/MUI screens: renamed iframes, onboarding pop-ups, StaleElementReference and two-step export dialogs.',
        'SharePoint integration through Microsoft Graph, with pagination, and city geocoding through the IBGE API.',
        'Environment variables read at call time, a timeout on every request and transactions with rollback.',
        'Logs include the target server and database, to rule out writing to the wrong place.',
      ],
      code: { caption: 'Header normalization for the telemetry spreadsheet (simplified)', snippet: normalizarSnippet },
    },
    {
      id: 'oleo',
      title: 'Fleet health from oil analysis',
      tab: 'Fleet health',
      gallery: [
        { kind: 'image', src: 'projects/oleo-1.png', caption: 'Overview with period, branch and segment filters' },
        { kind: 'image', src: 'projects/oleo-2.png', caption: 'Condition by family and time from report to work order' },
        { kind: 'image', src: 'projects/oleo-3.png', caption: 'Action list: critical reports without a work order' },
        { kind: 'flow', caption: 'Data path, from the lab to after-sales' },
      ],
      kind: 'ETL, SQL Server and Power BI',
      summary: 'Lab reports matched against the ERP and the machine fleet, so a critical report turns into a service call.',
      problem:
        "Oil analysis reports sat in the lab's portal, far from the ERP and the machine register. Nobody could see in one place which machines were critical, at which branch, and whether the report led to service.",
      outcomes: [
        "Python ETL that reads reports and status from the lab's API and writes to SQL Server, replacing the intermediate spreadsheet.",
        '**Report × fleet × ERP** matching by normalized chassis number, with a link table. Unmatched chassis became a fix list for the source.',
        'A funnel from report to service and a per-report follow-up column that fixed a slow follow-up table.',
        'November-to-October fiscal calendar, rolling 12-month view and business rules documented one by one.',
      ],
      flow: ['Lab API', 'Python ETL', 'SQL Server', 'Power BI model', 'After-sales action list'],
      tags: ['Python', 'SQL Server', 'Power BI', 'DAX', 'REST API', 'Interactive'],
      tech: [
        'Match key: chassis number uppercased and without spaces, the same in all three sources.',
        'Sample status kept apart from results: open and canceled samples come from the status list, finished ones from the reports.',
        'Samples still at the customer are left out of the dashboard by business decision.',
        'Phase two in progress: ERP work orders with chassis, to measure service after the report exactly.',
      ],
      links: [
        { label: 'Open demo dashboard', url: 'demos/oleo.html', primary: true },
        { label: 'Code', url: 'https://github.com/JoseViniciusMM/JoseViniciusMM.github.io/tree/main/public/demos' },
      ],
    },
    {
      id: 'modelagem',
      title: 'Performance and rules in Power BI models',
      tab: 'Power BI models',
      gallery: [
        { kind: 'metric', caption: 'Before and after in the model', items: [{ before: '149 of 188', after: '0', label: 'automatic date tables in the model' }, { before: '≈ 2.9 million', after: '2,191', label: 'rows in the calendar' }] },
        { kind: 'code', caption: 'Calendar with fiscal year' },
        { kind: 'flow', caption: 'How each fix was made' },
      ],
      kind: 'Modeling and DAX',
      summary: 'Lighter after-sales models, with unambiguous relationships and numbers that match the source.',
      problem:
        'Large models were slow and some charts showed the wrong period or missing customers. The calculation rules lived only in the head of whoever built them.',
      outcomes: [
        'Auto Date/Time turned off: **149 of the 188** tables in the model were automatic date tables.',
        'Calendar moved from CALENDARAUTO(), about **2.9 million** rows, to an explicit CALENDAR with fiscal year.',
        'Ambiguous relationships around a central M:N table fixed with truncated date keys and USERELATIONSHIP.',
        'Rules for conversion, serviced machines and telemetry connectivity written down and approved by management.',
      ],
      flow: ['Diagnosis', 'Model fix', 'Check against source', 'Rule documented'],
      tags: ['Power BI', 'DAX', 'Power Query', 'Dimensional modeling', 'MCP'],
      tech: [
        'Model read and edited through the Power BI Modeling MCP, connected to Power BI Desktop.',
        'NPS dashboard with 100+ DAX measures, six helper dimensions and a synthetic key for work orders without a ticket number.',
        'Slow measures found (row-by-row FILTER and volatile TODAY()) and listed for rewrite.',
        'A fix plan before touching the model, with totals checked afterwards.',
      ],
      code: { caption: 'Calendar with a November-to-October fiscal year (example)', snippet: daxSnippet },
    },
    {
      id: 'aor',
      title: 'Area of responsibility map',
      tab: 'Area map',
      gallery: [
        { kind: 'flow', caption: 'From IBGE boundaries to the Power BI map' },
      ],
      kind: 'Geodata and Power BI',
      summary: "State boundaries generated in Python to draw each branch's area in Power BI.",
      problem: "The Power BI map had no outlines for the states served, and each branch's area was explained in a spreadsheet.",
      outcomes: [
        'A geopandas script using the IBGE API that generates the state GeoJSON.',
        'Reference layer on Azure Maps in Power BI, with border and fill tuned.',
        'Area table read from a SharePoint folder.',
      ],
      flow: ['IBGE API', 'geopandas', 'GeoJSON', 'Azure Maps in Power BI'],
      tags: ['Python', 'geopandas', 'IBGE API', 'Power BI', 'SharePoint'],
      tech: ['Simplified polygons keep the file light in the report.', 'SharePoint folder connector for the area spreadsheet.'],
    },
    {
      id: 'chassi',
      title: 'Contact enrichment by chassis',
      tab: 'Contacts by chassis',
      gallery: [
        { kind: 'flow', caption: 'From names spelled many ways to a phone number in the base' },
      ],
      kind: 'Data quality',
      summary: 'Customer phone numbers brought into the equipment base, even when names were spelled differently.',
      problem: 'The equipment base had no phone numbers, and the same customer was spelled differently in each spreadsheet.',
      outcomes: ['Fuzzy name matching with rapidfuzz (token_sort_ratio, **threshold 85**).', 'Project split into load, merge, export and app.'],
      flow: ['Equipment base', 'Contact base', 'Fuzzy matching', 'Enriched base'],
      tags: ['Python', 'pandas', 'rapidfuzz'],
      tech: ['Modules: loader, merger, exporter and app.', 'Threshold chosen by reviewing accepted and rejected pairs near the cutoff.'],
    },
    {
      id: 'vida',
      title: 'Equipment lifecycle',
      tab: 'Equipment lifecycle',
      gallery: [
        { kind: 'flow', caption: 'Chassis phases, from order to delivery' },
      ],
      kind: 'Process design',
      status: 'Discovery',
      summary: 'A per-chassis timeline from order to customer, with checklist, photos and a signature at every handover.',
      problem: 'There is no single record of what happened to a machine between the factory order and delivery: who received it, in what condition and who signed.',
      outcomes: [
        'An **8-phase, 3-destination** flow designed with the teams involved.',
        'Order, billing, shipping and checklist portals mapped as sources.',
        'Rules gathered in a meeting and recorded for approval.',
      ],
      flow: ['Order', 'Billing', 'Shipping', 'Receiving', 'Preparation', 'Delivery'],
      tags: ['Processes', 'Requirements', 'Diagrams'],
      tech: ['Next step: feasibility study between an off-the-shelf tool, an in-house app or a CRM tab.', 'Risks mapped: portals without APIs and checklist adoption.'],
    },
  ],
  side: [
    {
      id: 'pamine',
      title: 'PAMINE',
      kind: 'REST API · Node.js',
      text: 'Management system for municipal plant nurseries: authentication, users, seedbed and greenhouse inventory, batches and an audit log. Layered architecture with MongoDB.',
      tags: ['Node.js', 'MongoDB', 'REST API'],
      url: gh('api-viveiro-municipal'),
    },
    {
      id: 'doai',
      title: 'DoaÍ',
      kind: 'Front end · React',
      text: 'Academic donation bank project, with a React and Next.js front end.',
      tags: ['React', 'Next.js'],
    },
    {
      id: 'fila',
      title: 'FilaCidadã',
      kind: 'Back end · Kotlin',
      text: 'Queue management API for an object-oriented programming course, with a service layer, state machine and PDF documentation.',
      tags: ['Kotlin', 'Ktor'],
      url: gh('project-api-kotlin'),
    },
    {
      id: 'panorama',
      title: 'Panorama BR',
      kind: 'Web · Next.js',
      text: 'Brazilian address lookup built on a public API.',
      tags: ['Next.js', 'TypeScript'],
      url: gh('panorama-br'),
    },
    {
      id: 'pdv',
      title: 'TypeScript point of sale',
      kind: 'App · SQLite',
      text: 'Point-of-sale app with SQLite persistence, plus a sibling CRUD applying the course best practices.',
      tags: ['TypeScript', 'SQLite'],
      url: gh('pdv-typescript'),
    },
    {
      id: 'cypress',
      title: 'E2E tests with Cypress',
      kind: 'Quality · Testing',
      text: 'End-to-end tests for a digital bank MVP.',
      tags: ['Cypress', 'JavaScript'],
      url: gh('test-project-cypress'),
    },
  ],
  stack: [
    { group: 'Languages', items: ['Python', 'SQL (T-SQL)', 'DAX', 'TypeScript', 'JavaScript', 'Kotlin', 'C#'] },
    { group: 'Data and BI', items: ['Power BI', 'Power Query', 'SQL Server', 'pandas', 'geopandas', 'Excel'] },
    { group: 'Automation and integrations', items: ['Selenium', 'REST APIs', 'Power BI REST API', 'Microsoft Graph', 'SharePoint', 'WhatsApp API'] },
    { group: 'Development', items: ['Node.js', 'React', 'Next.js', 'MongoDB', 'SQLite', 'Prisma', 'Cypress'] },
    { group: 'Systems', items: ['Protheus (TOTVS)', 'Machine telemetry platforms'] },
    { group: 'Tools', items: ['Git and GitHub', 'Docker', 'conda', 'Figma', 'Obsidian', 'Claude Code and MCP'] },
  ],
  certifications: [
    { title: 'Microsoft Power BI for Business Intelligence and Data Science', issuer: 'Data Science Academy', meta: '72 h · 2026', url: 'https://mycourse.app/F3afOs0IEgboptslz' },
    { title: 'Data Science and Artificial Intelligence Fundamentals', issuer: 'Data Science Academy', meta: '24 h · 2026', url: 'https://mycourse.app/qoCgvcxcGfJA29Cbv' },
    { title: 'API Beginner Learning Path', issuer: 'Postman Academy', meta: '2026', url: 'https://verify.skilljar.com/c/45tg8mycmau6' },
    { title: 'Enterprise Admin Learning Path', issuer: 'Postman Academy', meta: '2026', url: 'https://verify.skilljar.com/c/eor5esy58ieo' },
    { title: 'Organizational Analysis', issuer: 'Stanford Online, via Coursera', meta: '25 h · 2025', url: 'https://coursera.org/verify/VVQOEGD74IZL' },
    { title: 'Machine Learning Pipelines with Azure ML Studio', issuer: 'Coursera Project Network', meta: '2023', url: 'https://coursera.org/verify/W45QMW2QCAMY' },
    { title: 'Use SurveyMonkey to Create a Survey and Analyze Results', issuer: 'Coursera Project Network', meta: '2023', url: 'https://coursera.org/verify/78M2VAE25TKN' },
    { title: 'Learning with Python', issuer: 'Enap, Escola Virtual.Gov (Brazil)', meta: '20 h · 2023' },
    { title: 'Networking Basics', issuer: 'Cisco Networking Academy, IFRO', meta: '2025' },
    { title: 'IT Fundamentals: Hardware and Software', issuer: 'Fundação Bradesco, Escola Virtual', meta: '7 h · 2025' },
    { title: 'Excel', issuer: 'Plantar Educação', meta: '3 h · 2023' },
    { title: 'Introduction to Django (workshop)', issuer: 'IFRO Ji-Paraná campus', meta: '4 h · 2022' },
    { title: "Brazil's General Data Protection Law (LGPD) explained", issuer: 'Plantar Educação', meta: '2023' },
  ],
}

export const content: Record<Lang, Content> = { pt, en }
