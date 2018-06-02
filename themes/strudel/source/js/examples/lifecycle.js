import { Component, Evt } from 'strudel';

@Component('.counter')
class Counter {
	count = 0;

	beforeInit() {
		this.$on('add', () => {
			this.count++;
			if (this.count >= 5) {
				this.$teardown();
			} else {
				this.render();
			}
		});
	}

	init() {
		this.render();
	}

	beforeDestroy() {
		this.$element.remove();
	}

	destroy() {
		this.$off('add');
		this.$emit('destroyed');
	}

	render() {
		this.$element.text(this.count);
	}
}

@Component('.adder')
class Add {
	beforeInit() {
		this.$on('destroyed', () => this.$teardown());
	}

	beforeDestroy() {
		this.$element.remove();
	}

	@Evt('click')
	onClick() {
		this.$emit('add');
	}
}