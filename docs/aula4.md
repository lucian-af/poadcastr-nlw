## Aula 4 - Landing - Trilha ReactJS

1. ### **getStaticPaths : { GetStaticPaths } - import 'next'**

   - episodes é uma página gerada de forma dinâmica com conteúdo estático, o "[slug]" é um parâmetro dinâmico
   - no objeto de retorno dessa function, a prop _paths_ vazia faz com que no momento da build o next não gere nenhum conteúdo estático, se eu atribuo um _params_ ao _paths_ ele entende que no momento do build ele precisa gerar aquele conteúdo estaticamente, ou seja, quando o usuário acessar a página aquele conteúdo já vai estar cacheado. Dica sobre o _params_ ele pode ter mais de uma prop com base na quantidade de parâmetros ([variaveis entre colchetes]) que o nosso componente dinâmico tiver.
   - _fallback_ : true | false | 'blocking'
     - true e 'blocking' são conhecidos como _ISR - incremental static regenaration_
     - true: quando o _fallback_ é **true** e o _paths_ é **vazio** o next não gera nada estaticamente e quando o usuário acessa nossa url ele faz a requisição para obter os dados da página, porém esse tipo de requisição acontece do lado do client (browser) ou seja, se desabilitar o _JS_ do browser, a aplicação para de funcionar.
     - false: quando o _fallback_ é **false** e o _paths_ é **vazio** o next não gera nada estaticamente e quando o usuário acessa nossa url ele obtém um 404.
     - 'blocking': quando o _fallback_ é **'blocking'** e o _paths_ é **vazio** o SSG tem o mesmo comportamento do true, com diferença que a requisição é feita no server next e não no client(browser) ou seja, independente do _JS_ estar ou não desabilitado, nossa aplicação continua rodando.
   - Considerações sobre o _fallback_, o **'blocking'** é o recurso mais recente, e que tem um melhor aproveitamento, veio na versão 10 do next.

2. ### **Context API**

   - _Context API_ : auxilia no compartilhamento de dados entre componentes, cria-se um context para algum componente que precisa receber dados de outros componentes, encapsula os componentes com esse context via prop _Provider_ e passamos o valor a ser compartilhado através de um uma atributo _value_.
   - onClick no react espera uma function e não a chamada de uma function.
     - EX:
       - errado: `<button type="button" onClick={play(episode)}></button>`
       - correto: `<button type="button" onClick={() => play(episode)}></button>`
   - tag html _**audio**_: usada para tocar sons na nossa aplicação
     - props utilizadas:
       - autoPlay: toca o som automaticamente
       - src: caminho do arquivo de audio
       - ref: essa é genérica para qualquer tag HTML, aqui foi usada para termos acesso a tag e podermos manipular a mesma
       - onPlay/onPause: usada para dar mais acessibilidade ao nosso app, através desses eventos possibilitamos o uso de teclados multimídia no nosso app.
   - uso do useRef\<Elemento HTML>(null): serve para "linkar" elementos html para manipulação via javascript, usamos para manupular a tah audio.
   - useEffect: função usada para efeitos colaterais no react, quando algo acontece no app usamos o effect para mudar algo no nosso código.
