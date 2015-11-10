var snowman = {

	toModify: '',

	snowmanElements: {
		hat: [],
		face: [],
		head: [],
		torso: [],
		arms: [],
		base: [],
		scene: []
	},

	current: {
		hat: 0,
		face: 0,
		head: 0,
		torso: 0,
		arms: 0,
		base: 0,
		scene: 0,
	},

	init: function() {
		snowman.toModify = $('.build-toolbar-button-active').data('target');
		snowman.draw();
	},

	draw: function() {
		var canvas = new fabric.Canvas('snowman-canvas');
		var canvasHeight = window.innerHeight - ($('header').height() + $('#build-toolbar').height());
		canvas.setDimensions({width: window.innerWidth, height: canvasHeight});
		canvas.top = 85;

		function getIndexes(snowmanElement, directionToGo){
			if (directionToGo == 'prev') {
				if (snowman.current[snowmanElement] == 0){
					snowman.current[snowmanElement] = snowman.snowmanElements[snowmanElement].length - 1;
					return {
						current: 0,
						next: snowman.snowmanElements[snowmanElement].length - 1
					}
				}
				else {
					snowman.current[snowmanElement] = snowman.current[snowmanElement] - 1;
					return {
						current: snowman.current[snowmanElement] + 1,
						next: snowman.current[snowmanElement] - 1
					}
				}
			}
			else {
				if (snowman.current[snowmanElement] == snowman.snowmanElements[snowmanElement].length - 1){
					snowman.current[snowmanElement] = 0;
					return {
						current: snowman.snowmanElements[snowmanElement].length - 1,
						next: 0
					}
				}
				else {
					snowman.current[snowmanElement] = snowman.current[snowmanElement] + 1;
					return {
						current: snowman.current[snowmanElement] - 1,
						next: snowman.current[snowmanElement] + 1
					}
				}
			}
		}

		// GENERATE SCENES

		var bgClassic = document.getElementById('bg-classic');
		var bgFuture = document.getElementById('bg-future');
		var bgWestern = document.getElementById('bg-western');

		var sceneSources = [bgClassic, bgFuture, bgWestern];

		function generateScenes() {
			for (i = 0; i < sceneSources.length; i++) {
				var canvasWidth = canvas.width;
				var canvasHeight = canvas.height;
				var canvasAspectRatio = canvasWidth / canvasHeight;
				var width = sceneSources[i].width;
				var height = sceneSources[i].height;
				var bgAspectRatio = width / height;
				if (canvasAspectRatio > bgAspectRatio) {
					var scale = (canvasWidth / width);
				}
				else {
					var scale = (canvasHeight / height);
				}
				snowman.snowmanElements.scene[i] = new fabric.Image(sceneSources[i]);
				snowman.snowmanElements.scene[i].selectable = false;
				snowman.snowmanElements.scene[i].setScaleY(scale);
				snowman.snowmanElements.scene[i].setScaleX(scale);
				snowman.snowmanElements.scene[i].setOpacity(0);
				snowman.snowmanElements.scene[i].OriginY = 'center';
				snowman.snowmanElements.scene[i].OriginX = 'center';
				snowman.snowmanElements.scene[i].left = ((canvasWidth - (width * scale)) / 2);
				snowman.snowmanElements.scene[i].top = 0;

				snowman.snowmanElements.scene[i].newOpacity = 0;
				snowman.snowmanElements.scene[0].setOpacity(1);
				canvas.add(snowman.snowmanElements.scene[0]);

			}
		}

		function removeOld(element) {
			canvas.remove(element);
		}

		function changeElement(element, direction) {

			var currentIndex = snowman.current[element];

			if (direction === 'prev') {
				if (currentIndex === 0) {
					var toIndex = snowman.snowmanElements[element].length - 1;
				}
				else {
				var toIndex = snowman.current[element] - 1;
				}
			}
			else {
				if (currentIndex === snowman.snowmanElements[element].length - 1) {
					var toIndex = 0;
				}
				else {
					var toIndex = snowman.current[element] + 1;
				}
			}

			canvas.add(snowman.snowmanElements[element][toIndex]);
			canvas.bringToFront(theSnowman);
			TweenMax.to(snowman.snowmanElements[element][currentIndex], .5, {opacity: 0, onComplete: removeOld, onCompleteParams: [snowman.snowmanElements[element][currentIndex]]});
			TweenMax.to(snowman.snowmanElements[element][toIndex], .5, {opacity: 1});

			snowman.current[element] = toIndex;
		}

		generateScenes();
		
		var base = new fabric.Rect({width: 200, height: 200, top: 200, fill: 'green', originX: 'center', originY: 'center'});
		var torso = new fabric.Rect({width: 100, height: 100, top: 50, fill: 'blue', originX: 'center', originY: 'center'});
		var head = new fabric.Rect({width: 50, height: 50, top: -25, fill: 'teal', originX: 'center', originY: 'center'});

		function getWidthInPercentage(percentage) {
			return canvas.width * (percentage / 100);
		}

		function getHeightInPercentage(percentage) {
			return canvas.height * (percentage / 100);
		}

		var theSnowman = new fabric.Group([base,torso,head]);
		theSnowman.originX = 'center';
		theSnowman.originY = 'bottom';
		theSnowman.selectable = false;
		theSnowman.left = getWidthInPercentage(50);
		theSnowman.top = getHeightInPercentage(70);

		canvas.add(theSnowman);

		$('.build-button').click(function(event){
			if ($(this).is('#build-button-prev')) {
				switch (snowman.toModify) {
					case 'hat':

					break;
					case 'face':

					break;
					case 'head':

					break;
					case 'torso':

					break;
					case 'arms':

					break;
					case 'base':

					break;
					case 'scene':
						changeElement('scene', 'prev');
					default:

				}
			}
			else {
				switch (snowman.toModify) {
					case 'hat':

					break;
					case 'face':

					break;
					case 'head':

					break;
					case 'torso':

					break;
					case 'arms':

					break;
					case 'base':

					break;
					case 'scene':
						changeElement('scene', 'next');
					default:
					
				}
			}
		});

		$(window).click(function(event){
			//TweenMax.to(snowman, 2, {scaleX: 2, scaleY: 2, ease: Power1.easeOut, onUpdate: onUpdateHandler});
			//fall();
			//survive();
		});

		function fall() {

			var fall = new TimelineMax();
			fall.to(snowman, 3, {angle: 90, left: '-=' + (snowman.width / 2), ease: Elastic.easeIn.config(.8,.2)})
				.staggerTo([torso,head], 2.8, {left: '-=100', ease: Elastic.easeIn.config(.8,.2), delay: .2}, .1, '-=3')
				.to(base, 1, {top: '-=' + (base.width / 2), ease: Back.easeOut}, '-=.1')
				.to(base, 1, {angle: 100, ease: Power1.easeOut}, '-=1')
				.to(base, .5, {left: '-=' + (base.width / 1), repeat: 1, yoyo: true}, '-=1.2')
				.to(torso, 1, {top: '+=' + (torso.width * 3), ease: Power1.easeOut}, '-=1.1')
				.to(torso, 2, {angle: 120, scaleX: .8, scaleY: .8, ease: Power1.easeOut}, '-=1.6')
				.to(torso, .5, {left: '-=' + (torso.width / 2), repeat: 1, yoyo: true}, '-=2.2')
				.to(head, .5, {left: '-=' + (head.width * 8), repeat: 1, yoyo: true}, '-=1.4')
				.to(head, .85, {left: '+=' + (head.width * 3)}, '-=.35')
				.to(head, 1, {top: '+=' + (head.width), ease: Power1.easeOut}, '-=1.1')
				.to(head, 1.8, {angle: 1640, scaleX: 1.5, scaleY: 1.5, ease: Power1.easeOut}, '-=1.8')
				.to(head, 1.5, {left: '+= 50', top: '+=25', scaleX: 2.2, scaleY: 2.2, ease: Power1.easeOut}, '+=1.5');
		}

		function survive() {
			var survive = new TimelineMax();
			survive.to(snowman, 3, {angle: 15, repeat: 1, yoyo: true, ease: Elastic.easeIn.config(.8,.2)})
			       .staggerTo([torso,head], 2.8, {left: '+=15', repeat: 1, yoyo: true, ease: Elastic.easeIn.config(.8,.2)}, .1, '-=6');
		}

		function animate() {
			canvas.renderAll();
			window.requestAnimationFrame(animate);
		}

		$(window).resize(function(event){
			// SIZE CANVAS
			var canvasHeight = window.innerHeight - ($('header').height() + $('#build-toolbar').height());
			canvas.setDimensions({width: window.innerWidth, height: canvasHeight});

			// PLACE SNOWMAN
			theSnowman.left = getWidthInPercentage(50);
			theSnowman.top = getHeightInPercentage(70);

			// SIZE BACKGROUNDS
			for (i = 0; i < sceneSources.length; i++) {
				var canvasWidth = canvas.width;
				var canvasHeight = canvas.height;
				var canvasAspectRatio = canvasWidth / canvasHeight;
				var width = sceneSources[i].width;
				var height = sceneSources[i].height;
				var bgAspectRatio = width / height;
				if (canvasAspectRatio > bgAspectRatio) {
					var scale = (canvasWidth / width);
				}
				else {
					var scale = (canvasHeight / height);
				}
				snowman.snowmanElements.scene[i].setScaleY(scale);
				snowman.snowmanElements.scene[i].setScaleX(scale);
				snowman.snowmanElements.scene[i].left = ((canvasWidth - (width * scale)) / 2);
				snowman.snowmanElements.scene[i].top = 0;
			}
		});

		animate();
	},
}

var toolbar = {

	init: function() {
		$('.build-toolbar-button').click(function(){
			$('.build-toolbar-button').not($(this)).removeClass('build-toolbar-button-active');
			$(this).addClass('build-toolbar-button-active');
			snowman.toModify = $(this).data('target');
		});
	}
}

$(window).load(function(){
	snowman.init();
	toolbar.init();
});





