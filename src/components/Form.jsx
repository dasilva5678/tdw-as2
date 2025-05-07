import React from "react";
import styles from "../styles/stylePagina";

const Form = ({ type, placeholder, value, onChange }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      style={styles.input}
    />
  );
};

export default Form;
