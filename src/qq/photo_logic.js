(window.constructQZFL = function () {
    window.QZFL = window.QZONE = window.QZFL || window.QZONE || {};
    QZFL.version = "2.1.1.7";
    QZFL._qzfl = 2.117;
    QZFL.emptyFn = function () {
    };
    QZFL.returnFn = function (v) {
        return v;
    };
    (function () {
        var ua = QZFL.userAgent = {}, agent = navigator.userAgent, nv = navigator.appVersion, r, m, optmz;
        ua.adjustBehaviors = QZFL.emptyFn;
        if (window.ActiveXObject || window.msIsStaticHTML) {
            ua.ie = 6;
            (window.XMLHttpRequest || (agent.indexOf('MSIE 7.0') > -1)) && (ua.ie = 7);
            (window.XDomainRequest || (agent.indexOf('Trident/4.0') > -1)) && (ua.ie = 8);
            (agent.indexOf('Trident/5.0') > -1) && (ua.ie = 9);
            (agent.indexOf('Trident/6.0') > -1) && (ua.ie = 10);
            (agent.indexOf('Trident/7.0') > -1) && (ua.ie = 11);
            ua.isBeta = navigator.appMinorVersion && navigator.appMinorVersion.toLowerCase().indexOf('beta') > -1;
            if (ua.ie < 7) {
                try {
                    document.execCommand('BackgroundImageCache', false, true);
                } catch (ign) {
                }
            }
            QZFL._doc = document;
            optmz = function (st) {
                return function (fns, tm) {
                    var aargs;
                    if (typeof fns == 'string') {
                        return st(fns, tm);
                    } else {
                        aargs = Array.prototype.slice.call(arguments, 2);
                        return st(function () {
                            fns.apply(null, aargs);
                        }, tm);
                    }
                };
            };
            window.setTimeout = QZFL._setTimeout = optmz(window.setTimeout);
            window.setInterval = QZFL._setInterval = optmz(window.setInterval);
        } else if (document.getBoxObjectFor || typeof(window.mozInnerScreenX) != 'undefined') {
            r = /(?:Firefox|GranParadiso|Iceweasel|Minefield).(\d+\.\d+)/i;
            ua.firefox = parseFloat((r.exec(agent) || r.exec('Firefox/3.3'))[1], 10);
        } else if (!navigator.taintEnabled) {
            m = /AppleWebKit.(\d+\.\d+)/i.exec(agent);
            ua.webkit = m ? parseFloat(m[1], 10) : (document.evaluate ? (document.querySelector ? 525 : 420) : 419);
            if ((m = /Chrome.(\d+\.\d+)/i.exec(agent)) || window.chrome) {
                ua.chrome = m ? parseFloat(m[1], 10) : '2.0';
            } else if ((m = /Version.(\d+\.\d+)/i.exec(agent)) || window.safariHandler) {
                ua.safari = m ? parseFloat(m[1], 10) : '3.3';
            }
            ua.air = agent.indexOf('AdobeAIR') > -1 ? 1 : 0;
            ua.isiPod = agent.indexOf('iPod') > -1;
            ua.isiPad = agent.indexOf('iPad') > -1;
            ua.isiPhone = agent.indexOf('iPhone') > -1;
        } else if (window.opera) {
            ua.opera = parseFloat(window.opera.version(), 10);
        } else {
            ua.ie = 6;
        }
        if (!(ua.macs = agent.indexOf('Mac OS X') > -1)) {
            ua.windows = ((m = /Windows.+?(\d+\.\d+)/i.exec(agent)), m && parseFloat(m[1], 10));
            ua.linux = agent.indexOf('Linux') > -1;
            ua.android = agent.indexOf('Android') > -1;
        }
        ua.iOS = agent.indexOf('iPhone OS') > -1;
        !ua.iOS && (m = /OS (\d+(?:_\d+)*) like Mac OS X/i.exec(agent), ua.iOS = m && m[1] ? true : false);
    })();
    QZFL.object = {map: function (object, scope) {
        return QZFL.object.extend(scope || window, object);
    }, extend: function () {
        var args = arguments, len = arguments.length, deep = false, i = 1, target = args[0], opts, src, clone, copy;
        if (typeof target === "boolean") {
            deep = target;
            target = arguments[1] || {};
            i = 2;
        }
        if (typeof target !== "object" && typeof target !== "function") {
            target = {};
        }
        if (len === i) {
            target = QZFL;
            --i;
        }
        for (; i < len; i++) {
            if ((opts = arguments[i]) != null) {
                for (var name in opts) {
                    src = target[name];
                    copy = opts[name];
                    if (target === copy) {
                        continue;
                    }
                    if (deep && copy && typeof copy === "object" && !copy.nodeType) {
                        if (src) {
                            clone = src;
                        } else if (QZFL.lang.isArray(copy)) {
                            clone = [];
                        } else if (QZFL.object.getType(copy) === 'object') {
                            clone = {};
                        } else {
                            clone = copy;
                        }
                        target[name] = QZFL.object.extend(deep, clone, copy);
                    } else if (copy !== undefined) {
                        target[name] = copy;
                    }
                }
            }
        }
        return target;
    }, each: function (obj, callback) {
        var value, i = 0, length = obj.length, isObj = (length === undefined) || (typeof(obj) == "function");
        if (isObj) {
            for (var name in obj) {
                if (callback.call(obj[name], obj[name], name, obj) === false) {
                    break;
                }
            }
        } else {
            for (value = obj[0]; i < length && false !== callback.call(value, value, i, obj); value = obj[++i]) {
            }
        }
        return obj;
    }, getType: function (obj) {
        return obj === null ? 'null' : (obj === undefined ? 'undefined' : Object.prototype.toString.call(obj).slice(8, -1).toLowerCase());
    }, routeRE: /([\d\w_]+)/g, route: function (obj, path) {
        obj = obj || {};
        path = String(path);
        var r = QZFL.object.routeRE, m;
        r.lastIndex = 0;
        while ((m = r.exec(path)) !== null) {
            obj = obj[m[0]];
            if (obj === undefined || obj === null) {
                break;
            }
        }
        return obj;
    }, bind: function (obj, fn) {
        var slice = Array.prototype.slice, args = slice.call(arguments, 2);
        return function () {
            obj = obj || this;
            fn = typeof fn == 'string' ? obj[fn] : fn;
            fn = typeof fn == 'function' ? fn : QZFL.emptyFn;
            return fn.apply(obj, args.concat(slice.call(arguments, 0)));
        };
    }, ease: function (src, tar, rule) {
        if (tar) {
            if (typeof(rule) != 'function') {
                rule = QZFL.object._eachFn;
            }
            QZFL.object.each(src, function (v, k) {
                if (typeof(v) == 'function') {
                    tar[rule(k)] = v;
                }
            });
        }
    }, _easeFn: function (name) {
        return'$' + name;
    }};
    QZFL.namespace = QZFL.object;
    QZFL.runTime = {isDebugMode: false, error: QZFL.emptyFn, warn: QZFL.emptyFn};
    QZFL.console = window.console || {};
    QZFL.console.log = QZFL.console.log || function () {
    };
    QZFL.console.print = QZFL.console.log;
    QZFL.widget = {};
    QZFL.object.map(QZFL.object, QZFL);
    (function (w) {
        QZFL.config = QZFL.config || {};
        var preFix, cw = w;
        do {
            try {
                cw.siDomain && (QZFL.config.resourceDomain = cw.siDomain.replace("http://", "").split("/")[0]);
                cw.imgcacheDomain && (QZFL.config.domain = cw.imgcacheDomain.replace("http://", "").split("/")[0]);
            } catch (err) {
                break;
            }
        } while ((cw !== cw.parent) && (cw = cw.parent));
        QZFL.config.defaultMediaRate = 2;
    })(window);
    QZFL.config = QZFL.config || {};
    (typeof QZFL.config.debugLevel == 'undefined') && (QZFL.config.debugLevel = 0);
    (typeof QZFL.config.defaultDataCharacterSet == 'undefined') && (QZFL.config.defaultDataCharacterSet = "GB2312");
    (typeof QZFL.config.DCCookieDomain == 'undefined') && (QZFL.config.DCCookieDomain = "qzone.qq.com");
    (typeof QZFL.config.domainPrefix == 'undefined') && (QZFL.config.domainPrefix = "qq.com");
    (typeof QZFL.config.domain == 'undefined') && (QZFL.config.domain = "qzs.qq.com");
    if (location.host.indexOf("qzone.qq.com") >= 0) {
        (typeof QZFL.config.domainPrefix == 'undefined') && (QZFL.config.domainPrefix = "qzone.qq.com");
        (typeof QZFL.config.domain == 'undefined') && (QZFL.config.domain = "qzs.qzone.qq.com");
    }
    (typeof QZFL.config.resourceDomain == 'undefined') && (QZFL.config.resourceDomain = "qzonestyle.gtimg.cn");
    QZFL.config.gbEncoderPath = "http://" + QZFL.config.domain + "/qzone/v5/toolpages/";
    QZFL.config.FSHelperPage = "http://" + QZFL.config.domain + "/qzone/v5/toolpages/fp_gbk.html";
    QZFL.config.defaultShareObject = "http://" + QZFL.config.resourceDomain + "/qzone/v5/toolpages/getset.swf";
    QZFL.config.staticServer = "http://" + QZFL.config.resourceDomain + "/ac/qzone/qzfl/lc/";
    QZFL.css = {classFileNameCache: {}, convertHexColor: function (color) {
        color = String(color || '');
        color.charAt(0) == '#' && (color = color.substring(1));
        color.length == 3 && (color = color.replace(/([0-9a-f])/ig, '$1$1'));
        return color.length == 6 ? [parseInt(color.substr(0, 2), 16), parseInt(color.substr(2, 2), 16), parseInt(color.substr(4, 2), 16)] : [0, 0, 0];
    }, rgb2hsl: function (r, g, b) {
        var t, red = Math.max(r / 255, 0), green = Math.max(g / 255, 0), blue = Math.max(b / 255, 0), max = Math.max(red, green, blue), min = Math.min(red, green, blue), result = {h: 0, s: 0, l: Math.max((max + min) / 2, 0)};
        if (max != min) {
            if (max == red) {
                result.h = (t = 60 * ((green - blue) / (max - min))) < 0 ? (t + 360) : t;
            } else if (max == green) {
                result.h = (60 * ((blue - red) / (max - min)) + 120);
            } else if (max == blue) {
                result.h = (60 * ((red - green) / (max - min)) + 240);
            }
            if (result.l <= 0.5) {
                result.s = (max - min) / (2 * result.l);
            } else if (0.5 < result.l) {
                result.s = (max - min) / (2 - 2 * result.l);
            }
            result.h = Math.round(result.h);
            result.s = Math.round(result.s * 100) / 100;
            result.l = Math.round(result.l * 100) / 100;
        }
        return result;
    }, getStyleSheetById: function (id) {
        var s;
        return(s = QZFL.dom.get(id)) && s.sheet || (s = document.styleSheets) && s[id];
    }, getRulesBySheet: function (sheetId) {
        var ss = typeof(sheetId) == "object" ? sheetId : QZFL.css.getStyleSheetById(sheetId), rs = {}, head, base;
        if (ss && !(rs = ss.cssRules || ss.rules)) {
            if (head = document.getElementsByTagName('head')[0]) {
                if (base = head.getElementsByTagName('base')[0]) {
                    QZFL.dom.removeElement(base);
                    rs = ss.cssRules;
                    head.appendChild(base);
                }
            }
        }
        return rs;
    }, getRuleBySelector: function (sheetId, selector) {
        selector = (String(selector)).toLowerCase();
        var _ss = QZFL.css.getStyleSheetById(sheetId), _rs = QZFL.css.getRulesBySheet(_ss);
        for (var i = 0, len = _rs.length; i < len; ++i) {
            if (selector == _rs[i].selectorText.toLowerCase()) {
                return _rs[i];
            }
        }
        return null;
    }, insertCSSLink: function (url, opts) {
        var sid, doc, t, cssLink, head;
        if (QZFL.css.classFileNameCache[url]) {
            return;
        }
        if (typeof opts == "string") {
            sid = opts;
        }
        opts = (typeof opts == "object") ? opts : {};
        sid = opts.linkID || sid;
        doc = opts.doc || document;
        head = doc.getElementsByTagName("head")[0];
        cssLink = ((t = doc.getElementById(sid)) && (t.nodeName == "LINK")) ? t : null;
        if (!cssLink) {
            cssLink = doc.createElement("link");
            sid && (cssLink.id = sid);
            cssLink.rel = cssLink.rev = "stylesheet";
            cssLink.type = "text/css";
            cssLink.media = opts.media || "screen";
            head.appendChild(cssLink);
        }
        try {
            url && (cssLink.href = url);
        } catch (ign) {
        }
        QZFL.css.classFileNameCache[url] = true;
        return(QZFL.userAgent.ie < 9 && cssLink.sheet) || cssLink;
    }, insertStyleSheet: function (sheetId, rules) {
        var node = document.createElement("style");
        node.type = 'text/css';
        sheetId && (node.id = sheetId);
        document.getElementsByTagName("head")[0].appendChild(node);
        if (rules) {
            if (node.styleSheet) {
                node.styleSheet.cssText = rules;
            } else {
                node.appendChild(document.createTextNode(rules));
            }
        }
        return node.sheet || node;
    }, removeStyleSheet: function (id) {
        var _ss = QZFL.css.getStyleSheetById(id);
        _ss && QZFL.dom.removeElement(_ss.owningElement || _ss.ownerNode);
    }, _reClassToken: /\s+/, updateClassName: function (elem, removeNames, addNames) {
        if (!elem || elem.nodeType != 1) {
            return"";
        }
        var oriName = elem.className, _s = QZFL.css, ar, b;
        if (removeNames && typeof(removeNames) == 'string' || addNames && typeof(addNames) == 'string') {
            if (removeNames == '*') {
                oriName = '';
            } else {
                ar = oriName.split(_s._reClassToken);
                var i = 0, l = ar.length, n;
                oriName = {};
                for (; i < l; ++i) {
                    ar[i] && (oriName[ar[i]] = true);
                }
                if (addNames) {
                    ar = addNames.split(_s._reClassToken);
                    l = ar.length;
                    for (i = 0; i < l; ++i) {
                        (n = ar[i]) && !oriName[n] && (b = oriName[n] = true);
                    }
                }
                if (removeNames) {
                    ar = removeNames.split(_s._reClassToken);
                    l = ar.length;
                    for (i = 0; i < l; i++) {
                        (n = ar[i]) && oriName[n] && (b = true) && delete oriName[n];
                    }
                }
            }
            if (b) {
                ar.length = 0;
                for (var k in oriName) {
                    ar.push(k);
                }
                oriName = ar.join(' ');
                elem.className = oriName;
            }
        }
        return oriName;
    }, hasClassName: function (elem, name) {
        return(elem && name) ? (elem.classList ? elem.classList.contains(name) : (name && ((' ' + elem.className + ' ').indexOf(' ' + name + ' ') > -1))) : false;
    }, addClassName: function (elem, names) {
        var _s = QZFL.css;
        return names && ((elem && elem.classList && !_s._reClassToken.test(names)) ? elem.classList.add(names) : _s.updateClassName(elem, null, names));
    }, removeClassName: function (elem, names) {
        var _s = QZFL.css;
        return names && ((elem && elem.classList && !_s._reClassToken.test(names)) ? elem.classList.remove(names) : _s.updateClassName(elem, names));
    }, replaceClassName: function (elems, a, b) {
        QZFL.css.swapClassName(elems, a, b, true);
    }, swapClassName: function (elems, a, b, _isRep) {
        if (elems && typeof(elems) == "object") {
            if (elems.length === undefined) {
                elems = [elems];
            }
            for (var elem, i = 0, l = elems.length; i < l; ++i) {
                if ((elem = elems[i]) && elem.nodeType == 1) {
                    if (QZFL.css.hasClassName(elem, a)) {
                        QZFL.css.updateClassName(elem, a, b);
                    } else if (!_isRep && QZFL.css.hasClassName(elem, b)) {
                        QZFL.css.updateClassName(elem, b, a);
                    }
                }
            }
        }
    }, toggleClassName: function (elem, name) {
        if (!elem || elem.nodeType != 1) {
            return;
        }
        var _s = QZFL.css;
        if (elem.classList && name && !_s._reClassToken.test(name)) {
            return elem.classList.toggle(name);
        }
        if (_s.hasClassName(elem, name)) {
            _s.updateClassName(elem, name);
        } else {
            _s.updateClassName(elem, null, name);
        }
    }};
    QZFL.dom = {getById: function (id) {
        return document.getElementById(id);
    }, getByName: function (name, tagName, rt) {
        return QZFL.selector((tagName || "") + '[name="' + name + '"]', rt);
    }, get: function (e) {
        return(typeof(e) == "string") ? document.getElementById(e) : e;
    }, getNode: function (e) {
        return(e && (e.nodeType || e.item)) ? e : document.getElementById(e);
    }, removeElement: function (elem) {
        if (elem = QZFL.dom.get(elem)) {
            if (QZFL.userAgent.ie > 8 && elem.tagName == "SCRIPT") {
                elem.src = "";
            }
            elem.removeNode ? elem.removeNode(true) : (elem.parentNode && elem.parentNode.removeChild(elem));
        }
        return elem = null;
    }, searchChain: function (elem, prop, func) {
        prop = prop || 'parentNode';
        while (elem && elem.nodeType && elem.nodeType == 1) {
            if (!func || func.call(elem, elem)) {
                return elem;
            }
            elem = elem[prop];
        }
        return null;
    }, searchElementByClassName: function (elem, className) {
        elem = QZFL.dom.get(elem);
        return QZFL.dom.searchChain(elem, 'parentNode', function (el) {
            return QZFL.css.hasClassName(el, className);
        });
    }, getElementsByClassName: function (className, tagName, context) {
        return QZFL.selector((tagName || '') + '.' + className, QZFL.dom.get(context));
    }, isAncestor: function (a, b) {
        return a && b && a != b && QZFL.dom.contains(a, b);
    }, getAncestorBy: function (elem, method) {
        elem = QZFL.dom.get(elem);
        return QZFL.dom.searchChain(elem.parentNode, 'parentNode', function (el) {
            return el.nodeType == 1 && (!method || method(el));
        });
    }, getFirstChild: function (elem) {
        elem = QZFL.dom.get(elem);
        return elem.firstElementChild || QZFL.dom.searchChain(elem && elem.firstChild, 'nextSibling', function (el) {
            return el.nodeType == 1;
        });
    }, getLastChild: function (elem) {
        elem = QZFL.dom.get(elem);
        return elem.lastElementChild || QZFL.dom.searchChain(elem && elem.lastChild, 'previousSibling', function (el) {
            return el.nodeType == 1;
        });
    }, getNextSibling: function (elem) {
        elem = QZFL.dom.get(elem);
        return elem.nextElementSibling || QZFL.dom.searchChain(elem && elem.nextSibling, 'nextSibling', function (el) {
            return el.nodeType == 1;
        });
    }, getPreviousSibling: function (elem) {
        elem = QZFL.dom.get(elem);
        return elem.previousElementSibling || QZFL.dom.searchChain(elem && elem.previousSibling, 'previousSibling', function (el) {
            return el.nodeType == 1;
        });
    }, swapNode: function (node1, node2) {
        if (node1.swapNode) {
            node1.swapNode(node2);
        } else {
            var prt = node2.parentNode, next = node2.nextSibling;
            if (next == node1) {
                prt.insertBefore(node1, node2);
            } else if (node2 == node1.nextSibling) {
                prt.insertBefore(node2, node1);
            } else {
                node1.parentNode.replaceChild(node2, node1);
                prt.insertBefore(node1, next);
            }
        }
    }, createElementIn: function (tagName, elem, insertFirst, attrs) {
        var _e = (elem = QZFL.dom.get(elem) || document.body).ownerDocument.createElement(tagName || "div"), k;
        if (typeof(attrs) == 'object') {
            for (k in attrs) {
                if (k == "class") {
                    _e.className = attrs[k];
                } else if (k == "style") {
                    _e.style.cssText = attrs[k];
                } else {
                    _e[k] = attrs[k];
                }
            }
        }
        insertFirst ? elem.insertBefore(_e, elem.firstChild) : elem.appendChild(_e);
        return _e;
    }, getStyle: function (el, property) {
        el = QZFL.dom.get(el);
        if (!el || el.nodeType == 9) {
            return null;
        }
        var w3cMode = document.defaultView && document.defaultView.getComputedStyle, computed = !w3cMode ? null : document.defaultView.getComputedStyle(el, ''), value = "";
        switch (property) {
            case"float":
                property = w3cMode ? "cssFloat" : "styleFloat";
                break;
            case"opacity":
                if (!w3cMode) {
                    var val = 100;
                    try {
                        val = el.filters['DXImageTransform.Microsoft.Alpha'].opacity;
                    } catch (e) {
                        try {
                            val = el.filters('alpha').opacity;
                        } catch (e) {
                        }
                    }
                    return val / 100;
                } else {
                    return parseFloat((computed || el.style)[property]);
                }
                break;
            case"backgroundPositionX":
                if (w3cMode) {
                    property = "backgroundPosition";
                    return((computed || el.style)[property]).split(" ")[0];
                }
                break;
            case"backgroundPositionY":
                if (w3cMode) {
                    property = "backgroundPosition";
                    return((computed || el.style)[property]).split(" ")[1];
                }
                break;
        }
        if (w3cMode) {
            return(computed || el.style)[property];
        } else {
            return(el.currentStyle[property] || el.style[property]);
        }
    }, setStyle: function (el, properties, value) {
        var DOM = QZFL.dom;
        if (!(el = DOM.get(el)) || el.nodeType != 1) {
            return false;
        }
        var tmp, bRtn = true, re;
        if (typeof(properties) == 'string') {
            tmp = properties;
            properties = {};
            properties[tmp] = value;
        }
        for (var prop in properties) {
            value = properties[prop];
            re = DOM.convertStyle(el, prop, value);
            prop = re.prop;
            value = re.value;
            if (typeof el.style[prop] != "undefined") {
                el.style[prop] = value;
                bRtn = bRtn && true;
            } else {
                bRtn = bRtn && false;
            }
        }
        return bRtn;
    }, convertStyle: function (el, prop, value) {
        var DOM = QZFL.dom, tmp, rexclude = /z-?index|font-?weight|opacity|zoom|line-?height/i, w3cMode;
        w3cMode = ((tmp = document.defaultView) && tmp.getComputedStyle);
        if (prop == 'float') {
            prop = w3cMode ? "cssFloat" : "styleFloat";
        } else if (prop == 'opacity') {
            if (!w3cMode) {
                prop = 'filter';
                value = value >= 1 ? '' : ('alpha(opacity=' + Math.round(value * 100) + ')');
            }
        } else if (prop == 'backgroundPositionX' || prop == 'backgroundPositionY') {
            tmp = prop.slice(-1) == 'X' ? 'Y' : 'X';
            if (w3cMode) {
                var v = QZFL.dom.getStyle(el, "backgroundPosition" + tmp);
                prop = 'backgroundPosition';
                typeof(value) == 'number' && (value = value + 'px');
                value = tmp == 'Y' ? (value + " " + (v || "top")) : ((v || 'left') + " " + value);
            }
        }
        value += (typeof value === "number" && !rexclude.test(prop) ? 'px' : '');
        return{'prop': prop, 'value': value};
    }, createNamedElement: function (type, name, doc) {
        var _doc = doc || document, element;
        try {
            element = _doc.createElement('<' + type + ' name="' + name + '">');
        } catch (ign) {
        }
        if (!element) {
            element = _doc.createElement(type);
        }
        if (!element.name) {
            element.name = name;
        }
        return element;
    }, getRect: function (elem) {
        if (elem = QZFL.dom.get(elem)) {
            var box = QZFL.object.extend({}, elem.getBoundingClientRect());
            if (typeof box.width == 'undefined') {
                box.width = box.right - box.left;
                box.height = box.bottom - box.top;
            }
            return box;
        }
    }, getPosition: function (elem) {
        var box, s, doc;
        if (box = QZFL.dom.getRect(elem)) {
            if (s = QZFL.dom.getScrollLeft(doc = elem.ownerDocument)) {
                box.left += s, box.right += s;
            }
            if (s = QZFL.dom.getScrollTop(doc)) {
                box.top += s, box.bottom += s;
            }
            return box;
        }
    }, setPosition: function (el, pos) {
        QZFL.dom.setXY(el, pos['left'], pos['top']);
        QZFL.dom.setSize(el, pos['width'], pos['height']);
    }, getXY: function (elem) {
        var box = QZFL.dom.getPosition(elem) || {left: 0, top: 0};
        return[box.left, box.top];
    }, getSize: function (elem) {
        var box = QZFL.dom.getPosition(elem) || {width: -1, height: -1};
        return[box.width, box.height];
    }, setXY: function (elem, x, y) {
        var _ml = parseInt(QZFL.dom.getStyle(elem, "marginLeft")) || 0, _mt = parseInt(QZFL.dom.getStyle(elem, "marginTop")) || 0;
        QZFL.dom.setStyle(elem, {left: ((parseInt(x, 10) || 0) - _ml) + "px", top: ((parseInt(y, 10) || 0) - _mt) + "px"});
    }, getScrollLeft: function (doc) {
        var _doc = doc || document;
        return(_doc.defaultView && _doc.defaultView.pageXOffset) || Math.max(_doc.documentElement.scrollLeft, _doc.body.scrollLeft);
    }, getScrollTop: function (doc) {
        var _doc = doc || document;
        return(_doc.defaultView && _doc.defaultView.pageYOffset) || Math.max(_doc.documentElement.scrollTop, _doc.body.scrollTop);
    }, getScrollHeight: function (doc) {
        var _doc = doc || document;
        return Math.max(_doc.documentElement.scrollHeight, _doc.body.scrollHeight);
    }, getScrollWidth: function (doc) {
        var _doc = doc || document;
        return Math.max(_doc.documentElement.scrollWidth, _doc.body.scrollWidth);
    }, setScrollLeft: function (value, doc) {
        var _doc = doc || document;
        _doc[_doc.compatMode == "CSS1Compat" && !QZFL.userAgent.webkit ? "documentElement" : "body"].scrollLeft = value;
    }, setScrollTop: function (value, doc) {
        var _doc = doc || document;
        _doc[_doc.compatMode == "CSS1Compat" && !QZFL.userAgent.webkit ? "documentElement" : "body"].scrollTop = value;
    }, getClientHeight: function (doc) {
        var _doc = doc || document;
        return _doc.compatMode == "CSS1Compat" ? _doc.documentElement.clientHeight : _doc.body.clientHeight;
    }, getClientWidth: function (doc) {
        var _doc = doc || document;
        return _doc.compatMode == "CSS1Compat" ? _doc.documentElement.clientWidth : _doc.body.clientWidth;
    }, _SET_SIZE_RE: /^\d+(?:\.\d*)?(px|%|em|in|cm|mm|pc|pt)?$/, setSize: function (el, w, h) {
        el = QZFL.dom.get(el);
        var _r = QZFL.dom._SET_SIZE_RE, m;
        QZFL.dom.setStyle(el, "width", (m = _r.exec(w)) ? (m[1] ? w : (parseInt(w, 10) + 'px')) : 'auto');
        QZFL.dom.setStyle(el, "height", (m = _r.exec(h)) ? (m[1] ? h : (parseInt(h, 10) + 'px')) : 'auto');
    }, getDocumentWindow: function (doc) {
        var _doc = doc || document;
        return _doc.parentWindow || _doc.defaultView;
    }, getElementsByTagNameNS: function (node, ns, tgn) {
        node = node || document;
        var res = [];
        if (node.getElementsByTagNameNS) {
            return node.getElementsByTagName(ns + ":" + tgn);
        } else if (node.getElementsByTagName) {
            var n = document.namespaces;
            if (n.length > 0) {
                var l = node.getElementsByTagName(tgn);
                for (var i = 0, len = l.length; i < len; ++i) {
                    if (l[i].scopeName == ns) {
                        res.push(l[i]);
                    }
                }
            }
        }
        return res;
    }, getElementByTagNameBubble: function (elem, tn) {
        if (!tn) {
            return null;
        }
        var maxLv = 15;
        tn = String(tn).toUpperCase();
        if (tn == 'BODY') {
            return document.body;
        }
        elem = QZFL.dom.searchChain(elem = QZFL.dom.get(elem), 'parentNode', function (el) {
            return el.tagName == tn || el.tagName == 'BODY' || (--maxLv) < 0;
        });
        return!elem || maxLv < 0 ? null : elem;
    }, insertAdjacent: function (elem, where, html, isText) {
        var range, pos = ['beforeBegin', 'afterBegin', 'beforeEnd', 'afterEnd'], doc;
        if (QZFL.lang.isElement(elem) && pos[where] && (QZFL.lang.isString(html) || QZFL.lang.isElement(html))) {
            if (elem.insertAdjacentHTML && elem.insertAdjacentElement && elem.insertAdjacentText) {
                elem['insertAdjacent' + (typeof(html) == 'object' ? 'Element' : (isText ? 'Text' : 'HTML'))](pos[where], html);
            } else {
                range = (doc = elem.ownerDocument).createRange();
                range[where == 1 || where == 2 ? 'selectNodeContents' : 'selectNode'](elem);
                range.collapse(where < 2);
                range.insertNode(typeof(html) != 'string' ? html : isText ? doc.createTextNode(html) : range.createContextualFragment(html));
            }
            return true;
        }
        return false;
    }};
    QZFL.event = {KEYS: {BACKSPACE: 8, TAB: 9, RETURN: 13, ESC: 27, SPACE: 32, LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40, DELETE: 46}, _eventListDictionary: {}, _fnSeqUID: 0, _objSeqUID: 0, addEvent: function (obj, eventType, fn, argArray) {
        var cfn, res = false, l, handlers, efn, sTime;
        if (!obj) {
            return res;
        }
        if (!obj.eventsListUID) {
            obj.eventsListUID = "e" + (++QZFL.event._objSeqUID);
        }
        if (!(l = QZFL.event._eventListDictionary[obj.eventsListUID])) {
            l = QZFL.event._eventListDictionary[obj.eventsListUID] = {};
        }
        if (!fn.__elUID) {
            fn.__elUID = "e" + (++QZFL.event._fnSeqUID) + obj.eventsListUID;
        }
        if (QZFL.userAgent.isiPad && ((eventType == 'mouseover') || (eventType == 'mouseout'))) {
            cfn = function (evt) {
                sTime = new Date().getTime();
            }
            l['_' + eventType] = fn;
            if (l._ipadBind) {
                return false;
            }
            eventType = 'touchstart';
            l._ipadBind = 1;
            efn = function (evt) {
                var t = new Date().getTime() - sTime, fn;
                if (t < 700) {
                    fn = l._mouseover;
                    if (l._ismouseover) {
                        fn = l._mouseout;
                        l._ismouseover = 0
                    } else {
                        l._ismouseover = 1;
                    }
                    QZFL.event.preventDefault(evt);
                    return fn && fn.apply(obj, !argArray ? [QZFL.event.getEvent(evt)] : ([QZFL.event.getEvent(evt)]).concat(argArray));
                }
                return true;
            }
            QZFL.event.addEvent(obj, 'touchend', efn);
        }
        if (!l[eventType]) {
            l[eventType] = {};
        }
        if (!l[eventType].handlers) {
            l[eventType].handlers = {};
        }
        handlers = l[eventType].handlers;
        if (typeof(handlers[fn.__elUID]) == 'function') {
            return false;
        }
        cfn = cfn || function (evt) {
            return fn.apply(obj, !argArray ? [QZFL.event.getEvent(evt)] : ([QZFL.event.getEvent(evt)]).concat(argArray));
        };
        if (obj.addEventListener) {
            obj.addEventListener(eventType, cfn, false);
            res = true;
        } else if (obj.attachEvent) {
            res = obj.attachEvent("on" + eventType, cfn);
        } else {
            res = false;
        }
        if (res) {
            handlers[fn.__elUID] = cfn;
        }
        return res;
    }, trigger: function (obj, eventType) {
        var l = obj && QZFL.event._eventListDictionary[obj.eventsListUID], handlers = l && l[eventType] && l[eventType].handlers, i;
        if (handlers) {
            try {
                for (i in handlers) {
                    handlers[i].call(window, {});
                }
            } catch (evt) {
                QZFL.console.print('QZFL.event.trigger error')
            }
        }
    }, removeEvent: function (obj, eventType, fn) {
        var cfn = fn, res = false, l = QZFL.event._eventListDictionary, r;
        if (!obj) {
            return res;
        }
        if (!fn) {
            return QZFL.event.purgeEvent(obj, eventType);
        }
        if (obj.eventsListUID && l[obj.eventsListUID] && l[obj.eventsListUID][eventType]) {
            l = l[obj.eventsListUID][eventType].handlers;
            if (l && l[fn.__elUID]) {
                cfn = l[fn.__elUID];
                r = l;
            }
        }
        if (obj.removeEventListener) {
            obj.removeEventListener(eventType, cfn, false);
            res = true;
        } else if (obj.detachEvent) {
            obj.detachEvent("on" + eventType, cfn);
            res = true;
        } else {
            return false;
        }
        if (res && r && r[fn.__elUID]) {
            delete r[fn.__elUID];
        }
        return res;
    }, purgeEvent: function (obj, type) {
        var l, h;
        if (obj.eventsListUID && (l = QZFL.event._eventListDictionary[obj.eventsListUID]) && l[type] && (h = l[type].handlers)) {
            for (var k in h) {
                if (obj.removeEventListener) {
                    obj.removeEventListener(type, h[k], false);
                } else if (obj.detachEvent) {
                    obj.detachEvent('on' + type, h[k]);
                }
            }
        }
        if (obj['on' + type]) {
            obj['on' + type] = null;
        }
        if (h) {
            l[type].handlers = null;
            delete l[type].handlers;
        }
        return true;
    }, getEvent: function (evt) {
        var evt = window.event || evt || null, c, _s = QZFL.event.getEvent, ct = 0;
        if (!evt) {
            c = arguments.callee;
            while (c && ct < _s.MAX_LEVEL) {
                if (c.arguments && (evt = c.arguments[0]) && (typeof(evt.button) != "undefined" && typeof(evt.ctrlKey) != "undefined")) {
                    break;
                }
                ++ct;
                c = c.caller;
            }
        }
        return evt;
    }, getButton: function (evt) {
        var e = QZFL.event.getEvent(evt);
        if (!e) {
            return-1
        }
        if (QZFL.userAgent.ie) {
            return e.button - Math.ceil(e.button / 2);
        } else {
            return e.button;
        }
    }, getTarget: function (evt) {
        var e = QZFL.event.getEvent(evt);
        if (e) {
            return e.srcElement || e.target;
        } else {
            return null;
        }
    }, getCurrentTarget: function (evt) {
        var e = QZFL.event.getEvent(evt);
        if (e) {
            return e.currentTarget || document.activeElement;
        } else {
            return null;
        }
    }, cancelBubble: function (evt) {
        evt = QZFL.event.getEvent(evt);
        if (!evt) {
            return false
        }
        if (evt.stopPropagation) {
            evt.stopPropagation();
        } else {
            if (!evt.cancelBubble) {
                evt.cancelBubble = true;
            }
        }
    }, preventDefault: function (evt) {
        evt = QZFL.event.getEvent(evt);
        if (!evt) {
            return false
        }
        if (evt.preventDefault) {
            evt.preventDefault();
        } else {
            evt.returnValue = false;
        }
    }, mouseX: function (evt) {
        evt = QZFL.event.getEvent(evt);
        return evt.pageX || (evt.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft));
    }, mouseY: function (evt) {
        evt = QZFL.event.getEvent(evt);
        return evt.pageY || (evt.clientY + (document.documentElement.scrollTop || document.body.scrollTop));
    }, getRelatedTarget: function (ev) {
        ev = QZFL.event.getEvent(ev);
        var t = ev.relatedTarget;
        if (!t) {
            if (ev.type == "mouseout") {
                t = ev.toElement;
            } else if (ev.type == "mouseover") {
                t = ev.fromElement;
            } else {
            }
        }
        return t;
    }, onDomReady: function (fn) {
        var _s = QZFL.event.onDomReady;
        QZFL.event._bindReady();
        _s.pool.push(fn);
    }, _bindReady: function () {
        var _s = QZFL.event.onDomReady;
        if (typeof _s.pool != 'undefined') {
            return;
        }
        _s.pool = _s.pool || [];
        if (document.readyState === "complete") {
            return setTimeout(QZFL.event._readyFn, 1);
        }
        if (document.addEventListener) {
            document.addEventListener("DOMContentLoaded", QZFL.event._domReady, false);
            window.addEventListener("load", QZFL.event._readyFn, false);
        } else if (document.attachEvent) {
            document.attachEvent("onreadystatechange", QZFL.event._domReady);
            window.attachEvent("onload", QZFL.event._readyFn);
            var toplevel = false;
            try {
                toplevel = window.frameElement == null;
            } catch (e) {
            }
            if (document.documentElement.doScroll && toplevel) {
                QZFL.event._ieScrollCheck();
            }
        }
    }, _readyFn: function () {
        var _s = QZFL.event.onDomReady;
        _s.isReady = true;
        while (_s.pool.length) {
            var fn = _s.pool.shift();
            QZFL.lang.isFunction(fn) && fn();
        }
        _s.pool.length == 0 && (_s._fn = null);
    }, _domReady: function () {
        if (document.addEventListener) {
            document.removeEventListener("DOMContentLoaded", QZFL.event._domReady, false);
            QZFL.event._readyFn();
        } else if (document.attachEvent) {
            if (document.readyState === "complete") {
                document.detachEvent("onreadystatechange", QZFL.event._domReady);
                QZFL.event._readyFn();
            }
        }
    }, _ieScrollCheck: function () {
        if (QZFL.event.onDomReady.isReady) {
            return;
        }
        try {
            document.documentElement.doScroll("left");
        } catch (e) {
            setTimeout(QZFL.event._ieScrollCheck, 1);
            return;
        }
        QZFL.event._readyFn();
    }, delegate: function (delegateDom, selector, eventType, fn, argsArray) {
        var path = "http://" + QZFL.config.resourceDomain + "/ac/qzfl/release/expand/delegate.js?max_age=864000";
        QZFL.imports(path, function () {
            QZFL.event.delegate(delegateDom, selector, eventType, fn, argsArray);
        });
    }, undelegate: function (delegateDom, selector, eventType, fn) {
    }};
    QZFL.event.on = QZFL.event.addEvent;
    QZFL.event.bind = QZFL.object.bind;
    QZFL.event.getEvent.MAX_LEVEL = 10;
    QZFL.queue = (function () {
        var _o = QZFL.object;
        var _queue = {};
        var _Queue = function (key, queue) {
            if (this instanceof arguments.callee) {
                this._qz_queuekey = key;
                return this;
            }
            if (_o.getType(queue = queue || []) == "array") {
                _queue[key] = queue;
            }
            return new _Queue(key);
        };
        var _extend = {push: function (key, fn) {
            fn = this._qz_queuekey ? key : fn;
            _queue[this._qz_queuekey || key].push(fn);
        }, shift: function (key) {
            var _q = _queue[this._qz_queuekey || key];
            if (_q) {
                return QZFL.queue._exec(_q.shift());
            }
        }, getLen: function (key) {
            return _queue[this._qz_queuekey || key].length;
        }, run: function (key) {
            var _q = _queue[this._qz_queuekey || key];
            if (_q) {
                _o.each(_q, QZFL.queue._exec);
            }
        }, timedChunk: function (key, conf) {
            var _q = _queue[this._qz_queuekey || key], _conf;
            if (_q) {
                _conf = QZFL.lang.propertieCopy(conf, QZFL.queue._tcCof, null, true);
                setTimeout(function () {
                    var _start = +new Date();
                    do {
                        QZFL.queue.shift(key);
                    } while (QZFL.queue.getLen(key) > 0 && (+new Date() - _start < _conf.runTime));
                    if (QZFL.queue.getLen(key) > 0) {
                        setTimeout(arguments.callee, _conf.waitTime);
                        _conf.onWait();
                    } else {
                        _conf.onRunEnd();
                    }
                }, 0);
            }
        }, _tcCof: {'runTime': 50, 'waitTime': 25, 'onRunEnd': QZFL.emptyFn, 'onWait': QZFL.emptyFn}, _exec: function (value, key, source) {
            if (!value || _o.getType(value) != "function") {
                if (_o.getType(key) == "number") {
                    source[key] = null;
                }
                return false;
            }
            try {
                return value();
            } catch (e) {
                QZFL.console.print("QZFL Queue Got An Error: [" + e.name + "]  " + e.message, 1)
            }
        }};
        _o.extend(_Queue.prototype, _extend);
        _o.extend(_Queue, _extend);
        return _Queue;
    })();
    QZFL.string = {RegExps: {trim: /^\s+|\s+$/g, ltrim: /^\s+/, rtrim: /\s+$/, nl2br: /\n/g, s2nb: /[\x20]{2}/g, URIencode: /[\x09\x0A\x0D\x20\x21-\x29\x2B\x2C\x2F\x3A-\x3F\x5B-\x5E\x60\x7B-\x7E]/g, escHTML: {re_amp: /&/g, re_lt: /</g, re_gt: />/g, re_apos: /\x27/g, re_quot: /\x22/g}, escString: {bsls: /\\/g, sls: /\//g, nl: /\n/g, rt: /\r/g, tab: /\t/g}, restXHTML: {re_amp: /&amp;/g, re_lt: /&lt;/g, re_gt: /&gt;/g, re_apos: /&(?:apos|#0?39);/g, re_quot: /&quot;/g}, write: /\{(\d{1,2})(?:\:([xodQqb]))?\}/g, isURL: /^(?:ht|f)tp(?:s)?\:\/\/(?:[\w\-\.]+)\.\w+/i, cut: /[\x00-\xFF]/, getRealLen: {r0: /[^\x00-\xFF]/g, r1: /[\x00-\xFF]/g}, format: /\{([\d\w\.]+)\}/g}, commonReplace: function (s, p, r) {
        return s.replace(p, r);
    }, listReplace: function (s, l) {
        if (QZFL.lang.isHashMap(l)) {
            for (var i in l) {
                s = QZFL.string.commonReplace(s, l[i], i);
            }
            return s;
        } else {
            return s + '';
        }
    }, trim: function (str) {
        return QZFL.string.commonReplace(str + "", QZFL.string.RegExps.trim, '');
    }, ltrim: function (str) {
        return QZFL.string.commonReplace(str + "", QZFL.string.RegExps.ltrim, '');
    }, rtrim: function (str) {
        return QZFL.string.commonReplace(str + "", QZFL.string.RegExps.rtrim, '');
    }, nl2br: function (str) {
        return QZFL.string.commonReplace(str + "", QZFL.string.RegExps.nl2br, '<br />');
    }, s2nb: function (str) {
        return QZFL.string.commonReplace(str + "", QZFL.string.RegExps.s2nb, '&nbsp;&nbsp;');
    }, URIencode: function (str) {
        var cc, ccc;
        return(str + "").replace(QZFL.string.RegExps.URIencode, function (a) {
            if (a == "\x20") {
                return"+";
            } else if (a == "\x0D") {
                return"";
            }
            cc = a.charCodeAt(0);
            ccc = cc.toString(16);
            return"%" + ((cc < 16) ? ("0" + ccc) : ccc);
        });
    }, escHTML: function (str) {
        var t = QZFL.string.RegExps.escHTML;
        return QZFL.string.listReplace((str + ""), {'&amp;': t.re_amp, '&lt;': t.re_lt, '&gt;': t.re_gt, '&#039;': t.re_apos, '&quot;': t.re_quot});
    }, escString: function (str) {
        var t = QZFL.string.RegExps.escString, h = QZFL.string.RegExps.escHTML;
        return QZFL.string.listReplace((str + ""), {'\\\\': t.bsls, '\\n': t.nl, '': t.rt, '\\t': t.tab, '\\/': t.sls, '\\\'': h.re_apos, '\\"': h.re_quot});
    }, restXHTML: function (str) {
        var t = QZFL.string.RegExps.restXHTML;
        return QZFL.string.listReplace((str + ""), {'<': t.re_lt, '>': t.re_gt, '\x27': t.re_apos, '\x22': t.re_quot, '&': t.re_amp});
    }, write: function (strFormat, someArgs) {
        if (arguments.length < 1 || !QZFL.lang.isString(strFormat)) {
            return'';
        }
        var rArr = QZFL.lang.arg2arr(arguments), result = rArr.shift(), tmp;
        return result.replace(QZFL.string.RegExps.write, function (a, b, c) {
            b = parseInt(b, 10);
            if (b < 0 || (typeof rArr[b] == 'undefined')) {
                return'(n/a)';
            } else {
                if (!c) {
                    return rArr[b];
                } else {
                    switch (c) {
                        case'x':
                            return'0x' + rArr[b].toString(16);
                        case'o':
                            return'o' + rArr[b].toString(8);
                        case'd':
                            return rArr[b].toString(10);
                        case'Q':
                            return'\x22' + rArr[b].toString(16) + '\x22';
                        case'q':
                            return'`' + rArr[b].toString(16) + '\x27';
                        case'b':
                            return'<' + !!rArr[b] + '>';
                    }
                }
            }
        });
    }, isURL: function (s) {
        return QZFL.string.RegExps.isURL.test(s);
    }, escapeURI: function (s) {
        if (window.encodeURIComponent) {
            return encodeURIComponent(s);
        }
        if (window.escape) {
            return escape(s);
        }
        return'';
    }, fillLength: function (source, l, ch, isRight) {
        if ((source = String(source)).length < l) {
            var ar = new Array(l - source.length);
            ar[isRight ? 'unshift' : 'push'](source);
            source = ar.join(ch || '0');
        }
        return source;
    }, cut: function (str, bitLen, tails) {
        str = String(str);
        bitLen -= 0;
        tails = tails || '';
        if (isNaN(bitLen)) {
            return str;
        }
        var len = str.length, i = Math.min(Math.floor(bitLen / 2), len), cnt = QZFL.string.getRealLen(str.slice(0, i));
        for (; i < len && cnt < bitLen; i++) {
            cnt += 1 + (str.charCodeAt(i) > 255);
        }
        return str.slice(0, cnt > bitLen ? i - 1 : i) + (i < len ? tails : '');
    }, getRealLen: function (s, isUTF8) {
        if (typeof(s) != 'string') {
            return 0;
        }
        if (!isUTF8) {
            return s.replace(QZFL.string.RegExps.getRealLen.r0, "**").length;
        } else {
            var cc = s.replace(QZFL.string.RegExps.getRealLen.r1, "");
            return(s.length - cc.length) + (encodeURI(cc).length / 3);
        }
    }, format: function (str) {
        var args = Array.prototype.slice.call(arguments), v;
        str = String(args.shift());
        if (args.length == 1 && typeof(args[0]) == 'object') {
            args = args[0];
        }
        QZFL.string.RegExps.format.lastIndex = 0;
        return str.replace(QZFL.string.RegExps.format, function (m, n) {
            v = QZFL.object.route(args, n);
            return v === undefined ? m : v;
        });
    }};
    QZFL.string.restHTML = QZFL.string.restXHTML;
    QZFL.util = {buildUri: function (s) {
        return new QZFL.util.URI(s);
    }, URI: function (s) {
        if (!(QZFL.object.getType(s) == "string")) {
            return null;
        }
        if (s.indexOf("://") < 1) {
            s = location.protocol + "//" + location.host + (s.indexOf("/") == 0 ? "" : location.pathname.substr(0, location.pathname.lastIndexOf("/") + 1)) + s;
        }
        var depart = s.split("://");
        if (QZFL.object.getType(depart) == "array" && depart.length > 1 && (/^[a-zA-Z]+$/).test(depart[0])) {
            this.protocol = depart[0].toLowerCase();
            var h = depart[1].split("/");
            if (QZFL.object.getType(h) == "array") {
                this.host = h[0];
                this.pathname = "/" + h.slice(1).join("/").replace(/(\?|\#).+/i, "");
                this.href = s;
                var se = depart[1].lastIndexOf("?"), ha = depart[1].lastIndexOf("#");
                this.search = (se >= 0) ? depart[1].substring(se) : "";
                this.hash = (ha >= 0) ? depart[1].substring(ha) : "";
                if (this.search.length > 0 && this.hash.length > 0) {
                    if (ha < se) {
                        this.search = "";
                    } else {
                        this.search = depart[1].substring(se, ha);
                    }
                }
                return this;
            } else {
                return null;
            }
        } else {
            return null;
        }
    }};
    QZFL.lang = {isString: function (o) {
        return QZFL.object.getType(o) == "string";
    }, isArray: function (o) {
        return QZFL.object.getType(o) == "array";
    }, isFunction: function (o) {
        return QZFL.object.getType(o) == "function";
    }, isHashMap: function (o) {
        return QZFL.object.getType(o) == "object";
    }, isNode: function (o) {
        return o && (typeof(o.nodeName) != 'undefined' || typeof(o.nodeType) != 'undefined');
    }, isElement: function (o) {
        return o && o.nodeType == 1;
    }};
    (function () {
        var evalGlobalCnt = 0, runStyleGlobalCnt = 0;
        QZFL.object.extend(QZFL.util, {copyToClip: function (text) {
            if (QZFL.userAgent.ie) {
                return clipboardData.setData("Text", text);
            } else {
                var o = QZFL.shareObject.getValidSO();
                return o ? o.setClipboard(text) : false;
            }
        }, evalGlobal: function (js) {
            js = String(js);
            var obj = document.createElement('script'), head = document.documentElement || document.getElementsByTagName("head")[0];
            obj.type = 'text/javascript';
            obj.id = "__evalGlobal_" + evalGlobalCnt;
            try {
                obj.innerHTML = js;
            } catch (e) {
                obj.text = js;
            }
            head.insertBefore(obj, head.firstChild);
            evalGlobalCnt++;
            setTimeout(function () {
                QZFL.dom.removeElement(obj);
            }, 50);
        }, runStyleGlobal: function (st) {
            if (QZFL.userAgent.safari) {
                var obj = document.createElement('style');
                obj.type = 'text/css';
                obj.id = "__runStyle_" + runStyleGlobalCnt;
                try {
                    obj.textContent = st;
                } catch (e) {
                    alert(e.message);
                }
                var h = document.getElementsByTagName("head")[0];
                if (h) {
                    h.appendChild(obj);
                    runStyleGlobalCnt++;
                }
            } else {
            }
        }, genHttpParamString: function (o) {
            return QZFL.util.commonDictionaryJoin(o, null, null, null, window.encodeURIComponent);
        }, splitHttpParamString: function (s) {
            return QZFL.util.commonDictionarySplit(s);
        }, commonDictionarySplit: function (s, esp, vq, eq) {
            var res = {}, l, ks, vs, t;
            if (!s || typeof(s) != "string") {
                return res;
            }
            if (typeof(esp) != 'string') {
                esp = "&";
            }
            if (typeof(vq) != 'string') {
                vq = "";
            }
            if (typeof(eq) != 'string') {
                eq = "=";
            }
            l = s.split(esp);
            if (l && l.length) {
                for (var i = 0, len = l.length; i < len; ++i) {
                    ks = l[i].split(eq);
                    if (ks.length > 1) {
                        t = ks.slice(1).join(eq);
                        vs = t.split(vq);
                        res[ks[0]] = vs.slice(vq.length, vs.length - vq.length).join(vq);
                    } else {
                        ks[0] && (res[ks[0]] = true);
                    }
                }
            }
            return res;
        }, commonDictionaryJoin: function (o, esp, vq, eq, valueHandler) {
            var res = [], t;
            if (!o || typeof(o) != "object") {
                return'';
            }
            if (typeof(o) == "string") {
                return o;
            }
            if (typeof(esp) != 'string') {
                esp = "&";
            }
            if (typeof(vq) != 'string') {
                vq = "";
            }
            if (typeof(eq) != 'string') {
                eq = "=";
            }
            for (var k in o) {
                res.push(k + eq + vq + (typeof valueHandler == 'function' ? valueHandler(o[k]) : o[k]) + vq);
            }
            return res.join(esp);
        }});
    })();
    QZFL.lang.isValidXMLdom = function (o) {
        return!!(o && o.xml && /^<\?xml/.test(o.xml));
    };
    QZFL.lang.arg2arr = function (refArgs, start) {
        return Array.prototype.slice.call(refArgs, (start || 0));
    };
    QZFL.lang.getObjByNameSpace = function (ns, setup) {
        if (typeof(ns) != 'string') {
            return ns;
        }
        var l = ns.split("."), r = window;
        try {
            for (var i = 0, len = l.length; i < len; ++i) {
                if (typeof(r[l[i]]) == 'undefined') {
                    if (setup) {
                        r[l[i]] = {};
                    } else {
                        return;
                    }
                }
                r = r[l[i]];
            }
            return r;
        } catch (ignore) {
            return;
        }
    };
    QZFL.lang.objectClone = function (obj, preventName) {
        if ((typeof obj) == 'object') {
            var res = (QZFL.lang.isArray(obj)) ? [] : {};
            for (var i in obj) {
                if (i != preventName)
                    res[i] = QZFL.lang.objectClone(obj[i], preventName);
            }
            return res;
        } else if ((typeof obj) == 'function') {
            return Object;
        }
        return obj;
    };
    QZFL.lang.obj2str = function (obj) {
        var t, sw;
        if (typeof(obj) == 'object') {
            if (obj === null) {
                return'null';
            }
            if (window.JSON && window.JSON.stringify) {
                return JSON.stringify(obj);
            }
            sw = QZFL.lang.isArray(obj);
            t = [];
            for (var i in obj) {
                t.push((sw ? "" : ("\"" + QZFL.string.escString(i) + "\":")) + obj2str(obj[i]));
            }
            t = t.join();
            return sw ? ("[" + t + "]") : ("{" + t + "}");
        } else if (typeof(obj) == 'undefined') {
            return'undefined';
        } else if (typeof(obj) == 'number' || typeof(obj) == 'function') {
            return obj.toString();
        }
        return!obj ? "\"\"" : ("\"" + QZFL.string.escString(obj) + "\"");
    };
    QZFL.lang.propertieCopy = function (s, b, propertiSet, notOverWrite) {
        var l = (!propertiSet || typeof(propertiSet) != 'object') ? b : propertiSet;
        s = s || {};
        for (var p in l) {
            if (!notOverWrite || !(p in s)) {
                s[p] = l[p];
            }
        }
        return s;
    };
    QZFL.lang.tryThese = function () {
        for (var i = 0, len = arguments.length; i < len; ++i) {
            try {
                return arguments[i]();
            } catch (ign) {
            }
        }
        return;
    };
    QZFL.lang.chain = function (u, v) {
        var calls = QZFL.lang.arg2arr(arguments);
        return function () {
            for (var i = 0, len = calls.length; i < len; ++i) {
                if (calls[i] && calls[i].apply(null, arguments) === false) {
                    return false;
                }
            }
            return true;
        };
    };
    QZFL.lang.uniqueArray = function (arr) {
        if (!QZFL.lang.isArray(arr)) {
            return arr;
        }
        var flag = {}, index = 0;
        while (index < arr.length) {
            if (flag[arr[index]] == typeof(arr[index])) {
                arr.splice(index, 1);
                continue;
            }
            flag[arr[index].toString()] = typeof(arr[index]);
            ++index;
        }
        return arr;
    };
    QZFL.enviroment = (function () {
        var _p = {}, hookPool = {};

        function envGet(kname) {
            return _p[kname];
        }

        function envDel(kname) {
            delete _p[kname];
            return true;
        }

        function envSet(kname, value) {
            if (typeof value == 'undefined') {
                if (typeof kname == 'undefined') {
                    return false;
                } else if (!(_p[kname] === undefined)) {
                    return false;
                }
            } else {
                _p[kname] = value;
                return true;
            }
        }

        return{get: envGet, set: envSet, del: envDel, hookPool: hookPool};
    })();
    QZFL.pageEvents = (function () {
        function _ihp() {
            var qs = location.search.substring(1), qh = location.hash.substring(1), s, h, n;
            ENV.set("_queryString", qs);
            ENV.set("_queryHash", qh);
            ENV.set("queryString", s = QZFL.util.splitHttpParamString(qs));
            ENV.set("queryHash", h = QZFL.util.splitHttpParamString(qh));
            if (s && s.DEBUG) {
                n = parseInt(s.DEBUG, 10);
                if (!isNaN(n)) {
                    QZFL.config.debugLevel = n;
                }
            }
        }

        function _bootStrap() {
            if (QZFL.event.onDomReady.isReady) {
                setTimeout(_onloadHook, 1);
            } else if (document.addEventListener) {
                document.addEventListener("DOMContentLoaded", _onloadHook, true);
            } else {
                var src = (window.location.protocol == 'https:') ? '//:' : 'javascript:void(0)';
                document.write('<script onreadystatechange="if(this.readyState==\'complete\'){this.parentNode.removeChild(this);QZFL.pageEvents._onloadHook();}" defer="defer" src="' + src + '"><\/script\>');
            }
            window.onload = QZFL.lang.chain(window.onload, function () {
                _onloadHook();
                _runHooks('onafterloadhooks');
            });
            window.onbeforeunload = function () {
                return _runHooks('onbeforeunloadhooks');
            };
            window.onunload = QZFL.lang.chain(window.onunload, function () {
                _runHooks('onunloadhooks');
            });
        }

        function _onloadHook() {
            _runHooks('onloadhooks');
            QZFL.enviroment.loaded = true;
            QZFL.event.onDomReady.isReady = true;
        }

        function _runHook(handler) {
            try {
                handler();
            } catch (ex) {
            }
        }

        function _runHooks(hooks) {
            var isbeforeunload = (hooks == 'onbeforeunloadhooks'), warn = null, hc = window.ENV.hookPool;
            do {
                var h = hc[hooks];
                if (!isbeforeunload) {
                    hc[hooks] = null;
                }
                if (!h) {
                    break;
                }
                for (var ii = 0; ii < h.length; ii++) {
                    if (isbeforeunload) {
                        warn = warn || h[ii]();
                    } else {
                        h[ii]();
                    }
                }
                if (isbeforeunload) {
                    break;
                }
            } while (hc[hooks]);
            if (isbeforeunload) {
                if (warn) {
                    return warn;
                } else {
                    QZFL.enviroment.loaded = false;
                }
            }
        }

        function _addHook(hooks, handler) {
            var c = window.ENV.hookPool;
            (c[hooks] ? c[hooks] : (c[hooks] = [])).push(handler);
        }

        function _insertHook(hooks, handler, position) {
            var c = window.ENV.hookPool;
            if (typeof(position) == 'number' && position >= 0) {
                if (!c[hooks]) {
                    c[hooks] = [];
                }
                c[hooks].splice(position, 0, handler);
            } else {
                return false;
            }
        }

        function _lr(handler) {
            QZFL.enviroment.loaded ? _runHook(handler) : _addHook('onloadhooks', handler);
        }

        function _bulr(handler) {
            _addHook('onbeforeunloadhooks', handler);
        }

        function _ulr(handler) {
            _addHook('onunloadhooks', handler);
        }

        function pinit() {
            _bootStrap();
            _ihp();
            var _dt;
            if (_dt = document.getElementById("__DEBUG_out")) {
                ENV.set("dout", _dt);
            }
            var __dalert;
            if (!ENV.get("alertConverted")) {
                __dalert = alert;
                eval('var alert=function(msg){if(msg!=undefined){__dalert(msg);return msg;}}');
                ENV.set("alertConverted", true);
            }
            var t = ENV.get("queryHash");
            if (t && t.DEBUG) {
                QZFL.config.debugLevel = 2;
            }
        }

        return{onloadRegister: _lr, onbeforeunloadRegister: _bulr, onunloadRegister: _ulr, initHttpParams: _ihp, bootstrapEventHandlers: _bootStrap, _onloadHook: _onloadHook, insertHooktoHooksQueue: _insertHook, pageBaseInit: pinit};
    })();
    QZFL.string = QZONE.string || {};
    QZFL.string.parseXML = function (text) {
        var doc;
        if (window.ActiveXObject) {
            doc = QZFL.lang.tryThese(function () {
                return new ActiveXObject('MSXML2.DOMDocument.6.0');
            }, function () {
                return new ActiveXObject('MSXML2.DOMDocument.5.0');
            }, function () {
                return new ActiveXObject('MSXML2.DOMDocument.4.0');
            }, function () {
                return new ActiveXObject('MSXML2.DOMDocument.3.0');
            }, function () {
                return new ActiveXObject('MSXML2.DOMDocument');
            }, function () {
                return new ActiveXObject('Microsoft.XMLDOM');
            });
            doc.async = "false";
            doc.loadXML(text);
            if (doc.parseError.reason) {
                return null;
            }
        } else {
            var parser = new DOMParser();
            doc = parser.parseFromString(text, "text/xml");
            if (doc.documentElement.nodeName == 'parsererror') {
                return null;
            }
        }
        return doc.documentElement;
    };
    QZFL.string.timeFormatString = function (date, ptn, baseTime) {
        try {
            date = date.getTime ? date : (new Date(date));
        } catch (ign) {
            return'';
        }
        var me = QZFL.string.timeFormatString, map = me._map, unt = me._units, rel = false, t, delta, v;
        if (!ptn) {
            baseTime = baseTime || new Date();
            delta = Math.abs(date - baseTime);
            for (var i = 0, len = unt.length; i < len; ++i) {
                t = map[unt[i]];
                if (delta > t[1]) {
                    return Math.floor(delta / t[1]) + t[2];
                }
            }
            return"刚刚";
        } else {
            return ptn.replace(me._re, function (a, b, c) {
                (rel = b.charAt(0) == '_') && (b = b.charAt(1));
                if (!map[b]) {
                    return a;
                }
                if (!rel) {
                    v = date[map[b][0]]();
                    b == 'y' && (v %= 100);
                    b == 'M' && v++;
                    return v < 10 ? QZFL.string.fillLength(v, 2, c) : v.toString();
                } else {
                    return Math.floor(Math.abs(date - baseTime) / map[b][1]);
                }
            });
        }
    };
    QZFL.string.timeFormatString._re = /\{([_yYMdhms]{1,2})(?:\:([\d\w\s]))?\}/g;
    QZFL.string.timeFormatString._map = {y: ['getYear', 31104000000], Y: ['getFullYear', 31104000000, '\u5E74\u524D'], M: ['getMonth', 2592000000, '\u4E2A\u6708\u524D'], d: ['getDate', 86400000, '\u5929\u524D'], h: ['getHours', 3600000, '\u5C0F\u65F6\u524D'], m: ['getMinutes', 60000, '\u5206\u949F\u524D'], s: ['getSeconds', 1000, '\u79D2\u524D']};
    QZFL.string.timeFormatString._units = ['Y', 'M', 'd', 'h', 'm', 's'];
    QZFL.string.StringBuilder = function () {
        this._strList = QZFL.lang.arg2arr(arguments);
    };
    QZFL.string.StringBuilder.prototype = {append: function (str) {
        this._strList.push(String(str));
    }, insertFirst: function (str) {
        this._strList.unshift(String(str));
    }, appendArray: function (arr) {
        this._strList = this._strList.concat(arr);
    }, toString: function (spliter) {
        return this._strList.join(spliter || '');
    }, clear: function () {
        this._strList.splice(0, this._strList.length);
    }};
    (function () {
        var chunker = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g, done = 0, toString = Object.prototype.toString, hasDuplicate = false, baseHasDuplicate = true, rBackslash = /\\/g, rNonWord = /\W/, tmpVar, rSpeedUp = /^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)|^(\w+)\.([\w\-]+$)/;
        [0, 0].sort(function () {
            baseHasDuplicate = false;
            return 0;
        });
        var Sizzle = function (selector, context, results, seed) {
            results = results || [];
            context = context || document;
            var origContext = context;
            if (context.nodeType !== 1 && context.nodeType !== 9) {
                return[];
            }
            if (!selector || typeof selector !== "string") {
                return results;
            }
            var m, set, checkSet, extra, ret, cur, pop, i, prune = true, contextXML = Sizzle.isXML(context), parts = [], soFar = selector, speedUpMatch;
            if (!contextXML) {
                speedUpMatch = rSpeedUp.exec(selector);
                if (speedUpMatch) {
                    if (context.nodeType === 1 || context.nodeType === 9) {
                        if (speedUpMatch[1]) {
                            return makeArray(context.getElementsByTagName(selector), results);
                        } else if (speedUpMatch[2] || (speedUpMatch[4] && speedUpMatch[5])) {
                            if (context.getElementsByClassName && speedUpMatch[2]) {
                                return makeArray(context.getElementsByClassName(speedUpMatch[2]), results);
                            } else {
                                var suElems = context.getElementsByTagName(speedUpMatch[4] || '*'), suResBuff = [], suIt, suCN = ' ' + (speedUpMatch[2] || speedUpMatch[5]) + ' ';
                                for (var sui = 0, sulen = suElems.length; sui < sulen; ++sui) {
                                    suIt = suElems[sui];
                                    ((' ' + suIt.className + ' ').indexOf(suCN) > -1) && suResBuff.push(suIt);
                                }
                                return makeArray(suResBuff, results);
                            }
                        }
                    }
                    if (context.nodeType === 9) {
                        if ((selector === "body" || selector.toLowerCase() === "body") && context.body) {
                            return makeArray([context.body], results);
                        } else if (speedUpMatch[3]) {
                            return(tmpVar = context.getElementById(speedUpMatch[3])) ? makeArray([tmpVar], results) : makeArray([], results);
                        }
                    }
                }
            }
            do {
                chunker.exec("");
                m = chunker.exec(soFar);
                if (m) {
                    soFar = m[3];
                    parts.push(m[1]);
                    if (m[2]) {
                        extra = m[3];
                        break;
                    }
                }
            } while (m);
            if (parts.length > 1 && origPOS.exec(selector)) {
                if (parts.length === 2 && Expr.relative[parts[0]]) {
                    set = posProcess(parts[0] + parts[1], context);
                } else {
                    set = Expr.relative[parts[0]] ? [context] : Sizzle(parts.shift(), context);
                    while (parts.length) {
                        selector = parts.shift();
                        if (Expr.relative[selector]) {
                            selector += parts.shift();
                        }
                        set = posProcess(selector, set);
                    }
                }
            } else {
                if (!seed && parts.length > 1 && context.nodeType === 9 && !contextXML && Expr.match.ID.test(parts[0]) && !Expr.match.ID.test(parts[parts.length - 1])) {
                    ret = Sizzle.find(parts.shift(), context, contextXML);
                    context = ret.expr ? Sizzle.filter(ret.expr, ret.set)[0] : ret.set[0];
                }
                if (context) {
                    ret = seed ? {expr: parts.pop(), set: makeArray(seed)} : Sizzle.find(parts.pop(), parts.length === 1 && (parts[0] === "~" || parts[0] === "+") && context.parentNode ? context.parentNode : context, contextXML);
                    set = ret.expr ? Sizzle.filter(ret.expr, ret.set) : ret.set;
                    if (parts.length > 0) {
                        checkSet = makeArray(set);
                    } else {
                        prune = false;
                    }
                    while (parts.length) {
                        cur = parts.pop();
                        pop = cur;
                        if (!Expr.relative[cur]) {
                            cur = "";
                        } else {
                            pop = parts.pop();
                        }
                        if (pop == null) {
                            pop = context;
                        }
                        Expr.relative[cur](checkSet, pop, contextXML);
                    }
                } else {
                    checkSet = parts = [];
                }
            }
            if (!checkSet) {
                checkSet = set;
            }
            if (!checkSet) {
                Sizzle.error(cur || selector);
            }
            if (toString.call(checkSet) === "[object Array]") {
                if (!prune) {
                    results.push.apply(results, checkSet);
                } else if (context && context.nodeType === 1) {
                    for (i = 0; checkSet[i] != null; i++) {
                        if (checkSet[i] && (checkSet[i] === true || checkSet[i].nodeType === 1 && Sizzle.contains(context, checkSet[i]))) {
                            results.push(set[i]);
                        }
                    }
                } else {
                    for (i = 0; checkSet[i] != null; i++) {
                        if (checkSet[i] && checkSet[i].nodeType === 1) {
                            results.push(set[i]);
                        }
                    }
                }
            } else {
                makeArray(checkSet, results);
            }
            if (extra) {
                Sizzle(extra, origContext, results, seed);
                Sizzle.uniqueSort(results);
            }
            return results;
        };
        Sizzle.uniqueSort = function (results) {
            if (sortOrder) {
                hasDuplicate = baseHasDuplicate;
                results.sort(sortOrder);
                if (hasDuplicate) {
                    for (var i = 1; i < results.length; i++) {
                        if (results[i] === results[i - 1]) {
                            results.splice(i--, 1);
                        }
                    }
                }
            }
            return results;
        };
        Sizzle.matches = function (expr, set) {
            return Sizzle(expr, null, null, set);
        };
        Sizzle.matchesSelector = function (node, expr) {
            return Sizzle(expr, null, null, [node]).length > 0;
        };
        Sizzle.find = function (expr, context, isXML) {
            var set;
            if (!expr) {
                return[];
            }
            for (var i = 0, l = Expr.order.length; i < l; i++) {
                var match, type = Expr.order[i];
                if ((match = Expr.leftMatch[type].exec(expr))) {
                    var left = match[1];
                    match.splice(1, 1);
                    if (left.substr(left.length - 1) !== "\\") {
                        match[1] = (match[1] || "").replace(rBackslash, "");
                        set = Expr.find[type](match, context, isXML);
                        if (set != null) {
                            expr = expr.replace(Expr.match[type], "");
                            break;
                        }
                    }
                }
            }
            if (!set) {
                set = typeof context.getElementsByTagName !== "undefined" ? context.getElementsByTagName("*") : [];
            }
            return{set: set, expr: expr};
        };
        Sizzle.filter = function (expr, set, inplace, not) {
            var match, anyFound, old = expr, result = [], curLoop = set, isXMLFilter = set && set[0] && Sizzle.isXML(set[0]);
            while (expr && set.length) {
                for (var type in Expr.filter) {
                    if ((match = Expr.leftMatch[type].exec(expr)) != null && match[2]) {
                        var found, item, filter = Expr.filter[type], left = match[1];
                        anyFound = false;
                        match.splice(1, 1);
                        if (left.substr(left.length - 1) === "\\") {
                            continue;
                        }
                        if (curLoop === result) {
                            result = [];
                        }
                        if (Expr.preFilter[type]) {
                            match = Expr.preFilter[type](match, curLoop, inplace, result, not, isXMLFilter);
                            if (!match) {
                                anyFound = found = true;
                            } else if (match === true) {
                                continue;
                            }
                        }
                        if (match) {
                            for (var i = 0; (item = curLoop[i]) != null; i++) {
                                if (item) {
                                    found = filter(item, match, i, curLoop);
                                    var pass = not ^ !!found;
                                    if (inplace && found != null) {
                                        if (pass) {
                                            anyFound = true;
                                        } else {
                                            curLoop[i] = false;
                                        }
                                    } else if (pass) {
                                        result.push(item);
                                        anyFound = true;
                                    }
                                }
                            }
                        }
                        if (found !== undefined) {
                            if (!inplace) {
                                curLoop = result;
                            }
                            expr = expr.replace(Expr.match[type], "");
                            if (!anyFound) {
                                return[];
                            }
                            break;
                        }
                    }
                }
                if (expr === old) {
                    if (anyFound == null) {
                        Sizzle.error(expr);
                    } else {
                        break;
                    }
                }
                old = expr;
            }
            return curLoop;
        };
        Sizzle.error = function (msg) {
            throw"Syntax error, unrecognized expression: " + msg;
        };
        var Expr = Sizzle.selectors = {order: ["ID", "NAME", "TAG"], match: {ID: /#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/, CLASS: /\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/, NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/, ATTR: /\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/, TAG: /^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/, CHILD: /:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/, POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/, PSEUDO: /:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/}, leftMatch: {}, attrMap: {"class": "className", "for": "htmlFor"}, attrHandle: {href: function (elem) {
            return elem.getAttribute("href");
        }, type: function (elem) {
            return elem.getAttribute("type");
        }}, relative: {"+": function (checkSet, part) {
            var isPartStr = typeof part === "string", isTag = isPartStr && !rNonWord.test(part), isPartStrNotTag = isPartStr && !isTag;
            if (isTag) {
                part = part.toLowerCase();
            }
            for (var i = 0, l = checkSet.length, elem; i < l; i++) {
                if ((elem = checkSet[i])) {
                    while ((elem = elem.previousSibling) && elem.nodeType !== 1) {
                    }
                    checkSet[i] = isPartStrNotTag || elem && elem.nodeName.toLowerCase() === part ? elem || false : elem === part;
                }
            }
            if (isPartStrNotTag) {
                Sizzle.filter(part, checkSet, true);
            }
        }, ">": function (checkSet, part) {
            var elem, isPartStr = typeof part === "string", i = 0, l = checkSet.length;
            if (isPartStr && !rNonWord.test(part)) {
                part = part.toLowerCase();
                for (; i < l; i++) {
                    elem = checkSet[i];
                    if (elem) {
                        var parent = elem.parentNode;
                        checkSet[i] = parent.nodeName.toLowerCase() === part ? parent : false;
                    }
                }
            } else {
                for (; i < l; i++) {
                    elem = checkSet[i];
                    if (elem) {
                        checkSet[i] = isPartStr ? elem.parentNode : elem.parentNode === part;
                    }
                }
                if (isPartStr) {
                    Sizzle.filter(part, checkSet, true);
                }
            }
        }, "": function (checkSet, part, isXML) {
            var nodeCheck, doneName = done++, checkFn = dirCheck;
            if (typeof part === "string" && !rNonWord.test(part)) {
                part = part.toLowerCase();
                nodeCheck = part;
                checkFn = dirNodeCheck;
            }
            checkFn("parentNode", part, doneName, checkSet, nodeCheck, isXML);
        }, "~": function (checkSet, part, isXML) {
            var nodeCheck, doneName = done++, checkFn = dirCheck;
            if (typeof part === "string" && !rNonWord.test(part)) {
                part = part.toLowerCase();
                nodeCheck = part;
                checkFn = dirNodeCheck;
            }
            checkFn("previousSibling", part, doneName, checkSet, nodeCheck, isXML);
        }}, find: {ID: function (match, context, isXML) {
            if (typeof context.getElementById !== "undefined" && !isXML) {
                var m = context.getElementById(match[1]);
                return m && m.parentNode ? [m] : [];
            }
        }, NAME: function (match, context) {
            if (typeof context.getElementsByName !== "undefined") {
                var ret = [], results = context.getElementsByName(match[1]);
                for (var i = 0, l = results.length; i < l; i++) {
                    if (results[i].getAttribute("name") === match[1]) {
                        ret.push(results[i]);
                    }
                }
                return ret.length === 0 ? null : ret;
            }
        }, TAG: function (match, context) {
            if (typeof context.getElementsByTagName !== "undefined") {
                return context.getElementsByTagName(match[1]);
            }
        }}, preFilter: {CLASS: function (match, curLoop, inplace, result, not, isXML) {
            match = " " + match[1].replace(rBackslash, "") + " ";
            if (isXML) {
                return match;
            }
            for (var i = 0, elem; (elem = curLoop[i]) != null; i++) {
                if (elem) {
                    if (not ^ (elem.className && (" " + elem.className + " ").replace(/[\t\n\r]/g, " ").indexOf(match) >= 0)) {
                        if (!inplace) {
                            result.push(elem);
                        }
                    } else if (inplace) {
                        curLoop[i] = false;
                    }
                }
            }
            return false;
        }, ID: function (match) {
            return match[1].replace(rBackslash, "");
        }, TAG: function (match, curLoop) {
            return match[1].replace(rBackslash, "").toLowerCase();
        }, CHILD: function (match) {
            if (match[1] === "nth") {
                if (!match[2]) {
                    Sizzle.error(match[0]);
                }
                match[2] = match[2].replace(/^\+|\s*/g, '');
                var test = /(-?)(\d*)(?:n([+\-]?\d*))?/.exec(match[2] === "even" && "2n" || match[2] === "odd" && "2n+1" || !/\D/.test(match[2]) && "0n+" + match[2] || match[2]);
                match[2] = (test[1] + (test[2] || 1)) - 0;
                match[3] = test[3] - 0;
            }
            else if (match[2]) {
                Sizzle.error(match[0]);
            }
            match[0] = done++;
            return match;
        }, ATTR: function (match, curLoop, inplace, result, not, isXML) {
            var name = match[1] = match[1].replace(rBackslash, "");
            if (!isXML && Expr.attrMap[name]) {
                match[1] = Expr.attrMap[name];
            }
            match[4] = (match[4] || match[5] || "").replace(rBackslash, "");
            if (match[2] === "~=") {
                match[4] = " " + match[4] + " ";
            }
            return match;
        }, PSEUDO: function (match, curLoop, inplace, result, not) {
            if (match[1] === "not") {
                if ((chunker.exec(match[3]) || "").length > 1 || /^\w/.test(match[3])) {
                    match[3] = Sizzle(match[3], null, null, curLoop);
                } else {
                    var ret = Sizzle.filter(match[3], curLoop, inplace, true ^ not);
                    if (!inplace) {
                        result.push.apply(result, ret);
                    }
                    return false;
                }
            } else if (Expr.match.POS.test(match[0]) || Expr.match.CHILD.test(match[0])) {
                return true;
            }
            return match;
        }, POS: function (match) {
            match.unshift(true);
            return match;
        }}, filters: {enabled: function (elem) {
            return elem.disabled === false && elem.type !== "hidden";
        }, disabled: function (elem) {
            return elem.disabled === true;
        }, checked: function (elem) {
            return elem.checked === true;
        }, selected: function (elem) {
            if (elem.parentNode) {
                elem.parentNode.selectedIndex;
            }
            return elem.selected === true;
        }, parent: function (elem) {
            return!!elem.firstChild;
        }, empty: function (elem) {
            return!elem.firstChild;
        }, has: function (elem, i, match) {
            return!!Sizzle(match[3], elem).length;
        }, header: function (elem) {
            return(/h\d/i).test(elem.nodeName);
        }, text: function (elem) {
            return"text" === elem.getAttribute('type');
        }, radio: function (elem) {
            return"radio" === elem.type;
        }, checkbox: function (elem) {
            return"checkbox" === elem.type;
        }, file: function (elem) {
            return"file" === elem.type;
        }, password: function (elem) {
            return"password" === elem.type;
        }, submit: function (elem) {
            return"submit" === elem.type;
        }, image: function (elem) {
            return"image" === elem.type;
        }, reset: function (elem) {
            return"reset" === elem.type;
        }, button: function (elem) {
            return"button" === elem.type || elem.nodeName.toLowerCase() === "button";
        }, input: function (elem) {
            return(/input|select|textarea|button/i).test(elem.nodeName);
        }}, setFilters: {first: function (elem, i) {
            return i === 0;
        }, last: function (elem, i, match, array) {
            return i === array.length - 1;
        }, even: function (elem, i) {
            return i % 2 === 0;
        }, odd: function (elem, i) {
            return i % 2 === 1;
        }, lt: function (elem, i, match) {
            return i < match[3] - 0;
        }, gt: function (elem, i, match) {
            return i > match[3] - 0;
        }, nth: function (elem, i, match) {
            return match[3] - 0 === i;
        }, eq: function (elem, i, match) {
            return match[3] - 0 === i;
        }}, filter: {PSEUDO: function (elem, match, i, array) {
            var name = match[1], filter = Expr.filters[name];
            if (filter) {
                return filter(elem, i, match, array);
            } else if (name === "contains") {
                return(elem.textContent || elem.innerText || Sizzle.getText([elem]) || "").indexOf(match[3]) >= 0;
            } else if (name === "not") {
                var not = match[3];
                for (var j = 0, l = not.length; j < l; j++) {
                    if (not[j] === elem) {
                        return false;
                    }
                }
                return true;
            } else {
                Sizzle.error(name);
            }
        }, CHILD: function (elem, match) {
            var type = match[1], node = elem;
            switch (type) {
                case"only":
                case"first":
                    while ((node = node.previousSibling)) {
                        if (node.nodeType === 1) {
                            return false;
                        }
                    }
                    if (type === "first") {
                        return true;
                    }
                    node = elem;
                case"last":
                    while ((node = node.nextSibling)) {
                        if (node.nodeType === 1) {
                            return false;
                        }
                    }
                    return true;
                case"nth":
                    var first = match[2], last = match[3];
                    if (first === 1 && last === 0) {
                        return true;
                    }
                    var doneName = match[0], parent = elem.parentNode;
                    if (parent && (parent.sizcache !== doneName || !elem.nodeIndex)) {
                        var count = 0;
                        for (node = parent.firstChild; node; node = node.nextSibling) {
                            if (node.nodeType === 1) {
                                node.nodeIndex = ++count;
                            }
                        }
                        parent.sizcache = doneName;
                    }
                    var diff = elem.nodeIndex - last;
                    if (first === 0) {
                        return diff === 0;
                    } else {
                        return(diff % first === 0 && diff / first >= 0);
                    }
            }
        }, ID: function (elem, match) {
            return elem.nodeType === 1 && elem.getAttribute("id") === match;
        }, TAG: function (elem, match) {
            return(match === "*" && elem.nodeType === 1) || elem.nodeName.toLowerCase() === match;
        }, CLASS: function (elem, match) {
            return(" " + (elem.className || elem.getAttribute("class")) + " ").indexOf(match) > -1;
        }, ATTR: function (elem, match) {
            var name = match[1], result = Expr.attrHandle[name] ? Expr.attrHandle[name](elem) : elem[name] != null ? elem[name] : elem.getAttribute(name), value = result + "", type = match[2], check = match[4];
            return result == null ? type === "!=" : type === "=" ? value === check : type === "*=" ? value.indexOf(check) >= 0 : type === "~=" ? (" " + value + " ").indexOf(check) >= 0 : !check ? value && result !== false : type === "!=" ? value !== check : type === "^=" ? value.indexOf(check) === 0 : type === "$=" ? value.substr(value.length - check.length) === check : type === "|=" ? value === check || value.substr(0, check.length + 1) === check + "-" : false;
        }, POS: function (elem, match, i, array) {
            var name = match[2], filter = Expr.setFilters[name];
            if (filter) {
                return filter(elem, i, match, array);
            }
        }}};
        var origPOS = Expr.match.POS, fescape = function (all, num) {
            return"\\" + (num - 0 + 1);
        };
        for (var type in Expr.match) {
            Expr.match[type] = new RegExp(Expr.match[type].source + (/(?![^\[]*\])(?![^\(]*\))/.source));
            Expr.leftMatch[type] = new RegExp(/(^(?:.|\r|\n)*?)/.source + Expr.match[type].source.replace(/\\(\d+)/g, fescape));
        }
        var makeArray = function (array, results) {
            array = Array.prototype.slice.call(array, 0);
            if (results) {
                results.push.apply(results, array);
                return results;
            }
            return array;
        };
        try {
            Array.prototype.slice.call(document.documentElement.childNodes, 0)[0].nodeType;
        } catch (e) {
            makeArray = function (array, results) {
                var i = 0, ret = results || [];
                if (toString.call(array) === "[object Array]") {
                    Array.prototype.push.apply(ret, array);
                } else {
                    if (typeof array.length === "number") {
                        for (var l = array.length; i < l; i++) {
                            ret.push(array[i]);
                        }
                    } else {
                        for (; array[i]; i++) {
                            ret.push(array[i]);
                        }
                    }
                }
                return ret;
            };
        }
        var sortOrder, siblingCheck;
        if (document.documentElement.compareDocumentPosition) {
            sortOrder = function (a, b) {
                if (a === b) {
                    hasDuplicate = true;
                    return 0;
                }
                if (!a.compareDocumentPosition || !b.compareDocumentPosition) {
                    return a.compareDocumentPosition ? -1 : 1;
                }
                return a.compareDocumentPosition(b) & 4 ? -1 : 1;
            };
        } else {
            sortOrder = function (a, b) {
                var al, bl, ap = [], bp = [], aup = a.parentNode, bup = b.parentNode, cur = aup;
                if (a === b) {
                    hasDuplicate = true;
                    return 0;
                } else if (aup === bup) {
                    return siblingCheck(a, b);
                } else if (!aup) {
                    return-1;
                } else if (!bup) {
                    return 1;
                }
                while (cur) {
                    ap.unshift(cur);
                    cur = cur.parentNode;
                }
                cur = bup;
                while (cur) {
                    bp.unshift(cur);
                    cur = cur.parentNode;
                }
                al = ap.length;
                bl = bp.length;
                for (var i = 0; i < al && i < bl; i++) {
                    if (ap[i] !== bp[i]) {
                        return siblingCheck(ap[i], bp[i]);
                    }
                }
                return i === al ? siblingCheck(a, bp[i], -1) : siblingCheck(ap[i], b, 1);
            };
            siblingCheck = function (a, b, ret) {
                if (a === b) {
                    return ret;
                }
                var cur = a.nextSibling;
                while (cur) {
                    if (cur === b) {
                        return-1;
                    }
                    cur = cur.nextSibling;
                }
                return 1;
            };
        }
        Sizzle.getText = function (elems) {
            var ret = "", elem;
            for (var i = 0; elems[i]; i++) {
                elem = elems[i];
                if (elem.nodeType === 3 || elem.nodeType === 4) {
                    ret += elem.nodeValue;
                } else if (elem.nodeType !== 8) {
                    ret += Sizzle.getText(elem.childNodes);
                }
            }
            return ret;
        };
        (function () {
            var form = document.createElement("div"), id = "script" + (new Date()).getTime(), root = document.documentElement;
            form.innerHTML = "<a name='" + id + "'/>";
            root.insertBefore(form, root.firstChild);
            if (document.getElementById(id)) {
                Expr.find.ID = function (match, context, isXML) {
                    if (typeof context.getElementById !== "undefined" && !isXML) {
                        var m = context.getElementById(match[1]);
                        return m ? m.id === match[1] || typeof m.getAttributeNode !== "undefined" && m.getAttributeNode("id").nodeValue === match[1] ? [m] : undefined : [];
                    }
                };
                Expr.filter.ID = function (elem, match) {
                    var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
                    return elem.nodeType === 1 && node && node.nodeValue === match;
                };
            }
            root.removeChild(form);
            root = form = null;
        })();
        (function () {
            var div = document.createElement("div");
            div.appendChild(document.createComment(""));
            if (div.getElementsByTagName("*").length > 0) {
                Expr.find.TAG = function (match, context) {
                    var results = context.getElementsByTagName(match[1]);
                    if (match[1] === "*") {
                        var tmp = [];
                        for (var i = 0; results[i]; i++) {
                            if (results[i].nodeType === 1) {
                                tmp.push(results[i]);
                            }
                        }
                        results = tmp;
                    }
                    return results;
                };
            }
            div.innerHTML = "<a href='#'></a>";
            if (div.firstChild && typeof div.firstChild.getAttribute !== "undefined" && div.firstChild.getAttribute("href") !== "#") {
                Expr.attrHandle.href = function (elem) {
                    return elem.getAttribute("href", 2);
                };
            }
            div = null;
        })();
        if (document.querySelectorAll) {
            (function () {
                var oldSizzle = Sizzle, id = "__sizzle__";
                Sizzle = function (query, context, extra, seed) {
                    context = context || document;
                    if (!seed && !Sizzle.isXML(context)) {
                        var match = rSpeedUp.exec(query);
                        if (match && (context.nodeType === 1 || context.nodeType === 9)) {
                            if (match[1]) {
                                return makeArray(context.getElementsByTagName(query), extra);
                            } else if (match[2] && Expr.find.CLASS && context.getElementsByClassName) {
                                return makeArray(context.getElementsByClassName(match[2]), extra);
                            }
                        }
                        if (context.nodeType === 9) {
                            if (query === "body" && context.body) {
                                return makeArray([context.body], extra);
                            } else if (match && match[3]) {
                                var elem = context.getElementById(match[3]);
                                if (elem && elem.parentNode) {
                                    if (elem.id === match[3]) {
                                        return makeArray([elem], extra);
                                    }
                                } else {
                                    return makeArray([], extra);
                                }
                            }
                            try {
                                return makeArray(context.querySelectorAll(query), extra);
                            } catch (qsaError) {
                            }
                        } else if (context.nodeType === 1 && context.nodeName.toLowerCase() !== "object") {
                            var oldContext = context, old = context.getAttribute("id"), nid = old || id, hasParent = context.parentNode, relativeHierarchySelector = /^\s*[+~]/.test(query);
                            if (!old) {
                                context.setAttribute("id", nid);
                            } else {
                                nid = nid.replace(/'/g, "\\$&");
                            }
                            if (relativeHierarchySelector && hasParent) {
                                context = context.parentNode;
                            }
                            try {
                                if (!relativeHierarchySelector || hasParent) {
                                    return makeArray(context.querySelectorAll("[id='" + nid + "'] " + query), extra);
                                }
                            } catch (pseudoError) {
                            } finally {
                                if (!old) {
                                    oldContext.removeAttribute("id");
                                }
                            }
                        }
                    }
                    return oldSizzle(query, context, extra, seed);
                };
                for (var prop in oldSizzle) {
                    Sizzle[prop] = oldSizzle[prop];
                }
            })();
        }
        (function () {
            var html = document.documentElement, matches = html.matchesSelector || html.mozMatchesSelector || html.webkitMatchesSelector || html.msMatchesSelector, pseudoWorks = false;
            try {
                matches.call(document.documentElement, "[test!='']:sizzle");
            } catch (pseudoError) {
                pseudoWorks = true;
            }
            if (matches) {
                Sizzle.matchesSelector = function (node, expr) {
                    expr = expr.replace(/\=\s*([^'"\]]*)\s*\]/g, "='$1']");
                    if (!Sizzle.isXML(node)) {
                        try {
                            if (pseudoWorks || !Expr.match.PSEUDO.test(expr) && !/!=/.test(expr)) {
                                return matches.call(node, expr);
                            }
                        } catch (e) {
                        }
                    }
                    return Sizzle(expr, null, null, [node]).length > 0;
                };
            }
        })();
        Expr.order.splice(1, 0, "CLASS");
        Expr.find.CLASS = function (match, context, isXML) {
            if (typeof context.getElementsByClassName !== "undefined" && !isXML) {
                return context.getElementsByClassName(match[1]);
            }
        };
        function dirNodeCheck(dir, cur, doneName, checkSet, nodeCheck, isXML) {
            for (var i = 0, l = checkSet.length; i < l; i++) {
                var elem = checkSet[i];
                if (elem) {
                    var match = false;
                    elem = elem[dir];
                    while (elem) {
                        if (elem.sizcache === doneName) {
                            match = checkSet[elem.sizset];
                            break;
                        }
                        if (elem.nodeType === 1 && !isXML) {
                            elem.sizcache = doneName;
                            elem.sizset = i;
                        }
                        if (elem.nodeName.toLowerCase() === cur) {
                            match = elem;
                            break;
                        }
                        elem = elem[dir];
                    }
                    checkSet[i] = match;
                }
            }
        }

        function dirCheck(dir, cur, doneName, checkSet, nodeCheck, isXML) {
            for (var i = 0, l = checkSet.length; i < l; i++) {
                var elem = checkSet[i];
                if (elem) {
                    var match = false;
                    elem = elem[dir];
                    while (elem) {
                        if (elem.sizcache === doneName) {
                            match = checkSet[elem.sizset];
                            break;
                        }
                        if (elem.nodeType === 1) {
                            if (!isXML) {
                                elem.sizcache = doneName;
                                elem.sizset = i;
                            }
                            if (typeof cur !== "string") {
                                if (elem === cur) {
                                    match = true;
                                    break;
                                }
                            } else if (Sizzle.filter(cur, [elem]).length > 0) {
                                match = elem;
                                break;
                            }
                        }
                        elem = elem[dir];
                    }
                    checkSet[i] = match;
                }
            }
        }

        if (document.documentElement.compareDocumentPosition) {
            Sizzle.contains = function (a, b) {
                return!!(a.compareDocumentPosition(b) & 16);
            };
        } else if (document.documentElement.contains) {
            Sizzle.contains = function (a, b) {
                if (a !== b && a.contains && b.contains) {
                    return a.contains(b);
                } else if (!b || b.nodeType == 9) {
                    return false;
                } else if (b === a) {
                    return true;
                } else {
                    return Sizzle.contains(a, b.parentNode);
                }
            };
        } else {
            Sizzle.contains = function () {
                return false;
            };
        }
        Sizzle.isXML = function (elem) {
            var documentElement = (elem ? elem.ownerDocument || elem : 0).documentElement;
            return documentElement ? documentElement.nodeName !== "HTML" : false;
        };
        var posProcess = function (selector, context) {
            var match, tmpSet = [], later = "", root = context.nodeType ? [context] : context;
            while ((match = Expr.match.PSEUDO.exec(selector))) {
                later += match[0];
                selector = selector.replace(Expr.match.PSEUDO, "");
            }
            selector = Expr.relative[selector] ? selector + "*" : selector;
            for (var i = 0, l = root.length; i < l; i++) {
                Sizzle(selector, root[i], tmpSet);
            }
            return Sizzle.filter(later, tmpSet);
        };
        QZFL.selector = window.Sizzle = Sizzle;
        QZFL.object.makeArray = QZFL.dom.collection2Array = makeArray;
        QZFL.dom.uniqueSort = Sizzle.uniqueSort;
        QZFL.dom.contains = Sizzle.contains;
    })();
    ;
    (function () {
        var _handler = QZFL.ElementHandler = function (selector, context) {
            this.elements = null;
            this._isElementHandler = true;
            this._init(selector, context);
        };
        _handler.prototype = {_init: function (selector, context) {
            if (QZFL.lang.isString(selector)) {
                this.elements = QZFL.selector(selector, context);
            } else if (selector instanceof QZFL.ElementHandler) {
                this.elements = selector.elements.slice();
            } else if (QZFL.lang.isArray(selector)) {
                this.elements = selector;
            } else if (selector && ((selector.nodeType && selector.nodeType !== 3 && selector.nodeType !== 8) || selector.setTimeout)) {
                this.elements = [selector];
            } else {
                this.elements = [];
            }
        }, findElements: function (selector) {
            var _pushstack = [], _s;
            this.each(function (el) {
                _s = QZFL.selector(selector, el);
                if (_s.length > 0) {
                    _pushstack = _pushstack.concat(_s);
                }
            });
            return _pushstack;
        }, find: function (selector) {
            return _el.get(this.findElements(selector));
        }, filter: function (expr, elems, not) {
            if (not) {
                expr = ":not(" + expr + ")";
            }
            return _el.get(QZFL.selector.matches(expr, elems || this.elements));
        }, each: function (fn) {
            QZFL.object.each(this.elements, fn);
            return this;
        }, concat: function (elements) {
            return _el.get(this.elements.concat(!!elements._isElementHandler ? elements.elements : elements));
        }, get: function (index) {
            return _el.get(this.elements[index]);
        }, eq: function (index) {
            return this.elements[index || 0];
        }, slice: function () {
            return _el.get(Array.prototype.slice.apply(this.elements, arguments));
        }};
        var _el = QZFL.element = {get: function (selector, context) {
            return new _handler(selector, context);
        }, extend: function (object) {
            QZFL.object.extend(_handler, object);
        }, extendFn: function (object) {
            QZFL.object.extend(_handler.prototype, object);
        }, getVersion: function () {
            return _handler.version;
        }}
    })();
    QZFL.element.extend({version: "1.0"});
    QZFL.element.extendFn({bind: function (evtType, fn, argArr) {
        if (typeof(fn) != 'function') {
            return false;
        }
        return this.each(function (el) {
            QZFL.event.addEvent(el, evtType, fn, argArr);
        });
    }, unBind: function (evtType, fn) {
        return this.each(function (el) {
            QZFL.event[fn ? 'removeEvent' : 'purgeEvent'](el, evtType, fn);
        });
    }, onHover: function (fnOver, fnOut) {
        this.onMouseOver(fnOver);
        return this.onMouseOut(fnOut);
    }, onMouseEnter: function (fn) {
        return this.bind('mouseover', function (evt) {
            var rel = QZFL.event.getRelatedTarget(evt);
            if (QZFL.lang.isFunction(fn) && !QZFL.dom.isAncestor(this, rel)) {
                fn.call(this, evt);
            }
        });
    }, onMouseLeave: function (fn) {
        return this.bind('mouseout', function (evt) {
            var rel = QZFL.event.getRelatedTarget(evt);
            if (QZFL.lang.isFunction(fn) && !QZFL.dom.isAncestor(this, rel)) {
                fn.call(this, evt);
            }
        });
    }, delegate: function (selector, eventType, fn, argsArray) {
        if (typeof(fn) != 'function') {
            return false;
        }
        return this.each(function (el) {
            QZFL.event.delegate(el, selector, eventType, fn, argsArray);
        });
    }, undelegate: function (selector, eventType, fn) {
        return this.each(function (el) {
            QZFL.event.undelegate(el, selector, eventType, fn);
        });
    }});
    QZFL.object.each(['onClick', 'onMouseDown', 'onMouseUp', 'onMouseOver', 'onMouseMove', 'onMouseOut', 'onFocus', 'onBlur', 'onKeyDown', 'onKeyPress', 'onKeyUp'], function (name, index) {
        QZFL.ElementHandler.prototype[name] = function (fn) {
            return this.bind(name.slice(2).toLowerCase(), fn);
        };
    });
    QZFL.element.extendFn({setHtml: function (value) {
        return this.setAttr("innerHTML", value);
    }, getHtml: function (index) {
        var _e = this.elements[index || 0];
        return!!_e ? _e.innerHTML : null;
    }, setVal: function (value) {
        if (QZFL.object.getType(value) == "array") {
            var _v = "\x00" + value.join("\x00") + "\x00";
            this.each(function (el) {
                if (/radio|checkbox/.test(el.type)) {
                    el.checked = el.nodeType && ("\x00" + _v.indexOf(el.value.toString() + "\x00") > -1 || _v.indexOf("\x00" + el.name.toString() + "\x00") > -1);
                } else if (el.tagName == "SELECT") {
                    QZFL.object.each(el.options, function (e) {
                        e.selected = e.nodeType == 1 && ("\x00" + _v.indexOf(e.value.toString() + "\x00") > -1 || _v.indexOf("\x00" + e.text.toString() + "\x00") > -1);
                    });
                } else {
                    el.value = value;
                }
            })
        } else {
            this.setAttr("value", value);
        }
        return this;
    }, getVal: function (index) {
        var _e = this.elements[index || 0], _v;
        if (_e) {
            if (_e.tagName == "SELECT") {
                _v = [];
                if (_e.selectedIndex < 0) {
                    return null;
                }
                if (_e.type == "select-one") {
                    _v.push(_e.value);
                } else {
                    QZFL.object.each(_e.options, function (e) {
                        if (e.nodeType == 1 && e.selected) {
                            _v.push(e.value);
                        }
                    });
                }
            } else {
                _v = _e.value;
            }
        } else {
            return null
        }
        return _v;
    }, hasClass: function (className) {
        if (this.elements && this.elements.length) {
            return QZFL.css.hasClassName(this.elements[0], className);
        }
        return false;
    }, addClass: function (className) {
        return this.each(function (el) {
            QZFL.css.addClassName(el, className);
        })
    }, removeClass: function (className) {
        return this.each(function (el) {
            QZFL.css.removeClassName(el, className);
        })
    }, toggleClass: function (className) {
        return this.each(function (el) {
            QZFL.css.toggleClassName(el, className);
        })
    }, getSize: function (index) {
        var _e = this.elements[index || 0];
        return!!_e ? QZFL.dom.getSize(_e) : null;
    }, getXY: function (index) {
        var _e = this.elements[index || 0];
        return!!_e ? QZFL.dom.getXY(_e) : null;
    }, setSize: function (width, height) {
        return this.each(function (el) {
            QZFL.dom.setSize(el, width, height);
        })
    }, setXY: function (X, Y) {
        return this.each(function (el) {
            QZFL.dom.setXY(el, X, Y);
        })
    }, hide: function () {
        return this.each(function (el) {
            QZFL.dom.setStyle(el, "display", "none");
        })
    }, show: function (isBlock) {
        return this.each(function (el) {
            QZFL.dom.setStyle(el, "display", isBlock ? 'block' : '');
        })
    }, getStyle: function (key, index) {
        var _e = this.elements[index || 0];
        return!!_e ? QZFL.dom.getStyle(_e, key) : null;
    }, setStyle: function (key, value) {
        return this.each(function (el) {
            QZFL.dom.setStyle(el, key, value);
        })
    }, setAttr: function (key, value) {
        key = (key == "class" ? "className" : key);
        return this.each(function (el) {
            el[key] = value;
        });
    }, getAttr: function (key, index) {
        key = key == "class" ? "className" : key;
        var node = this.elements[index || 0];
        return node ? (node[key] === undefined ? node.getAttribute(key) : node[key]) : null;
    }});
    QZFL.element.extendFn({getPrev: function () {
        var _arr = [];
        this.each(function (el) {
            var _e = QZFL.dom.getPreviousSibling(el);
            _arr.push(_e);
        });
        return QZFL.element.get(_arr);
    }, getNext: function () {
        var _arr = [];
        this.each(function (el) {
            var _e = QZFL.dom.getNextSibling(el);
            _arr.push(_e);
        });
        return QZFL.element.get(_arr);
    }, getChildren: function () {
        var _arr = [];
        this.each(function (el) {
            var node = QZFL.dom.getFirstChild(el);
            while (node) {
                if (!!node && node.nodeType == 1) {
                    _arr.push(node);
                }
                node = node.nextSibling;
            }
        });
        return QZFL.element.get(_arr);
    }, getParent: function () {
        var _arr = [];
        this.each(function (el) {
            var _e = el.parentNode;
            _arr.push(_e);
        });
        return QZFL.element.get(_arr);
    }});
    QZFL.element.extendFn({create: function (tagName, attributes) {
        var _arr = [];
        this.each(function (el) {
            _arr.push(QZFL.dom.createElementIn(tagName, el, false, attributes));
        });
        return QZFL.element.get(_arr);
    }, appendTo: function (el) {
        var el = (el.elements && el.elements[0]) || QZFL.dom.get(el);
        return this.each(function (element) {
            el.appendChild(element)
        });
    }, insertAfter: function (el) {
        var el = (el.elements && el.elements[0]) || QZFL.dom.get(el), _ns = el.nextSibling, _p = el.parentNode;
        return this.each(function (element) {
            _p[!_ns ? "appendChild" : "insertBefore"](element, _ns);
        });
    }, insertBefore: function (el) {
        var el = (el.elements && el.elements[0]) || QZFL.dom.get(el), _p = el.parentNode;
        return this.each(function (element) {
            _p.insertBefore(element, el)
        });
    }, remove: function () {
        return this.each(function (el) {
            QZFL.dom.removeElement(el);
        })
    }});
    QZFL.effect = {off: 0, mode: [], init: function () {
        var classArray = [
            ['webkit', 'WebkitTransition'],
            ['firefox', 'MozTransition'],
            ['opera', 'OTransition'],
            ['ie', 'msTransition']
        ], ua = QZFL.userAgent, agent = '', cName = '';
        for (var i = 0, len = classArray.length; i < len; i++) {
            if (ua[classArray[i][0]]) {
                agent = classArray[i][0];
                cName = classArray[i][1];
                break;
            }
        }
        return QZFL.effect.mode = ((cName in document.documentElement.style) ? [agent, 'css3'] : [agent]);
    }, run: function (elem, prop, opts) {
        var o = QZFL.effect, tid = ++o._uniqueID, fpropArray, fprop, qDom;
        if (!elem) {
            return;
        }
        if (!o.mode[0]) {
            o.init();
        }
        opts = o._opt(opts);
        opts.start();
        elem = QZFL.dom.get(elem);
        fpropArray = o._prop(prop, elem);
        fprop = fpropArray[0];
        elem._tid = tid;
        if (o.off) {
            qDom = QZFL.dom;
            for (var i in fpropArray[1]) {
                qDom.setStyle(elem, i, fpropArray[1][i]);
            }
            window.setTimeout(opts.complete, opts.duration);
        } else {
            var t = new QZFL.tweenMaker(0, 100, opts.duration, opts.interval, opts);
            t.onStart = (o.mode[1] == 'css3') ? function () {
                o._tweenArray[tid] = t;
                (new QZFL.cssTransfrom(elem, fprop, opts)).firecss();
            } : function () {
                o._tweenArray[tid] = t;
            };
            t.onChange = (o.mode[1] != 'css3') ? function (p) {
                o.drawStyle(fprop, p, elem);
                opts.change(p);
            } : function (p) {
                opts.change(p);
            };
            t.onEnd = function () {
                if (o.mode[1] != 'css3') {
                    opts.complete();
                }
                delete o._tweenArray[elem._tid];
            };
            t.start();
        }
    }, getPercent: function (elem) {
        var elem = QZFL.dom.get(elem), tid = elem._tid, t = QZFL.effect._tweenArray[tid];
        return t.getPercent();
    }, stop: function (elem) {
        var es = QZFL.effect, webkit = (es.mode[1] == 'css3'), o;
        elem = QZFL.dom.get(elem);
        if (webkit) {
            (o = elem._transition) && o.stop();
        } else {
            var tid = elem._tid, t = es._tweenArray[tid];
            t && t.stop();
        }
        return es;
    }, drawStyle: function (prop, p, elem) {
        var DOM = QZFL.dom, tmp, cssText = '', re, S = QZFL.string;
        p *= 0.01;
        QZFL.object.each(prop, function (f, pname) {
            var s = f.start, e = f.end, u = f.unit;
            v = e >= s ? ((e - s) * p + s) : (s - (s - e) * p);
            re = DOM.convertStyle(elem, pname, v + u);
            cssText += (S.reCamelCase(re.prop) + ':' + re.value + ';');
        });
        elem.style.cssText += (';' + cssText);
    }, _tweenArray: {}, _uniqueID: 0, _opt: function (opts) {
        var opt = opts, o = QZFL.effect;
        opt.duration = opts.duration || 500;
        opt.easing = opts.easing || 'ease';
        opt.complete = opts.complete || QZFL.emptyFn;
        opt.interval = opts.interval || 16;
        opt.start = opts.start || QZFL.emptyFn;
        opt.change = opts.change || QZFL.emptyFn;
        return opt;
    }, _prop: function (prop, elem) {
        var fprop = {}, es = QZFL.effect, webkit = (es.mode[1] == 'css3'), endCSSMap = {};
        QZFL.object.each(prop, function (val, pname) {
            pname = QZFL.string.camelCase(pname);
            if (QZFL.object.getType(val) == "object") {
                var f = es._cssValue(elem, val.value, pname);
                endCSSMap[pname] = (val.value = f.end + (f.unit ? f.unit : 0));
                if (webkit) {
                    fprop[pname] = val;
                } else {
                    fprop[pname] = f;
                }
            } else {
                var d = es._cssValue(elem, val, pname), tmp;
                endCSSMap[pname] = (tmp = d.end + (d.unit ? d.unit : 0));
                if (webkit) {
                    d = tmp;
                }
                fprop[pname] = d;
            }
        });
        return[fprop, endCSSMap];
    }, _cssValue: function (elem, val, name) {
        var fnum = /^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i, fprop = {}, parts = fnum.exec(val + ''), o = QZFL.effect, start = o._cur(elem, name);
        if (parts) {
            var end = parseFloat(parts[2]), unit = parts[3] || (o._cssNumber[name] ? "" : "px");
            if (unit !== "px") {
                QZFL.dom.setStyle(elem, name, (end || 1) + unit);
                start = ((end || 1) / o._cur(elem, name)) * start;
                QZFL.dom.setStyle(elem, name, start + unit);
            }
            if (parts[1]) {
                end = ((parts[1] === "-=" ? -1 : 1) * end) + start;
            }
            fprop = {start: start, end: end, unit: unit};
        } else {
            fprop = {start: start, end: val, unit: ''};
        }
        return fprop;
    }, _cssNumber: {"zIndex": true, "fontWeight": true, "opacity": true, "zoom": true, "lineHeight": true}, _cur: function (elem, p) {
        var parsed, r = QZFL.dom.getStyle(elem, p);
        if (elem != null && elem[p] != null && (!elem.style || elem.style[p] == null)) {
            return elem[p];
        }
        return isNaN(parsed = parseFloat(r)) ? !r || r === "auto" ? 0 : r : parsed;
    }, show: function (elem, opts, cb) {
        var d = QZFL.dom, duration;
        elem = d.get(elem);
        opts = opts || {};
        duration = ((typeof(opts) == 'number') ? opts : opts.duration);
        cb = opts.start || QZFL.emptyFn;
        QZFL.effect.run(elem, {opacity: 1}, QZFL.object.extend(opts, {duration: duration || 1000, start: function () {
            d.setStyle(elem, 'opacity', 0);
            d.setStyle(elem, 'display', '');
            cb();
        }, complete: cb}));
    }, hide: function (elem, opts, cb) {
        var d = QZFL.dom, cb, duration;
        elem = d.get(elem);
        opts = opts || {};
        duration = ((typeof(opts) == 'number') ? opts : opts.duration);
        cb = cb || opts.complete || QZFL.emptyFn;
        QZFL.effect.run(elem, {opacity: 0}, QZFL.object.extend(opts, {duration: duration || 1000, complete: function () {
            d.setStyle(elem, 'display', 'none');
            d.setStyle(elem, 'opacity', 1);
            cb();
        }}));
    }, toggle: function (elem, opts) {
        var o = QZFL.effect;
        opts = opts || {};
        if (o._isHidden(elem)) {
            o.stop(elem).show(elem, opts);
        } else {
            o.stop(elem).hide(elem, opts);
        }
    }, slideDown: function (elem, opts) {
        var d = QZFL.dom, attrs, o = QZFL.effect, toValue = {}, _obj = QZFL.object, duration, start, complete;
        elem = d.get(elem);
        attrs = o._checkVerticalStyle(elem, {status: 'down'});
        opts = opts || {};
        if (attrs) {
            duration = ((typeof(opts) == 'number') ? opts : opts.duration);
            start = opts.start || QZFL.emptyFn;
            complete = opts.complete || QZFL.emptyFn;
            o.run(elem, attrs, _obj.extend(opts, {duration: duration || 1000, start: function () {
                if (attrs && !opts.noClear) {
                    _obj.each(attrs, function (v, i) {
                        d.setStyle(elem, i, '0px');
                    });
                }
                d.setStyle(elem, 'display', '');
                start();
            }, complete: function () {
                complete();
                o._checkVerticalStyle(elem, {clear: 1});
            }}));
        }
    }, slideUp: function (elem, opts) {
        var d = QZFL.dom, attrs, o = QZFL.effect, toValue = {}, _obj = QZFL.object, duration, complete;
        elem = d.get(elem);
        attrs = o._checkVerticalStyle(elem, {status: 'up'});
        if (attrs) {
            _obj.each(attrs, function (v, i) {
                toValue[i] = '0px';
            });
            opts = opts || {};
            duration = ((typeof(opts) == 'number') ? opts : opts.duration);
            complete = opts.complete || QZFL.emptyFn;
            d.setStyle(elem, 'display', '');
            o.run(elem, toValue, _obj.extend(opts, {duration: duration || 1000, complete: function () {
                d.setStyle(elem, 'display', 'none');
                _obj.each(attrs, function (v, i) {
                    d.setStyle(elem, i, v);
                });
                o._checkVerticalStyle(elem, {clear: 1});
                complete();
            }}));
        }
    }, _slideArray: {}, slideToggle: function (elem, opts) {
        var o = QZFL.effect, status, opts = opts || {};
        if (o._isHidden(elem)) {
            o.stop(elem).slideDown(elem, opts);
        } else {
            if (elem._slideid) {
                status = o._slideArray[elem._slideid].status;
                if (status == 'up') {
                    opts.noClear = 1;
                    o._slideArray[elem._slideid].status = 'down';
                    o.stop(elem).slideDown(elem, opts);
                } else if (status == 'down') {
                    o._slideArray[elem._slideid].status = 'up';
                    o.stop(elem).slideUp(elem, opts);
                }
            } else {
                o.stop(elem).slideUp(elem, opts);
            }
        }
    }, _checkVerticalStyle: function (elem, opts) {
        var name = ['marginTop', 'marginBottom', 'paddingTop', 'paddingBottom', 'height'], obj = {}, D = QZFL.dom, re, o = QZFL.effect;
        if (opts.clear) {
            if (o._slideArray[elem._slideid]) {
                delete o._slideArray[elem._slideid];
                delete elem._slideid;
            }
            return null;
        }
        if (!elem._slideid) {
            elem._slideid = ++o._uniqueID;
        }
        if (!(re = o._slideArray[elem._slideid])) {
            QZFL.object.each(name, function (v) {
                var val = parseInt(D.getStyle(elem, v), 10);
                if (val) {
                    obj[v] = val;
                    re = 1;
                }
            });
            o._slideArray[elem._slideid] = {pps: obj, status: opts.status};
        } else {
            obj = re.pps;
        }
        return re ? obj : null;
    }, _isHidden: function (elem) {
        return QZFL.dom.getStyle(elem, 'display') == 'none';
    }};
    QZFL.tweenMaker = function (startvalue, endvalue, duration, interval, opt) {
        var o = this, opt = opt || {}, easing;
        o.duration = duration || 500;
        o.interval = interval || 16;
        o.startValue = startvalue;
        o.endValue = endvalue;
        easing = opt.easing || 'ease';
        o.functor = (typeof(opt.functor) == 'function' ? opt.functor : (o.functors[easing] || o.functors['ease']));
        o.onStart = o.onChange = o.onEnd = QZFL.emptyFn;
        o.playing = false;
        o.changeValue = o.endValue - o.startValue;
        o.currentValue = 0;
    };
    QZFL.tweenMaker.prototype = {functors: {'ease': function (t, s, c, d) {
        if ((t /= d / 2) < 1)return c / 2 * t * t * t + s;
        return c / 2 * ((t -= 2) * t * t + 2) + s;
    }, 'linear': function (t, s, c, d) {
        return c * t / d + s;
    }, 'ease-in': function (t, s, c, d) {
        return c * (t /= d) * t * t + s;
    }, 'ease-out': function (t, s, c, d) {
        return c * ((t = t / d - 1) * t * t + 1) + s;
    }, 'ease-in-out': function (t, s, c, d) {
        if ((t /= d / 2) < 1)return c / 2 * t * t * t + s;
        return c / 2 * ((t -= 2) * t * t + 2) + s;
    }}, start: function () {
        var o = this;
        o.playing = true;
        o._startTime = new Date().getTime();
        o.onStart.apply(o);
        o._runTimer();
    }, _runTimer: function () {
        var o = this;
        if (o.playing) {
            o._playTimer();
            setTimeout(function () {
                o._runTimer.apply(o, []);
            }, o.interval);
        }
    }, _playTimer: function (time) {
        var _end = false, o = this, time = (new Date().getTime() - o._startTime);
        if (time > o.duration) {
            time = o.duration;
            _end = true;
        }
        o.currentValue = o.functor(time, o.startValue, o.changeValue, o.duration);
        o.onChange.apply(o, [o.getPercent()]);
        if (_end) {
            o.playing = false;
            o.onEnd.apply(this);
            if (window.CollectGarbage) {
                CollectGarbage();
            }
        }
    }, stop: function () {
        this.playing = false;
    }, getPercent: function () {
        return(this.currentValue - this.startValue) / this.changeValue * 100;
    }};
    QZFL.cssTransfrom = function (elem, prop, opts) {
        var o = this;
        o._elem = elem;
        o._uid = 'uid_' + (++QZFL.cssTransfrom._count);
        if (!o._running && prop) {
            o._conf = prop;
            o._duration = ('duration'in opts) ? opts.duration / 1000 : 0.5;
            o._delay = ('delay'in opts) ? opts.delay : 0;
            o._easing = opts.easing || 'ease';
            o._count = 0;
            o._running = false;
            o._callback = QZFL.lang.isFunction(opts.complete) ? opts.complete : QZFL.emptyFn;
            o._change = opts.change;
            elem._transition = o;
        }
        return o;
    };
    QZFL.cssTransfrom._cssText = {};
    QZFL.cssTransfrom._attrs = {};
    QZFL.cssTransfrom._hasEnd = {};
    QZFL.cssTransfrom._count = 10000;
    QZFL.cssTransfrom.prototype = {init: function () {
        var map = [
            ['webkit', '-webkit-transition', 'WebkitTransition', 'webkitTransitionEnd', 'WebkitTransform'],
            ['firefox', '-moz-transition', 'MozTransition', 'transitionend', 'MozTransform'],
            ['opera', '-o-transition', 'OTransition', 'oTransitionEnd', 'OTransform'],
            ['ie', '-ms-transition', 'msTransition', 'MSTransitionEnd', 'msTransform']
        ], tiClassPrefix, tiStyleName, tiEvtName, tfStyleName, ua = QZFL.userAgent, proto;
        for (var i = 0, len = map.length; i < len; i++) {
            if (ua[map[i][0]]) {
                tiClassPrefix = map[i][1];
                tiStyleName = map[i][2];
                tiEvtName = map[i][3];
                tfStyleName = map[i][4];
                break;
            }
        }
        proto = QZFL.cssTransfrom.prototype;
        proto.TRANSITION = {'classPrefix': tiClassPrefix, 'event': tiEvtName, 'styleName': tiStyleName};
        proto.TRANSFORM = {'styleName': tfStyleName};
    }, firecss: function () {
        var o = this, elem = o._elem, uid = o._uid, conf = this._conf, getStyle = QZFL.dom.getStyle, ct = QZFL.cssTransfrom, attrs;
        var cssTextArray = [], delayKey, delayVal = [], pptVal = [], durationKey, durationVal = [], easingKey, easingVal = [], TRANSFORM, cPrefix, _cprop = '', cssText;
        if (!(this.TRANSITION && this.TRANSITION.classPrefix)) {
            this.init();
        }
        this._running = true;
        cPrefix = this.TRANSITION.classPrefix;
        delayKey = cPrefix + '-delay';
        this.pptKey = cPrefix + '-property';
        durationKey = cPrefix + '-duration';
        easingKey = cPrefix + '-timing-function';
        TRANSFORM = this.TRANSFORM.styleName;
        if (conf.transform && !conf[TRANSFORM]) {
            conf[TRANSFORM] = conf.transform;
            delete conf.transform;
        }
        for (var attr in conf) {
            if (conf.hasOwnProperty(attr)) {
                o._addProperty(attr, conf[attr]);
                if (elem.style[attr] === '') {
                    QZFL.dom.setStyle(elem, attr, getStyle(elem, attr));
                }
            }
            _cprop = attr;
        }
        pptVal.push(getStyle(elem, this.pptKey));
        if (pptVal[0] && (pptVal[0] !== 'all')) {
            durationVal.push(getStyle(elem, durationKey));
            easingVal.push(getStyle(elem, easingKey));
            delayVal.push(getStyle(elem, delayKey));
        } else {
            pptVal.pop();
        }
        attrs = ct._attrs[uid];
        for (var name in attrs) {
            hyphy = o._toHyphen(name);
            attr = attrs[name];
            if (attrs.hasOwnProperty(name) && attr.transition === o) {
                if (name in elem.style) {
                    durationVal.push(parseFloat(attr.duration) + 's');
                    delayVal.push(parseFloat(attr.delay) + 's');
                    easingVal.push(attr.easing);
                    pptVal.push(hyphy);
                    cssTextArray.push(hyphy + ': ' + attr.value);
                } else {
                    o._removeProperty(name);
                }
            }
        }
        if (!ct._hasEnd[uid]) {
            elem.addEventListener(this.TRANSITION.event, (elem._transitionCb = function (e) {
                o._onTransfromEnd(e, uid);
            }), false);
            o.timer = window.setTimeout(function () {
                o._end();
            }, o._duration * 1000);
            ct._hasEnd[uid] = true;
        }
        cssText = cssTextArray.join(';');
        ct._cssText[uid] = {};
        ct._cssText[uid].property = pptVal;
        ct._cssText[uid].style = elem.style.cssText;
        elem.style.cssText += ['', this.pptKey + ':' + pptVal.join(','), durationKey + ':' + durationVal.join(','), easingKey + ':' + easingVal.join(','), delayKey + ':' + delayVal.join(','), cssText, ''].join(';');
    }, _toHyphen: function (prop) {
        prop = prop.replace(/([A-Z]?)([a-z]+)([A-Z]?)/g, function (m0, m1, m2, m3) {
            var str = '';
            m1 && (str += '-' + m1.toLowerCase());
            str += m2;
            m3 && (str += '-' + m3.toLowerCase());
            return str;
        });
        return prop;
    }, _endTransfrom: function (sname) {
        var QF = QZFL, elem = this._elem, pptKey = this.pptKey, value = QF.dom.getStyle(elem, pptKey);
        if (!value) {
            pptKey = QF.string.camelCase(pptKey);
            value = elem.style[pptKey];
        }
        if (typeof value === 'string') {
            value = value.replace(new RegExp('(?:^|,\\s)' + sname + ',?'), ',');
            value = value.replace(/^,|,$/, '');
            elem.style[this.TRANSITION.styleName] = value || null;
        }
    }, _onTransfromEnd: function (e, uid) {
        var pname = QZFL.string.camelCase(e.propertyName), elapsed = e.elapsedTime, attrs = QZFL.cssTransfrom._attrs[uid], attr = attrs && attrs[pname], tran = (attr) ? attr.transition : null, _cprop = '';
        if (tran) {
            window.clearTimeout(this.timer);
            this.timer = null;
            for (var attr in this._conf) {
                _cprop = attr;
            }
            tran._removeProperty(pname);
            tran._endTransfrom(pname);
            if (tran._count <= 0) {
                tran._end(elapsed);
            }
        }
    }, _addProperty: function (prop, conf) {
        var o = this, node = this._elem, uid = o._uid, attrs = QZFL.cssTransfrom._attrs[uid], computed, compareVal, dur, attr, val;
        if (!attrs) {
            attrs = QZFL.cssTransfrom._attrs[uid] = {};
        }
        attr = attrs[prop];
        if (conf && conf.value !== undefined) {
            val = conf.value;
        } else if (conf !== undefined) {
            val = conf;
            conf = {};
        }
        if (attr && attr.transition) {
            if (attr.transition !== o) {
                attr.transition._count--;
            }
        }
        o._count++;
        dur = ((typeof conf.duration != 'undefined') ? conf.duration : o._duration) || 0.0001;
        attrs[prop] = {value: val, duration: dur, delay: (typeof conf.delay != 'undefined') ? conf.delay : o._delay, easing: conf.easing || o._easing, transition: o};
        computed = QZFL.dom.getStyle(node, prop);
        compareVal = (typeof val === 'string') ? computed : parseFloat(computed);
        if (compareVal === val) {
            setTimeout(function () {
                o._onTransfromEnd.call(o, {propertyName: prop, elapsedTime: dur}, uid);
            }, dur * 1000);
        }
    }, _removeProperty: function (prop) {
        var o = this, attrs = QZFL.cssTransfrom._attrs[o._uid];
        if (attrs && attrs[prop]) {
            delete attrs[prop];
            o._count--;
        }
    }, _end: function () {
        var o = this, elem = o._elem, callback = o._callback;
        o._running = false;
        o._callback = null;
        if (elem && callback && !this._stoped) {
            setTimeout(function () {
                callback();
            }, 1);
            o.clearStatus(elem);
        }
    }, stop: function () {
        var uid = this._uid, elem = this._elem, cText, pps, styleText = [];
        cText = QZFL.cssTransfrom._cssText[uid];
        pps = cText.property;
        for (var i = 0; i < pps.length; i++) {
            styleText.push(pps[i] + ':' + QZFL.dom.getStyle(elem, pps[i]));
        }
        this.clearStatus(elem, styleText.join(';'));
        this._stoped = true;
    }, clearStatus: function (elem, style) {
        elem.style.cssText = elem.style.cssText.replace(/[^;]+?transition[^;]+?;/ig, '') + (style ? style : '');
        if (elem._transitionCb) {
            elem.removeEventListener(this.TRANSITION.event, elem._transitionCb, false);
            elem._transitionCb = null;
        }
    }};
    QZFL.now = function () {
        return(new Date()).getTime();
    };
    QZFL.string = QZFL.string || {};
    QZFL.string.camelCase = function (s) {
        var r = /-([a-z])/ig;
        return s.replace(r, function (all, letter) {
            return letter.toUpperCase();
        });
    };
    QZFL.string.reCamelCase = function (s) {
        var r = /[A-Z]/g;
        return s.replace(r, function (all, letter) {
            return'-' + all.toLowerCase();
        });
    };
    QZFL.Tween = function (elem, prop, func, startValue, finishValue, duration) {
        var o = this;
        o.elem = QZFL.dom.get(elem);
        o.prop = {};
        o.sv = startValue;
        o.fv = finishValue;
        o.pname = prop;
        o.prop[prop] = parseInt(finishValue);
        o.opts = {duration: duration * 1000};
        o.onMotionStart = QZFL.emptyFn;
        o.onMotionChange = null;
        o.onMotionStop = QZFL.emptyFn;
        o.css = true;
    };
    QZFL.Tween.prototype.start = function () {
        var o = this, s = parseInt(o.sv), e = parseInt(o.fv);
        var set = QZFL.dom.setStyle(o.elem, o.pname, o.sv);
        if (set) {
            o.opts.complete = o.onMotionStop;
            o.opts.change = function (p) {
                p *= 0.01;
                var v = e >= s ? ((e - s) * p + s) : (s - (s - e) * p);
                o.onMotionChange && o.onMotionChange.apply(o, [o.elem, o.pname, v]);
            }
            o.onMotionStart.apply(o);
            QZFL.effect.run(o.elem, o.prop, o.opts);
        } else {
            o.css = false;
            var t = new QZFL.tweenMaker(s, e, o.opts.duration, o.opts.interval || 15);
            t.onStart = function () {
                o.t = t;
                o.onMotionStart.apply(o);
            };
            t.onChange = function (p) {
                p *= 0.01;
                var v = e >= s ? ((e - s) * p + s) : (s - (s - e) * p);
                o.onMotionChange && o.onMotionChange.apply(o, [o.elem, o.pname, v]);
            };
            t.onEnd = function () {
                o.onMotionStop.apply(o);
            };
            t.start();
        }
    };
    QZFL.Tween.prototype.getPercent = function () {
        return this.css ? QZFL.effect.getPercent(this.elem) : this.t.getPercent();
    };
    QZFL.Tween.prototype.stop = function () {
        QZFL.effect.stop(this.elem);
    };
    QZFL.transitions = {};
    ;
    (function () {
        var _easeAnimate = function (_t, a1, a2, ease) {
            var _s = QZFL.dom["get" + _t](this), _reset = typeof a1 != "number" && typeof a2 != "number";
            if (_t == "Size" && _reset) {
                QZFL.dom["set" + _t](this, a1, a2);
                var _s1 = QZFL.dom["get" + _t](this);
                a1 = _s1[0];
                a2 = _s1[1];
            }
            var _v1 = _s[0] - a1;
            var _v2 = _s[1] - a2;
            var n = new QZFL.Tween(this, "_p", QZFL.transitions[ease] || QZFL.transitions.regularEaseOut, 0, 100, 0.5);
            n.onMotionChange = QZFL.event.bind(this, function () {
                var _p = arguments[2];
                QZFL.dom["set" + _t](this, typeof a1 != "number" ? _s[0] : (_s[0] - _p / 100 * _v1), typeof a2 != "number" ? _s[1] : (_s[1] - _p / 100 * _v2));
            });
            if (_t == "Size" && _reset) {
                n.onMotionStop = QZFL.event.bind(this, function () {
                    QZFL.dom["set" + _t](this);
                });
            }
            n.start();
        };
        var _easeShowAnimate = function (_t, ease) {
            var n = new QZFL.Tween(this, "opacity", QZFL.transitions[ease] || QZFL.transitions.regularEaseOut, (_t ? 0 : 1), (_t ? 1 : 0), 0.5);
            n[_t ? "onMotionStart" : "onMotionStop"] = QZFL.event.bind(this, function () {
                this.style.display = _t ? "" : "none";
                QZFL.dom.setStyle(this, "opacity", 1);
            });
            n.start();
        };
        var _easeScroll = function (top, left, ease) {
            if (this.nodeType == 9) {
                var _stl = [QZFL.dom.getScrollTop(this), QZFL.dom.getScrollLeft(this)];
            } else {
                var _stl = [this.scrollTop, this.scrollLeft];
            }
            var _st = _stl[0] - top;
            var _sl = _stl[1] - left;
            var n = new QZFL.Tween(this, "_p", QZFL.transitions[ease] || QZFL.transitions.regularEaseOut, 0, 100, 0.5);
            n.onMotionChange = QZFL.event.bind(this, function () {
                var _p = arguments[2], _t = (_stl[0] - _p / 100 * _st), _l = (_stl[1] - _p / 100 * _sl);
                if (this.nodeType == 9) {
                    QZFL.dom.setScrollTop(_t, this);
                    QZFL.dom.setScrollLeft(_l, this);
                } else {
                    this.scrollTop = _t;
                    this.scrollLeft = _l;
                }
            });
            n.start();
        };
        QZFL.element.extendFn({tween: function () {
        }, effectShow: function (effect, ease) {
            this.each(function (el) {
                _easeShowAnimate.apply(el, [true, ease])
            });
            if (effect == "resize") {
                this.each(function (el) {
                    _easeAnimate.apply(el, ["Size", null, null, ease])
                });
            }
        }, effectHide: function (effect, ease) {
            this.each(function (el) {
                _easeShowAnimate.apply(el, [false, ease])
            });
            if (effect == "resize") {
                this.each(function (el) {
                    _easeAnimate.apply(el, ["Size", 0, 0, ease])
                });
            }
        }, effectResize: function (width, height, ease) {
            this.each(function (el) {
                _easeAnimate.apply(el, ["Size", width, height, ease])
            });
        }, effectMove: function (x, y, ease) {
            this.each(function (el) {
                _easeAnimate.apply(el, ["XY", x, y, ease])
            });
        }, effectScroll: function (top, left, ease) {
            this.each(function (el) {
                _easeScroll.apply(el, [top, left, ease])
            });
        }})
    })();
    QZFL.Deferred = function (func, args) {
        var _slice = Array.prototype.slice, Promise = function () {
            this.status = undefined;
        }, Event = {_status: {'reject': 1, 'resolve': 1}, _init: function (type) {
            if (!this.eventList) {
                this.eventList = {rejectFuncs: [], resolveFuncs: []};
            }
        }, add: function (type, func) {
            this._init(type);
            if (typeof(func) == 'function') {
                if (this.status == type) {
                    func.apply(window, this.eventList[type + 'Datas']);
                } else {
                    this.eventList[type + 'Funcs'].push(func);
                }
                this.eventList.added = 1;
            }
            return this;
        }, trigger: function (type, datas) {
            var i, funcs, func;
            if (type in this._status) {
                this._init();
                if (this.eventList.added) {
                    funcs = this.eventList[type + 'Funcs'];
                    while ((func = funcs.shift())) {
                        func.apply(window, datas);
                    }
                } else {
                    this.eventList[type + 'Datas'] = datas;
                }
                this.status = type;
            }
        }}, _promise;
        QZFL.object.extend(Promise.prototype, {done: function (func) {
            return this.add('resolve', func);
        }, fail: function (func) {
            return this.add('reject', func);
        }, then: function (doneFunc, failFunc) {
            return this.add('resolve', doneFunc).add('reject', failFunc);
        }, resolve: function () {
            this.trigger('resolve', _slice.call(arguments));
        }, reject: function () {
            this.trigger('reject', _slice.call(arguments));
        }, state: function () {
            return this.status;
        }}, Event);
        _promise = new Promise();
        if (!(args instanceof Array)) {
            args = [];
        }
        if (typeof(func) == 'function') {
            args.push(_promise);
            func.apply(window, args);
        }
        return _promise;
    };
    QZFL.object.extend(QZFL, {when: function (promise) {
        var _slice = Array.prototype.slice, promises = _slice.call(arguments), length = promises.length, remain, updateFunc, datas = [], d, s;
        remain = (length !== 1 || (promise && promise.state()) ? length : 0);
        promise = (remain === 1 ? promise : QZFL.Deferred());
        updateFunc = function (index, data) {
            datas[index] = _slice.call(data);
            if (!(--remain)) {
                promise.resolve.apply(promise, datas);
            }
        };
        if (length > 1) {
            for (var i = 0; i < length; i++) {
                if (!promises[i].state) {
                    throw new Error('not a promise instance');
                }
                promises[i].done((function (i) {
                    return function () {
                        updateFunc(i, arguments);
                    };
                })(i)).fail(function () {
                    promise.reject(_slice.call(arguments));
                });
            }
        }
        if (!remain) {
            promise.resolve();
        }
        return promise;
    }});
    QZFL.XHR = function (actionURL, cname, method, data, isAsync, nocache) {
        var _s = QZFL.XHR, prot, n;
        cname = cname || ("_xhrInstence_" + _s.counter);
        if (!(_s.instance[cname]instanceof QZFL.XHR)) {
            _s.instance[cname] = this;
            _s.counter++;
        }
        prot = _s.instance[cname]
        prot._name = cname;
        prot._nc = !!nocache;
        prot._method = ((typeof method == 'string' ? method : '').toUpperCase() != "GET") ? "POST" : "GET";
        if (!(prot._uriObj = new QZFL.util.URI(actionURL))) {
            throw(new Error("URL not valid!"));
        }
        prot._uri = actionURL;
        prot._data = data;
        this.onSuccess = QZFL.emptyFn;
        this.onError = QZFL.emptyFn;
        this.charset = "gb2312";
        this.proxyPath = "";
        return prot;
    };
    QZFL.XHR.instance = {};
    QZFL.XHR.counter = 0;
    QZFL.XHR.path = "http://" + QZFL.config.resourceDomain + "/ac/qzfl/release/expand/xhr_base.js?max_age=864001", QZFL.XHR.prototype.send = function () {
        var _s = QZFL.XHR, fn;
        if (this._method == 'POST' && !this._data) {
            return false;
        }
        if (typeof this._data == "object") {
            this._data = _s.genHttpParamString(this._data, this.charset);
        }
        if (this._method == 'GET' && this._data) {
            this._uri += (this._uri.indexOf("?") < 0 ? "?" : "&") + this._data;
        }
        fn = (location.host && (this._uriObj.host != location.host)) ? '_DoXsend' : '_DoSend';
        if (_s[fn]) {
            return _s[fn](this);
        } else {
            QZFL.imports(_s.path, (function (th) {
                return function () {
                    _s[fn](th);
                };
            })(this));
            return true;
        }
    };
    QZFL.XHR.genHttpParamString = function (o, cs) {
        cs = (cs || "gb2312").toLowerCase();
        var r = [];
        for (var i in o) {
            r.push(i + "=" + ((cs == "utf-8") ? encodeURIComponent(o[i]) : QZFL.string.URIencode(o[i])));
        }
        return r.join("&");
    };
    QZFL.cookie = {set: function (name, value, domain, path, hour) {
        if (hour) {
            var expire = new Date();
            expire.setTime(expire.getTime() + 3600000 * hour);
        }
        document.cookie = name + "=" + value + "; " + (hour ? ("expires=" + expire.toGMTString() + "; ") : "") + (path ? ("path=" + path + "; ") : "path=/; ") + (domain ? ("domain=" + domain + ";") : ("domain=" + QZFL.config.domainPrefix + ";"));
        return true;
    }, get: function (name) {
        var r = new RegExp("(?:^|;+|\\s+)" + name + "=([^;]*)"), m = document.cookie.match(r);
        return(!m ? "" : m[1]);
    }, del: function (name, domain, path) {
        document.cookie = name + "=; expires=Mon, 26 Jul 1997 05:00:00 GMT; " + (path ? ("path=" + path + "; ") : "path=/; ") + (domain ? ("domain=" + domain + ";") : ("domain=" + QZFL.config.domainPrefix + ";"));
    }};
    QZFL.debug = {errorLogs: [], startDebug: function () {
        window.onerror = function (msg, url, line) {
            var urls = (url || "").replace(/\\/g, "/").split("/");
            QZFL.console.print(msg + "<br/>" + urls[urls.length - 1] + " (line:" + line + ")", 1);
            QZFL.debug.errorLogs.push(msg);
            return false;
        }
    }, stopDebug: function () {
        window.onerror = null;
    }, clearErrorLog: function () {
        this.errorLogs = [];
    }, showLog: function () {
        var o = ENV.get("debug_out");
        if (!!o) {
            o.innerHTML = QZFL.string.nl2br(QZFL.string.escHTML(this.errorLogs.join("\n")));
        }
    }, getLogString: function () {
        return(this.errorLogs.join("\n"));
    }};
    QZFL.runTime = (function () {
        function isDebugMode() {
            return(QZFL.config.debugLevel > 1);
        }

        function log(msg, type) {
            var info;
            if (isDebugMode()) {
                info = msg + '\n=STACK=\n' + stack();
            } else {
                if (type == 'error') {
                    info = msg;
                } else if (type == 'warn') {
                }
            }
            QZFL.debug.errorLogs.push(info);
        }

        function warn(sf, args) {
            log(QZFL.string.write.apply(QZFL.string, arguments), 'warn');
        }

        function error(sf, args) {
            log(QZFL.string.write.apply(QZFL.string, arguments), 'error');
        }

        function stack(e, a) {
            function genTrace(ee, aa) {
                if (ee.stack) {
                    return ee.stack;
                } else if (ee.message.indexOf("\nBacktrace:\n") >= 0) {
                    var cnt = 0;
                    return ee.message.split("\nBacktrace:\n")[1].replace(/\s*\n\s*/g, function () {
                        cnt++;
                        return(cnt % 2 == 0) ? "\n" : " @ ";
                    });
                } else {
                    var entry = (aa.callee == stack) ? aa.callee.caller : aa.callee;
                    var eas = entry.arguments;
                    var r = [];
                    for (var i = 0, len = eas.length; i < len; i++) {
                        r.push((typeof eas[i] == 'undefined') ? ("<u>") : ((eas[i] === null) ? ("<n>") : (eas[i])));
                    }
                    var fnp = /function\s+([^\s\(]+)\(/;
                    var fname = fnp.test(entry.toString()) ? (fnp.exec(entry.toString())[1]) : ("<ANON>");
                    return(fname + "(" + r.join() + ");").replace(/\n/g, "");
                }
            }

            var res;
            if ((e instanceof Error) && (typeof arguments == 'object') && (!!arguments.callee)) {
                res = genTrace(e, a);
            } else {
                try {
                    ({}).sds();
                } catch (err) {
                    res = genTrace(err, arguments);
                }
            }
            return res.replace(/\n/g, " <= ");
        }

        return{stack: stack, warn: warn, error: error, isDebugMode: isDebugMode};
    })();
    QZFL.JsLoader = function () {
        this.onload = QZFL.emptyFn;
        this.onerror = QZFL.emptyFn;
    };
    QZFL.JsLoader.prototype.load = function (src, doc, opt) {
        var opts = {}, t = typeof(opt), o = this;
        if (t == "string") {
            opts.charset = opt;
        } else if (t == "object") {
            opts = opt;
        }
        opts.charset = opts.charset || "gb2312";
        QZFL.userAgent.ie ? setTimeout(function () {
            o._load(src, doc || document, opts);
        }, 0) : o._load(src, doc || document, opts);
    };
    QZFL.JsLoader.count = 0;
    QZFL.JsLoader._idleInstancesIDQueue = [];
    QZFL.JsLoader.prototype._load = (function () {
        var _ie = QZFL.userAgent.ie, _doc = document, idp = QZFL.JsLoader._idleInstancesIDQueue, _rm = QZFL.dom.removeElement, _ae = QZFL.event.addEvent, docMode = _doc.documentMode;
        return function (src, doc, opts) {
            var o = this, tmp, k, head = doc.head || doc.getElementsByTagName("head")[0] || doc.body, _new = false, _js;
            if (!(_js = doc.getElementById(idp.pop())) || (QZFL.userAgent.ie && QZFL.userAgent.ie > 8)) {
                _js = doc.createElement("script");
                _js.id = "_qz_jsloader_" + (++QZFL.JsLoader.count);
                _new = true;
            }
            _ae(_js, (_ie && _ie < 10 ? "readystatechange" : "load"), function () {
                if (!_js || _ie && _ie < 10 && ((typeof docMode == 'undefined' || docMode < 10) ? (_js.readyState != 'loaded') : (_js.readyState != 'complete'))) {
                    return;
                }
                _ie && idp.push(_js.id);
                o.onload();
                !_ie && _rm(_js);
                _js = o = null;
            });
            if (!_ie) {
                _ae(_js, 'error', function () {
                    _ie && idp.push(_js.id);
                    o.onerror();
                    !_ie && _rm(_js);
                    _js = o = null;
                })
            }
            for (k in opts) {
                if (typeof(tmp = opts[k]) == "string" && k.toLowerCase() != "src") {
                    _js.setAttribute(k, tmp);
                }
            }
            _new && head.appendChild(_js);
            _js.src = src;
            opts = null;
        };
    })();
    QZFL["js" + "Loader"] = QZFL.JsLoader;
    QZFL.imports = function (sources, succCallback, opts) {
        var errCallback, url, len, countId, counter, scb, ecb, i, isFn = QZFL.lang.isFunction;
        opts = QZFL.lang.isString(opts) ? {charset: opts} : (opts || {});
        opts.charset = opts.charset || 'utf-8';
        var errCallback = isFn(opts.errCallback) ? opts.errCallback : QZFL.emptyFn;
        succCallback = isFn(succCallback) ? succCallback : QZFL.emptyFn;
        if (typeof(sources) == "string") {
            url = QZFL.imports.getUrl(sources);
            QZFL.imports.load(url, succCallback, errCallback, opts);
        } else if (QZFL.lang.isArray(sources)) {
            countId = QZFL.imports.getCountId();
            len = QZFL.imports.counters[countId] = sources.length;
            counter = 0;
            scb = function () {
                counter++;
                if (counter == len) {
                    if (isFn(succCallback))succCallback();
                }
                delete QZFL.imports.counters[countId];
            };
            ecb = function () {
                if (isFn(errCallback))errCallback();
                QZFL.imports.counters[countId];
            };
            for (i = 0; i < len; i++) {
                url = QZFL.imports.getUrl(sources[i]);
                QZFL.imports.load(url, scb, ecb, opts);
            }
        }
    };
    QZFL.imports.getUrl = function (url) {
        return QZFL.string.isURL(url) ? url : (QZFL.imports._indirectUrlRE.test(url) ? url : (QZFL.config.staticServer + url + '.js'));
    };
    QZFL.imports.urlCache = {};
    QZFL.imports.counters = {};
    QZFL.imports.count = 0;
    QZFL.imports._indirectUrlRE = /^(?:\.{1,2})?\//;
    QZFL.imports.getCountId = function () {
        return'imports' + QZFL.imports.count++;
    };
    QZFL.imports.load = function (url, scb, ecb, opt) {
        if (QZFL.imports.urlCache[url] === true) {
            setTimeout(function () {
                if (QZFL.lang.isFunction(scb))scb()
            }, 0);
            return;
        }
        if (!QZFL.imports.urlCache[url]) {
            QZFL.imports.urlCache[url] = [];
            var loader = new QZFL.JsLoader();
            loader.onload = function () {
                QZFL.imports.execFnQueue(QZFL.imports.urlCache[url], 1);
                QZFL.imports.urlCache[url] = true;
            };
            loader.onerror = function () {
                QZFL.imports.execFnQueue(QZFL.imports.urlCache[url], 0);
                QZFL.imports.urlCache[url] = null;
                delete QZFL.imports.urlCache[url];
            };
            loader.load(url, null, opt);
        }
        QZFL.imports.urlCache[url].push([ecb, scb]);
    };
    QZFL.imports.execFnQueue = function (arFn, isSuccess) {
        var f;
        while (arFn.length) {
            f = arFn.shift()[isSuccess];
            if (QZFL.lang.isFunction(f)) {
                setTimeout((function (fn) {
                    return fn
                })(f), 0);
            }
        }
    };
    QZFL.FormSender = function (actionURL, method, data, charset) {
        this.name = "_fpInstence_" + QZFL.FormSender.counter;
        QZFL.FormSender.instance[this.name] = this;
        QZFL.FormSender.counter++;
        if (typeof(actionURL) == 'object' && actionURL.nodeType == 1 && actionURL.tagName == 'FORM') {
            this.instanceForm = actionURL;
        } else {
            this.method = method || "POST";
            this.uri = actionURL;
            this.data = (typeof(data) == "object" || typeof(data) == 'string') ? data : null;
            this.proxyURL = (typeof(charset) == 'string' && charset.toUpperCase() == "UTF-8") ? QZFL.config.FSHelperPage.replace(/_gbk/, "_utf8") : QZFL.config.FSHelperPage;
        }
        this._sender = null;
        this.onSuccess = QZFL.emptyFn;
        this.onError = QZFL.emptyFn;
    };
    QZFL.FormSender.instance = {};
    QZFL.FormSender.counter = 0;
    QZFL.FormSender._errCodeMap = {999: {msg: 'Connection or Server error'}};
    QZFL.FormSender.pluginsPool = {"formHandler": [], "onErrorHandler": []};
    QZFL.FormSender._pluginsRunner = function (pType, data) {
        var _s = QZFL.FormSender, l = _s.pluginsPool[pType], t = data, len;
        if (l && (len = l.length)) {
            for (var i = 0; i < len; ++i) {
                if (typeof(l[i]) == "function") {
                    t = l[i](t);
                }
            }
        }
        return t;
    };
    QZFL.FormSender.prototype.send = function () {
        this.startTime = +new Date;
        if (this.method == 'POST' && this.data == null) {
            return false;
        }
        function clear(o) {
            o._sender = o._sender.callback = o._sender.errorCallback = o._sender.onreadystatechange = null;
            if (QZFL.userAgent.safari || QZFL.userAgent.opera) {
                setTimeout('QZFL.dom.removeElement(document.getElementById("_fp_frm_' + o.name + '"))', 50);
            } else {
                QZFL.dom.removeElement(document.getElementById("_fp_frm_" + o.name));
            }
            o.endTime = +new Date;
            QZFL.FormSender._pluginsRunner('onRequestComplete', o);
            o.instanceForm = null;
        }

        if (this._sender === null || this._sender === void(0)) {
            var sender = this.instanceForm ? QZFL.dom.createNamedElement("iframe", "_fp_frm_" + this.name) : document.createElement("iframe");
            sender.id = "_fp_frm_" + this.name;
            sender.style.cssText = "width:0;height:0;border-width:0;display:none;";
            document.body.appendChild(sender);
            sender.callback = QZFL.event.bind(this, function (o) {
                clearTimeout(timer);
                this.resultArgs = arguments;
                this.msg = 'ok';
                this.onSuccess(o);
                clear(this);
            });
            sender.errorCallback = QZFL.event.bind(this, function (o) {
                clearTimeout(timer);
                this.resultArgs = arguments;
                this.msg = QZFL.FormSender._errCodeMap[999].msg;
                this.onError(o);
                QZFL.FormSender._pluginsRunner('onErrorHandler', this);
                clear(this);
            });
            if (typeof(sender.onreadystatechange) != 'undefined') {
                sender.onreadystatechange = QZFL.event.bind(this, function () {
                    if (this._sender.readyState == 'complete' && this._sender.submited) {
                        clear(this);
                        this.onError(QZFL.FormSender._errCodeMap[999]);
                        QZFL.FormSender._pluginsRunner('onErrorHandler', this);
                    }
                });
            } else {
                var timer = setTimeout(QZFL.event.bind(this, function () {
                    try {
                        var _t = this._sender.contentWindow.location.href;
                        if (_t.indexOf(this.uri) == 0) {
                            clearTimeout(timer);
                            clear(this);
                            this.onError(QZFL.FormSender._errCodeMap[999]);
                            QZFL.FormSender._pluginsRunner('onErrorHandler', this);
                        }
                    } catch (err) {
                        clearTimeout(timer);
                        clear(this);
                        this.onError(QZFL.FormSender._errCodeMap[999]);
                        QZFL.FormSender._pluginsRunner('onErrorHandler', this);
                    }
                }), 1500);
            }
            this._sender = sender;
        }
        if (!this.instanceForm) {
            this._sender.src = this.proxyURL;
        } else {
            this.instanceForm.target = (sender.name = sender.id);
            this._sender.submited = true;
            this.instanceForm.submit();
        }
        return true;
    };
    QZFL.FormSender.prototype.destroy = function () {
        var n = this.name;
        delete QZFL.FormSender.instance[n]._sender;
        QZFL.FormSender.instance[n]._sender = null;
        delete QZFL.FormSender.instance[n];
        QZFL.FormSender.counter--;
        return null;
    };
    QZFL.JSONGetter = function (actionURL, cname, data, charset, junctionMode) {
        if (QZFL.object.getType(cname) != "string") {
            cname = "_jsonInstence_" + (QZFL.JSONGetter.counter + 1);
        }
        var prot = QZFL.JSONGetter.instance[cname];
        if (prot instanceof QZFL.JSONGetter) {
        } else {
            QZFL.JSONGetter.instance[cname] = prot = this;
            QZFL.JSONGetter.counter++;
            prot._name = cname;
            prot._sender = null;
            prot._timer = null;
            this.startTime = +new Date;
            this.onSuccess = QZFL.emptyFn;
            this.onError = QZFL.emptyFn;
            this.onTimeout = QZFL.emptyFn;
            this.timeout = 5000;
            this.clear = QZFL.emptyFn;
            this._baseClear = function () {
                this._waiting = false;
                this._squeue = [];
                this._equeue = [];
                this.onSuccess = this.onError = QZFL.emptyFn;
                this.clear = null;
            };
        }
        prot._uri = actionURL;
        prot._data = (data && (QZFL.object.getType(data) == "object" || QZFL.object.getType(data) == "string")) ? data : null;
        prot._charset = (QZFL.object.getType(charset) != 'string') ? QZFL.config.defaultDataCharacterSet : charset;
        prot._jMode = !!junctionMode;
        return prot;
    };
    QZFL.JSONGetter.instance = {};
    QZFL.JSONGetter.counter = 0;
    QZFL.JSONGetter._errCodeMap = {999: {msg: 'Connection or Server error.'}, 998: {msg: 'Connection to Server timeout.'}};
    QZFL.JSONGetter.genHttpParamString = function (o) {
        var r = [];
        for (var i in o) {
            r.push(i + "=" + encodeURIComponent(o[i]));
        }
        return r.join("&");
    };
    QZFL.JSONGetter.prototype.addOnSuccess = function (f) {
        if (typeof(f) == "function") {
            if (this._squeue && this._squeue.push) {
            } else {
                this._squeue = [];
            }
            this._squeue.push(f);
        }
    };
    QZFL.JSONGetter._runFnQueue = function (q, resultArgs, th) {
        var f;
        if (q && q.length) {
            while (q.length > 0) {
                f = q.shift();
                if (typeof(f) == "function") {
                    f.apply(th ? th : null, resultArgs);
                }
            }
        }
        th.endTime = +new Date;
        th.resultArgs = resultArgs;
        QZFL.JSONGetter._pluginsRunner("onRequestComplete", th);
    };
    QZFL.JSONGetter.prototype.addOnError = function (f) {
        if (typeof(f) == "function") {
            if (this._equeue && this._equeue.push) {
            } else {
                this._equeue = [];
            }
            this._equeue.push(f);
        }
    };
    QZFL.JSONGetter.pluginsPool = {"srcStringHandler": [], "onErrorHandler": [], "onRequestComplete": []};
    QZFL.JSONGetter._pluginsRunner = function (pType, data) {
        var _s = QZFL.JSONGetter, l = _s.pluginsPool[pType], t = data, len;
        if (l && (len = l.length)) {
            for (var i = 0; i < len; ++i) {
                if (typeof(l[i]) == "function") {
                    t = l[i](t);
                }
            }
        }
        return t;
    };
    QZFL.JSONGetter.prototype.send = function (callbackFnName) {
        if (this._waiting) {
            return;
        }
        var clear, cfn = (QZFL.object.getType(callbackFnName) != 'string') ? "callback" : callbackFnName, da = this._uri;
        if (this._data) {
            da += (da.indexOf("?") < 0 ? "?" : "&") + ((typeof(this._data) == "object") ? QZFL.JSONGetter.genHttpParamString(this._data) : this._data);
        }
        da = QZFL.JSONGetter._pluginsRunner("srcStringHandler", da);
        if (this._jMode) {
            window[cfn] = this.onSuccess;
            var _sd = new QZFL.JsLoader();
            _sd.onerror = this.onError;
            _sd.load(da, void(0), this._charset);
            return;
        }
        this._timer = setTimeout((function (th) {
            return function () {
                th._waiting = false;
                th.onTimeout();
            };
        })(this), this.timeout);
        if (QZFL.userAgent.ie && (typeof document.documentMode == 'undefined' || document.documentMode < 10) && !(QZFL.userAgent.beta && navigator.appVersion.indexOf("Trident\/4.0") > -1)) {
            var df = document.createDocumentFragment(), sender = document.createElement("script");
            sender.charset = this._charset;
            this._senderDoc = df;
            this._sender = sender;
            this.clear = clear = function (o) {
                clearTimeout(o._timer);
                if (o._sender) {
                    o._sender.onreadystatechange = null;
                }
                df['callback'] = df['_Callback'] = df[cfn] = null;
                df = o._senderDoc = o._sender = null;
                o._baseClear();
            };
            df['callback'] = df['_Callback'] = df[cfn] = (function (th) {
                return(function () {
                    th._waiting = false;
                    th.onSuccess.apply(th, arguments);
                    QZFL.JSONGetter._runFnQueue(th._squeue, arguments, th);
                    clear(th);
                });
            })(this);
            if (QZFL.userAgent.ie < 9) {
                sender.onreadystatechange = (function (th) {
                    return(function () {
                        if (th._sender && th._sender.readyState == "loaded") {
                            try {
                                th._onError();
                            } catch (ignore) {
                            }
                        }
                    });
                })(this);
            } else {
                sender.onerror = (function (th) {
                    return(function () {
                        try {
                            th._onError();
                        } catch (ignore) {
                        }
                    });
                })(this);
            }
            this._waiting = true;
            df.appendChild(sender);
            this._sender.src = da;
        } else {
            this.clear = clear = function (o) {
                clearTimeout(o._timer);
                o._baseClear();
            };
            window[cfn] = function () {
                QZFL.JSONGetter.args = arguments;
            };
            var callback = (function (th) {
                return function () {
                    th.onSuccess.apply(th, QZFL.JSONGetter.args);
                    QZFL.JSONGetter._runFnQueue(th._squeue, QZFL.JSONGetter.args, th);
                    QZFL.JSONGetter.args = [];
                    clear(th);
                }
            })(this);
            var _ecb = (function (th) {
                return(function () {
                    th._waiting = false;
                    var _eo = QZFL.JSONGetter._errCodeMap[999];
                    th.msg = _eo.msg;
                    th.onError(_eo);
                    QZFL.JSONGetter._runFnQueue(th._equeue, [_eo], th);
                    clear(th);
                });
            })(this);
            var h = document.getElementsByTagName('head'), node;
            h = h && h[0] || document.body;
            if (!h)
                return;
            var baseElement = h.getElementsByTagName('base')[0];
            node = document.createElement('script');
            node.charset = this._charset || 'utf-8';
            node.onload = function () {
                this.onload = null;
                if (node.parentNode) {
                    h.removeChild(node);
                }
                callback();
                node = void(0);
            };
            node.onerror = function () {
                this.onerror = null;
                _ecb();
            }
            node.src = da;
            baseElement ? h.insertBefore(node, baseElement) : h.appendChild(node);
        }
    };
    QZFL.JSONGetter.prototype._onError = function () {
        this._waiting = false;
        var _eo = QZFL.JSONGetter._errCodeMap[999];
        this.msg = _eo.msg;
        this.onError(_eo);
        QZFL.JSONGetter._runFnQueue(this._equeue, [_eo], this);
        QZFL.JSONGetter._pluginsRunner("onErrorHandler", this);
        this.clear(this);
    };
    QZFL.JSONGetter.prototype.destroy = QZFL.emptyFn;
    window.QZFL = window.QZFL || {};
    QZFL.pingSender = function (url, t, opts) {
        var _s = QZFL.pingSender, iid, img;
        if (!url) {
            return;
        }
        opts = opts || {};
        iid = "sndImg_" + _s._sndCount++;
        img = _s._sndPool[iid] = new Image();
        img.iid = iid;
        img.onload = img.onerror = img.ontimeout = (function (t) {
            return function (evt) {
                evt = evt || window.event || {type: 'timeout'};
                void(typeof(opts[evt.type]) == 'function' ? setTimeout((function (et, ti) {
                    return function () {
                        opts[et]({'type': et, 'duration': ((new Date()).getTime() - ti)});
                    };
                })(evt.type, t._s_), 0) : 0);
                QZFL.pingSender._clearFn(evt, t);
            };
        })(img);
        (typeof(opts.timeout) == 'function') && setTimeout(function () {
            img.ontimeout && img.ontimeout({type: 'timeout'});
        }, (typeof(opts.timeoutValue) == 'number' ? Math.max(100, opts.timeoutValue) : 5000));
        void((typeof(t) == 'number') ? setTimeout(function () {
            img._s_ = (new Date()).getTime();
            img.src = url;
        }, (t = Math.max(0, t))) : (img.src = url));
    };
    QZFL.pingSender._sndPool = {};
    QZFL.pingSender._sndCount = 0;
    QZFL.pingSender._clearFn = function (evt, ref) {
        var _s = QZFL.pingSender;
        if (ref) {
            _s._sndPool[ref.iid] = ref.onload = ref.onerror = ref.ontimeout = ref._s_ = null;
            delete _s._sndPool[ref.iid];
            _s._sndCount--;
            ref = null;
        }
    };
    QZFL.media = {_tempImageList: [], _flashVersion: null, getImageInfo: (function () {
        var _getInfo = function (img, callback, opts) {
            if (img) {
                var _w = opts.ow || img.width, _h = opts.oh || img.height, r, ls, ss, d;
                if (_w && _h) {
                    if (_w >= _h) {
                        ls = _w;
                        ss = _h;
                        d = ["width", "height"];
                    } else {
                        ls = _h;
                        ss = _w;
                        d = ["height", "width"];
                    }
                    r = {direction: d, rate: ls / ss, longSize: ls, shortSize: ss};
                    r.ow = _w;
                    r.oh = _h;
                }
                QZFL.lang.isFunction(callback) && callback(img, r, opts);
            }
        };
        return function (callback, opts) {
            opts = opts || {};
            if (QZFL.lang.isString(opts.trueSrc)) {
                var _i = new Image();
                _i.onload = (function (ele, cb, p) {
                    return function () {
                        _getInfo(ele, cb, p);
                        ele = ele.onerror = ele.onload = null;
                    };
                })(_i, callback, opts);
                _i.onerror = (function (ele, cb, p) {
                    return function () {
                        if (typeof(p.errCallback) == 'function') {
                            p.errCallback();
                        }
                        ele = ele.onerror = ele.onload = null;
                    };
                })(_i, callback, opts);
                _i.src = opts.trueSrc;
            } else if (QZFL.lang.isElement(opts.img)) {
                _getInfo(opts.img, callback, opts);
            }
        };
    })(), adjustImageSize: function (w, h, trueSrc, callback, errCallback) {
        var opts = {trueSrc: trueSrc, callback: function (cb) {
            return function (o, type, ew, eh, p) {
                QZFL.lang.isFunction(cb) && cb(o, ew, eh, null, p.ow, p.oh, p);
            };
        }(callback), errCallback: errCallback};
        QZFL.media.reduceImage(0, w, h, opts);
    }, getFlashHtml: function (flashArguments, requiredVersion, flashPlayerCID) {
        var _attrs = [], _params = [];
        for (var k in flashArguments) {
            switch (k) {
                case"noSrc":
                case"movie":
                    continue;
                    break;
                case"id":
                case"name":
                case"width":
                case"height":
                case"style":
                    if (typeof(flashArguments[k]) != 'undefined') {
                        _attrs.push(' ', k, '="', flashArguments[k], '"');
                    }
                    break;
                case"src":
                    if (QZFL.userAgent.ie) {
                        _params.push('<param name="movie" value="', (flashArguments.noSrc ? "" : flashArguments[k]), '"/>');
                    } else {
                        _attrs.push(' data="', (flashArguments.noSrc ? "" : flashArguments[k]), '"');
                    }
                    break;
                default:
                    _params.push('<param name="', k, '" value="', flashArguments[k], '" />');
            }
        }
        if (QZFL.userAgent.ie) {
            _attrs.push(' classid="clsid:', flashPlayerCID || 'D27CDB6E-AE6D-11cf-96B8-444553540000', '"');
        } else {
            _attrs.push(' type="application/x-shockwave-flash"');
        }
        if (requiredVersion && (requiredVersion instanceof QZFL.media.SWFVersion)) {
            var _ver = QZFL.media.getFlashVersion().major, _needVer = requiredVersion.major;
            _attrs.push(' codeBase="http://fpdownload.macromedia.com/get/flashplayer/current/swflash.cab#version=', requiredVersion, '"');
        }
        return"<object" + _attrs.join("") + ">" + _params.join("") + "</object>";
    }, insertFlash: function (containerElement, flashArguments) {
        if (!containerElement || typeof(containerElement.innerHTML) == "undefined") {
            return false;
        }
        flashArguments = flashArguments || {};
        flashArguments.src = flashArguments.src || "";
        flashArguments.width = flashArguments.width || "100%";
        flashArguments.height = flashArguments.height || "100%";
        flashArguments.noSrc = true;
        containerElement.innerHTML = QZFL.media.getFlashHtml(flashArguments);
        var f = containerElement.firstChild;
        if (QZFL.userAgent.ie) {
            setTimeout(function () {
                try {
                    f.LoadMovie(0, flashArguments.src);
                } catch (ign) {
                }
            }, 0);
        } else {
            f.setAttribute("data", flashArguments.src);
        }
        return true;
    }, getWMMHtml: function (wmpArguments, cid) {
        var params = [], objArgm = [];
        for (var k in wmpArguments) {
            switch (k) {
                case"id":
                case"width":
                case"height":
                case"style":
                case"src":
                    objArgm.push(' ', k, '="', wmpArguments[k], '"');
                    break;
                default:
                    objArgm.push(' ', k, '="', wmpArguments[k], '"');
                    params.push('<param name="', k, '" value="', wmpArguments[k], '" />');
            }
        }
        if (wmpArguments["src"]) {
            params.push('<param name="URL" value="', wmpArguments["src"], '" />');
        }
        if (QZFL.userAgent.ie) {
            return'<object classid="' + (cid || "clsid:6BF52A52-394A-11D3-B153-00C04F79FAA6") + '" ' + objArgm.join("") + '>' + params.join("") + '</object>';
        } else {
            return'<embed ' + objArgm.join("") + '></embed>';
        }
    }};
    QZFL.media.SWFVersion = function () {
        var a;
        if (arguments.length > 1) {
            a = arg2arr(arguments);
        } else if (arguments.length == 1) {
            if (typeof(arguments[0]) == "object") {
                a = arguments[0];
            } else if (typeof arguments[0] == 'number') {
                a = [arguments[0]];
            } else {
                a = [];
            }
        } else {
            a = [];
        }
        this.major = parseInt(a[0], 10) || 0;
        this.minor = parseInt(a[1], 10) || 0;
        this.rev = parseInt(a[2], 10) || 0;
        this.add = parseInt(a[3], 10) || 0;
    };
    QZFL.media.SWFVersion.prototype.toString = function (spliter) {
        return([this.major, this.minor, this.rev, this.add]).join((typeof spliter == 'undefined') ? "," : spliter);
    };
    QZFL.media.SWFVersion.prototype.toNumber = function () {
        var se = 0.001;
        return this.major + this.minor * se + this.rev * se * se + this.add * se * se * se;
    };
    QZFL.media.getFlashVersion = function () {
        if (!QZFL.media._flashVersion) {
            var resv = 0;
            if (navigator.plugins && navigator.mimeTypes.length) {
                var x = navigator.plugins['Shockwave Flash'];
                if (x && x.description) {
                    resv = x.description.replace(/(?:[a-z]|[A-Z]|\s)+/, "").replace(/(?:\s+r|\s+b[0-9]+)/, ".").split(".");
                }
            } else {
                try {
                    for (var i = (resv = 6), axo = new Object(); axo != null; ++i) {
                        axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash." + i);
                        resv = i;
                    }
                } catch (e) {
                    if (resv == 6) {
                        resv = 0;
                    }
                    resv = Math.max(resv - 1, 0);
                }
                try {
                    resv = new QZFL.media.SWFVersion(axo.GetVariable("$version").split(" ")[1].split(","));
                } catch (ignore) {
                }
            }
            if (!(resv instanceof QZFL.media.SWFVersion)) {
                resv = new QZFL.media.SWFVersion(resv);
            }
            if (resv.major < 3) {
                resv.major = 0;
            }
            QZFL.media._flashVersion = resv;
        }
        return QZFL.media._flashVersion;
    };
    QZFL.media.reduceImage = (function () {
        var doReduce = function (o, type, ew, eh, p, cb) {
            var rl, k;
            if (p.rate == 1) {
                p.direction[0] = (ew > eh ? 'height' : 'width');
                p.direction[1] = (ew > eh ? 'width' : 'height');
            }
            rl = (p.direction[type] == "width" ? ew : eh);
            type ? (((rl > p.shortSize) ? (rl = p.shortSize) : 1) && (p.k = p.shortSize / rl)) : (((rl > p.longSize) ? (rl = p.longSize) : 1) && (p.k = p.longSize / rl));
            o.setAttribute(p.direction[type], rl);
            QZFL.lang.isFunction(cb) && cb(o, type, ew, eh, p);
        };
        return function (type, ew, eh, opts) {
            opts = opts || {};
            opts.img = (QZFL.lang.isNode(opts.img) ? opts.img : QZFL.event.getTarget());
            opts.img.onload = null;
            opts.trueSrc && (opts.img.src = opts.trueSrc);
            if (opts.img) {
                if (!(opts.direction && opts.rate && opts.longSize && opts.shortSize)) {
                    r = QZFL.media.getImageInfo(function (o, p) {
                        if (!o || !p) {
                            return;
                        }
                        doReduce(opts.img, type, ew, eh, p, opts.callback)
                    }, opts);
                } else {
                    doReduce(opts.img, type, ew, eh, opts, opts.callback)
                }
            }
        };
    })();
    QZFL.media.imagePlusUrl = 'http://' + QZFL.config.resourceDomain + '/ac/qzfl/release/widget/smart_image.js?max_age=1209603';
    QZFL.media.smartImage = function (w, h, params) {
        params = params || {};
        params.img = (QZFL.lang.isNode(params.img) ? params.img : QZFL.event.getTarget());
        QZFL.imports(QZFL.media.imagePlusUrl, (function (w, h, params) {
            return function () {
                QZFL.media.smartImage(w, h, params);
            };
        })(w, h, params));
    };
    QZFL.media.reduceImgByRule = function (ew, eh, opts, cb) {
        opts = opts || {};
        opts.img = (QZFL.lang.isNode(opts.img) ? opts.img : QZFL.event.getTarget());
        QZFL.imports(QZFL.media.imagePlusUrl, (function (ew, eh, opts, cb) {
            return function () {
                QZFL.media.reduceImgByRule(ew, eh, opts, cb);
            };
        })(ew, eh, opts, cb));
    };
    QZFL.shareObject = {};
    QZFL.shareObject.create = function (path) {
        if (typeof(path) == 'undefined') {
            path = QZFL.config.defaultShareObject;
        }
        var t = new QZFL.shareObject.DataBase(path);
    };
    QZFL.shareObject.instance = {};
    QZFL.shareObject.refCount = 0;
    QZFL.shareObject.getValidSO = function () {
        var cnt = QZFL.shareObject.refCount + 1;
        for (var i = 1; i < cnt + 1; ++i) {
            if (QZFL.shareObject.instance["so_" + i] && QZFL.shareObject.instance["so_" + i]._ready) {
                return QZFL.shareObject.instance["so_" + i];
            }
        }
        return null;
    };
    QZFL.shareObject.get = function (s) {
        var o = QZFL.shareObject.getValidSO();
        if (o)return o.get(s); else return void(0);
    };
    QZFL.shareObject.set = function (k, v) {
        var o = QZFL.shareObject.getValidSO();
        if (o)return o.set(k, v); else return false;
    };
    QZFL.shareObject.DataBase = function (soUrl) {
        if (QZFL.shareObject.refCount > 0) {
            return QZFL.shareObject.instance["so_1"];
        }
        this._ready = false;
        QZFL.shareObject.refCount++;
        var c = document.createElement("div");
        c.style.height = "0px";
        c.style.overflow = "hidden";
        document.body.appendChild(c);
        c.innerHTML = QZFL.media.getFlashHtml({src: soUrl, id: "__so" + QZFL.shareObject.refCount, width: 1, height: 0, allowscriptaccess: "always"});
        this.ele = $("__so" + QZFL.shareObject.refCount);
        QZFL.shareObject.instance["so_" + QZFL.shareObject.refCount] = this;
    };
    QZFL.shareObject.DataBase.prototype.set = function (key, value) {
        if (this._ready) {
            this.ele.set("seed", Math.random());
            this.ele.set(key, value);
            this.ele.flush();
            return true;
        } else {
            return false;
        }
    };
    QZFL.shareObject.DataBase.prototype.del = function (key) {
        if (this._ready) {
            this.ele.set("seed", Math.random());
            this.ele.set(key, void(0));
            this.ele.flush();
            return true;
        } else {
            return false;
        }
    };
    QZFL.shareObject.DataBase.prototype.get = function (key) {
        return(this._ready) ? (this.ele.get(key)) : null;
    };
    QZFL.shareObject.DataBase.prototype.clear = function () {
        if (this._ready) {
            this.ele.clear();
            return true;
        } else {
            return false;
        }
    };
    QZFL.shareObject.DataBase.prototype.getDataSize = function () {
        if (this._ready) {
            return this.ele.getSize();
        } else {
            return-1;
        }
    };
    QZFL.shareObject.DataBase.prototype.load = function (url, succFnName, errFnName, data) {
        if (this._ready) {
            this.ele.load(url, succFnName, errFnName, data);
            return true;
        } else {
            return false;
        }
    };
    QZFL.shareObject.DataBase.prototype.setReady = function () {
        this._ready = true;
    };
    function getShareObjectPrefix() {
        QZFL.shareObject.instance["so_" + QZFL.shareObject.refCount].setReady();
        return location.host.replace(".qzone.qq.com", "");
    }

    QZFL.shareObject.DataBase.prototype.setClipboard = function (value) {
        if (this._ready && isString(value)) {
            this.ele.setClipboard(value);
            return true;
        } else {
            return false;
        }
    };
    QZFL.dragdrop = {path: "http://" + QZFL.config.resourceDomain + "/ac/qzfl/release/widget/dragdrop.js?max_age=864001", dragdropPool: {}, count: 0, registerDragdropHandler: function (handler, target, opts) {
        var _e = QZFL.event, _s = QZFL.dragdrop, _hDom = QZFL.dom.get(handler), _tDom = QZFL.dom.get(target), targetObject;
        opts = opts || {range: [null, null, null, null], ghost: 0};
        if (!(_hDom = _hDom || _tDom)) {
            return null;
        }
        targetObject = _tDom || _hDom;
        if (!_hDom.id) {
            _hDom.id = "dragdrop_" + (++_s.count);
        }
        _hDom.style.cursor = opts.cursor || "move";
        _s.dragdropPool[_hDom.id] = {};
        _e.on(_hDom, "mousedown", _s.startDrag, [_hDom.id, targetObject, opts]);
        return _s.dragdropPool[_hDom.id];
    }, unRegisterDragdropHandler: function (handler) {
        var _hDom = QZFL.dom.get(handler), _e = QZFL.event;
        if (!_hDom) {
            return null;
        }
        _hDom.style.cursor = "";
        QZFL.dragdrop._oldSD && (_e.removeEvent(_hDom, "mousedown", QZFL.dragdrop._oldSD));
        _e.removeEvent(_hDom, "mousedown", QZFL.dragdrop.startDrag);
        delete QZFL.dragdrop.dragdropPool[_hDom.id];
    }, startDrag: function (evt) {
        QZFL.dragdrop.doStartDrag.apply(QZFL.dragdrop, arguments);
        QZFL.event.preventDefault(evt);
    }, dragTempId: 0, doStartDrag: function (evt, handlerId, target, opts) {
        var _s = QZFL.dragdrop, _e = {};
        QZFL.object.extend(_e, evt);
        QZFL.imports(_s.path, function () {
            _s.startDrag.call(_s, _e, handlerId, target, opts);
        });
    }};
    QZFL.dragdrop._oldSD = QZFL.dragdrop.startDrag;
    QZFL.element.extendFn({dragdrop: function (target, opts) {
        var _arr = [];
        this.each(function () {
            _arr.push(QZFL.dragdrop.registerDragdropHandler(this, target, opts));
        });
        return _arr;
    }, unDragdrop: function (target, opts) {
        this.each(function () {
            _arr.push(QZFL.dragdrop.unRegisterDragdropHandler(this));
        });
    }});
    QZFL.widget.msgbox = {cssPath: "http://" + QZFL.config.resourceDomain + "/ac/qzfl/release/css/msgbox.css", path: "http://" + QZFL.config.resourceDomain + "/ac/qzfl/release/widget/msgbox.js", currentCssPath: null, _loadCss: function (s) {
        var th = QZFL.widget.msgbox;
        s = s || th.cssPath;
        if (th.currentCssPath != s) {
            QZFL.css.insertCSSLink(th.currentCssPath = s);
        }
    }, show: function (msgHtml, type, timeout, opts) {
        var _s = QZFL.widget.msgbox;
        if (typeof(opts) == 'number') {
            opts = {topPosition: opts};
        }
        opts = opts || {};
        _s._loadCss(opts.cssPath);
        QZFL.imports(_s.path, function () {
            _s.show(msgHtml, type, timeout, opts);
        });
    }, hide: function (timeout) {
        QZFL.imports(QZFL.widget.msgbox.path, function () {
            QZFL.widget.msgbox.hide(timeout);
        });
    }};
    QZFL.dialog = {cssPath: "http://" + QZFL.config.resourceDomain + "/qzone_v6/qz_dialog.css", currentCssPath: '', path: "http://" + QZFL.config.resourceDomain + "/ac/qzfl/release/widget/dialog.js?max_age=864010", count: 0, instances: {}, BUTTON_TYPE: {Disabled: -1, Normal: 0, Cancel: 1, Confirm: 2, Negative: 3}, create: function (title, content, opts) {
        var t, args, dialog;
        if (t = (typeof(opts) != "number" || isNaN(parseInt(opts, 10)))) {
            opts = opts || {};
            args = [0, 0, opts.width, opts.height, opts.useTween, opts.noBorder];
        } else {
            opts = {'width': opts};
            args = arguments;
        }
        t && (opts.width = args[2] || 300);
        opts.height = args[3] || 200;
        opts.useTween = !!args[4];
        opts.noBorder = !!args[5];
        opts.title = title || opts.title || '';
        opts.content = content || opts.content || '';
        dialog = new QZFL.dialog.shell(opts);
        dialog.init(opts);
        return dialog;
    }, createBorderNone: function (content, width, height) {
        var opts = opts || {};
        opts.noBorder = true;
        opts.width = width || 300;
        opts.height = height || 200;
        return QZFL.dialog.create(null, content || '', opts);
    }};
    QZFL.dialog._shellCall = function (pFnName, objInstance, args) {
        var _s = QZFL.dialog;
        QZFL.imports(_s.path, (function (th) {
            return function () {
                _s.base.prototype[pFnName].apply(th, args || []);
            };
        })(objInstance));
    };
    QZFL.dialog.shell = function (opts) {
        var _s = QZFL.dialog, cssp = opts.cssPath || _s.cssPath;
        if (cssp != _s.currentCssPath) {
            QZFL.css.insertCSSLink(cssp);
            _s.currentCssPath = cssp;
        }
        this.opts = opts;
        this.id = ('qzDialog' + (++_s.count));
        _s.instances[this.id] = this;
        this.uniqueID = _s.count;
        if (!_s.base) {
            QZFL.imports(_s.path);
        }
    };
    QZFL.dialog.shell.prototype.getZIndex = function () {
        return this.zIndex || (6000 + QZFL.dialog.count);
    };
    (function (fl) {
        for (var i = 0, len = fl.length; i < len; ++i) {
            QZFL.dialog.shell.prototype[fl[i]] = (function (pName) {
                return function () {
                    QZFL.dialog._shellCall(pName, this, arguments);
                };
            })(fl[i]);
        }
    })(['hide', 'unload', 'init', 'fillTitle', 'fillContent', 'setSize', 'show', 'hide', 'focus', 'blur', 'setReturnValue']);
    QZFL.widget.Confirm = function (title, content, opts) {
        if ((typeof opts != 'undefined') && (typeof opts != 'object')) {
            opts = {type: opts, tips: arguments[3]};
        }
        opts = opts || {};
        var n, _s = QZFL.widget.Confirm, cssp = opts.cssPath || _s.cssPath;
        opts.title = opts.title || title || '';
        opts.content = opts.content || content || '';
        this.opts = opts;
        this.tips = opts.tips = (opts.tips || []);
        n = (++_s.count);
        this.id = 'qzConfirm' + n;
        _s.instances[n] = this;
        if (cssp != _s.currentCssPath) {
            QZFL.css.insertCSSLink(cssp);
            _s.currentCssPath = cssp;
        }
        if (!_s.iconMap) {
            QZFL.imports(_s.path);
        }
    };
    QZFL.widget.Confirm.TYPE = {OK: 1, NO: 2, OK_NO: 3, CANCEL: 4, OK_CANCEL: 5, NO_CANCEL: 6, OK_NO_CANCEL: 7};
    QZFL.widget.Confirm.count = 0;
    QZFL.widget.Confirm.instances = {};
    QZFL.widget.Confirm.cssPath = "http://" + QZFL.config.resourceDomain + "/ac/qzfl/release/resource/css/confirm_by_dialog.css";
    QZFL.widget.Confirm.path = "http://" + QZFL.config.resourceDomain + "/ac/qzfl/release/widget/confirm_base.js";
    QZFL.widget.Confirm._shellCall = function (pFnName, objInstance, args) {
        var _s = QZFL.widget.Confirm;
        QZFL.imports(_s.path, (function (th) {
            return function () {
                _s.prototype[pFnName].apply(th, args || []);
            };
        })(objInstance));
    };
    (function (fl) {
        for (var i = 0, len = fl.length; i < len; ++i) {
            QZFL.widget.Confirm.prototype[fl[i]] = (function (pName) {
                return function () {
                    QZFL.widget.Confirm._shellCall(pName, this, arguments);
                };
            })(fl[i]);
        }
    })(['hide', 'show']);
    (function (qdc) {
        var dataPool = {};
        qdc.get = qdc.load = function (key) {
            return dataPool[key];
        };
        qdc.del = function (key) {
            dataPool[key] = null;
            delete dataPool[key];
            return true;
        };
        qdc.save = function saveData(key, value) {
            dataPool[key] = value;
            return true;
        };
    })(QZFL.dataCenter = {});
    QZFL.maskLayout = (function () {
        var masker = null, count = 0, qml = function (zi, doc, opts) {
            ++count;
            if (masker) {
                return count;
            }
            zi = zi || 5000;
            doc = doc || document;
            opts = opts || {};
            var t = parseFloat(opts.opacity, 10);
            opts.opacity = isNaN(t) ? 0.2 : t;
            t = parseFloat(opts.top, 10);
            opts.top = isNaN(t) ? 0 : t;
            t = parseFloat(opts.left, 10);
            opts.left = isNaN(t) ? 0 : t;
            masker = QZFL.dom.createElementIn("div", doc.body, false, {className: "qz_mask", unselectable: 'on'});
            masker.style.cssText = 'background-color:#000;-ms-filter:"alpha(opacity=20)";#filter:alpha(opacity=' + 100 * opts.opacity + ');opacity:' + opts.opacity + '; position:fixed;_position:absolute;left:' + (opts.left) + 'px;top:' + (opts.top) + 'px;z-index:' + zi + ';width:100%;height:' + QZFL.dom[QZFL.userAgent.ie < 7 ? 'getScrollHeight' : 'getClientHeight'](doc) + 'px;';
            return count;
        };
        qml.setOpacity = function (ov) {
            if (masker && ov) {
                QZFL.dom.setStyle(masker, 'opacity', ov);
            }
        };
        qml.getRef = function () {
            return masker;
        };
        qml.remove = function (rmAll) {
            count = Math.max(--count, 0);
            if (!count || rmAll) {
                QZFL.dom.removeElement(masker);
                masker = null;
                rmAll && (count = 0);
            }
        };
        return(qml.create = qml);
    })();
    QZFL.fixLayout = {_fixLayout: null, _isIE6: (QZFL.userAgent.ie && QZFL.userAgent.ie < 7), _layoutDiv: {}, _layoutCount: 0, _init: function () {
        this._fixLayout = QZFL.dom.get("fixLayout") || QZFL.dom.createElementIn("div", document.body, false, {id: "fixLayout", style: "width:100%;"});
        this._isInit = true;
        if (this._isIE6) {
            QZFL.event.addEvent(document.compatMode == "CSS1Compat" ? window : document.body, "scroll", QZFL.event.bind(this, this._onscroll));
        }
    }, create: function (html, isBottom, layerId, noFixed, options) {
        if (!this._isInit) {
            this._init();
        }
        options = options || {};
        var tmp = {style: (isBottom ? "bottom:0;" : "top:0;") + (options.style || "left:0;width:100%;z-index:10000")}, _c;
        if (layerId) {
            tmp.id = layerId;
        }
        this._layoutCount++;
        _c = this._layoutDiv[this._layoutCount] = QZFL.dom.createElementIn("div", this._fixLayout, false, tmp);
        _c.style.position = this._isIE6 ? "absolute" : "fixed";
        _c.isTop = !isBottom;
        _c.innerHTML = html;
        _c.noFixed = noFixed ? 1 : 0;
        return this._layoutCount;
    }, moveTop: function (layoutId) {
        if (!this._layoutDiv[layoutId].isTop) {
            with (this._layoutDiv[layoutId]) {
                if (this._isIE6 && !this._layoutDiv[layoutId].noFixed) {
                    style.marginTop = QZFL.dom.getScrollTop() + "px";
                    style.marginBottom = "0";
                    style.marginBottom = "auto";
                }
                style.top = "0";
                style.bottom = "";
                isTop = true;
            }
        }
    }, moveBottom: function (layoutId) {
        if (this._layoutDiv[layoutId].isTop) {
            with (this._layoutDiv[layoutId]) {
                if (this._isIE6 && !this._layoutDiv[layoutId].noFixed) {
                    style.marginTop = "auto";
                    style.marginBottom = "0";
                    style.marginBottom = "auto";
                }
                style.top = "";
                style.bottom = "0";
                isTop = false;
            }
        }
    }, fillHtml: function (layoutId, html) {
        this._layoutDiv[layoutId].innerHTML = html;
    }, _onscroll: function () {
        var o = QZFL.fixLayout;
        for (var k in o._layoutDiv) {
            if (o._layoutDiv[k].noFixed) {
                continue;
            }
            QZFL.dom.setStyle(o._layoutDiv[k], "display", 'none');
        }
        clearTimeout(this._timer);
        this._timer = setTimeout(this._doScroll, 500);
        if (this._doHide) {
            return
        }
        this._doHide = true;
    }, _doScroll: function () {
        var o = QZFL.fixLayout;
        for (var k in o._layoutDiv) {
            if (o._layoutDiv[k].noFixed) {
                continue;
            }
            var _item = o._layoutDiv[k];
            if (_item.isTop) {
                o._layoutDiv[k].style.marginTop = QZFL.dom.getScrollTop() + "px";
            } else {
                o._layoutDiv[k].style.marginBottom = "0";
                o._layoutDiv[k].style.marginBottom = "auto";
            }
        }
        clearTimeout(this._stimer);
        this._stimer = setTimeout(function () {
            for (var k in o._layoutDiv) {
                if (o._layoutDiv[k].noFixed) {
                    continue;
                }
                QZFL.dom.setStyle(o._layoutDiv[k], "display", "");
            }
        }, 800);
        o._doHide = false;
    }};
    QZFL.widget.bubble = {show: function (target, title, msg, opts) {
        opts = opts || {};
        var bid = opts.id || "oldBubble_" + (++QZFL.widget.bubble.count);
        opts.id = bid;
        QZFL.imports(QZFL.widget.bubble.path, function () {
            QZFL.widget.tips.show('<div>' + title + '</div>' + msg, target, opts);
        });
        return bid;
    }, count: 0, hide: function (id) {
        if (QZFL.widget.tips) {
            QZFL.widget.tips.close(id);
        }
    }, hideAll: function () {
        if (QZFL.widget.tips) {
            QZFL.widget.tips.closeAll();
        }
    }};
    function hideBubble(bubbleId) {
        QZFL.widget.bubble.hide(bubbleId);
    }

    function hideAllBubble() {
        QZFL.widget.bubble.hideAll();
    }

    QZFL.widget.bubble.showEx = QZFL.emptyFn;
    QZFL.widget.bubble.setExKey = QZFL.emptyFn;
    QZFL.widget.tips = {path: "http://" + QZFL.config.resourceDomain + "/ac/qzfl/release/widget/tips.js?max_age=1209600", show: function (html, aim, opts) {
        opts = opts || {};
        var bid = opts.id || "QZFL_bubbleTips_" + (++QZFL.widget.tips.count);
        opts.id = bid;
        QZFL.imports(QZFL.widget.tips.path, function () {
            QZFL.widget.tips.show(html, aim, opts);
        });
        return bid;
    }, count: -1, close: function (id) {
        QZFL.imports(QZFL.widget.tips.path, function () {
            if (QZFL.widget.tips) {
                QZFL.widget.tips.close(id);
            }
        });
    }, closeAll: function () {
        QZFL.imports(QZFL.widget.tips.path, function () {
            if (QZFL.widget.tips) {
                QZFL.widget.tips.closeAll();
            }
        });
    }, resize: function (id) {
        QZFL.imports(QZFL.widget.tips.path, function () {
            if (QZFL.widget.tips) {
                QZFL.widget.tips.resize && QZFL.widget.tips.resize(id);
            }
        });
    }};
    (QZFL.widget.bubble || {}).path = QZFL.widget.tips.path;
    QZFL.widget.seed = {_seed: 1, domain: "qzone.qq.com", prefix: "__Q_w_s_", update: function (k, opt) {
        var n = 1, s, th = QZFL.widget.seed;
        if (typeof(k) == "undefined") {
            n = th._update();
        } else {
            k = th.prefix + k;
            if (opt && opt.useCookie) {
                n = QZFL.cookie.get(k);
                if (n) {
                    QZFL.cookie.set(k, ++n, opt.domain || th.domain, null, 3000)
                } else {
                    return 0;
                }
            } else {
                s = QZFL.shareObject.getValidSO();
                if (!s) {
                    n = th._update();
                } else if (n = s.get(k)) {
                    s.set(k, ++n);
                } else {
                    return 0;
                }
            }
        }
        return n;
    }, _update: function () {
        var th = QZFL.widget.seed;
        QZFL.cookie.set("randomSeed", (th._seed = parseInt(Math.random() * 1000000, 10)), th.domain, null, 3000);
        return th._seed;
    }, get: function (k, opt) {
        var s, n, th = QZFL.widget.seed;
        if (typeof(k) == "undefined") {
            return(th._seed = QZFL.cookie.get("randomSeed")) ? th._seed : th.update();
        } else {
            k = th.prefix + k;
            if (opt && opt.useCookie) {
                return(n = QZFL.cookie.get(k)) ? n : (QZFL.cookie.set(k, n = 1, opt.domain || th.domain, null, 3000), n);
            } else {
                if (!(s = QZFL.shareObject.getValidSO())) {
                    return th._seed;
                }
                return(n = s.get(k)) ? n : (s.set(k, n = 1), n);
            }
        }
    }};
    QZFL.widget.runBox = function (startNode, endNode, opts) {
        var doc, dv, sp, ep;
        startNode = QZFL.dom.get(startNode);
        endNode = QZFL.dom.get(endNode);
        if (!QZFL.lang.isNode(startNode) || !QZFL.lang.isNode(endNode) || !QZFL.effect) {
            return;
        }
        opts = opts || {};
        opts.duration = opts.duration || 0.8;
        doc = opts.doc = opts.doc || document;
        sp = QZFL.dom.getPosition(startNode);
        dv = doc.createElement("div");
        dv.style.cssText = "border:3px solid #999; z-index:10000; position:absolute; left:" + sp.left + "px; top:" + sp.top + "px; width:" + sp.width + "px; height:" + sp.height + "px;";
        doc.body.appendChild(dv);
        ep = QZFL.dom.getPosition(endNode);
        QZFL.effect.run(dv, {left: ep.left, top: ep.top, width: ep.width, height: ep.height}, {duration: opts.duration * 1000, complete: function () {
            doc.body.removeChild(dv);
            sp = ep = dv = null;
        }});
    };
    QZFL.widget.runBox.start = function () {
        QZFL.widget.runBox.apply(QZFL.widget.runBox, arguments);
    };
    QZFL.object.map(QZFL.string || {});
    QZFL.object.map(QZFL.util || {});
    QZFL.object.map(QZFL.lang || {});
    (function (w) {
        w.ua = w.ua || QZFL.userAgent;
        w.$e = QZFL.element.get;
        !w.$ && (w.$ = QZFL.dom.get);
        w.removeNode = QZFL.dom.removeElement;
        w.ENV = QZFL.enviroment;
        w.addEvent = QZFL.event.addEvent;
        w.removeEvent = QZFL.event.removeEvent;
        w.getEvent = QZFL.event.getEvent;
        w.insertFlash = QZFL.media.getFlashHtml;
        w.getShareObjectPrefix = getShareObjectPrefix;
    })(window);
    if (!QZFL.pluginsDefine) {
        QZFL.pluginsDefine = {};
    }
    QZFL.pluginsDefine.getACSRFToken = function () {
        return arguments.callee._DJB(QZFL.cookie.get("skey"));
    };
    QZFL.pluginsDefine.getACSRFToken._DJB = function (str) {
        var hash = 5381;
        for (var i = 0, len = str.length; i < len; ++i) {
            hash += (hash << 5) + str.charCodeAt(i);
        }
        return hash & 0x7fffffff;
    };
    (function () {
        var t = QZONE.FormSender;
        if (t && t.pluginsPool) {
            t.pluginsPool.formHandler.push(function (fm) {
                if (fm) {
                    if (!fm.g_tk) {
                        var a = QZFL.string.trim(fm.action);
                        a += (a.indexOf("?") > -1 ? "&" : "?") + "g_tk=" + QZFL.pluginsDefine.getACSRFToken();
                        fm.action = a;
                    }
                }
                return fm;
            });
        }
    })();
    (function () {
        var t = QZONE.JSONGetter, jsRE = /\.js|\.json$/i;
        if (t && t.pluginsPool) {
            t.pluginsPool.srcStringHandler.push(function (ss) {
                var sw, pn;
                if (typeof(ss) == "string") {
                    if (ss.indexOf("g_tk=") < 0) {
                        pn = (sw = (ss.indexOf("?") > -1)) ? ss.split('?')[0] : ss;
                        if (jsRE.lastIndex = 0, !jsRE.test(pn)) {
                            ss += (sw ? "&" : "?") + "g_tk=" + QZFL.pluginsDefine.getACSRFToken();
                        }
                    }
                }
                return ss;
            });
        }
    })();
    if (!QZFL.pluginsDefine) {
        QZFL.pluginsDefine = {};
    }
    QZFL.pluginsDefine.networkChectLibPath = 'http://' + QZFL.config.resourceDomain + '/qzone/v6/troubleshooter/network_check_plugin_lib.js';
    (function () {
        var t = QZONE.FormSender;
        if (t && t.pluginsPool) {
            t.pluginsPool.onErrorHandler.push(function (fsObj) {
                fsObj && QZFL.pluginsDefine && QZFL.pluginsDefine.networkChectLibPath && QZFL.imports && QZFL.imports(QZFL.pluginsDefine.networkChectLibPath, (function (d) {
                    return function () {
                        QZONE && QZONE.troubleShooter && QZONE.troubleShooter.qzflPluginNetworlCheck && QZONE.troubleShooter.qzflPluginNetworlCheck(d);
                    };
                })({url: fsObj.uri}));
            });
        }
    })();
    (function () {
        var t = QZONE.JSONGetter;
        if (t && t.pluginsPool) {
            t.pluginsPool.onErrorHandler.push(function (jgObj) {
                jgObj && QZFL.pluginsDefine && QZFL.pluginsDefine.networkChectLibPath && QZFL.imports && QZFL.imports(QZFL.pluginsDefine.networkChectLibPath, (function (d) {
                    return function () {
                        QZONE && QZONE.troubleShooter && QZONE.troubleShooter.qzflPluginNetworlCheck && QZONE.troubleShooter.qzflPluginNetworlCheck(d);
                    };
                })({url: jgObj._uri}));
            });
        }
    })();
    (function (q) {
        var commurl = 'http://c.isdspeed.qq.com/code.cgi', urlParse = /^http:\/\/([\s\S]*?)(\/[\s\S]*?)(?:\?|$)/, pingSender = q.pingSender, collector = [], timer, isreportG = Math.random() * 2000 < 1, isreportP = Math.random() * 100 < 1, uin = typeof g_iUin == 'undefined' ? 0 : g_iUin, duration = 1000, each = q.object.each;

        function valueStat(domain, cgi, type, code, time, rate, uin, exts) {
            if (Math.random() > 1 / rate)
                return;
            var param = [];
            param.push('uin=' + uin, 'key=' + 'domain,cgi,type,code,time,rate', 'r=' + Math.random());
            if (typeof exts.unshift == 'function') {
                var i = 0;
                while (exts.length) {
                    if (param.join('&').length > 1000) {
                        break;
                    }
                    var c = exts.shift();
                    param.push([i + 1, 1].join('_') + '=' + c[0]);
                    param.push([i + 1, 2].join('_') + '=' + c[1] + '?qzfl');
                    param.push([i + 1, 3].join('_') + '=' + c[2]);
                    param.push([i + 1, 4].join('_') + '=' + c[3]);
                    param.push([i + 1, 5].join('_') + '=' + c[4]);
                    param.push([i + 1, 6].join('_') + '=' + c[5]);
                    i++;
                }
            }
            if (domain != '' || i > 0) {
                q.pingSender && q.pingSender(commurl + '?' + param.join('&'), 1000);
            }
        }

        function _r() {
            if (collector.length) {
                valueStat('', '', '', '', '', '', uin, collector);
            }
            timer = setTimeout(_r, duration);
            duration *= 1.1;
        }

        function toabs(id) {
            if (!id)
                return'';
            var ret = id;
            if (id.indexOf('://') == 4 || id.indexOf('://') == 5) {
                ret = id;
            }
            else if (id.indexOf('../') === 0) {
                ret = location.protocol + '//' + location.host + '/' + id.replace(/(?:\.\.\/)*/, location.pathname.split('/').slice(1, -1 * (id.split('../').length)).join('/') + '/');
            }
            else if (/^[^\/]+\//.test(id) || id.indexOf('./') === 0) {
                if (id.indexOf('./') === 0) {
                    id = id.substring(2);
                }
                ret = location.protocol + '//' + location.host + location.pathname.split('/').slice(0, -1).join('/') + '/' + id;
            }
            else if (id.charAt(0) === '/') {
                ret = location.protocol + '//' + location.host + id;
            }
            return ret;
        }

        each(['JSONGetter', 'FormSender'], function (n) {
            q[n].prototype.setReportRate = function (rate) {
                this.reportRate = rate;
            };
            if (q[n] && q[n].pluginsPool) {
                if (typeof q[n].pluginsPool.onRequestComplete == 'undefined') {
                    q[n].pluginsPool.onRequestComplete = [];
                }
                q[n].pluginsPool.onRequestComplete.push(function (th) {
                    var u = th._uri || th.uri;
                    u = toabs(u);
                    var mtch = u.match(urlParse), url = mtch[2], domain = mtch[1];
                    if (th.msg && th.msg.indexOf('Connection') > -1) {
                        collector.push([domain, url, 2, 502, +th.endTime - th.startTime, 1]);
                        return;
                    }
                    var d = th.resultArgs;
                    if (d && (d = d[0])) {
                        if (typeof d.code == 'undefined') {
                            return;
                        }
                        else if (d.code != 0) {
                            collector.push([domain, url, 3, d.subcode || 1, +th.endTime - th.startTime, 1]);
                        }
                        else {
                            if (th instanceof q.JSONGetter) {
                                if (th.reportRate) {
                                    (th.reportRate == 1 || Math.random() < 1 / th.reportRate) && collector.push([domain, url, 1, d.subcode || 1, +th.endTime - th.startTime, th.reportRate || 2000]);
                                }
                                else {
                                    isreportG && collector.push([domain, url, 1, d.subcode || 1, +th.endTime - th.startTime, th.reportRate || 2000]);
                                }
                            }
                            if (th instanceof q.FormSender) {
                                if (th.reportRate) {
                                    (th.reportRate == 1 || Math.random() < 1 / th.reportRate) && collector.push([domain, url, 1, d.subcode || 1, +th.endTime - th.startTime, th.reportRate || 100]);
                                }
                                else {
                                    isreportP && collector.push([domain, url, 1, d.subcode || 1, +th.endTime - th.startTime, th.reportRate || 100]);
                                }
                            }
                        }
                    }
                });
            }
        });
        _r();
    })(QZFL);
    if (typeof(define) === 'function') {
        define(function () {
            return QZFL;
        });
    }
})();
if (QZFL.userAgent.ie) {
    eval((typeof document.documentMode == 'undefined' || document.documentMode < 9 ? "var document = QZFL._doc;" : "") + "var setTimeout = QZFL._setTimeout, setInterval = QZFL._setInterval");
}
/*  |xGv00|55857427e2873bd85dbaf2b3bf0324b1 */

var $extend = function () {
    var args = arguments;
    if (!args[1])args = [this, args[0]];
    for (var property in args[1]) {
        var old = args[0][property];
        args[0][property] = args[1][property];
        if (typeof old == "function") {
            args[0][property].parent = old;
        }
    }
    return args[0];
};
Function.prototype.bind = function (obj) {
    var _method = this;
    return function () {
        return _method.apply(obj, arguments);
    }
}
Function.prototype.pass = function () {
    var args = arguments;
    var _method = this;
    return function () {
        return _method.apply(null, args);
    }
}
var QPHOTO = QPHOTO || {};
QPHOTO.EXTDATA = QPHOTO.EXTDATA || {};
QPHOTO.setDef = function (map, key, value) {
    if (map && map[key] == null) {
        map[key] = value;
    }
};
QPHOTO.inPengyou = QZONE && QZONE.FP && QZONE.FP.isInPengyou && QZONE.FP.isInPengyou();
if (QPHOTO.EXTDATA.referer == "py_class") {
    QPHOTO.inPengyou = true;
}
QPHOTO.inQzone = !QPHOTO.inPengyou;
QPHOTO.refer = QPHOTO.inPengyou ? 'pengyou' : 'qzone';
QPHOTO.plat = QPHOTO.inPengyou ? 'pengyou' : 'qzone';
(function () {
    var _t = self;
    QZFL = QZONE;
    if (QZONE && QZONE.FP) {
        _t = QZONE.FP._t;
    }
    if (!window.isFusion && _t.QZFL && _t.QZFL.dataCenter) {
        QPHOTO.data = _t.QZFL.dataCenter;
    } else {
        var _d;
        try {
            parent.g_JData = parent.g_JData || {};
            _d = parent.g_JData || {};
        } catch (e) {
            _d = {}
        }
        QPHOTO.data = {"save": function (key, value) {
            _d[key] = value;
        }, "get": function (key) {
            return _d[key]
        }, "del": function (key) {
            delete _d[key]
        }}
    }
    var _getter = QZFL.JSONGetter;
    try {
        if (!ua.ie && _t.QZFL) {
            _getter = _t.QZFL.JSONGetter;
        }
    } catch (e) {
        _getter = QZFL.JSONGetter;
    }
    QPHOTO.util = QPHOTO.util || {};
    QPHOTO.util.getLoginUin = function () {
        if (QPHOTO.inPengyou) {
        }
        var uin = parseInt(QZONE.cookie.get("zzpaneluin"), 10);
        if (isNaN(uin) || uin < 1000) {
            uin = parseInt(QZONE.cookie.get("uin").replace(/[^\d]/g, ""), 10);
            if (isNaN(uin) || uin < 1000) {
                uin = 0;
            }
        }
        return uin;
    }
    QPHOTO.util.loadJsonData = function (xId, url, callback, errcallback, refresh, charset, callbackFunctionName) {
        var _d = QPHOTO.data.get(xId);
        if (_d && !refresh && !_d.error) {
            _d._isCacheRead = true;
            callback(_d);
            return;
        }
        charset = charset || "gb2312";
        var cFN = callbackFunctionName || "JsonCallback";
        var snd = new _getter(url, void(0), QPHOTO.EXTDATA.appid ? QPHOTO.EXTDATA : null, charset);
        snd.onSuccess = function (o) {
            try {
                QPHOTO.data.save(xId, o)
                callback(QPHOTO.data.get(xId));
            } catch (err) {
                if (err.number && err.number == -2146823281) {
                }
            }
        };
        if (typeof errcallback == 'function') {
            snd.onError = errcallback;
        }
        snd.send(cFN);
    }
    QPHOTO.util.loadJsonData_v2 = function (params) {
        var appid, notice, uin, hostUin, xId, url, callback, errcallback, format, refresh, charset, source, data, callbackFunctionName, converToOldObject;
        appid = params.appid || QPHOTO.EXTDATA.appid || 4;
        notice = params.notice || 0;
        uin = params.uin;
        hostUin = params.hostUin;
        xId = params.xId;
        url = params.url;
        callback = params.callback;
        errcallback = params.errcallback;
        format = params.format || 'jsonp';
        source = params.source || params.refer || (QPHOTO.EXTDATA.appid ? "qzoneapp" : QPHOTO.refer);
        converToOldObject = params.converToOldObject;
        refresh = params.refresh;
        data = params.data || {};
        charset = params.charset || 'gbk';
        callbackFunctionName = params.callbackFunctionName || '';
        var _d = QPHOTO.data.get(xId);
        if (_d && !refresh && !_d.error && !_d.code) {
            _d._isCacheRead = true;
            callback(_d);
            return;
        }
        var _data = {"appid": appid, "notice": notice, "callbackFun": callbackFunctionName, "hostUin": hostUin, "inCharset": charset, "outCharset": charset, "format": format, "source": source, "plat": QPHOTO.plat};
        if (uin) {
            _data.uin = uin;
        }
        QZFL.extend(_data, data);
        QZFL.extend(_data, QPHOTO.EXTDATA);
        var snd = new _getter(url, void(0), _data, charset);
        snd.onSuccess = QZFL.object.bind(this, function (o) {
            try {
                QPHOTO.data.save(xId, converToOldObject ? o.data : o)
                callback(QPHOTO.data.get(xId));
            } catch (err) {
            }
        });
        var onError = QZFL.object.bind(this, function (o) {
        });
        if (typeof errcallback == 'function') {
            snd.onError = errcallback;
        } else {
            snd.onError = onError;
        }
        snd.send(callbackFunctionName || "_Callback");
    };
    QPHOTO.util.getIdx = function (array, key, value) {
        for (var i = array.length - 1; i >= 0; --i) {
            if (array[i][key] == value) {
                return i;
            }
        }
        return null;
    }
    QPHOTO.util.getImgUrl = function (pre, spec, open) {
        spec = spec || "a";
        var targetSet = "a";
        if (spec == "a" || spec == "i") {
            targetSet = "a";
        } else if (spec == "r" || spec == "o") {
            targetSet = "r";
        } else {
            targetSet = "b";
        }
        if (open) {
            targetSet = "o";
        }
        pre = trim(pre);
        var setMap = {};
        if (pre.search(/(&(\w)=(\d+)){0,1}&(\w)=(\d+)&(\w)=(\d+)$/ig) != -1) {
            setMap[RegExp.$2 == "" ? "_tmp" : RegExp.$2] = RegExp.$3 + "";
            setMap[RegExp.$4] = RegExp.$5;
            setMap[RegExp.$6] = RegExp.$7;
            if (setMap[spec]) {
                return pre.replace(/^http:\/\/[a-z](\d+)\./ig, "http://" + targetSet + (setMap[spec]) + ".").replace(/\/[a-z]+\//ig, '/' + spec + '/');
            } else if (spec == "m") {
                return pre.replace(/^http:\/\/[a-z](\d+)\./ig, "http://" + targetSet + (setMap["b"]) + ".").replace(/\/[a-z]+\//ig, '/' + spec + '/');
            } else {
                return pre;
            }
        } else if (pre.match(/\/[a-z]\//ig)) {
            if (spec == "r" || spec == "o") {
                return pre.replace(/^http:\/\/[a-z](\d+)\./ig, "http://" + (open ? "o" : "") + "r.").replace(/\/[a-z]+\//ig, '/' + spec + '/');
            } else {
                return pre.replace(/^http:\/\/[a-z]/ig, "http://" + targetSet).replace(/\/[a-z]+\//ig, '/' + spec + '/');
            }
        } else {
            return pre;
        }
    }
})()
QPHOTO.loadJSON = (function () {
    var _setDef = QPHOTO.setDef;
    var _param;
    var _callback = function () {
        var args = arguments;
        var ret = _param.cDFn(args[0]);
        if (ret == 0) {
            _param.sucCb.apply(null, args);
        } else if (ret == -1) {
            _param.errCb = _param.errCb.parent || _param.errCb;
            _param.errCb.apply(null, args);
        } else {
            _param.errCb.apply(null, args);
        }
    }
    var _send2 = function () {
        _param.errCb = _param.errCb.parent || _param.errCb;
        var p = _param;
        QPHOTO.util.loadJsonData(p.xId, p.url2, _callback, p.errCb, true, p.charset, p.cFn);
    }
    var _send = function () {
        var p = _param;
        QPHOTO.util.loadJsonData(p.xId, p.url, _callback, p.errCb, p.refresh, p.charset, p.cFn);
    }
    return function (parameter) {
        _param = parameter || {};
        _setDef(_param, "url2", null);
        _setDef(_param, "cDFn", QZFL.emptyFn);
        _setDef(_param, "errCb", QZFL.emptyFn);
        if (_param.url2) {
            $extend(_param, {errCb: _send2})
        }
        _send();
    }
})();
QPHOTO.loadJSON_v2 = (function () {
    var _setDef = QPHOTO.setDef;
    var _param;
    var _callback = function () {
        var args = arguments;
        var ret = _param.cDFn(args[0]);
        if (ret == 0) {
            _param.sucCb.apply(null, args);
        } else if (ret == -1) {
            _param.errCb = _param.errCb.parent || _param.errCb;
            _param.errCb.apply(null, args);
        } else {
            _param.errCb.apply(null, args);
        }
    }
    var _send2 = function () {
        _param.errCb = _param.errCb.parent || _param.errCb;
        var p = _param;
        QPHOTO.util.loadJsonData_v2({xId: p.xId, url: p.url2, callback: _callback, errcallback: p.errCb, converToOldObject: false, uin: _param.uin, hostUin: _param.hostUin, charset: p.charset});
    }
    var _send = function () {
        var p = _param;
        QPHOTO.util.loadJsonData_v2({xId: p.xId, url: p.url, callback: _callback, errcallback: p.errCb, converToOldObject: false, uin: _param.uin, hostUin: _param.hostUin, refresh: p.refresh, charset: p.charset});
    }
    return function (parameter) {
        _param = parameter || {};
        _setDef(_param, "url2", null);
        _setDef(_param, "cDFn", QZFL.emptyFn);
        _setDef(_param, "errCb", QZFL.emptyFn);
        if (_param.url2) {
            $extend(_param, {errCb: _send2})
        }
        _send();
    }
})();
QPHOTO.domain = (function () {
    var _setDef = QPHOTO.setDef;
    var _data;
    var _getDomain = function (param) {
        if (QPHOTO.inPengyou) {
            var url = "http://app.photo.pengyou.com/cgi-bin/app/cgi_get_route_v2";
            var callback = function (d) {
                if (!d.code) {
                    d = d.data || d;
                    QPHOTO.data.save(param.key, d);
                    if (d.domain) {
                        _k = d.domain["default"];
                        _data = d[_k];
                    } else {
                        _data = d;
                    }
                    param.sucCb.apply(null, [_data]);
                }
            };
            var errCallback = function (d) {
                if (d && d.data) {
                    param.errCb(d);
                } else {
                    errCb();
                }
            };
            QPHOTO.util.loadJsonData_v2({xId: param.key, uin: param.uin, hostUin: param.uin, url: url, callback: callback, errCallback: errCallback});
        } else {
            QPHOTO.loadJSON({xId: param.key, url: "http://route.store.qq.com/GetRoute?UIN=" + param.uin + "&type=json&version=2", url2: "http://rb.store.qq.com/GetRoute?UIN=" + param.uin + "&type=json&version=2", cDFn: _check.bind(param), sucCb: param.sucCb, errCb: param.errCb, charset: "gb2312", cFn: QPHOTO.inPengyou ? "_Callback" : "photoDomainNameCallback"});
        }
    }
    var _check = function (data, param) {
        try {
            param = param || this;
            if (data && (!data.error) && data.uin == param.uin) {
                var _k;
                if (data.domain) {
                    _k = data.domain["default"];
                    _data = data[_k];
                } else {
                    _data = data;
                }
                var regexp = QPHOTO.inPengyou ? /pengyou\.com/ : /qq\.com/;
                if (_data.r.match(regexp) && _data.u.match(regexp) && _data.nu.match(regexp) && _data.p.match(regexp) && _data.s.match(regexp)) {
                    return 0;
                } else {
                    return 1;
                }
            } else {
                return 1;
            }
        } catch (e) {
            return 1;
        }
    }
    var inner;
    return inner = {get: function (parameter) {
        var param = parameter || {};
        _setDef(param, "key", "user_domain_" + param.uin);
        _setDef(param, "sucCb", QZFL.emptyFn);
        _setDef(param, "errCb", QZFL.emptyFn);
        _getDomain(param);
    }, getData: function (parameter) {
        var param = parameter || {};
        _setDef(param, "key", "user_domain_" + param.uin);
        var data = QPHOTO.data.get(param.key);
        var d = null;
        if (_check(data, param) == 0) {
            d = {};
            $extend(d, _data);
        }
        return d;
    }}
})();
QPHOTO.url = (function () {
    var _setDef = QPHOTO.setDef;
    var _gu = function (param) {
        var domain = QPHOTO.domain.getData({uin: param.uin});
        if (!domain) {
            return null;
        }
        var common_url_nu = "http://" + domain.nu + "/cgi-bin/common/";
        var common_url_r = "http://" + domain.r + "/cgi-bin/common/";
        var common_url_u = "http://" + domain.u + "/cgi-bin/upload/";
        var url;
        var suffix = "hostUin=" + param.uin + "&refer=" + param.refer + '&plat=' + param.plat;
        var suffix_weibo = "euin=" + param.uin + "&logineuin=" + param.uin;
        if (param.version == "v2") {
            switch (param.name) {
                case"getmultipiccoment":
                    url = 'http://app.photo.qq.com/cgi-bin/app/cgi_getmultipiccoment_v2';
                    break;
                case"tag_search":
                    url = "http://app.photo.qq.com/cgi-bin/app/cgi_tag_search_v2";
                    break;
                case"album_list":
                    url = "http://" + domain.p.replace("sznewp", "alist").replace("xanewp", "xalist") + "/fcgi-bin/fcg_list_album_v2?";
                    break;
                case"album_list_bak":
                    url = "http://" + domain.p.replace("sznewp", "alist").replace("xanewp", "xalist") + "/fcgi-bin/fcg_list_album_v2?";
                    break;
                case"pic_list":
                    url = "http://" + domain.s.replace("static", "plist") + "/fcgi-bin/fcg_list_photo_v2?";
                    break;
                case"pic_list_private":
                    url = common_url_nu + "cgi_view_album_v2?";
                    break;
                case"new_photo":
                    url = "http://" + domain.s.replace('static', 'plist') + "/fcgi-bin/fcg_recent_picture_v2?";
                    break;
            }
        }
        else {
            switch (param.name) {
                case"album_list_weibo":
                    url = "http://api.photo.qq.com/photo/m_list_album?" + suffix_weibo;
                    break;
                case"album_list":
                    url = "http://" + domain.p.replace("sznewp", "alist").replace("xanewp", "xalist") + "/fcgi-bin/fcg_list_album?" + suffix;
                    break;
                case"album_list_bak":
                    url = common_url_nu + "cgi_list_album?" + suffix;
                    break;
                case"album_add":
                    url = common_url_nu + "cgi_add_album?" + suffix;
                    break;
                case"album_del":
                    url = common_url_nu + "cgi_del_album?" + suffix;
                    break;
                case"album_mod":
                    url = common_url_nu + "cgi_modify_album?" + suffix;
                    break;
                case"pic_list_weibo":
                    url = "http://api.photo.qq.com/photo/list_pic?" + suffix_weibo;
                    break;
                case"pic_list":
                    url = "http://" + domain.s.replace("static", "plist") + "/fcgi-bin/fcg_list_photo?" + suffix;
                    break;
                case"pic_list_private":
                    url = common_url_nu + "cgi_view_album?" + suffix;
                    break;
                case"pic_mod":
                    url = common_url_nu + "cgi_modify_pic?" + suffix;
                    break;
                case"pic_del":
                    url = common_url_nu + "cgi_del_pic?" + suffix;
                    break;
                case"pic_mul_del":
                    url = common_url_nu + "cgi_delpic_multi?" + suffix;
                    break;
                case"pic_move":
                    url = common_url_nu + "cgi_move_pic?" + suffix;
                    break;
                case"pic_upload":
                    url = common_url_u + "cgi_upload_pic";
                    break;
                case"pic_up_diary":
                    url = common_url_u + "cgi_upload_illustrated";
                    break;
                case"pic_up_activex":
                    url = common_url_u + "cgi_upload_activex";
                    break;
                case"pic_up_famous":
                    url = common_url_u.replace(/up\.photo\.qq\.com/, "famousup.photo.qq.com") + "cgi_upload_pic";
                    break;
                case"pic_up_diary_famous":
                    url = common_url_u.replace(/up\.photo\.qq\.com/, "famousup.photo.qq.com") + "cgi_upload_illustrated";
                    break;
                case"pic_up_activex_famous":
                    url = common_url_u.replace(/up\.photo\.qq\.com/, "famousup.photo.qq.com") + "cgi_upload_activex";
                    break;
                case"add_cmt":
                    url = common_url_r + "cgi_add_piccomment?" + suffix;
                    break;
                case"del_cmt":
                    url = common_url_r + "cgi_del_piccomment?" + suffix;
                    break;
                case"add_reply":
                    url = common_url_r + "cgi_add_reply?" + suffix;
                    break;
                case"del_reply":
                    url = common_url_r + "cgi_del_reply?" + suffix;
                    break;
                case"new_photo":
                    url = "http://" + domain.s.replace('static', 'plist') + "/fcgi-bin/fcg_recent_picture?" + suffix;
                    break;
                case"album_add":
                    url = common_url_nu + "cgi_add_album?" + suffix;
                    break;
                case"set_indivalbum":
                    url = common_url_nu + "cgi_set_indivalbum";
                    break;
                case"upload_post":
                    url = common_url_u + "cgi_upload_post?" + suffix;
                    break;
                case"upload_image":
                    url = common_url_u + "cgi_upload_image?" + suffix;
                    break;
                case"photo_reprint":
                    url = common_url_u + "cgi_zz_photo";
                    break;
                case"get_cmt":
                    url = "http://app.photo.qq.com/cgi-bin/app/cgi_pcomment_xml";
                    break;
                case"friend_verify":
                    url = common_url_nu + "/cgi_verify_friend";
                    break;
                case"list_marked":
                    url = common_url_r + "cgi_list_mymark?" + suffix;
                    break;
                case"list_pic_marked":
                    url = common_url_r + "cgi_list_picmark?" + suffix;
                    break;
                case"add_marked":
                    url = common_url_r + "cgi_add_picmark?" + suffix;
                    break;
                case"del_marked":
                    url = common_url_r + "cgi_del_picmark?" + suffix;
                    break;
                case"check_marked":
                    url = common_url_r + "cgi_check_mymark?" + suffix;
                    break;
                case"del_marked":
                    url = common_url_r + "cgi_del_mymark?" + suffix;
                    break;
                case"reply_marked":
                    url = common_url_r + "cgi_del_mymark?" + suffix;
                    break;
                case"get_marked":
                    url = common_url_r + "cgi_get_picmark?" + suffix;
                    break;
                case"up_common":
                    url = "http://" + domain.u + "/cgi-bin/upload/cgi_upload_pic";
                    break;
                case"up_famous":
                    url = "http://" + domain.u.replace("up", "famousup") + "/cgi-bin/upload/cgi_upload_pic";
                    break;
                case"up_common_flash":
                    url = "http://" + domain.u + "/cgi-bin/upload/cgi_upload_image";
                    break;
                case"up_famous_flash":
                    url = "http://" + domain.u.replace("up", "famousup") + "/cgi-bin/upload/cgi_upload_image";
                    break;
                case"yellow_photo_info":
                    url = common_url_nu + "/cgi_get_picinfo";
                    break;
                case"rotate_image":
                    url = common_url_nu + "cgi_rotation_pic";
                    break;
            }
        }
        return url;
    }
    var inner;
    return inner = {get: function (parameter) {
        var param = parameter || {};
        _setDef(param, "key", param.name + "_" + param.uin);
        _setDef(param, 'plat', QPHOTO.plat);
        if (QPHOTO.EXTDATA.appid) {
            _setDef(param, "refer", "qzoneapp");
        } else {
            _setDef(param, "refer", QPHOTO.refer);
        }
        return _gu(param);
    }}
})();
var PhotoLogic = (function () {
    var upCounter = 0;

    function getUserDomain(cfg) {
        QPHOTO.domain.get({uin: cfg.uin, sucCb: cfg.callBack, errCb: cfg.errBack});
    }

    function getUrl(cfg) {
        return QPHOTO.url.get({uin: cfg.uin, name: cfg.type, refer: cfg.refer});
    }

    function getUrl_v2(cfg) {
        return QPHOTO.url.get({uin: cfg.uin, name: cfg.type, refer: cfg.refer, version: "v2"});
    }

    function checkRet(d) {
        d = d || {};
        if (d.ret == 0 || d.code == 0) {
            return 0;
        } else if (d.code == -4403) {
            return 1;
        } else if (d.ret == -961 || d.ret == -963 || d.code == -3001 || d.code == -3002 || d.code == -10961 || d.code == -10963 || d.code == -10501 || d.code == -10505 || d.code == -10801 || d.code == 10999 || (d.code <= -3000 && d.code > -5000)) {
            return-1;
        } else {
            return 1;
        }
    }

    function _albumFilter(data, type) {
        if (type == 16) {
            return data.album;
        }
        var ret = [];
        var priv, handset, name, d = data.album, tm;
        for (var i = 0, len = d.length; i < len; ++i) {
            tm = d[i];
            priv = tm.priv;
            handset = tm.handset;
            if (handset == 4) {
                name = trim(tm.name);
                if (name == "QQ秀形象_无背景") {
                    continue;
                }
                if (name == "QQ秀相册" || name == "QQ秀合影" || name == "QQ秀形象" || name == "QQ秀泡泡" || name == "QQ秀日志") {
                    if (type & 8) {
                        ret.push(tm);
                    }
                    continue;
                }
            }
            if ((priv == 1 || priv == 4) && (type & 1)) {
                ret.push(tm);
            } else if ((priv == 2 || priv == 5 || priv == 6) && (type & 2)) {
                ret.push(tm);
            } else if (priv == 3 && (type & 4)) {
                ret.push(tm);
            }
        }
        return ret;
    }

    function _getAlbumList(cfg) {
        var data = {xId: cfg.uin + "_alist", url: getUrl_v2({type: "album_list", uin: cfg.uin}) + 'self=0&t=' + Math.random(), url2: getUrl_v2({type: "album_list_bak", uin: cfg.uin}) + 'self=0&t=' + Math.random(), uin: QPHOTO.util.getLoginUin(), hostUin: cfg.uin, cDFn: checkRet, sucCb: function (retd) {
            var d;
            if (retd.data) {
                d = retd.data;
            } else {
                d = retd || {};
            }
            d.album = d.album || [];
            if (!d._isDeXSSed) {
                for (var i = 0; i < d.album.length; i++) {
                    for (var att in d.album[i]) {
                        if (att == 'pre' || att == 'url') {
                            continue;
                        }
                        if (typeof d.album[i][att] == "string") {
                            d.album[i][att] = escHTML(d.album[i][att]);
                        }
                    }
                }
                d._isDeXSSed = true;
            }
            if (cfg.source == "weibo") {
                var newb = [];
                var map = {"albumid": "id", "classid": "classid", "createtime": "createtime", "desc": "desc", "name": "name", "picnum": "total", "pre": "pre", "priv": "priv"}
                var album = d.album;
                for (var i = 0, len = album.length; i < len; ++i) {
                    var tmp = album[i];
                    var o = {};
                    for (var j in map) {
                        o[map[j]] = tmp[j];
                    }
                    newb[i] = o;
                }
                d.album = newb;
                cfg.callBack({albums: _albumFilter(d, cfg.type), info: d.album});
                return;
            }
            cfg.callBack({albums: _albumFilter(d, cfg.type), info: d.left.album});
        }, errCb: function (d) {
            d = d || {code: -1, message: "对不起，网络繁忙，请稍后再试！"};
            cfg.errBack({ret: d.code, msg: d.message});
        }, refresh: cfg.refresh};
        if (cfg.source == "weibo") {
            data.url = getUrl({type: "album_list_weibo", uin: cfg.uin}) + '&pageno=' + (cfg.pageno || 1) + '&number=' + (cfg.number || 16) + '&sort=' + (cfg.sort || 0) + '&refer=' + (cfg.refer || 'qqshow') + '&output_type=json&t=' + Math.random() + '&g_tk=' +
                parent.QSFL.xhr.getAntiCSRFToken();
            data.xId = cfg.uin + "_alist_" + "weibo";
        }
        if (cfg.type == 16) {
            data.xId = cfg.uin + "_alist_" + cfg.type;
            data.url += "&filter=2&handset=9";
            data.url2 += "&filter=2&handset=9";
        }
        QPHOTO.loadJSON_v2(data);
    }

    function _photoFilter(data, type) {
        if (!type) {
            return data.pic;
        }
        var _typeMap = {"1": "jpg", "2": "gif", "3": "png"}
        type = type.toLowerCase().replace("jpeg", "jpg");
        var ret = [], d;
        for (var i = 0, len = data.pic.length; i < len; ++i) {
            d = data.pic[i];
            if (type.match(_typeMap[d.phototype])) {
                ret.push(d);
            }
        }
        return ret;
    }

    function _getPhotoList(cfg) {
        var singleurl = 0;
        singleurl = 1;
        if (cfg.id == "recent_picture") {
            cfg.calltype = "newphoto2plist";
            _getNewPhoto(cfg);
            return;
        }
        var url1 = getUrl_v2({type: "pic_list", uin: cfg.uin}) + "albumid=" + cfg.aid + "&t=" + Math.random();
        if (singleurl && cfg.source != "weibo") {
            url1 += ('&singleurl=1');
        }
        var urlv2 = getUrl_v2({type: "pic_list_private", uin: cfg.uin}) + "albumId=" + cfg.aid + "&albumid=" + cfg.aid + '&t=' + Math.random() + (singleurl ? '&singleurl=1' : '');
        var data = {xId: cfg.uin + "_plist_" + cfg.id, url: cfg.isPrivAlbum ? urlv2 : url1, url2: urlv2, cDFn: checkRet, uin: QPHOTO.util.getLoginUin(), hostUin: cfg.uin, sucCb: function (retd) {
            var d = retd.data || retd;
            d.pic = d.pic || [];
            if (!d._isDeXSSed) {
                for (var att in d) {
                    if (att.indexOf('url') != -1 || att == "raw" || att == "pre") {
                        continue;
                    }
                    if (typeof d[att] == "string") {
                        d[att] = escHTML(d[att]);
                    }
                }
            }
            if (singleurl && cfg.source != "weibo") {
                for (var i = 0; i < d.pic.length; i++) {
                    d.pic[i].url = QPHOTO.util.getImgUrl(d.pic[i].pre, "b", (QPHOTO.EXTDATA.appid));
                    if (!d.pic[i].origin_url) {
                        d.pic[i].origin_url = d.pic[i].url;
                    }
                    if (d.pic[i].raw_upload) {
                        d.pic[i].raw = QPHOTO.util.getImgUrl(d.pic[i].pre, "r");
                    }
                    if (!d.pic[i].raw) {
                        d.pic[i].raw = d.pic[i].url;
                    }
                }
                d.url = QPHOTO.util.getImgUrl(d.pre, "b");
            }
            if (!d._isDeXSSed) {
                for (var i = 0; i < d.pic.length; i++) {
                    for (var att in d.pic[i]) {
                        if (att.indexOf('url') != -1 || att == "raw" || att == "pre") {
                            continue;
                        }
                        if (typeof d.pic[i][att] == "string") {
                            d.pic[i][att] = escHTML(d.pic[i][att]);
                        }
                    }
                }
                d._isDeXSSed = true;
            }
            cfg.callBack({photos: _photoFilter(d, cfg.imageType), info: d});
        }, errCb: function (d) {
            d = d || {code: -1, message: "对不起，网络繁忙，请稍后再试！"};
            cfg.errBack({ret: d.code, msg: d.message});
        }, cFn: "_Callback", refresh: cfg.refresh};
        if (cfg.source == "weibo") {
            data.url = getUrl({type: "pic_list_weibo", uin: cfg.uin}) + '&pageno=' + (cfg.pageno || 1) + '&number=' + (cfg.number || 100) + '&refer=' + (cfg.refer || 'qqshow') + '&output_type=json&t=' + Math.random() + '&g_tk=' + parent.QSFL.xhr.getAntiCSRFToken() + '&albumid=' + cfg.aid;
            data.xId = cfg.uin + "_plist_" + cfg.id + "_weibo";
        }
        QPHOTO.loadJSON_v2(data);
    }

    function _getNewPhoto(cfg) {
        function callBack(d) {
            cfg.callBack({"data": d, "photos": d.photos, "total": d.total});
        }

        function errBack(d) {
            d = d || {};
            cfg.errBack({ret: -1, code: d.code, message: d.message, msg: "对不起，网络繁忙，请稍后再试！"})
        }

        var url = getUrl_v2({type: "new_photo", uin: cfg.uin}) + "t=" + Math.random();
        var refresh = (cfg.refresh == undefined) ? true : cfg.refresh;
        var data = {xId: cfg.uin + "_new_photo_100", url: url, cDFn: checkRet, uin: QPHOTO.util.getLoginUin(), hostUin: cfg.uin, sucCb: function (retd) {
            var d = retd.data;
            if (!d._isDeXSSed) {
                d.photos = d.photos || [];
                for (var i = 0; i < d.photos.length; i++) {
                    for (var att in d.photos[i]) {
                        if (att.indexOf('url') != -1 || att == "raw" || att == "pre") {
                            continue;
                        }
                        if (typeof d.photos[i][att] == "string") {
                            d.photos[i][att] = escHTML(d.photos[i][att]);
                        }
                    }
                    if (cfg.calltype == "newphoto2plist") {
                    }
                }
                if (cfg.calltype == "newphoto2plist") {
                    d.pic = d.photos;
                }
                d._isDeXSSed = true;
            }
            d.info = {};
            callBack(d);
        }, errCb: errBack, refresh: cfg.refresh}
        QPHOTO.loadJSON_v2(data);
    }

    function _uploadWeb(cfg) {
        if (QZONE && QZONE.FP && QZONE.FP._t && QZONE.FP._t.photoconf && QZONE.FP._t.photoconf.u == 0) {
            var _c = new parent.QZONE.widget.Confirm("提示", "尊敬的QQ空间用户:<br/>相册正在进行临时维护，维护过程中，将不支持上传图片，建议您稍候再试！", QZONE.widget.Confirm.TYPE.OK);
            _c.tips[0] = '确定';
            _c.show();
            return;
        }
        var _c = QZONE.dom.get(cfg.container);
        var _id = "_up_" + upCounter;
        var formId = this.formId = "_form" + _id;
        var inputFileId = this.inputFileId = cfg.inputId || "_form_file" + _id;
        var realInputFileId = "_form_file" + _id;
        var ifmId = this.ifmId = "_iframe" + _id;
        var ifmName = this.ifmName = "_ifram_name" + _id;
        _c.innerHTML = ['<form id="' + formId + '" method="post" enctype="multipart/form-data" style="display:inline">', (cfg.inputStr || '<input id="' + inputFileId + '" type="file" name="filename" style="height:20px">'), '</form>'].join("");
        var _destroy = QZFL.emptyFn;

        function errFn(d) {
            if (typeof cfg.errBack == "function") {
                cfg.errBack(d);
            }
            ;
            _destroy();
        }

        function createIframe() {
            var ifm = QZONE.dom.createNamedElement("iframe", ifmName, document);
            ifm.id = ifmId;
            ifm.style.cssText = "height:0px;width:0px;border-width:0px;display:none;";
            var succeed = false;
            _destroy = function () {
                setTimeout(function () {
                    ifm.src = "about:blank";
                    QZONE.dom.removeElement(ifm);
                    ifm = null;
                    clearTimeout(timer);
                }, 1000);
                _destroy = QZFL.emptyFn;
            }
            var timer = null;
            ifm._Callback = function (data) {
                succeed = true;
                clearTimeout(timer);
                ifm._Callback = null;
                ifm.onreadystatechange = null;
                cfg.errBack = cfg.errBack || cfg.callBack;
                var d = data.data;
                d.data = data.data;
                d.ret = d.error;
                if (data.data.error == null || data.data.error == -301 || data.data.error == 0) {
                    cfg.callBack(d);
                } else {
                    cfg.errBack(d);
                }
                _destroy();
                QZFL.cookie.del("albumname");
                QZFL.cookie.del("albumpriv");
                QZFL.cookie.del("albumhandset");
            }
            if (typeof ifm.onreadystatechange != 'undefined') {
                ifm.onreadystatechange = function () {
                    if (ifm.readyState == "complete") {
                        ifm.onreadystatechange = null;
                        timer = setTimeout(function () {
                            errFn({msg: "网络繁忙,请稍候再试"})
                            _destroy();
                        }, 5000);
                    }
                };
            }
            else {
                var interval = setInterval(function () {
                    try {
                        if (succeed) {
                            clearTimeout(timer);
                            clearInterval(interval);
                            return;
                        }
                        var _t = ifm.contentWindow.location.href;
                        if (_t.indexOf(getUpUrl()) == 0) {
                            timer = setTimeout(errFn.pass({msg: "网络繁忙,请稍候再试"}), 5000);
                            clearInterval(interval);
                        }
                    } catch (err) {
                        timer = setTimeout(errFn.pass({msg: "网络繁忙,请稍候再试"}), 5000);
                        clearInterval(interval);
                    }
                }, 100);
            }
            document.body.appendChild(ifm);
        }

        var getUpUrl = function () {
            if (cfg.aid) {
                return getUrl({uin: cfg.uin, type: "pic_upload", aid: cfg.aid, refer: cfg.refer});
            } else {
                return getUrl({uin: cfg.uin, type: "pic_up_diary", aid: cfg.aid, refer: cfg.refer});
            }
        }
        this.send = function (cfg2) {
            $extend(cfg, cfg2);
            var src = document.getElementById(inputFileId).value;
            if (!src || src == "") {
                errFn({msg: "请选择图片上传！"});
                return false;
            }
            var type = (src.substr(src.lastIndexOf("."))).toLowerCase();
            if (!(/\.(jpg|jpeg|png|gif|bmp)/i.test(type))) {
                errFn({msg: "您上传图片的类型不符合(.jpg|.jpeg|.gif|selectedContainer_tip.png|.bmp)！"});
                return false;
            }
            $extend(cfg, {callBack: function (ret) {
                createIframe();
                var f = document.getElementById(formId);
                for (var i = f.childNodes.length - 1; i > 0; i--) {
                    if (f.childNodes[i].type != "file") {
                        QZONE.dom.removeElement(f.childNodes[i]);
                    }
                }
                var _c = document.charset || document.characterSet;
                if (/gbk/i.test(_c)) {
                    _c = _c.toUpperCase();
                } else {
                    _c = _c.toLowerCase();
                }
                var data = cfg.extData || {};
                var _appid = null;
                try {
                    _appid = getParameter("appid");
                    if (_appid == '') {
                        _appid = null;
                    }
                } catch (e) {
                }
                if (cfg.aid) {
                    var albums = ret.albums;
                    var idx = QPHOTO.util.getIdx(albums, "id", cfg.aid);
                    if (idx == null) {
                        errFn({msg: "非法相册ID"});
                        return;
                    }
                    document.getElementById(inputFileId).name = "filename";
                    var d = albums[idx];
                    $extend(data, {"albumname": d.name, "albumpriv": d.priv, "albumhandset": d.handset, "albumbitmap": d.bitmap, "albumid": d.id, "anonymity": d.viewtype, "total": d.total, "refer": _appid ? "qzoneapp" : cfg.refer, "uin": cfg.uin, "output_type": "jsonhtml", "charset": _c, "plat": QPHOTO.plat});
                    if (_appid) {
                        data.appid = _appid;
                    }
                    QZFL.cookie.set("albumname", albums[idx].name, "qq.com", null, 0.2);
                    QZFL.cookie.set("albumpriv", albums[idx].priv, "qq.com", null, 0.2);
                    QZFL.cookie.set("albumhandset", albums[idx].handset, "qq.com", null, 0.2);
                } else {
                    document.getElementById(inputFileId).name = "picname2";
                    $extend(data, {"refer": _appid ? "qzoneapp" : cfg.refer, "uin": cfg.uin, "output_type": "jsonhtml", "charset": _c, "blogtype": (cfg.blogtype ? cfg.blogtype : ""), "plat": QPHOTO.plat});
                    if (_appid) {
                        data.appid = _appid;
                    }
                }
                for (var k in data) {
                    QZONE.dom.createElementIn("input", f, false, {"type": "hidden", "name": k, "value": data[k]});
                }
                cfg.callBack = cfg.callBack.parent || cfg.callBack;
                f.action = getUpUrl();
                if (_appid) {
                    if (f.action.indexOf('?') == -1) {
                        f.action += ('?refer=qzoneapp&appid=' + _appid);
                    } else {
                        f.action += ('&refer=qzoneapp&appid=' + _appid);
                    }
                }
                f.target = ifmName;
                try {
                    f.submit();
                } catch (e) {
                    if (e.number == -2147024891) {
                        var ifm = document.getElementById(ifmId);
                        var fn = ifm.onreadystatechange;
                        ifm.proxyReady = function () {
                            ifm.proxyReady == null;
                            if (fn) {
                                ifm.onreadystatechange = fn;
                            }
                            try {
                                f.submit();
                            } catch (err) {
                                errFn({msg: "请输入正确的文件路径"});
                            }
                        }
                        ifm.src = "http://imgcache.qq.com/qzone/client/photo/pages/qzone_v4/proxy.html";
                    } else {
                        errFn({msg: "请输入正确的文件路径"});
                    }
                }
            }});
            cfg.type = cfg.type || 7;
            getUserDomain({uin: cfg.uin, errBack: cfg.errBack, callBack: function () {
                if (cfg.aid) {
                    _getAlbumList(cfg);
                } else {
                    cfg.callBack();
                }
            }})
        }
        upCounter++;
    }

    var inner;
    return inner = {getAlbumList: function (cfg) {
        QPHOTO.setDef(cfg, "callBack", QZFL.emptyFn);
        QPHOTO.setDef(cfg, "errBack", QZFL.emptyFn);
        getUserDomain({uin: cfg.uin, errBack: cfg.errBack, callBack: function () {
            cfg.type = cfg.type || 1;
            _getAlbumList(cfg);
        }})
    }, getPhotoList: function (cfg) {
        QPHOTO.setDef(cfg, "callBack", QZFL.emptyFn);
        QPHOTO.setDef(cfg, "errBack", QZFL.emptyFn);
        cfg.aid = cfg.id = cfg.aid || cfg.id;
        getUserDomain({uin: cfg.uin, errBack: cfg.errBack, callBack: function () {
            _getPhotoList(cfg);
        }})
    }, getNewPhoto: function (cfg) {
        QPHOTO.setDef(cfg, "callBack", QZFL.emptyFn);
        QPHOTO.setDef(cfg, "errBack", QZFL.emptyFn);
        getUserDomain({uin: cfg.uin, errBack: cfg.errBack, callBack: function () {
            _getNewPhoto(cfg);
        }})
    }, uploadWeb: _uploadWeb, getUploadUrl: function (cfg) {
        QPHOTO.setDef(cfg, "callBack", QZFL.emptyFn);
        QPHOTO.setDef(cfg, "errBack", QZFL.emptyFn);
        getUserDomain({uin: cfg.uin, errBack: cfg.errBack, callBack: function () {
            cfg.callBack(getUrl({uin: cfg.uin, type: "pic_up_diary", aid: cfg.aid, refer: cfg.refer}))
        }})
    }, getExternalUploadUrl: function (cfg) {
        QPHOTO.setDef(cfg, "callBack", QZFL.emptyFn);
        QPHOTO.setDef(cfg, "errBack", QZFL.emptyFn);
        getUserDomain({uin: cfg.uin, errBack: cfg.errBack, callBack: function () {
            cfg.callBack(getUrl({uin: cfg.uin, type: "upload_post", aid: cfg.aid, refer: cfg.refer}))
        }})
    }, getExternalUploadUrlNew: function (cfg) {
        QPHOTO.setDef(cfg, "callBack", QZFL.emptyFn);
        QPHOTO.setDef(cfg, "errBack", QZFL.emptyFn);
        getUserDomain({uin: cfg.uin, errBack: cfg.errBack, callBack: function () {
            cfg.callBack(getUrl({uin: cfg.uin, type: "upload_image", aid: cfg.aid, refer: cfg.refer}))
        }})
    }, getActivexUpUrl: function (cfg) {
        QPHOTO.setDef(cfg, "callBack", QZFL.emptyFn);
        QPHOTO.setDef(cfg, "errBack", QZFL.emptyFn);
        getUserDomain({uin: cfg.uin, errBack: cfg.errBack, callBack: function () {
            cfg.callBack(getUrl({uin: cfg.uin, type: "pic_up_activex", aid: cfg.aid, refer: cfg.refer}))
        }})
    }, getCommonUpUrl: function (cfg) {
        QPHOTO.setDef(cfg, "callBack", QZFL.emptyFn);
        QPHOTO.setDef(cfg, "errBack", QZFL.emptyFn);
        getUserDomain({uin: cfg.uin, errBack: cfg.errBack, callBack: function () {
            cfg.callBack(getUrl({uin: cfg.uin, type: "pic_upload", aid: cfg.aid, refer: cfg.refer}))
        }})
    }, getCommentUrl: function (cfg) {
        QPHOTO.setDef(cfg, "callBack", QZFL.emptyFn);
        QPHOTO.setDef(cfg, "errBack", QZFL.emptyFn);
        getUserDomain({uin: cfg.uin, errBack: cfg.errBack, callBack: function () {
            cfg.callBack(getUrl({uin: cfg.uin, type: "add_cmt", refer: cfg.refer}))
        }})
    }, getCommentListUrl: function (cfg) {
        QPHOTO.setDef(cfg, "callBack", QZFL.emptyFn);
        QPHOTO.setDef(cfg, "errBack", QZFL.emptyFn);
        cfg.callBack("http://app.photo.qq.com/cgi-bin/app/cgi_pcomment_xml");
    }, getPhotoInfoUrl: function (cfg) {
        QPHOTO.setDef(cfg, "callBack", QZFL.emptyFn);
        QPHOTO.setDef(cfg, "errBack", QZFL.emptyFn);
        getUserDomain({uin: cfg.uin, errBack: cfg.errBack, callBack: function () {
            cfg.callBack(getUrl({uin: cfg.uin, type: "yellow_photo_info", refer: cfg.refer}))
        }})
    }}
})();
(function () {
    var Q = QPHOTO;
    QPHOTO.util.dataSender = function (url, data, sucCb, errCb) {
        sucCb = sucCb || QZFL.emptyFn;
        errCb = errCb || QZFL.emptyFn;
        data.output_type = "jsonhtml";
        data.refer = data.refer || "jsapi";
        data.plat = QPHOTO.plat;
        if (QPHOTO.EXTDATA.appid) {
            data.refer = 'qzoneapp';
            data.appid = QPHOTO.EXTDATA.appid
        }
        ;
        if (QPHOTO.inPengyou) {
            QZFL.config.FSHelperPage = QZONE.FP._t.QZFL.config.FSHelperPage;
        }
        var arg = arguments;
        var post = new QZFL.FormSender(url, "post", data, "gb2312");
        post.onSuccess = function (d) {
            if (d.ret == 0) {
                sucCb(d);
            } else {
                if ((d.ret == -906 || d.ret == -907) && QZONE.FP) {
                    QZONE.FP.popupDialog('请输入验证码', {src: '/qzone/verifycode.html?imgcode=15000501&type=' + (d.ret == -906 ? 1 : 0)}, 340, 190);
                    QZONE.FP._t.popupCallback = function (verifycode) {
                        if (!!verifycode) {
                            if (arg[1]) {
                                arg[1].verifycode = verifycode;
                                arg.callee.apply(null, arg);
                                setTimeout(function () {
                                    try {
                                        document.body.focus();
                                    } catch (e) {
                                    }
                                }, 10);
                            }
                        }
                    }
                    return;
                }
                errCb(d);
            }
        }
        post.onError = function (d) {
            errCb({"ret": "-1", "msg": "对不起，网络繁忙，请稍后再试！"});
        }
        post.send();
    };
    function _parseTime(t) {
        var ts = t.split(/\-|\s|\:/);
        for (var i = 0; i < 6; i++) {
            if (typeof(ts[i] = parseInt(ts[i], 10)) != "number") {
                ts[i] = 1;
            }
        }
        var time = new Date(ts[0], ts[1] - 1, ts[2], ts[3], ts[4], ts[5]);
        return Math.round(time.getTime() / 1000);
    }

    function _getCodeMulDelList(d) {
        var list = [];
        for (var i = d.length - 1; i >= 0; --i) {
            list.push([d[i].lloc, d[i].picrefer || "", _parseTime(d[i].uploadtime), d[i].forum].join("|"));
        }
        return list.join("_");
    }

    function _getCodelist(d) {
        var list = [];
        for (var i = d.length - 1; i >= 0; --i) {
            list.push([d[i].lloc, _parseTime(d[i].uploadtime), d[i].forum].join("|"));
        }
        return list.join("_");
    }

    function _getNewCover(coverLloc, allList, checkList) {
        if (Q.util.getIdx(checkList, "lloc", coverLloc) != null || Q.util.getIdx(allList, "lloc", coverLloc) == null) {
            for (var i = 0; i < allList.length; i++) {
                if (Q.util.getIdx(checkList, "lloc", allList[i].lloc) == null) {
                    return allList[i].sloc
                }
            }
        }
        return"";
    }

    function _getList(photos, llocList) {
        var _m = {};
        for (var i = 0, len = llocList.length; i < len; ++i) {
            _m[llocList[i]] = true;
        }
        var ret = [];
        for (var i = 0, len = photos.length; i < len; ++i) {
            if (_m[photos[i].lloc]) {
                ret.push(photos[i]);
            }
        }
        return ret;
    }

    $extend(PhotoLogic, {addAlbum: function (cfg) {
        QPHOTO.setDef(cfg, "callBack", QZFL.emptyFn);
        QPHOTO.setDef(cfg, "errBack", QZFL.emptyFn);
        QPHOTO.domain.get({uin: cfg.uin, sucCb: function () {
            cfg['class'] = cfg['class'] || 101;
            cfg.priv = cfg.priv || 1;
            cfg.desc = cfg.desc || "";
            var data = cfg.extData || {};
            $extend(data, {"uin": cfg.uin, "albumname": cfg.name, "albumdesc": cfg.desc, "albumclass": cfg['class'], "priv": cfg.priv, "refer": cfg.refer, "bitmap": (cfg.bitmap ? cfg.bitmap : cfg.priv == 1 ? "10000000" : "10000001")});
            var url = QPHOTO.url.get({uin: cfg.uin, name: "album_add", refer: cfg.refer});
            QPHOTO.util.dataSender(url, data, cfg.callBack, cfg.errBack);
        }, errCb: cfg.errBack});
    }, delAlbum: function (cfg) {
        QPHOTO.setDef(cfg, "callBack", QZFL.emptyFn);
        QPHOTO.setDef(cfg, "errBack", QZFL.emptyFn);
        $extend(cfg, {callBack: function (d) {
            var idx = QPHOTO.util.getIdx(d.albums, "id", cfg.aid);
            var abm = d.albums[idx];
            var data = cfg.extData || {};
            $extend(data, {"uin": cfg.uin, "albumid": abm.id, "albumname": abm.name, "modifytime": abm.modifytime, "refer": cfg.refer});
            var url = QPHOTO.url.get({uin: cfg.uin, name: "album_del", refer: cfg.refer});
            QPHOTO.util.dataSender(url, data, function (ret) {
                Array.prototype.splice.call(d.albums, idx, 1);
                cfg.callBack.parent(ret);
            }, cfg.errBack);
        }});
        cfg.type = cfg.type || 7;
        PhotoLogic.getAlbumList(cfg);
    }, modAlbum: function (cfg) {
        QPHOTO.setDef(cfg, "callBack", QZFL.emptyFn);
        QPHOTO.setDef(cfg, "errBack", QZFL.emptyFn);
        $extend(cfg, {callBack: function (d) {
            var idx = QPHOTO.util.getIdx(d.albums, "id", cfg.aid);
            var abm = d.albums[idx];
            var data = cfg.extData || {};
            $extend(data, {"uin": cfg.uin, "albumid": abm.id, "refer": cfg.refer});
            var url = QPHOTO.url.get({uin: cfg.uin, name: "album_mod", refer: cfg.refer});
            QPHOTO.util.dataSender(url, data, cfg.callBack.parent, cfg.errBack);
        }});
        cfg.type = cfg.type || 7;
        PhotoLogic.getAlbumList(cfg);
    }, delPhoto: function (cfg) {
        QPHOTO.setDef(cfg, "callBack", QZFL.emptyFn);
        QPHOTO.setDef(cfg, "errBack", QZFL.emptyFn);
        $extend(cfg, {callBack: function (d) {
            var list = _getList(d.photos, cfg.llocList);
            if (list.length < 1) {
                cfg.errBack({ret: -1, msg: "请先选择需要删除的照片。"});
                return;
            }
            var resetcover = 1, newcover = "";
            if (d.photos.length > list.length) {
                resetcover = 0;
                newcover = _getNewCover(d.info.cover_id, d.photos, list);
            }
            var ismultiup = [];
            for (var i = list.length - 1; i >= 0; i--) {
                if (typeof list[i].ismultiup == 'undefined') {
                    ismultiup.push(0);
                } else {
                    ismultiup.push(list[i].ismultiup);
                }
            }
            var data = cfg.extData || {};
            $extend(data, {"uin": cfg.uin, "albumid": cfg.aid, "albumname": d.info.name, "bgid": (d.info.bgid || ""), "tpid": (d.info.tplid || ""), "priv": d.info.priv, "codelist": _getCodeMulDelList(list), "ismultiup": ismultiup.join(""), "resetcover": resetcover, "newcover": newcover, "refer": cfg.refer});
            var url = QPHOTO.url.get({uin: cfg.uin, name: "pic_mul_del", refer: cfg.refer});
            QPHOTO.util.dataSender(url, data, function (ret) {
                for (var i = ret.succ.length - 1; i >= 0; --i) {
                    var idx = Q.util.getIdx(d.photos, "lloc", ret.succ[i].id);
                    Array.prototype.splice.call(d.photos, idx, 1);
                }
                d.info.total = d.photos.length;
                cfg.callBack.parent(ret)
            }, cfg.errBack);
        }});
        PhotoLogic.getPhotoList(cfg);
    }, movePhoto: function (cfg) {
        QPHOTO.setDef(cfg, "callBack", QZFL.emptyFn);
        QPHOTO.setDef(cfg, "errBack", QZFL.emptyFn);
        $extend(cfg, {callBack: function (d) {
            var list = _getList(d.photos, cfg.llocList);
            if (list.length < 1) {
                cfg.errBack({ret: -1, msg: "请先选择需要删除的照片。"});
                return;
            }
            var resetcover = 1, newcover = "";
            if (d.photos.length > list.length) {
                resetcover = 0;
                newcover = _getNewCover(d.info.cover_id, d.photos, list);
            }
            var ismultiup = [];
            for (var i = list.length - 1; i >= 0; i--) {
                if (typeof list[i].ismultiup == 'undefined') {
                    ismultiup.push(0);
                } else {
                    ismultiup.push(list[i].ismultiup);
                }
            }
            var data = cfg.extData || {};
            $extend(data, {"uin": cfg.uin, "old_albumid": cfg.fromAid, "old_albumname": d.info.name, "new_albumid": cfg.toAid, "bgid": (d.info.bgid || ""), "tpid": (d.info.tplid || ""), "priv": d.info.priv, "codelist": _getCodelist(list), "ismultiup": ismultiup.join(""), "resetcover": resetcover, "newcover": newcover, "refer": cfg.refer});
            var url = QPHOTO.url.get({uin: cfg.uin, name: "pic_move", refer: cfg.refer});
            QPHOTO.util.dataSender(url, data, function (ret) {
                for (var i = ret.succ.length - 1; i >= 0; --i) {
                    var idx = Q.util.getIdx(d.photos, "lloc", ret.succ[i].id);
                    Array.prototype.splice.call(d.photos, idx, 1);
                }
                d.info.total = d.photos.length;
                cfg.callBack.parent(ret)
            }, cfg.errBack);
        }});
        cfg.aid = cfg.fromAid;
        PhotoLogic.getPhotoList(cfg);
    }, modPhoto: function (cfg) {
        QPHOTO.setDef(cfg, "callBack", QZFL.emptyFn);
        QPHOTO.setDef(cfg, "errBack", QZFL.emptyFn);
        $extend(cfg, {callBack: function (d) {
            var idx = QPHOTO.util.getIdx(d.photos, "lloc", cfg.lloc);
            var photo = d.photos[idx];
            var data = cfg.extData || {};
            $extend(data, {"uin": cfg.uin, "albumid": cfg.aid, "albumtitle": d.info.name, "albumdesc": d.info.desc, "piccount": d.info.total, "lloc": photo.lloc, "refer": cfg.refer});
            var url = QPHOTO.url.get({uin: cfg.uin, name: "pic_mod", refer: cfg.refer});
            QPHOTO.util.dataSender(url, data, cfg.callBack.parent, cfg.errBack);
        }});
        PhotoLogic.getPhotoList(cfg);
    }, refreshAlbum: function (uin) {
        var xId = uin + "_alist";
        QPHOTO.data.del(xId);
    }, refreshPhoto: function (uin, aid) {
        if (aid == "newphoto") {
            QPHOTO.data.del("new_photo_100");
        } else {
            var xId = uin + "_plist_" + aid;
            QPHOTO.data.del(xId);
        }
    }, refreshNewPhoto: function (uin) {
        QPHOTO.data.del("new_photo_100");
    }});
})()
/*  |xGv00|c6aa03b51d27a98eb6f828f669bb5bfa */