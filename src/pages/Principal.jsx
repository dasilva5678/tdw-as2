import React, { useEffect as trazerDadosUsuario, useState } from "react";
import { auth, db } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import Botao from "../components/Botao";
import Titulo from "../components/Titulo";
import styles from "../styles/stylePagina";

const TelaPrincipal = () => {
  const [usuario, setUsuario] = useState(null);

  const formatarDataBR = (dataString) => {
    if (!dataString) return "";
    const [ano, mes, dia] = dataString.split("-");
    return `${dia}/${mes}/${ano}`;
  };

  const sair = () => {
    window.location.href = "/login";
  };

  trazerDadosUsuario(() => {
    const verificarAutenticacao = () => {
      onAuthStateChanged(auth, async (usuarioFirebase) => {
        if (usuarioFirebase) {
          const uid = usuarioFirebase.uid;
          const documento = await getDoc(doc(db, "usuarios", uid));
          if (documento.exists()) {
            setUsuario(documento.data());
          }
        } else {
          window.location.href = "/";
        }
      });
    };

    verificarAutenticacao();
  }, []);

  if (!usuario) {
    return (
      <div style={styles.container}>
        <p>Carregando dados...</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.cartao}>
        <Titulo texto="Bem-vindo(a)" />
        <p>
          <strong>Nome:</strong> {usuario.nome}
        </p>
        <p>
          <strong>Sobrenome:</strong> {usuario.sobrenome}
        </p>
        <p>
          <strong>E-mail:</strong> {usuario.email}
        </p>
        <p>
          <strong>Data de nascimento:</strong>{" "}
          {formatarDataBR(usuario.dataNascimento)}
        </p>
        <Botao onClick={sair}>Sair</Botao>
      </div>
    </div>
  );
};

export default TelaPrincipal;
