document.addEventListener('DOMContentLoaded', function () {
	var $mobileNav = document.querySelector('.mobile-nav');
	var $navToggle = document.querySelector('.nav-toggle');
	var $sidebars = document.querySelectorAll('.anchors.api');

	var scrollTo = function (hash) {
		var target = document.querySelector(hash);
		target && window.scrollTo(0, target.offsetTop - 20)
	}

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

	$mobileNav.addEventListener('click', function() {
		event.stopPropagation();
	});

	window.addEventListener('hashchange', () => {
		scrollTo(window.location.hash);
	});

	[].forEach.call($sidebars, function($sidebar) {
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
});