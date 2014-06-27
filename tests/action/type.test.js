seajs.use(["type", "$"],function(m,$){

    module( "type(obj) 测试" );

    test('type(obj)', function() {
        var objs = [
            123,
            'abc',
            ['a', 'b', 'c'],
            {},
            new Date(),
            function(){},
            /abc/,
            document.createElement('div'),
            NaN,
            Infinity,
            null,
            undefined
        ];
        var types = [
            'number',
            'string',
            'array',
            'object',
            'date',
            'function',
            'regexp',
            'element',
            'nan',
            'infinity',
            'null',
            'undefined'
        ]
        for(var i in objs){
            equal(m.type(objs[i]),types[i], objs[i] + " 的数据型是 " + m.type(objs[i]) );
        }
        equal(m.type(),'undefined', "不传参数时，获取的参数是undefined！");
    });

})