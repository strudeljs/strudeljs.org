/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/* unused harmony export version */
/* unused harmony export options */
/* unused harmony export config */
/* unused harmony export EventEmitter */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return decorator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return decorator$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return decorator$2; });
/* unused harmony export OnInit */
/* unused harmony export element */
/* unused harmony export $ */
/*!
 * Strudel.js v0.8.1
 * (c) 2016-2018 Mateusz Łuczak
 * Released under the MIT License.
 */
let warn = () => {};

if (process.env.NODE_ENV !== 'production') {
  const generateTrace = (vm) => {
    const componentName = vm.name;
    return ` (found in ${componentName})`;
  };
  warn = (msg, vm) => {
    const trace = vm ? generateTrace(vm) : '';
    console.error(`[Strudel]: ${msg}${trace}`);
  };
}

const handleError = (err, vm, info) => {
  if (process.env.NODE_ENV !== 'production') {
    warn(`Error in ${info}: "${err.toString()}"`, vm);
  }

  console.error(err);
};

/**
 * Simple registry for storing selector-constructor pairs
 */
class Registry {
  /**
   * @constructor
   */
  constructor() {
    this._registry = {};
  }

  /**
   * Retunrs all registry data
   * @returns {{}|*}
   */
  getData() {
    return this._registry;
  }

  getRegisteredSelectors() {
    return Object
      .keys(this._registry);
  }

  /**
   * Returns component constructor for selector from map
   * @param {string} selector
   * @returns {Function} constructor
   */
  getComponent(selector) {
    return this._registry[selector];
  }

  /**
   * Adds selector/constructor pair to map
   * @param {string} selector
   * @param {Function} constructor
     */
  registerComponent(selector, klass) {
    if (this._registry[selector]) {
      warn(`Component registered under selector: ${selector} already exists.`, klass);
    }
    this._registry[selector] = klass;
  }
}

var registry = new Registry();

var config = {
  /**
   * Class added on components when initialised
   */
  initializedClassName: 'strudel-init',
  /**
   * Whether to enable devtools
   */
  devtools: process.env.NODE_ENV !== 'production',
  /**
   * Whether to show production mode tip message on boot
   */
  productionTip: process.env.NODE_ENV !== 'production'
};

/**
 * Check if passed parameter is a function
 * @param obj
 * @returns {boolean}
 */
const isFunction = (obj) => {
  return typeof obj === 'function' || false;
};

/**
 * Small util for mixing prototypes
 * @param {Function} target
 * @param {Function} source
 */
const mixPrototypes = (target, source) => {
  const targetProto = target.prototype;
  const sourceProto = source.prototype;
  const inst = (typeof source === 'object') ? source : new source(); // eslint-disable-line new-cap

  Object.getOwnPropertyNames(inst).forEach((name) => {
    const desc = Object.getOwnPropertyDescriptor(inst, name);
    desc.writable = true;
    Object.defineProperty(targetProto, name, desc);
  });

  Object.getOwnPropertyNames(sourceProto).forEach((name) => {
    if (name !== 'constructor') {
      Object.defineProperty(targetProto, name, Object.getOwnPropertyDescriptor(sourceProto, name));
    }
  });
};

/**
 * Event listeners
 * @type {{}}
 */
const events = {};

/**
 * @classdesc Simple Event Emitter implementation - global
 * @class
 */
class EventEmitter {
  static getEvents() {
    return events;
  }

  static removeAllListeners() {
    Object.keys(events).forEach((prop) => {
      delete events[prop];
    });
  }

  /**
   * Add event listener to the map
   * @param {string} label
   * @param {Function} callback
   */
  $on(label, callback) {
    if (!events[label]) {
      events[label] = [];
    }
    events[label].push(callback);
  }

  /**
   * Remove event listener from registry
   * @param {string} label
   * @param {Function} callback
   * @returns {boolean}
   */
  $off(label, callback) {
    const listeners = events[label];

    if (listeners && listeners.length) {
      const index = listeners.reduce((i, listener, ind) => {
        return (isFunction(listener) && listener === callback) ? i = ind : i;
      }, -1);

      if (index > -1) {
        listeners.splice(index, 1);
        events[label] = listeners;
        return true;
      }
    }
    return false;
  }

  /**
   * Notifies listeners attached to event
   * @param {string} label
   * @param args
   * @returns {boolean}
   */
  $emit(label, ...args) {
    const listeners = events[label];

    if (listeners && listeners.length) {
      try {
        listeners.forEach((listener) => {
          listener(...args);
        });
      } catch (e) {
        handleError(e, this.constructor, 'event handler');
      }
      return true;
    }
    return false;
  }
}

const DELEGATE_EVENT_SPLITTER = /^(\S+)\s*(.*)$/;

/**
 * Wrapper for Element on method
 * @param {Element} element - element that will receive listener
 * @param {string} eventName - name of the event eg. click
 * @param {string} selector - CSS selector for delegation
 * @param {Function} listener - function listener
 */
const delegate = (element, eventName, selector, listener) => {
  if (selector) {
    element.on(eventName, selector, listener);
  } else {
    element.on(eventName, listener);
  }
};

/**
 * Utility for binding events to class methods
 * @param {Component} context - context Component to bind elements for
 * @param {object} events - map of event strings / methods
 * @returns {*}
 */
