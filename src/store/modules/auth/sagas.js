/**
 * yarn add axios
 */
import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import history from '~/services/history';
import api from '~/services/api';

import { signInSuccess, signFailure, signUpSuccess } from './actions';

export function* signIn({ payload }) {
  try {
    const { email, password } = payload;
    const response = yield call(api.post, 'sessions', {
      email,
      password,
    });

    const { token, user, error } = response.data;

    if (error) {
      toast.error(error);
      yield put(signFailure());
      return;
    }

    if (!user.provider) {
      toast.warning('Usuário não é um prestador de serviço.');
      yield put(signFailure());
      return;
    }

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(signInSuccess(token, user));
    history.push('/dashboard');
  } catch (err) {
    toast.error(`Falha na autenticação: ${err.message}`);
    yield put(signFailure());
  }
}

export function* signUp({ payload }) {
  try {
    const { name, email, password } = payload;
    const response = yield call(api.post, 'users', {
      name,
      email,
      password,
      provider: true,
    });

    const { error } = response.data;
    if (error) {
      toast.warning(error);
      yield put(signFailure());
      return;
    }

    yield put(signUpSuccess());
    history.push('/');
    //
  } catch (err) {
    toast.error(err.message);
    yield put(signFailure());
  }
}

export function* setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }

  try {
    yield call(api.get, 'providers');
  } catch (err) {
    yield put(signFailure());
    history.push('/');
  }
}

export function signOut() {
  history.push('/');
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
  takeLatest('@auth/SIGN_OUT', signOut),
]);
