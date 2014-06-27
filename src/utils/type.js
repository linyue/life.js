define(function(require, exports, module) {

    /**
     * 获取某个变量的数据类型
     *
     * @param object obj 要获取类型的变量
     * @return string value
     * @author elianlin@tencent.com
     * @time 2013-11-17
     */

    "use strict";

    var type = function (obj) {
 
        // handle null in old IE
        if (obj === null) {
            return 'null';
        }
     
        // handle DOM elements
        if (obj && (obj.nodeType === 1 || obj.nodeType === 9)) {
            return 'element';
        }
     
        var s = Object.prototype.toString.call(obj);
        var type = s.match(/\[object (.*?)\]/)[1].toLowerCase();
     
        // handle NaN and Infinity
        if (type === 'number') {
            if (isNaN(obj)) {
                return 'nan';
            }
            if (!isFinite(obj)) {
                return 'infinity';
            }
        }
     
        return type;
    }


    exports.type = type;

    ['Null',
     'Undefined',
     'Object',
     'Array',
     'String',
     'Number',
     'Boolean',
     'Function',
     'RegExp',
     'Element',
     'NaN',
     'Infinite'
    ].forEach(function (t) {
        exports['is' + t] = function (o) {
            return type(o) === t.toLowerCase();
        };
    });

});