const delegateEvents = (context, events) => {
  if (!events) {
    return false;
  }

  return Object.keys(events).forEach((key) => {
    const method = events[key];
    const match = key.match(DELEGATE_EVENT_SPLITTER);
    if (context.$element) {
      delegate(context.$element, match[1], match[2], method.bind(context));
    }
  });
};

/**
 * Utility for binding elements to class properties
 * @param {Component} context Component to bind elements for
 * @param {object} elements Map of elements / properties of class
 * @returns {*}
 */
const bindElements = (context, elements) => {
  if (!elements) {
    return false;
  }

  return Object.keys(elements).forEach((key) => {
    const property = elements[key];
    if (context.$element) {
      context[property] = context.$element.find(key);
    }
  });
};

const mix = (target, source) => {
  Object.keys(source).forEach((prop) => {
    if (!target[prop]) {
      target[prop] = source[prop];
    }
  });
};

/**
 * @classdesc Base class for all components, implementing event emitter
 * @class
 * @hideconstructor
 */
class Component extends EventEmitter {
  constructor({ element, data } = {}) {
    super();

    try {
      this.beforeInit();

      this.$element = element;
      this.$data = data;

      delegateEvents(this, this._events);
      bindElements(this, this._els);

      if (this.mixins && this.mixins.length) {
        this.mixins.forEach((mixin) => {
          if (isFunction(mixin.init)) {
            mixin.init.call(this);
          }
          mix(this, mixin);
        });
      }

      this.init();
    } catch (e) {
      handleError(e, this.constructor, 'component hook');
    }

    this.$element.addClass(config.initializedClassName);
  }

  /**
   * Function called before component is initialized
   * @interface
   */
  beforeInit() {}

  /**
   * Function called when component is initialized
   * @interface
   */
  init() {}

  /**
   * Function called before component is destroyed
   * @interface
   */
  beforeDestroy() {}

  /**
   * Function called after component is destroyed
   * @interface
   */
  destroy() {}

  /**
   * Teardown the component and clear events
   */
  $teardown() {
    try {
      this.beforeDestroy();
      this.$element.off();
      this.$element.removeClass(config.initializedClassName);
      delete this.$element.first().scope;
      delete this.$element;
      this.destroy();
    } catch (e) {
      handleError(e, this.constructor, 'component hook');
    }
  }
}

/**
 * Component decorator - Registers decorated class in {@link Registry} as a component
 * @param {string} CSS selector
 */
const register = (target, selector) => {
  if (!selector) {
    warn('Selector must be provided for Component decorator', target);
  }

  if (!target.prototype) {
    warn('Decorator works only for classes', target);
    return target;
  }

  const component = class extends Component {
    constructor(...args) { /* eslint no-useless-constructor: 0 */
      super(...args);
    }
  };

  mixPrototypes(component, target);
  Object.defineProperty(component.prototype, '_selector', { value: selector });
  Object.defineProperty(component.prototype, 'isStrudelClass', { value: true });
  Object.defineProperty(component, 'name', { value: target.name });
  registry.registerComponent(selector, component);

  return component;
};

function decorator(selector) {
  return function _decorator(target) {
    return register(target, selector);
  };
}

/**
 * Event decorator - binds method to event based on the event string
 * @param {string} event
 * @returns (Function} decorator
 */
function decorator$1(event, preventDefault) {
  return function _decorator(klass, method) {
    if (!event) {
      warn('Event descriptor must be provided for Evt decorator');
    }

    if (!klass._events) {
      klass._events = [];
    }

    const cb = function handler(...args) {
      try {
        klass[method].apply(this, args);
      } catch (e) {
        handleError(e, klass.constructor, 'component handler');
      }

      if (preventDefault) {
        args[0].preventDefault();
      }
    };

    klass._events[event] = cb;
  };
}

/**
 * Element decorator - Creates {@link Element} for matching selector and assigns to decorated property.
 * @param {string} CSS selector
 * @returns (Function} decorator
 */
function decorator$2(selector) {
  return function _decorator(klass, property) {
    if (!selector) {
      warn('Selector must be provided for El decorator', klass);
    }
    if (!klass._els) {
      klass._els = [];
    }
    klass._els[selector] = property;
  };
}

/**
 * OnInit decorator - sets method to be run at init
 * @returns (Function} decorator
 */

function decorator$3(klass, method) {
  const emptyFnc = function () {};
  const org = klass.init || emptyFnc;

  klass.init = function (...args) {
    klass[method].apply(this, ...args);
    return org.apply(this, ...args);
  };
}

/* eslint-disable */

const selectors = {};

selectors[/^\.[\w\-]+$/] = function (param) {
  return document.getElementsByClassName(param.substring(1));
};

selectors[/^\w+$/] = function (param) {
  return document.getElementsByTagName(param);
};

selectors[/^\#[\w\-]+$/] = function (param) {
  return document.getElementById(param.substring(1));
};

selectors[/^</] = function (param) {
  return new Element().generate(param);
};

/**
 * Wrapper for query selector
 * @param {String} selector - CSS selector
 * @param {Node} context - Node to select from
 * @returns {NodeList}
 */
const byCss = (selector, context) => {
  return (context || document).querySelectorAll(selector);
};

/**
 * Wrapper for byCss
 * @param {String} selector
 * @param {Node} context
 * @returns {NodeList}
 */
const select = (selector, context) => {
  selector = selector.replace(/^\s*/, '').replace(/\s*$/, '');

  if (context) {
    return byCss(selector, context);
  }

  for (var key in selectors) {
    context = key.split('/');
    if ((new RegExp(context[1], context[2])).test(selector)) {
      return selectors[key](selector);
    }
  }

  return byCss(selector);
};

