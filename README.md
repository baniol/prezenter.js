## prezenter.js
Live website presentation / introducton tool. Easy step-by-step guide creation.

[Demo](http://baniol.github.io/prezenter.js)

[screenshot]

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

* `autoStart` Set to `true` if you want the presentation start right after the page loads. Default `false`.
* `animation` Define the animation style on the highlighted element. Available: `pull`, `flash`, `shake`, `swing`, `tada`. Default `pulse`.
* `loop` If set to true, goes to the begining after the last step. Default `false`.
* `controlsOffset` Shifts the controls position left or right in pixels.
* `moveSpeed` Speed of the arrow animation in miliseconds. Default `800`.

### Optional events
* `onStart` Executed on the presentation start.
* `onEachStep` Executed on each step end.
* `onEnd` Executed on the presentation end.

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


## Changelog

### 0.0.1 - 11th June 2013

- Initial commit