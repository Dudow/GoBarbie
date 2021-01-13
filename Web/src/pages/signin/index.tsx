import React, { useCallback, useRef } from 'react'
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import * as Yup from 'yup'
import { Link, useHistory } from 'react-router-dom'
import {useAuth} from '../../hooks/AuthContext'
import {useToast} from '../../hooks/ToastContext'
import { Container, Content, AnimatedContainer, Background} from './styles'
import logo from '../../assets/logo.svg'
import Input from '../../components/input/index'
import Button from '../../components/button/index'
import getValidationErrors from '../../utils/getValidationErrors'

interface SignInFormData{
  email: string,
  password: string;
}

const SignIn: React.FC = () => {

  const formRef = useRef<FormHandles>(null)
  
  const { signIn } = useAuth()
  const { addToast } = useToast()
  const history = useHistory()

  const handleSubmit = useCallback(async (data:SignInFormData) => {
    try{

      formRef.current?.setErrors({})

      const schema = Yup.object().shape({
        email: Yup.string().required('Campo obrigatório').email('Digite um email válido'),
        password: Yup.string().required('Senha obrigatória'),
      })
      await schema.validate(data, {
        abortEarly: false
      })

      await signIn({
        email: data.email,
        password: data.password
      })

      history.push('/dashboard')

    }catch(err){
      if(err instanceof Yup.ValidationError){
        const errors =  getValidationErrors(err)
        formRef.current?.setErrors(errors)
        return
      }

      addToast({
        type: 'error',
        title: 'Erro durante o login',
        description: 'Cheque suas credenciais e tente novamente'
      })

    }
  }, [signIn, addToast, history])

  return(
    <Container>
      <AnimatedContainer>
        <Content>
          <img src={logo} alt="GoBarber"/>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Login</h1>
            <Input name="email" icon={FiMail} placeholder="E-mail"/>
            <Input name="password" icon={FiLock} type="password" placeholder="Senha" />
            <Button type="submit">
              Entrar
            </Button>

            <a href="/">Esqueci minha senha</a>
          </Form>
          <Link to="/signup">
            <FiLogIn/>
            Criar conta
          </Link>
        </Content>
      </AnimatedContainer>
      <Background/>
    </Container>
  )
}



export default SignIn