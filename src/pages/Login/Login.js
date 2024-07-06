// Estilos CSS importados do arquivo Login.module.css
import styles from "./Login.module.css";

// Hooks do React importados
import { useEffect, useState } from "react";

// Hook personalizado useAuthentication para autenticação
import { useAuthentication } from "../../hooks/useAuthentication";

const Login = () => {
  // Estados locais para armazenar o email, senha e erros de autenticação
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Uso do hook useAuthentication para autenticação
  const { login, error: authError, loading } = useAuthentication();

  // Função para lidar com o envio do formulário de login
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError(""); // Limpar qualquer erro anterior

    const user = {
      email,
      password,
    };

    // Chamar a função de login do hook useAuthentication
    const res = await login(user);

    console.log(res); // Mostrar resultado no console para depuração
  };

  // Efeito useEffect para lidar com erros de autenticação
  useEffect(() => {
    console.log(authError);
    if (authError) {
      setError(authError); // Configurar erro de autenticação para exibição no formulário
    }
  }, [authError]);


  return (
    <div className={styles.login}>
      <h1>Entrar</h1>
      <p>Faça o login para poder utilizar o sistema</p>
      <form onSubmit={handleSubmit}>
        {/* Campo de entrada para o e-mail */}
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

        {/* Campo de entrada para a senha */}
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

        {/* Botão de login */}
        {!loading && <button className="btn">Entrar</button>}
        {loading && (
          <button className="btn" disabled>
            Aguarde...
          </button>
        )}

        {/* Exibição de erro de autenticação */}
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default Login;
