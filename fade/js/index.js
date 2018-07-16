(function($){
	$.fn.innerfade = function(opts){
		return this.each(function(){
			$.innerfade(this, opts);
		});
	};
	
	$.innerfade = function(container, opts){
		var settings = {
			'animatetype': 'slide',
			'speed': 'normal',
			'timeout': 2000,
			'cnt': 0
		};
		if(opts){
			$.extend(settings, opts);
			var ele = $(container).children();
			if(ele.length > 1){
				$.innerfade.move(ele, settings, 0, 1);
			}
		}
	};
	
	$.innerfade.move = function(ele, settings, cur, next){
		setTimeout(function(){
			if(settings.animatetype == 'slide'){
				$(ele).eq(cur).show().slideUp(settings.speed);
				$(ele).eq(next).slideDown(settings.speed);
			}else if(settings.animatetype == 'fade'){
				$(ele).eq(cur).show().fadeOut(settings.speed);
				$(ele).eq(next).fadeIn(settings.speed);
			}
			cur++, next++;
			if(cur == settings.cnt){
				next = 0;
			}else if(cur > settings.cnt){
				cur = 0, next = cur + 1;
			}
			$.innerfade.move(ele, settings, cur, next);
		}, settings.timeout);
	};
})(jQuery);
