import { Component } from 'strudel';

@Component('.greeter')
class Greeter {
	init() {
		this.$element.html(`Hello world!`);
	}
}

export default Greeter;