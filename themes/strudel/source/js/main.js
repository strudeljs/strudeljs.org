document.addEventListener('DOMContentLoaded', function () {
	var $mobileNav = document.querySelector('.mobile-nav');
	var $navToggle = document.querySelector('.nav-toggle');
	var $sidebars = document.querySelectorAll('.anchors.api');
	var $tabs = document.querySelectorAll('.tabs');

	var each = function(collection, callback) {
		return [].forEach.call(collection, callback);
	};

	var scrollTo = function (hash) {
		var target = document.querySelector(hash);
		target && window.scrollTo(0, target.offsetTop - 20)
	};

	$navToggle.addEventListener('click', function() {
		this.classList.toggle('is-active');
		$mobileNav.classList.toggle('is-expanded');
		event.stopPropagation();
	});

	document.body.addEventListener('click', function () {
		if ($mobileNav.classList.contains('is-expanded')) {
			$navToggle.classList.remove('is-active');
			$mobileNav.classList.remove('is-expanded');
		}
	});

	$mobileNav.addEventListener('click', function () {
		event.stopPropagation();
	});

	window.addEventListener('hashchange', function () {
		scrollTo(window.location.hash);
	});

	each($sidebars, function($sidebar) {
		$sidebar.addEventListener('click', function (e) {
			if (e.target.classList.contains('sidebar-nav__link')) {
				window.location.hash = e.target.getAttribute('href');
				e.preventDefault();
			}
		});
	});

	if (window.location.hash) {
		setTimeout(function() {
			scrollTo(window.location.hash);
		}, 500);
	}

	each($tabs, function($tab) {
		var $sections = $tab.querySelectorAll('[role="tabpanel"]');
		var $buttons = $tab.querySelectorAll('[role="tab"]');

		each($buttons, function($button) {
			$button.addEventListener('click', function (e) {
				var $target = e.target;
				var $active = $tab.querySelector($target.getAttribute('href'));

				each($sections, function ($section) {
					$section.setAttribute('hidden', true);
				});
				$active.removeAttribute('hidden');

				each($buttons, function ($button) {
					$button.removeAttribute('aria-selected');
				});
				$target.setAttribute('aria-selected', true);

				e.preventDefault();
			});
		});
	});
});