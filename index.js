module.exports = function(View) {
  View.directive(/on-([a-z]+)/, function(view, node, attr, method){
    var eventType = attr.replace('on-','');
    function callback(e){
      view[method](e);
    }
    view.on('mount', function(){
      node.addEventListener(eventType, callback, true);
    });
    view.on('unmount', function(){
      node.removeEventListener(eventType, callback, true);
    });
  });
};