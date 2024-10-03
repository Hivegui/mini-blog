// Importações necessárias do Firestore
import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  where,
} from "firebase/firestore";

// Hook personalizado para buscar documentos
export const useFetchDocuments = (docCollection, search = null, uid = null) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cancelled, setCancelled] = useState(false);

  useEffect(() => {
    async function loadData() {
      if (cancelled) return;

      setLoading(true);

      try {
        const collectionRef = collection(db, docCollection);
        let q;

        // Constrói a query baseado nos parâmetros fornecidos (search e uid)
        if (search) {
          // Pesquisa tanto em `tagsArr` quanto em `title`
          q = query(
            collectionRef,
            where("tagsArr", "array-contains", search), // Pesquisa nas tags
            orderBy("createdAt", "desc")
          );

          // Adiciona uma consulta para pesquisar também pelo título
          const qTitle = query(
            collectionRef,
            where("title", "==", search), // Pesquisa pelo título
            orderBy("createdAt", "desc")
          );

          // Registra listeners para ambas as consultas
          const unsubscribeTags = onSnapshot(q, (querySnapshot) => {
            const results = querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            setDocuments(results);
            setLoading(false);
          });

          const unsubscribeTitle = onSnapshot(qTitle, (querySnapshot) => {
            const results = querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            // Garante que prevDocs é uma lista
            setDocuments((prevDocs = []) => {
              const combinedDocs = [...prevDocs, ...results];
              // Remove duplicados (se necessário)
              const uniqueDocs = Array.from(
                new Map(combinedDocs.map((item) => [item["id"], item])).values()
              );
              return uniqueDocs;
            });
            setLoading(false);
          });

          return () => {
            unsubscribeTags();
            unsubscribeTitle();
          };
        } else if (uid) {
          q = query(
            collectionRef,
            where("uid", "==", uid),
            orderBy("createdAt", "desc")
          );
        } else {
          q = query(collectionRef, orderBy("createdAt", "desc"));
        }

        // Registra um listener para a query padrão
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const results = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setDocuments(results);
          setLoading(false);
        });

        return () => unsubscribe();
      } catch (error) {
        console.error("Erro ao carregar documentos:", error);
        setError(error.message);
        setLoading(false);
      }
    }

    loadData();

    return () => setCancelled(true);
  }, [docCollection, search, uid, cancelled]);

  return { documents, loading, error };
};
