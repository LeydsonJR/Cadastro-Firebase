import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import {Container, Title,FormGroup, Label, Input, Select, Button, ErrorMessage } from './StyledRegister';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebaseConfig';
import { doc, setDoc } from 'firebase/firestore'

type FormValues = {
  name: string;
  email: string;
  gender: string;
  password: string;
  confirmPassword: string;
};

const Register: React.FC = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const { name, email, gender, password } = data;
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await setDoc(doc(db, "users", user.uid), {
        name,
        email,
        gender
      });
      alert('Usuário registrado com sucesso!');
    } catch (error) {
      console.error(error);
      alert('Erro ao registrar usuário!');
    }
  };

  return (
    <Container>
      <Title>Cadastro</Title>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label htmlFor="name">Nome</Label>
          <Input id="name" {...register('name', { required: true })} />
          {errors.name && <ErrorMessage>Nome é obrigatório</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="email">Email</Label>
          <Input id="email" {...register('email', { required: true })} />
          {errors.email && <ErrorMessage>Email é obrigatório</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="gender">Sexo</Label>
          <Select id="gender" {...register('gender', { required: true })}>
            <option value="">Selecione...</option>
            <option value="male">Masculino</option>
            <option value="female">Feminino</option>
            <option value="other">Outro</option>
          </Select>
          {errors.gender && <ErrorMessage>Sexo é obrigatório</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="password">Senha</Label>
          <Input id="password" type="password" {...register('password', { required: true })} />
          {errors.password && <ErrorMessage>Senha é obrigatória</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="confirmPassword">Confirmar Senha</Label>
          <Input id="confirmPassword" type="password" {...register('confirmPassword', {
            validate: value => value === watch('password') || "As senhas não correspondem"
          })} />
          {errors.confirmPassword && <ErrorMessage>{errors.confirmPassword.message}</ErrorMessage>}
        </FormGroup>

        <Button type="submit">Cadastrar</Button>
      </form>
    </Container>
  );
};

export default Register;
