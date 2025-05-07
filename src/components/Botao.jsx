import React from "react";
import styles from "../styles/stylePagina";

const Botao = ({ onClick, children }) => {
  return (
    <button onClick={onClick} style={{ ...styles.botao }}>
      {children}
    </button>
  );
};

export default Botao;
