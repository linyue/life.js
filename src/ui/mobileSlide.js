(function () {
    mobileSlide = function () {},

    mobileSlide.prototype = {
        init: function (e) {
            typeof e == "undefined" && (e = {}),
            this.Touch = e.id ? "#" + e.id : "#slide_Touch",
            this._fnWrap(),
            this.content = $(this.Touch).parents(".mobileSlide_content"), this.isNav = e.isNav || !0, this.isNav && this._includeNav(), this.Pagesize = 1, this.Width = this._fnWidth(), this._fnSetWidth(), this._fnSetHeight(), this.isAuto = e.isAuto || !1, this.timer = null, this.num = 0, this.isAuto && (this.offSet = e.offSet || 1e4), this._fnStart(), this._fnIsAuto(), this._fnTouch(this.Touch.split("#")[1])
        },
        _fnWrap: function () {
            $(this.Touch).wrap("<div class='mobileSlide_content'><div class='mobileSlide_content_wrap'></div></div>")
        },
        _includeNav: function () {
            this.content.append("<a class='mobileSlide_content_preview'></a><a class='mobileSlide_content_next'></a>"), this._fnLength() > 1 && this.content.find(".mobileSlide_content_next").fadeIn()
        },
        _fnLength: function () {
            return $(this.Touch).find("li").length
        },
        _fnWidth: function () {
            return $(this.Touch).parents("div").width()
        },
        _fnSetWidth: function () {
            $(this.Touch).find("li").width(this.Width)
        }, _fnMoveWidth: function () {
            return this.Pagesize * this.Width
        }, _fnSetHeight: function () {
            var e = 0, t = this.content, n = this.Width;
            $(this.Touch).find("img").each(function () {
                imgReady($(this).attr("src"), function () {
                    var r = n * this.height / this.width;
                    r > e && (e = r), t.height(e)
                })
            })
        }, _fnStart: function () {
            var e = this, t = $(e.Touch), n = e._fnMoveWidth();
            $preview = this.content.find(".mobileSlide_content_preview"), $next = this.content.find(".mobileSlide_content_next"), t.css({left: 0, width: this._fnLength() * this.Width}), t.bind("mouseover touchstart", function () {
                clearTimeout(e.timer), e.timer = null
            }), t.bind("mouseout touchend", function () {
                e._fnIsAuto()
            }), $preview.click(function () {
                return e.num != 0 && (e.num = e.num - 1, e._fnAnimate(t, e.num)), !1
            }), $next.click(function () {
                return e.num != e._fnLength() - 1 && (e.num = e.num + 1, e._fnAnimate(t, e.num)), !1
            })
        }, _fnAnimate: function (e, t) {
            var n = -(t * this._fnMoveWidth());
            e.stop(!0, !1).animate({left: n}, 150), this.isNav && (t == 0 ? (this.content.find(".mobileSlide_content_preview").fadeOut(), this.content.find(".mobileSlide_content_next").fadeIn()) : t == this._fnLength() - 1 ? (this.content.find(".mobileSlide_content_preview").fadeIn(), this.content.find(".mobileSlide_content_next").fadeOut()) : (this.content.find(".mobileSlide_content_preview").fadeIn(), this.content.find(".mobileSlide_content_next").fadeIn()))
        }, _fnIsAuto: function () {
            var e = this;
            if (typeof e.offSet == "undefined")return!1;
            e.timer || (e.timer = window.setTimeout(function () {
                e._fnAuto()
            }, e.offSet))
        }, _fnAuto: function () {
            var e = this;
            e.num += 1, e.num == e._fnLength() && (e.num = 0), e.num < e._fnLength() && e._fnAnimate($(e.Touch), e.num), clearTimeout(e.timer), e.timer = window.setTimeout(function () {
                e._fnAuto()
            }, e.offSet)
        }, _fnTouch: function (e) {
            var t = this, n = document.getElementById(e);
            t._StartX = 0, t._StratY = 0, t._MoveX = 0, t._MoveY = 0, t._temp = 0, n.addEventListener("touchstart", function (e) {
                t._fnTouchStart(e)
            }, !1), n.addEventListener("touchmove", function (e) {
                t._fnTouchMove(e)
            }, !1), n.addEventListener("touchend", function (e) {
                t._fnTouchEnd(e)
            }, !1)
        }, _fnTouchX: function (e) {
            var t = e.changedTouches, n = 0, r = t.length, i, s;
            for (; n < r; n++)i = t[n], s = i.pageX;
            return s
        }, _fnTouchY: function (e) {
            var t = e.changedTouches, n = 0, r = t.length, i, s;
            for (; n < r; n++)i = t[n], s = i.pageY;
            return s
        }, _fnTouchStart: function (e) {
            alert(1111,e)
            var t = this;
            t._StartX = t._fnTouchX(e), t._StartY = t._fnTouchY(e), t._temp = $(t.Touch).position().left
        }, _fnTouchMove: function (e) {
            var t = this;
            t._MoveX = t._fnTouchX(e) - t._StartX, t._MoveY = t._fnTouchY(e) - t._StartY;
            if (Math.abs(t._MoveY) < Math.abs(t._MoveX)) {
                e.preventDefault();
                var n = t._temp + t._MoveX;
                $(t.Touch).css({left: n + "px"})
            }
        }, _fnTouchEnd: function (e) {
            var t = this;
            t._MoveX = t._fnTouchX(e) - t._StartX, t._MoveY = t._fnTouchY(e) - t._StartY, Math.abs(t._MoveY) < Math.abs(t._MoveX) && (e.preventDefault(), t._MoveX > 0 ? (t.num--, t.num >= 0 ? t._fnAnimate($(t.Touch), t.num) : (this._fnAnimate($(t.Touch), 0), t.num = 0)) : (t.num++, t.num < t._fnLength() && t.num >= 0 ? t._fnAnimate($(t.Touch), t.num) : (t.num = t._fnLength() - 1, this._fnAnimate($(t.Touch), t.num))))
    }}
})(window);