(function() {
  var Prezenter, root;

  Prezenter = (function() {
    function Prezenter(options) {
      var animation, _ref, _ref1, _ref10, _ref11, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7, _ref8, _ref9;
      if (options == null) {
        options = {};
      }
      animation = (_ref = options.animation) != null ? _ref : 'pulse';
      this.loop = (_ref1 = options.loop) != null ? _ref1 : false;
      this.outroText = (_ref2 = options.outroText) != null ? _ref2 : false;
      this.autoStart = (_ref3 = options.autoStart) != null ? _ref3 : false;
      this.controlsOffset = (_ref4 = options.controlsOffset) != null ? _ref4 : 0;
      this.introText = (_ref5 = options.introText) != null ? _ref5 : null;
      this.moveSpeed = (_ref6 = options.moveSpeed) != null ? _ref6 : 800;
      this.onEachStep = (_ref7 = options.onEachStep) != null ? _ref7 : null;
      this.onStart = (_ref8 = options.onStart) != null ? _ref8 : null;
      this.onLastStep = (_ref9 = options.onLastStep) != null ? _ref9 : null;
      this.onEnd = (_ref10 = options.onEnd) != null ? _ref10 : null;
      this.showText = (_ref11 = options.showText) != null ? _ref11 : 'presentation';
      this.data = prez_data;
      this.debug = true;
      this.currentStep = 0;
      this.animation = "pulse";
      this.viewportDim = {
        width: $(document).width(),
        height: $(document).height()
      };
      this.cursor = $('<div class="prez-cursor" >⬆</div>');
      this.cursorInitialPosition = {};
      this.frame = $('<div class="prez-frame animated ' + animation + '" />');
      this.startButton = $('<div class="prez-start-btn prez-btn">➡</div>');
      this.closeBtn = $('<div class="prez-end-close-btn prez-btn">✖</div>');
      this.tip = $('<div class="prez-tooltip" />');
      this.body = $('body');
      this.grid = [];
      this.currentElement = null;
      this.framePadding = 10;
      this.cursorSpacing = 5;
      this.currsorDims = {};
      this.VERSION = '0.0.2';
      if (!$.isArray(this.makeGrid())) {
        return;
      }
      this.appendControls();
      if (this.autoStart === 'always' || (this.autoStart === 'once' && (window.localStorage.prezenter_mark_done == null))) {
        this.showCtrl.click();
      }
    }

    Prezenter.prototype.log = function(msg) {
      if (this.debug) {
        return typeof console !== "undefined" && console !== null ? console.log(msg) : void 0;
      }
    };

    Prezenter.prototype.init = function(intro) {
      var _this = this;
      return this.showIntroText(intro, function() {
        _this.placeCursor();
        _this.showFrame();
        _this.showTip();
        _this.bindKeys();
        if (typeof _this.currentElement.stepIn === 'function') {
          _this.currentElement.stepIn(_this.tip, _this.frame, _this.cursor);
        }
        if (typeof _this.onEachStep === 'function') {
          _this.onEachStep(_this.currentStep + 1);
        }
      });
    };

    Prezenter.prototype.showIntroText = function(intro, fn) {
      if (typeof this.onStart === 'function' && (intro == null)) {
        this.onStart();
      }
      if (this.introText && (intro == null)) {
        return this.showPopup(this.introText);
      } else {
        return fn();
      }
    };

    Prezenter.prototype.makeGrid = function() {
      var el, elDims, item, objDom, _i, _len, _ref, _ref1, _ref2;
      _ref = this.data;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        item = _ref[_i];
        objDom = $(item.selector);
        elDims = this.calculateElementDimensions(objDom);
        if (objDom.length === 0) {
          throw "the element " + item.selector + " does not exist";
        }
        el = {
          selector: item.selector,
          text: item.text,
          offset: {
            top: (_ref1 = objDom.offset()) != null ? _ref1.top : void 0,
            left: (_ref2 = objDom.offset()) != null ? _ref2.left : void 0
          },
          width: elDims.width,
          height: elDims.height,
          scroll: item.scroll,
          cursorPosition: item.position != null ? item.position : "left",
          stepIn: item.stepIn,
          stepOut: item.stepOut
        };
        this.grid.push(el);
      }
      return this.grid;
    };

    Prezenter.prototype.calculateElementDimensions = function(el) {
      var dim;
      return dim = {
        width: this.getInt(el.css('padding-left')) + this.getInt(el.css('padding-right')) + el.width(),
        height: this.getInt(el.css('padding-top')) + this.getInt(el.css('padding-bottom')) + el.height()
      };
    };

    Prezenter.prototype.getInt = function(inp) {
      var a;
      a = inp.replace('px', '');
      return parseInt(a, 10);
    };

    Prezenter.prototype.appendControls = function() {
      var _this = this;
      this.ctrlWrapper = $('<div class="prez-ctrl-wrapper" />');
      this.ctrlPrevButton = $('<div class="prez-btn btn-left prez-ctrl-prev">«</div>');
      this.ctrlNextButton = $('<div class="prez-btn btn-right prez-ctrl-next">»</div>');
      this.ctrlCloseButton = $('<div class="prez-btn prez-ctrl-close">✖</div>');
      this.showCtrl = $('<div class="prez-show">' + this.showText + '</div>');
      this.ctrlWrapper.append(this.ctrlPrevButton);
      this.ctrlWrapper.append(this.ctrlNextButton);
      this.ctrlWrapper.append(this.ctrlCloseButton);
      this.ctrlWrapper.append(this.showCtrl);
      this.body.append(this.ctrlWrapper);
      this.ctrlWrapperHeight = this.ctrlWrapper.height() + this.getInt(this.ctrlWrapper.css('padding-top')) + this.getInt(this.ctrlWrapper.css('padding-bottom'));
      this.ctrlWrapper.css({
        x: this.controlsOffset + 'px',
        y: '-' + this.ctrlWrapperHeight + 'px'
      });
      return this.showCtrl.on('click', function() {
        _this.ctrlWrapper.transition({
          y: 10
        }, 300, 'ease');
        _this.showCtrl.hide();
        _this.bindControls();
        return _this.init();
      });
    };

    Prezenter.prototype.bindControls = function() {
      var _this = this;
      this.ctrlPrevButton.on('click', function() {
        return _this.nextStep(true);
      });
      this.ctrlNextButton.on('click', function() {
        if (_this.tip.hasClass('intro')) {
          return _this.init(true);
        } else {
          return _this.nextStep();
        }
      });
      return this.ctrlCloseButton.on('click', function() {
        _this.showCtrl.show();
        return _this.presentationEnd(true);
      });
    };

    Prezenter.prototype.unbindControls = function() {
      this.ctrlPrevButton.off('click');
      this.ctrlNextButton.off('click');
      return this.ctrlCloseButton.off('click');
    };

    Prezenter.prototype.bindKeys = function() {
      var _this = this;
      this.unbindKeys();
      return $(document).on('keyup', function(e) {
        if (e.keyCode === 37) {
          _this.nextStep(true);
        }
        if (e.keyCode === 39) {
          return _this.nextStep();
        }
      });
    };

    Prezenter.prototype.unbindKeys = function() {
      return $(document).off('keyup');
    };

    Prezenter.prototype.placeCursor = function() {
      var addScroll, topScroll;
      this.currentElement = this.grid[0];
      this.cursor.transition({
        x: 0,
        y: 0
      });
      this.body.append(this.cursor);
      this.currsorDims = {
        width: this.cursor.width(),
        height: this.cursor.height()
      };
      switch (this.currentElement.cursorPosition) {
        case "bottom":
          this.cursor.css({
            left: this.currentElement.offset.left + (this.currentElement.width / 2) - (this.currsorDims.width / 2),
            top: this.currentElement.offset.top + this.currentElement.height + this.framePadding + this.cursorSpacing
          });
          break;
        case "top":
          this.cursor.css({
            rotate: '180deg'
          });
          this.cursor.css({
            left: this.currentElement.offset.left + (this.currentElement.width / 2) - (this.currsorDims.width / 2),
            top: this.currentElement.offset.top - this.currsorDims.height - this.framePadding - this.cursorSpacing
          });
          break;
        case "right":
          this.cursor.css({
            rotate: '-90deg'
          });
          this.cursor.css({
            left: this.currentElement.offset.left + this.currentElement.width + this.framePadding + this.cursorSpacing,
            top: this.currentElement.offset.top - this.framePadding
          });
          break;
        default:
          this.cursor.css({
            rotate: '90deg'
          });
          this.cursor.css({
            left: this.currentElement.offset.left - this.framePadding - this.currsorDims.width - this.cursorSpacing,
            top: this.currentElement.offset.top - this.framePadding
          });
      }
      this.cursor.css("visibility", "visible");
      addScroll = this.currentElement.scroll != null ? this.currentElement.scroll : 0;
      topScroll = this.currentElement.offset.top - 20 - addScroll;
      this.cursorInitialPosition = {
        left: this.cursor.offset().left,
        top: this.cursor.offset().top
      };
      return $('html, body').animate({
        scrollTop: topScroll
      }, 400);
    };

    Prezenter.prototype.nextStep = function(back) {
      var addScroll, diff, next, topScroll,
        _this = this;
      if (typeof this.currentElement.stepOut === 'function') {
        this.currentElement.stepOut(this.tip, this.frame, this.cursor);
      }
      if (this.currentStep === 0 && (back != null)) {
        return;
      }
      this.unbindControls();
      this.unbindKeys();
      if (this.currentStep > (this.grid.length - 2)) {
        if (this.loop) {
          this.currentStep = -1;
        } else {
          if (back == null) {
            this.presentationEnd();
            return false;
          }
        }
      }
      this.frame.remove();
      this.tip.remove();
      diff = this.calculateDifference(back);
      if (back != null) {
        this.currentStep--;
      } else {
        this.currentStep++;
      }
      this.currentElement = this.grid[this.currentStep];
      this.cursor.transition({
        x: diff.x,
        y: diff.y
      }, this.moveSpeed, 'ease');
      next = back != null ? 1 : -1;
      if ((this.currentStep + next) === -1) {
        next = 1;
      }
      if (this.currentStep === 0 && (back == null)) {
        next = this.grid.length - 1;
      }
      this.rotateCursor(next);
      addScroll = this.currentElement.scroll != null ? this.currentElement.scroll : 0;
      topScroll = this.currentElement.offset.top - 20 - addScroll;
      $('html, body').animate({
        scrollTop: topScroll
      }, 400);
      return setTimeout((function() {
        _this.showFrame();
        _this.showTip();
        _this.bindKeys();
        _this.bindControls();
        if (typeof _this.onEachStep === 'function') {
          _this.onEachStep(_this.currentStep + 1);
        }
        if (typeof _this.currentElement.stepIn === 'function') {
          return _this.currentElement.stepIn(_this.tip, _this.frame, _this.cursor);
        }
      }), this.moveSpeed);
    };

    Prezenter.prototype.showFrame = function() {
      this.frame.css({
        top: this.currentElement.offset.top - this.framePadding,
        left: this.currentElement.offset.left - this.framePadding,
        width: this.currentElement.width + this.framePadding * 2,
        height: this.currentElement.height + this.framePadding * 2
      });
      return this.body.append(this.frame);
    };

    Prezenter.prototype.showTip = function() {
      var elHeight, elWidth, tipHeight, tipWidth;
      this.tip.html('<div class="prez-popup-text">' + this.currentElement.text + '</div>');
      this.tip.removeClass('intro');
      this.tip.removeClass('outro');
      this.body.append(this.tip);
      elWidth = this.currentElement.width + this.framePadding * 2;
      elHeight = this.currentElement.height + this.framePadding * 2;
      tipWidth = this.tip.width() + this.framePadding * 2;
      tipHeight = this.tip.height() + this.framePadding * 2;
      switch (this.currentElement.cursorPosition) {
        case "bottom":
          return this.tip.css({
            left: this.currentElement.offset.left + ((this.currentElement.width - tipWidth) / 2),
            top: this.currentElement.offset.top + this.currentElement.height + this.framePadding + this.currsorDims.height + this.cursorSpacing * 2
          });
        case "top":
          return this.tip.css({
            left: this.currentElement.offset.left + ((this.currentElement.width - tipWidth) / 2),
            top: this.currentElement.offset.top - this.framePadding * 3 - this.cursorSpacing * 2 - this.currsorDims.height - this.tip.height()
          });
        case "right":
          return this.tip.css({
            left: this.currentElement.offset.left + this.currentElement.width + this.currsorDims.width + this.framePadding + this.cursorSpacing * 2,
            top: this.currentElement.offset.top - this.framePadding
          });
        default:
          return this.tip.css({
            left: this.currentElement.offset.left - this.framePadding * 3 - this.tip.width() - this.currsorDims.width - this.cursorSpacing * 2,
            top: this.currentElement.offset.top - this.framePadding
          });
      }
    };

    Prezenter.prototype.calculateDifference = function(back) {
      var correctionX, correctionY, diff, next, second;
      next = back != null ? -1 : 1;
      second = this.grid[this.currentStep + next];
      switch (second.cursorPosition) {
        case "bottom":
          correctionX = second.width / 2 - this.currsorDims.width / 2;
          correctionY = second.height + this.framePadding + this.cursorSpacing;
          break;
        case "top":
          correctionX = second.width / 2 - this.currsorDims.width / 2;
          correctionY = -this.currsorDims.height - this.framePadding - this.cursorSpacing;
          break;
        case "right":
          correctionX = second.width + this.framePadding + this.cursorSpacing;
          correctionY = -this.framePadding;
          break;
        default:
          correctionX = -this.framePadding - this.currsorDims.width - this.cursorSpacing;
          correctionY = -this.framePadding;
      }
      return diff = {
        x: second.offset.left - this.cursorInitialPosition.left + correctionX,
        y: second.offset.top - this.cursorInitialPosition.top + correctionY
      };
    };

    Prezenter.prototype.presentationEnd = function(noConfirm) {
      if (noConfirm == null) {
        noConfirm = false;
      }
      this.unbindControls();
      this.startButton.off('click');
      if (typeof this.onLastStep === 'function') {
        this.onLastStep();
      }
      this.frame.remove();
      this.cursor.remove();
      this.currentStep = 0;
      if (this.outroText && !noConfirm) {
        this.showPopup(this.outroText);
      } else {
        this.tip.remove();
      }
      if (noConfirm) {
        $(document).off('click', '.prez-end-close-btn');
        this.ctrlWrapper.transition({
          y: -this.ctrlWrapperHeight
        }, 300, 'ease');
      }
      this.unbindKeys();
      return this.markDone();
    };

    Prezenter.prototype.showPopup = function(text) {
      var outroText, tTop, th, tw, vh, vw,
        _this = this;
      vw = $(document).width();
      vh = $(document).height();
      this.tip.css('visibility', 'hidden');
      this.tip.empty();
      outroText = '<div class="prez-close-text" >' + text + '</div>';
      if (this.body.find('.prez-tooltip').length === 0) {
        this.body.append(this.tip);
        this.tip.addClass('intro');
        this.tip.append($('<div class="prez-popup-text">' + this.introText + '</div>'));
        this.tip.append(this.startButton);
        this.startButton.on('click', function() {
          return _this.init(true);
        });
        $(document).on('keyup', function(e) {
          if (e.keyCode === 39) {
            return _this.startButton.click();
          }
        });
      } else {
        this.tip.append(this.closeBtn);
        this.tip.append($('<div class="prez-popup-text">' + outroText + '</div>'));
        this.tip.addClass('outro');
        this.closeBtn.on('click', function() {
          _this.tip.remove();
          $(document).off('click', '.prez-end-close-btn');
          _this.ctrlWrapper.transition({
            y: -_this.ctrlWrapperHeight
          }, 300, 'ease');
          _this.showCtrl.show();
          if (typeof _this.onEnd === 'function') {
            return _this.onEnd();
          }
        });
      }
      tw = this.tip.width();
      th = this.tip.height();
      tTop = 200;
      this.tip.css({
        top: tTop,
        left: vw / 2 - tw / 2
      });
      $('html, body').animate({
        scrollTop: 0
      }, 400);
      return this.tip.css('visibility', 'visible');
    };

    Prezenter.prototype.rotateCursor = function(next) {
      if (this.currentElement.cursorPosition === "left" && this.grid[this.currentStep + next].cursorPosition === "bottom") {
        this.cursor.css({
          rotate: '+=90'
        });
      }
      if (this.currentElement.cursorPosition === "top" && this.grid[this.currentStep + next].cursorPosition === "left") {
        this.cursor.css({
          rotate: '+=90'
        });
      }
      if (this.currentElement.cursorPosition === "top" && this.grid[this.currentStep + next].cursorPosition === "bottom") {
        this.cursor.css({
          rotate: '+=180'
        });
      }
      if (this.currentElement.cursorPosition === "bottom" && this.grid[this.currentStep + next].cursorPosition === "top") {
        this.cursor.css({
          rotate: '-=180'
        });
      }
      if (this.currentElement.cursorPosition === "top" && this.grid[this.currentStep + next].cursorPosition === "right") {
        this.cursor.css({
          rotate: '-=90'
        });
      }
      if (this.currentElement.cursorPosition === "right" && this.grid[this.currentStep + next].cursorPosition === "top") {
        this.cursor.css({
          rotate: '+=90'
        });
      }
      if (this.currentElement.cursorPosition === "left" && this.grid[this.currentStep + next].cursorPosition === "top") {
        this.cursor.css({
          rotate: '-=90'
        });
      }
      if (this.currentElement.cursorPosition === "left" && this.grid[this.currentStep + next].cursorPosition === "right") {
        this.cursor.css({
          rotate: '+=180'
        });
      }
      if (this.currentElement.cursorPosition === "bottom" && this.grid[this.currentStep + next].cursorPosition === "left") {
        this.cursor.css({
          rotate: '-=90'
        });
      }
      if (this.currentElement.cursorPosition === "bottom" && this.grid[this.currentStep + next].cursorPosition === "right") {
        this.cursor.css({
          rotate: '+=90'
        });
      }
      if (this.currentElement.cursorPosition === "right" && this.grid[this.currentStep + next].cursorPosition === "bottom") {
        this.cursor.css({
          rotate: '-=90'
        });
      }
      if (this.currentElement.cursorPosition === "right" && this.grid[this.currentStep + next].cursorPosition === "left") {
        return this.cursor.css({
          rotate: '-=180'
        });
      }
    };

    Prezenter.prototype.markDone = function() {
      return window.localStorage.setItem('prezenter_mark_done', true);
    };

    return Prezenter;

  })();

  root = typeof exports !== "undefined" && exports !== null ? exports : window;

  root.Prezenter = Prezenter;

}).call(this);
