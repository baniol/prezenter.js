## prezenter.js
Live step-by-step website presentation / introducton tool.

[Demo](http://baniol.github.io/prezenter.js)

<img src="http://baniol.github.io/prezenter.js/example/images/prezenter.png" />

## Installation

Prezenter.js is jquery.js and jquery.tranzit.js dependent.

These are files that must be included in your page for prezenter.js to work properly.

```
...
 <link href="css/prezenter.css" rel="stylesheet" />
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

* `autoStart` set to `true` if you want the presentation start right after the page loads; default `false`,
* `animation` define the animation style on the highlighted element. Available: `pull`, `flash`, `shake`, `swing`, `tada`, default `pulse`,
* `loop` if set to true, goes to the begining after the last step; default `false`,
* `controlsOffset` shifts the controls position left or right in pixels,
* `moveSpeed` speed of the arrow animation in miliseconds; default `800`.

### Optional events
* `onStart` executed on the presentation start,
* `onEachStep` executed on each step end. Returns a step number,
* `onEnd` executed on the presentation end.

### Example init script with all optional settings

```javascript
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
```

## The data file

`prezenterData.js` file contains an object (prez_data bound to the window object) with definitions of each step of the presentation

### obligatory element properties

* `selector` : jquery selector pointing to a dom element within the page,
* `text` : text shown in the prezentator tooltip; may contain html tags

### optional element properties

* `position` : position of the tooltip (left,right,top,bottom); default (if not explicitly specified) `left`,
* `fn` : function executed when the step animation ends.

## TODO
* optional offset & custom dimensions of the tooltip for each step
* tests, tests, tests ...

## Changelog

### 0.0.1 - 11th June 2013

- Initial commit