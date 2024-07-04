import styles from "./Search.module.css";

// hooks
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useQuery } from "../../hooks/useQuery";

// components
import PostDetail from "../../components/PostDetail";
import { Link } from "react-router-dom";

const Search = () => {
  const query = useQuery();
  const search = query.get("q");

  const { documents: posts, loading } = useFetchDocuments("posts", search);

  return (
    <div className={styles.search_container}>
      <h1>Resultados encontrados para: {search}</h1>
      <div className="post-list">
        {loading && <p>Carregando...</p>}
        {!loading && posts && posts.length === 0 && (
          <>
            <p>Não foram encontradas nenhuma lavagem a partir da sua busca...</p>
            <Link to="/" className="btn btn-dark">
              Voltar
            </Link>
          </>
        )}
        {!loading && posts && posts.map((post) => (
          <PostDetail key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Search;
