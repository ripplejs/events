var ripple = require('ripple');
var assert = require('assert');
var trigger = require('trigger-event');
var events = require('events');

describe('events', function(){
  var View, count;

  beforeEach(function () {
    count = 0;
    View = ripple('<div on-click="foo"></div>');
    View.use(events);
    View.prototype.foo = function(){
      count++;
    };
  });

  it('should bind to events', function(){
    var view = new View();
    view.mount(document.body);
    trigger(view.el, 'click');
    assert(count === 1);
    view.unmount();
  });

  it('should unbind from events', function(){
    var view = new View();
    var el = view.el;
    view.mount(document.body);
    view.unmount();
    trigger(el, 'click');
    assert(count === 0);
  });

  it('should rebind to events', function(){
    var view = new View();
    view.mount(document.body);
    view.unmount();
    view.mount(document.body);
    trigger(view.el, 'click');
    assert(count === 1);
    view.unmount();
  });

});