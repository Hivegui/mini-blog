import { useLocation } from "react-router-dom";
import { useMemo } from "react";

// Função useQuery para obter parâmetros de consulta da URL
export function useQuery() {
  // Obtém o objeto location usando useLocation do React Router DOM
  const { search } = useLocation();

  // Usa useMemo para memoizar e retornar uma nova instância de URLSearchParams com base na string de consulta (search)
  return useMemo(() => new URLSearchParams(search), [search]);
}
