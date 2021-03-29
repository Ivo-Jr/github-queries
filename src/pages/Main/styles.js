import styled, { keyframes, css } from 'styled-components';

export const Form = styled.form`
  margin-top: 30px;
  display: flex;
  flex-direction: row;
  height: 30px;

  input {
    flex: 1;
    border: 2px solid ${props => (props.error ? 'red' : '#eee')};
    padding: 10px, 15px;
    border-radius: 4px;
    font-size: 16px;
  }
`;

// Funcionalidade 'keyframes' faz animações.

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

// ".attrs() (atributos)-> Passando propriedades do button para o css"
export const SubmitButton = styled.button.attrs(props => ({
  type: 'submit',
  disabled: props.loading,
}))`
  background: linear-gradient(-90deg, #3648ee, #36a4ee);
  border: 0;
  padding: 0 15px;
  margin-left: 10px;
  border-radius: 4px;

  display: flex;
  justify-content: center;
  align-items: center;

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
  }

  // A funcionalidade 'css' permite que adicionemos um conjunto de css a um elemento baseado numa propriedade ou informação que vem de fora dele.
  // Como o "svg" está formando um conjunto de propriedades, usamos a propriedade importada 'css'.
  ${props =>
    props.loading &&
    css`
      svg {
        animation: ${rotate} 2s linear infinite;
      }
    `}
`;

export const List = styled.ul`
  list-style: none;
  margin-top: 30px;

  li {
    padding: 15px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;

    & + li {
      border-top: 1px solid #eee;
    }

    a {
      color: #36a4ee;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;
