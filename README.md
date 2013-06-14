## prezenter.js
Live step-by-step website presentation / introducton tool.

[Demo](http://baniol.github.io/prezenter.js)

<img src="http://baniol.github.io/prezenter.js/example/images/prezenter.png" />

## Installation

Prezenter.js is jquery.js and jquery.tranzit.js dependent so make sure these libraries are included in your page.

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

* `autoStart` set to `true` if you want the presentation to start right after the page loads; default `false`,
* `animation` defines the animation type on a highlighted element: available: `pulse`, `flash`, `shake`, `swing`, `tada`; default `pulse`,
* `loop` if set to true, goes back to the begining after the last step; default `false`,
* `controlsOffset` shifts the controls position to the left or right; in pixels,
* `moveSpeed` speed of the arrow animation in milliseconds; default `800`.

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
# `scroll` additionnal top scroll,
* `fn` function executed when a step animation ends, returns the tooltip, element frame and arrow cursor as dom objects,

## Development

The main script is written in coffeesctipt. You can find it in the `dev` directory, together with scss files. 

For tooltip animation I used css snippets from the animate.css library. If you wish to include more fancy animations check out the library source code : [Animate.css](https://github.com/daneden/animate.css/tree/master/source)

## TODO
* optional offset & custom dimensions of the tooltip for each step
* tests, tests, tests ...

### Changelog

#### 0.0.2
* custom callback on a specific step returns tip, frame and cursor dom objects

#### 0.0.1 - 11th June 2013

* Initial commit