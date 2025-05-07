import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/config';

const TelaLogin = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const realizarLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, senha);
      window.location.href = '/principal';  
    } catch (erro) {
      setErro('E-mail ou senha inválidos.');
      console.error('Erro no login:', erro);
    }
  };
  const cadastrarUsuario = () => {
    window.location.href = '/cadastro';
  };

  return (
    <div style={estilos.container}>
      <div style={estilos.cartao}>
        <h2 style={estilos.titulo}>Login</h2>
        {erro && <p style={estilos.erro}>{erro}</p>}
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={estilos.input}
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          style={estilos.input}
        />
        <button onClick={realizarLogin} style={estilos.botao}>
          Entrar
        </button>
        <button onClick={cadastrarUsuario} style={estilos.botao}>
          Cadastrar
        </button>
      </div>
    </div>
  );
};

const estilos = {
  container: {
    background: 'linear-gradient(135deg, #e6ecff, #c9d8f2)',
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
    gap: '16px',
  },
  titulo: {
    textAlign: 'center',
    color: '#1a3e5f',
    fontSize: '28px',
    fontWeight: '600',
    marginBottom: '10px',
  },
  input: {
    padding: '12px',
    border: '1px solid #ccd4e0',
    borderRadius: '8px',
    fontSize: '15px',
    outline: 'none',
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
  
  erro: {
    color: 'red',
    textAlign: 'center',
    marginBottom: '10px',
  },
};

export default TelaLogin;
