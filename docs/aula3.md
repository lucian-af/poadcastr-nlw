## Aula 3 - Páginas do App - Trilha ReactJS

- Página Home
- Roteamento do Next.js
  - FileSystemRoute: quando cria um arquivo ele cria a rota automaticamente
  - passar colchetes no nome do arquivo, transforma em rota dinâmica
- Página Episódio
- Páginas estáticas e dinâmicas

  - **getStaticPaths : { GetStaticPaths } - import 'next'**

  - episodes é uma página gerada de forma dinâmica com conteúdo estático, o "[slug]" é um parâmetro dinâmico
  - no objeto de retorno dessa function, a prop _paths_ vazia faz com que no momento da build o next não gere nenhum conteúdo estático, se eu atribuo um _params_ ao _paths_ ele entende que no momento do build ele precisa gerar aquele conteúdo estaticamente, ou seja, quando o usuário acessar a página aquele conteúdo já vai estar cacheado. Dica sobre o _params_ ele pode ter mais de uma prop com base na quantidade de parâmetros ([variaveis entre colchetes]) que o nosso componente dinâmico tiver.
  - _fallback_ : true | false | 'blocking'
    - true e 'blocking' são conhecidos como _ISR - incremental static regenaration_
    - true: quando o _fallback_ é **true** e o _paths_ é **vazio** o next não gera nada estaticamente e quando o usuário acessa nossa url ele faz a requisição para obter os dados da página, porém esse tipo de requisição acontece do lado do client (browser) ou seja, se desabilitar o _JS_ do browser, a aplicação para de funcionar.
    - false: quando o _fallback_ é **false** e o _paths_ é **vazio** o next não gera nada estaticamente e quando o usuário acessa nossa url ele obtém um 404.
    - 'blocking': quando o _fallback_ é **'blocking'** e o _paths_ é **vazio** o SSG tem o mesmo comportamento do true, com diferença que a requisição é feita no server next e não no client(browser) ou seja, independente do _JS_ estar ou não desabilitado, nossa aplicação continua rodando.
  - Considerações sobre o _fallback_, o **'blocking'** é o recurso mais recente, e que tem um melhor aproveitamento, veio na versão 10 do next.
