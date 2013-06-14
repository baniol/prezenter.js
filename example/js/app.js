$(document).ready(function() {
	(new Prezenter({
		autoStart: 'always',
		animation: 'flash',
		loop: false,
		controlsOffset: 0,
		moveSpeed: 800,
		introText: "Let <u>prezenter.js</u> present himself.<br>You can move forward and backwards using left and right arrow keys.",
		outroText: 'This is the end of the presentation.<br>You can watch it again by clicking the tab with a question mark at the top of the page.',
		onStart: function() {
			console.log('start');
		},
		onEachStep: function(step) {
			console.log(step);
		},
		onEnd: function() {
			console.log('prezentation end');
		}
	}));
});