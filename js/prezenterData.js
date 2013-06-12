window.prez_data = [

	{
		selector: 'header h1',
		text: 'Lets start with a name of the lib',
		position: 'left'
	},

	{
		selector: '#download-zip',
		text: 'Now move on to the download zip link',
		position: 'left',
		fn: function(){
			console.log('custom event on step 2');
		}
	},

	{
		selector: '#download-tar-gz',
		text: 'Then to download .tar.gz ....',
		position: 'bottom'
	},

	{
		selector: '#view-on-github',
		text: 'You can also peek to the code',
		position: 'right'
	},

	{
		selector: '#pre-1',
		text: 'Lorem ipsum Aute eiusmod Excepteur dolore anim proident do quis enim elit sed in adipisicing eu ut nulla.',
		position: 'top',
		scroll: 180
	},

	{
		selector: '.link-2',
		text: 'Move on to the next header....',
		position: 'left'
	},

	{
		selector: '.inline-code',
		text: 'Some inline stuff ...',
		position: 'top',
		scroll: 120
	},

	{
		selector: '.user-mention',
		text: 'Lorem ipsum Laboris aliqua tempor ad eiusmod officia tempor ex irure et qui voluptate laboris eiusmod nulla magna ex est in.',
		position: 'left'
	},

	{
		selector: 'footer.footer',
		text: 'To end with the footer.',
		position: 'top'
	},

	{
		selector: '.footer-inner',
		text: 'Footer more specitic',
		position: 'right'
	}

];