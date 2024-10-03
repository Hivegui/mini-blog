import React, { useState } from "react";
import styles from "./Dashboard.module.css";
import { Link } from "react-router-dom";
import { useAuthValue } from "../../contexts/AuthContext";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useDeleteDocument } from "../../hooks/useDeleteDocument";

const Dashboard = () => {
  // Obtém o usuário autenticado do contexto de autenticação
  const { user } = useAuthValue();
  const uid = user.uid; // Obtém o UID do usuário autenticado

  // Busca os documentos (posts) associados ao usuário atual
  const { documents: posts } = useFetchDocuments("posts", null, uid);

  // Hook personalizado para deletar documentos (posts)
  const { deleteDocument } = useDeleteDocument("posts");

  // Estado para controle do modal de confirmação
  const [showModal, setShowModal] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);

  // Função para abrir o modal e passar o post completo
  const openModal = (post) => {
    setPostToDelete(post); // Define o post completo para ter acesso ao título
    setShowModal(true);
  };

  // Função para fechar o modal
  const closeModal = () => {
    setShowModal(false);
    setPostToDelete(null);
  };

  // Função para deletar o post após confirmação
  const handleDelete = () => {
    deleteDocument(postToDelete.id);
    closeModal();
  };

  // Renderização do componente
  return (
    <div className={styles.dashboard}>
      <h2>Dashboard</h2>
      <p>Gerencie os seus posts</p>
      {posts && posts.length === 0 ? (
        <div className={styles.noposts}>
          <p>Não foram encontrados posts</p>
          <Link to="/posts/create" className="btn">
            Criar seu primeiro post
          </Link>
        </div>
      ) : (
        <>
          <div className={styles.post_header}>
            <span>Título</span>
            <span>Ações</span>
          </div>
          {posts &&
            posts.map((post) => (
              <div key={post.id} className={styles.post_row}>
                <p>{post.title}</p>
                <div className={styles.buttons}>
                  <Link to={`/posts/${post.id}`} className="btn btn-outline">
                    Ver
                  </Link>
                  <Link
                    to={`/posts/edit/${post.id}`}
                    className="btn btn-outline"
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() => openModal(post)}
                    className="btn btn-outline btn-danger"
                  >
                    Excluir
                  </button>
                </div>
              </div>
            ))}
        </>
      )}

      {/* Modal de confirmação */}
      {showModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            {/* Mostra o nome do post no modal */}
            <p>Tem certeza que deseja excluir: "{postToDelete?.title}"?</p>
            <div className={styles.modalButtons}>
              <button onClick={handleDelete} className={styles.confirmButton}>
                Confirmar
              </button>
              <button onClick={closeModal} className={styles.cancelButton}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;