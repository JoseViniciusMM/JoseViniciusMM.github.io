# Portfólio · José Vinícius Martines

Portfólio de dados e desenvolvimento. Vite + React + TypeScript + Tailwind v4, com dois painéis demo em HTML e JavaScript puro.

## Rodar no computador

```bash
npm install
npm run dev
```

Abre em `http://localhost:5173`.

## Publicar no GitHub Pages (grátis)

1. No GitHub, crie um repositório **público** chamado `JoseViniciusMM.github.io`.
2. Nesta pasta:

   ```bash
   git init
   git add .
   git commit -m "Primeira versão do portfólio"
   git branch -M main
   git remote add origin https://github.com/JoseViniciusMM/JoseViniciusMM.github.io.git
   git push -u origin main
   ```

3. No repositório: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
4. Acompanhe em **Actions**. Quando ficar verde, o site está em `https://joseviniciusmm.github.io`.

Cada `git push` na `main` publica de novo sozinho (`.github/workflows/deploy.yml`).

Se preferir outro nome de repositório (por exemplo `portfolio`), o endereço vira `https://joseviniciusmm.github.io/portfolio/` e é preciso trocar a linha de build no workflow para `BASE_PATH=/portfolio/ npm run build`.

## Onde editar

| O quê | Arquivo |
|---|---|
| Todos os textos (PT e EN), experiência, projetos, stack, certificações | `src/data/content.ts` |
| E-mail, LinkedIn, GitHub, foto e currículo | `links` em `src/data/content.ts` |
| Cores (claro e escuro) e fontes | `src/index.css` |
| Pipeline animado do topo | `src/components/Pipeline.tsx` |
| Seção de projetos: barra de abas numeradas + painel que troca de conteúdo. Link direto para um projeto: `#p-<id>` (ex.: `#p-oleo`) | `src/components/Projects.tsx`, rótulos das abas em `tab` no `content.ts` |
| Título e descrição para Google e redes sociais | `index.html` |
| Imagem que aparece ao compartilhar o link (LinkedIn, WhatsApp), 1200 × 630 | `public/og.png` |
| Sobre, Trajetória, Stack e Certificações (painel com abas; links `#trajetoria`, `#stack`, `#certificacoes`) | `src/components/About.tsx` |

## Elementos pessoais

| Elemento | Arquivo |
|---|---|
| "Dado" isométrico (cubo com gráfico de barras, símbolo do site e favicon animado) | `src/dado.ts`, `src/components/Dado.tsx`, `src/favicon.ts` |
| Cursor próprio: ponto verde, anel que segue e "abraça" botões e ícones com `data-magnetic` | `src/components/Cursor.tsx` |
| Lente de outra dimensão no topo (revela o texto alternativo sob o mouse) | `src/components/Lens.tsx`, textos em `ui.lens` |
| Mascote pato no menu, com olhos que seguem o mouse e piscadas | `src/components/Mascot.tsx` |
| TV a cabo interdimensional (canais em `ui.tv.channels`) | `src/components/DimensionTV.tsx` |
| Céu estrelado de fundo, reage ao mouse e à rolagem | `src/components/Stars.tsx` |
| Galhos de ipê-amarelo em traço de pincel (ganham tinta no hover) | `src/components/Ipe.tsx` |
| Família de patos nadando no rodapé | `src/components/Ducks.tsx` |
| Utilitários próprios do Tailwind: `surface`, `hand`, `glow`, `link-wave`, `readable` | `src/index.css` |

O tema padrão é o escuro; o claro fica no botão do topo e a escolha vale também para os painéis demo. Tudo respeita "reduzir movimento" do sistema, e o cursor próprio só liga com mouse (no celular fica o toque normal).

## Foto e currículo

- **Foto:** salve como `public/foto.jpg` (retrato, proporção 4:5). Sem o arquivo, aparecem as iniciais.
- **Currículo:** salve como `public/curriculo.pdf`. O botão "Baixar currículo" só aparece quando o arquivo existe.

## Painéis demo

Ficam em `public/demos/` e usam a **Norte Máquinas**, empresa fictícia, com dados sintéticos.

- `oleo.html` · saúde da frota por análise de óleo
- `nps.html` · pesquisas de satisfação, com prévia da mensagem de WhatsApp
- `demo.js` / `demo.css` · gráficos em SVG puro, sem biblioteca

Para gerar os dados de novo (mesma semente, mesmo resultado):

```bash
python scripts/gerar_dados.py
```

As imagens de prévia dos painéis ficam em `public/projects/`. Se mudar um painel, tire um print novo (1440 × 900) com o mesmo nome.

## Anonimização

Os projetos profissionais não citam a empresa, clientes nem números do negócio. Antes de publicar algo novo, confira se não há nome de cliente, filial real, chassi ou valor interno.
