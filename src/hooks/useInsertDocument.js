// Importa hooks necessários do React e funções do Firebase Firestore
import { useState, useEffect, useReducer } from "react";
import { db } from "../firebase/config";
import { collection, addDoc, Timestamp } from "firebase/firestore";

// Estado inicial para o hook
const initialState = {
  loading: null,
  error: null,
};

// Reducer para gerenciar o estado durante o processo de inserção
const insertReducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return { loading: true, error: null };
    case "INSERTED_DOC":
      return { loading: false, error: null };
    case "ERROR":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// Hook useInsertDocument para inserir documentos no Firestore
export const useInsertDocument = (docCollection) => {
  // Usa useReducer para gerenciar o estado do hook
  const [response, dispatch] = useReducer(insertReducer, initialState);

  // Estado para lidar com cancelamentos
  const [cancelled, setCancelled] = useState(false);

  // Função auxiliar para checar cancelamento antes de despachar ação
  const checkCancelBeforeDispatch = (action) => {
    if (!cancelled) {
      dispatch(action);
    }
  };

  // Função assíncrona para inserir um novo documento
  const insertDocument = async (document) => {
    // Checa cancelamento antes de despachar ação de carregamento
    checkCancelBeforeDispatch({ type: "LOADING" });

    try {
      // Adiciona a data de criação atual ao documento antes de inserir
      const newDocument = { ...document, createdAt: Timestamp.now() };

      // Insere o documento na coleção especificada no Firestore
      const insertedDocument = await addDoc(
        collection(db, docCollection),
        newDocument
      );

      // Despacha ação de documento inserido com sucesso
      checkCancelBeforeDispatch({
        type: "INSERTED_DOC",
        payload: insertedDocument,
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

  // Retorna a função insertDocument e o estado response para uso no componente
  return { insertDocument, response };
};
