;(function($){
	var defaultOptions = {
		curTim: '',
		showTim: true,
		view: 'daysView',
		timfmt: 'yyyy/MM/dd hh:mm:ss'
	};
	
	var datetimePicker = function(ele, opts){
		this.ele = $(ele);
		var options = $.extend({}, defaultOptions, opts);
		this.setInitOptions(options);
		this.setTime();
		this.buildHtml();
		this.bindEvent();
	};
	
	datetimePicker.prototype = {
		isDate: function(o){
			return !isNaN(o) && o.toString() !== 'Invalid Date' && {}.toString.call(o) === '[object Date]';
		},
		setInitOptions: function(opts){
			this.showTim = opts.showTim;
			this.view = opts.view;
			this.tabView = opts.view;
			this.timfmt = opts.timfmt;
			if(this.isDate(opts.curTim)){
				this.curTim = opts.curTim;
			}else{
				this.curTim = new Date();
			}
		},
		setTime: function(){
			this.curYear = this.curTim.getFullYear();
			this.curMonth = this.curTim.getMonth();
			this.curDate = this.curTim.getDate();
			this.curHour = this.curTim.getHours();
			this.curMin = this.curTim.getMinutes();
			this.curSec = this.curTim.getSeconds();
		},
		setCurTim: function(){
			this.curTim = new Date(this.curYear, this.curMonth, this.curDate, this.curHour, this.curMin, this.curSec);
			this.setTime();
		},
		buildHtml: function(){
			this.date_cbox = $("<div class='date-box'></div>");
			this.date_top = $("<div class='date-top'><b class='btn-arrowl'>&lt;</b><div class='date-title'><i class='year-month'></i></div><b class='btn-arrowr'>&gt;</b></div>");
			this.date_mid = $("<div class='date-mid'></div>");
			this.date_btm = $("<div class='date-btm'><div class='date-time'><div class='date-hour'><b></b><i>:</i></div><div class='date-min'><b></b><i>:</i></div><div class='date-sec'><b></b></div></div><div class='date-btn'><a class='btn-clr'>清空</a><a class='btn-tdy'>今天</a></div></div>");
			this.time_lst = $("<div class='time-lst'></div>");
			this.date_cbox.append(this.date_top, this.date_mid, this.date_btm, this.time_lst).appendTo($('body')).hide();
			if(!this.showTim){
				this.date_btm.find('.date-time').remove();
				this.time_lst.remove();
			}
			this.buildView();
		},
		buildView: function(){
			switch(this.view){
				case 'daysView': this.buildDaysTable(); break;
				case 'monthView': this.buildMonthTable(); break;
				case 'yearView': this.buildYearTable(); break;
				default: break;
			}
		},
		isLeapYear: function(year){
			return ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0); 
		},
		getDaysInMonth: function(year, month){
			var days = [31, (this.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
			return days[month];
		},
		buildDaysTable: function(){
			var d = new Date(this.ele.text()),
				new_date = new Date(this.curYear, this.curMonth, 1),
				cur_day = new_date.getDay(),
				cur_day = cur_day == 0 ? 7 : cur_day,
				prev_mth = this.curMonth - 1,
				prev_year = this.curYear - 1,
				prev_year = prev_mth == -1 ? prev_year : this.curYear,
				prev_mth = prev_mth == -1 ? 11 : prev_mth,
				next_mth = this.curMonth + 1,
				next_mth = next_mth == 12 ? 0 : next_mth,
				star_day = this.getDaysInMonth(prev_year, prev_mth) - cur_day + 1,
				star_date = new Date(prev_year, prev_mth, star_day),
				star_mth,
				tbl = $('<table class="days-tbl"></table>'),
				tr,
				td;
			this.tabView = 'daysView';
			this.date_top.find('.year-month').text(this.curYear+'年'+(this.curMonth+1)+'月');
			for(var i = 0; i < 7; i++){
				if(i == 0){
					tbl.append('<tr><th>日</th><th>一</th><th>二</th><th>三</th><th>四</th><th>五</th><th>六</th></tr>');
				}else{
					tr = $('<tr></tr>');
					for(var j = 0; j < 7; j++){
						star_mth = star_date.getMonth(),
						start_day = star_date.getDate();
						if(star_mth == prev_mth){
							td = $('<td class="date-prev">'+start_day+'</td>');
						}else if(star_mth == this.curMonth){
							if((this.curMonth == d.getMonth() && start_day == this.curDate) || (this.curMonth != d.getMonth() && start_day == 1)){
								td = $('<td class="date-cur">'+start_day+'</td>');
							}else{
								td = $('<td>'+start_day+'</td>');
							}
						}else if(star_mth == next_mth){
							td = $('<td class="date-next">'+start_day+'</td>');
						}
						td.data('data', new Date(star_date)).appendTo(tr);
						start_day += 1;
						star_date.setDate(start_day);
					}
					tbl.append(tr);
				}
			}
			this.date_mid.empty().append(tbl);
			if(this.showTim){
				this.date_btm.find('.date-time').show().find('.date-hour>b').text(this.curHour).end()
					.find('.date-min>b').text(this.curMin).end()
					.find('.date-sec>b').text(this.curSec);
			}
		},
		buildMonthTable: function(){
			var tbl = $('<table class="mth-tbl"></table>'),
				tr, 
				td,
				k = 0,
				d = new Date(this.ele.text()),
				arr = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
			this.tabView = 'monthView';
			this.date_top.find('i.year-month').text(this.curYear);
			for(var i = 0; i < 4; i++){
				tr = $('<tr></tr>');
				for(var j = 0; j < 3; j++){
					if((d.getFullYear() == this.curYear && k == this.curMonth) || (d.getFullYear() != this.curYear && k == 0)){
						td = $('<td class="date-cur">'+arr[k]+'</td>');
					}else{
						td = $('<td>'+arr[k]+'</td>');
					}
					td.data('data', k).appendTo(tr);
					k++;
				}
				tbl.append(tr);
			}
			this.date_mid.empty().append(tbl);
			this.date_btm.find('>.date-time').hide();
		},
		buildYearTable: function(){
			var star_year = this.curYear - 7,
				tbl = $('<table class="year-tbl"></table>'),
				tr,
				td;
			this.tabView = 'yearView';
			this.date_top.find('i.year-month').text((this.curYear - 7) + '-' + (this.curYear + 7));
			for(var i = 0; i < 5; i++){
				tr = $('<tr></tr>');
				for(var j = 0; j < 3; j++){
					if(star_year == this.curYear){
						td = $('<td class="date-cur">'+star_year+'</td>');
					}else{
						td = $('<td>'+star_year+'</td>');
					}
					td.data('data', star_year).appendTo(tr);
					star_year += 1;
				}
				tbl.append(tr);
			}
			this.date_mid.empty().append(tbl);
		},
		buildTimeTable: function(flag){
			var tbl = $('<table></table>'),
				tr,
				td,
				col = 0,
				txt = '',
				ilen = 0,
				jlen = 0,
				maxn = 0,
				n = 0;
			if(flag == 0){
				col = 5, txt = '小时', ilen = 5, jlen = 5, maxn = 24;
				tbl.addClass('hour-tbl');
			}else{
				col = 10, ilen = 6, jlen = 10, maxn = 60;
				if(flag == 1){
					txt = '分钟';
					tbl.addClass('min-tbl');
				}else{
					txt = '秒数';
					tbl.addClass('sec-tbl');
				}
			}
			tbl.append('<tr><th colspan="'+col+'"><i>'+txt+'</i><b class="btn-close">×</b></th></tr>');
			for(var i = 0; i < ilen; i++){
				tr = $('<tr></tr>');
				for(var j = 0; j < jlen; j++){
					if(n < maxn){
						if(n == this.curHour){
							td = $('<td class="time-cur">'+n+'</td>');
						}else{
							td = $('<td>'+n+'</td>');
						}
						tr.append(td);
						n += 1;
					}
				}
				tbl.append(tr);
			}
			this.time_lst.show().empty().append(tbl);
		},
		bindEvent: function(){
			var that = this;
			this.date_cbox.off('click', '.date-top>b.btn-arrowl').on('click', '.date-top>b.btn-arrowl', function(){
				if(that.tabView == 'daysView'){
					that.curMonth -= 1; 
					that.setCurTim();
					that.buildDaysTable();
				}else if(that.tabView == 'monthView'){
					that.curYear -= 1;
					that.setCurTim();
					that.buildMonthTable();
				}else if(that.tabView == 'yearView'){
					that.curYear -= 15;
					that.setCurTim();
					that.buildYearTable();
				}
			}).off('click', '.date-top>b.btn-arrowr').on('click', '.date-top>b.btn-arrowr', function(){
				if(that.tabView == 'daysView'){
					that.curMonth += 1; 
					that.setCurTim();
					that.buildDaysTable();
				}else if(that.tabView == 'monthView'){
					that.curYear += 1;
					that.setCurTim();
					that.buildMonthTable();
				}else if(that.tabView == 'yearView'){
					that.curYear += 15;
					that.setCurTim();
					that.buildYearTable();
				}
			}).off('click', 'i.year-month').on('click', 'i.year-month', function(){
				if(that.tabView == 'daysView'){
					that.buildMonthTable();
				}else if(that.tabView == 'monthView'){
					that.buildYearTable();
				}
			}).off('click', '.days-tbl tr td').on('click', '.days-tbl tr td', function(){
				var _td = $(this),
					_tbl = _td.closest('table.days-tbl'),
					td_date = _td.data('data');
				that.curYear = td_date.getFullYear(),
				that.curMonth = td_date.getMonth(),
				that.curDate = td_date.getDate();
				that.setCurTim();
				that.ele.text(that.curTim.Format(that.timfmt));
				that.date_cbox.hide();
			}).off('click', '.mth-tbl tr td').on('click', '.mth-tbl tr td', function(){
				var _td = $(this);
				that.curMonth = _td.data('data');
				that.setCurTim();
				if(that.view == 'daysView'){
					that.buildDaysTable();
				}else{
					that.ele.text(that.curTim.Format(that.timfmt));
					that.date_cbox.hide();
				}
			}).off('click', '.year-tbl tr td').on('click', '.year-tbl tr td', function(){
				var _td = $(this);
				that.curYear = _td.data('data');
				that.setCurTim();
				if(that.view != 'yearView'){
					that.buildMonthTable();
				}else{
					that.ele.text(that.curTim.Format(that.timfmt));
					that.date_cbox.hide();
				}
			}).off('click', '.date-time b').on('click', '.date-time b', function(){
				var _b = $(this)
					_par = _b.closest('div');
				if(_par.hasClass('date-hour')){
					that.buildTimeTable(0);
				}else if(_par.hasClass('date-min')){
					that.buildTimeTable(1);
				}else if(_par.hasClass('date-sec')){
					that.buildTimeTable(2);
				}
			}).off('click', '.time-lst tr td').on('click', '.time-lst tr td', function(){
				var _td = $(this),
					tbl = _td.closest('table'),
					time_lst = _td.closest('.time-lst'),
					date_btm = time_lst.prev('.date-btm'),
					_b,
					txt = _td.text();
				if(tbl.hasClass('hour-tbl')){
					_b = date_btm.find('.date-hour>b');
					that.curHour = txt;
				}else if(tbl.hasClass('min-tbl')){
					_b = date_btm.find('.date-min>b');
					that.curMin = txt;
				}else if(tbl.hasClass('sec-tbl')){
					_b = date_btm.find('.date-sec>b');
					that.curSec = txt;
				}
				that.setCurTim();
				_b.text(txt);
				time_lst.hide();
			}).off('click', '.time-lst .btn-close').on('click', '.time-lst .btn-close', function(){
				var time_lst = $(this).closest('.time-lst');
				time_lst.hide();
			}).off('click', 'a.btn-clr, a.btn-tdy').on('click', 'a.btn-clr, a.btn-tdy', function(){
				var tim = new Date();
				that.ele.text(tim.Format(that.timfmt));
				that.curTim = tim;
				that.setTime();
				that.buildView();
			}).off('open').on('open', function(ele){
				var tim = new Date(that.ele.text());
				if(that.isDate(that.curTim)){
					that.curTim = tim;
				}else{
					that.curTim = new Date();
				}
				that.setTime();
				that.buildView();
			});
			
			that.ele.off('click').on('click', function(){
				that.date_cbox.trigger('open');
				that.date_cbox.css({
					'top': that.ele.outerHeight(),
					'left': that.ele.offset().left
				}).show();
			});
			
			$(document).on('mousedown', function(e){
				e = e || window.event;
				if($(e.target).closest('.date-box').length == 0){
					that.date_cbox.hide();
				}
			});
		}
	};
	
	$.fn.calendar = function(options, param){
		if(typeof options == 'string'){
			return $.fn.calendar.methods[options](this, param);
		}
		options = options || {};
		new datetimePicker(this, options);
	};
	
	Date.prototype.Format = function (fmt) {  
	    var o = {
	        "M+": this.getMonth() + 1, //月份 
	        "d+": this.getDate(), //日 
	        "h+": this.getHours(), //小时 
	        "m+": this.getMinutes(), //分 
	        "s+": this.getSeconds(), //秒 
	        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
	        "S": this.getMilliseconds() //毫秒 
	    };
	    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	    for (var k in o)
	    	if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	    return fmt;
	};
})(jQuery);
