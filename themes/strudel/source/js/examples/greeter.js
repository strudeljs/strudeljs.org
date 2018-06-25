import { El, Evt, Component } from 'strudel';

@Component('.greeter')
class Greeter {
	@El('.greeter__output') output

	@El('.greeter__input') input

	@Evt('click .greeter__button')
	greet() {
		this.output.html(`Hello, ${this.input.prop('value')}!`)
	}
}