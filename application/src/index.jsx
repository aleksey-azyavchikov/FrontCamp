import React from 'react';
import ReactDOM from 'react-dom';

import { Base } from './pages/base/base.jsx';

require('bootstrap-loader');


ReactDOM.render(
  <Base>Hello world</Base>,
  document.getElementById('app')
);