var ripple = require('ripple');
var assert = require('assert');
var trigger = require('trigger-event');
var events = require('events');
var dom = require('fastdom');

describe('events', function(){
  var View, count;

  describe('basic functions', function () {
    beforeEach(function () {
      count = 0;
      View = ripple('<div on-click="{{ this.up }}"></div>');
      View.use(events);
      View.prototype.up = function(){
        count++;
      };
      View.prototype.down = function(){
        count--;
      };
    });
    it('should bind to events', function(){
      var view = new View();
      view.appendTo(document.body);
      trigger(view.el, 'click');
      assert(count === 1);
      view.destroy();
    });
    it('should unbind from events', function(){
      var view = new View();
      var el = view.el;
      view.appendTo(document.body);
      view.destroy();
      trigger(el, 'click');
      assert(count === 0);
    });
  });

  describe('dynamic functions', function () {
    var view;
    beforeEach(function () {
      View = ripple('<div on-click="{{ this.update.bind(this, foo) }}"></div>');
      View.use(events);
      View.prototype.update = function up(val, event){
        this.el.innerHTML = val;
      };
      view = new View({
        data: {
          foo: 'bar'
        }
      });
      view.appendTo(document.body);
    });
    it('should bind to events with properties in them', function(done){
      trigger(view.el, 'click');
      assert(view.el.innerHTML === 'bar');
      view.set('foo', 'baz');
      dom.defer(function(){
        trigger(view.el, 'click');
        assert(view.el.innerHTML === 'baz');
        view.destroy();
        done();
      });
    });
  });

});