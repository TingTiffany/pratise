(function($){
	$.fn.extend({
		menuFn: function(){
			var _menu, _mlst, rdata;
			var init = function(){
				_menu = $('.menu'), 
				_mlst = _menu.find('.menu-lst'),
				rdata = getrootData();
				buildRoot();
				bindEvent();
			};
			var getrootData = function(){
				var rdatas = [], i, len;
				for(i=0,len=menu_data.length; i<len; i++){
					if(menu_data[i]['isRoot'] == 1 && menu_data[i]['ulnSite'] == '-1' && menu_data[i]['ulnSiteTyp'] == -1){
						rdatas.push(menu_data[i]);
					}
				}
				return rdatas;
			};
			var buildRoot = function(){
				var _ul = $('<ul></ul>'), _li, i = 0, len = rdata.length;
				for(; i<len; i++){
					_li = $('<li> <div class="content-01"> <a href="javascript:;">'+rdata[i]['nam']+'</a> <i class="arrow-r"></i> </div> </li>');
					if(i >= 14){
						_li.addClass('display-n');
					}
					if(i % 14 == 0){
						_li.attr('page', i/14);
					}
					if(rdata[i]['showSon'] == 1){
						buildSecond(rdata[i]['site'], rdata[i]['siteTyp'], _li);
					}
					_li.appendTo(_ul);
				}
				_mlst.data('page', 0).append(_ul);
			};
			var buildSecond = function(par, parTyp, parli){
				var _div = $('<div class="content-02"></div>'), 
					_ul = $('<ul></ul>'), 
					_li, 
					i = 0, len = menu_data.length;
				for(; i<len; i++){
					if(menu_data[i]['ulnSite'] == par && menu_data[i]['ulnSiteTyp'] == parTyp){
						_li = $('<li class="clear"> <div class="content-02-l"> <a href="javascript:;">'+menu_data[i]['nam']+'</a> </div> </li>');
						if(menu_data[i]['showSon'] == 1){
							_li.append('<div class="content-02-r"><ul class="clear"></ul></div>');
							buildThird(menu_data[i]['site'], menu_data[i]['siteTyp'], _li.find('.content-02-r>ul'));
						}
						_ul.append(_li);
					}
				}
				_div.append(_ul).appendTo(parli);
			};
			var buildThird = function(par, parTyp, parul){
				var _li, i = 0, len = menu_data.length;
				for(; i<len; i++){
					if(menu_data[i]['ulnSite'] == par && menu_data[i]['ulnSiteTyp'] == parTyp){
						_li = $('<li><a href="javascript:;">'+menu_data[i]['nam']+'</a></li>');
						parul.append(_li);
						if(menu_data[i]['showSon'] == 1){
							buildThird(menu_data[i]['site'], menu_data[i]['siteTyp'], parul);
						}
					}
				}
			};
			var bindEvent = function(){
				_menu.off('click', '.menu-btn>b.btn-first').on('click', '.menu-btn>b.btn-first', function(){
					var _li = _mlst.find('>ul>li'),
						page = 0,
						star = _li.filter('[page='+page+']').index()-1,
						end = 14;
					if(_mlst.data('page') != page){
						console.log('in first');
						_li.addClass('display-n');
						_li.filter(':gt('+star+')').filter(':lt('+end+')').removeClass('display-n');
						_mlst.data('page', page);
					}
				}).off('click', '.menu-btn>b.btn-prev').on('click', '.menu-btn>b.btn-prev', function(){
					var _li = _mlst.find('>ul>li'),
						page = _mlst.data('page') - 1,
						star = _li.filter('[page='+page+']').index()-1,
						end = 14;
						console.log('page: '+page+'  star: '+star+'  end: '+end);
					if(_mlst.data('page') != page){
						console.log('in prev');
						_li.addClass('display-n');
						_li.filter(':gt('+star+')').filter(':lt('+end+')').removeClass('display-n');
						_mlst.data('page', page);
					}
				}).off('click', '.menu-btn>b.btn-next').on('click', '.menu-btn>b.btn-next', function(){
					var _li = _mlst.find('>ul>li'),
						page = _mlst.data('page') + 1,
						star = _li.filter('[page='+page+']').index()-1,
						end = 14;
						console.log('page: '+page+'  star: '+star+'  end: '+end);
					if(_mlst.data('page') != page){
						console.log('in next');
						console.log(_li.filter(':gt('+star+')').filter(':lt('+end+')'));
						_li.addClass('display-n');
						_li.filter(':gt('+star+')').filter(':lt('+end+')').removeClass('display-n');
						_mlst.data('page', page);
					}
				}).off('click', '.menu-btn>b.btn-last').on('click', '.menu-btn>b.btn-last', function(){
					var _li = _mlst.find('>ul>li'),
						len = rdata.length,
						page = Math.floor(len/14),
						star = _li.filter('[page='+page+']').index()-1,
						end = 14;
					if(_mlst.data('page') != page){
						console.log('in last');
						_li.addClass('display-n');
						_li.filter(':gt('+star+')').filter(':lt('+end+')').removeClass('display-n');
						_mlst.data('page', page);
					}
				});
			};
			init();
		}
	});
	$(document).menuFn();
})(jQuery);



