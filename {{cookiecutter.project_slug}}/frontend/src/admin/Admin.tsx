import React, { FC } from 'react';
import { Admin as ReactAdmin, Resource, fetchUtils } from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';

import authProvider from './authProvider';
import { UserList, UserEdit, UserCreate } from './Users';
import { BACKEND_URL } from '../config';

// Add auth header for FastAPI JWT
const httpClient = (url: string, options: any = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: 'application/json' });
  }
  const token = localStorage.getItem('token');
  if (token) {
    options.headers.set('Authorization', `Bearer ${token}`);
  }
  return fetchUtils.fetchJson(url, options);
};

// RA v4 requires FULL URL for REST provider
const apiUrl = `${BACKEND_URL}`;
const dataProvider = simpleRestProvider(apiUrl, httpClient);

export const Admin: FC = () => (
  <ReactAdmin
    basename="/admin"
    dataProvider={dataProvider}
    authProvider={authProvider}
  >
    {permissions => (
      <>
        {permissions === 'admin' && (
          <Resource
            name="users"
            list={UserList}
            edit={UserEdit}
            create={UserCreate}
          />
        )}
      </>
    )}
  </ReactAdmin>
);
