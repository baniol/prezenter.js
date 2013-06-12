$(document).ready(function() {
	(new Prezenter({
		autoStart: true,
		animation: 'flash',
		loop: false,
		controlsOffset: 0,
		moveSpeed: 800,
		introText: "This is a presentation of our site.<br>You can move backwards and forwards using arrow keys.",
		outroText: 'This is the end of the presentation.<br>You can see it again by clicking the question mark at the top of the page.',
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