// Store all of the operations to perform when cloning elements
const mirror = {
  /**
   * Copy all JavaScript events of source node to destination node.
   */
  events: function (src, dest) {
    if (!src._e) return;

    for (var type in src._e) {
      src._e[type].forEach(function (event) {
        new Element(dest).on(type, event);
      });
    }
  },

  /**
   * Copy select input value to its clone.
   */
  select: function (src, dest) {
    if (new Element(src).is('select')) {
      dest.value = src.value;
    }
  },

  /**
   * Copy textarea input value to its clone
   */
  textarea: function (src, dest) {
    if (new Element(src).is('textarea')) {
      dest.value = src.value;
    }
  }
};

/**
 * @classdesc Element class used for DOM manipulation
 * @class
 */
class Element {
  /**
   * @constructor
   * @param {string} selector - CSS selector
   * @param {Node} context - Node to wrap into Element
   * @returns {Element}
   */
  constructor(selector, context) {
    if (selector instanceof Element) {
      return selector;
    }

    if (typeof selector === 'string') {
      selector = select(selector, context);
    }

    if (selector && selector.nodeName || selector && selector === window) {
      selector = [selector];
    }

    this._nodes = this.slice(selector);
  }

  /**
   * Returns size of nodes
   */
  get length() {
    return this._nodes.length;
  }

  /**
   * Extracts structured data from DOM
   * @param {Function} callback - A callback to be called on each node. Returned value is added to the set
   * @returns {*}
   */
  array(callback) {
    let self = this;
    return this._nodes.reduce(function (list, node, i) {
      let val;
      if (callback) {
        val = callback.call(self, node, i);
        if (!val) val = false;
        if (typeof val === 'string') val = new Element(val);
        if (val instanceof Element) val = val._nodes;
      } else {
        val = node.innerHTML;
      }
      return list.concat(val !== false ? val : []);
    }, []);
  }

  /**
   * Create a string from different things
   * @private
   */
  str(node, i) {
    return function (arg) {
      if (typeof arg === 'function') {
        return arg.call(this, node, i);
      }

      return arg.toString();
    };
  }

  /**
   * Check the current matched set of elements against a selector and return true if at least one of these elements matches the given arguments.
   * @param {selector} selector - A string containing a selector expression to match elements against.
   * @returns {boolean}
   */
  is(selector) {
    return this.filter(selector).length > 0;
  }

  /**
   * Reduce the set of matched elements to those that match the selector or pass the function's test.
   * @param {selector} selector A string containing a selector expression to match elements against.
   * @returns {Element}
   */
  filter(selector) {
    let callback = function (node) {
      node.matches = node.matches || node.msMatchesSelector || node.webkitMatchesSelector;
      return node.matches(selector || '*');
    };

    if (typeof selector === 'function') callback = selector;

    if (selector instanceof Element) {
      callback = function (node) {
        return (selector._nodes).indexOf(node) !== -1;
      };
    }

    return new Element(this._nodes.filter(callback));
  }

  /**
   * Reduce the set of matched elements to the one at the specified index.
   * @param {Number} index - An integer indicating the 0-based position of the element.
   * @returns {Element|boolean}
   */
  eq(index) {
    return new Element(this._nodes[index]) || false;
  }

  /**
   * Reduce the set of matched elements to the HTMLElement at the specified index.
   * @param {Number} index - An integer indicating the 0-based position of the element.
   * @returns {HTMLElement}
   */
  get(index) {
    return (index && index <= this._nodes.length) ? this._nodes[index] : this._nodes;
  }

  /**
   * Reduce the set of matched elements to the first in the set.
   * @returns {HTMLElement}
   */
  first() {
    return this._nodes[0] || false;
  }

  /**
   * Converts Arraylike to array
   * @private
   */
  slice(pseudo) {
    if (!pseudo ||
      pseudo.length === 0 ||
      typeof pseudo === 'string' ||
      pseudo.toString() === '[object Function]') return [];

    return pseudo.length ? [].slice.call(pseudo._nodes || pseudo) : [pseudo];
  }

  /**
   * Removes duplicated nodes
   * @private
   */
  unique() {
    return new Element(this._nodes.reduce(function (clean, node) {
      let isTruthy = node !== null && node !== undefined && node !== false;
      return (isTruthy && clean.indexOf(node) === -1) ? clean.concat(node) : clean;
    }, []));
  }

  /**
   * Get the direct children of all of the nodes with an optional filter
   * @param [string] selector - Filter what children to get
   * @returns {Element}
   */
  children(selector) {
    return this.map(function (node) {
      return this.slice(node.children);
    }).filter(selector);
  }

  /**
   * Generates element from htmlString
   * @private
   */
  generate(html) {
    if (/^\s*<t(h|r|d)/.test(html)) {
      return new Element(document.createElement('table')).html(html).children()._nodes;
    } else if (/^\s*</.test(html)) {
      return new Element(document.createElement('div')).html(html).children()._nodes;
    } else {
      return document.createTextNode(html);
    }
  }

  /**
   * Normalize the arguments to an array of strings
   * @private
   */
  args(args, node, i) {
    if (typeof args === 'function') {
      args = args(node, i);
    }

    if (typeof args !== 'string') {
      args = this.slice(args).map(this.str(node, i));
    }

    return args.toString().split(/[\s,]+/).filter(function (e) {
      return e.length;
    });
  }

