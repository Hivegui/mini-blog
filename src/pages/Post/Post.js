// Estilos CSS importados do arquivo Post.module.css
import styles from "./Post.module.css";

// Hook personalizado useFetchDocument para buscar um documento específico
import { useFetchDocument } from "../../hooks/useFetchDocument";
import { useParams } from "react-router-dom";

const Post = () => {
  // Obtém o parâmetro 'id' da URL usando o hook useParams
  const { id } = useParams();

  // Utiliza o hook useFetchDocument para buscar o documento 'post' com o id específico
  const { document: post, loading, error } = useFetchDocument("posts", id);

  // Se estiver carregando, exibe uma mensagem de carregamento
  if (loading) {
    return <p>Carregando...</p>;
  }

  // Se ocorrer um erro ao carregar o post, exibe uma mensagem de erro
  if (error) {
    return <p>Ocorreu um erro ao carregar o post.</p>;
  }

  // Renderiza o conteúdo do post se ele existir
  return (
    <div className={styles.post_container}>
      {post && (
        <>
          {/* Título do post */}
          <h1>{post.title}</h1>

          {/* Imagem do post */}
          <img src={post.image} alt={post.title} />

          {/* Informações sobre o post */}
          <p>Cliente: <strong>{post.createdBy}</strong></p>
          <p>Funcionário: <strong>{post.selectedEmployee}</strong></p>
          <p>Observação: <strong>{post.body}</strong></p>
          <p>Horário: {post.time}</p>
          <p>Data: {post.date}</p>
          <p>Preço: <strong>{post.washPrice}</strong></p> {/* Corrigir o nome do campo */}

          {/* Tags do post */}
          <h3>Tags:</h3>
          <div className={styles.tags}>
            {post.tags.map((tag) => (
              <p key={tag}>
                <span>#</span>
                {tag}
              </p>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Post;
