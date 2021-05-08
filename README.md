# 🚀Semana NLW Rocketseat

![html](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![css](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![sass](https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white)
![javascript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![react](https://img.shields.io/badge/React_js-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![next](https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![yarn](https://img.shields.io/badge/Yarn-2C8EBB?style=for-the-badge&logo=yarn&logoColor=white)

### Aplicação para ouvir podcasts

- Aplicação desenvolvida com
  <img style="margin: -5px 0;" src="https://img.shields.io/badge/React_js-20232A?logo=react&logoColor=61DAFB" /> junto com o <img style="margin: -5px 0;" src="https://img.shields.io/badge/next.js-000000?logo=next.js&logoColor=white" />. Usamos o SSG (Static Site Generation) para gerar nossas páginas de resumo do podcast estaticamente no build da aplicação, uma vez que esse conteúdo dificilmente será modificado. Com isso ganhamos em performance a cada acesso dos usuários.

- Necessário gerenciador de pacotes <img style="margin: -5px 0;" src="https://img.shields.io/badge/Yarn-2C8EBB?logo=yarn&logoColor=white" /> instalado.

- Como iniciar a aplicação:
  - _yarn install_: instala as dependências contidas no arquivo _package.json_;
  - _yarn server_: para subir a fake API criada com JSON Server;
  - _yarn dev_: para compilar a aplicação com as **"devDependencies"** do _package.json_;
  - Feito isso abra no browser a url _http://localhost:3000_
- Para ver o SSG funcionando:

  - Pare a aplicação que está rodando e mantenha a API funcionando;
  - Execute _yarn build_ para fazer o build da aplicação, nesse momento no processo de build é possível ver a seguinte linha aparecer:
    #### ● (SSG) automatically generated as static HTML + JSON (uses getStaticProps);
  - _yarn start_ para iniciar a aplicação;
  - Feito isso abra no browser a url http://localhost:3000
  - Para ver a magia do SSG funcionando, abra o inspecionar do browser e vá para a aba NetWork, clique em um podcast, repare que na aba network alguns requests foram feitos, volte para a página inicial e clique novamente no mesmo podcast, repare que na aba network nenhum dos requests anteriores foi repetido.

  ##### _OBS: o SSG foi configurado para atualizar a página a cada 8 horas, mas poderia ser alterado para atualizar uma vez por dia ou qualquer outro intervalo._
