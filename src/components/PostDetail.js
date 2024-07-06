// Importações
import { Link } from "react-router-dom";
import styles from "./PostDetail.module.css";

const PostDetail = ({ post }) => {
  return (
    <div className={styles.post_detail}>
      {/* Exibe a imagem do post */}
      <img src={post.image} alt={post.title} />

      {/* Exibe o título do post */}
      <h2>{post.title}</h2>

      {/* Exibe o cliente associado ao post */}
      <p>Cliente: <strong>{post.createdBy}</strong></p>

      {/* Exibe o funcionário selecionado para o serviço */}
      <p>Funcionário: <strong>{post.selectedEmployee}</strong></p>

      {/* Exibe o horário agendado */}
      <p>Horário: <strong>{post.time}</strong></p>

      {/* Exibe a data do agendamento */}
      <p>Data do Agendamento: <strong>{post.date}</strong></p>

      {/* Exibe a observação associada ao agendamento */}
      <p>Observação: <strong>{post.body}</strong></p>

      {/* Exibe o preço do serviço de lavagem */}
      <p>Preço: <strong>{post.washPrice}</strong></p>

      {/* Exibe as tags associadas ao post */}
      <div className={styles.tags}>
        {post.tags.map((tag) => (
          <p key={tag}>
            <span>#</span>
            {tag}
          </p>
        ))}
      </div>

      {/* Link para visualizar detalhes adicionais do post */}
      <Link to={`/posts/${post.id}`} className="btn btn-outline">
        Verificar
      </Link>
    </div>
  );
};

export default PostDetail;
