
# events

[![Build Status](https://travis-ci.org/ripplejs/events.png?branch=master)](https://travis-ci.org/ripplejs/events)

  Listen for events like click, touch, etc in a template using attributes.

## Installation

  Install with [component(1)](http://component.io):

    $ component install ripplejs/events

## API

A template can use `on-*` to emit events on the view.

```html
<button on-click="{{ this.save }}">Save</button>
```

This can be any type of event, eg: `on-dblclick`, `on-touch`, `on-keydown`. The node just needs to emit the event after the `on-` portion of the attribute.

```js
var events = require('events');
var ripple = require('ripple');

// Compile the view
var View = ripple(template);

// Use the plugin
View.use(events());

// Listen for the events
View.prototype.save = function(){
  // Do things
};
```

You can also pass data to the directive and it will update automatically:

```html
<button on-click="{{ this.save.bind(this, foobar) }}">Save</button>
```

or pass it through filters:

```html
<button on-click="{{ this.save | preventDefault }}">Save</button>
```

## License

  MIT
