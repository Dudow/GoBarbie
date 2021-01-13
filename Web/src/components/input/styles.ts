import styled, {css} from 'styled-components'

import Tooltip from '../tooltip/index'

interface ContainerProps{
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`

  background: #232129;
  border-radius: 10px;
  border: 2px solid #232129;
  padding: 16px;
  width: 100%;
  display: flex;
  align-items: center;

  & + div {
    margin-top: 8px;
  }

  ${props => props.isErrored && css`
    border-color: #c53030;
  `}

  ${props => props.isFocused && css`
    color: #ff9000;
    border-color: #ff9000;
  `}

  ${props => props.isFilled && css`
    color: #ff9000;
  `} 
  
  input{

    background: transparent;
    border: 0;
    flex: 1;
    color: #f4ede8;

    &::placeholder{
      color: #f4ede8;
    }

  }

  svg{
    margin-right: 16px;
    min-height: 20px;
    min-width: 20px;
  }

`

export const Error = styled(Tooltip)`
  height:20px;
  margin-left: 16px;
  
  svg{
    margin: 0;
  }

  span{
    background: #c53030;
    color: #f4ede8;

    &::before{
      border-color: #c53030 transparent;
    }
  }
`
