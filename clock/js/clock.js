(function($){
	drawTime();
	function drawTime(){
		var d = new Date(),
			h = d.getHours(),
			m = d.getMinutes(),
			s = d.getSeconds(),
			ms = d.getMilliseconds(),
			tim = h * 3600000 + m * 60000 + s * 1000 + ms;
		var hdeg = tim / 3600000 * 30,
			mdeg = m / 60 * 360,
			sdeg = s / 60 * 360;
		$('span.hour').css('transform', 'rotate('+(hdeg)+'deg)');
		$('span.minute').css('transform', 'rotate('+(mdeg)+'deg)');
		$('span.second').css('transform', 'rotate('+(sdeg)+'deg)');
		run();
	}
	function run(){
		setTimeout(function(){
			drawTime();
		}, 0);
	}
})(jQuery);
