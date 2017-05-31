
import {UpgradeAdapter} from 'angular2/upgrade';
import {AppComponent} from './app.component'

export const upgradeAdapter = new UpgradeAdapter();

angular.module('ng2', [])
.directive('myApp', upgradeAdapter.downgradeNg2Component(AppComponent));

upgradeAdapter.bootstrap(document.documentElement, ['myApp']);

// bootstrap(AppComponent);


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/