// Importa hooks necessários do React e funções do Firebase Firestore
import { useState, useEffect, useReducer } from "react";
import { db } from "../firebase/config";
import { doc, deleteDoc } from "firebase/firestore";

// Estado inicial para o hook
const initialState = {
  loading: null,
  error: null,
};

// Reducer para gerenciar o estado durante o processo de exclusão
const deleteReducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return { loading: true, error: null };
    case "DELETED_DOC":
      return { loading: false, error: null };
    case "ERROR":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// Hook useDeleteDocument para exclusão de documentos no Firestore
export const useDeleteDocument = (docCollection) => {
  // Usa useReducer para gerenciar o estado do hook
  const [response, dispatch] = useReducer(deleteReducer, initialState);

  // Estado para lidar com cancelamentos
  const [cancelled, setCancelled] = useState(false);

  // Função auxiliar para checar cancelamento antes de despachar ação
  const checkCancelBeforeDispatch = (action) => {
    if (!cancelled) {
      dispatch(action);
    }
  };

  // Função assíncrona para deletar um documento pelo ID
  const deleteDocument = async (id) => {
    // Checa cancelamento antes de despachar ação de carregamento
    checkCancelBeforeDispatch({ type: "LOADING" });

    try {
      // Deleta o documento usando deleteDoc do Firestore
      const deletedDocument = await deleteDoc(doc(db, docCollection, id));

      // Despacha ação de documento deletado com sucesso
      checkCancelBeforeDispatch({
        type: "DELETED_DOC",
        payload: deletedDocument,
      });
    } catch (error) {
      // Em caso de erro, despacha ação de erro com mensagem
      checkCancelBeforeDispatch({ type: "ERROR", payload: error.message });
    }
  };

  // Efeito de limpeza para lidar com cancelamento do componente
  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  // Retorna a função deleteDocument e o estado response para uso no componente
  return { deleteDocument, response };
};
