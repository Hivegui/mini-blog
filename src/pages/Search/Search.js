import styles from "./Search.module.css";

// Hooks personalizados
import { useFetchDocuments } from "../../hooks/useFetchDocuments"; // Hook para buscar documentos
import { useQuery } from "../../hooks/useQuery"; // Hook para acessar parâmetros de consulta da URL

// Componentes do React
import PostDetail from "../../components/PostDetail"; // Componente para exibir detalhes de um post
import { Link } from "react-router-dom"; // Componente para navegação entre links

const Search = () => {
  // Utiliza o hook useQuery para obter o parâmetro 'q' da URL de busca
  const query = useQuery();
  const search = query.get("q");

  // Utiliza o hook useFetchDocuments para buscar posts que correspondem à busca
  const { documents: posts, loading } = useFetchDocuments("posts", search);

  return (
    <div className={styles.search_container}>
      {/* Título que indica a busca realizada */}
      <h1>Resultados encontrados para: {search}</h1>

      {/* Lista de posts encontrados */}
      <div className="post-list">
        {/* Exibe mensagem de carregamento se estiver carregando */}
        {loading && <p>Carregando...</p>}

        {/* Exibe mensagem se não houver resultados encontrados */}
        {!loading && posts && posts.length === 0 && (
          <>
            <p>Não foram encontradas nenhuma lavagem a partir da sua busca...</p>
            {/* Link para retornar à página inicial */}
            <Link to="/" className="btn btn-dark">
              Voltar
            </Link>
          </>
        )}

        {/* Exibe detalhes dos posts encontrados */}
        {!loading &&
          posts &&
          posts.map((post) => (
            <PostDetail key={post.id} post={post} />
          ))}
      </div>
    </div>
  );
};

export default Search;
