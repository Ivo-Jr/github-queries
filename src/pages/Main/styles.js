import styled, { keyframes, css } from 'styled-components';

export const Container = styled.div`
  max-width: 700px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
  padding: 30px;
  margin: 80px auto;

  h1 {
    font-size: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;

    svg {
      margin-right: 10px;
    }
  }
`;
export const Form = styled.form`
  margin-top: 30px;
  display: flex;
  flex-direction: row;
  height: 30px;

  input {
    flex: 1;
    border: 1px solid #eee;
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
