// Importa as funções useContext e createContext do React
import { useContext, createContext } from "react";

// Cria um contexto para autenticação usando createContext do React
const AuthContext = createContext();

// Componente AuthProvider que provê o contexto de autenticação para toda a aplicação
export function AuthProvider({ children, value }) {
  // Retorna o componente Provider do contexto AuthContext, passando o valor recebido por propriedade
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Hook useAuthValue para acessar o valor do contexto de autenticação
export function useAuthValue() {
  // Retorna o valor atual do contexto AuthContext usando o hook useContext do React
  return useContext(AuthContext);
}
