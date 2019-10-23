import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import Loader from 'react-loader-spinner';
import * as Yup from 'yup';

import { updateProfileResquest } from '~/store/modules/user/actions';
import { signOut } from '~/store/modules/auth/actions';
import { Container } from './styles';
import AvatarInput from '~/components/AvatarInput';

const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  email: Yup.string('O e-mail não é válido').required('O e-mail é obrigatório'),
});

export default function Profile() {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);
  const loading = useSelector(state => state.user.loading);

  function handleSubmit(data) {
    dispatch(updateProfileResquest(data));
  }

  async function handleSignOut() {
    await window.location.reload();
    dispatch(signOut());
  }

  return (
    <Container>
      <Form initialData={profile} onSubmit={handleSubmit} schema={schema}>
        <AvatarInput name="avatar_id" />
        <Input name="name" placeholder="Nome completo" />
        <Input name="email" type="email" placeholder="Seu e-mail" />
        <hr />
        <Input type="password" name="oldPassword" placeholder="Senha atual" />
        <Input type="password" name="password" placeholder="Nova senha" />
        <Input
          type="password"
          name="confirmPassword"
          placeholder="Confirme a nova senha"
        />
        <button type="submit">
          {loading ? (
            <Loader type="Oval" color="#fff" height={30} width={30} />
          ) : (
            'Atualizar perfil'
          )}
        </button>
      </Form>
      <button type="button" onClick={handleSignOut}>
        Sair do GoBarber
      </button>
    </Container>
  );
}
