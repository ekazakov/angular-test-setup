//import 'angular';
//import 'angular-mocks';

//require('angular-mocks');
import 'angular';
import 'angular-mocks';

import '../src/app';


const testsContext = require.context("./spec", true, /_spec\.js$/);
testsContext.keys().forEach(testsContext);