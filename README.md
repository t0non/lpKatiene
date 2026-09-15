# Kat Rosa Paisagismo — cópia estática

Captura do site público em 15/09/2026: 116 páginas e 1.381 arquivos originais. O diretório `dist` contém o site para hospedagem estática.

## O que foi preservado

Fotos, logotipos, fontes, estilos, textos, páginas, projetos, blog, depoimentos, galerias, menus e destinos externos. O HTML e a maior parte do CSS/JavaScript visual foram preservados para manter a fidelidade; esta entrega não é uma reescrita integral do tema.

## Melhorias

- Páginas pré-geradas, sem execução de PHP para exibir conteúdo.
- Arquivos visuais armazenados localmente, incluindo os do domínio antigo.
- Banner inicial refeito em HTML/CSS, sem dependência do Slider Revolution.
- Busca local por títulos e botão de expansão dos projetos sem consulta ao WordPress.
- Cache longo para arquivos com nomes identificados pelo conteúdo de origem.
- Redução de movimento conforme preferência do visitante e foco de teclado visível.
- Remoção do Google Tag Manager nesta cópia de revisão.

## Dependências e limites

- O formulário continua usando o serviço Contact Form 7 do site original. A leitura do esquema e a permissão de conexão foram verificadas, sem envio de mensagem. Para desligar o WordPress original, é necessário migrar o recebimento de e-mails antes.
- WhatsApp, redes sociais, mapas, vídeos incorporados e recursos do Instagram continuam ligados aos serviços externos originais.
- A captura é um retrato das páginas públicas encontradas pelos links. Não contém painel administrativo, banco de dados, rascunhos nem conteúdo protegido.
- Um link de autor já retornava 404 na origem. As outras duas falhas registradas são uma URL incompleta de rastreamento removido e uma referência em comentário de CSS.
- A cópia está marcada como `noindex` para revisão; retirar essa marcação e revisar endereços canônicos ao fazer a migração definitiva.
- Não foi feita comparação automática de todos os pixels. Foram conferidos a página inicial, menu móvel, carregamento de imagens, busca e referências locais.

## Uso

Publique o conteúdo de `dist` em uma hospedagem estática com suporte a diretórios `index.html`. Para a prévia local com Node.js, execute `node scripts/server.mjs` nesta pasta e abra o endereço impresso.

O inventário completo de rotas e arquivos está em `capture-report.json`. Os scripts em `scripts` documentam a captura e a preparação. Uma nova captura substitui os HTML; faça backup antes de executá-la.
