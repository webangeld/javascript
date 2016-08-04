/**
*
*	通用左右滚动<还有点小问题>
*	支持定时自动轮播、前后轮播、单独点击轮播
*
**/
;(function($){
	var options,methods,timeInterval;
	$.fn.scroll = function(option){
		var settings = {
				buttons:'b',
				className:'down',
				duration:'slow',
				target:'li',//滚动内容目标
				prev:'prev',//上一步
				next:'next',//下一步
				autoScroll:true//自动滚动
			},$this = $(this);
		options = $.extend({}, settings, option);
		//支持多个实例
		$this.each(function(){
			//绑定
			methods.bind.call(this);
			//初始化
			methods.init.call(this);
		});
	};

	//存放要运动的参数，格式prev:{},next:{}
	//var scroll.animate = {};
	//滚动函数集
	var methods = {
		init:function(){
			var _this = $(this);
			//初始化
			_this.find(options.target).removeAttr('style').eq(_this.find('.'+options.className).index()).css({'left':'0px'});
			_this.data('num', _this.find(options.target).length);
			methods.start.call(_this);
			!options.autoScroll || methods.autoScroll.call(_this);
		},
		animate:function(){
			var _this = $(this),p = _this.data('params'),num = _this.data('num');
			
			if(_this.data('isAnimate'))
			{
				return '';
			}
			_this.data('isAnimate', true);
			if(p.prev < 0)
			{
				p.prev = num - 1;
			}
			
			else if(p.prev >= num)
			{
				p.prev = 0;
			}

			if(p.next >= num)
			{
				p.next = 0;

			}
			console.log(p);
			var liObj = _this.find(options.target),_width = _this.width();
			//点右边
			if(p.direction == 'right')
			{	//这一步要注意，
				liObj.eq(p.next).css({'left':-_width+'px'});
			}
			
			liObj.eq(p.prev).animate({'left': p.direction == 'right' ? _width+'px' : '-'+_width+'px'}, options.duration, function(){
			//liObj.eq(p.prev).animate({'left': p.direction == 'right' ? '' : '-'+_width+'px'}, options.duration, function(){
				//去掉样式
				liObj.removeAttr('style');
				//加当前选择的数据
				_this.find(options.buttons).removeClass(options.className).eq(p.next).addClass(options.className);
			})
			
			liObj.eq(p.next).animate({'left':'0px'}, options.duration);
			_this.data('isAnimate', false);
		},
		//绑定事件
		bind:function(){
			var _this = $(this),_parent = _this;
			//下边按钮事件
			_parent.find(options.buttons).click(function(){
				var $this = $(this),_prevIndex = _parent.find('.'+options.className).index(),cur = $this.index();
				if(_prevIndex == cur)
				{
					return true;
				}
				_this.data('params', {
					prev:_prevIndex,
					next:cur,
					direction:cur - _prevIndex > 0 ? 'right' : 'left'
				});
				
				methods.animate.call(_this);
			});
			//左右事件
			_parent.find('.'+options.prev+","+'.'+options.next).click(function(){
				var _prevIndex = _this.find('.'+options.className).index();
				
				if($(this).hasClass(options.next))
				{
					_this.data('params', {
						prev:_prevIndex,
						next:_prevIndex + 1,
						direction:'right'
					});
				}
				else
				{
					_this.data('params', {
						prev:_prevIndex,
						next:_prevIndex - 1,
						direction:'left'
					});
				}
				methods.animate.call(_this);
			});
		},
		start:function(){
			var _this = $(this);
			//移进移出事件
			_this.hover(function(){
				clearInterval(timeInterval);
			},function(){

				methods.autoScroll.call(_this);
			})
		},
		autoScroll:function(){
			var _this = $(this);
			if(!options.autoScroll)
			{
				return ;
			}
			//自动滚动
			timeInterval = setInterval(function(){
				var index = _this.find('.'+options.className).index();
				_this.data('params', {
					prev:index,
					next:index+1,
					direction:'right'
				})
				methods.animate.call(_this);
			}, 4000)
		},
		
	};
})(jQuery)