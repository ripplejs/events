module.exports = function() {
  this.directive(/on-([a-z]+)/, function(view, node, attr, eventName){
    var eventType = attr.replace('on-','');
    function callback(e){
      view.emit(eventName, e);
    }
    view.on('bind', function(){
      node.addEventListener(eventType, callback, true);
    });
    view.on('unbind', function(){
      node.removeEventListener(eventType, callback, true);
    });
  });
};