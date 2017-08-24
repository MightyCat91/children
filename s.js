$(document).ready(function() {
	var studios = [];
	var prjs = [];
	var getter = {
		getObj: function() {
			return {
				name: {s: '.v-name', val: this.getName(), req: true},
				whois: {s: '.v-radio', val: this.whois(), req: true},
				birth: {s: '.v-birth', val: this.getBirth(), req: true},
				studios: {s: '.v-studios', val: studios},
				prjs: {s: '.v-prjs', val: prjs},
				time: {s: '.v-timing', val: this.getTime(), req: true},
				advice: {s: '.v-advice', val: this.getAdvice()},
				email: {s: '.v-email', val: this.getEmail(), req: true},
				phone: {s: '.v-phone', val: this.getPhone(), req: true},
				howto: {s: '.v-how-to', val: this.gethowTo()},
				info: {s: '.v-adding-info', val: this.getAddingInfo()}
			}
		},
		getName: function() {
			return $('.v-name input').val();
		},
		whois: function() {
			return $('.v-radio input[name=radio]:checked').closest('tr').find('.alltext').text().trim();
		},
		getBirth: function() {
			var str = '';
			$('.v-birth input').each(function(e, a) {
				if(/^\d+$/.test($(a).val()) && $(a).val() != '') {
					str += $(a).val() + '/';
				}
				else {
					str = '';
					return;
				}
			});			

			return str.substring(0, str.length - 1);
		},
		getBirthVal: function(e) {
			return e.val();
		},
		getTime: function() {
			var chks = [];
			$('.v-timing input[type=checkbox]').each(function () {
				if (this.checked) {
					chks.push($(this).closest('label').text().trim());
				}
			});
			
			return chks;
		},
		getAdvice: function() {
			return $('.v-advice').val();
		},
		getEmail: function() {
			var re = /\S+@\S+\.\S+/;
		
			return (re.test($('.v-email input').val())) ? $('.v-email input').val() : '';
		},
		getPhone: function() {
			var str = '8-';			
			$('.v-phone input').each(function(e, a) {
				if(/^\d+$/.test($(a).val()) && $(a).val() != '') {
					str += $(a).val() + '-';
				}
				else {
					str = '';
					return;
				}
			});
			
			return str.substring(0, str.length - 1);
		},
		gethowTo: function() {
			var chks = [];
			$('.v-how-to input[type=checkbox]').each(function () {
				if (this.checked) {
					chks.push($(this).closest('label').text().trim());
				}
			});
			
			return (chks.length > 0) ? chks : [$('.v-any-place').val()];
		},
		getAddingInfo: function() {
			return $('.v-adding-info').val();
		},
		getWrap: function(a, sel) {
			var content = '';			
			a.forEach(function(row, i) {
				content += '<div class="row">'+
					'<div class="item" rel="'+sel.substr(3)+'" data-key="'+i+'">Ваш выбор: ' + (i + 1) + ' ' + '<span>' + row + '</span></div>'+
					'<div class="del-item color green button2">Удалить</div></div>';
			});
			
			$(sel).html(content);
		},
		arraySplice: function(a, key) {
			var arr;
			if(a == 'studios') {
				studios.splice(key, 1);
				arr = studios;
			}
			else {
				prjs.splice(key, 1);
				arr = prjs;
			}

			this.getWrap(arr, '.v-' + a);
		}
	};
	var v = {
		check: function(o) {
			for(var i in o) {
				if(o[i].req && o[i].val.length == 0) {
					this.error($(o[i].s));
					return;
				}
			}
			if($('.v-error').length == 0) {
				this.response(o);
			}
		},
		checkArr: function(a, str, sel) {			
			(this.in_array(a, str)) ? a.push(str) : '';								
			getter.getWrap(a, sel);
		},
		in_array: function(a, s) {
			for(var i = 0, l = a.length; i < l; i++)  {
				if(a[i] == s) {
					return false;
				}
			}

			return true;
		},
		response: function(o) {
			$.ajax({
				type: "POST",
				url: "mailer.php",
				data: o,
				success: function(data) {
					$('#message').html('<span class="zagolovok_bigk">Ваша заявка отправлена!</span>');
				}
			});
		},
		error: function(e) {
			e.addClass('v-error');
			$('#message').html('<span class="zagolovok_bigk">Не все поля заполнены!</span>');
		}
	}

	$('#mail').on('click', function() {
		$('body').find('.v-error').removeClass('v-error');
		v.check(getter.getObj());
		
		// console.log(getter.getObj());
	});
	$('#v-add-studio').on('click', function() {
		v.checkArr(studios, $(this).closest('tr').find("select :selected").text().trim(), '.v-studios');
	});
	
	$('body').on('click', '.del-item', function() {
		getter.arraySplice($(this).prev().attr('rel'), $(this).prev().attr('data-key'))
		$(this).closest('.row').remove();
	});
	$('#v-add-prj').on('click', function() {
		v.checkArr(prjs, $(this).closest('tr').find("select :selected").text().trim(), '.v-prjs');
	});
});