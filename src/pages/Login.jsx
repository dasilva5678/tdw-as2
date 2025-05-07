import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, fetchSignInMethodsForEmail } from "../firebase/config";
import Botao from "../components/Botao";
import Form from "../components/Form";
import Titulo from "../components/Titulo";
import styles from "../styles/stylePagina";

const TelaLogin = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const realizarLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, senha);
      window.location.href = "/principal";
    } catch (error) {
      setErro("");

      switch (error.code) {
        case "auth/invalid-credential":
          setErro("Credenciais inválidas.");
          break;
        case "auth/user-not-found":
          setErro("Usuário não encontrado.");
          break;
        case "auth/wrong-password":
          setErro("Senha incorreta.");
          break;
        case "auth/invalid-email":
          setErro("E-mail inválido.");
          break;
        case "auth/missing-password":
          setErro("Digite uma senha válida.");
          break;
        default:
          setErro("Erro ao fazer login. Tente novamente.");
          break;
      }
    }
  };
  const cadastrarUsuario = () => {
    window.location.href = "/cadastro";
  };

  return (
    <div style={styles.container}>
      <div style={styles.cartao}>
        <Titulo texto="Login" />
        {erro && <p style={styles.erro}>{erro}</p>}
        <Form
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Form
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        <Botao onClick={realizarLogin}>Entrar</Botao>
        <Botao onClick={cadastrarUsuario}>Cadastrar</Botao>
      </div>
    </div>
  );
};

export default TelaLogin;
