import { Component } from 'strudel';

@Component('.hello')
class HelloWorld {
	init() {
		this.$element.html(`Hello world!`);
	}
}