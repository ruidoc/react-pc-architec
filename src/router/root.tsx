import React from 'react'
import { Route, Redirect } from 'react-router-dom'

import Home from '@/pages/Home'
import Login from '@/pages/Login'

export const LoginPage = (
  <Route path="/login" exact>
    <Login />
  </Route>
)

export const HomePage = <Route path="*" component={Home} />
