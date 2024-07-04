// Página de detalhes de um post

import { Link } from "react-router-dom";

import styles from "./PostDetail.module.css";

const PostDetail = ({ post }) => {
  return (
    <div className={styles.post_detail}>
      <img src={post.image} alt={post.title} />
      <h2>{post.title}</h2>
      <p>Cliente: <strong>{post.createdBy}</strong></p>
      <p>Funcionário: <strong>{post.selectedEmployee}</strong></p>
      <p>Horário: <strong>{post.time}</strong></p>
      <p>Data do Agendamento: <strong>{post.date}</strong></p>
      <p>Observação: <strong>{post.body}</strong></p>
      <div className={styles.tags}>
        {post.tags.map((tag) => (
          <p key={tag}>
            <span>#</span>
            {tag}
          </p>
        ))}
      </div>
      <Link to={`/posts/${post.id}`} className="btn btn-outline">
        Verificar
      </Link>
    </div>
  );
};

export default PostDetail;
