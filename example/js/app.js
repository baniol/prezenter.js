$(document).ready(function() {
	new Prezenter({
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
			var w = $('<div class="end-step-wrapper" style="position:absolute;right:121px;top:15px;text-align:center;" />');
			var c = $('<div class="cursor-added" style="color:red;font-size:30px;" >⬆</div>');
			var m = $('<div style="width:200px" />').html('Click here to watch the presentation again.');
			w.append(c).append(m);
			$('body').append(w);
			setTimeout(function() {
				w.fadeOut('slow', function() {
					w.remove();
				});
			}, 2000);
		}
	});
});