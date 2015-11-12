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


		// DIMENSION HELPERS

		function getWidthInPercentage(percentage) {
			return canvas.width * (percentage / 100);
		}

		function getHeightInPercentage(percentage) {
			return canvas.height * (percentage / 100);
		}


		// SETUP SNOWMAN

		var theSnowman, theSnowmanTorso, theSnowmanHead, base, torso, leftArm, rightArm, head, face, hat;

		theSnowman = new fabric.Group();

		function buildSnowman() {

			base = snowman.snowmanElements.base[snowman.current.base].image;
			torso = snowman.snowmanElements.torso[snowman.current.torso].image;
			//leftArm = snowman.snowmanElements.leftArm[snowman.current.leftArm];
			//rightArm = snowman.snowmanElements.rightArm[snowman.current.rightArm];
			head = snowman.snowmanElements.head[snowman.current.head].image;
			face = snowman.snowmanElements.face[snowman.current.face];
			hat = snowman.snowmanElements.hat[snowman.current.hat];

			theSnowmanTorso = new fabric.Group();
			theSnowmanHead = new fabric.Group();

			//theSnowmanTorso.add(leftArm);
			theSnowmanTorso.add(torso);
			//theSnowmanTorso.add(rightArm);

			theSnowmanHead.add(head);
			//theSnowmanHead.add(face);
			//theSnowmanHead.add(hat);

			theSnowman.add(base);
			theSnowman.add(theSnowmanTorso);
			theSnowman.add(theSnowmanHead);

			theSnowmanTorso.originX = 'center';
			theSnowmanTorso.originY = 'center';
			var torsoHeight = torso.getHeight();
			theSnowmanTorso.top = -.75 * torsoHeight;


			theSnowmanHead.originX = 'center';
			theSnowmanHead.originY = 'center';
			var headHeight = head.getHeight();
			theSnowmanHead.top = -1 * ((torsoHeight * .75) + (headHeight * .75));

			theSnowman.originX = 'center';
			theSnowman.originY = 'bottom';
			theSnowman.selectable = false;
			theSnowman.left = getWidthInPercentage(50);
			theSnowman.top = getHeightInPercentage(50) + (theSnowman.height / 2);

			canvas.add(theSnowman);

			theSnowman.bringToFront();

		}


		// GENERATE SCENES

		var sceneClassic = document.getElementById('scene-classic');
		var sceneFuture = document.getElementById('scene-future');
		var sceneWestern = document.getElementById('scene-western');

		var sceneSources = [sceneClassic, sceneFuture, sceneWestern];

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
				snowman.snowmanElements.scene[i].top = ((canvasHeight - (height * scale)) / 2);

				snowman.snowmanElements.scene[i].newOpacity = 0;
				snowman.snowmanElements.scene[0].setOpacity(1);
				canvas.add(snowman.snowmanElements.scene[0]);

			}
		}


		// GENERATE BASES

		var baseClassic = document.getElementById('base-classic');
		var baseFuture = document.getElementById('base-future');
		var baseWestern = document.getElementById('base-western');

		var baseSources = [baseClassic, baseFuture, baseWestern];

		function generateBases() {
			for (i = 0; i < baseSources.length; i++) {

				snowman.snowmanElements.base[i] = new Object();
				snowman.snowmanElements.base[i].image = new fabric.Image(baseSources[i]);
				snowman.snowmanElements.base[i].image.selectable = false;
				snowman.snowmanElements.base[i].image.setOpacity(0);
				snowman.snowmanElements.base[i].image.OriginY = 'center';
				snowman.snowmanElements.base[i].image.OriginX = 'center';
				snowman.snowmanElements.base[i].image.setScaleX(.2);
				snowman.snowmanElements.base[i].image.setScaleY(.2);
				var width = snowman.snowmanElements.base[i].image.getWidth();
				snowman.snowmanElements.base[i].image.left = -.5 * width;

				snowman.snowmanElements.base[i].strength = $(baseSources[i]).attr('strength');

				snowman.snowmanElements.base[i].image.newOpacity = 0;
				snowman.snowmanElements.base[0].image.setOpacity(1);
			}
		}


		// GENERATE ARMS

		var armsClassic = document.getElementById('arms-classic');
		var armsFuture = document.getElementById('arms-future');
		var armsWestern = document.getElementById('arms-western');

		var armsSources = [armsClassic, armsFuture, armsWestern];

		function generateArms() {
			for (i = 0; i < armsSources.length; i++) {

				snowman.snowmanElements.arms[i] = new fabric.Image(armsSources[i]);
				snowman.snowmanElements.arms[i].selectable = false;
				snowman.snowmanElements.arms[i].setOpacity(0);
				snowman.snowmanElements.arms[i].OriginY = 'center';
				snowman.snowmanElements.arms[i].OriginX = 'center';

				snowman.snowmanElements.arms[i].newOpacity = 0;
				snowman.snowmanElements.arms[0].setOpacity(1);
			}
		}


		// GENERATE TORSOS

		var torsoClassic = document.getElementById('torso-classic');
		var torsoFuture = document.getElementById('torso-future');
		var torsoWestern = document.getElementById('torso-western');

		var torsoSources = [torsoClassic, torsoFuture, torsoWestern];

		function generateTorsos() {

			for (i = 0; i < torsoSources.length; i++) {

				snowman.snowmanElements.torso[i] = new Object();
				snowman.snowmanElements.torso[i].image = new fabric.Image(torsoSources[i]);
				snowman.snowmanElements.torso[i].image.selectable = false;
				snowman.snowmanElements.torso[i].image.setOpacity(0);
				snowman.snowmanElements.torso[i].image.OriginY = 'center';
				snowman.snowmanElements.torso[i].image.OriginX = 'center';
				snowman.snowmanElements.torso[i].image.setScaleX(.2);
				snowman.snowmanElements.torso[i].image.setScaleY(.2);
				var width = snowman.snowmanElements.torso[i].image.getWidth();
				snowman.snowmanElements.torso[i].image.left = -.5 * width;

				snowman.snowmanElements.torso[i].weight = $(torsoSources[i]).attr('weight');

				snowman.snowmanElements.torso[i].image.newOpacity = 0;
				snowman.snowmanElements.torso[0].image.setOpacity(1);
			}
		}


		// GENERATE HEADS

		var headClassic = document.getElementById('head-classic');
		var headFuture = document.getElementById('head-future');
		var headWestern = document.getElementById('head-western');

		var headSources = [headClassic, headFuture, headWestern];

		function generateHeads() {
			for (i = 0; i < headSources.length; i++) {

				snowman.snowmanElements.head[i] = new Object();
				snowman.snowmanElements.head[i].image = new fabric.Image(headSources[i]);
				snowman.snowmanElements.head[i].image.selectable = false;
				snowman.snowmanElements.head[i].image.setOpacity(0);
				snowman.snowmanElements.head[i].image.OriginY = 'center';
				snowman.snowmanElements.head[i].image.OriginX = 'center';
				snowman.snowmanElements.head[i].image.setScaleX(.2);
				snowman.snowmanElements.head[i].image.setScaleY(.2);
				var width = snowman.snowmanElements.head[i].image.getWidth();
				snowman.snowmanElements.head[i].image.left = -.5 * width;

				snowman.snowmanElements.head[i].image.newOpacity = 0;
				snowman.snowmanElements.head[0].image.setOpacity(1);
			}
		}

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
			TweenMax.to(snowman.snowmanElements[element][currentIndex], .75, {opacity: 0, onComplete: removeOld, onCompleteParams: [snowman.snowmanElements[element][currentIndex]]});
			TweenMax.to(snowman.snowmanElements[element][toIndex], .75, {opacity: 1});

			snowman.current[element] = toIndex;
		}


		// GENERATE FUNCTION CALLS

		generateScenes();
		generateBases();
		//generateArms();
		generateTorsos();
		generateHeads();
		buildSnowman();
		

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
			fall();
			//survive();
		});

		function fall() {

			var fall = new TimelineMax();
			fall.to(theSnowman, 3, {angle: 90, left: '-=' + (theSnowman.width / 2), ease: Elastic.easeIn.config(.8,.2)})
				.staggerTo([theSnowmanTorso,theSnowmanHead], 2.8, {left: '-=100', ease: Elastic.easeIn.config(.8,.2), delay: .2}, .1, '-=3')
				.to(base, 1, {top: '-=' + (base.width / 2), ease: Back.easeOut}, '-=.1')
				.to(base, 1, {angle: 100, ease: Power1.easeOut}, '-=1')
				.to(base, .5, {left: '-=' + (base.width / 1), repeat: 1, yoyo: true}, '-=1.2')
				.to(theSnowmanTorso, 1, {top: '+=' + (theSnowmanTorso.width * 3), ease: Power1.easeOut}, '-=1.1')
				.to(theSnowmanTorso, 2, {angle: 120, scaleX: .8, scaleY: .8, ease: Power1.easeOut}, '-=1.6')
				.to(theSnowmanTorso, .5, {left: '-=' + (theSnowmanTorso.width / 2), repeat: 1, yoyo: true}, '-=2.2')
				.to(theSnowmanHead, .5, {left: '-=' + (theSnowmanHead.width * 8), repeat: 1, yoyo: true}, '-=1.4')
				.to(theSnowmanHead, .85, {left: '+=' + (theSnowmanHead.width * 3)}, '-=.35')
				.to(theSnowmanHead, 1, {top: '+=' + (theSnowmanHead.width), ease: Power1.easeOut}, '-=1.1')
				.to(theSnowmanHead, 1.8, {angle: 1640, scaleX: 1.5, scaleY: 1.5, ease: Power1.easeOut}, '-=1.8')
				.to(theSnowmanHead, 1.5, {left: '+= 50', top: '+=25', scaleX: 2.2, scaleY: 2.2, ease: Power1.easeOut}, '+=1.5');
		}

		function survive() {
			var survive = new TimelineMax();
			survive.to(theSnowman, 3, {angle: 15, repeat: 1, yoyo: true, ease: Elastic.easeIn.config(.8,.2)})
			       .staggerTo([theSnowmanTorso,theSnowmanHead], 2.8, {left: '+=15', repeat: 1, yoyo: true, ease: Elastic.easeIn.config(.8,.2)}, .1, '-=6');
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
				snowman.snowmanElements.scene[i].top = ((canvasHeight - (height * scale)) / 2);
			}
		});

		animate();
	}
}

var snowmanHistory = {

	object: {
		title: 'initial'
	},

	url: '/#intro',

	currentState: history.state,

	init: function() {

		window.history.pushState(snowmanHistory.object, '', 'http://10.0.10.43:3000' + snowmanHistory.url);

		window.addEventListener('popstate', function(event){
			event.preventDefault();
			if(history.state === null) {
				willPromptReload = false;
				$('#leave-modal').addClass('leave-modal-active');
				$('#leave').click(function(){
					history.back();
				});
				$('#stay').click(function(){
					$('#leave-modal').removeClass('leave-modal-active');
					history.forward();
					$('#leave').unbind('click');
					$('#stay').unbind('click');
				});
			}
		});
	},

	fire: function() {
		window.history.pushState(history.object, '', snowmanHistory.url);
	}
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
	snowmanHistory.init();
});





