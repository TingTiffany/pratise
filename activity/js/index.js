(function($){
	$.fn.extend({
		activityFn: function(){
			var init = function(){
				//公告滚动效果
				clearInterval(tim);
				var li_lst = $('.whole ul.lst-notice>li'),
					i = 0,
					len = li_lst.length;
				var tim = setInterval(function(){
					li_lst.eq(i).slideToggle();
					i += 1;
					i = i >= len ? 0 : i;
				}, 1000);
				bindEvent();
			};
			var bindEvent = function(){
				//转盘转动效果   
				$('.circle').off('click', 'img.circle-02').on('click', 'img.circle-02', function(){
					var _t = $(this), 
						arr = [27, 75, 118, 158, 198, 238, 282, 332],
						num = parseInt(Math.random()*8),
						deg = arr[num],
						str = 'rotate(' + deg + 'deg)',
						txt = '';
					if(deg == arr[0]){
						txt = '恭喜您获得nubia摄影三脚架';
					}else if(deg == arr[1]){
						txt = '很遗憾，再接再励';
					}else if(deg == arr[2]){
						txt = '恭喜您获得nubia Z11 旗舰机';
					}else if(deg == arr[3]){
						txt = '恭喜您获得100元京东卡';
					}else if(deg == arr[4]){
						txt = '恭喜您获得50元京东卡';
					}else if(deg == arr[5]){
						txt = '恭喜您获得豪华游戏公仔';
					}else if(deg == arr[6]){
						txt = '恭喜您获得森海塞尔耳机';
					}else if(deg == arr[7]){
						txt = '恭喜您获得nubia Z11 miniS';
					}
					_t.addClass('run').css({
						'-webkit-transform': str,
						'-moz-transform': str,
						'-ms-transform': str,
						'-o-transform': str,
						'transform': str
					});
					setTimeout(function(){
						$('.pop-dim').show();
						$('.pop-info').text(txt).show();
					}, 3000);
				});
				
				//活动规则的展开收缩效果
				$('.whole').off('click', '.title>i').on('click', '.title>i', function(){		
					var _i = $(this);
					if(_i.hasClass('btn-arrowd')){
						_i.removeClass('btn-arrowd').addClass('btn-arrowu');
						_i.parent().next().slideUp();
					}else if(_i.hasClass('btn-arrowu')){
						_i.removeClass('btn-arrowu').addClass('btn-arrowd');
						_i.parent().next().slideDown();
					}
				});
				
				//mousedown
				$(document).off('mousedown').on('mousedown', function(e){
					e = e || window.event;
					var src = e.target || e.srcElement;
					if($(src).closest('.pop-info').length == 0){
						$('.pop-dim').hide();
						$('.pop-info').text('').hide();
						$('.run').removeClass('run');
					}
				});
			};
			init();
		}
	});
	$(document).activityFn();
})(jQuery);
