/**
 * yarn add @rocketseat/unform (facilita recuperaçao de dados do form)
 * yarn add yap (validaçao de schemas - back-end e front-end)
 * yarn add react-icons (icones)
 */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import Loader from 'react-loader-spinner';
import { signInResquest } from '~/store/modules/auth/actions';
import logo from '~/assets/logo.svg';

const schema = Yup.object().shape({
  email: Yup.string('O e-mail não é válido').required('O e-mail é obrigatório'),
  password: Yup.string().required('A senha é obrigatória'),
});

export default function SignIn() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  function handleSubmit({ email, password }) {
    dispatch(signInResquest(email, password));
  }

  return (
    <>
      <img src={logo} alt="GoBarber" />
      <Form schema={schema} onSubmit={handleSubmit}>
        <Input name="email" type="email" placeholder="Seu e-mail" />
        <Input name="password" type="password" placeholder="Sua senha" />
        <button type="submit">
          {loading ? (
            <Loader type="Oval" color="#fff" height={30} width={30} />
          ) : (
            'Login'
          )}
        </button>
        <Link to="/register">Criar uma conta</Link>
      </Form>
    </>
  );
}
