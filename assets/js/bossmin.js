/*!
 * bossmin v0.0.0 (https://github.com/WebJedi-DE/bossmin)
 * Copyright 2015 Daniel Weiß
 * Licensed under MIT
 */

/*
 * Based on metisMenu v1.0.2
 * Thanks to Osman Nuri Okumus
 */

;(function ($, window, document, undefined) {

	var pluginName = "metisMenu",
		defaults = {
			toggle: true
		};

	function Plugin(element, options) {
		this.element = element;
		this.settings = $.extend({}, defaults, options);
		this._defaults = defaults;
		this._name = pluginName;
		this.init();
	}

	Plugin.prototype = {
		init: function () {

			var $this = $(this.element),
				$toggle = this.settings.toggle;

			if (this.isIE() <= 9) {
				$this.find('li.active').has('ul').children('ul').collapse('show');
				$this.find('li').not('.active').has('ul').children('ul').collapse('hide');
			} else {
				$this.find('li.active').has('ul').children('ul').addClass('collapse in');
				$this.find('li').not('.active').has('ul').children('ul').addClass('collapse');
			}

			$this.find('li').has('ul').children('a').on('click', function (e) {
				e.preventDefault();

				$(this).parent('li').toggleClass('active').children('ul').collapse('toggle');

				if ($toggle) {
					$(this).parent('li').siblings().removeClass('active').children('ul.in').collapse('hide');
				}
			});
		},

		isIE: function() {
			var undef,
				v = 3,
				div = document.createElement('div'),
				all = div.getElementsByTagName('i');

			while (
				div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->',
					all[0]
				);
			return v > 4 ? v : undef;
		}
	};

	$.fn[ pluginName ] = function (options) {
		return this.each(function () {
			if (!$.data(this, "plugin_" + pluginName)) {
				$.data(this, "plugin_" + pluginName, new Plugin(this, options));
			}
		});
	};

})(jQuery, window, document);

;(function ( $, window, document, undefined ) {

	var toggle       = '[data-toggle="boss-collapse"]';
	var BossCollapse = function(element) {
		$(element).on('click.boss.collapse', this.toggle);
	};

	BossCollapse.VERSION = '0.0.0';


	BossCollapse.prototype.toggle = function (e) {
		e.preventDefault();

		var $this = $(this);
		var $sidebarWrapper = getSidebarWrapper($this);
		var $linkText = getLinkText($sidebarWrapper);
		var $icon = getIcon($this);
		var isClosed = $sidebarWrapper.hasClass('boss-close');

		if (!isClosed) {
			$icon.removeClass('fa-chevron-circle-left').addClass('fa-chevron-circle-right');
			$sidebarWrapper.addClass('boss-close');
		} else {
			$icon.removeClass('fa-chevron-circle-right').addClass('fa-chevron-circle-left');
			$sidebarWrapper.removeClass('boss-close');
		}
	};

	function getSidebarWrapper($this) {
		return $this.parent().parent().parent();
	}

	function getLinkText($sidebarWrapper) {
		return $sidebarWrapper.find('span');
	}

	function getIcon($this) {
		return $this.find('i.fa');
	}

	function Plugin(option) {
		console.log('Plugin');
		return this.each(function () {
			var $this = $(this);
			var data = $this.data('boss.collapse');
			console.log('EACH');

			if(!data) {
				$this.data('boss.collapse', (datat = new BossCollapse(this)));
			}
			if(typeof option == 'string') {
				data[option].call($this);
			}
		});
	}

	$.fn.bossCollapse             = Plugin;
	$.fn.bossCollapse.Constructor = BossCollapse;

	$(document).on('click.boss.collapse', toggle, BossCollapse.prototype.toggle);

})( jQuery, window, document );