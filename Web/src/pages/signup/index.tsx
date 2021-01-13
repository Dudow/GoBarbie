import React, {useCallback, useRef} from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft, FiMail, FiLock, FiUser } from 'react-icons/fi'
import {Form} from '@unform/web'
import {FormHandles} from '@unform/core'
import * as Yup from 'yup'
import getValidationErrors from '../../utils/getValidationErrors'
import api from '../../services/api'
import { useToast } from '../../hooks/ToastContext'

import { Container, Content, AnimatedContainer, Background} from './styles'
import logo from '../../assets/logo.svg'
import Input from '../../components/input/index'
import Button from '../../components/button/index'

interface SignUpData{
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {

  const formRef = useRef<FormHandles>(null)
  const { addToast } = useToast()
  const history = useHistory()

  const handleSubmit = useCallback(async (data:SignUpData) => {
    try{

      formRef.current?.setErrors({})

      const schema = Yup.object().shape({
        name: Yup.string().required('Campo obrigatório'),
        email: Yup.string().required('Campo obrigatório').email('Digite um email válido'),
        password: Yup.string().min(6, 'Mínimo 6 dígitos'),
      })
      await schema.validate(data, {
        abortEarly: false
      })

      await api.post('/users', data)

      history.push('/')
      
      addToast({
        type: 'success',
        title: 'Cadastro realizado!',
        description: ''
      })

    }catch(err){
      if(err instanceof Yup.ValidationError){
        const errors =  getValidationErrors(err)
        formRef.current?.setErrors(errors)
        return
      }

      addToast({
        type: 'error',
        title: 'Erro durante o cadastro',
        description: 'Ocorreu um erro durante o cadastro, tente novamente'
      })
    }
  }, [addToast, history])

  return(
    <Container>
      <Background/>
      <AnimatedContainer>
        <Content>
          <img src={logo} alt="GoBarber"/>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu cadastro</h1>
            <Input name="name" icon={FiUser} placeholder="Nome"/>
            <Input name="email" icon={FiMail} placeholder="E-mail"/>
            <Input name="password" icon={FiLock} type="password" placeholder="Senha" />
            <Button type="submit">
              Cadastrar
            </Button>
          </Form>
          <Link to="/">
            <FiArrowLeft/>
            Já possui conta?
          </Link>
        </Content>
      </AnimatedContainer>
    </Container>
  )
}

export default SignUp