  /**
   * Loops through the nodes and executes callback for each
   * @param {Function} callback - The function that will be called
   * @returns {Element}
   */
  each(callback) {
    this._nodes.forEach(callback.bind(this));
    return this;
  }

  /**
   * Loop through the combination of every node and every argument passed
   * @private
   */
  eacharg(args, callback) {
    return this.each(function (node, i) {
      this.args(args, node, i).forEach(function (arg) {
        callback.call(this, node, arg);
      }, this);
    });
  }

  /**
   * Checks if node exists on a page
   * @private
   */
  isInPage(node) {
    return (node === document.body) ? false : document.body.contains(node);
  }

  /**
   * Changes the content of the current instance by running a callback for each Element
   * @param {Function} callback - A callback that returns an element that are going to be kept
   * @returns {Element}
   */
  map(callback) {
    return callback ? new Element(this.array(callback)).unique() : this;
  }

  /**
   * Add texts in specific position
   * @private
   */
  adjacent(html, data, callback) {
    if (typeof data === 'number') {
      if (data === 0) {
        data = [];
      } else {
        data = new Array(data).join().split(',').map(Number.call, Number);
      }
    }

    return this.each(function (node, j) {
      let fragment = document.createDocumentFragment();

      new Element(data || {}).map(function (el, i) {
        let part = (typeof html === 'function') ? html.call(this, el, i, node, j) : html;

        if (typeof part === 'string') {
          return this.generate(part);
        }

        return new Element(part);
      }).each(function (n) {
        this.isInPage(n)
          ? fragment.appendChild(new Element(n).clone().first())
          : fragment.appendChild(n);
      });

      callback.call(this, node, fragment);
    });
  }

  /**
   * Return an array of DOM nodes of a source node and its children.
   * @private
   */
  getAll(context) {
    return new Element([context].concat(new Element('*', context)._nodes));
  }

  /**
   * Deep clone a DOM node and its descendants.
   * @returns {Element}
   */
  clone() {
    return this.map(function (node) {
      var clone = node.cloneNode(true);
      var dest = this.getAll(clone);

      this.getAll(node).each(function (src, i) {
        for (var key in mirror) {
          mirror[key](src, dest._nodes[i]);
        }
      });

      return clone;
    });
  }

  /**
   * Gets the HTML contents of the first element in a set.
   * When parameter is provided set the HTML contents of each element in the set.
   * @param {htmlString} [text] - A string of HTML to set as the content of each matched element
   * @returns {htmlString|Element}
   */
  html(text) {
    if (text === undefined) {
      return this.first().innerHTML || '';
    }

    return this.each(function (node) {
      node.innerHTML = text;
    });
  }

  /**
   * Gets the text contents of the first element in a set.
   * When parameter is provided set the text contents of each element in the set.
   * @param {string} [text] - A string to set as the text content of each matched element.
   * @returns {string|Element}
   */
  text(text) {
    if (text === undefined) {
      return this.first().textContent || '';
    }

    return this.each(function (node) {
      node.textContent = text;
    });
  }

  /**
   * Remove the set of matched elements from the DOM.
   * @returns {Element}
   */
  remove() {
    return this.each(function (node) {
      node.parentNode.removeChild(node);
    });
  }

  /**
   * Travel the matched elements one node up
   * @param {selector} CSS Selector
   * @returns {Element}
   */
  parent(selector) {
    return this.map(function (node) {
      return node.parentNode;
    }).filter(selector);
  }

  /**
   * Find the first ancestor that matches the selector for each node
   * @param {selector} CSS Selector
   * @returns {Element}
   */
  closest(selector) {
    return this.map(function (node) {
      do {
        if (new Element(node).is(selector)) {
          return node;
        }
      } while ((node = node.parentNode) && node !== document);
    });
  }

  /**
   * Insert content, specified by the parameter, to the end of each element in the set of matched elements
   * Additional data can be provided, which will be used for populating the html
   * @param {string|Element} html - Html string or Element
   * @param [data]
   * @returns {Element}
   */
  append(html, data) {
    return this.adjacent(html, data, function (node, fragment) {
      node.appendChild(fragment);
    });
  }

  /**
   * Insert content, specified by the parameter, to the begining of each element in the set of matched elements
   * Additional data can be provided, which will be used for populating the html
   * @param {string|Element} html - Html string or Element
   * @param [data]
   * @returns {Element}
   */
  prepend(html, data) {
    return this.adjacent(html, data, function (node, fragment) {
      node.insertBefore(fragment, node.firstChild);
    });
  }

  /**
   * Get the descendants of each element in the current set of matched elements, filtered by a selector.
   * @param {selector} selector - A string containing a selector expression to match elements against.
   * @returns {Element}
   */
  find(selector) {
    return this.map(function (node) {
      return new Element(selector || '*', node);
    });
  }

  /**
   * Adds the specified class(es) to each element in the set of matched elements.
   * @param {...string} className - Class(es) to be added
   * @returns {Element}
   */
  addClass(className) {
    return this.eacharg(arguments, function (el, name) {
      el.classList.add(name);
    });
  }

  /**
   * Toggles the specified class(es) to each element in the set of matched elements.
   * @param {...string} className - Class(es) to be toggled
   * @returns {Element}
   */
  toggleClass(className) {
    return this.eacharg(arguments, function (el, name) {
      el.classList.toggle(name);
    });
  }

