define(function(require, exports, module) {

    /**
     * 获取某个变量的数据类型
     *
     * @param object obj 要获取类型的变量
     * @return string value
     * @author adam[linyue@live.cn]
     * @time 2013-11-17
     */

    "use strict";

    var type = function (obj) {
 
        //判断null
        if (obj === null) {
            return 'null';
        }
     
        //判断 DOM elements
        if (obj && (obj.nodeType === 1 || obj.nodeType === 9)) {
            return 'element';
        }
     
        var s = Object.prototype.toString.call(obj);
        var type = s.match(/\[object (.*?)\]/)[1].toLowerCase();
     
        //判断 NaN 和 Infinity
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


    exports.getName = type;

    var types = ['Null',
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
    ];
    for(var i = 0; i < types.length; i++){
        exports['is' + types[i]] = function (o) {
            return type(o) === t.toLowerCase();
        };
    };
});

