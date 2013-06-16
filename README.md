## prezenter.js
Live step-by-step website presentation / introducton tool.

[Demo](http://baniol.github.io/prezenter.js)

## Installation

Prezenter.js is jquery.js and [jquery.tranzit.js](http://ricostacruz.com/jquery.transit/) dependent so make sure these libraries are included in your page.

```
...
 <link href="css/prezenter.css" rel="stylesheet" />
 <script src="js/jquery.js" type="text/javascript"></script>
 <script src="js/jquery.tranzit.js" type="text/javascript"></script>
 <script src="js/prezenterData.js" type="text/javascript"></script>
 <script src="js/prezenter.min.js" type="text/javascript"></script>
 ...
```

### Initialisation script

```javascript
$(document).ready(function() {
	new Prezenter();
});
```

## Options

### Optional settings

* `autoStart` if `always` the presentation will auto open each time after page reload, if `once` it will auto open only after first page load; default `false`,
* `animation` defines the animation type on a highlighted element: available: `pulse`, `flash`, `shake`, `swing`, `tada`; default `pulse`,
* `loop` if set to true, goes back to the begining after the last step; default `false`,
* `controlsOffset` shifts the controls position to the left or right; in pixels,
* `moveSpeed` speed of the arrow animation in milliseconds; default `800`,
* `showText` text appearing on a hidden controls box, default `presentation`.

### Optional events
* `onStart` executed when presentation starts,
* `onEachStep` executed when a step ends; returns a current step number,
* `onEnd` executed when the whole presentation ends.

### Example init script with all optional settings included

```javascript
$(document).ready(function() {
	(new Prezenter({
		autoStart: true,
		animation: 'flash',
		loop: false,
		controlsOffset: 0,
		moveSpeed: 800,
		introText: "This is a live step-by-step presentation of our website.<br>You can move backwards and forwards using left and right arrow keys.",
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
```

## The data file `prezenterData.js`

The file contains definitions for each step of the presentation

### obligatory properties

* `selector` : jquery selector pointing to a dom element within the page,
* `text` : message shown in the prezentator tooltip; may contain html tags

### optional properties

* `position` position of the tooltip (left,right,top,bottom); default (if not explicitly specified) `left`,
* `scroll` additionnal top scroll,
* `width` and `height` element frame custom width & height,
* `stepIn` calback executed when a step animation ends, returns the tooltip, element frame and arrow cursor as dom objects,
* `stepOut` callback executed while moving to a following step, returns the tooltip, element frame and arrow cursor as dom objects.

[An example of prezenterData.js file](https://github.com/baniol/prezenter.js/blob/master/js/prezenterData.js)

## Development

The main script is written in coffeesctipt. You can find it in the `dev` directory, together with scss files. 

For tooltip animation I used css snippets from the animate.css library. If you wish to include more fancy animations check out the library source code : [Animate.css](https://github.com/daneden/animate.css/tree/master/source)

### Tested on
* chrome 27
* firefox 19.0.2
* Opera 12.15

### Changelog

#### 0.0.4 - 16th June 2013
* custom pull down text - controls box
* stepOut callback on each step added
* added onEnd and onLastSteps callbacks
* added custom height & width of the element frame

#### 0.0.3 - 14th June 2013
* autoStart option with `always` and `once`

#### 0.0.2 - 14th June 2013
* custom callback on a specific step returns tip, frame and cursor dom objects

#### 0.0.1 - 11th June 2013

* Initial commit