  /**
   * Removes the specified class(es) from each element in the set of matched elements.
   * @param {...string} className - Class(es) to be removed
   * @returns {Element}
   */
  removeClass(className) {
    return this.eacharg(arguments, function (el, name) {
      el.classList.remove(name);
    });
  }

  /**
   * Attach event handlers
   * @param {string} events - Events to attach handlers for - can be space separated or comma separated list, or array of strings
   * @param {string|Function} cb - Callback or CSS selector
   * @param [Function] cb2 - Callback when second parameter is a selector
   * @returns {Element}
   */
  on(events, cb, cb2) {
    if (typeof cb === 'string') {
      let sel = cb;
      cb = function (e) {
        let args = arguments;
        let el = new Element(e.currentTarget);
        let set = el.is(sel) ? el : el.find(sel);
        set.each(function (target) {
          if (target === e.target || target.contains(e.target)) {
            try {
              Object.defineProperty(e, 'currentTarget', {
                get: function () {
                  return target;
                }
              });
            } catch (err) {}
            cb2.apply(target, args);
          }
        });
      };
    }

    let callback = function (e) {
      return cb.apply(this, [e].concat(e.detail || []));
    };

    return this.eacharg(events, function (node, event) {
      node.addEventListener(event, callback);

      node._e = node._e || {};
      node._e[event] = node._e[event] || [];
      node._e[event].push(callback);
    });
  }

  /**
   * Remove an event handler
   * @param {string} events
   */
  off(events) {
    if (events === undefined) {
      this.each(function (node) {
        for (var evt in node._e) {
          node._e[evt].forEach(function (cb) {
            node.removeEventListener(evt, cb);
          });
        }
      });
    }

    return this.eacharg(events, function (node, event) {
      new Element(node._e ? node._e[event] : []).each(function (cb) {
        node.removeEventListener(event, cb);
      });
    });
  }

  /**
   * Execute all handlers attached to the event type
   * @param {string} events - Event types to be executed
   * @returns {*}
   */
  trigger(events) {
    let data = this.slice(arguments).slice(1);

    return this.eacharg(events, function (node, event) {
      let ev;
      let opts = { bubbles: true, cancelable: true, detail: data };

      try {
        ev = new window.CustomEvent(event, opts);
      } catch (e) {
        ev = document.createEvent('CustomEvent');
        ev.initCustomEvent(event, true, true, data);
      }

      node.dispatchEvent(ev);
    });
  }

  /**
   * Get the value of an attribute for the first element in the set.
   * When parameter is provided set the text contents of each element in the set.
   * @param [string|object] name - Name of the attribute to be retrieved/set. Can be object of attributes/values.
   * @param [string] value - Value of the attribute to be set.
   * @returns {string|Element}
   */
  attr(name, value, data) {
    data = data ? 'data-' : '';

    if (value !== undefined) {
      let nm = name;
      name = {};
      name[nm] = value;
    }

    if (typeof name === 'object') {
      return this.each(function (node) {
        for (let key in name) {
          if (name[key] !== null) {
            node.setAttribute(data + key, name[key]);
          } else {
            node.removeAttribute(data + key);
          }
        }
      });
    }

    return this.length ? this.first().getAttribute(data + name) : '';
  }

  /**
   * Get the prop for the each element in the set of matched elements or set one or more attributes for every matched element.
   * @param [string|object] name - Name of the property to be retrieved/set. Can be object of attributes/values.
   * @param [string] value - Value of the property to be set.
   * @returns {string|Element}
   */
  prop(name, value) {
    if (value !== undefined) {
      let nm = name;
      name = {};
      name[nm] = value;
    }

    if (typeof name === 'object') {
      return this.each(function (node) {
        for (let key in name) {
          node[key] = name[key];
        }
      });
    }

    return this.length ? this.first()[name] : '';
  }

  /**
   * Get the value of an daata attribute for the each element in the set of matched elements or set one or more attributes for every matched element.
   * @param [string|object] name - Name of the data attribute to be retrieved/set. Can be object of attributes/values.
   * @param [string] value - Value of the data attribute to be set.
   * @returns {object|Element}
   */
  data(name, value) {
    if (!name) {
      return this.first().dataset;
    }
    return this.attr(name, value, true);
  }
}

function $(selector, element) {
  return new Element(selector, element);
}

const version = '0.8.1';
const config$1 = config;
const options = {
  components: registry.getData()
};

var Strudel = /*#__PURE__*/Object.freeze({
  version: version,
  options: options,
  config: config$1,
  EventEmitter: EventEmitter,
  Component: decorator,
  Evt: decorator$1,
  El: decorator$2,
  OnInit: decorator$3,
  element: $,
  $: $
});

const initializedSelector = `.${config.initializedClassName}`;

/**
 * @classdesc Class linking components with DOM
 * @class
 */
class Linker {
  /**
   * @constructor
   * @param {Registry} component registry
   */
  constructor(registry) {
    this.registry = registry;
  }

  /**
   * Finds all components within selector and destroy them
   * @param {DOMElement} container
   */
  unlink(container = document) {
    this.registry.getRegisteredSelectors().forEach((selector) => {
      const elements = Array.prototype.slice.call(container.querySelectorAll(selector));
      if (container !== document && $(container).is(initializedSelector)) {
        elements.push(container);
      }
      [].forEach.call(elements, (el) => {
        if (el.component) {
          el.component.$teardown();
        }
      });
    });
  }

