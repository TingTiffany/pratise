(function($){
	$('.showPic').off('click').on('click', function(){
		$('.mask').show();
		var _con = $('<div class="box-content"></div>');
		$('.mask-box').append(_con).show();
		setTimeout(function(){
			_con.append('<img src="img/mm10.jpg" width="640" height="466"/>');
			var left = $('img').width(), top = $('img').height();
			$('.mask-box').css({
				'margin-top': -top/2,
				'margin-left': -left/2,
				'background-image': 'none'
			});
		}, 300);
	});
	$('.autoHide').off('click').on('click', function(){
		$('.mask').fadeIn();
		var _con = $('<div class="box-content">该浮层将在3秒后消失</div>');
		$('.mask-box').append(_con).css('background-image', 'none').fadeIn('slow');
		setTimeout(function(){
			$('.mask-box').empty().removeAttr('style').fadeOut();
			$('.mask').fadeOut('slow');
		}, 3000);
	});
	$(document).mousedown(function(e){
		var _t = $(e.target);
		if(_t.closest('.mask-box').length == 0){
			$('.mask').hide();
			$('.mask-box').empty().removeAttr('style').hide();
		}
	});
})(jQuery);
