import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import {Container, Title, FormGroup, Label,Input, ErrorMessage, Button} from './StyledLogin';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';

type FormValues = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const { email, password } = data;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('Login bem-sucedido!');
    } catch (error) {
      console.error(error);
      alert('Erro ao fazer login!');
    }
  };

  return (
    <Container>
      <Title>Login</Title>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label htmlFor="email">Email</Label>
          <Input id="email" {...register('email', { required: true })} />
          {errors.email && <ErrorMessage>Email é obrigatório</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="password">Senha</Label>
          <Input id="password" type="password" {...register('password', { required: true })} />
          {errors.password && <ErrorMessage>Senha é obrigatória</ErrorMessage>}
        </FormGroup>

        <Button type="submit">Entrar</Button>
      </form>
    </Container>
  );
};

export default Login;