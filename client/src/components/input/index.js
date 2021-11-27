// Library Imports
import React from "react";

// Relative Imports
import { Container, Field, Label } from "./styles";

const Input = ({
  id,
  name,
  type,
  label,
  placeholder,
  error,
  value,
  onChange,
  ...rest
}) => {
  return (
    <Container>
      <Label htmlfor={id}>{label}</Label>
      <Field
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        {...rest}
      />
      <Label>{error}</Label>
    </Container>
  );
};

export default Input;
