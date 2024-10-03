// Importa funções específicas do Firebase Auth e hooks do React
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";
import { useState, useEffect } from "react";

// Define e exporta o hook useAuthentication
export const useAuthentication = () => {
  // Estados locais para gerenciar erros, carregamento e cancelamento
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const [cancelled, setCancelled] = useState(false);

  // Obtém a instância de autenticação do Firebase
  const auth = getAuth();

  // Função auxiliar para verificar se o hook foi cancelado
  function checkIfIsCancelled() {
    if (cancelled) {
      return;
    }
  }

  // Função assíncrona para criar um novo usuário
  const createUser = async (data) => {
    checkIfIsCancelled();
    setLoading(true);

    try {
      // Cria o usuário com e-mail e senha
      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      // Atualiza o perfil do usuário com o nome fornecido
      await updateProfile(user, {
        displayName: data.displayName,
      });

      return user; // Retorna o objeto do usuário criado
    } catch (error) {
      // Trata erros específicos e define mensagens de erro personalizadas
      let systemErrorMessage;
      if (error.message.includes("Password")) {
        systemErrorMessage = "A senha precisa conter pelo menos 6 caracteres.";
      } else if (error.message.includes("email-already")) {
        systemErrorMessage = "E-mail já cadastrado.";
      } else {
        systemErrorMessage = "Ocorreu um erro, por favor tente mais tarde.";
      }
      setError(systemErrorMessage); // Define o erro no estado de erro
    }
    setLoading(false); // Finaliza o estado de carregamento
  };

  // Função para fazer logout do usuário
  const logout = () => {
    checkIfIsCancelled();
    signOut(auth); // Realiza o logout usando a instância de autenticação
  };

  // Função assíncrona para fazer login do usuário
  const login = async (data) => {
    checkIfIsCancelled();
    setLoading(true);
    setError(false); // Limpa qualquer erro anterior

    try {
      // Faz o login do usuário com e-mail e senha
      await signInWithEmailAndPassword(auth, data.email, data.password);
    } catch (error) {
      // Trata erros específicos e define mensagens de erro personalizadas
      let systemErrorMessage;
      if (error.message.includes("user-not-found")) {
        systemErrorMessage = "Usuário não encontrado.";
      } else if (error.message.includes("wrong-password")) {
        systemErrorMessage = "Senha incorreta.";
      } else {
        systemErrorMessage = "Ocorreu um erro, por favor tente mais tarde.";
      }
      setError(systemErrorMessage); // Define o erro no estado de erro
    }
    setLoading(false); // Finaliza o estado de carregamento
  };

  // Efeito de limpeza para garantir que o hook seja cancelado corretamente
  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  // Retorna os valores e funções necessárias para autenticação
  return {
    auth,
    createUser,
    error,
    logout,
    login,
    loading,
  };
};
