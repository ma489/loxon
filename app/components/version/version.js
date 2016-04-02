'use strict';

angular.module('loxon.version', [
  'loxon.version.interpolate-filter',
  'loxon.version.version-directive'
])

.value('version', '0.1');
