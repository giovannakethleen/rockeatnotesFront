import styled from 'styled-components'

export const Container = styled.textarea`
  width: 100%;
  height: 150px;

  background-color: ${({ theme }) => theme.COLORS.BACKGROUND_900};
  color: ${({ theme }) => theme.COLORS.WHITE};

  border: none;

  //caixa com tamanho fixo
  resize: none;

  margin-bottom: 8px;
  border-radius: 10px;
  padding: 16px;
  outline: none;
 
    


 &::placeholder{
  color: ${({ theme }) => theme.COLORS.GRAY_300};
  
 };



`