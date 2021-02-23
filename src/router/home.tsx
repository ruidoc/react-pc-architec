import React from "react";
import { Route } from "react-router-dom";

import BatchDetail from '@/pages/batchs/detail';
import Users from '@/pages/admins';
import Batchs from '@/pages/batchs';
import Tests from '@/pages/setting/test';

export const BatchDetailPage = (
    <Route path='/batchs/:code'>
        <BatchDetail/>
    </Route>
);

export const UsersPage = (
    <Route path='/users'>
        <Users/>
    </Route>
);

export const BatchsPage = (
    <Route exact path='/batchs'>
        <Batchs/>
    </Route>
);

export const TestPage = (
    <Route exact path='/test'>
        <Tests/>
    </Route>
);