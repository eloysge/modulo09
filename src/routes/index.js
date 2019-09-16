/**
 * INSTALAÇÃO DEPENDENCIAS PARA SIMPLIFICAR LOCAL PASTA SRC -> "~"
 * yarn add customize-cra react-app-rewired -D
 *
 * CRIAR NA RAIZ DO PROJETO:
 * config-overrides.js
 *
 * INSTALAR DEPENDENCIA:
 * yarn add babel-plugin-root-import -D
 * yarn add eslint-import-resolver-babel-plugin-root-import -D
 *
 * AJUSTAR EM "package.json":
 *   "start": "react-app-rewired start",
 *   "build": "react-app-rewired build",
 *   "test": "react-app-rewired test",
 *
 * ADICIONAR EM ".eslintrc.js", (FINAL):
 *   settings: {
 *     'import/resolver': {
 *       'babel-plugin-root-import': {
 *         rootPathSuffix: 'src',
 *        },
 *      },
 *    },
 *
 * CRIAR NA RAIZ DO PROJETO: "jsconfig.json" (para que vscode entenda o "~")
 */
import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '~/pages/SignIn';
import SignUp from '~/pages/SignUp';

import Dashboard from '~/pages/Dashboard';
import Profile from '~/pages/Profile';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/register" component={SignUp} />

      <Route path="/dashboard" component={Dashboard} isPrivate />
      <Route path="/profile" component={Profile} isPrivate />
    </Switch>
  );
}
