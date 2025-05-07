import React from "react";
import styles from "../styles/stylePagina";

const Titulo = ({ texto }) => {
  return <h2 style={styles.titulo}>{texto}</h2>;
};

export default Titulo;
