// Importa hooks necessários do React e funções do Firebase Firestore
import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";

// Hook useFetchDocument para buscar um documento específico no Firestore
export const useFetchDocument = (docCollection, id) => {
  // Estados locais para armazenar o documento, erros e estado de carregamento
  const [document, setDocument] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  // Efeito useEffect para carregar o documento baseado no conteúdo e ID fornecidos
  useEffect(() => {
    // Função assíncrona para carregar o documento
    const loadDocument = async () => {
      setLoading(true);

      try {
        // Referência do documento usando doc do Firestore
        const docRef = await doc(db, docCollection, id);
        
        // Obtém o snapshot do documento usando getDoc do Firestore
        const docSnap = await getDoc(docRef);

        // Define o estado do documento com os dados do snapshot
        if (docSnap.exists()) {
          setDocument(docSnap.data()); // Define os dados do documento no estado
        } else {
          setError("Documento não encontrado."); // Define erro se o documento não existir
        }
      } catch (error) {
        console.log(error);
        setError(error.message); // Define erro se houver algum problema durante a busca
      }

      setLoading(false); // Finaliza o estado de carregamento
    };

    loadDocument(); // Chama a função para carregar o documento ao montar o componente
  }, [docCollection, id]);

  // Retorna o documento, estado de carregamento e erro para uso no componente
  return { document, loading, error };
};
