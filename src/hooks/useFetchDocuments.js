// Importa hooks necessários do React e funções do Firebase Firestore
import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  where,
} from "firebase/firestore";

// Hook useFetchDocuments para buscar documentos no Firestore com opções de filtro
export const useFetchDocuments = (docCollection, search = null, uid = null) => {
  // Estados locais para armazenar os documentos, erro e estado de carregamento
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  // Estado para lidar com cancelamentos
  const [cancelled, setCancelled] = useState(false);

  // Efeito useEffect para carregar os documentos baseados na coleção e opções fornecidas
  useEffect(() => {
    // Função assíncrona para carregar os documentos
    async function loadData() {
      if (cancelled) {
        return; // Se o hook estiver cancelado, retorna sem fazer nada
      }

      setLoading(true); // Define estado de carregamento como verdadeiro

      const collectionRef = await collection(db, docCollection); // Referência da coleção no Firestore

      try {
        let q;

        // Constrói a query baseado nos parâmetros fornecidos (search e uid)
        if (search) {
          q = await query(
            collectionRef,
            where("tags", "array-contains", search), // Filtra documentos por tags
            orderBy("createdAt", "desc") // Ordena por data de criação descendente
          );
        } else if (uid) {
          q = await query(
            collectionRef,
            where("uid", "==", uid), // Filtra documentos pelo ID do usuário
            orderBy("createdAt", "desc") // Ordena por data de criação descendente
          );
        } else {
          q = await query(collectionRef, orderBy("createdAt", "desc")); // Query padrão: ordena por data de criação descendente
        }

        // Registra um listener onSnapshot para obter atualizações em tempo real dos documentos
        await onSnapshot(q, (querySnapshot) => {
          // Atualiza o estado dos documentos com os dados dos documentos no snapshot
          setDocuments(
            querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
          );
        });
      } catch (error) {
        console.log(error);
        setError(error.message); // Define erro se houver algum problema durante a busca
      }

      setLoading(false); // Finaliza o estado de carregamento
    }

    loadData(); // Chama a função para carregar os documentos ao montar o componente
  }, [docCollection, search, uid, cancelled]); // Dependências do useEffect: docCollection, search, uid e cancelled

  // Efeito useEffect para lidar com cancelamento seguro do componente
  useEffect(() => {
    return () => setCancelled(true); // Retorna função de limpeza para definir cancelamento como verdadeiro
  }, []);

  // Retorna os documentos, estado de carregamento e erro para uso no componente
  return { documents, loading, error };
};
