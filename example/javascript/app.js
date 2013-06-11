$(document).ready(function() {
	(new Prezenter({
		auto: true,
		animation: 'flash',
		loop: false,
		outroText: 'This is the end of the presentation.<br>You can see it again by clicking the question mark at the top of the page.',
		controlsOffset: 0,
		introText: "This is a presentation of our site.<br>You can move backwards and forwards using arrow keys.",
		moveSpeed: 800,
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