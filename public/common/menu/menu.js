/*
@license

undefined v.6.2.2 Professional

This software is covered by DHTMLX Commercial License.
Usage without proper license is prohibited.

(c) XB Software.

*/
if (window.dhx){ window.dhx_legacy = dhx; delete window.dhx; }(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["dhx"] = factory();
	else
		root["dhx"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	__webpack_require__.p = "/codebase/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "../ts-menu/sources/entry.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../node_modules/domvm/dist/dev/domvm.dev.js":
/*!***************************************************!*\
  !*** ../node_modules/domvm/dist/dev/domvm.dev.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
* Copyright (c) 2017, Leon Sorokin
* All rights reserved. (MIT Licensed)
*
* domvm.js (DOM ViewModel)
* A thin, fast, dependency-free vdom view layer
* @preserve https://github.com/leeoniya/domvm (v3.2.6, dev build)
*/

(function (global, factory) {
	 true ? module.exports = factory() :
	undefined;
}(this, (function () { 'use strict';

// NOTE: if adding a new *VNode* type, make it < COMMENT and renumber rest.
// There are some places that test <= COMMENT to assert if node is a VNode

// VNode types
var ELEMENT	= 1;
var TEXT		= 2;
var COMMENT	= 3;

// placeholder types
var VVIEW		= 4;
var VMODEL		= 5;

var ENV_DOM = typeof window !== "undefined";
var win = ENV_DOM ? window : {};
var rAF = win.requestAnimationFrame;

var emptyObj = {};

function noop() {}

var isArr = Array.isArray;

function isSet(val) {
	return val != null;
}

function isPlainObj(val) {
	return val != null && val.constructor === Object;		//  && typeof val === "object"
}

function insertArr(targ, arr, pos, rem) {
	targ.splice.apply(targ, [pos, rem].concat(arr));
}

function isVal(val) {
	var t = typeof val;
	return t === "string" || t === "number";
}

function isFunc(val) {
	return typeof val === "function";
}

function isProm(val) {
	return typeof val === "object" && isFunc(val.then);
}



function assignObj(targ) {
	var args = arguments;

	for (var i = 1; i < args.length; i++)
		{ for (var k in args[i])
			{ targ[k] = args[i][k]; } }

	return targ;
}

// export const defProp = Object.defineProperty;

function deepSet(targ, path, val) {
	var seg;

	while (seg = path.shift()) {
		if (path.length === 0)
			{ targ[seg] = val; }
		else
			{ targ[seg] = targ = targ[seg] || {}; }
	}
}

/*
export function deepUnset(targ, path) {
	var seg;

	while (seg = path.shift()) {
		if (path.length === 0)
			targ[seg] = val;
		else
			targ[seg] = targ = targ[seg] || {};
	}
}
*/

function sliceArgs(args, offs) {
	var arr = [];
	for (var i = offs; i < args.length; i++)
		{ arr.push(args[i]); }
	return arr;
}

function cmpObj(a, b) {
	for (var i in a)
		{ if (a[i] !== b[i])
			{ return false; } }

	return true;
}

function cmpArr(a, b) {
	var alen = a.length;

	if (b.length !== alen)
		{ return false; }

	for (var i = 0; i < alen; i++)
		{ if (a[i] !== b[i])
			{ return false; } }

	return true;
}

// https://github.com/darsain/raft
// rAF throttler, aggregates multiple repeated redraw calls within single animframe
function raft(fn) {
	if (!rAF)
		{ return fn; }

	var id, ctx, args;

	function call() {
		id = 0;
		fn.apply(ctx, args);
	}

	return function() {
		ctx = this;
		args = arguments;
		if (!id) { id = rAF(call); }
	};
}

function curry(fn, args, ctx) {
	return function() {
		return fn.apply(ctx, args);
	};
}

/*
export function prop(val, cb, ctx, args) {
	return function(newVal, execCb) {
		if (newVal !== undefined && newVal !== val) {
			val = newVal;
			execCb !== false && isFunc(cb) && cb.apply(ctx, args);
		}

		return val;
	};
}
*/

/*
// adapted from https://github.com/Olical/binary-search
export function binaryKeySearch(list, item) {
    var min = 0;
    var max = list.length - 1;
    var guess;

	var bitwise = (max <= 2147483647) ? true : false;
	if (bitwise) {
		while (min <= max) {
			guess = (min + max) >> 1;
			if (list[guess].key === item) { return guess; }
			else {
				if (list[guess].key < item) { min = guess + 1; }
				else { max = guess - 1; }
			}
		}
	} else {
		while (min <= max) {
			guess = Math.floor((min + max) / 2);
			if (list[guess].key === item) { return guess; }
			else {
				if (list[guess].key < item) { min = guess + 1; }
				else { max = guess - 1; }
			}
		}
	}

    return -1;
}
*/

// https://en.wikipedia.org/wiki/Longest_increasing_subsequence
// impl borrowed from https://github.com/ivijs/ivi
function longestIncreasingSubsequence(a) {
	var p = a.slice();
	var result = [];
	result.push(0);
	var u;
	var v;

	for (var i = 0, il = a.length; i < il; ++i) {
		var j = result[result.length - 1];
		if (a[j] < a[i]) {
			p[i] = j;
			result.push(i);
			continue;
		}

		u = 0;
		v = result.length - 1;

		while (u < v) {
			var c = ((u + v) / 2) | 0;
			if (a[result[c]] < a[i]) {
				u = c + 1;
			} else {
				v = c;
			}
		}

		if (a[i] < a[result[u]]) {
			if (u > 0) {
				p[i] = result[u - 1];
			}
			result[u] = i;
		}
	}

	u = result.length;
	v = result[u - 1];

	while (u-- > 0) {
		result[u] = v;
		v = p[v];
	}

	return result;
}

// based on https://github.com/Olical/binary-search
function binaryFindLarger(item, list) {
	var min = 0;
	var max = list.length - 1;
	var guess;

	var bitwise = (max <= 2147483647) ? true : false;
	if (bitwise) {
		while (min <= max) {
			guess = (min + max) >> 1;
			if (list[guess] === item) { return guess; }
			else {
				if (list[guess] < item) { min = guess + 1; }
				else { max = guess - 1; }
			}
		}
	} else {
		while (min <= max) {
			guess = Math.floor((min + max) / 2);
			if (list[guess] === item) { return guess; }
			else {
				if (list[guess] < item) { min = guess + 1; }
				else { max = guess - 1; }
			}
		}
	}

	return (min == list.length) ? null : min;

//	return -1;
}

function isEvProp(name) {
	return name[0] === "o" && name[1] === "n";
}

function isSplProp(name) {
	return name[0] === "_";
}

function isStyleProp(name) {
	return name === "style";
}

function repaint(node) {
	node && node.el && node.el.offsetHeight;
}

function isHydrated(vm) {
	return vm.node != null && vm.node.el != null;
}

// tests interactive props where real val should be compared
function isDynProp(tag, attr) {
//	switch (tag) {
//		case "input":
//		case "textarea":
//		case "select":
//		case "option":
			switch (attr) {
				case "value":
				case "checked":
				case "selected":
//				case "selectedIndex":
					return true;
			}
//	}

	return false;
}

function getVm(n) {
	n = n || emptyObj;
	while (n.vm == null && n.parent)
		{ n = n.parent; }
	return n.vm;
}

function VNode() {}

var VNodeProto = VNode.prototype = {
	constructor: VNode,

	type:	null,

	vm:		null,

	// all this stuff can just live in attrs (as defined) just have getters here for it
	key:	null,
	ref:	null,
	data:	null,
	hooks:	null,
	ns:		null,

	el:		null,

	tag:	null,
	attrs:	null,
	body:	null,

	flags:	0,

	_class:	null,
	_diff:	null,

	// pending removal on promise resolution
	_dead:	false,
	// part of longest increasing subsequence?
	_lis:	false,

	idx:	null,
	parent:	null,

	/*
	// break out into optional fluent module
	key:	function(val) { this.key	= val; return this; },
	ref:	function(val) { this.ref	= val; return this; },		// deep refs
	data:	function(val) { this.data	= val; return this; },
	hooks:	function(val) { this.hooks	= val; return this; },		// h("div").hooks()
	html:	function(val) { this.html	= true; return this.body(val); },

	body:	function(val) { this.body	= val; return this; },
	*/
};

function defineText(body) {
	var node = new VNode;
	node.type = TEXT;
	node.body = body;
	return node;
}

var isStream = function() { return false };

var streamVal = noop;
var subStream = noop;
var unsubStream = noop;

function streamCfg(cfg) {
	isStream	= cfg.is;
	streamVal	= cfg.val;
	subStream	= cfg.sub;
	unsubStream	= cfg.unsub;
}

// creates a one-shot self-ending stream that redraws target vm
// TODO: if it's already registered by any parent vm, then ignore to avoid simultaneous parent & child refresh
function hookStream(s, vm) {
	var redrawStream = subStream(s, function (val) {
		// this "if" ignores the initial firing during subscription (there's no redrawable vm yet)
		if (redrawStream) {
			// if vm fully is formed (or mounted vm.node.el?)
			if (vm.node != null)
				{ vm.redraw(); }
			unsubStream(redrawStream);
		}
	});

	return streamVal(s);
}

function hookStream2(s, vm) {
	var redrawStream = subStream(s, function (val) {
		// this "if" ignores the initial firing during subscription (there's no redrawable vm yet)
		if (redrawStream) {
			// if vm fully is formed (or mounted vm.node.el?)
			if (vm.node != null)
				{ vm.redraw(); }
		}
	});

	return redrawStream;
}

var tagCache = {};

var RE_ATTRS = /\[(\w+)(?:=(\w+))?\]/g;

function cssTag(raw) {
	{
		var cached = tagCache[raw];

		if (cached == null) {
			var tag, id, cls, attr;

			tagCache[raw] = cached = {
				tag:	(tag	= raw.match( /^[-\w]+/))		?	tag[0]						: "div",
				id:		(id		= raw.match( /#([-\w]+)/))		? 	id[1]						: null,
				class:	(cls	= raw.match(/\.([-\w.]+)/))		?	cls[1].replace(/\./g, " ")	: null,
				attrs:	null,
			};

			while (attr = RE_ATTRS.exec(raw)) {
				if (cached.attrs == null)
					{ cached.attrs = {}; }
				cached.attrs[attr[1]] = attr[2] || "";
			}
		}

		return cached;
	}
}

var DEVMODE = {
	syncRedraw: false,

	warnings: true,

	verbose: true,

	mutations: true,

	DATA_REPLACED: function(vm, oldData, newData) {
		if (isFunc(vm.view) && vm.view.length > 1) {
			var msg = "A view's data was replaced. The data originally passed to the view closure during init is now stale. You may want to rely only on the data passed to render() or vm.data.";
			return [msg, vm, oldData, newData];
		}
	},

	UNKEYED_INPUT: function(vnode) {
		return ["Unkeyed <input> detected. Consider adding a name, id, _key, or _ref attr to avoid accidental DOM recycling between different <input> types.", vnode];
	},

	UNMOUNTED_REDRAW: function(vm) {
		return ["Invoking redraw() of an unmounted (sub)view may result in errors.", vm];
	},

	INLINE_HANDLER: function(vnode, oval, nval) {
		return ["Anonymous event handlers get re-bound on each redraw, consider defining them outside of templates for better reuse.", vnode, oval, nval];
	},

	MISMATCHED_HANDLER: function(vnode, oval, nval) {
		return ["Patching of different event handler styles is not fully supported for performance reasons. Ensure that handlers are defined using the same style.", vnode, oval, nval];
	},

	SVG_WRONG_FACTORY: function(vnode) {
		return ["<svg> defined using domvm.defineElement. Use domvm.defineSvgElement for <svg> & child nodes.", vnode];
	},

	FOREIGN_ELEMENT: function(el) {
		return ["domvm stumbled upon an element in its DOM that it didn't create, which may be problematic. You can inject external elements into the vtree using domvm.injectElement.", el];
	},

	REUSED_ATTRS: function(vnode) {
		return ["Attrs objects may only be reused if they are truly static, as a perf optimization. Mutating & reusing them will have no effect on the DOM due to 0 diff.", vnode];
	},

	ADJACENT_TEXT: function(vnode, text1, text2) {
		return ["Adjacent text nodes will be merged. Consider concatentating them yourself in the template for improved perf.", vnode, text1, text2];
	},

	ARRAY_FLATTENED: function(vnode, array) {
		return ["Arrays within templates will be flattened. When they are leading or trailing, it's easy and more performant to just .concat() them in the template.", vnode, array];
	},

	ALREADY_HYDRATED: function(vm) {
		return ["A child view failed to mount because it was already hydrated. Make sure not to invoke vm.redraw() or vm.update() on unmounted views.", vm];
	},

	ATTACH_IMPLICIT_TBODY: function(vnode, vchild) {
		return ["<table><tr> was detected in the vtree, but the DOM will be <table><tbody><tr> after HTML's implicit parsing. You should create the <tbody> vnode explicitly to avoid SSR/attach() failures.", vnode, vchild];
	}
};

function devNotify(key, args) {
	if (DEVMODE.warnings && isFunc(DEVMODE[key])) {
		var msgArgs = DEVMODE[key].apply(null, args);

		if (msgArgs) {
			msgArgs[0] = key + ": " + (DEVMODE.verbose ? msgArgs[0] : "");
			console.warn.apply(console, msgArgs);
		}
	}
}

// (de)optimization flags

// forces slow bottom-up removeChild to fire deep willRemove/willUnmount hooks,
var DEEP_REMOVE = 1;
// prevents inserting/removing/reordering of children
var FIXED_BODY = 2;
// enables fast keyed lookup of children via binary search, expects homogeneous keyed body
var KEYED_LIST = 4;
// indicates an vnode match/diff/recycler function for body
var LAZY_LIST = 8;

function initElementNode(tag, attrs, body, flags) {
	var node = new VNode;

	node.type = ELEMENT;

	if (isSet(flags))
		{ node.flags = flags; }

	node.attrs = attrs;

	var parsed = cssTag(tag);

	node.tag = parsed.tag;

	// meh, weak assertion, will fail for id=0, etc.
	if (parsed.id || parsed.class || parsed.attrs) {
		var p = node.attrs || {};

		if (parsed.id && !isSet(p.id))
			{ p.id = parsed.id; }

		if (parsed.class) {
			node._class = parsed.class;		// static class
			p.class = parsed.class + (isSet(p.class) ? (" " + p.class) : "");
		}
		if (parsed.attrs) {
			for (var key in parsed.attrs)
				{ if (!isSet(p[key]))
					{ p[key] = parsed.attrs[key]; } }
		}

//		if (node.attrs !== p)
			node.attrs = p;
	}

	var mergedAttrs = node.attrs;

	if (isSet(mergedAttrs)) {
		if (isSet(mergedAttrs._key))
			{ node.key = mergedAttrs._key; }

		if (isSet(mergedAttrs._ref))
			{ node.ref = mergedAttrs._ref; }

		if (isSet(mergedAttrs._hooks))
			{ node.hooks = mergedAttrs._hooks; }

		if (isSet(mergedAttrs._data))
			{ node.data = mergedAttrs._data; }

		if (isSet(mergedAttrs._flags))
			{ node.flags = mergedAttrs._flags; }

		if (!isSet(node.key)) {
			if (isSet(node.ref))
				{ node.key = node.ref; }
			else if (isSet(mergedAttrs.id))
				{ node.key = mergedAttrs.id; }
			else if (isSet(mergedAttrs.name))
				{ node.key = mergedAttrs.name + (mergedAttrs.type === "radio" || mergedAttrs.type === "checkbox" ? mergedAttrs.value : ""); }
		}
	}

	if (body != null)
		{ node.body = body; }

	{
		if (node.tag === "svg") {
			setTimeout(function() {
				node.ns == null && devNotify("SVG_WRONG_FACTORY", [node]);
			}, 16);
		}
		// todo: attrs.contenteditable === "true"?
		else if (/^(?:input|textarea|select|datalist|keygen|output)$/.test(node.tag) && node.key == null)
			{ devNotify("UNKEYED_INPUT", [node]); }
	}

	return node;
}

function setRef(vm, name, node) {
	var path = ["refs"].concat(name.split("."));
	deepSet(vm, path, node);
}

function setDeepRemove(node) {
	while (node = node.parent)
		{ node.flags |= DEEP_REMOVE; }
}

// vnew, vold
function preProc(vnew, parent, idx, ownVm) {
	if (vnew.type === VMODEL || vnew.type === VVIEW)
		{ return; }

	vnew.parent = parent;
	vnew.idx = idx;
	vnew.vm = ownVm;

	if (vnew.ref != null)
		{ setRef(getVm(vnew), vnew.ref, vnew); }

	var nh = vnew.hooks,
		vh = ownVm && ownVm.hooks;

	if (nh && (nh.willRemove || nh.didRemove) ||
		vh && (vh.willUnmount || vh.didUnmount))
		{ setDeepRemove(vnew); }

	if (isArr(vnew.body))
		{ preProcBody(vnew); }
	else {
		if (isStream(vnew.body))
			{ vnew.body = hookStream(vnew.body, getVm(vnew)); }
	}
}

function preProcBody(vnew) {
	var body = vnew.body;

	for (var i = 0; i < body.length; i++) {
		var node2 = body[i];

		// remove false/null/undefined
		if (node2 === false || node2 == null)
			{ body.splice(i--, 1); }
		// flatten arrays
		else if (isArr(node2)) {
			{
				if (i === 0 || i === body.length - 1)
					{ devNotify("ARRAY_FLATTENED", [vnew, node2]); }
			}
			insertArr(body, node2, i--, 1);
		}
		else {
			if (node2.type == null)
				{ body[i] = node2 = defineText(""+node2); }

			if (node2.type === TEXT) {
				// remove empty text nodes
				if (node2.body == null || node2.body === "")
					{ body.splice(i--, 1); }
				// merge with previous text node
				else if (i > 0 && body[i-1].type === TEXT) {
					{
						devNotify("ADJACENT_TEXT", [vnew, body[i-1].body, node2.body]);
					}
					body[i-1].body += node2.body;
					body.splice(i--, 1);
				}
				else
					{ preProc(node2, vnew, i, null); }
			}
			else
				{ preProc(node2, vnew, i, null); }
		}
	}
}

var unitlessProps = {
	animationIterationCount: true,
	boxFlex: true,
	boxFlexGroup: true,
	boxOrdinalGroup: true,
	columnCount: true,
	flex: true,
	flexGrow: true,
	flexPositive: true,
	flexShrink: true,
	flexNegative: true,
	flexOrder: true,
	gridRow: true,
	gridColumn: true,
	order: true,
	lineClamp: true,

	borderImageOutset: true,
	borderImageSlice: true,
	borderImageWidth: true,
	fontWeight: true,
	lineHeight: true,
	opacity: true,
	orphans: true,
	tabSize: true,
	widows: true,
	zIndex: true,
	zoom: true,

	fillOpacity: true,
	floodOpacity: true,
	stopOpacity: true,
	strokeDasharray: true,
	strokeDashoffset: true,
	strokeMiterlimit: true,
	strokeOpacity: true,
	strokeWidth: true
};

function autoPx(name, val) {
	{
		// typeof val === 'number' is faster but fails for numeric strings
		return !isNaN(val) && !unitlessProps[name] ? (val + "px") : val;
	}
}

// assumes if styles exist both are objects or both are strings
function patchStyle(n, o) {
	var ns =     (n.attrs || emptyObj).style;
	var os = o ? (o.attrs || emptyObj).style : null;

	// replace or remove in full
	if (ns == null || isVal(ns))
		{ n.el.style.cssText = ns; }
	else {
		for (var nn in ns) {
			var nv = ns[nn];

			{
				if (isStream(nv))
					{ nv = hookStream(nv, getVm(n)); }
			}

			if (os == null || nv != null && nv !== os[nn])
				{ n.el.style[nn] = autoPx(nn, nv); }
		}

		// clean old
		if (os) {
			for (var on in os) {
				if (ns[on] == null)
					{ n.el.style[on] = ""; }
			}
		}
	}
}

var didQueue = [];

function fireHook(hooks, name, o, n, immediate) {
	if (hooks != null) {
		var fn = o.hooks[name];

		if (fn) {
			if (name[0] === "d" && name[1] === "i" && name[2] === "d") {	// did*
				//	console.log(name + " should queue till repaint", o, n);
				immediate ? repaint(o.parent) && fn(o, n) : didQueue.push([fn, o, n]);
			}
			else {		// will*
				//	console.log(name + " may delay by promise", o, n);
				return fn(o, n);		// or pass  done() resolver
			}
		}
	}
}

function drainDidHooks(vm) {
	if (didQueue.length) {
		repaint(vm.node);

		var item;
		while (item = didQueue.shift())
			{ item[0](item[1], item[2]); }
	}
}

var doc = ENV_DOM ? document : null;

function closestVNode(el) {
	while (el._node == null)
		{ el = el.parentNode; }
	return el._node;
}

function createElement(tag, ns) {
	if (ns != null)
		{ return doc.createElementNS(ns, tag); }
	return doc.createElement(tag);
}

function createTextNode(body) {
	return doc.createTextNode(body);
}

function createComment(body) {
	return doc.createComment(body);
}

// ? removes if !recycled
function nextSib(sib) {
	return sib.nextSibling;
}

// ? removes if !recycled
function prevSib(sib) {
	return sib.previousSibling;
}

// TODO: this should collect all deep proms from all hooks and return Promise.all()
function deepNotifyRemove(node) {
	var vm = node.vm;

	var wuRes = vm != null && fireHook(vm.hooks, "willUnmount", vm, vm.data);

	var wrRes = fireHook(node.hooks, "willRemove", node);

	if ((node.flags & DEEP_REMOVE) === DEEP_REMOVE && isArr(node.body)) {
		for (var i = 0; i < node.body.length; i++)
			{ deepNotifyRemove(node.body[i]); }
	}

	return wuRes || wrRes;
}

function _removeChild(parEl, el, immediate) {
	var node = el._node, vm = node.vm;

	if (isArr(node.body)) {
		if ((node.flags & DEEP_REMOVE) === DEEP_REMOVE) {
			for (var i = 0; i < node.body.length; i++)
				{ _removeChild(el, node.body[i].el); }
		}
		else
			{ deepUnref(node); }
	}

	delete el._node;

	parEl.removeChild(el);

	fireHook(node.hooks, "didRemove", node, null, immediate);

	if (vm != null) {
		fireHook(vm.hooks, "didUnmount", vm, vm.data, immediate);
		vm.node = null;
	}
}

// todo: should delay parent unmount() by returning res prom?
function removeChild(parEl, el) {
	var node = el._node;

	// already marked for removal
	if (node._dead) { return; }

	var res = deepNotifyRemove(node);

	if (res != null && isProm(res)) {
		node._dead = true;
		res.then(curry(_removeChild, [parEl, el, true]));
	}
	else
		{ _removeChild(parEl, el); }
}

function deepUnref(node) {
	var obody = node.body;

	for (var i = 0; i < obody.length; i++) {
		var o2 = obody[i];
		delete o2.el._node;

		if (o2.vm != null)
			{ o2.vm.node = null; }

		if (isArr(o2.body))
			{ deepUnref(o2); }
	}
}

function clearChildren(parent) {
	var parEl = parent.el;

	if ((parent.flags & DEEP_REMOVE) === 0) {
		isArr(parent.body) && deepUnref(parent);
		parEl.textContent = null;
	}
	else {
		var el = parEl.firstChild;

		do {
			var next = nextSib(el);
			removeChild(parEl, el);
		} while (el = next);
	}
}

// todo: hooks
function insertBefore(parEl, el, refEl) {
	var node = el._node, inDom = el.parentNode != null;

	// el === refEl is asserted as a no-op insert called to fire hooks
	var vm = (el === refEl || !inDom) ? node.vm : null;

	if (vm != null)
		{ fireHook(vm.hooks, "willMount", vm, vm.data); }

	fireHook(node.hooks, inDom ? "willReinsert" : "willInsert", node);
	parEl.insertBefore(el, refEl);
	fireHook(node.hooks, inDom ? "didReinsert" : "didInsert", node);

	if (vm != null)
		{ fireHook(vm.hooks, "didMount", vm, vm.data); }
}

function insertAfter(parEl, el, refEl) {
	insertBefore(parEl, el, refEl ? nextSib(refEl) : null);
}

var onemit = {};

function emitCfg(cfg) {
	assignObj(onemit, cfg);
}

function emit(evName) {
	var targ = this,
		src = targ;

	var args = sliceArgs(arguments, 1).concat(src, src.data);

	do {
		var evs = targ.onemit;
		var fn = evs ? evs[evName] : null;

		if (fn) {
			fn.apply(targ, args);
			break;
		}
	} while (targ = targ.parent());

	if (onemit[evName])
		{ onemit[evName].apply(targ, args); }
}

var onevent = noop;

function config(newCfg) {
	onevent = newCfg.onevent || onevent;

	{
		if (newCfg.onemit)
			{ emitCfg(newCfg.onemit); }
	}

	{
		if (newCfg.stream)
			{ streamCfg(newCfg.stream); }
	}
}

function bindEv(el, type, fn) {
	el[type] = fn;
}

function exec(fn, args, e, node, vm) {
	var out = fn.apply(vm, args.concat([e, node, vm, vm.data]));

	// should these respect out === false?
	vm.onevent(e, node, vm, vm.data, args);
	onevent.call(null, e, node, vm, vm.data, args);

	if (out === false) {
		e.preventDefault();
		e.stopPropagation();
	}
}

function handle(e) {
	var node = closestVNode(e.target);
	var vm = getVm(node);

	var evDef = e.currentTarget._node.attrs["on" + e.type], fn, args;

	if (isArr(evDef)) {
		fn = evDef[0];
		args = evDef.slice(1);
		exec(fn, args, e, node, vm);
	}
	else {
		for (var sel in evDef) {
			if (e.target.matches(sel)) {
				var evDef2 = evDef[sel];

				if (isArr(evDef2)) {
					fn = evDef2[0];
					args = evDef2.slice(1);
				}
				else {
					fn = evDef2;
					args = [];
				}

				exec(fn, args, e, node, vm);
			}
		}
	}
}

function patchEvent(node, name, nval, oval) {
	if (nval === oval)
		{ return; }

	{
		if (isFunc(nval) && isFunc(oval) && oval.name == nval.name)
			{ devNotify("INLINE_HANDLER", [node, oval, nval]); }

		if (oval != null && nval != null &&
			(
				isArr(oval) != isArr(nval) ||
				isPlainObj(oval) != isPlainObj(nval) ||
				isFunc(oval) != isFunc(nval)
			)
		) { devNotify("MISMATCHED_HANDLER", [node, oval, nval]); }
	}

	var el = node.el;

	if (nval == null || isFunc(nval))
		{ bindEv(el, name, nval); }
	else if (oval == null)
		{ bindEv(el, name, handle); }
}

function remAttr(node, name, asProp) {
	if (name[0] === ".") {
		name = name.substr(1);
		asProp = true;
	}

	if (asProp)
		{ node.el[name] = ""; }
	else
		{ node.el.removeAttribute(name); }
}

// setAttr
// diff, ".", "on*", bool vals, skip _*, value/checked/selected selectedIndex
function setAttr(node, name, val, asProp, initial) {
	var el = node.el;

	if (val == null)
		{ !initial && remAttr(node, name, false); }		// will also removeAttr of style: null
	else if (node.ns != null)
		{ el.setAttribute(name, val); }
	else if (name === "class")
		{ el.className = val; }
	else if (name === "id" || typeof val === "boolean" || asProp)
		{ el[name] = val; }
	else if (name[0] === ".")
		{ el[name.substr(1)] = val; }
	else
		{ el.setAttribute(name, val); }
}

function patchAttrs(vnode, donor, initial) {
	var nattrs = vnode.attrs || emptyObj;
	var oattrs = donor.attrs || emptyObj;

	if (nattrs === oattrs) {
		{ devNotify("REUSED_ATTRS", [vnode]); }
	}
	else {
		for (var key in nattrs) {
			var nval = nattrs[key];
			var isDyn = isDynProp(vnode.tag, key);
			var oval = isDyn ? vnode.el[key] : oattrs[key];

			{
				if (isStream(nval))
					{ nattrs[key] = nval = hookStream(nval, getVm(vnode)); }
			}

			if (nval === oval) {}
			else if (isStyleProp(key))
				{ patchStyle(vnode, donor); }
			else if (isSplProp(key)) {}
			else if (isEvProp(key))
				{ patchEvent(vnode, key, nval, oval); }
			else
				{ setAttr(vnode, key, nval, isDyn, initial); }
		}

		// TODO: bench style.cssText = "" vs removeAttribute("style")
		for (var key in oattrs) {
			!(key in nattrs) &&
			!isSplProp(key) &&
			remAttr(vnode, key, isDynProp(vnode.tag, key) || isEvProp(key));
		}
	}
}

function createView(view, data, key, opts) {
	if (view.type === VVIEW) {
		data	= view.data;
		key		= view.key;
		opts	= view.opts;
		view	= view.view;
	}

	return new ViewModel(view, data, key, opts);
}

//import { XML_NS, XLINK_NS } from './defineSvgElement';
function hydrateBody(vnode) {
	for (var i = 0; i < vnode.body.length; i++) {
		var vnode2 = vnode.body[i];
		var type2 = vnode2.type;

		// ELEMENT,TEXT,COMMENT
		if (type2 <= COMMENT)
			{ insertBefore(vnode.el, hydrate(vnode2)); }		// vnode.el.appendChild(hydrate(vnode2))
		else if (type2 === VVIEW) {
			var vm = createView(vnode2.view, vnode2.data, vnode2.key, vnode2.opts)._redraw(vnode, i, false);		// todo: handle new data updates
			type2 = vm.node.type;
			insertBefore(vnode.el, hydrate(vm.node));
		}
		else if (type2 === VMODEL) {
			var vm = vnode2.vm;
			vm._redraw(vnode, i);					// , false
			type2 = vm.node.type;
			insertBefore(vnode.el, vm.node.el);		// , hydrate(vm.node)
		}
	}
}

//  TODO: DRY this out. reusing normal patch here negatively affects V8's JIT
function hydrate(vnode, withEl) {
	if (vnode.el == null) {
		if (vnode.type === ELEMENT) {
			vnode.el = withEl || createElement(vnode.tag, vnode.ns);

		//	if (vnode.tag === "svg")
		//		vnode.el.setAttributeNS(XML_NS, 'xmlns:xlink', XLINK_NS);

			if (vnode.attrs != null)
				{ patchAttrs(vnode, emptyObj, true); }

			if ((vnode.flags & LAZY_LIST) === LAZY_LIST)	// vnode.body instanceof LazyList
				{ vnode.body.body(vnode); }

			if (isArr(vnode.body))
				{ hydrateBody(vnode); }
			else if (vnode.body != null && vnode.body !== "")
				{ vnode.el.textContent = vnode.body; }
		}
		else if (vnode.type === TEXT)
			{ vnode.el = withEl || createTextNode(vnode.body); }
		else if (vnode.type === COMMENT)
			{ vnode.el = withEl || createComment(vnode.body); }
	}

	vnode.el._node = vnode;

	return vnode.el;
}

// prevent GCC from inlining some large funcs (which negatively affects Chrome's JIT)
//window.syncChildren = syncChildren;
window.lisMove = lisMove;

function nextNode(node, body) {
	return body[node.idx + 1];
}

function prevNode(node, body) {
	return body[node.idx - 1];
}

function parentNode(node) {
	return node.parent;
}

var BREAK = 1;
var BREAK_ALL = 2;

function syncDir(advSib, advNode, insert, sibName, nodeName, invSibName, invNodeName, invInsert) {
	return function(node, parEl, body, state, convTest, lis) {
		var sibNode, tmpSib;

		if (state[sibName] != null) {
			// skip dom elements not created by domvm
			if ((sibNode = state[sibName]._node) == null) {
				{ devNotify("FOREIGN_ELEMENT", [state[sibName]]); }

				state[sibName] = advSib(state[sibName]);
				return;
			}

			if (parentNode(sibNode) !== node) {
				tmpSib = advSib(state[sibName]);
				sibNode.vm != null ? sibNode.vm.unmount(true) : removeChild(parEl, state[sibName]);
				state[sibName] = tmpSib;
				return;
			}
		}

		if (state[nodeName] == convTest)
			{ return BREAK_ALL; }
		else if (state[nodeName].el == null) {
			insert(parEl, hydrate(state[nodeName]), state[sibName]);	// should lis be updated here?
			state[nodeName] = advNode(state[nodeName], body);		// also need to advance sib?
		}
		else if (state[nodeName].el === state[sibName]) {
			state[nodeName] = advNode(state[nodeName], body);
			state[sibName] = advSib(state[sibName]);
		}
		// head->tail or tail->head
		else if (!lis && sibNode === state[invNodeName]) {
			tmpSib = state[sibName];
			state[sibName] = advSib(tmpSib);
			invInsert(parEl, tmpSib, state[invSibName]);
			state[invSibName] = tmpSib;
		}
		else {
			{
				if (state[nodeName].vm != null)
					{ devNotify("ALREADY_HYDRATED", [state[nodeName].vm]); }
			}

			if (lis && state[sibName] != null)
				{ return lisMove(advSib, advNode, insert, sibName, nodeName, parEl, body, sibNode, state); }

			return BREAK;
		}
	};
}

function lisMove(advSib, advNode, insert, sibName, nodeName, parEl, body, sibNode, state) {
	if (sibNode._lis) {
		insert(parEl, state[nodeName].el, state[sibName]);
		state[nodeName] = advNode(state[nodeName], body);
	}
	else {
		// find closest tomb
		var t = binaryFindLarger(sibNode.idx, state.tombs);
		sibNode._lis = true;
		var tmpSib = advSib(state[sibName]);
		insert(parEl, state[sibName], t != null ? body[state.tombs[t]].el : t);

		if (t == null)
			{ state.tombs.push(sibNode.idx); }
		else
			{ state.tombs.splice(t, 0, sibNode.idx); }

		state[sibName] = tmpSib;
	}
}

var syncLft = syncDir(nextSib, nextNode, insertBefore, "lftSib", "lftNode", "rgtSib", "rgtNode", insertAfter);
var syncRgt = syncDir(prevSib, prevNode, insertAfter, "rgtSib", "rgtNode", "lftSib", "lftNode", insertBefore);

function syncChildren(node, donor) {
	var obody	= donor.body,
		parEl	= node.el,
		body	= node.body,
		state = {
			lftNode:	body[0],
			rgtNode:	body[body.length - 1],
			lftSib:		((obody)[0] || emptyObj).el,
			rgtSib:		(obody[obody.length - 1] || emptyObj).el,
		};

	converge:
	while (1) {
//		from_left:
		while (1) {
			var l = syncLft(node, parEl, body, state, null, false);
			if (l === BREAK) { break; }
			if (l === BREAK_ALL) { break converge; }
		}

//		from_right:
		while (1) {
			var r = syncRgt(node, parEl, body, state, state.lftNode, false);
			if (r === BREAK) { break; }
			if (r === BREAK_ALL) { break converge; }
		}

		sortDOM(node, parEl, body, state);
		break;
	}
}

// TODO: also use the state.rgtSib and state.rgtNode bounds, plus reduce LIS range
function sortDOM(node, parEl, body, state) {
	var kids = Array.prototype.slice.call(parEl.childNodes);
	var domIdxs = [];

	for (var k = 0; k < kids.length; k++) {
		var n = kids[k]._node;

		if (n.parent === node)
			{ domIdxs.push(n.idx); }
	}

	// list of non-movable vnode indices (already in correct order in old dom)
	var tombs = longestIncreasingSubsequence(domIdxs).map(function (i) { return domIdxs[i]; });

	for (var i = 0; i < tombs.length; i++)
		{ body[tombs[i]]._lis = true; }

	state.tombs = tombs;

	while (1) {
		var r = syncLft(node, parEl, body, state, null, true);
		if (r === BREAK_ALL) { break; }
	}
}

function alreadyAdopted(vnode) {
	return vnode.el._node.parent !== vnode.parent;
}

function takeSeqIndex(n, obody, fromIdx) {
	return obody[fromIdx];
}

function findSeqThorough(n, obody, fromIdx) {		// pre-tested isView?
	for (; fromIdx < obody.length; fromIdx++) {
		var o = obody[fromIdx];

		if (o.vm != null) {
			// match by key & viewFn || vm
			if (n.type === VVIEW && o.vm.view === n.view && o.vm.key === n.key || n.type === VMODEL && o.vm === n.vm)
				{ return o; }
		}
		else if (!alreadyAdopted(o) && n.tag === o.tag && n.type === o.type && n.key === o.key && (n.flags & ~DEEP_REMOVE) === (o.flags & ~DEEP_REMOVE))
			{ return o; }
	}

	return null;
}

function findHashKeyed(n, obody, fromIdx) {
	return obody[obody._keys[n.key]];
}

/*
// list must be a sorted list of vnodes by key
function findBinKeyed(n, list) {
	var idx = binaryKeySearch(list, n.key);
	return idx > -1 ? list[idx] : null;
}
*/

// have it handle initial hydrate? !donor?
// types (and tags if ELEM) are assumed the same, and donor exists
function patch(vnode, donor) {
	fireHook(donor.hooks, "willRecycle", donor, vnode);

	var el = vnode.el = donor.el;

	var obody = donor.body;
	var nbody = vnode.body;

	el._node = vnode;

	// "" => ""
	if (vnode.type === TEXT && nbody !== obody) {
		el.nodeValue = nbody;
		return;
	}

	if (vnode.attrs != null || donor.attrs != null)
		{ patchAttrs(vnode, donor, false); }

	// patch events

	var oldIsArr = isArr(obody);
	var newIsArr = isArr(nbody);
	var lazyList = (vnode.flags & LAZY_LIST) === LAZY_LIST;

//	var nonEqNewBody = nbody != null && nbody !== obody;

	if (oldIsArr) {
		// [] => []
		if (newIsArr || lazyList)
			{ patchChildren(vnode, donor); }
		// [] => "" | null
		else if (nbody !== obody) {
			if (nbody != null)
				{ el.textContent = nbody; }
			else
				{ clearChildren(donor); }
		}
	}
	else {
		// "" | null => []
		if (newIsArr) {
			clearChildren(donor);
			hydrateBody(vnode);
		}
		// "" | null => "" | null
		else if (nbody !== obody) {
			if (el.firstChild)
				{ el.firstChild.nodeValue = nbody; }
			else
				{ el.textContent = nbody; }
		}
	}

	fireHook(donor.hooks, "didRecycle", donor, vnode);
}

// larger qtys of KEYED_LIST children will use binary search
//const SEQ_FAILS_MAX = 100;

// TODO: modify vtree matcher to work similar to dom reconciler for keyed from left -> from right -> head/tail -> binary
// fall back to binary if after failing nri - nli > SEQ_FAILS_MAX
// while-advance non-keyed fromIdx
// [] => []
function patchChildren(vnode, donor) {
	var nbody		= vnode.body,
		nlen		= nbody.length,
		obody		= donor.body,
		olen		= obody.length,
		isLazy		= (vnode.flags & LAZY_LIST) === LAZY_LIST,
		isFixed		= (vnode.flags & FIXED_BODY) === FIXED_BODY,
		isKeyed		= (vnode.flags & KEYED_LIST) === KEYED_LIST,
		domSync		= !isFixed && vnode.type === ELEMENT,
		doFind		= true,
		find		= (
			isKeyed ? findHashKeyed :				// keyed lists/lazyLists
			isFixed || isLazy ? takeSeqIndex :		// unkeyed lazyLists and FIXED_BODY
			findSeqThorough							// more complex stuff
		);

	if (isKeyed) {
		var keys = {};
		for (var i = 0; i < obody.length; i++)
			{ keys[obody[i].key] = i; }
		obody._keys = keys;
	}

	if (domSync && nlen === 0) {
		clearChildren(donor);
		if (isLazy)
			{ vnode.body = []; }	// nbody.tpl(all);
		return;
	}

	var donor2,
		node2,
		foundIdx,
		patched = 0,
		everNonseq = false,
		fromIdx = 0;		// first unrecycled node (search head)

	if (isLazy) {
		var fnode2 = {key: null};
		var nbodyNew = Array(nlen);
	}

	for (var i = 0; i < nlen; i++) {
		if (isLazy) {
			var remake = false;
			var diffRes = null;

			if (doFind) {
				if (isKeyed)
					{ fnode2.key = nbody.key(i); }

				donor2 = find(fnode2, obody, fromIdx);
			}

			if (donor2 != null) {
                foundIdx = donor2.idx;
				diffRes = nbody.diff(i, donor2);

				// diff returns same, so cheaply adopt vnode without patching
				if (diffRes === true) {
					node2 = donor2;
					node2.parent = vnode;
					node2.idx = i;
					node2._lis = false;
				}
				// diff returns new diffVals, so generate new vnode & patch
				else
					{ remake = true; }
			}
			else
				{ remake = true; }

			if (remake) {
				node2 = nbody.tpl(i);			// what if this is a VVIEW, VMODEL, injected element?
				preProc(node2, vnode, i);

				node2._diff = diffRes != null ? diffRes : nbody.diff(i);

				if (donor2 != null)
					{ patch(node2, donor2); }
			}
			else {
				// TODO: flag tmp FIXED_BODY on unchanged nodes?

				// domSync = true;		if any idx changes or new nodes added/removed
			}

			nbodyNew[i] = node2;
		}
		else {
			var node2 = nbody[i];
			var type2 = node2.type;

			// ELEMENT,TEXT,COMMENT
			if (type2 <= COMMENT) {
				if (donor2 = doFind && find(node2, obody, fromIdx)) {
					patch(node2, donor2);
					foundIdx = donor2.idx;
				}
			}
			else if (type2 === VVIEW) {
				if (donor2 = doFind && find(node2, obody, fromIdx)) {		// update/moveTo
					foundIdx = donor2.idx;
					var vm = donor2.vm._update(node2.data, vnode, i);		// withDOM
				}
				else
					{ var vm = createView(node2.view, node2.data, node2.key, node2.opts)._redraw(vnode, i, false); }	// createView, no dom (will be handled by sync below)

				type2 = vm.node.type;
			}
			else if (type2 === VMODEL) {
				// if the injected vm has never been rendered, this vm._update() serves as the
				// initial vtree creator, but must avoid hydrating (creating .el) because syncChildren()
				// which is responsible for mounting below (and optionally hydrating), tests .el presence
				// to determine if hydration & mounting are needed
				var withDOM = isHydrated(node2.vm);

				var vm = node2.vm._update(node2.data, vnode, i, withDOM);
				type2 = vm.node.type;
			}
		}

		// found donor & during a sequential search ...at search head
		if (!isKeyed && donor2 != null) {
			if (foundIdx === fromIdx) {
				// advance head
				fromIdx++;
				// if all old vnodes adopted and more exist, stop searching
				if (fromIdx === olen && nlen > olen) {
					// short-circuit find, allow loop just create/init rest
					donor2 = null;
					doFind = false;
				}
			}
			else
				{ everNonseq = true; }

			if (olen > 100 && everNonseq && ++patched % 10 === 0)
				{ while (fromIdx < olen && alreadyAdopted(obody[fromIdx]))
					{ fromIdx++; } }
		}
	}

	// replace List w/ new body
	if (isLazy)
		{ vnode.body = nbodyNew; }

	domSync && syncChildren(vnode, donor);
}

function DOMInstr(withTime) {
	var isEdge = navigator.userAgent.indexOf("Edge") !== -1;
	var isIE = navigator.userAgent.indexOf("Trident/") !== -1;
	var getDescr = Object.getOwnPropertyDescriptor;
	var defProp = Object.defineProperty;

	var nodeProto = Node.prototype;
	var textContent = getDescr(nodeProto, "textContent");
	var nodeValue = getDescr(nodeProto, "nodeValue");

	var htmlProto = HTMLElement.prototype;
	var innerText = getDescr(htmlProto, "innerText");

	var elemProto	= Element.prototype;
	var innerHTML	= getDescr(!isIE ? elemProto : htmlProto, "innerHTML");
	var className	= getDescr(!isIE ? elemProto : htmlProto, "className");
	var id			= getDescr(!isIE ? elemProto : htmlProto, "id");

	var styleProto	= CSSStyleDeclaration.prototype;

	var cssText		= getDescr(styleProto, "cssText");

	var inpProto = HTMLInputElement.prototype;
	var areaProto = HTMLTextAreaElement.prototype;
	var selProto = HTMLSelectElement.prototype;
	var optProto = HTMLOptionElement.prototype;

	var inpChecked = getDescr(inpProto, "checked");
	var inpVal = getDescr(inpProto, "value");

	var areaVal = getDescr(areaProto, "value");

	var selVal = getDescr(selProto, "value");
	var selIndex = getDescr(selProto, "selectedIndex");

	var optSel = getDescr(optProto, "selected");

	// onclick, onkey*, etc..

	// var styleProto = CSSStyleDeclaration.prototype;
	// var setProperty = getDescr(styleProto, "setProperty");

	var origOps = {
		"document.createElement": null,
		"document.createElementNS": null,
		"document.createTextNode": null,
		"document.createComment": null,
		"document.createDocumentFragment": null,

		"DocumentFragment.prototype.insertBefore": null,		// appendChild

		"Element.prototype.appendChild": null,
		"Element.prototype.removeChild": null,
		"Element.prototype.insertBefore": null,
		"Element.prototype.replaceChild": null,
		"Element.prototype.remove": null,

		"Element.prototype.setAttribute": null,
		"Element.prototype.setAttributeNS": null,
		"Element.prototype.removeAttribute": null,
		"Element.prototype.removeAttributeNS": null,

		// assign?
		// dataset, classlist, any props like .onchange

		// .style.setProperty, .style.cssText
	};

	var counts = {};
	var start = null;

	function ctxName(opName) {
		var opPath = opName.split(".");
		var o = window;
		while (opPath.length > 1)
			{ o = o[opPath.shift()]; }

		return {ctx: o, last: opPath[0]};
	}

	for (var opName in origOps) {
		var p = ctxName(opName);

		if (origOps[opName] === null)
			{ origOps[opName] = p.ctx[p.last]; }

		(function(opName, opShort) {
			counts[opShort] = 0;
			p.ctx[opShort] = function() {
				counts[opShort]++;
				return origOps[opName].apply(this, arguments);
			};
		})(opName, p.last);
	}

	counts.textContent = 0;
	defProp(nodeProto, "textContent", {
		set: function(s) {
			counts.textContent++;
			textContent.set.call(this, s);
		},
	});

	counts.nodeValue = 0;
	defProp(nodeProto, "nodeValue", {
		set: function(s) {
			counts.nodeValue++;
			nodeValue.set.call(this, s);
		},
	});

	counts.innerText = 0;
	defProp(htmlProto, "innerText", {
		set: function(s) {
			counts.innerText++;
			innerText.set.call(this, s);
		},
	});

	counts.innerHTML = 0;
	defProp(!isIE ? elemProto : htmlProto, "innerHTML", {
		set: function(s) {
			counts.innerHTML++;
			innerHTML.set.call(this, s);
		},
	});

	counts.className = 0;
	defProp(!isIE ? elemProto : htmlProto, "className", {
		set: function(s) {
			counts.className++;
			className.set.call(this, s);
		},
	});

	counts.cssText = 0;
	defProp(styleProto, "cssText", {
		set: function(s) {
			counts.cssText++;
			cssText.set.call(this, s);
		},
	});

	counts.id = 0;
	defProp(!isIE ? elemProto : htmlProto, "id", {
		set: function(s) {
			counts.id++;
			id.set.call(this, s);
		},
	});

	counts.checked = 0;
	defProp(inpProto, "checked", {
		set: function(s) {
			counts.checked++;
			inpChecked.set.call(this, s);
		},
	});

	counts.value = 0;
	defProp(inpProto, "value", {
		set: function(s) {
			counts.value++;
			inpVal.set.call(this, s);
		},
	});

	defProp(areaProto, "value", {
		set: function(s) {
			counts.value++;
			areaVal.set.call(this, s);
		},
	});

	defProp(selProto, "value", {
		set: function(s) {
			counts.value++;
			selVal.set.call(this, s);
		},
	});

	counts.selectedIndex = 0;
	defProp(selProto, "selectedIndex", {
		set: function(s) {
			counts.selectedIndex++;
			selIndex.set.call(this, s);
		},
	});

	counts.selected = 0;
	defProp(optProto, "selected", {
		set: function(s) {
			counts.selected++;
			optSel.set.call(this, s);
		},
	});

	/*
	counts.setProperty = 0;
	defProp(styleProto, "setProperty", {
		set: function(s) {
			counts.setProperty++;
			setProperty.set.call(this, s);
		},
	});
	*/

	function reset() {
		for (var i in counts)
			{ counts[i] = 0; }
	}

	this.start = function() {
		start = +new Date;
	};

	this.end = function() {
		var _time = +new Date - start;
		start = null;
/*
		for (var opName in origOps) {
			var p = ctxName(opName);
			p.ctx[p.last] = origOps[opName];
		}

		defProp(nodeProto, "textContent", textContent);
		defProp(nodeProto, "nodeValue", nodeValue);
		defProp(htmlProto, "innerText", innerText);
		defProp(!isIE ? elemProto : htmlProto, "innerHTML", innerHTML);
		defProp(!isIE ? elemProto : htmlProto, "className", className);
		defProp(!isIE ? elemProto : htmlProto, "id", id);
		defProp(inpProto,  "checked", inpChecked);
		defProp(inpProto,  "value", inpVal);
		defProp(areaProto, "value", areaVal);
		defProp(selProto,  "value", selVal);
		defProp(selProto,  "selectedIndex", selIndex);
		defProp(optProto,  "selected", optSel);
	//	defProp(styleProto, "setProperty", setProperty);
		defProp(styleProto, "cssText", cssText);
*/
		var out = {};

		for (var i in counts)
			{ if (counts[i] > 0)
				{ out[i] = counts[i]; } }

		reset();

		if (withTime)
			{ out._time = _time; }

		return out;
	};
}

var instr = null;

{
	if (DEVMODE.mutations) {
		instr = new DOMInstr(true);
	}
}

// view + key serve as the vm's unique identity
function ViewModel(view, data, key, opts) {
	var vm = this;

	vm.view = view;
	vm.data = data;
	vm.key = key;

	{
		if (isStream(data))
			{ vm._stream = hookStream2(data, vm); }
	}

	if (opts) {
		vm.opts = opts;
		vm.config(opts);
	}

	var out = isPlainObj(view) ? view : view.call(vm, vm, data, key, opts);

	if (isFunc(out))
		{ vm.render = out; }
	else {
		vm.render = out.render;
		vm.config(out);
	}

	// these must be wrapped here since they're debounced per view
	vm._redrawAsync = raft(function (_) { return vm.redraw(true); });
	vm._updateAsync = raft(function (newData) { return vm.update(newData, true); });

	vm.init && vm.init.call(vm, vm, vm.data, vm.key, opts);
}

var ViewModelProto = ViewModel.prototype = {
	constructor: ViewModel,

	_diff:	null,	// diff cache

	init:	null,
	view:	null,
	key:	null,
	data:	null,
	state:	null,
	api:	null,
	opts:	null,
	node:	null,
	hooks:	null,
	onevent: noop,
	refs:	null,
	render:	null,

	mount: mount,
	unmount: unmount,
	config: function(opts) {
		var t = this;

		if (opts.init)
			{ t.init = opts.init; }
		if (opts.diff)
			{ t.diff = opts.diff; }
		if (opts.onevent)
			{ t.onevent = opts.onevent; }

		// maybe invert assignment order?
		if (opts.hooks)
			{ t.hooks = assignObj(t.hooks || {}, opts.hooks); }

		{
			if (opts.onemit)
				{ t.onemit = assignObj(t.onemit || {}, opts.onemit); }
		}
	},
	parent: function() {
		return getVm(this.node.parent);
	},
	root: function() {
		var p = this.node;

		while (p.parent)
			{ p = p.parent; }

		return p.vm;
	},
	redraw: function(sync) {
		{
			if (DEVMODE.syncRedraw) {
				sync = true;
			}
		}
		var vm = this;
		sync ? vm._redraw(null, null, isHydrated(vm)) : vm._redrawAsync();
		return vm;
	},
	update: function(newData, sync) {
		{
			if (DEVMODE.syncRedraw) {
				sync = true;
			}
		}
		var vm = this;
		sync ? vm._update(newData, null, null, isHydrated(vm)) : vm._updateAsync(newData);
		return vm;
	},

	_update: updateSync,
	_redraw: redrawSync,
	_redrawAsync: null,
	_updateAsync: null,
};

function mount(el, isRoot) {
	var vm = this;

	{
		if (DEVMODE.mutations)
			{ instr.start(); }
	}

	if (isRoot) {
		clearChildren({el: el, flags: 0});

		vm._redraw(null, null, false);

		// if placeholder node doesnt match root tag
		if (el.nodeName.toLowerCase() !== vm.node.tag) {
			hydrate(vm.node);
			insertBefore(el.parentNode, vm.node.el, el);
			el.parentNode.removeChild(el);
		}
		else
			{ insertBefore(el.parentNode, hydrate(vm.node, el), el); }
	}
	else {
		vm._redraw(null, null);

		if (el)
			{ insertBefore(el, vm.node.el); }
	}

	if (el)
		{ drainDidHooks(vm); }

	{
		if (DEVMODE.mutations)
			{ console.log(instr.end()); }
	}

	return vm;
}

// asSub means this was called from a sub-routine, so don't drain did* hook queue
function unmount(asSub) {
	var vm = this;

	{
		if (isStream(vm._stream))
			{ unsubStream(vm._stream); }
	}

	var node = vm.node;
	var parEl = node.el.parentNode;

	// edge bug: this could also be willRemove promise-delayed; should .then() or something to make sure hooks fire in order
	removeChild(parEl, node.el);

	if (!asSub)
		{ drainDidHooks(vm); }
}

function reParent(vm, vold, newParent, newIdx) {
	if (newParent != null) {
		newParent.body[newIdx] = vold;
		vold.idx = newIdx;
		vold.parent = newParent;
		vold._lis = false;
	}
	return vm;
}

function redrawSync(newParent, newIdx, withDOM) {
	var isRedrawRoot = newParent == null;
	var vm = this;
	var isMounted = vm.node && vm.node.el && vm.node.el.parentNode;

	{
		// was mounted (has node and el), but el no longer has parent (unmounted)
		if (isRedrawRoot && vm.node && vm.node.el && !vm.node.el.parentNode)
			{ devNotify("UNMOUNTED_REDRAW", [vm]); }

		if (isRedrawRoot && DEVMODE.mutations && isMounted)
			{ instr.start(); }
	}

	var vold = vm.node, oldDiff, newDiff;

	if (vm.diff != null) {
		oldDiff = vm._diff;
		vm._diff = newDiff = vm.diff(vm, vm.data);

		if (vold != null) {
			var cmpFn = isArr(oldDiff) ? cmpArr : cmpObj;
			var isSame = oldDiff === newDiff || cmpFn(oldDiff, newDiff);

			if (isSame)
				{ return reParent(vm, vold, newParent, newIdx); }
		}
	}

	isMounted && fireHook(vm.hooks, "willRedraw", vm, vm.data);

	var vnew = vm.render.call(vm, vm, vm.data, oldDiff, newDiff);

	if (vnew === vold)
		{ return reParent(vm, vold, newParent, newIdx); }

	// todo: test result of willRedraw hooks before clearing refs
	vm.refs = null;

	// always assign vm key to root vnode (this is a de-opt)
	if (vm.key != null && vnew.key !== vm.key)
		{ vnew.key = vm.key; }

	vm.node = vnew;

	if (newParent) {
		preProc(vnew, newParent, newIdx, vm);
		newParent.body[newIdx] = vnew;
	}
	else if (vold && vold.parent) {
		preProc(vnew, vold.parent, vold.idx, vm);
		vold.parent.body[vold.idx] = vnew;
	}
	else
		{ preProc(vnew, null, null, vm); }

	if (withDOM !== false) {
		if (vold) {
			// root node replacement
			if (vold.tag !== vnew.tag || vold.key !== vnew.key) {
				// hack to prevent the replacement from triggering mount/unmount
				vold.vm = vnew.vm = null;

				var parEl = vold.el.parentNode;
				var refEl = nextSib(vold.el);
				removeChild(parEl, vold.el);
				insertBefore(parEl, hydrate(vnew), refEl);

				// another hack that allows any higher-level syncChildren to set
				// reconciliation bounds using a live node
				vold.el = vnew.el;

				// restore
				vnew.vm = vm;
			}
			else
				{ patch(vnew, vold); }
		}
		else
			{ hydrate(vnew); }
	}

	isMounted && fireHook(vm.hooks, "didRedraw", vm, vm.data);

	if (isRedrawRoot && isMounted)
		{ drainDidHooks(vm); }

	{
		if (isRedrawRoot && DEVMODE.mutations && isMounted)
			{ console.log(instr.end()); }
	}

	return vm;
}

// this also doubles as moveTo
// TODO? @withRedraw (prevent redraw from firing)
function updateSync(newData, newParent, newIdx, withDOM) {
	var vm = this;

	if (newData != null) {
		if (vm.data !== newData) {
			{
				devNotify("DATA_REPLACED", [vm, vm.data, newData]);
			}
			fireHook(vm.hooks, "willUpdate", vm, newData);
			vm.data = newData;

			{
				if (isStream(vm._stream))
					{ unsubStream(vm._stream); }
				if (isStream(newData))
					{ vm._stream = hookStream2(newData, vm); }
			}
		}
	}

	return vm._redraw(newParent, newIdx, withDOM);
}

function defineElement(tag, arg1, arg2, flags) {
	var attrs, body;

	if (arg2 == null) {
		if (isPlainObj(arg1))
			{ attrs = arg1; }
		else
			{ body = arg1; }
	}
	else {
		attrs = arg1;
		body = arg2;
	}

	return initElementNode(tag, attrs, body, flags);
}

//export const XML_NS = "http://www.w3.org/2000/xmlns/";
var SVG_NS = "http://www.w3.org/2000/svg";

function defineSvgElement(tag, arg1, arg2, flags) {
	var n = defineElement(tag, arg1, arg2, flags);
	n.ns = SVG_NS;
	return n;
}

function defineComment(body) {
	var node = new VNode;
	node.type = COMMENT;
	node.body = body;
	return node;
}

// placeholder for declared views
function VView(view, data, key, opts) {
	this.view = view;
	this.data = data;
	this.key = key;
	this.opts = opts;
}

VView.prototype = {
	constructor: VView,

	type: VVIEW,
	view: null,
	data: null,
	key: null,
	opts: null,
};

function defineView(view, data, key, opts) {
	return new VView(view, data, key, opts);
}

// placeholder for injected ViewModels
function VModel(vm) {
	this.vm = vm;
}

VModel.prototype = {
	constructor: VModel,

	type: VMODEL,
	vm: null,
};

function injectView(vm) {
//	if (vm.node == null)
//		vm._redraw(null, null, false);

//	return vm.node;

	return new VModel(vm);
}

function injectElement(el) {
	var node = new VNode;
	node.type = ELEMENT;
	node.el = node.key = el;
	return node;
}

function lazyList(items, cfg) {
	var len = items.length;

	var self = {
		items: items,
		length: len,
		// defaults to returning item identity (or position?)
		key: function(i) {
			return cfg.key(items[i], i);
		},
		// default returns 0?
		diff: function(i, donor) {
			var newVals = cfg.diff(items[i], i);
			if (donor == null)
				{ return newVals; }
			var oldVals = donor._diff;
			var same = newVals === oldVals || isArr(oldVals) ? cmpArr(newVals, oldVals) : cmpObj(newVals, oldVals);
			return same || newVals;
		},
		tpl: function(i) {
			return cfg.tpl(items[i], i);
		},
		map: function(tpl) {
			cfg.tpl = tpl;
			return self;
		},
		body: function(vnode) {
			var nbody = Array(len);

			for (var i = 0; i < len; i++) {
				var vnode2 = self.tpl(i);

			//	if ((vnode.flags & KEYED_LIST) === KEYED_LIST && self. != null)
			//		vnode2.key = getKey(item);

				vnode2._diff = self.diff(i);			// holds oldVals for cmp

				nbody[i] = vnode2;

				// run preproc pass (should this be just preProc in above loop?) bench
				preProc(vnode2, vnode, i);
			}

			// replace List with generated body
			vnode.body = nbody;
		}
	};

	return self;
}

var nano = {
	config: config,

	ViewModel: ViewModel,
	VNode: VNode,

	createView: createView,

	defineElement: defineElement,
	defineSvgElement: defineSvgElement,
	defineText: defineText,
	defineComment: defineComment,
	defineView: defineView,

	injectView: injectView,
	injectElement: injectElement,

	lazyList: lazyList,

	FIXED_BODY: FIXED_BODY,
	DEEP_REMOVE: DEEP_REMOVE,
	KEYED_LIST: KEYED_LIST,
	LAZY_LIST: LAZY_LIST,
};

function protoPatch(n, doRepaint) {
	patch$1(this, n, doRepaint);
}

// newNode can be either {class: style: } or full new VNode
// will/didPatch hooks?
function patch$1(o, n, doRepaint) {
	if (n.type != null) {
		// no full patching of view roots, just use redraw!
		if (o.vm != null)
			{ return; }

		preProc(n, o.parent, o.idx, null);
		o.parent.body[o.idx] = n;
		patch(n, o);
		doRepaint && repaint(n);
		drainDidHooks(getVm(n));
	}
	else {
		// TODO: re-establish refs

		// shallow-clone target
		var donor = Object.create(o);
		// fixate orig attrs
		donor.attrs = assignObj({}, o.attrs);
		// assign new attrs into live targ node
		var oattrs = assignObj(o.attrs, n);
		// prepend any fixed shorthand class
		if (o._class != null) {
			var aclass = oattrs.class;
			oattrs.class = aclass != null && aclass !== "" ? o._class + " " + aclass : o._class;
		}

		patchAttrs(o, donor);

		doRepaint && repaint(o);
	}
}

VNodeProto.patch = protoPatch;

function nextSubVms(n, accum) {
	var body = n.body;

	if (isArr(body)) {
		for (var i = 0; i < body.length; i++) {
			var n2 = body[i];

			if (n2.vm != null)
				{ accum.push(n2.vm); }
			else
				{ nextSubVms(n2, accum); }
		}
	}

	return accum;
}

function defineElementSpread(tag) {
	var args = arguments;
	var len = args.length;
	var body, attrs;

	if (len > 1) {
		var bodyIdx = 1;

		if (isPlainObj(args[1])) {
			attrs = args[1];
			bodyIdx = 2;
		}

		if (len === bodyIdx + 1 && (isVal(args[bodyIdx]) || isArr(args[bodyIdx]) || attrs && (attrs._flags & LAZY_LIST) === LAZY_LIST))
			{ body = args[bodyIdx]; }
		else
			{ body = sliceArgs(args, bodyIdx); }
	}

	return initElementNode(tag, attrs, body);
}

function defineSvgElementSpread() {
	var n = defineElementSpread.apply(null, arguments);
	n.ns = SVG_NS;
	return n;
}

ViewModelProto.emit = emit;
ViewModelProto.onemit = null;

ViewModelProto.body = function() {
	return nextSubVms(this.node, []);
};

nano.defineElementSpread = defineElementSpread;
nano.defineSvgElementSpread = defineSvgElementSpread;

ViewModelProto._stream = null;

function protoAttach(el) {
	var vm = this;
	if (vm.node == null)
		{ vm._redraw(null, null, false); }

	attach(vm.node, el);

	return vm;
}

// very similar to hydrate, TODO: dry
function attach(vnode, withEl) {
	vnode.el = withEl;
	withEl._node = vnode;

	var nattrs = vnode.attrs;

	for (var key in nattrs) {
		var nval = nattrs[key];
		var isDyn = isDynProp(vnode.tag, key);

		if (isStyleProp(key) || isSplProp(key)) {}
		else if (isEvProp(key))
			{ patchEvent(vnode, key, nval); }
		else if (nval != null && isDyn)
			{ setAttr(vnode, key, nval, isDyn); }
	}

	if ((vnode.flags & LAZY_LIST) === LAZY_LIST)
		{ vnode.body.body(vnode); }

	if (isArr(vnode.body) && vnode.body.length > 0) {
		var c = withEl.firstChild;
		var i = 0;
		var v = vnode.body[i];
		do {
			if (v.type === VVIEW)
				{ v = createView(v.view, v.data, v.key, v.opts)._redraw(vnode, i, false).node; }
			else if (v.type === VMODEL)
				{ v = v.node || v._redraw(vnode, i, false).node; }

			{
				if (vnode.tag === "table" && v.tag === "tr") {
					devNotify("ATTACH_IMPLICIT_TBODY", [vnode, v]);
				}
			}

			attach(v, c);
		} while ((c = c.nextSibling) && (v = vnode.body[++i]))
	}
}

function vmProtoHtml(dynProps) {
	var vm = this;

	if (vm.node == null)
		{ vm._redraw(null, null, false); }

	return html(vm.node, dynProps);
}

function vProtoHtml(dynProps) {
	return html(this, dynProps);
}

function camelDash(val) {
	return val.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

function styleStr(css) {
	var style = "";

	for (var pname in css) {
		if (css[pname] != null)
			{ style += camelDash(pname) + ": " + autoPx(pname, css[pname]) + '; '; }
	}

	return style;
}

function toStr(val) {
	return val == null ? '' : ''+val;
}

var voidTags = {
    area: true,
    base: true,
    br: true,
    col: true,
    command: true,
    embed: true,
    hr: true,
    img: true,
    input: true,
    keygen: true,
    link: true,
    meta: true,
    param: true,
    source: true,
    track: true,
	wbr: true
};

function escHtml(s) {
	s = toStr(s);

	for (var i = 0, out = ''; i < s.length; i++) {
		switch (s[i]) {
			case '&': out += '&amp;';  break;
			case '<': out += '&lt;';   break;
			case '>': out += '&gt;';   break;
		//	case '"': out += '&quot;'; break;
		//	case "'": out += '&#039;'; break;
		//	case '/': out += '&#x2f;'; break;
			default:  out += s[i];
		}
	}

	return out;
}

function escQuotes(s) {
	s = toStr(s);

	for (var i = 0, out = ''; i < s.length; i++)
		{ out += s[i] === '"' ? '&quot;' : s[i]; }		// also &?

	return out;
}

function eachHtml(arr, dynProps) {
	var buf = '';
	for (var i = 0; i < arr.length; i++)
		{ buf += html(arr[i], dynProps); }
	return buf;
}

var innerHTML = ".innerHTML";

function html(node, dynProps) {
	var out, style;

	switch (node.type) {
		case VVIEW:
			out = createView(node.view, node.data, node.key, node.opts).html(dynProps);
			break;
		case VMODEL:
			out = node.vm.html();
			break;
		case ELEMENT:
			if (node.el != null && node.tag == null) {
				out = node.el.outerHTML;		// pre-existing dom elements (does not currently account for any props applied to them)
				break;
			}

			var buf = "";

			buf += "<" + node.tag;

			var attrs = node.attrs,
				hasAttrs = attrs != null;

			if (hasAttrs) {
				for (var pname in attrs) {
					if (isEvProp(pname) || pname[0] === "." || pname[0] === "_" || dynProps === false && isDynProp(node.tag, pname))
						{ continue; }

					var val = attrs[pname];

					if (pname === "style" && val != null) {
						style = typeof val === "object" ? styleStr(val) : val;
						continue;
					}

					if (val === true)
						{ buf += " " + escHtml(pname) + '=""'; }
					else if (val === false) {}
					else if (val != null)
						{ buf += " " + escHtml(pname) + '="' + escQuotes(val) + '"'; }
				}

				if (style != null)
					{ buf += ' style="' + escQuotes(style.trim()) + '"'; }
			}

			// if body-less svg node, auto-close & return
			if (node.body == null && node.ns != null && node.tag !== "svg")
				{ return buf + "/>"; }
			else
				{ buf += ">"; }

			if (!voidTags[node.tag]) {
				if (hasAttrs && attrs[innerHTML] != null)
					{ buf += attrs[innerHTML]; }
				else if (isArr(node.body))
					{ buf += eachHtml(node.body, dynProps); }
				else if ((node.flags & LAZY_LIST) === LAZY_LIST) {
					node.body.body(node);
					buf += eachHtml(node.body, dynProps);
				}
				else
					{ buf += escHtml(node.body); }

				buf += "</" + node.tag + ">";
			}
			out = buf;
			break;
		case TEXT:
			out = escHtml(node.body);
			break;
		case COMMENT:
			out = "<!--" + escHtml(node.body) + "-->";
			break;
	}

	return out;
}

ViewModelProto.attach = protoAttach;

ViewModelProto.html = vmProtoHtml;
VNodeProto.html = vProtoHtml;

nano.DEVMODE = DEVMODE;

return nano;

})));
//# sourceMappingURL=domvm.dev.js.map


/***/ }),

/***/ "../node_modules/process/browser.js":
/*!******************************************!*\
  !*** ../node_modules/process/browser.js ***!
  \******************************************/
/*! no static exports found */
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


/***/ }),

/***/ "../node_modules/promiz/promiz.js":
/*!****************************************!*\
  !*** ../node_modules/promiz/promiz.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, setImmediate) {(function () {
  global = this

  var queueId = 1
  var queue = {}
  var isRunningTask = false

  if (!global.setImmediate)
    global.addEventListener('message', function (e) {
      if (e.source == global){
        if (isRunningTask)
          nextTick(queue[e.data])
        else {
          isRunningTask = true
          try {
            queue[e.data]()
          } catch (e) {}

          delete queue[e.data]
          isRunningTask = false
        }
      }
    })

  function nextTick(fn) {
    if (global.setImmediate) setImmediate(fn)
    // if inside of web worker
    else if (global.importScripts) setTimeout(fn)
    else {
      queueId++
      queue[queueId] = fn
      global.postMessage(queueId, '*')
    }
  }

  Deferred.resolve = function (value) {
    if (!(this._d == 1))
      throw TypeError()

    if (value instanceof Deferred)
      return value

    return new Deferred(function (resolve) {
        resolve(value)
    })
  }

  Deferred.reject = function (value) {
    if (!(this._d == 1))
      throw TypeError()

    return new Deferred(function (resolve, reject) {
        reject(value)
    })
  }

  Deferred.all = function (arr) {
    if (!(this._d == 1))
      throw TypeError()

    if (!(arr instanceof Array))
      return Deferred.reject(TypeError())

    var d = new Deferred()

    function done(e, v) {
      if (v)
        return d.resolve(v)

      if (e)
        return d.reject(e)

      var unresolved = arr.reduce(function (cnt, v) {
        if (v && v.then)
          return cnt + 1
        return cnt
      }, 0)

      if(unresolved == 0)
        d.resolve(arr)

      arr.map(function (v, i) {
        if (v && v.then)
          v.then(function (r) {
            arr[i] = r
            done()
            return r
          }, done)
      })
    }

    done()

    return d
  }

  Deferred.race = function (arr) {
    if (!(this._d == 1))
      throw TypeError()

    if (!(arr instanceof Array))
      return Deferred.reject(TypeError())

    if (arr.length == 0)
      return new Deferred()

    var d = new Deferred()

    function done(e, v) {
      if (v)
        return d.resolve(v)

      if (e)
        return d.reject(e)

      var unresolved = arr.reduce(function (cnt, v) {
        if (v && v.then)
          return cnt + 1
        return cnt
      }, 0)

      if(unresolved == 0)
        d.resolve(arr)

      arr.map(function (v, i) {
        if (v && v.then)
          v.then(function (r) {
            done(null, r)
          }, done)
      })
    }

    done()

    return d
  }

  Deferred._d = 1


  /**
   * @constructor
   */
  function Deferred(resolver) {
    'use strict'
    if (typeof resolver != 'function' && resolver != undefined)
      throw TypeError()

    if (typeof this != 'object' || (this && this.then))
      throw TypeError()

    // states
    // 0: pending
    // 1: resolving
    // 2: rejecting
    // 3: resolved
    // 4: rejected
    var self = this,
      state = 0,
      val = 0,
      next = [],
      fn, er;

    self['promise'] = self

    self['resolve'] = function (v) {
      fn = self.fn
      er = self.er
      if (!state) {
        val = v
        state = 1

        nextTick(fire)
      }
      return self
    }

    self['reject'] = function (v) {
      fn = self.fn
      er = self.er
      if (!state) {
        val = v
        state = 2

        nextTick(fire)

      }
      return self
    }

    self['_d'] = 1

    self['then'] = function (_fn, _er) {
      if (!(this._d == 1))
        throw TypeError()

      var d = new Deferred()

      d.fn = _fn
      d.er = _er
      if (state == 3) {
        d.resolve(val)
      }
      else if (state == 4) {
        d.reject(val)
      }
      else {
        next.push(d)
      }

      return d
    }

    self['catch'] = function (_er) {
      return self['then'](null, _er)
    }

    var finish = function (type) {
      state = type || 4
      next.map(function (p) {
        state == 3 && p.resolve(val) || p.reject(val)
      })
    }

    try {
      if (typeof resolver == 'function')
        resolver(self['resolve'], self['reject'])
    } catch (e) {
      self['reject'](e)
    }

    return self

    // ref : reference to 'then' function
    // cb, ec, cn : successCallback, failureCallback, notThennableCallback
    function thennable (ref, cb, ec, cn) {
      // Promises can be rejected with other promises, which should pass through
      if (state == 2) {
        return cn()
      }
      if ((typeof val == 'object' || typeof val == 'function') && typeof ref == 'function') {
        try {

          // cnt protects against abuse calls from spec checker
          var cnt = 0
          ref.call(val, function (v) {
            if (cnt++) return
            val = v
            cb()
          }, function (v) {
            if (cnt++) return
            val = v
            ec()
          })
        } catch (e) {
          val = e
          ec()
        }
      } else {
        cn()
      }
    };

    function fire() {

      // check if it's a thenable
      var ref;
      try {
        ref = val && val.then
      } catch (e) {
        val = e
        state = 2
        return fire()
      }

      thennable(ref, function () {
        state = 1
        fire()
      }, function () {
        state = 2
        fire()
      }, function () {
        try {
          if (state == 1 && typeof fn == 'function') {
            val = fn(val)
          }

          else if (state == 2 && typeof er == 'function') {
            val = er(val)
            state = 1
          }
        } catch (e) {
          val = e
          return finish()
        }

        if (val == self) {
          val = TypeError()
          finish()
        } else thennable(ref, function () {
            finish(3)
          }, finish, function () {
            finish(state == 1 && 3)
          })

      })
    }


  }

  // Export our library object, either for node.js or as a globally scoped variable
  if (true) {
    module['exports'] = Deferred
  } else {}
})()

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "../node_modules/webpack/buildin/global.js"), __webpack_require__(/*! ./../timers-browserify/main.js */ "../node_modules/timers-browserify/main.js").setImmediate))

/***/ }),

/***/ "../node_modules/setimmediate/setImmediate.js":
/*!****************************************************!*\
  !*** ../node_modules/setimmediate/setImmediate.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "../node_modules/webpack/buildin/global.js"), __webpack_require__(/*! ./../process/browser.js */ "../node_modules/process/browser.js")))

/***/ }),

/***/ "../node_modules/timers-browserify/main.js":
/*!*************************************************!*\
  !*** ../node_modules/timers-browserify/main.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var scope = (typeof global !== "undefined" && global) ||
            (typeof self !== "undefined" && self) ||
            window;
var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, scope, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, scope, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(scope, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(/*! setimmediate */ "../node_modules/setimmediate/setImmediate.js");
// On some exotic environments, it's not clear which object `setimmediate` was
// able to install onto.  Search each possibility in the same order as the
// `setimmediate` library.
exports.setImmediate = (typeof self !== "undefined" && self.setImmediate) ||
                       (typeof global !== "undefined" && global.setImmediate) ||
                       (this && this.setImmediate);
exports.clearImmediate = (typeof self !== "undefined" && self.clearImmediate) ||
                         (typeof global !== "undefined" && global.clearImmediate) ||
                         (this && this.clearImmediate);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "../node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "../node_modules/webpack/buildin/global.js":
/*!*************************************************!*\
  !*** ../node_modules/webpack/buildin/global.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "../styles/toolbar.scss":
/*!******************************!*\
  !*** ../styles/toolbar.scss ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "../ts-common/Keymanager.ts":
/*!**********************************!*\
  !*** ../ts-common/Keymanager.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function getHotKeyCode(code) {
    var matches = code.toLowerCase().match(/\w+/g);
    var comp = 0;
    var key = "";
    for (var i = 0; i < matches.length; i++) {
        var check = matches[i];
        if (check === "ctrl") {
            comp += 4;
        }
        else if (check === "shift") {
            comp += 2;
        }
        else if (check === "alt") {
            comp += 1;
        }
        else {
            key = check;
        }
    }
    return comp + key;
}
var KeyManager = /** @class */ (function () {
    function KeyManager() {
        var _this = this;
        this._keysStorage = {};
        document.addEventListener("keydown", function (e) {
            var comp = (e.ctrlKey || e.metaKey ? 4 : 0) + (e.shiftKey ? 2 : 0) + (e.altKey ? 1 : 0);
            var key;
            if ((e.which >= 48 && e.which <= 57) || (e.which >= 65 && e.which <= 90)) { // A-Z 0-9
                key = String.fromCharCode(e.which);
            }
            else {
                key = e.key;
            }
            var code = comp + (key && key.toLowerCase());
            var actions = _this._keysStorage[code];
            if (actions) {
                for (var i = 0; i < actions.length; i++) {
                    actions[i].handler(e);
                }
            }
        });
    }
    KeyManager.prototype.addHotKey = function (key, handler, scope) {
        var code = getHotKeyCode(key);
        if (!this._keysStorage[code]) {
            this._keysStorage[code] = [];
        }
        this._keysStorage[code].push({
            handler: handler,
            scope: scope
        });
    };
    KeyManager.prototype.removeHotKey = function (key, scope) {
        var keyStorage = this._keysStorage;
        if (key) {
            var code = getHotKeyCode(key);
            delete keyStorage[code];
        }
        if (scope) {
            for (var code in keyStorage) {
                var toDelete = []; // items index to delete
                for (var i = 0; i < keyStorage[code].length; i++) {
                    if (keyStorage[code][i].scope === scope) {
                        toDelete.push(i);
                    }
                }
                if (keyStorage[code].length === toDelete.length) {
                    delete keyStorage[code];
                }
                else {
                    for (var i = toDelete.length - 1; i >= 0; i--) { // begin from last coz splice change other index
                        keyStorage[code].splice(toDelete[i], 1);
                    }
                }
            }
        }
    };
    KeyManager.prototype.exist = function (key) {
        var code = getHotKeyCode(key);
        return !!this._keysStorage[code];
    };
    return KeyManager;
}());
exports.keyManager = new KeyManager();
function addHotkeys(handlers, beforeCall) {
    var context = new Date();
    var wrapHandler = function (handler) { return function (e) {
        if (beforeCall && beforeCall() === false) {
            return;
        }
        handler(e);
    }; };
    for (var key in handlers) {
        exports.keyManager.addHotKey(key, wrapHandler(handlers[key]), context);
    }
    return function () { return exports.keyManager.removeHotKey(undefined, context); };
}
exports.addHotkeys = addHotkeys;


/***/ }),

/***/ "../ts-common/core.ts":
/*!****************************!*\
  !*** ../ts-common/core.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var html_1 = __webpack_require__(/*! ./html */ "../ts-common/html.ts");
var counter = (new Date()).valueOf();
function uid() {
    return "u" + (counter++);
}
exports.uid = uid;
function extend(target, source, deep) {
    if (deep === void 0) { deep = true; }
    if (source) {
        for (var key in source) {
            var sobj = source[key];
            var tobj = target[key];
            if (deep && typeof tobj === "object" && !(tobj instanceof Date) && !(tobj instanceof Array)) {
                extend(tobj, sobj);
            }
            else {
                target[key] = sobj;
            }
        }
    }
    return target;
}
exports.extend = extend;
function copy(source, withoutInner) {
    var result = {};
    for (var key in source) {
        if (!withoutInner || key[0] !== "$") {
            result[key] = source[key];
        }
    }
    return result;
}
exports.copy = copy;
function naturalSort(arr) {
    return arr.sort(function (a, b) {
        var nn = typeof a === "string" ? a.localeCompare(b) : a - b;
        return nn;
    });
}
exports.naturalSort = naturalSort;
function findIndex(arr, predicate) {
    var len = arr.length;
    for (var i = 0; i < len; i++) {
        if (predicate(arr[i])) {
            return i;
        }
    }
    return -1;
}
exports.findIndex = findIndex;
function isEqualString(from, to) {
    if (from.length > to.length) {
        return false;
    }
    for (var i = 0; i < from.length; i++) {
        if (from[i].toLowerCase() !== to[i].toLowerCase()) {
            return false;
        }
    }
    return true;
}
exports.isEqualString = isEqualString;
function singleOuterClick(fn) {
    var click = function (e) {
        if (fn(e)) {
            document.removeEventListener("click", click);
        }
    };
    document.addEventListener("click", click);
}
exports.singleOuterClick = singleOuterClick;
function detectWidgetClick(widgetId, cb) {
    var click = function (e) { return cb(html_1.locate(e, "dhx_widget_id") === widgetId); };
    document.addEventListener("click", click);
    return function () { return document.removeEventListener("click", click); };
}
exports.detectWidgetClick = detectWidgetClick;
function unwrapBox(box) {
    if (Array.isArray(box)) {
        return box[0];
    }
    return box;
}
exports.unwrapBox = unwrapBox;
function wrapBox(unboxed) {
    if (Array.isArray(unboxed)) {
        return unboxed;
    }
    return [unboxed];
}
exports.wrapBox = wrapBox;
function isDefined(some) {
    return some !== null && some !== undefined;
}
exports.isDefined = isDefined;
function range(from, to) {
    if (from > to) {
        return [];
    }
    var result = [];
    while (from <= to) {
        result.push(from++);
    }
    return result;
}
exports.range = range;
function isNumeric(val) {
    return !isNaN(val - parseFloat(val));
}
exports.isNumeric = isNumeric;
function downloadFile(data, filename, mimeType) {
    if (mimeType === void 0) { mimeType = "text/plain"; }
    var file = new Blob([data], { type: mimeType });
    if (window.navigator.msSaveOrOpenBlob) {
        // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    }
    else {
        var a_1 = document.createElement("a");
        var url_1 = URL.createObjectURL(file);
        a_1.href = url_1;
        a_1.download = filename;
        document.body.appendChild(a_1);
        a_1.click();
        setTimeout(function () {
            document.body.removeChild(a_1);
            window.URL.revokeObjectURL(url_1);
        }, 0);
    }
}
exports.downloadFile = downloadFile;


/***/ }),

/***/ "../ts-common/dom.ts":
/*!***************************!*\
  !*** ../ts-common/dom.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Promise) {
Object.defineProperty(exports, "__esModule", { value: true });
var dom = __webpack_require__(/*! domvm/dist/dev/domvm.dev.js */ "../node_modules/domvm/dist/dev/domvm.dev.js");
exports.el = dom.defineElement;
exports.sv = dom.defineSvgElement;
exports.view = dom.defineView;
exports.create = dom.createView;
exports.inject = dom.injectView;
exports.KEYED_LIST = dom.KEYED_LIST;
var svgTagName = ["a", "animate", "animateMotion", "animateTransform", "circle", "clipPath", "color-profile", "defs", "desc", "discard", "ellipse", "feBlend", "feColorMatrix",
    "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR",
    "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence", "filter", "foreignObject", "g",
    "hatch", "hatchpath", "image", "line", "linearGradient", "marker", "mask", "mesh", "meshgradient", "meshpatch", "meshrow", "metadata", "mpath", "path", "pattern", "polygon", "polyline",
    "radialGradient", "rect", "script", "set", "solidcolor", "stop", "style", "svg", "switch", "symbol", "text", "textPath", "title", "tspan", "unknown", "use", "view"];
function disableHelp() {
    dom.DEVMODE.mutations = false;
    dom.DEVMODE.warnings = false;
    dom.DEVMODE.verbose = false;
    dom.DEVMODE.UNKEYED_INPUT = false;
}
exports.disableHelp = disableHelp;
function resizer(handler) {
    var resize = window.ResizeObserver;
    var activeHandler = function (node) {
        var height = node.el.offsetHeight;
        var width = node.el.offsetWidth;
        handler(width, height);
    };
    if (resize) {
        return exports.el("div.dhx-resize-observer", {
            _hooks: {
                didInsert: function (node) {
                    new resize(function () { return activeHandler(node); }).observe(node.el);
                }
            }
        });
    }
    return exports.el("iframe.dhx-resize-observer", {
        _hooks: {
            didInsert: function (node) {
                node.el.contentWindow.onresize = function () { return activeHandler(node); };
                activeHandler(node);
            }
        }
    });
}
exports.resizer = resizer;
function xmlToJson(xml) {
    var obj = {};
    if (xml.nodeType === 1) {
        if (xml.attributes.length > 0) {
            obj["@attributes"] = {};
            for (var j = 0; j < xml.attributes.length; j++) {
                var attribute = xml.attributes.item(j);
                obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
            }
        }
    }
    else if (xml.nodeType === 3) {
        obj = xml.nodeValue;
    }
    if (xml.hasChildNodes()) {
        for (var i = 0; i < xml.childNodes.length; i++) {
            var item = xml.childNodes.item(i);
            var nodeName = item.nodeName;
            if (typeof (obj[nodeName]) === "undefined") {
                obj[nodeName] = xmlToJson(item);
            }
            else {
                if (typeof (obj[nodeName].push) === "undefined") {
                    var old = obj[nodeName];
                    obj[nodeName] = [];
                    obj[nodeName].push(old);
                }
                obj[nodeName].push(xmlToJson(item));
            }
        }
    }
    return obj;
}
exports.xmlToJson = xmlToJson;
function jsonToVDOM(json) {
    var _a, _b;
    var tag = Object.keys(json)[0];
    var element = json[tag];
    var children = element["#text"] ? [element["#text"]] : [];
    for (var child in element) {
        if (element.hasOwnProperty(child) && child !== "@attributes" && child !== "#text") {
            if (Array.isArray(element[child])) {
                for (var t in element[child]) {
                    if (element[child].hasOwnProperty(t)) {
                        children.push(jsonToVDOM((_a = {}, _a[child] = element[child][t], _a)));
                    }
                }
            }
            else {
                children.push(jsonToVDOM((_b = {}, _b[child] = element[child], _b)));
            }
        }
    }
    if (svgTagName.indexOf(tag) !== -1) {
        return exports.sv(tag, element["@attributes"] ? element["@attributes"] : {}, children);
    }
    else {
        return exports.el(tag, element["@attributes"] ? element["@attributes"] : {}, children);
    }
}
exports.jsonToVDOM = jsonToVDOM;
function awaitRedraw() {
    return new Promise(function (res) {
        requestAnimationFrame(function () {
            res();
        });
    });
}
exports.awaitRedraw = awaitRedraw;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! promiz */ "../node_modules/promiz/promiz.js")))

/***/ }),

/***/ "../ts-common/events.ts":
/*!******************************!*\
  !*** ../ts-common/events.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var EventSystem = /** @class */ (function () {
    function EventSystem(context) {
        this.events = {};
        this.context = context || this;
    }
    EventSystem.prototype.on = function (name, callback, context) {
        var event = name.toLowerCase();
        this.events[event] = this.events[event] || [];
        this.events[event].push({ callback: callback, context: context || this.context });
    };
    EventSystem.prototype.detach = function (name, context) {
        var event = name.toLowerCase();
        var eStack = this.events[event];
        if (context && eStack && eStack.length) {
            for (var i = eStack.length - 1; i >= 0; i--) {
                if (eStack[i].context === context) {
                    eStack.splice(i, 1);
                }
            }
        }
        else {
            this.events[event] = [];
        }
    };
    EventSystem.prototype.fire = function (name, args) {
        if (typeof args === "undefined") {
            args = [];
        }
        var event = name.toLowerCase();
        if (this.events[event]) {
            var res = this.events[event].map(function (e) { return e.callback.apply(e.context, args); });
            return res.indexOf(false) < 0;
        }
        return true;
    };
    EventSystem.prototype.clear = function () {
        this.events = {};
    };
    return EventSystem;
}());
exports.EventSystem = EventSystem;
function EventsMixin(obj) {
    obj = obj || {};
    var eventSystem = new EventSystem(obj);
    obj.detachEvent = eventSystem.detach.bind(eventSystem);
    obj.attachEvent = eventSystem.on.bind(eventSystem);
    obj.callEvent = eventSystem.fire.bind(eventSystem);
}
exports.EventsMixin = EventsMixin;


/***/ }),

/***/ "../ts-common/html.ts":
/*!****************************!*\
  !*** ../ts-common/html.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(/*! ./polyfills/matches */ "../ts-common/polyfills/matches.ts");
function toNode(node) {
    if (typeof node === "string") {
        node = (document.getElementById(node) || document.querySelector(node));
    }
    return node || document.body;
}
exports.toNode = toNode;
function eventHandler(prepare, hash) {
    var keys = Object.keys(hash);
    return function (ev) {
        var data = prepare(ev);
        var node = ev.target;
        while (node) {
            var cssstring = node.getAttribute ? (node.getAttribute("class") || "") : "";
            if (cssstring.length) {
                var css = cssstring.split(" ");
                for (var j = 0; j < keys.length; j++) {
                    if (css.indexOf(keys[j]) > -1) {
                        return hash[keys[j]](ev, data);
                    }
                }
            }
            node = node.parentNode;
        }
        return true;
    };
}
exports.eventHandler = eventHandler;
function locate(target, attr) {
    if (attr === void 0) { attr = "dhx_id"; }
    var node = locateNode(target, attr);
    return node ? node.getAttribute(attr) : "";
}
exports.locate = locate;
function locateNode(target, attr) {
    if (attr === void 0) { attr = "dhx_id"; }
    if (target instanceof Event) {
        target = target.target;
    }
    while (target) {
        if (target.getAttribute && target.getAttribute(attr)) {
            return target;
        }
        target = target.parentNode;
    }
}
exports.locateNode = locateNode;
function getBox(elem) {
    var box = elem.getBoundingClientRect();
    var body = document.body;
    var scrollTop = window.pageYOffset || body.scrollTop;
    var scrollLeft = window.pageXOffset || body.scrollLeft;
    var top = box.top + scrollTop;
    var left = box.left + scrollLeft;
    var right = body.offsetWidth - box.right;
    var bottom = body.offsetHeight - box.bottom;
    var width = box.right - box.left;
    var height = box.bottom - box.top;
    return { top: top, left: left, right: right, bottom: bottom, width: width, height: height };
}
exports.getBox = getBox;
var scrollWidth = -1;
function getScrollbarWidth() {
    if (scrollWidth > -1) {
        return scrollWidth;
    }
    var scrollDiv = document.createElement("div");
    document.body.appendChild(scrollDiv);
    scrollDiv.style.cssText = "position: absolute;left: -99999px;overflow:scroll;width: 100px;height: 100px;";
    scrollWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
    document.body.removeChild(scrollDiv);
    return scrollWidth;
}
exports.getScrollbarWidth = getScrollbarWidth;
function fitPosition(node, config) {
    return calculatePosition(getRealPosition(node), config);
}
exports.fitPosition = fitPosition;
function isIE() {
    var ua = window.navigator.userAgent;
    return ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;
}
exports.isIE = isIE;
function getRealPosition(node) {
    var rects = node.getBoundingClientRect();
    return {
        left: rects.left + window.pageXOffset,
        right: rects.right + window.pageXOffset,
        top: rects.top + window.pageYOffset,
        bottom: rects.bottom + window.pageYOffset
    };
}
exports.getRealPosition = getRealPosition;
var Position;
(function (Position) {
    Position["left"] = "left";
    Position["right"] = "right";
    Position["bottom"] = "bottom";
    Position["top"] = "top";
})(Position = exports.Position || (exports.Position = {}));
function calculatePosition(pos, config) {
    var _a = config.mode === Position.bottom || config.mode === Position.top
        ? placeBottomOrTop(pos, config)
        : placeRightOrLeft(pos, config), left = _a.left, top = _a.top;
    return {
        left: Math.round(left) + "px",
        top: Math.round(top) + "px",
        minWidth: Math.round(config.width) + "px",
        position: "absolute"
    };
}
exports.calculatePosition = calculatePosition;
function getWindowBorders() {
    return {
        rightBorder: window.pageXOffset + window.innerWidth,
        bottomBorder: window.pageYOffset + window.innerHeight
    };
}
function horizontalCentering(pos, width, rightBorder) {
    var nodeWidth = pos.right - pos.left;
    var diff = (width - nodeWidth) / 2;
    var left = pos.left - diff;
    var right = pos.right + diff;
    if (left >= 0 && right <= rightBorder) {
        return left;
    }
    if (left < 0) {
        return 0;
    }
    return rightBorder - width;
}
function verticalCentering(pos, height, bottomBorder) {
    var nodeHeight = pos.bottom - pos.top;
    var diff = (height - nodeHeight) / 2;
    var top = pos.top - diff;
    var bottom = pos.bottom + diff;
    if (top >= 0 && bottom <= bottomBorder) {
        return top;
    }
    if (top < 0) {
        return 0;
    }
    return bottomBorder - height;
}
function placeBottomOrTop(pos, config) {
    var _a = getWindowBorders(), rightBorder = _a.rightBorder, bottomBorder = _a.bottomBorder;
    var left;
    var top;
    var bottomDiff = bottomBorder - pos.bottom - config.height;
    var topDiff = pos.top - config.height;
    if (config.mode === Position.bottom) {
        if (bottomDiff >= 0) {
            top = pos.bottom;
        }
        else if (topDiff >= 0) {
            top = topDiff;
        }
    }
    else {
        if (topDiff >= 0) {
            top = topDiff;
        }
        else if (bottomDiff >= 0) {
            top = pos.bottom;
        }
    }
    if (bottomDiff < 0 && topDiff < 0) {
        if (config.auto) {
            return placeRightOrLeft(pos, __assign({}, config, { mode: Position.right, auto: false }));
        }
        top = bottomDiff > topDiff ? pos.bottom : topDiff;
    }
    if (config.centering) {
        left = horizontalCentering(pos, config.width, rightBorder);
    }
    else {
        var leftDiff = rightBorder - pos.left - config.width;
        var rightDiff = pos.right - config.width;
        if (leftDiff >= 0) {
            left = pos.left;
        }
        else if (rightDiff >= 0) {
            left = rightDiff;
        }
        else {
            left = rightDiff > leftDiff ? pos.left : rightDiff;
        }
    }
    return { left: left, top: top };
}
function placeRightOrLeft(pos, config) {
    var _a = getWindowBorders(), rightBorder = _a.rightBorder, bottomBorder = _a.bottomBorder;
    var left;
    var top;
    var rightDiff = rightBorder - pos.right - config.width;
    var leftDiff = pos.left - config.width;
    if (config.mode === Position.right) {
        if (rightDiff >= 0) {
            left = pos.right;
        }
        else if (leftDiff >= 0) {
            left = leftDiff;
        }
    }
    else {
        if (leftDiff >= 0) {
            left = leftDiff;
        }
        else if (rightDiff >= 0) {
            left = pos.right;
        }
    }
    if (leftDiff < 0 && rightDiff < 0) {
        if (config.auto) {
            return placeBottomOrTop(pos, __assign({}, config, { mode: Position.bottom, auto: false }));
        }
        left = leftDiff > rightDiff ? leftDiff : pos.right;
    }
    if (config.centering) {
        top = verticalCentering(pos, config.height, rightBorder);
    }
    else {
        var bottomDiff = pos.bottom - config.height;
        var topDiff = bottomBorder - pos.top - config.height;
        if (topDiff >= 0) {
            top = pos.top;
        }
        else if (bottomDiff > 0) {
            top = bottomDiff;
        }
        else {
            top = bottomDiff > topDiff ? bottomDiff : pos.top;
        }
    }
    return { left: left, top: top };
}


/***/ }),

/***/ "../ts-common/polyfills/matches.ts":
/*!*****************************************!*\
  !*** ../ts-common/polyfills/matches.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

if (Element && !Element.prototype.matches) {
    var proto = Element.prototype;
    proto.matches = proto.matchesSelector ||
        proto.mozMatchesSelector || proto.msMatchesSelector ||
        proto.oMatchesSelector || proto.webkitMatchesSelector;
}


/***/ }),

/***/ "../ts-common/types.ts":
/*!*****************************!*\
  !*** ../ts-common/types.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var SelectionEvents;
(function (SelectionEvents) {
    SelectionEvents["beforeUnSelect"] = "beforeunselect";
    SelectionEvents["afterUnSelect"] = "afterunselect";
    SelectionEvents["beforeSelect"] = "beforeselect";
    SelectionEvents["afterSelect"] = "afterselect";
})(SelectionEvents = exports.SelectionEvents || (exports.SelectionEvents = {}));


/***/ }),

/***/ "../ts-common/view.ts":
/*!****************************!*\
  !*** ../ts-common/view.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! ./core */ "../ts-common/core.ts");
var html_1 = __webpack_require__(/*! ./html */ "../ts-common/html.ts");
var View = /** @class */ (function () {
    function View(_container, config) {
        this._uid = core_1.uid();
        this.config = config || {};
    }
    View.prototype.mount = function (container, vnode) {
        if (vnode) {
            this._view = vnode;
        }
        if (container && this._view && this._view.mount) {
            // init view inside of HTML container
            this._container = html_1.toNode(container);
            if (this._container.tagName) {
                this._view.mount(this._container);
            }
            else if (this._container.attach) {
                this._container.attach(this);
            }
        }
    };
    View.prototype.unmount = function () {
        var rootView = this.getRootView();
        if (rootView && rootView.node) {
            rootView.unmount();
            this._view = null;
        }
    };
    View.prototype.getRootView = function () {
        return this._view;
    };
    View.prototype.getRootNode = function () {
        return this._view && this._view.node && this._view.node.el;
    };
    View.prototype.paint = function () {
        if (this._view && ( // was mounted
        this._view.node || // already rendered node
            this._container)) { // not rendered, but has container
            this._doNotRepaint = false;
            this._view.redraw();
        }
    };
    return View;
}());
exports.View = View;
function toViewLike(view) {
    return {
        getRootView: function () { return view; },
        paint: function () { return view.node && view.redraw(); },
        mount: function (container) { return view.mount(container); }
    };
}
exports.toViewLike = toViewLike;


/***/ }),

/***/ "../ts-data/index.ts":
/*!***************************!*\
  !*** ../ts-data/index.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(/*! ./sources/types */ "../ts-data/sources/types.ts"));
__export(__webpack_require__(/*! ./sources/datacollection */ "../ts-data/sources/datacollection.ts"));
__export(__webpack_require__(/*! ./sources/treecollection */ "../ts-data/sources/treecollection.ts"));
__export(__webpack_require__(/*! ./sources/DragManager */ "../ts-data/sources/DragManager.ts"));
__export(__webpack_require__(/*! ./sources/dataproxy */ "../ts-data/sources/dataproxy.ts"));
__export(__webpack_require__(/*! ./sources/helpers */ "../ts-data/sources/helpers.ts"));
__export(__webpack_require__(/*! ./sources/drivers/CsvDriver */ "../ts-data/sources/drivers/CsvDriver.ts"));
__export(__webpack_require__(/*! ./sources/drivers/JsonDriver */ "../ts-data/sources/drivers/JsonDriver.ts"));
__export(__webpack_require__(/*! ./sources/selection */ "../ts-data/sources/selection.ts"));
__export(__webpack_require__(/*! ./sources/drivers/drivers */ "../ts-data/sources/drivers/drivers.ts"));


/***/ }),

/***/ "../ts-data/sources/CollectionStore.ts":
/*!*********************************************!*\
  !*** ../ts-data/sources/CollectionStore.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var CollectionStore = /** @class */ (function () {
    function CollectionStore() {
        this._store = {};
    }
    CollectionStore.prototype.setItem = function (id, target) {
        this._store[id] = target;
    };
    CollectionStore.prototype.getItem = function (id) {
        if (!this._store[id]) {
            return null;
        }
        return this._store[id];
    };
    return CollectionStore;
}());
var dhx = window.dhxHelpers = window.dhxHelpers || {};
dhx.collectionStore = dhx.collectionStore || new CollectionStore();
exports.collectionStore = dhx.collectionStore;


/***/ }),

/***/ "../ts-data/sources/DragManager.ts":
/*!*****************************************!*\
  !*** ../ts-data/sources/DragManager.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var html_1 = __webpack_require__(/*! @dhx/ts-common/html */ "../ts-common/html.ts");
var CollectionStore_1 = __webpack_require__(/*! ./CollectionStore */ "../ts-data/sources/CollectionStore.ts");
var types_1 = __webpack_require__(/*! ./types */ "../ts-data/sources/types.ts");
var helpers_1 = __webpack_require__(/*! ./helpers */ "../ts-data/sources/helpers.ts");
function getPosition(e) {
    var y = e.clientY;
    var element = html_1.locateNode(e);
    if (!element) {
        return null;
    }
    var treeLine = element.childNodes[0];
    var _a = treeLine.getBoundingClientRect(), top = _a.top, height = _a.height;
    return (y - top) / height;
}
function dragEventContent(element, elements) {
    var rect = element.getBoundingClientRect();
    var ghost = document.createElement("div");
    var clone = element.cloneNode(true);
    clone.style.width = rect.width + "px";
    clone.style.height = rect.height + "px";
    clone.style.maxHeight = rect.height + "px";
    clone.style.fontSize = window.getComputedStyle(element.parentElement).fontSize;
    clone.style.opacity = "0.8";
    clone.style.fontSize = window.getComputedStyle(element.parentElement).fontSize;
    ghost.appendChild(clone);
    if (elements && elements.length) {
        elements.forEach(function (node, key) {
            var nodeClone = node.cloneNode(true);
            nodeClone.style.width = rect.width + "px";
            nodeClone.style.height = rect.height + "px";
            nodeClone.style.maxHeight = rect.height + "px";
            nodeClone.style.top = ((key + 1) * 12 - rect.height) - (rect.height * key) + "px";
            nodeClone.style.left = (key + 1) * 12 + "px";
            nodeClone.style.opacity = "0.6";
            nodeClone.style.zIndex = "" + (-key - 1);
            ghost.appendChild(nodeClone);
        });
    }
    ghost.className = "dhx_drag-ghost";
    return ghost;
}
var DragManager = /** @class */ (function () {
    function DragManager() {
        var _this = this;
        this._transferData = {};
        this._canMove = true;
        this._selectedIds = [];
        this._onMouseMove = function (e) {
            if (!_this._transferData.id) {
                return;
            }
            var pageX = e.pageX, pageY = e.pageY;
            if (!_this._transferData.ghost) {
                if (Math.abs(_this._transferData.x - pageX) < 3 && Math.abs(_this._transferData.y - pageY) < 3) {
                    return;
                }
                else {
                    var ghost = _this._onDragStart(_this._transferData.id, _this._transferData.targetId);
                    if (!ghost) {
                        _this._endDrop();
                        return;
                    }
                    else {
                        _this._transferData.ghost = ghost;
                        document.body.appendChild(_this._transferData.ghost);
                    }
                }
            }
            _this._moveGhost(pageX, pageY);
            _this._onDrag(e);
        };
        this._onMouseUp = function () {
            if (!_this._transferData.x) {
                return;
            }
            if (_this._transferData.ghost) {
                _this._removeGhost();
                _this._onDrop();
            }
            else {
                _this._endDrop();
            }
            document.removeEventListener("mousemove", _this._onMouseMove);
            document.removeEventListener("mouseup", _this._onMouseUp);
        };
    }
    DragManager.prototype.setItem = function (id, item) {
        CollectionStore_1.collectionStore.setItem(id, item);
    };
    DragManager.prototype.onMouseDown = function (e, selectedIds, itemsForGhost) {
        if (e.which !== 1) {
            return;
        }
        e.preventDefault();
        document.addEventListener("mousemove", this._onMouseMove);
        document.addEventListener("mouseup", this._onMouseUp);
        var item = html_1.locateNode(e, "dhx_id");
        var id = item && item.getAttribute("dhx_id");
        var targetId = html_1.locate(e, "dhx_widget_id");
        if (selectedIds && selectedIds.indexOf(id) !== -1 && selectedIds.length > 1) {
            this._selectedIds = selectedIds;
            this._itemsForGhost = itemsForGhost;
        }
        else {
            this._selectedIds = [];
            this._itemsForGhost = null;
        }
        if (id && targetId) {
            var _a = html_1.getBox(item), left = _a.left, top_1 = _a.top;
            this._transferData.initXOffset = e.pageX - left;
            this._transferData.initYOffset = e.pageY - top_1;
            this._transferData.x = e.pageX;
            this._transferData.y = e.pageY;
            this._transferData.targetId = targetId;
            this._transferData.id = id;
            this._transferData.item = item;
        }
    };
    DragManager.prototype._moveGhost = function (x, y) {
        if (this._transferData.ghost) {
            this._transferData.ghost.style.left = x - this._transferData.initXOffset + "px";
            this._transferData.ghost.style.top = y - this._transferData.initYOffset + "px";
        }
    };
    DragManager.prototype._removeGhost = function () {
        document.body.removeChild(this._transferData.ghost);
    };
    DragManager.prototype._onDrop = function () {
        if (!this._canMove) {
            this._endDrop();
            return;
        }
        var target = CollectionStore_1.collectionStore.getItem(this._lastCollectionId);
        var config = target && target.config;
        if (!target || config.dragMode === types_1.DragMode.source) {
            this._endDrop();
            return;
        }
        if (target.events.fire(types_1.DragEvents.beforeDrop, [this._lastId, this._transferData.target])) {
            var to = {
                id: this._lastId,
                target: target
            };
            var from = {
                id: this._transferData.id,
                target: this._transferData.target
            };
            this._move(from, to);
            to.target.events.fire(types_1.DragEvents.dropComplete, [to.id, this._transferData.dropPosition]);
        }
        this._endDrop();
    };
    DragManager.prototype._onDragStart = function (id, targetId) {
        var target = CollectionStore_1.collectionStore.getItem(targetId);
        var config = target.config;
        if (config.dragMode === types_1.DragMode.target) {
            return null;
        }
        var item = target.data.getItem(id);
        var ghost = dragEventContent(this._transferData.item, this._itemsForGhost);
        var ans = target.events.fire(types_1.DragEvents.beforeDrag, [item, ghost]);
        if (!ans || !id) {
            return null;
        }
        target.events.fire(types_1.DragEvents.dragStart, [id, this._selectedIds]);
        this._toggleTextSelection(true);
        this._transferData.target = target;
        this._transferData.dragConfig = config;
        return ghost;
    };
    DragManager.prototype._onDrag = function (e) {
        var clientX = e.clientX, clientY = e.clientY;
        var element = document.elementFromPoint(clientX, clientY);
        var collectionId = html_1.locate(element, "dhx_widget_id");
        if (!collectionId) {
            if (this._canMove) {
                this._cancelCanDrop();
            }
            return;
        }
        var target = CollectionStore_1.collectionStore.getItem(collectionId);
        var id = html_1.locate(element, "dhx_id");
        if (!id) {
            this._cancelCanDrop();
            this._lastCollectionId = collectionId;
            this._lastId = null;
            this._canDrop();
            return;
        }
        if (target.config.dropBehaviour === types_1.DropBehaviour.complex) {
            var pos = getPosition(e);
            if (pos <= 0.25) {
                this._transferData.dropPosition = types_1.DropPosition.top;
            }
            else if (pos >= 0.75) {
                this._transferData.dropPosition = types_1.DropPosition.bot;
            }
            else {
                this._transferData.dropPosition = types_1.DropPosition.in;
            }
        }
        else if (this._lastId === id && this._lastCollectionId === collectionId) {
            return;
        }
        var from = {
            id: this._transferData.id,
            target: this._transferData.target
        };
        if (target.config.dragMode === "source") {
            return;
        }
        from.target.events.fire(types_1.DragEvents.dragOut, [id, target]);
        if (collectionId !== this._transferData.targetId || !helpers_1.isTreeCollection(from.target.data) ||
            (helpers_1.isTreeCollection(from.target.data) && from.target.data.canCopy(from.id, id))) {
            this._cancelCanDrop(); // clear last
            this._lastId = id;
            this._lastCollectionId = collectionId;
            var canMove = from.target.events.fire(types_1.DragEvents.dragIn, [id, this._transferData.dropPosition, CollectionStore_1.collectionStore.getItem(collectionId)]);
            if (canMove) {
                this._canDrop();
            }
        }
        else {
            this._cancelCanDrop();
        }
    };
    DragManager.prototype._move = function (from, to) {
        var fromData = from.target.data;
        var toData = to.target.data;
        var index = 0;
        var targetId = to.id;
        var behaviour = helpers_1.isTreeCollection(toData) ? to.target.config.dropBehaviour : undefined;
        switch (behaviour) {
            case types_1.DropBehaviour.child:
                break;
            case types_1.DropBehaviour.sibling:
                targetId = toData.getParent(targetId);
                index = toData.getIndex(to.id) + 1;
                break;
            case types_1.DropBehaviour.complex:
                var dropPosition = this._transferData.dropPosition;
                if (dropPosition === types_1.DropPosition.top) {
                    targetId = toData.getParent(targetId);
                    index = toData.getIndex(to.id);
                }
                else if (dropPosition === types_1.DropPosition.bot) {
                    targetId = toData.getParent(targetId);
                    index = toData.getIndex(to.id) + 1;
                }
                break;
            default:
                // list move
                if (!to.id) {
                    index = -1;
                }
                else if (from.target === to.target && toData.getIndex(from.id) < toData.getIndex(to.id)) {
                    index = toData.getIndex(to.id) - 1;
                }
                else {
                    index = toData.getIndex(to.id);
                }
        }
        if (this._transferData.dragConfig.dragCopy) {
            if (this._selectedIds instanceof Array && this._selectedIds.length > 1) {
                this._selectedIds.map(function (selctedId) {
                    fromData.copy(selctedId, index, toData, targetId);
                    if (index > -1) {
                        index++;
                    }
                });
            }
            else {
                fromData.copy(from.id, index, toData, targetId);
            }
        }
        else {
            if (this._selectedIds instanceof Array && this._selectedIds.length > 1) {
                this._selectedIds.map(function (selctedId) {
                    fromData.move(selctedId, index, toData, targetId);
                    if (index > -1) {
                        index++;
                    }
                });
            }
            else {
                fromData.move(from.id, index, toData, targetId); // typescript bug??
            }
        }
    };
    DragManager.prototype._endDrop = function () {
        this._toggleTextSelection(false);
        if (this._transferData.target) {
            this._transferData.target.events.fire(types_1.DragEvents.dragEnd, [this._transferData.id, this._selectedIds]);
        }
        this._cancelCanDrop();
        this._canMove = true;
        this._transferData = {};
        this._lastId = null;
        this._lastCollectionId = null;
    };
    DragManager.prototype._cancelCanDrop = function () {
        this._canMove = false;
        var collection = CollectionStore_1.collectionStore.getItem(this._lastCollectionId);
        if (collection && this._lastId) {
            collection.events.fire(types_1.DragEvents.cancelDrop, [this._lastId]);
        }
        this._lastCollectionId = null;
        this._lastId = null;
    };
    DragManager.prototype._canDrop = function () {
        this._canMove = true;
        var target = CollectionStore_1.collectionStore.getItem(this._lastCollectionId);
        if (target && this._lastId) {
            target.events.fire(types_1.DragEvents.canDrop, [this._lastId, this._transferData.dropPosition]);
        }
    };
    DragManager.prototype._toggleTextSelection = function (add) {
        if (add) {
            document.body.classList.add("dhx_no-select");
        }
        else {
            document.body.classList.remove("dhx_no-select");
        }
    };
    return DragManager;
}());
var dhx = window.dhxHelpers = window.dhxHelpers || {};
dhx.dragManager = dhx.dragManager || new DragManager();
exports.dragManager = dhx.dragManager;


/***/ }),

/***/ "../ts-data/sources/datacollection.ts":
/*!********************************************!*\
  !*** ../ts-data/sources/datacollection.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var events_1 = __webpack_require__(/*! @dhx/ts-common/events */ "../ts-common/events.ts");
var loader_1 = __webpack_require__(/*! ./datacollection/loader */ "../ts-data/sources/datacollection/loader.ts");
var sort_1 = __webpack_require__(/*! ./datacollection/sort */ "../ts-data/sources/datacollection/sort.ts");
var dataproxy_1 = __webpack_require__(/*! ./dataproxy */ "../ts-data/sources/dataproxy.ts");
var helpers_1 = __webpack_require__(/*! ./helpers */ "../ts-data/sources/helpers.ts");
var types_1 = __webpack_require__(/*! ./types */ "../ts-data/sources/types.ts");
var core_1 = __webpack_require__(/*! @dhx/ts-common/core */ "../ts-common/core.ts");
var DataCollection = /** @class */ (function () {
    function DataCollection(config, events) {
        this.config = config || {};
        this._order = [];
        this._pull = {};
        this._changes = { order: [] };
        this._initOrder = null;
        this._sort = new sort_1.Sort();
        this._loader = new loader_1.Loader(this, this._changes);
        this.events = events || new events_1.EventSystem(this);
        this.events.on(types_1.DataEvents.loadError, function (response) {
            if (typeof response !== "string") {
                helpers_1.dhxError(response);
            }
            else {
                helpers_1.dhxWarning(response);
            }
        });
    }
    DataCollection.prototype.add = function (obj, index) {
        var _this = this;
        if (!this.events.fire(types_1.DataEvents.beforeAdd, [obj])) {
            return;
        }
        if (Array.isArray(obj)) {
            return obj.map(function (element, key) {
                if (key !== 0) {
                    index = index + 1;
                }
                var id = _this._addCore(element, index);
                _this._onChange("add", element.id, element);
                _this.events.fire(types_1.DataEvents.afterAdd, [element]);
                return id;
            });
        }
        else {
            var id = this._addCore(obj, index);
            this._onChange("add", obj.id, obj);
            this.events.fire(types_1.DataEvents.afterAdd, [obj]);
            return id;
        }
    };
    DataCollection.prototype.remove = function (id) {
        var _this = this;
        if (id) {
            if (id instanceof Array) {
                id.map(function (element) {
                    var obj = _this._pull[element];
                    if (obj) {
                        if (!_this.events.fire(types_1.DataEvents.beforeRemove, [obj])) {
                            return;
                        }
                        _this._removeCore(obj.id);
                        _this._onChange("remove", element, obj);
                    }
                    _this.events.fire(types_1.DataEvents.afterRemove, [obj]);
                });
            }
            else {
                var obj = this._pull[id];
                if (obj) {
                    if (!this.events.fire(types_1.DataEvents.beforeRemove, [obj])) {
                        return;
                    }
                    this._removeCore(obj.id);
                    this._onChange("remove", id, obj);
                }
                this.events.fire(types_1.DataEvents.afterRemove, [obj]);
            }
        }
    };
    DataCollection.prototype.removeAll = function () {
        this._removeAll();
        this.events.fire(types_1.DataEvents.removeAll);
        this.events.fire(types_1.DataEvents.change);
    };
    DataCollection.prototype.exists = function (id) {
        return !!this._pull[id];
    };
    DataCollection.prototype.getNearId = function (id) {
        var item = this._pull[id];
        if (!item) {
            return this._order[0].id || "";
        }
    };
    DataCollection.prototype.getItem = function (id) {
        return this._pull[id];
    };
    DataCollection.prototype.update = function (id, obj, silent) {
        var item = this.getItem(id);
        if (item) {
            if (helpers_1.isEqualObj(obj, item)) {
                return;
            }
            if (obj.id && id !== obj.id) {
                helpers_1.dhxWarning("this method doesn't allow change id");
                if (helpers_1.isDebug()) {
                    // tslint:disable-next-line:no-debugger
                    debugger;
                }
            }
            else {
                core_1.extend(this._pull[id], obj, false);
                if (this.config.update) {
                    this.config.update(this._pull[id]);
                }
                if (!silent) {
                    this._onChange("update", id, this._pull[id]);
                }
            }
        }
        else {
            helpers_1.dhxWarning("item not found");
        }
    };
    DataCollection.prototype.getIndex = function (id) {
        var res = core_1.findIndex(this._order, function (item) { return item.id === id; });
        if (this._pull[id] && res >= 0) {
            return res;
        }
        return -1;
    };
    DataCollection.prototype.getId = function (index) {
        if (!this._order[index]) {
            return;
        }
        return this._order[index].id;
    };
    DataCollection.prototype.getLength = function () {
        return this._order.length;
    };
    DataCollection.prototype.filter = function (rule, config) {
        config = core_1.extend({
            add: false,
            multiple: true
        }, config);
        if (!config.add) {
            this._order = this._initOrder || this._order;
            this._initOrder = null;
        }
        this._filters = this._filters || {};
        if (!config.multiple || !rule) {
            this._filters = {};
        }
        if (rule) {
            if (typeof rule === "function") {
                var f = "_";
                this._filters[f] = {
                    match: f,
                    compare: rule
                };
            }
            else {
                if (!rule.match) {
                    delete this._filters[rule.by];
                }
                else {
                    rule.compare = rule.compare || (function (val, match) { return val === match; });
                    this._filters[rule.by] = rule;
                }
            }
            this._applyFilters();
        }
        this.events.fire(types_1.DataEvents.change);
    };
    DataCollection.prototype.find = function (conf) {
        for (var key in this._pull) {
            var res = helpers_1.findByConf(this._pull[key], conf);
            if (res) {
                return res;
            }
        }
        return null;
    };
    DataCollection.prototype.findAll = function (conf) {
        var res = [];
        for (var key in this._pull) {
            var item = helpers_1.findByConf(this._pull[key], conf);
            if (item) {
                res.push(item);
            }
        }
        return res;
    };
    DataCollection.prototype.sort = function (by) {
        if (!by) {
            this._order = [];
            for (var key in this._pull) {
                this._order.push(this._pull[key]);
            }
            this._applyFilters();
        }
        else {
            this._sort.sort(this._order, by);
            if (this._initOrder && this._initOrder.length) {
                this._sort.sort(this._initOrder, by);
            }
        }
        this.events.fire(types_1.DataEvents.change);
    };
    DataCollection.prototype.copy = function (id, index, target, targetId) {
        var _this = this;
        if (id instanceof Array) {
            return id.map(function (elementId, key) {
                if (!_this.exists(elementId)) {
                    return null;
                }
                var newid = core_1.uid();
                var elementIndex = index === -1 ? -1 : index + key;
                if (target) {
                    if (!(target instanceof DataCollection) && targetId) {
                        target.add(helpers_1.copyWithoutInner(_this.getItem(elementId)), elementIndex);
                        return;
                    }
                    if (target.exists(elementId)) {
                        target.add(__assign({}, helpers_1.copyWithoutInner(_this.getItem(elementId)), { id: newid }), elementIndex);
                        return newid;
                    }
                    else {
                        target.add(helpers_1.copyWithoutInner(_this.getItem(elementId)), elementIndex);
                        return elementId;
                    }
                }
                _this.add(__assign({}, helpers_1.copyWithoutInner(_this.getItem(elementId)), { id: newid }), elementIndex);
                return newid;
            });
        }
        else {
            if (!this.exists(id)) {
                return null;
            }
            var newid = core_1.uid();
            if (target) {
                if (!(target instanceof DataCollection) && targetId) {
                    target.add(helpers_1.copyWithoutInner(this.getItem(id)), index);
                    return;
                }
                if (target.exists(id)) {
                    target.add(__assign({}, helpers_1.copyWithoutInner(this.getItem(id)), { id: newid }), index);
                    return newid;
                }
                else {
                    target.add(helpers_1.copyWithoutInner(this.getItem(id)), index);
                    return id;
                }
            }
            this.add(__assign({}, helpers_1.copyWithoutInner(this.getItem(id)), { id: newid }), index);
            return newid;
        }
    };
    DataCollection.prototype.move = function (id, index, target, targetId) {
        var _this = this;
        if (id instanceof Array) {
            return id.map(function (elementId, key) {
                var elementIndex = index === -1 ? -1 : index + key;
                if (target && target !== _this && _this.exists(elementId)) {
                    var item = core_1.copy(_this.getItem(elementId), true);
                    if (target.exists(elementId)) {
                        item.id = core_1.uid();
                    }
                    if (targetId) {
                        item.parent = targetId;
                    }
                    target.add(item, elementIndex);
                    _this.remove(elementId);
                    return item.id;
                }
                if (_this.getIndex(elementId) === elementIndex) {
                    return null;
                }
                var spliced = _this._order.splice(_this.getIndex(elementId), 1)[0];
                if (index === -1) {
                    index = _this._order.length;
                }
                _this._order.splice(elementIndex, 0, spliced);
                _this.events.fire(types_1.DataEvents.change);
                return elementId;
            });
        }
        else {
            if (target && target !== this && this.exists(id)) {
                var item = core_1.copy(this.getItem(id), true);
                if (target.exists(id)) {
                    item.id = core_1.uid();
                }
                if (targetId) {
                    item.parent = targetId;
                }
                target.add(item, index);
                // remove data from original collection
                this.remove(id);
                return item.id;
            }
            if (this.getIndex(id) === index) {
                return null;
            }
            // move other elements
            var spliced = this._order.splice(this.getIndex(id), 1)[0];
            if (index === -1) {
                index = this._order.length;
            }
            this._order.splice(index, 0, spliced);
            this.events.fire(types_1.DataEvents.change); // if target not this, it trigger add and remove
            return id;
        }
    };
    DataCollection.prototype.load = function (url, driver) {
        if (typeof url === "string") {
            url = new dataproxy_1.DataProxy(url);
        }
        return this._loader.load(url, driver);
    };
    DataCollection.prototype.parse = function (data, driver) {
        this._removeAll();
        return this._loader.parse(data, driver);
    };
    DataCollection.prototype.$parse = function (data) {
        var apx = this.config.approximate;
        if (apx) {
            data = this._approximate(data, apx.value, apx.maxNum);
        }
        this._parse_data(data);
        this.events.fire(types_1.DataEvents.change, ["load"]);
        this.events.fire(types_1.DataEvents.load);
    };
    DataCollection.prototype.save = function (url) {
        this._loader.save(url);
    };
    // todo: loop through the array and check saved statuses
    DataCollection.prototype.isSaved = function () {
        return !this._changes.order.length; // todo: bad solution, errors and holded elments are missed...
    };
    DataCollection.prototype.map = function (cb) {
        var result = [];
        for (var i = 0; i < this._order.length; i++) {
            result.push(cb.call(this, this._order[i], i));
        }
        return result;
    };
    DataCollection.prototype.mapRange = function (from, to, cb) {
        if (from < 0) {
            from = 0;
        }
        if (to > this._order.length - 1) {
            to = this._order.length - 1;
        }
        var result = [];
        for (var i = from; i <= to; i++) {
            result.push(cb.call(this, this._order[i], i));
        }
        return result;
    };
    DataCollection.prototype.reduce = function (cb, acc) {
        for (var i = 0; i < this._order.length; i++) {
            acc = cb.call(this, acc, this._order[i], i);
        }
        return acc;
    };
    DataCollection.prototype.serialize = function (driver) {
        if (driver === void 0) { driver = types_1.DataDriver.json; }
        var data = this.map(function (item) {
            var newItem = __assign({}, item);
            Object.keys(newItem).forEach(function (key) {
                if (key[0] === "$") {
                    delete newItem[key];
                }
            });
            return newItem;
        });
        var dataDriver = helpers_1.toDataDriver(driver);
        if (dataDriver) {
            return dataDriver.serialize(data);
        }
    };
    DataCollection.prototype.getInitialData = function () {
        return this._initOrder;
    };
    DataCollection.prototype._removeAll = function () {
        this._pull = {};
        this._order = [];
        this._changes.order = [];
        this._initOrder = null;
    };
    DataCollection.prototype._addCore = function (obj, index) {
        if (this.config.init) {
            obj = this.config.init(obj);
        }
        obj.id = obj.id ? obj.id.toString() : core_1.uid();
        if (this._pull[obj.id]) {
            helpers_1.dhxError("Item already exist");
        }
        // todo: not ideal solution
        if (this._initOrder && this._initOrder.length) {
            this._addToOrder(this._initOrder, obj, index);
        }
        this._addToOrder(this._order, obj, index);
        return obj.id;
    };
    DataCollection.prototype._removeCore = function (id) {
        if (this.getIndex(id) >= 0) {
            this._order = this._order.filter(function (el) { return el.id !== id; });
            delete this._pull[id];
        }
        if (this._initOrder && this._initOrder.length) {
            this._initOrder = this._initOrder.filter(function (el) { return el.id !== id; });
        }
    };
    DataCollection.prototype._parse_data = function (data) {
        var index = this._order.length;
        if (this.config.prep) {
            data = this.config.prep(data);
        }
        for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
            var obj = data_1[_i];
            if (this.config.init) {
                obj = this.config.init(obj);
            }
            obj.id = (obj.id || obj.id === 0) ? obj.id : core_1.uid();
            this._pull[obj.id] = obj;
            this._order[index++] = obj;
        }
    };
    DataCollection.prototype._approximate = function (data, values, maxNum) {
        var len = data.length;
        var vlen = values.length;
        var rlen = Math.floor(len / maxNum);
        var newData = Array(Math.ceil(len / rlen));
        var index = 0;
        for (var i = 0; i < len; i += rlen) {
            var newItem = core_1.copy(data[i]);
            var end = Math.min(len, i + rlen);
            for (var j = 0; j < vlen; j++) {
                var sum = 0;
                for (var z = i; z < end; z++) {
                    sum += data[z][values[j]];
                }
                newItem[values[j]] = sum / (end - i);
            }
            newData[index++] = newItem;
        }
        return newData;
    };
    DataCollection.prototype._onChange = function (status, id, obj) {
        for (var _i = 0, _a = this._changes.order; _i < _a.length; _i++) {
            var item = _a[_i];
            // update pending item if previous state is "saving" or if item not saved yet
            if (item.id === id && !item.saving) {
                // update item
                if (item.error) {
                    item.error = false;
                }
                item = __assign({}, item, { obj: obj, status: status });
                this.events.fire(types_1.DataEvents.change, [id, status, obj]);
                return;
            }
        }
        this._changes.order.push({ id: id, status: status, obj: __assign({}, obj), saving: false });
        this.events.fire(types_1.DataEvents.change, [id, status, obj]);
    };
    DataCollection.prototype._addToOrder = function (array, obj, index) {
        if (index >= 0 && array[index]) {
            this._pull[obj.id] = obj;
            array.splice(index, 0, obj);
        }
        else {
            this._pull[obj.id] = obj;
            array.push(obj);
        }
    };
    DataCollection.prototype._applyFilters = function () {
        var _this = this;
        if (this._filters && Object.keys(this._filters).length) {
            var fOrder = this._order.filter(function (item) {
                return Object.keys(_this._filters).every(function (key) {
                    return item[key] ?
                        _this._filters[key].compare(item[key], _this._filters[key].match, item)
                        : _this._filters[key].compare(item);
                });
            });
            if (!this._initOrder) {
                this._initOrder = this._order;
            }
            this._order = fOrder;
        }
    };
    return DataCollection;
}());
exports.DataCollection = DataCollection;


/***/ }),

/***/ "../ts-data/sources/datacollection/loader.ts":
/*!***************************************************!*\
  !*** ../ts-data/sources/datacollection/loader.ts ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Promise) {
Object.defineProperty(exports, "__esModule", { value: true });
var helpers_1 = __webpack_require__(/*! ../helpers */ "../ts-data/sources/helpers.ts");
var types_1 = __webpack_require__(/*! ../types */ "../ts-data/sources/types.ts");
var Loader = /** @class */ (function () {
    function Loader(parent, changes) {
        this._parent = parent;
        this._changes = changes; // todo: [dirty] mutation
    }
    Loader.prototype.load = function (url, driver) {
        var _this = this;
        return this._parent.loadData = url.load().then(function (data) {
            _this._parent.removeAll();
            // const parcedData = this.parse(data, driver);
            return _this.parse(data, driver);
        }).catch(function (error) {
            _this._parent.events.fire(types_1.DataEvents.loadError, [error]);
        });
    };
    Loader.prototype.parse = function (data, driver) {
        if (driver === void 0) { driver = "json"; }
        if (driver === "json" && !helpers_1.hasJsonOrArrayStructure(data)) {
            this._parent.events.fire(types_1.DataEvents.loadError, ["Uncaught SyntaxError: Unexpected end of input"]);
        }
        driver = helpers_1.toDataDriver(driver);
        data = driver.toJsonArray(data);
        this._parent.$parse(data);
        return data;
    };
    Loader.prototype.save = function (url) {
        var _this = this;
        var _loop_1 = function (el) {
            if (el.saving || el.pending) {
                helpers_1.dhxWarning("item is saving");
            }
            else {
                var prevEl_1 = this_1._findPrevState(el.id);
                if (prevEl_1 && prevEl_1.saving) {
                    var pending = new Promise(function (res, rej) {
                        prevEl_1.promise.then(function () {
                            el.pending = false;
                            res(_this._setPromise(el, url));
                        }).catch(function (err) {
                            _this._removeFromOrder(prevEl_1);
                            _this._setPromise(el, url);
                            helpers_1.dhxWarning(err);
                            rej(err);
                        });
                    });
                    this_1._addToChain(pending);
                    el.pending = true;
                }
                else {
                    this_1._setPromise(el, url);
                }
            }
        };
        var this_1 = this;
        for (var _i = 0, _a = this._changes.order; _i < _a.length; _i++) {
            var el = _a[_i];
            _loop_1(el);
        }
        this._parent.saveData.then(function () {
            _this._saving = false;
        });
    };
    Loader.prototype._setPromise = function (el, url) {
        var _this = this;
        el.promise = url.save(el.obj, el.status);
        el.promise.then(function () {
            _this._removeFromOrder(el);
        }).catch(function (err) {
            el.saving = false;
            el.error = true;
            helpers_1.dhxError(err);
        });
        el.saving = true;
        this._saving = true;
        this._addToChain(el.promise);
        return el.promise;
    };
    Loader.prototype._addToChain = function (promise) {
        // tslint:disable-next-line:prefer-conditional-expression
        if (this._parent.saveData && this._saving) {
            this._parent.saveData = this._parent.saveData.then(function () { return promise; });
        }
        else {
            this._parent.saveData = promise;
        }
    };
    Loader.prototype._findPrevState = function (id) {
        for (var _i = 0, _a = this._changes.order; _i < _a.length; _i++) {
            var el = _a[_i];
            if (el.id === id) {
                return el;
            }
        }
        return null;
    };
    Loader.prototype._removeFromOrder = function (el) {
        this._changes.order = this._changes.order.filter(function (item) { return !helpers_1.isEqualObj(item, el); });
    };
    return Loader;
}());
exports.Loader = Loader;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! promiz */ "../node_modules/promiz/promiz.js")))

/***/ }),

/***/ "../ts-data/sources/datacollection/sort.ts":
/*!*************************************************!*\
  !*** ../ts-data/sources/datacollection/sort.ts ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var helpers_1 = __webpack_require__(/*! ./../helpers */ "../ts-data/sources/helpers.ts");
var Sort = /** @class */ (function () {
    function Sort() {
    }
    Sort.prototype.sort = function (array, by) {
        var _this = this;
        if (by.rule && typeof by.rule === "function") {
            this._sort(array, by);
        }
        else if (by.by) {
            by.rule = function (a, b) {
                var aa = _this._checkVal(by.as, a[by.by]);
                var bb = _this._checkVal(by.as, b[by.by]);
                return helpers_1.naturalCompare(aa.toString(), bb.toString());
            };
            this._sort(array, by);
        }
    };
    Sort.prototype._checkVal = function (method, val) {
        return method ? method.call(this, val) : val;
    };
    Sort.prototype._sort = function (arr, conf) {
        var _this = this;
        var dir = {
            asc: 1,
            desc: -1
        };
        return arr.sort(function (a, b) {
            return conf.rule.call(_this, a, b) * (dir[conf.dir] || dir.asc);
        });
    };
    return Sort;
}());
exports.Sort = Sort;


/***/ }),

/***/ "../ts-data/sources/dataproxy.ts":
/*!***************************************!*\
  !*** ../ts-data/sources/dataproxy.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Promise) {
Object.defineProperty(exports, "__esModule", { value: true });
var DataProxy = /** @class */ (function () {
    function DataProxy(url) {
        this.url = url;
    }
    DataProxy.prototype.load = function () {
        return this._ajax(this.url);
    };
    DataProxy.prototype.save = function (data, mode) {
        var modes = {
            insert: "POST",
            delete: "DELETE",
            update: "POST"
        };
        return this._ajax(this.url, data, modes[mode] || "POST");
    };
    DataProxy.prototype._ajax = function (url, data, method) {
        if (method === void 0) { method = "GET"; }
        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.onload = function () {
                if (xhr.status >= 200 && xhr.status < 300) {
                    resolve(xhr.response || xhr.responseText);
                }
                else {
                    reject({
                        status: xhr.status,
                        statusText: xhr.statusText
                    });
                }
            };
            xhr.onerror = function () {
                reject({
                    status: xhr.status,
                    statusText: xhr.statusText
                });
            };
            xhr.open(method, url);
            xhr.setRequestHeader("Content-Type", "application/json");
            switch (method) {
                case "POST":
                case "DELETE":
                case "PUT":
                    xhr.send(JSON.stringify(data));
                    break;
                case "GET":
                    xhr.send();
                    break;
                default:
                    xhr.send();
                    break;
            }
        });
    };
    return DataProxy;
}());
exports.DataProxy = DataProxy;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! promiz */ "../node_modules/promiz/promiz.js")))

/***/ }),

/***/ "../ts-data/sources/drivers/CsvDriver.ts":
/*!***********************************************!*\
  !*** ../ts-data/sources/drivers/CsvDriver.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var CsvDriver = /** @class */ (function () {
    function CsvDriver(config) {
        var initConfig = {
            skipHeader: 0,
            nameByHeader: false,
            rowDelimiter: "\n",
            columnDelimiter: ",",
        };
        this.config = __assign({}, initConfig, config);
        if (this.config.nameByHeader) {
            this.config.skipHeader = 1;
        }
    }
    CsvDriver.prototype.getFields = function (row, headers) {
        var parts = row.trim().split(this.config.columnDelimiter);
        var obj = {};
        for (var i = 0; i < parts.length; i++) {
            obj[headers ? headers[i] : i + 1] = parts[i];
        }
        return obj;
    };
    CsvDriver.prototype.getRows = function (data) {
        return data.trim().split(this.config.rowDelimiter);
    };
    CsvDriver.prototype.toJsonArray = function (data) {
        var _this = this;
        var rows = this.getRows(data);
        var names = this.config.names;
        if (this.config.skipHeader) {
            var top_1 = rows.splice(0, this.config.skipHeader);
            if (this.config.nameByHeader) {
                names = top_1[0].trim().split(this.config.columnDelimiter);
            }
        }
        return rows.map(function (row) { return _this.getFields(row, names); });
    };
    CsvDriver.prototype.serialize = function (data, withoutHeader) {
        var header = data[0] ? Object.keys(data[0])
            .filter(function (key) { return key[0] !== "$"; })
            .join(this.config.columnDelimiter) : "";
        var readyData = this._serialize(data);
        if (withoutHeader) {
            return readyData;
        }
        return header + readyData;
    };
    CsvDriver.prototype._serialize = function (data) {
        var _this = this;
        return data.reduce(function (csv, row) {
            var cells = Object.keys(row).reduce(function (total, key, i) {
                if (key[0] === "$" || key === "items") {
                    return total;
                }
                return "" + total + row[key] + (i === row.length - 1 ? "" : _this.config.columnDelimiter);
            }, "");
            if (row.items) {
                return csv + "\n" + cells + _this._serialize(row.items);
            }
            return "" + csv + _this.config.rowDelimiter + cells;
        }, "");
    };
    return CsvDriver;
}());
exports.CsvDriver = CsvDriver;


/***/ }),

/***/ "../ts-data/sources/drivers/JsonDriver.ts":
/*!************************************************!*\
  !*** ../ts-data/sources/drivers/JsonDriver.ts ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var JsonDriver = /** @class */ (function () {
    function JsonDriver() {
    }
    JsonDriver.prototype.toJsonArray = function (data) {
        return this.getRows(data);
    };
    JsonDriver.prototype.serialize = function (data) {
        return data;
    };
    JsonDriver.prototype.getFields = function (row) {
        return row;
    };
    JsonDriver.prototype.getRows = function (data) {
        return typeof data === "string" ? JSON.parse(data) : data;
    };
    return JsonDriver;
}());
exports.JsonDriver = JsonDriver;


/***/ }),

/***/ "../ts-data/sources/drivers/XMLDriver.ts":
/*!***********************************************!*\
  !*** ../ts-data/sources/drivers/XMLDriver.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var xml_1 = __webpack_require__(/*! ./../serializers/xml */ "../ts-data/sources/serializers/xml.ts");
var ARRAY_NAME = "items";
var ITEM_NAME = "item";
var XMLDriver = /** @class */ (function () {
    function XMLDriver() {
    }
    XMLDriver.prototype.toJsonArray = function (data) {
        return this.getRows(data);
    };
    XMLDriver.prototype.serialize = function (data) {
        return xml_1.jsonToXML(data);
    };
    XMLDriver.prototype.getFields = function (row) {
        return row;
    };
    XMLDriver.prototype.getRows = function (data) {
        if (typeof data === "string") {
            data = this._fromString(data);
        }
        var childNodes = data.childNodes && data.childNodes[0] && data.childNodes[0].childNodes;
        if (!childNodes || !childNodes.length) {
            return null;
        }
        return this._getRows(childNodes);
    };
    XMLDriver.prototype._getRows = function (nodes) {
        var result = [];
        for (var i = 0; i < nodes.length; i++) {
            if (nodes[i].tagName === ITEM_NAME) {
                result.push(this._nodeToJS(nodes[i]));
            }
        }
        return result;
    };
    XMLDriver.prototype._fromString = function (data) {
        return (new DOMParser()).parseFromString(data, "text/xml");
    };
    XMLDriver.prototype._nodeToJS = function (node) {
        var result = {};
        if (this._haveAttrs(node)) {
            var attrs = node.attributes;
            for (var i = 0; i < attrs.length; i++) {
                var _a = attrs[i], name_1 = _a.name, value = _a.value;
                result[name_1] = this._toType(value);
            }
        }
        if (node.nodeType === 3) {
            result.value = result.value || this._toType(node.textContent);
            return result;
        }
        var childNodes = node.childNodes;
        if (childNodes) {
            for (var i = 0; i < childNodes.length; i++) {
                var subNode = childNodes[i];
                var tag = subNode.tagName;
                if (!tag) {
                    continue;
                }
                if (tag === ARRAY_NAME && subNode.childNodes) {
                    result[tag] = this._getRows(subNode.childNodes);
                }
                else {
                    if (this._haveAttrs(subNode)) {
                        result[tag] = this._nodeToJS(subNode);
                    }
                    else {
                        result[tag] = this._toType(subNode.textContent);
                    }
                }
            }
        }
        return result;
    };
    XMLDriver.prototype._toType = function (val) {
        if (val === "false" || val === "true") {
            return val === "true";
        }
        if (!isNaN(val)) {
            return Number(val);
        }
        return val;
    };
    XMLDriver.prototype._haveAttrs = function (node) {
        return node.attributes && node.attributes.length;
    };
    return XMLDriver;
}());
exports.XMLDriver = XMLDriver;


/***/ }),

/***/ "../ts-data/sources/drivers/drivers.ts":
/*!*********************************************!*\
  !*** ../ts-data/sources/drivers/drivers.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var JsonDriver_1 = __webpack_require__(/*! ./JsonDriver */ "../ts-data/sources/drivers/JsonDriver.ts");
var CsvDriver_1 = __webpack_require__(/*! ./CsvDriver */ "../ts-data/sources/drivers/CsvDriver.ts");
var XMLDriver_1 = __webpack_require__(/*! ./XMLDriver */ "../ts-data/sources/drivers/XMLDriver.ts");
exports.dataDrivers = {
    json: JsonDriver_1.JsonDriver,
    csv: CsvDriver_1.CsvDriver
};
exports.dataDriversPro = __assign({}, exports.dataDrivers, { xml: XMLDriver_1.XMLDriver });


/***/ }),

/***/ "../ts-data/sources/helpers.ts":
/*!*************************************!*\
  !*** ../ts-data/sources/helpers.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var dataproxy_1 = __webpack_require__(/*! ./dataproxy */ "../ts-data/sources/dataproxy.ts");
var drivers_1 = __webpack_require__(/*! ./drivers/drivers */ "../ts-data/sources/drivers/drivers.ts");
function isEqualObj(a, b) {
    for (var key in a) {
        if (a[key] !== b[key]) {
            return false;
        }
    }
    return true;
}
exports.isEqualObj = isEqualObj;
function naturalCompare(a, b) {
    if (isNaN(a) || isNaN(b)) {
        var ax_1 = [];
        var bx_1 = [];
        a.replace(/(\d+)|(\D+)/g, function (_, $1, $2) {
            ax_1.push([$1 || Infinity, $2 || ""]);
        });
        b.replace(/(\d+)|(\D+)/g, function (_, $1, $2) {
            bx_1.push([$1 || Infinity, $2 || ""]);
        });
        while (ax_1.length && bx_1.length) {
            var an = ax_1.shift();
            var bn = bx_1.shift();
            var nn = (an[0] - bn[0]) || an[1].localeCompare(bn[1]);
            if (nn) {
                return nn;
            }
        }
        return ax_1.length - bx_1.length;
    }
    return a - b;
}
exports.naturalCompare = naturalCompare;
function findByConf(item, conf) {
    if (typeof conf === "function") {
        if (conf.call(this, item)) {
            return item;
        }
    }
    else if (conf.by && conf.match) {
        if (item[conf.by] === conf.match) {
            return item;
        }
    }
}
exports.findByConf = findByConf;
function isDebug() {
    var dhx = window.dhx;
    if (typeof dhx !== "undefined") {
        return typeof (dhx.debug) !== "undefined" && dhx.debug;
    }
    // return typeof DHX_DEBUG_MODE !== "undefined" && DHX_DEBUG_MODE;
}
exports.isDebug = isDebug;
function dhxWarning(msg) {
    // tslint:disable-next-line:no-console
    console.warn(msg);
}
exports.dhxWarning = dhxWarning;
function dhxError(msg) {
    throw new Error(msg);
}
exports.dhxError = dhxError;
function toProxy(proxy) {
    var type = typeof proxy;
    if (type === "string") {
        return new dataproxy_1.DataProxy(proxy);
    }
    else if (type === "object") {
        return proxy;
    }
}
exports.toProxy = toProxy;
function toDataDriver(driver) {
    if (typeof driver === "string") {
        var dhx = window.dhx;
        var drivers = (dhx && dhx.dataDrivers) || drivers_1.dataDrivers;
        if (drivers[driver]) {
            return new drivers[driver]();
        }
        else {
            // tslint:disable-next-line:no-console
            console.warn("Incorrect data driver type:", driver);
            // tslint:disable-next-line:no-console
            console.warn("Available types:", JSON.stringify(Object.keys(drivers)));
        }
    }
    else if (typeof driver === "object") {
        return driver;
    }
}
exports.toDataDriver = toDataDriver;
function copyWithoutInner(obj, forbidden) {
    var result = {};
    for (var key in obj) {
        if (key[0] !== "$" && (!forbidden || !forbidden[key])) {
            result[key] = obj[key];
        }
    }
    return result;
}
exports.copyWithoutInner = copyWithoutInner;
function isTreeCollection(obj) {
    return Boolean(obj.getRoot);
}
exports.isTreeCollection = isTreeCollection;
function hasJsonOrArrayStructure(str) {
    if (typeof str === "object") {
        return true;
    }
    if (typeof str !== "string") {
        return false;
    }
    try {
        var result = JSON.parse(str);
        return Object.prototype.toString.call(result) === "[object Object]"
            || Array.isArray(result);
    }
    catch (err) {
        return false;
    }
}
exports.hasJsonOrArrayStructure = hasJsonOrArrayStructure;


/***/ }),

/***/ "../ts-data/sources/selection.ts":
/*!***************************************!*\
  !*** ../ts-data/sources/selection.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var events_1 = __webpack_require__(/*! @dhx/ts-common/events */ "../ts-common/events.ts");
var types_1 = __webpack_require__(/*! @dhx/ts-common/types */ "../ts-common/types.ts");
var types_2 = __webpack_require__(/*! ./types */ "../ts-data/sources/types.ts");
var Selection = /** @class */ (function () {
    function Selection(_config, data, events) {
        var _this = this;
        this.events = events || (new events_1.EventSystem(this));
        this._data = data;
        this._data.events.on(types_2.DataEvents.removeAll, function () {
            _this._selected = null;
        });
        this._data.events.on(types_2.DataEvents.change, function () {
            if (_this._selected) {
                var near = _this._data.getNearId(_this._selected);
                if (near !== _this._selected) {
                    _this._selected = null;
                    if (near) {
                        _this.add(near);
                    }
                }
            }
        });
    }
    Selection.prototype.getId = function () {
        return this._selected;
    };
    Selection.prototype.getItem = function () {
        if (this._selected) {
            return this._data.getItem(this._selected);
        }
        return null;
    };
    Selection.prototype.remove = function (id) {
        id = id || this._selected;
        if (!id) {
            return true;
        }
        if (this.events.fire(types_1.SelectionEvents.beforeUnSelect, [id])) {
            this._data.update(id, { $selected: false });
            this._selected = null;
            this.events.fire(types_1.SelectionEvents.afterUnSelect, [id]);
            return true;
        }
        return false;
    };
    Selection.prototype.add = function (id) {
        if (this._selected === id) {
            return;
        }
        this.remove();
        if (this.events.fire(types_1.SelectionEvents.beforeSelect, [id])) {
            this._selected = id;
            this._data.update(id, { $selected: true });
            this.events.fire(types_1.SelectionEvents.afterSelect, [id]);
        }
    };
    return Selection;
}());
exports.Selection = Selection;


/***/ }),

/***/ "../ts-data/sources/serializers/xml.ts":
/*!*********************************************!*\
  !*** ../ts-data/sources/serializers/xml.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var INDENT_STEP = 4;
function jsonToXML(data, root) {
    if (root === void 0) { root = "root"; }
    var result = "<?xml version=\"1.0\" encoding=\"iso-8859-1\"?>\n<" + root + ">";
    for (var i = 0; i < data.length; i++) {
        result += "\n" + itemToXML(data[i]);
    }
    return result + ("\n</" + root + ">");
}
exports.jsonToXML = jsonToXML;
function ws(count) {
    return " ".repeat(count);
}
function itemToXML(item, indent) {
    if (indent === void 0) { indent = INDENT_STEP; }
    var result = ws(indent) + "<item>\n";
    for (var key in item) {
        if (Array.isArray(item[key])) {
            result += ws(indent + INDENT_STEP) + ("<" + key + ">\n");
            result += item[key].map(function (subItem) { return itemToXML(subItem, indent + INDENT_STEP * 2); }).join("\n") + "\n";
            result += ws(indent + INDENT_STEP) + ("</" + key + ">\n");
        }
        else {
            result += ws(indent + INDENT_STEP) + ("<" + key + ">" + item[key] + "</" + key + ">\n");
        }
    }
    result += ws(indent) + "</item>";
    return result;
}


/***/ }),

/***/ "../ts-data/sources/treecollection.ts":
/*!********************************************!*\
  !*** ../ts-data/sources/treecollection.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @dhx/ts-common/core */ "../ts-common/core.ts");
var datacollection_1 = __webpack_require__(/*! ./datacollection */ "../ts-data/sources/datacollection.ts");
var dataproxy_1 = __webpack_require__(/*! ./dataproxy */ "../ts-data/sources/dataproxy.ts");
var helpers_1 = __webpack_require__(/*! ./helpers */ "../ts-data/sources/helpers.ts");
var types_1 = __webpack_require__(/*! ./types */ "../ts-data/sources/types.ts");
function addToOrder(store, obj, parent, index) {
    if (index !== undefined && index !== -1 && store[parent] && store[parent][index]) {
        store[parent].splice(index, 0, obj);
    }
    else {
        if (!store[parent]) {
            store[parent] = [];
        }
        store[parent].push(obj);
    }
}
var TreeCollection = /** @class */ (function (_super) {
    __extends(TreeCollection, _super);
    function TreeCollection(config, events) {
        var _a;
        var _this = _super.call(this, config, events) || this;
        var root = _this._root = "_ROOT_" + core_1.uid();
        _this._childs = (_a = {}, _a[root] = [], _a);
        _this._initChilds = null;
        return _this;
    }
    TreeCollection.prototype.add = function (obj, index, parent) {
        var _this = this;
        if (index === void 0) { index = -1; }
        if (parent === void 0) { parent = this._root; }
        if (typeof obj !== "object") {
            obj = {
                value: obj
            };
        }
        if (Array.isArray(obj)) {
            return obj.map(function (element, key) {
                if (key > 0 && index !== -1) {
                    index = index + 1;
                }
                element.parent = element.parent ? element.parent.toString() : parent;
                var id = _super.prototype.add.call(_this, element, index);
                if (Array.isArray(element.items)) {
                    for (var _i = 0, _a = element.items; _i < _a.length; _i++) {
                        var item = _a[_i];
                        _this.add(item, -1, element.id);
                    }
                }
                return id;
            });
        }
        else {
            obj.parent = obj.parent ? obj.parent.toString() : parent;
            var id = _super.prototype.add.call(this, obj, index);
            if (Array.isArray(obj.items)) {
                for (var _i = 0, _a = obj.items; _i < _a.length; _i++) {
                    var item = _a[_i];
                    this.add(item, -1, obj.id);
                }
            }
            return id;
        }
    };
    TreeCollection.prototype.getRoot = function () {
        return this._root;
    };
    TreeCollection.prototype.getParent = function (id, asObj) {
        if (asObj === void 0) { asObj = false; }
        if (!this._pull[id]) {
            return null;
        }
        var parent = this._pull[id].parent;
        return asObj ? this._pull[parent] : parent;
    };
    TreeCollection.prototype.getItems = function (id) {
        if (this._childs && this._childs[id]) {
            return this._childs[id];
        }
        return [];
    };
    TreeCollection.prototype.getLength = function (id) {
        if (id === void 0) { id = this._root; }
        if (!this._childs[id]) {
            return null;
        }
        return this._childs[id].length;
    };
    TreeCollection.prototype.removeAll = function (id) {
        var _a;
        if (id) {
            var childs = this._childs[id].slice();
            for (var _i = 0, childs_1 = childs; _i < childs_1.length; _i++) {
                var child = childs_1[_i];
                this.remove(child.id);
            }
        }
        else {
            _super.prototype.removeAll.call(this);
            var root = this._root;
            this._initChilds = null;
            this._childs = (_a = {}, _a[root] = [], _a);
        }
    };
    TreeCollection.prototype.getIndex = function (id) {
        var parent = this.getParent(id);
        if (!parent || !this._childs[parent]) {
            return -1;
        }
        return core_1.findIndex(this._childs[parent], function (item) { return item.id === id; });
    };
    TreeCollection.prototype.sort = function (by) {
        var _this = this;
        if (!by) {
            this._childs = {};
            // [dirty]
            this._parse_data(Object.keys(this._pull).map(function (key) { return _this._pull[key]; }));
            if (this._filters) {
                for (var key in this._filters) {
                    var filter = this._filters[key];
                    this.filter(filter.rule, filter.config);
                }
            }
        }
        else {
            for (var key in this._childs) {
                this._sort.sort(this._childs[key], by);
            }
            if (this._initChilds && Object.keys(this._initChilds).length) {
                for (var key in this._initChilds) {
                    this._sort.sort(this._initChilds[key], by);
                }
            }
        }
        this.events.fire(types_1.DataEvents.change);
    };
    TreeCollection.prototype.map = function (cb, parent, direct) {
        if (parent === void 0) { parent = this._root; }
        if (direct === void 0) { direct = true; }
        var result = [];
        if (!this.haveItems(parent)) {
            return result;
        }
        for (var i = 0; i < this._childs[parent].length; i++) {
            result.push(cb.call(this, this._childs[parent][i], i));
            if (direct) {
                var childResult = this.map(cb, this._childs[parent][i].id, direct);
                result = result.concat(childResult);
            }
        }
        return result;
    };
    TreeCollection.prototype.filter = function (rule, config) {
        var _this = this;
        if (config === void 0) { config = {}; }
        if (!rule) {
            this.restoreOrder();
            return;
        }
        if (!this._initChilds) {
            this._initChilds = this._childs;
        }
        config.type = config.type || types_1.TreeFilterType.leafs;
        // [todo] we can store multiple filter rules, like in datacollection
        this._filters = {};
        this._filters._ = {
            rule: rule,
            config: config
        };
        var newChilds = {};
        this._recursiveFilter(rule, config, this._root, 0, newChilds);
        var parents = [];
        var _loop_1 = function (i) {
            var check = newChilds[i].map(function (element) {
                return !_this.haveItems(element.id) && _this.getParent(element.id) !== _this.getRoot();
            }).find(function (item) { return item ? item : null; });
            if (newChilds[i].length > 0 && newChilds[i] !== newChilds[this_1.getRoot()] && check) {
                var item = newChilds[this_1.getRoot()].find(function (element) {
                    if (element.id === i) {
                        return element;
                    }
                });
                if (item) {
                    parents.push(item);
                }
            }
        };
        var this_1 = this;
        for (var i in newChilds) {
            _loop_1(i);
        }
        newChilds[this.getRoot()] = parents;
        this._childs = newChilds;
        this.events.fire(types_1.DataEvents.change);
    };
    TreeCollection.prototype.restoreOrder = function () {
        if (this._initChilds) {
            this._childs = this._initChilds;
            this._initChilds = null;
        }
        this.events.fire(types_1.DataEvents.change);
    };
    TreeCollection.prototype.copy = function (id, index, target, targetId) {
        var _this = this;
        if (target === void 0) { target = this; }
        if (targetId === void 0) { targetId = this._root; }
        if (id instanceof Array) {
            return id.map(function (elementId, key) {
                if (!_this.exists(elementId)) {
                    return null;
                }
                var currentChilds = _this._childs[elementId];
                var elementIndex = index === -1 ? -1 : index + key;
                if (target === _this && !_this.canCopy(elementId, targetId)) {
                    return null;
                }
                var itemCopy = helpers_1.copyWithoutInner(_this.getItem(elementId), { items: true });
                if (target.exists(elementId)) {
                    itemCopy.id = core_1.uid();
                }
                if (!helpers_1.isTreeCollection(target)) {
                    target.add(itemCopy, elementIndex);
                    return;
                }
                if (_this.exists(elementId)) {
                    itemCopy.parent = targetId;
                    if (target !== _this && targetId === _this._root) {
                        itemCopy.parent = target.getRoot();
                    }
                    target.add(itemCopy, elementIndex);
                    elementId = itemCopy.id;
                }
                if (currentChilds) {
                    for (var _i = 0, currentChilds_2 = currentChilds; _i < currentChilds_2.length; _i++) {
                        var child = currentChilds_2[_i];
                        var childId = child.id;
                        var childIndex = _this.getIndex(childId);
                        if (typeof elementId === "string") {
                            _this.copy(childId, childIndex, target, elementId);
                        }
                    }
                }
                return elementId;
            });
        }
        else {
            if (!this.exists(id)) {
                return null;
            }
            var currentChilds = this._childs[id];
            if (target === this && !this.canCopy(id, targetId)) {
                return null;
            }
            var itemCopy = helpers_1.copyWithoutInner(this.getItem(id), { items: true });
            if (target.exists(id)) {
                itemCopy.id = core_1.uid();
            }
            if (!helpers_1.isTreeCollection(target)) {
                target.add(itemCopy, index);
                return;
            }
            if (this.exists(id)) {
                itemCopy.parent = targetId;
                if (target !== this && targetId === this._root) {
                    itemCopy.parent = target.getRoot();
                }
                target.add(itemCopy, index);
                id = itemCopy.id;
            }
            if (currentChilds) {
                for (var _i = 0, currentChilds_1 = currentChilds; _i < currentChilds_1.length; _i++) {
                    var child = currentChilds_1[_i];
                    var childId = child.id;
                    var childIndex = this.getIndex(childId);
                    if (typeof id === "string") {
                        this.copy(childId, childIndex, target, id);
                    }
                }
            }
            return id;
        }
    };
    TreeCollection.prototype.move = function (id, index, target, targetId) {
        var _this = this;
        if (target === void 0) { target = this; }
        if (targetId === void 0) { targetId = this._root; }
        if (id instanceof Array) {
            return id.map(function (elementId, key) {
                if (!_this.exists(elementId)) {
                    return null;
                }
                var elementIndex = index === -1 ? -1 : index + key;
                if (target !== _this) {
                    if (!helpers_1.isTreeCollection(target)) {
                        target.add(helpers_1.copyWithoutInner(_this.getItem(elementId)), elementIndex);
                        _this.remove(elementId);
                        return;
                    }
                    var returnId = _this.copy(elementId, elementIndex, target, targetId);
                    _this.remove(elementId);
                    return returnId;
                }
                if (!_this.canCopy(elementId, targetId)) {
                    return null;
                }
                var parent = _this.getParent(elementId);
                var parentIndex = _this.getIndex(elementId);
                var spliced = _this._childs[parent].splice(parentIndex, 1)[0];
                spliced.parent = targetId;
                if (!_this._childs[parent].length) {
                    delete _this._childs[parent];
                }
                if (!_this.haveItems(targetId)) {
                    _this._childs[targetId] = [];
                }
                if (elementIndex === -1) {
                    elementIndex = _this._childs[targetId].push(spliced);
                }
                else {
                    _this._childs[targetId].splice(elementIndex, 0, spliced);
                }
                _this.events.fire(types_1.DataEvents.change);
                return elementId;
            });
        }
        else {
            if (!this.exists(id)) {
                return null;
            }
            if (target !== this) {
                if (!helpers_1.isTreeCollection(target)) { // move to datacollection
                    target.add(helpers_1.copyWithoutInner(this.getItem(id)), index);
                    this.remove(id);
                    return;
                }
                var returnId = this.copy(id, index, target, targetId);
                this.remove(id);
                return returnId;
            }
            // move inside
            if (!this.canCopy(id, targetId)) {
                return null;
            }
            var parent_1 = this.getParent(id);
            var parentIndex = this.getIndex(id);
            // get item from parent array and move to target array
            var spliced = this._childs[parent_1].splice(parentIndex, 1)[0];
            spliced.parent = targetId; // need for next moving, ... not best solution, may be full method for get item
            if (!this._childs[parent_1].length) {
                delete this._childs[parent_1];
            }
            if (!this.haveItems(targetId)) {
                this._childs[targetId] = [];
            }
            if (index === -1) {
                index = this._childs[targetId].push(spliced);
            }
            else {
                this._childs[targetId].splice(index, 0, spliced);
            }
            this.events.fire(types_1.DataEvents.change);
            return id;
        }
    };
    TreeCollection.prototype.eachChild = function (id, cb, direct, checkItem) {
        if (direct === void 0) { direct = true; }
        if (checkItem === void 0) { checkItem = function () { return true; }; }
        if (!this.haveItems(id)) {
            return;
        }
        for (var i = 0; i < this._childs[id].length; i++) {
            cb.call(this, this._childs[id][i], i);
            if (direct && checkItem(this._childs[id][i])) {
                this.eachChild(this._childs[id][i].id, cb, direct, checkItem);
            }
        }
    };
    TreeCollection.prototype.getNearId = function (id) {
        return id; // for selection
    };
    TreeCollection.prototype.loadItems = function (id, driver) {
        var _this = this;
        if (driver === void 0) { driver = "json"; }
        var url = this.config.autoload + "?id=" + id;
        var proxy = new dataproxy_1.DataProxy(url);
        proxy.load().then(function (data) {
            driver = helpers_1.toDataDriver(driver);
            data = driver.toJsonArray(data);
            _this._parse_data(data, id);
            _this.events.fire(types_1.DataEvents.change);
        });
    };
    TreeCollection.prototype.refreshItems = function (id, driver) {
        if (driver === void 0) { driver = "json"; }
        this.removeAll(id);
        this.loadItems(id, driver);
    };
    TreeCollection.prototype.eachParent = function (id, cb, self) {
        if (self === void 0) { self = false; }
        var item = this.getItem(id);
        if (!item) {
            return;
        }
        if (self) {
            cb.call(this, item);
        }
        if (item.parent === this._root) {
            return;
        }
        var parent = this.getItem(item.parent);
        cb.call(this, parent);
        this.eachParent(item.parent, cb);
    };
    TreeCollection.prototype.haveItems = function (id) {
        return id in this._childs;
    };
    TreeCollection.prototype.canCopy = function (id, target) {
        if (id === target) {
            return false;
        }
        var canCopy = true;
        this.eachParent(target, function (item) { return item.id === id ? canCopy = false : null; }); // locate return string
        return canCopy;
    };
    TreeCollection.prototype.serialize = function (driver, checkItem) {
        if (driver === void 0) { driver = types_1.DataDriver.json; }
        var data = this._serialize(this._root, checkItem);
        var dataDriver = helpers_1.toDataDriver(driver);
        if (dataDriver) {
            return dataDriver.serialize(data);
        }
    };
    TreeCollection.prototype.getId = function (index, parent) {
        if (parent === void 0) { parent = this._root; }
        if (!this._childs[parent] || !this._childs[parent][index]) {
            return;
        }
        return this._childs[parent][index].id;
    };
    TreeCollection.prototype._removeAll = function (id) {
        var _a;
        if (id) {
            var childs = this._childs[id].slice();
            for (var _i = 0, childs_2 = childs; _i < childs_2.length; _i++) {
                var child = childs_2[_i];
                this.remove(child.id);
            }
        }
        else {
            _super.prototype._removeAll.call(this);
            var root = this._root;
            this._initChilds = null;
            this._childs = (_a = {}, _a[root] = [], _a);
        }
    };
    TreeCollection.prototype._removeCore = function (id) {
        if (this._pull[id]) {
            var parent_2 = this.getParent(id);
            this._childs[parent_2] = this._childs[parent_2].filter(function (item) { return item.id !== id; });
            if (parent_2 !== this._root && !this._childs[parent_2].length) {
                delete this._childs[parent_2];
            }
            if (this._initChilds && this._initChilds[parent_2]) {
                this._initChilds[parent_2] = this._initChilds[parent_2].filter(function (item) { return item.id !== id; });
                if (parent_2 !== this._root && !this._initChilds[parent_2].length) {
                    delete this._initChilds[parent_2];
                }
            }
            this._fastDeleteChilds(this._childs, id);
            if (this._initChilds) {
                this._fastDeleteChilds(this._initChilds, id);
            }
        }
    };
    TreeCollection.prototype._addToOrder = function (_order, obj, index) {
        var childs = this._childs;
        var initChilds = this._initChilds;
        var parent = obj.parent;
        this._pull[obj.id] = obj;
        addToOrder(childs, obj, parent, index);
        if (initChilds) {
            addToOrder(initChilds, obj, parent, index);
        }
    };
    TreeCollection.prototype._parse_data = function (data, parent) {
        if (parent === void 0) { parent = this._root; }
        for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
            var obj = data_1[_i];
            if (this.config.init) {
                obj = this.config.init(obj);
            }
            if (typeof obj !== "object") {
                obj = {
                    value: obj
                };
            }
            obj.id = obj.id ? obj.id.toString() : core_1.uid();
            obj.parent = obj.parent ? obj.parent.toString() : parent;
            this._pull[obj.id] = obj;
            if (!this._childs[obj.parent]) {
                this._childs[obj.parent] = [];
            }
            this._childs[obj.parent].push(obj);
            if (obj.items && obj.items instanceof Object) {
                this._parse_data(obj.items, obj.id);
            }
        }
    };
    TreeCollection.prototype._fastDeleteChilds = function (target, id) {
        if (this._pull[id]) {
            delete this._pull[id];
        }
        if (!target[id]) {
            return;
        }
        for (var i = 0; i < target[id].length; i++) {
            this._fastDeleteChilds(target, target[id][i].id);
        }
        delete target[id];
    };
    TreeCollection.prototype._recursiveFilter = function (rule, config, current, level, newChilds) {
        var _this = this;
        var childs = this._childs[current];
        if (!childs) {
            return;
        }
        var condition = function (item) {
            switch (config.type) {
                case types_1.TreeFilterType.all: {
                    return true;
                }
                case types_1.TreeFilterType.level: {
                    return level === config.level;
                }
                case types_1.TreeFilterType.leafs: {
                    return !_this.haveItems(item.id);
                }
            }
        };
        if (typeof rule === "function") {
            var customRule = function (item) { return !condition(item) || rule(item); };
            var filtered = childs.filter(customRule);
            if (filtered.length) {
                newChilds[current] = filtered;
            }
        }
        else if (rule.by && rule.match) {
            var customRule = function (item) { return !condition(item) || item[rule.by].toString().toLowerCase().indexOf(rule.match.toString().toLowerCase()) !== -1; };
            newChilds[current] = childs.filter(customRule);
        }
        for (var _i = 0, childs_3 = childs; _i < childs_3.length; _i++) {
            var child = childs_3[_i];
            this._recursiveFilter(rule, config, child.id, level + 1, newChilds);
        }
    };
    TreeCollection.prototype._serialize = function (parent, fn) {
        var _this = this;
        if (parent === void 0) { parent = this._root; }
        return this.map(function (item) {
            var itemCopy = {};
            for (var key in item) {
                if (key === "parent" || key === "items") {
                    continue;
                }
                itemCopy[key] = item[key];
            }
            if (fn) {
                itemCopy = fn(itemCopy);
            }
            if (_this.haveItems(item.id)) {
                itemCopy.items = _this._serialize(item.id, fn);
            }
            return itemCopy;
        }, parent, false);
    };
    return TreeCollection;
}(datacollection_1.DataCollection));
exports.TreeCollection = TreeCollection;


/***/ }),

/***/ "../ts-data/sources/types.ts":
/*!***********************************!*\
  !*** ../ts-data/sources/types.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var TreeFilterType;
(function (TreeFilterType) {
    TreeFilterType["all"] = "all";
    TreeFilterType["level"] = "level";
    TreeFilterType["leafs"] = "leafs";
})(TreeFilterType = exports.TreeFilterType || (exports.TreeFilterType = {}));
var DropPosition;
(function (DropPosition) {
    DropPosition["top"] = "top";
    DropPosition["bot"] = "bot";
    DropPosition["in"] = "in";
})(DropPosition = exports.DropPosition || (exports.DropPosition = {}));
var DataEvents;
(function (DataEvents) {
    DataEvents["afterAdd"] = "afteradd";
    DataEvents["beforeAdd"] = "beforeadd";
    DataEvents["removeAll"] = "removeall";
    DataEvents["beforeRemove"] = "beforeremove";
    DataEvents["afterRemove"] = "afterremove";
    DataEvents["change"] = "change";
    DataEvents["load"] = "load";
    DataEvents["loadError"] = "loaderror";
})(DataEvents = exports.DataEvents || (exports.DataEvents = {}));
var DragEvents;
(function (DragEvents) {
    DragEvents["beforeDrag"] = "beforedrag";
    DragEvents["beforeDrop"] = "beforeDrop";
    DragEvents["dragStart"] = "dragstart";
    DragEvents["dragEnd"] = "dragend";
    DragEvents["canDrop"] = "candrop";
    DragEvents["cancelDrop"] = "canceldrop";
    DragEvents["dropComplete"] = "dropcomplete";
    DragEvents["dragOut"] = "dragOut";
    DragEvents["dragIn"] = "dragIn"; // fire on source
})(DragEvents = exports.DragEvents || (exports.DragEvents = {}));
var DragMode;
(function (DragMode) {
    DragMode["target"] = "target";
    DragMode["both"] = "both";
    DragMode["source"] = "source";
})(DragMode = exports.DragMode || (exports.DragMode = {}));
var DropBehaviour;
(function (DropBehaviour) {
    DropBehaviour["child"] = "child";
    DropBehaviour["sibling"] = "sibling";
    DropBehaviour["complex"] = "complex";
})(DropBehaviour = exports.DropBehaviour || (exports.DropBehaviour = {}));
var DataDriver;
(function (DataDriver) {
    DataDriver["json"] = "json";
    DataDriver["csv"] = "csv";
    DataDriver["xml"] = "xml";
})(DataDriver = exports.DataDriver || (exports.DataDriver = {}));


/***/ }),

/***/ "../ts-menu/sources/ContextMenu.ts":
/*!*****************************************!*\
  !*** ../ts-menu/sources/ContextMenu.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var html_1 = __webpack_require__(/*! @dhx/ts-common/html */ "../ts-common/html.ts");
var ts_navbar_1 = __webpack_require__(/*! @dhx/ts-navbar */ "../ts-navbar/index.ts");
var ContextMenu = /** @class */ (function (_super) {
    __extends(ContextMenu, _super);
    function ContextMenu() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._isContextMenu = true;
        return _this;
    }
    ContextMenu.prototype.showAt = function (elem, showAt) {
        if (showAt === void 0) { showAt = "bottom"; }
        if (elem instanceof MouseEvent) {
            this._changeActivePosition({
                left: window.pageXOffset + elem.x + 1,
                right: window.pageXOffset + elem.x + 1,
                top: window.pageYOffset + elem.y,
                bottom: window.pageYOffset + elem.y
            }, showAt);
        }
        else {
            var node = html_1.toNode(elem);
            this._changeActivePosition(html_1.getRealPosition(node), showAt);
        }
    };
    ContextMenu.prototype._getFactory = function () {
        return ts_navbar_1.createFactory({
            widget: this,
            defaultType: ts_navbar_1.ItemType.menuItem,
            allowedTypes: [ts_navbar_1.ItemType.menuItem, ts_navbar_1.ItemType.separator, ts_navbar_1.ItemType.spacer],
            widgetName: "context-menu"
        });
    };
    ContextMenu.prototype._close = function () {
        _super.prototype._close.call(this);
        this._activeMenu = null;
        this._changeActivePosition(null, null);
    };
    ContextMenu.prototype._getMode = function (_item, _root, active) {
        return active ? this._mode : "right";
    };
    ContextMenu.prototype._changeActivePosition = function (position, mode) {
        this._activePosition = position;
        this._mode = mode;
        this._listenOuterClick();
        this.paint();
    };
    return ContextMenu;
}(ts_navbar_1.Navbar));
exports.ContextMenu = ContextMenu;


/***/ }),

/***/ "../ts-menu/sources/Menu.ts":
/*!**********************************!*\
  !*** ../ts-menu/sources/Menu.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var dom_1 = __webpack_require__(/*! @dhx/ts-common/dom */ "../ts-common/dom.ts");
var ts_navbar_1 = __webpack_require__(/*! @dhx/ts-navbar */ "../ts-navbar/index.ts");
var Menu = /** @class */ (function (_super) {
    __extends(Menu, _super);
    function Menu(element, config) {
        var _this = _super.call(this, element, config) || this;
        var render = function () { return _this._draw(); };
        _this.mount(element, dom_1.create({ render: render }));
        return _this;
    }
    Menu.prototype._getFactory = function () {
        return ts_navbar_1.createFactory({
            widget: this,
            defaultType: ts_navbar_1.ItemType.menuItem,
            allowedTypes: [ts_navbar_1.ItemType.menuItem, ts_navbar_1.ItemType.separator, ts_navbar_1.ItemType.spacer],
            widgetName: "menu-nav"
        });
    };
    Menu.prototype._draw = function () {
        return dom_1.el("ul.dhx_widget", {
            dhx_widget_id: this._uid,
            onmousemove: this._handlers.onmousemove,
            onmouseleave: this._handlers.onmouseleave,
            onclick: this._handlers.onclick,
            onmousedown: this._handlers.onmousedown,
            class: "dhx_menu-nav " + (this.config.css ? this.config.css : "")
        }, this._drawMenuItems(this.data.getRoot(), false));
    };
    return Menu;
}(ts_navbar_1.Navbar));
exports.Menu = Menu;


/***/ }),

/***/ "../ts-menu/sources/entry.ts":
/*!***********************************!*\
  !*** ../ts-menu/sources/entry.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(/*! ../../styles/toolbar.scss */ "../styles/toolbar.scss");
var ts_data_1 = __webpack_require__(/*! @dhx/ts-data */ "../ts-data/index.ts");
exports.TreeCollection = ts_data_1.TreeCollection;
var ContextMenu_1 = __webpack_require__(/*! ./ContextMenu */ "../ts-menu/sources/ContextMenu.ts");
exports.ContextMenu = ContextMenu_1.ContextMenu;
var Menu_1 = __webpack_require__(/*! ./Menu */ "../ts-menu/sources/Menu.ts");
exports.Menu = Menu_1.Menu;


/***/ }),

/***/ "../ts-navbar/index.ts":
/*!*****************************!*\
  !*** ../ts-navbar/index.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(/*! ./sources/Navbar */ "../ts-navbar/sources/Navbar.ts"));
__export(__webpack_require__(/*! ./sources/itemfactory */ "../ts-navbar/sources/itemfactory.ts"));
__export(__webpack_require__(/*! ./sources/types */ "../ts-navbar/sources/types.ts"));


/***/ }),

/***/ "../ts-navbar/sources/Navbar.ts":
/*!**************************************!*\
  !*** ../ts-navbar/sources/Navbar.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @dhx/ts-common/core */ "../ts-common/core.ts");
var dom_1 = __webpack_require__(/*! @dhx/ts-common/dom */ "../ts-common/dom.ts");
var events_1 = __webpack_require__(/*! @dhx/ts-common/events */ "../ts-common/events.ts");
var html_1 = __webpack_require__(/*! @dhx/ts-common/html */ "../ts-common/html.ts");
var Keymanager_1 = __webpack_require__(/*! @dhx/ts-common/Keymanager */ "../ts-common/Keymanager.ts");
var view_1 = __webpack_require__(/*! @dhx/ts-common/view */ "../ts-common/view.ts");
var ts_data_1 = __webpack_require__(/*! @dhx/ts-data */ "../ts-data/index.ts");
var types_1 = __webpack_require__(/*! ./types */ "../ts-navbar/sources/types.ts");
var Navbar = /** @class */ (function (_super) {
    __extends(Navbar, _super);
    function Navbar(element, config) {
        var _this = _super.call(this, element, core_1.extend({}, config)) || this;
        _this._isContextMenu = false;
        _this._documentHaveListener = false;
        _this._rootItem = {};
        if (Array.isArray(_this.config.data)) {
            _this.events = new events_1.EventSystem(_this);
            _this.data = new ts_data_1.TreeCollection({}, _this.events);
        }
        else if (_this.config.data && _this.config.data.events) {
            _this.data = _this.config.data;
            _this.events = _this.data.events;
            _this.events.context = _this;
        }
        else {
            _this.events = new events_1.EventSystem(_this);
            _this.data = new ts_data_1.TreeCollection({}, _this.events);
        }
        _this._documentClick = function (e) {
            if (html_1.locate(e, "dhx_widget_id") !== _this._uid && _this._documentHaveListener) {
                document.removeEventListener("click", _this._documentClick);
                _this._documentHaveListener = false;
                _this._close();
            }
        };
        _this._currentRoot = _this.data.getRoot();
        _this._factory = _this._getFactory();
        _this._initHandlers();
        _this._init();
        _this._initEvents();
        if (Array.isArray(_this.config.data)) {
            _this.data.parse(_this.config.data);
        }
        return _this;
    }
    Navbar.prototype.paint = function () {
        _super.prototype.paint.call(this);
        this._vpopups.redraw();
    };
    Navbar.prototype.disable = function (ids) {
        this._setProp(ids, "disabled", true);
    };
    Navbar.prototype.enable = function (ids) {
        this._setProp(ids, "disabled", false);
    };
    Navbar.prototype.show = function (ids) {
        this._setProp(ids, "hidden", false);
    };
    Navbar.prototype.hide = function (ids) {
        this._setProp(ids, "hidden", true);
    };
    Navbar.prototype.destructor = function () {
        this.unmount();
        Keymanager_1.keyManager.removeHotKey(null, this);
        this._vpopups.unmount();
    };
    Navbar.prototype._customHandlers = function () {
        return {};
    };
    Navbar.prototype._close = function () {
        var _this = this;
        if (this._activeParents) {
            this._activeParents.forEach(function (parentId) { return _this.data.exists(parentId) && _this.data.update(parentId, { $activeParent: false }); });
        }
        if (this.config.navigationType === types_1.NavigationType.click) {
            this._isActive = false;
        }
        clearTimeout(this._currentTimeout);
        this._activeMenu = null;
        this.paint();
    };
    Navbar.prototype._init = function () {
        var _this = this;
        var render = function () { return dom_1.el("div", {
            dhx_widget_id: _this._uid,
            class: "dhx_" + (_this._isContextMenu ? " dhx_context-menu" : ""),
            onmousemove: _this._handlers.onmousemove,
            onmouseleave: _this._handlers.onmouseleave,
            onclick: _this._handlers.onclick,
            onmousedown: _this._handlers.onmousedown
        }, _this._drawPopups()); };
        this._vpopups = dom_1.create({
            render: render
        });
        this._vpopups.mount(document.body);
    };
    Navbar.prototype._initHandlers = function () {
        var _this = this;
        /*
            for navigation type click:
            first click open menu, _isActive = true
            after navigation use mousemove
            can be closed after outer click or menu leaf item click
        */
        this._isActive = this.config.navigationType !== types_1.NavigationType.click;
        this._handlers = __assign({ onmousemove: function (e) {
                if (!_this._isActive) {
                    return;
                }
                var elem = html_1.locateNode(e);
                if (!elem) {
                    return;
                }
                var id = elem.getAttribute("dhx_id");
                if (_this._activeMenu !== id) {
                    _this._activeMenu = id;
                    if (_this.data.haveItems(id)) {
                        var position = html_1.getRealPosition(elem);
                        _this.data.update(id, { $position: position }, false);
                    }
                    _this._activeItemChange(id);
                }
            }, onmouseleave: function () {
                if (_this.config.navigationType !== types_1.NavigationType.click) { // maybe all time when mouse leave close menu
                    _this._activeItemChange(null);
                }
            }, onclick: function (e) {
                var element = html_1.locateNode(e);
                if (!element) {
                    return;
                }
                var id = element.getAttribute("dhx_id");
                var item = _this.data.getItem(id);
                if (item.multiClick) {
                    return;
                }
                if (_this.data.haveItems(id)) {
                    if (id === _this._currentRoot) {
                        _this._close();
                        return;
                    }
                    if (!_this._isActive) {
                        _this._isActive = true;
                    }
                    _this._setRoot(id);
                    _this._activeMenu = id;
                    var position = html_1.getRealPosition(element);
                    _this.data.update(id, { $position: position }, false);
                    _this._activeItemChange(id);
                }
                else {
                    switch (item.type) {
                        case types_1.ItemType.input:
                        case types_1.ItemType.title:
                            break;
                        case types_1.ItemType.menuItem:
                        case types_1.ItemType.selectButton:
                            _this._onMenuItemClick(id, e);
                            break;
                        case types_1.ItemType.imageButton:
                        case types_1.ItemType.button:
                        case types_1.ItemType.customHTMLButton:
                        case types_1.ItemType.navItem:
                            if (item.twoState) {
                                _this.data.update(item.id, { active: !item.active });
                            }
                            _this.events.fire(types_1.NavigationBarEvents.click, [id, e]);
                        // missed break for trigger close
                        default:
                            _this._close();
                    }
                }
            }, onmousedown: function (e) {
                var element = html_1.locateNode(e);
                if (!element) {
                    return;
                }
                var id = element.getAttribute("dhx_id");
                var item = _this.data.getItem(id);
                if (!item.multiClick) {
                    return;
                }
                var fireTime = 365;
                var timeout;
                var fireAction = function () {
                    _this.events.fire(types_1.NavigationBarEvents.click, [id, e]);
                    if (fireTime > 50) {
                        fireTime -= 55;
                    }
                    timeout = setTimeout(fireAction, fireTime);
                };
                var mouseup = function () {
                    clearTimeout(timeout);
                    document.removeEventListener("mouseup", mouseup);
                };
                fireAction();
                document.addEventListener("mouseup", mouseup);
            } }, this._customHandlers());
    };
    Navbar.prototype._initEvents = function () {
        var _this = this;
        var timeout = null;
        this.data.events.on(types_1.DataEvents.change, function () {
            _this.paint();
            if (timeout) {
                clearTimeout(timeout);
            }
            timeout = setTimeout(function () {
                var groups = {};
                _this.data.eachChild(_this.data.getRoot(), function (item) {
                    if (item.group) {
                        item.twoState = true;
                        addInGroups(groups, item);
                    }
                }, true);
                _this._groups = groups;
                _this._resetHotkeys();
                timeout = null;
                _this.paint();
            }, 100);
        });
        this.events.on(types_1.NavigationBarEvents.click, function (id) {
            var item = _this.data.getItem(id);
            var parent = _this.data.getItem(item.parent);
            if (parent && parent.type === types_1.ItemType.selectButton) {
                _this.data.update(item.parent, { value: item.value, icon: item.icon });
            }
            if (item.group) {
                var group = _this._groups[item.group];
                if (group.active) {
                    _this.data.update(group.active, { active: false });
                }
                group.active = item.id;
                _this.data.update(item.id, { active: true });
            }
        });
        this._customInitEvents();
    };
    Navbar.prototype._getMode = function (item, root, _active) {
        if (_active === void 0) { _active = false; }
        return item.parent === root ? "bottom" : "right";
    };
    Navbar.prototype._drawMenuItems = function (id, asMenuItem) {
        var _this = this;
        if (asMenuItem === void 0) { asMenuItem = true; }
        return this.data.map(function (item) { return _this._factory(item, asMenuItem); }, id, false);
    };
    Navbar.prototype._setRoot = function (_id) {
        return; // need only for toolbar
    };
    Navbar.prototype._getParents = function (id, root) {
        var parentIds = [];
        var afterRoot = false;
        var currentItem = this.data.getItem(id);
        var disabled = currentItem && currentItem.disabled;
        this.data.eachParent(id, function (item) {
            if (item.id === root) {
                parentIds.push(item.id);
                afterRoot = true;
            }
            else if (!afterRoot) {
                parentIds.push(item.id);
            }
        }, !disabled);
        if (this._isContextMenu && this._activePosition) {
            parentIds.push(root);
        }
        return parentIds;
    };
    Navbar.prototype._listenOuterClick = function () {
        if (this._documentHaveListener) {
            return;
        }
        document.addEventListener("click", this._documentClick, true);
        this._documentHaveListener = true;
    };
    Navbar.prototype._customInitEvents = function () {
        return;
    };
    Navbar.prototype._drawPopups = function () {
        var _this = this;
        var id = this._activeMenu;
        if (!this._isContextMenu && !id) {
            return null;
        }
        var root = this._currentRoot;
        if (this._isContextMenu && !this._activePosition) {
            return null;
        }
        var parentIds = this._getParents(id, root);
        this._activeParents = parentIds;
        parentIds.forEach(function (parentId) { return _this.data.exists(parentId) && _this.data.update(parentId, { $activeParent: true }, false); });
        return parentIds.map(function (itemId) {
            if (!_this.data.haveItems(itemId)) {
                return null;
            }
            var item = _this.data.getItem(itemId) || _this._rootItem; // for root item
            return dom_1.el("ul", {
                class: "dhx_widget dhx_menu" + (_this.config.menuCss ? " " + _this.config.menuCss : ""),
                _key: itemId,
                _hooks: {
                    didInsert: function (vnode) {
                        var _a = vnode.el.getBoundingClientRect(), width = _a.width, height = _a.height;
                        var position = _this._isContextMenu && _this._activePosition && itemId === root ? _this._activePosition : item.$position;
                        var mode = _this._getMode(item, root, position === _this._activePosition);
                        var style = html_1.calculatePosition(position, { mode: mode, width: width, height: height });
                        item.$style = style;
                        vnode.patch({ style: style });
                    },
                    didRecycle: function (_, vnode) {
                        if (_this._isContextMenu && _this._activePosition && itemId === root) {
                            var _a = vnode.el.getBoundingClientRect(), width = _a.width, height = _a.height;
                            var style = html_1.calculatePosition(_this._activePosition, { mode: _this._getMode(item, root, true), width: width, height: height });
                            item.$style = style;
                            vnode.patch({ style: style });
                        }
                    }
                },
                tabindex: 0,
                style: item.$style || {
                    position: "absolute"
                }
            }, _this._drawMenuItems(itemId));
        }).reverse();
    };
    Navbar.prototype._onMenuItemClick = function (id, e) {
        var item = this.data.getItem(id);
        if (item.disabled) {
            return;
        }
        if (item.twoState) {
            this.data.update(item.id, { active: !item.active });
        }
        this.events.fire(types_1.NavigationBarEvents.click, [id, e]);
        this._close();
    };
    Navbar.prototype._activeItemChange = function (id) {
        var _this = this;
        if (this._activeParents) {
            var parentIds_1 = this._getParents(id, this._currentRoot);
            this._activeParents.forEach(function (parentId) {
                if (_this.data.exists(parentId) && parentIds_1.indexOf(parentId) === -1) {
                    _this.data.update(parentId, { $activeParent: false }, false);
                }
            });
        }
        if (id && !this._documentHaveListener) {
            this._listenOuterClick();
        }
        if (id && this.data.haveItems(id)) {
            this.events.fire(types_1.NavigationBarEvents.openMenu, [id]);
            this._activeMenu = id;
            clearTimeout(this._currentTimeout);
            this.paint();
        }
        else {
            this._activeMenu = id;
            clearTimeout(this._currentTimeout);
            this._currentTimeout = setTimeout(function () { return _this.paint(); }, 400);
        }
    };
    Navbar.prototype._resetHotkeys = function () {
        var _this = this;
        Keymanager_1.keyManager.removeHotKey(null, this);
        this.data.map(function (item) {
            if (item.hotkey) {
                Keymanager_1.keyManager.addHotKey(item.hotkey, function () { return _this._onMenuItemClick(item.id, null); }, _this);
            }
        });
    };
    Navbar.prototype._setProp = function (id, key, value) {
        var _this = this;
        var _a;
        if (Array.isArray(id)) {
            id.forEach(function (itemId) {
                var _a;
                return _this.data.update(itemId, (_a = {}, _a[key] = value, _a));
            });
        }
        else {
            this.data.update(id, (_a = {}, _a[key] = value, _a));
        }
    };
    return Navbar;
}(view_1.View));
exports.Navbar = Navbar;
function addInGroups(groups, item) {
    if (groups[item.group]) {
        if (item.active) {
            groups[item.group].active = item.id;
        }
        groups[item.group].elements.push(item.id);
    }
    else {
        groups[item.group] = {
            active: item.active ? item.id : null,
            elements: [item.id]
        };
    }
}


/***/ }),

/***/ "../ts-navbar/sources/elements/button.ts":
/*!***********************************************!*\
  !*** ../ts-navbar/sources/elements/button.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var dom_1 = __webpack_require__(/*! @dhx/ts-common/dom */ "../ts-common/dom.ts");
var helpers_1 = __webpack_require__(/*! ./helpers */ "../ts-navbar/sources/elements/helpers.ts");
function button(item, widgetName) {
    var isIconButton = item.icon && !item.value;
    var counterClass = isIconButton ? " dhx_navbar-count--absolute" : " dhx_navbar-count--button-inline";
    return dom_1.el("button.dhx_button", {
        class: helpers_1.getNavbarButtonCSS(item, widgetName),
        dhx_id: item.id,
        disabled: item.disabled
    }, [
        item.icon ? helpers_1.getIcon(item.icon, "button") : null,
        item.value && dom_1.el("span.dhx_button__text", item.value),
        item.count > 0 && helpers_1.getCount(item, counterClass, isIconButton),
        item.value && item.$openIcon ? dom_1.el("span.dhx_button__icon.dhx_button__icon--menu.dxi.dxi-menu-right") : null,
        item.loading && dom_1.el("span.dhx_button__loading", [
            dom_1.el("span.dhx_button__loading-icon.dxi.dxi-loading")
        ])
    ]);
}
exports.button = button;


/***/ }),

/***/ "../ts-navbar/sources/elements/customHTMLButton.ts":
/*!*********************************************************!*\
  !*** ../ts-navbar/sources/elements/customHTMLButton.ts ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var dom_1 = __webpack_require__(/*! @dhx/ts-common/dom */ "../ts-common/dom.ts");
function customHTMLButton(item, widgetName) {
    return dom_1.el("button", {
        "dhx_id": item.id,
        ".innerHTML": item.html
    }, item.html ? "" : item.value);
}
exports.customHTMLButton = customHTMLButton;


/***/ }),

/***/ "../ts-navbar/sources/elements/helpers.ts":
/*!************************************************!*\
  !*** ../ts-navbar/sources/elements/helpers.ts ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var dom_1 = __webpack_require__(/*! @dhx/ts-common/dom */ "../ts-common/dom.ts");
var types_1 = __webpack_require__(/*! ../types */ "../ts-navbar/sources/types.ts");
function getCount(item, widgetClass, isLimited) {
    var countColor = {
        danger: " dhx_navbar-count--color_danger",
        secondary: " dhx_navbar-count--color_secondary",
        primary: " dhx_navbar-count--color_primary",
        success: " dhx_navbar-count--color_success",
    }[item.countColor] || " dhx_navbar-count--color_danger";
    return dom_1.el(".dhx_navbar-count", {
        class: widgetClass + countColor + (!isLimited && parseInt(item.count, 10) > 99 ? " dhx_navbar-count--overlimit" : ""),
    }, isLimited && parseInt(item.count, 10) > 99 ? "99+" : item.count);
}
exports.getCount = getCount;
function getIcon(iconName, type) {
    if (iconName === void 0) { iconName = ""; }
    if (iconName.slice(0, 3) === "dxi") {
        iconName = "dxi " + iconName;
    }
    return dom_1.el("span", {
        class: "dhx_" + type + "__icon " + iconName
    });
}
exports.getIcon = getIcon;
function navbarComponentMixin(widgetName, item, asMenuItem, body) {
    var itemClass = getNavbarItemClass(widgetName, item, asMenuItem);
    var hasRibbonSize = widgetName === "ribbon" && (item.type === types_1.ItemType.navItem || item.type === types_1.ItemType.imageButton);
    return dom_1.el("li", {
        _key: item.id,
        class: itemClass +
            (item.icon && !item.value && hasRibbonSize ? " dhx_ribbon__item--icon" : "") +
            (item.src && !item.value && hasRibbonSize ? " dhx_ribbon__item--icon" : "") +
            (item.size && hasRibbonSize ? " dhx_ribbon__item--" + item.size : ""),
    }, [
        body
    ]);
}
exports.navbarComponentMixin = navbarComponentMixin;
function getNavbarButtonCSS(_a, widgetName) {
    var color = _a.color, size = _a.size, view = _a.view, full = _a.full, icon = _a.icon, circle = _a.circle, loading = _a.loading, value = _a.value, active = _a.active;
    var colorsCss = {
        danger: " dhx_button--color_danger",
        secondary: " dhx_button--color_secondary",
        primary: " dhx_button--color_primary",
        success: " dhx_button--color_success",
    }[color] || " dhx_button--color_primary";
    var sizeCss = {
        small: " dhx_button--size_small",
        medium: " dhx_button--size_medium",
    }[size] || " dhx_button--size_medium";
    var viewCss = {
        flat: " dhx_button--view_flat",
        link: " dhx_button--view_link",
    }[view] || " dhx_button--view_flat";
    var fullCss = full ? " dhx_button--width_full" : "";
    var circleCss = circle ? " dhx_button--circle" : "";
    var loadingCss = loading ? " dhx_button--loading" : "";
    var iconViewCss = icon && !value ? " dhx_button--icon" : "";
    var activeCss = active ? " dhx_button--active" : "";
    return colorsCss + sizeCss + viewCss + fullCss + circleCss + loadingCss + activeCss + iconViewCss;
}
exports.getNavbarButtonCSS = getNavbarButtonCSS;
var getNavbarItemClass = function (widgetName, item, asMenuItem) {
    var baseClassName = "";
    var resultClassName = "";
    if (asMenuItem) {
        baseClassName = "dhx_menu-item";
    }
    else {
        baseClassName = "dhx_" + widgetName + "__item";
    }
    resultClassName = baseClassName + (item.css ? " " + item.css : "");
    if (item.type === types_1.ItemType.spacer || item.type === types_1.ItemType.separator) {
        resultClassName += " " + baseClassName + "--" + item.type;
    }
    if (item.type === "button" && widgetName === "sidebar" && !item.icon) {
        resultClassName += " dhx_navbar-item--colapse_hidden";
    }
    return resultClassName;
};


/***/ }),

/***/ "../ts-navbar/sources/elements/imageButton.ts":
/*!****************************************************!*\
  !*** ../ts-navbar/sources/elements/imageButton.ts ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var dom_1 = __webpack_require__(/*! @dhx/ts-common/dom */ "../ts-common/dom.ts");
var helpers_1 = __webpack_require__(/*! ./helpers */ "../ts-navbar/sources/elements/helpers.ts");
function imageButton(item, widgetName) {
    var baseClass = "dhx_" + widgetName + "-button-image";
    var isRibbon = widgetName === "ribbon";
    return dom_1.el("button.dhx_button", {
        class: baseClass + (item.size ? " " + baseClass + "--" + item.size : "") +
            (!item.value && item.src ? " " + baseClass + "--icon" : "") +
            (isRibbon && item.$openIcon ? " " + baseClass + "--select" : "") +
            (item.active ? " " + baseClass + "--active" : ""),
        dhx_id: item.id,
    }, [
        isRibbon && item.value && item.$openIcon && dom_1.el("span.dxi.dxi-menu-right", {
            class: baseClass + "__caret"
        }),
        item.value && dom_1.el("span", {
            class: baseClass + "__text",
        }, item.value),
        item.src && dom_1.el("span", {
            class: baseClass + "__image",
            style: { backgroundImage: "url(" + item.src + ")" }
        }),
        item.count > 0 && helpers_1.getCount(item, baseClass + "__count", true),
    ]);
}
exports.imageButton = imageButton;


/***/ }),

/***/ "../ts-navbar/sources/elements/input.ts":
/*!**********************************************!*\
  !*** ../ts-navbar/sources/elements/input.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var dom_1 = __webpack_require__(/*! @dhx/ts-common/dom */ "../ts-common/dom.ts");
var types_1 = __webpack_require__(/*! ../types */ "../ts-navbar/sources/types.ts");
function onBlur(events, id) {
    events.fire(types_1.NavigationBarEvents.inputBlur, [id]);
}
function onFocus(events, id) {
    events.fire(types_1.NavigationBarEvents.inputFocus, [id]);
}
function input(item, events, widgetName) {
    return dom_1.el(".dhx_form-group.dhx_form-group--no-message-holder.dhx_form-group--label_sr" + (".dhx_" + widgetName + "__input"), {
        style: {
            width: item.width ? item.width : "200px"
        },
    }, [
        dom_1.el("label.dhx_label", { for: item.id }, item.label),
        dom_1.el(".dhx_input__wrapper", [
            dom_1.el("input.dhx_input", {
                placeholder: item.placeholder,
                class: item.icon ? "dhx_input--icon-padding" : "",
                value: item.value,
                onblur: [onBlur, events, item.id],
                onfocus: [onFocus, events, item.id],
                dhx_id: item.id,
                _hooks: {
                    didInsert: function (node) {
                        if (events) {
                            events.fire(types_1.NavigationBarEvents.inputCreated, [item.id, node.el]);
                        }
                    }
                },
                _key: item.id
            }),
            item.icon ? dom_1.el(".dhx_input__icon", {
                class: item.icon
            }) : null,
        ])
    ]);
}
exports.input = input;


/***/ }),

/***/ "../ts-navbar/sources/elements/menuItem.ts":
/*!*************************************************!*\
  !*** ../ts-navbar/sources/elements/menuItem.ts ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var dom_1 = __webpack_require__(/*! @dhx/ts-common/dom */ "../ts-common/dom.ts");
var helpers_1 = __webpack_require__(/*! ./helpers */ "../ts-navbar/sources/elements/helpers.ts");
function menuItem(item, widgetName, asMenuItem) {
    var baseClass = asMenuItem ? " dhx_menu-button" : " dhx_nav-menu-button";
    return dom_1.el("button", {
        class: "dhx_button" + baseClass +
            (item.disabled ? baseClass + "--disabled" : "") +
            (item.$activeParent ? baseClass + "--active" : ""),
        disabled: item.disabled,
        dhx_id: item.id,
    }, asMenuItem ? [
        item.icon || item.value ? dom_1.el("span.dhx_menu-button__block.dhx_menu-button__block--left", [
            item.icon && dom_1.el("span.dhx_menu-button__icon", {
                class: item.icon
            }),
            item.value && dom_1.el("span.dhx_menu-button__text", item.value),
        ]) : null,
        (item.count > 0 || item.hotkey || item.items) ? dom_1.el("span.dhx_menu-button__block.dhx_menu-button__block--right", [
            item.count > 0 && helpers_1.getCount(item, " dhx_menu-button__count", false),
            item.hotkey && dom_1.el("span.dhx_menu-button__hotkey", item.hotkey),
            item.items && dom_1.el("span.dhx_menu-button__caret.dxi.dxi-menu-right"),
        ]) : null
    ] : [
        item.value && dom_1.el("span.dhx_nav-menu-button__text", item.value),
    ]);
}
exports.menuItem = menuItem;


/***/ }),

/***/ "../ts-navbar/sources/elements/navItem.ts":
/*!************************************************!*\
  !*** ../ts-navbar/sources/elements/navItem.ts ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var dom_1 = __webpack_require__(/*! @dhx/ts-common/dom */ "../ts-common/dom.ts");
var helpers_1 = __webpack_require__(/*! ./helpers */ "../ts-navbar/sources/elements/helpers.ts");
function navItem(item, widgetName, collapsed) {
    var baseClass = " dhx_" + widgetName + "-button";
    return dom_1.el("button", {
        class: "dhx_button" + baseClass +
            (item.active || item.$activeParent ? baseClass + "--active" : "") +
            (item.disabled ? baseClass + "--disabled" : "") +
            (item.$openIcon ? baseClass + "--select" : "") +
            (item.circle ? baseClass + "--circle" : "") +
            (item.size ? " " + baseClass + "--" + item.size : "") +
            (!item.value && item.icon ? baseClass + "--icon" : "") +
            (item.css ? " " + item.css : ""),
        dhx_id: item.id,
        disabled: item.disabled
    }, [
        item.icon && dom_1.el("span", {
            class: item.icon + baseClass + "__icon"
        }),
        item.value && dom_1.el("span", {
            class: baseClass.trim() + "__text"
        }, item.value),
        item.count > 0 && helpers_1.getCount(item, baseClass + "__count", collapsed),
        item.value && item.$openIcon && dom_1.el("span.dxi.dxi-menu-right", {
            class: baseClass + "__caret"
        })
    ]);
}
exports.navItem = navItem;


/***/ }),

/***/ "../ts-navbar/sources/elements/separator.ts":
/*!**************************************************!*\
  !*** ../ts-navbar/sources/elements/separator.ts ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function separator(item, widgetName) {
    return null;
}
exports.separator = separator;


/***/ }),

/***/ "../ts-navbar/sources/elements/spacer.ts":
/*!***********************************************!*\
  !*** ../ts-navbar/sources/elements/spacer.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function spacer(_item, widgetName) {
    return null;
}
exports.spacer = spacer;


/***/ }),

/***/ "../ts-navbar/sources/elements/title.ts":
/*!**********************************************!*\
  !*** ../ts-navbar/sources/elements/title.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var dom_1 = __webpack_require__(/*! @dhx/ts-common/dom */ "../ts-common/dom.ts");
function title(item, widgetName) {
    return dom_1.el("span", {
        class: "dhx_navbar-title" + " dhx_navbar-title--" + widgetName,
    }, item.value);
}
exports.title = title;


/***/ }),

/***/ "../ts-navbar/sources/itemfactory.ts":
/*!*******************************************!*\
  !*** ../ts-navbar/sources/itemfactory.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var button_1 = __webpack_require__(/*! ./elements/button */ "../ts-navbar/sources/elements/button.ts");
var navItem_1 = __webpack_require__(/*! ./elements/navItem */ "../ts-navbar/sources/elements/navItem.ts");
var customHTMLButton_1 = __webpack_require__(/*! ./elements/customHTMLButton */ "../ts-navbar/sources/elements/customHTMLButton.ts");
var imageButton_1 = __webpack_require__(/*! ./elements/imageButton */ "../ts-navbar/sources/elements/imageButton.ts");
var input_1 = __webpack_require__(/*! ./elements/input */ "../ts-navbar/sources/elements/input.ts");
var menuItem_1 = __webpack_require__(/*! ./elements/menuItem */ "../ts-navbar/sources/elements/menuItem.ts");
var separator_1 = __webpack_require__(/*! ./elements/separator */ "../ts-navbar/sources/elements/separator.ts");
var spacer_1 = __webpack_require__(/*! ./elements/spacer */ "../ts-navbar/sources/elements/spacer.ts");
var title_1 = __webpack_require__(/*! ./elements/title */ "../ts-navbar/sources/elements/title.ts");
var types_1 = __webpack_require__(/*! ./types */ "../ts-navbar/sources/types.ts");
var helpers_1 = __webpack_require__(/*! ./elements/helpers */ "../ts-navbar/sources/elements/helpers.ts");
function itemfactory(item, events, widgetName, props) {
    switch (item.type) {
        case types_1.ItemType.navItem:
        case types_1.ItemType.selectButton:
            return navItem_1.navItem(item, widgetName, props.collapsed);
        case types_1.ItemType.button:
            return button_1.button(item, widgetName);
        case types_1.ItemType.title:
            return title_1.title(item, widgetName);
        case types_1.ItemType.separator:
            return separator_1.separator(item, widgetName);
        case types_1.ItemType.spacer:
            return spacer_1.spacer(item, widgetName);
        case types_1.ItemType.input:
            return input_1.input(item, events, widgetName);
        case types_1.ItemType.imageButton:
            return imageButton_1.imageButton(item, widgetName);
        case types_1.ItemType.menuItem:
            return menuItem_1.menuItem(item, widgetName, props.asMenuItem);
        case types_1.ItemType.customHTMLButton:
            return customHTMLButton_1.customHTMLButton(item, widgetName);
        case types_1.ItemType.block:
        default:
            throw new Error("unknown item type " + item.type);
    }
}
function createFactory(_a) {
    var defaultType = _a.defaultType, allowedTypes = _a.allowedTypes, widgetName = _a.widgetName, widget = _a.widget;
    var allowedSet = new Set();
    for (var _i = 0, allowedTypes_1 = allowedTypes; _i < allowedTypes_1.length; _i++) {
        var type = allowedTypes_1[_i];
        allowedSet.add(type);
    }
    var config = widget.config, events = widget.events, data = widget.data;
    return function (item, asMenuItem) {
        if (item.hidden) {
            return null;
        }
        if (!item.type || item.type === "button" || item.type === "navItem" || item.type === "menuItem") {
            if (!item.value && !item.icon) {
                return null;
            }
        }
        item.type = item.type || defaultType;
        if (allowedSet && !allowedSet.has(item.type)) {
            item.type = defaultType;
        }
        if (item.type === types_1.ItemType.imageButton && widgetName !== "ribbon") {
            item.active = false;
        }
        if (asMenuItem && item.type !== types_1.ItemType.spacer && item.type !== types_1.ItemType.separator) {
            item.type = types_1.ItemType.menuItem;
        }
        if (data.haveItems(item.id)) {
            normalizeOpenIcon(widgetName, item, data);
        }
        return helpers_1.navbarComponentMixin(widgetName, item, asMenuItem, itemfactory(item, events, widgetName, { asMenuItem: asMenuItem, collapsed: widgetName !== "sidebar" || config.collapsed }));
    };
}
exports.createFactory = createFactory;
function normalizeOpenIcon(widgetName, item, data) {
    switch (widgetName) {
        case "sidebar":
        case "context-menu":
            item.$openIcon = "right";
            break;
        case "toolbar":
            if (item.parent === data.getRoot()) {
                item.$openIcon = "right";
            }
            else {
                item.$openIcon = "bot";
            }
            break;
        case "menu":
            if (item.parent !== this.data.getRoot()) {
                item.$openIcon = "right";
            }
            break;
        case "ribbon":
            var parent_1 = data.getItem(item.parent);
            if (parent_1 && item.type !== types_1.ItemType.block) {
                if (parent_1.type === types_1.ItemType.block) {
                    item.$openIcon = "bot";
                }
                else {
                    item.$openIcon = "right";
                }
            }
            break;
    }
}


/***/ }),

/***/ "../ts-navbar/sources/types.ts":
/*!*************************************!*\
  !*** ../ts-navbar/sources/types.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ts_data_1 = __webpack_require__(/*! @dhx/ts-data */ "../ts-data/index.ts");
exports.DataEvents = ts_data_1.DataEvents;
var ItemType;
(function (ItemType) {
    ItemType["button"] = "button";
    ItemType["imageButton"] = "imageButton";
    ItemType["selectButton"] = "selectButton";
    ItemType["customHTMLButton"] = "customButton";
    ItemType["input"] = "input";
    ItemType["separator"] = "separator";
    ItemType["title"] = "title";
    ItemType["spacer"] = "spacer";
    ItemType["menuItem"] = "menuItem";
    ItemType["block"] = "block";
    ItemType["navItem"] = "navItem";
})(ItemType = exports.ItemType || (exports.ItemType = {}));
var NavigationBarEvents;
(function (NavigationBarEvents) {
    NavigationBarEvents["inputCreated"] = "inputcreated";
    NavigationBarEvents["click"] = "click";
    NavigationBarEvents["openMenu"] = "openmenu";
    NavigationBarEvents["inputFocus"] = "inputfocus";
    NavigationBarEvents["inputBlur"] = "inputblur";
})(NavigationBarEvents = exports.NavigationBarEvents || (exports.NavigationBarEvents = {}));
var NavigationType;
(function (NavigationType) {
    NavigationType["pointer"] = "pointer";
    NavigationType["click"] = "click";
})(NavigationType = exports.NavigationType || (exports.NavigationType = {}));


/***/ })

/******/ });
});if (window.dhx_legacy) { if (window.dhx){ for (var key in dhx) dhx_legacy[key] = dhx[key]; } window.dhx = dhx_legacy; delete window.dhx_legacy; }
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kaHgvd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL2RoeC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9kaHgvLi4vbm9kZV9tb2R1bGVzL2RvbXZtL2Rpc3QvZGV2L2RvbXZtLmRldi5qcyIsIndlYnBhY2s6Ly9kaHgvLi4vbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly9kaHgvLi4vbm9kZV9tb2R1bGVzL3Byb21pei9wcm9taXouanMiLCJ3ZWJwYWNrOi8vZGh4Ly4uL25vZGVfbW9kdWxlcy9zZXRpbW1lZGlhdGUvc2V0SW1tZWRpYXRlLmpzIiwid2VicGFjazovL2RoeC8uLi9ub2RlX21vZHVsZXMvdGltZXJzLWJyb3dzZXJpZnkvbWFpbi5qcyIsIndlYnBhY2s6Ly9kaHgvLi4vbm9kZV9tb2R1bGVzL3dlYnBhY2svYnVpbGRpbi9nbG9iYWwuanMiLCJ3ZWJwYWNrOi8vZGh4Ly4uL3N0eWxlcy90b29sYmFyLnNjc3M/MDc5NCIsIndlYnBhY2s6Ly9kaHgvLi8uLi90cy1jb21tb24vS2V5bWFuYWdlci50cyIsIndlYnBhY2s6Ly9kaHgvLi8uLi90cy1jb21tb24vY29yZS50cyIsIndlYnBhY2s6Ly9kaHgvLi8uLi90cy1jb21tb24vZG9tLnRzIiwid2VicGFjazovL2RoeC8uLy4uL3RzLWNvbW1vbi9ldmVudHMudHMiLCJ3ZWJwYWNrOi8vZGh4Ly4vLi4vdHMtY29tbW9uL2h0bWwudHMiLCJ3ZWJwYWNrOi8vZGh4Ly4vLi4vdHMtY29tbW9uL3BvbHlmaWxscy9tYXRjaGVzLnRzIiwid2VicGFjazovL2RoeC8uLy4uL3RzLWNvbW1vbi90eXBlcy50cyIsIndlYnBhY2s6Ly9kaHgvLi8uLi90cy1jb21tb24vdmlldy50cyIsIndlYnBhY2s6Ly9kaHgvLi8uLi90cy1kYXRhL2luZGV4LnRzIiwid2VicGFjazovL2RoeC8uLy4uL3RzLWRhdGEvc291cmNlcy9Db2xsZWN0aW9uU3RvcmUudHMiLCJ3ZWJwYWNrOi8vZGh4Ly4vLi4vdHMtZGF0YS9zb3VyY2VzL0RyYWdNYW5hZ2VyLnRzIiwid2VicGFjazovL2RoeC8uLy4uL3RzLWRhdGEvc291cmNlcy9kYXRhY29sbGVjdGlvbi50cyIsIndlYnBhY2s6Ly9kaHgvLi8uLi90cy1kYXRhL3NvdXJjZXMvZGF0YWNvbGxlY3Rpb24vbG9hZGVyLnRzIiwid2VicGFjazovL2RoeC8uLy4uL3RzLWRhdGEvc291cmNlcy9kYXRhY29sbGVjdGlvbi9zb3J0LnRzIiwid2VicGFjazovL2RoeC8uLy4uL3RzLWRhdGEvc291cmNlcy9kYXRhcHJveHkudHMiLCJ3ZWJwYWNrOi8vZGh4Ly4vLi4vdHMtZGF0YS9zb3VyY2VzL2RyaXZlcnMvQ3N2RHJpdmVyLnRzIiwid2VicGFjazovL2RoeC8uLy4uL3RzLWRhdGEvc291cmNlcy9kcml2ZXJzL0pzb25Ecml2ZXIudHMiLCJ3ZWJwYWNrOi8vZGh4Ly4vLi4vdHMtZGF0YS9zb3VyY2VzL2RyaXZlcnMvWE1MRHJpdmVyLnRzIiwid2VicGFjazovL2RoeC8uLy4uL3RzLWRhdGEvc291cmNlcy9kcml2ZXJzL2RyaXZlcnMudHMiLCJ3ZWJwYWNrOi8vZGh4Ly4vLi4vdHMtZGF0YS9zb3VyY2VzL2hlbHBlcnMudHMiLCJ3ZWJwYWNrOi8vZGh4Ly4vLi4vdHMtZGF0YS9zb3VyY2VzL3NlbGVjdGlvbi50cyIsIndlYnBhY2s6Ly9kaHgvLi8uLi90cy1kYXRhL3NvdXJjZXMvc2VyaWFsaXplcnMveG1sLnRzIiwid2VicGFjazovL2RoeC8uLy4uL3RzLWRhdGEvc291cmNlcy90cmVlY29sbGVjdGlvbi50cyIsIndlYnBhY2s6Ly9kaHgvLi8uLi90cy1kYXRhL3NvdXJjZXMvdHlwZXMudHMiLCJ3ZWJwYWNrOi8vZGh4Ly4vLi4vdHMtbWVudS9zb3VyY2VzL0NvbnRleHRNZW51LnRzIiwid2VicGFjazovL2RoeC8uLy4uL3RzLW1lbnUvc291cmNlcy9NZW51LnRzIiwid2VicGFjazovL2RoeC8uLy4uL3RzLW1lbnUvc291cmNlcy9lbnRyeS50cyIsIndlYnBhY2s6Ly9kaHgvLi8uLi90cy1uYXZiYXIvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vZGh4Ly4vLi4vdHMtbmF2YmFyL3NvdXJjZXMvTmF2YmFyLnRzIiwid2VicGFjazovL2RoeC8uLy4uL3RzLW5hdmJhci9zb3VyY2VzL2VsZW1lbnRzL2J1dHRvbi50cyIsIndlYnBhY2s6Ly9kaHgvLi8uLi90cy1uYXZiYXIvc291cmNlcy9lbGVtZW50cy9jdXN0b21IVE1MQnV0dG9uLnRzIiwid2VicGFjazovL2RoeC8uLy4uL3RzLW5hdmJhci9zb3VyY2VzL2VsZW1lbnRzL2hlbHBlcnMudHMiLCJ3ZWJwYWNrOi8vZGh4Ly4vLi4vdHMtbmF2YmFyL3NvdXJjZXMvZWxlbWVudHMvaW1hZ2VCdXR0b24udHMiLCJ3ZWJwYWNrOi8vZGh4Ly4vLi4vdHMtbmF2YmFyL3NvdXJjZXMvZWxlbWVudHMvaW5wdXQudHMiLCJ3ZWJwYWNrOi8vZGh4Ly4vLi4vdHMtbmF2YmFyL3NvdXJjZXMvZWxlbWVudHMvbWVudUl0ZW0udHMiLCJ3ZWJwYWNrOi8vZGh4Ly4vLi4vdHMtbmF2YmFyL3NvdXJjZXMvZWxlbWVudHMvbmF2SXRlbS50cyIsIndlYnBhY2s6Ly9kaHgvLi8uLi90cy1uYXZiYXIvc291cmNlcy9lbGVtZW50cy9zZXBhcmF0b3IudHMiLCJ3ZWJwYWNrOi8vZGh4Ly4vLi4vdHMtbmF2YmFyL3NvdXJjZXMvZWxlbWVudHMvc3BhY2VyLnRzIiwid2VicGFjazovL2RoeC8uLy4uL3RzLW5hdmJhci9zb3VyY2VzL2VsZW1lbnRzL3RpdGxlLnRzIiwid2VicGFjazovL2RoeC8uLy4uL3RzLW5hdmJhci9zb3VyY2VzL2l0ZW1mYWN0b3J5LnRzIiwid2VicGFjazovL2RoeC8uLy4uL3RzLW5hdmJhci9zb3VyY2VzL3R5cGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OzhEQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNsRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLENBQUMsS0FBNEQ7QUFDN0QsQ0FBQyxTQUMwQjtBQUMzQixDQUFDLHFCQUFxQjs7QUFFdEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGtEQUFrRDtBQUNsRDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7OztBQUlBO0FBQ0E7O0FBRUEsZ0JBQWdCLGlCQUFpQjtBQUNqQyxHQUFHO0FBQ0gsSUFBSSxzQkFBc0IsRUFBRTs7QUFFNUI7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxJQUFJLGlCQUFpQjtBQUNyQjtBQUNBLElBQUksb0NBQW9DO0FBQ3hDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG1CQUFtQixpQkFBaUI7QUFDcEMsR0FBRyxtQkFBbUI7QUFDdEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNILElBQUksY0FBYyxFQUFFOztBQUVwQjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxHQUFHLGNBQWM7O0FBRWpCLGdCQUFnQixVQUFVO0FBQzFCLEdBQUc7QUFDSCxJQUFJLGNBQWMsRUFBRTs7QUFFcEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUcsV0FBVzs7QUFFZDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLGdCQUFnQjtBQUM1QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDLGNBQWM7QUFDaEQ7QUFDQSxpQ0FBaUMsaUJBQWlCO0FBQ2xELFVBQVUsaUJBQWlCO0FBQzNCO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBLGtDQUFrQyxjQUFjO0FBQ2hEO0FBQ0EsaUNBQWlDLGlCQUFpQjtBQUNsRCxVQUFVLGlCQUFpQjtBQUMzQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsK0JBQStCLFFBQVE7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLGNBQWM7QUFDNUM7QUFDQSw2QkFBNkIsaUJBQWlCO0FBQzlDLFVBQVUsaUJBQWlCO0FBQzNCO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBLDhCQUE4QixjQUFjO0FBQzVDO0FBQ0EsNkJBQTZCLGlCQUFpQjtBQUM5QyxVQUFVLGlCQUFpQjtBQUMzQjtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUcsY0FBYztBQUNqQjtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHFCQUFxQixnQkFBZ0IsYUFBYSxFQUFFO0FBQ3BELHFCQUFxQixnQkFBZ0IsYUFBYSxFQUFFO0FBQ3BELHNCQUFzQixpQkFBaUIsYUFBYSxFQUFFO0FBQ3RELHVCQUF1QixrQkFBa0IsYUFBYSxFQUFFO0FBQ3hELHNCQUFzQixrQkFBa0IsdUJBQXVCLEVBQUU7O0FBRWpFLHNCQUFzQixpQkFBaUIsYUFBYSxFQUFFO0FBQ3REO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDJCQUEyQjs7QUFFM0I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSyxhQUFhO0FBQ2xCO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSyxhQUFhO0FBQ2xCO0FBQ0EsRUFBRTs7QUFFRjtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsTUFBTSxtQkFBbUI7QUFDekI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsR0FBRyxvQkFBb0I7O0FBRXZCOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLElBQUksa0JBQWtCOztBQUV0QjtBQUNBLDhCQUE4QjtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxNQUFNLDRCQUE0QixFQUFFO0FBQ3BDOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsSUFBSSw2QkFBNkI7O0FBRWpDO0FBQ0EsSUFBSSw2QkFBNkI7O0FBRWpDO0FBQ0EsSUFBSSxpQ0FBaUM7O0FBRXJDO0FBQ0EsSUFBSSwrQkFBK0I7O0FBRW5DO0FBQ0EsSUFBSSxpQ0FBaUM7O0FBRXJDO0FBQ0E7QUFDQSxLQUFLLHFCQUFxQjtBQUMxQjtBQUNBLEtBQUssMkJBQTJCO0FBQ2hDO0FBQ0EsS0FBSywwSEFBMEg7QUFDL0g7QUFDQTs7QUFFQTtBQUNBLEdBQUcsa0JBQWtCOztBQUVyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQSxJQUFJLG9DQUFvQztBQUN4Qzs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHLDJCQUEyQjtBQUM5Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHLFFBQVE7O0FBRVg7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRyxxQ0FBcUM7O0FBRXhDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUcscUJBQXFCOztBQUV4QjtBQUNBLEdBQUcsbUJBQW1CO0FBQ3RCO0FBQ0E7QUFDQSxJQUFJLGdEQUFnRDtBQUNwRDtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsZ0JBQWdCLGlCQUFpQjtBQUNqQzs7QUFFQTtBQUNBO0FBQ0EsSUFBSSxxQkFBcUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNLDZDQUE2QztBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSyx3Q0FBd0M7O0FBRTdDO0FBQ0E7QUFDQTtBQUNBLE1BQU0scUJBQXFCO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU0sK0JBQStCO0FBQ3JDO0FBQ0E7QUFDQSxLQUFLLCtCQUErQjtBQUNwQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHLHlCQUF5QjtBQUM1QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE1BQU0sK0JBQStCO0FBQ3JDOztBQUVBO0FBQ0EsS0FBSyxpQ0FBaUM7QUFDdEM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNLHFCQUFxQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwrREFBK0Q7QUFDL0Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0Esb0JBQW9CO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsSUFBSSwyQkFBMkI7QUFDL0I7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRyxvQkFBb0I7QUFDdkI7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRyxxQ0FBcUM7QUFDeEM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBLGlCQUFpQixzQkFBc0I7QUFDdkMsSUFBSSxnQ0FBZ0M7QUFDcEM7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxrQkFBa0Isc0JBQXNCO0FBQ3hDLEtBQUssbUNBQW1DO0FBQ3hDO0FBQ0E7QUFDQSxJQUFJLGlCQUFpQjtBQUNyQjs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGtCQUFrQixRQUFROztBQUUxQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRyx5QkFBeUI7QUFDNUI7O0FBRUE7QUFDQTs7QUFFQSxnQkFBZ0Isa0JBQWtCO0FBQ2xDO0FBQ0E7O0FBRUE7QUFDQSxJQUFJLG1CQUFtQjs7QUFFdkI7QUFDQSxJQUFJLGVBQWU7QUFDbkI7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLEdBQUcsOENBQThDOztBQUVqRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxHQUFHLDZDQUE2QztBQUNoRDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0EsR0FBRyxrQ0FBa0M7QUFDckM7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsSUFBSSx3QkFBd0I7QUFDNUI7O0FBRUE7QUFDQTtBQUNBLElBQUksMEJBQTBCO0FBQzlCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUcsUUFBUTs7QUFFWDtBQUNBO0FBQ0EsSUFBSSxpREFBaUQ7O0FBRXJEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUsscURBQXFEO0FBQzFEOztBQUVBOztBQUVBO0FBQ0EsR0FBRyx3QkFBd0I7QUFDM0I7QUFDQSxHQUFHLDBCQUEwQjtBQUM3Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRyxvQkFBb0I7QUFDdkI7QUFDQSxHQUFHLCtCQUErQjtBQUNsQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUcsd0NBQXdDLEVBQUU7QUFDN0M7QUFDQSxHQUFHLDRCQUE0QjtBQUMvQjtBQUNBLEdBQUcsb0JBQW9CO0FBQ3ZCO0FBQ0EsR0FBRyxnQkFBZ0I7QUFDbkI7QUFDQSxHQUFHLDBCQUEwQjtBQUM3QjtBQUNBLEdBQUcsNEJBQTRCO0FBQy9COztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUcsb0NBQW9DO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsTUFBTSxxREFBcUQ7QUFDM0Q7O0FBRUE7QUFDQTtBQUNBLEtBQUssMEJBQTBCO0FBQy9CO0FBQ0E7QUFDQSxLQUFLLG9DQUFvQztBQUN6QztBQUNBLEtBQUssMkNBQTJDO0FBQ2hEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxVQUFVLG1CQUFtQjtBQUM3QjtBQUNBLGdCQUFnQix1QkFBdUI7QUFDdkM7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsSUFBSSx5Q0FBeUMsRUFBRTtBQUMvQztBQUNBLG1HQUFtRztBQUNuRztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCO0FBQ3hCO0FBQ0Esc0NBQXNDO0FBQ3RDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLLG1DQUFtQzs7QUFFeEM7QUFDQSxLQUFLLHdCQUF3Qjs7QUFFN0I7QUFDQSxLQUFLLG9CQUFvQjtBQUN6QjtBQUNBLEtBQUssbUNBQW1DO0FBQ3hDO0FBQ0E7QUFDQSxJQUFJLGlEQUFpRDtBQUNyRDtBQUNBLElBQUksZ0RBQWdEO0FBQ3BEOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUssZ0RBQWdEOztBQUVyRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxJQUFJLGtCQUFrQjtBQUN0QjtBQUNBLDJEQUEyRDtBQUMzRCxvREFBb0Q7QUFDcEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTSxxREFBcUQ7QUFDM0Q7O0FBRUE7QUFDQSxLQUFLLHlGQUF5Rjs7QUFFOUY7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLElBQUksK0JBQStCO0FBQ25DO0FBQ0EsSUFBSSx1Q0FBdUM7O0FBRTNDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsT0FBTztBQUM1Qix5QkFBeUIsZ0JBQWdCO0FBQ3pDOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixPQUFPO0FBQzVCLHlCQUF5QixnQkFBZ0I7QUFDekM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsZ0JBQWdCLGlCQUFpQjtBQUNqQzs7QUFFQTtBQUNBLElBQUkscUJBQXFCO0FBQ3pCOztBQUVBO0FBQ0EscUVBQXFFLG1CQUFtQixFQUFFOztBQUUxRixnQkFBZ0Isa0JBQWtCO0FBQ2xDLEdBQUcsNEJBQTRCOztBQUUvQjs7QUFFQTtBQUNBO0FBQ0Esd0JBQXdCLE9BQU87QUFDL0I7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLDZDQUE2QztBQUM3QyxPQUFPLHdCQUF3QjtBQUMvQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLLFVBQVU7QUFDZjtBQUNBO0FBQ0EsSUFBSSxVQUFVO0FBQ2Q7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRyxpQ0FBaUM7O0FBRXBDOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLDZCQUE2QjtBQUNqQztBQUNBO0FBQ0E7QUFDQSxLQUFLLHdCQUF3QjtBQUM3QjtBQUNBLEtBQUssc0JBQXNCO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLLGlDQUFpQztBQUN0QztBQUNBLEtBQUssd0JBQXdCO0FBQzdCO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxpQkFBaUIsa0JBQWtCO0FBQ25DLElBQUksd0JBQXdCO0FBQzVCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSSxpQkFBaUIsRUFBRTtBQUN2QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjOztBQUVkO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0E7O0FBRUEsZ0JBQWdCLFVBQVU7QUFDMUI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxNQUFNLDJCQUEyQjs7QUFFakM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTSxlQUFlO0FBQ3JCO0FBQ0E7QUFDQSxLQUFLLGVBQWU7O0FBRXBCO0FBQ0EseUJBQXlCO0FBQ3pCOztBQUVBOztBQUVBO0FBQ0EsTUFBTSxzQkFBc0I7QUFDNUI7QUFDQTtBQUNBOztBQUVBLHNCQUFzQjtBQUN0Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5REFBeUQ7QUFDekQ7QUFDQSxzREFBc0Q7QUFDdEQ7QUFDQTtBQUNBLE1BQU0sNkZBQTZGLEVBQUU7O0FBRXJHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLLG1CQUFtQjs7QUFFeEI7QUFDQSxLQUFLO0FBQ0wsTUFBTSxXQUFXLEVBQUU7QUFDbkI7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRyx1QkFBdUI7O0FBRTFCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksdUJBQXVCOztBQUUzQixVQUFVO0FBQ1Y7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLElBQUksaUNBQWlDOztBQUVyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxFQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxFQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxFQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxFQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILEVBQUU7QUFDRjs7QUFFQTtBQUNBO0FBQ0EsSUFBSSxlQUFlO0FBQ25COztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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QUM3QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxJQUFJLGNBQWM7QUFDbEI7QUFDQSxJQUFJLGFBQWE7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUssZ0JBQWdCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBLGtCQUFrQixTQUFTO0FBQzNCOztBQUVBO0FBQ0E7O0FBRUEsZ0NBQWdDOztBQUVoQzs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLDBCQUEwQixlQUFlO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLFFBQVE7O0FBRVo7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFD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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixzQkFBc0I7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHFDQUFxQzs7QUFFckM7QUFDQTtBQUNBOztBQUVBLDJCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsVUFBVTs7Ozs7Ozs7Ozs7O0FDdkx0QztBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXOztBQUVYO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTzs7QUFFUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWCxPQUFPO0FBQ1A7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTzs7QUFFUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYLE9BQU87QUFDUDs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1gsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLFdBQVc7QUFDWDtBQUNBLFdBQVc7O0FBRVgsT0FBTztBQUNQOzs7QUFHQTs7QUFFQTtBQUNBLE1BQU0sSUFBNEI7QUFDbEM7QUFDQSxHQUFHLE1BQU0sRUFFTjtBQUNILENBQUM7Ozs7Ozs7Ozs7Ozs7QUM3VEQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsdUJBQXVCO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLGlCQUFpQjtBQUN0QztBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsMENBQTBDLHNCQUFzQixFQUFFO0FBQ2xFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EseUNBQXlDO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxVQUFVO0FBQ1Y7QUFDQTs7QUFFQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxDQUFDOzs7Ozs7Ozs7Ozs7O0FDekxEO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQSxt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LENBQUM7Ozs7Ozs7Ozs7Ozs7OztBQ2xIRCwrRUFBMEM7QUFBakMseUNBQVU7QUFFbkIsSUFBWSxRQVlYO0FBWkQsV0FBWSxRQUFRO0lBQ25CLDZCQUFpQjtJQUNqQix1Q0FBMkI7SUFDM0IseUNBQTZCO0lBQzdCLDZDQUFpQztJQUNqQywyQkFBZTtJQUNmLG1DQUF1QjtJQUN2QiwyQkFBZTtJQUNmLDZCQUFpQjtJQUNqQixpQ0FBcUI7SUFDckIsMkJBQWU7SUFDZiwrQkFBbUI7QUFDcEIsQ0FBQyxFQVpXLFFBQVEsR0FBUixnQkFBUSxLQUFSLGdCQUFRLFFBWW5CO0FBeUNELElBQVksbUJBTVg7QUFORCxXQUFZLG1CQUFtQjtJQUM5QixvREFBNkI7SUFDN0Isc0NBQWU7SUFDZiw0Q0FBcUI7SUFDckIsZ0RBQXlCO0lBQ3pCLDhDQUF1QjtBQUN4QixDQUFDLEVBTlcsbUJBQW1CLEdBQW5CLDJCQUFtQixLQUFuQiwyQkFBbUIsUUFNOUI7QUFFRCxJQUFZLGNBR1g7QUFIRCxXQUFZLGNBQWM7SUFDekIscUNBQW1CO0lBQ25CLGlDQUFlO0FBQ2hCLENBQUMsRUFIVyxjQUFjLEdBQWQsc0JBQWMsS0FBZCxzQkFBYyxRQUd6QiIsImZpbGUiOiJtZW51LmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiZGh4XCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcImRoeFwiXSA9IGZhY3RvcnkoKTtcbn0pKHdpbmRvdywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvY29kZWJhc2UvXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4uL3RzLW1lbnUvc291cmNlcy9lbnRyeS50c1wiKTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgKGMpIDIwMTcsIExlb24gU29yb2tpblxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLiAoTUlUIExpY2Vuc2VkKVxuKlxuKiBkb212bS5qcyAoRE9NIFZpZXdNb2RlbClcbiogQSB0aGluLCBmYXN0LCBkZXBlbmRlbmN5LWZyZWUgdmRvbSB2aWV3IGxheWVyXG4qIEBwcmVzZXJ2ZSBodHRwczovL2dpdGh1Yi5jb20vbGVlb25peWEvZG9tdm0gKHYzLjIuNiwgZGV2IGJ1aWxkKVxuKi9cblxuKGZ1bmN0aW9uIChnbG9iYWwsIGZhY3RvcnkpIHtcblx0dHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnID8gbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCkgOlxuXHR0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgPyBkZWZpbmUoZmFjdG9yeSkgOlxuXHQoZ2xvYmFsLmRvbXZtID0gZmFjdG9yeSgpKTtcbn0odGhpcywgKGZ1bmN0aW9uICgpIHsgJ3VzZSBzdHJpY3QnO1xuXG4vLyBOT1RFOiBpZiBhZGRpbmcgYSBuZXcgKlZOb2RlKiB0eXBlLCBtYWtlIGl0IDwgQ09NTUVOVCBhbmQgcmVudW1iZXIgcmVzdC5cbi8vIFRoZXJlIGFyZSBzb21lIHBsYWNlcyB0aGF0IHRlc3QgPD0gQ09NTUVOVCB0byBhc3NlcnQgaWYgbm9kZSBpcyBhIFZOb2RlXG5cbi8vIFZOb2RlIHR5cGVzXG52YXIgRUxFTUVOVFx0PSAxO1xudmFyIFRFWFRcdFx0PSAyO1xudmFyIENPTU1FTlRcdD0gMztcblxuLy8gcGxhY2Vob2xkZXIgdHlwZXNcbnZhciBWVklFV1x0XHQ9IDQ7XG52YXIgVk1PREVMXHRcdD0gNTtcblxudmFyIEVOVl9ET00gPSB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiO1xudmFyIHdpbiA9IEVOVl9ET00gPyB3aW5kb3cgOiB7fTtcbnZhciByQUYgPSB3aW4ucmVxdWVzdEFuaW1hdGlvbkZyYW1lO1xuXG52YXIgZW1wdHlPYmogPSB7fTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnZhciBpc0FyciA9IEFycmF5LmlzQXJyYXk7XG5cbmZ1bmN0aW9uIGlzU2V0KHZhbCkge1xuXHRyZXR1cm4gdmFsICE9IG51bGw7XG59XG5cbmZ1bmN0aW9uIGlzUGxhaW5PYmoodmFsKSB7XG5cdHJldHVybiB2YWwgIT0gbnVsbCAmJiB2YWwuY29uc3RydWN0b3IgPT09IE9iamVjdDtcdFx0Ly8gICYmIHR5cGVvZiB2YWwgPT09IFwib2JqZWN0XCJcbn1cblxuZnVuY3Rpb24gaW5zZXJ0QXJyKHRhcmcsIGFyciwgcG9zLCByZW0pIHtcblx0dGFyZy5zcGxpY2UuYXBwbHkodGFyZywgW3BvcywgcmVtXS5jb25jYXQoYXJyKSk7XG59XG5cbmZ1bmN0aW9uIGlzVmFsKHZhbCkge1xuXHR2YXIgdCA9IHR5cGVvZiB2YWw7XG5cdHJldHVybiB0ID09PSBcInN0cmluZ1wiIHx8IHQgPT09IFwibnVtYmVyXCI7XG59XG5cbmZ1bmN0aW9uIGlzRnVuYyh2YWwpIHtcblx0cmV0dXJuIHR5cGVvZiB2YWwgPT09IFwiZnVuY3Rpb25cIjtcbn1cblxuZnVuY3Rpb24gaXNQcm9tKHZhbCkge1xuXHRyZXR1cm4gdHlwZW9mIHZhbCA9PT0gXCJvYmplY3RcIiAmJiBpc0Z1bmModmFsLnRoZW4pO1xufVxuXG5cblxuZnVuY3Rpb24gYXNzaWduT2JqKHRhcmcpIHtcblx0dmFyIGFyZ3MgPSBhcmd1bWVudHM7XG5cblx0Zm9yICh2YXIgaSA9IDE7IGkgPCBhcmdzLmxlbmd0aDsgaSsrKVxuXHRcdHsgZm9yICh2YXIgayBpbiBhcmdzW2ldKVxuXHRcdFx0eyB0YXJnW2tdID0gYXJnc1tpXVtrXTsgfSB9XG5cblx0cmV0dXJuIHRhcmc7XG59XG5cbi8vIGV4cG9ydCBjb25zdCBkZWZQcm9wID0gT2JqZWN0LmRlZmluZVByb3BlcnR5O1xuXG5mdW5jdGlvbiBkZWVwU2V0KHRhcmcsIHBhdGgsIHZhbCkge1xuXHR2YXIgc2VnO1xuXG5cdHdoaWxlIChzZWcgPSBwYXRoLnNoaWZ0KCkpIHtcblx0XHRpZiAocGF0aC5sZW5ndGggPT09IDApXG5cdFx0XHR7IHRhcmdbc2VnXSA9IHZhbDsgfVxuXHRcdGVsc2Vcblx0XHRcdHsgdGFyZ1tzZWddID0gdGFyZyA9IHRhcmdbc2VnXSB8fCB7fTsgfVxuXHR9XG59XG5cbi8qXG5leHBvcnQgZnVuY3Rpb24gZGVlcFVuc2V0KHRhcmcsIHBhdGgpIHtcblx0dmFyIHNlZztcblxuXHR3aGlsZSAoc2VnID0gcGF0aC5zaGlmdCgpKSB7XG5cdFx0aWYgKHBhdGgubGVuZ3RoID09PSAwKVxuXHRcdFx0dGFyZ1tzZWddID0gdmFsO1xuXHRcdGVsc2Vcblx0XHRcdHRhcmdbc2VnXSA9IHRhcmcgPSB0YXJnW3NlZ10gfHwge307XG5cdH1cbn1cbiovXG5cbmZ1bmN0aW9uIHNsaWNlQXJncyhhcmdzLCBvZmZzKSB7XG5cdHZhciBhcnIgPSBbXTtcblx0Zm9yICh2YXIgaSA9IG9mZnM7IGkgPCBhcmdzLmxlbmd0aDsgaSsrKVxuXHRcdHsgYXJyLnB1c2goYXJnc1tpXSk7IH1cblx0cmV0dXJuIGFycjtcbn1cblxuZnVuY3Rpb24gY21wT2JqKGEsIGIpIHtcblx0Zm9yICh2YXIgaSBpbiBhKVxuXHRcdHsgaWYgKGFbaV0gIT09IGJbaV0pXG5cdFx0XHR7IHJldHVybiBmYWxzZTsgfSB9XG5cblx0cmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIGNtcEFycihhLCBiKSB7XG5cdHZhciBhbGVuID0gYS5sZW5ndGg7XG5cblx0aWYgKGIubGVuZ3RoICE9PSBhbGVuKVxuXHRcdHsgcmV0dXJuIGZhbHNlOyB9XG5cblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBhbGVuOyBpKyspXG5cdFx0eyBpZiAoYVtpXSAhPT0gYltpXSlcblx0XHRcdHsgcmV0dXJuIGZhbHNlOyB9IH1cblxuXHRyZXR1cm4gdHJ1ZTtcbn1cblxuLy8gaHR0cHM6Ly9naXRodWIuY29tL2RhcnNhaW4vcmFmdFxuLy8gckFGIHRocm90dGxlciwgYWdncmVnYXRlcyBtdWx0aXBsZSByZXBlYXRlZCByZWRyYXcgY2FsbHMgd2l0aGluIHNpbmdsZSBhbmltZnJhbWVcbmZ1bmN0aW9uIHJhZnQoZm4pIHtcblx0aWYgKCFyQUYpXG5cdFx0eyByZXR1cm4gZm47IH1cblxuXHR2YXIgaWQsIGN0eCwgYXJncztcblxuXHRmdW5jdGlvbiBjYWxsKCkge1xuXHRcdGlkID0gMDtcblx0XHRmbi5hcHBseShjdHgsIGFyZ3MpO1xuXHR9XG5cblx0cmV0dXJuIGZ1bmN0aW9uKCkge1xuXHRcdGN0eCA9IHRoaXM7XG5cdFx0YXJncyA9IGFyZ3VtZW50cztcblx0XHRpZiAoIWlkKSB7IGlkID0gckFGKGNhbGwpOyB9XG5cdH07XG59XG5cbmZ1bmN0aW9uIGN1cnJ5KGZuLCBhcmdzLCBjdHgpIHtcblx0cmV0dXJuIGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiBmbi5hcHBseShjdHgsIGFyZ3MpO1xuXHR9O1xufVxuXG4vKlxuZXhwb3J0IGZ1bmN0aW9uIHByb3AodmFsLCBjYiwgY3R4LCBhcmdzKSB7XG5cdHJldHVybiBmdW5jdGlvbihuZXdWYWwsIGV4ZWNDYikge1xuXHRcdGlmIChuZXdWYWwgIT09IHVuZGVmaW5lZCAmJiBuZXdWYWwgIT09IHZhbCkge1xuXHRcdFx0dmFsID0gbmV3VmFsO1xuXHRcdFx0ZXhlY0NiICE9PSBmYWxzZSAmJiBpc0Z1bmMoY2IpICYmIGNiLmFwcGx5KGN0eCwgYXJncyk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHZhbDtcblx0fTtcbn1cbiovXG5cbi8qXG4vLyBhZGFwdGVkIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL09saWNhbC9iaW5hcnktc2VhcmNoXG5leHBvcnQgZnVuY3Rpb24gYmluYXJ5S2V5U2VhcmNoKGxpc3QsIGl0ZW0pIHtcbiAgICB2YXIgbWluID0gMDtcbiAgICB2YXIgbWF4ID0gbGlzdC5sZW5ndGggLSAxO1xuICAgIHZhciBndWVzcztcblxuXHR2YXIgYml0d2lzZSA9IChtYXggPD0gMjE0NzQ4MzY0NykgPyB0cnVlIDogZmFsc2U7XG5cdGlmIChiaXR3aXNlKSB7XG5cdFx0d2hpbGUgKG1pbiA8PSBtYXgpIHtcblx0XHRcdGd1ZXNzID0gKG1pbiArIG1heCkgPj4gMTtcblx0XHRcdGlmIChsaXN0W2d1ZXNzXS5rZXkgPT09IGl0ZW0pIHsgcmV0dXJuIGd1ZXNzOyB9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0aWYgKGxpc3RbZ3Vlc3NdLmtleSA8IGl0ZW0pIHsgbWluID0gZ3Vlc3MgKyAxOyB9XG5cdFx0XHRcdGVsc2UgeyBtYXggPSBndWVzcyAtIDE7IH1cblx0XHRcdH1cblx0XHR9XG5cdH0gZWxzZSB7XG5cdFx0d2hpbGUgKG1pbiA8PSBtYXgpIHtcblx0XHRcdGd1ZXNzID0gTWF0aC5mbG9vcigobWluICsgbWF4KSAvIDIpO1xuXHRcdFx0aWYgKGxpc3RbZ3Vlc3NdLmtleSA9PT0gaXRlbSkgeyByZXR1cm4gZ3Vlc3M7IH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHRpZiAobGlzdFtndWVzc10ua2V5IDwgaXRlbSkgeyBtaW4gPSBndWVzcyArIDE7IH1cblx0XHRcdFx0ZWxzZSB7IG1heCA9IGd1ZXNzIC0gMTsgfVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG4gICAgcmV0dXJuIC0xO1xufVxuKi9cblxuLy8gaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvTG9uZ2VzdF9pbmNyZWFzaW5nX3N1YnNlcXVlbmNlXG4vLyBpbXBsIGJvcnJvd2VkIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL2l2aWpzL2l2aVxuZnVuY3Rpb24gbG9uZ2VzdEluY3JlYXNpbmdTdWJzZXF1ZW5jZShhKSB7XG5cdHZhciBwID0gYS5zbGljZSgpO1xuXHR2YXIgcmVzdWx0ID0gW107XG5cdHJlc3VsdC5wdXNoKDApO1xuXHR2YXIgdTtcblx0dmFyIHY7XG5cblx0Zm9yICh2YXIgaSA9IDAsIGlsID0gYS5sZW5ndGg7IGkgPCBpbDsgKytpKSB7XG5cdFx0dmFyIGogPSByZXN1bHRbcmVzdWx0Lmxlbmd0aCAtIDFdO1xuXHRcdGlmIChhW2pdIDwgYVtpXSkge1xuXHRcdFx0cFtpXSA9IGo7XG5cdFx0XHRyZXN1bHQucHVzaChpKTtcblx0XHRcdGNvbnRpbnVlO1xuXHRcdH1cblxuXHRcdHUgPSAwO1xuXHRcdHYgPSByZXN1bHQubGVuZ3RoIC0gMTtcblxuXHRcdHdoaWxlICh1IDwgdikge1xuXHRcdFx0dmFyIGMgPSAoKHUgKyB2KSAvIDIpIHwgMDtcblx0XHRcdGlmIChhW3Jlc3VsdFtjXV0gPCBhW2ldKSB7XG5cdFx0XHRcdHUgPSBjICsgMTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHYgPSBjO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmIChhW2ldIDwgYVtyZXN1bHRbdV1dKSB7XG5cdFx0XHRpZiAodSA+IDApIHtcblx0XHRcdFx0cFtpXSA9IHJlc3VsdFt1IC0gMV07XG5cdFx0XHR9XG5cdFx0XHRyZXN1bHRbdV0gPSBpO1xuXHRcdH1cblx0fVxuXG5cdHUgPSByZXN1bHQubGVuZ3RoO1xuXHR2ID0gcmVzdWx0W3UgLSAxXTtcblxuXHR3aGlsZSAodS0tID4gMCkge1xuXHRcdHJlc3VsdFt1XSA9IHY7XG5cdFx0diA9IHBbdl07XG5cdH1cblxuXHRyZXR1cm4gcmVzdWx0O1xufVxuXG4vLyBiYXNlZCBvbiBodHRwczovL2dpdGh1Yi5jb20vT2xpY2FsL2JpbmFyeS1zZWFyY2hcbmZ1bmN0aW9uIGJpbmFyeUZpbmRMYXJnZXIoaXRlbSwgbGlzdCkge1xuXHR2YXIgbWluID0gMDtcblx0dmFyIG1heCA9IGxpc3QubGVuZ3RoIC0gMTtcblx0dmFyIGd1ZXNzO1xuXG5cdHZhciBiaXR3aXNlID0gKG1heCA8PSAyMTQ3NDgzNjQ3KSA/IHRydWUgOiBmYWxzZTtcblx0aWYgKGJpdHdpc2UpIHtcblx0XHR3aGlsZSAobWluIDw9IG1heCkge1xuXHRcdFx0Z3Vlc3MgPSAobWluICsgbWF4KSA+PiAxO1xuXHRcdFx0aWYgKGxpc3RbZ3Vlc3NdID09PSBpdGVtKSB7IHJldHVybiBndWVzczsgfVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdGlmIChsaXN0W2d1ZXNzXSA8IGl0ZW0pIHsgbWluID0gZ3Vlc3MgKyAxOyB9XG5cdFx0XHRcdGVsc2UgeyBtYXggPSBndWVzcyAtIDE7IH1cblx0XHRcdH1cblx0XHR9XG5cdH0gZWxzZSB7XG5cdFx0d2hpbGUgKG1pbiA8PSBtYXgpIHtcblx0XHRcdGd1ZXNzID0gTWF0aC5mbG9vcigobWluICsgbWF4KSAvIDIpO1xuXHRcdFx0aWYgKGxpc3RbZ3Vlc3NdID09PSBpdGVtKSB7IHJldHVybiBndWVzczsgfVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdGlmIChsaXN0W2d1ZXNzXSA8IGl0ZW0pIHsgbWluID0gZ3Vlc3MgKyAxOyB9XG5cdFx0XHRcdGVsc2UgeyBtYXggPSBndWVzcyAtIDE7IH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gKG1pbiA9PSBsaXN0Lmxlbmd0aCkgPyBudWxsIDogbWluO1xuXG4vL1x0cmV0dXJuIC0xO1xufVxuXG5mdW5jdGlvbiBpc0V2UHJvcChuYW1lKSB7XG5cdHJldHVybiBuYW1lWzBdID09PSBcIm9cIiAmJiBuYW1lWzFdID09PSBcIm5cIjtcbn1cblxuZnVuY3Rpb24gaXNTcGxQcm9wKG5hbWUpIHtcblx0cmV0dXJuIG5hbWVbMF0gPT09IFwiX1wiO1xufVxuXG5mdW5jdGlvbiBpc1N0eWxlUHJvcChuYW1lKSB7XG5cdHJldHVybiBuYW1lID09PSBcInN0eWxlXCI7XG59XG5cbmZ1bmN0aW9uIHJlcGFpbnQobm9kZSkge1xuXHRub2RlICYmIG5vZGUuZWwgJiYgbm9kZS5lbC5vZmZzZXRIZWlnaHQ7XG59XG5cbmZ1bmN0aW9uIGlzSHlkcmF0ZWQodm0pIHtcblx0cmV0dXJuIHZtLm5vZGUgIT0gbnVsbCAmJiB2bS5ub2RlLmVsICE9IG51bGw7XG59XG5cbi8vIHRlc3RzIGludGVyYWN0aXZlIHByb3BzIHdoZXJlIHJlYWwgdmFsIHNob3VsZCBiZSBjb21wYXJlZFxuZnVuY3Rpb24gaXNEeW5Qcm9wKHRhZywgYXR0cikge1xuLy9cdHN3aXRjaCAodGFnKSB7XG4vL1x0XHRjYXNlIFwiaW5wdXRcIjpcbi8vXHRcdGNhc2UgXCJ0ZXh0YXJlYVwiOlxuLy9cdFx0Y2FzZSBcInNlbGVjdFwiOlxuLy9cdFx0Y2FzZSBcIm9wdGlvblwiOlxuXHRcdFx0c3dpdGNoIChhdHRyKSB7XG5cdFx0XHRcdGNhc2UgXCJ2YWx1ZVwiOlxuXHRcdFx0XHRjYXNlIFwiY2hlY2tlZFwiOlxuXHRcdFx0XHRjYXNlIFwic2VsZWN0ZWRcIjpcbi8vXHRcdFx0XHRjYXNlIFwic2VsZWN0ZWRJbmRleFwiOlxuXHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fVxuLy9cdH1cblxuXHRyZXR1cm4gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIGdldFZtKG4pIHtcblx0biA9IG4gfHwgZW1wdHlPYmo7XG5cdHdoaWxlIChuLnZtID09IG51bGwgJiYgbi5wYXJlbnQpXG5cdFx0eyBuID0gbi5wYXJlbnQ7IH1cblx0cmV0dXJuIG4udm07XG59XG5cbmZ1bmN0aW9uIFZOb2RlKCkge31cblxudmFyIFZOb2RlUHJvdG8gPSBWTm9kZS5wcm90b3R5cGUgPSB7XG5cdGNvbnN0cnVjdG9yOiBWTm9kZSxcblxuXHR0eXBlOlx0bnVsbCxcblxuXHR2bTpcdFx0bnVsbCxcblxuXHQvLyBhbGwgdGhpcyBzdHVmZiBjYW4ganVzdCBsaXZlIGluIGF0dHJzIChhcyBkZWZpbmVkKSBqdXN0IGhhdmUgZ2V0dGVycyBoZXJlIGZvciBpdFxuXHRrZXk6XHRudWxsLFxuXHRyZWY6XHRudWxsLFxuXHRkYXRhOlx0bnVsbCxcblx0aG9va3M6XHRudWxsLFxuXHRuczpcdFx0bnVsbCxcblxuXHRlbDpcdFx0bnVsbCxcblxuXHR0YWc6XHRudWxsLFxuXHRhdHRyczpcdG51bGwsXG5cdGJvZHk6XHRudWxsLFxuXG5cdGZsYWdzOlx0MCxcblxuXHRfY2xhc3M6XHRudWxsLFxuXHRfZGlmZjpcdG51bGwsXG5cblx0Ly8gcGVuZGluZyByZW1vdmFsIG9uIHByb21pc2UgcmVzb2x1dGlvblxuXHRfZGVhZDpcdGZhbHNlLFxuXHQvLyBwYXJ0IG9mIGxvbmdlc3QgaW5jcmVhc2luZyBzdWJzZXF1ZW5jZT9cblx0X2xpczpcdGZhbHNlLFxuXG5cdGlkeDpcdG51bGwsXG5cdHBhcmVudDpcdG51bGwsXG5cblx0Lypcblx0Ly8gYnJlYWsgb3V0IGludG8gb3B0aW9uYWwgZmx1ZW50IG1vZHVsZVxuXHRrZXk6XHRmdW5jdGlvbih2YWwpIHsgdGhpcy5rZXlcdD0gdmFsOyByZXR1cm4gdGhpczsgfSxcblx0cmVmOlx0ZnVuY3Rpb24odmFsKSB7IHRoaXMucmVmXHQ9IHZhbDsgcmV0dXJuIHRoaXM7IH0sXHRcdC8vIGRlZXAgcmVmc1xuXHRkYXRhOlx0ZnVuY3Rpb24odmFsKSB7IHRoaXMuZGF0YVx0PSB2YWw7IHJldHVybiB0aGlzOyB9LFxuXHRob29rczpcdGZ1bmN0aW9uKHZhbCkgeyB0aGlzLmhvb2tzXHQ9IHZhbDsgcmV0dXJuIHRoaXM7IH0sXHRcdC8vIGgoXCJkaXZcIikuaG9va3MoKVxuXHRodG1sOlx0ZnVuY3Rpb24odmFsKSB7IHRoaXMuaHRtbFx0PSB0cnVlOyByZXR1cm4gdGhpcy5ib2R5KHZhbCk7IH0sXG5cblx0Ym9keTpcdGZ1bmN0aW9uKHZhbCkgeyB0aGlzLmJvZHlcdD0gdmFsOyByZXR1cm4gdGhpczsgfSxcblx0Ki9cbn07XG5cbmZ1bmN0aW9uIGRlZmluZVRleHQoYm9keSkge1xuXHR2YXIgbm9kZSA9IG5ldyBWTm9kZTtcblx0bm9kZS50eXBlID0gVEVYVDtcblx0bm9kZS5ib2R5ID0gYm9keTtcblx0cmV0dXJuIG5vZGU7XG59XG5cbnZhciBpc1N0cmVhbSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gZmFsc2UgfTtcblxudmFyIHN0cmVhbVZhbCA9IG5vb3A7XG52YXIgc3ViU3RyZWFtID0gbm9vcDtcbnZhciB1bnN1YlN0cmVhbSA9IG5vb3A7XG5cbmZ1bmN0aW9uIHN0cmVhbUNmZyhjZmcpIHtcblx0aXNTdHJlYW1cdD0gY2ZnLmlzO1xuXHRzdHJlYW1WYWxcdD0gY2ZnLnZhbDtcblx0c3ViU3RyZWFtXHQ9IGNmZy5zdWI7XG5cdHVuc3ViU3RyZWFtXHQ9IGNmZy51bnN1Yjtcbn1cblxuLy8gY3JlYXRlcyBhIG9uZS1zaG90IHNlbGYtZW5kaW5nIHN0cmVhbSB0aGF0IHJlZHJhd3MgdGFyZ2V0IHZtXG4vLyBUT0RPOiBpZiBpdCdzIGFscmVhZHkgcmVnaXN0ZXJlZCBieSBhbnkgcGFyZW50IHZtLCB0aGVuIGlnbm9yZSB0byBhdm9pZCBzaW11bHRhbmVvdXMgcGFyZW50ICYgY2hpbGQgcmVmcmVzaFxuZnVuY3Rpb24gaG9va1N0cmVhbShzLCB2bSkge1xuXHR2YXIgcmVkcmF3U3RyZWFtID0gc3ViU3RyZWFtKHMsIGZ1bmN0aW9uICh2YWwpIHtcblx0XHQvLyB0aGlzIFwiaWZcIiBpZ25vcmVzIHRoZSBpbml0aWFsIGZpcmluZyBkdXJpbmcgc3Vic2NyaXB0aW9uICh0aGVyZSdzIG5vIHJlZHJhd2FibGUgdm0geWV0KVxuXHRcdGlmIChyZWRyYXdTdHJlYW0pIHtcblx0XHRcdC8vIGlmIHZtIGZ1bGx5IGlzIGZvcm1lZCAob3IgbW91bnRlZCB2bS5ub2RlLmVsPylcblx0XHRcdGlmICh2bS5ub2RlICE9IG51bGwpXG5cdFx0XHRcdHsgdm0ucmVkcmF3KCk7IH1cblx0XHRcdHVuc3ViU3RyZWFtKHJlZHJhd1N0cmVhbSk7XG5cdFx0fVxuXHR9KTtcblxuXHRyZXR1cm4gc3RyZWFtVmFsKHMpO1xufVxuXG5mdW5jdGlvbiBob29rU3RyZWFtMihzLCB2bSkge1xuXHR2YXIgcmVkcmF3U3RyZWFtID0gc3ViU3RyZWFtKHMsIGZ1bmN0aW9uICh2YWwpIHtcblx0XHQvLyB0aGlzIFwiaWZcIiBpZ25vcmVzIHRoZSBpbml0aWFsIGZpcmluZyBkdXJpbmcgc3Vic2NyaXB0aW9uICh0aGVyZSdzIG5vIHJlZHJhd2FibGUgdm0geWV0KVxuXHRcdGlmIChyZWRyYXdTdHJlYW0pIHtcblx0XHRcdC8vIGlmIHZtIGZ1bGx5IGlzIGZvcm1lZCAob3IgbW91bnRlZCB2bS5ub2RlLmVsPylcblx0XHRcdGlmICh2bS5ub2RlICE9IG51bGwpXG5cdFx0XHRcdHsgdm0ucmVkcmF3KCk7IH1cblx0XHR9XG5cdH0pO1xuXG5cdHJldHVybiByZWRyYXdTdHJlYW07XG59XG5cbnZhciB0YWdDYWNoZSA9IHt9O1xuXG52YXIgUkVfQVRUUlMgPSAvXFxbKFxcdyspKD86PShcXHcrKSk/XFxdL2c7XG5cbmZ1bmN0aW9uIGNzc1RhZyhyYXcpIHtcblx0e1xuXHRcdHZhciBjYWNoZWQgPSB0YWdDYWNoZVtyYXddO1xuXG5cdFx0aWYgKGNhY2hlZCA9PSBudWxsKSB7XG5cdFx0XHR2YXIgdGFnLCBpZCwgY2xzLCBhdHRyO1xuXG5cdFx0XHR0YWdDYWNoZVtyYXddID0gY2FjaGVkID0ge1xuXHRcdFx0XHR0YWc6XHQodGFnXHQ9IHJhdy5tYXRjaCggL15bLVxcd10rLykpXHRcdD9cdHRhZ1swXVx0XHRcdFx0XHRcdDogXCJkaXZcIixcblx0XHRcdFx0aWQ6XHRcdChpZFx0XHQ9IHJhdy5tYXRjaCggLyMoWy1cXHddKykvKSlcdFx0PyBcdGlkWzFdXHRcdFx0XHRcdFx0OiBudWxsLFxuXHRcdFx0XHRjbGFzczpcdChjbHNcdD0gcmF3Lm1hdGNoKC9cXC4oWy1cXHcuXSspLykpXHRcdD9cdGNsc1sxXS5yZXBsYWNlKC9cXC4vZywgXCIgXCIpXHQ6IG51bGwsXG5cdFx0XHRcdGF0dHJzOlx0bnVsbCxcblx0XHRcdH07XG5cblx0XHRcdHdoaWxlIChhdHRyID0gUkVfQVRUUlMuZXhlYyhyYXcpKSB7XG5cdFx0XHRcdGlmIChjYWNoZWQuYXR0cnMgPT0gbnVsbClcblx0XHRcdFx0XHR7IGNhY2hlZC5hdHRycyA9IHt9OyB9XG5cdFx0XHRcdGNhY2hlZC5hdHRyc1thdHRyWzFdXSA9IGF0dHJbMl0gfHwgXCJcIjtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gY2FjaGVkO1xuXHR9XG59XG5cbnZhciBERVZNT0RFID0ge1xuXHRzeW5jUmVkcmF3OiBmYWxzZSxcblxuXHR3YXJuaW5nczogdHJ1ZSxcblxuXHR2ZXJib3NlOiB0cnVlLFxuXG5cdG11dGF0aW9uczogdHJ1ZSxcblxuXHREQVRBX1JFUExBQ0VEOiBmdW5jdGlvbih2bSwgb2xkRGF0YSwgbmV3RGF0YSkge1xuXHRcdGlmIChpc0Z1bmModm0udmlldykgJiYgdm0udmlldy5sZW5ndGggPiAxKSB7XG5cdFx0XHR2YXIgbXNnID0gXCJBIHZpZXcncyBkYXRhIHdhcyByZXBsYWNlZC4gVGhlIGRhdGEgb3JpZ2luYWxseSBwYXNzZWQgdG8gdGhlIHZpZXcgY2xvc3VyZSBkdXJpbmcgaW5pdCBpcyBub3cgc3RhbGUuIFlvdSBtYXkgd2FudCB0byByZWx5IG9ubHkgb24gdGhlIGRhdGEgcGFzc2VkIHRvIHJlbmRlcigpIG9yIHZtLmRhdGEuXCI7XG5cdFx0XHRyZXR1cm4gW21zZywgdm0sIG9sZERhdGEsIG5ld0RhdGFdO1xuXHRcdH1cblx0fSxcblxuXHRVTktFWUVEX0lOUFVUOiBmdW5jdGlvbih2bm9kZSkge1xuXHRcdHJldHVybiBbXCJVbmtleWVkIDxpbnB1dD4gZGV0ZWN0ZWQuIENvbnNpZGVyIGFkZGluZyBhIG5hbWUsIGlkLCBfa2V5LCBvciBfcmVmIGF0dHIgdG8gYXZvaWQgYWNjaWRlbnRhbCBET00gcmVjeWNsaW5nIGJldHdlZW4gZGlmZmVyZW50IDxpbnB1dD4gdHlwZXMuXCIsIHZub2RlXTtcblx0fSxcblxuXHRVTk1PVU5URURfUkVEUkFXOiBmdW5jdGlvbih2bSkge1xuXHRcdHJldHVybiBbXCJJbnZva2luZyByZWRyYXcoKSBvZiBhbiB1bm1vdW50ZWQgKHN1Yil2aWV3IG1heSByZXN1bHQgaW4gZXJyb3JzLlwiLCB2bV07XG5cdH0sXG5cblx0SU5MSU5FX0hBTkRMRVI6IGZ1bmN0aW9uKHZub2RlLCBvdmFsLCBudmFsKSB7XG5cdFx0cmV0dXJuIFtcIkFub255bW91cyBldmVudCBoYW5kbGVycyBnZXQgcmUtYm91bmQgb24gZWFjaCByZWRyYXcsIGNvbnNpZGVyIGRlZmluaW5nIHRoZW0gb3V0c2lkZSBvZiB0ZW1wbGF0ZXMgZm9yIGJldHRlciByZXVzZS5cIiwgdm5vZGUsIG92YWwsIG52YWxdO1xuXHR9LFxuXG5cdE1JU01BVENIRURfSEFORExFUjogZnVuY3Rpb24odm5vZGUsIG92YWwsIG52YWwpIHtcblx0XHRyZXR1cm4gW1wiUGF0Y2hpbmcgb2YgZGlmZmVyZW50IGV2ZW50IGhhbmRsZXIgc3R5bGVzIGlzIG5vdCBmdWxseSBzdXBwb3J0ZWQgZm9yIHBlcmZvcm1hbmNlIHJlYXNvbnMuIEVuc3VyZSB0aGF0IGhhbmRsZXJzIGFyZSBkZWZpbmVkIHVzaW5nIHRoZSBzYW1lIHN0eWxlLlwiLCB2bm9kZSwgb3ZhbCwgbnZhbF07XG5cdH0sXG5cblx0U1ZHX1dST05HX0ZBQ1RPUlk6IGZ1bmN0aW9uKHZub2RlKSB7XG5cdFx0cmV0dXJuIFtcIjxzdmc+IGRlZmluZWQgdXNpbmcgZG9tdm0uZGVmaW5lRWxlbWVudC4gVXNlIGRvbXZtLmRlZmluZVN2Z0VsZW1lbnQgZm9yIDxzdmc+ICYgY2hpbGQgbm9kZXMuXCIsIHZub2RlXTtcblx0fSxcblxuXHRGT1JFSUdOX0VMRU1FTlQ6IGZ1bmN0aW9uKGVsKSB7XG5cdFx0cmV0dXJuIFtcImRvbXZtIHN0dW1ibGVkIHVwb24gYW4gZWxlbWVudCBpbiBpdHMgRE9NIHRoYXQgaXQgZGlkbid0IGNyZWF0ZSwgd2hpY2ggbWF5IGJlIHByb2JsZW1hdGljLiBZb3UgY2FuIGluamVjdCBleHRlcm5hbCBlbGVtZW50cyBpbnRvIHRoZSB2dHJlZSB1c2luZyBkb212bS5pbmplY3RFbGVtZW50LlwiLCBlbF07XG5cdH0sXG5cblx0UkVVU0VEX0FUVFJTOiBmdW5jdGlvbih2bm9kZSkge1xuXHRcdHJldHVybiBbXCJBdHRycyBvYmplY3RzIG1heSBvbmx5IGJlIHJldXNlZCBpZiB0aGV5IGFyZSB0cnVseSBzdGF0aWMsIGFzIGEgcGVyZiBvcHRpbWl6YXRpb24uIE11dGF0aW5nICYgcmV1c2luZyB0aGVtIHdpbGwgaGF2ZSBubyBlZmZlY3Qgb24gdGhlIERPTSBkdWUgdG8gMCBkaWZmLlwiLCB2bm9kZV07XG5cdH0sXG5cblx0QURKQUNFTlRfVEVYVDogZnVuY3Rpb24odm5vZGUsIHRleHQxLCB0ZXh0Mikge1xuXHRcdHJldHVybiBbXCJBZGphY2VudCB0ZXh0IG5vZGVzIHdpbGwgYmUgbWVyZ2VkLiBDb25zaWRlciBjb25jYXRlbnRhdGluZyB0aGVtIHlvdXJzZWxmIGluIHRoZSB0ZW1wbGF0ZSBmb3IgaW1wcm92ZWQgcGVyZi5cIiwgdm5vZGUsIHRleHQxLCB0ZXh0Ml07XG5cdH0sXG5cblx0QVJSQVlfRkxBVFRFTkVEOiBmdW5jdGlvbih2bm9kZSwgYXJyYXkpIHtcblx0XHRyZXR1cm4gW1wiQXJyYXlzIHdpdGhpbiB0ZW1wbGF0ZXMgd2lsbCBiZSBmbGF0dGVuZWQuIFdoZW4gdGhleSBhcmUgbGVhZGluZyBvciB0cmFpbGluZywgaXQncyBlYXN5IGFuZCBtb3JlIHBlcmZvcm1hbnQgdG8ganVzdCAuY29uY2F0KCkgdGhlbSBpbiB0aGUgdGVtcGxhdGUuXCIsIHZub2RlLCBhcnJheV07XG5cdH0sXG5cblx0QUxSRUFEWV9IWURSQVRFRDogZnVuY3Rpb24odm0pIHtcblx0XHRyZXR1cm4gW1wiQSBjaGlsZCB2aWV3IGZhaWxlZCB0byBtb3VudCBiZWNhdXNlIGl0IHdhcyBhbHJlYWR5IGh5ZHJhdGVkLiBNYWtlIHN1cmUgbm90IHRvIGludm9rZSB2bS5yZWRyYXcoKSBvciB2bS51cGRhdGUoKSBvbiB1bm1vdW50ZWQgdmlld3MuXCIsIHZtXTtcblx0fSxcblxuXHRBVFRBQ0hfSU1QTElDSVRfVEJPRFk6IGZ1bmN0aW9uKHZub2RlLCB2Y2hpbGQpIHtcblx0XHRyZXR1cm4gW1wiPHRhYmxlPjx0cj4gd2FzIGRldGVjdGVkIGluIHRoZSB2dHJlZSwgYnV0IHRoZSBET00gd2lsbCBiZSA8dGFibGU+PHRib2R5Pjx0cj4gYWZ0ZXIgSFRNTCdzIGltcGxpY2l0IHBhcnNpbmcuIFlvdSBzaG91bGQgY3JlYXRlIHRoZSA8dGJvZHk+IHZub2RlIGV4cGxpY2l0bHkgdG8gYXZvaWQgU1NSL2F0dGFjaCgpIGZhaWx1cmVzLlwiLCB2bm9kZSwgdmNoaWxkXTtcblx0fVxufTtcblxuZnVuY3Rpb24gZGV2Tm90aWZ5KGtleSwgYXJncykge1xuXHRpZiAoREVWTU9ERS53YXJuaW5ncyAmJiBpc0Z1bmMoREVWTU9ERVtrZXldKSkge1xuXHRcdHZhciBtc2dBcmdzID0gREVWTU9ERVtrZXldLmFwcGx5KG51bGwsIGFyZ3MpO1xuXG5cdFx0aWYgKG1zZ0FyZ3MpIHtcblx0XHRcdG1zZ0FyZ3NbMF0gPSBrZXkgKyBcIjogXCIgKyAoREVWTU9ERS52ZXJib3NlID8gbXNnQXJnc1swXSA6IFwiXCIpO1xuXHRcdFx0Y29uc29sZS53YXJuLmFwcGx5KGNvbnNvbGUsIG1zZ0FyZ3MpO1xuXHRcdH1cblx0fVxufVxuXG4vLyAoZGUpb3B0aW1pemF0aW9uIGZsYWdzXG5cbi8vIGZvcmNlcyBzbG93IGJvdHRvbS11cCByZW1vdmVDaGlsZCB0byBmaXJlIGRlZXAgd2lsbFJlbW92ZS93aWxsVW5tb3VudCBob29rcyxcbnZhciBERUVQX1JFTU9WRSA9IDE7XG4vLyBwcmV2ZW50cyBpbnNlcnRpbmcvcmVtb3ZpbmcvcmVvcmRlcmluZyBvZiBjaGlsZHJlblxudmFyIEZJWEVEX0JPRFkgPSAyO1xuLy8gZW5hYmxlcyBmYXN0IGtleWVkIGxvb2t1cCBvZiBjaGlsZHJlbiB2aWEgYmluYXJ5IHNlYXJjaCwgZXhwZWN0cyBob21vZ2VuZW91cyBrZXllZCBib2R5XG52YXIgS0VZRURfTElTVCA9IDQ7XG4vLyBpbmRpY2F0ZXMgYW4gdm5vZGUgbWF0Y2gvZGlmZi9yZWN5Y2xlciBmdW5jdGlvbiBmb3IgYm9keVxudmFyIExBWllfTElTVCA9IDg7XG5cbmZ1bmN0aW9uIGluaXRFbGVtZW50Tm9kZSh0YWcsIGF0dHJzLCBib2R5LCBmbGFncykge1xuXHR2YXIgbm9kZSA9IG5ldyBWTm9kZTtcblxuXHRub2RlLnR5cGUgPSBFTEVNRU5UO1xuXG5cdGlmIChpc1NldChmbGFncykpXG5cdFx0eyBub2RlLmZsYWdzID0gZmxhZ3M7IH1cblxuXHRub2RlLmF0dHJzID0gYXR0cnM7XG5cblx0dmFyIHBhcnNlZCA9IGNzc1RhZyh0YWcpO1xuXG5cdG5vZGUudGFnID0gcGFyc2VkLnRhZztcblxuXHQvLyBtZWgsIHdlYWsgYXNzZXJ0aW9uLCB3aWxsIGZhaWwgZm9yIGlkPTAsIGV0Yy5cblx0aWYgKHBhcnNlZC5pZCB8fCBwYXJzZWQuY2xhc3MgfHwgcGFyc2VkLmF0dHJzKSB7XG5cdFx0dmFyIHAgPSBub2RlLmF0dHJzIHx8IHt9O1xuXG5cdFx0aWYgKHBhcnNlZC5pZCAmJiAhaXNTZXQocC5pZCkpXG5cdFx0XHR7IHAuaWQgPSBwYXJzZWQuaWQ7IH1cblxuXHRcdGlmIChwYXJzZWQuY2xhc3MpIHtcblx0XHRcdG5vZGUuX2NsYXNzID0gcGFyc2VkLmNsYXNzO1x0XHQvLyBzdGF0aWMgY2xhc3Ncblx0XHRcdHAuY2xhc3MgPSBwYXJzZWQuY2xhc3MgKyAoaXNTZXQocC5jbGFzcykgPyAoXCIgXCIgKyBwLmNsYXNzKSA6IFwiXCIpO1xuXHRcdH1cblx0XHRpZiAocGFyc2VkLmF0dHJzKSB7XG5cdFx0XHRmb3IgKHZhciBrZXkgaW4gcGFyc2VkLmF0dHJzKVxuXHRcdFx0XHR7IGlmICghaXNTZXQocFtrZXldKSlcblx0XHRcdFx0XHR7IHBba2V5XSA9IHBhcnNlZC5hdHRyc1trZXldOyB9IH1cblx0XHR9XG5cbi8vXHRcdGlmIChub2RlLmF0dHJzICE9PSBwKVxuXHRcdFx0bm9kZS5hdHRycyA9IHA7XG5cdH1cblxuXHR2YXIgbWVyZ2VkQXR0cnMgPSBub2RlLmF0dHJzO1xuXG5cdGlmIChpc1NldChtZXJnZWRBdHRycykpIHtcblx0XHRpZiAoaXNTZXQobWVyZ2VkQXR0cnMuX2tleSkpXG5cdFx0XHR7IG5vZGUua2V5ID0gbWVyZ2VkQXR0cnMuX2tleTsgfVxuXG5cdFx0aWYgKGlzU2V0KG1lcmdlZEF0dHJzLl9yZWYpKVxuXHRcdFx0eyBub2RlLnJlZiA9IG1lcmdlZEF0dHJzLl9yZWY7IH1cblxuXHRcdGlmIChpc1NldChtZXJnZWRBdHRycy5faG9va3MpKVxuXHRcdFx0eyBub2RlLmhvb2tzID0gbWVyZ2VkQXR0cnMuX2hvb2tzOyB9XG5cblx0XHRpZiAoaXNTZXQobWVyZ2VkQXR0cnMuX2RhdGEpKVxuXHRcdFx0eyBub2RlLmRhdGEgPSBtZXJnZWRBdHRycy5fZGF0YTsgfVxuXG5cdFx0aWYgKGlzU2V0KG1lcmdlZEF0dHJzLl9mbGFncykpXG5cdFx0XHR7IG5vZGUuZmxhZ3MgPSBtZXJnZWRBdHRycy5fZmxhZ3M7IH1cblxuXHRcdGlmICghaXNTZXQobm9kZS5rZXkpKSB7XG5cdFx0XHRpZiAoaXNTZXQobm9kZS5yZWYpKVxuXHRcdFx0XHR7IG5vZGUua2V5ID0gbm9kZS5yZWY7IH1cblx0XHRcdGVsc2UgaWYgKGlzU2V0KG1lcmdlZEF0dHJzLmlkKSlcblx0XHRcdFx0eyBub2RlLmtleSA9IG1lcmdlZEF0dHJzLmlkOyB9XG5cdFx0XHRlbHNlIGlmIChpc1NldChtZXJnZWRBdHRycy5uYW1lKSlcblx0XHRcdFx0eyBub2RlLmtleSA9IG1lcmdlZEF0dHJzLm5hbWUgKyAobWVyZ2VkQXR0cnMudHlwZSA9PT0gXCJyYWRpb1wiIHx8IG1lcmdlZEF0dHJzLnR5cGUgPT09IFwiY2hlY2tib3hcIiA/IG1lcmdlZEF0dHJzLnZhbHVlIDogXCJcIik7IH1cblx0XHR9XG5cdH1cblxuXHRpZiAoYm9keSAhPSBudWxsKVxuXHRcdHsgbm9kZS5ib2R5ID0gYm9keTsgfVxuXG5cdHtcblx0XHRpZiAobm9kZS50YWcgPT09IFwic3ZnXCIpIHtcblx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cdFx0XHRcdG5vZGUubnMgPT0gbnVsbCAmJiBkZXZOb3RpZnkoXCJTVkdfV1JPTkdfRkFDVE9SWVwiLCBbbm9kZV0pO1xuXHRcdFx0fSwgMTYpO1xuXHRcdH1cblx0XHQvLyB0b2RvOiBhdHRycy5jb250ZW50ZWRpdGFibGUgPT09IFwidHJ1ZVwiP1xuXHRcdGVsc2UgaWYgKC9eKD86aW5wdXR8dGV4dGFyZWF8c2VsZWN0fGRhdGFsaXN0fGtleWdlbnxvdXRwdXQpJC8udGVzdChub2RlLnRhZykgJiYgbm9kZS5rZXkgPT0gbnVsbClcblx0XHRcdHsgZGV2Tm90aWZ5KFwiVU5LRVlFRF9JTlBVVFwiLCBbbm9kZV0pOyB9XG5cdH1cblxuXHRyZXR1cm4gbm9kZTtcbn1cblxuZnVuY3Rpb24gc2V0UmVmKHZtLCBuYW1lLCBub2RlKSB7XG5cdHZhciBwYXRoID0gW1wicmVmc1wiXS5jb25jYXQobmFtZS5zcGxpdChcIi5cIikpO1xuXHRkZWVwU2V0KHZtLCBwYXRoLCBub2RlKTtcbn1cblxuZnVuY3Rpb24gc2V0RGVlcFJlbW92ZShub2RlKSB7XG5cdHdoaWxlIChub2RlID0gbm9kZS5wYXJlbnQpXG5cdFx0eyBub2RlLmZsYWdzIHw9IERFRVBfUkVNT1ZFOyB9XG59XG5cbi8vIHZuZXcsIHZvbGRcbmZ1bmN0aW9uIHByZVByb2Modm5ldywgcGFyZW50LCBpZHgsIG93blZtKSB7XG5cdGlmICh2bmV3LnR5cGUgPT09IFZNT0RFTCB8fCB2bmV3LnR5cGUgPT09IFZWSUVXKVxuXHRcdHsgcmV0dXJuOyB9XG5cblx0dm5ldy5wYXJlbnQgPSBwYXJlbnQ7XG5cdHZuZXcuaWR4ID0gaWR4O1xuXHR2bmV3LnZtID0gb3duVm07XG5cblx0aWYgKHZuZXcucmVmICE9IG51bGwpXG5cdFx0eyBzZXRSZWYoZ2V0Vm0odm5ldyksIHZuZXcucmVmLCB2bmV3KTsgfVxuXG5cdHZhciBuaCA9IHZuZXcuaG9va3MsXG5cdFx0dmggPSBvd25WbSAmJiBvd25WbS5ob29rcztcblxuXHRpZiAobmggJiYgKG5oLndpbGxSZW1vdmUgfHwgbmguZGlkUmVtb3ZlKSB8fFxuXHRcdHZoICYmICh2aC53aWxsVW5tb3VudCB8fCB2aC5kaWRVbm1vdW50KSlcblx0XHR7IHNldERlZXBSZW1vdmUodm5ldyk7IH1cblxuXHRpZiAoaXNBcnIodm5ldy5ib2R5KSlcblx0XHR7IHByZVByb2NCb2R5KHZuZXcpOyB9XG5cdGVsc2Uge1xuXHRcdGlmIChpc1N0cmVhbSh2bmV3LmJvZHkpKVxuXHRcdFx0eyB2bmV3LmJvZHkgPSBob29rU3RyZWFtKHZuZXcuYm9keSwgZ2V0Vm0odm5ldykpOyB9XG5cdH1cbn1cblxuZnVuY3Rpb24gcHJlUHJvY0JvZHkodm5ldykge1xuXHR2YXIgYm9keSA9IHZuZXcuYm9keTtcblxuXHRmb3IgKHZhciBpID0gMDsgaSA8IGJvZHkubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgbm9kZTIgPSBib2R5W2ldO1xuXG5cdFx0Ly8gcmVtb3ZlIGZhbHNlL251bGwvdW5kZWZpbmVkXG5cdFx0aWYgKG5vZGUyID09PSBmYWxzZSB8fCBub2RlMiA9PSBudWxsKVxuXHRcdFx0eyBib2R5LnNwbGljZShpLS0sIDEpOyB9XG5cdFx0Ly8gZmxhdHRlbiBhcnJheXNcblx0XHRlbHNlIGlmIChpc0Fycihub2RlMikpIHtcblx0XHRcdHtcblx0XHRcdFx0aWYgKGkgPT09IDAgfHwgaSA9PT0gYm9keS5sZW5ndGggLSAxKVxuXHRcdFx0XHRcdHsgZGV2Tm90aWZ5KFwiQVJSQVlfRkxBVFRFTkVEXCIsIFt2bmV3LCBub2RlMl0pOyB9XG5cdFx0XHR9XG5cdFx0XHRpbnNlcnRBcnIoYm9keSwgbm9kZTIsIGktLSwgMSk7XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0aWYgKG5vZGUyLnR5cGUgPT0gbnVsbClcblx0XHRcdFx0eyBib2R5W2ldID0gbm9kZTIgPSBkZWZpbmVUZXh0KFwiXCIrbm9kZTIpOyB9XG5cblx0XHRcdGlmIChub2RlMi50eXBlID09PSBURVhUKSB7XG5cdFx0XHRcdC8vIHJlbW92ZSBlbXB0eSB0ZXh0IG5vZGVzXG5cdFx0XHRcdGlmIChub2RlMi5ib2R5ID09IG51bGwgfHwgbm9kZTIuYm9keSA9PT0gXCJcIilcblx0XHRcdFx0XHR7IGJvZHkuc3BsaWNlKGktLSwgMSk7IH1cblx0XHRcdFx0Ly8gbWVyZ2Ugd2l0aCBwcmV2aW91cyB0ZXh0IG5vZGVcblx0XHRcdFx0ZWxzZSBpZiAoaSA+IDAgJiYgYm9keVtpLTFdLnR5cGUgPT09IFRFWFQpIHtcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRkZXZOb3RpZnkoXCJBREpBQ0VOVF9URVhUXCIsIFt2bmV3LCBib2R5W2ktMV0uYm9keSwgbm9kZTIuYm9keV0pO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRib2R5W2ktMV0uYm9keSArPSBub2RlMi5ib2R5O1xuXHRcdFx0XHRcdGJvZHkuc3BsaWNlKGktLSwgMSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdHsgcHJlUHJvYyhub2RlMiwgdm5ldywgaSwgbnVsbCk7IH1cblx0XHRcdH1cblx0XHRcdGVsc2Vcblx0XHRcdFx0eyBwcmVQcm9jKG5vZGUyLCB2bmV3LCBpLCBudWxsKTsgfVxuXHRcdH1cblx0fVxufVxuXG52YXIgdW5pdGxlc3NQcm9wcyA9IHtcblx0YW5pbWF0aW9uSXRlcmF0aW9uQ291bnQ6IHRydWUsXG5cdGJveEZsZXg6IHRydWUsXG5cdGJveEZsZXhHcm91cDogdHJ1ZSxcblx0Ym94T3JkaW5hbEdyb3VwOiB0cnVlLFxuXHRjb2x1bW5Db3VudDogdHJ1ZSxcblx0ZmxleDogdHJ1ZSxcblx0ZmxleEdyb3c6IHRydWUsXG5cdGZsZXhQb3NpdGl2ZTogdHJ1ZSxcblx0ZmxleFNocmluazogdHJ1ZSxcblx0ZmxleE5lZ2F0aXZlOiB0cnVlLFxuXHRmbGV4T3JkZXI6IHRydWUsXG5cdGdyaWRSb3c6IHRydWUsXG5cdGdyaWRDb2x1bW46IHRydWUsXG5cdG9yZGVyOiB0cnVlLFxuXHRsaW5lQ2xhbXA6IHRydWUsXG5cblx0Ym9yZGVySW1hZ2VPdXRzZXQ6IHRydWUsXG5cdGJvcmRlckltYWdlU2xpY2U6IHRydWUsXG5cdGJvcmRlckltYWdlV2lkdGg6IHRydWUsXG5cdGZvbnRXZWlnaHQ6IHRydWUsXG5cdGxpbmVIZWlnaHQ6IHRydWUsXG5cdG9wYWNpdHk6IHRydWUsXG5cdG9ycGhhbnM6IHRydWUsXG5cdHRhYlNpemU6IHRydWUsXG5cdHdpZG93czogdHJ1ZSxcblx0ekluZGV4OiB0cnVlLFxuXHR6b29tOiB0cnVlLFxuXG5cdGZpbGxPcGFjaXR5OiB0cnVlLFxuXHRmbG9vZE9wYWNpdHk6IHRydWUsXG5cdHN0b3BPcGFjaXR5OiB0cnVlLFxuXHRzdHJva2VEYXNoYXJyYXk6IHRydWUsXG5cdHN0cm9rZURhc2hvZmZzZXQ6IHRydWUsXG5cdHN0cm9rZU1pdGVybGltaXQ6IHRydWUsXG5cdHN0cm9rZU9wYWNpdHk6IHRydWUsXG5cdHN0cm9rZVdpZHRoOiB0cnVlXG59O1xuXG5mdW5jdGlvbiBhdXRvUHgobmFtZSwgdmFsKSB7XG5cdHtcblx0XHQvLyB0eXBlb2YgdmFsID09PSAnbnVtYmVyJyBpcyBmYXN0ZXIgYnV0IGZhaWxzIGZvciBudW1lcmljIHN0cmluZ3Ncblx0XHRyZXR1cm4gIWlzTmFOKHZhbCkgJiYgIXVuaXRsZXNzUHJvcHNbbmFtZV0gPyAodmFsICsgXCJweFwiKSA6IHZhbDtcblx0fVxufVxuXG4vLyBhc3N1bWVzIGlmIHN0eWxlcyBleGlzdCBib3RoIGFyZSBvYmplY3RzIG9yIGJvdGggYXJlIHN0cmluZ3NcbmZ1bmN0aW9uIHBhdGNoU3R5bGUobiwgbykge1xuXHR2YXIgbnMgPSAgICAgKG4uYXR0cnMgfHwgZW1wdHlPYmopLnN0eWxlO1xuXHR2YXIgb3MgPSBvID8gKG8uYXR0cnMgfHwgZW1wdHlPYmopLnN0eWxlIDogbnVsbDtcblxuXHQvLyByZXBsYWNlIG9yIHJlbW92ZSBpbiBmdWxsXG5cdGlmIChucyA9PSBudWxsIHx8IGlzVmFsKG5zKSlcblx0XHR7IG4uZWwuc3R5bGUuY3NzVGV4dCA9IG5zOyB9XG5cdGVsc2Uge1xuXHRcdGZvciAodmFyIG5uIGluIG5zKSB7XG5cdFx0XHR2YXIgbnYgPSBuc1tubl07XG5cblx0XHRcdHtcblx0XHRcdFx0aWYgKGlzU3RyZWFtKG52KSlcblx0XHRcdFx0XHR7IG52ID0gaG9va1N0cmVhbShudiwgZ2V0Vm0obikpOyB9XG5cdFx0XHR9XG5cblx0XHRcdGlmIChvcyA9PSBudWxsIHx8IG52ICE9IG51bGwgJiYgbnYgIT09IG9zW25uXSlcblx0XHRcdFx0eyBuLmVsLnN0eWxlW25uXSA9IGF1dG9QeChubiwgbnYpOyB9XG5cdFx0fVxuXG5cdFx0Ly8gY2xlYW4gb2xkXG5cdFx0aWYgKG9zKSB7XG5cdFx0XHRmb3IgKHZhciBvbiBpbiBvcykge1xuXHRcdFx0XHRpZiAobnNbb25dID09IG51bGwpXG5cdFx0XHRcdFx0eyBuLmVsLnN0eWxlW29uXSA9IFwiXCI7IH1cblx0XHRcdH1cblx0XHR9XG5cdH1cbn1cblxudmFyIGRpZFF1ZXVlID0gW107XG5cbmZ1bmN0aW9uIGZpcmVIb29rKGhvb2tzLCBuYW1lLCBvLCBuLCBpbW1lZGlhdGUpIHtcblx0aWYgKGhvb2tzICE9IG51bGwpIHtcblx0XHR2YXIgZm4gPSBvLmhvb2tzW25hbWVdO1xuXG5cdFx0aWYgKGZuKSB7XG5cdFx0XHRpZiAobmFtZVswXSA9PT0gXCJkXCIgJiYgbmFtZVsxXSA9PT0gXCJpXCIgJiYgbmFtZVsyXSA9PT0gXCJkXCIpIHtcdC8vIGRpZCpcblx0XHRcdFx0Ly9cdGNvbnNvbGUubG9nKG5hbWUgKyBcIiBzaG91bGQgcXVldWUgdGlsbCByZXBhaW50XCIsIG8sIG4pO1xuXHRcdFx0XHRpbW1lZGlhdGUgPyByZXBhaW50KG8ucGFyZW50KSAmJiBmbihvLCBuKSA6IGRpZFF1ZXVlLnB1c2goW2ZuLCBvLCBuXSk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcdFx0Ly8gd2lsbCpcblx0XHRcdFx0Ly9cdGNvbnNvbGUubG9nKG5hbWUgKyBcIiBtYXkgZGVsYXkgYnkgcHJvbWlzZVwiLCBvLCBuKTtcblx0XHRcdFx0cmV0dXJuIGZuKG8sIG4pO1x0XHQvLyBvciBwYXNzICBkb25lKCkgcmVzb2x2ZXJcblx0XHRcdH1cblx0XHR9XG5cdH1cbn1cblxuZnVuY3Rpb24gZHJhaW5EaWRIb29rcyh2bSkge1xuXHRpZiAoZGlkUXVldWUubGVuZ3RoKSB7XG5cdFx0cmVwYWludCh2bS5ub2RlKTtcblxuXHRcdHZhciBpdGVtO1xuXHRcdHdoaWxlIChpdGVtID0gZGlkUXVldWUuc2hpZnQoKSlcblx0XHRcdHsgaXRlbVswXShpdGVtWzFdLCBpdGVtWzJdKTsgfVxuXHR9XG59XG5cbnZhciBkb2MgPSBFTlZfRE9NID8gZG9jdW1lbnQgOiBudWxsO1xuXG5mdW5jdGlvbiBjbG9zZXN0Vk5vZGUoZWwpIHtcblx0d2hpbGUgKGVsLl9ub2RlID09IG51bGwpXG5cdFx0eyBlbCA9IGVsLnBhcmVudE5vZGU7IH1cblx0cmV0dXJuIGVsLl9ub2RlO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVFbGVtZW50KHRhZywgbnMpIHtcblx0aWYgKG5zICE9IG51bGwpXG5cdFx0eyByZXR1cm4gZG9jLmNyZWF0ZUVsZW1lbnROUyhucywgdGFnKTsgfVxuXHRyZXR1cm4gZG9jLmNyZWF0ZUVsZW1lbnQodGFnKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlVGV4dE5vZGUoYm9keSkge1xuXHRyZXR1cm4gZG9jLmNyZWF0ZVRleHROb2RlKGJvZHkpO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVDb21tZW50KGJvZHkpIHtcblx0cmV0dXJuIGRvYy5jcmVhdGVDb21tZW50KGJvZHkpO1xufVxuXG4vLyA/IHJlbW92ZXMgaWYgIXJlY3ljbGVkXG5mdW5jdGlvbiBuZXh0U2liKHNpYikge1xuXHRyZXR1cm4gc2liLm5leHRTaWJsaW5nO1xufVxuXG4vLyA/IHJlbW92ZXMgaWYgIXJlY3ljbGVkXG5mdW5jdGlvbiBwcmV2U2liKHNpYikge1xuXHRyZXR1cm4gc2liLnByZXZpb3VzU2libGluZztcbn1cblxuLy8gVE9ETzogdGhpcyBzaG91bGQgY29sbGVjdCBhbGwgZGVlcCBwcm9tcyBmcm9tIGFsbCBob29rcyBhbmQgcmV0dXJuIFByb21pc2UuYWxsKClcbmZ1bmN0aW9uIGRlZXBOb3RpZnlSZW1vdmUobm9kZSkge1xuXHR2YXIgdm0gPSBub2RlLnZtO1xuXG5cdHZhciB3dVJlcyA9IHZtICE9IG51bGwgJiYgZmlyZUhvb2sodm0uaG9va3MsIFwid2lsbFVubW91bnRcIiwgdm0sIHZtLmRhdGEpO1xuXG5cdHZhciB3clJlcyA9IGZpcmVIb29rKG5vZGUuaG9va3MsIFwid2lsbFJlbW92ZVwiLCBub2RlKTtcblxuXHRpZiAoKG5vZGUuZmxhZ3MgJiBERUVQX1JFTU9WRSkgPT09IERFRVBfUkVNT1ZFICYmIGlzQXJyKG5vZGUuYm9keSkpIHtcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IG5vZGUuYm9keS5sZW5ndGg7IGkrKylcblx0XHRcdHsgZGVlcE5vdGlmeVJlbW92ZShub2RlLmJvZHlbaV0pOyB9XG5cdH1cblxuXHRyZXR1cm4gd3VSZXMgfHwgd3JSZXM7XG59XG5cbmZ1bmN0aW9uIF9yZW1vdmVDaGlsZChwYXJFbCwgZWwsIGltbWVkaWF0ZSkge1xuXHR2YXIgbm9kZSA9IGVsLl9ub2RlLCB2bSA9IG5vZGUudm07XG5cblx0aWYgKGlzQXJyKG5vZGUuYm9keSkpIHtcblx0XHRpZiAoKG5vZGUuZmxhZ3MgJiBERUVQX1JFTU9WRSkgPT09IERFRVBfUkVNT1ZFKSB7XG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IG5vZGUuYm9keS5sZW5ndGg7IGkrKylcblx0XHRcdFx0eyBfcmVtb3ZlQ2hpbGQoZWwsIG5vZGUuYm9keVtpXS5lbCk7IH1cblx0XHR9XG5cdFx0ZWxzZVxuXHRcdFx0eyBkZWVwVW5yZWYobm9kZSk7IH1cblx0fVxuXG5cdGRlbGV0ZSBlbC5fbm9kZTtcblxuXHRwYXJFbC5yZW1vdmVDaGlsZChlbCk7XG5cblx0ZmlyZUhvb2sobm9kZS5ob29rcywgXCJkaWRSZW1vdmVcIiwgbm9kZSwgbnVsbCwgaW1tZWRpYXRlKTtcblxuXHRpZiAodm0gIT0gbnVsbCkge1xuXHRcdGZpcmVIb29rKHZtLmhvb2tzLCBcImRpZFVubW91bnRcIiwgdm0sIHZtLmRhdGEsIGltbWVkaWF0ZSk7XG5cdFx0dm0ubm9kZSA9IG51bGw7XG5cdH1cbn1cblxuLy8gdG9kbzogc2hvdWxkIGRlbGF5IHBhcmVudCB1bm1vdW50KCkgYnkgcmV0dXJuaW5nIHJlcyBwcm9tP1xuZnVuY3Rpb24gcmVtb3ZlQ2hpbGQocGFyRWwsIGVsKSB7XG5cdHZhciBub2RlID0gZWwuX25vZGU7XG5cblx0Ly8gYWxyZWFkeSBtYXJrZWQgZm9yIHJlbW92YWxcblx0aWYgKG5vZGUuX2RlYWQpIHsgcmV0dXJuOyB9XG5cblx0dmFyIHJlcyA9IGRlZXBOb3RpZnlSZW1vdmUobm9kZSk7XG5cblx0aWYgKHJlcyAhPSBudWxsICYmIGlzUHJvbShyZXMpKSB7XG5cdFx0bm9kZS5fZGVhZCA9IHRydWU7XG5cdFx0cmVzLnRoZW4oY3VycnkoX3JlbW92ZUNoaWxkLCBbcGFyRWwsIGVsLCB0cnVlXSkpO1xuXHR9XG5cdGVsc2Vcblx0XHR7IF9yZW1vdmVDaGlsZChwYXJFbCwgZWwpOyB9XG59XG5cbmZ1bmN0aW9uIGRlZXBVbnJlZihub2RlKSB7XG5cdHZhciBvYm9keSA9IG5vZGUuYm9keTtcblxuXHRmb3IgKHZhciBpID0gMDsgaSA8IG9ib2R5Lmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIG8yID0gb2JvZHlbaV07XG5cdFx0ZGVsZXRlIG8yLmVsLl9ub2RlO1xuXG5cdFx0aWYgKG8yLnZtICE9IG51bGwpXG5cdFx0XHR7IG8yLnZtLm5vZGUgPSBudWxsOyB9XG5cblx0XHRpZiAoaXNBcnIobzIuYm9keSkpXG5cdFx0XHR7IGRlZXBVbnJlZihvMik7IH1cblx0fVxufVxuXG5mdW5jdGlvbiBjbGVhckNoaWxkcmVuKHBhcmVudCkge1xuXHR2YXIgcGFyRWwgPSBwYXJlbnQuZWw7XG5cblx0aWYgKChwYXJlbnQuZmxhZ3MgJiBERUVQX1JFTU9WRSkgPT09IDApIHtcblx0XHRpc0FycihwYXJlbnQuYm9keSkgJiYgZGVlcFVucmVmKHBhcmVudCk7XG5cdFx0cGFyRWwudGV4dENvbnRlbnQgPSBudWxsO1xuXHR9XG5cdGVsc2Uge1xuXHRcdHZhciBlbCA9IHBhckVsLmZpcnN0Q2hpbGQ7XG5cblx0XHRkbyB7XG5cdFx0XHR2YXIgbmV4dCA9IG5leHRTaWIoZWwpO1xuXHRcdFx0cmVtb3ZlQ2hpbGQocGFyRWwsIGVsKTtcblx0XHR9IHdoaWxlIChlbCA9IG5leHQpO1xuXHR9XG59XG5cbi8vIHRvZG86IGhvb2tzXG5mdW5jdGlvbiBpbnNlcnRCZWZvcmUocGFyRWwsIGVsLCByZWZFbCkge1xuXHR2YXIgbm9kZSA9IGVsLl9ub2RlLCBpbkRvbSA9IGVsLnBhcmVudE5vZGUgIT0gbnVsbDtcblxuXHQvLyBlbCA9PT0gcmVmRWwgaXMgYXNzZXJ0ZWQgYXMgYSBuby1vcCBpbnNlcnQgY2FsbGVkIHRvIGZpcmUgaG9va3Ncblx0dmFyIHZtID0gKGVsID09PSByZWZFbCB8fCAhaW5Eb20pID8gbm9kZS52bSA6IG51bGw7XG5cblx0aWYgKHZtICE9IG51bGwpXG5cdFx0eyBmaXJlSG9vayh2bS5ob29rcywgXCJ3aWxsTW91bnRcIiwgdm0sIHZtLmRhdGEpOyB9XG5cblx0ZmlyZUhvb2sobm9kZS5ob29rcywgaW5Eb20gPyBcIndpbGxSZWluc2VydFwiIDogXCJ3aWxsSW5zZXJ0XCIsIG5vZGUpO1xuXHRwYXJFbC5pbnNlcnRCZWZvcmUoZWwsIHJlZkVsKTtcblx0ZmlyZUhvb2sobm9kZS5ob29rcywgaW5Eb20gPyBcImRpZFJlaW5zZXJ0XCIgOiBcImRpZEluc2VydFwiLCBub2RlKTtcblxuXHRpZiAodm0gIT0gbnVsbClcblx0XHR7IGZpcmVIb29rKHZtLmhvb2tzLCBcImRpZE1vdW50XCIsIHZtLCB2bS5kYXRhKTsgfVxufVxuXG5mdW5jdGlvbiBpbnNlcnRBZnRlcihwYXJFbCwgZWwsIHJlZkVsKSB7XG5cdGluc2VydEJlZm9yZShwYXJFbCwgZWwsIHJlZkVsID8gbmV4dFNpYihyZWZFbCkgOiBudWxsKTtcbn1cblxudmFyIG9uZW1pdCA9IHt9O1xuXG5mdW5jdGlvbiBlbWl0Q2ZnKGNmZykge1xuXHRhc3NpZ25PYmoob25lbWl0LCBjZmcpO1xufVxuXG5mdW5jdGlvbiBlbWl0KGV2TmFtZSkge1xuXHR2YXIgdGFyZyA9IHRoaXMsXG5cdFx0c3JjID0gdGFyZztcblxuXHR2YXIgYXJncyA9IHNsaWNlQXJncyhhcmd1bWVudHMsIDEpLmNvbmNhdChzcmMsIHNyYy5kYXRhKTtcblxuXHRkbyB7XG5cdFx0dmFyIGV2cyA9IHRhcmcub25lbWl0O1xuXHRcdHZhciBmbiA9IGV2cyA/IGV2c1tldk5hbWVdIDogbnVsbDtcblxuXHRcdGlmIChmbikge1xuXHRcdFx0Zm4uYXBwbHkodGFyZywgYXJncyk7XG5cdFx0XHRicmVhaztcblx0XHR9XG5cdH0gd2hpbGUgKHRhcmcgPSB0YXJnLnBhcmVudCgpKTtcblxuXHRpZiAob25lbWl0W2V2TmFtZV0pXG5cdFx0eyBvbmVtaXRbZXZOYW1lXS5hcHBseSh0YXJnLCBhcmdzKTsgfVxufVxuXG52YXIgb25ldmVudCA9IG5vb3A7XG5cbmZ1bmN0aW9uIGNvbmZpZyhuZXdDZmcpIHtcblx0b25ldmVudCA9IG5ld0NmZy5vbmV2ZW50IHx8IG9uZXZlbnQ7XG5cblx0e1xuXHRcdGlmIChuZXdDZmcub25lbWl0KVxuXHRcdFx0eyBlbWl0Q2ZnKG5ld0NmZy5vbmVtaXQpOyB9XG5cdH1cblxuXHR7XG5cdFx0aWYgKG5ld0NmZy5zdHJlYW0pXG5cdFx0XHR7IHN0cmVhbUNmZyhuZXdDZmcuc3RyZWFtKTsgfVxuXHR9XG59XG5cbmZ1bmN0aW9uIGJpbmRFdihlbCwgdHlwZSwgZm4pIHtcblx0ZWxbdHlwZV0gPSBmbjtcbn1cblxuZnVuY3Rpb24gZXhlYyhmbiwgYXJncywgZSwgbm9kZSwgdm0pIHtcblx0dmFyIG91dCA9IGZuLmFwcGx5KHZtLCBhcmdzLmNvbmNhdChbZSwgbm9kZSwgdm0sIHZtLmRhdGFdKSk7XG5cblx0Ly8gc2hvdWxkIHRoZXNlIHJlc3BlY3Qgb3V0ID09PSBmYWxzZT9cblx0dm0ub25ldmVudChlLCBub2RlLCB2bSwgdm0uZGF0YSwgYXJncyk7XG5cdG9uZXZlbnQuY2FsbChudWxsLCBlLCBub2RlLCB2bSwgdm0uZGF0YSwgYXJncyk7XG5cblx0aWYgKG91dCA9PT0gZmFsc2UpIHtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0ZS5zdG9wUHJvcGFnYXRpb24oKTtcblx0fVxufVxuXG5mdW5jdGlvbiBoYW5kbGUoZSkge1xuXHR2YXIgbm9kZSA9IGNsb3Nlc3RWTm9kZShlLnRhcmdldCk7XG5cdHZhciB2bSA9IGdldFZtKG5vZGUpO1xuXG5cdHZhciBldkRlZiA9IGUuY3VycmVudFRhcmdldC5fbm9kZS5hdHRyc1tcIm9uXCIgKyBlLnR5cGVdLCBmbiwgYXJncztcblxuXHRpZiAoaXNBcnIoZXZEZWYpKSB7XG5cdFx0Zm4gPSBldkRlZlswXTtcblx0XHRhcmdzID0gZXZEZWYuc2xpY2UoMSk7XG5cdFx0ZXhlYyhmbiwgYXJncywgZSwgbm9kZSwgdm0pO1xuXHR9XG5cdGVsc2Uge1xuXHRcdGZvciAodmFyIHNlbCBpbiBldkRlZikge1xuXHRcdFx0aWYgKGUudGFyZ2V0Lm1hdGNoZXMoc2VsKSkge1xuXHRcdFx0XHR2YXIgZXZEZWYyID0gZXZEZWZbc2VsXTtcblxuXHRcdFx0XHRpZiAoaXNBcnIoZXZEZWYyKSkge1xuXHRcdFx0XHRcdGZuID0gZXZEZWYyWzBdO1xuXHRcdFx0XHRcdGFyZ3MgPSBldkRlZjIuc2xpY2UoMSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0Zm4gPSBldkRlZjI7XG5cdFx0XHRcdFx0YXJncyA9IFtdO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0ZXhlYyhmbiwgYXJncywgZSwgbm9kZSwgdm0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxufVxuXG5mdW5jdGlvbiBwYXRjaEV2ZW50KG5vZGUsIG5hbWUsIG52YWwsIG92YWwpIHtcblx0aWYgKG52YWwgPT09IG92YWwpXG5cdFx0eyByZXR1cm47IH1cblxuXHR7XG5cdFx0aWYgKGlzRnVuYyhudmFsKSAmJiBpc0Z1bmMob3ZhbCkgJiYgb3ZhbC5uYW1lID09IG52YWwubmFtZSlcblx0XHRcdHsgZGV2Tm90aWZ5KFwiSU5MSU5FX0hBTkRMRVJcIiwgW25vZGUsIG92YWwsIG52YWxdKTsgfVxuXG5cdFx0aWYgKG92YWwgIT0gbnVsbCAmJiBudmFsICE9IG51bGwgJiZcblx0XHRcdChcblx0XHRcdFx0aXNBcnIob3ZhbCkgIT0gaXNBcnIobnZhbCkgfHxcblx0XHRcdFx0aXNQbGFpbk9iaihvdmFsKSAhPSBpc1BsYWluT2JqKG52YWwpIHx8XG5cdFx0XHRcdGlzRnVuYyhvdmFsKSAhPSBpc0Z1bmMobnZhbClcblx0XHRcdClcblx0XHQpIHsgZGV2Tm90aWZ5KFwiTUlTTUFUQ0hFRF9IQU5ETEVSXCIsIFtub2RlLCBvdmFsLCBudmFsXSk7IH1cblx0fVxuXG5cdHZhciBlbCA9IG5vZGUuZWw7XG5cblx0aWYgKG52YWwgPT0gbnVsbCB8fCBpc0Z1bmMobnZhbCkpXG5cdFx0eyBiaW5kRXYoZWwsIG5hbWUsIG52YWwpOyB9XG5cdGVsc2UgaWYgKG92YWwgPT0gbnVsbClcblx0XHR7IGJpbmRFdihlbCwgbmFtZSwgaGFuZGxlKTsgfVxufVxuXG5mdW5jdGlvbiByZW1BdHRyKG5vZGUsIG5hbWUsIGFzUHJvcCkge1xuXHRpZiAobmFtZVswXSA9PT0gXCIuXCIpIHtcblx0XHRuYW1lID0gbmFtZS5zdWJzdHIoMSk7XG5cdFx0YXNQcm9wID0gdHJ1ZTtcblx0fVxuXG5cdGlmIChhc1Byb3ApXG5cdFx0eyBub2RlLmVsW25hbWVdID0gXCJcIjsgfVxuXHRlbHNlXG5cdFx0eyBub2RlLmVsLnJlbW92ZUF0dHJpYnV0ZShuYW1lKTsgfVxufVxuXG4vLyBzZXRBdHRyXG4vLyBkaWZmLCBcIi5cIiwgXCJvbipcIiwgYm9vbCB2YWxzLCBza2lwIF8qLCB2YWx1ZS9jaGVja2VkL3NlbGVjdGVkIHNlbGVjdGVkSW5kZXhcbmZ1bmN0aW9uIHNldEF0dHIobm9kZSwgbmFtZSwgdmFsLCBhc1Byb3AsIGluaXRpYWwpIHtcblx0dmFyIGVsID0gbm9kZS5lbDtcblxuXHRpZiAodmFsID09IG51bGwpXG5cdFx0eyAhaW5pdGlhbCAmJiByZW1BdHRyKG5vZGUsIG5hbWUsIGZhbHNlKTsgfVx0XHQvLyB3aWxsIGFsc28gcmVtb3ZlQXR0ciBvZiBzdHlsZTogbnVsbFxuXHRlbHNlIGlmIChub2RlLm5zICE9IG51bGwpXG5cdFx0eyBlbC5zZXRBdHRyaWJ1dGUobmFtZSwgdmFsKTsgfVxuXHRlbHNlIGlmIChuYW1lID09PSBcImNsYXNzXCIpXG5cdFx0eyBlbC5jbGFzc05hbWUgPSB2YWw7IH1cblx0ZWxzZSBpZiAobmFtZSA9PT0gXCJpZFwiIHx8IHR5cGVvZiB2YWwgPT09IFwiYm9vbGVhblwiIHx8IGFzUHJvcClcblx0XHR7IGVsW25hbWVdID0gdmFsOyB9XG5cdGVsc2UgaWYgKG5hbWVbMF0gPT09IFwiLlwiKVxuXHRcdHsgZWxbbmFtZS5zdWJzdHIoMSldID0gdmFsOyB9XG5cdGVsc2Vcblx0XHR7IGVsLnNldEF0dHJpYnV0ZShuYW1lLCB2YWwpOyB9XG59XG5cbmZ1bmN0aW9uIHBhdGNoQXR0cnModm5vZGUsIGRvbm9yLCBpbml0aWFsKSB7XG5cdHZhciBuYXR0cnMgPSB2bm9kZS5hdHRycyB8fCBlbXB0eU9iajtcblx0dmFyIG9hdHRycyA9IGRvbm9yLmF0dHJzIHx8IGVtcHR5T2JqO1xuXG5cdGlmIChuYXR0cnMgPT09IG9hdHRycykge1xuXHRcdHsgZGV2Tm90aWZ5KFwiUkVVU0VEX0FUVFJTXCIsIFt2bm9kZV0pOyB9XG5cdH1cblx0ZWxzZSB7XG5cdFx0Zm9yICh2YXIga2V5IGluIG5hdHRycykge1xuXHRcdFx0dmFyIG52YWwgPSBuYXR0cnNba2V5XTtcblx0XHRcdHZhciBpc0R5biA9IGlzRHluUHJvcCh2bm9kZS50YWcsIGtleSk7XG5cdFx0XHR2YXIgb3ZhbCA9IGlzRHluID8gdm5vZGUuZWxba2V5XSA6IG9hdHRyc1trZXldO1xuXG5cdFx0XHR7XG5cdFx0XHRcdGlmIChpc1N0cmVhbShudmFsKSlcblx0XHRcdFx0XHR7IG5hdHRyc1trZXldID0gbnZhbCA9IGhvb2tTdHJlYW0obnZhbCwgZ2V0Vm0odm5vZGUpKTsgfVxuXHRcdFx0fVxuXG5cdFx0XHRpZiAobnZhbCA9PT0gb3ZhbCkge31cblx0XHRcdGVsc2UgaWYgKGlzU3R5bGVQcm9wKGtleSkpXG5cdFx0XHRcdHsgcGF0Y2hTdHlsZSh2bm9kZSwgZG9ub3IpOyB9XG5cdFx0XHRlbHNlIGlmIChpc1NwbFByb3Aoa2V5KSkge31cblx0XHRcdGVsc2UgaWYgKGlzRXZQcm9wKGtleSkpXG5cdFx0XHRcdHsgcGF0Y2hFdmVudCh2bm9kZSwga2V5LCBudmFsLCBvdmFsKTsgfVxuXHRcdFx0ZWxzZVxuXHRcdFx0XHR7IHNldEF0dHIodm5vZGUsIGtleSwgbnZhbCwgaXNEeW4sIGluaXRpYWwpOyB9XG5cdFx0fVxuXG5cdFx0Ly8gVE9ETzogYmVuY2ggc3R5bGUuY3NzVGV4dCA9IFwiXCIgdnMgcmVtb3ZlQXR0cmlidXRlKFwic3R5bGVcIilcblx0XHRmb3IgKHZhciBrZXkgaW4gb2F0dHJzKSB7XG5cdFx0XHQhKGtleSBpbiBuYXR0cnMpICYmXG5cdFx0XHQhaXNTcGxQcm9wKGtleSkgJiZcblx0XHRcdHJlbUF0dHIodm5vZGUsIGtleSwgaXNEeW5Qcm9wKHZub2RlLnRhZywga2V5KSB8fCBpc0V2UHJvcChrZXkpKTtcblx0XHR9XG5cdH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlVmlldyh2aWV3LCBkYXRhLCBrZXksIG9wdHMpIHtcblx0aWYgKHZpZXcudHlwZSA9PT0gVlZJRVcpIHtcblx0XHRkYXRhXHQ9IHZpZXcuZGF0YTtcblx0XHRrZXlcdFx0PSB2aWV3LmtleTtcblx0XHRvcHRzXHQ9IHZpZXcub3B0cztcblx0XHR2aWV3XHQ9IHZpZXcudmlldztcblx0fVxuXG5cdHJldHVybiBuZXcgVmlld01vZGVsKHZpZXcsIGRhdGEsIGtleSwgb3B0cyk7XG59XG5cbi8vaW1wb3J0IHsgWE1MX05TLCBYTElOS19OUyB9IGZyb20gJy4vZGVmaW5lU3ZnRWxlbWVudCc7XG5mdW5jdGlvbiBoeWRyYXRlQm9keSh2bm9kZSkge1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IHZub2RlLmJvZHkubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgdm5vZGUyID0gdm5vZGUuYm9keVtpXTtcblx0XHR2YXIgdHlwZTIgPSB2bm9kZTIudHlwZTtcblxuXHRcdC8vIEVMRU1FTlQsVEVYVCxDT01NRU5UXG5cdFx0aWYgKHR5cGUyIDw9IENPTU1FTlQpXG5cdFx0XHR7IGluc2VydEJlZm9yZSh2bm9kZS5lbCwgaHlkcmF0ZSh2bm9kZTIpKTsgfVx0XHQvLyB2bm9kZS5lbC5hcHBlbmRDaGlsZChoeWRyYXRlKHZub2RlMikpXG5cdFx0ZWxzZSBpZiAodHlwZTIgPT09IFZWSUVXKSB7XG5cdFx0XHR2YXIgdm0gPSBjcmVhdGVWaWV3KHZub2RlMi52aWV3LCB2bm9kZTIuZGF0YSwgdm5vZGUyLmtleSwgdm5vZGUyLm9wdHMpLl9yZWRyYXcodm5vZGUsIGksIGZhbHNlKTtcdFx0Ly8gdG9kbzogaGFuZGxlIG5ldyBkYXRhIHVwZGF0ZXNcblx0XHRcdHR5cGUyID0gdm0ubm9kZS50eXBlO1xuXHRcdFx0aW5zZXJ0QmVmb3JlKHZub2RlLmVsLCBoeWRyYXRlKHZtLm5vZGUpKTtcblx0XHR9XG5cdFx0ZWxzZSBpZiAodHlwZTIgPT09IFZNT0RFTCkge1xuXHRcdFx0dmFyIHZtID0gdm5vZGUyLnZtO1xuXHRcdFx0dm0uX3JlZHJhdyh2bm9kZSwgaSk7XHRcdFx0XHRcdC8vICwgZmFsc2Vcblx0XHRcdHR5cGUyID0gdm0ubm9kZS50eXBlO1xuXHRcdFx0aW5zZXJ0QmVmb3JlKHZub2RlLmVsLCB2bS5ub2RlLmVsKTtcdFx0Ly8gLCBoeWRyYXRlKHZtLm5vZGUpXG5cdFx0fVxuXHR9XG59XG5cbi8vICBUT0RPOiBEUlkgdGhpcyBvdXQuIHJldXNpbmcgbm9ybWFsIHBhdGNoIGhlcmUgbmVnYXRpdmVseSBhZmZlY3RzIFY4J3MgSklUXG5mdW5jdGlvbiBoeWRyYXRlKHZub2RlLCB3aXRoRWwpIHtcblx0aWYgKHZub2RlLmVsID09IG51bGwpIHtcblx0XHRpZiAodm5vZGUudHlwZSA9PT0gRUxFTUVOVCkge1xuXHRcdFx0dm5vZGUuZWwgPSB3aXRoRWwgfHwgY3JlYXRlRWxlbWVudCh2bm9kZS50YWcsIHZub2RlLm5zKTtcblxuXHRcdC8vXHRpZiAodm5vZGUudGFnID09PSBcInN2Z1wiKVxuXHRcdC8vXHRcdHZub2RlLmVsLnNldEF0dHJpYnV0ZU5TKFhNTF9OUywgJ3htbG5zOnhsaW5rJywgWExJTktfTlMpO1xuXG5cdFx0XHRpZiAodm5vZGUuYXR0cnMgIT0gbnVsbClcblx0XHRcdFx0eyBwYXRjaEF0dHJzKHZub2RlLCBlbXB0eU9iaiwgdHJ1ZSk7IH1cblxuXHRcdFx0aWYgKCh2bm9kZS5mbGFncyAmIExBWllfTElTVCkgPT09IExBWllfTElTVClcdC8vIHZub2RlLmJvZHkgaW5zdGFuY2VvZiBMYXp5TGlzdFxuXHRcdFx0XHR7IHZub2RlLmJvZHkuYm9keSh2bm9kZSk7IH1cblxuXHRcdFx0aWYgKGlzQXJyKHZub2RlLmJvZHkpKVxuXHRcdFx0XHR7IGh5ZHJhdGVCb2R5KHZub2RlKTsgfVxuXHRcdFx0ZWxzZSBpZiAodm5vZGUuYm9keSAhPSBudWxsICYmIHZub2RlLmJvZHkgIT09IFwiXCIpXG5cdFx0XHRcdHsgdm5vZGUuZWwudGV4dENvbnRlbnQgPSB2bm9kZS5ib2R5OyB9XG5cdFx0fVxuXHRcdGVsc2UgaWYgKHZub2RlLnR5cGUgPT09IFRFWFQpXG5cdFx0XHR7IHZub2RlLmVsID0gd2l0aEVsIHx8IGNyZWF0ZVRleHROb2RlKHZub2RlLmJvZHkpOyB9XG5cdFx0ZWxzZSBpZiAodm5vZGUudHlwZSA9PT0gQ09NTUVOVClcblx0XHRcdHsgdm5vZGUuZWwgPSB3aXRoRWwgfHwgY3JlYXRlQ29tbWVudCh2bm9kZS5ib2R5KTsgfVxuXHR9XG5cblx0dm5vZGUuZWwuX25vZGUgPSB2bm9kZTtcblxuXHRyZXR1cm4gdm5vZGUuZWw7XG59XG5cbi8vIHByZXZlbnQgR0NDIGZyb20gaW5saW5pbmcgc29tZSBsYXJnZSBmdW5jcyAod2hpY2ggbmVnYXRpdmVseSBhZmZlY3RzIENocm9tZSdzIEpJVClcbi8vd2luZG93LnN5bmNDaGlsZHJlbiA9IHN5bmNDaGlsZHJlbjtcbndpbmRvdy5saXNNb3ZlID0gbGlzTW92ZTtcblxuZnVuY3Rpb24gbmV4dE5vZGUobm9kZSwgYm9keSkge1xuXHRyZXR1cm4gYm9keVtub2RlLmlkeCArIDFdO1xufVxuXG5mdW5jdGlvbiBwcmV2Tm9kZShub2RlLCBib2R5KSB7XG5cdHJldHVybiBib2R5W25vZGUuaWR4IC0gMV07XG59XG5cbmZ1bmN0aW9uIHBhcmVudE5vZGUobm9kZSkge1xuXHRyZXR1cm4gbm9kZS5wYXJlbnQ7XG59XG5cbnZhciBCUkVBSyA9IDE7XG52YXIgQlJFQUtfQUxMID0gMjtcblxuZnVuY3Rpb24gc3luY0RpcihhZHZTaWIsIGFkdk5vZGUsIGluc2VydCwgc2liTmFtZSwgbm9kZU5hbWUsIGludlNpYk5hbWUsIGludk5vZGVOYW1lLCBpbnZJbnNlcnQpIHtcblx0cmV0dXJuIGZ1bmN0aW9uKG5vZGUsIHBhckVsLCBib2R5LCBzdGF0ZSwgY29udlRlc3QsIGxpcykge1xuXHRcdHZhciBzaWJOb2RlLCB0bXBTaWI7XG5cblx0XHRpZiAoc3RhdGVbc2liTmFtZV0gIT0gbnVsbCkge1xuXHRcdFx0Ly8gc2tpcCBkb20gZWxlbWVudHMgbm90IGNyZWF0ZWQgYnkgZG9tdm1cblx0XHRcdGlmICgoc2liTm9kZSA9IHN0YXRlW3NpYk5hbWVdLl9ub2RlKSA9PSBudWxsKSB7XG5cdFx0XHRcdHsgZGV2Tm90aWZ5KFwiRk9SRUlHTl9FTEVNRU5UXCIsIFtzdGF0ZVtzaWJOYW1lXV0pOyB9XG5cblx0XHRcdFx0c3RhdGVbc2liTmFtZV0gPSBhZHZTaWIoc3RhdGVbc2liTmFtZV0pO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdGlmIChwYXJlbnROb2RlKHNpYk5vZGUpICE9PSBub2RlKSB7XG5cdFx0XHRcdHRtcFNpYiA9IGFkdlNpYihzdGF0ZVtzaWJOYW1lXSk7XG5cdFx0XHRcdHNpYk5vZGUudm0gIT0gbnVsbCA/IHNpYk5vZGUudm0udW5tb3VudCh0cnVlKSA6IHJlbW92ZUNoaWxkKHBhckVsLCBzdGF0ZVtzaWJOYW1lXSk7XG5cdFx0XHRcdHN0YXRlW3NpYk5hbWVdID0gdG1wU2liO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKHN0YXRlW25vZGVOYW1lXSA9PSBjb252VGVzdClcblx0XHRcdHsgcmV0dXJuIEJSRUFLX0FMTDsgfVxuXHRcdGVsc2UgaWYgKHN0YXRlW25vZGVOYW1lXS5lbCA9PSBudWxsKSB7XG5cdFx0XHRpbnNlcnQocGFyRWwsIGh5ZHJhdGUoc3RhdGVbbm9kZU5hbWVdKSwgc3RhdGVbc2liTmFtZV0pO1x0Ly8gc2hvdWxkIGxpcyBiZSB1cGRhdGVkIGhlcmU/XG5cdFx0XHRzdGF0ZVtub2RlTmFtZV0gPSBhZHZOb2RlKHN0YXRlW25vZGVOYW1lXSwgYm9keSk7XHRcdC8vIGFsc28gbmVlZCB0byBhZHZhbmNlIHNpYj9cblx0XHR9XG5cdFx0ZWxzZSBpZiAoc3RhdGVbbm9kZU5hbWVdLmVsID09PSBzdGF0ZVtzaWJOYW1lXSkge1xuXHRcdFx0c3RhdGVbbm9kZU5hbWVdID0gYWR2Tm9kZShzdGF0ZVtub2RlTmFtZV0sIGJvZHkpO1xuXHRcdFx0c3RhdGVbc2liTmFtZV0gPSBhZHZTaWIoc3RhdGVbc2liTmFtZV0pO1xuXHRcdH1cblx0XHQvLyBoZWFkLT50YWlsIG9yIHRhaWwtPmhlYWRcblx0XHRlbHNlIGlmICghbGlzICYmIHNpYk5vZGUgPT09IHN0YXRlW2ludk5vZGVOYW1lXSkge1xuXHRcdFx0dG1wU2liID0gc3RhdGVbc2liTmFtZV07XG5cdFx0XHRzdGF0ZVtzaWJOYW1lXSA9IGFkdlNpYih0bXBTaWIpO1xuXHRcdFx0aW52SW5zZXJ0KHBhckVsLCB0bXBTaWIsIHN0YXRlW2ludlNpYk5hbWVdKTtcblx0XHRcdHN0YXRlW2ludlNpYk5hbWVdID0gdG1wU2liO1xuXHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdHtcblx0XHRcdFx0aWYgKHN0YXRlW25vZGVOYW1lXS52bSAhPSBudWxsKVxuXHRcdFx0XHRcdHsgZGV2Tm90aWZ5KFwiQUxSRUFEWV9IWURSQVRFRFwiLCBbc3RhdGVbbm9kZU5hbWVdLnZtXSk7IH1cblx0XHRcdH1cblxuXHRcdFx0aWYgKGxpcyAmJiBzdGF0ZVtzaWJOYW1lXSAhPSBudWxsKVxuXHRcdFx0XHR7IHJldHVybiBsaXNNb3ZlKGFkdlNpYiwgYWR2Tm9kZSwgaW5zZXJ0LCBzaWJOYW1lLCBub2RlTmFtZSwgcGFyRWwsIGJvZHksIHNpYk5vZGUsIHN0YXRlKTsgfVxuXG5cdFx0XHRyZXR1cm4gQlJFQUs7XG5cdFx0fVxuXHR9O1xufVxuXG5mdW5jdGlvbiBsaXNNb3ZlKGFkdlNpYiwgYWR2Tm9kZSwgaW5zZXJ0LCBzaWJOYW1lLCBub2RlTmFtZSwgcGFyRWwsIGJvZHksIHNpYk5vZGUsIHN0YXRlKSB7XG5cdGlmIChzaWJOb2RlLl9saXMpIHtcblx0XHRpbnNlcnQocGFyRWwsIHN0YXRlW25vZGVOYW1lXS5lbCwgc3RhdGVbc2liTmFtZV0pO1xuXHRcdHN0YXRlW25vZGVOYW1lXSA9IGFkdk5vZGUoc3RhdGVbbm9kZU5hbWVdLCBib2R5KTtcblx0fVxuXHRlbHNlIHtcblx0XHQvLyBmaW5kIGNsb3Nlc3QgdG9tYlxuXHRcdHZhciB0ID0gYmluYXJ5RmluZExhcmdlcihzaWJOb2RlLmlkeCwgc3RhdGUudG9tYnMpO1xuXHRcdHNpYk5vZGUuX2xpcyA9IHRydWU7XG5cdFx0dmFyIHRtcFNpYiA9IGFkdlNpYihzdGF0ZVtzaWJOYW1lXSk7XG5cdFx0aW5zZXJ0KHBhckVsLCBzdGF0ZVtzaWJOYW1lXSwgdCAhPSBudWxsID8gYm9keVtzdGF0ZS50b21ic1t0XV0uZWwgOiB0KTtcblxuXHRcdGlmICh0ID09IG51bGwpXG5cdFx0XHR7IHN0YXRlLnRvbWJzLnB1c2goc2liTm9kZS5pZHgpOyB9XG5cdFx0ZWxzZVxuXHRcdFx0eyBzdGF0ZS50b21icy5zcGxpY2UodCwgMCwgc2liTm9kZS5pZHgpOyB9XG5cblx0XHRzdGF0ZVtzaWJOYW1lXSA9IHRtcFNpYjtcblx0fVxufVxuXG52YXIgc3luY0xmdCA9IHN5bmNEaXIobmV4dFNpYiwgbmV4dE5vZGUsIGluc2VydEJlZm9yZSwgXCJsZnRTaWJcIiwgXCJsZnROb2RlXCIsIFwicmd0U2liXCIsIFwicmd0Tm9kZVwiLCBpbnNlcnRBZnRlcik7XG52YXIgc3luY1JndCA9IHN5bmNEaXIocHJldlNpYiwgcHJldk5vZGUsIGluc2VydEFmdGVyLCBcInJndFNpYlwiLCBcInJndE5vZGVcIiwgXCJsZnRTaWJcIiwgXCJsZnROb2RlXCIsIGluc2VydEJlZm9yZSk7XG5cbmZ1bmN0aW9uIHN5bmNDaGlsZHJlbihub2RlLCBkb25vcikge1xuXHR2YXIgb2JvZHlcdD0gZG9ub3IuYm9keSxcblx0XHRwYXJFbFx0PSBub2RlLmVsLFxuXHRcdGJvZHlcdD0gbm9kZS5ib2R5LFxuXHRcdHN0YXRlID0ge1xuXHRcdFx0bGZ0Tm9kZTpcdGJvZHlbMF0sXG5cdFx0XHRyZ3ROb2RlOlx0Ym9keVtib2R5Lmxlbmd0aCAtIDFdLFxuXHRcdFx0bGZ0U2liOlx0XHQoKG9ib2R5KVswXSB8fCBlbXB0eU9iaikuZWwsXG5cdFx0XHRyZ3RTaWI6XHRcdChvYm9keVtvYm9keS5sZW5ndGggLSAxXSB8fCBlbXB0eU9iaikuZWwsXG5cdFx0fTtcblxuXHRjb252ZXJnZTpcblx0d2hpbGUgKDEpIHtcbi8vXHRcdGZyb21fbGVmdDpcblx0XHR3aGlsZSAoMSkge1xuXHRcdFx0dmFyIGwgPSBzeW5jTGZ0KG5vZGUsIHBhckVsLCBib2R5LCBzdGF0ZSwgbnVsbCwgZmFsc2UpO1xuXHRcdFx0aWYgKGwgPT09IEJSRUFLKSB7IGJyZWFrOyB9XG5cdFx0XHRpZiAobCA9PT0gQlJFQUtfQUxMKSB7IGJyZWFrIGNvbnZlcmdlOyB9XG5cdFx0fVxuXG4vL1x0XHRmcm9tX3JpZ2h0OlxuXHRcdHdoaWxlICgxKSB7XG5cdFx0XHR2YXIgciA9IHN5bmNSZ3Qobm9kZSwgcGFyRWwsIGJvZHksIHN0YXRlLCBzdGF0ZS5sZnROb2RlLCBmYWxzZSk7XG5cdFx0XHRpZiAociA9PT0gQlJFQUspIHsgYnJlYWs7IH1cblx0XHRcdGlmIChyID09PSBCUkVBS19BTEwpIHsgYnJlYWsgY29udmVyZ2U7IH1cblx0XHR9XG5cblx0XHRzb3J0RE9NKG5vZGUsIHBhckVsLCBib2R5LCBzdGF0ZSk7XG5cdFx0YnJlYWs7XG5cdH1cbn1cblxuLy8gVE9ETzogYWxzbyB1c2UgdGhlIHN0YXRlLnJndFNpYiBhbmQgc3RhdGUucmd0Tm9kZSBib3VuZHMsIHBsdXMgcmVkdWNlIExJUyByYW5nZVxuZnVuY3Rpb24gc29ydERPTShub2RlLCBwYXJFbCwgYm9keSwgc3RhdGUpIHtcblx0dmFyIGtpZHMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChwYXJFbC5jaGlsZE5vZGVzKTtcblx0dmFyIGRvbUlkeHMgPSBbXTtcblxuXHRmb3IgKHZhciBrID0gMDsgayA8IGtpZHMubGVuZ3RoOyBrKyspIHtcblx0XHR2YXIgbiA9IGtpZHNba10uX25vZGU7XG5cblx0XHRpZiAobi5wYXJlbnQgPT09IG5vZGUpXG5cdFx0XHR7IGRvbUlkeHMucHVzaChuLmlkeCk7IH1cblx0fVxuXG5cdC8vIGxpc3Qgb2Ygbm9uLW1vdmFibGUgdm5vZGUgaW5kaWNlcyAoYWxyZWFkeSBpbiBjb3JyZWN0IG9yZGVyIGluIG9sZCBkb20pXG5cdHZhciB0b21icyA9IGxvbmdlc3RJbmNyZWFzaW5nU3Vic2VxdWVuY2UoZG9tSWR4cykubWFwKGZ1bmN0aW9uIChpKSB7IHJldHVybiBkb21JZHhzW2ldOyB9KTtcblxuXHRmb3IgKHZhciBpID0gMDsgaSA8IHRvbWJzLmxlbmd0aDsgaSsrKVxuXHRcdHsgYm9keVt0b21ic1tpXV0uX2xpcyA9IHRydWU7IH1cblxuXHRzdGF0ZS50b21icyA9IHRvbWJzO1xuXG5cdHdoaWxlICgxKSB7XG5cdFx0dmFyIHIgPSBzeW5jTGZ0KG5vZGUsIHBhckVsLCBib2R5LCBzdGF0ZSwgbnVsbCwgdHJ1ZSk7XG5cdFx0aWYgKHIgPT09IEJSRUFLX0FMTCkgeyBicmVhazsgfVxuXHR9XG59XG5cbmZ1bmN0aW9uIGFscmVhZHlBZG9wdGVkKHZub2RlKSB7XG5cdHJldHVybiB2bm9kZS5lbC5fbm9kZS5wYXJlbnQgIT09IHZub2RlLnBhcmVudDtcbn1cblxuZnVuY3Rpb24gdGFrZVNlcUluZGV4KG4sIG9ib2R5LCBmcm9tSWR4KSB7XG5cdHJldHVybiBvYm9keVtmcm9tSWR4XTtcbn1cblxuZnVuY3Rpb24gZmluZFNlcVRob3JvdWdoKG4sIG9ib2R5LCBmcm9tSWR4KSB7XHRcdC8vIHByZS10ZXN0ZWQgaXNWaWV3P1xuXHRmb3IgKDsgZnJvbUlkeCA8IG9ib2R5Lmxlbmd0aDsgZnJvbUlkeCsrKSB7XG5cdFx0dmFyIG8gPSBvYm9keVtmcm9tSWR4XTtcblxuXHRcdGlmIChvLnZtICE9IG51bGwpIHtcblx0XHRcdC8vIG1hdGNoIGJ5IGtleSAmIHZpZXdGbiB8fCB2bVxuXHRcdFx0aWYgKG4udHlwZSA9PT0gVlZJRVcgJiYgby52bS52aWV3ID09PSBuLnZpZXcgJiYgby52bS5rZXkgPT09IG4ua2V5IHx8IG4udHlwZSA9PT0gVk1PREVMICYmIG8udm0gPT09IG4udm0pXG5cdFx0XHRcdHsgcmV0dXJuIG87IH1cblx0XHR9XG5cdFx0ZWxzZSBpZiAoIWFscmVhZHlBZG9wdGVkKG8pICYmIG4udGFnID09PSBvLnRhZyAmJiBuLnR5cGUgPT09IG8udHlwZSAmJiBuLmtleSA9PT0gby5rZXkgJiYgKG4uZmxhZ3MgJiB+REVFUF9SRU1PVkUpID09PSAoby5mbGFncyAmIH5ERUVQX1JFTU9WRSkpXG5cdFx0XHR7IHJldHVybiBvOyB9XG5cdH1cblxuXHRyZXR1cm4gbnVsbDtcbn1cblxuZnVuY3Rpb24gZmluZEhhc2hLZXllZChuLCBvYm9keSwgZnJvbUlkeCkge1xuXHRyZXR1cm4gb2JvZHlbb2JvZHkuX2tleXNbbi5rZXldXTtcbn1cblxuLypcbi8vIGxpc3QgbXVzdCBiZSBhIHNvcnRlZCBsaXN0IG9mIHZub2RlcyBieSBrZXlcbmZ1bmN0aW9uIGZpbmRCaW5LZXllZChuLCBsaXN0KSB7XG5cdHZhciBpZHggPSBiaW5hcnlLZXlTZWFyY2gobGlzdCwgbi5rZXkpO1xuXHRyZXR1cm4gaWR4ID4gLTEgPyBsaXN0W2lkeF0gOiBudWxsO1xufVxuKi9cblxuLy8gaGF2ZSBpdCBoYW5kbGUgaW5pdGlhbCBoeWRyYXRlPyAhZG9ub3I/XG4vLyB0eXBlcyAoYW5kIHRhZ3MgaWYgRUxFTSkgYXJlIGFzc3VtZWQgdGhlIHNhbWUsIGFuZCBkb25vciBleGlzdHNcbmZ1bmN0aW9uIHBhdGNoKHZub2RlLCBkb25vcikge1xuXHRmaXJlSG9vayhkb25vci5ob29rcywgXCJ3aWxsUmVjeWNsZVwiLCBkb25vciwgdm5vZGUpO1xuXG5cdHZhciBlbCA9IHZub2RlLmVsID0gZG9ub3IuZWw7XG5cblx0dmFyIG9ib2R5ID0gZG9ub3IuYm9keTtcblx0dmFyIG5ib2R5ID0gdm5vZGUuYm9keTtcblxuXHRlbC5fbm9kZSA9IHZub2RlO1xuXG5cdC8vIFwiXCIgPT4gXCJcIlxuXHRpZiAodm5vZGUudHlwZSA9PT0gVEVYVCAmJiBuYm9keSAhPT0gb2JvZHkpIHtcblx0XHRlbC5ub2RlVmFsdWUgPSBuYm9keTtcblx0XHRyZXR1cm47XG5cdH1cblxuXHRpZiAodm5vZGUuYXR0cnMgIT0gbnVsbCB8fCBkb25vci5hdHRycyAhPSBudWxsKVxuXHRcdHsgcGF0Y2hBdHRycyh2bm9kZSwgZG9ub3IsIGZhbHNlKTsgfVxuXG5cdC8vIHBhdGNoIGV2ZW50c1xuXG5cdHZhciBvbGRJc0FyciA9IGlzQXJyKG9ib2R5KTtcblx0dmFyIG5ld0lzQXJyID0gaXNBcnIobmJvZHkpO1xuXHR2YXIgbGF6eUxpc3QgPSAodm5vZGUuZmxhZ3MgJiBMQVpZX0xJU1QpID09PSBMQVpZX0xJU1Q7XG5cbi8vXHR2YXIgbm9uRXFOZXdCb2R5ID0gbmJvZHkgIT0gbnVsbCAmJiBuYm9keSAhPT0gb2JvZHk7XG5cblx0aWYgKG9sZElzQXJyKSB7XG5cdFx0Ly8gW10gPT4gW11cblx0XHRpZiAobmV3SXNBcnIgfHwgbGF6eUxpc3QpXG5cdFx0XHR7IHBhdGNoQ2hpbGRyZW4odm5vZGUsIGRvbm9yKTsgfVxuXHRcdC8vIFtdID0+IFwiXCIgfCBudWxsXG5cdFx0ZWxzZSBpZiAobmJvZHkgIT09IG9ib2R5KSB7XG5cdFx0XHRpZiAobmJvZHkgIT0gbnVsbClcblx0XHRcdFx0eyBlbC50ZXh0Q29udGVudCA9IG5ib2R5OyB9XG5cdFx0XHRlbHNlXG5cdFx0XHRcdHsgY2xlYXJDaGlsZHJlbihkb25vcik7IH1cblx0XHR9XG5cdH1cblx0ZWxzZSB7XG5cdFx0Ly8gXCJcIiB8IG51bGwgPT4gW11cblx0XHRpZiAobmV3SXNBcnIpIHtcblx0XHRcdGNsZWFyQ2hpbGRyZW4oZG9ub3IpO1xuXHRcdFx0aHlkcmF0ZUJvZHkodm5vZGUpO1xuXHRcdH1cblx0XHQvLyBcIlwiIHwgbnVsbCA9PiBcIlwiIHwgbnVsbFxuXHRcdGVsc2UgaWYgKG5ib2R5ICE9PSBvYm9keSkge1xuXHRcdFx0aWYgKGVsLmZpcnN0Q2hpbGQpXG5cdFx0XHRcdHsgZWwuZmlyc3RDaGlsZC5ub2RlVmFsdWUgPSBuYm9keTsgfVxuXHRcdFx0ZWxzZVxuXHRcdFx0XHR7IGVsLnRleHRDb250ZW50ID0gbmJvZHk7IH1cblx0XHR9XG5cdH1cblxuXHRmaXJlSG9vayhkb25vci5ob29rcywgXCJkaWRSZWN5Y2xlXCIsIGRvbm9yLCB2bm9kZSk7XG59XG5cbi8vIGxhcmdlciBxdHlzIG9mIEtFWUVEX0xJU1QgY2hpbGRyZW4gd2lsbCB1c2UgYmluYXJ5IHNlYXJjaFxuLy9jb25zdCBTRVFfRkFJTFNfTUFYID0gMTAwO1xuXG4vLyBUT0RPOiBtb2RpZnkgdnRyZWUgbWF0Y2hlciB0byB3b3JrIHNpbWlsYXIgdG8gZG9tIHJlY29uY2lsZXIgZm9yIGtleWVkIGZyb20gbGVmdCAtPiBmcm9tIHJpZ2h0IC0+IGhlYWQvdGFpbCAtPiBiaW5hcnlcbi8vIGZhbGwgYmFjayB0byBiaW5hcnkgaWYgYWZ0ZXIgZmFpbGluZyBucmkgLSBubGkgPiBTRVFfRkFJTFNfTUFYXG4vLyB3aGlsZS1hZHZhbmNlIG5vbi1rZXllZCBmcm9tSWR4XG4vLyBbXSA9PiBbXVxuZnVuY3Rpb24gcGF0Y2hDaGlsZHJlbih2bm9kZSwgZG9ub3IpIHtcblx0dmFyIG5ib2R5XHRcdD0gdm5vZGUuYm9keSxcblx0XHRubGVuXHRcdD0gbmJvZHkubGVuZ3RoLFxuXHRcdG9ib2R5XHRcdD0gZG9ub3IuYm9keSxcblx0XHRvbGVuXHRcdD0gb2JvZHkubGVuZ3RoLFxuXHRcdGlzTGF6eVx0XHQ9ICh2bm9kZS5mbGFncyAmIExBWllfTElTVCkgPT09IExBWllfTElTVCxcblx0XHRpc0ZpeGVkXHRcdD0gKHZub2RlLmZsYWdzICYgRklYRURfQk9EWSkgPT09IEZJWEVEX0JPRFksXG5cdFx0aXNLZXllZFx0XHQ9ICh2bm9kZS5mbGFncyAmIEtFWUVEX0xJU1QpID09PSBLRVlFRF9MSVNULFxuXHRcdGRvbVN5bmNcdFx0PSAhaXNGaXhlZCAmJiB2bm9kZS50eXBlID09PSBFTEVNRU5ULFxuXHRcdGRvRmluZFx0XHQ9IHRydWUsXG5cdFx0ZmluZFx0XHQ9IChcblx0XHRcdGlzS2V5ZWQgPyBmaW5kSGFzaEtleWVkIDpcdFx0XHRcdC8vIGtleWVkIGxpc3RzL2xhenlMaXN0c1xuXHRcdFx0aXNGaXhlZCB8fCBpc0xhenkgPyB0YWtlU2VxSW5kZXggOlx0XHQvLyB1bmtleWVkIGxhenlMaXN0cyBhbmQgRklYRURfQk9EWVxuXHRcdFx0ZmluZFNlcVRob3JvdWdoXHRcdFx0XHRcdFx0XHQvLyBtb3JlIGNvbXBsZXggc3R1ZmZcblx0XHQpO1xuXG5cdGlmIChpc0tleWVkKSB7XG5cdFx0dmFyIGtleXMgPSB7fTtcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IG9ib2R5Lmxlbmd0aDsgaSsrKVxuXHRcdFx0eyBrZXlzW29ib2R5W2ldLmtleV0gPSBpOyB9XG5cdFx0b2JvZHkuX2tleXMgPSBrZXlzO1xuXHR9XG5cblx0aWYgKGRvbVN5bmMgJiYgbmxlbiA9PT0gMCkge1xuXHRcdGNsZWFyQ2hpbGRyZW4oZG9ub3IpO1xuXHRcdGlmIChpc0xhenkpXG5cdFx0XHR7IHZub2RlLmJvZHkgPSBbXTsgfVx0Ly8gbmJvZHkudHBsKGFsbCk7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0dmFyIGRvbm9yMixcblx0XHRub2RlMixcblx0XHRmb3VuZElkeCxcblx0XHRwYXRjaGVkID0gMCxcblx0XHRldmVyTm9uc2VxID0gZmFsc2UsXG5cdFx0ZnJvbUlkeCA9IDA7XHRcdC8vIGZpcnN0IHVucmVjeWNsZWQgbm9kZSAoc2VhcmNoIGhlYWQpXG5cblx0aWYgKGlzTGF6eSkge1xuXHRcdHZhciBmbm9kZTIgPSB7a2V5OiBudWxsfTtcblx0XHR2YXIgbmJvZHlOZXcgPSBBcnJheShubGVuKTtcblx0fVxuXG5cdGZvciAodmFyIGkgPSAwOyBpIDwgbmxlbjsgaSsrKSB7XG5cdFx0aWYgKGlzTGF6eSkge1xuXHRcdFx0dmFyIHJlbWFrZSA9IGZhbHNlO1xuXHRcdFx0dmFyIGRpZmZSZXMgPSBudWxsO1xuXG5cdFx0XHRpZiAoZG9GaW5kKSB7XG5cdFx0XHRcdGlmIChpc0tleWVkKVxuXHRcdFx0XHRcdHsgZm5vZGUyLmtleSA9IG5ib2R5LmtleShpKTsgfVxuXG5cdFx0XHRcdGRvbm9yMiA9IGZpbmQoZm5vZGUyLCBvYm9keSwgZnJvbUlkeCk7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChkb25vcjIgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGZvdW5kSWR4ID0gZG9ub3IyLmlkeDtcblx0XHRcdFx0ZGlmZlJlcyA9IG5ib2R5LmRpZmYoaSwgZG9ub3IyKTtcblxuXHRcdFx0XHQvLyBkaWZmIHJldHVybnMgc2FtZSwgc28gY2hlYXBseSBhZG9wdCB2bm9kZSB3aXRob3V0IHBhdGNoaW5nXG5cdFx0XHRcdGlmIChkaWZmUmVzID09PSB0cnVlKSB7XG5cdFx0XHRcdFx0bm9kZTIgPSBkb25vcjI7XG5cdFx0XHRcdFx0bm9kZTIucGFyZW50ID0gdm5vZGU7XG5cdFx0XHRcdFx0bm9kZTIuaWR4ID0gaTtcblx0XHRcdFx0XHRub2RlMi5fbGlzID0gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdFx0Ly8gZGlmZiByZXR1cm5zIG5ldyBkaWZmVmFscywgc28gZ2VuZXJhdGUgbmV3IHZub2RlICYgcGF0Y2hcblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdHsgcmVtYWtlID0gdHJ1ZTsgfVxuXHRcdFx0fVxuXHRcdFx0ZWxzZVxuXHRcdFx0XHR7IHJlbWFrZSA9IHRydWU7IH1cblxuXHRcdFx0aWYgKHJlbWFrZSkge1xuXHRcdFx0XHRub2RlMiA9IG5ib2R5LnRwbChpKTtcdFx0XHQvLyB3aGF0IGlmIHRoaXMgaXMgYSBWVklFVywgVk1PREVMLCBpbmplY3RlZCBlbGVtZW50P1xuXHRcdFx0XHRwcmVQcm9jKG5vZGUyLCB2bm9kZSwgaSk7XG5cblx0XHRcdFx0bm9kZTIuX2RpZmYgPSBkaWZmUmVzICE9IG51bGwgPyBkaWZmUmVzIDogbmJvZHkuZGlmZihpKTtcblxuXHRcdFx0XHRpZiAoZG9ub3IyICE9IG51bGwpXG5cdFx0XHRcdFx0eyBwYXRjaChub2RlMiwgZG9ub3IyKTsgfVxuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdC8vIFRPRE86IGZsYWcgdG1wIEZJWEVEX0JPRFkgb24gdW5jaGFuZ2VkIG5vZGVzP1xuXG5cdFx0XHRcdC8vIGRvbVN5bmMgPSB0cnVlO1x0XHRpZiBhbnkgaWR4IGNoYW5nZXMgb3IgbmV3IG5vZGVzIGFkZGVkL3JlbW92ZWRcblx0XHRcdH1cblxuXHRcdFx0bmJvZHlOZXdbaV0gPSBub2RlMjtcblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHR2YXIgbm9kZTIgPSBuYm9keVtpXTtcblx0XHRcdHZhciB0eXBlMiA9IG5vZGUyLnR5cGU7XG5cblx0XHRcdC8vIEVMRU1FTlQsVEVYVCxDT01NRU5UXG5cdFx0XHRpZiAodHlwZTIgPD0gQ09NTUVOVCkge1xuXHRcdFx0XHRpZiAoZG9ub3IyID0gZG9GaW5kICYmIGZpbmQobm9kZTIsIG9ib2R5LCBmcm9tSWR4KSkge1xuXHRcdFx0XHRcdHBhdGNoKG5vZGUyLCBkb25vcjIpO1xuXHRcdFx0XHRcdGZvdW5kSWR4ID0gZG9ub3IyLmlkeDtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0ZWxzZSBpZiAodHlwZTIgPT09IFZWSUVXKSB7XG5cdFx0XHRcdGlmIChkb25vcjIgPSBkb0ZpbmQgJiYgZmluZChub2RlMiwgb2JvZHksIGZyb21JZHgpKSB7XHRcdC8vIHVwZGF0ZS9tb3ZlVG9cblx0XHRcdFx0XHRmb3VuZElkeCA9IGRvbm9yMi5pZHg7XG5cdFx0XHRcdFx0dmFyIHZtID0gZG9ub3IyLnZtLl91cGRhdGUobm9kZTIuZGF0YSwgdm5vZGUsIGkpO1x0XHQvLyB3aXRoRE9NXG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdHsgdmFyIHZtID0gY3JlYXRlVmlldyhub2RlMi52aWV3LCBub2RlMi5kYXRhLCBub2RlMi5rZXksIG5vZGUyLm9wdHMpLl9yZWRyYXcodm5vZGUsIGksIGZhbHNlKTsgfVx0Ly8gY3JlYXRlVmlldywgbm8gZG9tICh3aWxsIGJlIGhhbmRsZWQgYnkgc3luYyBiZWxvdylcblxuXHRcdFx0XHR0eXBlMiA9IHZtLm5vZGUudHlwZTtcblx0XHRcdH1cblx0XHRcdGVsc2UgaWYgKHR5cGUyID09PSBWTU9ERUwpIHtcblx0XHRcdFx0Ly8gaWYgdGhlIGluamVjdGVkIHZtIGhhcyBuZXZlciBiZWVuIHJlbmRlcmVkLCB0aGlzIHZtLl91cGRhdGUoKSBzZXJ2ZXMgYXMgdGhlXG5cdFx0XHRcdC8vIGluaXRpYWwgdnRyZWUgY3JlYXRvciwgYnV0IG11c3QgYXZvaWQgaHlkcmF0aW5nIChjcmVhdGluZyAuZWwpIGJlY2F1c2Ugc3luY0NoaWxkcmVuKClcblx0XHRcdFx0Ly8gd2hpY2ggaXMgcmVzcG9uc2libGUgZm9yIG1vdW50aW5nIGJlbG93IChhbmQgb3B0aW9uYWxseSBoeWRyYXRpbmcpLCB0ZXN0cyAuZWwgcHJlc2VuY2Vcblx0XHRcdFx0Ly8gdG8gZGV0ZXJtaW5lIGlmIGh5ZHJhdGlvbiAmIG1vdW50aW5nIGFyZSBuZWVkZWRcblx0XHRcdFx0dmFyIHdpdGhET00gPSBpc0h5ZHJhdGVkKG5vZGUyLnZtKTtcblxuXHRcdFx0XHR2YXIgdm0gPSBub2RlMi52bS5fdXBkYXRlKG5vZGUyLmRhdGEsIHZub2RlLCBpLCB3aXRoRE9NKTtcblx0XHRcdFx0dHlwZTIgPSB2bS5ub2RlLnR5cGU7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gZm91bmQgZG9ub3IgJiBkdXJpbmcgYSBzZXF1ZW50aWFsIHNlYXJjaCAuLi5hdCBzZWFyY2ggaGVhZFxuXHRcdGlmICghaXNLZXllZCAmJiBkb25vcjIgIT0gbnVsbCkge1xuXHRcdFx0aWYgKGZvdW5kSWR4ID09PSBmcm9tSWR4KSB7XG5cdFx0XHRcdC8vIGFkdmFuY2UgaGVhZFxuXHRcdFx0XHRmcm9tSWR4Kys7XG5cdFx0XHRcdC8vIGlmIGFsbCBvbGQgdm5vZGVzIGFkb3B0ZWQgYW5kIG1vcmUgZXhpc3QsIHN0b3Agc2VhcmNoaW5nXG5cdFx0XHRcdGlmIChmcm9tSWR4ID09PSBvbGVuICYmIG5sZW4gPiBvbGVuKSB7XG5cdFx0XHRcdFx0Ly8gc2hvcnQtY2lyY3VpdCBmaW5kLCBhbGxvdyBsb29wIGp1c3QgY3JlYXRlL2luaXQgcmVzdFxuXHRcdFx0XHRcdGRvbm9yMiA9IG51bGw7XG5cdFx0XHRcdFx0ZG9GaW5kID0gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGVsc2Vcblx0XHRcdFx0eyBldmVyTm9uc2VxID0gdHJ1ZTsgfVxuXG5cdFx0XHRpZiAob2xlbiA+IDEwMCAmJiBldmVyTm9uc2VxICYmICsrcGF0Y2hlZCAlIDEwID09PSAwKVxuXHRcdFx0XHR7IHdoaWxlIChmcm9tSWR4IDwgb2xlbiAmJiBhbHJlYWR5QWRvcHRlZChvYm9keVtmcm9tSWR4XSkpXG5cdFx0XHRcdFx0eyBmcm9tSWR4Kys7IH0gfVxuXHRcdH1cblx0fVxuXG5cdC8vIHJlcGxhY2UgTGlzdCB3LyBuZXcgYm9keVxuXHRpZiAoaXNMYXp5KVxuXHRcdHsgdm5vZGUuYm9keSA9IG5ib2R5TmV3OyB9XG5cblx0ZG9tU3luYyAmJiBzeW5jQ2hpbGRyZW4odm5vZGUsIGRvbm9yKTtcbn1cblxuZnVuY3Rpb24gRE9NSW5zdHIod2l0aFRpbWUpIHtcblx0dmFyIGlzRWRnZSA9IG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZihcIkVkZ2VcIikgIT09IC0xO1xuXHR2YXIgaXNJRSA9IG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZihcIlRyaWRlbnQvXCIpICE9PSAtMTtcblx0dmFyIGdldERlc2NyID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcjtcblx0dmFyIGRlZlByb3AgPSBPYmplY3QuZGVmaW5lUHJvcGVydHk7XG5cblx0dmFyIG5vZGVQcm90byA9IE5vZGUucHJvdG90eXBlO1xuXHR2YXIgdGV4dENvbnRlbnQgPSBnZXREZXNjcihub2RlUHJvdG8sIFwidGV4dENvbnRlbnRcIik7XG5cdHZhciBub2RlVmFsdWUgPSBnZXREZXNjcihub2RlUHJvdG8sIFwibm9kZVZhbHVlXCIpO1xuXG5cdHZhciBodG1sUHJvdG8gPSBIVE1MRWxlbWVudC5wcm90b3R5cGU7XG5cdHZhciBpbm5lclRleHQgPSBnZXREZXNjcihodG1sUHJvdG8sIFwiaW5uZXJUZXh0XCIpO1xuXG5cdHZhciBlbGVtUHJvdG9cdD0gRWxlbWVudC5wcm90b3R5cGU7XG5cdHZhciBpbm5lckhUTUxcdD0gZ2V0RGVzY3IoIWlzSUUgPyBlbGVtUHJvdG8gOiBodG1sUHJvdG8sIFwiaW5uZXJIVE1MXCIpO1xuXHR2YXIgY2xhc3NOYW1lXHQ9IGdldERlc2NyKCFpc0lFID8gZWxlbVByb3RvIDogaHRtbFByb3RvLCBcImNsYXNzTmFtZVwiKTtcblx0dmFyIGlkXHRcdFx0PSBnZXREZXNjcighaXNJRSA/IGVsZW1Qcm90byA6IGh0bWxQcm90bywgXCJpZFwiKTtcblxuXHR2YXIgc3R5bGVQcm90b1x0PSBDU1NTdHlsZURlY2xhcmF0aW9uLnByb3RvdHlwZTtcblxuXHR2YXIgY3NzVGV4dFx0XHQ9IGdldERlc2NyKHN0eWxlUHJvdG8sIFwiY3NzVGV4dFwiKTtcblxuXHR2YXIgaW5wUHJvdG8gPSBIVE1MSW5wdXRFbGVtZW50LnByb3RvdHlwZTtcblx0dmFyIGFyZWFQcm90byA9IEhUTUxUZXh0QXJlYUVsZW1lbnQucHJvdG90eXBlO1xuXHR2YXIgc2VsUHJvdG8gPSBIVE1MU2VsZWN0RWxlbWVudC5wcm90b3R5cGU7XG5cdHZhciBvcHRQcm90byA9IEhUTUxPcHRpb25FbGVtZW50LnByb3RvdHlwZTtcblxuXHR2YXIgaW5wQ2hlY2tlZCA9IGdldERlc2NyKGlucFByb3RvLCBcImNoZWNrZWRcIik7XG5cdHZhciBpbnBWYWwgPSBnZXREZXNjcihpbnBQcm90bywgXCJ2YWx1ZVwiKTtcblxuXHR2YXIgYXJlYVZhbCA9IGdldERlc2NyKGFyZWFQcm90bywgXCJ2YWx1ZVwiKTtcblxuXHR2YXIgc2VsVmFsID0gZ2V0RGVzY3Ioc2VsUHJvdG8sIFwidmFsdWVcIik7XG5cdHZhciBzZWxJbmRleCA9IGdldERlc2NyKHNlbFByb3RvLCBcInNlbGVjdGVkSW5kZXhcIik7XG5cblx0dmFyIG9wdFNlbCA9IGdldERlc2NyKG9wdFByb3RvLCBcInNlbGVjdGVkXCIpO1xuXG5cdC8vIG9uY2xpY2ssIG9ua2V5KiwgZXRjLi5cblxuXHQvLyB2YXIgc3R5bGVQcm90byA9IENTU1N0eWxlRGVjbGFyYXRpb24ucHJvdG90eXBlO1xuXHQvLyB2YXIgc2V0UHJvcGVydHkgPSBnZXREZXNjcihzdHlsZVByb3RvLCBcInNldFByb3BlcnR5XCIpO1xuXG5cdHZhciBvcmlnT3BzID0ge1xuXHRcdFwiZG9jdW1lbnQuY3JlYXRlRWxlbWVudFwiOiBudWxsLFxuXHRcdFwiZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TXCI6IG51bGwsXG5cdFx0XCJkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZVwiOiBudWxsLFxuXHRcdFwiZG9jdW1lbnQuY3JlYXRlQ29tbWVudFwiOiBudWxsLFxuXHRcdFwiZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudFwiOiBudWxsLFxuXG5cdFx0XCJEb2N1bWVudEZyYWdtZW50LnByb3RvdHlwZS5pbnNlcnRCZWZvcmVcIjogbnVsbCxcdFx0Ly8gYXBwZW5kQ2hpbGRcblxuXHRcdFwiRWxlbWVudC5wcm90b3R5cGUuYXBwZW5kQ2hpbGRcIjogbnVsbCxcblx0XHRcIkVsZW1lbnQucHJvdG90eXBlLnJlbW92ZUNoaWxkXCI6IG51bGwsXG5cdFx0XCJFbGVtZW50LnByb3RvdHlwZS5pbnNlcnRCZWZvcmVcIjogbnVsbCxcblx0XHRcIkVsZW1lbnQucHJvdG90eXBlLnJlcGxhY2VDaGlsZFwiOiBudWxsLFxuXHRcdFwiRWxlbWVudC5wcm90b3R5cGUucmVtb3ZlXCI6IG51bGwsXG5cblx0XHRcIkVsZW1lbnQucHJvdG90eXBlLnNldEF0dHJpYnV0ZVwiOiBudWxsLFxuXHRcdFwiRWxlbWVudC5wcm90b3R5cGUuc2V0QXR0cmlidXRlTlNcIjogbnVsbCxcblx0XHRcIkVsZW1lbnQucHJvdG90eXBlLnJlbW92ZUF0dHJpYnV0ZVwiOiBudWxsLFxuXHRcdFwiRWxlbWVudC5wcm90b3R5cGUucmVtb3ZlQXR0cmlidXRlTlNcIjogbnVsbCxcblxuXHRcdC8vIGFzc2lnbj9cblx0XHQvLyBkYXRhc2V0LCBjbGFzc2xpc3QsIGFueSBwcm9wcyBsaWtlIC5vbmNoYW5nZVxuXG5cdFx0Ly8gLnN0eWxlLnNldFByb3BlcnR5LCAuc3R5bGUuY3NzVGV4dFxuXHR9O1xuXG5cdHZhciBjb3VudHMgPSB7fTtcblx0dmFyIHN0YXJ0ID0gbnVsbDtcblxuXHRmdW5jdGlvbiBjdHhOYW1lKG9wTmFtZSkge1xuXHRcdHZhciBvcFBhdGggPSBvcE5hbWUuc3BsaXQoXCIuXCIpO1xuXHRcdHZhciBvID0gd2luZG93O1xuXHRcdHdoaWxlIChvcFBhdGgubGVuZ3RoID4gMSlcblx0XHRcdHsgbyA9IG9bb3BQYXRoLnNoaWZ0KCldOyB9XG5cblx0XHRyZXR1cm4ge2N0eDogbywgbGFzdDogb3BQYXRoWzBdfTtcblx0fVxuXG5cdGZvciAodmFyIG9wTmFtZSBpbiBvcmlnT3BzKSB7XG5cdFx0dmFyIHAgPSBjdHhOYW1lKG9wTmFtZSk7XG5cblx0XHRpZiAob3JpZ09wc1tvcE5hbWVdID09PSBudWxsKVxuXHRcdFx0eyBvcmlnT3BzW29wTmFtZV0gPSBwLmN0eFtwLmxhc3RdOyB9XG5cblx0XHQoZnVuY3Rpb24ob3BOYW1lLCBvcFNob3J0KSB7XG5cdFx0XHRjb3VudHNbb3BTaG9ydF0gPSAwO1xuXHRcdFx0cC5jdHhbb3BTaG9ydF0gPSBmdW5jdGlvbigpIHtcblx0XHRcdFx0Y291bnRzW29wU2hvcnRdKys7XG5cdFx0XHRcdHJldHVybiBvcmlnT3BzW29wTmFtZV0uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblx0XHRcdH07XG5cdFx0fSkob3BOYW1lLCBwLmxhc3QpO1xuXHR9XG5cblx0Y291bnRzLnRleHRDb250ZW50ID0gMDtcblx0ZGVmUHJvcChub2RlUHJvdG8sIFwidGV4dENvbnRlbnRcIiwge1xuXHRcdHNldDogZnVuY3Rpb24ocykge1xuXHRcdFx0Y291bnRzLnRleHRDb250ZW50Kys7XG5cdFx0XHR0ZXh0Q29udGVudC5zZXQuY2FsbCh0aGlzLCBzKTtcblx0XHR9LFxuXHR9KTtcblxuXHRjb3VudHMubm9kZVZhbHVlID0gMDtcblx0ZGVmUHJvcChub2RlUHJvdG8sIFwibm9kZVZhbHVlXCIsIHtcblx0XHRzZXQ6IGZ1bmN0aW9uKHMpIHtcblx0XHRcdGNvdW50cy5ub2RlVmFsdWUrKztcblx0XHRcdG5vZGVWYWx1ZS5zZXQuY2FsbCh0aGlzLCBzKTtcblx0XHR9LFxuXHR9KTtcblxuXHRjb3VudHMuaW5uZXJUZXh0ID0gMDtcblx0ZGVmUHJvcChodG1sUHJvdG8sIFwiaW5uZXJUZXh0XCIsIHtcblx0XHRzZXQ6IGZ1bmN0aW9uKHMpIHtcblx0XHRcdGNvdW50cy5pbm5lclRleHQrKztcblx0XHRcdGlubmVyVGV4dC5zZXQuY2FsbCh0aGlzLCBzKTtcblx0XHR9LFxuXHR9KTtcblxuXHRjb3VudHMuaW5uZXJIVE1MID0gMDtcblx0ZGVmUHJvcCghaXNJRSA/IGVsZW1Qcm90byA6IGh0bWxQcm90bywgXCJpbm5lckhUTUxcIiwge1xuXHRcdHNldDogZnVuY3Rpb24ocykge1xuXHRcdFx0Y291bnRzLmlubmVySFRNTCsrO1xuXHRcdFx0aW5uZXJIVE1MLnNldC5jYWxsKHRoaXMsIHMpO1xuXHRcdH0sXG5cdH0pO1xuXG5cdGNvdW50cy5jbGFzc05hbWUgPSAwO1xuXHRkZWZQcm9wKCFpc0lFID8gZWxlbVByb3RvIDogaHRtbFByb3RvLCBcImNsYXNzTmFtZVwiLCB7XG5cdFx0c2V0OiBmdW5jdGlvbihzKSB7XG5cdFx0XHRjb3VudHMuY2xhc3NOYW1lKys7XG5cdFx0XHRjbGFzc05hbWUuc2V0LmNhbGwodGhpcywgcyk7XG5cdFx0fSxcblx0fSk7XG5cblx0Y291bnRzLmNzc1RleHQgPSAwO1xuXHRkZWZQcm9wKHN0eWxlUHJvdG8sIFwiY3NzVGV4dFwiLCB7XG5cdFx0c2V0OiBmdW5jdGlvbihzKSB7XG5cdFx0XHRjb3VudHMuY3NzVGV4dCsrO1xuXHRcdFx0Y3NzVGV4dC5zZXQuY2FsbCh0aGlzLCBzKTtcblx0XHR9LFxuXHR9KTtcblxuXHRjb3VudHMuaWQgPSAwO1xuXHRkZWZQcm9wKCFpc0lFID8gZWxlbVByb3RvIDogaHRtbFByb3RvLCBcImlkXCIsIHtcblx0XHRzZXQ6IGZ1bmN0aW9uKHMpIHtcblx0XHRcdGNvdW50cy5pZCsrO1xuXHRcdFx0aWQuc2V0LmNhbGwodGhpcywgcyk7XG5cdFx0fSxcblx0fSk7XG5cblx0Y291bnRzLmNoZWNrZWQgPSAwO1xuXHRkZWZQcm9wKGlucFByb3RvLCBcImNoZWNrZWRcIiwge1xuXHRcdHNldDogZnVuY3Rpb24ocykge1xuXHRcdFx0Y291bnRzLmNoZWNrZWQrKztcblx0XHRcdGlucENoZWNrZWQuc2V0LmNhbGwodGhpcywgcyk7XG5cdFx0fSxcblx0fSk7XG5cblx0Y291bnRzLnZhbHVlID0gMDtcblx0ZGVmUHJvcChpbnBQcm90bywgXCJ2YWx1ZVwiLCB7XG5cdFx0c2V0OiBmdW5jdGlvbihzKSB7XG5cdFx0XHRjb3VudHMudmFsdWUrKztcblx0XHRcdGlucFZhbC5zZXQuY2FsbCh0aGlzLCBzKTtcblx0XHR9LFxuXHR9KTtcblxuXHRkZWZQcm9wKGFyZWFQcm90bywgXCJ2YWx1ZVwiLCB7XG5cdFx0c2V0OiBmdW5jdGlvbihzKSB7XG5cdFx0XHRjb3VudHMudmFsdWUrKztcblx0XHRcdGFyZWFWYWwuc2V0LmNhbGwodGhpcywgcyk7XG5cdFx0fSxcblx0fSk7XG5cblx0ZGVmUHJvcChzZWxQcm90bywgXCJ2YWx1ZVwiLCB7XG5cdFx0c2V0OiBmdW5jdGlvbihzKSB7XG5cdFx0XHRjb3VudHMudmFsdWUrKztcblx0XHRcdHNlbFZhbC5zZXQuY2FsbCh0aGlzLCBzKTtcblx0XHR9LFxuXHR9KTtcblxuXHRjb3VudHMuc2VsZWN0ZWRJbmRleCA9IDA7XG5cdGRlZlByb3Aoc2VsUHJvdG8sIFwic2VsZWN0ZWRJbmRleFwiLCB7XG5cdFx0c2V0OiBmdW5jdGlvbihzKSB7XG5cdFx0XHRjb3VudHMuc2VsZWN0ZWRJbmRleCsrO1xuXHRcdFx0c2VsSW5kZXguc2V0LmNhbGwodGhpcywgcyk7XG5cdFx0fSxcblx0fSk7XG5cblx0Y291bnRzLnNlbGVjdGVkID0gMDtcblx0ZGVmUHJvcChvcHRQcm90bywgXCJzZWxlY3RlZFwiLCB7XG5cdFx0c2V0OiBmdW5jdGlvbihzKSB7XG5cdFx0XHRjb3VudHMuc2VsZWN0ZWQrKztcblx0XHRcdG9wdFNlbC5zZXQuY2FsbCh0aGlzLCBzKTtcblx0XHR9LFxuXHR9KTtcblxuXHQvKlxuXHRjb3VudHMuc2V0UHJvcGVydHkgPSAwO1xuXHRkZWZQcm9wKHN0eWxlUHJvdG8sIFwic2V0UHJvcGVydHlcIiwge1xuXHRcdHNldDogZnVuY3Rpb24ocykge1xuXHRcdFx0Y291bnRzLnNldFByb3BlcnR5Kys7XG5cdFx0XHRzZXRQcm9wZXJ0eS5zZXQuY2FsbCh0aGlzLCBzKTtcblx0XHR9LFxuXHR9KTtcblx0Ki9cblxuXHRmdW5jdGlvbiByZXNldCgpIHtcblx0XHRmb3IgKHZhciBpIGluIGNvdW50cylcblx0XHRcdHsgY291bnRzW2ldID0gMDsgfVxuXHR9XG5cblx0dGhpcy5zdGFydCA9IGZ1bmN0aW9uKCkge1xuXHRcdHN0YXJ0ID0gK25ldyBEYXRlO1xuXHR9O1xuXG5cdHRoaXMuZW5kID0gZnVuY3Rpb24oKSB7XG5cdFx0dmFyIF90aW1lID0gK25ldyBEYXRlIC0gc3RhcnQ7XG5cdFx0c3RhcnQgPSBudWxsO1xuLypcblx0XHRmb3IgKHZhciBvcE5hbWUgaW4gb3JpZ09wcykge1xuXHRcdFx0dmFyIHAgPSBjdHhOYW1lKG9wTmFtZSk7XG5cdFx0XHRwLmN0eFtwLmxhc3RdID0gb3JpZ09wc1tvcE5hbWVdO1xuXHRcdH1cblxuXHRcdGRlZlByb3Aobm9kZVByb3RvLCBcInRleHRDb250ZW50XCIsIHRleHRDb250ZW50KTtcblx0XHRkZWZQcm9wKG5vZGVQcm90bywgXCJub2RlVmFsdWVcIiwgbm9kZVZhbHVlKTtcblx0XHRkZWZQcm9wKGh0bWxQcm90bywgXCJpbm5lclRleHRcIiwgaW5uZXJUZXh0KTtcblx0XHRkZWZQcm9wKCFpc0lFID8gZWxlbVByb3RvIDogaHRtbFByb3RvLCBcImlubmVySFRNTFwiLCBpbm5lckhUTUwpO1xuXHRcdGRlZlByb3AoIWlzSUUgPyBlbGVtUHJvdG8gOiBodG1sUHJvdG8sIFwiY2xhc3NOYW1lXCIsIGNsYXNzTmFtZSk7XG5cdFx0ZGVmUHJvcCghaXNJRSA/IGVsZW1Qcm90byA6IGh0bWxQcm90bywgXCJpZFwiLCBpZCk7XG5cdFx0ZGVmUHJvcChpbnBQcm90bywgIFwiY2hlY2tlZFwiLCBpbnBDaGVja2VkKTtcblx0XHRkZWZQcm9wKGlucFByb3RvLCAgXCJ2YWx1ZVwiLCBpbnBWYWwpO1xuXHRcdGRlZlByb3AoYXJlYVByb3RvLCBcInZhbHVlXCIsIGFyZWFWYWwpO1xuXHRcdGRlZlByb3Aoc2VsUHJvdG8sICBcInZhbHVlXCIsIHNlbFZhbCk7XG5cdFx0ZGVmUHJvcChzZWxQcm90bywgIFwic2VsZWN0ZWRJbmRleFwiLCBzZWxJbmRleCk7XG5cdFx0ZGVmUHJvcChvcHRQcm90bywgIFwic2VsZWN0ZWRcIiwgb3B0U2VsKTtcblx0Ly9cdGRlZlByb3Aoc3R5bGVQcm90bywgXCJzZXRQcm9wZXJ0eVwiLCBzZXRQcm9wZXJ0eSk7XG5cdFx0ZGVmUHJvcChzdHlsZVByb3RvLCBcImNzc1RleHRcIiwgY3NzVGV4dCk7XG4qL1xuXHRcdHZhciBvdXQgPSB7fTtcblxuXHRcdGZvciAodmFyIGkgaW4gY291bnRzKVxuXHRcdFx0eyBpZiAoY291bnRzW2ldID4gMClcblx0XHRcdFx0eyBvdXRbaV0gPSBjb3VudHNbaV07IH0gfVxuXG5cdFx0cmVzZXQoKTtcblxuXHRcdGlmICh3aXRoVGltZSlcblx0XHRcdHsgb3V0Ll90aW1lID0gX3RpbWU7IH1cblxuXHRcdHJldHVybiBvdXQ7XG5cdH07XG59XG5cbnZhciBpbnN0ciA9IG51bGw7XG5cbntcblx0aWYgKERFVk1PREUubXV0YXRpb25zKSB7XG5cdFx0aW5zdHIgPSBuZXcgRE9NSW5zdHIodHJ1ZSk7XG5cdH1cbn1cblxuLy8gdmlldyArIGtleSBzZXJ2ZSBhcyB0aGUgdm0ncyB1bmlxdWUgaWRlbnRpdHlcbmZ1bmN0aW9uIFZpZXdNb2RlbCh2aWV3LCBkYXRhLCBrZXksIG9wdHMpIHtcblx0dmFyIHZtID0gdGhpcztcblxuXHR2bS52aWV3ID0gdmlldztcblx0dm0uZGF0YSA9IGRhdGE7XG5cdHZtLmtleSA9IGtleTtcblxuXHR7XG5cdFx0aWYgKGlzU3RyZWFtKGRhdGEpKVxuXHRcdFx0eyB2bS5fc3RyZWFtID0gaG9va1N0cmVhbTIoZGF0YSwgdm0pOyB9XG5cdH1cblxuXHRpZiAob3B0cykge1xuXHRcdHZtLm9wdHMgPSBvcHRzO1xuXHRcdHZtLmNvbmZpZyhvcHRzKTtcblx0fVxuXG5cdHZhciBvdXQgPSBpc1BsYWluT2JqKHZpZXcpID8gdmlldyA6IHZpZXcuY2FsbCh2bSwgdm0sIGRhdGEsIGtleSwgb3B0cyk7XG5cblx0aWYgKGlzRnVuYyhvdXQpKVxuXHRcdHsgdm0ucmVuZGVyID0gb3V0OyB9XG5cdGVsc2Uge1xuXHRcdHZtLnJlbmRlciA9IG91dC5yZW5kZXI7XG5cdFx0dm0uY29uZmlnKG91dCk7XG5cdH1cblxuXHQvLyB0aGVzZSBtdXN0IGJlIHdyYXBwZWQgaGVyZSBzaW5jZSB0aGV5J3JlIGRlYm91bmNlZCBwZXIgdmlld1xuXHR2bS5fcmVkcmF3QXN5bmMgPSByYWZ0KGZ1bmN0aW9uIChfKSB7IHJldHVybiB2bS5yZWRyYXcodHJ1ZSk7IH0pO1xuXHR2bS5fdXBkYXRlQXN5bmMgPSByYWZ0KGZ1bmN0aW9uIChuZXdEYXRhKSB7IHJldHVybiB2bS51cGRhdGUobmV3RGF0YSwgdHJ1ZSk7IH0pO1xuXG5cdHZtLmluaXQgJiYgdm0uaW5pdC5jYWxsKHZtLCB2bSwgdm0uZGF0YSwgdm0ua2V5LCBvcHRzKTtcbn1cblxudmFyIFZpZXdNb2RlbFByb3RvID0gVmlld01vZGVsLnByb3RvdHlwZSA9IHtcblx0Y29uc3RydWN0b3I6IFZpZXdNb2RlbCxcblxuXHRfZGlmZjpcdG51bGwsXHQvLyBkaWZmIGNhY2hlXG5cblx0aW5pdDpcdG51bGwsXG5cdHZpZXc6XHRudWxsLFxuXHRrZXk6XHRudWxsLFxuXHRkYXRhOlx0bnVsbCxcblx0c3RhdGU6XHRudWxsLFxuXHRhcGk6XHRudWxsLFxuXHRvcHRzOlx0bnVsbCxcblx0bm9kZTpcdG51bGwsXG5cdGhvb2tzOlx0bnVsbCxcblx0b25ldmVudDogbm9vcCxcblx0cmVmczpcdG51bGwsXG5cdHJlbmRlcjpcdG51bGwsXG5cblx0bW91bnQ6IG1vdW50LFxuXHR1bm1vdW50OiB1bm1vdW50LFxuXHRjb25maWc6IGZ1bmN0aW9uKG9wdHMpIHtcblx0XHR2YXIgdCA9IHRoaXM7XG5cblx0XHRpZiAob3B0cy5pbml0KVxuXHRcdFx0eyB0LmluaXQgPSBvcHRzLmluaXQ7IH1cblx0XHRpZiAob3B0cy5kaWZmKVxuXHRcdFx0eyB0LmRpZmYgPSBvcHRzLmRpZmY7IH1cblx0XHRpZiAob3B0cy5vbmV2ZW50KVxuXHRcdFx0eyB0Lm9uZXZlbnQgPSBvcHRzLm9uZXZlbnQ7IH1cblxuXHRcdC8vIG1heWJlIGludmVydCBhc3NpZ25tZW50IG9yZGVyP1xuXHRcdGlmIChvcHRzLmhvb2tzKVxuXHRcdFx0eyB0Lmhvb2tzID0gYXNzaWduT2JqKHQuaG9va3MgfHwge30sIG9wdHMuaG9va3MpOyB9XG5cblx0XHR7XG5cdFx0XHRpZiAob3B0cy5vbmVtaXQpXG5cdFx0XHRcdHsgdC5vbmVtaXQgPSBhc3NpZ25PYmoodC5vbmVtaXQgfHwge30sIG9wdHMub25lbWl0KTsgfVxuXHRcdH1cblx0fSxcblx0cGFyZW50OiBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gZ2V0Vm0odGhpcy5ub2RlLnBhcmVudCk7XG5cdH0sXG5cdHJvb3Q6IGZ1bmN0aW9uKCkge1xuXHRcdHZhciBwID0gdGhpcy5ub2RlO1xuXG5cdFx0d2hpbGUgKHAucGFyZW50KVxuXHRcdFx0eyBwID0gcC5wYXJlbnQ7IH1cblxuXHRcdHJldHVybiBwLnZtO1xuXHR9LFxuXHRyZWRyYXc6IGZ1bmN0aW9uKHN5bmMpIHtcblx0XHR7XG5cdFx0XHRpZiAoREVWTU9ERS5zeW5jUmVkcmF3KSB7XG5cdFx0XHRcdHN5bmMgPSB0cnVlO1xuXHRcdFx0fVxuXHRcdH1cblx0XHR2YXIgdm0gPSB0aGlzO1xuXHRcdHN5bmMgPyB2bS5fcmVkcmF3KG51bGwsIG51bGwsIGlzSHlkcmF0ZWQodm0pKSA6IHZtLl9yZWRyYXdBc3luYygpO1xuXHRcdHJldHVybiB2bTtcblx0fSxcblx0dXBkYXRlOiBmdW5jdGlvbihuZXdEYXRhLCBzeW5jKSB7XG5cdFx0e1xuXHRcdFx0aWYgKERFVk1PREUuc3luY1JlZHJhdykge1xuXHRcdFx0XHRzeW5jID0gdHJ1ZTtcblx0XHRcdH1cblx0XHR9XG5cdFx0dmFyIHZtID0gdGhpcztcblx0XHRzeW5jID8gdm0uX3VwZGF0ZShuZXdEYXRhLCBudWxsLCBudWxsLCBpc0h5ZHJhdGVkKHZtKSkgOiB2bS5fdXBkYXRlQXN5bmMobmV3RGF0YSk7XG5cdFx0cmV0dXJuIHZtO1xuXHR9LFxuXG5cdF91cGRhdGU6IHVwZGF0ZVN5bmMsXG5cdF9yZWRyYXc6IHJlZHJhd1N5bmMsXG5cdF9yZWRyYXdBc3luYzogbnVsbCxcblx0X3VwZGF0ZUFzeW5jOiBudWxsLFxufTtcblxuZnVuY3Rpb24gbW91bnQoZWwsIGlzUm9vdCkge1xuXHR2YXIgdm0gPSB0aGlzO1xuXG5cdHtcblx0XHRpZiAoREVWTU9ERS5tdXRhdGlvbnMpXG5cdFx0XHR7IGluc3RyLnN0YXJ0KCk7IH1cblx0fVxuXG5cdGlmIChpc1Jvb3QpIHtcblx0XHRjbGVhckNoaWxkcmVuKHtlbDogZWwsIGZsYWdzOiAwfSk7XG5cblx0XHR2bS5fcmVkcmF3KG51bGwsIG51bGwsIGZhbHNlKTtcblxuXHRcdC8vIGlmIHBsYWNlaG9sZGVyIG5vZGUgZG9lc250IG1hdGNoIHJvb3QgdGFnXG5cdFx0aWYgKGVsLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgIT09IHZtLm5vZGUudGFnKSB7XG5cdFx0XHRoeWRyYXRlKHZtLm5vZGUpO1xuXHRcdFx0aW5zZXJ0QmVmb3JlKGVsLnBhcmVudE5vZGUsIHZtLm5vZGUuZWwsIGVsKTtcblx0XHRcdGVsLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZWwpO1xuXHRcdH1cblx0XHRlbHNlXG5cdFx0XHR7IGluc2VydEJlZm9yZShlbC5wYXJlbnROb2RlLCBoeWRyYXRlKHZtLm5vZGUsIGVsKSwgZWwpOyB9XG5cdH1cblx0ZWxzZSB7XG5cdFx0dm0uX3JlZHJhdyhudWxsLCBudWxsKTtcblxuXHRcdGlmIChlbClcblx0XHRcdHsgaW5zZXJ0QmVmb3JlKGVsLCB2bS5ub2RlLmVsKTsgfVxuXHR9XG5cblx0aWYgKGVsKVxuXHRcdHsgZHJhaW5EaWRIb29rcyh2bSk7IH1cblxuXHR7XG5cdFx0aWYgKERFVk1PREUubXV0YXRpb25zKVxuXHRcdFx0eyBjb25zb2xlLmxvZyhpbnN0ci5lbmQoKSk7IH1cblx0fVxuXG5cdHJldHVybiB2bTtcbn1cblxuLy8gYXNTdWIgbWVhbnMgdGhpcyB3YXMgY2FsbGVkIGZyb20gYSBzdWItcm91dGluZSwgc28gZG9uJ3QgZHJhaW4gZGlkKiBob29rIHF1ZXVlXG5mdW5jdGlvbiB1bm1vdW50KGFzU3ViKSB7XG5cdHZhciB2bSA9IHRoaXM7XG5cblx0e1xuXHRcdGlmIChpc1N0cmVhbSh2bS5fc3RyZWFtKSlcblx0XHRcdHsgdW5zdWJTdHJlYW0odm0uX3N0cmVhbSk7IH1cblx0fVxuXG5cdHZhciBub2RlID0gdm0ubm9kZTtcblx0dmFyIHBhckVsID0gbm9kZS5lbC5wYXJlbnROb2RlO1xuXG5cdC8vIGVkZ2UgYnVnOiB0aGlzIGNvdWxkIGFsc28gYmUgd2lsbFJlbW92ZSBwcm9taXNlLWRlbGF5ZWQ7IHNob3VsZCAudGhlbigpIG9yIHNvbWV0aGluZyB0byBtYWtlIHN1cmUgaG9va3MgZmlyZSBpbiBvcmRlclxuXHRyZW1vdmVDaGlsZChwYXJFbCwgbm9kZS5lbCk7XG5cblx0aWYgKCFhc1N1Yilcblx0XHR7IGRyYWluRGlkSG9va3Modm0pOyB9XG59XG5cbmZ1bmN0aW9uIHJlUGFyZW50KHZtLCB2b2xkLCBuZXdQYXJlbnQsIG5ld0lkeCkge1xuXHRpZiAobmV3UGFyZW50ICE9IG51bGwpIHtcblx0XHRuZXdQYXJlbnQuYm9keVtuZXdJZHhdID0gdm9sZDtcblx0XHR2b2xkLmlkeCA9IG5ld0lkeDtcblx0XHR2b2xkLnBhcmVudCA9IG5ld1BhcmVudDtcblx0XHR2b2xkLl9saXMgPSBmYWxzZTtcblx0fVxuXHRyZXR1cm4gdm07XG59XG5cbmZ1bmN0aW9uIHJlZHJhd1N5bmMobmV3UGFyZW50LCBuZXdJZHgsIHdpdGhET00pIHtcblx0dmFyIGlzUmVkcmF3Um9vdCA9IG5ld1BhcmVudCA9PSBudWxsO1xuXHR2YXIgdm0gPSB0aGlzO1xuXHR2YXIgaXNNb3VudGVkID0gdm0ubm9kZSAmJiB2bS5ub2RlLmVsICYmIHZtLm5vZGUuZWwucGFyZW50Tm9kZTtcblxuXHR7XG5cdFx0Ly8gd2FzIG1vdW50ZWQgKGhhcyBub2RlIGFuZCBlbCksIGJ1dCBlbCBubyBsb25nZXIgaGFzIHBhcmVudCAodW5tb3VudGVkKVxuXHRcdGlmIChpc1JlZHJhd1Jvb3QgJiYgdm0ubm9kZSAmJiB2bS5ub2RlLmVsICYmICF2bS5ub2RlLmVsLnBhcmVudE5vZGUpXG5cdFx0XHR7IGRldk5vdGlmeShcIlVOTU9VTlRFRF9SRURSQVdcIiwgW3ZtXSk7IH1cblxuXHRcdGlmIChpc1JlZHJhd1Jvb3QgJiYgREVWTU9ERS5tdXRhdGlvbnMgJiYgaXNNb3VudGVkKVxuXHRcdFx0eyBpbnN0ci5zdGFydCgpOyB9XG5cdH1cblxuXHR2YXIgdm9sZCA9IHZtLm5vZGUsIG9sZERpZmYsIG5ld0RpZmY7XG5cblx0aWYgKHZtLmRpZmYgIT0gbnVsbCkge1xuXHRcdG9sZERpZmYgPSB2bS5fZGlmZjtcblx0XHR2bS5fZGlmZiA9IG5ld0RpZmYgPSB2bS5kaWZmKHZtLCB2bS5kYXRhKTtcblxuXHRcdGlmICh2b2xkICE9IG51bGwpIHtcblx0XHRcdHZhciBjbXBGbiA9IGlzQXJyKG9sZERpZmYpID8gY21wQXJyIDogY21wT2JqO1xuXHRcdFx0dmFyIGlzU2FtZSA9IG9sZERpZmYgPT09IG5ld0RpZmYgfHwgY21wRm4ob2xkRGlmZiwgbmV3RGlmZik7XG5cblx0XHRcdGlmIChpc1NhbWUpXG5cdFx0XHRcdHsgcmV0dXJuIHJlUGFyZW50KHZtLCB2b2xkLCBuZXdQYXJlbnQsIG5ld0lkeCk7IH1cblx0XHR9XG5cdH1cblxuXHRpc01vdW50ZWQgJiYgZmlyZUhvb2sodm0uaG9va3MsIFwid2lsbFJlZHJhd1wiLCB2bSwgdm0uZGF0YSk7XG5cblx0dmFyIHZuZXcgPSB2bS5yZW5kZXIuY2FsbCh2bSwgdm0sIHZtLmRhdGEsIG9sZERpZmYsIG5ld0RpZmYpO1xuXG5cdGlmICh2bmV3ID09PSB2b2xkKVxuXHRcdHsgcmV0dXJuIHJlUGFyZW50KHZtLCB2b2xkLCBuZXdQYXJlbnQsIG5ld0lkeCk7IH1cblxuXHQvLyB0b2RvOiB0ZXN0IHJlc3VsdCBvZiB3aWxsUmVkcmF3IGhvb2tzIGJlZm9yZSBjbGVhcmluZyByZWZzXG5cdHZtLnJlZnMgPSBudWxsO1xuXG5cdC8vIGFsd2F5cyBhc3NpZ24gdm0ga2V5IHRvIHJvb3Qgdm5vZGUgKHRoaXMgaXMgYSBkZS1vcHQpXG5cdGlmICh2bS5rZXkgIT0gbnVsbCAmJiB2bmV3LmtleSAhPT0gdm0ua2V5KVxuXHRcdHsgdm5ldy5rZXkgPSB2bS5rZXk7IH1cblxuXHR2bS5ub2RlID0gdm5ldztcblxuXHRpZiAobmV3UGFyZW50KSB7XG5cdFx0cHJlUHJvYyh2bmV3LCBuZXdQYXJlbnQsIG5ld0lkeCwgdm0pO1xuXHRcdG5ld1BhcmVudC5ib2R5W25ld0lkeF0gPSB2bmV3O1xuXHR9XG5cdGVsc2UgaWYgKHZvbGQgJiYgdm9sZC5wYXJlbnQpIHtcblx0XHRwcmVQcm9jKHZuZXcsIHZvbGQucGFyZW50LCB2b2xkLmlkeCwgdm0pO1xuXHRcdHZvbGQucGFyZW50LmJvZHlbdm9sZC5pZHhdID0gdm5ldztcblx0fVxuXHRlbHNlXG5cdFx0eyBwcmVQcm9jKHZuZXcsIG51bGwsIG51bGwsIHZtKTsgfVxuXG5cdGlmICh3aXRoRE9NICE9PSBmYWxzZSkge1xuXHRcdGlmICh2b2xkKSB7XG5cdFx0XHQvLyByb290IG5vZGUgcmVwbGFjZW1lbnRcblx0XHRcdGlmICh2b2xkLnRhZyAhPT0gdm5ldy50YWcgfHwgdm9sZC5rZXkgIT09IHZuZXcua2V5KSB7XG5cdFx0XHRcdC8vIGhhY2sgdG8gcHJldmVudCB0aGUgcmVwbGFjZW1lbnQgZnJvbSB0cmlnZ2VyaW5nIG1vdW50L3VubW91bnRcblx0XHRcdFx0dm9sZC52bSA9IHZuZXcudm0gPSBudWxsO1xuXG5cdFx0XHRcdHZhciBwYXJFbCA9IHZvbGQuZWwucGFyZW50Tm9kZTtcblx0XHRcdFx0dmFyIHJlZkVsID0gbmV4dFNpYih2b2xkLmVsKTtcblx0XHRcdFx0cmVtb3ZlQ2hpbGQocGFyRWwsIHZvbGQuZWwpO1xuXHRcdFx0XHRpbnNlcnRCZWZvcmUocGFyRWwsIGh5ZHJhdGUodm5ldyksIHJlZkVsKTtcblxuXHRcdFx0XHQvLyBhbm90aGVyIGhhY2sgdGhhdCBhbGxvd3MgYW55IGhpZ2hlci1sZXZlbCBzeW5jQ2hpbGRyZW4gdG8gc2V0XG5cdFx0XHRcdC8vIHJlY29uY2lsaWF0aW9uIGJvdW5kcyB1c2luZyBhIGxpdmUgbm9kZVxuXHRcdFx0XHR2b2xkLmVsID0gdm5ldy5lbDtcblxuXHRcdFx0XHQvLyByZXN0b3JlXG5cdFx0XHRcdHZuZXcudm0gPSB2bTtcblx0XHRcdH1cblx0XHRcdGVsc2Vcblx0XHRcdFx0eyBwYXRjaCh2bmV3LCB2b2xkKTsgfVxuXHRcdH1cblx0XHRlbHNlXG5cdFx0XHR7IGh5ZHJhdGUodm5ldyk7IH1cblx0fVxuXG5cdGlzTW91bnRlZCAmJiBmaXJlSG9vayh2bS5ob29rcywgXCJkaWRSZWRyYXdcIiwgdm0sIHZtLmRhdGEpO1xuXG5cdGlmIChpc1JlZHJhd1Jvb3QgJiYgaXNNb3VudGVkKVxuXHRcdHsgZHJhaW5EaWRIb29rcyh2bSk7IH1cblxuXHR7XG5cdFx0aWYgKGlzUmVkcmF3Um9vdCAmJiBERVZNT0RFLm11dGF0aW9ucyAmJiBpc01vdW50ZWQpXG5cdFx0XHR7IGNvbnNvbGUubG9nKGluc3RyLmVuZCgpKTsgfVxuXHR9XG5cblx0cmV0dXJuIHZtO1xufVxuXG4vLyB0aGlzIGFsc28gZG91YmxlcyBhcyBtb3ZlVG9cbi8vIFRPRE8/IEB3aXRoUmVkcmF3IChwcmV2ZW50IHJlZHJhdyBmcm9tIGZpcmluZylcbmZ1bmN0aW9uIHVwZGF0ZVN5bmMobmV3RGF0YSwgbmV3UGFyZW50LCBuZXdJZHgsIHdpdGhET00pIHtcblx0dmFyIHZtID0gdGhpcztcblxuXHRpZiAobmV3RGF0YSAhPSBudWxsKSB7XG5cdFx0aWYgKHZtLmRhdGEgIT09IG5ld0RhdGEpIHtcblx0XHRcdHtcblx0XHRcdFx0ZGV2Tm90aWZ5KFwiREFUQV9SRVBMQUNFRFwiLCBbdm0sIHZtLmRhdGEsIG5ld0RhdGFdKTtcblx0XHRcdH1cblx0XHRcdGZpcmVIb29rKHZtLmhvb2tzLCBcIndpbGxVcGRhdGVcIiwgdm0sIG5ld0RhdGEpO1xuXHRcdFx0dm0uZGF0YSA9IG5ld0RhdGE7XG5cblx0XHRcdHtcblx0XHRcdFx0aWYgKGlzU3RyZWFtKHZtLl9zdHJlYW0pKVxuXHRcdFx0XHRcdHsgdW5zdWJTdHJlYW0odm0uX3N0cmVhbSk7IH1cblx0XHRcdFx0aWYgKGlzU3RyZWFtKG5ld0RhdGEpKVxuXHRcdFx0XHRcdHsgdm0uX3N0cmVhbSA9IGhvb2tTdHJlYW0yKG5ld0RhdGEsIHZtKTsgfVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHJldHVybiB2bS5fcmVkcmF3KG5ld1BhcmVudCwgbmV3SWR4LCB3aXRoRE9NKTtcbn1cblxuZnVuY3Rpb24gZGVmaW5lRWxlbWVudCh0YWcsIGFyZzEsIGFyZzIsIGZsYWdzKSB7XG5cdHZhciBhdHRycywgYm9keTtcblxuXHRpZiAoYXJnMiA9PSBudWxsKSB7XG5cdFx0aWYgKGlzUGxhaW5PYmooYXJnMSkpXG5cdFx0XHR7IGF0dHJzID0gYXJnMTsgfVxuXHRcdGVsc2Vcblx0XHRcdHsgYm9keSA9IGFyZzE7IH1cblx0fVxuXHRlbHNlIHtcblx0XHRhdHRycyA9IGFyZzE7XG5cdFx0Ym9keSA9IGFyZzI7XG5cdH1cblxuXHRyZXR1cm4gaW5pdEVsZW1lbnROb2RlKHRhZywgYXR0cnMsIGJvZHksIGZsYWdzKTtcbn1cblxuLy9leHBvcnQgY29uc3QgWE1MX05TID0gXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3htbG5zL1wiO1xudmFyIFNWR19OUyA9IFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIjtcblxuZnVuY3Rpb24gZGVmaW5lU3ZnRWxlbWVudCh0YWcsIGFyZzEsIGFyZzIsIGZsYWdzKSB7XG5cdHZhciBuID0gZGVmaW5lRWxlbWVudCh0YWcsIGFyZzEsIGFyZzIsIGZsYWdzKTtcblx0bi5ucyA9IFNWR19OUztcblx0cmV0dXJuIG47XG59XG5cbmZ1bmN0aW9uIGRlZmluZUNvbW1lbnQoYm9keSkge1xuXHR2YXIgbm9kZSA9IG5ldyBWTm9kZTtcblx0bm9kZS50eXBlID0gQ09NTUVOVDtcblx0bm9kZS5ib2R5ID0gYm9keTtcblx0cmV0dXJuIG5vZGU7XG59XG5cbi8vIHBsYWNlaG9sZGVyIGZvciBkZWNsYXJlZCB2aWV3c1xuZnVuY3Rpb24gVlZpZXcodmlldywgZGF0YSwga2V5LCBvcHRzKSB7XG5cdHRoaXMudmlldyA9IHZpZXc7XG5cdHRoaXMuZGF0YSA9IGRhdGE7XG5cdHRoaXMua2V5ID0ga2V5O1xuXHR0aGlzLm9wdHMgPSBvcHRzO1xufVxuXG5WVmlldy5wcm90b3R5cGUgPSB7XG5cdGNvbnN0cnVjdG9yOiBWVmlldyxcblxuXHR0eXBlOiBWVklFVyxcblx0dmlldzogbnVsbCxcblx0ZGF0YTogbnVsbCxcblx0a2V5OiBudWxsLFxuXHRvcHRzOiBudWxsLFxufTtcblxuZnVuY3Rpb24gZGVmaW5lVmlldyh2aWV3LCBkYXRhLCBrZXksIG9wdHMpIHtcblx0cmV0dXJuIG5ldyBWVmlldyh2aWV3LCBkYXRhLCBrZXksIG9wdHMpO1xufVxuXG4vLyBwbGFjZWhvbGRlciBmb3IgaW5qZWN0ZWQgVmlld01vZGVsc1xuZnVuY3Rpb24gVk1vZGVsKHZtKSB7XG5cdHRoaXMudm0gPSB2bTtcbn1cblxuVk1vZGVsLnByb3RvdHlwZSA9IHtcblx0Y29uc3RydWN0b3I6IFZNb2RlbCxcblxuXHR0eXBlOiBWTU9ERUwsXG5cdHZtOiBudWxsLFxufTtcblxuZnVuY3Rpb24gaW5qZWN0Vmlldyh2bSkge1xuLy9cdGlmICh2bS5ub2RlID09IG51bGwpXG4vL1x0XHR2bS5fcmVkcmF3KG51bGwsIG51bGwsIGZhbHNlKTtcblxuLy9cdHJldHVybiB2bS5ub2RlO1xuXG5cdHJldHVybiBuZXcgVk1vZGVsKHZtKTtcbn1cblxuZnVuY3Rpb24gaW5qZWN0RWxlbWVudChlbCkge1xuXHR2YXIgbm9kZSA9IG5ldyBWTm9kZTtcblx0bm9kZS50eXBlID0gRUxFTUVOVDtcblx0bm9kZS5lbCA9IG5vZGUua2V5ID0gZWw7XG5cdHJldHVybiBub2RlO1xufVxuXG5mdW5jdGlvbiBsYXp5TGlzdChpdGVtcywgY2ZnKSB7XG5cdHZhciBsZW4gPSBpdGVtcy5sZW5ndGg7XG5cblx0dmFyIHNlbGYgPSB7XG5cdFx0aXRlbXM6IGl0ZW1zLFxuXHRcdGxlbmd0aDogbGVuLFxuXHRcdC8vIGRlZmF1bHRzIHRvIHJldHVybmluZyBpdGVtIGlkZW50aXR5IChvciBwb3NpdGlvbj8pXG5cdFx0a2V5OiBmdW5jdGlvbihpKSB7XG5cdFx0XHRyZXR1cm4gY2ZnLmtleShpdGVtc1tpXSwgaSk7XG5cdFx0fSxcblx0XHQvLyBkZWZhdWx0IHJldHVybnMgMD9cblx0XHRkaWZmOiBmdW5jdGlvbihpLCBkb25vcikge1xuXHRcdFx0dmFyIG5ld1ZhbHMgPSBjZmcuZGlmZihpdGVtc1tpXSwgaSk7XG5cdFx0XHRpZiAoZG9ub3IgPT0gbnVsbClcblx0XHRcdFx0eyByZXR1cm4gbmV3VmFsczsgfVxuXHRcdFx0dmFyIG9sZFZhbHMgPSBkb25vci5fZGlmZjtcblx0XHRcdHZhciBzYW1lID0gbmV3VmFscyA9PT0gb2xkVmFscyB8fCBpc0FycihvbGRWYWxzKSA/IGNtcEFycihuZXdWYWxzLCBvbGRWYWxzKSA6IGNtcE9iaihuZXdWYWxzLCBvbGRWYWxzKTtcblx0XHRcdHJldHVybiBzYW1lIHx8IG5ld1ZhbHM7XG5cdFx0fSxcblx0XHR0cGw6IGZ1bmN0aW9uKGkpIHtcblx0XHRcdHJldHVybiBjZmcudHBsKGl0ZW1zW2ldLCBpKTtcblx0XHR9LFxuXHRcdG1hcDogZnVuY3Rpb24odHBsKSB7XG5cdFx0XHRjZmcudHBsID0gdHBsO1xuXHRcdFx0cmV0dXJuIHNlbGY7XG5cdFx0fSxcblx0XHRib2R5OiBmdW5jdGlvbih2bm9kZSkge1xuXHRcdFx0dmFyIG5ib2R5ID0gQXJyYXkobGVuKTtcblxuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuXHRcdFx0XHR2YXIgdm5vZGUyID0gc2VsZi50cGwoaSk7XG5cblx0XHRcdC8vXHRpZiAoKHZub2RlLmZsYWdzICYgS0VZRURfTElTVCkgPT09IEtFWUVEX0xJU1QgJiYgc2VsZi4gIT0gbnVsbClcblx0XHRcdC8vXHRcdHZub2RlMi5rZXkgPSBnZXRLZXkoaXRlbSk7XG5cblx0XHRcdFx0dm5vZGUyLl9kaWZmID0gc2VsZi5kaWZmKGkpO1x0XHRcdC8vIGhvbGRzIG9sZFZhbHMgZm9yIGNtcFxuXG5cdFx0XHRcdG5ib2R5W2ldID0gdm5vZGUyO1xuXG5cdFx0XHRcdC8vIHJ1biBwcmVwcm9jIHBhc3MgKHNob3VsZCB0aGlzIGJlIGp1c3QgcHJlUHJvYyBpbiBhYm92ZSBsb29wPykgYmVuY2hcblx0XHRcdFx0cHJlUHJvYyh2bm9kZTIsIHZub2RlLCBpKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gcmVwbGFjZSBMaXN0IHdpdGggZ2VuZXJhdGVkIGJvZHlcblx0XHRcdHZub2RlLmJvZHkgPSBuYm9keTtcblx0XHR9XG5cdH07XG5cblx0cmV0dXJuIHNlbGY7XG59XG5cbnZhciBuYW5vID0ge1xuXHRjb25maWc6IGNvbmZpZyxcblxuXHRWaWV3TW9kZWw6IFZpZXdNb2RlbCxcblx0Vk5vZGU6IFZOb2RlLFxuXG5cdGNyZWF0ZVZpZXc6IGNyZWF0ZVZpZXcsXG5cblx0ZGVmaW5lRWxlbWVudDogZGVmaW5lRWxlbWVudCxcblx0ZGVmaW5lU3ZnRWxlbWVudDogZGVmaW5lU3ZnRWxlbWVudCxcblx0ZGVmaW5lVGV4dDogZGVmaW5lVGV4dCxcblx0ZGVmaW5lQ29tbWVudDogZGVmaW5lQ29tbWVudCxcblx0ZGVmaW5lVmlldzogZGVmaW5lVmlldyxcblxuXHRpbmplY3RWaWV3OiBpbmplY3RWaWV3LFxuXHRpbmplY3RFbGVtZW50OiBpbmplY3RFbGVtZW50LFxuXG5cdGxhenlMaXN0OiBsYXp5TGlzdCxcblxuXHRGSVhFRF9CT0RZOiBGSVhFRF9CT0RZLFxuXHRERUVQX1JFTU9WRTogREVFUF9SRU1PVkUsXG5cdEtFWUVEX0xJU1Q6IEtFWUVEX0xJU1QsXG5cdExBWllfTElTVDogTEFaWV9MSVNULFxufTtcblxuZnVuY3Rpb24gcHJvdG9QYXRjaChuLCBkb1JlcGFpbnQpIHtcblx0cGF0Y2gkMSh0aGlzLCBuLCBkb1JlcGFpbnQpO1xufVxuXG4vLyBuZXdOb2RlIGNhbiBiZSBlaXRoZXIge2NsYXNzOiBzdHlsZTogfSBvciBmdWxsIG5ldyBWTm9kZVxuLy8gd2lsbC9kaWRQYXRjaCBob29rcz9cbmZ1bmN0aW9uIHBhdGNoJDEobywgbiwgZG9SZXBhaW50KSB7XG5cdGlmIChuLnR5cGUgIT0gbnVsbCkge1xuXHRcdC8vIG5vIGZ1bGwgcGF0Y2hpbmcgb2YgdmlldyByb290cywganVzdCB1c2UgcmVkcmF3IVxuXHRcdGlmIChvLnZtICE9IG51bGwpXG5cdFx0XHR7IHJldHVybjsgfVxuXG5cdFx0cHJlUHJvYyhuLCBvLnBhcmVudCwgby5pZHgsIG51bGwpO1xuXHRcdG8ucGFyZW50LmJvZHlbby5pZHhdID0gbjtcblx0XHRwYXRjaChuLCBvKTtcblx0XHRkb1JlcGFpbnQgJiYgcmVwYWludChuKTtcblx0XHRkcmFpbkRpZEhvb2tzKGdldFZtKG4pKTtcblx0fVxuXHRlbHNlIHtcblx0XHQvLyBUT0RPOiByZS1lc3RhYmxpc2ggcmVmc1xuXG5cdFx0Ly8gc2hhbGxvdy1jbG9uZSB0YXJnZXRcblx0XHR2YXIgZG9ub3IgPSBPYmplY3QuY3JlYXRlKG8pO1xuXHRcdC8vIGZpeGF0ZSBvcmlnIGF0dHJzXG5cdFx0ZG9ub3IuYXR0cnMgPSBhc3NpZ25PYmooe30sIG8uYXR0cnMpO1xuXHRcdC8vIGFzc2lnbiBuZXcgYXR0cnMgaW50byBsaXZlIHRhcmcgbm9kZVxuXHRcdHZhciBvYXR0cnMgPSBhc3NpZ25PYmooby5hdHRycywgbik7XG5cdFx0Ly8gcHJlcGVuZCBhbnkgZml4ZWQgc2hvcnRoYW5kIGNsYXNzXG5cdFx0aWYgKG8uX2NsYXNzICE9IG51bGwpIHtcblx0XHRcdHZhciBhY2xhc3MgPSBvYXR0cnMuY2xhc3M7XG5cdFx0XHRvYXR0cnMuY2xhc3MgPSBhY2xhc3MgIT0gbnVsbCAmJiBhY2xhc3MgIT09IFwiXCIgPyBvLl9jbGFzcyArIFwiIFwiICsgYWNsYXNzIDogby5fY2xhc3M7XG5cdFx0fVxuXG5cdFx0cGF0Y2hBdHRycyhvLCBkb25vcik7XG5cblx0XHRkb1JlcGFpbnQgJiYgcmVwYWludChvKTtcblx0fVxufVxuXG5WTm9kZVByb3RvLnBhdGNoID0gcHJvdG9QYXRjaDtcblxuZnVuY3Rpb24gbmV4dFN1YlZtcyhuLCBhY2N1bSkge1xuXHR2YXIgYm9keSA9IG4uYm9keTtcblxuXHRpZiAoaXNBcnIoYm9keSkpIHtcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGJvZHkubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBuMiA9IGJvZHlbaV07XG5cblx0XHRcdGlmIChuMi52bSAhPSBudWxsKVxuXHRcdFx0XHR7IGFjY3VtLnB1c2gobjIudm0pOyB9XG5cdFx0XHRlbHNlXG5cdFx0XHRcdHsgbmV4dFN1YlZtcyhuMiwgYWNjdW0pOyB9XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIGFjY3VtO1xufVxuXG5mdW5jdGlvbiBkZWZpbmVFbGVtZW50U3ByZWFkKHRhZykge1xuXHR2YXIgYXJncyA9IGFyZ3VtZW50cztcblx0dmFyIGxlbiA9IGFyZ3MubGVuZ3RoO1xuXHR2YXIgYm9keSwgYXR0cnM7XG5cblx0aWYgKGxlbiA+IDEpIHtcblx0XHR2YXIgYm9keUlkeCA9IDE7XG5cblx0XHRpZiAoaXNQbGFpbk9iaihhcmdzWzFdKSkge1xuXHRcdFx0YXR0cnMgPSBhcmdzWzFdO1xuXHRcdFx0Ym9keUlkeCA9IDI7XG5cdFx0fVxuXG5cdFx0aWYgKGxlbiA9PT0gYm9keUlkeCArIDEgJiYgKGlzVmFsKGFyZ3NbYm9keUlkeF0pIHx8IGlzQXJyKGFyZ3NbYm9keUlkeF0pIHx8IGF0dHJzICYmIChhdHRycy5fZmxhZ3MgJiBMQVpZX0xJU1QpID09PSBMQVpZX0xJU1QpKVxuXHRcdFx0eyBib2R5ID0gYXJnc1tib2R5SWR4XTsgfVxuXHRcdGVsc2Vcblx0XHRcdHsgYm9keSA9IHNsaWNlQXJncyhhcmdzLCBib2R5SWR4KTsgfVxuXHR9XG5cblx0cmV0dXJuIGluaXRFbGVtZW50Tm9kZSh0YWcsIGF0dHJzLCBib2R5KTtcbn1cblxuZnVuY3Rpb24gZGVmaW5lU3ZnRWxlbWVudFNwcmVhZCgpIHtcblx0dmFyIG4gPSBkZWZpbmVFbGVtZW50U3ByZWFkLmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7XG5cdG4ubnMgPSBTVkdfTlM7XG5cdHJldHVybiBuO1xufVxuXG5WaWV3TW9kZWxQcm90by5lbWl0ID0gZW1pdDtcblZpZXdNb2RlbFByb3RvLm9uZW1pdCA9IG51bGw7XG5cblZpZXdNb2RlbFByb3RvLmJvZHkgPSBmdW5jdGlvbigpIHtcblx0cmV0dXJuIG5leHRTdWJWbXModGhpcy5ub2RlLCBbXSk7XG59O1xuXG5uYW5vLmRlZmluZUVsZW1lbnRTcHJlYWQgPSBkZWZpbmVFbGVtZW50U3ByZWFkO1xubmFuby5kZWZpbmVTdmdFbGVtZW50U3ByZWFkID0gZGVmaW5lU3ZnRWxlbWVudFNwcmVhZDtcblxuVmlld01vZGVsUHJvdG8uX3N0cmVhbSA9IG51bGw7XG5cbmZ1bmN0aW9uIHByb3RvQXR0YWNoKGVsKSB7XG5cdHZhciB2bSA9IHRoaXM7XG5cdGlmICh2bS5ub2RlID09IG51bGwpXG5cdFx0eyB2bS5fcmVkcmF3KG51bGwsIG51bGwsIGZhbHNlKTsgfVxuXG5cdGF0dGFjaCh2bS5ub2RlLCBlbCk7XG5cblx0cmV0dXJuIHZtO1xufVxuXG4vLyB2ZXJ5IHNpbWlsYXIgdG8gaHlkcmF0ZSwgVE9ETzogZHJ5XG5mdW5jdGlvbiBhdHRhY2godm5vZGUsIHdpdGhFbCkge1xuXHR2bm9kZS5lbCA9IHdpdGhFbDtcblx0d2l0aEVsLl9ub2RlID0gdm5vZGU7XG5cblx0dmFyIG5hdHRycyA9IHZub2RlLmF0dHJzO1xuXG5cdGZvciAodmFyIGtleSBpbiBuYXR0cnMpIHtcblx0XHR2YXIgbnZhbCA9IG5hdHRyc1trZXldO1xuXHRcdHZhciBpc0R5biA9IGlzRHluUHJvcCh2bm9kZS50YWcsIGtleSk7XG5cblx0XHRpZiAoaXNTdHlsZVByb3Aoa2V5KSB8fCBpc1NwbFByb3Aoa2V5KSkge31cblx0XHRlbHNlIGlmIChpc0V2UHJvcChrZXkpKVxuXHRcdFx0eyBwYXRjaEV2ZW50KHZub2RlLCBrZXksIG52YWwpOyB9XG5cdFx0ZWxzZSBpZiAobnZhbCAhPSBudWxsICYmIGlzRHluKVxuXHRcdFx0eyBzZXRBdHRyKHZub2RlLCBrZXksIG52YWwsIGlzRHluKTsgfVxuXHR9XG5cblx0aWYgKCh2bm9kZS5mbGFncyAmIExBWllfTElTVCkgPT09IExBWllfTElTVClcblx0XHR7IHZub2RlLmJvZHkuYm9keSh2bm9kZSk7IH1cblxuXHRpZiAoaXNBcnIodm5vZGUuYm9keSkgJiYgdm5vZGUuYm9keS5sZW5ndGggPiAwKSB7XG5cdFx0dmFyIGMgPSB3aXRoRWwuZmlyc3RDaGlsZDtcblx0XHR2YXIgaSA9IDA7XG5cdFx0dmFyIHYgPSB2bm9kZS5ib2R5W2ldO1xuXHRcdGRvIHtcblx0XHRcdGlmICh2LnR5cGUgPT09IFZWSUVXKVxuXHRcdFx0XHR7IHYgPSBjcmVhdGVWaWV3KHYudmlldywgdi5kYXRhLCB2LmtleSwgdi5vcHRzKS5fcmVkcmF3KHZub2RlLCBpLCBmYWxzZSkubm9kZTsgfVxuXHRcdFx0ZWxzZSBpZiAodi50eXBlID09PSBWTU9ERUwpXG5cdFx0XHRcdHsgdiA9IHYubm9kZSB8fCB2Ll9yZWRyYXcodm5vZGUsIGksIGZhbHNlKS5ub2RlOyB9XG5cblx0XHRcdHtcblx0XHRcdFx0aWYgKHZub2RlLnRhZyA9PT0gXCJ0YWJsZVwiICYmIHYudGFnID09PSBcInRyXCIpIHtcblx0XHRcdFx0XHRkZXZOb3RpZnkoXCJBVFRBQ0hfSU1QTElDSVRfVEJPRFlcIiwgW3Zub2RlLCB2XSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0YXR0YWNoKHYsIGMpO1xuXHRcdH0gd2hpbGUgKChjID0gYy5uZXh0U2libGluZykgJiYgKHYgPSB2bm9kZS5ib2R5WysraV0pKVxuXHR9XG59XG5cbmZ1bmN0aW9uIHZtUHJvdG9IdG1sKGR5blByb3BzKSB7XG5cdHZhciB2bSA9IHRoaXM7XG5cblx0aWYgKHZtLm5vZGUgPT0gbnVsbClcblx0XHR7IHZtLl9yZWRyYXcobnVsbCwgbnVsbCwgZmFsc2UpOyB9XG5cblx0cmV0dXJuIGh0bWwodm0ubm9kZSwgZHluUHJvcHMpO1xufVxuXG5mdW5jdGlvbiB2UHJvdG9IdG1sKGR5blByb3BzKSB7XG5cdHJldHVybiBodG1sKHRoaXMsIGR5blByb3BzKTtcbn1cblxuZnVuY3Rpb24gY2FtZWxEYXNoKHZhbCkge1xuXHRyZXR1cm4gdmFsLnJlcGxhY2UoLyhbYS16XSkoW0EtWl0pL2csICckMS0kMicpLnRvTG93ZXJDYXNlKCk7XG59XG5cbmZ1bmN0aW9uIHN0eWxlU3RyKGNzcykge1xuXHR2YXIgc3R5bGUgPSBcIlwiO1xuXG5cdGZvciAodmFyIHBuYW1lIGluIGNzcykge1xuXHRcdGlmIChjc3NbcG5hbWVdICE9IG51bGwpXG5cdFx0XHR7IHN0eWxlICs9IGNhbWVsRGFzaChwbmFtZSkgKyBcIjogXCIgKyBhdXRvUHgocG5hbWUsIGNzc1twbmFtZV0pICsgJzsgJzsgfVxuXHR9XG5cblx0cmV0dXJuIHN0eWxlO1xufVxuXG5mdW5jdGlvbiB0b1N0cih2YWwpIHtcblx0cmV0dXJuIHZhbCA9PSBudWxsID8gJycgOiAnJyt2YWw7XG59XG5cbnZhciB2b2lkVGFncyA9IHtcbiAgICBhcmVhOiB0cnVlLFxuICAgIGJhc2U6IHRydWUsXG4gICAgYnI6IHRydWUsXG4gICAgY29sOiB0cnVlLFxuICAgIGNvbW1hbmQ6IHRydWUsXG4gICAgZW1iZWQ6IHRydWUsXG4gICAgaHI6IHRydWUsXG4gICAgaW1nOiB0cnVlLFxuICAgIGlucHV0OiB0cnVlLFxuICAgIGtleWdlbjogdHJ1ZSxcbiAgICBsaW5rOiB0cnVlLFxuICAgIG1ldGE6IHRydWUsXG4gICAgcGFyYW06IHRydWUsXG4gICAgc291cmNlOiB0cnVlLFxuICAgIHRyYWNrOiB0cnVlLFxuXHR3YnI6IHRydWVcbn07XG5cbmZ1bmN0aW9uIGVzY0h0bWwocykge1xuXHRzID0gdG9TdHIocyk7XG5cblx0Zm9yICh2YXIgaSA9IDAsIG91dCA9ICcnOyBpIDwgcy5sZW5ndGg7IGkrKykge1xuXHRcdHN3aXRjaCAoc1tpXSkge1xuXHRcdFx0Y2FzZSAnJic6IG91dCArPSAnJmFtcDsnOyAgYnJlYWs7XG5cdFx0XHRjYXNlICc8Jzogb3V0ICs9ICcmbHQ7JzsgICBicmVhaztcblx0XHRcdGNhc2UgJz4nOiBvdXQgKz0gJyZndDsnOyAgIGJyZWFrO1xuXHRcdC8vXHRjYXNlICdcIic6IG91dCArPSAnJnF1b3Q7JzsgYnJlYWs7XG5cdFx0Ly9cdGNhc2UgXCInXCI6IG91dCArPSAnJiMwMzk7JzsgYnJlYWs7XG5cdFx0Ly9cdGNhc2UgJy8nOiBvdXQgKz0gJyYjeDJmOyc7IGJyZWFrO1xuXHRcdFx0ZGVmYXVsdDogIG91dCArPSBzW2ldO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiBvdXQ7XG59XG5cbmZ1bmN0aW9uIGVzY1F1b3RlcyhzKSB7XG5cdHMgPSB0b1N0cihzKTtcblxuXHRmb3IgKHZhciBpID0gMCwgb3V0ID0gJyc7IGkgPCBzLmxlbmd0aDsgaSsrKVxuXHRcdHsgb3V0ICs9IHNbaV0gPT09ICdcIicgPyAnJnF1b3Q7JyA6IHNbaV07IH1cdFx0Ly8gYWxzbyAmP1xuXG5cdHJldHVybiBvdXQ7XG59XG5cbmZ1bmN0aW9uIGVhY2hIdG1sKGFyciwgZHluUHJvcHMpIHtcblx0dmFyIGJ1ZiA9ICcnO1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKylcblx0XHR7IGJ1ZiArPSBodG1sKGFycltpXSwgZHluUHJvcHMpOyB9XG5cdHJldHVybiBidWY7XG59XG5cbnZhciBpbm5lckhUTUwgPSBcIi5pbm5lckhUTUxcIjtcblxuZnVuY3Rpb24gaHRtbChub2RlLCBkeW5Qcm9wcykge1xuXHR2YXIgb3V0LCBzdHlsZTtcblxuXHRzd2l0Y2ggKG5vZGUudHlwZSkge1xuXHRcdGNhc2UgVlZJRVc6XG5cdFx0XHRvdXQgPSBjcmVhdGVWaWV3KG5vZGUudmlldywgbm9kZS5kYXRhLCBub2RlLmtleSwgbm9kZS5vcHRzKS5odG1sKGR5blByb3BzKTtcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgVk1PREVMOlxuXHRcdFx0b3V0ID0gbm9kZS52bS5odG1sKCk7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIEVMRU1FTlQ6XG5cdFx0XHRpZiAobm9kZS5lbCAhPSBudWxsICYmIG5vZGUudGFnID09IG51bGwpIHtcblx0XHRcdFx0b3V0ID0gbm9kZS5lbC5vdXRlckhUTUw7XHRcdC8vIHByZS1leGlzdGluZyBkb20gZWxlbWVudHMgKGRvZXMgbm90IGN1cnJlbnRseSBhY2NvdW50IGZvciBhbnkgcHJvcHMgYXBwbGllZCB0byB0aGVtKVxuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblxuXHRcdFx0dmFyIGJ1ZiA9IFwiXCI7XG5cblx0XHRcdGJ1ZiArPSBcIjxcIiArIG5vZGUudGFnO1xuXG5cdFx0XHR2YXIgYXR0cnMgPSBub2RlLmF0dHJzLFxuXHRcdFx0XHRoYXNBdHRycyA9IGF0dHJzICE9IG51bGw7XG5cblx0XHRcdGlmIChoYXNBdHRycykge1xuXHRcdFx0XHRmb3IgKHZhciBwbmFtZSBpbiBhdHRycykge1xuXHRcdFx0XHRcdGlmIChpc0V2UHJvcChwbmFtZSkgfHwgcG5hbWVbMF0gPT09IFwiLlwiIHx8IHBuYW1lWzBdID09PSBcIl9cIiB8fCBkeW5Qcm9wcyA9PT0gZmFsc2UgJiYgaXNEeW5Qcm9wKG5vZGUudGFnLCBwbmFtZSkpXG5cdFx0XHRcdFx0XHR7IGNvbnRpbnVlOyB9XG5cblx0XHRcdFx0XHR2YXIgdmFsID0gYXR0cnNbcG5hbWVdO1xuXG5cdFx0XHRcdFx0aWYgKHBuYW1lID09PSBcInN0eWxlXCIgJiYgdmFsICE9IG51bGwpIHtcblx0XHRcdFx0XHRcdHN0eWxlID0gdHlwZW9mIHZhbCA9PT0gXCJvYmplY3RcIiA/IHN0eWxlU3RyKHZhbCkgOiB2YWw7XG5cdFx0XHRcdFx0XHRjb250aW51ZTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRpZiAodmFsID09PSB0cnVlKVxuXHRcdFx0XHRcdFx0eyBidWYgKz0gXCIgXCIgKyBlc2NIdG1sKHBuYW1lKSArICc9XCJcIic7IH1cblx0XHRcdFx0XHRlbHNlIGlmICh2YWwgPT09IGZhbHNlKSB7fVxuXHRcdFx0XHRcdGVsc2UgaWYgKHZhbCAhPSBudWxsKVxuXHRcdFx0XHRcdFx0eyBidWYgKz0gXCIgXCIgKyBlc2NIdG1sKHBuYW1lKSArICc9XCInICsgZXNjUXVvdGVzKHZhbCkgKyAnXCInOyB9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoc3R5bGUgIT0gbnVsbClcblx0XHRcdFx0XHR7IGJ1ZiArPSAnIHN0eWxlPVwiJyArIGVzY1F1b3RlcyhzdHlsZS50cmltKCkpICsgJ1wiJzsgfVxuXHRcdFx0fVxuXG5cdFx0XHQvLyBpZiBib2R5LWxlc3Mgc3ZnIG5vZGUsIGF1dG8tY2xvc2UgJiByZXR1cm5cblx0XHRcdGlmIChub2RlLmJvZHkgPT0gbnVsbCAmJiBub2RlLm5zICE9IG51bGwgJiYgbm9kZS50YWcgIT09IFwic3ZnXCIpXG5cdFx0XHRcdHsgcmV0dXJuIGJ1ZiArIFwiLz5cIjsgfVxuXHRcdFx0ZWxzZVxuXHRcdFx0XHR7IGJ1ZiArPSBcIj5cIjsgfVxuXG5cdFx0XHRpZiAoIXZvaWRUYWdzW25vZGUudGFnXSkge1xuXHRcdFx0XHRpZiAoaGFzQXR0cnMgJiYgYXR0cnNbaW5uZXJIVE1MXSAhPSBudWxsKVxuXHRcdFx0XHRcdHsgYnVmICs9IGF0dHJzW2lubmVySFRNTF07IH1cblx0XHRcdFx0ZWxzZSBpZiAoaXNBcnIobm9kZS5ib2R5KSlcblx0XHRcdFx0XHR7IGJ1ZiArPSBlYWNoSHRtbChub2RlLmJvZHksIGR5blByb3BzKTsgfVxuXHRcdFx0XHRlbHNlIGlmICgobm9kZS5mbGFncyAmIExBWllfTElTVCkgPT09IExBWllfTElTVCkge1xuXHRcdFx0XHRcdG5vZGUuYm9keS5ib2R5KG5vZGUpO1xuXHRcdFx0XHRcdGJ1ZiArPSBlYWNoSHRtbChub2RlLmJvZHksIGR5blByb3BzKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0eyBidWYgKz0gZXNjSHRtbChub2RlLmJvZHkpOyB9XG5cblx0XHRcdFx0YnVmICs9IFwiPC9cIiArIG5vZGUudGFnICsgXCI+XCI7XG5cdFx0XHR9XG5cdFx0XHRvdXQgPSBidWY7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIFRFWFQ6XG5cdFx0XHRvdXQgPSBlc2NIdG1sKG5vZGUuYm9keSk7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIENPTU1FTlQ6XG5cdFx0XHRvdXQgPSBcIjwhLS1cIiArIGVzY0h0bWwobm9kZS5ib2R5KSArIFwiLS0+XCI7XG5cdFx0XHRicmVhaztcblx0fVxuXG5cdHJldHVybiBvdXQ7XG59XG5cblZpZXdNb2RlbFByb3RvLmF0dGFjaCA9IHByb3RvQXR0YWNoO1xuXG5WaWV3TW9kZWxQcm90by5odG1sID0gdm1Qcm90b0h0bWw7XG5WTm9kZVByb3RvLmh0bWwgPSB2UHJvdG9IdG1sO1xuXG5uYW5vLkRFVk1PREUgPSBERVZNT0RFO1xuXG5yZXR1cm4gbmFubztcblxufSkpKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRvbXZtLmRldi5qcy5tYXBcbiIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG4vLyBjYWNoZWQgZnJvbSB3aGF0ZXZlciBnbG9iYWwgaXMgcHJlc2VudCBzbyB0aGF0IHRlc3QgcnVubmVycyB0aGF0IHN0dWIgaXRcbi8vIGRvbid0IGJyZWFrIHRoaW5ncy4gIEJ1dCB3ZSBuZWVkIHRvIHdyYXAgaXQgaW4gYSB0cnkgY2F0Y2ggaW4gY2FzZSBpdCBpc1xuLy8gd3JhcHBlZCBpbiBzdHJpY3QgbW9kZSBjb2RlIHdoaWNoIGRvZXNuJ3QgZGVmaW5lIGFueSBnbG9iYWxzLiAgSXQncyBpbnNpZGUgYVxuLy8gZnVuY3Rpb24gYmVjYXVzZSB0cnkvY2F0Y2hlcyBkZW9wdGltaXplIGluIGNlcnRhaW4gZW5naW5lcy5cblxudmFyIGNhY2hlZFNldFRpbWVvdXQ7XG52YXIgY2FjaGVkQ2xlYXJUaW1lb3V0O1xuXG5mdW5jdGlvbiBkZWZhdWx0U2V0VGltb3V0KCkge1xuICAgIHRocm93IG5ldyBFcnJvcignc2V0VGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuZnVuY3Rpb24gZGVmYXVsdENsZWFyVGltZW91dCAoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdjbGVhclRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbihmdW5jdGlvbiAoKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBzZXRUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBjbGVhclRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgfVxufSAoKSlcbmZ1bmN0aW9uIHJ1blRpbWVvdXQoZnVuKSB7XG4gICAgaWYgKGNhY2hlZFNldFRpbWVvdXQgPT09IHNldFRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIC8vIGlmIHNldFRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRTZXRUaW1lb3V0ID09PSBkZWZhdWx0U2V0VGltb3V0IHx8ICFjYWNoZWRTZXRUaW1lb3V0KSAmJiBzZXRUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfSBjYXRjaChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbChudWxsLCBmdW4sIDApO1xuICAgICAgICB9IGNhdGNoKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3JcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwodGhpcywgZnVuLCAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG59XG5mdW5jdGlvbiBydW5DbGVhclRpbWVvdXQobWFya2VyKSB7XG4gICAgaWYgKGNhY2hlZENsZWFyVGltZW91dCA9PT0gY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIC8vIGlmIGNsZWFyVGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZENsZWFyVGltZW91dCA9PT0gZGVmYXVsdENsZWFyVGltZW91dCB8fCAhY2FjaGVkQ2xlYXJUaW1lb3V0KSAmJiBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0ICB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKG51bGwsIG1hcmtlcik7XG4gICAgICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3IuXG4gICAgICAgICAgICAvLyBTb21lIHZlcnNpb25zIG9mIEkuRS4gaGF2ZSBkaWZmZXJlbnQgcnVsZXMgZm9yIGNsZWFyVGltZW91dCB2cyBzZXRUaW1lb3V0XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwodGhpcywgbWFya2VyKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG5cbn1cbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG52YXIgY3VycmVudFF1ZXVlO1xudmFyIHF1ZXVlSW5kZXggPSAtMTtcblxuZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xuICAgIGlmICghZHJhaW5pbmcgfHwgIWN1cnJlbnRRdWV1ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgfVxuICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgZHJhaW5RdWV1ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgICBpZiAoZHJhaW5pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdGltZW91dCA9IHJ1blRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcbiAgICBkcmFpbmluZyA9IHRydWU7XG5cbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRRdWV1ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgY3VycmVudFF1ZXVlID0gbnVsbDtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIHJ1bkNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cblxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XG4gICAgICAgIHJ1blRpbWVvdXQoZHJhaW5RdWV1ZSk7XG4gICAgfVxufTtcblxuLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gICAgdGhpcy5mdW4gPSBmdW47XG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xufVxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xufTtcbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5wcm9jZXNzLnZlcnNpb25zID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZE9uY2VMaXN0ZW5lciA9IG5vb3A7XG5cbnByb2Nlc3MubGlzdGVuZXJzID0gZnVuY3Rpb24gKG5hbWUpIHsgcmV0dXJuIFtdIH1cblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XG4iLCIoZnVuY3Rpb24gKCkge1xuICBnbG9iYWwgPSB0aGlzXG5cbiAgdmFyIHF1ZXVlSWQgPSAxXG4gIHZhciBxdWV1ZSA9IHt9XG4gIHZhciBpc1J1bm5pbmdUYXNrID0gZmFsc2VcblxuICBpZiAoIWdsb2JhbC5zZXRJbW1lZGlhdGUpXG4gICAgZ2xvYmFsLmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgaWYgKGUuc291cmNlID09IGdsb2JhbCl7XG4gICAgICAgIGlmIChpc1J1bm5pbmdUYXNrKVxuICAgICAgICAgIG5leHRUaWNrKHF1ZXVlW2UuZGF0YV0pXG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGlzUnVubmluZ1Rhc2sgPSB0cnVlXG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHF1ZXVlW2UuZGF0YV0oKVxuICAgICAgICAgIH0gY2F0Y2ggKGUpIHt9XG5cbiAgICAgICAgICBkZWxldGUgcXVldWVbZS5kYXRhXVxuICAgICAgICAgIGlzUnVubmluZ1Rhc2sgPSBmYWxzZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcblxuICBmdW5jdGlvbiBuZXh0VGljayhmbikge1xuICAgIGlmIChnbG9iYWwuc2V0SW1tZWRpYXRlKSBzZXRJbW1lZGlhdGUoZm4pXG4gICAgLy8gaWYgaW5zaWRlIG9mIHdlYiB3b3JrZXJcbiAgICBlbHNlIGlmIChnbG9iYWwuaW1wb3J0U2NyaXB0cykgc2V0VGltZW91dChmbilcbiAgICBlbHNlIHtcbiAgICAgIHF1ZXVlSWQrK1xuICAgICAgcXVldWVbcXVldWVJZF0gPSBmblxuICAgICAgZ2xvYmFsLnBvc3RNZXNzYWdlKHF1ZXVlSWQsICcqJylcbiAgICB9XG4gIH1cblxuICBEZWZlcnJlZC5yZXNvbHZlID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgaWYgKCEodGhpcy5fZCA9PSAxKSlcbiAgICAgIHRocm93IFR5cGVFcnJvcigpXG5cbiAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBEZWZlcnJlZClcbiAgICAgIHJldHVybiB2YWx1ZVxuXG4gICAgcmV0dXJuIG5ldyBEZWZlcnJlZChmdW5jdGlvbiAocmVzb2x2ZSkge1xuICAgICAgICByZXNvbHZlKHZhbHVlKVxuICAgIH0pXG4gIH1cblxuICBEZWZlcnJlZC5yZWplY3QgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICBpZiAoISh0aGlzLl9kID09IDEpKVxuICAgICAgdGhyb3cgVHlwZUVycm9yKClcblxuICAgIHJldHVybiBuZXcgRGVmZXJyZWQoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICByZWplY3QodmFsdWUpXG4gICAgfSlcbiAgfVxuXG4gIERlZmVycmVkLmFsbCA9IGZ1bmN0aW9uIChhcnIpIHtcbiAgICBpZiAoISh0aGlzLl9kID09IDEpKVxuICAgICAgdGhyb3cgVHlwZUVycm9yKClcblxuICAgIGlmICghKGFyciBpbnN0YW5jZW9mIEFycmF5KSlcbiAgICAgIHJldHVybiBEZWZlcnJlZC5yZWplY3QoVHlwZUVycm9yKCkpXG5cbiAgICB2YXIgZCA9IG5ldyBEZWZlcnJlZCgpXG5cbiAgICBmdW5jdGlvbiBkb25lKGUsIHYpIHtcbiAgICAgIGlmICh2KVxuICAgICAgICByZXR1cm4gZC5yZXNvbHZlKHYpXG5cbiAgICAgIGlmIChlKVxuICAgICAgICByZXR1cm4gZC5yZWplY3QoZSlcblxuICAgICAgdmFyIHVucmVzb2x2ZWQgPSBhcnIucmVkdWNlKGZ1bmN0aW9uIChjbnQsIHYpIHtcbiAgICAgICAgaWYgKHYgJiYgdi50aGVuKVxuICAgICAgICAgIHJldHVybiBjbnQgKyAxXG4gICAgICAgIHJldHVybiBjbnRcbiAgICAgIH0sIDApXG5cbiAgICAgIGlmKHVucmVzb2x2ZWQgPT0gMClcbiAgICAgICAgZC5yZXNvbHZlKGFycilcblxuICAgICAgYXJyLm1hcChmdW5jdGlvbiAodiwgaSkge1xuICAgICAgICBpZiAodiAmJiB2LnRoZW4pXG4gICAgICAgICAgdi50aGVuKGZ1bmN0aW9uIChyKSB7XG4gICAgICAgICAgICBhcnJbaV0gPSByXG4gICAgICAgICAgICBkb25lKClcbiAgICAgICAgICAgIHJldHVybiByXG4gICAgICAgICAgfSwgZG9uZSlcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgZG9uZSgpXG5cbiAgICByZXR1cm4gZFxuICB9XG5cbiAgRGVmZXJyZWQucmFjZSA9IGZ1bmN0aW9uIChhcnIpIHtcbiAgICBpZiAoISh0aGlzLl9kID09IDEpKVxuICAgICAgdGhyb3cgVHlwZUVycm9yKClcblxuICAgIGlmICghKGFyciBpbnN0YW5jZW9mIEFycmF5KSlcbiAgICAgIHJldHVybiBEZWZlcnJlZC5yZWplY3QoVHlwZUVycm9yKCkpXG5cbiAgICBpZiAoYXJyLmxlbmd0aCA9PSAwKVxuICAgICAgcmV0dXJuIG5ldyBEZWZlcnJlZCgpXG5cbiAgICB2YXIgZCA9IG5ldyBEZWZlcnJlZCgpXG5cbiAgICBmdW5jdGlvbiBkb25lKGUsIHYpIHtcbiAgICAgIGlmICh2KVxuICAgICAgICByZXR1cm4gZC5yZXNvbHZlKHYpXG5cbiAgICAgIGlmIChlKVxuICAgICAgICByZXR1cm4gZC5yZWplY3QoZSlcblxuICAgICAgdmFyIHVucmVzb2x2ZWQgPSBhcnIucmVkdWNlKGZ1bmN0aW9uIChjbnQsIHYpIHtcbiAgICAgICAgaWYgKHYgJiYgdi50aGVuKVxuICAgICAgICAgIHJldHVybiBjbnQgKyAxXG4gICAgICAgIHJldHVybiBjbnRcbiAgICAgIH0sIDApXG5cbiAgICAgIGlmKHVucmVzb2x2ZWQgPT0gMClcbiAgICAgICAgZC5yZXNvbHZlKGFycilcblxuICAgICAgYXJyLm1hcChmdW5jdGlvbiAodiwgaSkge1xuICAgICAgICBpZiAodiAmJiB2LnRoZW4pXG4gICAgICAgICAgdi50aGVuKGZ1bmN0aW9uIChyKSB7XG4gICAgICAgICAgICBkb25lKG51bGwsIHIpXG4gICAgICAgICAgfSwgZG9uZSlcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgZG9uZSgpXG5cbiAgICByZXR1cm4gZFxuICB9XG5cbiAgRGVmZXJyZWQuX2QgPSAxXG5cblxuICAvKipcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqL1xuICBmdW5jdGlvbiBEZWZlcnJlZChyZXNvbHZlcikge1xuICAgICd1c2Ugc3RyaWN0J1xuICAgIGlmICh0eXBlb2YgcmVzb2x2ZXIgIT0gJ2Z1bmN0aW9uJyAmJiByZXNvbHZlciAhPSB1bmRlZmluZWQpXG4gICAgICB0aHJvdyBUeXBlRXJyb3IoKVxuXG4gICAgaWYgKHR5cGVvZiB0aGlzICE9ICdvYmplY3QnIHx8ICh0aGlzICYmIHRoaXMudGhlbikpXG4gICAgICB0aHJvdyBUeXBlRXJyb3IoKVxuXG4gICAgLy8gc3RhdGVzXG4gICAgLy8gMDogcGVuZGluZ1xuICAgIC8vIDE6IHJlc29sdmluZ1xuICAgIC8vIDI6IHJlamVjdGluZ1xuICAgIC8vIDM6IHJlc29sdmVkXG4gICAgLy8gNDogcmVqZWN0ZWRcbiAgICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgICBzdGF0ZSA9IDAsXG4gICAgICB2YWwgPSAwLFxuICAgICAgbmV4dCA9IFtdLFxuICAgICAgZm4sIGVyO1xuXG4gICAgc2VsZlsncHJvbWlzZSddID0gc2VsZlxuXG4gICAgc2VsZlsncmVzb2x2ZSddID0gZnVuY3Rpb24gKHYpIHtcbiAgICAgIGZuID0gc2VsZi5mblxuICAgICAgZXIgPSBzZWxmLmVyXG4gICAgICBpZiAoIXN0YXRlKSB7XG4gICAgICAgIHZhbCA9IHZcbiAgICAgICAgc3RhdGUgPSAxXG5cbiAgICAgICAgbmV4dFRpY2soZmlyZSlcbiAgICAgIH1cbiAgICAgIHJldHVybiBzZWxmXG4gICAgfVxuXG4gICAgc2VsZlsncmVqZWN0J10gPSBmdW5jdGlvbiAodikge1xuICAgICAgZm4gPSBzZWxmLmZuXG4gICAgICBlciA9IHNlbGYuZXJcbiAgICAgIGlmICghc3RhdGUpIHtcbiAgICAgICAgdmFsID0gdlxuICAgICAgICBzdGF0ZSA9IDJcblxuICAgICAgICBuZXh0VGljayhmaXJlKVxuXG4gICAgICB9XG4gICAgICByZXR1cm4gc2VsZlxuICAgIH1cblxuICAgIHNlbGZbJ19kJ10gPSAxXG5cbiAgICBzZWxmWyd0aGVuJ10gPSBmdW5jdGlvbiAoX2ZuLCBfZXIpIHtcbiAgICAgIGlmICghKHRoaXMuX2QgPT0gMSkpXG4gICAgICAgIHRocm93IFR5cGVFcnJvcigpXG5cbiAgICAgIHZhciBkID0gbmV3IERlZmVycmVkKClcblxuICAgICAgZC5mbiA9IF9mblxuICAgICAgZC5lciA9IF9lclxuICAgICAgaWYgKHN0YXRlID09IDMpIHtcbiAgICAgICAgZC5yZXNvbHZlKHZhbClcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKHN0YXRlID09IDQpIHtcbiAgICAgICAgZC5yZWplY3QodmFsKVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIG5leHQucHVzaChkKVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gZFxuICAgIH1cblxuICAgIHNlbGZbJ2NhdGNoJ10gPSBmdW5jdGlvbiAoX2VyKSB7XG4gICAgICByZXR1cm4gc2VsZlsndGhlbiddKG51bGwsIF9lcilcbiAgICB9XG5cbiAgICB2YXIgZmluaXNoID0gZnVuY3Rpb24gKHR5cGUpIHtcbiAgICAgIHN0YXRlID0gdHlwZSB8fCA0XG4gICAgICBuZXh0Lm1hcChmdW5jdGlvbiAocCkge1xuICAgICAgICBzdGF0ZSA9PSAzICYmIHAucmVzb2x2ZSh2YWwpIHx8IHAucmVqZWN0KHZhbClcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIGlmICh0eXBlb2YgcmVzb2x2ZXIgPT0gJ2Z1bmN0aW9uJylcbiAgICAgICAgcmVzb2x2ZXIoc2VsZlsncmVzb2x2ZSddLCBzZWxmWydyZWplY3QnXSlcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBzZWxmWydyZWplY3QnXShlKVxuICAgIH1cblxuICAgIHJldHVybiBzZWxmXG5cbiAgICAvLyByZWYgOiByZWZlcmVuY2UgdG8gJ3RoZW4nIGZ1bmN0aW9uXG4gICAgLy8gY2IsIGVjLCBjbiA6IHN1Y2Nlc3NDYWxsYmFjaywgZmFpbHVyZUNhbGxiYWNrLCBub3RUaGVubmFibGVDYWxsYmFja1xuICAgIGZ1bmN0aW9uIHRoZW5uYWJsZSAocmVmLCBjYiwgZWMsIGNuKSB7XG4gICAgICAvLyBQcm9taXNlcyBjYW4gYmUgcmVqZWN0ZWQgd2l0aCBvdGhlciBwcm9taXNlcywgd2hpY2ggc2hvdWxkIHBhc3MgdGhyb3VnaFxuICAgICAgaWYgKHN0YXRlID09IDIpIHtcbiAgICAgICAgcmV0dXJuIGNuKClcbiAgICAgIH1cbiAgICAgIGlmICgodHlwZW9mIHZhbCA9PSAnb2JqZWN0JyB8fCB0eXBlb2YgdmFsID09ICdmdW5jdGlvbicpICYmIHR5cGVvZiByZWYgPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0cnkge1xuXG4gICAgICAgICAgLy8gY250IHByb3RlY3RzIGFnYWluc3QgYWJ1c2UgY2FsbHMgZnJvbSBzcGVjIGNoZWNrZXJcbiAgICAgICAgICB2YXIgY250ID0gMFxuICAgICAgICAgIHJlZi5jYWxsKHZhbCwgZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgICAgIGlmIChjbnQrKykgcmV0dXJuXG4gICAgICAgICAgICB2YWwgPSB2XG4gICAgICAgICAgICBjYigpXG4gICAgICAgICAgfSwgZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgICAgIGlmIChjbnQrKykgcmV0dXJuXG4gICAgICAgICAgICB2YWwgPSB2XG4gICAgICAgICAgICBlYygpXG4gICAgICAgICAgfSlcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIHZhbCA9IGVcbiAgICAgICAgICBlYygpXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNuKClcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gZmlyZSgpIHtcblxuICAgICAgLy8gY2hlY2sgaWYgaXQncyBhIHRoZW5hYmxlXG4gICAgICB2YXIgcmVmO1xuICAgICAgdHJ5IHtcbiAgICAgICAgcmVmID0gdmFsICYmIHZhbC50aGVuXG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHZhbCA9IGVcbiAgICAgICAgc3RhdGUgPSAyXG4gICAgICAgIHJldHVybiBmaXJlKClcbiAgICAgIH1cblxuICAgICAgdGhlbm5hYmxlKHJlZiwgZnVuY3Rpb24gKCkge1xuICAgICAgICBzdGF0ZSA9IDFcbiAgICAgICAgZmlyZSgpXG4gICAgICB9LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHN0YXRlID0gMlxuICAgICAgICBmaXJlKClcbiAgICAgIH0sIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBpZiAoc3RhdGUgPT0gMSAmJiB0eXBlb2YgZm4gPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgdmFsID0gZm4odmFsKVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGVsc2UgaWYgKHN0YXRlID09IDIgJiYgdHlwZW9mIGVyID09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHZhbCA9IGVyKHZhbClcbiAgICAgICAgICAgIHN0YXRlID0gMVxuICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIHZhbCA9IGVcbiAgICAgICAgICByZXR1cm4gZmluaXNoKClcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh2YWwgPT0gc2VsZikge1xuICAgICAgICAgIHZhbCA9IFR5cGVFcnJvcigpXG4gICAgICAgICAgZmluaXNoKClcbiAgICAgICAgfSBlbHNlIHRoZW5uYWJsZShyZWYsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGZpbmlzaCgzKVxuICAgICAgICAgIH0sIGZpbmlzaCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgZmluaXNoKHN0YXRlID09IDEgJiYgMylcbiAgICAgICAgICB9KVxuXG4gICAgICB9KVxuICAgIH1cblxuXG4gIH1cblxuICAvLyBFeHBvcnQgb3VyIGxpYnJhcnkgb2JqZWN0LCBlaXRoZXIgZm9yIG5vZGUuanMgb3IgYXMgYSBnbG9iYWxseSBzY29wZWQgdmFyaWFibGVcbiAgaWYgKHR5cGVvZiBtb2R1bGUgIT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBtb2R1bGVbJ2V4cG9ydHMnXSA9IERlZmVycmVkXG4gIH0gZWxzZSB7XG4gICAgZ2xvYmFsWydQcm9taXNlJ10gPSBnbG9iYWxbJ1Byb21pc2UnXSB8fCBEZWZlcnJlZFxuICB9XG59KSgpXG4iLCIoZnVuY3Rpb24gKGdsb2JhbCwgdW5kZWZpbmVkKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBpZiAoZ2xvYmFsLnNldEltbWVkaWF0ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIG5leHRIYW5kbGUgPSAxOyAvLyBTcGVjIHNheXMgZ3JlYXRlciB0aGFuIHplcm9cbiAgICB2YXIgdGFza3NCeUhhbmRsZSA9IHt9O1xuICAgIHZhciBjdXJyZW50bHlSdW5uaW5nQVRhc2sgPSBmYWxzZTtcbiAgICB2YXIgZG9jID0gZ2xvYmFsLmRvY3VtZW50O1xuICAgIHZhciByZWdpc3RlckltbWVkaWF0ZTtcblxuICAgIGZ1bmN0aW9uIHNldEltbWVkaWF0ZShjYWxsYmFjaykge1xuICAgICAgLy8gQ2FsbGJhY2sgY2FuIGVpdGhlciBiZSBhIGZ1bmN0aW9uIG9yIGEgc3RyaW5nXG4gICAgICBpZiAodHlwZW9mIGNhbGxiYWNrICE9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgY2FsbGJhY2sgPSBuZXcgRnVuY3Rpb24oXCJcIiArIGNhbGxiYWNrKTtcbiAgICAgIH1cbiAgICAgIC8vIENvcHkgZnVuY3Rpb24gYXJndW1lbnRzXG4gICAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBhcmdzW2ldID0gYXJndW1lbnRzW2kgKyAxXTtcbiAgICAgIH1cbiAgICAgIC8vIFN0b3JlIGFuZCByZWdpc3RlciB0aGUgdGFza1xuICAgICAgdmFyIHRhc2sgPSB7IGNhbGxiYWNrOiBjYWxsYmFjaywgYXJnczogYXJncyB9O1xuICAgICAgdGFza3NCeUhhbmRsZVtuZXh0SGFuZGxlXSA9IHRhc2s7XG4gICAgICByZWdpc3RlckltbWVkaWF0ZShuZXh0SGFuZGxlKTtcbiAgICAgIHJldHVybiBuZXh0SGFuZGxlKys7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2xlYXJJbW1lZGlhdGUoaGFuZGxlKSB7XG4gICAgICAgIGRlbGV0ZSB0YXNrc0J5SGFuZGxlW2hhbmRsZV07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcnVuKHRhc2spIHtcbiAgICAgICAgdmFyIGNhbGxiYWNrID0gdGFzay5jYWxsYmFjaztcbiAgICAgICAgdmFyIGFyZ3MgPSB0YXNrLmFyZ3M7XG4gICAgICAgIHN3aXRjaCAoYXJncy5sZW5ndGgpIHtcbiAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICBjYWxsYmFjayhhcmdzWzBdKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICBjYWxsYmFjayhhcmdzWzBdLCBhcmdzWzFdKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICBjYWxsYmFjayhhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgY2FsbGJhY2suYXBwbHkodW5kZWZpbmVkLCBhcmdzKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcnVuSWZQcmVzZW50KGhhbmRsZSkge1xuICAgICAgICAvLyBGcm9tIHRoZSBzcGVjOiBcIldhaXQgdW50aWwgYW55IGludm9jYXRpb25zIG9mIHRoaXMgYWxnb3JpdGhtIHN0YXJ0ZWQgYmVmb3JlIHRoaXMgb25lIGhhdmUgY29tcGxldGVkLlwiXG4gICAgICAgIC8vIFNvIGlmIHdlJ3JlIGN1cnJlbnRseSBydW5uaW5nIGEgdGFzaywgd2UnbGwgbmVlZCB0byBkZWxheSB0aGlzIGludm9jYXRpb24uXG4gICAgICAgIGlmIChjdXJyZW50bHlSdW5uaW5nQVRhc2spIHtcbiAgICAgICAgICAgIC8vIERlbGF5IGJ5IGRvaW5nIGEgc2V0VGltZW91dC4gc2V0SW1tZWRpYXRlIHdhcyB0cmllZCBpbnN0ZWFkLCBidXQgaW4gRmlyZWZveCA3IGl0IGdlbmVyYXRlZCBhXG4gICAgICAgICAgICAvLyBcInRvbyBtdWNoIHJlY3Vyc2lvblwiIGVycm9yLlxuICAgICAgICAgICAgc2V0VGltZW91dChydW5JZlByZXNlbnQsIDAsIGhhbmRsZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YXIgdGFzayA9IHRhc2tzQnlIYW5kbGVbaGFuZGxlXTtcbiAgICAgICAgICAgIGlmICh0YXNrKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudGx5UnVubmluZ0FUYXNrID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBydW4odGFzayk7XG4gICAgICAgICAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJJbW1lZGlhdGUoaGFuZGxlKTtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudGx5UnVubmluZ0FUYXNrID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5zdGFsbE5leHRUaWNrSW1wbGVtZW50YXRpb24oKSB7XG4gICAgICAgIHJlZ2lzdGVySW1tZWRpYXRlID0gZnVuY3Rpb24oaGFuZGxlKSB7XG4gICAgICAgICAgICBwcm9jZXNzLm5leHRUaWNrKGZ1bmN0aW9uICgpIHsgcnVuSWZQcmVzZW50KGhhbmRsZSk7IH0pO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNhblVzZVBvc3RNZXNzYWdlKCkge1xuICAgICAgICAvLyBUaGUgdGVzdCBhZ2FpbnN0IGBpbXBvcnRTY3JpcHRzYCBwcmV2ZW50cyB0aGlzIGltcGxlbWVudGF0aW9uIGZyb20gYmVpbmcgaW5zdGFsbGVkIGluc2lkZSBhIHdlYiB3b3JrZXIsXG4gICAgICAgIC8vIHdoZXJlIGBnbG9iYWwucG9zdE1lc3NhZ2VgIG1lYW5zIHNvbWV0aGluZyBjb21wbGV0ZWx5IGRpZmZlcmVudCBhbmQgY2FuJ3QgYmUgdXNlZCBmb3IgdGhpcyBwdXJwb3NlLlxuICAgICAgICBpZiAoZ2xvYmFsLnBvc3RNZXNzYWdlICYmICFnbG9iYWwuaW1wb3J0U2NyaXB0cykge1xuICAgICAgICAgICAgdmFyIHBvc3RNZXNzYWdlSXNBc3luY2hyb25vdXMgPSB0cnVlO1xuICAgICAgICAgICAgdmFyIG9sZE9uTWVzc2FnZSA9IGdsb2JhbC5vbm1lc3NhZ2U7XG4gICAgICAgICAgICBnbG9iYWwub25tZXNzYWdlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcG9zdE1lc3NhZ2VJc0FzeW5jaHJvbm91cyA9IGZhbHNlO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGdsb2JhbC5wb3N0TWVzc2FnZShcIlwiLCBcIipcIik7XG4gICAgICAgICAgICBnbG9iYWwub25tZXNzYWdlID0gb2xkT25NZXNzYWdlO1xuICAgICAgICAgICAgcmV0dXJuIHBvc3RNZXNzYWdlSXNBc3luY2hyb25vdXM7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbnN0YWxsUG9zdE1lc3NhZ2VJbXBsZW1lbnRhdGlvbigpIHtcbiAgICAgICAgLy8gSW5zdGFsbHMgYW4gZXZlbnQgaGFuZGxlciBvbiBgZ2xvYmFsYCBmb3IgdGhlIGBtZXNzYWdlYCBldmVudDogc2VlXG4gICAgICAgIC8vICogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4vRE9NL3dpbmRvdy5wb3N0TWVzc2FnZVxuICAgICAgICAvLyAqIGh0dHA6Ly93d3cud2hhdHdnLm9yZy9zcGVjcy93ZWItYXBwcy9jdXJyZW50LXdvcmsvbXVsdGlwYWdlL2NvbW1zLmh0bWwjY3Jvc3NEb2N1bWVudE1lc3NhZ2VzXG5cbiAgICAgICAgdmFyIG1lc3NhZ2VQcmVmaXggPSBcInNldEltbWVkaWF0ZSRcIiArIE1hdGgucmFuZG9tKCkgKyBcIiRcIjtcbiAgICAgICAgdmFyIG9uR2xvYmFsTWVzc2FnZSA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICBpZiAoZXZlbnQuc291cmNlID09PSBnbG9iYWwgJiZcbiAgICAgICAgICAgICAgICB0eXBlb2YgZXZlbnQuZGF0YSA9PT0gXCJzdHJpbmdcIiAmJlxuICAgICAgICAgICAgICAgIGV2ZW50LmRhdGEuaW5kZXhPZihtZXNzYWdlUHJlZml4KSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHJ1bklmUHJlc2VudCgrZXZlbnQuZGF0YS5zbGljZShtZXNzYWdlUHJlZml4Lmxlbmd0aCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChnbG9iYWwuYWRkRXZlbnRMaXN0ZW5lcikge1xuICAgICAgICAgICAgZ2xvYmFsLmFkZEV2ZW50TGlzdGVuZXIoXCJtZXNzYWdlXCIsIG9uR2xvYmFsTWVzc2FnZSwgZmFsc2UpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZ2xvYmFsLmF0dGFjaEV2ZW50KFwib25tZXNzYWdlXCIsIG9uR2xvYmFsTWVzc2FnZSk7XG4gICAgICAgIH1cblxuICAgICAgICByZWdpc3RlckltbWVkaWF0ZSA9IGZ1bmN0aW9uKGhhbmRsZSkge1xuICAgICAgICAgICAgZ2xvYmFsLnBvc3RNZXNzYWdlKG1lc3NhZ2VQcmVmaXggKyBoYW5kbGUsIFwiKlwiKTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbnN0YWxsTWVzc2FnZUNoYW5uZWxJbXBsZW1lbnRhdGlvbigpIHtcbiAgICAgICAgdmFyIGNoYW5uZWwgPSBuZXcgTWVzc2FnZUNoYW5uZWwoKTtcbiAgICAgICAgY2hhbm5lbC5wb3J0MS5vbm1lc3NhZ2UgPSBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgdmFyIGhhbmRsZSA9IGV2ZW50LmRhdGE7XG4gICAgICAgICAgICBydW5JZlByZXNlbnQoaGFuZGxlKTtcbiAgICAgICAgfTtcblxuICAgICAgICByZWdpc3RlckltbWVkaWF0ZSA9IGZ1bmN0aW9uKGhhbmRsZSkge1xuICAgICAgICAgICAgY2hhbm5lbC5wb3J0Mi5wb3N0TWVzc2FnZShoYW5kbGUpO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluc3RhbGxSZWFkeVN0YXRlQ2hhbmdlSW1wbGVtZW50YXRpb24oKSB7XG4gICAgICAgIHZhciBodG1sID0gZG9jLmRvY3VtZW50RWxlbWVudDtcbiAgICAgICAgcmVnaXN0ZXJJbW1lZGlhdGUgPSBmdW5jdGlvbihoYW5kbGUpIHtcbiAgICAgICAgICAgIC8vIENyZWF0ZSBhIDxzY3JpcHQ+IGVsZW1lbnQ7IGl0cyByZWFkeXN0YXRlY2hhbmdlIGV2ZW50IHdpbGwgYmUgZmlyZWQgYXN5bmNocm9ub3VzbHkgb25jZSBpdCBpcyBpbnNlcnRlZFxuICAgICAgICAgICAgLy8gaW50byB0aGUgZG9jdW1lbnQuIERvIHNvLCB0aHVzIHF1ZXVpbmcgdXAgdGhlIHRhc2suIFJlbWVtYmVyIHRvIGNsZWFuIHVwIG9uY2UgaXQncyBiZWVuIGNhbGxlZC5cbiAgICAgICAgICAgIHZhciBzY3JpcHQgPSBkb2MuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTtcbiAgICAgICAgICAgIHNjcmlwdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcnVuSWZQcmVzZW50KGhhbmRsZSk7XG4gICAgICAgICAgICAgICAgc2NyaXB0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgaHRtbC5yZW1vdmVDaGlsZChzY3JpcHQpO1xuICAgICAgICAgICAgICAgIHNjcmlwdCA9IG51bGw7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgaHRtbC5hcHBlbmRDaGlsZChzY3JpcHQpO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluc3RhbGxTZXRUaW1lb3V0SW1wbGVtZW50YXRpb24oKSB7XG4gICAgICAgIHJlZ2lzdGVySW1tZWRpYXRlID0gZnVuY3Rpb24oaGFuZGxlKSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KHJ1bklmUHJlc2VudCwgMCwgaGFuZGxlKTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvLyBJZiBzdXBwb3J0ZWQsIHdlIHNob3VsZCBhdHRhY2ggdG8gdGhlIHByb3RvdHlwZSBvZiBnbG9iYWwsIHNpbmNlIHRoYXQgaXMgd2hlcmUgc2V0VGltZW91dCBldCBhbC4gbGl2ZS5cbiAgICB2YXIgYXR0YWNoVG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YgJiYgT2JqZWN0LmdldFByb3RvdHlwZU9mKGdsb2JhbCk7XG4gICAgYXR0YWNoVG8gPSBhdHRhY2hUbyAmJiBhdHRhY2hUby5zZXRUaW1lb3V0ID8gYXR0YWNoVG8gOiBnbG9iYWw7XG5cbiAgICAvLyBEb24ndCBnZXQgZm9vbGVkIGJ5IGUuZy4gYnJvd3NlcmlmeSBlbnZpcm9ubWVudHMuXG4gICAgaWYgKHt9LnRvU3RyaW5nLmNhbGwoZ2xvYmFsLnByb2Nlc3MpID09PSBcIltvYmplY3QgcHJvY2Vzc11cIikge1xuICAgICAgICAvLyBGb3IgTm9kZS5qcyBiZWZvcmUgMC45XG4gICAgICAgIGluc3RhbGxOZXh0VGlja0ltcGxlbWVudGF0aW9uKCk7XG5cbiAgICB9IGVsc2UgaWYgKGNhblVzZVBvc3RNZXNzYWdlKCkpIHtcbiAgICAgICAgLy8gRm9yIG5vbi1JRTEwIG1vZGVybiBicm93c2Vyc1xuICAgICAgICBpbnN0YWxsUG9zdE1lc3NhZ2VJbXBsZW1lbnRhdGlvbigpO1xuXG4gICAgfSBlbHNlIGlmIChnbG9iYWwuTWVzc2FnZUNoYW5uZWwpIHtcbiAgICAgICAgLy8gRm9yIHdlYiB3b3JrZXJzLCB3aGVyZSBzdXBwb3J0ZWRcbiAgICAgICAgaW5zdGFsbE1lc3NhZ2VDaGFubmVsSW1wbGVtZW50YXRpb24oKTtcblxuICAgIH0gZWxzZSBpZiAoZG9jICYmIFwib25yZWFkeXN0YXRlY2hhbmdlXCIgaW4gZG9jLmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIikpIHtcbiAgICAgICAgLy8gRm9yIElFIDbigJM4XG4gICAgICAgIGluc3RhbGxSZWFkeVN0YXRlQ2hhbmdlSW1wbGVtZW50YXRpb24oKTtcblxuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIEZvciBvbGRlciBicm93c2Vyc1xuICAgICAgICBpbnN0YWxsU2V0VGltZW91dEltcGxlbWVudGF0aW9uKCk7XG4gICAgfVxuXG4gICAgYXR0YWNoVG8uc2V0SW1tZWRpYXRlID0gc2V0SW1tZWRpYXRlO1xuICAgIGF0dGFjaFRvLmNsZWFySW1tZWRpYXRlID0gY2xlYXJJbW1lZGlhdGU7XG59KHR5cGVvZiBzZWxmID09PSBcInVuZGVmaW5lZFwiID8gdHlwZW9mIGdsb2JhbCA9PT0gXCJ1bmRlZmluZWRcIiA/IHRoaXMgOiBnbG9iYWwgOiBzZWxmKSk7XG4iLCJ2YXIgc2NvcGUgPSAodHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBnbG9iYWwpIHx8XG4gICAgICAgICAgICAodHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgJiYgc2VsZikgfHxcbiAgICAgICAgICAgIHdpbmRvdztcbnZhciBhcHBseSA9IEZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseTtcblxuLy8gRE9NIEFQSXMsIGZvciBjb21wbGV0ZW5lc3NcblxuZXhwb3J0cy5zZXRUaW1lb3V0ID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBuZXcgVGltZW91dChhcHBseS5jYWxsKHNldFRpbWVvdXQsIHNjb3BlLCBhcmd1bWVudHMpLCBjbGVhclRpbWVvdXQpO1xufTtcbmV4cG9ydHMuc2V0SW50ZXJ2YWwgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIG5ldyBUaW1lb3V0KGFwcGx5LmNhbGwoc2V0SW50ZXJ2YWwsIHNjb3BlLCBhcmd1bWVudHMpLCBjbGVhckludGVydmFsKTtcbn07XG5leHBvcnRzLmNsZWFyVGltZW91dCA9XG5leHBvcnRzLmNsZWFySW50ZXJ2YWwgPSBmdW5jdGlvbih0aW1lb3V0KSB7XG4gIGlmICh0aW1lb3V0KSB7XG4gICAgdGltZW91dC5jbG9zZSgpO1xuICB9XG59O1xuXG5mdW5jdGlvbiBUaW1lb3V0KGlkLCBjbGVhckZuKSB7XG4gIHRoaXMuX2lkID0gaWQ7XG4gIHRoaXMuX2NsZWFyRm4gPSBjbGVhckZuO1xufVxuVGltZW91dC5wcm90b3R5cGUudW5yZWYgPSBUaW1lb3V0LnByb3RvdHlwZS5yZWYgPSBmdW5jdGlvbigpIHt9O1xuVGltZW91dC5wcm90b3R5cGUuY2xvc2UgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5fY2xlYXJGbi5jYWxsKHNjb3BlLCB0aGlzLl9pZCk7XG59O1xuXG4vLyBEb2VzIG5vdCBzdGFydCB0aGUgdGltZSwganVzdCBzZXRzIHVwIHRoZSBtZW1iZXJzIG5lZWRlZC5cbmV4cG9ydHMuZW5yb2xsID0gZnVuY3Rpb24oaXRlbSwgbXNlY3MpIHtcbiAgY2xlYXJUaW1lb3V0KGl0ZW0uX2lkbGVUaW1lb3V0SWQpO1xuICBpdGVtLl9pZGxlVGltZW91dCA9IG1zZWNzO1xufTtcblxuZXhwb3J0cy51bmVucm9sbCA9IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgY2xlYXJUaW1lb3V0KGl0ZW0uX2lkbGVUaW1lb3V0SWQpO1xuICBpdGVtLl9pZGxlVGltZW91dCA9IC0xO1xufTtcblxuZXhwb3J0cy5fdW5yZWZBY3RpdmUgPSBleHBvcnRzLmFjdGl2ZSA9IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgY2xlYXJUaW1lb3V0KGl0ZW0uX2lkbGVUaW1lb3V0SWQpO1xuXG4gIHZhciBtc2VjcyA9IGl0ZW0uX2lkbGVUaW1lb3V0O1xuICBpZiAobXNlY3MgPj0gMCkge1xuICAgIGl0ZW0uX2lkbGVUaW1lb3V0SWQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uIG9uVGltZW91dCgpIHtcbiAgICAgIGlmIChpdGVtLl9vblRpbWVvdXQpXG4gICAgICAgIGl0ZW0uX29uVGltZW91dCgpO1xuICAgIH0sIG1zZWNzKTtcbiAgfVxufTtcblxuLy8gc2V0aW1tZWRpYXRlIGF0dGFjaGVzIGl0c2VsZiB0byB0aGUgZ2xvYmFsIG9iamVjdFxucmVxdWlyZShcInNldGltbWVkaWF0ZVwiKTtcbi8vIE9uIHNvbWUgZXhvdGljIGVudmlyb25tZW50cywgaXQncyBub3QgY2xlYXIgd2hpY2ggb2JqZWN0IGBzZXRpbW1lZGlhdGVgIHdhc1xuLy8gYWJsZSB0byBpbnN0YWxsIG9udG8uICBTZWFyY2ggZWFjaCBwb3NzaWJpbGl0eSBpbiB0aGUgc2FtZSBvcmRlciBhcyB0aGVcbi8vIGBzZXRpbW1lZGlhdGVgIGxpYnJhcnkuXG5leHBvcnRzLnNldEltbWVkaWF0ZSA9ICh0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiAmJiBzZWxmLnNldEltbWVkaWF0ZSkgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgKHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgJiYgZ2xvYmFsLnNldEltbWVkaWF0ZSkgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgKHRoaXMgJiYgdGhpcy5zZXRJbW1lZGlhdGUpO1xuZXhwb3J0cy5jbGVhckltbWVkaWF0ZSA9ICh0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiAmJiBzZWxmLmNsZWFySW1tZWRpYXRlKSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICh0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiICYmIGdsb2JhbC5jbGVhckltbWVkaWF0ZSkgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAodGhpcyAmJiB0aGlzLmNsZWFySW1tZWRpYXRlKTtcbiIsInZhciBnO1xuXG4vLyBUaGlzIHdvcmtzIGluIG5vbi1zdHJpY3QgbW9kZVxuZyA9IChmdW5jdGlvbigpIHtcblx0cmV0dXJuIHRoaXM7XG59KSgpO1xuXG50cnkge1xuXHQvLyBUaGlzIHdvcmtzIGlmIGV2YWwgaXMgYWxsb3dlZCAoc2VlIENTUClcblx0ZyA9IGcgfHwgbmV3IEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKTtcbn0gY2F0Y2ggKGUpIHtcblx0Ly8gVGhpcyB3b3JrcyBpZiB0aGUgd2luZG93IHJlZmVyZW5jZSBpcyBhdmFpbGFibGVcblx0aWYgKHR5cGVvZiB3aW5kb3cgPT09IFwib2JqZWN0XCIpIGcgPSB3aW5kb3c7XG59XG5cbi8vIGcgY2FuIHN0aWxsIGJlIHVuZGVmaW5lZCwgYnV0IG5vdGhpbmcgdG8gZG8gYWJvdXQgaXQuLi5cbi8vIFdlIHJldHVybiB1bmRlZmluZWQsIGluc3RlYWQgb2Ygbm90aGluZyBoZXJlLCBzbyBpdCdzXG4vLyBlYXNpZXIgdG8gaGFuZGxlIHRoaXMgY2FzZS4gaWYoIWdsb2JhbCkgeyAuLi59XG5cbm1vZHVsZS5leHBvcnRzID0gZztcbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpbiIsImludGVyZmFjZSBJU3RvcmFnZUl0ZW0ge1xyXG5cdGhhbmRsZXI6IChlOiBFdmVudCkgPT4gYW55O1xyXG5cdHNjb3BlOiBhbnk7XHJcbn1cclxuaW50ZXJmYWNlIElLZXlTdG9yYWdlIHtcclxuXHRba2V5OiBzdHJpbmddOiBJU3RvcmFnZUl0ZW1bXTtcclxufVxyXG5cclxuaW50ZXJmYWNlIElLZXlNYW5hZ2VyIHtcclxuXHRhZGRIb3RLZXkoa2V5OiBzdHJpbmcsIGhhbmRsZXIsIHNjb3BlPzogYW55KTogdm9pZDtcclxuXHRyZW1vdmVIb3RLZXkoa2V5Pzogc3RyaW5nLCBzY29wZT86IGFueSk6IHZvaWQ7XHJcblx0ZXhpc3Qoa2V5OiBzdHJpbmcpOiBib29sZWFuO1xyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gZ2V0SG90S2V5Q29kZShjb2RlOiBzdHJpbmcpOiBzdHJpbmcge1xyXG5cdGNvbnN0IG1hdGNoZXMgPSBjb2RlLnRvTG93ZXJDYXNlKCkubWF0Y2goL1xcdysvZyk7XHJcblx0bGV0IGNvbXAgPSAwO1xyXG5cdGxldCBrZXkgPSBcIlwiO1xyXG5cdGZvciAobGV0IGkgPSAwO2kgPCBtYXRjaGVzLmxlbmd0aDtpKyspIHtcclxuXHRcdGNvbnN0IGNoZWNrID0gbWF0Y2hlc1tpXTtcclxuXHRcdGlmIChjaGVjayA9PT0gXCJjdHJsXCIpIHtcclxuXHRcdFx0Y29tcCArPSA0O1xyXG5cdFx0fSBlbHNlIGlmIChjaGVjayA9PT0gXCJzaGlmdFwiKSB7XHJcblx0XHRcdGNvbXAgKz0gMjtcclxuXHRcdH0gZWxzZSBpZiAoY2hlY2sgPT09IFwiYWx0XCIpIHtcclxuXHRcdFx0Y29tcCArPSAxO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0a2V5ID0gY2hlY2s7XHJcblx0XHR9XHJcblx0fVxyXG5cdHJldHVybiBjb21wICsga2V5O1xyXG59XHJcblxyXG5jbGFzcyBLZXlNYW5hZ2VyIGltcGxlbWVudHMgSUtleU1hbmFnZXIge1xyXG5cdHByaXZhdGUgX2tleXNTdG9yYWdlOiBJS2V5U3RvcmFnZSA9IHt9O1xyXG5cclxuXHRjb25zdHJ1Y3RvcigpIHtcclxuXHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIChlOiBLZXlib2FyZEV2ZW50KSA9PiB7XHJcblx0XHRcdGNvbnN0IGNvbXAgPSAoZS5jdHJsS2V5IHx8IGUubWV0YUtleSA/IDQgOiAwKSArIChlLnNoaWZ0S2V5ID8gMiA6IDApICsgKGUuYWx0S2V5ID8gMSA6IDApO1xyXG5cdFx0XHRsZXQga2V5O1xyXG5cdFx0XHRpZiAoKGUud2hpY2ggPj0gNDggJiYgZS53aGljaCA8PSA1NykgfHwgKGUud2hpY2ggPj0gNjUgJiYgZS53aGljaCA8PSA5MCkpIHsgLy8gQS1aIDAtOVxyXG5cdFx0XHRcdGtleSA9IFN0cmluZy5mcm9tQ2hhckNvZGUoZS53aGljaCk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0a2V5ID0gZS5rZXk7XHJcblx0XHRcdH1cclxuXHRcdFx0Y29uc3QgY29kZSA9IGNvbXAgKyAoa2V5ICYmIGtleS50b0xvd2VyQ2FzZSgpKTtcclxuXHRcdFx0Y29uc3QgYWN0aW9ucyA9IHRoaXMuX2tleXNTdG9yYWdlW2NvZGVdO1xyXG5cdFx0XHRpZiAoYWN0aW9ucykge1xyXG5cdFx0XHRcdGZvciAobGV0IGkgPSAwO2kgPCBhY3Rpb25zLmxlbmd0aDtpKyspIHtcclxuXHRcdFx0XHRcdGFjdGlvbnNbaV0uaGFuZGxlcihlKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH1cclxuXHRhZGRIb3RLZXkoa2V5OiBzdHJpbmcsIGhhbmRsZXIsIHNjb3BlPzogYW55KTogdm9pZCB7XHJcblx0XHRjb25zdCBjb2RlID0gZ2V0SG90S2V5Q29kZShrZXkpO1xyXG5cdFx0aWYgKCF0aGlzLl9rZXlzU3RvcmFnZVtjb2RlXSkge1xyXG5cdFx0XHR0aGlzLl9rZXlzU3RvcmFnZVtjb2RlXSA9IFtdO1xyXG5cdFx0fVxyXG5cdFx0dGhpcy5fa2V5c1N0b3JhZ2VbY29kZV0ucHVzaCh7XHJcblx0XHRcdGhhbmRsZXIsXHJcblx0XHRcdHNjb3BlXHJcblx0XHR9KTtcclxuXHR9XHJcblx0cmVtb3ZlSG90S2V5KGtleT86IHN0cmluZywgc2NvcGU/OiBhbnkpOiB2b2lkIHtcclxuXHRcdGNvbnN0IGtleVN0b3JhZ2UgPSB0aGlzLl9rZXlzU3RvcmFnZTtcclxuXHRcdGlmIChrZXkpIHtcclxuXHRcdFx0Y29uc3QgY29kZSA9IGdldEhvdEtleUNvZGUoa2V5KTtcclxuXHRcdFx0ZGVsZXRlIGtleVN0b3JhZ2VbY29kZV07XHJcblx0XHR9XHJcblx0XHRpZiAoc2NvcGUpIHtcclxuXHRcdFx0Zm9yIChjb25zdCBjb2RlIGluIGtleVN0b3JhZ2UpIHtcclxuXHRcdFx0XHRjb25zdCB0b0RlbGV0ZSA9IFtdOyAvLyBpdGVtcyBpbmRleCB0byBkZWxldGVcclxuXHRcdFx0XHRmb3IgKGxldCBpID0gMDtpIDwga2V5U3RvcmFnZVtjb2RlXS5sZW5ndGg7aSsrKSB7XHJcblx0XHRcdFx0XHRpZiAoa2V5U3RvcmFnZVtjb2RlXVtpXS5zY29wZSA9PT0gc2NvcGUpIHtcclxuXHRcdFx0XHRcdFx0dG9EZWxldGUucHVzaChpKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0aWYgKGtleVN0b3JhZ2VbY29kZV0ubGVuZ3RoID09PSB0b0RlbGV0ZS5sZW5ndGgpIHtcclxuXHRcdFx0XHRcdGRlbGV0ZSBrZXlTdG9yYWdlW2NvZGVdO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRmb3IgKGxldCBpID0gdG9EZWxldGUubGVuZ3RoIC0gMTtpID49IDA7aS0tKSB7IC8vIGJlZ2luIGZyb20gbGFzdCBjb3ogc3BsaWNlIGNoYW5nZSBvdGhlciBpbmRleFxyXG5cdFx0XHRcdFx0XHRrZXlTdG9yYWdlW2NvZGVdLnNwbGljZSh0b0RlbGV0ZVtpXSwgMSk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cdGV4aXN0KGtleTogc3RyaW5nKTogYm9vbGVhbiB7XHJcblx0XHRjb25zdCBjb2RlID0gZ2V0SG90S2V5Q29kZShrZXkpO1xyXG5cdFx0cmV0dXJuICEhdGhpcy5fa2V5c1N0b3JhZ2VbY29kZV07XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgY29uc3Qga2V5TWFuYWdlciA9IG5ldyBLZXlNYW5hZ2VyKCk7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYWRkSG90a2V5cyhoYW5kbGVycywgYmVmb3JlQ2FsbD86ICgpID0+IGJvb2xlYW4pIHtcclxuXHRjb25zdCBjb250ZXh0ID0gbmV3IERhdGUoKTtcclxuXHJcblx0Y29uc3Qgd3JhcEhhbmRsZXIgPSBoYW5kbGVyID0+IGUgPT4ge1xyXG5cdFx0aWYgKGJlZm9yZUNhbGwgJiYgYmVmb3JlQ2FsbCgpID09PSBmYWxzZSkge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblx0XHRoYW5kbGVyKGUpO1xyXG5cdH07XHJcblxyXG5cdGZvciAoY29uc3Qga2V5IGluIGhhbmRsZXJzKSB7XHJcblx0XHRrZXlNYW5hZ2VyLmFkZEhvdEtleShcclxuXHRcdFx0a2V5LFxyXG5cdFx0XHR3cmFwSGFuZGxlcihoYW5kbGVyc1trZXldKSxcclxuXHRcdFx0Y29udGV4dFxyXG5cdFx0KTtcclxuXHR9XHJcblxyXG5cdHJldHVybiAoKSA9PiBrZXlNYW5hZ2VyLnJlbW92ZUhvdEtleSh1bmRlZmluZWQsIGNvbnRleHQpO1xyXG59IiwiaW1wb3J0IHsgbG9jYXRlIH0gZnJvbSBcIi4vaHRtbFwiO1xyXG5cclxubGV0IGNvdW50ZXIgPSAobmV3IERhdGUoKSkudmFsdWVPZigpO1xyXG5leHBvcnQgZnVuY3Rpb24gdWlkKCk6IHN0cmluZyB7XHJcblx0cmV0dXJuIFwidVwiICsgKGNvdW50ZXIrKyk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBleHRlbmQodGFyZ2V0LCBzb3VyY2UsIGRlZXAgPSB0cnVlKSB7XHJcblx0aWYgKHNvdXJjZSkge1xyXG5cdFx0Zm9yIChjb25zdCBrZXkgaW4gc291cmNlKSB7XHJcblx0XHRcdGNvbnN0IHNvYmogPSBzb3VyY2Vba2V5XTtcclxuXHRcdFx0Y29uc3QgdG9iaiA9IHRhcmdldFtrZXldO1xyXG5cdFx0XHRpZiAoZGVlcCAmJiB0eXBlb2YgdG9iaiA9PT0gXCJvYmplY3RcIiAmJiAhKHRvYmogaW5zdGFuY2VvZiBEYXRlKSAmJiAhKHRvYmogaW5zdGFuY2VvZiBBcnJheSkpIHtcclxuXHRcdFx0XHRleHRlbmQodG9iaiwgc29iaik7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dGFyZ2V0W2tleV0gPSBzb2JqO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cdHJldHVybiB0YXJnZXQ7XHJcbn1cclxuXHJcbmludGVyZmFjZSBJT0JqIHtcclxuXHRba2V5OiBzdHJpbmddOiBhbnk7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGNvcHkoc291cmNlOiBJT0JqLCB3aXRob3V0SW5uZXI/OiBib29sZWFuKTogSU9CaiB7XHJcblx0Y29uc3QgcmVzdWx0OiBJT0JqID0ge307XHJcblx0Zm9yIChjb25zdCBrZXkgaW4gc291cmNlKSB7XHJcblx0XHRpZiAoIXdpdGhvdXRJbm5lciB8fCBrZXlbMF0gIT09IFwiJFwiKSB7XHJcblx0XHRcdHJlc3VsdFtrZXldID0gc291cmNlW2tleV07XHJcblx0XHR9XHJcblx0fVxyXG5cdHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBuYXR1cmFsU29ydChhcnIpOiBhbnlbXSB7XHJcblx0cmV0dXJuIGFyci5zb3J0KChhOiBhbnksIGI6IGFueSkgPT4ge1xyXG5cdFx0Y29uc3Qgbm4gPSB0eXBlb2YgYSA9PT0gXCJzdHJpbmdcIiA/IGEubG9jYWxlQ29tcGFyZShiKSA6IGEgLSBiO1xyXG5cdFx0cmV0dXJuIG5uO1xyXG5cdH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZmluZEluZGV4PFQgPSBhbnk+KGFycjogVFtdLCBwcmVkaWNhdGU6IChvYmo6IFQpID0+IGJvb2xlYW4pOiBudW1iZXIge1xyXG5cdGNvbnN0IGxlbiA9IGFyci5sZW5ndGg7XHJcblx0Zm9yIChsZXQgaSA9IDA7aSA8IGxlbjtpKyspIHtcclxuXHRcdGlmIChwcmVkaWNhdGUoYXJyW2ldKSkge1xyXG5cdFx0XHRyZXR1cm4gaTtcclxuXHRcdH1cclxuXHR9XHJcblx0cmV0dXJuIC0xO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaXNFcXVhbFN0cmluZyhmcm9tOiBzdHJpbmcsIHRvOiBzdHJpbmcpOiBib29sZWFuIHtcclxuXHRpZiAoZnJvbS5sZW5ndGggPiB0by5sZW5ndGgpIHtcclxuXHRcdHJldHVybiBmYWxzZTtcclxuXHR9XHJcblx0Zm9yIChsZXQgaSA9IDA7aSA8IGZyb20ubGVuZ3RoO2krKykge1xyXG5cdFx0aWYgKGZyb21baV0udG9Mb3dlckNhc2UoKSAhPT0gdG9baV0udG9Mb3dlckNhc2UoKSkge1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblx0fVxyXG5cdHJldHVybiB0cnVlO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc2luZ2xlT3V0ZXJDbGljayhmbjogKGU6IE1vdXNlRXZlbnQpID0+IGJvb2xlYW4pIHtcclxuXHRjb25zdCBjbGljayA9IChlOiBNb3VzZUV2ZW50KSA9PiB7XHJcblx0XHRpZiAoZm4oZSkpIHtcclxuXHRcdFx0ZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGNsaWNrKTtcclxuXHRcdH1cclxuXHR9O1xyXG5cdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBjbGljayk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBkZXRlY3RXaWRnZXRDbGljayh3aWRnZXRJZDogc3RyaW5nLCBjYjogKGlubmVyOiBib29sZWFuKSA9PiB2b2lkKTogKCkgPT4gdm9pZCB7XHJcblx0Y29uc3QgY2xpY2sgPSAoZTogTW91c2VFdmVudCkgPT4gY2IobG9jYXRlKGUsIFwiZGh4X3dpZGdldF9pZFwiKSA9PT0gd2lkZ2V0SWQpO1xyXG5cdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBjbGljayk7XHJcblxyXG5cdHJldHVybiAoKSA9PiBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgY2xpY2spO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdW53cmFwQm94PFQ+KGJveDogVCB8IFRbXSk6IFQge1xyXG5cdGlmIChBcnJheS5pc0FycmF5KGJveCkpIHtcclxuXHRcdHJldHVybiBib3hbMF07XHJcblx0fVxyXG5cdHJldHVybiBib3g7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIHdyYXBCb3g8VD4odW5ib3hlZDogVCB8IFRbXSk6IFRbXSB7XHJcblx0aWYgKEFycmF5LmlzQXJyYXkodW5ib3hlZCkpIHtcclxuXHRcdHJldHVybiB1bmJveGVkO1xyXG5cdH1cclxuXHRyZXR1cm4gW3VuYm94ZWRdO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaXNEZWZpbmVkPFQ+KHNvbWU6IFQpOiBib29sZWFuIHtcclxuXHRyZXR1cm4gc29tZSAhPT0gbnVsbCAmJiBzb21lICE9PSB1bmRlZmluZWQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiByYW5nZShmcm9tOiBudW1iZXIsIHRvOiBudW1iZXIpOiBudW1iZXJbXSB7XHJcblx0aWYgKGZyb20gPiB0bykge1xyXG5cdFx0cmV0dXJuIFtdO1xyXG5cdH1cclxuXHRjb25zdCByZXN1bHQgPSBbXTtcclxuXHR3aGlsZSAoZnJvbSA8PSB0bykge1xyXG5cdFx0cmVzdWx0LnB1c2goZnJvbSsrKTtcclxuXHR9XHJcblx0cmV0dXJuIHJlc3VsdDtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gaXNOdW1lcmljKHZhbDogYW55KTogYm9vbGVhbiB7XHJcblx0cmV0dXJuICFpc05hTih2YWwgLSBwYXJzZUZsb2F0KHZhbCkpO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBkb3dubG9hZEZpbGUoZGF0YTogc3RyaW5nLCBmaWxlbmFtZTogc3RyaW5nLCBtaW1lVHlwZTogc3RyaW5nID0gXCJ0ZXh0L3BsYWluXCIpOiB2b2lkIHtcclxuXHRjb25zdCBmaWxlID0gbmV3IEJsb2IoW2RhdGFdLCB7IHR5cGU6IG1pbWVUeXBlIH0pO1xyXG5cdGlmICh3aW5kb3cubmF2aWdhdG9yLm1zU2F2ZU9yT3BlbkJsb2IpIHtcclxuXHRcdC8vIElFMTArXHJcblx0XHR3aW5kb3cubmF2aWdhdG9yLm1zU2F2ZU9yT3BlbkJsb2IoZmlsZSwgZmlsZW5hbWUpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHRjb25zdCBhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIik7XHJcblx0XHRjb25zdCB1cmwgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGZpbGUpO1xyXG5cclxuXHRcdGEuaHJlZiA9IHVybDtcclxuXHRcdGEuZG93bmxvYWQgPSBmaWxlbmFtZTtcclxuXHRcdGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoYSk7XHJcblx0XHRhLmNsaWNrKCk7XHJcblx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGEpO1xyXG5cdFx0XHR3aW5kb3cuVVJMLnJldm9rZU9iamVjdFVSTCh1cmwpO1xyXG5cdFx0fSwgMCk7XHJcblx0fVxyXG59IiwiaW1wb3J0ICogYXMgZG9tIGZyb20gXCJkb212bS9kaXN0L2Rldi9kb212bS5kZXYuanNcIjtcclxuXHJcbmV4cG9ydCBsZXQgZWwgPSBkb20uZGVmaW5lRWxlbWVudDtcclxuZXhwb3J0IGxldCBzdiA9IGRvbS5kZWZpbmVTdmdFbGVtZW50O1xyXG5leHBvcnQgbGV0IHZpZXcgPSBkb20uZGVmaW5lVmlldztcclxuZXhwb3J0IGxldCBjcmVhdGUgPSBkb20uY3JlYXRlVmlldztcclxuZXhwb3J0IGxldCBpbmplY3QgPSBkb20uaW5qZWN0VmlldztcclxuZXhwb3J0IGxldCBLRVlFRF9MSVNUID0gZG9tLktFWUVEX0xJU1Q7XHJcblxyXG5jb25zdCBzdmdUYWdOYW1lID0gW1wiYVwiLCBcImFuaW1hdGVcIiwgXCJhbmltYXRlTW90aW9uXCIsIFwiYW5pbWF0ZVRyYW5zZm9ybVwiLCBcImNpcmNsZVwiLCBcImNsaXBQYXRoXCIsIFwiY29sb3ItcHJvZmlsZVwiLCBcImRlZnNcIiwgXCJkZXNjXCIsIFwiZGlzY2FyZFwiLCBcImVsbGlwc2VcIiwgXCJmZUJsZW5kXCIsIFwiZmVDb2xvck1hdHJpeFwiLFxyXG5cdFwiZmVDb21wb25lbnRUcmFuc2ZlclwiLCBcImZlQ29tcG9zaXRlXCIsIFwiZmVDb252b2x2ZU1hdHJpeFwiLCBcImZlRGlmZnVzZUxpZ2h0aW5nXCIsIFwiZmVEaXNwbGFjZW1lbnRNYXBcIiwgXCJmZURpc3RhbnRMaWdodFwiLCBcImZlRHJvcFNoYWRvd1wiLCBcImZlRmxvb2RcIiwgXCJmZUZ1bmNBXCIsIFwiZmVGdW5jQlwiLCBcImZlRnVuY0dcIiwgXCJmZUZ1bmNSXCIsXHJcblx0XCJmZUdhdXNzaWFuQmx1clwiLCBcImZlSW1hZ2VcIiwgXCJmZU1lcmdlXCIsIFwiZmVNZXJnZU5vZGVcIiwgXCJmZU1vcnBob2xvZ3lcIiwgXCJmZU9mZnNldFwiLCBcImZlUG9pbnRMaWdodFwiLCBcImZlU3BlY3VsYXJMaWdodGluZ1wiLCBcImZlU3BvdExpZ2h0XCIsIFwiZmVUaWxlXCIsIFwiZmVUdXJidWxlbmNlXCIsIFwiZmlsdGVyXCIsIFwiZm9yZWlnbk9iamVjdFwiLCBcImdcIixcclxuXHRcImhhdGNoXCIsIFwiaGF0Y2hwYXRoXCIsIFwiaW1hZ2VcIiwgXCJsaW5lXCIsIFwibGluZWFyR3JhZGllbnRcIiwgXCJtYXJrZXJcIiwgXCJtYXNrXCIsIFwibWVzaFwiLCBcIm1lc2hncmFkaWVudFwiLCBcIm1lc2hwYXRjaFwiLCBcIm1lc2hyb3dcIiwgXCJtZXRhZGF0YVwiLCBcIm1wYXRoXCIsIFwicGF0aFwiLCBcInBhdHRlcm5cIiwgXCJwb2x5Z29uXCIsIFwicG9seWxpbmVcIixcclxuXHRcInJhZGlhbEdyYWRpZW50XCIsIFwicmVjdFwiLCBcInNjcmlwdFwiLCBcInNldFwiLCBcInNvbGlkY29sb3JcIiwgXCJzdG9wXCIsIFwic3R5bGVcIiwgXCJzdmdcIiwgXCJzd2l0Y2hcIiwgXCJzeW1ib2xcIiwgXCJ0ZXh0XCIsIFwidGV4dFBhdGhcIiwgXCJ0aXRsZVwiLCBcInRzcGFuXCIsIFwidW5rbm93blwiLCBcInVzZVwiLCBcInZpZXdcIl07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZGlzYWJsZUhlbHAoKSB7XHJcblx0ZG9tLkRFVk1PREUubXV0YXRpb25zID0gZmFsc2U7XHJcblx0ZG9tLkRFVk1PREUud2FybmluZ3MgPSBmYWxzZTtcclxuXHRkb20uREVWTU9ERS52ZXJib3NlID0gZmFsc2U7XHJcblx0ZG9tLkRFVk1PREUuVU5LRVlFRF9JTlBVVCA9IGZhbHNlO1xyXG59XHJcblxyXG5leHBvcnQgdHlwZSBWTm9kZSA9IGFueTtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSURvbVZpZXcge1xyXG5cdHJlZHJhdygpO1xyXG5cclxuXHRtb3VudChlbDogSFRNTEVsZW1lbnQpO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElEb21SZW5kZXIge1xyXG5cdHJlbmRlcih2aWV3OiBJRG9tVmlldywgZGF0YTogYW55KTogVk5vZGU7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVZpZXdIYXNoIHtcclxuXHRbbmFtZTogc3RyaW5nXTogSURvbVJlbmRlcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHJlc2l6ZXIoaGFuZGxlcikge1xyXG5cdGNvbnN0IHJlc2l6ZSA9ICh3aW5kb3cgYXMgYW55KS5SZXNpemVPYnNlcnZlcjtcclxuXHRjb25zdCBhY3RpdmVIYW5kbGVyID0gKG5vZGUpID0+IHtcclxuXHJcblx0XHRjb25zdCBoZWlnaHQgPSBub2RlLmVsLm9mZnNldEhlaWdodDtcclxuXHRcdGNvbnN0IHdpZHRoID0gbm9kZS5lbC5vZmZzZXRXaWR0aDtcclxuXHRcdGhhbmRsZXIod2lkdGgsIGhlaWdodCk7XHJcblx0fTtcclxuXHJcblx0aWYgKHJlc2l6ZSkge1xyXG5cdFx0cmV0dXJuIGVsKFwiZGl2LmRoeC1yZXNpemUtb2JzZXJ2ZXJcIiwge1xyXG5cdFx0XHRfaG9va3M6IHtcclxuXHRcdFx0XHRkaWRJbnNlcnQobm9kZSkge1xyXG5cdFx0XHRcdFx0bmV3IHJlc2l6ZSgoKSA9PiBhY3RpdmVIYW5kbGVyKG5vZGUpKS5vYnNlcnZlKG5vZGUuZWwpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gZWwoXCJpZnJhbWUuZGh4LXJlc2l6ZS1vYnNlcnZlclwiLCB7XHJcblx0XHRfaG9va3M6IHtcclxuXHRcdFx0ZGlkSW5zZXJ0KG5vZGUpIHtcclxuXHRcdFx0XHRub2RlLmVsLmNvbnRlbnRXaW5kb3cub25yZXNpemUgPSAoKSA9PiBhY3RpdmVIYW5kbGVyKG5vZGUpO1xyXG5cdFx0XHRcdGFjdGl2ZUhhbmRsZXIobm9kZSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHhtbFRvSnNvbih4bWwpIHtcclxuXHRsZXQgb2JqID0ge307XHJcblxyXG5cdGlmICh4bWwubm9kZVR5cGUgPT09IDEpIHtcclxuXHRcdGlmICh4bWwuYXR0cmlidXRlcy5sZW5ndGggPiAwKSB7XHJcblx0XHRcdG9ialtcIkBhdHRyaWJ1dGVzXCJdID0ge307XHJcblx0XHRcdGZvciAobGV0IGogPSAwOyBqIDwgeG1sLmF0dHJpYnV0ZXMubGVuZ3RoOyBqKyspIHtcclxuXHRcdFx0XHRjb25zdCBhdHRyaWJ1dGUgPSB4bWwuYXR0cmlidXRlcy5pdGVtKGopO1xyXG5cdFx0XHRcdG9ialtcIkBhdHRyaWJ1dGVzXCJdW2F0dHJpYnV0ZS5ub2RlTmFtZV0gPSBhdHRyaWJ1dGUubm9kZVZhbHVlO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fSBlbHNlIGlmICh4bWwubm9kZVR5cGUgPT09IDMpIHtcclxuXHRcdG9iaiA9IHhtbC5ub2RlVmFsdWU7XHJcblx0fVxyXG5cclxuXHRpZiAoeG1sLmhhc0NoaWxkTm9kZXMoKSkge1xyXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCB4bWwuY2hpbGROb2Rlcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRjb25zdCBpdGVtID0geG1sLmNoaWxkTm9kZXMuaXRlbShpKTtcclxuXHRcdFx0Y29uc3Qgbm9kZU5hbWUgPSBpdGVtLm5vZGVOYW1lO1xyXG5cdFx0XHRpZiAodHlwZW9mIChvYmpbbm9kZU5hbWVdKSA9PT0gXCJ1bmRlZmluZWRcIikge1xyXG5cdFx0XHRcdG9ialtub2RlTmFtZV0gPSB4bWxUb0pzb24oaXRlbSk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0aWYgKHR5cGVvZiAob2JqW25vZGVOYW1lXS5wdXNoKSA9PT0gXCJ1bmRlZmluZWRcIikge1xyXG5cdFx0XHRcdFx0Y29uc3Qgb2xkID0gb2JqW25vZGVOYW1lXTtcclxuXHRcdFx0XHRcdG9ialtub2RlTmFtZV0gPSBbXTtcclxuXHRcdFx0XHRcdG9ialtub2RlTmFtZV0ucHVzaChvbGQpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRvYmpbbm9kZU5hbWVdLnB1c2goeG1sVG9Kc29uKGl0ZW0pKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHRyZXR1cm4gb2JqO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24ganNvblRvVkRPTShqc29uKSB7XHJcblx0Y29uc3QgdGFnID0gT2JqZWN0LmtleXMoanNvbilbMF07XHJcblx0Y29uc3QgZWxlbWVudCA9IGpzb25bdGFnXTtcclxuXHRjb25zdCBjaGlsZHJlbiA9IGVsZW1lbnRbXCIjdGV4dFwiXSA/IFtlbGVtZW50W1wiI3RleHRcIl1dIDogW107XHJcblxyXG5cdGZvciAoY29uc3QgY2hpbGQgaW4gZWxlbWVudCkge1xyXG5cdFx0aWYgKGVsZW1lbnQuaGFzT3duUHJvcGVydHkoY2hpbGQpICYmIGNoaWxkICE9PSBcIkBhdHRyaWJ1dGVzXCIgJiYgY2hpbGQgIT09IFwiI3RleHRcIikge1xyXG5cdFx0XHRpZiAoQXJyYXkuaXNBcnJheShlbGVtZW50W2NoaWxkXSkpIHtcclxuXHRcdFx0XHRmb3IgKGNvbnN0IHQgaW4gZWxlbWVudFtjaGlsZF0pIHtcclxuXHRcdFx0XHRcdGlmIChlbGVtZW50W2NoaWxkXS5oYXNPd25Qcm9wZXJ0eSh0KSkge1xyXG5cdFx0XHRcdFx0XHRjaGlsZHJlbi5wdXNoKGpzb25Ub1ZET00oe1tjaGlsZF06IGVsZW1lbnRbY2hpbGRdW3RdfSkpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRjaGlsZHJlbi5wdXNoKGpzb25Ub1ZET00oe1tjaGlsZF06IGVsZW1lbnRbY2hpbGRdfSkpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRpZiAoc3ZnVGFnTmFtZS5pbmRleE9mKHRhZykgIT09IC0xKSB7XHJcblx0XHRyZXR1cm4gc3YodGFnLCBlbGVtZW50W1wiQGF0dHJpYnV0ZXNcIl0gPyBlbGVtZW50W1wiQGF0dHJpYnV0ZXNcIl0gOiB7fSwgY2hpbGRyZW4pO1xyXG5cdH0gZWxzZSB7XHJcblx0XHRyZXR1cm4gZWwodGFnLCBlbGVtZW50W1wiQGF0dHJpYnV0ZXNcIl0gPyBlbGVtZW50W1wiQGF0dHJpYnV0ZXNcIl0gOiB7fSwgY2hpbGRyZW4pO1xyXG5cdH1cclxufVxyXG5leHBvcnQgZnVuY3Rpb24gYXdhaXRSZWRyYXcoKTogUHJvbWlzZTxhbnk+IHtcclxuXHRyZXR1cm4gbmV3IFByb21pc2UoKHJlcykgPT4ge1xyXG5cdFx0cmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcclxuXHRcdFx0cmVzKCk7XHJcblx0XHR9KTtcclxuXHR9KTtcclxufSIsImV4cG9ydCB0eXBlIENhbGxiYWNrID0gKC4uLmFyZ3M6IGFueVtdKSA9PiBhbnk7XHJcbmV4cG9ydCBpbnRlcmZhY2UgSUV2ZW50U3lzdGVtPEUsIFQgZXh0ZW5kcyBJRXZlbnRIYW5kbGVyc01hcCA9IElFdmVudEhhbmRsZXJzTWFwPiB7XHJcblx0Y29udGV4dDogYW55O1xyXG5cdGV2ZW50czogSUV2ZW50cztcclxuXHRvbjxLIGV4dGVuZHMga2V5b2YgVD4obmFtZTogSywgY2FsbGJhY2s6IFRbS10sIGNvbnRleHQ/OiBhbnkpO1xyXG5cdGRldGFjaChuYW1lOiBFLCBjb250ZXh0PzogYW55KTtcclxuXHRjbGVhcigpOiB2b2lkO1xyXG5cdGZpcmU8SyBleHRlbmRzIGtleW9mIFQ+KG5hbWU6IEssIGFyZ3M/OiBBcmd1bWVudFR5cGVzPFRbS10+KTogYm9vbGVhbjtcclxufVxyXG5cclxuaW50ZXJmYWNlIElFdmVudCB7XHJcblx0Y2FsbGJhY2s6IENhbGxiYWNrO1xyXG5cdGNvbnRleHQ6IGFueTtcclxufVxyXG5pbnRlcmZhY2UgSUV2ZW50cyB7XHJcblx0W2tleTogc3RyaW5nXTogSUV2ZW50W107XHJcbn1cclxuXHJcbmludGVyZmFjZSBJRXZlbnRIYW5kbGVyc01hcCB7XHJcblx0W2tleTogc3RyaW5nXTogQ2FsbGJhY2s7XHJcbn1cclxudHlwZSBBcmd1bWVudFR5cGVzPEYgZXh0ZW5kcyAoLi4uYXJnczogYW55W10pID0+IGFueT4gPSBGIGV4dGVuZHMgKC4uLmFyZ3M6IGluZmVyIEEpID0+IGFueSA/IEEgOiBuZXZlcjtcclxuXHJcbmV4cG9ydCBjbGFzcyBFdmVudFN5c3RlbTxFIGV4dGVuZHMgc3RyaW5nLCBUIGV4dGVuZHMgSUV2ZW50SGFuZGxlcnNNYXAgPSBJRXZlbnRIYW5kbGVyc01hcD4gaW1wbGVtZW50cyBJRXZlbnRTeXN0ZW08RSwgVD4ge1xyXG5cdHB1YmxpYyBldmVudHM6IElFdmVudHM7XHJcblx0cHVibGljIGNvbnRleHQ6IGFueTtcclxuXHJcblx0Y29uc3RydWN0b3IoY29udGV4dD86IGFueSkge1xyXG5cdFx0dGhpcy5ldmVudHMgPSB7fTtcclxuXHRcdHRoaXMuY29udGV4dCA9IGNvbnRleHQgfHwgdGhpcztcclxuXHR9XHJcblx0b248SyBleHRlbmRzIGtleW9mIFQ+KG5hbWU6IEssIGNhbGxiYWNrOiBUW0tdLCBjb250ZXh0PzogYW55KSB7XHJcblx0XHRjb25zdCBldmVudDogc3RyaW5nID0gKG5hbWUgYXMgc3RyaW5nKS50b0xvd2VyQ2FzZSgpO1xyXG5cdFx0dGhpcy5ldmVudHNbZXZlbnRdID0gdGhpcy5ldmVudHNbZXZlbnRdIHx8IFtdO1xyXG5cdFx0dGhpcy5ldmVudHNbZXZlbnRdLnB1c2goeyBjYWxsYmFjaywgY29udGV4dDogY29udGV4dCB8fCB0aGlzLmNvbnRleHQgfSk7XHJcblx0fVxyXG5cdGRldGFjaChuYW1lOiBFLCBjb250ZXh0PzogYW55KSB7XHJcblx0XHRjb25zdCBldmVudDogc3RyaW5nID0gbmFtZS50b0xvd2VyQ2FzZSgpO1xyXG5cclxuXHRcdGNvbnN0IGVTdGFjayA9IHRoaXMuZXZlbnRzW2V2ZW50XTtcclxuXHRcdGlmIChjb250ZXh0ICYmIGVTdGFjayAmJiBlU3RhY2subGVuZ3RoKSB7XHJcblx0XHRcdGZvciAobGV0IGkgPSBlU3RhY2subGVuZ3RoIC0gMTtpID49IDA7aS0tKSB7XHJcblx0XHRcdFx0aWYgKGVTdGFja1tpXS5jb250ZXh0ID09PSBjb250ZXh0KSB7XHJcblx0XHRcdFx0XHRlU3RhY2suc3BsaWNlKGksIDEpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGhpcy5ldmVudHNbZXZlbnRdID0gW107XHJcblx0XHR9XHJcblx0fVxyXG5cdGZpcmU8SyBleHRlbmRzIGtleW9mIFQ+KG5hbWU6IEssIGFyZ3M6IEFyZ3VtZW50VHlwZXM8VFtLXT4pOiBib29sZWFuIHtcclxuXHRcdGlmICh0eXBlb2YgYXJncyA9PT0gXCJ1bmRlZmluZWRcIikge1xyXG5cdFx0XHRhcmdzID0gW10gYXMgYW55O1xyXG5cdFx0fVxyXG5cclxuXHRcdGNvbnN0IGV2ZW50OiBzdHJpbmcgPSAobmFtZSBhcyBzdHJpbmcpLnRvTG93ZXJDYXNlKCk7XHJcblxyXG5cdFx0aWYgKHRoaXMuZXZlbnRzW2V2ZW50XSkge1xyXG5cdFx0XHRjb25zdCByZXMgPSB0aGlzLmV2ZW50c1tldmVudF0ubWFwKFxyXG5cdFx0XHRcdGUgPT4gZS5jYWxsYmFjay5hcHBseShlLmNvbnRleHQsIGFyZ3MpXHJcblx0XHRcdCk7XHJcblx0XHRcdHJldHVybiByZXMuaW5kZXhPZihmYWxzZSkgPCAwO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHRydWU7XHJcblx0fVxyXG5cdGNsZWFyKCkge1xyXG5cdFx0dGhpcy5ldmVudHMgPSB7fTtcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBFdmVudHNNaXhpbihvYmo6IGFueSkge1xyXG5cdG9iaiA9IG9iaiB8fCB7fTtcclxuXHRjb25zdCBldmVudFN5c3RlbSA9IG5ldyBFdmVudFN5c3RlbShvYmopO1xyXG5cdG9iai5kZXRhY2hFdmVudCA9IGV2ZW50U3lzdGVtLmRldGFjaC5iaW5kKGV2ZW50U3lzdGVtKTtcclxuXHRvYmouYXR0YWNoRXZlbnQgPSBldmVudFN5c3RlbS5vbi5iaW5kKGV2ZW50U3lzdGVtKTtcclxuXHRvYmouY2FsbEV2ZW50ID0gZXZlbnRTeXN0ZW0uZmlyZS5iaW5kKGV2ZW50U3lzdGVtKTtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJRXZlbnRGYWNhZGUge1xyXG5cdGF0dGFjaEV2ZW50OiBhbnk7XHJcblx0Y2FsbEV2ZW50OiBhbnk7XHJcbn0iLCJpbXBvcnQgXCIuL3BvbHlmaWxscy9tYXRjaGVzXCI7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdG9Ob2RlKG5vZGU6IHN0cmluZyB8IEhUTUxFbGVtZW50KTogSFRNTEVsZW1lbnQge1xyXG5cdGlmICh0eXBlb2Ygbm9kZSA9PT0gXCJzdHJpbmdcIikge1xyXG5cdFx0bm9kZSA9IChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChub2RlKSB8fCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKG5vZGUpKSBhcyBIVE1MRWxlbWVudDtcclxuXHR9XHJcblx0cmV0dXJuIG5vZGUgfHwgZG9jdW1lbnQuYm9keTtcclxufVxyXG5cclxudHlwZSBldmVudFByZXBhcmUgPSAoZXY6RXZlbnQpID0+IGFueTtcclxuaW50ZXJmYWNlIElIYW5kbGVySGFzaCB7XHJcblx0W25hbWU6IHN0cmluZ106ICgoLi4uYXJnczogYW55W10pID0+IChib29sZWFuIHwgdm9pZCkpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZXZlbnRIYW5kbGVyKHByZXBhcmU6ZXZlbnRQcmVwYXJlLCBoYXNoOklIYW5kbGVySGFzaCl7XHJcblx0Y29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKGhhc2gpO1xyXG5cclxuXHRyZXR1cm4gZnVuY3Rpb24oZXY6RXZlbnQpe1xyXG5cdFx0Y29uc3QgZGF0YSA9IHByZXBhcmUoZXYpO1xyXG5cdFx0bGV0IG5vZGUgPSBldi50YXJnZXQgYXMgKEhUTUxFbGVtZW50IHwgU1ZHRWxlbWVudCk7XHJcblxyXG5cdFx0d2hpbGUgKG5vZGUpe1xyXG5cdFx0XHRjb25zdCBjc3NzdHJpbmcgPSAgbm9kZS5nZXRBdHRyaWJ1dGUgPyAobm9kZS5nZXRBdHRyaWJ1dGUoXCJjbGFzc1wiKSB8fCBcIlwiKSA6IFwiXCI7XHJcblx0XHRcdGlmIChjc3NzdHJpbmcubGVuZ3RoKXtcclxuXHRcdFx0XHRjb25zdCBjc3MgPSBjc3NzdHJpbmcuc3BsaXQoXCIgXCIpO1xyXG5cdFx0XHRcdGZvciAobGV0IGo9MDsgajxrZXlzLmxlbmd0aDsgaisrKXtcclxuXHRcdFx0XHRcdGlmIChjc3MuaW5kZXhPZihrZXlzW2pdKSA+IC0xKXtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIGhhc2hba2V5c1tqXV0oZXYsIGRhdGEpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0XHRub2RlID0gbm9kZS5wYXJlbnROb2RlIGFzIChIVE1MRWxlbWVudCB8IFNWR0VsZW1lbnQpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB0cnVlO1xyXG5cdH07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBsb2NhdGUodGFyZ2V0OiBFdmVudCB8IEVsZW1lbnQsIGF0dHI6IHN0cmluZyA9IFwiZGh4X2lkXCIpOiBzdHJpbmcge1xyXG5cdGNvbnN0IG5vZGUgPSBsb2NhdGVOb2RlKHRhcmdldCwgYXR0cik7XHJcblx0cmV0dXJuIG5vZGUgPyBub2RlLmdldEF0dHJpYnV0ZShhdHRyKSA6IFwiXCI7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGxvY2F0ZU5vZGUodGFyZ2V0OiBFdmVudCB8IEVsZW1lbnQsIGF0dHI6IHN0cmluZyA9IFwiZGh4X2lkXCIpOiBFbGVtZW50IHtcclxuXHRpZiAodGFyZ2V0IGluc3RhbmNlb2YgRXZlbnQpIHtcclxuXHRcdHRhcmdldCA9IHRhcmdldC50YXJnZXQgYXMgSFRNTEVsZW1lbnQ7XHJcblx0fVxyXG5cdHdoaWxlICh0YXJnZXQpIHtcclxuXHRcdGlmICh0YXJnZXQuZ2V0QXR0cmlidXRlICYmIHRhcmdldC5nZXRBdHRyaWJ1dGUoYXR0cikpIHtcclxuXHRcdFx0cmV0dXJuIHRhcmdldDtcclxuXHRcdH1cclxuXHRcdHRhcmdldCA9IHRhcmdldC5wYXJlbnROb2RlIGFzIEhUTUxFbGVtZW50O1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldEJveChlbGVtKSB7XHJcblx0Y29uc3QgYm94ID0gZWxlbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuXHRjb25zdCBib2R5ID0gZG9jdW1lbnQuYm9keTtcclxuXHJcblx0Y29uc3Qgc2Nyb2xsVG9wID0gd2luZG93LnBhZ2VZT2Zmc2V0IHx8IGJvZHkuc2Nyb2xsVG9wO1xyXG5cdGNvbnN0IHNjcm9sbExlZnQgPSB3aW5kb3cucGFnZVhPZmZzZXQgfHwgYm9keS5zY3JvbGxMZWZ0O1xyXG5cclxuXHRjb25zdCB0b3AgPSBib3gudG9wICsgc2Nyb2xsVG9wO1xyXG5cdGNvbnN0IGxlZnQgPSBib3gubGVmdCArIHNjcm9sbExlZnQ7XHJcblx0Y29uc3QgcmlnaHQgPSBib2R5Lm9mZnNldFdpZHRoIC0gYm94LnJpZ2h0O1xyXG5cdGNvbnN0IGJvdHRvbSA9IGJvZHkub2Zmc2V0SGVpZ2h0IC0gYm94LmJvdHRvbTtcclxuXHRjb25zdCB3aWR0aCA9IGJveC5yaWdodCAtIGJveC5sZWZ0O1xyXG5cdGNvbnN0IGhlaWdodCA9IGJveC5ib3R0b20gLSBib3gudG9wO1xyXG5cclxuXHRyZXR1cm4geyB0b3AsIGxlZnQsIHJpZ2h0LCBib3R0b20sIHdpZHRoLCBoZWlnaHQgfTtcclxufVxyXG5cclxubGV0IHNjcm9sbFdpZHRoID0gLTE7XHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRTY3JvbGxiYXJXaWR0aCgpOiBudW1iZXIge1xyXG5cdGlmIChzY3JvbGxXaWR0aCA+IC0xKXtcclxuXHRcdHJldHVybiBzY3JvbGxXaWR0aDtcclxuXHR9XHJcblxyXG5cdGNvbnN0IHNjcm9sbERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcblx0ZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzY3JvbGxEaXYpO1xyXG5cdHNjcm9sbERpdi5zdHlsZS5jc3NUZXh0ID0gXCJwb3NpdGlvbjogYWJzb2x1dGU7bGVmdDogLTk5OTk5cHg7b3ZlcmZsb3c6c2Nyb2xsO3dpZHRoOiAxMDBweDtoZWlnaHQ6IDEwMHB4O1wiO1xyXG5cdHNjcm9sbFdpZHRoID0gc2Nyb2xsRGl2Lm9mZnNldFdpZHRoIC0gc2Nyb2xsRGl2LmNsaWVudFdpZHRoO1xyXG5cdGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoc2Nyb2xsRGl2KTtcclxuXHRyZXR1cm4gc2Nyb2xsV2lkdGg7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUZpdFRhcmdldCB7XHJcblx0dG9wOiBudW1iZXI7XHJcblx0bGVmdDogbnVtYmVyO1xyXG5cdHdpZHRoOiBudW1iZXI7XHJcblx0aGVpZ2h0OiBudW1iZXI7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUZpdFBvc2l0aW9uIHtcclxuXHRsZWZ0OiBudW1iZXI7XHJcblx0cmlnaHQ6IG51bWJlcjtcclxuXHR0b3A6IG51bWJlcjtcclxuXHRib3R0b206IG51bWJlcjtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJRml0UG9zaXRpb25Db25maWcge1xyXG5cdG1vZGU/OiBQb3NpdGlvbjtcclxuXHRhdXRvPzogYm9vbGVhbjtcclxuXHRjZW50ZXJpbmc/OiBib29sZWFuO1xyXG5cdHdpZHRoOiBudW1iZXI7XHJcblx0aGVpZ2h0OiBudW1iZXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBmaXRQb3NpdGlvbihub2RlOiBIVE1MRWxlbWVudCwgY29uZmlnOiBJRml0UG9zaXRpb25Db25maWcpIHtcclxuXHRyZXR1cm4gY2FsY3VsYXRlUG9zaXRpb24oZ2V0UmVhbFBvc2l0aW9uKG5vZGUpLCBjb25maWcpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaXNJRSgpIHtcclxuXHRjb25zdCB1YSA9IHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50O1xyXG5cdHJldHVybiB1YS5pbmRleE9mKFwiTVNJRSBcIikgPiAtMSB8fCB1YS5pbmRleE9mKFwiVHJpZGVudC9cIikgPiAtMTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFJlYWxQb3NpdGlvbihub2RlOiBIVE1MRWxlbWVudCk6IElGaXRQb3NpdGlvbiB7XHJcblx0Y29uc3QgcmVjdHMgPSBub2RlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG5cdHJldHVybiB7XHJcblx0XHRsZWZ0OiByZWN0cy5sZWZ0ICsgd2luZG93LnBhZ2VYT2Zmc2V0LFxyXG5cdFx0cmlnaHQ6IHJlY3RzLnJpZ2h0ICsgd2luZG93LnBhZ2VYT2Zmc2V0LFxyXG5cdFx0dG9wOiByZWN0cy50b3AgKyB3aW5kb3cucGFnZVlPZmZzZXQsXHJcblx0XHRib3R0b206IHJlY3RzLmJvdHRvbSArIHdpbmRvdy5wYWdlWU9mZnNldFxyXG5cdH07XHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIFBvc2l0aW9uIHtcclxuXHRsZWZ0ID0gXCJsZWZ0XCIsXHJcblx0cmlnaHQgPSBcInJpZ2h0XCIsXHJcblx0Ym90dG9tID0gXCJib3R0b21cIixcclxuXHR0b3AgPSBcInRvcFwiXHJcbn1cclxuXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY2FsY3VsYXRlUG9zaXRpb24ocG9zOiBJRml0UG9zaXRpb24sIGNvbmZpZzogSUZpdFBvc2l0aW9uQ29uZmlnKSB7XHJcblx0Y29uc3Qge2xlZnQsIHRvcH0gPSBjb25maWcubW9kZSA9PT0gUG9zaXRpb24uYm90dG9tIHx8IGNvbmZpZy5tb2RlID09PSBQb3NpdGlvbi50b3BcclxuXHRcdD8gcGxhY2VCb3R0b21PclRvcChwb3MsIGNvbmZpZylcclxuXHRcdDogcGxhY2VSaWdodE9yTGVmdChwb3MsIGNvbmZpZyk7XHJcblx0cmV0dXJuIHtcclxuXHRcdGxlZnQ6IE1hdGgucm91bmQobGVmdCkgKyBcInB4XCIsXHJcblx0XHR0b3A6IE1hdGgucm91bmQodG9wKSArIFwicHhcIixcclxuXHRcdG1pbldpZHRoOiBNYXRoLnJvdW5kKGNvbmZpZy53aWR0aCkgKyBcInB4XCIsXHJcblx0XHRwb3NpdGlvbjogXCJhYnNvbHV0ZVwiXHJcblx0fTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0V2luZG93Qm9yZGVycygpIHtcclxuXHRyZXR1cm4ge1xyXG5cdFx0cmlnaHRCb3JkZXI6IHdpbmRvdy5wYWdlWE9mZnNldCArIHdpbmRvdy5pbm5lcldpZHRoLFxyXG5cdFx0Ym90dG9tQm9yZGVyOiB3aW5kb3cucGFnZVlPZmZzZXQgKyB3aW5kb3cuaW5uZXJIZWlnaHRcclxuXHR9O1xyXG59XHJcblxyXG5mdW5jdGlvbiBob3Jpem9udGFsQ2VudGVyaW5nKHBvczogSUZpdFBvc2l0aW9uLCB3aWR0aDogbnVtYmVyLCByaWdodEJvcmRlcjogbnVtYmVyKSB7XHJcblx0Y29uc3Qgbm9kZVdpZHRoID0gcG9zLnJpZ2h0IC0gcG9zLmxlZnQ7XHJcblx0Y29uc3QgZGlmZiA9ICh3aWR0aCAtIG5vZGVXaWR0aCkgLyAyO1xyXG5cclxuXHRjb25zdCBsZWZ0ID0gcG9zLmxlZnQgLSBkaWZmO1xyXG5cdGNvbnN0IHJpZ2h0ID0gcG9zLnJpZ2h0ICsgZGlmZjtcclxuXHJcblx0aWYgKGxlZnQgPj0gMCAmJiByaWdodCA8PSByaWdodEJvcmRlcikge1xyXG5cdFx0cmV0dXJuIGxlZnQ7XHJcblx0fVxyXG5cclxuXHRpZiAobGVmdCA8IDApIHtcclxuXHRcdHJldHVybiAwO1xyXG5cdH1cclxuXHJcblx0cmV0dXJuIHJpZ2h0Qm9yZGVyIC0gd2lkdGg7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHZlcnRpY2FsQ2VudGVyaW5nKHBvczogSUZpdFBvc2l0aW9uLCBoZWlnaHQ6IG51bWJlciwgYm90dG9tQm9yZGVyOiBudW1iZXIpIHtcclxuXHRjb25zdCBub2RlSGVpZ2h0ID0gcG9zLmJvdHRvbSAtIHBvcy50b3A7XHJcblx0Y29uc3QgZGlmZiA9IChoZWlnaHQgLSBub2RlSGVpZ2h0KSAvIDI7XHJcblxyXG5cdGNvbnN0IHRvcCA9IHBvcy50b3AgLSBkaWZmO1xyXG5cdGNvbnN0IGJvdHRvbSA9IHBvcy5ib3R0b20gKyBkaWZmO1xyXG5cclxuXHRpZiAodG9wID49IDAgJiYgYm90dG9tIDw9IGJvdHRvbUJvcmRlcikge1xyXG5cdFx0cmV0dXJuIHRvcDtcclxuXHR9XHJcblxyXG5cdGlmICh0b3AgPCAwKSB7XHJcblx0XHRyZXR1cm4gMDtcclxuXHR9XHJcblxyXG5cdHJldHVybiBib3R0b21Cb3JkZXIgLSBoZWlnaHQ7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHBsYWNlQm90dG9tT3JUb3AocG9zOiBJRml0UG9zaXRpb24sIGNvbmZpZzogSUZpdFBvc2l0aW9uQ29uZmlnKSB7XHJcblx0Y29uc3Qge3JpZ2h0Qm9yZGVyLCBib3R0b21Cb3JkZXJ9ID0gZ2V0V2luZG93Qm9yZGVycygpO1xyXG5cclxuXHRsZXQgbGVmdDtcclxuXHRsZXQgdG9wO1xyXG5cclxuXHRjb25zdCBib3R0b21EaWZmID0gYm90dG9tQm9yZGVyIC0gcG9zLmJvdHRvbSAtIGNvbmZpZy5oZWlnaHQ7XHJcblx0Y29uc3QgdG9wRGlmZiA9IHBvcy50b3AgLSBjb25maWcuaGVpZ2h0O1xyXG5cclxuXHRpZiAoY29uZmlnLm1vZGUgPT09IFBvc2l0aW9uLmJvdHRvbSkge1xyXG5cdFx0aWYgKGJvdHRvbURpZmYgPj0gMCkge1xyXG5cdFx0XHR0b3AgPSBwb3MuYm90dG9tO1xyXG5cdFx0fSBlbHNlIGlmICh0b3BEaWZmID49IDApIHtcclxuXHRcdFx0dG9wID0gdG9wRGlmZjtcclxuXHRcdH1cclxuXHR9IGVsc2Uge1xyXG5cdFx0aWYgKHRvcERpZmYgPj0gMCkge1xyXG5cdFx0XHR0b3AgPSB0b3BEaWZmO1xyXG5cdFx0fSBlbHNlIGlmIChib3R0b21EaWZmID49IDApIHtcclxuXHRcdFx0dG9wID0gcG9zLmJvdHRvbTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGlmIChib3R0b21EaWZmIDwgMCAmJiB0b3BEaWZmIDwgMCkge1xyXG5cdFx0aWYgKGNvbmZpZy5hdXRvKSB7XHJcblx0XHRcdHJldHVybiBwbGFjZVJpZ2h0T3JMZWZ0KHBvcywgey4uLmNvbmZpZywgbW9kZTogUG9zaXRpb24ucmlnaHQsIGF1dG86IGZhbHNlfSk7XHJcblx0XHR9XHJcblx0XHR0b3AgPSBib3R0b21EaWZmID4gdG9wRGlmZiA/IHBvcy5ib3R0b20gOiB0b3BEaWZmO1xyXG5cdH1cclxuXHJcblx0aWYgKGNvbmZpZy5jZW50ZXJpbmcpIHtcclxuXHRcdGxlZnQgPSBob3Jpem9udGFsQ2VudGVyaW5nKHBvcywgY29uZmlnLndpZHRoLCByaWdodEJvcmRlcik7XHJcblx0fSBlbHNlIHtcclxuXHRcdGNvbnN0IGxlZnREaWZmID0gcmlnaHRCb3JkZXIgLSBwb3MubGVmdCAtIGNvbmZpZy53aWR0aDtcclxuXHRcdGNvbnN0IHJpZ2h0RGlmZiA9IHBvcy5yaWdodCAtIGNvbmZpZy53aWR0aDtcclxuXHJcblx0XHRpZiAobGVmdERpZmYgPj0gMCkge1xyXG5cdFx0XHRsZWZ0ID0gcG9zLmxlZnQ7XHJcblx0XHR9IGVsc2UgaWYgKHJpZ2h0RGlmZiA+PSAwKSB7XHJcblx0XHRcdGxlZnQgPSByaWdodERpZmY7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRsZWZ0ID0gcmlnaHREaWZmID4gbGVmdERpZmYgID8gcG9zLmxlZnQgOiByaWdodERpZmY7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRyZXR1cm4ge2xlZnQsIHRvcH07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHBsYWNlUmlnaHRPckxlZnQocG9zOiBJRml0UG9zaXRpb24sIGNvbmZpZzogSUZpdFBvc2l0aW9uQ29uZmlnKSB7XHJcblx0Y29uc3Qge3JpZ2h0Qm9yZGVyLCBib3R0b21Cb3JkZXJ9ID0gZ2V0V2luZG93Qm9yZGVycygpO1xyXG5cclxuXHRsZXQgbGVmdDtcclxuXHRsZXQgdG9wO1xyXG5cclxuXHRjb25zdCByaWdodERpZmYgPSByaWdodEJvcmRlciAtIHBvcy5yaWdodCAtIGNvbmZpZy53aWR0aDtcclxuXHRjb25zdCBsZWZ0RGlmZiA9IHBvcy5sZWZ0IC0gY29uZmlnLndpZHRoO1xyXG5cclxuXHRpZiAoY29uZmlnLm1vZGUgPT09IFBvc2l0aW9uLnJpZ2h0KSB7XHJcblx0XHRpZiAocmlnaHREaWZmID49IDApIHtcclxuXHRcdFx0bGVmdCA9IHBvcy5yaWdodDtcclxuXHRcdH0gZWxzZSBpZiAobGVmdERpZmYgPj0gMCkge1xyXG5cdFx0XHRsZWZ0ID0gbGVmdERpZmY7XHJcblx0XHR9XHJcblx0fSBlbHNlIHtcclxuXHRcdGlmIChsZWZ0RGlmZiA+PSAwKSB7XHJcblx0XHRcdGxlZnQgPSBsZWZ0RGlmZjtcclxuXHRcdH0gZWxzZSBpZiAocmlnaHREaWZmID49IDApIHtcclxuXHRcdFx0bGVmdCA9IHBvcy5yaWdodDtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGlmIChsZWZ0RGlmZiA8IDAgJiYgcmlnaHREaWZmIDwgMCkge1xyXG5cdFx0aWYgKGNvbmZpZy5hdXRvKSB7XHJcblx0XHRcdHJldHVybiBwbGFjZUJvdHRvbU9yVG9wKHBvcywgey4uLmNvbmZpZywgbW9kZTogUG9zaXRpb24uYm90dG9tLCBhdXRvOiBmYWxzZX0pO1xyXG5cdFx0fVxyXG5cdFx0bGVmdCA9IGxlZnREaWZmID4gcmlnaHREaWZmID8gbGVmdERpZmYgOiBwb3MucmlnaHQ7XHJcblx0fVxyXG5cclxuXHRpZiAoY29uZmlnLmNlbnRlcmluZykge1xyXG5cdFx0dG9wID0gdmVydGljYWxDZW50ZXJpbmcocG9zLCBjb25maWcuaGVpZ2h0LCByaWdodEJvcmRlcik7XHJcblx0fSBlbHNlIHtcclxuXHRcdGNvbnN0IGJvdHRvbURpZmYgPSBwb3MuYm90dG9tIC0gY29uZmlnLmhlaWdodDtcclxuXHRcdGNvbnN0IHRvcERpZmYgPSBib3R0b21Cb3JkZXIgLSBwb3MudG9wIC0gY29uZmlnLmhlaWdodDtcclxuXHJcblx0XHRpZiAodG9wRGlmZiA+PSAwKSB7XHJcblx0XHRcdHRvcCA9IHBvcy50b3A7XHJcblx0XHR9IGVsc2UgaWYgKGJvdHRvbURpZmYgPiAwKSB7XHJcblx0XHRcdHRvcCA9IGJvdHRvbURpZmY7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0b3AgPSBib3R0b21EaWZmID4gdG9wRGlmZiAgPyBib3R0b21EaWZmIDogcG9zLnRvcDtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHJldHVybiB7bGVmdCwgdG9wfTtcclxufSIsImlmIChFbGVtZW50ICYmICFFbGVtZW50LnByb3RvdHlwZS5tYXRjaGVzKSB7XHJcblx0Y29uc3QgcHJvdG8gPSAoRWxlbWVudCBhcyBhbnkpLnByb3RvdHlwZTtcclxuXHRwcm90by5tYXRjaGVzID0gcHJvdG8ubWF0Y2hlc1NlbGVjdG9yIHx8XHJcblx0XHRwcm90by5tb3pNYXRjaGVzU2VsZWN0b3IgfHwgcHJvdG8ubXNNYXRjaGVzU2VsZWN0b3IgfHxcclxuXHRcdHByb3RvLm9NYXRjaGVzU2VsZWN0b3IgfHwgcHJvdG8ud2Via2l0TWF0Y2hlc1NlbGVjdG9yO1xyXG59IiwiZXhwb3J0IGludGVyZmFjZSBJSGFuZGxlcnMge1xyXG5cdFtrZXk6IHN0cmluZ106IGFueUZ1bmN0aW9uIHwgSUhhbmRsZXJzO1xyXG59XHJcblxyXG5leHBvcnQgdHlwZSBmbjxUIGV4dGVuZHMgYW55W10sSz4gPSAoLi4uYXJnczogVCkgPT4gSztcclxuZXhwb3J0IHR5cGUgYW55RnVuY3Rpb24gPSBmbjxhbnlbXSwgYW55PjtcclxuZXhwb3J0IGludGVyZmFjZSBJQW55T2JqIHtcclxuXHRba2V5OiBzdHJpbmddOiBhbnk7XHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIFNlbGVjdGlvbkV2ZW50cyB7XHJcblx0YmVmb3JlVW5TZWxlY3QgPSBcImJlZm9yZXVuc2VsZWN0XCIsXHJcblx0YWZ0ZXJVblNlbGVjdCA9IFwiYWZ0ZXJ1bnNlbGVjdFwiLFxyXG5cdGJlZm9yZVNlbGVjdCA9IFwiYmVmb3Jlc2VsZWN0XCIsXHJcblx0YWZ0ZXJTZWxlY3QgPSBcImFmdGVyc2VsZWN0XCJcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJU2VsZWN0aW9uRXZlbnRzSGFuZGxlcnNNYXAge1xyXG5cdFtrZXk6IHN0cmluZ106ICguLi5hcmdzOiBhbnlbXSkgPT4gYW55O1xyXG5cdFtTZWxlY3Rpb25FdmVudHMuYWZ0ZXJTZWxlY3RdOiAoaWQ6IHN0cmluZykgPT4gYW55O1xyXG5cdFtTZWxlY3Rpb25FdmVudHMuYWZ0ZXJVblNlbGVjdF06IChpZDogc3RyaW5nKSA9PiBhbnk7XHJcblx0W1NlbGVjdGlvbkV2ZW50cy5iZWZvcmVTZWxlY3RdOiAoaWQ6IHN0cmluZykgPT4gdm9pZCB8IGJvb2xlYW47XHJcblx0W1NlbGVjdGlvbkV2ZW50cy5iZWZvcmVVblNlbGVjdF06IChpZDogc3RyaW5nKSA9PiB2b2lkIHwgYm9vbGVhbjtcclxufSIsImltcG9ydCB7dWlkfSBmcm9tIFwiLi9jb3JlXCI7XHJcbmltcG9ydCB7IHRvTm9kZSB9IGZyb20gXCIuL2h0bWxcIjtcclxuXHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElWaWV3e1xyXG5cdGdldFJvb3RWaWV3KCk6YW55O1xyXG5cdHBhaW50KCk6dm9pZDtcclxuXHRtb3VudChjb250YWluZXIsIHZub2RlKTtcclxufVxyXG5cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVZpZXdMaWtle1xyXG5cdG1vdW50Pyhjb250YWluZXIsIHZub2RlPyk7XHJcblx0Z2V0Um9vdFZpZXcoKTphbnk7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBWaWV3IHtcclxuXHRwdWJsaWMgY29uZmlnOiBhbnk7XHJcblx0cHJvdGVjdGVkIF9jb250YWluZXI6IGFueTtcclxuXHRwcm90ZWN0ZWQgX3VpZDogYW55O1xyXG5cdHByb3RlY3RlZCBfZG9Ob3RSZXBhaW50OiBib29sZWFuO1xyXG5cdHByaXZhdGUgX3ZpZXc6YW55O1xyXG5cclxuXHRjb25zdHJ1Y3RvcihfY29udGFpbmVyLCBjb25maWcpe1xyXG5cdFx0dGhpcy5fdWlkID0gdWlkKCk7XHJcblx0XHR0aGlzLmNvbmZpZyA9IGNvbmZpZyB8fCB7fTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBtb3VudChjb250YWluZXIsIHZub2RlPyA6YW55KXtcclxuXHRcdGlmICh2bm9kZSl7XHJcblx0XHRcdHRoaXMuX3ZpZXcgPSB2bm9kZTtcclxuXHRcdH1cclxuXHRcdGlmIChjb250YWluZXIgJiYgdGhpcy5fdmlldyAmJiB0aGlzLl92aWV3Lm1vdW50KSB7XHJcblx0XHRcdC8vIGluaXQgdmlldyBpbnNpZGUgb2YgSFRNTCBjb250YWluZXJcclxuXHRcdFx0dGhpcy5fY29udGFpbmVyID0gdG9Ob2RlKGNvbnRhaW5lcik7XHJcblx0XHRcdGlmICh0aGlzLl9jb250YWluZXIudGFnTmFtZSl7XHJcblx0XHRcdFx0dGhpcy5fdmlldy5tb3VudCh0aGlzLl9jb250YWluZXIpO1xyXG5cdFx0XHR9IGVsc2UgaWYgKHRoaXMuX2NvbnRhaW5lci5hdHRhY2gpe1xyXG5cdFx0XHRcdHRoaXMuX2NvbnRhaW5lci5hdHRhY2godGhpcyk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHB1YmxpYyB1bm1vdW50KCkge1xyXG5cdFx0Y29uc3Qgcm9vdFZpZXcgPSB0aGlzLmdldFJvb3RWaWV3KCk7XHJcblx0XHRpZiAocm9vdFZpZXcgJiYgcm9vdFZpZXcubm9kZSkge1xyXG5cdFx0XHRyb290Vmlldy51bm1vdW50KCk7XHJcblx0XHRcdHRoaXMuX3ZpZXcgPSBudWxsO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cHVibGljIGdldFJvb3RWaWV3KCl7XHJcblx0XHRyZXR1cm4gdGhpcy5fdmlldztcclxuXHR9XHJcblx0cHVibGljIGdldFJvb3ROb2RlKCk6IEhUTUxFbGVtZW50IHtcclxuXHRcdHJldHVybiB0aGlzLl92aWV3ICYmIHRoaXMuX3ZpZXcubm9kZSAmJiB0aGlzLl92aWV3Lm5vZGUuZWw7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgcGFpbnQoKXtcclxuXHRcdGlmICh0aGlzLl92aWV3ICYmICgvLyB3YXMgbW91bnRlZFxyXG5cdFx0XHR0aGlzLl92aWV3Lm5vZGUgfHwgXHQvLyBhbHJlYWR5IHJlbmRlcmVkIG5vZGVcclxuXHRcdFx0dGhpcy5fY29udGFpbmVyKSl7IC8vIG5vdCByZW5kZXJlZCwgYnV0IGhhcyBjb250YWluZXJcclxuXHRcdFx0dGhpcy5fZG9Ob3RSZXBhaW50ID0gZmFsc2U7XHJcblx0XHRcdHRoaXMuX3ZpZXcucmVkcmF3KCk7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdG9WaWV3TGlrZSh2aWV3KSB7XHJcblx0cmV0dXJuIHtcclxuXHRcdGdldFJvb3RWaWV3OiAoKSA9PiB2aWV3LFxyXG5cdFx0cGFpbnQ6ICgpID0+IHZpZXcubm9kZSAmJiB2aWV3LnJlZHJhdygpLFxyXG5cdFx0bW91bnQ6IGNvbnRhaW5lciA9PiB2aWV3Lm1vdW50KGNvbnRhaW5lcilcclxuXHR9O1xyXG59IiwiZXhwb3J0ICogZnJvbSBcIi4vc291cmNlcy90eXBlc1wiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9zb3VyY2VzL2RhdGFjb2xsZWN0aW9uXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL3NvdXJjZXMvdHJlZWNvbGxlY3Rpb25cIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vc291cmNlcy9EcmFnTWFuYWdlclwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9zb3VyY2VzL2RhdGFwcm94eVwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9zb3VyY2VzL2hlbHBlcnNcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vc291cmNlcy9kcml2ZXJzL0NzdkRyaXZlclwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9zb3VyY2VzL2RyaXZlcnMvSnNvbkRyaXZlclwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9zb3VyY2VzL3NlbGVjdGlvblwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9zb3VyY2VzL2RyaXZlcnMvZHJpdmVyc1wiO1xyXG4iLCJpbXBvcnQgeyBJZCB9IGZyb20gXCIuL3R5cGVzXCI7XHJcblxyXG5jbGFzcyBDb2xsZWN0aW9uU3RvcmUge1xyXG5cdHByaXZhdGUgX3N0b3JlOiB7W2lkOiBzdHJpbmddOiBhbnl9ID0ge307XHJcblxyXG5cdHNldEl0ZW0oaWQ6IElkLCB0YXJnZXQ6IGFueSk6IHZvaWQge1xyXG5cdFx0dGhpcy5fc3RvcmVbaWRdID0gdGFyZ2V0O1xyXG5cdH1cclxuXHRnZXRJdGVtKGlkOiBJZCkge1xyXG5cdFx0aWYgKCF0aGlzLl9zdG9yZVtpZF0pIHtcclxuXHRcdFx0cmV0dXJuIG51bGw7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gdGhpcy5fc3RvcmVbaWRdO1xyXG5cdH1cclxufVxyXG5cclxuY29uc3QgZGh4ID0gKHdpbmRvdyBhcyBhbnkpLmRoeEhlbHBlcnMgPSAod2luZG93IGFzIGFueSkuZGh4SGVscGVycyB8fCB7fTtcclxuZGh4LmNvbGxlY3Rpb25TdG9yZSA9IGRoeC5jb2xsZWN0aW9uU3RvcmUgfHwgbmV3IENvbGxlY3Rpb25TdG9yZSgpO1xyXG5leHBvcnQgY29uc3QgY29sbGVjdGlvblN0b3JlID0gZGh4LmNvbGxlY3Rpb25TdG9yZTtcclxuIiwiaW1wb3J0IHsgbG9jYXRlLCBsb2NhdGVOb2RlLCBnZXRCb3ggfSBmcm9tIFwiQGRoeC90cy1jb21tb24vaHRtbFwiO1xyXG5pbXBvcnQgeyBjb2xsZWN0aW9uU3RvcmUgfSBmcm9tIFwiLi9Db2xsZWN0aW9uU3RvcmVcIjtcclxuaW1wb3J0IHsgVHJlZUNvbGxlY3Rpb24gfSBmcm9tIFwiLi90cmVlY29sbGVjdGlvblwiO1xyXG5pbXBvcnQgeyBEcm9wQmVoYXZpb3VyLCBEcmFnRXZlbnRzLCBEcmFnTW9kZSwgSWQsIElUcmFuc2ZlckRhdGEsIERyb3BQb3NpdGlvbiwgSUNvcHlPYmplY3QgfSBmcm9tIFwiLi90eXBlc1wiO1xyXG5pbXBvcnQgeyBpc1RyZWVDb2xsZWN0aW9uIH0gZnJvbSBcIi4vaGVscGVyc1wiO1xyXG5cclxuXHJcbmZ1bmN0aW9uIGdldFBvc2l0aW9uKGU6IE1vdXNlRXZlbnQpIHtcclxuXHRjb25zdCB5ID0gZS5jbGllbnRZO1xyXG5cdGNvbnN0IGVsZW1lbnQgPSBsb2NhdGVOb2RlKGUpO1xyXG5cdGlmICghZWxlbWVudCkge1xyXG5cdFx0cmV0dXJuIG51bGw7XHJcblx0fVxyXG5cdGNvbnN0IHRyZWVMaW5lOiBIVE1MRWxlbWVudCA9IGVsZW1lbnQuY2hpbGROb2Rlc1swXSBhcyBIVE1MRWxlbWVudDtcclxuXHJcblx0Y29uc3Qge3RvcCwgaGVpZ2h0fSA9IHRyZWVMaW5lLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG5cdHJldHVybiAoeSAtIHRvcCkgLyBoZWlnaHQ7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRyYWdFdmVudENvbnRlbnQoZWxlbWVudDogSFRNTEVsZW1lbnQsIGVsZW1lbnRzOiBOb2RlTGlzdCkge1xyXG5cdGNvbnN0IHJlY3QgPSBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG5cdGNvbnN0IGdob3N0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuXHRjb25zdCBjbG9uZSA9IGVsZW1lbnQuY2xvbmVOb2RlKHRydWUpIGFzIEhUTUxFbGVtZW50O1xyXG5cdGNsb25lLnN0eWxlLndpZHRoID0gcmVjdC53aWR0aCArIFwicHhcIjtcclxuXHRjbG9uZS5zdHlsZS5oZWlnaHQgPSByZWN0LmhlaWdodCArIFwicHhcIjtcclxuXHRjbG9uZS5zdHlsZS5tYXhIZWlnaHQgPSByZWN0LmhlaWdodCArIFwicHhcIjtcclxuXHRjbG9uZS5zdHlsZS5mb250U2l6ZSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQucGFyZW50RWxlbWVudCkuZm9udFNpemU7XHJcblx0Y2xvbmUuc3R5bGUub3BhY2l0eSA9IFwiMC44XCI7XHJcblx0Y2xvbmUuc3R5bGUuZm9udFNpemUgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50LnBhcmVudEVsZW1lbnQpLmZvbnRTaXplO1xyXG5cdGdob3N0LmFwcGVuZENoaWxkKGNsb25lKTtcclxuXHRpZiAoZWxlbWVudHMgJiYgZWxlbWVudHMubGVuZ3RoKSB7XHJcblx0XHRlbGVtZW50cy5mb3JFYWNoKChub2RlLCBrZXkpPT4ge1xyXG5cdFx0XHRjb25zdCBub2RlQ2xvbmUgPSBub2RlLmNsb25lTm9kZSh0cnVlKSBhcyBIVE1MRWxlbWVudDtcclxuXHRcdFx0bm9kZUNsb25lLnN0eWxlLndpZHRoID0gcmVjdC53aWR0aCArIFwicHhcIjtcclxuXHRcdFx0bm9kZUNsb25lLnN0eWxlLmhlaWdodCA9IHJlY3QuaGVpZ2h0ICsgXCJweFwiO1xyXG5cdFx0XHRub2RlQ2xvbmUuc3R5bGUubWF4SGVpZ2h0ID0gcmVjdC5oZWlnaHQgKyBcInB4XCI7XHJcblx0XHRcdG5vZGVDbG9uZS5zdHlsZS50b3AgPSAoKGtleSArIDEpKjEyIC0gcmVjdC5oZWlnaHQpIC0gKHJlY3QuaGVpZ2h0ICoga2V5KSArIFwicHhcIjtcclxuXHRcdFx0bm9kZUNsb25lLnN0eWxlLmxlZnQgPSAoa2V5ICsgMSkqMTIgKyBcInB4XCI7XHJcblx0XHRcdG5vZGVDbG9uZS5zdHlsZS5vcGFjaXR5ID0gXCIwLjZcIjtcclxuXHRcdFx0bm9kZUNsb25lLnN0eWxlLnpJbmRleCA9IGAkey1rZXkgLSAxfWA7XHJcblx0XHRcdGdob3N0LmFwcGVuZENoaWxkKG5vZGVDbG9uZSk7XHJcblx0XHR9KTtcclxuXHR9XHJcblx0Z2hvc3QuY2xhc3NOYW1lID0gXCJkaHhfZHJhZy1naG9zdFwiO1xyXG5cdHJldHVybiBnaG9zdDtcclxufVxyXG5cclxuY2xhc3MgRHJhZ01hbmFnZXIge1xyXG5cdHByaXZhdGUgX3RyYW5zZmVyRGF0YTogSVRyYW5zZmVyRGF0YSA9IHt9O1xyXG5cdHByaXZhdGUgX2Nhbk1vdmU6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuXHRwcml2YXRlIF9sYXN0SWQ6IHN0cmluZztcclxuXHRwcml2YXRlIF9sYXN0Q29sbGVjdGlvbklkOiBzdHJpbmc7XHJcblx0cHJpdmF0ZSBfc2VsZWN0ZWRJZHM6IHN0cmluZ1tdID0gW107XHJcblx0cHJpdmF0ZSBfaXRlbXNGb3JHaG9zdDogTm9kZUxpc3Q7XHJcblxyXG5cdHB1YmxpYyBzZXRJdGVtKGlkOiBJZCwgaXRlbTogYW55KSB7XHJcblx0XHRjb2xsZWN0aW9uU3RvcmUuc2V0SXRlbShpZCwgaXRlbSk7XHJcblx0fVxyXG5cdHB1YmxpYyBvbk1vdXNlRG93bihlOiBNb3VzZUV2ZW50LCBzZWxlY3RlZElkczogc3RyaW5nW10sIGl0ZW1zRm9yR2hvc3Q6IE5vZGVMaXN0KSB7IC8vIG9ubW91c2Vkb3duIG9ubHkgZm9yIHRhcmdldCBvYmplY3RzXHJcblx0XHRpZiAoZS53aGljaCAhPT0gMSkge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIHRoaXMuX29uTW91c2VNb3ZlKTtcclxuXHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIHRoaXMuX29uTW91c2VVcCk7XHJcblxyXG5cdFx0Y29uc3QgaXRlbSA9IGxvY2F0ZU5vZGUoZSwgXCJkaHhfaWRcIikgYXMgSFRNTEVsZW1lbnQ7XHJcblx0XHRjb25zdCBpZCA9IGl0ZW0gJiYgaXRlbS5nZXRBdHRyaWJ1dGUoXCJkaHhfaWRcIik7XHJcblx0XHRjb25zdCB0YXJnZXRJZCA9IGxvY2F0ZShlLCBcImRoeF93aWRnZXRfaWRcIik7XHJcblxyXG5cdFx0aWYgKHNlbGVjdGVkSWRzICYmIHNlbGVjdGVkSWRzLmluZGV4T2YoaWQpICE9PSAtIDEgJiYgc2VsZWN0ZWRJZHMubGVuZ3RoID4gMSkge1xyXG5cdFx0XHR0aGlzLl9zZWxlY3RlZElkcyA9IHNlbGVjdGVkSWRzO1xyXG5cdFx0XHR0aGlzLl9pdGVtc0Zvckdob3N0ID0gaXRlbXNGb3JHaG9zdDtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRoaXMuX3NlbGVjdGVkSWRzID0gW107XHJcblx0XHRcdHRoaXMuX2l0ZW1zRm9yR2hvc3QgPSBudWxsO1xyXG5cdFx0fVxyXG5cdFx0aWYgKGlkICYmIHRhcmdldElkKSB7XHJcblx0XHRcdGNvbnN0IHtsZWZ0LCB0b3B9ID0gZ2V0Qm94KGl0ZW0pO1xyXG5cdFx0XHR0aGlzLl90cmFuc2ZlckRhdGEuaW5pdFhPZmZzZXQgPSBlLnBhZ2VYIC0gbGVmdDtcclxuXHRcdFx0dGhpcy5fdHJhbnNmZXJEYXRhLmluaXRZT2Zmc2V0ID0gZS5wYWdlWSAtIHRvcDtcclxuXHRcdFx0dGhpcy5fdHJhbnNmZXJEYXRhLnggPSBlLnBhZ2VYO1xyXG5cdFx0XHR0aGlzLl90cmFuc2ZlckRhdGEueSA9IGUucGFnZVk7XHJcblx0XHRcdHRoaXMuX3RyYW5zZmVyRGF0YS50YXJnZXRJZCA9IHRhcmdldElkO1xyXG5cdFx0XHR0aGlzLl90cmFuc2ZlckRhdGEuaWQgPSBpZDtcclxuXHRcdFx0dGhpcy5fdHJhbnNmZXJEYXRhLml0ZW0gPSBpdGVtO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRwcml2YXRlIF9vbk1vdXNlTW92ZSA9IChlOiBNb3VzZUV2ZW50KSA9PiB7XHJcblx0XHRpZiAoIXRoaXMuX3RyYW5zZmVyRGF0YS5pZCkge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0Y29uc3Qge3BhZ2VYLCBwYWdlWX0gPSBlO1xyXG5cdFx0aWYgKCF0aGlzLl90cmFuc2ZlckRhdGEuZ2hvc3QpIHtcclxuXHRcdFx0aWYgKE1hdGguYWJzKHRoaXMuX3RyYW5zZmVyRGF0YS54IC0gcGFnZVgpIDwgMyAmJiBNYXRoLmFicyh0aGlzLl90cmFuc2ZlckRhdGEueSAtIHBhZ2VZKSA8IDMpIHtcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0Y29uc3QgZ2hvc3QgPSB0aGlzLl9vbkRyYWdTdGFydCh0aGlzLl90cmFuc2ZlckRhdGEuaWQsIHRoaXMuX3RyYW5zZmVyRGF0YS50YXJnZXRJZCk7XHJcblx0XHRcdFx0aWYgKCFnaG9zdCkge1xyXG5cdFx0XHRcdFx0dGhpcy5fZW5kRHJvcCgpO1xyXG5cdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHR0aGlzLl90cmFuc2ZlckRhdGEuZ2hvc3QgPSBnaG9zdDtcclxuXHRcdFx0XHRcdGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5fdHJhbnNmZXJEYXRhLmdob3N0KTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHRoaXMuX21vdmVHaG9zdChwYWdlWCwgcGFnZVkpO1xyXG5cdFx0dGhpcy5fb25EcmFnKGUpO1xyXG5cdH1cclxuXHRwcml2YXRlIF9vbk1vdXNlVXAgPSAoKSA9PiB7XHJcblx0XHRpZiAoIXRoaXMuX3RyYW5zZmVyRGF0YS54KSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHRcdGlmICh0aGlzLl90cmFuc2ZlckRhdGEuZ2hvc3QpIHtcclxuXHRcdFx0dGhpcy5fcmVtb3ZlR2hvc3QoKTtcclxuXHRcdFx0dGhpcy5fb25Ecm9wKCk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aGlzLl9lbmREcm9wKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0ZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCB0aGlzLl9vbk1vdXNlTW92ZSk7XHJcblx0XHRkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCB0aGlzLl9vbk1vdXNlVXApO1xyXG5cclxuXHR9XHJcblx0cHJpdmF0ZSBfbW92ZUdob3N0KHg6IG51bWJlciwgeTogbnVtYmVyKSB7XHJcblx0XHRpZiAodGhpcy5fdHJhbnNmZXJEYXRhLmdob3N0KSB7XHJcblx0XHRcdHRoaXMuX3RyYW5zZmVyRGF0YS5naG9zdC5zdHlsZS5sZWZ0ID0geCAtIHRoaXMuX3RyYW5zZmVyRGF0YS5pbml0WE9mZnNldCArIFwicHhcIjtcclxuXHRcdFx0dGhpcy5fdHJhbnNmZXJEYXRhLmdob3N0LnN0eWxlLnRvcCA9IHkgLSB0aGlzLl90cmFuc2ZlckRhdGEuaW5pdFlPZmZzZXQgKyAgXCJweFwiO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRwcml2YXRlIF9yZW1vdmVHaG9zdCgpIHtcclxuXHRcdGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQodGhpcy5fdHJhbnNmZXJEYXRhLmdob3N0KTtcclxuXHR9XHJcblx0cHJpdmF0ZSBfb25Ecm9wKCkge1xyXG5cdFx0aWYgKCF0aGlzLl9jYW5Nb3ZlKSB7XHJcblx0XHRcdHRoaXMuX2VuZERyb3AoKTtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdGNvbnN0IHRhcmdldCA9IGNvbGxlY3Rpb25TdG9yZS5nZXRJdGVtKHRoaXMuX2xhc3RDb2xsZWN0aW9uSWQpO1xyXG5cdFx0Y29uc3QgY29uZmlnID0gdGFyZ2V0ICYmIHRhcmdldC5jb25maWc7XHJcblx0XHRpZiAoIXRhcmdldCB8fCBjb25maWcuZHJhZ01vZGUgPT09IERyYWdNb2RlLnNvdXJjZSkge1xyXG5cdFx0XHR0aGlzLl9lbmREcm9wKCk7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHRcdGlmICh0YXJnZXQuZXZlbnRzLmZpcmUoRHJhZ0V2ZW50cy5iZWZvcmVEcm9wLCBbdGhpcy5fbGFzdElkLCB0aGlzLl90cmFuc2ZlckRhdGEudGFyZ2V0XSkpIHtcclxuXHRcdFx0Y29uc3QgdG8gPSB7XHJcblx0XHRcdFx0aWQ6IHRoaXMuX2xhc3RJZCxcclxuXHRcdFx0XHR0YXJnZXRcclxuXHRcdFx0fTtcclxuXHRcdFx0Y29uc3QgZnJvbSA9IHtcclxuXHRcdFx0XHRpZDogdGhpcy5fdHJhbnNmZXJEYXRhLmlkLFxyXG5cdFx0XHRcdHRhcmdldDogdGhpcy5fdHJhbnNmZXJEYXRhLnRhcmdldFxyXG5cdFx0XHR9O1xyXG5cdFx0XHR0aGlzLl9tb3ZlKGZyb20sIHRvKTtcclxuXHRcdFx0dG8udGFyZ2V0LmV2ZW50cy5maXJlKERyYWdFdmVudHMuZHJvcENvbXBsZXRlLCBbdG8uaWQsIHRoaXMuX3RyYW5zZmVyRGF0YS5kcm9wUG9zaXRpb25dKTtcclxuXHRcdH1cclxuXHRcdHRoaXMuX2VuZERyb3AoKTtcclxuXHR9XHJcblx0cHJpdmF0ZSBfb25EcmFnU3RhcnQoaWQ6IHN0cmluZywgdGFyZ2V0SWQ6IHN0cmluZykge1xyXG5cdFx0Y29uc3QgdGFyZ2V0ID0gY29sbGVjdGlvblN0b3JlLmdldEl0ZW0odGFyZ2V0SWQpO1xyXG5cdFx0Y29uc3QgY29uZmlnID0gdGFyZ2V0LmNvbmZpZztcclxuXHRcdGlmIChjb25maWcuZHJhZ01vZGUgPT09IERyYWdNb2RlLnRhcmdldCkge1xyXG5cdFx0XHRyZXR1cm4gbnVsbDtcclxuXHRcdH1cclxuXHRcdGNvbnN0IGl0ZW0gPSB0YXJnZXQuZGF0YS5nZXRJdGVtKGlkKTtcclxuXHRcdGNvbnN0IGdob3N0ID0gZHJhZ0V2ZW50Q29udGVudCh0aGlzLl90cmFuc2ZlckRhdGEuaXRlbSwgdGhpcy5faXRlbXNGb3JHaG9zdCk7XHJcblx0XHRjb25zdCBhbnMgPSB0YXJnZXQuZXZlbnRzLmZpcmUoRHJhZ0V2ZW50cy5iZWZvcmVEcmFnLCBbaXRlbSwgZ2hvc3RdKTtcclxuXHRcdGlmICghYW5zIHx8ICFpZCkge1xyXG5cdFx0XHRyZXR1cm4gbnVsbDtcclxuXHRcdH1cclxuXHRcdHRhcmdldC5ldmVudHMuZmlyZShEcmFnRXZlbnRzLmRyYWdTdGFydCwgW2lkLCB0aGlzLl9zZWxlY3RlZElkc10pO1xyXG5cdFx0dGhpcy5fdG9nZ2xlVGV4dFNlbGVjdGlvbih0cnVlKTtcclxuXHRcdHRoaXMuX3RyYW5zZmVyRGF0YS50YXJnZXQgPSB0YXJnZXQ7XHJcblx0XHR0aGlzLl90cmFuc2ZlckRhdGEuZHJhZ0NvbmZpZyA9IGNvbmZpZztcclxuXHRcdHJldHVybiBnaG9zdDtcclxuXHR9XHJcblx0cHJpdmF0ZSBfb25EcmFnKGU6IE1vdXNlRXZlbnQpIHtcclxuXHRcdGNvbnN0IHtjbGllbnRYLCBjbGllbnRZfSA9IGU7XHJcblx0XHRjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuZWxlbWVudEZyb21Qb2ludChjbGllbnRYLCBjbGllbnRZKTtcclxuXHJcblx0XHRjb25zdCBjb2xsZWN0aW9uSWQgPSBsb2NhdGUoZWxlbWVudCwgXCJkaHhfd2lkZ2V0X2lkXCIpO1xyXG5cdFx0aWYgKCFjb2xsZWN0aW9uSWQpIHtcclxuXHRcdFx0aWYgKHRoaXMuX2Nhbk1vdmUpIHtcclxuXHRcdFx0XHR0aGlzLl9jYW5jZWxDYW5Ecm9wKCk7XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdGNvbnN0IHRhcmdldCA9IGNvbGxlY3Rpb25TdG9yZS5nZXRJdGVtKGNvbGxlY3Rpb25JZCk7XHJcblx0XHRjb25zdCBpZCA9IGxvY2F0ZShlbGVtZW50LCBcImRoeF9pZFwiKTtcclxuXHJcblx0XHRpZiAoIWlkKSB7XHJcblx0XHRcdHRoaXMuX2NhbmNlbENhbkRyb3AoKTtcclxuXHRcdFx0dGhpcy5fbGFzdENvbGxlY3Rpb25JZCA9IGNvbGxlY3Rpb25JZDtcclxuXHRcdFx0dGhpcy5fbGFzdElkID0gbnVsbDtcclxuXHRcdFx0dGhpcy5fY2FuRHJvcCgpO1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cclxuXHRcdGlmICh0YXJnZXQuY29uZmlnLmRyb3BCZWhhdmlvdXIgPT09IERyb3BCZWhhdmlvdXIuY29tcGxleCkge1xyXG5cdFx0XHRjb25zdCBwb3MgPSBnZXRQb3NpdGlvbihlKTtcclxuXHRcdFx0aWYgKHBvcyA8PSAwLjI1KSB7XHJcblx0XHRcdFx0dGhpcy5fdHJhbnNmZXJEYXRhLmRyb3BQb3NpdGlvbiA9IERyb3BQb3NpdGlvbi50b3A7XHJcblx0XHRcdH0gZWxzZSBpZiAocG9zID49IDAuNzUpIHtcclxuXHRcdFx0XHR0aGlzLl90cmFuc2ZlckRhdGEuZHJvcFBvc2l0aW9uID0gRHJvcFBvc2l0aW9uLmJvdDtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR0aGlzLl90cmFuc2ZlckRhdGEuZHJvcFBvc2l0aW9uID0gRHJvcFBvc2l0aW9uLmluO1xyXG5cdFx0XHR9XHJcblx0XHR9IGVsc2UgaWYgKHRoaXMuX2xhc3RJZCA9PT0gaWQgJiYgdGhpcy5fbGFzdENvbGxlY3Rpb25JZCA9PT0gY29sbGVjdGlvbklkKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRjb25zdCBmcm9tOiBJQ29weU9iamVjdCA9IHtcclxuXHRcdFx0aWQ6IHRoaXMuX3RyYW5zZmVyRGF0YS5pZCxcclxuXHRcdFx0dGFyZ2V0OiB0aGlzLl90cmFuc2ZlckRhdGEudGFyZ2V0XHJcblx0XHR9O1xyXG5cdFx0aWYgKHRhcmdldC5jb25maWcuZHJhZ01vZGUgPT09IFwic291cmNlXCIpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cdFx0ZnJvbS50YXJnZXQuZXZlbnRzLmZpcmUoRHJhZ0V2ZW50cy5kcmFnT3V0LCBbaWQsIHRhcmdldF0pO1xyXG5cclxuXHRcdGlmIChjb2xsZWN0aW9uSWQgIT09IHRoaXMuX3RyYW5zZmVyRGF0YS50YXJnZXRJZCB8fCAhaXNUcmVlQ29sbGVjdGlvbihmcm9tLnRhcmdldC5kYXRhKSB8fFxyXG5cdFx0XHQoaXNUcmVlQ29sbGVjdGlvbihmcm9tLnRhcmdldC5kYXRhKSAmJiBmcm9tLnRhcmdldC5kYXRhLmNhbkNvcHkoZnJvbS5pZCwgaWQpKSkge1xyXG5cdFx0XHR0aGlzLl9jYW5jZWxDYW5Ecm9wKCk7IC8vIGNsZWFyIGxhc3RcclxuXHRcdFx0dGhpcy5fbGFzdElkID0gaWQ7XHJcblx0XHRcdHRoaXMuX2xhc3RDb2xsZWN0aW9uSWQgPSBjb2xsZWN0aW9uSWQ7XHJcblx0XHRcdGNvbnN0IGNhbk1vdmUgPSBmcm9tLnRhcmdldC5ldmVudHMuZmlyZShEcmFnRXZlbnRzLmRyYWdJbiwgW2lkLCB0aGlzLl90cmFuc2ZlckRhdGEuZHJvcFBvc2l0aW9uLCBjb2xsZWN0aW9uU3RvcmUuZ2V0SXRlbShjb2xsZWN0aW9uSWQpXSk7XHJcblx0XHRcdGlmIChjYW5Nb3ZlKSB7XHJcblx0XHRcdFx0dGhpcy5fY2FuRHJvcCgpO1xyXG5cdFx0XHR9XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aGlzLl9jYW5jZWxDYW5Ecm9wKCk7XHJcblx0XHR9XHJcblx0fVxyXG5cdHByaXZhdGUgX21vdmUoZnJvbTogSUNvcHlPYmplY3QsIHRvOiBJQ29weU9iamVjdCk6IHZvaWQge1xyXG5cdFx0Y29uc3QgZnJvbURhdGEgPSBmcm9tLnRhcmdldC5kYXRhO1xyXG5cdFx0Y29uc3QgdG9EYXRhID0gdG8udGFyZ2V0LmRhdGE7XHJcblx0XHRsZXQgaW5kZXggPSAwO1xyXG5cdFx0bGV0IHRhcmdldElkID0gdG8uaWQ7XHJcblx0XHRjb25zdCBiZWhhdmlvdXIgPSBpc1RyZWVDb2xsZWN0aW9uKHRvRGF0YSkgPyB0by50YXJnZXQuY29uZmlnLmRyb3BCZWhhdmlvdXIgOiB1bmRlZmluZWQ7XHJcblxyXG5cdFx0c3dpdGNoKGJlaGF2aW91cikge1xyXG5cdFx0XHRjYXNlIERyb3BCZWhhdmlvdXIuY2hpbGQ6XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdGNhc2UgRHJvcEJlaGF2aW91ci5zaWJsaW5nOlxyXG5cdFx0XHRcdHRhcmdldElkID0gKHRvRGF0YSBhcyBUcmVlQ29sbGVjdGlvbikuZ2V0UGFyZW50KHRhcmdldElkKTtcclxuXHRcdFx0XHRpbmRleCA9IHRvRGF0YS5nZXRJbmRleCh0by5pZCkgKyAxO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlIERyb3BCZWhhdmlvdXIuY29tcGxleDpcclxuXHRcdFx0XHRjb25zdCBkcm9wUG9zaXRpb24gPSB0aGlzLl90cmFuc2ZlckRhdGEuZHJvcFBvc2l0aW9uO1xyXG5cdFx0XHRcdGlmIChkcm9wUG9zaXRpb24gPT09IERyb3BQb3NpdGlvbi50b3ApIHtcclxuXHRcdFx0XHRcdHRhcmdldElkID0gKHRvRGF0YSBhcyBUcmVlQ29sbGVjdGlvbikuZ2V0UGFyZW50KHRhcmdldElkKTtcclxuXHRcdFx0XHRcdGluZGV4ID0gdG9EYXRhLmdldEluZGV4KHRvLmlkKTtcclxuXHRcdFx0XHR9IGVsc2UgaWYgKGRyb3BQb3NpdGlvbiA9PT0gRHJvcFBvc2l0aW9uLmJvdCkge1xyXG5cdFx0XHRcdFx0dGFyZ2V0SWQgPSAodG9EYXRhIGFzIFRyZWVDb2xsZWN0aW9uKS5nZXRQYXJlbnQodGFyZ2V0SWQpO1xyXG5cdFx0XHRcdFx0aW5kZXggPSB0b0RhdGEuZ2V0SW5kZXgodG8uaWQpICsgMTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdGRlZmF1bHQ6XHJcblx0XHRcdFx0Ly8gbGlzdCBtb3ZlXHJcblx0XHRcdFx0aWYgKCF0by5pZCkge1xyXG5cdFx0XHRcdFx0aW5kZXggPSAtMTtcclxuXHRcdFx0XHR9IGVsc2UgaWYgKGZyb20udGFyZ2V0ID09PSB0by50YXJnZXQgJiYgdG9EYXRhLmdldEluZGV4KGZyb20uaWQpIDwgdG9EYXRhLmdldEluZGV4KHRvLmlkKSkge1xyXG5cdFx0XHRcdFx0aW5kZXggPSB0b0RhdGEuZ2V0SW5kZXgodG8uaWQpIC0gMTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0aW5kZXggPSB0b0RhdGEuZ2V0SW5kZXgodG8uaWQpO1xyXG5cdFx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRpZiAodGhpcy5fdHJhbnNmZXJEYXRhLmRyYWdDb25maWcuZHJhZ0NvcHkpIHtcclxuXHRcdFx0aWYgKHRoaXMuX3NlbGVjdGVkSWRzIGluc3RhbmNlb2YgQXJyYXkgJiYgdGhpcy5fc2VsZWN0ZWRJZHMubGVuZ3RoID4gMSkge1xyXG5cdFx0XHRcdHRoaXMuX3NlbGVjdGVkSWRzLm1hcChzZWxjdGVkSWQgPT4ge1xyXG5cdFx0XHRcdFx0ZnJvbURhdGEuY29weShzZWxjdGVkSWQsIGluZGV4LCB0b0RhdGEsIHRhcmdldElkKTtcclxuXHRcdFx0XHRcdGlmIChpbmRleCA+IC0xKSB7XHJcblx0XHRcdFx0XHRcdGluZGV4Kys7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0ZnJvbURhdGEuY29weShmcm9tLmlkLCBpbmRleCwgdG9EYXRhLCB0YXJnZXRJZCk7XHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGlmICh0aGlzLl9zZWxlY3RlZElkcyBpbnN0YW5jZW9mIEFycmF5ICYmIHRoaXMuX3NlbGVjdGVkSWRzLmxlbmd0aCA+IDEpIHtcclxuXHRcdFx0XHR0aGlzLl9zZWxlY3RlZElkcy5tYXAoc2VsY3RlZElkID0+IHtcclxuXHRcdFx0XHRcdChmcm9tRGF0YSBhcyBhbnkpLm1vdmUoc2VsY3RlZElkLCBpbmRleCwgdG9EYXRhLCB0YXJnZXRJZCk7XHJcblx0XHRcdFx0XHRpZiAoaW5kZXggPiAtMSkge1xyXG5cdFx0XHRcdFx0XHRpbmRleCsrO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdChmcm9tRGF0YSBhcyBhbnkpLm1vdmUoZnJvbS5pZCwgaW5kZXgsIHRvRGF0YSwgdGFyZ2V0SWQpOyAvLyB0eXBlc2NyaXB0IGJ1Zz8/XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblx0cHJpdmF0ZSBfZW5kRHJvcCgpIHtcclxuXHRcdHRoaXMuX3RvZ2dsZVRleHRTZWxlY3Rpb24oZmFsc2UpO1xyXG5cdFx0aWYgKHRoaXMuX3RyYW5zZmVyRGF0YS50YXJnZXQpIHtcclxuXHRcdFx0dGhpcy5fdHJhbnNmZXJEYXRhLnRhcmdldC5ldmVudHMuZmlyZShEcmFnRXZlbnRzLmRyYWdFbmQsIFt0aGlzLl90cmFuc2ZlckRhdGEuaWQsIHRoaXMuX3NlbGVjdGVkSWRzXSk7XHJcblx0XHR9XHJcblx0XHR0aGlzLl9jYW5jZWxDYW5Ecm9wKCk7XHJcblx0XHR0aGlzLl9jYW5Nb3ZlID0gdHJ1ZTtcclxuXHRcdHRoaXMuX3RyYW5zZmVyRGF0YSA9IHt9O1xyXG5cdFx0dGhpcy5fbGFzdElkID0gbnVsbDtcclxuXHRcdHRoaXMuX2xhc3RDb2xsZWN0aW9uSWQgPSBudWxsO1xyXG5cdH1cclxuXHRwcml2YXRlIF9jYW5jZWxDYW5Ecm9wKCkge1xyXG5cdFx0dGhpcy5fY2FuTW92ZSA9IGZhbHNlO1xyXG5cdFx0Y29uc3QgY29sbGVjdGlvbiA9IGNvbGxlY3Rpb25TdG9yZS5nZXRJdGVtKHRoaXMuX2xhc3RDb2xsZWN0aW9uSWQpO1xyXG5cdFx0aWYgKGNvbGxlY3Rpb24gJiYgdGhpcy5fbGFzdElkKSB7XHJcblx0XHRcdGNvbGxlY3Rpb24uZXZlbnRzLmZpcmUoRHJhZ0V2ZW50cy5jYW5jZWxEcm9wLCBbdGhpcy5fbGFzdElkXSk7XHJcblx0XHR9XHJcblx0XHR0aGlzLl9sYXN0Q29sbGVjdGlvbklkID0gbnVsbDtcclxuXHRcdHRoaXMuX2xhc3RJZCA9IG51bGw7XHJcblx0fVxyXG5cdHByaXZhdGUgX2NhbkRyb3AoKSB7XHJcblx0XHR0aGlzLl9jYW5Nb3ZlID0gdHJ1ZTtcclxuXHJcblx0XHRjb25zdCB0YXJnZXQgPSBjb2xsZWN0aW9uU3RvcmUuZ2V0SXRlbSh0aGlzLl9sYXN0Q29sbGVjdGlvbklkKTtcclxuXHRcdGlmICh0YXJnZXQgJiYgdGhpcy5fbGFzdElkKSB7XHJcblx0XHRcdHRhcmdldC5ldmVudHMuZmlyZShEcmFnRXZlbnRzLmNhbkRyb3AsIFt0aGlzLl9sYXN0SWQsIHRoaXMuX3RyYW5zZmVyRGF0YS5kcm9wUG9zaXRpb25dKTtcclxuXHRcdH1cclxuXHR9XHJcblx0cHJpdmF0ZSBfdG9nZ2xlVGV4dFNlbGVjdGlvbihhZGQ6IGJvb2xlYW4pIHtcclxuXHRcdGlmIChhZGQpIHtcclxuXHRcdFx0ZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKFwiZGh4X25vLXNlbGVjdFwiKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZShcImRoeF9uby1zZWxlY3RcIik7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5jb25zdCBkaHggPSAod2luZG93IGFzIGFueSkuZGh4SGVscGVycyA9ICh3aW5kb3cgYXMgYW55KS5kaHhIZWxwZXJzIHx8IHt9O1xyXG5kaHguZHJhZ01hbmFnZXIgPSBkaHguZHJhZ01hbmFnZXIgfHwgbmV3IERyYWdNYW5hZ2VyKCk7XHJcbmV4cG9ydCBjb25zdCBkcmFnTWFuYWdlciA9IGRoeC5kcmFnTWFuYWdlcjsiLCJpbXBvcnQgeyBFdmVudFN5c3RlbSwgSUV2ZW50U3lzdGVtIH0gZnJvbSBcIkBkaHgvdHMtY29tbW9uL2V2ZW50c1wiO1xyXG5cclxuaW1wb3J0IHsgTG9hZGVyIH0gZnJvbSBcIi4vZGF0YWNvbGxlY3Rpb24vbG9hZGVyXCI7XHJcbmltcG9ydCB7IFNvcnQgfSBmcm9tIFwiLi9kYXRhY29sbGVjdGlvbi9zb3J0XCI7XHJcbmltcG9ydCB7IERhdGFQcm94eSB9IGZyb20gXCIuL2RhdGFwcm94eVwiO1xyXG5pbXBvcnQgeyBkaHhFcnJvciwgZGh4V2FybmluZywgZmluZEJ5Q29uZiwgaXNEZWJ1ZywgaXNFcXVhbE9iaiwgY29weVdpdGhvdXRJbm5lciwgdG9EYXRhRHJpdmVyIH0gZnJvbSBcIi4vaGVscGVyc1wiO1xyXG5pbXBvcnQge1xyXG5cdERhdGFDYWxsYmFjaywgRGF0YUV2ZW50cywgSWQsIElEYXRhQ2hhbmdlU3RhY2ssIElEYXRhQ29sbGVjdGlvbiwgSURhdGFJdGVtLFxyXG5cdElEYXRhUHJveHksIElGaWx0ZXJDYWxsYmFjaywgSUZpbHRlckNvbmZpZywgSUZpbHRlck1vZGUsIElTb3J0TW9kZSwgSVRyZWVDb2xsZWN0aW9uLCBJVXBkYXRlT2JqZWN0LCBSZWR1Y2VDYWxsQmFjaywgU3RhdHVzZXMsIElEYXRhRXZlbnRzSGFuZGxlcnNNYXAsIERhdGFEcml2ZXIsXHJcbn0gZnJvbSBcIi4vdHlwZXNcIjtcclxuXHJcbmltcG9ydCB7IGNvcHksIGV4dGVuZCwgZmluZEluZGV4LCB1aWQgfSBmcm9tIFwiQGRoeC90cy1jb21tb24vY29yZVwiO1xyXG5pbXBvcnQgeyBUcmVlQ29sbGVjdGlvbiB9IGZyb20gXCIuL3RyZWVjb2xsZWN0aW9uXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgRGF0YUNvbGxlY3Rpb248VCBleHRlbmRzIElEYXRhSXRlbSA9IElEYXRhSXRlbT4gaW1wbGVtZW50cyBJRGF0YUNvbGxlY3Rpb248VD4ge1xyXG5cdHB1YmxpYyBsb2FkRGF0YTogUHJvbWlzZTxhbnk+O1xyXG5cdHB1YmxpYyBzYXZlRGF0YTogUHJvbWlzZTxhbnk+O1xyXG5cdHB1YmxpYyBjb25maWc6IGFueTsgLy8gW1RPRE9dIGFkZCB0eXBpbmdzXHJcblx0cHVibGljIGV2ZW50czogSUV2ZW50U3lzdGVtPERhdGFFdmVudHMsIElEYXRhRXZlbnRzSGFuZGxlcnNNYXA+O1xyXG5cclxuXHRwcm90ZWN0ZWQgX29yZGVyOiBUW107XHJcblx0cHJvdGVjdGVkIF9wdWxsOiB7IFtpZDogc3RyaW5nXTogVCB9O1xyXG5cdHByb3RlY3RlZCBfc29ydDogU29ydDtcclxuXHRwcm90ZWN0ZWQgX2ZpbHRlcnM6YW55O1xyXG5cclxuXHRwcml2YXRlIF9jaGFuZ2VzOiBJRGF0YUNoYW5nZVN0YWNrO1xyXG5cclxuXHRwcml2YXRlIF9pbml0T3JkZXI6IFRbXTtcclxuXHJcblx0cHJpdmF0ZSBfbG9hZGVyOiBMb2FkZXI7XHJcblxyXG5cdGNvbnN0cnVjdG9yKGNvbmZpZz86IGFueSwgZXZlbnRzPzpJRXZlbnRTeXN0ZW08YW55Pikge1xyXG5cdFx0dGhpcy5jb25maWcgPSBjb25maWcgfHwge307XHJcblxyXG5cdFx0dGhpcy5fb3JkZXIgPSBbXTtcclxuXHRcdHRoaXMuX3B1bGwgPSB7fTtcclxuXHRcdHRoaXMuX2NoYW5nZXMgPSB7b3JkZXI6IFtdfTtcclxuXHRcdHRoaXMuX2luaXRPcmRlciA9IG51bGw7XHJcblxyXG5cdFx0dGhpcy5fc29ydCA9IG5ldyBTb3J0KCk7XHJcblx0XHR0aGlzLl9sb2FkZXIgPSBuZXcgTG9hZGVyKHRoaXMsIHRoaXMuX2NoYW5nZXMpO1xyXG5cdFx0dGhpcy5ldmVudHMgPSBldmVudHMgfHwgbmV3IEV2ZW50U3lzdGVtPGFueT4odGhpcyk7XHJcblx0XHR0aGlzLmV2ZW50cy5vbihEYXRhRXZlbnRzLmxvYWRFcnJvciwgKHJlc3BvbnNlKSA9PiB7XHJcblx0XHRcdGlmICh0eXBlb2YgcmVzcG9uc2UgIT09IFwic3RyaW5nXCIpIHtcclxuXHRcdFx0XHRkaHhFcnJvcihyZXNwb25zZSk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0ZGh4V2FybmluZyhyZXNwb25zZSk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH1cclxuXHRhZGQob2JqOiBJRGF0YUl0ZW0sIGluZGV4PzogbnVtYmVyKTogSWQ7XHJcblx0YWRkKG9iajogSURhdGFJdGVtW10sIGluZGV4PzogbnVtYmVyKTogSWRbXTtcclxuXHRhZGQob2JqOiBJRGF0YUl0ZW0gfCBJRGF0YUl0ZW1bXSwgaW5kZXg/OiBudW1iZXIpOiBJZCB8IElkW10ge1xyXG5cdFx0aWYgKCF0aGlzLmV2ZW50cy5maXJlKERhdGFFdmVudHMuYmVmb3JlQWRkLCBbb2JqXSkpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cdFx0aWYgKEFycmF5LmlzQXJyYXkob2JqKSkge1xyXG5cdFx0XHRyZXR1cm4gb2JqLm1hcCgoZWxlbWVudCwga2V5KSA9PiB7XHJcblx0XHRcdFx0aWYgKGtleSAhPT0gMCkge1xyXG5cdFx0XHRcdFx0aW5kZXggPSBpbmRleCArIDE7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGNvbnN0IGlkID0gdGhpcy5fYWRkQ29yZShlbGVtZW50LCBpbmRleCk7XHJcblx0XHRcdFx0dGhpcy5fb25DaGFuZ2UoXCJhZGRcIiwgZWxlbWVudC5pZCwgZWxlbWVudCk7XHJcblx0XHRcdFx0dGhpcy5ldmVudHMuZmlyZShEYXRhRXZlbnRzLmFmdGVyQWRkLCBbZWxlbWVudF0pO1xyXG5cdFx0XHRcdHJldHVybiBpZDtcclxuXHRcdFx0fSk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRjb25zdCBpZCA9IHRoaXMuX2FkZENvcmUob2JqLCBpbmRleCk7XHJcblx0XHRcdHRoaXMuX29uQ2hhbmdlKFwiYWRkXCIsIG9iai5pZCwgb2JqKTtcclxuXHRcdFx0dGhpcy5ldmVudHMuZmlyZShEYXRhRXZlbnRzLmFmdGVyQWRkLCBbb2JqXSk7XHJcblx0XHRcdHJldHVybiBpZDtcclxuXHRcdH1cclxuXHR9XHJcblx0cmVtb3ZlKGlkOiBJZCB8IElkW10pOiB2b2lkIHtcclxuXHRcdGlmIChpZCkge1xyXG5cdFx0XHRpZiAoaWQgaW5zdGFuY2VvZiBBcnJheSkge1xyXG5cdFx0XHRcdGlkLm1hcChlbGVtZW50ID0+IHtcclxuXHRcdFx0XHRcdGNvbnN0IG9iaiA9IHRoaXMuX3B1bGxbZWxlbWVudF07XHJcblx0XHRcdFx0XHRpZiAob2JqKSB7XHJcblx0XHRcdFx0XHRcdGlmICghdGhpcy5ldmVudHMuZmlyZShEYXRhRXZlbnRzLmJlZm9yZVJlbW92ZSwgW29ial0pKSB7XHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdHRoaXMuX3JlbW92ZUNvcmUob2JqLmlkKTtcclxuXHRcdFx0XHRcdFx0dGhpcy5fb25DaGFuZ2UoXCJyZW1vdmVcIiwgZWxlbWVudCwgb2JqKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdHRoaXMuZXZlbnRzLmZpcmUoRGF0YUV2ZW50cy5hZnRlclJlbW92ZSwgW29ial0pO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdGNvbnN0IG9iaiA9IHRoaXMuX3B1bGxbaWRdO1xyXG5cdFx0XHRcdGlmIChvYmopIHtcclxuXHRcdFx0XHRcdGlmICghdGhpcy5ldmVudHMuZmlyZShEYXRhRXZlbnRzLmJlZm9yZVJlbW92ZSwgW29ial0pKSB7XHJcblx0XHRcdFx0XHRcdHJldHVybjtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdHRoaXMuX3JlbW92ZUNvcmUob2JqLmlkKTtcclxuXHRcdFx0XHRcdHRoaXMuX29uQ2hhbmdlKFwicmVtb3ZlXCIsIGlkLCBvYmopO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHR0aGlzLmV2ZW50cy5maXJlKERhdGFFdmVudHMuYWZ0ZXJSZW1vdmUsIFtvYmpdKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHRyZW1vdmVBbGwoKTogdm9pZCB7XHJcblx0XHR0aGlzLl9yZW1vdmVBbGwoKTtcclxuXHRcdHRoaXMuZXZlbnRzLmZpcmUoRGF0YUV2ZW50cy5yZW1vdmVBbGwpO1xyXG5cdFx0dGhpcy5ldmVudHMuZmlyZShEYXRhRXZlbnRzLmNoYW5nZSk7XHJcblx0fVxyXG5cdGV4aXN0cyhpZDogSWQpOiBib29sZWFuIHtcclxuXHRcdHJldHVybiAhIXRoaXMuX3B1bGxbaWRdO1xyXG5cdH1cclxuXHRnZXROZWFySWQoaWQ6IHN0cmluZyl7XHJcblx0XHRjb25zdCBpdGVtID0gdGhpcy5fcHVsbFtpZF07XHJcblx0XHRpZiAoIWl0ZW0pIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuX29yZGVyWzBdLmlkIHx8IFwiXCI7XHJcblx0XHR9XHJcblx0fVxyXG5cdGdldEl0ZW0oaWQ6IElkKTogVCB7XHJcblx0XHRyZXR1cm4gdGhpcy5fcHVsbFtpZF07XHJcblx0fVxyXG5cdHVwZGF0ZShpZDogSWQsIG9iajogSVVwZGF0ZU9iamVjdCwgc2lsZW50Pzpib29sZWFuKSB7XHJcblx0XHRjb25zdCBpdGVtID0gdGhpcy5nZXRJdGVtKGlkKTtcclxuXHRcdGlmIChpdGVtKSB7XHJcblx0XHRcdGlmIChpc0VxdWFsT2JqKG9iaiwgaXRlbSkpIHtcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChvYmouaWQgJiYgaWQgIT09IG9iai5pZCkge1xyXG5cdFx0XHRcdGRoeFdhcm5pbmcoXCJ0aGlzIG1ldGhvZCBkb2Vzbid0IGFsbG93IGNoYW5nZSBpZFwiKTtcclxuXHRcdFx0XHRpZiAoaXNEZWJ1ZygpKSB7XHJcblx0XHRcdFx0XHQvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tZGVidWdnZXJcclxuXHRcdFx0XHRcdGRlYnVnZ2VyO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRleHRlbmQodGhpcy5fcHVsbFtpZF0sIG9iaiwgZmFsc2UpO1xyXG5cdFx0XHRcdGlmICh0aGlzLmNvbmZpZy51cGRhdGUpe1xyXG5cdFx0XHRcdFx0dGhpcy5jb25maWcudXBkYXRlKHRoaXMuX3B1bGxbaWRdKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0aWYgKCFzaWxlbnQpe1xyXG5cdFx0XHRcdFx0dGhpcy5fb25DaGFuZ2UoXCJ1cGRhdGVcIiwgaWQsIHRoaXMuX3B1bGxbaWRdKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGRoeFdhcm5pbmcoXCJpdGVtIG5vdCBmb3VuZFwiKTtcclxuXHRcdH1cclxuXHR9XHJcblx0Z2V0SW5kZXgoaWQ6IElkKTogbnVtYmVyIHtcclxuXHRcdGNvbnN0IHJlcyA9IGZpbmRJbmRleCh0aGlzLl9vcmRlciwgaXRlbSA9PiBpdGVtLmlkID09PSBpZCk7XHJcblx0XHRpZiAodGhpcy5fcHVsbFtpZF0gJiYgcmVzID49IDApIHtcclxuXHRcdFx0cmV0dXJuIHJlcztcclxuXHRcdH1cclxuXHRcdHJldHVybiAtMTtcclxuXHR9XHJcblx0Z2V0SWQoaW5kZXg6IG51bWJlcik6IElkIHtcclxuXHRcdGlmICghdGhpcy5fb3JkZXJbaW5kZXhdKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHRcdHJldHVybiB0aGlzLl9vcmRlcltpbmRleF0uaWQ7XHJcblx0fVxyXG5cdGdldExlbmd0aCgpIHtcclxuXHRcdHJldHVybiB0aGlzLl9vcmRlci5sZW5ndGg7XHJcblx0fVxyXG5cdGZpbHRlcihydWxlPzogSUZpbHRlck1vZGUgfCBJRmlsdGVyQ2FsbGJhY2ssIGNvbmZpZz86SUZpbHRlckNvbmZpZykge1xyXG5cdFx0Y29uZmlnID0gZXh0ZW5kKHtcclxuXHRcdFx0YWRkOmZhbHNlLFxyXG5cdFx0XHRtdWx0aXBsZTp0cnVlXHJcblx0XHR9LCBjb25maWcpO1xyXG5cclxuXHRcdGlmICghY29uZmlnLmFkZCkge1xyXG5cdFx0XHR0aGlzLl9vcmRlciA9IHRoaXMuX2luaXRPcmRlciB8fCB0aGlzLl9vcmRlcjtcclxuXHRcdFx0dGhpcy5faW5pdE9yZGVyID0gbnVsbDtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLl9maWx0ZXJzID0gdGhpcy5fZmlsdGVycyB8fCB7fTtcclxuXHJcblx0XHRpZiAoIWNvbmZpZy5tdWx0aXBsZSB8fCAhcnVsZSkge1xyXG5cdFx0XHR0aGlzLl9maWx0ZXJzID0ge307XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHJ1bGUpIHtcclxuXHRcdFx0aWYgKHR5cGVvZiBydWxlID09PSBcImZ1bmN0aW9uXCIpIHtcclxuXHRcdFx0XHRjb25zdCBmID0gXCJfXCI7XHJcblx0XHRcdFx0dGhpcy5fZmlsdGVyc1tmXSA9IHtcclxuXHRcdFx0XHRcdG1hdGNoOmYsXHJcblx0XHRcdFx0XHRjb21wYXJlOnJ1bGVcclxuXHRcdFx0XHR9O1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdGlmICghcnVsZS5tYXRjaCkge1xyXG5cdFx0XHRcdFx0ZGVsZXRlIHRoaXMuX2ZpbHRlcnNbcnVsZS5ieV07XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdHJ1bGUuY29tcGFyZSA9IHJ1bGUuY29tcGFyZSB8fCAoKHZhbCwgbWF0Y2gpID0+IHZhbCA9PT0gbWF0Y2gpO1xyXG5cdFx0XHRcdFx0dGhpcy5fZmlsdGVyc1tydWxlLmJ5XSA9IHJ1bGU7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR0aGlzLl9hcHBseUZpbHRlcnMoKTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLmV2ZW50cy5maXJlKERhdGFFdmVudHMuY2hhbmdlKTtcclxuXHR9XHJcblx0ZmluZChjb25mOiBJRmlsdGVyTW9kZSB8IERhdGFDYWxsYmFjazxUPik6IGFueSB7XHJcblx0XHRmb3IgKGNvbnN0IGtleSBpbiB0aGlzLl9wdWxsKSB7XHJcblx0XHRcdGNvbnN0IHJlcyA9IGZpbmRCeUNvbmYodGhpcy5fcHVsbFtrZXldLCBjb25mKTtcclxuXHRcdFx0aWYocmVzKXtcclxuXHRcdFx0XHRyZXR1cm4gcmVzO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gbnVsbDtcclxuXHR9XHJcblx0ZmluZEFsbChjb25mOiBJRmlsdGVyTW9kZSB8IERhdGFDYWxsYmFjazxUPik6IGFueVtdIHtcclxuXHRcdGNvbnN0IHJlcyA9IFtdO1xyXG5cdFx0Zm9yIChjb25zdCBrZXkgaW4gdGhpcy5fcHVsbCkge1xyXG5cdFx0XHRjb25zdCBpdGVtID0gZmluZEJ5Q29uZih0aGlzLl9wdWxsW2tleV0sIGNvbmYpO1xyXG5cdFx0XHRpZiAoaXRlbSkge1xyXG5cdFx0XHRcdHJlcy5wdXNoKGl0ZW0pO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gcmVzO1xyXG5cdH1cclxuXHRzb3J0KGJ5PzogSVNvcnRNb2RlKTogdm9pZCB7XHJcblx0XHRpZiAoIWJ5KSB7XHJcblx0XHRcdHRoaXMuX29yZGVyID0gW107XHJcblx0XHRcdGZvciAoY29uc3Qga2V5IGluIHRoaXMuX3B1bGwpIHtcclxuXHRcdFx0XHR0aGlzLl9vcmRlci5wdXNoKHRoaXMuX3B1bGxba2V5XSk7XHJcblx0XHRcdH1cclxuXHRcdFx0dGhpcy5fYXBwbHlGaWx0ZXJzKCk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aGlzLl9zb3J0LnNvcnQodGhpcy5fb3JkZXIsIGJ5KTtcclxuXHJcblx0XHRcdGlmICh0aGlzLl9pbml0T3JkZXIgJiYgdGhpcy5faW5pdE9yZGVyLmxlbmd0aCkge1xyXG5cdFx0XHRcdHRoaXMuX3NvcnQuc29ydCh0aGlzLl9pbml0T3JkZXIsIGJ5KTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuZXZlbnRzLmZpcmUoRGF0YUV2ZW50cy5jaGFuZ2UpO1xyXG5cdH1cclxuXHRjb3B5KGlkOiBJZCB8IElkW10sIGluZGV4OiBudW1iZXIsIHRhcmdldD86IElEYXRhQ29sbGVjdGlvbiB8IElUcmVlQ29sbGVjdGlvbiwgdGFyZ2V0SWQ/OiBJZCk6IElkIHwgSWRbXSB7XHJcblx0XHRpZiAoaWQgaW5zdGFuY2VvZiBBcnJheSkge1xyXG5cdFx0XHRyZXR1cm4gaWQubWFwKChlbGVtZW50SWQsIGtleSkgPT4ge1xyXG5cdFx0XHRcdGlmICghdGhpcy5leGlzdHMoZWxlbWVudElkKSkge1xyXG5cdFx0XHRcdFx0cmV0dXJuIG51bGw7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGNvbnN0IG5ld2lkID0gdWlkKCk7XHJcblx0XHRcdFx0Y29uc3QgZWxlbWVudEluZGV4ID0gaW5kZXggPT09IC0xID8gLTEgOiBpbmRleCArIGtleTtcclxuXHRcdFx0XHRpZiAodGFyZ2V0KSB7XHJcblx0XHRcdFx0XHRpZiAoISh0YXJnZXQgaW5zdGFuY2VvZiBEYXRhQ29sbGVjdGlvbikgJiYgdGFyZ2V0SWQpIHtcclxuXHRcdFx0XHRcdFx0dGFyZ2V0LmFkZChjb3B5V2l0aG91dElubmVyKHRoaXMuZ2V0SXRlbShlbGVtZW50SWQpKSwgZWxlbWVudEluZGV4KTtcclxuXHRcdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0aWYgKHRhcmdldC5leGlzdHMoZWxlbWVudElkKSkge1xyXG5cdFx0XHRcdFx0XHR0YXJnZXQuYWRkKHsuLi5jb3B5V2l0aG91dElubmVyKHRoaXMuZ2V0SXRlbShlbGVtZW50SWQpKSwgaWQ6IG5ld2lkIH0sIGVsZW1lbnRJbmRleCk7XHJcblx0XHRcdFx0XHRcdHJldHVybiBuZXdpZDtcclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdHRhcmdldC5hZGQoY29weVdpdGhvdXRJbm5lcih0aGlzLmdldEl0ZW0oZWxlbWVudElkKSksIGVsZW1lbnRJbmRleCk7XHJcblx0XHRcdFx0XHRcdHJldHVybiBlbGVtZW50SWQ7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHRoaXMuYWRkKHsgLi4uY29weVdpdGhvdXRJbm5lcih0aGlzLmdldEl0ZW0oZWxlbWVudElkKSksIGlkOiBuZXdpZCB9LCBlbGVtZW50SW5kZXgpO1xyXG5cdFx0XHRcdHJldHVybiBuZXdpZDtcclxuXHRcdFx0fSk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRpZiAoIXRoaXMuZXhpc3RzKGlkKSkge1xyXG5cdFx0XHRcdHJldHVybiBudWxsO1xyXG5cdFx0XHR9XHJcblx0XHRcdGNvbnN0IG5ld2lkID0gdWlkKCk7XHJcblx0XHRcdGlmICh0YXJnZXQpIHtcclxuXHRcdFx0XHRpZiAoISh0YXJnZXQgaW5zdGFuY2VvZiBEYXRhQ29sbGVjdGlvbikgJiYgdGFyZ2V0SWQpIHtcclxuXHRcdFx0XHRcdHRhcmdldC5hZGQoY29weVdpdGhvdXRJbm5lcih0aGlzLmdldEl0ZW0oaWQpKSwgaW5kZXgpO1xyXG5cdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRpZiAodGFyZ2V0LmV4aXN0cyhpZCkpIHtcclxuXHRcdFx0XHRcdHRhcmdldC5hZGQoey4uLmNvcHlXaXRob3V0SW5uZXIodGhpcy5nZXRJdGVtKGlkKSksIGlkOiBuZXdpZCB9LCBpbmRleCk7XHJcblx0XHRcdFx0XHRyZXR1cm4gbmV3aWQ7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdHRhcmdldC5hZGQoY29weVdpdGhvdXRJbm5lcih0aGlzLmdldEl0ZW0oaWQpKSwgaW5kZXgpO1xyXG5cdFx0XHRcdFx0cmV0dXJuIGlkO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0XHR0aGlzLmFkZCh7IC4uLmNvcHlXaXRob3V0SW5uZXIodGhpcy5nZXRJdGVtKGlkKSksIGlkOiBuZXdpZCB9LCBpbmRleCk7XHJcblx0XHRcdHJldHVybiBuZXdpZDtcclxuXHRcdH1cclxuXHR9XHJcblx0bW92ZShpZDogSWQgfCBJZFtdLCBpbmRleCwgdGFyZ2V0PzogRGF0YUNvbGxlY3Rpb24gfCBUcmVlQ29sbGVjdGlvbiwgdGFyZ2V0SWQ/OiBJZCk6IElkIHwgSWRbXSB7XHJcblx0XHRpZiAoaWQgaW5zdGFuY2VvZiBBcnJheSkge1xyXG5cdFx0XHRyZXR1cm4gaWQubWFwKChlbGVtZW50SWQsIGtleSkgPT4ge1xyXG5cdFx0XHRcdGNvbnN0IGVsZW1lbnRJbmRleCA9IGluZGV4ID09PSAtMSA/IC0xIDogaW5kZXggKyBrZXk7XHJcblx0XHRcdFx0aWYgKHRhcmdldCAmJiB0YXJnZXQgIT09IHRoaXMgJiYgdGhpcy5leGlzdHMoZWxlbWVudElkKSkge1xyXG5cdFx0XHRcdFx0Y29uc3QgaXRlbSA9IGNvcHkodGhpcy5nZXRJdGVtKGVsZW1lbnRJZCksIHRydWUpO1xyXG5cdFx0XHRcdFx0aWYgKHRhcmdldC5leGlzdHMoZWxlbWVudElkKSkge1xyXG5cdFx0XHRcdFx0XHRpdGVtLmlkID0gdWlkKCk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRpZiAodGFyZ2V0SWQpIHtcclxuXHRcdFx0XHRcdFx0aXRlbS5wYXJlbnQgPSB0YXJnZXRJZDtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdHRhcmdldC5hZGQoaXRlbSwgZWxlbWVudEluZGV4KTtcclxuXHJcblx0XHRcdFx0XHR0aGlzLnJlbW92ZShlbGVtZW50SWQpO1xyXG5cdFx0XHRcdFx0cmV0dXJuIGl0ZW0uaWQ7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGlmICh0aGlzLmdldEluZGV4KGVsZW1lbnRJZCkgPT09IGVsZW1lbnRJbmRleCkge1xyXG5cdFx0XHRcdFx0cmV0dXJuIG51bGw7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRjb25zdCBzcGxpY2VkID0gdGhpcy5fb3JkZXIuc3BsaWNlKHRoaXMuZ2V0SW5kZXgoZWxlbWVudElkKSwgMSlbMF07XHJcblx0XHRcdFx0aWYgKGluZGV4ID09PSAtMSkge1xyXG5cdFx0XHRcdFx0aW5kZXggPSB0aGlzLl9vcmRlci5sZW5ndGg7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHRoaXMuX29yZGVyLnNwbGljZShlbGVtZW50SW5kZXgsIDAsIHNwbGljZWQpO1xyXG5cclxuXHRcdFx0XHR0aGlzLmV2ZW50cy5maXJlKERhdGFFdmVudHMuY2hhbmdlKTtcclxuXHRcdFx0XHRyZXR1cm4gZWxlbWVudElkO1xyXG5cdFx0XHR9KTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGlmICh0YXJnZXQgJiYgdGFyZ2V0ICE9PSB0aGlzICYmIHRoaXMuZXhpc3RzKGlkKSkge1xyXG5cdFx0XHRcdGNvbnN0IGl0ZW0gPSBjb3B5KHRoaXMuZ2V0SXRlbShpZCksIHRydWUpO1xyXG5cdFx0XHRcdGlmICh0YXJnZXQuZXhpc3RzKGlkKSkge1xyXG5cdFx0XHRcdFx0aXRlbS5pZCA9IHVpZCgpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRpZiAodGFyZ2V0SWQpIHtcclxuXHRcdFx0XHRcdGl0ZW0ucGFyZW50ID0gdGFyZ2V0SWQ7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHRhcmdldC5hZGQoaXRlbSwgaW5kZXgpO1xyXG5cdFx0XHRcdC8vIHJlbW92ZSBkYXRhIGZyb20gb3JpZ2luYWwgY29sbGVjdGlvblxyXG5cdFx0XHRcdHRoaXMucmVtb3ZlKGlkKTtcclxuXHRcdFx0XHRyZXR1cm4gaXRlbS5pZDtcclxuXHRcdFx0fVxyXG5cdFx0XHRpZiAodGhpcy5nZXRJbmRleChpZCkgPT09IGluZGV4KSB7XHJcblx0XHRcdFx0cmV0dXJuIG51bGw7XHJcblx0XHRcdH1cclxuXHRcdFx0Ly8gbW92ZSBvdGhlciBlbGVtZW50c1xyXG5cdFx0XHRjb25zdCBzcGxpY2VkID0gdGhpcy5fb3JkZXIuc3BsaWNlKHRoaXMuZ2V0SW5kZXgoaWQpLCAxKVswXTtcclxuXHRcdFx0aWYgKGluZGV4ID09PSAtMSkge1xyXG5cdFx0XHRcdGluZGV4ID0gdGhpcy5fb3JkZXIubGVuZ3RoO1xyXG5cdFx0XHR9XHJcblx0XHRcdHRoaXMuX29yZGVyLnNwbGljZShpbmRleCwgMCwgc3BsaWNlZCk7XHJcblxyXG5cdFx0XHR0aGlzLmV2ZW50cy5maXJlKERhdGFFdmVudHMuY2hhbmdlKTsgLy8gaWYgdGFyZ2V0IG5vdCB0aGlzLCBpdCB0cmlnZ2VyIGFkZCBhbmQgcmVtb3ZlXHJcblx0XHRcdHJldHVybiBpZDtcclxuXHRcdH1cclxuXHR9XHJcblx0bG9hZCh1cmw6IElEYXRhUHJveHkgfCBzdHJpbmcsIGRyaXZlcj86IGFueSk6IFByb21pc2U8YW55PiB7XHJcblx0XHRpZiAodHlwZW9mIHVybCA9PT0gXCJzdHJpbmdcIil7XHJcblx0XHRcdHVybCA9IG5ldyBEYXRhUHJveHkodXJsKTtcclxuXHRcdH1cclxuXHRcdHJldHVybiB0aGlzLl9sb2FkZXIubG9hZCh1cmwsIGRyaXZlcik7XHJcblx0fVxyXG5cdHBhcnNlKGRhdGE6IFRbXSwgZHJpdmVyPzogYW55KSB7XHJcblx0XHR0aGlzLl9yZW1vdmVBbGwoKTtcclxuXHRcdHJldHVybiB0aGlzLl9sb2FkZXIucGFyc2UoZGF0YSwgZHJpdmVyKTtcclxuXHR9XHJcblx0JHBhcnNlKGRhdGE6IGFueVtdKXtcclxuXHRcdGNvbnN0IGFweCA9IHRoaXMuY29uZmlnLmFwcHJveGltYXRlO1xyXG5cdFx0aWYgKGFweCl7XHJcblx0XHRcdGRhdGEgPSB0aGlzLl9hcHByb3hpbWF0ZShkYXRhLCBhcHgudmFsdWUsIGFweC5tYXhOdW0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuX3BhcnNlX2RhdGEoZGF0YSk7XHJcblxyXG5cdFx0dGhpcy5ldmVudHMuZmlyZShEYXRhRXZlbnRzLmNoYW5nZSwgW1wibG9hZFwiXSk7XHJcblx0XHR0aGlzLmV2ZW50cy5maXJlKERhdGFFdmVudHMubG9hZCk7XHJcblx0fVxyXG5cdHNhdmUodXJsOiBJRGF0YVByb3h5KSB7XHJcblx0XHR0aGlzLl9sb2FkZXIuc2F2ZSh1cmwpO1xyXG5cdH1cclxuXHQvLyB0b2RvOiBsb29wIHRocm91Z2ggdGhlIGFycmF5IGFuZCBjaGVjayBzYXZlZCBzdGF0dXNlc1xyXG5cdGlzU2F2ZWQoKTogYm9vbGVhbiB7XHJcblx0XHRyZXR1cm4gIXRoaXMuX2NoYW5nZXMub3JkZXIubGVuZ3RoOyAvLyB0b2RvOiBiYWQgc29sdXRpb24sIGVycm9ycyBhbmQgaG9sZGVkIGVsbWVudHMgYXJlIG1pc3NlZC4uLlxyXG5cdH1cclxuXHRtYXAoY2I6IERhdGFDYWxsYmFjazxUPikgOiBhbnlbXXtcclxuXHRcdGNvbnN0IHJlc3VsdCA6IGFueVtdID0gW107XHJcblx0XHRmb3IgKGxldCBpPTA7IGk8dGhpcy5fb3JkZXIubGVuZ3RoOyBpKyspe1xyXG5cdFx0XHRyZXN1bHQucHVzaChjYi5jYWxsKHRoaXMsIHRoaXMuX29yZGVyW2ldLCBpKSk7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gcmVzdWx0O1xyXG5cdH1cclxuXHRtYXBSYW5nZShmcm9tOiBudW1iZXIsIHRvOiBudW1iZXIsIGNiOiBEYXRhQ2FsbGJhY2s8VD4pOiBhbnlbXSB7XHJcblx0XHRpZiAoZnJvbSA8IDApIHtcclxuXHRcdFx0ZnJvbSA9IDA7XHJcblx0XHR9XHJcblx0XHRpZiAodG8gPiB0aGlzLl9vcmRlci5sZW5ndGggLSAxKSB7XHJcblx0XHRcdHRvID0gdGhpcy5fb3JkZXIubGVuZ3RoIC0gMTtcclxuXHRcdH1cclxuXHRcdGNvbnN0IHJlc3VsdDogYW55W10gPSBbXTtcclxuXHRcdGZvciAobGV0IGk9ZnJvbTsgaTw9dG87IGkrKyl7XHJcblx0XHRcdHJlc3VsdC5wdXNoKGNiLmNhbGwodGhpcywgdGhpcy5fb3JkZXJbaV0sIGkpKTtcclxuXHRcdH1cclxuXHRcdHJldHVybiByZXN1bHQ7XHJcblx0fVxyXG5cdHJlZHVjZTxBPihjYjogUmVkdWNlQ2FsbEJhY2s8VCwgQT4sIGFjYzogQSl7XHJcblx0XHRmb3IgKGxldCBpPTA7IGk8dGhpcy5fb3JkZXIubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0YWNjID0gY2IuY2FsbCh0aGlzLCBhY2MsIHRoaXMuX29yZGVyW2ldLCBpKTtcclxuXHRcdH1cclxuXHRcdHJldHVybiBhY2M7XHJcblx0fVxyXG5cdHNlcmlhbGl6ZShkcml2ZXI6IERhdGFEcml2ZXIgPSBEYXRhRHJpdmVyLmpzb24peyAvLyByZW1vdmUgJCBhdHRyc1xyXG5cdFx0Y29uc3QgZGF0YSA9IHRoaXMubWFwKGl0ZW0gPT4ge1xyXG5cdFx0XHRjb25zdCBuZXdJdGVtID0gey4uLml0ZW0gYXMgSURhdGFJdGVtfTtcclxuXHRcdFx0T2JqZWN0LmtleXMobmV3SXRlbSkuZm9yRWFjaChrZXkgPT4ge1xyXG5cdFx0XHRcdGlmIChrZXlbMF0gPT09IFwiJFwiKSB7XHJcblx0XHRcdFx0XHRkZWxldGUgbmV3SXRlbVtrZXldO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHJcblx0XHRcdHJldHVybiBuZXdJdGVtO1xyXG5cdFx0fSk7XHJcblx0XHRjb25zdCBkYXRhRHJpdmVyID0gdG9EYXRhRHJpdmVyKGRyaXZlcik7XHJcblx0XHRpZihkYXRhRHJpdmVyKXtcclxuXHRcdFx0cmV0dXJuIGRhdGFEcml2ZXIuc2VyaWFsaXplKGRhdGEpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRnZXRJbml0aWFsRGF0YSgpe1xyXG5cdFx0cmV0dXJuIHRoaXMuX2luaXRPcmRlcjtcclxuXHR9XHJcblx0cHJvdGVjdGVkIF9yZW1vdmVBbGwoKXtcclxuXHRcdHRoaXMuX3B1bGwgPSB7fTtcclxuXHRcdHRoaXMuX29yZGVyID0gW107XHJcblx0XHR0aGlzLl9jaGFuZ2VzLm9yZGVyID0gW107XHJcblx0XHR0aGlzLl9pbml0T3JkZXIgPSBudWxsO1xyXG5cdH1cclxuXHRwcm90ZWN0ZWQgX2FkZENvcmUob2JqLCBpbmRleCk6IHN0cmluZyB7XHJcblx0XHRpZiAodGhpcy5jb25maWcuaW5pdCkge1xyXG5cdFx0XHRvYmogPSB0aGlzLmNvbmZpZy5pbml0KG9iaik7XHJcblx0XHR9XHJcblxyXG5cdFx0b2JqLmlkID0gb2JqLmlkID8gb2JqLmlkLnRvU3RyaW5nKCkgOiB1aWQoKTtcclxuXHJcblx0XHRpZiAodGhpcy5fcHVsbFtvYmouaWRdKSB7XHJcblx0XHRcdGRoeEVycm9yKFwiSXRlbSBhbHJlYWR5IGV4aXN0XCIpO1xyXG5cdFx0fVxyXG5cdFx0Ly8gdG9kbzogbm90IGlkZWFsIHNvbHV0aW9uXHJcblx0XHRpZiAodGhpcy5faW5pdE9yZGVyICYmIHRoaXMuX2luaXRPcmRlci5sZW5ndGgpIHtcclxuXHRcdFx0dGhpcy5fYWRkVG9PcmRlcih0aGlzLl9pbml0T3JkZXIsIG9iaiwgaW5kZXgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuX2FkZFRvT3JkZXIodGhpcy5fb3JkZXIsIG9iaiwgaW5kZXgpO1xyXG5cclxuXHRcdHJldHVybiBvYmouaWQ7XHJcblx0fVxyXG5cdHByb3RlY3RlZCBfcmVtb3ZlQ29yZShpZDogSWQpe1xyXG5cdFx0aWYgKHRoaXMuZ2V0SW5kZXgoaWQpID49IDApe1xyXG5cdFx0XHR0aGlzLl9vcmRlciA9IHRoaXMuX29yZGVyLmZpbHRlcihlbCA9PiBlbC5pZCAhPT0gaWQpO1xyXG5cdFx0XHRkZWxldGUgdGhpcy5fcHVsbFtpZF07XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHRoaXMuX2luaXRPcmRlciAmJiB0aGlzLl9pbml0T3JkZXIubGVuZ3RoKSB7XHJcblx0XHRcdHRoaXMuX2luaXRPcmRlciA9IHRoaXMuX2luaXRPcmRlci5maWx0ZXIoZWwgPT4gZWwuaWQgIT09IGlkKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHByb3RlY3RlZCBfcGFyc2VfZGF0YShkYXRhOiBhbnlbXSl7XHJcblx0XHRsZXQgaW5kZXggPSB0aGlzLl9vcmRlci5sZW5ndGg7XHJcblx0XHRpZih0aGlzLmNvbmZpZy5wcmVwKXtcclxuXHRcdFx0ZGF0YSA9IHRoaXMuY29uZmlnLnByZXAoZGF0YSk7XHJcblx0XHR9XHJcblx0XHRmb3IgKGxldCBvYmogb2YgZGF0YSkge1xyXG5cdFx0XHRpZiAodGhpcy5jb25maWcuaW5pdCkge1xyXG5cdFx0XHRcdG9iaiA9IHRoaXMuY29uZmlnLmluaXQob2JqKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRvYmouaWQgPSAob2JqLmlkIHx8IG9iai5pZCA9PT0gMCkgPyBvYmouaWQgOiB1aWQoKTtcclxuXHRcdFx0dGhpcy5fcHVsbFtvYmouaWRdID0gb2JqO1xyXG5cdFx0XHR0aGlzLl9vcmRlcltpbmRleCsrXSA9IG9iajtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHByb3RlY3RlZCBfYXBwcm94aW1hdGUoZGF0YTogYW55W10sIHZhbHVlczpzdHJpbmdbXSwgbWF4TnVtOm51bWJlcil7XHJcblx0XHRjb25zdCBsZW4gPSBkYXRhLmxlbmd0aDtcclxuXHRcdGNvbnN0IHZsZW4gPSB2YWx1ZXMubGVuZ3RoO1xyXG5cdFx0Y29uc3QgcmxlbiA9IE1hdGguZmxvb3IobGVuL21heE51bSk7XHJcblx0XHRjb25zdCBuZXdEYXRhID0gQXJyYXkoTWF0aC5jZWlsKGxlbi9ybGVuKSk7XHJcblxyXG5cdFx0bGV0IGluZGV4ID0gMDtcclxuXHRcdGZvciAobGV0IGk9MDsgaTxsZW47IGkrPXJsZW4pIHtcclxuXHRcdFx0Y29uc3QgbmV3SXRlbSA9IGNvcHkoZGF0YVtpXSk7XHJcblx0XHRcdGNvbnN0IGVuZCA9IE1hdGgubWluKGxlbiwgaStybGVuKTtcclxuXHRcdFx0Zm9yIChsZXQgaj0wOyBqPHZsZW47IGorKykge1xyXG5cdFx0XHRcdGxldCBzdW0gPSAwO1xyXG5cdFx0XHRcdGZvciAobGV0IHo9aTsgejxlbmQ7IHorKyl7XHJcblx0XHRcdFx0XHRzdW0gKz0gZGF0YVt6XVt2YWx1ZXNbal1dO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRuZXdJdGVtW3ZhbHVlc1tqXV0gPSBzdW0gLyAoZW5kLWkpO1xyXG5cdFx0XHR9XHJcblx0XHRcdG5ld0RhdGFbaW5kZXgrK10gPSBuZXdJdGVtO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBuZXdEYXRhO1xyXG5cdH1cclxuXHRwcm90ZWN0ZWQgX29uQ2hhbmdlKHN0YXR1czogU3RhdHVzZXMsIGlkOiBJZCwgb2JqOiBhbnkpOiB2b2lkIHtcclxuXHRcdGZvciAobGV0IGl0ZW0gb2YgdGhpcy5fY2hhbmdlcy5vcmRlcikge1xyXG5cdFx0XHQvLyB1cGRhdGUgcGVuZGluZyBpdGVtIGlmIHByZXZpb3VzIHN0YXRlIGlzIFwic2F2aW5nXCIgb3IgaWYgaXRlbSBub3Qgc2F2ZWQgeWV0XHJcblx0XHRcdGlmIChpdGVtLmlkID09PSBpZCAmJiAhaXRlbS5zYXZpbmcpIHtcclxuXHRcdFx0XHQvLyB1cGRhdGUgaXRlbVxyXG5cdFx0XHRcdGlmIChpdGVtLmVycm9yKSB7XHJcblx0XHRcdFx0XHRpdGVtLmVycm9yID0gZmFsc2U7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGl0ZW0gPSB7IC4uLml0ZW0sIG9iaiwgc3RhdHVzIH07XHJcblxyXG5cdFx0XHRcdHRoaXMuZXZlbnRzLmZpcmUoRGF0YUV2ZW50cy5jaGFuZ2UsIFtpZCwgc3RhdHVzLCBvYmpdKTtcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHRoaXMuX2NoYW5nZXMub3JkZXIucHVzaCh7IGlkLCBzdGF0dXMsIG9iajp7IC4uLm9ian0sIHNhdmluZzogZmFsc2UgfSk7XHJcblx0XHR0aGlzLmV2ZW50cy5maXJlKERhdGFFdmVudHMuY2hhbmdlLCBbaWQsIHN0YXR1cywgb2JqXSk7XHJcblx0fVxyXG5cdHByb3RlY3RlZCBfYWRkVG9PcmRlcihhcnJheTogYW55W10sIG9iajogYW55LCBpbmRleD86IG51bWJlcikge1xyXG5cdFx0aWYgKGluZGV4ID49IDAgJiYgYXJyYXlbaW5kZXhdKSB7XHJcblx0XHRcdHRoaXMuX3B1bGxbb2JqLmlkXSA9IG9iajtcclxuXHRcdFx0YXJyYXkuc3BsaWNlKGluZGV4LCAwLCBvYmopO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGhpcy5fcHVsbFtvYmouaWRdID0gb2JqO1xyXG5cdFx0XHRhcnJheS5wdXNoKG9iaik7XHJcblx0XHR9XHJcblx0fVxyXG5cdHByb3RlY3RlZCBfYXBwbHlGaWx0ZXJzKCkge1xyXG5cdFx0aWYgKHRoaXMuX2ZpbHRlcnMgJiYgT2JqZWN0LmtleXModGhpcy5fZmlsdGVycykubGVuZ3RoKSB7XHJcblx0XHRcdGNvbnN0IGZPcmRlciA9IHRoaXMuX29yZGVyLmZpbHRlcihpdGVtID0+IHtcclxuXHRcdFx0XHRyZXR1cm4gT2JqZWN0LmtleXModGhpcy5fZmlsdGVycykuZXZlcnkoXHJcblx0XHRcdFx0XHRrZXkgPT5cclxuXHRcdFx0XHRcdFx0aXRlbVtrZXldP1xyXG5cdFx0XHRcdFx0XHRcdHRoaXMuX2ZpbHRlcnNba2V5XS5jb21wYXJlKGl0ZW1ba2V5XSwgdGhpcy5fZmlsdGVyc1trZXldLm1hdGNoLCBpdGVtKVxyXG5cdFx0XHRcdFx0XHRcdDp0aGlzLl9maWx0ZXJzW2tleV0uY29tcGFyZShpdGVtKVxyXG5cdFx0XHRcdCk7XHJcblx0XHRcdH0pO1xyXG5cdFx0XHRpZiAoIXRoaXMuX2luaXRPcmRlcikge1xyXG5cdFx0XHRcdHRoaXMuX2luaXRPcmRlciA9IHRoaXMuX29yZGVyO1xyXG5cdFx0XHR9XHJcblx0XHRcdHRoaXMuX29yZGVyID0gZk9yZGVyO1xyXG5cdFx0fVxyXG5cdH1cclxufSIsImltcG9ydCB7IERhdGFDb2xsZWN0aW9uIH0gZnJvbSBcIi4uL2RhdGFjb2xsZWN0aW9uXCI7XHJcbmltcG9ydCB7IGRoeEVycm9yLCBkaHhXYXJuaW5nLCBpc0VxdWFsT2JqLCB0b0RhdGFEcml2ZXIsIGhhc0pzb25PckFycmF5U3RydWN0dXJlIH0gZnJvbSBcIi4uL2hlbHBlcnNcIjtcclxuaW1wb3J0IHtEYXRhRXZlbnRzLCBJZCwgSURhdGFEcml2ZXIsIElEYXRhUHJveHl9IGZyb20gXCIuLi90eXBlc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIExvYWRlciB7XHJcblx0cHJpdmF0ZSBfcGFyZW50OiBEYXRhQ29sbGVjdGlvbjtcclxuXHRwcml2YXRlIF9zYXZpbmc6IGJvb2xlYW47XHJcblx0cHJpdmF0ZSBfY2hhbmdlczogYW55O1xyXG5cdGNvbnN0cnVjdG9yKHBhcmVudDogRGF0YUNvbGxlY3Rpb24sIGNoYW5nZXM6IGFueSkge1xyXG5cdFx0dGhpcy5fcGFyZW50ID0gcGFyZW50O1xyXG5cdFx0dGhpcy5fY2hhbmdlcyA9IGNoYW5nZXM7Ly8gdG9kbzogW2RpcnR5XSBtdXRhdGlvblxyXG5cdH1cclxuXHRsb2FkKHVybDogSURhdGFQcm94eSwgZHJpdmVyPzogSURhdGFEcml2ZXIpOiBQcm9taXNlPGFueT4ge1xyXG5cdFx0cmV0dXJuIHRoaXMuX3BhcmVudC5sb2FkRGF0YSA9IHVybC5sb2FkKCkudGhlbigoZGF0YSkgPT4ge1xyXG5cdFx0XHR0aGlzLl9wYXJlbnQucmVtb3ZlQWxsKCk7XHJcblx0XHRcdC8vIGNvbnN0IHBhcmNlZERhdGEgPSB0aGlzLnBhcnNlKGRhdGEsIGRyaXZlcik7XHJcblx0XHRcdHJldHVybiB0aGlzLnBhcnNlKGRhdGEsIGRyaXZlcik7XHJcblx0XHR9KS5jYXRjaCgoZXJyb3IpID0+IHtcclxuXHRcdFx0dGhpcy5fcGFyZW50LmV2ZW50cy5maXJlKERhdGFFdmVudHMubG9hZEVycm9yLCBbZXJyb3JdKTtcclxuXHRcdH0pO1xyXG5cdH1cclxuXHRwYXJzZShkYXRhOiBhbnlbXSwgZHJpdmVyOiBhbnkgPSBcImpzb25cIikge1xyXG5cdFx0aWYgKGRyaXZlciA9PT0gXCJqc29uXCIgJiYgIWhhc0pzb25PckFycmF5U3RydWN0dXJlKGRhdGEpKSB7XHJcblx0XHRcdHRoaXMuX3BhcmVudC5ldmVudHMuZmlyZShEYXRhRXZlbnRzLmxvYWRFcnJvciwgW1wiVW5jYXVnaHQgU3ludGF4RXJyb3I6IFVuZXhwZWN0ZWQgZW5kIG9mIGlucHV0XCJdKTtcclxuXHRcdH1cclxuXHRcdGRyaXZlciA9IHRvRGF0YURyaXZlcihkcml2ZXIpO1xyXG5cdFx0ZGF0YSA9IGRyaXZlci50b0pzb25BcnJheShkYXRhKTtcclxuXHRcdHRoaXMuX3BhcmVudC4kcGFyc2UoZGF0YSk7XHJcblx0XHRyZXR1cm4gZGF0YTtcclxuXHR9XHJcblxyXG5cdHNhdmUodXJsOiBJRGF0YVByb3h5KSB7XHJcblx0XHRmb3IgKGNvbnN0IGVsIG9mIHRoaXMuX2NoYW5nZXMub3JkZXIpIHtcclxuXHRcdFx0aWYgKGVsLnNhdmluZyB8fCBlbC5wZW5kaW5nKSB7XHJcblx0XHRcdFx0ZGh4V2FybmluZyhcIml0ZW0gaXMgc2F2aW5nXCIpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdGNvbnN0IHByZXZFbCA9IHRoaXMuX2ZpbmRQcmV2U3RhdGUoZWwuaWQpO1xyXG5cclxuXHRcdFx0XHRpZiAocHJldkVsICYmIHByZXZFbC5zYXZpbmcpIHtcclxuXHRcdFx0XHRcdGNvbnN0IHBlbmRpbmcgPSBuZXcgUHJvbWlzZSgocmVzLCByZWopID0+IHtcclxuXHRcdFx0XHRcdFx0cHJldkVsLnByb21pc2UudGhlbigoKSA9PiB7XHJcblx0XHRcdFx0XHRcdFx0ZWwucGVuZGluZyA9IGZhbHNlO1xyXG5cdFx0XHRcdFx0XHRcdHJlcyh0aGlzLl9zZXRQcm9taXNlKGVsLCB1cmwpKTtcclxuXHRcdFx0XHRcdFx0fSkuY2F0Y2goZXJyID0+IHtcclxuXHRcdFx0XHRcdFx0XHR0aGlzLl9yZW1vdmVGcm9tT3JkZXIocHJldkVsKTtcclxuXHRcdFx0XHRcdFx0XHR0aGlzLl9zZXRQcm9taXNlKGVsLCB1cmwpO1xyXG5cdFx0XHRcdFx0XHRcdGRoeFdhcm5pbmcoZXJyKTtcclxuXHRcdFx0XHRcdFx0XHRyZWooZXJyKTtcclxuXHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdHRoaXMuX2FkZFRvQ2hhaW4ocGVuZGluZyk7XHJcblx0XHRcdFx0XHRlbC5wZW5kaW5nID0gdHJ1ZTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0dGhpcy5fc2V0UHJvbWlzZShlbCwgdXJsKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHRoaXMuX3BhcmVudC5zYXZlRGF0YS50aGVuKCgpID0+IHtcclxuXHRcdFx0dGhpcy5fc2F2aW5nID0gZmFsc2U7XHJcblx0XHR9KTtcclxuXHR9XHJcblx0cHJpdmF0ZSBfc2V0UHJvbWlzZShlbCwgdXJsKTogUHJvbWlzZTxhbnk+IHtcclxuXHRcdGVsLnByb21pc2UgPSB1cmwuc2F2ZShlbC5vYmosIGVsLnN0YXR1cyk7XHJcblx0XHRlbC5wcm9taXNlLnRoZW4oKCkgPT4ge1xyXG5cdFx0XHR0aGlzLl9yZW1vdmVGcm9tT3JkZXIoZWwpO1xyXG5cdFx0fSkuY2F0Y2goZXJyID0+IHtcclxuXHRcdFx0ZWwuc2F2aW5nID0gZmFsc2U7XHJcblx0XHRcdGVsLmVycm9yID0gdHJ1ZTtcclxuXHRcdFx0ZGh4RXJyb3IoZXJyKTtcclxuXHRcdH0pO1xyXG5cdFx0ZWwuc2F2aW5nID0gdHJ1ZTtcclxuXHRcdHRoaXMuX3NhdmluZyA9IHRydWU7XHJcblx0XHR0aGlzLl9hZGRUb0NoYWluKGVsLnByb21pc2UpO1xyXG5cdFx0cmV0dXJuIGVsLnByb21pc2U7XHJcblx0fVxyXG5cdHByaXZhdGUgX2FkZFRvQ2hhaW4ocHJvbWlzZSk6IHZvaWQge1xyXG5cdFx0Ly8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOnByZWZlci1jb25kaXRpb25hbC1leHByZXNzaW9uXHJcblx0XHRpZiAodGhpcy5fcGFyZW50LnNhdmVEYXRhICYmIHRoaXMuX3NhdmluZykge1xyXG5cdFx0XHR0aGlzLl9wYXJlbnQuc2F2ZURhdGEgPSB0aGlzLl9wYXJlbnQuc2F2ZURhdGEudGhlbigoKSA9PiBwcm9taXNlKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRoaXMuX3BhcmVudC5zYXZlRGF0YSA9IHByb21pc2U7XHJcblx0XHR9XHJcblx0fVxyXG5cdHByaXZhdGUgX2ZpbmRQcmV2U3RhdGUoaWQ6IElkKTogYW55IHtcclxuXHRcdGZvciAoY29uc3QgZWwgb2YgdGhpcy5fY2hhbmdlcy5vcmRlcikge1xyXG5cdFx0XHRpZiAoZWwuaWQgPT09IGlkKSB7XHJcblx0XHRcdFx0cmV0dXJuIGVsO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gbnVsbDtcclxuXHR9XHJcblx0cHJpdmF0ZSBfcmVtb3ZlRnJvbU9yZGVyKGVsKSB7XHJcblx0XHR0aGlzLl9jaGFuZ2VzLm9yZGVyID0gdGhpcy5fY2hhbmdlcy5vcmRlci5maWx0ZXIoaXRlbSA9PiAhaXNFcXVhbE9iaihpdGVtLCBlbCkpO1xyXG5cdH1cclxufSIsImltcG9ydCB7IG5hdHVyYWxDb21wYXJlIH0gZnJvbSBcIi4vLi4vaGVscGVyc1wiO1xyXG5pbXBvcnQgeyBJRGlyLCBJU29ydE1vZGUgfSBmcm9tIFwiLi8uLi90eXBlc1wiO1xyXG5cclxudHlwZSBDaGFuZ2VTdHJpbmcgPSAoYTogc3RyaW5nKSA9PiBzdHJpbmcgfCBudW1iZXI7XHJcblxyXG5leHBvcnQgY2xhc3MgU29ydCB7XHJcblx0c29ydChhcnJheTogYW55W10sIGJ5OiBJU29ydE1vZGUpIHtcclxuXHRcdGlmIChieS5ydWxlICYmIHR5cGVvZiBieS5ydWxlID09PSBcImZ1bmN0aW9uXCIpIHtcclxuXHRcdFx0dGhpcy5fc29ydChhcnJheSwgYnkpO1xyXG5cdFx0fSBlbHNlIGlmIChieS5ieSkge1xyXG5cdFx0XHRieS5ydWxlID0gKGE6IGFueSwgYjogYW55KSA9PiB7XHJcblx0XHRcdFx0Y29uc3QgYWEgPSB0aGlzLl9jaGVja1ZhbChieS5hcywgYVtieS5ieV0pO1xyXG5cdFx0XHRcdGNvbnN0IGJiID0gdGhpcy5fY2hlY2tWYWwoYnkuYXMsIGJbYnkuYnldKTtcclxuXHRcdFx0XHRyZXR1cm4gbmF0dXJhbENvbXBhcmUoYWEudG9TdHJpbmcoKSwgYmIudG9TdHJpbmcoKSk7XHJcblx0XHRcdH07XHJcblx0XHRcdHRoaXMuX3NvcnQoYXJyYXksIGJ5KTtcclxuXHRcdH1cclxuXHJcblx0fVxyXG5cdHByaXZhdGUgX2NoZWNrVmFsKG1ldGhvZDogQ2hhbmdlU3RyaW5nLCB2YWw6IHN0cmluZyB8IG51bWJlcikge1xyXG5cdFx0cmV0dXJuIG1ldGhvZCA/IG1ldGhvZC5jYWxsKHRoaXMsIHZhbCkgOiB2YWw7XHJcblx0fVxyXG5cdHByaXZhdGUgX3NvcnQoYXJyOiBhbnlbXSwgY29uZjogSVNvcnRNb2RlKTogYW55W10ge1xyXG5cdFx0Y29uc3QgZGlyOiBJRGlyID0ge1xyXG5cdFx0XHRhc2M6IDEsXHJcblx0XHRcdGRlc2M6IC0xXHJcblx0XHR9O1xyXG5cdFx0cmV0dXJuIGFyci5zb3J0KChhOiBhbnksIGI6IGFueSkgPT4ge1xyXG5cdFx0XHRyZXR1cm4gY29uZi5ydWxlLmNhbGwodGhpcywgYSwgYikgKiAoZGlyW2NvbmYuZGlyXSB8fCBkaXIuYXNjKTtcclxuXHRcdH0pO1xyXG5cdH1cclxufSIsImltcG9ydCB7IElEYXRhUHJveHkgfSBmcm9tIFwiLi90eXBlc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIERhdGFQcm94eSBpbXBsZW1lbnRzIElEYXRhUHJveHkge1xyXG5cdHB1YmxpYyB1cmw6IHN0cmluZztcclxuXHRjb25zdHJ1Y3Rvcih1cmw6IHN0cmluZykge1xyXG5cdFx0dGhpcy51cmwgPSB1cmw7XHJcblx0fVxyXG5cdGxvYWQ8VD1zdHJpbmc+KCk6IFByb21pc2U8VD4ge1xyXG5cdFx0cmV0dXJuIHRoaXMuX2FqYXgodGhpcy51cmwpO1xyXG5cdH1cclxuXHRzYXZlKGRhdGE6IGFueSwgbW9kZTogc3RyaW5nKTogUHJvbWlzZTxhbnk+IHtcclxuXHRcdGNvbnN0IG1vZGVzID0ge1xyXG5cdFx0XHRpbnNlcnQ6IFwiUE9TVFwiLFxyXG5cdFx0XHRkZWxldGU6IFwiREVMRVRFXCIsXHJcblx0XHRcdHVwZGF0ZTogXCJQT1NUXCJcclxuXHRcdH0gYXMgYW55O1xyXG5cdFx0cmV0dXJuIHRoaXMuX2FqYXgodGhpcy51cmwsIGRhdGEsIG1vZGVzW21vZGVdIHx8IFwiUE9TVFwiKTtcclxuXHR9XHJcblx0cHJpdmF0ZSBfYWpheCh1cmw6IHN0cmluZywgZGF0YT86IGFueSwgbWV0aG9kOiBzdHJpbmcgPSBcIkdFVFwiKTogUHJvbWlzZTxhbnk+IHtcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdGNvbnN0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG5cclxuXHRcdFx0eGhyLm9ubG9hZCA9ICgpID0+IHtcclxuXHRcdFx0XHRpZiAoeGhyLnN0YXR1cyA+PSAyMDAgJiYgeGhyLnN0YXR1cyA8IDMwMCkge1xyXG5cdFx0XHRcdFx0cmVzb2x2ZSh4aHIucmVzcG9uc2UgfHwgeGhyLnJlc3BvbnNlVGV4dCk7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdHJlamVjdCh7XHJcblx0XHRcdFx0XHRcdHN0YXR1czogeGhyLnN0YXR1cyxcclxuXHRcdFx0XHRcdFx0c3RhdHVzVGV4dDogeGhyLnN0YXR1c1RleHRcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fTtcclxuXHRcdFx0eGhyLm9uZXJyb3IgPSAoKSA9PiB7XHJcblx0XHRcdFx0cmVqZWN0KHtcclxuXHRcdFx0XHRcdHN0YXR1czogeGhyLnN0YXR1cyxcclxuXHRcdFx0XHRcdHN0YXR1c1RleHQ6IHhoci5zdGF0dXNUZXh0XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH07XHJcblx0XHRcdHhoci5vcGVuKG1ldGhvZCwgdXJsKTtcclxuXHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpO1xyXG5cdFx0XHRzd2l0Y2ggKG1ldGhvZCkge1xyXG5cdFx0XHRcdGNhc2UgXCJQT1NUXCI6XHJcblx0XHRcdFx0Y2FzZSBcIkRFTEVURVwiOlxyXG5cdFx0XHRcdGNhc2UgXCJQVVRcIjpcclxuXHRcdFx0XHRcdHhoci5zZW5kKEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdGNhc2UgXCJHRVRcIjpcclxuXHRcdFx0XHRcdHhoci5zZW5kKCk7XHJcblx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRkZWZhdWx0OlxyXG5cdFx0XHRcdFx0eGhyLnNlbmQoKTtcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9XHJcbn0iLCJcclxuaW1wb3J0IHsgSURhdGFEcml2ZXIsIElDc3ZEcml2ZXJDb25maWcgfSBmcm9tIFwiLi8uLi90eXBlc1wiO1xyXG5pbXBvcnQgeyBJQW55T2JqIH0gZnJvbSBcIkBkaHgvdHMtY29tbW9uL3R5cGVzXCI7XHJcbmV4cG9ydCBpbnRlcmZhY2UgSUNzdkRyaXZlciBleHRlbmRzIElEYXRhRHJpdmVyIHtcclxuXHRnZXRGaWVsZHMoZGF0YTogc3RyaW5nLCBoZWFkZXJzPzogc3RyaW5nW10pO1xyXG59XHJcbmV4cG9ydCBjbGFzcyBDc3ZEcml2ZXIgaW1wbGVtZW50cyBJQ3N2RHJpdmVyIHtcclxuXHRwdWJsaWMgY29uZmlnOiBJQ3N2RHJpdmVyQ29uZmlnO1xyXG5cclxuXHRjb25zdHJ1Y3Rvcihjb25maWc/OiBJQ3N2RHJpdmVyQ29uZmlnKSB7XHJcblxyXG5cdFx0Y29uc3QgaW5pdENvbmZpZzogSUNzdkRyaXZlckNvbmZpZyA9IHtcclxuXHRcdFx0c2tpcEhlYWRlcjogMCxcclxuXHRcdFx0bmFtZUJ5SGVhZGVyOiBmYWxzZSxcclxuXHRcdFx0cm93RGVsaW1pdGVyOiBcIlxcblwiLFxyXG5cdFx0XHRjb2x1bW5EZWxpbWl0ZXI6IFwiLFwiLFxyXG5cdFx0fTtcclxuXHJcblx0XHR0aGlzLmNvbmZpZyA9IHsgLi4uaW5pdENvbmZpZywgLi4uY29uZmlnIH07XHJcblxyXG5cdFx0aWYgKHRoaXMuY29uZmlnLm5hbWVCeUhlYWRlcikge1xyXG5cdFx0XHR0aGlzLmNvbmZpZy5za2lwSGVhZGVyID0gMTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGdldEZpZWxkcyhyb3c6IHN0cmluZywgaGVhZGVycz86IHN0cmluZ1tdKTogeyBba2V5OiBzdHJpbmddOiBhbnkgfSB7XHJcblx0XHRjb25zdCBwYXJ0cyA9IHJvdy50cmltKCkuc3BsaXQodGhpcy5jb25maWcuY29sdW1uRGVsaW1pdGVyKTtcclxuXHJcblx0XHRjb25zdCBvYmogPSB7fTtcclxuXHRcdGZvciAobGV0IGkgPSAwO2kgPCBwYXJ0cy5sZW5ndGg7aSsrKSB7XHJcblx0XHRcdG9ialtoZWFkZXJzID8gaGVhZGVyc1tpXSA6IGkgKyAxXSA9IHBhcnRzW2ldO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBvYmo7XHJcblx0fVxyXG5cdGdldFJvd3MoZGF0YTogc3RyaW5nKTogc3RyaW5nW10ge1xyXG5cdFx0cmV0dXJuIGRhdGEudHJpbSgpLnNwbGl0KHRoaXMuY29uZmlnLnJvd0RlbGltaXRlcik7XHJcblx0fVxyXG5cdHRvSnNvbkFycmF5KGRhdGE6IHN0cmluZyk6IGFueVtdIHtcclxuXHRcdGNvbnN0IHJvd3MgPSB0aGlzLmdldFJvd3MoZGF0YSk7XHJcblx0XHRsZXQgbmFtZXMgPSB0aGlzLmNvbmZpZy5uYW1lcztcclxuXHJcblx0XHRpZiAodGhpcy5jb25maWcuc2tpcEhlYWRlcikge1xyXG5cdFx0XHRjb25zdCB0b3AgPSByb3dzLnNwbGljZSgwLCB0aGlzLmNvbmZpZy5za2lwSGVhZGVyKTtcclxuXHRcdFx0aWYgKHRoaXMuY29uZmlnLm5hbWVCeUhlYWRlcikge1xyXG5cdFx0XHRcdG5hbWVzID0gdG9wWzBdLnRyaW0oKS5zcGxpdCh0aGlzLmNvbmZpZy5jb2x1bW5EZWxpbWl0ZXIpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gcm93cy5tYXAocm93ID0+IHRoaXMuZ2V0RmllbGRzKHJvdywgbmFtZXMpKTtcclxuXHR9XHJcblx0c2VyaWFsaXplKGRhdGE6IElBbnlPYmpbXSwgd2l0aG91dEhlYWRlcj86IGJvb2xlYW4pOiBzdHJpbmcge1xyXG5cdFx0Y29uc3QgaGVhZGVyID0gZGF0YVswXSA/IE9iamVjdC5rZXlzKGRhdGFbMF0pXHJcblx0XHRcdC5maWx0ZXIoa2V5ID0+IGtleVswXSAhPT0gXCIkXCIpXHJcblx0XHRcdC5qb2luKHRoaXMuY29uZmlnLmNvbHVtbkRlbGltaXRlcikgOiBcIlwiO1xyXG5cclxuXHRcdGNvbnN0IHJlYWR5RGF0YSA9IHRoaXMuX3NlcmlhbGl6ZShkYXRhKTtcclxuXHRcdGlmICh3aXRob3V0SGVhZGVyKSB7XHJcblx0XHRcdHJldHVybiByZWFkeURhdGE7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gaGVhZGVyICsgcmVhZHlEYXRhO1xyXG5cdH1cclxuXHRwcml2YXRlIF9zZXJpYWxpemUoZGF0YTogSUFueU9ialtdKTogc3RyaW5nIHtcclxuXHRcdHJldHVybiBkYXRhLnJlZHVjZSgoY3N2LCByb3cpID0+IHtcclxuXHRcdFx0Y29uc3QgY2VsbHMgPSBPYmplY3Qua2V5cyhyb3cpLnJlZHVjZSgodG90YWwsIGtleSwgaSkgPT4ge1xyXG5cdFx0XHRcdGlmIChrZXlbMF0gPT09IFwiJFwiIHx8IGtleSA9PT0gXCJpdGVtc1wiKSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gdG90YWw7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHJldHVybiBgJHt0b3RhbH0ke3Jvd1trZXldfSR7aSA9PT0gcm93Lmxlbmd0aCAtIDEgPyBcIlwiIDogdGhpcy5jb25maWcuY29sdW1uRGVsaW1pdGVyfWA7XHJcblx0XHRcdH0sIFwiXCIpO1xyXG5cclxuXHRcdFx0aWYgKHJvdy5pdGVtcykge1xyXG5cdFx0XHRcdHJldHVybiBgJHtjc3Z9XFxuJHtjZWxsc30ke3RoaXMuX3NlcmlhbGl6ZShyb3cuaXRlbXMpfWA7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiBgJHtjc3Z9JHt0aGlzLmNvbmZpZy5yb3dEZWxpbWl0ZXJ9JHtjZWxsc31gO1xyXG5cdFx0fSwgXCJcIik7XHJcblx0fVxyXG59IiwiaW1wb3J0IHsgSURhdGFEcml2ZXIgfSBmcm9tIFwiLi4vdHlwZXNcIjtcclxuaW1wb3J0IHsgSUFueU9iaiB9IGZyb20gXCJAZGh4L3RzLWNvbW1vbi90eXBlc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEpzb25Ecml2ZXIgaW1wbGVtZW50cyBJRGF0YURyaXZlciB7XHJcblx0dG9Kc29uQXJyYXkoZGF0YTogYW55KSB7XHJcblx0XHRyZXR1cm4gdGhpcy5nZXRSb3dzKGRhdGEpO1xyXG5cdH1cclxuXHRzZXJpYWxpemUoZGF0YTogSUFueU9ialtdKTogSUFueU9ialtdIHtcclxuXHRcdHJldHVybiBkYXRhO1xyXG5cdH1cclxuXHRnZXRGaWVsZHMocm93OiBhbnkpOiB7IFtrZXk6IHN0cmluZ106IGFueSB9IHtcclxuXHRcdHJldHVybiByb3c7XHJcblx0fVxyXG5cdGdldFJvd3MoZGF0YTogc3RyaW5nKTogYW55W10ge1xyXG5cdFx0cmV0dXJuIHR5cGVvZiBkYXRhID09PSBcInN0cmluZ1wiID8gSlNPTi5wYXJzZShkYXRhKSA6IGRhdGE7XHJcblx0fVxyXG59IiwiaW1wb3J0IHsgSURhdGFEcml2ZXIgfSBmcm9tIFwiLi4vdHlwZXNcIjtcclxuaW1wb3J0IHsgSUFueU9iaiB9IGZyb20gXCJAZGh4L3RzLWNvbW1vbi90eXBlc1wiO1xyXG5pbXBvcnQgeyBqc29uVG9YTUwgfSBmcm9tIFwiLi8uLi9zZXJpYWxpemVycy94bWxcIjtcclxuXHJcbmNvbnN0IEFSUkFZX05BTUUgPSBcIml0ZW1zXCI7XHJcbmNvbnN0IElURU1fTkFNRSA9IFwiaXRlbVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFhNTERyaXZlciBpbXBsZW1lbnRzIElEYXRhRHJpdmVyIHtcclxuXHR0b0pzb25BcnJheShkYXRhOiBhbnkpIHtcclxuXHRcdHJldHVybiB0aGlzLmdldFJvd3MoZGF0YSk7XHJcblx0fVxyXG5cdHNlcmlhbGl6ZShkYXRhOiBJQW55T2JqW10pIHtcclxuXHRcdHJldHVybiBqc29uVG9YTUwoZGF0YSk7XHJcblx0fVxyXG5cdGdldEZpZWxkcyhyb3c6IGFueSk6IHsgW2tleTogc3RyaW5nXTogYW55IH0ge1xyXG5cdFx0cmV0dXJuIHJvdztcclxuXHR9XHJcblx0Z2V0Um93cyhkYXRhOiBEb2N1bWVudCB8IHN0cmluZyk6IGFueVtdIHtcclxuXHRcdGlmICh0eXBlb2YgZGF0YSA9PT0gXCJzdHJpbmdcIikge1xyXG5cdFx0XHRkYXRhID0gdGhpcy5fZnJvbVN0cmluZyhkYXRhKTtcclxuXHRcdH1cclxuXHRcdGNvbnN0IGNoaWxkTm9kZXMgPSBkYXRhLmNoaWxkTm9kZXMgJiYgZGF0YS5jaGlsZE5vZGVzWzBdICYmIGRhdGEuY2hpbGROb2Rlc1swXS5jaGlsZE5vZGVzO1xyXG5cdFx0aWYgKCFjaGlsZE5vZGVzIHx8ICFjaGlsZE5vZGVzLmxlbmd0aCkge1xyXG5cdFx0XHRyZXR1cm4gbnVsbDtcclxuXHRcdH1cclxuXHRcdHJldHVybiB0aGlzLl9nZXRSb3dzKGNoaWxkTm9kZXMpO1xyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSBfZ2V0Um93cyhub2RlczogTm9kZUxpc3RPZjxDaGlsZE5vZGU+KTogYW55W10ge1xyXG5cdFx0Y29uc3QgcmVzdWx0ID0gW107XHJcblx0XHRmb3IgKGxldCBpID0gMDtpIDwgbm9kZXMubGVuZ3RoO2krKykge1xyXG5cdFx0XHRpZiAoKG5vZGVzW2ldIGFzIEhUTUxFbGVtZW50KS50YWdOYW1lID09PSBJVEVNX05BTUUpIHtcclxuXHRcdFx0XHRyZXN1bHQucHVzaCh0aGlzLl9ub2RlVG9KUyhub2Rlc1tpXSBhcyBIVE1MRWxlbWVudCkpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gcmVzdWx0O1xyXG5cdH1cclxuXHRwcml2YXRlIF9mcm9tU3RyaW5nKGRhdGE6IHN0cmluZyk6IERvY3VtZW50IHtcclxuXHRcdHJldHVybiAobmV3IERPTVBhcnNlcigpKS5wYXJzZUZyb21TdHJpbmcoZGF0YSwgXCJ0ZXh0L3htbFwiKTtcclxuXHR9XHJcblxyXG5cdHByaXZhdGUgX25vZGVUb0pTKG5vZGU6IEhUTUxFbGVtZW50KSB7XHJcblx0XHRjb25zdCByZXN1bHQ6IElBbnlPYmogPSB7fTtcclxuXHJcblx0XHRpZiAodGhpcy5faGF2ZUF0dHJzKG5vZGUpKSB7XHJcblx0XHRcdGNvbnN0IGF0dHJzID0gbm9kZS5hdHRyaWJ1dGVzO1xyXG5cdFx0XHRmb3IgKGxldCBpID0gMDtpIDwgYXR0cnMubGVuZ3RoO2krKykge1xyXG5cdFx0XHRcdGNvbnN0IHsgbmFtZSwgdmFsdWUgfSA9IGF0dHJzW2ldO1xyXG5cdFx0XHRcdHJlc3VsdFtuYW1lXSA9IHRoaXMuX3RvVHlwZSh2YWx1ZSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdGlmIChub2RlLm5vZGVUeXBlID09PSAzKSB7XHJcblx0XHRcdHJlc3VsdC52YWx1ZSA9IHJlc3VsdC52YWx1ZSB8fCB0aGlzLl90b1R5cGUobm9kZS50ZXh0Q29udGVudCk7XHJcblx0XHRcdHJldHVybiByZXN1bHQ7XHJcblx0XHR9XHJcblxyXG5cdFx0Y29uc3QgY2hpbGROb2RlcyA9IG5vZGUuY2hpbGROb2RlcztcclxuXHRcdGlmIChjaGlsZE5vZGVzKSB7XHJcblx0XHRcdGZvciAobGV0IGkgPSAwO2kgPCBjaGlsZE5vZGVzLmxlbmd0aDtpKyspIHtcclxuXHRcdFx0XHRjb25zdCBzdWJOb2RlID0gY2hpbGROb2Rlc1tpXSBhcyBIVE1MRWxlbWVudDtcclxuXHRcdFx0XHRjb25zdCB0YWcgPSBzdWJOb2RlLnRhZ05hbWU7XHJcblx0XHRcdFx0aWYgKCF0YWcpIHtcclxuXHRcdFx0XHRcdGNvbnRpbnVlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRpZiAodGFnID09PSBBUlJBWV9OQU1FICYmIHN1Yk5vZGUuY2hpbGROb2Rlcykge1xyXG5cdFx0XHRcdFx0cmVzdWx0W3RhZ10gPSB0aGlzLl9nZXRSb3dzKHN1Yk5vZGUuY2hpbGROb2Rlcyk7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdGlmICh0aGlzLl9oYXZlQXR0cnMoc3ViTm9kZSkpIHtcclxuXHRcdFx0XHRcdFx0cmVzdWx0W3RhZ10gPSB0aGlzLl9ub2RlVG9KUyhzdWJOb2RlKTtcclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdHJlc3VsdFt0YWddID0gdGhpcy5fdG9UeXBlKHN1Yk5vZGUudGV4dENvbnRlbnQpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiByZXN1bHQ7XHJcblx0fVxyXG5cdHByaXZhdGUgX3RvVHlwZSh2YWw6IGFueSkge1xyXG5cdFx0aWYgKHZhbCA9PT0gXCJmYWxzZVwiIHx8IHZhbCA9PT0gXCJ0cnVlXCIpIHtcclxuXHRcdFx0cmV0dXJuIHZhbCA9PT0gXCJ0cnVlXCI7XHJcblx0XHR9XHJcblx0XHRpZiAoIWlzTmFOKHZhbCkpIHtcclxuXHRcdFx0cmV0dXJuIE51bWJlcih2YWwpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB2YWw7XHJcblx0fVxyXG5cdHByaXZhdGUgX2hhdmVBdHRycyhub2RlOiBIVE1MRWxlbWVudCkge1xyXG5cdFx0cmV0dXJuIG5vZGUuYXR0cmlidXRlcyAmJiBub2RlLmF0dHJpYnV0ZXMubGVuZ3RoO1xyXG5cdH1cclxufSIsImltcG9ydCB7IEpzb25Ecml2ZXIgfSBmcm9tIFwiLi9Kc29uRHJpdmVyXCI7XHJcbmltcG9ydCB7IENzdkRyaXZlciB9IGZyb20gXCIuL0NzdkRyaXZlclwiO1xyXG5pbXBvcnQgeyBYTUxEcml2ZXIgfSBmcm9tIFwiLi9YTUxEcml2ZXJcIjtcclxuXHJcbmV4cG9ydCBjb25zdCBkYXRhRHJpdmVycyA9IHtcclxuXHRqc29uOiBKc29uRHJpdmVyLFxyXG5cdGNzdjogQ3N2RHJpdmVyXHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgZGF0YURyaXZlcnNQcm8gPSB7XHJcblx0Li4uZGF0YURyaXZlcnMsXHJcblx0eG1sOiBYTUxEcml2ZXJcclxufTsiLCJpbXBvcnQgeyBEYXRhUHJveHkgfSBmcm9tIFwiLi9kYXRhcHJveHlcIjtcclxuaW1wb3J0IHsgSUZpbHRlckNhbGxiYWNrLCBJRmlsdGVyTW9kZSwgSURhdGFDb2xsZWN0aW9uLCBJVHJlZUNvbGxlY3Rpb24sIERhdGFEcml2ZXIsIElEYXRhRHJpdmVyIH0gZnJvbSBcIi4vdHlwZXNcIjtcclxuXHJcbmltcG9ydCB7IElBbnlPYmogfSBmcm9tIFwiQGRoeC90cy1jb21tb24vdHlwZXNcIjtcclxuaW1wb3J0IHsgZGF0YURyaXZlcnMgfSBmcm9tIFwiLi9kcml2ZXJzL2RyaXZlcnNcIjtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpc0VxdWFsT2JqKGE6IGFueSwgYjogYW55KSB7XHJcblx0Zm9yIChjb25zdCBrZXkgaW4gYSkge1xyXG5cdFx0aWYgKGFba2V5XSAhPT0gYltrZXldKSB7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHR9XHJcblx0cmV0dXJuIHRydWU7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIG5hdHVyYWxDb21wYXJlKGEsIGIpIHtcclxuXHRpZiAoaXNOYU4oYSkgfHwgaXNOYU4oYikpIHtcclxuXHRcdGNvbnN0IGF4ID0gW107XHJcblx0XHRjb25zdCBieCA9IFtdO1xyXG5cclxuXHRcdGEucmVwbGFjZSgvKFxcZCspfChcXEQrKS9nLCAoXywgJDEsICQyKSA9PiB7XHJcblx0XHRcdGF4LnB1c2goWyQxIHx8IEluZmluaXR5LCAkMiB8fCBcIlwiXSk7XHJcblx0XHR9KTtcclxuXHRcdGIucmVwbGFjZSgvKFxcZCspfChcXEQrKS9nLCAoXywgJDEsICQyKSA9PiB7XHJcblx0XHRcdGJ4LnB1c2goWyQxIHx8IEluZmluaXR5LCAkMiB8fCBcIlwiXSk7XHJcblx0XHR9KTtcclxuXHJcblx0XHR3aGlsZSAoYXgubGVuZ3RoICYmIGJ4Lmxlbmd0aCkge1xyXG5cdFx0XHRjb25zdCBhbiA9IGF4LnNoaWZ0KCk7XHJcblx0XHRcdGNvbnN0IGJuID0gYnguc2hpZnQoKTtcclxuXHRcdFx0Y29uc3Qgbm4gPSAoYW5bMF0gLSBiblswXSkgfHwgYW5bMV0ubG9jYWxlQ29tcGFyZShiblsxXSk7XHJcblx0XHRcdGlmIChubikge1xyXG5cdFx0XHRcdHJldHVybiBubjtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBheC5sZW5ndGggLSBieC5sZW5ndGg7XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gYSAtIGI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBmaW5kQnlDb25mKGl0ZW06IGFueSwgY29uZjogSUZpbHRlck1vZGUgfCBJRmlsdGVyQ2FsbGJhY2spOiBhbnkge1xyXG5cdGlmICh0eXBlb2YgY29uZiA9PT0gXCJmdW5jdGlvblwiKSB7XHJcblx0XHRpZiAoY29uZi5jYWxsKHRoaXMsIGl0ZW0pKSB7XHJcblx0XHRcdHJldHVybiBpdGVtO1xyXG5cdFx0fVxyXG5cdH0gZWxzZSBpZiAoY29uZi5ieSAmJiBjb25mLm1hdGNoKSB7XHJcblx0XHRpZiAoaXRlbVtjb25mLmJ5XSA9PT0gY29uZi5tYXRjaCkge1xyXG5cdFx0XHRyZXR1cm4gaXRlbTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpc0RlYnVnKCk6IGJvb2xlYW4ge1xyXG5cdGNvbnN0IGRoeCA9ICh3aW5kb3cgYXMgYW55KS5kaHg7XHJcblx0aWYgKHR5cGVvZiBkaHggIT09IFwidW5kZWZpbmVkXCIpIHtcclxuXHRcdHJldHVybiB0eXBlb2YgKGRoeC5kZWJ1ZykgIT09IFwidW5kZWZpbmVkXCIgJiYgZGh4LmRlYnVnO1xyXG5cdH1cclxuXHQvLyByZXR1cm4gdHlwZW9mIERIWF9ERUJVR19NT0RFICE9PSBcInVuZGVmaW5lZFwiICYmIERIWF9ERUJVR19NT0RFO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBkaHhXYXJuaW5nKG1zZzogc3RyaW5nKSB7XHJcblx0Ly8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWNvbnNvbGVcclxuXHRjb25zb2xlLndhcm4obXNnKTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gZGh4RXJyb3IobXNnOiBzdHJpbmcpIHtcclxuXHR0aHJvdyBuZXcgRXJyb3IobXNnKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHRvUHJveHkocHJveHk6IGFueSk6IERhdGFQcm94eSB7XHJcblx0Y29uc3QgdHlwZSA9IHR5cGVvZiBwcm94eTtcclxuXHJcblx0aWYgKHR5cGUgPT09IFwic3RyaW5nXCIpIHtcclxuXHRcdHJldHVybiBuZXcgRGF0YVByb3h5KHByb3h5KTtcclxuXHR9IGVsc2UgaWYgKHR5cGUgPT09IFwib2JqZWN0XCIpIHtcclxuXHRcdHJldHVybiBwcm94eTtcclxuXHR9XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIHRvRGF0YURyaXZlcihkcml2ZXI6IERhdGFEcml2ZXIgfCBJRGF0YURyaXZlcikge1xyXG5cdGlmICh0eXBlb2YgZHJpdmVyID09PSBcInN0cmluZ1wiKSB7XHJcblx0XHRjb25zdCBkaHggPSAod2luZG93IGFzIGFueSkuZGh4O1xyXG5cdFx0Y29uc3QgZHJpdmVycyA9IChkaHggJiYgZGh4LmRhdGFEcml2ZXJzKSB8fCBkYXRhRHJpdmVycztcclxuXHJcblx0XHRpZiAoZHJpdmVyc1tkcml2ZXJdKSB7XHJcblx0XHRcdHJldHVybiBuZXcgZHJpdmVyc1tkcml2ZXJdKCk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHQvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tY29uc29sZVxyXG5cdFx0XHRjb25zb2xlLndhcm4oXCJJbmNvcnJlY3QgZGF0YSBkcml2ZXIgdHlwZTpcIiwgZHJpdmVyKTtcclxuXHRcdFx0Ly8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWNvbnNvbGVcclxuXHRcdFx0Y29uc29sZS53YXJuKFwiQXZhaWxhYmxlIHR5cGVzOlwiLCBKU09OLnN0cmluZ2lmeShPYmplY3Qua2V5cyhkcml2ZXJzKSkpO1xyXG5cdFx0fVxyXG5cdH0gZWxzZSBpZiAodHlwZW9mIGRyaXZlciA9PT0gXCJvYmplY3RcIikge1xyXG5cdFx0cmV0dXJuIGRyaXZlcjtcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjb3B5V2l0aG91dElubmVyKG9iajogSUFueU9iaiwgZm9yYmlkZGVuPzogSUFueU9iaik6IElBbnlPYmoge1xyXG5cdGNvbnN0IHJlc3VsdCA9IHt9O1xyXG5cdGZvciAoY29uc3Qga2V5IGluIG9iaikge1xyXG5cdFx0aWYgKGtleVswXSAhPT0gXCIkXCIgJiYgKCFmb3JiaWRkZW4gfHwgIWZvcmJpZGRlbltrZXldKSkge1xyXG5cdFx0XHRyZXN1bHRba2V5XSA9IG9ialtrZXldO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRyZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaXNUcmVlQ29sbGVjdGlvbihvYmo6IElEYXRhQ29sbGVjdGlvbjxhbnk+IHwgSVRyZWVDb2xsZWN0aW9uPGFueT4pOiBvYmogaXMgSVRyZWVDb2xsZWN0aW9uPGFueT4ge1xyXG5cdHJldHVybiBCb29sZWFuKChvYmogYXMgSVRyZWVDb2xsZWN0aW9uKS5nZXRSb290KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGhhc0pzb25PckFycmF5U3RydWN0dXJlKHN0cjogYW55KTogYm9vbGVhbiB7XHJcblx0aWYgKHR5cGVvZiBzdHIgPT09IFwib2JqZWN0XCIpIHsgcmV0dXJuIHRydWU7IH1cclxuXHRpZiAodHlwZW9mIHN0ciAhPT0gXCJzdHJpbmdcIikgeyByZXR1cm4gZmFsc2U7IH1cclxuXHR0cnkge1xyXG5cdFx0Y29uc3QgcmVzdWx0ID0gSlNPTi5wYXJzZShzdHIpO1xyXG5cdFx0cmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChyZXN1bHQpID09PSBcIltvYmplY3QgT2JqZWN0XVwiXHJcblx0XHRcdHx8IEFycmF5LmlzQXJyYXkocmVzdWx0KTtcclxuXHR9IGNhdGNoIChlcnIpIHtcclxuXHRcdHJldHVybiBmYWxzZTtcclxuXHR9XHJcbn0iLCJpbXBvcnQgeyBFdmVudFN5c3RlbSwgSUV2ZW50U3lzdGVtIH0gZnJvbSBcIkBkaHgvdHMtY29tbW9uL2V2ZW50c1wiO1xyXG5pbXBvcnQgeyBTZWxlY3Rpb25FdmVudHMgfSBmcm9tIFwiQGRoeC90cy1jb21tb24vdHlwZXNcIjtcclxuaW1wb3J0IHsgRGF0YUNvbGxlY3Rpb24gfSBmcm9tIFwiLi9kYXRhY29sbGVjdGlvblwiO1xyXG5pbXBvcnQgeyBEYXRhRXZlbnRzIH0gZnJvbSBcIi4vdHlwZXNcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBTZWxlY3Rpb257XHJcblx0cHVibGljIGV2ZW50cyA6IElFdmVudFN5c3RlbTxTZWxlY3Rpb25FdmVudHM+O1xyXG5cclxuXHRwcml2YXRlIF9zZWxlY3RlZCA6IHN0cmluZztcclxuXHRwcml2YXRlIF9kYXRhOkRhdGFDb2xsZWN0aW9uO1xyXG5cclxuXHRjb25zdHJ1Y3RvcihfY29uZmlnOmFueSwgZGF0YT86RGF0YUNvbGxlY3Rpb24sIGV2ZW50cz86SUV2ZW50U3lzdGVtPGFueT4pe1xyXG5cdFx0dGhpcy5ldmVudHMgPSBldmVudHMgfHwgKG5ldyBFdmVudFN5c3RlbTxhbnk+KHRoaXMpKTtcclxuXHRcdHRoaXMuX2RhdGEgPSBkYXRhO1xyXG5cclxuXHRcdHRoaXMuX2RhdGEuZXZlbnRzLm9uKERhdGFFdmVudHMucmVtb3ZlQWxsLCAoKSA9PiB7XHJcblx0XHRcdHRoaXMuX3NlbGVjdGVkID0gbnVsbDtcclxuXHRcdH0pO1xyXG5cdFx0dGhpcy5fZGF0YS5ldmVudHMub24oRGF0YUV2ZW50cy5jaGFuZ2UsICgpID0+IHtcclxuXHRcdFx0aWYgKHRoaXMuX3NlbGVjdGVkKXtcclxuXHRcdFx0XHRjb25zdCBuZWFyID0gdGhpcy5fZGF0YS5nZXROZWFySWQodGhpcy5fc2VsZWN0ZWQpO1xyXG5cdFx0XHRcdGlmIChuZWFyICE9PSB0aGlzLl9zZWxlY3RlZCl7XHJcblx0XHRcdFx0XHR0aGlzLl9zZWxlY3RlZCA9IG51bGw7XHJcblx0XHRcdFx0XHRpZiAobmVhcil7XHJcblx0XHRcdFx0XHRcdHRoaXMuYWRkKG5lYXIpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRnZXRJZCgpOiBzdHJpbmcge1xyXG5cdFx0cmV0dXJuIHRoaXMuX3NlbGVjdGVkO1xyXG5cdH1cclxuXHJcblx0Z2V0SXRlbSgpOmFueSB7XHJcblx0XHRpZiAodGhpcy5fc2VsZWN0ZWQpe1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5fZGF0YS5nZXRJdGVtKHRoaXMuX3NlbGVjdGVkKTtcclxuXHRcdH1cclxuXHRcdHJldHVybiBudWxsO1xyXG5cdH1cclxuXHJcblx0cmVtb3ZlKGlkPzogc3RyaW5nKTogYm9vbGVhbiB7XHJcblx0XHRpZCA9IGlkIHx8IHRoaXMuX3NlbGVjdGVkO1xyXG5cdFx0aWYgKCFpZCl7XHJcblx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0fVxyXG5cdFx0aWYgKHRoaXMuZXZlbnRzLmZpcmUoU2VsZWN0aW9uRXZlbnRzLmJlZm9yZVVuU2VsZWN0LCBbaWRdKSkge1xyXG5cdFx0XHR0aGlzLl9kYXRhLnVwZGF0ZShpZCwgeyAkc2VsZWN0ZWQ6IGZhbHNlIH0pO1xyXG5cdFx0XHR0aGlzLl9zZWxlY3RlZCA9IG51bGw7XHJcblx0XHRcdHRoaXMuZXZlbnRzLmZpcmUoU2VsZWN0aW9uRXZlbnRzLmFmdGVyVW5TZWxlY3QsIFtpZF0pO1xyXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdH1cclxuXHRcdHJldHVybiBmYWxzZTtcclxuXHR9XHJcblxyXG5cdGFkZChpZDogc3RyaW5nKSB7XHJcblx0XHRpZiAodGhpcy5fc2VsZWN0ZWQgPT09IGlkKSB7IHJldHVybjsgfVxyXG5cdFx0dGhpcy5yZW1vdmUoKTtcclxuXHJcblx0XHRpZiAodGhpcy5ldmVudHMuZmlyZShTZWxlY3Rpb25FdmVudHMuYmVmb3JlU2VsZWN0LCBbaWRdKSkge1xyXG5cdFx0XHR0aGlzLl9zZWxlY3RlZCA9IGlkO1xyXG5cdFx0XHR0aGlzLl9kYXRhLnVwZGF0ZShpZCwgeyAkc2VsZWN0ZWQ6IHRydWUgfSk7XHJcblx0XHRcdHRoaXMuZXZlbnRzLmZpcmUoU2VsZWN0aW9uRXZlbnRzLmFmdGVyU2VsZWN0LCBbaWRdKTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbiIsImltcG9ydCB7IElBbnlPYmogfSBmcm9tIFwiQGRoeC90cy1jb21tb24vdHlwZXNcIjtcclxuXHJcbmNvbnN0IElOREVOVF9TVEVQID0gNDtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBqc29uVG9YTUwoZGF0YTogSUFueU9ialtdLCByb290ID0gXCJyb290XCIpOiBzdHJpbmcge1xyXG5cdGxldCByZXN1bHQgPSBgPD94bWwgdmVyc2lvbj1cIjEuMFwiIGVuY29kaW5nPVwiaXNvLTg4NTktMVwiPz5cXG48JHtyb290fT5gO1xyXG5cdGZvciAobGV0IGk9MDsgaTxkYXRhLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRyZXN1bHQgKz0gXCJcXG5cIiArIGl0ZW1Ub1hNTChkYXRhW2ldKTtcclxuXHR9XHJcblx0cmV0dXJuIHJlc3VsdCArIGBcXG48LyR7cm9vdH0+YDtcclxufVxyXG5cclxuZnVuY3Rpb24gd3MoY291bnQ6IG51bWJlcikge1xyXG5cdHJldHVybiBcIiBcIi5yZXBlYXQoY291bnQpO1xyXG59XHJcbmZ1bmN0aW9uIGl0ZW1Ub1hNTChpdGVtOiBJQW55T2JqLCBpbmRlbnQ6IG51bWJlciA9IElOREVOVF9TVEVQKSB7XHJcblx0bGV0IHJlc3VsdCA9IHdzKGluZGVudCkgKyBcIjxpdGVtPlxcblwiO1xyXG5cdGZvciAoY29uc3Qga2V5IGluIGl0ZW0pIHtcclxuXHRcdGlmIChBcnJheS5pc0FycmF5KGl0ZW1ba2V5XSkpIHtcclxuXHRcdFx0cmVzdWx0ICs9IHdzKGluZGVudCArIElOREVOVF9TVEVQKSArIGA8JHtrZXl9PlxcbmA7XHJcblx0XHRcdHJlc3VsdCArPSBpdGVtW2tleV0ubWFwKChzdWJJdGVtOiBJQW55T2JqKSA9PiBpdGVtVG9YTUwoc3ViSXRlbSwgaW5kZW50ICsgSU5ERU5UX1NURVAgKiAyKSkuam9pbihcIlxcblwiKSArIFwiXFxuXCI7XHJcblx0XHRcdHJlc3VsdCArPSB3cyhpbmRlbnQgKyBJTkRFTlRfU1RFUCkgKyBgPC8ke2tleX0+XFxuYDtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHJlc3VsdCArPSB3cyhpbmRlbnQgKyBJTkRFTlRfU1RFUCkgKyBgPCR7a2V5fT4ke2l0ZW1ba2V5XX08LyR7a2V5fT5cXG5gO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRyZXN1bHQgKz0gd3MoaW5kZW50KSArIFwiPC9pdGVtPlwiO1xyXG5cdHJldHVybiByZXN1bHQ7XHJcbn1cclxuIiwiaW1wb3J0IHsgZmluZEluZGV4LCB1aWQgfSBmcm9tIFwiQGRoeC90cy1jb21tb24vY29yZVwiO1xyXG5pbXBvcnQgeyBJRXZlbnRTeXN0ZW0gfSBmcm9tIFwiQGRoeC90cy1jb21tb24vZXZlbnRzXCI7XHJcbmltcG9ydCB7IERhdGFDb2xsZWN0aW9uIH0gZnJvbSBcIi4vZGF0YWNvbGxlY3Rpb25cIjtcclxuaW1wb3J0IHsgRGF0YVByb3h5IH0gZnJvbSBcIi4vZGF0YXByb3h5XCI7XHJcbmltcG9ydCB7IHRvRGF0YURyaXZlciwgaXNUcmVlQ29sbGVjdGlvbiwgY29weVdpdGhvdXRJbm5lciB9IGZyb20gXCIuL2hlbHBlcnNcIjtcclxuaW1wb3J0IHsgRGF0YUNhbGxiYWNrLCBEYXRhRXZlbnRzLCBJZCwgSURhdGFDb2xsZWN0aW9uLCBJRGF0YUl0ZW0sIElUcmVlQ29sbGVjdGlvbiwgVHJlZUZpbHRlclR5cGUsIElGaWx0ZXJDYWxsYmFjaywgSUZpbHRlck1vZGUsIElUcmVlRmlsdGVyQ29uZmlnLCBEYXRhRHJpdmVyLCBJU29ydE1vZGUgfSBmcm9tIFwiLi90eXBlc1wiO1xyXG5pbXBvcnQgeyBJQW55T2JqIH0gZnJvbSBcIkBkaHgvdHMtY29tbW9uL3R5cGVzXCI7XHJcbmltcG9ydCB7IGVsIH0gZnJvbSBcIi4uLy4uL3RzLWNvbW1vbi9kb21cIjtcclxuXHJcbmZ1bmN0aW9uIGFkZFRvT3JkZXIoc3RvcmU6IGFueSwgb2JqOiBvYmplY3QsIHBhcmVudDogSWQsIGluZGV4OiBudW1iZXIpIHtcclxuXHRpZiAoaW5kZXggIT09IHVuZGVmaW5lZCAmJiBpbmRleCAhPT0gLTEgJiYgc3RvcmVbcGFyZW50XSAmJiBzdG9yZVtwYXJlbnRdW2luZGV4XSkge1xyXG5cdFx0c3RvcmVbcGFyZW50XS5zcGxpY2UoaW5kZXgsIDAsIG9iaik7XHJcblx0fSBlbHNlIHtcclxuXHRcdGlmICghc3RvcmVbcGFyZW50XSkge1xyXG5cdFx0XHRzdG9yZVtwYXJlbnRdID0gW107XHJcblx0XHR9XHJcblx0XHRzdG9yZVtwYXJlbnRdLnB1c2gob2JqKTtcclxuXHR9XHJcbn1cclxuXHJcblxyXG5leHBvcnQgY2xhc3MgVHJlZUNvbGxlY3Rpb248VCBleHRlbmRzIElEYXRhSXRlbSA9IElEYXRhSXRlbT4gZXh0ZW5kcyBEYXRhQ29sbGVjdGlvbjxUPiBpbXBsZW1lbnRzIElUcmVlQ29sbGVjdGlvbjxUPiB7XHJcblxyXG5cdHByb3RlY3RlZCBfY2hpbGRzOiB7IFtpZDogc3RyaW5nXTogVFtdIH07XHJcblx0cHJvdGVjdGVkIF9yb290OiBJZDtcclxuXHRwcm90ZWN0ZWQgX2ZpbHRlcnM6IHtcclxuXHRcdFtpZDogc3RyaW5nXToge1xyXG5cdFx0XHRydWxlOiBJRmlsdGVyTW9kZSB8IElGaWx0ZXJDYWxsYmFjayxcclxuXHRcdFx0Y29uZmlnOiBJVHJlZUZpbHRlckNvbmZpZ1xyXG5cdFx0fVxyXG5cdH07XHJcblx0cHJpdmF0ZSBfaW5pdENoaWxkczogeyBbaWQ6IHN0cmluZ106IFRbXSB9O1xyXG5cclxuXHRjb25zdHJ1Y3Rvcihjb25maWc/OiBhbnksIGV2ZW50cz86IElFdmVudFN5c3RlbTxEYXRhRXZlbnRzPikge1xyXG5cdFx0c3VwZXIoY29uZmlnLCBldmVudHMpO1xyXG5cdFx0Y29uc3Qgcm9vdCA9IHRoaXMuX3Jvb3QgPSBcIl9ST09UX1wiICsgdWlkKCk7XHJcblx0XHR0aGlzLl9jaGlsZHMgPSB7IFtyb290XTogW10gfTtcclxuXHRcdHRoaXMuX2luaXRDaGlsZHMgPSBudWxsO1xyXG5cdH1cclxuXHRhZGQob2JqOiBJRGF0YUl0ZW0sIGluZGV4PzogbnVtYmVyLCBwYXJlbnQ/OiBJZCk6IElkO1xyXG5cdGFkZChvYmo6IElEYXRhSXRlbVtdLCBpbmRleD86IG51bWJlciwgcGFyZW50PzogSWQpOiBJZFtdO1xyXG5cdGFkZChvYmo6IElEYXRhSXRlbSB8IElEYXRhSXRlbVtdLCBpbmRleDogbnVtYmVyID0gLTEsIHBhcmVudDogSWQgPSB0aGlzLl9yb290KTogSWQgfCBJZFtdIHtcclxuXHRcdGlmICh0eXBlb2Ygb2JqICE9PSBcIm9iamVjdFwiKSB7XHJcblx0XHRcdG9iaiA9IHtcclxuXHRcdFx0XHR2YWx1ZTogb2JqXHJcblx0XHRcdH07XHJcblx0XHR9XHJcblx0XHRpZiAoQXJyYXkuaXNBcnJheShvYmopKSB7XHJcblx0XHRcdHJldHVybiBvYmoubWFwKChlbGVtZW50LCBrZXkpID0+IHtcclxuXHRcdFx0XHRpZiAoa2V5ID4gMCAmJiBpbmRleCAhPT0gLTEpIHtcclxuXHRcdFx0XHRcdGluZGV4ID0gaW5kZXggKyAxO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRlbGVtZW50LnBhcmVudCA9IGVsZW1lbnQucGFyZW50ID8gZWxlbWVudC5wYXJlbnQudG9TdHJpbmcoKSA6IHBhcmVudDtcclxuXHRcdFx0XHRjb25zdCBpZCA9IHN1cGVyLmFkZChlbGVtZW50LCBpbmRleCk7XHJcblx0XHRcdFx0aWYgKEFycmF5LmlzQXJyYXkoZWxlbWVudC5pdGVtcykpIHtcclxuXHRcdFx0XHRcdGZvciAoY29uc3QgaXRlbSBvZiBlbGVtZW50Lml0ZW1zKSB7XHJcblx0XHRcdFx0XHRcdHRoaXMuYWRkKGl0ZW0sIC0xLCBlbGVtZW50LmlkKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0cmV0dXJuIGlkO1xyXG5cdFx0XHR9KTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdG9iai5wYXJlbnQgPSBvYmoucGFyZW50ID8gb2JqLnBhcmVudC50b1N0cmluZygpIDogcGFyZW50O1xyXG5cdFx0XHRjb25zdCBpZCA9IHN1cGVyLmFkZChvYmosIGluZGV4KTtcclxuXHJcblx0XHRcdGlmIChBcnJheS5pc0FycmF5KG9iai5pdGVtcykpIHtcclxuXHRcdFx0XHRmb3IgKGNvbnN0IGl0ZW0gb2Ygb2JqLml0ZW1zKSB7XHJcblx0XHRcdFx0XHR0aGlzLmFkZChpdGVtLCAtMSwgb2JqLmlkKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIGlkO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRnZXRSb290KCk6IElkIHtcclxuXHRcdHJldHVybiB0aGlzLl9yb290O1xyXG5cdH1cclxuXHRnZXRQYXJlbnQoaWQ6IElkLCBhc09iajogYm9vbGVhbiA9IGZhbHNlKTogSWQge1xyXG5cdFx0aWYgKCF0aGlzLl9wdWxsW2lkXSkge1xyXG5cdFx0XHRyZXR1cm4gbnVsbDtcclxuXHRcdH1cclxuXHRcdGNvbnN0IHBhcmVudCA9IHRoaXMuX3B1bGxbaWRdLnBhcmVudDtcclxuXHRcdHJldHVybiBhc09iaiA/IHRoaXMuX3B1bGxbcGFyZW50XSA6IHBhcmVudDtcclxuXHR9XHJcblx0Z2V0SXRlbXMoaWQ6IElkKTogVFtdIHtcclxuXHRcdGlmICh0aGlzLl9jaGlsZHMgJiYgdGhpcy5fY2hpbGRzW2lkXSkge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5fY2hpbGRzW2lkXTtcclxuXHRcdH1cclxuXHRcdHJldHVybiBbXTtcclxuXHR9XHJcblx0Z2V0TGVuZ3RoKGlkOiBJZCA9IHRoaXMuX3Jvb3QpOiBudW1iZXIge1xyXG5cdFx0aWYgKCF0aGlzLl9jaGlsZHNbaWRdKSB7XHJcblx0XHRcdHJldHVybiBudWxsO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHRoaXMuX2NoaWxkc1tpZF0ubGVuZ3RoO1xyXG5cdH1cclxuXHRyZW1vdmVBbGwoaWQ/OiBJZCk6IHZvaWQge1xyXG5cdFx0aWYgKGlkKSB7XHJcblx0XHRcdGNvbnN0IGNoaWxkcyA9IFsuLi4gdGhpcy5fY2hpbGRzW2lkXV07XHJcblx0XHRcdGZvciAoY29uc3QgY2hpbGQgb2YgY2hpbGRzKSB7XHJcblx0XHRcdFx0dGhpcy5yZW1vdmUoY2hpbGQuaWQpO1xyXG5cdFx0XHR9XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRzdXBlci5yZW1vdmVBbGwoKTtcclxuXHRcdFx0Y29uc3Qgcm9vdCA9IHRoaXMuX3Jvb3Q7XHJcblx0XHRcdHRoaXMuX2luaXRDaGlsZHMgPSBudWxsO1xyXG5cdFx0XHR0aGlzLl9jaGlsZHMgPSB7IFtyb290XTogW10gfTtcclxuXHRcdH1cclxuXHR9XHJcblx0Z2V0SW5kZXgoaWQ6IElkKTogbnVtYmVyIHtcclxuXHRcdGNvbnN0IHBhcmVudCA9IHRoaXMuZ2V0UGFyZW50KGlkKTtcclxuXHRcdGlmICghcGFyZW50IHx8ICF0aGlzLl9jaGlsZHNbcGFyZW50XSkge1xyXG5cdFx0XHRyZXR1cm4gLTE7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gZmluZEluZGV4KHRoaXMuX2NoaWxkc1twYXJlbnRdLCBpdGVtID0+IGl0ZW0uaWQgPT09IGlkKTtcclxuXHR9XHJcblx0c29ydChieT86IElTb3J0TW9kZSk6IHZvaWQge1xyXG5cdFx0aWYgKCFieSkge1xyXG5cdFx0XHR0aGlzLl9jaGlsZHMgPSB7fTtcclxuXHRcdFx0Ly8gW2RpcnR5XVxyXG5cdFx0XHR0aGlzLl9wYXJzZV9kYXRhKE9iamVjdC5rZXlzKHRoaXMuX3B1bGwpLm1hcChrZXkgPT4gdGhpcy5fcHVsbFtrZXldKSk7XHJcblx0XHRcdGlmICh0aGlzLl9maWx0ZXJzKSB7XHJcblx0XHRcdFx0Zm9yIChjb25zdCBrZXkgaW4gdGhpcy5fZmlsdGVycykge1xyXG5cdFx0XHRcdFx0Y29uc3QgZmlsdGVyID0gdGhpcy5fZmlsdGVyc1trZXldO1xyXG5cdFx0XHRcdFx0dGhpcy5maWx0ZXIoZmlsdGVyLnJ1bGUsIGZpbHRlci5jb25maWcpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0Zm9yIChjb25zdCBrZXkgaW4gdGhpcy5fY2hpbGRzKSB7XHJcblx0XHRcdFx0dGhpcy5fc29ydC5zb3J0KHRoaXMuX2NoaWxkc1trZXldLCBieSk7XHJcblx0XHRcdH1cclxuXHRcdFx0aWYgKHRoaXMuX2luaXRDaGlsZHMgJiYgT2JqZWN0LmtleXModGhpcy5faW5pdENoaWxkcykubGVuZ3RoKSB7XHJcblx0XHRcdFx0Zm9yIChjb25zdCBrZXkgaW4gdGhpcy5faW5pdENoaWxkcykge1xyXG5cdFx0XHRcdFx0dGhpcy5fc29ydC5zb3J0KHRoaXMuX2luaXRDaGlsZHNba2V5XSwgYnkpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuZXZlbnRzLmZpcmUoRGF0YUV2ZW50cy5jaGFuZ2UpO1xyXG5cdH1cclxuXHRtYXAoY2I6IERhdGFDYWxsYmFjazxUPiwgcGFyZW50OiBJZCA9IHRoaXMuX3Jvb3QsIGRpcmVjdDogYm9vbGVhbiA9IHRydWUpOiBhbnlbXSB7XHJcblx0XHRsZXQgcmVzdWx0OiBhbnlbXSA9IFtdO1xyXG5cdFx0aWYgKCF0aGlzLmhhdmVJdGVtcyhwYXJlbnQpKSB7XHJcblx0XHRcdHJldHVybiByZXN1bHQ7XHJcblx0XHR9XHJcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2NoaWxkc1twYXJlbnRdLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHJlc3VsdC5wdXNoKGNiLmNhbGwodGhpcywgdGhpcy5fY2hpbGRzW3BhcmVudF1baV0sIGkpKTtcclxuXHRcdFx0aWYgKGRpcmVjdCkge1xyXG5cdFx0XHRcdGNvbnN0IGNoaWxkUmVzdWx0ID0gdGhpcy5tYXAoY2IsIHRoaXMuX2NoaWxkc1twYXJlbnRdW2ldLmlkLCBkaXJlY3QpO1xyXG5cdFx0XHRcdHJlc3VsdCA9IHJlc3VsdC5jb25jYXQoY2hpbGRSZXN1bHQpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gcmVzdWx0O1xyXG5cdH1cclxuXHRmaWx0ZXIocnVsZT86IElGaWx0ZXJNb2RlIHwgSUZpbHRlckNhbGxiYWNrLCBjb25maWc6IElUcmVlRmlsdGVyQ29uZmlnID0ge30pOiB2b2lkIHtcclxuXHRcdGlmICghcnVsZSkge1xyXG5cdFx0XHR0aGlzLnJlc3RvcmVPcmRlcigpO1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKCF0aGlzLl9pbml0Q2hpbGRzKSB7XHJcblx0XHRcdHRoaXMuX2luaXRDaGlsZHMgPSB0aGlzLl9jaGlsZHM7XHJcblx0XHR9XHJcblx0XHRjb25maWcudHlwZSA9IGNvbmZpZy50eXBlIHx8IFRyZWVGaWx0ZXJUeXBlLmxlYWZzO1xyXG5cclxuXHRcdC8vIFt0b2RvXSB3ZSBjYW4gc3RvcmUgbXVsdGlwbGUgZmlsdGVyIHJ1bGVzLCBsaWtlIGluIGRhdGFjb2xsZWN0aW9uXHJcblx0XHR0aGlzLl9maWx0ZXJzID0ge307XHJcblx0XHR0aGlzLl9maWx0ZXJzLl8gPSB7XHJcblx0XHRcdHJ1bGUsXHJcblx0XHRcdGNvbmZpZ1xyXG5cdFx0fTtcclxuXHJcblx0XHRjb25zdCBuZXdDaGlsZHMgPSB7fTtcclxuXHRcdHRoaXMuX3JlY3Vyc2l2ZUZpbHRlcihydWxlLCBjb25maWcsIHRoaXMuX3Jvb3QsIDAsIG5ld0NoaWxkcyk7XHJcblx0XHRjb25zdCBwYXJlbnRzID0gW107XHJcblx0XHRmb3IgKGNvbnN0IGkgaW4gbmV3Q2hpbGRzKSB7XHJcblx0XHRcdGNvbnN0IGNoZWNrID0gbmV3Q2hpbGRzW2ldLm1hcCgoZWxlbWVudCkgPT4ge1xyXG5cdFx0XHRcdHJldHVybiAhdGhpcy5oYXZlSXRlbXMoZWxlbWVudC5pZCkgJiYgdGhpcy5nZXRQYXJlbnQoZWxlbWVudC5pZCkgIT09IHRoaXMuZ2V0Um9vdCgpO1xyXG5cdFx0XHR9KS5maW5kKGl0ZW0gPT4gaXRlbSA/IGl0ZW0gOiBudWxsKTtcclxuXHRcdFx0aWYgKG5ld0NoaWxkc1tpXS5sZW5ndGggPiAwICYmIG5ld0NoaWxkc1tpXSAhPT0gbmV3Q2hpbGRzW3RoaXMuZ2V0Um9vdCgpXSAmJiBjaGVjaykge1xyXG5cdFx0XHRcdGNvbnN0IGl0ZW0gPSBuZXdDaGlsZHNbdGhpcy5nZXRSb290KCldLmZpbmQoZnVuY3Rpb24oZWxlbWVudCkge1xyXG5cdFx0XHRcdFx0aWYgKGVsZW1lbnQuaWQgPT09IGkpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIGVsZW1lbnQ7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdFx0aWYgKGl0ZW0pIHtcclxuXHRcdFx0XHRcdHBhcmVudHMucHVzaChpdGVtKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdG5ld0NoaWxkc1t0aGlzLmdldFJvb3QoKV0gPSBwYXJlbnRzO1xyXG5cdFx0dGhpcy5fY2hpbGRzID0gbmV3Q2hpbGRzO1xyXG5cclxuXHRcdHRoaXMuZXZlbnRzLmZpcmUoRGF0YUV2ZW50cy5jaGFuZ2UpO1xyXG5cdH1cclxuXHRyZXN0b3JlT3JkZXIoKTogdm9pZCB7XHJcblx0XHRpZiAodGhpcy5faW5pdENoaWxkcykge1xyXG5cdFx0XHR0aGlzLl9jaGlsZHMgPSB0aGlzLl9pbml0Q2hpbGRzO1xyXG5cdFx0XHR0aGlzLl9pbml0Q2hpbGRzID0gbnVsbDtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLmV2ZW50cy5maXJlKERhdGFFdmVudHMuY2hhbmdlKTtcclxuXHR9XHJcblx0Y29weShpZDogSWQsIGluZGV4OiBudW1iZXIsIHRhcmdldDogSURhdGFDb2xsZWN0aW9uIHwgSVRyZWVDb2xsZWN0aW9uLCB0YXJnZXRJZDogSWQpOiBJZDtcclxuXHRjb3B5KGlkOiBJZFtdLCBpbmRleDogbnVtYmVyLCB0YXJnZXQ6IElEYXRhQ29sbGVjdGlvbiB8IElUcmVlQ29sbGVjdGlvbiwgdGFyZ2V0SWQ6IElkKTogSWRbXTtcclxuXHRjb3B5KGlkOiBJZCB8IElkW10sIGluZGV4OiBudW1iZXIsIHRhcmdldDogSURhdGFDb2xsZWN0aW9uIHwgSVRyZWVDb2xsZWN0aW9uID0gdGhpcywgdGFyZ2V0SWQ6IElkID0gdGhpcy5fcm9vdCk6IElkIHwgSWRbXSB7XHJcblx0XHRpZiAoaWQgaW5zdGFuY2VvZiBBcnJheSkge1xyXG5cdFx0XHRyZXR1cm4gaWQubWFwKChlbGVtZW50SWQsIGtleSkgPT4ge1xyXG5cdFx0XHRcdGlmICghdGhpcy5leGlzdHMoZWxlbWVudElkKSkge1xyXG5cdFx0XHRcdFx0cmV0dXJuIG51bGw7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGNvbnN0IGN1cnJlbnRDaGlsZHMgPSB0aGlzLl9jaGlsZHNbZWxlbWVudElkXTtcclxuXHRcdFx0XHRjb25zdCBlbGVtZW50SW5kZXggPSBpbmRleCA9PT0gLTEgPyAtMSA6IGluZGV4ICsga2V5O1xyXG5cclxuXHRcdFx0XHRpZiAodGFyZ2V0ID09PSB0aGlzICYmICF0aGlzLmNhbkNvcHkoZWxlbWVudElkLCB0YXJnZXRJZCkpIHtcclxuXHRcdFx0XHRcdHJldHVybiBudWxsO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRjb25zdCBpdGVtQ29weSA9IGNvcHlXaXRob3V0SW5uZXIodGhpcy5nZXRJdGVtKGVsZW1lbnRJZCksIHsgaXRlbXM6IHRydWUgfSk7XHJcblx0XHRcdFx0aWYgKHRhcmdldC5leGlzdHMoZWxlbWVudElkKSkge1xyXG5cdFx0XHRcdFx0aXRlbUNvcHkuaWQgPSB1aWQoKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0aWYgKCFpc1RyZWVDb2xsZWN0aW9uKHRhcmdldCkpIHtcclxuXHRcdFx0XHRcdHRhcmdldC5hZGQoaXRlbUNvcHksIGVsZW1lbnRJbmRleCk7XHJcblx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGlmICh0aGlzLmV4aXN0cyhlbGVtZW50SWQpKSB7XHJcblx0XHRcdFx0XHRpdGVtQ29weS5wYXJlbnQgPSB0YXJnZXRJZDtcclxuXHRcdFx0XHRcdGlmICh0YXJnZXQgIT09IHRoaXMgJiYgdGFyZ2V0SWQgPT09IHRoaXMuX3Jvb3QpIHtcclxuXHRcdFx0XHRcdFx0aXRlbUNvcHkucGFyZW50ID0gdGFyZ2V0LmdldFJvb3QoKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdHRhcmdldC5hZGQoaXRlbUNvcHksIGVsZW1lbnRJbmRleCk7XHJcblx0XHRcdFx0XHRlbGVtZW50SWQgPSBpdGVtQ29weS5pZDtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0aWYgKGN1cnJlbnRDaGlsZHMpIHtcclxuXHRcdFx0XHRcdGZvciAoY29uc3QgY2hpbGQgb2YgY3VycmVudENoaWxkcykge1xyXG5cdFx0XHRcdFx0XHRjb25zdCBjaGlsZElkID0gY2hpbGQuaWQ7XHJcblx0XHRcdFx0XHRcdGNvbnN0IGNoaWxkSW5kZXggPSB0aGlzLmdldEluZGV4KGNoaWxkSWQpO1xyXG5cdFx0XHRcdFx0XHRpZiAodHlwZW9mIGVsZW1lbnRJZCA9PT0gXCJzdHJpbmdcIikge1xyXG5cdFx0XHRcdFx0XHRcdHRoaXMuY29weShjaGlsZElkLCBjaGlsZEluZGV4LCB0YXJnZXQsIGVsZW1lbnRJZCk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0cmV0dXJuIGVsZW1lbnRJZDtcclxuXHRcdFx0fSk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRpZiAoIXRoaXMuZXhpc3RzKGlkKSkge1xyXG5cdFx0XHRcdHJldHVybiBudWxsO1xyXG5cdFx0XHR9XHJcblx0XHRcdGNvbnN0IGN1cnJlbnRDaGlsZHMgPSB0aGlzLl9jaGlsZHNbaWRdO1xyXG5cdFx0XHRpZiAodGFyZ2V0ID09PSB0aGlzICYmICF0aGlzLmNhbkNvcHkoaWQsIHRhcmdldElkKSkge1xyXG5cdFx0XHRcdHJldHVybiBudWxsO1xyXG5cdFx0XHR9XHJcblx0XHRcdGNvbnN0IGl0ZW1Db3B5ID0gY29weVdpdGhvdXRJbm5lcih0aGlzLmdldEl0ZW0oaWQpLCB7IGl0ZW1zOiB0cnVlIH0pO1xyXG5cdFx0XHRpZiAodGFyZ2V0LmV4aXN0cyhpZCkpIHtcclxuXHRcdFx0XHRpdGVtQ29weS5pZCA9IHVpZCgpO1xyXG5cdFx0XHR9XHJcblx0XHRcdGlmICghaXNUcmVlQ29sbGVjdGlvbih0YXJnZXQpKSB7XHJcblx0XHRcdFx0dGFyZ2V0LmFkZChpdGVtQ29weSwgaW5kZXgpO1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cdFx0XHRpZiAodGhpcy5leGlzdHMoaWQpKSB7XHJcblx0XHRcdFx0aXRlbUNvcHkucGFyZW50ID0gdGFyZ2V0SWQ7XHJcblx0XHRcdFx0aWYgKHRhcmdldCAhPT0gdGhpcyAmJiB0YXJnZXRJZCA9PT0gdGhpcy5fcm9vdCkge1xyXG5cdFx0XHRcdFx0aXRlbUNvcHkucGFyZW50ID0gdGFyZ2V0LmdldFJvb3QoKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0dGFyZ2V0LmFkZChpdGVtQ29weSwgaW5kZXgpO1xyXG5cdFx0XHRcdGlkID0gaXRlbUNvcHkuaWQ7XHJcblx0XHRcdH1cclxuXHRcdFx0aWYgKGN1cnJlbnRDaGlsZHMpIHtcclxuXHRcdFx0XHRmb3IgKGNvbnN0IGNoaWxkIG9mIGN1cnJlbnRDaGlsZHMpIHtcclxuXHRcdFx0XHRcdGNvbnN0IGNoaWxkSWQgPSBjaGlsZC5pZDtcclxuXHRcdFx0XHRcdGNvbnN0IGNoaWxkSW5kZXggPSB0aGlzLmdldEluZGV4KGNoaWxkSWQpO1xyXG5cdFx0XHRcdFx0aWYgKHR5cGVvZiBpZCA9PT0gXCJzdHJpbmdcIikge1xyXG5cdFx0XHRcdFx0XHR0aGlzLmNvcHkoY2hpbGRJZCwgY2hpbGRJbmRleCwgdGFyZ2V0LCBpZCk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiBpZDtcclxuXHRcdH1cclxuXHR9XHJcblx0bW92ZShpZDogSWQsIGluZGV4OiBudW1iZXIsIHRhcmdldDogSVRyZWVDb2xsZWN0aW9uIHwgSURhdGFDb2xsZWN0aW9uLCB0YXJnZXRJZDogSWQpOiBJZDtcclxuXHRtb3ZlKGlkOiBJZFtdLCBpbmRleDogbnVtYmVyLCB0YXJnZXQ6IElUcmVlQ29sbGVjdGlvbiB8IElEYXRhQ29sbGVjdGlvbiwgdGFyZ2V0SWQ6IElkKTogSWRbXTtcclxuXHRtb3ZlKGlkOiBJZCB8IElkW10sIGluZGV4OiBudW1iZXIsIHRhcmdldDogSVRyZWVDb2xsZWN0aW9uIHwgSURhdGFDb2xsZWN0aW9uID0gdGhpcywgdGFyZ2V0SWQ6IElkID0gdGhpcy5fcm9vdCk6IElkIHwgSWRbXSB7XHJcblx0XHRpZiAoaWQgaW5zdGFuY2VvZiBBcnJheSkge1xyXG5cdFx0XHRyZXR1cm4gaWQubWFwKChlbGVtZW50SWQsIGtleSkgPT4ge1xyXG5cdFx0XHRcdGlmICghdGhpcy5leGlzdHMoZWxlbWVudElkKSkge1xyXG5cdFx0XHRcdFx0cmV0dXJuIG51bGw7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGxldCBlbGVtZW50SW5kZXggPSBpbmRleCA9PT0gLTEgPyAtMSA6IGluZGV4ICsga2V5O1xyXG5cclxuXHRcdFx0XHRpZiAodGFyZ2V0ICE9PSB0aGlzKSB7XHJcblx0XHRcdFx0XHRpZiAoIWlzVHJlZUNvbGxlY3Rpb24odGFyZ2V0KSkge1xyXG5cdFx0XHRcdFx0XHR0YXJnZXQuYWRkKGNvcHlXaXRob3V0SW5uZXIodGhpcy5nZXRJdGVtKGVsZW1lbnRJZCkpLCBlbGVtZW50SW5kZXgpO1xyXG5cdFx0XHRcdFx0XHR0aGlzLnJlbW92ZShlbGVtZW50SWQpO1xyXG5cdFx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRjb25zdCByZXR1cm5JZCA9IHRoaXMuY29weShlbGVtZW50SWQsIGVsZW1lbnRJbmRleCwgdGFyZ2V0LCB0YXJnZXRJZCk7XHJcblx0XHRcdFx0XHR0aGlzLnJlbW92ZShlbGVtZW50SWQpO1xyXG5cdFx0XHRcdFx0cmV0dXJuIHJldHVybklkO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0aWYgKCF0aGlzLmNhbkNvcHkoZWxlbWVudElkLCB0YXJnZXRJZCkpIHtcclxuXHRcdFx0XHRcdHJldHVybiBudWxsO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRjb25zdCBwYXJlbnQgPSB0aGlzLmdldFBhcmVudChlbGVtZW50SWQpO1xyXG5cdFx0XHRcdGNvbnN0IHBhcmVudEluZGV4ID0gdGhpcy5nZXRJbmRleChlbGVtZW50SWQpO1xyXG5cclxuXHRcdFx0XHRjb25zdCBzcGxpY2VkID0gdGhpcy5fY2hpbGRzW3BhcmVudF0uc3BsaWNlKHBhcmVudEluZGV4LCAxKVswXTtcclxuXHRcdFx0XHQoc3BsaWNlZCBhcyBJRGF0YUl0ZW0pLnBhcmVudCA9IHRhcmdldElkO1xyXG5cclxuXHRcdFx0XHRpZiAoIXRoaXMuX2NoaWxkc1twYXJlbnRdLmxlbmd0aCkge1xyXG5cdFx0XHRcdFx0ZGVsZXRlIHRoaXMuX2NoaWxkc1twYXJlbnRdO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRpZiAoIXRoaXMuaGF2ZUl0ZW1zKHRhcmdldElkKSkge1xyXG5cdFx0XHRcdFx0dGhpcy5fY2hpbGRzW3RhcmdldElkXSA9IFtdO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRpZiAoZWxlbWVudEluZGV4ID09PSAtMSkge1xyXG5cdFx0XHRcdFx0ZWxlbWVudEluZGV4ID0gdGhpcy5fY2hpbGRzW3RhcmdldElkXS5wdXNoKHNwbGljZWQpO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHR0aGlzLl9jaGlsZHNbdGFyZ2V0SWRdLnNwbGljZShlbGVtZW50SW5kZXgsIDAsIHNwbGljZWQpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0dGhpcy5ldmVudHMuZmlyZShEYXRhRXZlbnRzLmNoYW5nZSk7XHJcblx0XHRcdFx0cmV0dXJuIGVsZW1lbnRJZDtcclxuXHRcdFx0fSk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRpZiAoIXRoaXMuZXhpc3RzKGlkKSkge1xyXG5cdFx0XHRcdHJldHVybiBudWxsO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAodGFyZ2V0ICE9PSB0aGlzKSB7XHJcblx0XHRcdFx0aWYgKCFpc1RyZWVDb2xsZWN0aW9uKHRhcmdldCkpIHsgLy8gbW92ZSB0byBkYXRhY29sbGVjdGlvblxyXG5cdFx0XHRcdFx0dGFyZ2V0LmFkZChjb3B5V2l0aG91dElubmVyKHRoaXMuZ2V0SXRlbShpZCkpLCBpbmRleCk7XHJcblx0XHRcdFx0XHR0aGlzLnJlbW92ZShpZCk7XHJcblx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGNvbnN0IHJldHVybklkID0gdGhpcy5jb3B5KGlkLCBpbmRleCwgdGFyZ2V0LCB0YXJnZXRJZCk7XHJcblx0XHRcdFx0dGhpcy5yZW1vdmUoaWQpO1xyXG5cdFx0XHRcdHJldHVybiByZXR1cm5JZDtcclxuXHRcdFx0fVxyXG5cdFx0XHQvLyBtb3ZlIGluc2lkZVxyXG5cdFx0XHRpZiAoIXRoaXMuY2FuQ29weShpZCwgdGFyZ2V0SWQpKSB7XHJcblx0XHRcdFx0cmV0dXJuIG51bGw7XHJcblx0XHRcdH1cclxuXHRcdFx0Y29uc3QgcGFyZW50ID0gdGhpcy5nZXRQYXJlbnQoaWQpO1xyXG5cdFx0XHRjb25zdCBwYXJlbnRJbmRleCA9IHRoaXMuZ2V0SW5kZXgoaWQpO1xyXG5cclxuXHRcdFx0Ly8gZ2V0IGl0ZW0gZnJvbSBwYXJlbnQgYXJyYXkgYW5kIG1vdmUgdG8gdGFyZ2V0IGFycmF5XHJcblx0XHRcdGNvbnN0IHNwbGljZWQgPSB0aGlzLl9jaGlsZHNbcGFyZW50XS5zcGxpY2UocGFyZW50SW5kZXgsIDEpWzBdO1xyXG5cdFx0XHQoc3BsaWNlZCBhcyBJRGF0YUl0ZW0pLnBhcmVudCA9IHRhcmdldElkOyAvLyBuZWVkIGZvciBuZXh0IG1vdmluZywgLi4uIG5vdCBiZXN0IHNvbHV0aW9uLCBtYXkgYmUgZnVsbCBtZXRob2QgZm9yIGdldCBpdGVtXHJcblxyXG5cdFx0XHRpZiAoIXRoaXMuX2NoaWxkc1twYXJlbnRdLmxlbmd0aCkge1xyXG5cdFx0XHRcdGRlbGV0ZSB0aGlzLl9jaGlsZHNbcGFyZW50XTtcclxuXHRcdFx0fVxyXG5cdFx0XHRpZiAoIXRoaXMuaGF2ZUl0ZW1zKHRhcmdldElkKSkge1xyXG5cdFx0XHRcdHRoaXMuX2NoaWxkc1t0YXJnZXRJZF0gPSBbXTtcclxuXHRcdFx0fVxyXG5cdFx0XHRpZiAoaW5kZXggPT09IC0xKSB7XHJcblx0XHRcdFx0aW5kZXggPSB0aGlzLl9jaGlsZHNbdGFyZ2V0SWRdLnB1c2goc3BsaWNlZCk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dGhpcy5fY2hpbGRzW3RhcmdldElkXS5zcGxpY2UoaW5kZXgsIDAsIHNwbGljZWQpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR0aGlzLmV2ZW50cy5maXJlKERhdGFFdmVudHMuY2hhbmdlKTtcclxuXHRcdFx0cmV0dXJuIGlkO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRlYWNoQ2hpbGQoaWQ6IElkLCBjYjogRGF0YUNhbGxiYWNrPFQ+LCBkaXJlY3Q6IGJvb2xlYW4gPSB0cnVlLCBjaGVja0l0ZW06IChpdGVtOiBJRGF0YUl0ZW0pID0+IGJvb2xlYW4gPSAoKSA9PiB0cnVlKTogdm9pZCB7XHJcblx0XHRpZiAoIXRoaXMuaGF2ZUl0ZW1zKGlkKSkge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2NoaWxkc1tpZF0ubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0Y2IuY2FsbCh0aGlzLCB0aGlzLl9jaGlsZHNbaWRdW2ldLCBpKTtcclxuXHRcdFx0aWYgKGRpcmVjdCAmJiBjaGVja0l0ZW0odGhpcy5fY2hpbGRzW2lkXVtpXSkpIHtcclxuXHRcdFx0XHR0aGlzLmVhY2hDaGlsZCh0aGlzLl9jaGlsZHNbaWRdW2ldLmlkLCBjYiwgZGlyZWN0LCBjaGVja0l0ZW0pO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cdGdldE5lYXJJZChpZDogSWQpOiBJZCB7XHJcblx0XHRyZXR1cm4gaWQ7IC8vIGZvciBzZWxlY3Rpb25cclxuXHR9XHJcblx0bG9hZEl0ZW1zKGlkOiBJZCwgZHJpdmVyOiBhbnkgPSBcImpzb25cIik6IHZvaWQge1xyXG5cdFx0Y29uc3QgdXJsID0gdGhpcy5jb25maWcuYXV0b2xvYWQgKyBcIj9pZD1cIiArIGlkO1xyXG5cdFx0Y29uc3QgcHJveHkgPSBuZXcgRGF0YVByb3h5KHVybCk7XHJcblx0XHRwcm94eS5sb2FkKCkudGhlbigoZGF0YSkgPT4ge1xyXG5cdFx0XHRkcml2ZXIgPSB0b0RhdGFEcml2ZXIoZHJpdmVyKTtcclxuXHRcdFx0ZGF0YSA9IGRyaXZlci50b0pzb25BcnJheShkYXRhKTtcclxuXHRcdFx0dGhpcy5fcGFyc2VfZGF0YShkYXRhLCBpZCk7XHJcblxyXG5cdFx0XHR0aGlzLmV2ZW50cy5maXJlKERhdGFFdmVudHMuY2hhbmdlKTtcclxuXHRcdH0pO1xyXG5cdH1cclxuXHRyZWZyZXNoSXRlbXMoaWQ6IElkLCBkcml2ZXI6IGFueSA9IFwianNvblwiKTogdm9pZCB7XHJcblx0XHR0aGlzLnJlbW92ZUFsbChpZCk7XHJcblx0XHR0aGlzLmxvYWRJdGVtcyhpZCwgZHJpdmVyKTtcclxuXHR9XHJcblx0ZWFjaFBhcmVudChpZDogSWQsIGNiOiBEYXRhQ2FsbGJhY2s8VD4sIHNlbGY6IGJvb2xlYW4gPSBmYWxzZSk6IHZvaWQge1xyXG5cdFx0Y29uc3QgaXRlbSA9IHRoaXMuZ2V0SXRlbShpZCk7XHJcblx0XHRpZiAoIWl0ZW0pIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cdFx0aWYgKHNlbGYpIHtcclxuXHRcdFx0Y2IuY2FsbCh0aGlzLCBpdGVtKTtcclxuXHRcdH1cclxuXHRcdGlmIChpdGVtLnBhcmVudCA9PT0gdGhpcy5fcm9vdCkge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblx0XHRjb25zdCBwYXJlbnQgPSB0aGlzLmdldEl0ZW0oaXRlbS5wYXJlbnQpO1xyXG5cdFx0Y2IuY2FsbCh0aGlzLCBwYXJlbnQpO1xyXG5cdFx0dGhpcy5lYWNoUGFyZW50KGl0ZW0ucGFyZW50LCBjYik7XHJcblx0fVxyXG5cdGhhdmVJdGVtcyhpZDogSWQpOiBib29sZWFuIHtcclxuXHRcdHJldHVybiBpZCBpbiB0aGlzLl9jaGlsZHM7XHJcblx0fVxyXG5cdGNhbkNvcHkoaWQ6IElkLCB0YXJnZXQ6IElkKTogYm9vbGVhbiB7XHJcblx0XHRpZiAoaWQgPT09IHRhcmdldCkge1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblx0XHRsZXQgY2FuQ29weSA9IHRydWU7XHJcblx0XHR0aGlzLmVhY2hQYXJlbnQodGFyZ2V0LCBpdGVtID0+IGl0ZW0uaWQgPT09IGlkID8gY2FuQ29weSA9IGZhbHNlIDogbnVsbCk7IC8vIGxvY2F0ZSByZXR1cm4gc3RyaW5nXHJcblx0XHRyZXR1cm4gY2FuQ29weTtcclxuXHR9XHJcblx0c2VyaWFsaXplKGRyaXZlcjogRGF0YURyaXZlciA9IERhdGFEcml2ZXIuanNvbiwgY2hlY2tJdGVtPzogKGl0ZW06IGFueSkgPT4gYW55KSB7XHJcblx0XHRjb25zdCBkYXRhID0gdGhpcy5fc2VyaWFsaXplKHRoaXMuX3Jvb3QsIGNoZWNrSXRlbSk7XHJcblx0XHRjb25zdCBkYXRhRHJpdmVyID0gdG9EYXRhRHJpdmVyKGRyaXZlcik7XHJcblx0XHRpZiAoZGF0YURyaXZlcikge1xyXG5cdFx0XHRyZXR1cm4gZGF0YURyaXZlci5zZXJpYWxpemUoZGF0YSk7XHJcblx0XHR9XHJcblx0fVxyXG5cdGdldElkKGluZGV4OiBudW1iZXIsIHBhcmVudDogc3RyaW5nID0gdGhpcy5fcm9vdCk6IHN0cmluZyB7XHJcblx0XHRpZiAoIXRoaXMuX2NoaWxkc1twYXJlbnRdIHx8ICF0aGlzLl9jaGlsZHNbcGFyZW50XVtpbmRleF0pIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHRoaXMuX2NoaWxkc1twYXJlbnRdW2luZGV4XS5pZDtcclxuXHR9XHJcblx0cHJvdGVjdGVkIF9yZW1vdmVBbGwoaWQ/OiBJZCkge1xyXG5cdFx0aWYgKGlkKSB7XHJcblx0XHRcdGNvbnN0IGNoaWxkcyA9IFsuLi4gdGhpcy5fY2hpbGRzW2lkXV07XHJcblx0XHRcdGZvciAoY29uc3QgY2hpbGQgb2YgY2hpbGRzKSB7XHJcblx0XHRcdFx0dGhpcy5yZW1vdmUoY2hpbGQuaWQpO1xyXG5cdFx0XHR9XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRzdXBlci5fcmVtb3ZlQWxsKCk7XHJcblx0XHRcdGNvbnN0IHJvb3QgPSB0aGlzLl9yb290O1xyXG5cdFx0XHR0aGlzLl9pbml0Q2hpbGRzID0gbnVsbDtcclxuXHRcdFx0dGhpcy5fY2hpbGRzID0geyBbcm9vdF06IFtdIH07XHJcblx0XHR9XHJcblx0fVxyXG5cdHByb3RlY3RlZCBfcmVtb3ZlQ29yZShpZCkge1xyXG5cdFx0aWYgKHRoaXMuX3B1bGxbaWRdKSB7XHJcblx0XHRcdGNvbnN0IHBhcmVudCA9IHRoaXMuZ2V0UGFyZW50KGlkKTtcclxuXHRcdFx0dGhpcy5fY2hpbGRzW3BhcmVudF0gPSB0aGlzLl9jaGlsZHNbcGFyZW50XS5maWx0ZXIoaXRlbSA9PiBpdGVtLmlkICE9PSBpZCk7XHJcblx0XHRcdGlmIChwYXJlbnQgIT09IHRoaXMuX3Jvb3QgJiYgIXRoaXMuX2NoaWxkc1twYXJlbnRdLmxlbmd0aCkge1xyXG5cdFx0XHRcdGRlbGV0ZSB0aGlzLl9jaGlsZHNbcGFyZW50XTtcclxuXHRcdFx0fVxyXG5cdFx0XHRpZiAodGhpcy5faW5pdENoaWxkcyAmJiB0aGlzLl9pbml0Q2hpbGRzW3BhcmVudF0pIHtcclxuXHRcdFx0XHR0aGlzLl9pbml0Q2hpbGRzW3BhcmVudF0gPSB0aGlzLl9pbml0Q2hpbGRzW3BhcmVudF0uZmlsdGVyKGl0ZW0gPT4gaXRlbS5pZCAhPT0gaWQpO1xyXG5cdFx0XHRcdGlmIChwYXJlbnQgIT09IHRoaXMuX3Jvb3QgJiYgIXRoaXMuX2luaXRDaGlsZHNbcGFyZW50XS5sZW5ndGgpIHtcclxuXHRcdFx0XHRcdGRlbGV0ZSB0aGlzLl9pbml0Q2hpbGRzW3BhcmVudF07XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHRcdHRoaXMuX2Zhc3REZWxldGVDaGlsZHModGhpcy5fY2hpbGRzLCBpZCk7XHJcblx0XHRcdGlmICh0aGlzLl9pbml0Q2hpbGRzKSB7XHJcblx0XHRcdFx0dGhpcy5fZmFzdERlbGV0ZUNoaWxkcyh0aGlzLl9pbml0Q2hpbGRzLCBpZCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblx0cHJvdGVjdGVkIF9hZGRUb09yZGVyKF9vcmRlciwgb2JqOiBhbnksIGluZGV4OiBudW1iZXIpOiB2b2lkIHtcclxuXHRcdGNvbnN0IGNoaWxkcyA9IHRoaXMuX2NoaWxkcztcclxuXHRcdGNvbnN0IGluaXRDaGlsZHMgPSB0aGlzLl9pbml0Q2hpbGRzO1xyXG5cdFx0Y29uc3QgcGFyZW50ID0gb2JqLnBhcmVudDtcclxuXHRcdHRoaXMuX3B1bGxbb2JqLmlkXSA9IG9iajtcclxuXHJcblx0XHRhZGRUb09yZGVyKGNoaWxkcywgb2JqLCBwYXJlbnQsIGluZGV4KTtcclxuXHRcdGlmIChpbml0Q2hpbGRzKSB7XHJcblx0XHRcdGFkZFRvT3JkZXIoaW5pdENoaWxkcywgb2JqLCBwYXJlbnQsIGluZGV4KTtcclxuXHRcdH1cclxuXHR9XHJcblx0cHJvdGVjdGVkIF9wYXJzZV9kYXRhKGRhdGE6IGFueSwgcGFyZW50ID0gdGhpcy5fcm9vdCkge1xyXG5cdFx0Zm9yIChsZXQgb2JqIG9mIGRhdGEpIHtcclxuXHRcdFx0aWYgKHRoaXMuY29uZmlnLmluaXQpIHtcclxuXHRcdFx0XHRvYmogPSB0aGlzLmNvbmZpZy5pbml0KG9iaik7XHJcblx0XHRcdH1cclxuXHRcdFx0aWYgKHR5cGVvZiBvYmogIT09IFwib2JqZWN0XCIpIHtcclxuXHRcdFx0XHRvYmogPSB7XHJcblx0XHRcdFx0XHR2YWx1ZTogb2JqXHJcblx0XHRcdFx0fTtcclxuXHRcdFx0fVxyXG5cdFx0XHRvYmouaWQgPSBvYmouaWQgPyBvYmouaWQudG9TdHJpbmcoKSA6IHVpZCgpO1xyXG5cdFx0XHRvYmoucGFyZW50ID0gb2JqLnBhcmVudCA/IG9iai5wYXJlbnQudG9TdHJpbmcoKSA6IHBhcmVudDtcclxuXHRcdFx0dGhpcy5fcHVsbFtvYmouaWRdID0gb2JqO1xyXG5cclxuXHRcdFx0aWYgKCF0aGlzLl9jaGlsZHNbb2JqLnBhcmVudF0pIHtcclxuXHRcdFx0XHR0aGlzLl9jaGlsZHNbb2JqLnBhcmVudF0gPSBbXTtcclxuXHRcdFx0fVxyXG5cdFx0XHR0aGlzLl9jaGlsZHNbb2JqLnBhcmVudF0ucHVzaChvYmopO1xyXG5cdFx0XHRpZiAob2JqLml0ZW1zICYmIG9iai5pdGVtcyBpbnN0YW5jZW9mIE9iamVjdCkge1xyXG5cdFx0XHRcdHRoaXMuX3BhcnNlX2RhdGEob2JqLml0ZW1zLCBvYmouaWQpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cdHByaXZhdGUgX2Zhc3REZWxldGVDaGlsZHModGFyZ2V0LCBpZDogSWQpOiB2b2lkIHtcclxuXHRcdGlmICh0aGlzLl9wdWxsW2lkXSkge1xyXG5cdFx0XHRkZWxldGUgdGhpcy5fcHVsbFtpZF07XHJcblx0XHR9XHJcblx0XHRpZiAoIXRhcmdldFtpZF0pIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCB0YXJnZXRbaWRdLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHRoaXMuX2Zhc3REZWxldGVDaGlsZHModGFyZ2V0LCB0YXJnZXRbaWRdW2ldLmlkKTtcclxuXHRcdH1cclxuXHRcdGRlbGV0ZSB0YXJnZXRbaWRdO1xyXG5cdH1cclxuXHRwcml2YXRlIF9yZWN1cnNpdmVGaWx0ZXIocnVsZTogSUZpbHRlck1vZGUgfCBJRmlsdGVyQ2FsbGJhY2ssIGNvbmZpZzogSVRyZWVGaWx0ZXJDb25maWcsIGN1cnJlbnQ6IElkLCBsZXZlbDogbnVtYmVyLCBuZXdDaGlsZHM6IElBbnlPYmopOiB2b2lkIHtcclxuXHRcdGNvbnN0IGNoaWxkcyA9IHRoaXMuX2NoaWxkc1tjdXJyZW50XTtcclxuXHRcdGlmICghY2hpbGRzKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHRcdGNvbnN0IGNvbmRpdGlvbiA9IChpdGVtOiBUKTogYm9vbGVhbiA9PiB7XHJcblx0XHRcdHN3aXRjaCAoY29uZmlnLnR5cGUpIHtcclxuXHRcdFx0XHRjYXNlIFRyZWVGaWx0ZXJUeXBlLmFsbDoge1xyXG5cdFx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGNhc2UgVHJlZUZpbHRlclR5cGUubGV2ZWw6IHtcclxuXHRcdFx0XHRcdHJldHVybiBsZXZlbCA9PT0gY29uZmlnLmxldmVsO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRjYXNlIFRyZWVGaWx0ZXJUeXBlLmxlYWZzOiB7XHJcblx0XHRcdFx0XHRyZXR1cm4gIXRoaXMuaGF2ZUl0ZW1zKGl0ZW0uaWQpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHRcdGlmICh0eXBlb2YgcnVsZSA9PT0gXCJmdW5jdGlvblwiKSB7XHJcblx0XHRcdGNvbnN0IGN1c3RvbVJ1bGUgPSAoaXRlbTogVCkgPT4gIWNvbmRpdGlvbihpdGVtKSB8fCBydWxlKGl0ZW0pO1xyXG5cdFx0XHRjb25zdCBmaWx0ZXJlZCA9IGNoaWxkcy5maWx0ZXIoY3VzdG9tUnVsZSk7XHJcblx0XHRcdGlmIChmaWx0ZXJlZC5sZW5ndGgpIHtcclxuXHRcdFx0XHRuZXdDaGlsZHNbY3VycmVudF0gPSBmaWx0ZXJlZDtcclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIGlmICgocnVsZSBhcyBJRmlsdGVyTW9kZSkuYnkgJiYgKHJ1bGUgYXMgSUZpbHRlck1vZGUpLm1hdGNoKSB7XHJcblx0XHRcdGNvbnN0IGN1c3RvbVJ1bGUgPSAoaXRlbTogVCkgPT4gIWNvbmRpdGlvbihpdGVtKSB8fCBpdGVtW3J1bGUuYnldLnRvU3RyaW5nKCkudG9Mb3dlckNhc2UoKS5pbmRleE9mKHJ1bGUubWF0Y2gudG9TdHJpbmcoKS50b0xvd2VyQ2FzZSgpKSAhPT0gLTE7XHJcblx0XHRcdG5ld0NoaWxkc1tjdXJyZW50XSA9IGNoaWxkcy5maWx0ZXIoY3VzdG9tUnVsZSk7XHJcblx0XHR9XHJcblx0XHRmb3IgKGNvbnN0IGNoaWxkIG9mIGNoaWxkcykge1xyXG5cdFx0XHR0aGlzLl9yZWN1cnNpdmVGaWx0ZXIocnVsZSwgY29uZmlnLCBjaGlsZC5pZCwgbGV2ZWwgKyAxLCBuZXdDaGlsZHMpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRwcml2YXRlIF9zZXJpYWxpemUocGFyZW50ID0gdGhpcy5fcm9vdCwgZm4/KSB7XHJcblx0XHRyZXR1cm4gdGhpcy5tYXAoaXRlbSA9PiB7XHJcblx0XHRcdGxldCBpdGVtQ29weTogYW55ID0ge307XHJcblx0XHRcdGZvciAoY29uc3Qga2V5IGluIGl0ZW0pIHtcclxuXHRcdFx0XHRpZiAoa2V5ID09PSBcInBhcmVudFwiIHx8IGtleSA9PT0gXCJpdGVtc1wiKSB7XHJcblx0XHRcdFx0XHRjb250aW51ZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0aXRlbUNvcHlba2V5XSA9IGl0ZW1ba2V5XTtcclxuXHRcdFx0fVxyXG5cdFx0XHRpZiAoZm4pIHtcclxuXHRcdFx0XHRpdGVtQ29weSA9IGZuKGl0ZW1Db3B5KTtcclxuXHRcdFx0fVxyXG5cdFx0XHRpZiAodGhpcy5oYXZlSXRlbXMoaXRlbS5pZCkpIHtcclxuXHRcdFx0XHRpdGVtQ29weS5pdGVtcyA9IHRoaXMuX3NlcmlhbGl6ZShpdGVtLmlkLCBmbik7XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIGl0ZW1Db3B5O1xyXG5cdFx0fSwgcGFyZW50LCBmYWxzZSk7XHJcblx0fVxyXG59IiwiaW1wb3J0IHsgSUV2ZW50U3lzdGVtIH0gZnJvbSBcIkBkaHgvdHMtY29tbW9uL2V2ZW50c1wiO1xyXG5pbXBvcnQgeyBEYXRhQ29sbGVjdGlvbiB9IGZyb20gXCIuL2RhdGFjb2xsZWN0aW9uXCI7XHJcbmltcG9ydCB7IFRyZWVDb2xsZWN0aW9uIH0gZnJvbSBcIi4vdHJlZWNvbGxlY3Rpb25cIjtcclxuaW1wb3J0IHsgSUFueU9iaiB9IGZyb20gXCJAZGh4L3RzLWNvbW1vbi90eXBlc1wiO1xyXG5cclxuZXhwb3J0IHR5cGUgSWQgPSBzdHJpbmc7XHJcbmV4cG9ydCBpbnRlcmZhY2UgSURhdGFQcm94eSB7XHJcblx0bG9hZDogKCkgPT4gUHJvbWlzZTxhbnlbXT47XHJcblx0c2F2ZTogKGRhdGE6IGFueSwgbW9kZTogc3RyaW5nKSA9PiBQcm9taXNlPGFueT47XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVNvcnRNb2RlIHtcclxuXHRieT86IHN0cmluZztcclxuXHRkaXI/OiBzdHJpbmc7XHJcblx0YXM/OiAoYTogYW55KSA9PiBhbnk7XHJcblx0cnVsZT86IChhOiBhbnksIGI6IGFueSkgPT4gbnVtYmVyO1xyXG59XHJcblxyXG5leHBvcnQgdHlwZSBJRmlsdGVyQ2FsbGJhY2sgPSAob2JqOiBhbnkpID0+IGJvb2xlYW47XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElGaWx0ZXJNb2RlIHtcclxuXHRieT86IHN0cmluZztcclxuXHRtYXRjaD86IHN0cmluZyB8IG51bWJlciB8IGJvb2xlYW47XHJcblx0Y29tcGFyZT86ICh2YWx1ZTogYW55LCBtYXRjaDogYW55LCBvYmo6IGFueSkgPT4gYm9vbGVhbjtcclxufVxyXG5leHBvcnQgaW50ZXJmYWNlIElGaWx0ZXJDb25maWcge1xyXG5cdGFkZD86IGJvb2xlYW47XHJcblx0bXVsdGlwbGU/OiBib29sZWFuO1xyXG59XHJcbmV4cG9ydCBpbnRlcmZhY2UgSVRyZWVGaWx0ZXJDb25maWcgZXh0ZW5kcyBJRmlsdGVyQ29uZmlnIHtcclxuXHR0eXBlPzogVHJlZUZpbHRlclR5cGU7XHJcblx0bGV2ZWw/OiBudW1iZXI7XHJcbn1cclxuZXhwb3J0IGludGVyZmFjZSBJVXBkYXRlT2JqZWN0IHtcclxuXHRba2V5OiBzdHJpbmddOiBhbnk7XHJcbn1cclxuZXhwb3J0IGludGVyZmFjZSBJRGF0YUNvbGxlY3Rpb248VCBleHRlbmRzIElEYXRhSXRlbSA9IElEYXRhSXRlbT4ge1xyXG5cdGxvYWREYXRhOiBQcm9taXNlPGFueT47XHJcblx0c2F2ZURhdGE6IFByb21pc2U8YW55PjtcclxuXHRldmVudHM6IElFdmVudFN5c3RlbTxEYXRhRXZlbnRzPjtcclxuXHRhZGQob2JqOiBJRGF0YUl0ZW0sIGluZGV4PzogbnVtYmVyKTogSWQ7XHJcblx0YWRkKG9iajogSURhdGFJdGVtW10sIGluZGV4PzogbnVtYmVyKTogSWRbXTtcclxuXHRhZGQob2JqOiBJRGF0YUl0ZW0gfCBJRGF0YUl0ZW1bXSwgaW5kZXg/OiBudW1iZXIpOiBJZCB8IElkW107XHJcblx0cmVtb3ZlKGlkOiBJZCB8IElkW10pOiB2b2lkO1xyXG5cdHJlbW92ZUFsbCgpOiB2b2lkO1xyXG5cdHVwZGF0ZShpZDogSWQsIG9iajogSVVwZGF0ZU9iamVjdCwgc2lsZW50PzogYm9vbGVhbik6IHZvaWQ7XHJcblxyXG5cdGV4aXN0cyhpZDogSWQpOiBib29sZWFuO1xyXG5cdGdldEluaXRpYWxEYXRhKCk6IFRbXTtcclxuXHRnZXRJdGVtKGlkOiBJZCk6IFQ7XHJcblx0Z2V0SW5kZXgoaWQ6IElkKTogbnVtYmVyO1xyXG5cdGdldExlbmd0aCgpOiBudW1iZXI7XHJcblx0Z2V0SWQoaW5kZXg6IG51bWJlcik6IElkO1xyXG5cdGZpbHRlcihydWxlPzogSUZpbHRlck1vZGUgfCBJRmlsdGVyQ2FsbGJhY2ssIGNvbmZpZz86IElGaWx0ZXJDb25maWcpOiB2b2lkO1xyXG5cdGZpbmQocnVsZTogSUZpbHRlck1vZGUpOiBUO1xyXG5cdHJlZHVjZTxBPihjYjogUmVkdWNlQ2FsbEJhY2s8VCwgQT4sIGFjYzogQSk6IEE7XHJcblx0ZmluZEFsbChydWxlOiBJRmlsdGVyTW9kZSk6IFRbXTtcclxuXHRtYXAoY2I6IERhdGFDYWxsYmFjazxUPik6IFRbXTtcclxuXHRtYXBSYW5nZShmcm9tOiBudW1iZXIsIHRvOiBudW1iZXIsIGNiOiBEYXRhQ2FsbGJhY2s8VD4pOiBhbnlbXTtcclxuXHRzb3J0KGJ5OiBJU29ydE1vZGUpOiB2b2lkO1xyXG5cdHNlcmlhbGl6ZShkcml2ZXI/OiBEYXRhRHJpdmVyKTogVFtdO1xyXG5cdGNvcHkoaWQ6IElkIHwgSWRbXSwgaW5kZXg6IG51bWJlciwgdGFyZ2V0PzogSURhdGFDb2xsZWN0aW9uIHwgSVRyZWVDb2xsZWN0aW9uLCB0YXJnZXRJZD86IElkKTogSWQgfCBJZFtdO1xyXG5cdG1vdmUoaWQ6IElkIHwgSWRbXSwgaW5kZXg6IG51bWJlciwgdGFyZ2V0PzogRGF0YUNvbGxlY3Rpb24gfCBUcmVlQ29sbGVjdGlvbiwgdGFyZ2V0SWQ/OiBJZCk6IElkIHwgSWRbXTtcclxuXHJcblx0bG9hZCh1cmw6IElEYXRhUHJveHkpOiBQcm9taXNlPGFueT47XHJcblx0cGFyc2UoZGF0YTogVFtdKTtcclxuXHJcblx0c2F2ZSh1cmw6IElEYXRhUHJveHkpOiB2b2lkOyAvLyBQcm9taXNlPGFueT47XHJcblx0aXNTYXZlZCgpOiBib29sZWFuO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElEYXRhQ2hhbmdlU3RhY2sge1xyXG5cdG9yZGVyOiBJRGF0YUNoYW5nZVtdO1xyXG59XHJcbmV4cG9ydCB0eXBlIFN0YXR1c2VzID0gXCJhZGRcIiB8IFwidXBkYXRlXCIgfCBcInJlbW92ZVwiO1xyXG5leHBvcnQgaW50ZXJmYWNlIElEYXRhQ2hhbmdlIHtcclxuXHRpZDogSWQ7XHJcblx0c3RhdHVzOiBTdGF0dXNlcztcclxuXHRvYmo6IGFueTtcclxuXHRzYXZpbmc6IGJvb2xlYW47XHJcblx0cHJvbWlzZT86IFByb21pc2U8YW55PjtcclxuXHRwZW5kaW5nPzogYm9vbGVhbjtcclxuXHRlcnJvcj86IGJvb2xlYW47XHJcbn1cclxuZXhwb3J0IHR5cGUgUmVxdWVzdFN0YXR1cyA9IFwic2F2aW5nXCIgfCBcInBlbmRpbmdcIiB8IFwiZXJyb3JcIjtcclxuZXhwb3J0IGludGVyZmFjZSBJRGlyIHtcclxuXHRba2V5OiBzdHJpbmddOiBhbnk7XHJcblx0YXNjOiBudW1iZXI7XHJcblx0ZGVzYzogbnVtYmVyO1xyXG59XHJcbmV4cG9ydCBpbnRlcmZhY2UgSURhdGFEcml2ZXIge1xyXG5cdHRvSnNvbkFycmF5KGRhdGE6IGFueSk6IGFueVtdO1xyXG5cdHNlcmlhbGl6ZShkYXRhOiBJQW55T2JqW10pOiBhbnk7XHJcblx0Z2V0Um93cyhkYXRhOiBzdHJpbmcpOiBhbnlbXTtcclxuXHRnZXRGaWVsZHMocm93OiBhbnkpOiB7IFtrZXk6IHN0cmluZ106IGFueSB9O1xyXG59XHJcbmV4cG9ydCBpbnRlcmZhY2UgSUNzdkRyaXZlckNvbmZpZyB7XHJcblx0c2tpcEhlYWRlcj86IG51bWJlcjtcclxuXHRuYW1lQnlIZWFkZXI/OiBib29sZWFuO1xyXG5cdG5hbWVzPzogc3RyaW5nW107XHJcblx0cm93RGVsaW1pdGVyPzogc3RyaW5nO1xyXG5cdGNvbHVtbkRlbGltaXRlcj86IHN0cmluZztcclxufVxyXG5leHBvcnQgZW51bSBUcmVlRmlsdGVyVHlwZSB7XHJcblx0YWxsID0gXCJhbGxcIixcclxuXHRsZXZlbCA9IFwibGV2ZWxcIixcclxuXHRsZWFmcyA9IFwibGVhZnNcIlxyXG59XHJcbmV4cG9ydCB0eXBlIERhdGFDYWxsYmFjazxUPiA9IChpdGVtOiBULCBpbmRleD86IG51bWJlcikgPT4gYW55O1xyXG5cclxuZXhwb3J0IHR5cGUgUmVkdWNlQ2FsbEJhY2s8VCwgQT4gPSAoYWNjOiBBLCBpdGVtOiBULCBpbmRleD86IG51bWJlcikgPT4gQTtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVRyZWVDb2xsZWN0aW9uPFQgZXh0ZW5kcyBJRGF0YUl0ZW0gPSBJRGF0YUl0ZW0+IGV4dGVuZHMgSURhdGFDb2xsZWN0aW9uPFQ+IHtcclxuXHRhZGQob2JqOiBJRGF0YUl0ZW0sIGluZGV4PzogbnVtYmVyLCBwYXJlbnQ/OiBJZCk6IElkO1xyXG5cdGFkZChvYmo6IElEYXRhSXRlbVtdLCBpbmRleD86IG51bWJlciwgcGFyZW50PzogSWQpOiBJZFtdO1xyXG5cdGFkZChvYmo6IElEYXRhSXRlbSB8IElEYXRhSXRlbVtdLCBpbmRleD86IG51bWJlciwgcGFyZW50PzogSWQpOiBJZCB8IElkW107XHJcblx0Z2V0Um9vdCgpOiBJZDtcclxuXHRnZXRQYXJlbnQoaWQ6IElkKTogSWQ7XHJcblx0cmVtb3ZlQWxsKGlkPzogSWQpOiB2b2lkO1xyXG5cdGdldExlbmd0aChpZD86IElkKTogbnVtYmVyO1xyXG5cdGdldEluZGV4KGlkOiBJZCk6IG51bWJlcjtcclxuXHRnZXRJdGVtcyhpZDogSWQpOiBUW107XHJcblx0c29ydChjb25mPzogYW55KTogdm9pZDtcclxuXHRtYXAoY2I6IERhdGFDYWxsYmFjazxUPiwgcGFyZW50PzogSWQsIGRpcmVjdD86IGJvb2xlYW4pOiBhbnk7XHJcblx0ZmlsdGVyKHJ1bGU/OiBJRmlsdGVyTW9kZSB8IElGaWx0ZXJDYWxsYmFjaywgY29uZmlnPzogSVRyZWVGaWx0ZXJDb25maWcpOiB2b2lkO1xyXG5cdHJlc3RvcmVPcmRlcigpOiB2b2lkO1xyXG5cdGNvcHkoaWQ6IElkLCBpbmRleDogbnVtYmVyLCB0YXJnZXQ6IElEYXRhQ29sbGVjdGlvbiB8IElUcmVlQ29sbGVjdGlvbiwgdGFyZ2V0SWQ6IElkKTogSWQ7XHJcblx0Y29weShpZDogSWRbXSwgaW5kZXg6IG51bWJlciwgdGFyZ2V0OiBJRGF0YUNvbGxlY3Rpb24gfCBJVHJlZUNvbGxlY3Rpb24sIHRhcmdldElkOiBJZCk6IElkW107XHJcblx0Y29weShpZDogSWQgfCBJZFtdLCBpbmRleDogbnVtYmVyLCB0YXJnZXQ6IElEYXRhQ29sbGVjdGlvbiB8IElUcmVlQ29sbGVjdGlvbiwgdGFyZ2V0SWQ6IElkKTogSWQgfCBJZFtdO1xyXG5cdG1vdmUoaWQ6IElkLCBpbmRleDogbnVtYmVyLCB0YXJnZXQ6IElUcmVlQ29sbGVjdGlvbiB8IElEYXRhQ29sbGVjdGlvbiwgdGFyZ2V0SWQ6IElkKTogSWQ7XHJcblx0bW92ZShpZDogSWRbXSwgaW5kZXg6IG51bWJlciwgdGFyZ2V0OiBJVHJlZUNvbGxlY3Rpb24gfCBJRGF0YUNvbGxlY3Rpb24sIHRhcmdldElkOiBJZCk6IElkW107XHJcblx0bW92ZShpZDogSWQgfCBJZFtdLCBpbmRleDogbnVtYmVyLCB0YXJnZXQ6IElUcmVlQ29sbGVjdGlvbiB8IElEYXRhQ29sbGVjdGlvbiwgdGFyZ2V0SWQ6IElkKTogSWQgfCBJZFtdO1xyXG5cdGVhY2hDaGlsZChpZDogSWQsIGNiOiBEYXRhQ2FsbGJhY2s8VD4sIGRpcmVjdD86IGJvb2xlYW4sIGNoZWNrSXRlbT86IChpdGVtOiBJRGF0YUl0ZW0pID0+IGJvb2xlYW4pOiB2b2lkO1xyXG5cdGVhY2hQYXJlbnQoaWQ6IElkLCBjYjogRGF0YUNhbGxiYWNrPFQ+LCBzZWxmPzogYm9vbGVhbik6IHZvaWQ7XHJcblx0bG9hZEl0ZW1zKGlkOiBJZCwgZHJpdmVyPzogYW55KTogdm9pZDtcclxuXHRyZWZyZXNoSXRlbXMoaWQ6IElkLCBkcml2ZXI/OiBhbnkpOiB2b2lkO1xyXG5cdGhhdmVJdGVtcyhpZDogSWQpOiBib29sZWFuO1xyXG5cdGNhbkNvcHkoaWQ6IElkLCB0YXJnZXQ6IElkKTogYm9vbGVhbjtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJRGF0YUl0ZW0ge1xyXG5cdGlkPzogc3RyaW5nO1xyXG5cdFtrZXk6IHN0cmluZ106IGFueTtcclxufVxyXG5cclxuXHJcbmV4cG9ydCBlbnVtIERyb3BQb3NpdGlvbiB7XHJcblx0dG9wID0gXCJ0b3BcIixcclxuXHRib3QgPSBcImJvdFwiLFxyXG5cdGluID0gXCJpblwiXHJcbn1cclxuZXhwb3J0IGludGVyZmFjZSBJT2JqV2l0aERhdGEge1xyXG5cdGRhdGE6IFRyZWVDb2xsZWN0aW9uIHwgRGF0YUNvbGxlY3Rpb247XHJcblx0ZXZlbnRzOiBJRXZlbnRTeXN0ZW08RHJhZ0V2ZW50cywgSURyYWdFdmVudHNIYW5kbGVyc01hcD47XHJcblx0Y29uZmlnOiBJRHJhZ0NvbmZpZztcclxufVxyXG5leHBvcnQgaW50ZXJmYWNlIElUcmFuc2ZlckRhdGEge1xyXG5cdGluaXRYT2Zmc2V0PzogbnVtYmVyO1xyXG5cdGluaXRZT2Zmc2V0PzogbnVtYmVyO1xyXG5cdHg/OiBudW1iZXI7XHJcblx0eT86IG51bWJlcjtcclxuXHRnaG9zdD86IEhUTUxFbGVtZW50O1xyXG5cdHRhcmdldElkPzogSWQ7XHJcblx0aWQ/OiBJZDtcclxuXHRkcmFnQ29uZmlnPzogSURyYWdDb25maWc7XHJcblx0dGFyZ2V0PzogSU9ialdpdGhEYXRhO1xyXG5cdGRyb3BQb3NpdGlvbj86IERyb3BQb3NpdGlvbjtcclxuXHRpdGVtPzogSFRNTEVsZW1lbnQ7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSURyYWdDb25maWcge1xyXG5cdGRyYWdDb3B5PzogYm9vbGVhbjtcclxuXHRkcm9wQmVoYXZpb3VyPzogRHJvcEJlaGF2aW91cjtcclxuXHRkcmFnTW9kZT86IERyYWdNb2RlO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElDb3B5T2JqZWN0IHtcclxuXHRpZDogc3RyaW5nO1xyXG5cdHRhcmdldDogSU9ialdpdGhEYXRhO1xyXG59XHJcblxyXG5leHBvcnQgZW51bSBEYXRhRXZlbnRzIHtcclxuXHRhZnRlckFkZCA9IFwiYWZ0ZXJhZGRcIixcclxuXHRiZWZvcmVBZGQgPSBcImJlZm9yZWFkZFwiLFxyXG5cdHJlbW92ZUFsbCA9IFwicmVtb3ZlYWxsXCIsXHJcblx0YmVmb3JlUmVtb3ZlID0gXCJiZWZvcmVyZW1vdmVcIixcclxuXHRhZnRlclJlbW92ZSA9IFwiYWZ0ZXJyZW1vdmVcIixcclxuXHRjaGFuZ2UgPSBcImNoYW5nZVwiLFxyXG5cdGxvYWQgPSBcImxvYWRcIixcclxuXHRsb2FkRXJyb3IgPSBcImxvYWRlcnJvclwiXHJcbn1cclxuZXhwb3J0IGVudW0gRHJhZ0V2ZW50cyB7XHJcblx0YmVmb3JlRHJhZyA9IFwiYmVmb3JlZHJhZ1wiLCAgICAgLy8gZmlyZSBvbiBzb3VyY2VcclxuXHRiZWZvcmVEcm9wID0gXCJiZWZvcmVEcm9wXCIsICAgICAvLyBmaXJlIG9uIHRhcmdldFxyXG5cdGRyYWdTdGFydCA9IFwiZHJhZ3N0YXJ0XCIsICAgICAgIC8vIGZpcmUgb24gc291cmNlXHJcblx0ZHJhZ0VuZCA9IFwiZHJhZ2VuZFwiLCAgICAgICAgICAgLy8gZmlyZSBvbiBzb3VyY2VcclxuXHRjYW5Ecm9wID0gXCJjYW5kcm9wXCIsICAgICAgICAgICAvLyBmaXJlIG9uIHRhcmdldFxyXG5cdGNhbmNlbERyb3AgPSBcImNhbmNlbGRyb3BcIiwgICAgIC8vIGZpcmUgb24gdGFyZ2V0XHJcblx0ZHJvcENvbXBsZXRlID0gXCJkcm9wY29tcGxldGVcIiwgLy8gZmlyZSBvbiB0YXJnZXRcclxuXHRkcmFnT3V0ID0gXCJkcmFnT3V0XCIsICAgICAgICAgICAvLyBmaXJlIG9uIHNvdXJjZVxyXG5cdGRyYWdJbiA9IFwiZHJhZ0luXCIgICAgICAgICAgICAgIC8vIGZpcmUgb24gc291cmNlXHJcbn1cclxuXHJcblxyXG5leHBvcnQgZW51bSBEcmFnTW9kZSB7XHJcblx0dGFyZ2V0ID0gXCJ0YXJnZXRcIixcclxuXHRib3RoID0gXCJib3RoXCIsXHJcblx0c291cmNlID0gXCJzb3VyY2VcIlxyXG59XHJcbmV4cG9ydCBlbnVtIERyb3BCZWhhdmlvdXIge1xyXG5cdGNoaWxkID0gXCJjaGlsZFwiLFxyXG5cdHNpYmxpbmcgPSBcInNpYmxpbmdcIixcclxuXHRjb21wbGV4ID0gXCJjb21wbGV4XCJcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJRGF0YUV2ZW50c0hhbmRsZXJzTWFwIHtcclxuXHRba2V5OiBzdHJpbmddOiAoLi4uYXJnczogYW55W10pID0+IGFueTtcclxuXHRbRGF0YUV2ZW50cy5jaGFuZ2VdOiAoaWQ/OiBzdHJpbmcsIHN0YXR1cz86IFN0YXR1c2VzLCBvYmo/OiBhbnkpID0+IGFueTtcclxuXHRbRGF0YUV2ZW50cy5hZnRlckFkZF06IChvYmo6IGFueSkgPT4gdm9pZDtcclxuXHRbRGF0YUV2ZW50cy5hZnRlclJlbW92ZV06IChvYmo6IGFueSkgPT4gdm9pZDtcclxuXHRbRGF0YUV2ZW50cy5iZWZvcmVBZGRdOiAob2JqOiBhbnkpID0+IGJvb2xlYW4gfCB2b2lkO1xyXG5cdFtEYXRhRXZlbnRzLmJlZm9yZVJlbW92ZV06IChvYmo6IGFueSkgPT4gYm9vbGVhbiB8IHZvaWQ7XHJcblx0W0RhdGFFdmVudHMubG9hZF06ICgpID0+IHZvaWQ7XHJcblx0W0RhdGFFdmVudHMucmVtb3ZlQWxsXTogKCkgPT4gdm9pZDtcclxuXHRbRGF0YUV2ZW50cy5sb2FkRXJyb3JdOiAocmVzcG9uc2U6IGFueSkgPT4gYm9vbGVhbiB8IHZvaWQ7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSURyYWdFdmVudHNIYW5kbGVyc01hcCB7XHJcblx0W2tleTogc3RyaW5nXTogKC4uLmFyZ3M6IGFueVtdKSA9PiBhbnk7XHJcblx0W0RyYWdFdmVudHMuYmVmb3JlRHJhZ106IChpdGVtOiBhbnksIGdob3N0OiBIVE1MRWxlbWVudCkgPT4gdm9pZCB8IGJvb2xlYW47XHJcblx0W0RyYWdFdmVudHMuYmVmb3JlRHJvcF06IChpZDogc3RyaW5nLCB0YXJnZXQ6IElPYmpXaXRoRGF0YSkgPT4gYW55O1xyXG5cdFtEcmFnRXZlbnRzLmNhbkRyb3BdOiAoaWQ6IHN0cmluZywgZHJvcFBvc2l0aW9uOiBEcm9wUG9zaXRpb24pID0+IGFueTtcclxuXHRbRHJhZ0V2ZW50cy5jYW5jZWxEcm9wXTogKGlkOiBzdHJpbmcsIGlkcz86IHN0cmluZ1tdKSA9PiBhbnk7XHJcblx0W0RyYWdFdmVudHMuZHJhZ0VuZF06IChpZDogc3RyaW5nLCBpZHM/OiBzdHJpbmdbXSkgPT4gYW55O1xyXG5cdFtEcmFnRXZlbnRzLmRyYWdJbl06IChpZDogc3RyaW5nLCBkcm9wUG9zaXRpb246IERyb3BQb3NpdGlvbiwgdGFyZ2V0OiBJT2JqV2l0aERhdGEpID0+IHZvaWQgfCBib29sZWFuO1xyXG5cdFtEcmFnRXZlbnRzLmRyYWdPdXRdOiAoaWQ6IHN0cmluZywgdGFyZ2V0OiBJT2JqV2l0aERhdGEpID0+IGFueTtcclxuXHRbRHJhZ0V2ZW50cy5kcmFnU3RhcnRdOiAoaWQ6IHN0cmluZywgaWRzPzogc3RyaW5nW10pID0+IGFueTtcclxuXHRbRHJhZ0V2ZW50cy5kcm9wQ29tcGxldGVdOiAoaWQ6IHN0cmluZywgcG9zaXRpb246IERyb3BQb3NpdGlvbikgPT4gYW55O1xyXG59XHJcblxyXG5leHBvcnQgZW51bSBEYXRhRHJpdmVyIHtcclxuXHRqc29uID0gXCJqc29uXCIsXHJcblx0Y3N2ID0gXCJjc3ZcIixcclxuXHR4bWwgPSBcInhtbFwiXHJcbn0iLCJpbXBvcnQgeyBnZXRSZWFsUG9zaXRpb24sIHRvTm9kZSB9IGZyb20gXCJAZGh4L3RzLWNvbW1vbi9odG1sXCI7XHJcbmltcG9ydCB7IE5hdmJhciwgY3JlYXRlRmFjdG9yeSwgSXRlbVR5cGUgfSBmcm9tIFwiQGRoeC90cy1uYXZiYXJcIjtcclxuaW1wb3J0IHsgSU1lbnVFbGVtZW50IH0gZnJvbSBcIi4vdHlwZXNcIjtcclxuXHJcblxyXG50eXBlIE1vZGUgPSBcImJvdHRvbVwiIHwgXCJyaWdodFwiO1xyXG5leHBvcnQgY2xhc3MgQ29udGV4dE1lbnUgZXh0ZW5kcyBOYXZiYXI8SU1lbnVFbGVtZW50PiB7XHJcblx0cHJvdGVjdGVkIF9pc0NvbnRleHRNZW51ID0gdHJ1ZTtcclxuXHJcblx0cHJpdmF0ZSBfbW9kZTogTW9kZTtcclxuXHJcblx0c2hvd0F0KGVsZW0gOiBIVE1MRWxlbWVudCB8IE1vdXNlRXZlbnQgfCBzdHJpbmcsIHNob3dBdDogTW9kZSA9IFwiYm90dG9tXCIpIHtcclxuXHRcdGlmIChlbGVtIGluc3RhbmNlb2YgTW91c2VFdmVudCkge1xyXG5cdFx0XHR0aGlzLl9jaGFuZ2VBY3RpdmVQb3NpdGlvbih7XHJcblx0XHRcdFx0bGVmdDogd2luZG93LnBhZ2VYT2Zmc2V0ICsgZWxlbS54ICsgMSxcclxuXHRcdFx0XHRyaWdodDogd2luZG93LnBhZ2VYT2Zmc2V0ICsgZWxlbS54ICsgMSxcclxuXHRcdFx0XHR0b3A6IHdpbmRvdy5wYWdlWU9mZnNldCArIGVsZW0ueSxcclxuXHRcdFx0XHRib3R0b206IHdpbmRvdy5wYWdlWU9mZnNldCArIGVsZW0ueVxyXG5cdFx0XHR9LCBzaG93QXQpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0Y29uc3Qgbm9kZSA9IHRvTm9kZShlbGVtKTtcclxuXHRcdFx0dGhpcy5fY2hhbmdlQWN0aXZlUG9zaXRpb24oZ2V0UmVhbFBvc2l0aW9uKG5vZGUpLCBzaG93QXQpO1xyXG5cdFx0fVxyXG5cclxuXHR9XHJcblx0cHJvdGVjdGVkIF9nZXRGYWN0b3J5KCkge1xyXG5cdFx0cmV0dXJuIGNyZWF0ZUZhY3Rvcnkoe1xyXG5cdFx0XHR3aWRnZXQ6IHRoaXMsXHJcblx0XHRcdGRlZmF1bHRUeXBlOiBJdGVtVHlwZS5tZW51SXRlbSxcclxuXHRcdFx0YWxsb3dlZFR5cGVzOiBbSXRlbVR5cGUubWVudUl0ZW0sIEl0ZW1UeXBlLnNlcGFyYXRvciwgSXRlbVR5cGUuc3BhY2VyXSxcclxuXHRcdFx0d2lkZ2V0TmFtZTogXCJjb250ZXh0LW1lbnVcIlxyXG5cdFx0fSk7XHJcblx0fVxyXG5cdHByb3RlY3RlZCBfY2xvc2UoKSB7XHJcblx0XHRzdXBlci5fY2xvc2UoKTtcclxuXHRcdHRoaXMuX2FjdGl2ZU1lbnUgPSBudWxsO1xyXG5cdFx0dGhpcy5fY2hhbmdlQWN0aXZlUG9zaXRpb24obnVsbCwgbnVsbCk7XHJcblx0fVxyXG5cdHByb3RlY3RlZCBfZ2V0TW9kZShfaXRlbSwgX3Jvb3QsIGFjdGl2ZTogYm9vbGVhbik6IE1vZGUge1xyXG5cdFx0cmV0dXJuIGFjdGl2ZSA/IHRoaXMuX21vZGUgOiBcInJpZ2h0XCI7XHJcblx0fVxyXG5cdHByaXZhdGUgX2NoYW5nZUFjdGl2ZVBvc2l0aW9uKHBvc2l0aW9uLCBtb2RlOiBNb2RlKSB7XHJcblx0XHR0aGlzLl9hY3RpdmVQb3NpdGlvbiA9IHBvc2l0aW9uO1xyXG5cdFx0dGhpcy5fbW9kZSA9IG1vZGU7XHJcblx0XHR0aGlzLl9saXN0ZW5PdXRlckNsaWNrKCk7XHJcblx0XHR0aGlzLnBhaW50KCk7XHJcblx0fVxyXG59IiwiaW1wb3J0IHsgY3JlYXRlLCBlbCB9IGZyb20gXCJAZGh4L3RzLWNvbW1vbi9kb21cIjtcclxuaW1wb3J0IHsgTmF2YmFyLCBjcmVhdGVGYWN0b3J5LCBJdGVtVHlwZSB9IGZyb20gXCJAZGh4L3RzLW5hdmJhclwiO1xyXG5pbXBvcnQgeyBJTWVudUVsZW1lbnQgfSBmcm9tIFwiLi90eXBlc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIE1lbnUgZXh0ZW5kcyBOYXZiYXI8SU1lbnVFbGVtZW50PiB7XHJcblx0Y29uc3RydWN0b3IoZWxlbWVudD86IHN0cmluZyB8IEhUTUxFbGVtZW50LCBjb25maWc/OiBhbnkpIHtcclxuXHRcdHN1cGVyKGVsZW1lbnQsIGNvbmZpZyk7XHJcblxyXG5cdFx0Y29uc3QgcmVuZGVyID0gKCkgPT4gdGhpcy5fZHJhdygpO1xyXG5cdFx0dGhpcy5tb3VudChlbGVtZW50LCBjcmVhdGUoeyByZW5kZXIgfSkpO1xyXG5cdH1cclxuXHRwcm90ZWN0ZWQgX2dldEZhY3RvcnkoKSB7XHJcblx0XHRyZXR1cm4gY3JlYXRlRmFjdG9yeSh7XHJcblx0XHRcdHdpZGdldDogdGhpcyxcclxuXHRcdFx0ZGVmYXVsdFR5cGU6IEl0ZW1UeXBlLm1lbnVJdGVtLFxyXG5cdFx0XHRhbGxvd2VkVHlwZXM6IFtJdGVtVHlwZS5tZW51SXRlbSwgSXRlbVR5cGUuc2VwYXJhdG9yLCBJdGVtVHlwZS5zcGFjZXJdLFxyXG5cdFx0XHR3aWRnZXROYW1lOiBcIm1lbnUtbmF2XCJcclxuXHRcdH0pO1xyXG5cdH1cclxuXHRwcml2YXRlIF9kcmF3KCk6IHZvaWQge1xyXG5cdFx0cmV0dXJuIGVsKFwidWwuZGh4X3dpZGdldFwiLCB7XHJcblx0XHRcdGRoeF93aWRnZXRfaWQ6IHRoaXMuX3VpZCxcclxuXHRcdFx0b25tb3VzZW1vdmU6IHRoaXMuX2hhbmRsZXJzLm9ubW91c2Vtb3ZlLFxyXG5cdFx0XHRvbm1vdXNlbGVhdmU6IHRoaXMuX2hhbmRsZXJzLm9ubW91c2VsZWF2ZSxcclxuXHRcdFx0b25jbGljazogdGhpcy5faGFuZGxlcnMub25jbGljayxcclxuXHRcdFx0b25tb3VzZWRvd246IHRoaXMuX2hhbmRsZXJzLm9ubW91c2Vkb3duLFxyXG5cdFx0XHRjbGFzczogXCJkaHhfbWVudS1uYXYgXCIgKyAodGhpcy5jb25maWcuY3NzID8gdGhpcy5jb25maWcuY3NzIDogXCJcIilcclxuXHRcdH0sIHRoaXMuX2RyYXdNZW51SXRlbXModGhpcy5kYXRhLmdldFJvb3QoKSwgZmFsc2UpKTtcclxuXHR9XHJcbn0iLCJpbXBvcnQgXCIuLi8uLi9zdHlsZXMvdG9vbGJhci5zY3NzXCI7XHJcblxyXG5leHBvcnQgeyBUcmVlQ29sbGVjdGlvbiB9IGZyb20gXCJAZGh4L3RzLWRhdGFcIjtcclxuZXhwb3J0IHtDb250ZXh0TWVudX0gZnJvbSBcIi4vQ29udGV4dE1lbnVcIjtcclxuZXhwb3J0IHtNZW51fSBmcm9tIFwiLi9NZW51XCI7IiwiZXhwb3J0ICogZnJvbSBcIi4vc291cmNlcy9OYXZiYXJcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vc291cmNlcy9pdGVtZmFjdG9yeVwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9zb3VyY2VzL3R5cGVzXCI7XHJcbiIsImltcG9ydCB7IGV4dGVuZCB9IGZyb20gXCJAZGh4L3RzLWNvbW1vbi9jb3JlXCI7XHJcbmltcG9ydCB7IElIYW5kbGVycyB9IGZyb20gXCJAZGh4L3RzLWNvbW1vbi90eXBlc1wiO1xyXG5pbXBvcnQgeyBjcmVhdGUsIGVsLCBWTm9kZSB9IGZyb20gXCJAZGh4L3RzLWNvbW1vbi9kb21cIjtcclxuaW1wb3J0IHsgRXZlbnRTeXN0ZW0sIElFdmVudFN5c3RlbSB9IGZyb20gXCJAZGh4L3RzLWNvbW1vbi9ldmVudHNcIjtcclxuaW1wb3J0IHsgY2FsY3VsYXRlUG9zaXRpb24sIGdldFJlYWxQb3NpdGlvbiwgbG9jYXRlLCBsb2NhdGVOb2RlIH0gZnJvbSBcIkBkaHgvdHMtY29tbW9uL2h0bWxcIjtcclxuaW1wb3J0IHsga2V5TWFuYWdlciB9IGZyb20gXCJAZGh4L3RzLWNvbW1vbi9LZXltYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFZpZXcgfSBmcm9tIFwiQGRoeC90cy1jb21tb24vdmlld1wiO1xyXG5cclxuaW1wb3J0IHsgVHJlZUNvbGxlY3Rpb24sIElEYXRhRXZlbnRzSGFuZGxlcnNNYXAgfSBmcm9tIFwiQGRoeC90cy1kYXRhXCI7XHJcbmltcG9ydCB7IERhdGFFdmVudHMsIElJdGVtLCBJR3JvdXBzLCBJdGVtVHlwZSwgTmF2aWdhdGlvblR5cGUsIE5hdmlnYXRpb25CYXJFdmVudHMsIElOYXZiYXJFdmVudEhhbmRsZXJzTWFwLCBJTmF2YmFyQ29uZmlnIH0gZnJvbSBcIi4vdHlwZXNcIjtcclxuXHJcblxyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgTmF2YmFyPFQgZXh0ZW5kcyBJSXRlbSA9IElJdGVtPiBleHRlbmRzIFZpZXcge1xyXG5cdHB1YmxpYyBkYXRhOiBUcmVlQ29sbGVjdGlvbjxUPjtcclxuXHRwdWJsaWMgZXZlbnRzOiBJRXZlbnRTeXN0ZW08RGF0YUV2ZW50cyB8IE5hdmlnYXRpb25CYXJFdmVudHMsIElEYXRhRXZlbnRzSGFuZGxlcnNNYXAgJiBJTmF2YmFyRXZlbnRIYW5kbGVyc01hcD47XHJcblxyXG5cdHB1YmxpYyBjb25maWc6IElOYXZiYXJDb25maWc7XHJcblxyXG5cdHByb3RlY3RlZCBfdnBvcHVwczogVk5vZGU7XHJcblx0cHJvdGVjdGVkIF9hY3RpdmVNZW51OiBzdHJpbmc7XHJcblx0cHJvdGVjdGVkIF9hY3RpdmVQb3NpdGlvbjoge1xyXG5cdFx0bGVmdDogbnVtYmVyLFxyXG5cdFx0cmlnaHQ6IG51bWJlcixcclxuXHRcdHRvcDogbnVtYmVyLFxyXG5cdFx0Ym90dG9tOiBudW1iZXJcclxuXHR9O1xyXG5cdHByb3RlY3RlZCBfaXNDb250ZXh0TWVudTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuXHRwcm90ZWN0ZWQgX2hhbmRsZXJzOiBJSGFuZGxlcnM7XHJcblx0cHJvdGVjdGVkIF9jdXJyZW50Um9vdDogc3RyaW5nO1xyXG5cclxuXHRwcm90ZWN0ZWQgX2ZhY3Rvcnk6IChpdGVtOiBULCBhc01lbnVJdGVtPzogYm9vbGVhbikgPT4gYW55O1xyXG5cclxuXHRwcm90ZWN0ZWQgX2dyb3VwczogSUdyb3VwcztcclxuXHJcblx0cHJpdmF0ZSBfaXNBY3RpdmU6IGJvb2xlYW47XHJcblx0cHJpdmF0ZSBfY3VycmVudFRpbWVvdXQ6IGFueTtcclxuXHRwcml2YXRlIF9kb2N1bWVudENsaWNrOiAoZTogTW91c2VFdmVudCkgPT4gdm9pZDtcclxuXHRwcml2YXRlIF9kb2N1bWVudEhhdmVMaXN0ZW5lcjogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuXHRwcml2YXRlIF9yb290SXRlbTogYW55O1xyXG5cdHByaXZhdGUgX2FjdGl2ZVBhcmVudHM6IHN0cmluZ1tdO1xyXG5cclxuXHRjb25zdHJ1Y3RvcihlbGVtZW50Pzogc3RyaW5nIHwgSFRNTEVsZW1lbnQsIGNvbmZpZz86IGFueSkge1xyXG5cdFx0c3VwZXIoZWxlbWVudCwgZXh0ZW5kKHt9LCBjb25maWcpKTtcclxuXHRcdHRoaXMuX3Jvb3RJdGVtID0ge307XHJcblxyXG5cdFx0aWYgKEFycmF5LmlzQXJyYXkodGhpcy5jb25maWcuZGF0YSkpIHtcclxuXHRcdFx0dGhpcy5ldmVudHMgPSBuZXcgRXZlbnRTeXN0ZW08RGF0YUV2ZW50cyB8IE5hdmlnYXRpb25CYXJFdmVudHM+KHRoaXMpO1xyXG5cdFx0XHR0aGlzLmRhdGEgPSBuZXcgVHJlZUNvbGxlY3Rpb248VD4oe30sIHRoaXMuZXZlbnRzKTtcclxuXHRcdH0gZWxzZSBpZiAodGhpcy5jb25maWcuZGF0YSAmJiB0aGlzLmNvbmZpZy5kYXRhLmV2ZW50cykge1xyXG5cdFx0XHR0aGlzLmRhdGEgPSB0aGlzLmNvbmZpZy5kYXRhO1xyXG5cdFx0XHR0aGlzLmV2ZW50cyA9IHRoaXMuZGF0YS5ldmVudHM7XHJcblx0XHRcdHRoaXMuZXZlbnRzLmNvbnRleHQgPSB0aGlzO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGhpcy5ldmVudHMgPSBuZXcgRXZlbnRTeXN0ZW08RGF0YUV2ZW50cyB8IE5hdmlnYXRpb25CYXJFdmVudHM+KHRoaXMpO1xyXG5cdFx0XHR0aGlzLmRhdGEgPSBuZXcgVHJlZUNvbGxlY3Rpb248VD4oe30sIHRoaXMuZXZlbnRzKTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLl9kb2N1bWVudENsaWNrID0gKGUpID0+IHtcclxuXHRcdFx0aWYgKGxvY2F0ZShlLCBcImRoeF93aWRnZXRfaWRcIikgIT09IHRoaXMuX3VpZCAmJiB0aGlzLl9kb2N1bWVudEhhdmVMaXN0ZW5lcikge1xyXG5cdFx0XHRcdGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLl9kb2N1bWVudENsaWNrKTtcclxuXHRcdFx0XHR0aGlzLl9kb2N1bWVudEhhdmVMaXN0ZW5lciA9IGZhbHNlO1xyXG5cdFx0XHRcdHRoaXMuX2Nsb3NlKCk7XHJcblx0XHRcdH1cclxuXHRcdH07XHJcblx0XHR0aGlzLl9jdXJyZW50Um9vdCA9IHRoaXMuZGF0YS5nZXRSb290KCk7XHJcblx0XHR0aGlzLl9mYWN0b3J5ID0gdGhpcy5fZ2V0RmFjdG9yeSgpO1xyXG5cdFx0dGhpcy5faW5pdEhhbmRsZXJzKCk7XHJcblx0XHR0aGlzLl9pbml0KCk7XHJcblx0XHR0aGlzLl9pbml0RXZlbnRzKCk7XHJcblx0XHRpZiAoQXJyYXkuaXNBcnJheSh0aGlzLmNvbmZpZy5kYXRhKSkge1xyXG5cdFx0XHR0aGlzLmRhdGEucGFyc2UodGhpcy5jb25maWcuZGF0YSk7XHJcblx0XHR9XHJcblx0fVxyXG5cdHBhaW50KCk6IHZvaWQge1xyXG5cdFx0c3VwZXIucGFpbnQoKTtcclxuXHRcdHRoaXMuX3Zwb3B1cHMucmVkcmF3KCk7XHJcblx0fVxyXG5cdGRpc2FibGUoaWRzOiBzdHJpbmcgfCBzdHJpbmdbXSkge1xyXG5cdFx0dGhpcy5fc2V0UHJvcChpZHMsIFwiZGlzYWJsZWRcIiwgdHJ1ZSk7XHJcblx0fVxyXG5cdGVuYWJsZShpZHM6IHN0cmluZyB8IHN0cmluZ1tdKSB7XHJcblx0XHR0aGlzLl9zZXRQcm9wKGlkcywgXCJkaXNhYmxlZFwiLCBmYWxzZSk7XHJcblx0fVxyXG5cdHNob3coaWRzOiBzdHJpbmcgfCBzdHJpbmdbXSk6IHZvaWQge1xyXG5cdFx0dGhpcy5fc2V0UHJvcChpZHMsIFwiaGlkZGVuXCIsIGZhbHNlKTtcclxuXHR9XHJcblx0aGlkZShpZHM6IHN0cmluZyB8IHN0cmluZ1tdKTogdm9pZCB7XHJcblx0XHR0aGlzLl9zZXRQcm9wKGlkcywgXCJoaWRkZW5cIiwgdHJ1ZSk7XHJcblx0fVxyXG5cdGRlc3RydWN0b3IoKSB7XHJcblx0XHR0aGlzLnVubW91bnQoKTtcclxuXHRcdGtleU1hbmFnZXIucmVtb3ZlSG90S2V5KG51bGwsIHRoaXMpO1xyXG5cdFx0dGhpcy5fdnBvcHVwcy51bm1vdW50KCk7XHJcblx0fVxyXG5cdHByb3RlY3RlZCBhYnN0cmFjdCBfZ2V0RmFjdG9yeSgpOiAoaXRlbTogVCwgYXNNZW51SXRlbT86IGJvb2xlYW4pID0+IGFueTtcclxuXHRwcm90ZWN0ZWQgX2N1c3RvbUhhbmRsZXJzKCkge1xyXG5cdFx0cmV0dXJuIHt9O1xyXG5cdH1cclxuXHRwcm90ZWN0ZWQgX2Nsb3NlKCk6IHZvaWQge1xyXG5cdFx0aWYgKHRoaXMuX2FjdGl2ZVBhcmVudHMpIHtcclxuXHRcdFx0dGhpcy5fYWN0aXZlUGFyZW50cy5mb3JFYWNoKHBhcmVudElkID0+IHRoaXMuZGF0YS5leGlzdHMocGFyZW50SWQpICYmIHRoaXMuZGF0YS51cGRhdGUocGFyZW50SWQsIHskYWN0aXZlUGFyZW50OiBmYWxzZX0pKTtcclxuXHRcdH1cclxuXHRcdGlmICh0aGlzLmNvbmZpZy5uYXZpZ2F0aW9uVHlwZSA9PT0gTmF2aWdhdGlvblR5cGUuY2xpY2spIHtcclxuXHRcdFx0dGhpcy5faXNBY3RpdmUgPSBmYWxzZTtcclxuXHRcdH1cclxuXHRcdGNsZWFyVGltZW91dCh0aGlzLl9jdXJyZW50VGltZW91dCk7XHJcblx0XHR0aGlzLl9hY3RpdmVNZW51ID0gbnVsbDtcclxuXHRcdHRoaXMucGFpbnQoKTtcclxuXHR9XHJcblx0cHJvdGVjdGVkIF9pbml0KCkge1xyXG5cdFx0Y29uc3QgcmVuZGVyID0gKCkgPT4gZWwoXHJcblx0XHRcdFwiZGl2XCIsXHJcblx0XHRcdHtcclxuXHRcdFx0XHRkaHhfd2lkZ2V0X2lkOiB0aGlzLl91aWQsXHJcblx0XHRcdFx0Y2xhc3M6IFwiZGh4X1wiICsgKHRoaXMuX2lzQ29udGV4dE1lbnUgPyBcIiBkaHhfY29udGV4dC1tZW51XCIgOiBcIlwiKSxcclxuXHRcdFx0XHRvbm1vdXNlbW92ZTogdGhpcy5faGFuZGxlcnMub25tb3VzZW1vdmUsXHJcblx0XHRcdFx0b25tb3VzZWxlYXZlOiB0aGlzLl9oYW5kbGVycy5vbm1vdXNlbGVhdmUsXHJcblx0XHRcdFx0b25jbGljazogdGhpcy5faGFuZGxlcnMub25jbGljayxcclxuXHRcdFx0XHRvbm1vdXNlZG93bjogdGhpcy5faGFuZGxlcnMub25tb3VzZWRvd25cclxuXHRcdFx0fSxcclxuXHRcdFx0dGhpcy5fZHJhd1BvcHVwcygpXHJcblx0XHQpO1xyXG5cdFx0dGhpcy5fdnBvcHVwcyA9IGNyZWF0ZSh7XHJcblx0XHRcdHJlbmRlclxyXG5cdFx0fSk7XHJcblx0XHR0aGlzLl92cG9wdXBzLm1vdW50KGRvY3VtZW50LmJvZHkpO1xyXG5cdH1cclxuXHRwcm90ZWN0ZWQgX2luaXRIYW5kbGVycygpIHtcclxuXHRcdC8qXHJcblx0XHRcdGZvciBuYXZpZ2F0aW9uIHR5cGUgY2xpY2s6XHJcblx0XHRcdGZpcnN0IGNsaWNrIG9wZW4gbWVudSwgX2lzQWN0aXZlID0gdHJ1ZVxyXG5cdFx0XHRhZnRlciBuYXZpZ2F0aW9uIHVzZSBtb3VzZW1vdmVcclxuXHRcdFx0Y2FuIGJlIGNsb3NlZCBhZnRlciBvdXRlciBjbGljayBvciBtZW51IGxlYWYgaXRlbSBjbGlja1xyXG5cdFx0Ki9cclxuXHRcdHRoaXMuX2lzQWN0aXZlID0gdGhpcy5jb25maWcubmF2aWdhdGlvblR5cGUgIT09IE5hdmlnYXRpb25UeXBlLmNsaWNrO1xyXG5cclxuXHRcdHRoaXMuX2hhbmRsZXJzID0ge1xyXG5cdFx0XHRvbm1vdXNlbW92ZTogKGUpID0+IHtcclxuXHRcdFx0XHRpZiAoIXRoaXMuX2lzQWN0aXZlKSB7XHJcblx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRjb25zdCBlbGVtID0gbG9jYXRlTm9kZShlKTtcclxuXHRcdFx0XHRpZiAoIWVsZW0pIHtcclxuXHRcdFx0XHRcdHJldHVybjtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0Y29uc3QgaWQgPSBlbGVtLmdldEF0dHJpYnV0ZShcImRoeF9pZFwiKTtcclxuXHRcdFx0XHRpZiAodGhpcy5fYWN0aXZlTWVudSAhPT0gaWQpIHtcclxuXHRcdFx0XHRcdHRoaXMuX2FjdGl2ZU1lbnUgPSBpZDtcclxuXHRcdFx0XHRcdGlmICh0aGlzLmRhdGEuaGF2ZUl0ZW1zKGlkKSkge1xyXG5cdFx0XHRcdFx0XHRjb25zdCBwb3NpdGlvbiA9IGdldFJlYWxQb3NpdGlvbihlbGVtIGFzIEhUTUxFbGVtZW50KTtcclxuXHRcdFx0XHRcdFx0dGhpcy5kYXRhLnVwZGF0ZShpZCwgeyAkcG9zaXRpb246IHBvc2l0aW9uIH0sIGZhbHNlKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdHRoaXMuX2FjdGl2ZUl0ZW1DaGFuZ2UoaWQpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSxcclxuXHRcdFx0b25tb3VzZWxlYXZlOiAoKSA9PiB7XHJcblx0XHRcdFx0aWYgKHRoaXMuY29uZmlnLm5hdmlnYXRpb25UeXBlICE9PSBOYXZpZ2F0aW9uVHlwZS5jbGljaykgeyAvLyBtYXliZSBhbGwgdGltZSB3aGVuIG1vdXNlIGxlYXZlIGNsb3NlIG1lbnVcclxuXHRcdFx0XHRcdHRoaXMuX2FjdGl2ZUl0ZW1DaGFuZ2UobnVsbCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9LFxyXG5cdFx0XHRvbmNsaWNrOiAoZSkgPT4ge1xyXG5cdFx0XHRcdGNvbnN0IGVsZW1lbnQgPSBsb2NhdGVOb2RlKGUpO1xyXG5cdFx0XHRcdGlmICghZWxlbWVudCkge1xyXG5cdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0Y29uc3QgaWQgPSBlbGVtZW50LmdldEF0dHJpYnV0ZShcImRoeF9pZFwiKTtcclxuXHRcdFx0XHRjb25zdCBpdGVtID0gdGhpcy5kYXRhLmdldEl0ZW0oaWQpO1xyXG5cdFx0XHRcdGlmIChpdGVtLm11bHRpQ2xpY2spIHtcclxuXHRcdFx0XHRcdHJldHVybjtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGlmICh0aGlzLmRhdGEuaGF2ZUl0ZW1zKGlkKSkge1xyXG5cdFx0XHRcdFx0aWYgKGlkID09PSB0aGlzLl9jdXJyZW50Um9vdCkge1xyXG5cdFx0XHRcdFx0XHR0aGlzLl9jbG9zZSgpO1xyXG5cdFx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRpZiAoIXRoaXMuX2lzQWN0aXZlKSB7XHJcblx0XHRcdFx0XHRcdHRoaXMuX2lzQWN0aXZlID0gdHJ1ZTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdHRoaXMuX3NldFJvb3QoaWQpO1xyXG5cdFx0XHRcdFx0dGhpcy5fYWN0aXZlTWVudSA9IGlkO1xyXG5cclxuXHRcdFx0XHRcdGNvbnN0IHBvc2l0aW9uID0gZ2V0UmVhbFBvc2l0aW9uKGVsZW1lbnQgYXMgSFRNTEVsZW1lbnQpO1xyXG5cdFx0XHRcdFx0dGhpcy5kYXRhLnVwZGF0ZShpZCwgeyAkcG9zaXRpb246IHBvc2l0aW9uIH0sIGZhbHNlKTtcclxuXHRcdFx0XHRcdHRoaXMuX2FjdGl2ZUl0ZW1DaGFuZ2UoaWQpO1xyXG5cdFx0XHRcdH0gZWxzZSAge1xyXG5cdFx0XHRcdFx0c3dpdGNoIChpdGVtLnR5cGUpIHtcclxuXHRcdFx0XHRcdFx0Y2FzZSBJdGVtVHlwZS5pbnB1dDpcclxuXHRcdFx0XHRcdFx0Y2FzZSBJdGVtVHlwZS50aXRsZTpcclxuXHRcdFx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRcdFx0Y2FzZSBJdGVtVHlwZS5tZW51SXRlbTpcclxuXHRcdFx0XHRcdFx0Y2FzZSBJdGVtVHlwZS5zZWxlY3RCdXR0b246XHJcblx0XHRcdFx0XHRcdFx0dGhpcy5fb25NZW51SXRlbUNsaWNrKGlkLCBlKTtcclxuXHRcdFx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRcdFx0Y2FzZSBJdGVtVHlwZS5pbWFnZUJ1dHRvbjpcclxuXHRcdFx0XHRcdFx0Y2FzZSBJdGVtVHlwZS5idXR0b246XHJcblx0XHRcdFx0XHRcdGNhc2UgSXRlbVR5cGUuY3VzdG9tSFRNTEJ1dHRvbjpcclxuXHRcdFx0XHRcdFx0Y2FzZSBJdGVtVHlwZS5uYXZJdGVtOlxyXG5cdFx0XHRcdFx0XHRcdGlmICgoaXRlbSBhcyBhbnkpLnR3b1N0YXRlKSB7XHJcblx0XHRcdFx0XHRcdFx0XHR0aGlzLmRhdGEudXBkYXRlKGl0ZW0uaWQsIHthY3RpdmU6ICFpdGVtLmFjdGl2ZX0pO1xyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHR0aGlzLmV2ZW50cy5maXJlKE5hdmlnYXRpb25CYXJFdmVudHMuY2xpY2ssIFtpZCwgZV0pO1xyXG5cdFx0XHRcdFx0XHRcdC8vIG1pc3NlZCBicmVhayBmb3IgdHJpZ2dlciBjbG9zZVxyXG5cdFx0XHRcdFx0XHRkZWZhdWx0OlxyXG5cdFx0XHRcdFx0XHRcdHRoaXMuX2Nsb3NlKCk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9LFxyXG5cdFx0XHRvbm1vdXNlZG93bjogZSA9PiB7XHJcblx0XHRcdFx0Y29uc3QgZWxlbWVudCA9IGxvY2F0ZU5vZGUoZSk7XHJcblx0XHRcdFx0aWYgKCFlbGVtZW50KSB7XHJcblx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRjb25zdCBpZCA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKFwiZGh4X2lkXCIpO1xyXG5cdFx0XHRcdGNvbnN0IGl0ZW0gPSB0aGlzLmRhdGEuZ2V0SXRlbShpZCk7XHJcblx0XHRcdFx0aWYgKCFpdGVtLm11bHRpQ2xpY2spIHtcclxuXHRcdFx0XHRcdHJldHVybjtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGxldCBmaXJlVGltZSA9IDM2NTtcclxuXHRcdFx0XHRsZXQgdGltZW91dDtcclxuXHJcblx0XHRcdFx0Y29uc3QgZmlyZUFjdGlvbiA9ICgpID0+IHtcclxuXHRcdFx0XHRcdHRoaXMuZXZlbnRzLmZpcmUoTmF2aWdhdGlvbkJhckV2ZW50cy5jbGljaywgW2lkLCBlXSk7XHJcblx0XHRcdFx0XHRpZiAoZmlyZVRpbWUgPiA1MCkge1xyXG5cdFx0XHRcdFx0XHRmaXJlVGltZSAtPSA1NTtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHR0aW1lb3V0ID0gc2V0VGltZW91dChmaXJlQWN0aW9uLCBmaXJlVGltZSk7XHJcblx0XHRcdFx0fTtcclxuXHJcblx0XHRcdFx0Y29uc3QgbW91c2V1cCA9ICgpID0+IHtcclxuXHRcdFx0XHRcdGNsZWFyVGltZW91dCh0aW1lb3V0KTtcclxuXHRcdFx0XHRcdGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIG1vdXNldXApO1xyXG5cdFx0XHRcdH07XHJcblxyXG5cdFx0XHRcdGZpcmVBY3Rpb24oKTtcclxuXHJcblx0XHRcdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgbW91c2V1cCk7XHJcblx0XHRcdH0sXHJcblx0XHRcdC4uLnRoaXMuX2N1c3RvbUhhbmRsZXJzKClcclxuXHRcdH07XHJcblx0fVxyXG5cdHByb3RlY3RlZCBfaW5pdEV2ZW50cygpOiB2b2lkIHtcclxuXHRcdGxldCB0aW1lb3V0ID0gbnVsbDtcclxuXHRcdHRoaXMuZGF0YS5ldmVudHMub24oRGF0YUV2ZW50cy5jaGFuZ2UsICgpID0+IHtcclxuXHRcdFx0dGhpcy5wYWludCgpO1xyXG5cclxuXHRcdFx0aWYgKHRpbWVvdXQpIHtcclxuXHRcdFx0XHRjbGVhclRpbWVvdXQodGltZW91dCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuXHRcdFx0XHRjb25zdCBncm91cHM6IElHcm91cHMgPSB7fTtcclxuXHJcblx0XHRcdFx0dGhpcy5kYXRhLmVhY2hDaGlsZCh0aGlzLmRhdGEuZ2V0Um9vdCgpLCBpdGVtID0+IHtcclxuXHRcdFx0XHRcdGlmIChpdGVtLmdyb3VwKSB7XHJcblx0XHRcdFx0XHRcdChpdGVtIGFzIGFueSkudHdvU3RhdGUgPSB0cnVlO1xyXG5cdFx0XHRcdFx0XHRhZGRJbkdyb3Vwcyhncm91cHMsIGl0ZW0pO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0sIHRydWUpO1xyXG5cclxuXHRcdFx0XHR0aGlzLl9ncm91cHMgPSBncm91cHM7XHJcblx0XHRcdFx0dGhpcy5fcmVzZXRIb3RrZXlzKCk7XHJcblx0XHRcdFx0dGltZW91dCA9IG51bGw7XHJcblx0XHRcdFx0dGhpcy5wYWludCgpO1xyXG5cdFx0XHR9LCAxMDApO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0dGhpcy5ldmVudHMub24oTmF2aWdhdGlvbkJhckV2ZW50cy5jbGljaywgaWQgPT4ge1xyXG5cdFx0XHRjb25zdCBpdGVtID0gdGhpcy5kYXRhLmdldEl0ZW0oaWQpO1xyXG5cdFx0XHRjb25zdCBwYXJlbnQgPSB0aGlzLmRhdGEuZ2V0SXRlbShpdGVtLnBhcmVudCk7XHJcblxyXG5cdFx0XHRpZiAocGFyZW50ICYmIHBhcmVudC50eXBlID09PSBJdGVtVHlwZS5zZWxlY3RCdXR0b24pIHtcclxuXHRcdFx0XHR0aGlzLmRhdGEudXBkYXRlKGl0ZW0ucGFyZW50LCB7dmFsdWU6IGl0ZW0udmFsdWUsIGljb246IGl0ZW0uaWNvbn0pO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoaXRlbS5ncm91cCkge1xyXG5cdFx0XHRcdGNvbnN0IGdyb3VwID0gdGhpcy5fZ3JvdXBzW2l0ZW0uZ3JvdXBdO1xyXG5cclxuXHRcdFx0XHRpZiAoZ3JvdXAuYWN0aXZlKSB7XHJcblx0XHRcdFx0XHR0aGlzLmRhdGEudXBkYXRlKGdyb3VwLmFjdGl2ZSwge2FjdGl2ZTogZmFsc2V9KTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0Z3JvdXAuYWN0aXZlID0gaXRlbS5pZDtcclxuXHRcdFx0XHR0aGlzLmRhdGEudXBkYXRlKGl0ZW0uaWQsIHthY3RpdmU6IHRydWV9KTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0XHR0aGlzLl9jdXN0b21Jbml0RXZlbnRzKCk7XHJcblx0fVxyXG5cdHByb3RlY3RlZCBfZ2V0TW9kZShpdGVtOiBULCByb290OiBzdHJpbmcsIF9hY3RpdmUgPSBmYWxzZSk6IFwiYm90dG9tXCIgfCBcInJpZ2h0XCIge1xyXG5cdFx0cmV0dXJuIGl0ZW0ucGFyZW50ID09PSByb290ID8gXCJib3R0b21cIiA6IFwicmlnaHRcIjtcclxuXHR9XHJcblx0cHJvdGVjdGVkIF9kcmF3TWVudUl0ZW1zKGlkOiBzdHJpbmcsIGFzTWVudUl0ZW06IGJvb2xlYW4gPSB0cnVlKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5kYXRhLm1hcChpdGVtID0+IHRoaXMuX2ZhY3RvcnkoaXRlbSwgYXNNZW51SXRlbSksIGlkLCBmYWxzZSk7XHJcblx0fVxyXG5cdHByb3RlY3RlZCBfc2V0Um9vdChfaWQ6IHN0cmluZyk6IHZvaWQge1xyXG5cdFx0cmV0dXJuOyAvLyBuZWVkIG9ubHkgZm9yIHRvb2xiYXJcclxuXHR9XHJcblx0cHJvdGVjdGVkIF9nZXRQYXJlbnRzKGlkLCByb290KTogc3RyaW5nW10ge1xyXG5cdFx0Y29uc3QgcGFyZW50SWRzID0gW107XHJcblx0XHRsZXQgYWZ0ZXJSb290ID0gZmFsc2U7XHJcblxyXG5cdFx0Y29uc3QgY3VycmVudEl0ZW0gPSB0aGlzLmRhdGEuZ2V0SXRlbShpZCk7XHJcblx0XHRjb25zdCBkaXNhYmxlZCA9IGN1cnJlbnRJdGVtICYmIGN1cnJlbnRJdGVtLmRpc2FibGVkO1xyXG5cdFx0dGhpcy5kYXRhLmVhY2hQYXJlbnQoaWQsIGl0ZW0gPT4ge1xyXG5cdFx0XHRpZiAoaXRlbS5pZCA9PT0gcm9vdCkge1xyXG5cdFx0XHRcdHBhcmVudElkcy5wdXNoKGl0ZW0uaWQpO1xyXG5cdFx0XHRcdGFmdGVyUm9vdCA9IHRydWU7XHJcblx0XHRcdH0gZWxzZSBpZiAoIWFmdGVyUm9vdCkge1xyXG5cdFx0XHRcdHBhcmVudElkcy5wdXNoKGl0ZW0uaWQpO1xyXG5cdFx0XHR9XHJcblx0XHR9LCAhZGlzYWJsZWQpO1xyXG5cclxuXHRcdGlmICh0aGlzLl9pc0NvbnRleHRNZW51ICYmIHRoaXMuX2FjdGl2ZVBvc2l0aW9uKSB7XHJcblx0XHRcdHBhcmVudElkcy5wdXNoKHJvb3QpO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHBhcmVudElkcztcclxuXHR9XHJcblx0cHJvdGVjdGVkIF9saXN0ZW5PdXRlckNsaWNrKCkge1xyXG5cdFx0aWYgKHRoaXMuX2RvY3VtZW50SGF2ZUxpc3RlbmVyKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLl9kb2N1bWVudENsaWNrLCB0cnVlKTtcclxuXHRcdHRoaXMuX2RvY3VtZW50SGF2ZUxpc3RlbmVyID0gdHJ1ZTtcclxuXHR9XHJcblx0cHJvdGVjdGVkIF9jdXN0b21Jbml0RXZlbnRzKCkge1xyXG5cdFx0cmV0dXJuO1xyXG5cdH1cclxuXHRwcml2YXRlIF9kcmF3UG9wdXBzKCkge1xyXG5cdFx0Y29uc3QgaWQgPSB0aGlzLl9hY3RpdmVNZW51O1xyXG5cdFx0aWYgKCF0aGlzLl9pc0NvbnRleHRNZW51ICYmICFpZCkge1xyXG5cdFx0XHRyZXR1cm4gbnVsbDtcclxuXHRcdH1cclxuXHRcdGNvbnN0IHJvb3QgPSB0aGlzLl9jdXJyZW50Um9vdDtcclxuXHRcdGlmICh0aGlzLl9pc0NvbnRleHRNZW51ICYmICF0aGlzLl9hY3RpdmVQb3NpdGlvbikge1xyXG5cdFx0XHRyZXR1cm4gbnVsbDtcclxuXHRcdH1cclxuXHRcdGNvbnN0IHBhcmVudElkcyA9IHRoaXMuX2dldFBhcmVudHMoaWQsIHJvb3QpO1xyXG5cdFx0dGhpcy5fYWN0aXZlUGFyZW50cyA9IHBhcmVudElkcztcclxuXHRcdHBhcmVudElkcy5mb3JFYWNoKChwYXJlbnRJZCkgPT4gdGhpcy5kYXRhLmV4aXN0cyhwYXJlbnRJZCkgJiYgdGhpcy5kYXRhLnVwZGF0ZShwYXJlbnRJZCwgeyRhY3RpdmVQYXJlbnQ6IHRydWV9LCBmYWxzZSkpO1xyXG5cdFx0cmV0dXJuIHBhcmVudElkcy5tYXAoaXRlbUlkID0+IHtcclxuXHRcdFx0aWYgKCF0aGlzLmRhdGEuaGF2ZUl0ZW1zKGl0ZW1JZCkpIHtcclxuXHRcdFx0XHRyZXR1cm4gbnVsbDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Y29uc3QgaXRlbSA9IHRoaXMuZGF0YS5nZXRJdGVtKGl0ZW1JZCkgfHwgdGhpcy5fcm9vdEl0ZW0gYXMgYW55OyAvLyBmb3Igcm9vdCBpdGVtXHJcblx0XHRcdHJldHVybiBlbChcInVsXCIsIHtcclxuXHRcdFx0XHRjbGFzczogXCJkaHhfd2lkZ2V0IGRoeF9tZW51XCIgKyAodGhpcy5jb25maWcubWVudUNzcyA/IFwiIFwiICsgdGhpcy5jb25maWcubWVudUNzcyA6IFwiXCIpLFxyXG5cdFx0XHRcdF9rZXk6IGl0ZW1JZCxcclxuXHRcdFx0XHRfaG9va3M6IHtcclxuXHRcdFx0XHRcdGRpZEluc2VydDogdm5vZGUgPT4ge1xyXG5cdFx0XHRcdFx0XHRjb25zdCB7d2lkdGgsIGhlaWdodH0gPSB2bm9kZS5lbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuXHRcdFx0XHRcdFx0Y29uc3QgcG9zaXRpb24gPSB0aGlzLl9pc0NvbnRleHRNZW51ICYmIHRoaXMuX2FjdGl2ZVBvc2l0aW9uICYmIGl0ZW1JZCA9PT0gcm9vdCA/IHRoaXMuX2FjdGl2ZVBvc2l0aW9uIDogaXRlbS4kcG9zaXRpb247XHJcblx0XHRcdFx0XHRcdGNvbnN0IG1vZGUgPSB0aGlzLl9nZXRNb2RlKGl0ZW0sIHJvb3QsIHBvc2l0aW9uID09PSB0aGlzLl9hY3RpdmVQb3NpdGlvbik7XHJcblx0XHRcdFx0XHRcdGNvbnN0IHN0eWxlID0gY2FsY3VsYXRlUG9zaXRpb24ocG9zaXRpb24sIHttb2RlOiBtb2RlIGFzIGFueSwgd2lkdGgsIGhlaWdodH0pO1xyXG5cdFx0XHRcdFx0XHRpdGVtLiRzdHlsZSA9IHN0eWxlO1xyXG5cdFx0XHRcdFx0XHR2bm9kZS5wYXRjaCh7c3R5bGV9KTtcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRkaWRSZWN5Y2xlOiAoXywgdm5vZGUpID0+IHtcclxuXHRcdFx0XHRcdFx0aWYgKHRoaXMuX2lzQ29udGV4dE1lbnUgJiYgdGhpcy5fYWN0aXZlUG9zaXRpb24gJiYgaXRlbUlkID09PSByb290KSB7XHJcblx0XHRcdFx0XHRcdFx0Y29uc3Qge3dpZHRoLCBoZWlnaHR9ID0gdm5vZGUuZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcblx0XHRcdFx0XHRcdFx0Y29uc3Qgc3R5bGUgPSBjYWxjdWxhdGVQb3NpdGlvbih0aGlzLl9hY3RpdmVQb3NpdGlvbiwge21vZGU6IHRoaXMuX2dldE1vZGUoaXRlbSwgcm9vdCwgdHJ1ZSkgYXMgYW55LCB3aWR0aCwgaGVpZ2h0fSk7XHJcblx0XHRcdFx0XHRcdFx0aXRlbS4kc3R5bGUgPSBzdHlsZTtcclxuXHRcdFx0XHRcdFx0XHR2bm9kZS5wYXRjaCh7c3R5bGV9KTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0dGFiaW5kZXg6IDAsXHJcblx0XHRcdFx0c3R5bGU6IGl0ZW0uJHN0eWxlIHx8IHtcclxuXHRcdFx0XHRcdHBvc2l0aW9uOiBcImFic29sdXRlXCJcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0sIHRoaXMuX2RyYXdNZW51SXRlbXMoaXRlbUlkKSk7XHJcblx0XHR9KS5yZXZlcnNlKCk7XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIF9vbk1lbnVJdGVtQ2xpY2soaWQsIGUpIHtcclxuXHRcdGNvbnN0IGl0ZW0gPSB0aGlzLmRhdGEuZ2V0SXRlbShpZCk7XHJcblx0XHRpZiAoaXRlbS5kaXNhYmxlZCkge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblx0XHRpZiAoKGl0ZW0gYXMgYW55KS50d29TdGF0ZSkge1xyXG5cdFx0XHR0aGlzLmRhdGEudXBkYXRlKGl0ZW0uaWQsIHthY3RpdmU6ICFpdGVtLmFjdGl2ZX0pO1xyXG5cdFx0fVxyXG5cdFx0dGhpcy5ldmVudHMuZmlyZShOYXZpZ2F0aW9uQmFyRXZlbnRzLmNsaWNrLCBbaWQsIGVdKTtcclxuXHRcdHRoaXMuX2Nsb3NlKCk7XHJcblx0fVxyXG5cdHByaXZhdGUgX2FjdGl2ZUl0ZW1DaGFuZ2UoaWQpOiB2b2lkIHtcclxuXHRcdGlmICh0aGlzLl9hY3RpdmVQYXJlbnRzKSB7XHJcblx0XHRcdGNvbnN0IHBhcmVudElkcyA9IHRoaXMuX2dldFBhcmVudHMoaWQsIHRoaXMuX2N1cnJlbnRSb290KTtcclxuXHRcdFx0dGhpcy5fYWN0aXZlUGFyZW50cy5mb3JFYWNoKHBhcmVudElkID0+IHtcclxuXHRcdFx0XHRpZiAodGhpcy5kYXRhLmV4aXN0cyhwYXJlbnRJZCkgJiYgcGFyZW50SWRzLmluZGV4T2YocGFyZW50SWQpID09PSAtMSkge1xyXG5cdFx0XHRcdFx0dGhpcy5kYXRhLnVwZGF0ZShwYXJlbnRJZCwgeyRhY3RpdmVQYXJlbnQ6IGZhbHNlfSwgZmFsc2UpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblx0XHRpZiAoaWQgJiYgIXRoaXMuX2RvY3VtZW50SGF2ZUxpc3RlbmVyKSB7XHJcblx0XHRcdHRoaXMuX2xpc3Rlbk91dGVyQ2xpY2soKTtcclxuXHRcdH1cclxuXHRcdGlmIChpZCAmJiB0aGlzLmRhdGEuaGF2ZUl0ZW1zKGlkKSkge1xyXG5cdFx0XHR0aGlzLmV2ZW50cy5maXJlKE5hdmlnYXRpb25CYXJFdmVudHMub3Blbk1lbnUsIFtpZF0pO1xyXG5cdFx0XHR0aGlzLl9hY3RpdmVNZW51ID0gaWQ7XHJcblx0XHRcdGNsZWFyVGltZW91dCh0aGlzLl9jdXJyZW50VGltZW91dCk7XHJcblx0XHRcdHRoaXMucGFpbnQoKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRoaXMuX2FjdGl2ZU1lbnUgPSBpZDtcclxuXHRcdFx0Y2xlYXJUaW1lb3V0KHRoaXMuX2N1cnJlbnRUaW1lb3V0KTtcclxuXHRcdFx0dGhpcy5fY3VycmVudFRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHRoaXMucGFpbnQoKSwgNDAwKTtcclxuXHRcdH1cclxuXHR9XHJcblx0cHJpdmF0ZSBfcmVzZXRIb3RrZXlzKCk6IHZvaWQge1xyXG5cdFx0a2V5TWFuYWdlci5yZW1vdmVIb3RLZXkobnVsbCwgdGhpcyk7XHJcblx0XHR0aGlzLmRhdGEubWFwKGl0ZW0gPT4ge1xyXG5cdFx0XHRpZiAoaXRlbS5ob3RrZXkpIHtcclxuXHRcdFx0XHRrZXlNYW5hZ2VyLmFkZEhvdEtleShcclxuXHRcdFx0XHRcdGl0ZW0uaG90a2V5LFxyXG5cdFx0XHRcdFx0KCkgPT4gdGhpcy5fb25NZW51SXRlbUNsaWNrKGl0ZW0uaWQsIG51bGwpLFxyXG5cdFx0XHRcdFx0dGhpc1xyXG5cdFx0XHRcdCk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH1cclxuXHRwcml2YXRlIF9zZXRQcm9wKGlkOiBzdHJpbmcgfCBzdHJpbmdbXSwga2V5OiBzdHJpbmcsIHZhbHVlOiBhbnkpIHtcclxuXHRcdGlmIChBcnJheS5pc0FycmF5KGlkKSkge1xyXG5cdFx0XHRpZC5mb3JFYWNoKGl0ZW1JZCA9PiB0aGlzLmRhdGEudXBkYXRlKGl0ZW1JZCwge1trZXldOiB2YWx1ZX0pKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRoaXMuZGF0YS51cGRhdGUoaWQsIHtba2V5XTogdmFsdWV9KTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkZEluR3JvdXBzKGdyb3VwczogSUdyb3VwcywgaXRlbTogYW55KSB7XHJcblx0aWYgKGdyb3Vwc1tpdGVtLmdyb3VwXSkge1xyXG5cdFx0aWYgKGl0ZW0uYWN0aXZlKSB7XHJcblx0XHRcdGdyb3Vwc1tpdGVtLmdyb3VwXS5hY3RpdmUgPSBpdGVtLmlkO1xyXG5cdFx0fVxyXG5cdFx0Z3JvdXBzW2l0ZW0uZ3JvdXBdLmVsZW1lbnRzLnB1c2goaXRlbS5pZCk7XHJcblx0fSBlbHNlIHtcclxuXHRcdGdyb3Vwc1tpdGVtLmdyb3VwXSA9IHtcclxuXHRcdFx0YWN0aXZlOiBpdGVtLmFjdGl2ZSA/IGl0ZW0uaWQgOiBudWxsLFxyXG5cdFx0XHRlbGVtZW50czogW2l0ZW0uaWRdXHJcblx0XHR9O1xyXG5cdH1cclxufSIsImltcG9ydCB7IGVsIH0gZnJvbSBcIkBkaHgvdHMtY29tbW9uL2RvbVwiO1xyXG5pbXBvcnQgeyBnZXRDb3VudCwgZ2V0SWNvbiwgZ2V0TmF2YmFyQnV0dG9uQ1NTIH0gZnJvbSBcIi4vaGVscGVyc1wiO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGJ1dHRvbihpdGVtOiBhbnksIHdpZGdldE5hbWU6IHN0cmluZykge1xyXG5cdGNvbnN0IGlzSWNvbkJ1dHRvbiA9IGl0ZW0uaWNvbiAmJiAhaXRlbS52YWx1ZTtcclxuXHRjb25zdCBjb3VudGVyQ2xhc3MgPSBpc0ljb25CdXR0b24gPyBcIiBkaHhfbmF2YmFyLWNvdW50LS1hYnNvbHV0ZVwiIDogXCIgZGh4X25hdmJhci1jb3VudC0tYnV0dG9uLWlubGluZVwiO1xyXG5cdHJldHVybiBlbChcImJ1dHRvbi5kaHhfYnV0dG9uXCIsIHtcclxuXHRcdGNsYXNzOiBnZXROYXZiYXJCdXR0b25DU1MoaXRlbSwgd2lkZ2V0TmFtZSksXHJcblx0XHRkaHhfaWQ6IGl0ZW0uaWQsXHJcblx0XHRkaXNhYmxlZDogaXRlbS5kaXNhYmxlZFxyXG5cdH0sIFtcclxuXHRcdGl0ZW0uaWNvbiA/IGdldEljb24oaXRlbS5pY29uLCBcImJ1dHRvblwiKSA6IG51bGwsXHJcblx0XHRpdGVtLnZhbHVlICYmIGVsKFwic3Bhbi5kaHhfYnV0dG9uX190ZXh0XCIsIGl0ZW0udmFsdWUpLFxyXG5cdFx0aXRlbS5jb3VudCA+IDAgJiYgZ2V0Q291bnQoaXRlbSwgY291bnRlckNsYXNzLCBpc0ljb25CdXR0b24pLFxyXG5cdFx0aXRlbS52YWx1ZSAmJiBpdGVtLiRvcGVuSWNvbiA/IGVsKFwic3Bhbi5kaHhfYnV0dG9uX19pY29uLmRoeF9idXR0b25fX2ljb24tLW1lbnUuZHhpLmR4aS1tZW51LXJpZ2h0XCIpIDogbnVsbCxcclxuXHRcdGl0ZW0ubG9hZGluZyAmJiBlbChcInNwYW4uZGh4X2J1dHRvbl9fbG9hZGluZ1wiLCBbXHJcblx0XHRcdGVsKFwic3Bhbi5kaHhfYnV0dG9uX19sb2FkaW5nLWljb24uZHhpLmR4aS1sb2FkaW5nXCIpXHJcblx0XHRdKVxyXG5cdF0pO1xyXG59XHJcblxyXG4iLCJpbXBvcnQgeyBlbCB9IGZyb20gXCJAZGh4L3RzLWNvbW1vbi9kb21cIjtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjdXN0b21IVE1MQnV0dG9uKGl0ZW06IGFueSwgd2lkZ2V0TmFtZT86IHN0cmluZykge1xyXG5cdHJldHVybiBlbChcImJ1dHRvblwiLCB7XHJcblx0XHRcImRoeF9pZFwiOiBpdGVtLmlkLFxyXG5cdFx0XCIuaW5uZXJIVE1MXCI6IGl0ZW0uaHRtbFxyXG5cdH0sIGl0ZW0uaHRtbCA/IFwiXCIgOiBpdGVtLnZhbHVlKTtcclxufSIsImltcG9ydCB7IGVsLCBWTm9kZSB9IGZyb20gXCJAZGh4L3RzLWNvbW1vbi9kb21cIjtcclxuaW1wb3J0IHsgSXRlbVR5cGUsIElJdGVtIH0gZnJvbSBcIi4uL3R5cGVzXCI7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q291bnQoaXRlbSwgd2lkZ2V0Q2xhc3MsIGlzTGltaXRlZCkge1xyXG5cdGNvbnN0IGNvdW50Q29sb3IgPSB7XHJcblx0XHRkYW5nZXI6IFwiIGRoeF9uYXZiYXItY291bnQtLWNvbG9yX2RhbmdlclwiLFxyXG5cdFx0c2Vjb25kYXJ5OiBcIiBkaHhfbmF2YmFyLWNvdW50LS1jb2xvcl9zZWNvbmRhcnlcIixcclxuXHRcdHByaW1hcnk6IFwiIGRoeF9uYXZiYXItY291bnQtLWNvbG9yX3ByaW1hcnlcIixcclxuXHRcdHN1Y2Nlc3M6IFwiIGRoeF9uYXZiYXItY291bnQtLWNvbG9yX3N1Y2Nlc3NcIixcclxuXHR9W2l0ZW0uY291bnRDb2xvcl0gfHwgXCIgZGh4X25hdmJhci1jb3VudC0tY29sb3JfZGFuZ2VyXCI7XHJcblx0cmV0dXJuIGVsKFwiLmRoeF9uYXZiYXItY291bnRcIiwge1xyXG5cdFx0Y2xhc3M6IHdpZGdldENsYXNzICsgY291bnRDb2xvciArICghaXNMaW1pdGVkICYmIHBhcnNlSW50KGl0ZW0uY291bnQsIDEwKSA+IDk5ID8gXCIgZGh4X25hdmJhci1jb3VudC0tb3ZlcmxpbWl0XCIgOiBcIlwiKSxcclxuXHR9LCBpc0xpbWl0ZWQgJiYgcGFyc2VJbnQoaXRlbS5jb3VudCwgMTApID4gOTkgPyBcIjk5K1wiIDogaXRlbS5jb3VudCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRJY29uKGljb25OYW1lID0gXCJcIiwgdHlwZSkge1xyXG5cdGlmIChpY29uTmFtZS5zbGljZSgwLCAzKSA9PT0gXCJkeGlcIikge1xyXG5cdFx0aWNvbk5hbWUgPSBcImR4aSBcIiArIGljb25OYW1lO1xyXG5cdH1cclxuXHRyZXR1cm4gZWwoXCJzcGFuXCIsIHtcclxuXHRcdGNsYXNzOiBgZGh4XyR7dHlwZX1fX2ljb24gJHtpY29uTmFtZX1gXHJcblx0fSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBuYXZiYXJDb21wb25lbnRNaXhpbih3aWRnZXROYW1lOiBzdHJpbmcsIGl0ZW06IElJdGVtLCBhc01lbnVJdGVtOiBib29sZWFuLCBib2R5OiBWTm9kZSk6IFZOb2RlIHtcclxuXHRjb25zdCBpdGVtQ2xhc3MgPSBnZXROYXZiYXJJdGVtQ2xhc3Mod2lkZ2V0TmFtZSwgaXRlbSwgYXNNZW51SXRlbSk7XHJcblx0Y29uc3QgaGFzUmliYm9uU2l6ZSA9IHdpZGdldE5hbWUgPT09IFwicmliYm9uXCIgJiYgKGl0ZW0udHlwZSA9PT0gSXRlbVR5cGUubmF2SXRlbSB8fCBpdGVtLnR5cGUgPT09IEl0ZW1UeXBlLmltYWdlQnV0dG9uKTtcclxuXHRyZXR1cm4gZWwoXCJsaVwiLCB7XHJcblx0XHRcdF9rZXk6IGl0ZW0uaWQsXHJcblx0XHRcdGNsYXNzOiBpdGVtQ2xhc3MgK1xyXG5cdFx0XHRcdChpdGVtLmljb24gJiYgIWl0ZW0udmFsdWUgJiYgaGFzUmliYm9uU2l6ZSA/IFwiIGRoeF9yaWJib25fX2l0ZW0tLWljb25cIiA6IFwiXCIpICtcclxuXHRcdFx0XHQoaXRlbS5zcmMgJiYgIWl0ZW0udmFsdWUgICYmIGhhc1JpYmJvblNpemUgPyBcIiBkaHhfcmliYm9uX19pdGVtLS1pY29uXCIgOiBcIlwiKSArXHJcblx0XHRcdFx0KGl0ZW0uc2l6ZSAmJiBoYXNSaWJib25TaXplID8gXCIgZGh4X3JpYmJvbl9faXRlbS0tXCIgKyBpdGVtLnNpemUgOiBcIlwiKSxcclxuXHRcdH0sIFtcclxuXHRcdGJvZHlcclxuXHRdKTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0TmF2YmFyQnV0dG9uQ1NTKHtjb2xvciwgc2l6ZSwgdmlldywgZnVsbCwgaWNvbiwgY2lyY2xlLCBsb2FkaW5nLCB2YWx1ZSwgYWN0aXZlfSwgd2lkZ2V0TmFtZSkge1xyXG5cdGNvbnN0IGNvbG9yc0NzcyA9IHtcclxuXHRcdGRhbmdlcjogXCIgZGh4X2J1dHRvbi0tY29sb3JfZGFuZ2VyXCIsXHJcblx0XHRzZWNvbmRhcnk6IFwiIGRoeF9idXR0b24tLWNvbG9yX3NlY29uZGFyeVwiLFxyXG5cdFx0cHJpbWFyeTogXCIgZGh4X2J1dHRvbi0tY29sb3JfcHJpbWFyeVwiLFxyXG5cdFx0c3VjY2VzczogXCIgZGh4X2J1dHRvbi0tY29sb3Jfc3VjY2Vzc1wiLFxyXG5cdH1bY29sb3JdIHx8IFwiIGRoeF9idXR0b24tLWNvbG9yX3ByaW1hcnlcIjtcclxuXHRjb25zdCBzaXplQ3NzID0ge1xyXG5cdFx0c21hbGw6IFwiIGRoeF9idXR0b24tLXNpemVfc21hbGxcIixcclxuXHRcdG1lZGl1bTogXCIgZGh4X2J1dHRvbi0tc2l6ZV9tZWRpdW1cIixcclxuXHR9W3NpemVdIHx8IFwiIGRoeF9idXR0b24tLXNpemVfbWVkaXVtXCI7XHJcblx0Y29uc3Qgdmlld0NzcyA9IHtcclxuXHRcdGZsYXQ6IFwiIGRoeF9idXR0b24tLXZpZXdfZmxhdFwiLFxyXG5cdFx0bGluazogXCIgZGh4X2J1dHRvbi0tdmlld19saW5rXCIsXHJcblx0fVt2aWV3XSB8fCBcIiBkaHhfYnV0dG9uLS12aWV3X2ZsYXRcIjtcclxuXHRjb25zdCBmdWxsQ3NzID0gZnVsbCA/IFwiIGRoeF9idXR0b24tLXdpZHRoX2Z1bGxcIiA6IFwiXCI7XHJcblx0Y29uc3QgY2lyY2xlQ3NzID0gY2lyY2xlID8gXCIgZGh4X2J1dHRvbi0tY2lyY2xlXCIgOiBcIlwiO1xyXG5cdGNvbnN0IGxvYWRpbmdDc3MgPSBsb2FkaW5nID8gXCIgZGh4X2J1dHRvbi0tbG9hZGluZ1wiIDogXCJcIjtcclxuXHRjb25zdCBpY29uVmlld0NzcyA9IGljb24gJiYgIXZhbHVlID8gXCIgZGh4X2J1dHRvbi0taWNvblwiIDogXCJcIjtcclxuXHRjb25zdCBhY3RpdmVDc3MgPSBhY3RpdmUgPyBcIiBkaHhfYnV0dG9uLS1hY3RpdmVcIiA6IFwiXCI7XHJcblx0cmV0dXJuIGNvbG9yc0NzcyArIHNpemVDc3MgKyB2aWV3Q3NzICsgZnVsbENzcyArIGNpcmNsZUNzcyArIGxvYWRpbmdDc3MgKyBhY3RpdmVDc3MgKyBpY29uVmlld0NzcztcclxufVxyXG5cclxuY29uc3QgZ2V0TmF2YmFySXRlbUNsYXNzID0gKHdpZGdldE5hbWU6IHN0cmluZywgaXRlbTogSUl0ZW0sIGFzTWVudUl0ZW06IGJvb2xlYW4pID0+IHtcclxuXHRsZXQgYmFzZUNsYXNzTmFtZSA9IFwiXCI7XHJcblx0bGV0IHJlc3VsdENsYXNzTmFtZSA9IFwiXCI7XHJcblx0aWYgKGFzTWVudUl0ZW0pIHtcclxuXHRcdGJhc2VDbGFzc05hbWUgPSBcImRoeF9tZW51LWl0ZW1cIjtcclxuXHR9IGVsc2Uge1xyXG5cdFx0YmFzZUNsYXNzTmFtZSA9IFwiZGh4X1wiICsgd2lkZ2V0TmFtZSArIFwiX19pdGVtXCI7XHJcblx0fVxyXG5cdHJlc3VsdENsYXNzTmFtZSA9IGJhc2VDbGFzc05hbWUgKyAoaXRlbS5jc3MgPyBcIiBcIiArIGl0ZW0uY3NzIDogXCJcIik7XHJcblxyXG5cdGlmIChpdGVtLnR5cGUgPT09IEl0ZW1UeXBlLnNwYWNlciB8fCBpdGVtLnR5cGUgPT09IEl0ZW1UeXBlLnNlcGFyYXRvcikge1xyXG5cdFx0cmVzdWx0Q2xhc3NOYW1lICs9IGAgJHtiYXNlQ2xhc3NOYW1lfS0tJHtpdGVtLnR5cGV9YDtcclxuXHR9XHJcblxyXG5cdGlmIChpdGVtLnR5cGUgPT09IFwiYnV0dG9uXCIgJiYgd2lkZ2V0TmFtZSA9PT0gXCJzaWRlYmFyXCIgJiYgIWl0ZW0uaWNvbikge1xyXG5cdFx0cmVzdWx0Q2xhc3NOYW1lICs9IFwiIGRoeF9uYXZiYXItaXRlbS0tY29sYXBzZV9oaWRkZW5cIjtcclxuXHR9XHJcblx0cmV0dXJuIHJlc3VsdENsYXNzTmFtZTtcclxufTsiLCJpbXBvcnQgeyBlbCB9IGZyb20gXCJAZGh4L3RzLWNvbW1vbi9kb21cIjtcclxuaW1wb3J0IHsgZ2V0Q291bnQgfSBmcm9tIFwiLi9oZWxwZXJzXCI7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaW1hZ2VCdXR0b24oaXRlbTogYW55LCB3aWRnZXROYW1lOiBzdHJpbmcpIHtcclxuXHRjb25zdCBiYXNlQ2xhc3MgPSBcImRoeF9cIiArIHdpZGdldE5hbWUgKyBcIi1idXR0b24taW1hZ2VcIjtcclxuXHRjb25zdCBpc1JpYmJvbiA9IHdpZGdldE5hbWUgPT09IFwicmliYm9uXCI7XHJcblx0cmV0dXJuIGVsKFwiYnV0dG9uLmRoeF9idXR0b25cIiwge1xyXG5cdFx0Y2xhc3M6IGJhc2VDbGFzcyArIChpdGVtLnNpemUgPyBcIiBcIiArICBiYXNlQ2xhc3MgKyBcIi0tXCIgKyBpdGVtLnNpemUgOiBcIlwiKSArXHJcblx0XHRcdCghaXRlbS52YWx1ZSAmJiBpdGVtLnNyYyA/IFwiIFwiICsgYmFzZUNsYXNzICsgXCItLWljb25cIiA6IFwiXCIpICtcclxuXHRcdFx0KGlzUmliYm9uICYmIGl0ZW0uJG9wZW5JY29uID8gXCIgXCIgKyBiYXNlQ2xhc3MgKyBcIi0tc2VsZWN0XCIgOiBcIlwiKSArXHJcblx0XHRcdChpdGVtLmFjdGl2ZSA/IFwiIFwiICsgYmFzZUNsYXNzICsgXCItLWFjdGl2ZVwiIDogXCJcIiksXHJcblx0XHRkaHhfaWQ6IGl0ZW0uaWQsXHJcblx0fSwgW1xyXG5cdFx0aXNSaWJib24gJiYgaXRlbS52YWx1ZSAmJiBpdGVtLiRvcGVuSWNvbiAmJiBlbChcInNwYW4uZHhpLmR4aS1tZW51LXJpZ2h0XCIsIHtcclxuXHRcdFx0Y2xhc3M6IGJhc2VDbGFzcyArIFwiX19jYXJldFwiXHJcblx0XHR9KSxcclxuXHRcdGl0ZW0udmFsdWUgJiYgZWwoXCJzcGFuXCIsIHtcclxuXHRcdFx0Y2xhc3M6IGJhc2VDbGFzcyArIFwiX190ZXh0XCIsXHJcblx0XHR9LCBpdGVtLnZhbHVlKSxcclxuXHRcdGl0ZW0uc3JjICYmIGVsKFwic3BhblwiLCB7XHJcblx0XHRcdGNsYXNzOiBiYXNlQ2xhc3MgKyBcIl9faW1hZ2VcIixcclxuXHRcdFx0c3R5bGU6e2JhY2tncm91bmRJbWFnZTogYHVybCgke2l0ZW0uc3JjfSlgfVxyXG5cdFx0fSksXHJcblx0XHRpdGVtLmNvdW50ID4gMCAmJiBnZXRDb3VudChpdGVtLCBiYXNlQ2xhc3MgKyBcIl9fY291bnRcIiwgdHJ1ZSksXHJcblx0XSk7XHJcbn0iLCJpbXBvcnQgeyBlbCB9IGZyb20gXCJAZGh4L3RzLWNvbW1vbi9kb21cIjtcclxuaW1wb3J0IHsgTmF2aWdhdGlvbkJhckV2ZW50cyB9IGZyb20gXCIuLi90eXBlc1wiO1xyXG5cclxuZnVuY3Rpb24gb25CbHVyKGV2ZW50cywgaWQpIHtcclxuXHRldmVudHMuZmlyZShOYXZpZ2F0aW9uQmFyRXZlbnRzLmlucHV0Qmx1ciwgW2lkXSk7XHJcbn1cclxuZnVuY3Rpb24gb25Gb2N1cyhldmVudHMsIGlkKSB7XHJcblx0ZXZlbnRzLmZpcmUoTmF2aWdhdGlvbkJhckV2ZW50cy5pbnB1dEZvY3VzLCBbaWRdKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGlucHV0KGl0ZW0sIGV2ZW50cywgd2lkZ2V0TmFtZTogc3RyaW5nKSB7XHJcblx0cmV0dXJuIGVsKFwiLmRoeF9mb3JtLWdyb3VwLmRoeF9mb3JtLWdyb3VwLS1uby1tZXNzYWdlLWhvbGRlci5kaHhfZm9ybS1ncm91cC0tbGFiZWxfc3JcIiArIGAuZGh4XyR7d2lkZ2V0TmFtZX1fX2lucHV0YCwge1xyXG5cdFx0c3R5bGU6IHtcclxuXHRcdFx0d2lkdGg6IGl0ZW0ud2lkdGggPyBpdGVtLndpZHRoIDogXCIyMDBweFwiXHJcblx0XHR9LFxyXG5cdH0sW1xyXG5cdFx0ZWwoXCJsYWJlbC5kaHhfbGFiZWxcIiwgeyBmb3I6IGl0ZW0uaWQgfSwgaXRlbS5sYWJlbCksXHJcblx0XHRlbChcIi5kaHhfaW5wdXRfX3dyYXBwZXJcIiwgW1xyXG5cdFx0XHRlbChcImlucHV0LmRoeF9pbnB1dFwiLCB7XHJcblx0XHRcdFx0cGxhY2Vob2xkZXI6IGl0ZW0ucGxhY2Vob2xkZXIsXHJcblx0XHRcdFx0Y2xhc3M6IGl0ZW0uaWNvbiA/IFwiZGh4X2lucHV0LS1pY29uLXBhZGRpbmdcIiA6IFwiXCIsXHJcblx0XHRcdFx0dmFsdWU6IGl0ZW0udmFsdWUsXHJcblx0XHRcdFx0b25ibHVyOiBbb25CbHVyLCBldmVudHMsIGl0ZW0uaWRdLFxyXG5cdFx0XHRcdG9uZm9jdXM6IFtvbkZvY3VzLCBldmVudHMsIGl0ZW0uaWRdLFxyXG5cdFx0XHRcdGRoeF9pZDogaXRlbS5pZCxcclxuXHRcdFx0XHRfaG9va3M6IHtcclxuXHRcdFx0XHRcdGRpZEluc2VydChub2RlKSB7XHJcblx0XHRcdFx0XHRcdGlmIChldmVudHMpIHtcclxuXHRcdFx0XHRcdFx0XHRldmVudHMuZmlyZShOYXZpZ2F0aW9uQmFyRXZlbnRzLmlucHV0Q3JlYXRlZCwgW2l0ZW0uaWQsIG5vZGUuZWxdKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0X2tleTogaXRlbS5pZFxyXG5cdFx0XHR9KSxcclxuXHRcdFx0aXRlbS5pY29uID8gZWwoXCIuZGh4X2lucHV0X19pY29uXCIsIHtcclxuXHRcdFx0XHRjbGFzczogaXRlbS5pY29uXHJcblx0XHRcdH0pIDogbnVsbCxcclxuXHRcdF0pXHJcblx0XSk7XHJcbn0iLCJpbXBvcnQgeyBlbCB9IGZyb20gXCJAZGh4L3RzLWNvbW1vbi9kb21cIjtcclxuaW1wb3J0IHsgZ2V0Q291bnQgfSBmcm9tIFwiLi9oZWxwZXJzXCI7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbWVudUl0ZW0oaXRlbTogYW55LCB3aWRnZXROYW1lOiBzdHJpbmcsIGFzTWVudUl0ZW06IGJvb2xlYW4pIHtcclxuXHRjb25zdCBiYXNlQ2xhc3MgPSBhc01lbnVJdGVtID8gXCIgZGh4X21lbnUtYnV0dG9uXCIgOiBcIiBkaHhfbmF2LW1lbnUtYnV0dG9uXCI7XHJcblx0cmV0dXJuIGVsKFwiYnV0dG9uXCIsIHtcclxuXHRcdGNsYXNzOiBcImRoeF9idXR0b25cIiArIGJhc2VDbGFzcyArXHJcblx0XHQoaXRlbS5kaXNhYmxlZCA/IGJhc2VDbGFzcyArIFwiLS1kaXNhYmxlZFwiIDogXCJcIikgK1xyXG5cdFx0KGl0ZW0uJGFjdGl2ZVBhcmVudCA/IGJhc2VDbGFzcyArIFwiLS1hY3RpdmVcIiA6IFwiXCIpLFxyXG5cdFx0ZGlzYWJsZWQ6IGl0ZW0uZGlzYWJsZWQsXHJcblx0XHRkaHhfaWQ6IGl0ZW0uaWQsXHJcblx0fSwgYXNNZW51SXRlbSA/IFtcclxuXHRcdGl0ZW0uaWNvbiB8fCBpdGVtLnZhbHVlID8gZWwoXCJzcGFuLmRoeF9tZW51LWJ1dHRvbl9fYmxvY2suZGh4X21lbnUtYnV0dG9uX19ibG9jay0tbGVmdFwiLCBbXHJcblx0XHRcdGl0ZW0uaWNvbiAmJiBlbChcInNwYW4uZGh4X21lbnUtYnV0dG9uX19pY29uXCIsIHtcclxuXHRcdFx0XHRjbGFzczogaXRlbS5pY29uXHJcblx0XHRcdH0pLFxyXG5cdFx0XHRpdGVtLnZhbHVlICYmIGVsKFwic3Bhbi5kaHhfbWVudS1idXR0b25fX3RleHRcIiwgaXRlbS52YWx1ZSksXHJcblx0XHRdKSA6IG51bGwsXHJcblx0XHQoaXRlbS5jb3VudCA+IDAgfHwgaXRlbS5ob3RrZXkgfHwgaXRlbS5pdGVtcykgPyBlbChcInNwYW4uZGh4X21lbnUtYnV0dG9uX19ibG9jay5kaHhfbWVudS1idXR0b25fX2Jsb2NrLS1yaWdodFwiLCBbXHJcblx0XHRcdGl0ZW0uY291bnQgPiAwICYmIGdldENvdW50KGl0ZW0sIFwiIGRoeF9tZW51LWJ1dHRvbl9fY291bnRcIiwgZmFsc2UpLFxyXG5cdFx0XHRpdGVtLmhvdGtleSAmJiBlbChcInNwYW4uZGh4X21lbnUtYnV0dG9uX19ob3RrZXlcIiwgaXRlbS5ob3RrZXkpLFxyXG5cdFx0XHRpdGVtLml0ZW1zICYmIGVsKFwic3Bhbi5kaHhfbWVudS1idXR0b25fX2NhcmV0LmR4aS5keGktbWVudS1yaWdodFwiKSxcclxuXHRcdF0pIDogbnVsbFxyXG5cdF0gOiBbXHJcblx0XHRpdGVtLnZhbHVlICYmIGVsKFwic3Bhbi5kaHhfbmF2LW1lbnUtYnV0dG9uX190ZXh0XCIsIGl0ZW0udmFsdWUpLFxyXG5cdF0pO1xyXG59IiwiaW1wb3J0IHsgZWwgfSBmcm9tIFwiQGRoeC90cy1jb21tb24vZG9tXCI7XHJcbmltcG9ydCB7IGdldENvdW50IH0gZnJvbSBcIi4vaGVscGVyc1wiO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIG5hdkl0ZW0oaXRlbTogYW55LCB3aWRnZXROYW1lOiBzdHJpbmcsIGNvbGxhcHNlZD86IGJvb2xlYW4pIHtcclxuXHRjb25zdCBiYXNlQ2xhc3MgPSBcIiBkaHhfXCIgKyB3aWRnZXROYW1lICsgXCItYnV0dG9uXCI7XHJcblx0cmV0dXJuIGVsKFwiYnV0dG9uXCIsIHtcclxuXHRcdGNsYXNzOiBcImRoeF9idXR0b25cIiArIGJhc2VDbGFzcyArXHJcblx0XHQoaXRlbS5hY3RpdmUgfHwgaXRlbS4kYWN0aXZlUGFyZW50ID8gYmFzZUNsYXNzICsgXCItLWFjdGl2ZVwiIDogXCJcIikgK1xyXG5cdFx0KGl0ZW0uZGlzYWJsZWQgPyBiYXNlQ2xhc3MgKyBcIi0tZGlzYWJsZWRcIiA6IFwiXCIpICtcclxuXHRcdChpdGVtLiRvcGVuSWNvbiA/IGJhc2VDbGFzcyArIFwiLS1zZWxlY3RcIiA6IFwiXCIpICtcclxuXHRcdChpdGVtLmNpcmNsZSA/IGJhc2VDbGFzcyArIFwiLS1jaXJjbGVcIiA6IFwiXCIpICtcclxuXHRcdChpdGVtLnNpemUgPyBcIiBcIiArICBiYXNlQ2xhc3MgKyBcIi0tXCIgKyBpdGVtLnNpemUgOiBcIlwiKSArXHJcblx0XHQoIWl0ZW0udmFsdWUgJiYgaXRlbS5pY29uID8gYmFzZUNsYXNzICsgXCItLWljb25cIiA6IFwiXCIpICtcclxuXHRcdChpdGVtLmNzcyA/IFwiIFwiICsgaXRlbS5jc3MgOiBcIlwiKSxcclxuXHRcdGRoeF9pZDogaXRlbS5pZCxcclxuXHRcdGRpc2FibGVkOiBpdGVtLmRpc2FibGVkXHJcblx0fSwgW1xyXG5cdFx0aXRlbS5pY29uICYmIGVsKFwic3BhblwiLCB7XHJcblx0XHRcdGNsYXNzOml0ZW0uaWNvbiArIGJhc2VDbGFzcyArIFwiX19pY29uXCJcclxuXHRcdH0pLFxyXG5cdFx0aXRlbS52YWx1ZSAmJiBlbChcInNwYW5cIiwge1xyXG5cdFx0XHRjbGFzczogYmFzZUNsYXNzLnRyaW0oKSArIFwiX190ZXh0XCJcclxuXHRcdH0sIGl0ZW0udmFsdWUpLFxyXG5cdFx0aXRlbS5jb3VudCA+IDAgJiYgZ2V0Q291bnQoaXRlbSwgYmFzZUNsYXNzICsgXCJfX2NvdW50XCIsIGNvbGxhcHNlZCksXHJcblx0XHRpdGVtLnZhbHVlICYmIGl0ZW0uJG9wZW5JY29uICYmIGVsKFwic3Bhbi5keGkuZHhpLW1lbnUtcmlnaHRcIiwge1xyXG5cdFx0XHRjbGFzczogYmFzZUNsYXNzICsgXCJfX2NhcmV0XCJcclxuXHRcdH0pXHJcblx0XSk7XHJcbn0iLCJcclxuZXhwb3J0IGZ1bmN0aW9uIHNlcGFyYXRvcihpdGVtOiBhbnksIHdpZGdldE5hbWU6IHN0cmluZykge1xyXG5cdHJldHVybiBudWxsO1xyXG59IiwiZXhwb3J0IGZ1bmN0aW9uIHNwYWNlcihfaXRlbTogYW55LCB3aWRnZXROYW1lOiBzdHJpbmcpIHtcclxuXHRyZXR1cm4gbnVsbDtcclxufSIsImltcG9ydCB7IGVsIH0gZnJvbSBcIkBkaHgvdHMtY29tbW9uL2RvbVwiO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHRpdGxlKGl0ZW06IGFueSwgd2lkZ2V0TmFtZTogc3RyaW5nKSB7XHJcblx0cmV0dXJuIGVsKFwic3BhblwiLCB7XHJcblx0XHRjbGFzczogXCJkaHhfbmF2YmFyLXRpdGxlXCIgKyBcIiBkaHhfbmF2YmFyLXRpdGxlLS1cIiArIHdpZGdldE5hbWUsXHJcblx0fSwgaXRlbS52YWx1ZSk7XHJcbn0iLCJpbXBvcnQgeyBJRXZlbnRTeXN0ZW0gfSBmcm9tIFwiQGRoeC90cy1jb21tb24vZXZlbnRzXCI7XHJcbmltcG9ydCB7IE5hdmJhciB9IGZyb20gXCIuL05hdmJhclwiO1xyXG5pbXBvcnQgeyBidXR0b24gfSBmcm9tIFwiLi9lbGVtZW50cy9idXR0b25cIjtcclxuaW1wb3J0IHsgbmF2SXRlbSB9IGZyb20gXCIuL2VsZW1lbnRzL25hdkl0ZW1cIjtcclxuaW1wb3J0IHsgY3VzdG9tSFRNTEJ1dHRvbiB9IGZyb20gXCIuL2VsZW1lbnRzL2N1c3RvbUhUTUxCdXR0b25cIjtcclxuaW1wb3J0IHsgaW1hZ2VCdXR0b24gfSBmcm9tIFwiLi9lbGVtZW50cy9pbWFnZUJ1dHRvblwiO1xyXG5pbXBvcnQgeyBpbnB1dCB9IGZyb20gXCIuL2VsZW1lbnRzL2lucHV0XCI7XHJcbmltcG9ydCB7IG1lbnVJdGVtIH0gZnJvbSBcIi4vZWxlbWVudHMvbWVudUl0ZW1cIjtcclxuaW1wb3J0IHsgc2VwYXJhdG9yIH0gZnJvbSBcIi4vZWxlbWVudHMvc2VwYXJhdG9yXCI7XHJcbmltcG9ydCB7IHNwYWNlciB9IGZyb20gXCIuL2VsZW1lbnRzL3NwYWNlclwiO1xyXG5pbXBvcnQgeyB0aXRsZSB9IGZyb20gXCIuL2VsZW1lbnRzL3RpdGxlXCI7XHJcbmltcG9ydCB7IElJdGVtLCBJdGVtVHlwZSwgTmF2aWdhdGlvbkJhckV2ZW50cyB9IGZyb20gXCIuL3R5cGVzXCI7XHJcbmltcG9ydCB7IG5hdmJhckNvbXBvbmVudE1peGluIH0gZnJvbSBcIi4vZWxlbWVudHMvaGVscGVyc1wiO1xyXG5pbXBvcnQgeyBUcmVlQ29sbGVjdGlvbiB9IGZyb20gXCJAZGh4L3RzLWRhdGFcIjtcclxuXHJcbmZ1bmN0aW9uIGl0ZW1mYWN0b3J5KGl0ZW06IElJdGVtLCBldmVudHM6IElFdmVudFN5c3RlbTxOYXZpZ2F0aW9uQmFyRXZlbnRzPiwgd2lkZ2V0TmFtZTogc3RyaW5nLCBwcm9wczogSUZhY3RvcnlQcm9wcykge1xyXG5cdHN3aXRjaChpdGVtLnR5cGUgYXMgSXRlbVR5cGUpIHtcclxuXHRcdGNhc2UgSXRlbVR5cGUubmF2SXRlbTpcclxuXHRcdGNhc2UgSXRlbVR5cGUuc2VsZWN0QnV0dG9uOlxyXG5cdFx0XHRyZXR1cm4gbmF2SXRlbShpdGVtLCB3aWRnZXROYW1lLCBwcm9wcy5jb2xsYXBzZWQpO1xyXG5cdFx0Y2FzZSBJdGVtVHlwZS5idXR0b246XHJcblx0XHRcdHJldHVybiBidXR0b24oaXRlbSwgd2lkZ2V0TmFtZSk7XHJcblx0XHRjYXNlIEl0ZW1UeXBlLnRpdGxlOlxyXG5cdFx0XHRyZXR1cm4gdGl0bGUoaXRlbSwgd2lkZ2V0TmFtZSk7XHJcblx0XHRjYXNlIEl0ZW1UeXBlLnNlcGFyYXRvcjpcclxuXHRcdFx0cmV0dXJuIHNlcGFyYXRvcihpdGVtLCB3aWRnZXROYW1lKTtcclxuXHRcdGNhc2UgSXRlbVR5cGUuc3BhY2VyOlxyXG5cdFx0XHRyZXR1cm4gc3BhY2VyKGl0ZW0sIHdpZGdldE5hbWUpO1xyXG5cdFx0Y2FzZSBJdGVtVHlwZS5pbnB1dDpcclxuXHRcdFx0cmV0dXJuIGlucHV0KGl0ZW0sIGV2ZW50cywgd2lkZ2V0TmFtZSk7XHJcblx0XHRjYXNlIEl0ZW1UeXBlLmltYWdlQnV0dG9uOlxyXG5cdFx0XHRyZXR1cm4gaW1hZ2VCdXR0b24oaXRlbSwgd2lkZ2V0TmFtZSk7XHJcblx0XHRjYXNlIEl0ZW1UeXBlLm1lbnVJdGVtOlxyXG5cdFx0XHRyZXR1cm4gbWVudUl0ZW0oaXRlbSwgd2lkZ2V0TmFtZSwgcHJvcHMuYXNNZW51SXRlbSk7XHJcblx0XHRjYXNlIEl0ZW1UeXBlLmN1c3RvbUhUTUxCdXR0b246XHJcblx0XHRcdHJldHVybiBjdXN0b21IVE1MQnV0dG9uKGl0ZW0sIHdpZGdldE5hbWUpO1xyXG5cdFx0Y2FzZSBJdGVtVHlwZS5ibG9jazpcclxuXHRcdGRlZmF1bHQ6XHJcblx0XHRcdHRocm93IG5ldyBFcnJvcihcInVua25vd24gaXRlbSB0eXBlIFwiICsgaXRlbS50eXBlKTtcclxuXHR9XHJcbn1cclxuXHJcbmludGVyZmFjZSBJRmFjdG9yeUNvbmZpZzxUIGV4dGVuZHMgTmF2YmFyPiB7XHJcblx0ZGVmYXVsdFR5cGU6IEl0ZW1UeXBlO1xyXG5cdGFsbG93ZWRUeXBlczogSXRlbVR5cGVbXTtcclxuXHR3aWRnZXROYW1lOiBzdHJpbmc7XHJcblx0d2lkZ2V0OiBUO1xyXG59XHJcblxyXG5pbnRlcmZhY2UgSUZhY3RvcnlQcm9wcyB7XHJcblx0YXNNZW51SXRlbTogYm9vbGVhbjtcclxuXHRjb2xsYXBzZWQ/OiBib29sZWFuO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRmFjdG9yeTxUIGV4dGVuZHMgTmF2YmFyPih7ZGVmYXVsdFR5cGUsIGFsbG93ZWRUeXBlcywgd2lkZ2V0TmFtZSwgd2lkZ2V0fTogSUZhY3RvcnlDb25maWc8VD4pOiAoaXRlbTogSUl0ZW0sIGFzTWVudUl0ZW0/OiBib29sZWFuKSA9PiBhbnkge1xyXG5cdGNvbnN0IGFsbG93ZWRTZXQgPSBuZXcgU2V0KCk7XHJcblx0Zm9yIChjb25zdCB0eXBlIG9mIGFsbG93ZWRUeXBlcykge1xyXG5cdFx0YWxsb3dlZFNldC5hZGQodHlwZSk7XHJcblx0fVxyXG5cdGNvbnN0IHtjb25maWcsIGV2ZW50cywgZGF0YX0gPSB3aWRnZXQ7XHJcblx0cmV0dXJuIGZ1bmN0aW9uKGl0ZW06IElJdGVtLCBhc01lbnVJdGVtPzogYm9vbGVhbikge1xyXG5cdFx0aWYgKGl0ZW0uaGlkZGVuKSB7XHJcblx0XHRcdHJldHVybiBudWxsO1xyXG5cdFx0fVxyXG5cdFx0aWYgKCFpdGVtLnR5cGUgfHwgaXRlbS50eXBlID09PSBcImJ1dHRvblwiIHx8IGl0ZW0udHlwZSA9PT0gXCJuYXZJdGVtXCIgfHwgaXRlbS50eXBlID09PSBcIm1lbnVJdGVtXCIpIHtcclxuXHRcdFx0aWYgKCFpdGVtLnZhbHVlICYmICFpdGVtLmljb24pIHtcclxuXHRcdFx0XHRyZXR1cm4gbnVsbDtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0aXRlbS50eXBlID0gaXRlbS50eXBlIHx8IGRlZmF1bHRUeXBlO1xyXG5cdFx0aWYgKGFsbG93ZWRTZXQgJiYgIWFsbG93ZWRTZXQuaGFzKGl0ZW0udHlwZSkpIHtcclxuXHRcdFx0aXRlbS50eXBlID0gZGVmYXVsdFR5cGU7XHJcblx0XHR9XHJcblx0XHRpZiAoaXRlbS50eXBlID09PSBJdGVtVHlwZS5pbWFnZUJ1dHRvbiAmJiB3aWRnZXROYW1lICE9PSBcInJpYmJvblwiKSB7XHJcblx0XHRcdGl0ZW0uYWN0aXZlID0gZmFsc2U7XHJcblx0XHR9XHJcblx0XHRpZiAoYXNNZW51SXRlbSAmJiBpdGVtLnR5cGUgIT09IEl0ZW1UeXBlLnNwYWNlciAmJiBpdGVtLnR5cGUgIT09IEl0ZW1UeXBlLnNlcGFyYXRvcikge1xyXG5cdFx0XHRpdGVtLnR5cGUgPSBJdGVtVHlwZS5tZW51SXRlbTtcclxuXHRcdH1cclxuXHRcdGlmIChkYXRhLmhhdmVJdGVtcyhpdGVtLmlkKSkge1xyXG5cdFx0XHRub3JtYWxpemVPcGVuSWNvbih3aWRnZXROYW1lLCBpdGVtLCBkYXRhKTtcclxuXHRcdH1cclxuXHRcdHJldHVybiBuYXZiYXJDb21wb25lbnRNaXhpbih3aWRnZXROYW1lLCBpdGVtLCBhc01lbnVJdGVtLCBpdGVtZmFjdG9yeShpdGVtLCBldmVudHMsIHdpZGdldE5hbWUsIHthc01lbnVJdGVtLCBjb2xsYXBzZWQ6IHdpZGdldE5hbWUgIT09IFwic2lkZWJhclwiIHx8IChjb25maWcgYXMgYW55KS5jb2xsYXBzZWR9KSk7XHJcblx0fTtcclxufVxyXG5cclxuZnVuY3Rpb24gbm9ybWFsaXplT3Blbkljb248VCBleHRlbmRzIElJdGVtPih3aWRnZXROYW1lOiBzdHJpbmcsIGl0ZW06IFQsIGRhdGE6IFRyZWVDb2xsZWN0aW9uPFQ+KTogdm9pZCB7XHJcblx0c3dpdGNoKHdpZGdldE5hbWUpIHtcclxuXHRcdGNhc2UgXCJzaWRlYmFyXCI6XHJcblx0XHRjYXNlIFwiY29udGV4dC1tZW51XCI6XHJcblx0XHRcdGl0ZW0uJG9wZW5JY29uID0gXCJyaWdodFwiO1xyXG5cdFx0XHRicmVhaztcclxuXHRcdGNhc2UgXCJ0b29sYmFyXCI6XHJcblx0XHRcdGlmIChpdGVtLnBhcmVudCA9PT0gZGF0YS5nZXRSb290KCkpIHtcclxuXHRcdFx0XHRpdGVtLiRvcGVuSWNvbiA9IFwicmlnaHRcIjtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRpdGVtLiRvcGVuSWNvbiA9IFwiYm90XCI7XHJcblx0XHRcdH1cclxuXHRcdFx0YnJlYWs7XHJcblx0XHRjYXNlIFwibWVudVwiOlxyXG5cdFx0XHRpZiAoaXRlbS5wYXJlbnQgIT09IHRoaXMuZGF0YS5nZXRSb290KCkpIHtcclxuXHRcdFx0XHRpdGVtLiRvcGVuSWNvbiA9IFwicmlnaHRcIjtcclxuXHRcdFx0fVxyXG5cdFx0XHRicmVhaztcclxuXHRcdGNhc2UgXCJyaWJib25cIjpcclxuXHRcdFx0Y29uc3QgcGFyZW50ID0gZGF0YS5nZXRJdGVtKGl0ZW0ucGFyZW50KTtcclxuXHRcdFx0aWYgKHBhcmVudCAmJiBpdGVtLnR5cGUgIT09IEl0ZW1UeXBlLmJsb2NrKSB7XHJcblx0XHRcdFx0aWYgKHBhcmVudC50eXBlID09PSBJdGVtVHlwZS5ibG9jaykge1xyXG5cdFx0XHRcdFx0aXRlbS4kb3Blbkljb24gPSBcImJvdFwiO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRpdGVtLiRvcGVuSWNvbiA9IFwicmlnaHRcIjtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdFx0YnJlYWs7XHJcblx0fVxyXG59IiwiaW1wb3J0IHsgSURhdGFJdGVtLCBUcmVlQ29sbGVjdGlvbiB9IGZyb20gXCJAZGh4L3RzLWRhdGFcIjtcclxuZXhwb3J0IHsgRGF0YUV2ZW50cyB9IGZyb20gXCJAZGh4L3RzLWRhdGFcIjtcclxuXHJcbmV4cG9ydCBlbnVtIEl0ZW1UeXBlIHtcclxuXHRidXR0b24gPSBcImJ1dHRvblwiLFxyXG5cdGltYWdlQnV0dG9uID0gXCJpbWFnZUJ1dHRvblwiLFxyXG5cdHNlbGVjdEJ1dHRvbiA9IFwic2VsZWN0QnV0dG9uXCIsXHJcblx0Y3VzdG9tSFRNTEJ1dHRvbiA9IFwiY3VzdG9tQnV0dG9uXCIsXHJcblx0aW5wdXQgPSBcImlucHV0XCIsXHJcblx0c2VwYXJhdG9yID0gXCJzZXBhcmF0b3JcIixcclxuXHR0aXRsZSA9IFwidGl0bGVcIixcclxuXHRzcGFjZXIgPSBcInNwYWNlclwiLFxyXG5cdG1lbnVJdGVtID0gXCJtZW51SXRlbVwiLFxyXG5cdGJsb2NrID0gXCJibG9ja1wiLFxyXG5cdG5hdkl0ZW0gPSBcIm5hdkl0ZW1cIlxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElJdGVtIGV4dGVuZHMgSURhdGFJdGVtIHtcclxuXHR0eXBlOiBJdGVtVHlwZTtcclxuXHRwYXJlbnQ/OiBzdHJpbmc7XHJcblx0Y3NzPzogc3RyaW5nIHwgc3RyaW5nW107XHJcblx0aGlkZGVuPzogYm9vbGVhbjtcclxuXHRkaXNhYmxlZD86IGJvb2xlYW47XHJcbn1cclxuXHJcbmV4cG9ydCB0eXBlIElNZW51RWxlbWVudCA9IElNZW51SXRlbSB8IElTZXBhcmF0b3IgfCBJU3BhY2VyO1xyXG5leHBvcnQgaW50ZXJmYWNlIElNZW51SXRlbSBleHRlbmRzIElJdGVtIHtcclxuXHR0eXBlOiBJdGVtVHlwZS5tZW51SXRlbTtcclxuXHQkb3Blbkljb24/OiBzdHJpbmc7XHJcblx0aWNvbj86IHN0cmluZztcclxuXHRpdGVtcz86IElNZW51RWxlbWVudFtdO1xyXG5cdHZhbHVlPzogc3RyaW5nO1xyXG5cdGhvdGtleT86IHN0cmluZztcclxuXHRjb3VudD86IG51bWJlciB8IHN0cmluZztcclxuXHRjb3VudENvbG9yPzogXCJkYW5nZXJcIiB8IFwic2Vjb25kYXJ5XCIgfCBcInByaW1hcnlcIiB8IFwic3VjY2Vzc1wiO1xyXG59XHJcbmV4cG9ydCBpbnRlcmZhY2UgSVN0YXRlIHtcclxuXHRba2V5OiBzdHJpbmddOiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVBvcHVwIHtcclxuXHRkYXRhOiBhbnlbXTtcclxuXHRtb2RlOiBcImJvdHRvbVwiIHwgXCJvdGhlclwiO1xyXG5cdHBvc2l0aW9uOiBhbnk7XHJcblx0d2lkdGg6IG51bWJlcjtcclxuXHRoZWlnaHQ6IG51bWJlcjtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJU3BhY2VyIGV4dGVuZHMgSUl0ZW0ge1xyXG5cdHR5cGU6IEl0ZW1UeXBlLnNwYWNlcjtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJU2VwYXJhdG9yIGV4dGVuZHMgSUl0ZW0ge1xyXG5cdHR5cGU6IEl0ZW1UeXBlLnNlcGFyYXRvcjtcclxufVxyXG5cclxuZXhwb3J0IGVudW0gTmF2aWdhdGlvbkJhckV2ZW50cyB7XHJcblx0aW5wdXRDcmVhdGVkID0gXCJpbnB1dGNyZWF0ZWRcIixcclxuXHRjbGljayA9IFwiY2xpY2tcIixcclxuXHRvcGVuTWVudSA9IFwib3Blbm1lbnVcIixcclxuXHRpbnB1dEZvY3VzID0gXCJpbnB1dGZvY3VzXCIsXHJcblx0aW5wdXRCbHVyID0gXCJpbnB1dGJsdXJcIlxyXG59XHJcblxyXG5leHBvcnQgZW51bSBOYXZpZ2F0aW9uVHlwZSB7XHJcblx0cG9pbnRlciA9IFwicG9pbnRlclwiLFxyXG5cdGNsaWNrID0gXCJjbGlja1wiXHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUdyb3VwcyB7XHJcblx0W2tleTogc3RyaW5nXToge1xyXG5cdFx0YWN0aXZlPzogc3RyaW5nO1xyXG5cdFx0ZWxlbWVudHM6IHN0cmluZ1tdO1xyXG5cdH07XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSU5hdmJhckV2ZW50SGFuZGxlcnNNYXAge1xyXG5cdFtrZXk6IHN0cmluZ106ICguLi5hcmdzOiBhbnlbXSkgPT4gYW55O1xyXG5cdFtOYXZpZ2F0aW9uQmFyRXZlbnRzLmlucHV0Q3JlYXRlZF06IChpZDogc3RyaW5nLCBpbnB1dDogSFRNTElucHV0RWxlbWVudCkgPT4gYW55O1xyXG5cdFtOYXZpZ2F0aW9uQmFyRXZlbnRzLmlucHV0Qmx1cl06IChpZDogc3RyaW5nKSA9PiBhbnk7XHJcblx0W05hdmlnYXRpb25CYXJFdmVudHMuaW5wdXRGb2N1c106IChpZDogc3RyaW5nKSA9PiBhbnk7XHJcblx0W05hdmlnYXRpb25CYXJFdmVudHMub3Blbk1lbnVdOiAoaWQ6IHN0cmluZykgPT4gYW55O1xyXG5cdFtOYXZpZ2F0aW9uQmFyRXZlbnRzLmNsaWNrXTogKGlkOiBzdHJpbmcsIGU6IEV2ZW50KSA9PiBhbnk7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSU5hdmJhckNvbmZpZyB7XHJcblx0bmF2aWdhdGlvblR5cGU/OiBOYXZpZ2F0aW9uVHlwZTtcclxuXHRjc3M/OiBzdHJpbmc7XHJcblx0bWVudUNzcz86IHN0cmluZztcclxuXHRkYXRhPzogYW55W10gfCBUcmVlQ29sbGVjdGlvbjxhbnk+O1xyXG59Il0sInNvdXJjZVJvb3QiOiIifQ==