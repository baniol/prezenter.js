class Prezenter

	constructor: (options = {}) ->
		animation = options.animation ? 'pulse'
		@loop = options.loop ? false
		@outroText = options.outroText ? false
		@autoStart = options.autoStart ? false
		@controlsOffset = options.controlsOffset ? 0
		@introText = options.introText ? null
		@moveSpeed = options.moveSpeed ? 800
		# custom events
		@onEachStep = options.onEachStep ? null
		@onStart = options.onStart ? null
		@onEnd = options.onEnd ? null

		@data = prez_data
		@debug = true
		@currentStep = 0
		@animation = "pulse"
		@viewportDim = 
			width: $(document).width()
			height: $(document).height()
		@cursor = $('<div class="prez-cursor" >⬆</div>')
		@cursorInitialPosition = {}
		@frame = $('<div class="prez-frame animated '+animation+'" />')
		@startButton = $('<div class="prez-start-btn prez-btn">➡</div>')
		@closeBtn = $('<div class="prez-end-close-btn prez-btn">✖</div>')
		@tip = $('<div class="prez-tooltip" />')
		@body = $('body')
		@grid = []
		@currentElement = null
		@framePadding = 10
		@cursorSpacing = 5
		@currsorDims = {}

		@VERSION = '0.0.2'

		# make array of objects from the prezenterData.js file
		# check if all elements exist
		if !$.isArray @makeGrid()
			return;

		# init Prezenter
		@appendControls()
		if @autoStart is 'always' or (@autoStart is 'once' and !window.localStorage.prezenter_mark_done?)
			@showCtrl.click()

	log: (msg) ->
		console?.log msg if @debug

	init: (intro) ->
		@showIntroText (intro), =>
			@placeCursor()
			@showFrame()
			@showTip()
			@bindKeys()
			# this is the first step - custom event onEachStep
			if typeof @onEachStep == 'function'
				@onEachStep(@currentStep+1)
			return

	showIntroText: (intro,fn) ->
		# on start custom event
		if typeof @onStart == 'function' and !intro?
				@onStart()

		if @introText and !intro?
			@showPopup @introText
		else
			fn()

	# make data structure from prez_data file
	makeGrid: ->
		for item in @data
			objDom = $(item.selector)

			elDims = @calculateElementDimensions objDom

			# check the existence of all elements
			if(objDom).length is 0
				throw "the element #{item.selector} does not exist"

			el = 
				selector: item.selector
				text: item.text
				offset:
					top:objDom.offset()?.top
					left:objDom.offset()?.left
				width: elDims.width
				height: elDims.height
				scroll: item.scroll
				cursorPosition: if item.position? then item.position else "left"
				fn: item.fn
			@grid.push el
		@grid

	calculateElementDimensions: (el) ->
		dim = 
			width: @getInt(el.css 'padding-left')  + @getInt(el.css 'padding-right') + el.width()
			height: @getInt(el.css 'padding-top') + @getInt(el.css 'padding-bottom') + el.height()

	# parses string containing 'px'
	# @param {String}
	# @return {Number}
	getInt: (inp) ->
		a = inp.replace 'px',''
		return parseInt a,10

	appendControls: ->
		@ctrlWrapper = $('<div class="prez-ctrl-wrapper" />')
		@ctrlPrevButton = $('<div class="prez-btn btn-left prez-ctrl-prev">«</div>')
		@ctrlNextButton = $('<div class="prez-btn btn-right prez-ctrl-next">»</div>')
		@ctrlCloseButton = $('<div class="prez-btn prez-ctrl-close">✖</div>')
		@showCtrl = $('<div class="prez-show">?</div>')
		@ctrlWrapper.append @ctrlPrevButton
		@ctrlWrapper.append @ctrlNextButton
		@ctrlWrapper.append @ctrlCloseButton
		@ctrlWrapper.append @showCtrl

		@body.append @ctrlWrapper
		@ctrlWrapperHeight = @ctrlWrapper.height() + @getInt(@ctrlWrapper.css 'padding-top') + @getInt(@ctrlWrapper.css 'padding-bottom');

		@ctrlWrapper.css
			x: @controlsOffset+'px'
			y: '-'+@ctrlWrapperHeight+'px'

		# @todo - remove on show !!!
		@showCtrl.on 'click', =>
			@ctrlWrapper.transition({y:10},300,'ease')
			@showCtrl.hide()
			@bindControls()
			@init()

	bindControls: ->
		@ctrlPrevButton.on 'click', =>
			@nextStep(true)
		@ctrlNextButton.on 'click', =>
			# if intro popup is displayed
			if @tip.hasClass 'intro'
				@init true
			else
				@nextStep()
		@ctrlCloseButton.on 'click', =>
			@showCtrl.show()
			@presentationEnd(true)

	unbindControls: ->
		@ctrlPrevButton.off 'click'
		@ctrlNextButton.off 'click'
		@ctrlCloseButton.off 'click'

	# @todo bind to element, not globally ?
	bindKeys: ->
		@unbindKeys()
		$(document).on 'keyup', (e) =>
			if e.keyCode is 37
				@nextStep(true)
			if e.keyCode is 39
				@nextStep()

	unbindKeys: ->
		$(document).off 'keyup'

	# calculates the cursor position & places is at the first step
	# @todo merge switch with @calcuateDifference
	placeCursor: ->
		# @todo chante - currentElement is always the first
		# @currentElement = @grid[@currentStep]
		@currentElement = @grid[0]

		@cursor.transition x:0,y:0

		# append hidden cursor to take it's dimensions - not used at the moment (static cursor dims)
		@body.append @cursor
		# @todo dynamically set the cursor dimensions
		@currsorDims = 
			# width:30
			# height:30
			width:@cursor.width()
			height:@cursor.height()

		switch @currentElement.cursorPosition
			when "bottom"
				@cursor.css
					left: @currentElement.offset.left + (@currentElement.width / 2) - (@currsorDims.width / 2)
					top: @currentElement.offset.top + @currentElement.height + @framePadding + @cursorSpacing
			when "top"
				@cursor.css({ rotate: '180deg' });
				@cursor.css
					left: @currentElement.offset.left + (@currentElement.width / 2) - (@currsorDims.width / 2)
					top: @currentElement.offset.top - @currsorDims.height - @framePadding - @cursorSpacing
			when "right"
				@cursor.css({ rotate: '-90deg' });
				@cursor.css
					left:@currentElement.offset.left + @currentElement.width + @framePadding + @cursorSpacing
					top:@currentElement.offset.top - @framePadding
			# default left
			else
				@cursor.css({ rotate: '90deg' });
				@cursor.css
					left:@currentElement.offset.left - @framePadding - @currsorDims.width - @cursorSpacing
					top:@currentElement.offset.top - @framePadding

		# display positionned cursor
		@cursor.css "visibility", "visible"

		# adding custom scroll from data
		addScroll = if @currentElement.scroll? then @currentElement.scroll else 0
		topScroll = @currentElement.offset.top - 20 - addScroll

		# determine the first cursor position - for further reference while moving cursor
		@cursorInitialPosition = 
			left:@cursor.offset().left
			top:@cursor.offset().top

		$('html, body').animate(
			scrollTop: topScroll
		, 400);

	nextStep: (back) ->
		# first step and back
		if @currentStep is 0 and back? then return;

		# unbind controls (click & keyup) until animation ends
		@unbindControls()
		@unbindKeys()

		#if prezentation ends
		if @currentStep > (@grid.length - 2)
			# back to step 1
			if @loop
				@currentStep = -1
			else
				# end prezentation
				# last step and back
				if !back?
					@presentationEnd()
					return false;

		@frame.remove()
		@tip.remove()
		# cursor position defference
		diff = @calculateDifference(back)

		if back? then @currentStep-- else @currentStep++
		
		@currentElement = @grid[@currentStep]

		# move cursor to a new position
		@cursor.transition({x:diff.x,y:diff.y},@moveSpeed,'ease')

		next = if back? then 1 else -1
		if (@currentStep + next) is -1
			next = 1
		# fix for wrong cursor rotation when going from the last step to the first
		if @currentStep is 0 and !back? then next = @grid.length - 1

		# rotate cursor if necessary
		@rotateCursor next

		# adding custom scroll from data
		addScroll = if @currentElement.scroll? then @currentElement.scroll else 0
		topScroll = @currentElement.offset.top - 20 - addScroll
		
		$('html, body').animate(
			scrollTop: topScroll
			, 400);

		# show highlight rim after move cursor animation
		setTimeout (=>
			@showFrame()
			@showTip()
			@bindKeys()
			@bindControls()
			if typeof @onEachStep == 'function'
				@onEachStep(@currentStep+1)
			# custom event on specific step
			if typeof @currentElement.fn == 'function'
				@currentElement.fn @tip,@frame,@cursor
			),@moveSpeed

	# add highlight frame
	showFrame: ->
		@frame.css
			top: @currentElement.offset.top - @framePadding
			left: @currentElement.offset.left - @framePadding
			width: @currentElement.width + @framePadding * 2
			height: @currentElement.height + @framePadding * 2

		@body.append @frame

	showTip: ->
		@tip.html '<div class="prez-popup-text">'+@currentElement.text+'</div>'
		@tip.removeClass 'intro'
		@tip.removeClass 'outro'
		@body.append @tip

		# dimensions for calculations
		elWidth = @currentElement.width + @framePadding*2
		elHeight = @currentElement.height + @framePadding*2
		tipWidth = @tip.width() + @framePadding*2
		tipHeight = @tip.height() + @framePadding*2

		switch @currentElement.cursorPosition
			when "bottom"
				@tip.css
					left: @currentElement.offset.left + ((@currentElement.width - tipWidth) / 2)
					top: @currentElement.offset.top + @currentElement.height + @framePadding + @currsorDims.height + @cursorSpacing*2
			when "top"
				@tip.css
					left: @currentElement.offset.left + ((@currentElement.width - tipWidth) / 2)
					top: @currentElement.offset.top - @framePadding*3 - @cursorSpacing*2 - @currsorDims.height - @tip.height()
			when "right"
				@tip.css
					left: @currentElement.offset.left + @currentElement.width + @currsorDims.width + @framePadding + @cursorSpacing*2
					top: @currentElement.offset.top - @framePadding
			# default left
			else
				@tip.css
					left: @currentElement.offset.left - @framePadding*3 - @tip.width() - @currsorDims.width - @cursorSpacing*2
					# - @framePadding*4 - @currsorDims.width - @tip.width() - @cursorSpacing
					top: @currentElement.offset.top - @framePadding

	# if back == true -> calculate move to the previous position
	calculateDifference: (back) ->
		next = if back? then -1 else 1
		second = @grid[@currentStep + next]

		switch second.cursorPosition
			when "bottom"
				correctionX = second.width / 2 - @currsorDims.width/2
				correctionY = second.height + @framePadding + @cursorSpacing
			when "top"
				correctionX = second.width / 2 - @currsorDims.width/2
				correctionY = - @currsorDims.height - @framePadding - @cursorSpacing
			when "right"
				correctionX = second.width + @framePadding + @cursorSpacing
				correctionY =  - @framePadding
			else
				correctionX =  - @framePadding - @currsorDims.width - @cursorSpacing
				correctionY =  - @framePadding

		diff =
			x: second.offset.left - @cursorInitialPosition.left + correctionX
			y: second.offset.top - @cursorInitialPosition.top + correctionY

	## close prezentation
	presentationEnd: (noConfirm = false) ->
		#remove listeners
		@unbindControls()
		@startButton.off 'click'

		# custom event on prezentation end
		if typeof @onEnd == 'function'
			@onEnd()

		# remove prezentator elements
		@frame.remove()
		@cursor.remove()

		@currentStep = 0;

		if @outroText and !noConfirm
			@showPopup @outroText
		else
			@tip.remove()

		# @todo duplication!
		if noConfirm
			$(document).off 'click','.prez-end-close-btn'
			# hide controls
			@ctrlWrapper.transition({y:-@ctrlWrapperHeight},300,'ease')

		# @todo do not remove globally, only for prezentator
		@unbindKeys()

		@markDone()

	showPopup: (text) ->
		# find viewport center
		vw = $(document).width()
		vh = $(document).height()
		@tip.css 'visibility', 'hidden'
		@tip.empty()

		outroText = '<div class="prez-close-text" >'+text+'</div>'

		#  intro
		if @body.find('.prez-tooltip').length is 0
			@body.append @tip
			@tip.addClass 'intro'
			@tip.append $('<div class="prez-popup-text">'+@introText+'</div>')
			@tip.append @startButton
			@startButton.on 'click', =>
				@init true
			$(document).on 'keyup', (e) =>
				if e.keyCode is 39
					@startButton.click()
		else
			# outro
			@tip.append @closeBtn
			@tip.append $('<div class="prez-popup-text">'+outroText+'</div>')
			@tip.addClass 'outro'
			@closeBtn.on 'click', =>
				@tip.remove()
				$(document).off 'click','.prez-end-close-btn'
				# hide controls
				@ctrlWrapper.transition({y:-@ctrlWrapperHeight},300,'ease')
				@showCtrl.show()

		tw = @tip.width()
		th = @tip.height()
		tTop = 200
		@tip.css 
			top:tTop
			left:vw/2 - tw/2
		$('html, body').animate(
			scrollTop: 0
		,400);
		@tip.css 'visibility','visible'

	rotateCursor: (next) ->
		# @todo to a separate method + else if for a better performance ?
		if @currentElement.cursorPosition is "left" and @grid[@currentStep + next].cursorPosition is "bottom"
			@cursor.css rotate: '+=90'

		if @currentElement.cursorPosition is "top" and @grid[@currentStep + next].cursorPosition is "left"
			@cursor.css rotate: '+=90'

		if @currentElement.cursorPosition is "top" and @grid[@currentStep + next].cursorPosition is "bottom"
			@cursor.css rotate: '+=180'

		if @currentElement.cursorPosition is "bottom" and @grid[@currentStep + next].cursorPosition is "top"
			@cursor.css rotate: '-=180'

		if @currentElement.cursorPosition is "top" and @grid[@currentStep + next].cursorPosition is "right"
			@cursor.css rotate: '-=90'

		if @currentElement.cursorPosition is "right" and @grid[@currentStep + next].cursorPosition is "top"
			@cursor.css rotate: '+=90'

		if @currentElement.cursorPosition is "left" and @grid[@currentStep + next].cursorPosition is "top"
			@cursor.css rotate: '-=90'

		if @currentElement.cursorPosition is "left" and @grid[@currentStep + next].cursorPosition is "right"
			@cursor.css rotate: '+=180'

		if @currentElement.cursorPosition is "bottom" and @grid[@currentStep + next].cursorPosition is "left"
			@cursor.css rotate: '-=90'

		if @currentElement.cursorPosition is "bottom" and @grid[@currentStep + next].cursorPosition is "right"
			@cursor.css rotate: '+=90'

		if @currentElement.cursorPosition is "right" and @grid[@currentStep + next].cursorPosition is "bottom"
			@cursor.css rotate: '-=90'

		if @currentElement.cursorPosition is "right" and @grid[@currentStep + next].cursorPosition is "left"
			@cursor.css rotate: '-=180'

	markDone: ->
		window.localStorage.setItem 'prezenter_mark_done',true


root = exports ? window  
root.Prezenter = Prezenter 