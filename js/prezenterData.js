window.prez_data = [

	{
		selector: 'header h1',
		text: 'Starting with the page header',
		position: 'left',
		stepIn: function(tip, frame, cursor) {
			cursor.addClass('red-cursor');
		},
		stepOut: function(tip, frame, cursor) {
			cursor.removeClass('red-cursor');
		}
	},

	{
		selector: '#download-zip',
		text: 'Then moving to the next element with the tooltip placed below the element.<br/>The red arrow on the right points to the next element.',
		position: 'bottom',
		stepIn: function(tip, frame, cursor) {
			var c = $('<div class="cursor-added" style="position:absolute;right:579px;top:161px;color:red;font-size:30px;-webkit-transform:rotate(45deg);" >⬆</div>');
			$('body').append(c);
			$('#view-on-github').addClass('red-border');

		},
		stepOut: function(tip, frame, cursor) {
			$('.cursor-added').remove();
			$('#view-on-github').removeClass('red-border');

		}
		// stepIn: function(tip, frame, cursor) {
		// 	cursor.addClass('green-cursor');
		// },
		// stepOut: function(tip, frame, cursor) {
		// 	cursor.removeClass('green-cursor');
		// }
	},

	{
		selector: '#view-on-github',
		text: 'Rotating the cursor to demonstrage the possibility of a custom action on a specific step.',
		position: 'left'
		// stepIn: function(tip, frame, cursor) {
		// 	cursor.transition({
		// 		rotate: '450deg'
		// 	});
		// }
	},

	{
		selector: '.link-2',
		text: 'Scrolling to the next element and shaking the tooltip.',
		position: 'right',
		scroll: 200,
		stepIn: function(tip, frame, cursor) {
			tip.addClass('animated shake');
			setTimeout(function() {
				tip.removeClass('animated shake');
			}, 800);
		}
	},

	{
		selector: 'footer',
		text: 'Scrolling all the way down to the footer',
		position: 'top'
	}

];