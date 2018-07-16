(function($){
	var settings = {
		xzoom: 200,		
		yzoom: 200
	};
	$('.img-spic').hover(function(){
		var _t = $(this), _p = _t.closest('.div-spic');
		var _src = _p.attr('href');
		var _bpic = $('<div class="div-bpic"><img class="img-bpic" src="'+_src+'" /></div>');
		_p.append(_bpic);
		var left = _p.outerWidth(true) + 5;
		_bpic.css('left', left);
	}, function(){
		var _t = $(this), _p = _t.closest('.div-spic');
		_p.find('.div-bpic').remove();
	});
	$('.img-spic').mousemove(function(e){
		var min_left = 0, max_left = $('.img-bpic').width() - settings.xzoom;
		var min_top = 0, max_top = $('.img-bpic').height() - settings.yzoom;
		var mouseX, mouseY, offsetX, offsetY, left, top;
		mouseX = e.pageX, 
		offsetX = $(this).offset().left,
		left = (mouseX - offsetX) * 4 - settings.xzoom/2,
		left = left < min_left ? min_left : left,
		left = left > max_left ? max_left : left;
		mouseY = e.pageY, 
		offsetY = $(this).offset().top,
		top = (mouseY - offsetY) * 4 - settings.yzoom/2,
		top = top < min_top ? min_top : top,
		top = top > max_top ? max_top : top;
		$('.img-bpic').css({
			'left': -left,
			'top': -top
		});
	});
})(jQuery);