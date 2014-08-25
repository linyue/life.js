define(function (require, exports, module) {
    /**
     *
     *
     * @author linyue
     * @time 14-6-30
     */


    "use strict";

    var $ = require('$');
    var Class = require('Class');
    var spectrum = require('src/plugin/spectrum/spectrum');

    require('src/plugin/spectrum/spectrum.css');
    require('res/css/colorPicker.css');

    var ColorPicker = Class.extend({
        options:{
            query: '',
            initData: '',
            exClass: '',
            skin: 'blue',               //主题颜色，可设置项有：grey、red、blue、green、orange、purple
            isFlat: false,
            isShowPalette: true,
            isShowPicker: true,
            onChange: function(color){},
            onMove: function(color){}
        },

        colorNode: null,

        spectrumOptions: {
            containerClassName: 'i_colorPicker_container',
            replacerClassName: 'i_colorPicker',
            showAlpha: true,
            showInitial: true,
            showButtons: true,
            chooseText: "确定",
            cancelText: "取消",
            palette: [
                ["#000000", "#434343", "#666666", "#999999", "#b7b7b7", "#cccccc", "#d9d9d9", "#efefef", "#f3f3f3", "#ffffff"],
                ["#980000", "#ff0000", "#ff9900", "#ffff00", "#00ff00", "#00ffff", "#4a86e8", "#0000ff", "#9900ff", "#ff00ff"],
                ["#e6b8af", "#f4cccc", "#fce5cd", "#fff2cc", "#d9ead3", "#d9ead3", "#c9daf8", "#cfe2f3", "#d9d2e9", "#ead1dc"],
                ["#dd7e6b", "#ea9999", "#f9cb9c", "#ffe599", "#b6d7a8", "#a2c4c9", "#a4c2f4", "#9fc5e8", "#b4a7d6", "#d5a6bd"],
                ["#cc4125", "#e06666", "#f6b26b", "#ffd966", "#93c47d", "#76a5af", "#6d9eeb", "#6fa8dc", "#8e7cc3", "#c27ba0"],
                ["#a61c00", "#cc0000", "#e69138", "#f1c232", "#6aa84f", "#45818e", "#3c78d8", "#3d85c6", "#674ea7", "#a64d79"],
                ["#85200c", "#990000", "#b45f06", "#bf9000", "#38761d", "#134f5c", "#1155cc", "#0b5394", "#351c75", "#741b47"],
                ["#5b0f00", "#660000", "#783f04", "#7f6000", "#274e13", "#0c343d", "#1c4587", "#073763", "#20124d", "#4c1130"]
            ]
        },

        init: function(options){
            this.options = $.extend({}, this.options, options);

            this.checkOptions();

            this.colorNode = $(options.query);

            this.setStyle();

            this.render();
        },

        checkOptions: function(){

        },

        setStyle: function(){

            //设置主题颜色
            this.spectrumOptions.containerClassName += ' i_' + this.options.skin;
            this.spectrumOptions.replacerClassName += ' i_' + this.options.skin;

            //设置扩展类
            if (this.options.exClass) {
                this.spectrumOptions.containerClassName += ' ' + this.options.exClass;
                this.spectrumOptions.replacerClassName += ' ' + this.options.exClass;
            }

        },

        getValue: function(){
            var color = this.colorNode.spectrum("get");
            return {
                hexColor: color.toHexString(),
                rgbColor: color.toRgbString()
            }
        },

        setValue: function(colorString){
            this.colorNode.spectrum("set", colorString);
        },

        render: function(){
            var self = this;
            var options = self.options;

            var opt = {
                color: options.initData,
                flat: options.isFlat,
                showPalette: options.isShowPalette,
                showPaletteOnly: !options.isShowPicker,
                change: function(color) {
                    var hexColor = color.toHexString();
                    var rgbColor = color.toRgbString();
                    var colorObj = {
                        hexColor: hexColor,
                        rgbColor: rgbColor
                    }
                    options.onChange && options.onChange(colorObj, color);
                },
                move: function(color){
                    var hexColor = color.toHexString();
                    var rgbColor = color.toRgbString();
                    var colorObj = {
                        hexColor: hexColor,
                        rgbColor: rgbColor
                    }
                    options.onMove && options.onMove(colorObj, color);
                }
            }
            opt = $.extend({}, self.spectrumOptions, opt);

            self.colorNode.spectrum(opt);
        }
    })

    module.exports = ColorPicker;
});