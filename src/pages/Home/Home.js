// CSS
import styles from "./Home.module.css";

// hooks
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useNavigate, Link } from "react-router-dom";

// react
import { useState } from "react";

// components
import PostDetail from "../../components/PostDetail";

const Home = () => {
  const { documents: posts, loading } = useFetchDocuments("posts");

  const navigate = useNavigate();

  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (query) {
      return navigate(`/search?q=${query}`);
    }
  };


  return (
    <div className={styles.home}>
      <h1>Veja as nossas lavagens mais recentes</h1>

      {/* Formulário de pesquisa de posts */}
      <form className={styles.search_form} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Busque pela TAG #..."
          onChange={(e) => setQuery(e.target.value)} // Atualização do estado do termo de busca
        />
        <button className="btn btn-dark">Pesquisar</button>
      </form>

      {/* Lista de posts */}
      <div className="post-list">
        {/* Exibição de mensagem de carregamento enquanto os posts são carregados */}
        {loading && <p>Carregando...</p>}

        {/* Exibição de mensagem caso não haja posts */}
        {posts && posts.length === 0 && (
          <div className={styles.noposts}>
            <p>Não foram encontradas nenhuma lavagem.</p>
            <Link to="/posts/create" className="btn">
              Criar primeiro agendamento
            </Link>
          </div>
        )}

        {/* Mapeamento dos posts e exibição de cada detalhe do post usando o componente PostDetail */}
        {posts && posts.map((post) => <PostDetail key={post.id} post={post} />)}
      </div>
    </div>
  );
};

export default Home;
