document.addEventListener('DOMContentLoaded', function () {
	var $mobileNav = document.querySelector('.mobile-nav');
	var $navToggle = document.querySelector('.nav-toggle');
	var $sidebars = document.querySelectorAll('.anchors.api');

	$navToggle.addEventListener('click', function(e) {
		this.classList.toggle('is-active');
		$mobileNav.classList.toggle('is-expanded');
		event.stopPropagation();
	});

	document.body.addEventListener('click', function (e) {
		if ($mobileNav.classList.contains('is-expanded')) {
			$navToggle.classList.remove('is-active');
			$mobileNav.classList.remove('is-expanded');
		}
	});

	$mobileNav.addEventListener('click', function(e) {
		event.stopPropagation();
	});



	window.addEventListener('hashchange', () => {
		var target = document.querySelector(window.location.hash);
		window.scroll(0, target.offsetTop - 20)
	});

	[].forEach.call($sidebars, function($sidebar) {
		$sidebar.addEventListener('click', function (e) {
			if (e.target.classList.contains('sidebar-nav__link')) {
				window.location.hash = e.target.getAttribute('href');
				e.preventDefault();
			}
		});
	});
});