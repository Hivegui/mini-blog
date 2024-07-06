import styles from "./Post.module.css";
import { useFetchDocument } from "../../hooks/useFetchDocument";
import { useParams } from "react-router-dom";

const Post = () => {
  const { id } = useParams();
  const { document: post, loading, error } = useFetchDocument("posts", id);

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>Ocorreu um erro ao carregar o post.</p>;
  }

  return (
    <div className={styles.post_container}>
      {post && (
        <>
          <h1>{post.title}</h1>
          <img src={post.image} alt={post.title} />
          <p>Cliente: <strong>{post.createdBy}</strong></p>
          <p>Funcionário: <strong>{post.selectedEmployee}</strong></p>
          <p>Observação: <strong>{post.body}</strong></p>
          <p>Horário: {post.time}</p>
          <p>Data: {post.date}</p>
          <p>Preço: <strong>{post.washPrice}</strong></p> {/* Corrigir o nome do campo */}
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
