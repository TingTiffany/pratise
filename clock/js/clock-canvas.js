(function($){
	$.fn.extend({
		clockFn: function(){
			var c, ctx, w, h, x, y, r, h_len, m_len, s_len;
			var init = function(){
				c = document.getElementById('clock'),
			 	ctx = c.getContext('2d'),
			 	w = c.width,
			 	h = c.height,
			 	x = 1/2*w, 
			 	y = 1/2*h, 
			 	r = 100,
			 	h_len = 70,
			 	m_len = 80,
			 	s_len = 95;
			 	drawClock();
			};
			var drawClock = function(){
				var d = new Date(),
					h = d.getHours(),
					m = d.getMinutes(),
					s = d.getSeconds(),
					ms = d.getMilliseconds(),
					tim = h * 3600000 + m * 60000 + s * 1000 + ms;
				drawCircle();
				drawScale();
				drawHour(tim);
				drawMinute(m);
				drawSecond(s);
				run();
			};
			var drawCircle = function(){
				ctx.beginPath();
				ctx.strokeStyle = "lightseagreen";
				ctx.arc(x, y, r, 0, 2*Math.PI);
				ctx.stroke();
				ctx.closePath();
				
				ctx.beginPath();
				ctx.arc(x, y, 5, 0, 2*Math.PI);
				ctx.fillStyle = "#666666";
				ctx.fill();
				ctx.closePath();
				
				ctx.translate(x, y);
			};
			var drawScale = function(){
				var h = 0, deg = 0;
				ctx.beginPath();
				for(var i=0; i<60; i++){
					h = i%5 == 0 ? 10 : 5; 
					deg = (i*6)*Math.PI/180;
					ctx.moveTo(r*Math.sin(deg), r*Math.cos(deg));
					ctx.lineTo((r-h)*Math.sin(deg), (r-h)*Math.cos(deg));
					ctx.strokeStyle = "lightseagreen";
					ctx.stroke();
				}
			};
			var drawHour = function(tim){
				var hdeg = (180 - tim/3600000*30)*Math.PI/180;
				ctx.beginPath();
				ctx.moveTo(0, 0);
				ctx.lineTo(h_len*Math.sin(hdeg), h_len*Math.cos(hdeg));
				ctx.strokeStyle = "lightsalmon";
				ctx.stroke();
				ctx.closePath();
			};
			var drawMinute = function(m){
				var mdeg = (180 - m / 60 * 360)*Math.PI/180;
				ctx.beginPath();
				ctx.moveTo(0, 0);
				ctx.lineTo(m_len*Math.sin(mdeg), m_len*Math.cos(mdeg));
				ctx.strokeStyle = "lightsalmon";
				ctx.stroke();
				ctx.closePath();
			};
			var drawSecond = function(s){
				var sdeg = (180 - s / 60 * 360)*Math.PI/180;
				ctx.beginPath();
				ctx.moveTo(0, 0);
				ctx.lineTo(s_len*Math.sin(sdeg), s_len*Math.cos(sdeg));
				ctx.strokeStyle = "lightsalmon";
				ctx.stroke();
				ctx.closePath();
			};
			var run = function(){
				setTimeout(function(){
					ctx.translate(-x, -y);
					ctx.clearRect(0, 0, w, h);
					drawClock();			
				}, 0);
			};
			init();
		}
	});
	$(document).clockFn();
})(jQuery);


