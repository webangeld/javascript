/*
* 作用：数据懒加载
* 时间：2015-08-26
* 说明：使用时，请先引入query库。
* 来源：http://www.html580.com/11542
*/
(function ($, window, undefined) {
    $.fn.DataLazyLoad = function (options) {
        var elements = $(this);
        var settings = {
            //Data Load Offset
            offset: 1,
            //Load data callback
            load: function () { },
            //Which page to load
            page: 2
        }
        if (options) {
            $.extend(settings, options);
        }
        //The height of the browser window 浏览器窗口的高
        var winHeight = $(window).height();
        var locked = false;
        $(window).scroll(function () {
            var scrollTop = $(window).scrollTop();
            //elements height + elements top - (scrollbar top + browser window height)
            var offset = $(elements).offset().top + $(elements).height() - (scrollTop + winHeight);
            if (offset < settings.offset && !locked) {
                locked = true;
                settings.load(settings.page, function () {
                    locked = false;
                });
            }
        });
    }
	
	$.fn.lazyLoad = function(options)
	{
		var elements = $(this), options = options || {};
		var settings = {
			offset:1,
			load:function(){},
			page:2
		}
		settings = $.extend({}, settings, options);
		//视窗的高度
		var winHeight = $(window).height();
		var locked	  = false;
		var unLock    = function (nextPage){
			if(nextPage > 0)
			{
				settings.page = nextPage;
				locked		  = false; 
			}
		}
		$(window).scroll(function(){
			var scrollTop = $(this).scrollTop();
			//假设元素高度比winHeight要高
			var offset = elements.offset().top + elements.height() - (scrollTop + winHeight);
			
			if(offset < settings.offset && !locked)
			{
				locked = true;
				//这个回调做得不错，可以实时回调
				settings.load(settings.page, unLock);
			}
		});
	}
	
    $.fn.DataLazyLoad = function (options) {
        var elements = $(this);
        var settings = {
            //Data Load Offset
            offset: 1,
            //Load data callback
            load: function () { },
            //Which page to load
            page: 2
        }
        if (options) {
            $.extend(settings, options);
        }
        //The height of the browser window
        var winHeight = $(window).height();
        var locked = false;
        var unLock = function (nextPage) {
            //Next load page, 0 is end
            if (nextPage > 0) {
                settings.page = nextPage;
                locked = false;
            }
        }
        $(window).scroll(function () {
            var scrollTop = $(window).scrollTop();
            //elements height + elements top - (scrollbar top + browser window height)
            var offset = $(elements).offset().top + $(elements).height() - (scrollTop + winHeight);
            if (offset < settings.offset && !locked) {
                locked = true;
                settings.load(settings.page, unLock);
            }
        });
    }
})(jQuery, window);