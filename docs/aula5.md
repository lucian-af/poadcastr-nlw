## Aula 5 - Controlando o player - Trilha ReactJS

- _Minuto 7 até 14:40 - Refatoração, adequação de funções ao typescript_

  - No react para que possamos passar qualquer coisa (elementos html, código JS, etc) entre as tags de um componente, temos de usar as **_props_**, para adequar uma prop ao typescript podemos criar um _type_ ou uma _interface_ e usar um atributo do tipo _ReactNode_ da lib _react_, ou seja, o que o react aceitar essa prop poderá aceitar, isso ajuda a limitar os _"any's"_ da vida.

- Controle de próximo e anterior
  - Princípio da imutabilidade(Ver mais - minuto 20): quando precisa-se de uma informação atualizada, cria-se uma nova informação copiando a existente, e modificando-a, ao invés de atualizar a informação existente.
  - Nas functions playNext e playPrevious, o áudio é tocado automaticamente(via prop _autoPlay_) e por ter alteração no src quando clicamos em Next ou Previous, por termos as functions de acessibilidade para alterar entre play e pause via teclado, ele faz a alternância do ícone de play e pause automaticamente.
- Controle de loop
- Controle de shuffle - embaralhar
- Controle de tempo atual
- Controle pelo slider

### **Dicas para evoluir o projeto**

- Deixar o projeto responsivo - mudar layout ?
- PWA - Progressive Web App - _next pwa - https://www.npmjs.com/package/next-pwa_
- Tema dark, usar as cores do Omni?
