'use strict';

describe('myApp.london module', function() {

  beforeEach(module('myApp.view3'));

  describe('london controller', function(){

    it('should ....', inject(function($controller) {
      //spec body
      var view3Ctrl = $controller('View3Ctrl');
      expect(view3Ctrl).toBeDefined();
    }));

  });
});