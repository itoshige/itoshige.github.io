var lstorage = (function() {
	var st = window.localStorage;
	return {
		isUndefined : function(key) {
			return !st.getItem(key);
		},
		set : function(key, value) {
			st.setItem(key, value);
		},
		get : function(key) {
			return st.getItem(key);
		},
		clear : function() {
			st.clear();
		}
	};
}());

var page = (function() {
	return {
		checkRedirect : function() {
			var filename = location.href.match(".+/(.+?)\.[a-z]+([\?#;].*)?$")[1];

			if(filename != 'login' && lstorage.isUndefined('name')) {
				lstorage.clear();
				location.href='login.html';
				return;
			}
		}
	};
}());

var display = (function(){
	return {
		showUserInfo : function() {
			$('#name').text(lstorage.get('name') + 'さん');
			$('#point').text(lstorage.get('point'));
			
			$('#ex8').attr('data-slider-max', lstorage.get('point'));
		},
		showQuestion : function() {
			$('#question').text('顔認証で認証されない変顔をできる人は？');
			$.unblockUI();
		},
		showDecision : function() {
			$('#decision').attr('disabled', false);
			$('#decision').prop('disabled', false);
		},
		hideDecision : function() {
			$('#decision').attr('disabled', true);
			$('#decision').prop('disabled', true);
		}
	};
}());

var gamestatus = (function() {
	function notNull(val) {
		return val != null && val.value != null && val.value.status != null;
	}
	
	return {
		isWait : function(val) {
			return notNull(val) && val.value.status === 'wait';
		},
		isPlay : function(val) {
			return notNull(val) && val.value.status === 'play';
		}
	};
}());

var milk;
var casino;
var casinoId = 'iuw3ivxuBhFFja3';

$(function(){
	milk = new MilkCocoa('hotihlxqti3.mlkcca.com');
	casino = milk.dataStore('casinovation');
	
	if (!window.localStorage) {
	    alert("お使いのブラウザは対応してません。");
	    $('#login').disabled = true;
	}
	
	page.checkRedirect();
	display.showUserInfo();
	
	$('#logout').click(function() {
		lstorage.clear();
	});
});