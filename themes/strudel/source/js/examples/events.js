import { El, Evt, Component } from 'strudel';

@Component('.publish')
class Publish {
	@El('.publish__message')
	message

	@Evt('click .publish__button')
	sendMessage() {
		this.$emit('publish:msg', {
			message: this.message.prop('value')
		});
		this.message.prop('value', '');
	}
}

@Component('.subscribe')
class Subscribe {
	init() {
		this.$on('publish:msg', (data) => {
			this.$element.append(`<li>${data.message}</li>`);
		});
	}
}

export default { Publish, Subscribe };

