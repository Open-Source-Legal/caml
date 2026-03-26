import { R as React, r as reactExports } from './index-DcBwYBkJ.js';

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */

var extendStatics = function(d, b) {
  extendStatics = Object.setPrototypeOf ||
      ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
      function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
  return extendStatics(d, b);
};

function __extends(d, b) {
  if (typeof b !== "function" && b !== null)
      throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
  extendStatics(d, b);
  function __() { this.constructor = d; }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
  __assign = Object.assign || function __assign(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
      return t;
  };
  return __assign.apply(this, arguments);
};

function __rest(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
          if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
              t[p[i]] = s[p[i]];
      }
  return t;
}

function __decorate(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
  return function (target, key) { decorator(target, key, paramIndex); }
}

function __esDecorate(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
  function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
  var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
  var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
  var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
  var _, done = false;
  for (var i = decorators.length - 1; i >= 0; i--) {
      var context = {};
      for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
      for (var p in contextIn.access) context.access[p] = contextIn.access[p];
      context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
      var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
      if (kind === "accessor") {
          if (result === void 0) continue;
          if (result === null || typeof result !== "object") throw new TypeError("Object expected");
          if (_ = accept(result.get)) descriptor.get = _;
          if (_ = accept(result.set)) descriptor.set = _;
          if (_ = accept(result.init)) initializers.unshift(_);
      }
      else if (_ = accept(result)) {
          if (kind === "field") initializers.unshift(_);
          else descriptor[key] = _;
      }
  }
  if (target) Object.defineProperty(target, contextIn.name, descriptor);
  done = true;
};

function __runInitializers(thisArg, initializers, value) {
  var useValue = arguments.length > 2;
  for (var i = 0; i < initializers.length; i++) {
      value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
  }
  return useValue ? value : void 0;
};

function __propKey(x) {
  return typeof x === "symbol" ? x : "".concat(x);
};

function __setFunctionName(f, name, prefix) {
  if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
  return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};

function __metadata(metadataKey, metadataValue) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
  function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
  return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
      function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
      function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}

function __generator(thisArg, body) {
  var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
  return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
  function verb(n) { return function (v) { return step([n, v]); }; }
  function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while (g && (g = 0, op[0] && (_ = 0)), _) try {
          if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          if (y = 0, t) op = [op[0] & 2, t.value];
          switch (op[0]) {
              case 0: case 1: t = op; break;
              case 4: _.label++; return { value: op[1], done: false };
              case 5: _.label++; y = op[1]; op = [0]; continue;
              case 7: op = _.ops.pop(); _.trys.pop(); continue;
              default:
                  if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                  if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                  if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                  if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                  if (t[2]) _.ops.pop();
                  _.trys.pop(); continue;
          }
          op = body.call(thisArg, _);
      } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
      if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
  }
}

var __createBinding = Object.create ? (function(o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  var desc = Object.getOwnPropertyDescriptor(m, k);
  if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
  }
  Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

function __exportStar(m, o) {
  for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) __createBinding(o, m, p);
}

function __values(o) {
  var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
  if (m) return m.call(o);
  if (o && typeof o.length === "number") return {
      next: function () {
          if (o && i >= o.length) o = void 0;
          return { value: o && o[i++], done: !o };
      }
  };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o), r, ar = [], e;
  try {
      while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
  }
  catch (error) { e = { error: error }; }
  finally {
      try {
          if (r && !r.done && (m = i["return"])) m.call(i);
      }
      finally { if (e) throw e.error; }
  }
  return ar;
}

/** @deprecated */
function __spread() {
  for (var ar = [], i = 0; i < arguments.length; i++)
      ar = ar.concat(__read(arguments[i]));
  return ar;
}

/** @deprecated */
function __spreadArrays() {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
  for (var r = Array(s), k = 0, i = 0; i < il; i++)
      for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
          r[k] = a[j];
  return r;
}

function __spreadArray(to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
      if (ar || !(i in from)) {
          if (!ar) ar = Array.prototype.slice.call(from, 0, i);
          ar[i] = from[i];
      }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
}

function __await(v) {
  return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var g = generator.apply(thisArg, _arguments || []), i, q = [];
  return i = Object.create((typeof AsyncIterator === "function" ? AsyncIterator : Object).prototype), verb("next"), verb("throw"), verb("return", awaitReturn), i[Symbol.asyncIterator] = function () { return this; }, i;
  function awaitReturn(f) { return function (v) { return Promise.resolve(v).then(f, reject); }; }
  function verb(n, f) { if (g[n]) { i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; if (f) i[n] = f(i[n]); } }
  function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
  function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
  function fulfill(value) { resume("next", value); }
  function reject(value) { resume("throw", value); }
  function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
  var i, p;
  return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
  function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: false } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var m = o[Symbol.asyncIterator], i;
  return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
  function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
  function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
  if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
  return cooked;
};

