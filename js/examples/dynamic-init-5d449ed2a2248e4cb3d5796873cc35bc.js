import { Component, Evt } from 'strudel';

@Component('.generator')
class Generator {
	@Evt('click .generator__trigger')
	onTrigger() {
		this.$element.prepend(`<div class="alert"></div>`);
		this.$element.trigger('contentloaded');
	}
}

@Component('.alert')
class Alert {
	@Evt('click .alert__dismiss')
	dismiss() {
		this.$element.remove();
	}

	init() {
		this.$element.html(`Alert! <button class="alert__dismiss">X</button>`);

		setTimeout(() => {
			this.dismiss();
		}, 2000);
	}
}