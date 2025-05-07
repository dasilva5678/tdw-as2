import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc as salvaDadosFirestore } from "firebase/firestore";
import { auth, db } from "../firebase/config";
import { useNavigate } from "react-router-dom";
import Botao from "../components/Botao";
import Form from "../components/Form";
import Titulo from "../components/Titulo";
import styles from "../styles/stylePagina";

const Cadastro = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const navegar = () => {
    navigate("/principal");
  };

  const cadastro = async () => {
    try {
      const credenciais = await createUserWithEmailAndPassword(
        auth,
        email,
        senha
      );

      const user = credenciais.user;

      await salvaDadosFirestore(doc(db, "usuarios", user.uid), {
        uid: user.uid,
        nome,
        sobrenome,
        dataNascimento,
        email,
        criadoEm: new Date(),
      });

      navegar();
    } catch (error) {
      setErro("");

      switch (error.code) {
        case "auth/email-already-in-use":
          setErro("Este e-mail já está em uso. Tente com um e-mail diferente.");
          break;
        case "auth/weak-password":
          setErro("A senha deve ter pelo menos 6 caracteres.");
          break;
        case "auth/invalid-email":
          setErro("O e-mail fornecido é inválido.");
          break;
        default:
          setErro("Ocorreu um erro ao cadastrar. Tente novamente.");
          break;
      }
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <Titulo texto="Cadastro" />
        {erro && <p style={styles.erro}>{erro}</p>}
        <Form
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Form
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        <Form
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <Form
          type="text"
          placeholder="Sobrenome"
          value={sobrenome}
          onChange={(e) => setSobrenome(e.target.value)}
        />
        <input
          type="date"
          value={dataNascimento}
          onChange={(e) => setDataNascimento(e.target.value)}
          style={styles.input}
        />
        <Botao onClick={cadastro}>Cadastrar</Botao>
      </div>
    </div>
  );
};

export default Cadastro;