var __setModuleDefault = Object.create ? (function(o, v) {
  Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
  o["default"] = v;
};

var ownKeys = function(o) {
  ownKeys = Object.getOwnPropertyNames || function (o) {
    var ar = [];
    for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
    return ar;
  };
  return ownKeys(o);
};

function __importStar(mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
  __setModuleDefault(result, mod);
  return result;
}

function __importDefault(mod) {
  return (mod && mod.__esModule) ? mod : { default: mod };
}

function __classPrivateFieldGet(receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}

function __classPrivateFieldSet(receiver, state, value, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
}

function __classPrivateFieldIn(state, receiver) {
  if (receiver === null || (typeof receiver !== "object" && typeof receiver !== "function")) throw new TypeError("Cannot use 'in' operator on non-object");
  return typeof state === "function" ? receiver === state : state.has(receiver);
}

function __addDisposableResource(env, value, async) {
  if (value !== null && value !== void 0) {
    if (typeof value !== "object" && typeof value !== "function") throw new TypeError("Object expected.");
    var dispose, inner;
    if (async) {
      if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
      dispose = value[Symbol.asyncDispose];
    }
    if (dispose === void 0) {
      if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
      dispose = value[Symbol.dispose];
      if (async) inner = dispose;
    }
    if (typeof dispose !== "function") throw new TypeError("Object not disposable.");
    if (inner) dispose = function() { try { inner.call(this); } catch (e) { return Promise.reject(e); } };
    env.stack.push({ value: value, dispose: dispose, async: async });
  }
  else if (async) {
    env.stack.push({ async: true });
  }
  return value;
}

var _SuppressedError = typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
  var e = new Error(message);
  return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

function __disposeResources(env) {
  function fail(e) {
    env.error = env.hasError ? new _SuppressedError(e, env.error, "An error was suppressed during disposal.") : e;
    env.hasError = true;
  }
  var r, s = 0;
  function next() {
    while (r = env.stack.pop()) {
      try {
        if (!r.async && s === 1) return s = 0, env.stack.push(r), Promise.resolve().then(next);
        if (r.dispose) {
          var result = r.dispose.call(r.value);
          if (r.async) return s |= 2, Promise.resolve(result).then(next, function(e) { fail(e); return next(); });
        }
        else s |= 1;
      }
      catch (e) {
        fail(e);
      }
    }
    if (s === 1) return env.hasError ? Promise.reject(env.error) : Promise.resolve();
    if (env.hasError) throw env.error;
  }
  return next();
}

function __rewriteRelativeImportExtension(path, preserveJsx) {
  if (typeof path === "string" && /^\.\.?\//.test(path)) {
      return path.replace(/\.(tsx)$|((?:\.d)?)((?:\.[^./]+?)?)\.([cm]?)ts$/i, function (m, tsx, d, ext, cm) {
          return tsx ? preserveJsx ? ".jsx" : ".js" : d && (!ext || !cm) ? m : (d + ext + "." + cm.toLowerCase() + "js");
      });
  }
  return path;
}

const tslib_es6 = {
  __extends,
  __assign,
  __rest,
  __decorate,
  __param,
  __esDecorate,
  __runInitializers,
  __propKey,
  __setFunctionName,
  __metadata,
  __awaiter,
  __generator,
  __createBinding,
  __exportStar,
  __values,
  __read,
  __spread,
  __spreadArrays,
  __spreadArray,
  __await,
  __asyncGenerator,
  __asyncDelegator,
  __asyncValues,
  __makeTemplateObject,
  __importStar,
  __importDefault,
  __classPrivateFieldGet,
  __classPrivateFieldSet,
  __classPrivateFieldIn,
  __addDisposableResource,
  __disposeResources,
  __rewriteRelativeImportExtension,
};

function memoize(fn) {
  var cache = Object.create(null);
  return function (arg) {
    if (cache[arg] === undefined) cache[arg] = fn(arg);
    return cache[arg];
  };
}

// eslint-disable-next-line no-undef
var reactPropsRegex = /^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|abbr|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|disableRemotePlayback|download|draggable|encType|enterKeyHint|fetchpriority|fetchPriority|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|popover|popoverTarget|popoverTargetAction|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/; // https://esbench.com/bench/5bfee68a4cd7e6009ef61d23

var isPropValid = /* #__PURE__ */memoize(function (prop) {
  return reactPropsRegex.test(prop) || prop.charCodeAt(0) === 111
  /* o */
  && prop.charCodeAt(1) === 110
  /* n */
  && prop.charCodeAt(2) < 91;
}
/* Z+1 */
);

var unitlessKeys = {
  animationIterationCount: 1,
  aspectRatio: 1,
  borderImageOutset: 1,
  borderImageSlice: 1,
  borderImageWidth: 1,
  boxFlex: 1,
  boxFlexGroup: 1,
  boxOrdinalGroup: 1,
  columnCount: 1,
  columns: 1,
  flex: 1,
  flexGrow: 1,
  flexPositive: 1,
  flexShrink: 1,
  flexNegative: 1,
  flexOrder: 1,
  gridRow: 1,
  gridRowEnd: 1,
  gridRowSpan: 1,
  gridRowStart: 1,
  gridColumn: 1,
  gridColumnEnd: 1,
  gridColumnSpan: 1,
  gridColumnStart: 1,
  msGridRow: 1,
  msGridRowSpan: 1,
  msGridColumn: 1,
  msGridColumnSpan: 1,
  fontWeight: 1,
  lineHeight: 1,
  opacity: 1,
  order: 1,
  orphans: 1,
  scale: 1,
  tabSize: 1,
  widows: 1,
  zIndex: 1,
  zoom: 1,
  WebkitLineClamp: 1,
  // SVG-related properties
  fillOpacity: 1,
  floodOpacity: 1,
  stopOpacity: 1,
  strokeDasharray: 1,
  strokeDashoffset: 1,
  strokeMiterlimit: 1,
  strokeOpacity: 1,
  strokeWidth: 1
};

var MS = '-ms-';
var MOZ = '-moz-';
var WEBKIT = '-webkit-';

var COMMENT = 'comm';
var RULESET = 'rule';
var DECLARATION = 'decl';

var PAGE = '@page';
var MEDIA = '@media';
var IMPORT = '@import';
var CHARSET = '@charset';
var VIEWPORT = '@viewport';
var SUPPORTS = '@supports';
var DOCUMENT = '@document';
var NAMESPACE = '@namespace';
var KEYFRAMES = '@keyframes';
var FONT_FACE = '@font-face';
var COUNTER_STYLE = '@counter-style';
var FONT_FEATURE_VALUES = '@font-feature-values';
var LAYER = '@layer';
var SCOPE = '@scope';

/**
 * @param {number}
 * @return {number}
 */
var abs = Math.abs;

/**
 * @param {number}
 * @return {string}
 */
var from = String.fromCharCode;

/**
 * @param {object}
 * @return {object}
 */
var assign = Object.assign;

/**
 * @param {string} value
 * @param {number} length
 * @return {number}
 */
function hash (value, length) {
	return charat(value, 0) ^ 45 ? (((((((length << 2) ^ charat(value, 0)) << 2) ^ charat(value, 1)) << 2) ^ charat(value, 2)) << 2) ^ charat(value, 3) : 0
}

/**
 * @param {string} value
 * @return {string}
 */
function trim (value) {
	return value.trim()
}

/**
 * @param {string} value
 * @param {RegExp} pattern
 * @return {string?}
 */
function match (value, pattern) {
	return (value = pattern.exec(value)) ? value[0] : value
}

/**
 * @param {string} value
 * @param {(string|RegExp)} pattern
 * @param {string} replacement
 * @return {string}
 */
function replace (value, pattern, replacement) {
	return value.replace(pattern, replacement)
}

/**
 * @param {string} value
 * @param {string} search
 * @param {number} position
 * @return {number}
 */
function indexof (value, search, position) {
	return value.indexOf(search, position)
}

/**
 * @param {string} value
 * @param {number} index
 * @return {number}
 */
function charat (value, index) {
	return value.charCodeAt(index) | 0
}

/**
 * @param {string} value
 * @param {number} begin
 * @param {number} end
 * @return {string}
 */
function substr (value, begin, end) {
	return value.slice(begin, end)
}

/**
 * @param {string} value
 * @return {number}
 */
function strlen (value) {
	return value.length
}

/**
 * @param {any[]} value
 * @return {number}
 */
function sizeof (value) {
	return value.length
}

/**
 * @param {any} value
 * @param {any[]} array
 * @return {any}
 */
function append (value, array) {
	return array.push(value), value
}

/**
 * @param {string[]} array
 * @param {function} callback
 * @return {string}
 */
function combine (array, callback) {
	return array.map(callback).join('')
}

/**
 * @param {string[]} array
 * @param {RegExp} pattern
 * @return {string[]}
 */
function filter (array, pattern) {
	return array.filter(function (value) { return !match(value, pattern) })
}

var line = 1;
var column = 1;
var length = 0;
var position = 0;
var character = 0;
var characters = '';

/**
 * @param {string} value
 * @param {object | null} root
 * @param {object | null} parent
 * @param {string} type
 * @param {string[] | string} props
 * @param {object[] | string} children
 * @param {object[]} siblings
 * @param {number} length
 */
function node (value, root, parent, type, props, children, length, siblings) {
	return {value: value, root: root, parent: parent, type: type, props: props, children: children, line: line, column: column, length: length, return: '', siblings: siblings}
}

/**
 * @param {object} root
 * @param {object} props
 * @return {object}
 */
function copy (root, props) {
	return assign(node('', null, null, '', null, null, 0, root.siblings), root, {length: -root.length}, props)
}

/**
 * @param {object} root
 */
function lift (root) {
	while (root.root)
		root = copy(root.root, {children: [root]});

	append(root, root.siblings);
}

/**
 * @return {number}
 */
function char () {
	return character
}

/**
 * @return {number}
 */
function prev () {
	character = position > 0 ? charat(characters, --position) : 0;

	if (column--, character === 10)
		column = 1, line--;

	return character
}

/**
 * @return {number}
 */
function next () {
	character = position < length ? charat(characters, position++) : 0;

	if (column++, character === 10)
		column = 1, line++;

	return character
}

/**
 * @return {number}
 */
function peek () {
	return charat(characters, position)
}

/**
 * @return {number}
 */
function caret () {
	return position
}

/**
 * @param {number} begin
 * @param {number} end
 * @return {string}
 */
function slice (begin, end) {
	return substr(characters, begin, end)
}

/**
 * @param {number} type
 * @return {number}
 */
function token (type) {
	switch (type) {
		// \0 \t \n \r \s whitespace token
		case 0: case 9: case 10: case 13: case 32:
			return 5
		// ! + , / > @ ~ isolate token
		case 33: case 43: case 44: case 47: case 62: case 64: case 126:
		// ; { } breakpoint token
		case 59: case 123: case 125:
			return 4
		// : accompanied token
		case 58:
			return 3
		// " ' ( [ opening delimit token
		case 34: case 39: case 40: case 91:
			return 2
		// ) ] closing delimit token
		case 41: case 93:
			return 1
	}

	return 0
}

/**
 * @param {string} value
 * @return {any[]}
 */
function alloc (value) {
	return line = column = 1, length = strlen(characters = value), position = 0, []
}

/**
 * @param {any} value
 * @return {any}
 */
function dealloc (value) {
	return characters = '', value
}

/**
 * @param {number} type
 * @return {string}
 */
function delimit (type) {
	return trim(slice(position - 1, delimiter(type === 91 ? type + 2 : type === 40 ? type + 1 : type)))
}

/**
 * @param {string} value
 * @return {string[]}
 */
function tokenize (value) {
	return dealloc(tokenizer(alloc(value)))
}

/**
 * @param {number} type
 * @return {string}
 */
function whitespace (type) {
	while (character = peek())
		if (character < 33)
			next();
		else
			break

	return token(type) > 2 || token(character) > 3 ? '' : ' '
}

/**
 * @param {string[]} children
 * @return {string[]}
 */
function tokenizer (children) {
	while (next())
		switch (token(character)) {
			case 0: append(identifier(position - 1), children);
				break
			case 2: append(delimit(character), children);
				break
			default: append(from(character), children);
		}

	return children
}

/**
 * @param {number} index
 * @param {number} count
 * @return {string}
 */
function escaping (index, count) {
	while (--count && next())
		// not 0-9 A-F a-f
		if (character < 48 || character > 102 || (character > 57 && character < 65) || (character > 70 && character < 97))
			break

	return slice(index, caret() + (count < 6 && peek() == 32 && next() == 32))
}

/**
 * @param {number} type
 * @return {number}
 */
function delimiter (type) {
	while (next())
		switch (character) {
			// ] ) " '
			case type:
				return position
			// " '
			case 34: case 39:
				if (type !== 34 && type !== 39)
					delimiter(character);
				break
			// (
			case 40:
				if (type === 41)
					delimiter(type);
				break
			// \
			case 92:
				next();
				break
		}

	return position
}

/**
 * @param {number} type
 * @param {number} index
 * @return {number}
 */
function commenter (type, index) {
	while (next())
		// //
		if (type + character === 47 + 10)
			break
		// /*
		else if (type + character === 42 + 42 && peek() === 47)
			break

	return '/*' + slice(index, position - 1) + '*' + from(type === 47 ? type : next())
}

/**
 * @param {number} index
 * @return {string}
 */
function identifier (index) {
	while (!token(peek()))
		next();

	return slice(index, position)
}

/**
 * @param {string} value
 * @return {object[]}
 */
function compile (value) {
	return dealloc(parse('', null, null, null, [''], value = alloc(value), 0, [0], value))
}

/**
 * @param {string} value
 * @param {object} root
 * @param {object?} parent
 * @param {string[]} rule
 * @param {string[]} rules
 * @param {string[]} rulesets
 * @param {number[]} pseudo
 * @param {number[]} points
 * @param {string[]} declarations
 * @return {object}
 */
function parse (value, root, parent, rule, rules, rulesets, pseudo, points, declarations) {
	var index = 0;
	var offset = 0;
	var length = pseudo;
	var atrule = 0;
	var property = 0;
	var previous = 0;
	var variable = 1;
	var scanning = 1;
	var ampersand = 1;
	var character = 0;
	var type = '';
	var props = rules;
	var children = rulesets;
	var reference = rule;
	var characters = type;

	while (scanning)
		switch (previous = character, character = next()) {
			// (
			case 40:
				if (previous != 108 && charat(characters, length - 1) == 58) {
					if (indexof(characters += replace(delimit(character), '&', '&\f'), '&\f', abs(index ? points[index - 1] : 0)) != -1)
						ampersand = -1;
					break
				}
			// " ' [
			case 34: case 39: case 91:
				characters += delimit(character);
				break
			// \t \n \r \s
			case 9: case 10: case 13: case 32:
				characters += whitespace(previous);
				break
			// \
			case 92:
				characters += escaping(caret() - 1, 7);
				continue
			// /
			case 47:
				switch (peek()) {
					case 42: case 47:
						append(comment(commenter(next(), caret()), root, parent, declarations), declarations);
						if ((token(previous || 1) == 5 || token(peek() || 1) == 5) && strlen(characters) && substr(characters, -1, void 0) !== ' ') characters += ' ';
						break
					default:
						characters += '/';
				}
				break
			// {
			case 123 * variable:
				points[index++] = strlen(characters) * ampersand;
			// } ; \0
			case 125 * variable: case 59: case 0:
				switch (character) {
					// \0 }
					case 0: case 125: scanning = 0;
					// ;
					case 59 + offset: if (ampersand == -1) characters = replace(characters, /\f/g, '');
						if (property > 0 && (strlen(characters) - length || (variable === 0 && previous === 47)))
							append(property > 32 ? declaration(characters + ';', rule, parent, length - 1, declarations) : declaration(replace(characters, ' ', '') + ';', rule, parent, length - 2, declarations), declarations);
						break
					// @ ;
					case 59: characters += ';';
					// { rule/at-rule
					default:
						append(reference = ruleset(characters, root, parent, index, offset, rules, points, type, props = [], children = [], length, rulesets), rulesets);

						if (character === 123)
							if (offset === 0)
								parse(characters, root, reference, reference, props, rulesets, length, points, children);
							else {
								switch (atrule) {
									// c(ontainer)
									case 99:
										if (charat(characters, 3) === 110) break
									// l(ayer)
									case 108:
										if (charat(characters, 2) === 97) break
									default:
										offset = 0;
									// d(ocument) m(edia) s(upports)
									case 100: case 109: case 115:
								}
								if (offset) parse(value, reference, reference, rule && append(ruleset(value, reference, reference, 0, 0, rules, points, type, rules, props = [], length, children), children), rules, children, length, points, rule ? props : children);
								else parse(characters, reference, reference, reference, [''], children, 0, points, children);
							}
				}

				index = offset = property = 0, variable = ampersand = 1, type = characters = '', length = pseudo;
				break
			// :
			case 58:
				length = 1 + strlen(characters), property = previous;
			default:
				if (variable < 1)
					if (character == 123)
						--variable;
					else if (character == 125 && variable++ == 0 && prev() == 125)
						continue

				switch (characters += from(character), character * variable) {
					// &
					case 38:
						ampersand = offset > 0 ? 1 : (characters += '\f', -1);
						break
					// ,
					case 44:
						points[index++] = (strlen(characters) - 1) * ampersand, ampersand = 1;
						break
					// @
					case 64:
						// -
						if (peek() === 45)
							characters += delimit(next());

						atrule = peek(), offset = length = strlen(type = characters += identifier(caret())), character++;
						break
					// -
					case 45:
						if (previous === 45 && strlen(characters) == 2)
							variable = 0;
				}
		}

	return rulesets
}

/**
 * @param {string} value
 * @param {object} root
 * @param {object?} parent
 * @param {number} index
 * @param {number} offset
 * @param {string[]} rules
 * @param {number[]} points
 * @param {string} type
 * @param {string[]} props
 * @param {string[]} children
 * @param {number} length
 * @param {object[]} siblings
 * @return {object}
 */
function ruleset (value, root, parent, index, offset, rules, points, type, props, children, length, siblings) {
	var post = offset - 1;
	var rule = offset === 0 ? rules : [''];
	var size = sizeof(rule);

	for (var i = 0, j = 0, k = 0; i < index; ++i)
		for (var x = 0, y = substr(value, post + 1, post = abs(j = points[i])), z = value; x < size; ++x)
			if (z = trim(j > 0 ? rule[x] + ' ' + y : replace(y, /&\f/g, rule[x])))
				props[k++] = z;

	return node(value, root, parent, offset === 0 ? RULESET : type, props, children, length, siblings)
}

/**
 * @param {number} value
 * @param {object} root
 * @param {object?} parent
 * @param {object[]} siblings
 * @return {object}
 */
function comment (value, root, parent, siblings) {
	return node(value, root, parent, COMMENT, from(char()), substr(value, 2, -2), 0, siblings)
}

/**
 * @param {string} value
 * @param {object} root
 * @param {object?} parent
 * @param {number} length
 * @param {object[]} siblings
 * @return {object}
 */
function declaration (value, root, parent, length, siblings) {
	return node(value, root, parent, DECLARATION, substr(value, 0, length), substr(value, length + 1, -1), length, siblings)
}

/**
 * @param {string} value
 * @param {number} length
 * @param {object[]} children
 * @return {string}
 */
function prefix (value, length, children) {
	switch (hash(value, length)) {
		// color-adjust
		case 5103:
			return WEBKIT + 'print-' + value + value
		// animation, animation-(delay|direction|duration|fill-mode|iteration-count|name|play-state|timing-function)
		case 5737: case 4201: case 3177: case 3433: case 1641: case 4457: case 2921:
		// text-decoration, filter, clip-path, backface-visibility, column, box-decoration-break
		case 5572: case 6356: case 5844: case 3191: case 6645: case 3005:
		// background-clip, columns, column-(count|fill|gap|rule|rule-color|rule-style|rule-width|span|width)
		case 4215: case 6389: case 5109: case 5365: case 5621: case 3829:
		// mask, mask-image, mask-(mode|clip|size), mask-(repeat|origin), mask-position
		case 6391: case 5879: case 5623: case 6135: case 4599:
			return WEBKIT + value + value
		// mask-composite
		case 4855:
			return WEBKIT + value.replace('add', 'source-over').replace('substract', 'source-out').replace('intersect', 'source-in').replace('exclude', 'xor') + value
		// tab-size
		case 4789:
			return MOZ + value + value
		// appearance, user-select, transform, hyphens, text-size-adjust
		case 5349: case 4246: case 4810: case 6968: case 2756:
			return WEBKIT + value + MOZ + value + MS + value + value
		// writing-mode
		case 5936:
			switch (charat(value, length + 11)) {
				// vertical-l(r)
				case 114:
					return WEBKIT + value + MS + replace(value, /[svh]\w+-[tblr]{2}/, 'tb') + value
				// vertical-r(l)
				case 108:
					return WEBKIT + value + MS + replace(value, /[svh]\w+-[tblr]{2}/, 'tb-rl') + value
				// horizontal(-)tb
				case 45:
					return WEBKIT + value + MS + replace(value, /[svh]\w+-[tblr]{2}/, 'lr') + value
				// default: fallthrough to below
			}
		// flex, flex-direction, scroll-snap-type, writing-mode
		case 6828: case 4268: case 2903:
			return WEBKIT + value + MS + value + value
		// order
		case 6165:
			return WEBKIT + value + MS + 'flex-' + value + value
		// align-items
		case 5187:
			return WEBKIT + value + replace(value, /(\w+).+(:[^]+)/, WEBKIT + 'box-$1$2' + MS + 'flex-$1$2') + value
		// align-self
		case 5443:
			return WEBKIT + value + MS + 'flex-item-' + replace(value, /flex-|-self/g, '') + (!match(value, /flex-|baseline/) ? MS + 'grid-row-' + replace(value, /flex-|-self/g, '') : '') + value
		// align-content
		case 4675:
			return WEBKIT + value + MS + 'flex-line-pack' + replace(value, /align-content|flex-|-self/g, '') + value
		// flex-shrink
		case 5548:
			return WEBKIT + value + MS + replace(value, 'shrink', 'negative') + value
		// flex-basis
		case 5292:
			return WEBKIT + value + MS + replace(value, 'basis', 'preferred-size') + value
		// flex-grow
		case 6060:
			return WEBKIT + 'box-' + replace(value, '-grow', '') + WEBKIT + value + MS + replace(value, 'grow', 'positive') + value
		// transition
		case 4554:
			return WEBKIT + replace(value, /([^-])(transform)/g, '$1' + WEBKIT + '$2') + value
		// cursor
		case 6187:
			return replace(replace(replace(value, /(zoom-|grab)/, WEBKIT + '$1'), /(image-set)/, WEBKIT + '$1'), value, '') + value
		// background, background-image
		case 5495: case 3959:
			return replace(value, /(image-set\([^]*)/, WEBKIT + '$1' + '$`$1')
		// justify-content
		case 4968:
			return replace(replace(value, /(.+:)(flex-)?(.*)/, WEBKIT + 'box-pack:$3' + MS + 'flex-pack:$3'), /space-between/, 'justify') + WEBKIT + value + value
		// justify-self
		case 4200:
			if (!match(value, /flex-|baseline/)) return MS + 'grid-column-align' + substr(value, length) + value
			break
		// grid-template-(columns|rows)
		case 2592: case 3360:
			return MS + replace(value, 'template-', '') + value
		// grid-(row|column)-start
		case 4384: case 3616:
			if (children && children.some(function (element, index) { return length = index, match(element.props, /grid-\w+-end/) })) {
				return ~indexof(value + (children = children[length].value), 'span', 0) ? value : (MS + replace(value, '-start', '') + value + MS + 'grid-row-span:' + (~indexof(children, 'span', 0) ? match(children, /\d+/) : +match(children, /\d+/) - +match(value, /\d+/)) + ';')
			}
			return MS + replace(value, '-start', '') + value
		// grid-(row|column)-end
		case 4896: case 4128:
			return (children && children.some(function (element) { return match(element.props, /grid-\w+-start/) })) ? value : MS + replace(replace(value, '-end', '-span'), 'span ', '') + value
		// (margin|padding)-inline-(start|end)
		case 4095: case 3583: case 4068: case 2532:
			return replace(value, /(.+)-inline(.+)/, WEBKIT + '$1$2') + value
		// (min|max)?(width|height|inline-size|block-size)
		case 8116: case 7059: case 5753: case 5535:
		case 5445: case 5701: case 4933: case 4677:
		case 5533: case 5789: case 5021: case 4765:
			// stretch, max-content, min-content, fill-available
			if (strlen(value) - 1 - length > 6)
				switch (charat(value, length + 1)) {
					// (m)ax-content, (m)in-content
					case 109:
						// -
						if (charat(value, length + 4) !== 45)
							break
					// (f)ill-available, (f)it-content
					case 102:
						return replace(value, /(.+:)(.+)-([^]+)/, '$1' + WEBKIT + '$2-$3' + '$1' + MOZ + (charat(value, length + 3) == 108 ? '$3' : '$2-$3')) + value
					// (s)tretch
					case 115:
						return ~indexof(value, 'stretch', 0) ? prefix(replace(value, 'stretch', 'fill-available'), length, children) + value : value
				}
			break
		// grid-(column|row)
		case 5152: case 5920:
			return replace(value, /(.+?):(\d+)(\s*\/\s*(span)?\s*(\d+))?(.*)/, function (_, a, b, c, d, e, f) { return (MS + a + ':' + b + f) + (c ? (MS + a + '-span:' + (d ? e : +e - +b)) + f : '') + value })
		// position: sticky
		case 4949:
			// stick(y)?
			if (charat(value, length + 6) === 121)
				return replace(value, ':', ':' + WEBKIT) + value
			break
		// display: (flex|inline-flex|grid|inline-grid)
		case 6444:
			switch (charat(value, charat(value, 14) === 45 ? 18 : 11)) {
				// (inline-)?fle(x)
				case 120:
					return replace(value, /(.+:)([^;\s!]+)(;|(\s+)?!.+)?/, '$1' + WEBKIT + (charat(value, 14) === 45 ? 'inline-' : '') + 'box$3' + '$1' + WEBKIT + '$2$3' + '$1' + MS + '$2box$3') + value
				// (inline-)?gri(d)
				case 100:
					return replace(value, ':', ':' + MS) + value
			}
			break
		// scroll-margin, scroll-margin-(top|right|bottom|left)
		case 5719: case 2647: case 2135: case 3927: case 2391:
			return replace(value, 'scroll-', 'scroll-snap-') + value
	}

	return value
}

/**
 * @param {object[]} children
 * @param {function} callback
 * @return {string}
 */
function serialize (children, callback) {
	var output = '';

	for (var i = 0; i < children.length; i++)
		output += callback(children[i], i, children, callback) || '';

	return output
}

/**
 * @param {object} element
 * @param {number} index
 * @param {object[]} children
 * @param {function} callback
 * @return {string}
 */
function stringify (element, index, children, callback) {
	switch (element.type) {
		case LAYER: if (element.children.length) break
		case IMPORT: case NAMESPACE: case DECLARATION: return element.return = element.return || element.value
		case COMMENT: return ''
		case KEYFRAMES: return element.return = element.value + '{' + serialize(element.children, callback) + '}'
		case RULESET: if (!strlen(element.value = element.props.join(','))) return ''
	}

	return strlen(children = serialize(element.children, callback)) ? element.return = element.value + '{' + children + '}' : ''
}

/**
 * @param {function[]} collection
 * @return {function}
 */
function middleware (collection) {
	var length = sizeof(collection);

	return function (element, index, children, callback) {
		var output = '';

		for (var i = 0; i < length; i++)
			output += collection[i](element, index, children, callback) || '';

		return output
	}
}

/**
 * @param {function} callback
 * @return {function}
 */
function rulesheet (callback) {
	return function (element) {
		if (!element.root)
			if (element = element.return)
				callback(element);
	}
}

/**
 * @param {object} element
 * @param {number} index
 * @param {object[]} children
 * @param {function} callback
 */
function prefixer (element, index, children, callback) {
	if (element.length > -1)
		if (!element.return)
			switch (element.type) {
				case DECLARATION: element.return = prefix(element.value, element.length, children);
					return
				case KEYFRAMES:
					return serialize([copy(element, {value: replace(element.value, '@', '@' + WEBKIT)})], callback)
				case RULESET:
					if (element.length)
						return combine(children = element.props, function (value) {
							switch (match(value, callback = /(::plac\w+|:read-\w+)/)) {
								// :read-(only|write)
								case ':read-only': case ':read-write':
									lift(copy(element, {props: [replace(value, /:(read-\w+)/, ':' + MOZ + '$1')]}));
									lift(copy(element, {props: [value]}));
									assign(element, {props: filter(children, callback)});
									break
								// :placeholder
								case '::placeholder':
									lift(copy(element, {props: [replace(value, /:(plac\w+)/, ':' + WEBKIT + 'input-$1')]}));
									lift(copy(element, {props: [replace(value, /:(plac\w+)/, ':' + MOZ + '$1')]}));
									lift(copy(element, {props: [replace(value, /:(plac\w+)/, MS + 'input-$1')]}));
									lift(copy(element, {props: [value]}));
									assign(element, {props: filter(children, callback)});
									break
							}

							return ''
						})
			}
}

/**
 * @param {object} element
 * @param {number} index
 * @param {object[]} children
 */
function namespace (element) {
	switch (element.type) {
		case RULESET:
			element.props = element.props.map(function (value) {
				return combine(tokenize(value), function (value, index, children) {
					switch (charat(value, 0)) {
						// \f
						case 12:
							return substr(value, 1, strlen(value))
						// \0 ( + > ~
						case 0: case 40: case 43: case 62: case 126:
							return value
						// :
						case 58:
							if (children[++index] === 'global')
								children[index] = '', children[++index] = '\f' + substr(children[index], index = 1, -1);
						// \s
						case 32:
							return index === 1 ? '' : value
						default:
							switch (index) {
								case 0: element = value;
									return sizeof(children) > 1 ? '' : value
								case index = sizeof(children) - 1: case 2:
									return index === 2 ? value + element + element : value + element
								default:
									return value
							}
					}
				})
			});
	}
}

var define_process_env_default = {};
var a = "undefined" != typeof process && void 0 !== define_process_env_default && (define_process_env_default.REACT_APP_SC_ATTR || define_process_env_default.SC_ATTR) || "data-styled", c = "active", u = "data-styled-version", l = "6.3.12", p = "/*!sc*/\n", h = "undefined" != typeof window && "undefined" != typeof document, d = Boolean("boolean" == typeof SC_DISABLE_SPEEDY ? SC_DISABLE_SPEEDY : "undefined" != typeof process && void 0 !== define_process_env_default && void 0 !== define_process_env_default.REACT_APP_SC_DISABLE_SPEEDY && "" !== define_process_env_default.REACT_APP_SC_DISABLE_SPEEDY ? "false" !== define_process_env_default.REACT_APP_SC_DISABLE_SPEEDY && define_process_env_default.REACT_APP_SC_DISABLE_SPEEDY : "undefined" != typeof process && void 0 !== define_process_env_default && void 0 !== define_process_env_default.SC_DISABLE_SPEEDY && "" !== define_process_env_default.SC_DISABLE_SPEEDY ? "false" !== define_process_env_default.SC_DISABLE_SPEEDY && define_process_env_default.SC_DISABLE_SPEEDY : false), f = {}, m = false ? { 1: "Cannot create styled-component for component: %s.\n\n", 2: "Can't collect styles once you've consumed a `ServerStyleSheet`'s styles! `ServerStyleSheet` is a one off instance for each server-side render cycle.\n\n- Are you trying to reuse it across renders?\n- Are you accidentally calling collectStyles twice?\n\n", 3: "Streaming SSR is only supported in a Node.js environment; Please do not try to call this method in the browser.\n\n", 4: "The `StyleSheetManager` expects a valid target or sheet prop!\n\n- Does this error occur on the client and is your target falsy?\n- Does this error occur on the server and is the sheet falsy?\n\n", 5: "The clone method cannot be used on the client!\n\n- Are you running in a client-like environment on the server?\n- Are you trying to run SSR on the client?\n\n", 6: "Trying to insert a new style tag, but the given Node is unmounted!\n\n- Are you using a custom target that isn't mounted?\n- Does your document not have a valid head element?\n- Have you accidentally removed a style tag manually?\n\n", 7: 'ThemeProvider: Please return an object from your "theme" prop function, e.g.\n\n```js\ntheme={() => ({})}\n```\n\n', 8: 'ThemeProvider: Please make your "theme" prop an object.\n\n', 9: "Missing document `<head>`\n\n", 10: "Cannot find a StyleSheet instance. Usually this happens if there are multiple copies of styled-components loaded at once. Check out this issue for how to troubleshoot and fix the common cases where this situation can happen: https://github.com/styled-components/styled-components/issues/1941#issuecomment-417862021\n\n", 11: "_This error was replaced with a dev-time warning, it will be deleted for v4 final._ [createGlobalStyle] received children which will not be rendered. Please use the component without passing children elements.\n\n", 12: "It seems you are interpolating a keyframe declaration (%s) into an untagged string. This was supported in styled-components v3, but is not longer supported in v4 as keyframes are now injected on-demand. Please wrap your string in the css\\`\\` helper which ensures the styles are injected correctly. See https://www.styled-components.com/docs/api#css\n\n", 13: "%s is not a styled component and cannot be referred to via component selector. See https://www.styled-components.com/docs/advanced#referring-to-other-components for more details.\n\n", 14: 'ThemeProvider: "theme" prop is required.\n\n', 15: "A stylis plugin has been supplied that is not named. We need a name for each plugin to be able to prevent styling collisions between different stylis configurations within the same app. Before you pass your plugin to `<StyleSheetManager stylisPlugins={[]}>`, please make sure each plugin is uniquely-named, e.g.\n\n```js\nObject.defineProperty(importedPlugin, 'name', { value: 'some-unique-name' });\n```\n\n", 16: "Reached the limit of how many styled components may be created at group %s.\nYou may only create up to 1,073,741,824 components. If you're creating components dynamically,\nas for instance in your render method then you may be running into this limitation.\n\n", 17: "CSSStyleSheet could not be found on HTMLStyleElement.\nHas styled-components' style tag been unmounted or altered by another script?\n", 18: "ThemeProvider: Please make sure your useTheme hook is within a `<ThemeProvider>`" } : {};
function y() {
  for (var e2 = [], t2 = 0; t2 < arguments.length; t2++) e2[t2] = arguments[t2];
  for (var n2 = e2[0], o2 = [], r2 = 1, s2 = e2.length; r2 < s2; r2 += 1) o2.push(e2[r2]);
  return o2.forEach(function(e3) {
    n2 = n2.replace(/%[a-z]/, e3);
  }), n2;
}
function v(t2) {
  for (var n2 = [], o2 = 1; o2 < arguments.length; o2++) n2[o2 - 1] = arguments[o2];
  return true ? new Error("An error occurred. See https://github.com/styled-components/styled-components/blob/main/packages/styled-components/src/utils/errors.md#".concat(t2, " for more information.").concat(n2.length > 0 ? " Args: ".concat(n2.join(", ")) : "")) : new Error(y.apply(void 0, __spreadArray([m[t2]], n2, false)).trim());
}
var g = 1 << 30, S = /* @__PURE__ */ new Map(), w = /* @__PURE__ */ new Map(), b = 1, N = function(e2) {
  if (S.has(e2)) return S.get(e2);
  for (; w.has(b); ) b++;
  var t2 = b++;
  if (false) throw v(16, "".concat(t2));
  return S.set(e2, t2), w.set(t2, e2), t2;
}, E = function(e2, t2) {
  b = t2 + 1, S.set(e2, t2), w.set(t2, e2);
}, C = /invalid hook call/i, _ = /* @__PURE__ */ new Set(), A = function(t2, n2) {
  if (false) {
    var r2 = n2 ? ' with the id of "'.concat(n2, '"') : "", s2 = "The component ".concat(t2).concat(r2, " has been created dynamically.\n") + "You may see this warning because you've called styled inside another component.\nTo resolve this only create new StyledComponents outside of any render method and function component.\nSee https://styled-components.com/docs/basics#define-styled-components-outside-of-the-render-method for more info.\n", i2 = console.error;
    try {
      var a2 = true;
      console.error = function(t3) {
        for (var n3 = [], o2 = 1; o2 < arguments.length; o2++) n3[o2 - 1] = arguments[o2];
        C.test(t3) ? (a2 = false, _.delete(s2)) : i2.apply(void 0, __spreadArray([t3], n3, false));
      }, "function" == typeof React.useState && React.useState(null), a2 && !_.has(s2) && (console.warn(s2), _.add(s2));
    } catch (e2) {
      C.test(e2.message) && _.delete(s2);
    } finally {
      console.error = i2;
    }
  }
}, P = Object.freeze([]), I = Object.freeze({});
function O(e2, t2, n2) {
  return void 0 === n2 && (n2 = I), e2.theme !== n2.theme && e2.theme || t2 || n2.theme;
}
var D = /* @__PURE__ */ new Set(["a", "abbr", "address", "area", "article", "aside", "audio", "b", "bdi", "bdo", "blockquote", "body", "button", "br", "canvas", "caption", "cite", "code", "col", "colgroup", "data", "datalist", "dd", "del", "details", "dfn", "dialog", "div", "dl", "dt", "em", "embed", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "header", "hgroup", "hr", "html", "i", "iframe", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "map", "mark", "menu", "meter", "nav", "object", "ol", "optgroup", "option", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "search", "section", "select", "slot", "small", "span", "strong", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "tr", "u", "ul", "var", "video", "wbr", "circle", "clipPath", "defs", "ellipse", "feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence", "filter", "foreignObject", "g", "image", "line", "linearGradient", "marker", "mask", "path", "pattern", "polygon", "polyline", "radialGradient", "rect", "stop", "svg", "switch", "symbol", "text", "textPath", "tspan", "use"]), R = /[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g, T = /(^-|-$)/g;
function x(e2) {
  return e2.replace(R, "-").replace(T, "");
}
var j = /(a)(d)/gi, k = function(e2) {
  return String.fromCharCode(e2 + (e2 > 25 ? 39 : 97));
};
function M(e2) {
  var t2, n2 = "";
  for (t2 = Math.abs(e2); t2 > 52; t2 = t2 / 52 | 0) n2 = k(t2 % 52) + n2;
  return (k(t2 % 52) + n2).replace(j, "$1-$2");
}
var V, F = function(e2, t2) {
  for (var n2 = t2.length; n2; ) e2 = 33 * e2 ^ t2.charCodeAt(--n2);
  return e2;
}, G = function(e2) {
  return F(5381, e2);
};
function L(e2) {
  return M(G(e2) >>> 0);
}
function B(e2) {
  return e2.displayName || e2.name || "Component";
}
function z(e2) {
  return "string" == typeof e2 && true;
}
var $ = "function" == typeof Symbol && Symbol.for, Y = $ ? Symbol.for("react.memo") : 60115, W = $ ? Symbol.for("react.forward_ref") : 60112, q = { childContextTypes: true, contextType: true, contextTypes: true, defaultProps: true, displayName: true, getDefaultProps: true, getDerivedStateFromError: true, getDerivedStateFromProps: true, mixins: true, propTypes: true, type: true }, H = { name: true, length: true, prototype: true, caller: true, callee: true, arguments: true, arity: true }, U = { $$typeof: true, compare: true, defaultProps: true, displayName: true, propTypes: true, type: true }, J = ((V = {})[W] = { $$typeof: true, render: true, defaultProps: true, displayName: true, propTypes: true }, V[Y] = U, V);
function X(e2) {
  return ("type" in (t2 = e2) && t2.type.$$typeof) === Y ? U : "$$typeof" in e2 ? J[e2.$$typeof] : q;
  var t2;
}
var Z = Object.defineProperty, K = Object.getOwnPropertyNames, Q = Object.getOwnPropertySymbols, ee = Object.getOwnPropertyDescriptor, te = Object.getPrototypeOf, ne = Object.prototype;
function oe(e2, t2, n2) {
  if ("string" != typeof t2) {
    if (ne) {
      var o2 = te(t2);
      o2 && o2 !== ne && oe(e2, o2, n2);
    }
    var r2 = K(t2);
    Q && (r2 = r2.concat(Q(t2)));
    for (var s2 = X(e2), i2 = X(t2), a2 = 0; a2 < r2.length; ++a2) {
      var c2 = r2[a2];
      if (!(c2 in H || n2 && n2[c2] || i2 && c2 in i2 || s2 && c2 in s2)) {
        var u2 = ee(t2, c2);
        try {
          Z(e2, c2, u2);
        } catch (e3) {
        }
      }
    }
  }
  return e2;
}
function re(e2) {
  return "function" == typeof e2;
}
function se(e2) {
  return "object" == typeof e2 && "styledComponentId" in e2;
}
function ie(e2, t2) {
  return e2 && t2 ? "".concat(e2, " ").concat(t2) : e2 || t2 || "";
}
function ae(e2, t2) {
  return e2.join(t2 || "");
}
function ce(e2) {
  return null !== e2 && "object" == typeof e2 && e2.constructor.name === Object.name && !("props" in e2 && e2.$$typeof);
}
function ue(e2, t2, n2) {
  if (void 0 === n2 && (n2 = false), !n2 && !ce(e2) && !Array.isArray(e2)) return t2;
  if (Array.isArray(t2)) for (var o2 = 0; o2 < t2.length; o2++) e2[o2] = ue(e2[o2], t2[o2]);
  else if (ce(t2)) for (var o2 in t2) e2[o2] = ue(e2[o2], t2[o2]);
  return e2;
}
function le(e2, t2) {
  Object.defineProperty(e2, "toString", { value: t2 });
}
var pe = (function() {
  function e2(e3) {
    this.groupSizes = new Uint32Array(512), this.length = 512, this.tag = e3, this._cGroup = 0, this._cIndex = 0;
  }
  return e2.prototype.indexOfGroup = function(e3) {
    if (e3 === this._cGroup) return this._cIndex;
    var t2 = this._cIndex;
    if (e3 > this._cGroup) for (var n2 = this._cGroup; n2 < e3; n2++) t2 += this.groupSizes[n2];
    else for (n2 = this._cGroup - 1; n2 >= e3; n2--) t2 -= this.groupSizes[n2];
    return this._cGroup = e3, this._cIndex = t2, t2;
  }, e2.prototype.insertRules = function(e3, t2) {
    if (e3 >= this.groupSizes.length) {
      for (var n2 = this.groupSizes, o2 = n2.length, r2 = o2; e3 >= r2; ) if ((r2 <<= 1) < 0) throw v(16, "".concat(e3));
      this.groupSizes = new Uint32Array(r2), this.groupSizes.set(n2), this.length = r2;
      for (var s2 = o2; s2 < r2; s2++) this.groupSizes[s2] = 0;
    }
    for (var i2 = this.indexOfGroup(e3 + 1), a2 = 0, c2 = (s2 = 0, t2.length); s2 < c2; s2++) this.tag.insertRule(i2, t2[s2]) && (this.groupSizes[e3]++, i2++, a2++);
    a2 > 0 && this._cGroup > e3 && (this._cIndex += a2);
  }, e2.prototype.clearGroup = function(e3) {
    if (e3 < this.length) {
      var t2 = this.groupSizes[e3], n2 = this.indexOfGroup(e3), o2 = n2 + t2;
      this.groupSizes[e3] = 0;
      for (var r2 = n2; r2 < o2; r2++) this.tag.deleteRule(n2);
      t2 > 0 && this._cGroup > e3 && (this._cIndex -= t2);
    }
  }, e2.prototype.getGroup = function(e3) {
    var t2 = "";
    if (e3 >= this.length || 0 === this.groupSizes[e3]) return t2;
    for (var n2 = this.groupSizes[e3], o2 = this.indexOfGroup(e3), r2 = o2 + n2, s2 = o2; s2 < r2; s2++) t2 += this.tag.getRule(s2) + p;
    return t2;
  }, e2;
})(), he = "style[".concat(a, "][").concat(u, '="').concat(l, '"]'), de = new RegExp("^".concat(a, '\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)')), fe = function(e2) {
  return "undefined" != typeof ShadowRoot && e2 instanceof ShadowRoot || "host" in e2 && 11 === e2.nodeType;
}, me = function(e2) {
  if (!e2) return document;
  if (fe(e2)) return e2;
  if ("getRootNode" in e2) {
    var t2 = e2.getRootNode();
    if (fe(t2)) return t2;
  }
  return document;
}, ye = function(e2, t2, n2) {
  for (var o2, r2 = n2.split(","), s2 = 0, i2 = r2.length; s2 < i2; s2++) (o2 = r2[s2]) && e2.registerName(t2, o2);
}, ve = function(e2, t2) {
  for (var n2, o2 = (null !== (n2 = t2.textContent) && void 0 !== n2 ? n2 : "").split(p), r2 = [], s2 = 0, i2 = o2.length; s2 < i2; s2++) {
    var a2 = o2[s2].trim();
    if (a2) {
      var c2 = a2.match(de);
      if (c2) {
        var u2 = 0 | parseInt(c2[1], 10), l2 = c2[2];
        0 !== u2 && (E(l2, u2), ye(e2, l2, c2[3]), e2.getTag().insertRules(u2, r2)), r2.length = 0;
      } else r2.push(a2);
    }
  }
}, ge = function(e2) {
  for (var t2 = me(e2.options.target).querySelectorAll(he), n2 = 0, o2 = t2.length; n2 < o2; n2++) {
    var r2 = t2[n2];
    r2 && r2.getAttribute(a) !== c && (ve(e2, r2), r2.parentNode && r2.parentNode.removeChild(r2));
  }
};
function Se() {
  return "undefined" != typeof __webpack_nonce__ ? __webpack_nonce__ : null;
}
var we = function(e2) {
  var t2 = document.head, n2 = e2 || t2, o2 = document.createElement("style"), r2 = (function(e3) {
    var t3 = Array.from(e3.querySelectorAll("style[".concat(a, "]")));
    return t3[t3.length - 1];
  })(n2), s2 = void 0 !== r2 ? r2.nextSibling : null;
  o2.setAttribute(a, c), o2.setAttribute(u, l);
  var i2 = Se();
  return i2 && o2.setAttribute("nonce", i2), n2.insertBefore(o2, s2), o2;
}, be = (function() {
  function e2(e3) {
    this.element = we(e3), this.element.appendChild(document.createTextNode("")), this.sheet = (function(e4) {
      var t2;
      if (e4.sheet) return e4.sheet;
      for (var n2 = null !== (t2 = e4.getRootNode().styleSheets) && void 0 !== t2 ? t2 : document.styleSheets, o2 = 0, r2 = n2.length; o2 < r2; o2++) {
        var s2 = n2[o2];
        if (s2.ownerNode === e4) return s2;
      }
      throw v(17);
    })(this.element), this.length = 0;
  }
  return e2.prototype.insertRule = function(e3, t2) {
    try {
      return this.sheet.insertRule(t2, e3), this.length++, true;
    } catch (e4) {
      return false;
    }
  }, e2.prototype.deleteRule = function(e3) {
    this.sheet.deleteRule(e3), this.length--;
  }, e2.prototype.getRule = function(e3) {
    var t2 = this.sheet.cssRules[e3];
    return t2 && t2.cssText ? t2.cssText : "";
  }, e2;
})(), Ne = (function() {
  function e2(e3) {
    this.element = we(e3), this.nodes = this.element.childNodes, this.length = 0;
  }
  return e2.prototype.insertRule = function(e3, t2) {
    if (e3 <= this.length && e3 >= 0) {
      var n2 = document.createTextNode(t2);
      return this.element.insertBefore(n2, this.nodes[e3] || null), this.length++, true;
    }
    return false;
  }, e2.prototype.deleteRule = function(e3) {
    this.element.removeChild(this.nodes[e3]), this.length--;
  }, e2.prototype.getRule = function(e3) {
    return e3 < this.length ? this.nodes[e3].textContent : "";
  }, e2;
})(), Ee = (function() {
  function e2(e3) {
    this.rules = [], this.length = 0;
  }
  return e2.prototype.insertRule = function(e3, t2) {
    return e3 <= this.length && (e3 === this.length ? this.rules.push(t2) : this.rules.splice(e3, 0, t2), this.length++, true);
  }, e2.prototype.deleteRule = function(e3) {
    this.rules.splice(e3, 1), this.length--;
  }, e2.prototype.getRule = function(e3) {
    return e3 < this.length ? this.rules[e3] : "";
  }, e2;
})(), Ce = h, _e = { isServer: !h, useCSSOMInjection: !d }, Ae = (function() {
  function e2(e3, n2, o2) {
    void 0 === e3 && (e3 = I), void 0 === n2 && (n2 = {});
    var r2 = this;
    this.options = __assign(__assign({}, _e), e3), this.gs = n2, this.names = new Map(o2), this.server = !!e3.isServer, !this.server && h && Ce && (Ce = false, ge(this)), le(this, function() {
      return (function(e4) {
        for (var t2 = e4.getTag(), n3 = t2.length, o3 = "", r3 = function(n4) {
          var r4 = (function(e5) {
            return w.get(e5);
          })(n4);
          if (void 0 === r4) return "continue";
          var s3 = e4.names.get(r4);
          if (void 0 === s3 || !s3.size) return "continue";
          var i2 = t2.getGroup(n4);
          if (0 === i2.length) return "continue";
          var c2 = a + ".g" + n4 + '[id="' + r4 + '"]', u2 = "";
          s3.forEach(function(e5) {
            e5.length > 0 && (u2 += e5 + ",");
          }), o3 += i2 + c2 + '{content:"' + u2 + '"}' + p;
        }, s2 = 0; s2 < n3; s2++) r3(s2);
        return o3;
      })(r2);
    });
  }
  return e2.registerId = function(e3) {
    return N(e3);
  }, e2.prototype.rehydrate = function() {
    !this.server && h && ge(this);
  }, e2.prototype.reconstructWithOptions = function(n2, o2) {
    void 0 === o2 && (o2 = true);
    var r2 = new e2(__assign(__assign({}, this.options), n2), this.gs, o2 && this.names || void 0);
    return !this.server && h && n2.target !== this.options.target && me(this.options.target) !== me(n2.target) && ge(r2), r2;
  }, e2.prototype.allocateGSInstance = function(e3) {
    return this.gs[e3] = (this.gs[e3] || 0) + 1;
  }, e2.prototype.getTag = function() {
    return this.tag || (this.tag = (e3 = (function(e4) {
      var t2 = e4.useCSSOMInjection, n2 = e4.target;
      return e4.isServer ? new Ee(n2) : t2 ? new be(n2) : new Ne(n2);
    })(this.options), new pe(e3)));
    var e3;
  }, e2.prototype.hasNameForId = function(e3, t2) {
    var n2, o2;
    return null !== (o2 = null === (n2 = this.names.get(e3)) || void 0 === n2 ? void 0 : n2.has(t2)) && void 0 !== o2 && o2;
  }, e2.prototype.registerName = function(e3, t2) {
    N(e3);
    var n2 = this.names.get(e3);
    n2 ? n2.add(t2) : this.names.set(e3, /* @__PURE__ */ new Set([t2]));
  }, e2.prototype.insertRules = function(e3, t2, n2) {
    this.registerName(e3, t2), this.getTag().insertRules(N(e3), n2);
  }, e2.prototype.clearNames = function(e3) {
    this.names.has(e3) && this.names.get(e3).clear();
  }, e2.prototype.clearRules = function(e3) {
    this.getTag().clearGroup(N(e3)), this.clearNames(e3);
  }, e2.prototype.clearTag = function() {
    this.tag = void 0;
  }, e2;
})();
function Pe(e2, t2) {
  return null == t2 || "boolean" == typeof t2 || "" === t2 ? "" : "number" != typeof t2 || 0 === t2 || e2 in unitlessKeys || e2.startsWith("--") ? String(t2).trim() : "".concat(t2, "px");
}
var Ie = function(e2) {
  return e2 >= "A" && e2 <= "Z";
};
function Oe(e2) {
  for (var t2 = "", n2 = 0; n2 < e2.length; n2++) {
    var o2 = e2[n2];
    if (1 === n2 && "-" === o2 && "-" === e2[0]) return e2;
    Ie(o2) ? t2 += "-" + o2.toLowerCase() : t2 += o2;
  }
  return t2.startsWith("ms-") ? "-" + t2 : t2;
}
var De = Symbol.for("sc-keyframes");
function Re(e2) {
  return "object" == typeof e2 && null !== e2 && De in e2;
}
var Te = function(e2) {
  return null == e2 || false === e2 || "" === e2;
}, xe = function(t2) {
  var n2 = [];
  for (var o2 in t2) {
    var r2 = t2[o2];
    t2.hasOwnProperty(o2) && !Te(r2) && (Array.isArray(r2) && r2.isCss || re(r2) ? n2.push("".concat(Oe(o2), ":"), r2, ";") : ce(r2) ? n2.push.apply(n2, __spreadArray(__spreadArray(["".concat(o2, " {")], xe(r2), false), ["}"], false)) : n2.push("".concat(Oe(o2), ": ").concat(Pe(o2, r2), ";")));
  }
  return n2;
};
function je(e2, t2, n2, o2, r2) {
  if (void 0 === r2 && (r2 = []), "string" == typeof e2) return e2 && r2.push(e2), r2;
  if (Te(e2)) return r2;
  if (se(e2)) return r2.push(".".concat(e2.styledComponentId)), r2;
  if (re(e2)) {
    if (!re(i2 = e2) || i2.prototype && i2.prototype.isReactComponent || !t2) return r2.push(e2), r2;
    var s2 = e2(t2);
    return true, je(s2, t2, n2, o2, r2);
  }
  var i2;
  if (Re(e2)) return n2 ? (e2.inject(n2, o2), r2.push(e2.getName(o2))) : r2.push(e2), r2;
  if (ce(e2)) {
    for (var a2 = xe(e2), c2 = 0; c2 < a2.length; c2++) r2.push(a2[c2]);
    return r2;
  }
  if (!Array.isArray(e2)) return r2.push(e2.toString()), r2;
  for (c2 = 0; c2 < e2.length; c2++) je(e2[c2], t2, n2, o2, r2);
  return r2;
}
function ke(e2) {
  for (var t2 = 0; t2 < e2.length; t2 += 1) {
    var n2 = e2[t2];
    if (re(n2) && !se(n2)) return false;
  }
  return true;
}
var Me = G(l), Ve = (function() {
  function e2(e3, t2, n2) {
    this.rules = e3, this.staticRulesId = "", this.isStatic = (void 0 === n2 || n2.isStatic) && ke(e3), this.componentId = t2, this.baseHash = F(Me, t2), this.baseStyle = n2, Ae.registerId(t2);
  }
  return e2.prototype.generateAndInjectStyles = function(e3, t2, n2) {
    var o2 = this.baseStyle ? this.baseStyle.generateAndInjectStyles(e3, t2, n2).className : "";
    if (this.isStatic && !n2.hash) if (this.staticRulesId && t2.hasNameForId(this.componentId, this.staticRulesId)) o2 = ie(o2, this.staticRulesId);
    else {
      var r2 = ae(je(this.rules, e3, t2, n2)), s2 = M(F(this.baseHash, r2) >>> 0);
      if (!t2.hasNameForId(this.componentId, s2)) {
        var i2 = n2(r2, ".".concat(s2), void 0, this.componentId);
        t2.insertRules(this.componentId, s2, i2);
      }
      o2 = ie(o2, s2), this.staticRulesId = s2;
    }
    else {
      for (var a2 = F(this.baseHash, n2.hash), c2 = "", u2 = 0; u2 < this.rules.length; u2++) {
        var l2 = this.rules[u2];
        if ("string" == typeof l2) c2 += l2, false;
        else if (l2) {
          var p2 = ae(je(l2, e3, t2, n2));
          a2 = F(F(a2, String(u2)), p2), c2 += p2;
        }
      }
      if (c2) {
        var h2 = M(a2 >>> 0);
        if (!t2.hasNameForId(this.componentId, h2)) {
          var d2 = n2(c2, ".".concat(h2), void 0, this.componentId);
          t2.insertRules(this.componentId, h2, d2);
        }
        o2 = ie(o2, h2);
      }
    }
    return { className: o2, css: "undefined" == typeof window ? t2.getTag().getGroup(N(this.componentId)) : "" };
  }, e2;
})(), Fe = /&/g, Ge = 47, Le = 42;
function Be(e2) {
  if (-1 === e2.indexOf("}")) return false;
  for (var t2 = e2.length, n2 = 0, o2 = 0, r2 = false, s2 = 0; s2 < t2; s2++) {
    var i2 = e2.charCodeAt(s2);
    if (0 !== o2 || r2 || i2 !== Ge || e2.charCodeAt(s2 + 1) !== Le) if (r2) i2 === Le && e2.charCodeAt(s2 + 1) === Ge && (r2 = false, s2++);
    else if (34 !== i2 && 39 !== i2 || 0 !== s2 && 92 === e2.charCodeAt(s2 - 1)) {
      if (0 === o2) {
        if (123 === i2) n2++;
        else if (125 === i2 && --n2 < 0) return true;
      }
    } else 0 === o2 ? o2 = i2 : o2 === i2 && (o2 = 0);
    else r2 = true, s2++;
  }
  return 0 !== n2 || 0 !== o2;
}
function ze(e2, t2) {
  return e2.map(function(e3) {
    return "rule" === e3.type && (e3.value = "".concat(t2, " ").concat(e3.value), e3.value = e3.value.replaceAll(",", ",".concat(t2, " ")), e3.props = e3.props.map(function(e4) {
      return "".concat(t2, " ").concat(e4);
    })), Array.isArray(e3.children) && "@keyframes" !== e3.type && (e3.children = ze(e3.children, t2)), e3;
  });
}
function $e(e2) {
  var t2, n2, o2, r2 = void 0 === e2 ? I : e2, s2 = r2.options, a2 = void 0 === s2 ? I : s2, c2 = r2.plugins, u2 = void 0 === c2 ? P : c2, l2 = function(e3, o3, r3) {
    return r3.startsWith(n2) && r3.endsWith(n2) && r3.replaceAll(n2, "").length > 0 ? ".".concat(t2) : e3;
  }, p2 = u2.slice();
  p2.push(function(e3) {
    e3.type === RULESET && e3.value.includes("&") && (o2 || (o2 = new RegExp("\\".concat(n2, "\\b"), "g")), e3.props[0] = e3.props[0].replace(Fe, n2).replace(o2, l2));
  }), a2.prefix && p2.push(prefixer), p2.push(stringify);
  var h2 = [], d2 = middleware(p2.concat(rulesheet(function(e3) {
    return h2.push(e3);
  }))), f2 = function(e3, r3, s3, c3) {
    void 0 === r3 && (r3 = ""), void 0 === s3 && (s3 = ""), void 0 === c3 && (c3 = "&"), t2 = c3, n2 = r3, o2 = void 0;
    var u3 = (function(e4) {
      if (!Be(e4)) return e4;
      for (var t3 = e4.length, n3 = "", o3 = 0, r4 = 0, s4 = 0, i2 = false, a3 = 0; a3 < t3; a3++) {
        var c4 = e4.charCodeAt(a3);
        if (0 !== s4 || i2 || c4 !== Ge || e4.charCodeAt(a3 + 1) !== Le) if (i2) c4 === Le && e4.charCodeAt(a3 + 1) === Ge && (i2 = false, a3++);
        else if (34 !== c4 && 39 !== c4 || 0 !== a3 && 92 === e4.charCodeAt(a3 - 1)) {
          if (0 === s4) if (123 === c4) r4++;
          else if (125 === c4) {
            if (--r4 < 0) {
              for (var u4 = a3 + 1; u4 < t3; ) {
                var l4 = e4.charCodeAt(u4);
                if (59 === l4 || 10 === l4) break;
                u4++;
              }
              u4 < t3 && 59 === e4.charCodeAt(u4) && u4++, r4 = 0, a3 = u4 - 1, o3 = u4;
              continue;
            }
            0 === r4 && (n3 += e4.substring(o3, a3 + 1), o3 = a3 + 1);
          } else 59 === c4 && 0 === r4 && (n3 += e4.substring(o3, a3 + 1), o3 = a3 + 1);
        } else 0 === s4 ? s4 = c4 : s4 === c4 && (s4 = 0);
        else i2 = true, a3++;
      }
      if (o3 < t3) {
        var p3 = e4.substring(o3);
        Be(p3) || (n3 += p3);
      }
      return n3;
    })((function(e4) {
      if (-1 === e4.indexOf("//")) return e4;
      for (var t3 = e4.length, n3 = [], o3 = 0, r4 = 0, s4 = 0, i2 = 0; r4 < t3; ) {
        var a3 = e4.charCodeAt(r4);
        if (34 !== a3 && 39 !== a3 || 0 !== r4 && 92 === e4.charCodeAt(r4 - 1)) if (0 === s4) if (a3 === Ge && r4 + 1 < t3 && e4.charCodeAt(r4 + 1) === Le) {
          for (r4 += 2; r4 + 1 < t3 && (e4.charCodeAt(r4) !== Le || e4.charCodeAt(r4 + 1) !== Ge); ) r4++;
          r4 += 2;
        } else if (40 === a3 && r4 >= 3 && 108 == (32 | e4.charCodeAt(r4 - 1)) && 114 == (32 | e4.charCodeAt(r4 - 2)) && 117 == (32 | e4.charCodeAt(r4 - 3))) i2 = 1, r4++;
        else if (i2 > 0) 41 === a3 ? i2-- : 40 === a3 && i2++, r4++;
        else if (a3 === Le && r4 + 1 < t3 && e4.charCodeAt(r4 + 1) === Ge) r4 > o3 && n3.push(e4.substring(o3, r4)), o3 = r4 += 2;
        else if (a3 === Ge && r4 + 1 < t3 && e4.charCodeAt(r4 + 1) === Ge) {
          for (r4 > o3 && n3.push(e4.substring(o3, r4)); r4 < t3 && 10 !== e4.charCodeAt(r4); ) r4++;
          o3 = r4;
        } else r4++;
        else r4++;
        else 0 === s4 ? s4 = a3 : s4 === a3 && (s4 = 0), r4++;
      }
      return 0 === o3 ? e4 : (o3 < t3 && n3.push(e4.substring(o3)), n3.join(""));
    })(e3)), l3 = compile(s3 || r3 ? "".concat(s3, " ").concat(r3, " { ").concat(u3, " }") : u3);
    return a2.namespace && (l3 = ze(l3, a2.namespace)), h2 = [], serialize(l3, d2), h2;
  };
  return f2.hash = u2.length ? u2.reduce(function(e3, t3) {
    return t3.name || v(15), F(e3, t3.name);
  }, 5381).toString() : "", f2;
}
var Ye = new Ae(), We = $e(), qe = React.createContext({ shouldForwardProp: void 0, styleSheet: Ye, stylis: We }), He = qe.Consumer, Ue = React.createContext(void 0);
function Je() {
  return React.useContext(qe);
}
function Xe(e2) {
  if (!React.useMemo) return e2.children;
  var t2 = Je().styleSheet, n2 = React.useMemo(function() {
    var n3 = t2;
    return e2.sheet ? n3 = e2.sheet : e2.target && (n3 = n3.reconstructWithOptions({ target: e2.target }, false)), e2.disableCSSOMInjection && (n3 = n3.reconstructWithOptions({ useCSSOMInjection: false })), n3;
  }, [e2.disableCSSOMInjection, e2.sheet, e2.target, t2]), r2 = React.useMemo(function() {
    return $e({ options: { namespace: e2.namespace, prefix: e2.enableVendorPrefixes }, plugins: e2.stylisPlugins });
  }, [e2.enableVendorPrefixes, e2.namespace, e2.stylisPlugins]), s2 = React.useMemo(function() {
    return { shouldForwardProp: e2.shouldForwardProp, styleSheet: n2, stylis: r2 };
  }, [e2.shouldForwardProp, n2, r2]);
  return React.createElement(qe.Provider, { value: s2 }, React.createElement(Ue.Provider, { value: r2 }, e2.children));
}
var Ze = React.createContext(void 0), Ke = Ze.Consumer;
function Qe() {
  var e2 = React.useContext(Ze);
  if (!e2) throw v(18);
  return e2;
}
function et(e2) {
  var n2 = React.useContext(Ze), r2 = React.useMemo(function() {
    return (function(e3, n3) {
      if (!e3) throw v(14);
      if (re(e3)) {
        var o2 = e3(n3);
        if (false) throw v(7);
        return o2;
      }
      if (Array.isArray(e3) || "object" != typeof e3) throw v(8);
      return n3 ? __assign(__assign({}, n3), e3) : e3;
    })(e2.theme, n2);
  }, [e2.theme, n2]);
  return e2.children ? React.createElement(Ze.Provider, { value: r2 }, e2.children) : null;
}
var tt = {}, nt = /* @__PURE__ */ new Set();
function ot(e2, s2, i2) {
  var a2 = se(e2), c2 = e2, u2 = !z(e2), p2 = s2.attrs, h2 = void 0 === p2 ? P : p2, d2 = s2.componentId, f2 = void 0 === d2 ? (function(e3, t2) {
    var n2 = "string" != typeof e3 ? "sc" : x(e3);
    tt[n2] = (tt[n2] || 0) + 1;
    var o2 = "".concat(n2, "-").concat(L(l + n2 + tt[n2]));
    return t2 ? "".concat(t2, "-").concat(o2) : o2;
  })(s2.displayName, s2.parentComponentId) : d2, m2 = s2.displayName, y2 = void 0 === m2 ? (function(e3) {
    return z(e3) ? "styled.".concat(e3) : "Styled(".concat(B(e3), ")");
  })(e2) : m2, v2 = s2.displayName && s2.componentId ? "".concat(x(s2.displayName), "-").concat(s2.componentId) : s2.componentId || f2, g2 = a2 && c2.attrs ? c2.attrs.concat(h2).filter(Boolean) : h2, S2 = s2.shouldForwardProp;
  if (a2 && c2.shouldForwardProp) {
    var w2 = c2.shouldForwardProp;
    if (s2.shouldForwardProp) {
      var b2 = s2.shouldForwardProp;
      S2 = function(e3, t2) {
        return w2(e3, t2) && b2(e3, t2);
      };
    } else S2 = w2;
  }
  var N2 = new Ve(i2, v2, a2 ? c2.componentStyle : void 0);
  function E2(e3, s3) {
    return (function(e4, s4, i3) {
      var a3 = e4.attrs, c3 = e4.componentStyle, u3 = e4.defaultProps, l2 = e4.foldedComponentIds, p3 = e4.styledComponentId, h3 = e4.target, d3 = React.useContext(Ze), f3 = Je(), m3 = e4.shouldForwardProp || f3.shouldForwardProp;
      var y3 = O(s4, d3, u3) || I, v3 = (function(e5, n2, o2) {
        for (var r2, s5 = __assign(__assign({}, n2), { className: void 0, theme: o2 }), i4 = 0; i4 < e5.length; i4 += 1) {
          var a4 = re(r2 = e5[i4]) ? r2(s5) : r2;
          for (var c4 in a4) "className" === c4 ? s5.className = ie(s5.className, a4[c4]) : "style" === c4 ? s5.style = __assign(__assign({}, s5.style), a4[c4]) : c4 in n2 && void 0 === n2[c4] || (s5[c4] = a4[c4]);
        }
        return "className" in n2 && "string" == typeof n2.className && (s5.className = ie(s5.className, n2.className)), s5;
      })(a3, s4, y3), g3 = v3.as || h3, S3 = {};
      for (var w3 in v3) void 0 === v3[w3] || "$" === w3[0] || "as" === w3 || "theme" === w3 && v3.theme === y3 || ("forwardedAs" === w3 ? S3.as = v3.forwardedAs : m3 && !m3(w3, g3) || (S3[w3] = v3[w3], m3 || true));
      var b3 = (function(e5, t2) {
        var n2 = Je(), r2 = e5.generateAndInjectStyles(t2, n2.styleSheet, n2.stylis);
        return false, r2;
      })(c3, v3), N3 = b3.className;
      var E3 = ie(l2, p3);
      return N3 && (E3 += " " + N3), v3.className && (E3 += " " + v3.className), S3[z(g3) && !D.has(g3) ? "class" : "className"] = E3, i3 && (S3.ref = i3), reactExports.createElement(g3, S3);
    })(C2, e3, s3);
  }
  E2.displayName = y2;
  var C2 = React.forwardRef(E2);
  return C2.attrs = g2, C2.componentStyle = N2, C2.displayName = y2, C2.shouldForwardProp = S2, C2.foldedComponentIds = a2 ? ie(c2.foldedComponentIds, c2.styledComponentId) : "", C2.styledComponentId = v2, C2.target = a2 ? c2.target : e2, Object.defineProperty(C2, "defaultProps", { get: function() {
    return this._foldedDefaultProps;
  }, set: function(e3) {
    this._foldedDefaultProps = a2 ? (function(e4) {
      for (var t2 = [], n2 = 1; n2 < arguments.length; n2++) t2[n2 - 1] = arguments[n2];
      for (var o2 = 0, r2 = t2; o2 < r2.length; o2++) ue(e4, r2[o2], true);
      return e4;
    })({}, c2.defaultProps, e3) : e3;
  } }), false, le(C2, function() {
    return ".".concat(C2.styledComponentId);
  }), u2 && oe(C2, e2, { attrs: true, componentStyle: true, displayName: true, foldedComponentIds: true, shouldForwardProp: true, styledComponentId: true, target: true }), C2;
}
function rt(e2, t2) {
  for (var n2 = [e2[0]], o2 = 0, r2 = t2.length; o2 < r2; o2 += 1) n2.push(t2[o2], e2[o2 + 1]);
  return n2;
}
var st = function(e2) {
  return Object.assign(e2, { isCss: true });
};
function it(t2) {
  for (var n2 = [], o2 = 1; o2 < arguments.length; o2++) n2[o2 - 1] = arguments[o2];
  if (re(t2) || ce(t2)) return st(je(rt(P, __spreadArray([t2], n2, true))));
  var r2 = t2;
  return 0 === n2.length && 1 === r2.length && "string" == typeof r2[0] ? je(r2) : st(je(rt(r2, n2)));
}
function at(n2, o2, r2) {
  if (void 0 === r2 && (r2 = I), !o2) throw v(1, o2);
  var s2 = function(t2) {
    for (var s3 = [], i2 = 1; i2 < arguments.length; i2++) s3[i2 - 1] = arguments[i2];
    return n2(o2, r2, it.apply(void 0, __spreadArray([t2], s3, false)));
  };
  return s2.attrs = function(e2) {
    return at(n2, o2, __assign(__assign({}, r2), { attrs: Array.prototype.concat(r2.attrs, e2).filter(Boolean) }));
  }, s2.withConfig = function(e2) {
    return at(n2, o2, __assign(__assign({}, r2), e2));
  }, s2;
}
var ct = function(e2) {
  return at(ot, e2);
}, ut = ct;
D.forEach(function(e2) {
  ut[e2] = ct(e2);
});
var lt, pt = (function() {
  function e2(e3, t2) {
    this.rules = e3, this.componentId = t2, this.isStatic = ke(e3), Ae.registerId(this.componentId + 1);
  }
  return e2.prototype.createStyles = function(e3, t2, n2, o2) {
    var r2 = o2(ae(je(this.rules, t2, n2, o2)), ""), s2 = this.componentId + e3;
    n2.insertRules(s2, s2, r2);
  }, e2.prototype.removeStyles = function(e3, t2) {
    t2.clearRules(this.componentId + e3);
  }, e2.prototype.renderStyles = function(e3, t2, n2, o2) {
    e3 > 2 && Ae.registerId(this.componentId + e3);
    var r2 = this.componentId + e3;
    this.isStatic ? n2.hasNameForId(r2, r2) || this.createStyles(e3, t2, n2, o2) : (this.removeStyles(e3, n2), this.createStyles(e3, t2, n2, o2));
  }, e2;
})();
function ht(n2) {
  for (var r2 = [], s2 = 1; s2 < arguments.length; s2++) r2[s2 - 1] = arguments[s2];
  var i2 = it.apply(void 0, __spreadArray([n2], r2, false)), a2 = "sc-global-".concat(L(JSON.stringify(i2))), c2 = new pt(i2, a2);
  var u2 = /* @__PURE__ */ new WeakMap(), l2 = function(e2) {
    var n3 = Je(), r3 = React.useContext(Ze), s3 = u2.get(n3.styleSheet);
    return void 0 === s3 && (s3 = n3.styleSheet.allocateGSInstance(a2), u2.set(n3.styleSheet, s3)), false, false, React.useLayoutEffect(function() {
      return n3.styleSheet.server || (function(e3, n4, o2, r4, s4) {
        if (c2.isStatic) c2.renderStyles(e3, f, o2, s4);
        else {
          var i3 = __assign(__assign({}, n4), { theme: O(n4, r4, l2.defaultProps) });
          c2.renderStyles(e3, i3, o2, s4);
        }
      })(s3, e2, n3.styleSheet, r3, n3.stylis), function() {
        c2.removeStyles(s3, n3.styleSheet);
      };
    }, [s3, e2, n3.styleSheet, r3, n3.stylis]), null;
  };
  return React.memo(l2);
}
var dt = (function() {
  function e2(e3, t2) {
    var n2 = this;
    this[lt] = true, this.inject = function(e4, t3) {
      void 0 === t3 && (t3 = We);
      var o2 = n2.name + t3.hash;
      e4.hasNameForId(n2.id, o2) || e4.insertRules(n2.id, o2, t3(n2.rules, o2, "@keyframes"));
    }, this.name = e3, this.id = "sc-keyframes-".concat(e3), this.rules = t2, le(this, function() {
      throw v(12, String(n2.name));
    });
  }
  return e2.prototype.getName = function(e3) {
    return void 0 === e3 && (e3 = We), this.name + e3.hash;
  }, e2;
})();
function ft(t2) {
  for (var n2 = [], o2 = 1; o2 < arguments.length; o2++) n2[o2 - 1] = arguments[o2];
  var r2 = ae(it.apply(void 0, __spreadArray([t2], n2, false))), s2 = L(r2);
  return new dt(s2, r2);
}
function mt(e2) {
  var n2 = React.forwardRef(function(n3, r2) {
    var s2 = O(n3, React.useContext(Ze), e2.defaultProps);
    return false, React.createElement(e2, __assign(__assign({}, n3), { theme: s2, ref: r2 }));
  });
  return n2.displayName = "WithTheme(".concat(B(e2), ")"), oe(n2, e2);
}
lt = De;
var yt = (function() {
  function e2() {
    var e3 = this;
    this._emitSheetCSS = function() {
      var t2 = e3.instance.toString();
      if (!t2) return "";
      var n2 = Se(), o2 = ae([n2 && 'nonce="'.concat(n2, '"'), "".concat(a, '="true"'), "".concat(u, '="').concat(l, '"')].filter(Boolean), " ");
      return "<style ".concat(o2, ">").concat(t2, "</style>");
    }, this.getStyleTags = function() {
      if (e3.sealed) throw v(2);
      return e3._emitSheetCSS();
    }, this.getStyleElement = function() {
      var n2;
      if (e3.sealed) throw v(2);
      var r2 = e3.instance.toString();
      if (!r2) return [];
      var s2 = ((n2 = {})[a] = "", n2[u] = l, n2.dangerouslySetInnerHTML = { __html: r2 }, n2), i2 = Se();
      return i2 && (s2.nonce = i2), [React.createElement("style", __assign({}, s2, { key: "sc-0-0" }))];
    }, this.seal = function() {
      e3.sealed = true;
    }, this.instance = new Ae({ isServer: true }), this.sealed = false;
  }
  return e2.prototype.collectStyles = function(e3) {
    if (this.sealed) throw v(2);
    return React.createElement(Xe, { sheet: this.instance }, e3);
  }, e2.prototype.interleaveWithNodeStream = function(e3) {
    throw v(3);
  }, e2;
})(), vt = { StyleSheet: Ae, mainSheet: Ye };
var gt = "__sc-".concat(a, "__");

export { et as e, it as i, ut as u };
//# sourceMappingURL=styled-components.browser.esm-DEl3sloC.js.map
