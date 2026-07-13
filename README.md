# Site Oficial — Maria Amélia (v3.0)

Site da pré-candidatura de Maria Amélia a Deputada Federal pelo PL no Distrito Federal.

**Slogan:** Mais voz para o DF. Mais força para o Brasil.

## O que mudou na v3.0 (reestruturação completa)

- **Design novo de alto padrão**: tipografia editorial (Fraunces + Instrument Sans), paleta refinada a partir do verde da marca com fio dourado como elemento de identidade, animações de revelação ao rolar, marquee de valores e linha do tempo "costurada".
- **Conteúdo 100% preservado**: todos os textos do site anterior foram mantidos com o mesmo sentido (história, trajetória, ações sociais, bandeiras e prioridades).
- **Correções**: o `index.html` antigo estava com o conteúdo duplicado internamente (a página inteira aparecia duas vezes no arquivo) — corrigido; o arquivo vazio `maria_pequenino.png` (0 bytes) foi removido; foi criada a página `privacidade.html`, que era referenciada mas não existia.
- **Performance**: imagens convertidas para WebP e redimensionadas (de ~9 MB para ~0,8 MB no total), lazy loading, poster do vídeo do hero.
- **Organização**: assets em pastas (`assets/css`, `assets/js`, `assets/img`, `assets/video`, `assets/logo`). Os nomes das páginas `acao-*.html` foram mantidos para não quebrar links já compartilhados.
- **Acessibilidade**: navegação por teclado, `aria-labels`, foco visível e suporte a `prefers-reduced-motion`.

## Estrutura

```
index.html            Página principal
acao-*.html           8 páginas de ações sociais
privacidade.html      Política de privacidade (revisar com o jurídico)
assets/
  css/style.css       Design system completo
  js/main.js          Interações (menu, modal, depoimentos, cookies)
  img/                Fotos otimizadas em WebP
  video/fundo.mp4     Vídeo do hero
  logo/               Logos SVG
```

## 📷 FOTOS PENDENTES — checklist para verificação

Os espaços abaixo estão marcados no site com o aviso **"Foto a inserir — verificação"**. Basta salvar a foto em `assets/img/` e trocar o bloco `<div class="foto-pend">...</div>` por `<img src="assets/img/NOME.webp" alt="...">` no `index.html`.

Linha do tempo (`index.html`, seção Trajetória):
1. **Origem 1968** — foto de infância/família em Bambuí (MG)
2. **Chegada a Brasília** — foto da juventude ou primeiros anos na capital
3. **1989** — registro antigo dos primeiros bolos e encomendas
4. **2004** — fachada ou interior da primeira loja no Lago Sul
5. **PL Mulher DF** — foto da posse ou evento do PL Mulher

Páginas de ações sociais: cada página tem uma galeria com 4 espaços marcados para fotos reais da instituição/ação. Em `acao-rs.html` há também espaço para o **vídeo oficial da campanha do RS** (link do YouTube).

> As demais posições já usam as fotos reais existentes: foto oficial (hero), foto institucional (Quem é / Reconhecimento), foto do carro (2013), foto do lançamento (19/mai/2025) e foto da Vila do Pequenino Jesus (Ações Sociais).

## Como publicar (GitHub Pages)

```bash
git clone https://github.com/MariaAmeliaDF/mariamelia.df.git
cd mariamelia.df
# apague os arquivos antigos e copie todo o conteúdo desta pasta para a raiz do repositório
git add -A
git commit -m "v3.0 — reestruturação completa do site"
git push origin main
```

O GitHub Pages atualizará automaticamente em https://mariaameliadf.github.io/mariamelia.df/

## Stack

HTML5 · CSS3 · JavaScript vanilla · Font Awesome 6.5 · Google Fonts (Fraunces, Instrument Sans). Sem frameworks e sem build — basta hospedar os arquivos estáticos.