  /**
   * Iterates over selectors in registry, find occurrences in container and initialize components
   * @param {DOMElement} container
   */
  link(container = document) {
    this.registry.getRegisteredSelectors().forEach((selector) => {
      const elements = Array.prototype.slice.call(container.querySelectorAll(selector));
      if (container !== document && $(container).is(selector)) {
        elements.push(container);
      }
      [].forEach.call(elements, (el) => {
        if (!el.__strudel__) {
          const element = $(el);
          const data = element.data();
          const Instance = this.registry.getComponent(selector);
          el.__strudel__ = new Instance({ element, data });
        }
      });
    });
  }
}

const onChildrenAddition = (mutations, callback) => {
  mutations.forEach((mutation) => {
    if (
        mutation.type === 'childList'
        && mutation.addedNodes.length > 0
    ) {
      callback(mutation);
    }
  });
};

const onChildrenRemoval = (mutations, callback) => {
  mutations.forEach((mutation) => {
    if (
        mutation.type === 'childList'
        && mutation.removedNodes.length > 0
    ) {
      callback(mutation);
    }
  });
};

const defaultObserverConfig = {
  childList: true,
  subtree: true
};

const attachNewObserver = (observerRoot, callback, mutationCallback) => {
  const initializationObserver = new MutationObserver((mutations) => { mutationCallback(mutations, callback); });
  initializationObserver.observe(observerRoot, defaultObserverConfig);
};

const attachNewInitObserver = (observerRoot, callback) => {
  attachNewObserver(observerRoot, callback, onChildrenAddition);
};

const attachNewTeardownObserver = (observerRoot, callback) => {
  attachNewObserver(observerRoot, callback, onChildrenRemoval);
};

const devtools = window.__STRUDEL_DEVTOOLS_GLOBAL_HOOK__;

const mount = () => {
  setTimeout(() => {
    if (config.devtools) {
      if (devtools) {
        devtools.emit('init', Strudel);
      } else if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test') {
        console.info(
          'Download the Strudel Devtools extension for a better development experience:\n' +
          'https://github.com/strudeljs/strudel-devtools'
        );
      }
    }
    if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test' && config.productionTip !== false) {
      console.info(
        'You are running Strudel in development mode.\n' +
        'Make sure to turn on production mode when deploying for production.'
      );
    }
  }, 0);
};

const linker = new Linker(registry);
const channel = $(document);

const getElement = (detail) => {
  let element;

  if (detail && detail.length > 0) {
    element = (detail[0] instanceof HTMLElement) ? detail[0] : detail[0].first();
  }

  return element;
};

const bootstrap = (root) => {
  linker.link(getElement(root));
  channel.trigger('strudel:loaded');
};

const bindContentEvents = () => {
  channel.on('content:loaded', (evt) => {
    bootstrap(evt.detail);
  });
};


const onAutoInitCallback = (mutation) => {
  const registeredSelectors = registry.getRegisteredSelectors();

  Array.prototype.slice.call(mutation.addedNodes)
  .filter((node) => {
    return node.nodeName !== 'SCRIPT' && node.nodeType === 1;
  })
  .forEach((node) => {
    if (registeredSelectors.find((el) => {
      return $(node).is(el);
    })) {
      bootstrap([node]);
    }
  });
};

const onAutoTeardownCallback = (mutation) => {
  const initializedSelector = `.${config.initializedClassName}`;

  Array.prototype.slice.call(mutation.removedNodes)
    .filter((node) => {
      return node.nodeName !== 'SCRIPT'
        && node.nodeType === 1
        && $(node).is(initializedSelector);
    })
    .forEach((node) => {
      linker.unlink(node);
    });
};

const init = () => {
  if (/comp|inter|loaded/.test(document.readyState)) {
    setTimeout(bootstrap, 0);
  } else {
    channel.on('DOMContentLoaded', bootstrap);
  }

  mount();
  bindContentEvents();
  attachNewInitObserver(channel._nodes[0], onAutoInitCallback);
  attachNewTeardownObserver(channel._nodes[0], onAutoTeardownCallback);
};

/**
 * Expose Strudel in component prototype and start processing
 */
Component.prototype.getInstance = () => { return Strudel; };
init();



/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(8)))

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_strudel__ = __webpack_require__(0);
var _dec, _dec2, _dec3, _class, _desc, _value, _class2, _descriptor;

function _initDefineProp(target, property, descriptor, context) {
	if (!descriptor) return;
	Object.defineProperty(target, property, {
		enumerable: descriptor.enumerable,
		configurable: descriptor.configurable,
		writable: descriptor.writable,
		value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
	});
}

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
	var desc = {};
	Object['ke' + 'ys'](descriptor).forEach(function (key) {
		desc[key] = descriptor[key];
	});
	desc.enumerable = !!desc.enumerable;
	desc.configurable = !!desc.configurable;

	if ('value' in desc || desc.initializer) {
		desc.writable = true;
	}

	desc = decorators.slice().reverse().reduce(function (desc, decorator) {
		return decorator(target, property, desc) || desc;
	}, desc);

	if (context && desc.initializer !== void 0) {
		desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
		desc.initializer = undefined;
	}

	if (desc.initializer === void 0) {
		Object['define' + 'Property'](target, property, desc);
		desc = null;
	}

	return desc;
}

function _initializerWarningHelper(descriptor, context) {
	throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
}



