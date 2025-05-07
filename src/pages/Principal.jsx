import React, { useEffect as trazerDadosUsuario, useState } from 'react';
import { auth, db } from '../firebase/config';
import { doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

const TelaPrincipal = () => {
  const [usuario, setUsuario] = useState(null);

  const formatarDataBR = (dataString) => {
    if (!dataString) return '';
    const [ano, mes, dia] = dataString.split('-');
    return `${dia}/${mes}/${ano}`;
  };

  const sair = () => {
    window.location.href = '/login';
  };
  

  trazerDadosUsuario(() => {
    const verificarAutenticacao = () => {
      onAuthStateChanged(auth, async (usuarioFirebase) => {
        if (usuarioFirebase) {
          const uid = usuarioFirebase.uid;
          const documento = await getDoc(doc(db, 'usuarios', uid));
          if (documento.exists()) {
            setUsuario(documento.data());
          } else {
            console.warn('Usuário não encontrado no Firestore');
          }
        } else {           
          window.location.href = '/';
        }
      });
    };

    verificarAutenticacao();
  }, []);

  if (!usuario) {
    return <div style={styles.container}><p>Carregando dados...</p></div>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.cartao}>
        <h2 style={styles.titulo}>Bem-vindo(a), {usuario.nome}!</h2>
        <p><strong>Nome:</strong> {usuario.nome}</p>
        <p><strong>Sobrenome:</strong> {usuario.sobrenome}</p>
        <p><strong>E-mail:</strong> {usuario.email}</p>         
        <p><strong>Data de nascimento:</strong> {formatarDataBR(usuario.dataNascimento)}</p>                
        <button onClick={sair} style={styles.botao}>Sair</button>

      </div>
    </div>
  );
};

const styles = {
  container: {
    background: 'linear-gradient(135deg, #dce9f9, #b9d4f2)',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
  },
  cartao: {
    backgroundColor: '#ffffff',
    padding: '40px',
    borderRadius: '12px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '400px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  titulo: {
    textAlign: 'center',
    color: '#1a3e5f',
    fontSize: '24px',
    fontWeight: '600',
  },
  botao: {
    padding: '12px',
    background: 'linear-gradient(90deg, #1a3e5f, #3d5d8c)',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'all 0.3s ease-in-out',
  },
};

export default TelaPrincipal;
