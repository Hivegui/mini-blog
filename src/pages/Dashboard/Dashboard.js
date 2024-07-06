import React from "react";
import styles from "./Dashboard.module.css";
import { Link } from "react-router-dom";
import { useAuthValue } from "../../contexts/AuthContext";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useDeleteDocument } from "../../hooks/useDeleteDocument";

const Dashboard = () => {
  // Obtém o usuário autenticado do contexto de autenticação
  const { user } = useAuthValue();
  const uid = user.uid; // Obtém o UID do usuário autenticado

  // Busca os documentos (lavagens) associados ao usuário atual
  const { documents: posts } = useFetchDocuments("posts", null, uid);

  // Hook personalizado para deletar documentos (lavagens)
  const { deleteDocument } = useDeleteDocument("posts");

  // Renderização do componente
  return (
    <div className={styles.dashboard}>
      <h2>Dashboard</h2>
      <p>Gerenciar as Lavagens</p>

      {/* Verifica se não há lavagens cadastradas */}
      {posts && posts.length === 0 ? (
        <div className={styles.noposts}>
          <p>Não foram encontradas nenhuma lavagem.</p>
          {/* Link para agendar a primeira lavagem */}
          <Link to="/posts/create" className="btn">
            Agendar sua primeira lavagem?
          </Link>
        </div>
      ) : (
        // Caso existam lavagens, exibe o cabeçalho da tabela
        <div className={styles.post_header}>
          <span>Lavagens</span>
          <span>Ações</span>
        </div>
      )}

      {/* Renderiza cada lavagem encontrada */}
      {posts &&
        posts.map((post) => (
          <div className={styles.post_row} key={post.id}>
            <p>{post.title}</p>
            <div className={styles.actions}>
              {/* Botão para visualizar detalhes da lavagem */}
              <Link to={`/posts/${post.id}`} className="btn btn-outline">
                Visualizar
              </Link>
              {/* Botão para editar a lavagem */}
              <Link to={`/posts/edit/${post.id}`} className="btn btn-outline">
                Editar
              </Link>
              {/* Botão para concluir a lavagem */}
              <button
                onClick={() => deleteDocument(post.id)}
                className="btn btn-outline btn-conclude"
              >
                Concluir
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Dashboard;