var Collapsible = (_dec = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_strudel__["a" /* Component */])('.collapsible'), _dec2 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_strudel__["b" /* El */])('.collapsible__panel'), _dec3 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_strudel__["c" /* Evt */])('click .collapsible__button'), _dec(_class = (_class2 = function () {
	function Collapsible() {
		_classCallCheck(this, Collapsible);

		_initDefineProp(this, 'panel', _descriptor, this);
	}

	Collapsible.prototype.toggle = function toggle() {
		var state = this.panel.attr('hidden') !== null;

		if (state) {
			this.panel.first().removeAttribute('hidden');
		} else {
			this.panel.attr('hidden', 'true');
		}
	};

	return Collapsible;
}(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'panel', [_dec2], {
	enumerable: true,
	initializer: null
}), _applyDecoratedDescriptor(_class2.prototype, 'toggle', [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, 'toggle'), _class2.prototype)), _class2)) || _class);

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_strudel__ = __webpack_require__(0);
var _dec, _dec2, _class, _desc, _value, _class2, _dec3, _dec4, _class3, _desc2, _value2, _class4;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
	var desc = {};
	Object['ke' + 'ys'](descriptor).forEach(function (key) {
		desc[key] = descriptor[key];
	});
	desc.enumerable = !!desc.enumerable;
	desc.configurable = !!desc.configurable;

	if ('value' in desc || desc.initializer) {
		desc.writable = true;
	}

	desc = decorators.slice().reverse().reduce(function (desc, decorator) {
		return decorator(target, property, desc) || desc;
	}, desc);

	if (context && desc.initializer !== void 0) {
		desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
		desc.initializer = undefined;
	}

	if (desc.initializer === void 0) {
		Object['define' + 'Property'](target, property, desc);
		desc = null;
	}

	return desc;
}



var Generator = (_dec = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_strudel__["a" /* Component */])('.generator'), _dec2 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_strudel__["c" /* Evt */])('click .generator__trigger'), _dec(_class = (_class2 = function () {
	function Generator() {
		_classCallCheck(this, Generator);
	}

	Generator.prototype.onTrigger = function onTrigger() {
		this.$element.prepend('<div class="alert"></div>');
		this.$element.trigger('contentloaded');
	};

	return Generator;
}(), (_applyDecoratedDescriptor(_class2.prototype, 'onTrigger', [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, 'onTrigger'), _class2.prototype)), _class2)) || _class);
var Alert = (_dec3 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_strudel__["a" /* Component */])('.alert'), _dec4 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_strudel__["c" /* Evt */])('click .alert__dismiss'), _dec3(_class3 = (_class4 = function () {
	function Alert() {
		_classCallCheck(this, Alert);
	}

	Alert.prototype.dismiss = function dismiss() {
		this.$element.remove();
	};

	Alert.prototype.init = function init() {
		var _this = this;

		this.$element.html('Alert! <button class="alert__dismiss">X</button>');

		setTimeout(function () {
			_this.dismiss();
		}, 2000);
	};

	return Alert;
}(), (_applyDecoratedDescriptor(_class4.prototype, 'dismiss', [_dec4], Object.getOwnPropertyDescriptor(_class4.prototype, 'dismiss'), _class4.prototype)), _class4)) || _class3);

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_strudel__ = __webpack_require__(0);
var _dec, _dec2, _dec3, _class, _desc, _value, _class2, _descriptor, _dec4, _class4;

function _initDefineProp(target, property, descriptor, context) {
	if (!descriptor) return;
	Object.defineProperty(target, property, {
		enumerable: descriptor.enumerable,
		configurable: descriptor.configurable,
		writable: descriptor.writable,
		value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
	});
}

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
	var desc = {};
	Object['ke' + 'ys'](descriptor).forEach(function (key) {
		desc[key] = descriptor[key];
	});
	desc.enumerable = !!desc.enumerable;
	desc.configurable = !!desc.configurable;

	if ('value' in desc || desc.initializer) {
		desc.writable = true;
	}

	desc = decorators.slice().reverse().reduce(function (desc, decorator) {
		return decorator(target, property, desc) || desc;
	}, desc);

	if (context && desc.initializer !== void 0) {
		desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
		desc.initializer = undefined;
	}

	if (desc.initializer === void 0) {
		Object['define' + 'Property'](target, property, desc);
		desc = null;
	}

	return desc;
}

function _initializerWarningHelper(descriptor, context) {
	throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
}



var Publish = (_dec = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_strudel__["a" /* Component */])('.publish'), _dec2 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_strudel__["b" /* El */])('.publish__message'), _dec3 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_strudel__["c" /* Evt */])('click .publish__button'), _dec(_class = (_class2 = function () {
	function Publish() {
		_classCallCheck(this, Publish);

		_initDefineProp(this, 'message', _descriptor, this);
	}

	Publish.prototype.sendMessage = function sendMessage() {
		this.$emit('publish:msg', {
			message: this.message.prop('value')
		});
		this.message.prop('value', '');
	};

	return Publish;
}(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'message', [_dec2], {
	enumerable: true,
	initializer: null
}), _applyDecoratedDescriptor(_class2.prototype, 'sendMessage', [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, 'sendMessage'), _class2.prototype)), _class2)) || _class);
var Subscribe = (_dec4 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_strudel__["a" /* Component */])('.subscribe'), _dec4(_class4 = function () {
	function Subscribe() {
		_classCallCheck(this, Subscribe);
	}

	Subscribe.prototype.init = function init() {
		var _this = this;

		this.$on('publish:msg', function (data) {
			_this.$element.append('<li>' + data.message + '</li>');
		});
	};

	return Subscribe;
}()) || _class4);


