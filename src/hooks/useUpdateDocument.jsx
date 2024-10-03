import { useState, useEffect, useReducer } from "react";
import { db } from "../firebase/config";
import { updateDoc, doc } from "firebase/firestore";

// Estado inicial para o hook
const initialState = {
  loading: null,
  error: null,
};

// Reducer para gerenciar o estado durante o processo de atualização
const updateReducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return { loading: true, error: null };
    case "UPDATED_DOC":
      return { loading: false, error: null };
    case "ERROR":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// Hook useUpdateDocument para atualizar documentos no Firestore
export const useUpdateDocument = (docCollection) => {
  // Usa useReducer para gerenciar o estado do hook
  const [response, dispatch] = useReducer(updateReducer, initialState);

  // Estado para lidar com cancelamentos
  const [cancelled, setCancelled] = useState(false);

  // Função auxiliar para checar cancelamento antes de despachar ação
  const checkCancelBeforeDispatch = (action) => {
    if (!cancelled) {
      dispatch(action);
    }
  };

  // Função assíncrona para atualizar um documento existente
  const updateDocument = async (uid, data) => {
    // Checa cancelamento antes de despachar ação de carregamento
    checkCancelBeforeDispatch({ type: "LOADING" });

    try {
      // Referência ao documento no Firestore
      const docRef = await doc(db, docCollection, uid);

      // Atualiza o documento com os novos dados fornecidos
      const updatedDocument = await updateDoc(docRef, data);

      // Despacha ação de documento atualizado com sucesso
      checkCancelBeforeDispatch({
        type: "UPDATED_DOC",
        payload: updatedDocument,
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

  // Retorna a função updateDocument e o estado response para uso no componente
  return { updateDocument, response };
};
