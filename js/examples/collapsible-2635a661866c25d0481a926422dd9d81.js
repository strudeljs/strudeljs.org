import { El, Evt, Component } from 'strudel';

@Component('.collapsible')
class Collapsible {
	@El('.collapsible__panel')
	panel

	@Evt('click .collapsible__button')
	toggle() {
		const state = (this.panel.attr('hidden') !== null);

		if (state) {
			this.panel.first().removeAttribute('hidden');
		} else {
			this.panel.attr('hidden', 'true');
		}
	}
}