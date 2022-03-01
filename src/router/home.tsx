import React from 'react'
import { Route } from 'react-router-dom'

import Users from '@/pages/admin'
import Tests from '@/pages/setting/test'

export const UsersPage = (
  <Route path="/users">
    <Users />
  </Route>
)

export const TestPage = (
  <Route exact path="/test">
    <Tests />
  </Route>
)
