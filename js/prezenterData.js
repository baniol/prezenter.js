window.prez_data = [

	{
		selector: 'header h1',
		text: 'Starting with the page header',
		position: 'left'
	},

	{
		selector: '#download-zip',
		text: 'Then moving to the next element with the tooltip placed below the element.',
		position: 'bottom'
	},

	{
		selector: '#view-on-github',
		text: 'Rotating the cursor to demonstrage the possibility of a custom action on a specific step.',
		position: 'left',
		fn: function(tip, frame, cursor) {
			cursor.transition({
				rotate: '450deg'
			});
		}
	},

	{
		selector: '.link-2',
		text: 'Scrolling to the next element and shaking the tooltip.',
		position: 'right',
		scroll:200,
		fn: function(tip, frame, cursor) {
			tip.addClass('animated shake');
			setTimeout(function(){
				tip.removeClass('animated shake');
			},800);
		}
	},

	{
		selector: 'footer',
		text: 'Scrolling all the way down to the footer',
		position: 'top'
	}

];