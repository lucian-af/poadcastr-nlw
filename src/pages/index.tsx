// SPA - Single Page Application
// SSR - Server Side Rendering
// SSG - Static Site Generation
import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { GetStaticProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useContext } from 'react';

import { PlayerContext } from '../../contexts/playerContext';
import { api } from '../services/api';
import { convertDurationToTimeString } from './../utils/convertDurationToTimeString';
import styles from './home.module.scss';

type Episode = {
  id: string;
  title: string;
  thumbnail: string;
  members: string;
  duration: number;
  durationAsString: string;
  url: string;
  publishedAt: string;
};

type HomeProps = {
  latestEpisodes: Episode[];
  allEpisodes: Episode[];
};

export default function Home({ latestEpisodes, allEpisodes }: HomeProps) {
  const { play } = useContext(PlayerContext);

  return (
    <div className={styles.homepage}>
      <section className={styles.latestEpisodes}>
        <h2>Últimos lançamentos</h2>

        <ul>
          {latestEpisodes.map((episode) => {
            return (
              <li key={episode.id}>
                <Image width={192} height={192} src={episode.thumbnail} alt={episode.thumbnail} objectFit="cover" />

                <div className={styles.episodeDetails}>
                  <Link href={`/episodes/${episode.id}`}>
                    <a>{episode.title}</a>
                  </Link>
                  <p>{episode.members}</p>
                  <span>{episode.publishedAt}</span>
                  <span>{episode.durationAsString}</span>
                </div>

                <button type="button" onClick={() => play(episode)}>
                  <img src="/play-green.svg" alt="Tocar Episódio" />
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      <section className={styles.allEpisodes}>
        <h2>Todos episódios</h2>

        <table cellSpacing={0}>
          <thead>
            <tr>
              <th></th>
              <th>Podcast</th>
              <th>Integrantes</th>
              <th>Data</th>
              <th>Duração</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {allEpisodes.map((episode) => {
              return (
                <tr key={episode.id}>
                  <td style={{ width: 72 }}>
                    <Image width={120} height={120} src={episode.thumbnail} alt={episode.title} objectFit="cover" />
                  </td>
                  <td>
                    <Link href={`/episodes/${episode.id}`}>
                      <a>{episode.title}</a>
                    </Link>
                  </td>
                  <td>{episode.members}</td>
                  <td style={{ width: 100 }}>{episode.publishedAt}</td>
                  <td>{episode.durationAsString}</td>
                  <td>
                    <button type="button" onClick={() => play(episode)}>
                      <img src="play-green.svg" alt="Tocar episódio" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </div>
  );
}
// SPA
// modelo de requisição de um SPA, os dados são carregados somente na primeira vez que carrega a tela
// nesse tipo de requisição, uma vez que o javascript do browser for desabilitado, ele para de funcionar
// pois ela depende do javascript para funcionar
// NOTE: usar dentro da function do app
// useEffect(() => {
//   fetch('http://localhost:3333/episodes')
//     .then((response) => response.json())
//     .then((data) => console.log(data));
// }, []);

/* SSR
// modelo de requisição SSR, os dados são carregados todas as vezes que o componente for carregado na tela
// porém independente do javascript  estar ou não habilitado, pois essa requisição está "cacheada" no servidor next

// NOTE: Só o fato de declarar uma function com esse nome "getServerSideProps" já sinaliza para o app react que será usado SSR
export async function getServerSideProps() {
  const response = await fetch('http://localhost:3333/episodes');
  const data = await response.json();

  return {
    props: {
      episodes: data,
    },
  };
}
*/
/* SSG
  modelo de requisição SSG, os dados são carregados uma única vez dentro de um X intervalo de tempo
  independente também do javascript estar ou não habilitado, pois essa requisição está "cacheada" no servidor next
  a diferença entre SSR e SSG é que no SSR eu tenho uma requisição sempre que o meu app é acessado, com SSG, eu posso 
  personalizar quando o app será atualizado com novos dados.
  Exemplo: nosso podcastr teria um novo podcast por dia, não seria então necessário a cada novo acesso, buscar dados no servidor, 
  sabendo que os dados vão ser os mesmos durante todo o dia, com isso personalizamos o nosso app para trazer novos dados
  2 vezes por dia, ou até mesmo 1 vez por dia, otimizando a performance do nosso app.
  
  NOTE: Só o fato de declarar uma function com esse nome "getStaticProps" já sinaliza para o app react que será usado SSG
*/
export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get('episodes', {
    params: {
      _limit: 12,
      _sort: 'published_at',
      _order: 'desc',
    },
  });

  const episodes = data.map((episode) => {
    return {
      id: episode.id,
      title: episode.title,
      thumbnail: episode.thumbnail,
      members: episode.members,
      publishedAt: format(parseISO(episode.published_at), 'd MMM yy', {
        locale: ptBR,
      }),
      durationAsString: convertDurationToTimeString(Number(episode.file.duration)),
      description: episode.description,
      url: episode.file.url,
    };
  });

  const latestEpisodes = episodes.slice(0, 2);
  const allEpisodes = episodes.slice(2, episodes.length);

  const oitoHoras = 60 * 60 * 8;

  return {
    props: {
      episodes,
      latestEpisodes,
      allEpisodes,
    },
    revalidate: oitoHoras,
  };
};
