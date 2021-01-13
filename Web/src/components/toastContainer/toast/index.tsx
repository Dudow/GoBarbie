import React, {useEffect} from 'react'
import { FiXCircle, FiCheckCircle, FiInfo ,FiAlertCircle } from 'react-icons/fi'


import {Container} from './styles'
import {ToastMessage, useToast} from '../../../hooks/ToastContext'

interface ToastProps{
  message: ToastMessage;
  style: object;
}

const icons = {
  info: <FiInfo size={24}/>,
  error: <FiAlertCircle size={24}/>,
  success: <FiCheckCircle size={24}/>,
}

const Toast:React.FC<ToastProps> = ({message, style}) => {

  const {removeToast} = useToast()

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(message.id)
    }, 3000);

    return () => {
      clearTimeout(timer)
    }

  }, [message, removeToast])

  return(
    <Container type={message.type} hasDescription={!!message.description} style={style}>
      {icons[message.type || 'info']}
      <div>
        <strong>{message.title}</strong>
        {message.description &&
          <p>{message.description}</p>
        }
      </div>
      <button onClick={() => removeToast(message.id)} type="button">
        <FiXCircle size={18}/>
      </button>
    </Container>
  )
}

export default Toast