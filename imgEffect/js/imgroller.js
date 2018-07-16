(function($){
	$.fn.extend({
		imgrollerFn: function(){
			var _roll = $('.imgroller'),
				_imgUl = _roll.find('ul.imgroller-ul'),
				_cirUl = _roll.find('.imgroller-02>ul');
			var clrtim = 0, 
				stdw = 730;
			var init = function(){
				autoPlay();
				bindEvent();
			};
			var autoPlay = function(){
				clrtim = setTimeout(function(){
					var width = _imgUl.outerWidth(),
						left = parseInt(_imgUl.css('left')),
						n = 0;
					left -= stdw;
					if(left > -width){
						_imgUl.css('left', left);
						n = -left / stdw;
					}else{
						_imgUl.css('left', 0);
					}
					_cirUl.find('>li').eq(n).addClass('hover').siblings('li').removeClass('hover');
					autoPlay();
				}, 2000);
			};
			var bindEvent = function(){
				_roll.off('click', '.imgroller-02>ul>li').on('click', '.imgroller-02>ul>li', function(){
					var _li = $(this), 
						idx = _li.index(), 
						left = 0;
					_li.addClass('hover').siblings('li').removeClass('hover');
					left = -(730 * idx);
					_imgUl.css('left', left);
					clearTimeout(clrtim);
					clrtim = setTimeout(function(){
						autoPlay();
					}, 2000);
				}).off('click', '.imgroller-01>b').on('click', '.imgroller-01>b', function(){
					var _b = $(this),
						left = parseInt(_imgUl.css('left')),
						width = _imgUl.outerWidth(),
						n = 0;
					if(_b.hasClass('arrow-l')){
						left = left == 0 ? -4*stdw : left+stdw;
						n = -left / stdw;
					}else if(_b.hasClass('arrow-r')){
						left = left == -4*stdw ? 0 : left-stdw;
						n = -left / stdw;
					}
					_imgUl.css('left', left);
					_cirUl.find('>li').eq(n).addClass('hover').siblings('li').removeClass('hover');
					clearTimeout(clrtim);
					clrtim = setTimeout(function(){
						autoPlay();
					}, 2000);
				}).off('mouseenter', 'ul.imgroller-ul').on('mouseenter', 'ul.imgroller-ul', function(){
					clearTimeout(clrtim);
				}).off('mouseleave', 'ul.imgroller-ul').on('mouseleave', 'ul.imgroller-ul', function(){
					clrtim = setTimeout(function(){
						autoPlay();
					}, 2000);
				});
			};
			init();
		}
	});
	$(document).imgrollerFn();
})(jQuery);
