'use strict';

var $ = require('nd-jquery');
var Alert = require('../index')
var expect = require('expect.js');
var mask = require('nd-mask');

/*globals describe,it,afterEach*/

describe('Alert', function() {
  var example;

  afterEach(function() {
    if (example) {
      example.destroy();
      example = null;
    }
  });

  describe('normal usage', function() {
    it('should have message', function() {
      console.log(expect)
      example = new Alert({
        message: 'foobar'
      });
      example.show();
      expect(example.get('message')).to.equal('foobar');
      expect(example.$('[data-role=message]').html()).to.equal('foobar');
      example.set('message', 'changed message');
      expect(example.$('[data-role=message]').html()).to.equal('changed message');
    });

    it('should have title', function() {
      example = new Alert({
        title: 'foo'
      });
      example.show();
      expect(example.get('title')).to.be('foo');
      expect(example.$('[data-role=title]').html()).to.be('foo');
      example.set('title', 'bar');
      expect(example.$('[data-role=title]').html()).to.be('bar');
    });

    it('should have confirm', function() {
      example = new Alert({
        message: 'foobar'
      });
      example.show();
      expect(example.get('confirmTpl')).to.not.be('');
      expect(example.$('[data-role=confirm]').length).to.be(1);
    });

    it('should not have cancel', function() {
      example = new Alert({
        message: 'foobar'
      });
      example.show();
      expect(example.get('cancelTpl')).to.be('');
      expect(example.$('[data-role=cancel]').length).to.be(0);
    });
  });

  describe('show/hide', function() {

    it('should show dialog, and only show one dialog', function() {
      var msg = 0;
      var instance = Alert.show('foo', function() {
        msg = 1;
      });
      expect($('.ui-dialog').length).to.be(1);
      expect($('.ui-dialog [data-role="message"]').html()).to.be('foo');

      var instance2 = Alert.show('bar', function() {
        msg = 2;
      }, {});
      expect($('.ui-dialog').length).to.be(1);
      expect($('.ui-dialog [data-role="message"]').html()).to.be('bar');
      expect(instance2).to.be(instance);

      $('.ui-dialog [data-role="confirm"]').click();
      expect(msg).to.be(2);
      expect($('.ui-dialog').length).to.be(0);
    });

    it('show dialog', function() {
      Alert.show('foo');
      expect($('.ui-dialog').length).to.be(1);
      expect($('.ui-dialog [data-role="message"]').html()).to.be('foo');
    });

    it('should hide dialog', function() {
      Alert.show('foo', function() {});
      expect($('.ui-dialog').length).to.be(1);
      Alert.hide()
      expect($('.ui-dialog').length).to.be(0);
      Alert.hide()
      expect($('.ui-dialog').length).to.be(0);
    });

    it('should has confirm callbacks', function() {
      var count = 0;
      Alert.show('foo', function() {
        count = 1;
      });

      Alert.show('bar', function() {
        count = 2;
      });

      $('.ui-dialog [data-role="confirm"]').click();

      expect(count).to.be(2);
      expect($('.ui-dialog').length).to.be(0);
    });

  });

  describe('mask', function() {
    it('should not disappear when click mask', function() {
      example = new Alert({
        content: 'foobar'
      });
      example.show();
      mask.element.click();
      expect($('.ui-dialog').length).to.be(1);
      //expect(example.element.is(':visible')).to.be(false);
    });

    it('should disappear when click mask', function() {
      example = new Alert({
        content: 'foobar',
        hideOnClickMask: true
      });
      example.show();
      mask.element.click();
      expect($('.ui-dialog').length).to.be(0);
    });

  });

});
