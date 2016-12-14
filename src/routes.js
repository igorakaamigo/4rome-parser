import React from 'react';
import { IndexRoute, Route }  from 'react-router';
import Main from 'components/layout/Main';
import IndexPage from 'components/pages/IndexPage';

export default function () {
  return (
    <Route component={Main} path='/'>
      <IndexRoute component={IndexPage}/>
    </Route>
  );
}
