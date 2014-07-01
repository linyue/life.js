/*
*2014年6月30 eric
*/
function bindEvent(ele, type, handler){
	if(window.addEventListener){
		ele.addEventListener(type, handler, false);
	}else if(window.attachEvent){
		ele.attachEvent("on" + type, handler);
	}else{
		ele['on' + type] = handler;
	}
}
function emptyFun(){};
function Xscroller(container, scrollArea, scrollBar, opt){
	this.container = container;
	this.sArea = scrollArea;
	this.sBar = scrollBar;
	var self = this;
	this.ondragstart = opt.ondragstart || emptyFun;
	this.ondragstop = opt.ondragstop || emptyFun;
	function onmousewheel(e){
		e = e || window.event;
		var act = e.wheelDelta ? e.wheelDelta/120 : (0 - e.detail/3);
		this.scrollTop -= act * 32;
		container.style.zoom = 0;
		container.style.zoom = 1;
		self.updateScrollbar();
		e.preventDefault();
		e.stopPropagation();
	}
	bindEvent(container, "mousewheel", onmousewheel);
	bindEvent(container, "DOMMouseScroll", onmousewheel);
	//$(container).bind("mousewheel", function(event){onmousewheel(event)}).bind("DOMMouseScroll", {}, onmousewheel);
	$(container).bind("mouseover", function(){self.updateScrollbar});
	//绑定上下连个箭头的点击事件
	if(opt.moveUp){
		opt.moveUp.bind("click", function(){
			if(container.scrollTop <= 0){
				return;
			}
			container.scrollTop = container.scrollTop - 29
			var topPx = container.scrollTop / (container.scrollHeight - container.clientHeight) * (scrollArea.clientHeight - scrollBar.offsetHeight);
			scrollBar.style.top = topPx + "px";
		});
	}
	if(opt.moveDown){
		opt.moveDown.bind("click", function(){
			container.scrollTop = container.scrollTop + 29
			var topPx = container.scrollTop / (container.scrollHeight - container.clientHeight) * (scrollArea.clientHeight - scrollBar.offsetHeight);
			scrollBar.style.top = topPx + "px";
		});
	}
	scrollBar.ondrag = scrollBar.oncontextmenu = scrollBar.onselectstart = Xscroller.stop;

	var y, t;
	Xscroller.makeDragAble(scrollBar, function(event){
		(opt.ondragstart || emptyFun)();
		y = (event || window.event).clientY;
		t = this.offsetTop;
	}, function(event){
		var _y = event.clientY;
		var sTop = Math.max(0, Math.min(_y - y + t, scrollArea.clientHeight - scrollBar.clientHeight));
		scrollBar.style.top = sTop + "px";
		container.scrollTop = (container.scrollHeight - container.clientHeight) *
				sTop / (scrollArea.clientHeight - scrollBar.offsetHeight); // + 'px';
		container.style.zoom = 0;
		container.style.zoom = 1;
	}, function(event){
		container.style.zoom = 0;
		container.style.zoom = 1;
		(opt.ondragstop||emptyFun)();
	});
	this.updateScrollbar();
}

Xscroller.prototype = $.extend(Xscroller.prototype,{
	updateScrollbar: function() {
		var c = this.container, sArea=this.sArea, sBar=this.sBar;
		if (c.scrollHeight <= c.clientHeight) {
			//不展示滚动条
			sArea.style.display = 'none';
		} else {
			sArea.style.display = '';
			// sBar.style.height = parseInt(Math.max(sArea.clientHeight*c.clientHeight/c.scrollHeight, 50)) + 'px';
			var sTop = (sArea.clientHeight - sBar.clientHeight) * c.scrollTop / (c.scrollHeight - c.clientHeight);
			(!isNaN(sTop)) && (sBar.style.top = sTop + 'px');
		}
	}
});
Xscroller = $.extend(Xscroller, {
	clearSelection : window.getSelection ? function(){
		window.getSelection().removeAllRanges();
	} : function(){
		document.selection.empty();
	},
	stop : function(){
		return false;
	},
	makeDragAble : function(element, onstart, onmove, onstop){
		var onmousemove = function(event){
			onmove.call(element, event || window.event);
		};
		var onmouseup = function(event){
			onstop.call(element, event);
			$(document).unbind('mousemove', onmousemove);
			$(document).unbind('mouseup', arguments.callee);
			element.releaseCapture ? element.releaseCapture() : window.releaseEvents(Event.MOUSEMOVE|Event.MOUSEUP);
			event.preventDefault();
		}
		$(element).bind('mousedown', function(event){
			Xscroller.clearSelection();
			$(document).bind('mousemove', onmousemove);
			$(document).bind('mouseup', onmouseup);
			onstart.call(element, event || window.event);
			element.setCapture ? element.setCapture() : window.captureEvents(Event.MOUSEMOVE|Event.MOUSEUP);
			event.preventDefault();
			event.stopPropagation();
		});
	}
})