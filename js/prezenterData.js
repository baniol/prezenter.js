window.prez_data = [

	{
		selector: 'header h1',
		text: 'Starting with the page header',
		position: 'left',
		width:282
	},

	{
		selector: '#download-zip',
		text: 'Moving to the next element with the tooltip placed below the element.<br/>Use callbacks to attach actions to other elements.',
		position: 'bottom',
		stepIn: function(tip, frame, cursor) {
			var c = $('<div class="cursor-added" style="position:absolute;right:579px;top:161px;color:red;font-size:30px;transform:rotate(45deg);-webkit-transform:rotate(45deg);" >⬆</div>');
			$('body').append(c);
			$('#view-on-github').addClass('red-border');

		},
		stepOut: function(tip, frame, cursor) {
			$('.cursor-added').remove();
			$('#view-on-github').removeClass('red-border');

		}
	},

	{
		selector: '#view-on-github',
		text: 'Changing the cursor color to demonstrage the possibility of a custom action on a specific step.',
		position: 'left',
		stepIn: function(tip, frame, cursor) {
			cursor.addClass('red-cursor');
		},
		stepOut: function(tip, frame, cursor) {
			cursor.removeClass('red-cursor');
		}
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