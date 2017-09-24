document.addEventListener('DOMContentLoaded', function () {
	var $mobileNav = document.querySelector('.mobile-nav');
	var $navToggle = document.querySelector('.nav-toggle');


	$navToggle.addEventListener('click', function(e) {
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
})