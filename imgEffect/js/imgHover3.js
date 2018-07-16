(function($){
	$('.img-lst ul li').hover(function(){
		var _t = $(this);
		_t.animate({'width':'38%'}, 'slow');
		_t.siblings('li').animate({'width':'20%'}, 'slow');
	}, function(){
		var _t = $(this), _p = _t.closest('ul');
		_p.find('li').animate({'width':'24.5%'}, 'slow');
	});
	var _li = $('.img1');
})(jQuery);
