## Aula 2 - Consumo de API - Trilha ReactJS

- Porque Typescript ?
- Criando estilos globais
- Configurar fonte
- Componente Header
- Componente Player
- Configurar API em JSON
- Consumindo API na Home
- SPA vs SSR vs SSG
  - SPA - Single Page Application
    - O core da aplicação é renderizado apenas uma vez, as demais renderizações ocorrem por demanda, isso otimiza a aplicação e ganha em performance. Entretanto, por fazer carregamento por demanda, as coisas são feitas em tempo de execução (req. ajax), se sua aplicação precisar usar SEO (Search Engine Optimization, recurso usado pelos buscadores, tipo o Google (kkk), para indexação de páginas, basicamente é um conjunto de técnicas que fazem com que a página do app, fica entre as primeiras nas buscas executadas na web) o SPA sozinho não irá dar suporte, é aí que entra o SSR.
    - NOTE: function tradicional de um SPA:
    - `useEffect(() => { fetch('http://localhost:3333/episodes') .then((response) => response.json()) .then((data) => console.log(data)); }, []);`
  - SSR - Server Side Rendering
    - Renderização do lado do servidor, as páginas HTML, CSS e o código JS são renderizados no lado do servidor ao invés do browser, com isso temos um app com tempo de carregamento inicial reduzido e indexável por SEO's e Crawlers (Crawler também conhecido como Spider ou Bot, são softwares desenvolvidos para alimentar e atualizar as bases de dados dos motores de busca. Esse processo é chamado de crawling ou spidering. Exemplo: Quando colamos um link para envio pelo whtasapp, ele rapidamente mosta uma janelinha acima do link com uma "preview" daquele link colado, isso é feito graças ao Crawler) pelo site ter um conteúdo estático disponível para tal, que pe feito graças ao SSR. Outro ponto do SSR é que os dados são carregados todas as vezes que o componente for carregado na tela porém independente do javascript estar ou não habilitado, pois essa requisição está "cacheada" no servidor.
    - NOTE: Só o fato de declarar uma function com esse nome "getServerSideProps" já sinaliza para o app react/next que será usado SSR:
    - `export async function getServerSideProps() { const response = await fetch('http://localhost:3333/episodes'); const data = await response.json(); return { props: { episodes: data, }, }; }`
  - SSG - Static Site Generation
    - Os dados são carregados uma única vez dentro de um X intervalo de tempo independente também do javascript estar ou não habilitado, pois essa requisição está "cacheada" no servidor, a diferença entre SSR e SSG é que no SSR eu tenho uma requisição sempre que o meu app é acessado, com SSG eu posso personalizar quando o app será atualizado com novos dados.
      - Exemplo: nosso podcastr por regra teria um novo podcast por dia, não seria então necessário a cada novo acesso buscar dados no servidor, sabendo que os dados vão ser os mesmos durante todo o dia, com isso personalizamos o nosso app para trazer novos dados 2 vezes por dia ou até mesmo 1 vez por dia, otimizando a performance do nosso app.
    - NOTE: Só o fato de declarar uma function com esse nome "getStaticProps" já sinaliza para o app react/next que será usado SSG
    - `export const getStaticProps: GetStaticProps = async () => { const { data } = await api.get('episodes', { params: { \_limit: 12, \_sort: 'published_at', \_order: 'desc', }, }); const episodes = data.map((episode) => { return { id: episode.id, title: episode.title, thumbnail: episode.thumbnail, members: episode.members, publishedAt: format(parseISO(episode.published*at), 'd MMM yy', { locale: ptBR, }), durationAsString: convertDurationToTimeString(Number(episode.file.duration)), description: episode.description, url: episode.file.url, }; }); const latestEpisodes = episodes.slice(0, 2); const allEpisodes = episodes.slice(2, episodes.length); const oitoHoras = 60 * 60 \_ 8; return { props: { episodes, latestEpisodes, allEpisodes, }, revalidate: oitoHoras, }; };`
- Gerando a Home de forma estática
- Criando build do projetos
  - yarn build
- Executando a build
  - yarn start
