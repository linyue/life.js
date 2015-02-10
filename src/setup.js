//引入sea.js，http://seajs.org/docs/#downloads
(function(t,u){function v(b){return function(c){return Object.prototype.toString.call(c)==="[object "+b+"]"}}function Q(){return w++}function I(b,c){var a;a=b.charAt(0);if(R.test(b))a=b;else if("."===a){a=(c?c.match(E)[0]:h.cwd)+b;for(a=a.replace(S,"/");a.match(J);)a=a.replace(J,"/")}else a="/"===a?(a=h.cwd.match(T))?a[0]+b.substring(1):b:h.base+b;return a}function K(b,c){if(!b)return"";var a=b,d=h.alias,a=b=d&&F(d[a])?d[a]:a,d=h.paths,g;if(d&&(g=a.match(U))&&F(d[g[1]]))a=d[g[1]]+g[2];g=a;var e=h.vars;
    e&&-1<g.indexOf("{")&&(g=g.replace(V,function(a,b){return F(e[b])?e[b]:a}));a=g.length-1;d=g.charAt(a);b="#"===d?g.substring(0,a):".js"===g.substring(a-2)||0<g.indexOf("?")||".css"===g.substring(a-3)||"/"===d?g:g+".js";g=I(b,c);var a=h.map,l=g;if(a)for(var d=0,f=a.length;d<f&&!(l=a[d],l=x(l)?l(g)||g:g.replace(l[0],l[1]),l!==g);d++);return l}function L(b,c){var a=b.sheet,d;if(M)a&&(d=!0);else if(a)try{a.cssRules&&(d=!0)}catch(g){"NS_ERROR_DOM_SECURITY_ERR"===g.name&&(d=!0)}setTimeout(function(){d?
    c():L(b,c)},20)}function W(){if(y)return y;if(z&&"interactive"===z.readyState)return z;for(var b=s.getElementsByTagName("script"),c=b.length-1;0<=c;c--){var a=b[c];if("interactive"===a.readyState)return z=a}}function e(b,c){this.uri=b;this.dependencies=c||[];this.exports=null;this.status=0;this._waitings={};this._remain=0}if(!t.seajs){var f=t.seajs={version:"2.1.1"},h=f.data={},X=v("Object"),F=v("String"),A=Array.isArray||v("Array"),x=v("Function"),w=0,p=h.events={};f.on=function(b,c){(p[b]||(p[b]=
    [])).push(c);return f};f.off=function(b,c){if(!b&&!c)return p=h.events={},f;var a=p[b];if(a)if(c)for(var d=a.length-1;0<=d;d--)a[d]===c&&a.splice(d,1);else delete p[b];return f};var m=f.emit=function(b,c){var a=p[b],d;if(a)for(a=a.slice();d=a.shift();)d(c);return f},E=/[^?#]*\//,S=/\/\.\//g,J=/\/[^/]+\/\.\.\//,U=/^([^/:]+)(\/.+)$/,V=/{([^{]+)}/g,R=/^\/\/.|:\//,T=/^.*?\/\/.*?\//,n=document,q=location,B=q.href.match(E)[0],k=n.getElementsByTagName("script"),k=n.getElementById("seajsnode")||k[k.length-
    1],k=((k.hasAttribute?k.src:k.getAttribute("src",4))||B).match(E)[0],s=n.getElementsByTagName("head")[0]||n.documentElement,N=s.getElementsByTagName("base")[0],O=/\.css(?:\?|$)/i,Y=/^(?:loaded|complete|undefined)$/,y,z,M=536>1*navigator.userAgent.replace(/.*AppleWebKit\/(\d+)\..*/,"$1"),Z=/"(?:\\"|[^"])*"|'(?:\\'|[^'])*'|\/\*[\S\s]*?\*\/|\/(?:\\\/|[^\/\r\n])+\/(?=[^\/])|\/\/.*|\.\s*require|(?:^|[^$])\brequire\s*\(\s*(["'])(.+?)\1\s*\)/g,$=/\\\\/g,r=f.cache={},C,G={},H={},D={},j=e.STATUS={FETCHING:1,
    SAVED:2,LOADING:3,LOADED:4,EXECUTING:5,EXECUTED:6};e.prototype.resolve=function(){for(var b=this.dependencies,c=[],a=0,d=b.length;a<d;a++)c[a]=e.resolve(b[a],this.uri);return c};e.prototype.load=function(){if(!(this.status>=j.LOADING)){this.status=j.LOADING;var b=this.resolve();m("load",b);for(var c=this._remain=b.length,a,d=0;d<c;d++)a=e.get(b[d]),a.status<j.LOADED?a._waitings[this.uri]=(a._waitings[this.uri]||0)+1:this._remain--;if(0===this._remain)this.onload();else{for(var g={},d=0;d<c;d++)a=
    r[b[d]],a.status<j.FETCHING?a.fetch(g):a.status===j.SAVED&&a.load();for(var h in g)if(g.hasOwnProperty(h))g[h]()}}};e.prototype.onload=function(){this.status=j.LOADED;this.callback&&this.callback();var b=this._waitings,c,a;for(c in b)if(b.hasOwnProperty(c)&&(a=r[c],a._remain-=b[c],0===a._remain))a.onload();delete this._waitings;delete this._remain};e.prototype.fetch=function(b){function c(){var a=g.requestUri,b=g.onRequest,c=g.charset,d=O.test(a),e=n.createElement(d?"link":"script");if(c&&(c=x(c)?
    c(a):c))e.charset=c;var f=e;d&&(M||!("onload"in f))?setTimeout(function(){L(f,b)},1):f.onload=f.onerror=f.onreadystatechange=function(){Y.test(f.readyState)&&(f.onload=f.onerror=f.onreadystatechange=null,!d&&!h.debug&&s.removeChild(f),f=null,b())};d?(e.rel="stylesheet",e.href=a):(e.async=!0,e.src=a);y=e;N?s.insertBefore(e,N):s.appendChild(e);y=null}function a(){delete G[f];H[f]=!0;C&&(e.save(d,C),C=null);var a,b=D[f];for(delete D[f];a=b.shift();)a.load()}var d=this.uri;this.status=j.FETCHING;var g=
    {uri:d};m("fetch",g);var f=g.requestUri||d;!f||H[f]?this.load():G[f]?D[f].push(this):(G[f]=!0,D[f]=[this],m("request",g={uri:d,requestUri:f,onRequest:a,charset:h.charset}),g.requested||(b?b[g.requestUri]=c:c()))};e.prototype.exec=function(){function b(a){return e.get(b.resolve(a)).exec()}if(this.status>=j.EXECUTING)return this.exports;this.status=j.EXECUTING;var c=this.uri;b.resolve=function(a){return e.resolve(a,c)};b.async=function(a,g){e.use(a,g,c+"_async_"+w++);return b};var a=this.factory,a=
    x(a)?a(b,this.exports={},this):a;a===u&&(a=this.exports);null===a&&!O.test(c)&&m("error",this);delete this.factory;this.exports=a;this.status=j.EXECUTED;m("exec",this);return a};e.resolve=function(b,c){var a={id:b,refUri:c};m("resolve",a);return a.uri||K(a.id,c)};e.define=function(b,c,a){var d=arguments.length;1===d?(a=b,b=u):2===d&&(a=c,A(b)?(c=b,b=u):c=u);if(!A(c)&&x(a)){var g=[];a.toString().replace($,"").replace(Z,function(a,b,c){c&&g.push(c)});c=g}d={id:b,uri:e.resolve(b),deps:c,factory:a};if(!d.uri&&
    n.attachEvent){var f=W();f&&(d.uri=f.src)}m("define",d);d.uri?e.save(d.uri,d):C=d};e.save=function(b,c){var a=e.get(b);a.status<j.SAVED&&(a.id=c.id||b,a.dependencies=c.deps||[],a.factory=c.factory,a.status=j.SAVED)};e.get=function(b,c){return r[b]||(r[b]=new e(b,c))};e.use=function(b,c,a){var d=e.get(a,A(b)?b:[b]);d.callback=function(){for(var a=[],b=d.resolve(),e=0,f=b.length;e<f;e++)a[e]=r[b[e]].exec();c&&c.apply(t,a);delete d.callback};d.load()};e.preload=function(b){var c=h.preload,a=c.length;
    a?e.use(c,function(){c.splice(0,a);e.preload(b)},h.cwd+"_preload_"+w++):b()};f.use=function(b,c){e.preload(function(){e.use(b,c,h.cwd+"_use_"+w++)});return f};e.define.cmd={};t.define=e.define;f.Module=e;h.fetchedList=H;h.cid=Q;f.resolve=K;f.require=function(b){return(r[e.resolve(b)]||{}).exports};h.base=(k.match(/^(.+?\/)(\?\?)?(seajs\/)+/)||["",k])[1];h.dir=k;h.cwd=B;h.charset="utf-8";var B=h,P=[],q=q.search.replace(/(seajs-\w+)(&|$)/g,"$1=1$2"),q=q+(" "+n.cookie);q.replace(/(seajs-\w+)=1/g,function(b,
    c){P.push(c)});B.preload=P;f.config=function(b){for(var c in b){var a=b[c],d=h[c];if(d&&X(d))for(var e in a)d[e]=a[e];else A(d)?a=d.concat(a):"base"===c&&("/"===a.slice(-1)||(a+="/"),a=I(a)),h[c]=a}m("config",b);return f}}})(this);

//seajs配置
seajs.config({
	base : '/',
    vars: {
        versionGlobal: ''
    },
    paths: {
        'src': window.location.protocol + '//dn-life-js.qbox.me' + (window.location.port ? (':' + window.location.port) : '') + '/src',
        'res': window.location.protocol + '//dn-life-js.qbox.me' + (window.location.port ? (':' + window.location.port) : '') + '/res'
    },
	alias: {
        'baseCss': 'res/css/base.css',
        'editorStyle': 'res/css/editor.css',
        'jqueryuicss': 'res/css/jquery-ui.css',

        'Class': 'src/base/class',
        'JSON': 'src/base/json2',
        'Array': 'src/base/array',

        'md5': 'src/utils/md5',
        'base64': 'src/utils/base4',
        'template': 'src/utils/template',
        'type': 'src/utils/type',
        'verify': 'src/utils/verify',
        'url': 'src/utils/url',
        'time': 'src/utils/time',
        'include': 'src/utils/include',
        'clipboard': 'src/utils/clipboard',
        'draggable': 'src/utils/draggable',
        'qrcode': 'src/utils/qrcode',
        'code': 'src/utils/code',
        'device' : 'src/utils/device',
        'monitor': 'src/utils/monitor',

        'page': 'src/ui/page',
        'dialog': 'src/ui/dialog',
        'gallery': 'src/ui/gallery',
        'mobileNav': 'src/ui/mobileNav',
        'mobileUI': 'src/ui/mobileUI',
        'editor': 'src/ui/editor',
        'colorPicker': 'src/ui/colorPicker',
        'datePicker': 'src/ui/datePicker',
        'sidebar': 'src/ui/sidebar',
        'upload': 'src/ui/upload',
        'floatText': 'src/ui/floatText',

        'scratch': 'src/lottery/scratch',
        'roulette': 'src/lottery/roulette',
        'shake': 'src/lottery/shake',

        '$': 'src/plugin/jquery.js',
        'cookie': 'src/plugin/jquery.cookie.js',
        'jqueryui': 'src/plugin/jquery.ui',
        'charts': 'src/plugin/highcharts/highcharts',
        'charts_more': 'src/plugin/highcharts/highcharts-more',

        'report': 'src/monitor/report'      //已废弃，不再更新
	},
    preload: [
        this.$ ? '' : '$'
    ],
    map: [
        [/^(.*\.(?:css|js))(.*)$/i, '$1?_v=20150210001']
    ],
    charset: 'utf-8'
});

var life = {};
life.setConfig = function(options){

    var opt = {
        versionMap: {},
        versionGlobal: '',
        base: ''
    }

    for(var o in opt){
        if(typeof options[o] != 'undefined'){
            opt[o] = options[o];
        }
    }

    var versionMap = opt.versionMap;
    var alias = {};
    var map = [];

    //将所加载文件的文件名加上version
    for(var k in versionMap){
        if(versionMap[k]){
            alias[k] = opt.base + versionMap[k];
        }
    }

    map.push([/^(.*\.(?:css|js))(.*)$/i, '$1?_v=' + opt.versionGlobal]);

    seajs.config({
        alias: alias,
        map: map,
        vars: {
            versionGlobal: opt.versionGlobal
        }
    })
}

life.page = function(options){
    seajs.use("page",function(Page){
        new Page(options);
    })
}

life.dialog = function(options, callback){
    seajs.use("dialog", function(dialog){
        var d = dialog.common(options);
        callback && callback(d);
    })
}

life.alert = function(options, callback){
    seajs.use("dialog", function(dialog){
        var d = dialog.alert(options);
        callback && callback(d);
    })
}

life.confirm = function(options, callback){
    seajs.use("dialog", function(dialog){
        var d = dialog.confirm(options);
        callback && callback(d);
    })
}

life.include = function(url){
    seajs.use("include", function(m){
        m.include(url);
    })
}

life.base64_encode = function(text, callback){
    seajs.use("base64", function(m){
        callback(m.base64_encode(text));
    })
}

life.base64_decode = function(text, callback){
    seajs.use("base64", function(m){
        callback(m.base64_decode(text));
    })
}

life.gallery = function(options){
    seajs.use("gallery", function(Gallery){
        new Gallery(options);
    })
}

life.mobileNav = function(options){
    seajs.use("mobileNav", function(MobileNav){
        new MobileNav(options);
    })
}

life.scratch = function(options){
    seajs.use("scratch", function(Scratch){
        new Scratch(options);
    })
}

life.roulette = function(options){
    seajs.use("roulette", function(Roulette){
        new Roulette(options);
    })
}

life.shake = function(options){
    seajs.use("shake", function(Shake){
        new Shake(options);
    })
}

life.copyText = function(options){
    seajs.use("copyText", function(c){
        c.copyText(options);
    })
}

life.draggable = function(options){
    seajs.use("draggable", function(Draggable){
        new Draggable(options);
    })
}

life.charts = function(options){
    seajs.use("charts", function(Charts){
        new Charts(options);
    })
}

life.time = {};
life.time.string2Date = function(options){
    seajs.use("time", function(time){
        var date = time.string2Date(options.time);
        options.callback(date);
    })
}
life.time.format = function(options){
    seajs.use("time", function(time){
        var format = time.format(options.formatStr, options.date);
        options.callback(format);
    })
}
life.time.countdown = function(options){
    seajs.use("time", function(time){
        time.countdown(options);
    })
}
life.datePicker = function(options){
    seajs.use('datePicker', function(datePicker){
        var picker = datePicker(options);
        options.callback && options.callback(picker);
    })
}

life.editor = function(options){
    seajs.use("editor", function(editor){
        var edit = editor(options);
        options.callback && options.callback(edit);
    })
}

life.colorPicker = function(options){
    seajs.use("colorPicker", function(ColorPicker){
        var colorPicker = new ColorPicker(options);
        options.callback && options.callback(colorPicker);
    })
}

life.sidebar = function(options){
    seajs.use("sidebar", function(Sidebar){
        var sidebar = new Sidebar(options);
        options.callback && options.callback(sidebar);
    })
}

life.upload = {};
life.upload.common = function(options){
    seajs.use("upload", function(upload){
        upload.common(options);
    })
}

life.floatText = function(options){
    seajs.use('floatText', function(FloatText){
        new FloatText(options);
    })
}

life.qrcode = function(options){
    seajs.use('qrcode', function(Qrcode){
        new Qrcode(options);
    })
}