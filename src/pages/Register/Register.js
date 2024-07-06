// Estilos CSS importados do arquivo Register.module.css
import styles from "./Register.module.css";

// Hooks do React
import { useEffect, useState } from "react";

// Hook personalizado useAuthentication para lidar com autenticação
import { useAuthentication } from "../../hooks/useAuthentication";

const Register = () => {
  // Estados locais para armazenar os dados do formulário e mensagens de erro
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  // Desestruturação dos métodos e estados retornados pelo hook useAuthentication
  const { createUser, error: authError, loading } = useAuthentication();

  // Função para lidar com o envio do formulário de registro
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Limpa qualquer mensagem de erro anterior
    setError("");

    // Verifica se as senhas fornecidas são iguais
    if (password !== confirmPassword) {
      setError("As senhas precisam ser iguais.");
      return;
    }

    // Cria um objeto com os dados do usuário para ser enviado ao método createUser
    const user = {
      displayName,
      email,
      password,
    };

    // Chama o método createUser do hook useAuthentication para registrar o usuário
    const res = await createUser(user);

    console.log(res); // Exibe a resposta da criação do usuário no console
  };

  // Efeito para lidar com erros de autenticação
  useEffect(() => {
    // Atualiza o estado de erro local com o erro de autenticação, se houver
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  // Renderiza o componente de registro
  return (
    <div className={styles.register}>
      {/* Título e descrição do formulário de registro */}
      <h1>Cadastre-se para postar</h1>
      <p>Crie seu usuário e compartilhe suas histórias</p>

      {/* Formulário de registro */}
      <form onSubmit={handleSubmit}>
        {/* Campo para inserção do nome do usuário */}
        <label>
          <span>Nome:</span>
          <input
            type="text"
            name="displayName"
            required
            placeholder="Nome do usuário"
            onChange={(e) => setDisplayName(e.target.value)}
            value={displayName}
          />
        </label>

        {/* Campo para inserção do e-mail do usuário */}
        <label>
          <span>E-mail:</span>
          <input
            type="email"
            name="email"
            required
            placeholder="E-mail do usuário"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </label>

        {/* Campo para inserção da senha do usuário */}
        <label>
          <span>Senha:</span>
          <input
            type="password"
            name="password"
            required
            placeholder="Insira a senha"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </label>

        {/* Campo para confirmação da senha do usuário */}
        <label>
          <span>Confirmação de senha:</span>
          <input
            type="password"
            name="confirmPassword"
            required
            placeholder="Confirme a senha"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
          />
        </label>

        {/* Botão de registro, desabilitado durante o carregamento */}
        {!loading && <button className="btn">Registrar</button>}
        {loading && (
          <button className="btn" disabled>
            Aguarde...
          </button>
        )}

        {/* Exibe mensagens de erro, caso tenha */}
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default Register;
