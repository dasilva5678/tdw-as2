import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/config';
import { useNavigate } from 'react-router-dom'; 


const Cadastro = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const navigate = useNavigate(); 

  const navegar = () => {
    navigate('/principal');
  };

  const cadastro = async () => {
    try {
      const credenciais = await createUserWithEmailAndPassword(auth, email, senha);
      console.log("👌Usuário criado", credenciais);
      const user = credenciais.user;
      console.log("Usuário criado, ID:", credenciais.user.uid);
      console.log("Salvando dados no Firestore...");
  
      // Grava dados no Firestore
      await setDoc(doc(db, 'usuarios', user.uid), {
        uid: user.uid,
        nome,
        sobrenome,
        dataNascimento,
        email,
        criadoEm: new Date(),
      });
      console.log("Cadastro completo, redirecionando...");
      navegar();
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
        
      // Tratar erros específicos de autenticação
      if (error.code === "auth/email-already-in-use") {
        alert("Este e-mail já está em uso. Tente com um e-mail diferente.");        
      } else if (error.code === 'auth/weak-password') {
        alert('A senha deve ter pelo menos 6 caracteres.');
      } else if (error.code === 'auth/invalid-email') {
        alert('O e-mail fornecido é inválido.');
      } else {
        alert('Ocorreu um erro ao cadastrar. Tente novamente.');
      }   
    }  
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Cadastro</h2>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} style={styles.input} />
        <input type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} style={styles.input} />
        <input type="text" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} style={styles.input} />
        <input type="text" placeholder="Sobrenome" value={sobrenome} onChange={(e) => setSobrenome(e.target.value)} style={styles.input} />
        <input type="date" value={dataNascimento} onChange={(e) => setDataNascimento(e.target.value)} style={styles.input} />
        <button onClick={cadastro} style={styles.botao}>Cadastrar</button>       
      </div>
    </div>
  );
};

const styles = {
  container: {
    background: 'linear-gradient(135deg, #e6ecff, #c9d8f2)',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
  },
  card: {
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
  title: {
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
    color: '#1a3e5f', 
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

export default Cadastro;
