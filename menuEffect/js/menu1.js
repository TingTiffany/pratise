(function($){
	var _lst = $('.menu-lst'), top = (_lst.outerHeight() - _lst.height()) / 4;
	var _li = _lst.find('li').eq(0), left = _li.offset().left - 14, width = _li.width();
	$('.menu-lst ul .back').css({
		'top': top,
		'left': left,
		'width': width
	});
	$('.menu-lst ul li').mouseenter(function(){
		var _t = $(this), left = _t.offset().left - 14, width = _t.width();
		var _back = $('.menu-lst ul .back'), bleft = _back.offset().left;
		if(bleft - left != 9){
			if(left > bleft){
				_back.animate({'left': left + 6, 'width': width});
			}else{
				_back.animate({'left': left - 6, 'width': width});
			}
			_back.animate({'left': left});
		}
	});
})(jQuery);