/* unused harmony default export */ var _unused_webpack_default_export = ({ Publish: Publish, Subscribe: Subscribe });

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_strudel__ = __webpack_require__(0);
var _dec, _dec2, _dec3, _dec4, _class, _desc, _value, _class2, _descriptor, _descriptor2;

function _initDefineProp(target, property, descriptor, context) {
	if (!descriptor) return;
	Object.defineProperty(target, property, {
		enumerable: descriptor.enumerable,
		configurable: descriptor.configurable,
		writable: descriptor.writable,
		value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
	});
}

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
	var desc = {};
	Object['ke' + 'ys'](descriptor).forEach(function (key) {
		desc[key] = descriptor[key];
	});
	desc.enumerable = !!desc.enumerable;
	desc.configurable = !!desc.configurable;

	if ('value' in desc || desc.initializer) {
		desc.writable = true;
	}

	desc = decorators.slice().reverse().reduce(function (desc, decorator) {
		return decorator(target, property, desc) || desc;
	}, desc);

	if (context && desc.initializer !== void 0) {
		desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
		desc.initializer = undefined;
	}

	if (desc.initializer === void 0) {
		Object['define' + 'Property'](target, property, desc);
		desc = null;
	}

	return desc;
}

function _initializerWarningHelper(descriptor, context) {
	throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
}



var Greeter = (_dec = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_strudel__["a" /* Component */])('.greeter'), _dec2 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_strudel__["b" /* El */])('.greeter__output'), _dec3 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_strudel__["b" /* El */])('.greeter__input'), _dec4 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_strudel__["c" /* Evt */])('click .greeter__button'), _dec(_class = (_class2 = function () {
	function Greeter() {
		_classCallCheck(this, Greeter);

		_initDefineProp(this, 'output', _descriptor, this);

		_initDefineProp(this, 'input', _descriptor2, this);
	}

	Greeter.prototype.greet = function greet() {
		this.output.html('Hello, ' + this.input.prop('value') + '!');
	};

	return Greeter;
}(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'output', [_dec2], {
	enumerable: true,
	initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'input', [_dec3], {
	enumerable: true,
	initializer: null
}), _applyDecoratedDescriptor(_class2.prototype, 'greet', [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, 'greet'), _class2.prototype)), _class2)) || _class);

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_strudel__ = __webpack_require__(0);
var _dec, _class;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }



var HelloWorld = (_dec = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_strudel__["a" /* Component */])('.hello'), _dec(_class = function () {
	function HelloWorld() {
		_classCallCheck(this, HelloWorld);
	}

	HelloWorld.prototype.init = function init() {
		this.$element.html('Hello world!');
	};

	return HelloWorld;
}()) || _class);

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_strudel__ = __webpack_require__(0);
var _dec, _class, _dec2, _dec3, _class3, _desc, _value, _class4;

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
	var desc = {};
	Object['ke' + 'ys'](descriptor).forEach(function (key) {
		desc[key] = descriptor[key];
	});
	desc.enumerable = !!desc.enumerable;
	desc.configurable = !!desc.configurable;

	if ('value' in desc || desc.initializer) {
		desc.writable = true;
	}

	desc = decorators.slice().reverse().reduce(function (desc, decorator) {
		return decorator(target, property, desc) || desc;
	}, desc);

	if (context && desc.initializer !== void 0) {
		desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
		desc.initializer = undefined;
	}

	if (desc.initializer === void 0) {
		Object['define' + 'Property'](target, property, desc);
		desc = null;
	}

	return desc;
}

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }



var Counter = (_dec = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_strudel__["a" /* Component */])('.counter'), _dec(_class = function () {
	function Counter() {
		_classCallCheck(this, Counter);

		this.count = 0;
	}

	Counter.prototype.beforeInit = function beforeInit() {
		var _this = this;

		this.$on('add', function () {
			_this.count++;
			if (_this.count >= 5) {
				_this.$teardown();
			} else {
				_this.render();
			}
		});
	};

	Counter.prototype.init = function init() {
		this.render();
	};

	Counter.prototype.beforeDestroy = function beforeDestroy() {
		this.$element.remove();
	};

	Counter.prototype.destroy = function destroy() {
		this.$off('add');
		this.$emit('destroyed');
	};

	Counter.prototype.render = function render() {
		this.$element.text(this.count);
	};

	return Counter;
}()) || _class);
var Add = (_dec2 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_strudel__["a" /* Component */])('.adder'), _dec3 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_strudel__["c" /* Evt */])('click'), _dec2(_class3 = (_class4 = function () {
	function Add() {
		_classCallCheck(this, Add);
	}

	Add.prototype.beforeInit = function beforeInit() {
		var _this2 = this;

		this.$on('destroyed', function () {
			return _this2.$teardown();
		});
	};

	Add.prototype.beforeDestroy = function beforeDestroy() {
		this.$element.remove();
	};

	Add.prototype.onClick = function onClick() {
		this.$emit('add');
	};

	return Add;
}(), (_applyDecoratedDescriptor(_class4.prototype, 'onClick', [_dec3], Object.getOwnPropertyDescriptor(_class4.prototype, 'onClick'), _class4.prototype)), _class4)) || _class3);

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__examples_hello_world__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__examples_collapsible__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__examples_events__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__examples_dynamic_init__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__examples_lifecycle__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__examples_greeter__ = __webpack_require__(4);







/***/ }),
/* 8 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ })
/******/ ]);