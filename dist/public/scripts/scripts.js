var snowman = {

	canvas: '',

	isSharePosition: false,

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

	scale: '',

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


	//---------- SNOWMAN DRAW FUNCTIONS --------------------------//

	draw: function() {
		var canvas = new fabric.Canvas('snowman-canvas');
		snowman.canvas = canvas;
		var canvasHeight = window.innerHeight - ($('header').height() + $('#build-toolbar').height());
		canvas.setDimensions({width: window.innerWidth, height: canvasHeight});
		canvas.top = 85;
		canvas.renderOnAddRemove = false;


		// DIMENSION HELPERS

		function getHeightInPercentage(percentage) {
			return canvas.height * (percentage / 100);
		}

		function getWidthInPercentage(percentage) {
			return canvas.width * (percentage / 100);
		}


		// SETUP SNOWMAN

		var theSnowman, theSnowmanTorso, theSnowmanHead, base, torso, leftArm, rightArm, head, face, hat, totalSnowmanHeight;

		theSnowman = new fabric.Group();

		function buildSnowman() {

			theSnowman.forEachObject(function(i){
				theSnowman.remove(i);
			});

			base = snowman.snowmanElements.base[snowman.current.base].image;
			torso = snowman.snowmanElements.torso[snowman.current.torso].image;
			leftArm = snowman.snowmanElements.arms[snowman.current.arms].left;
			rightArm = snowman.snowmanElements.arms[snowman.current.arms].right;
			head = snowman.snowmanElements.head[snowman.current.head].image;
			face = snowman.snowmanElements.face[snowman.current.face];
			hat = snowman.snowmanElements.hat[snowman.current.hat];

			theSnowmanTorso = new fabric.Group();
			theSnowmanHead = new fabric.Group();

			theSnowmanTorso.add(leftArm);
			theSnowmanTorso.add(torso);
			theSnowmanTorso.add(rightArm);

			theSnowmanHead.add(head);
			theSnowmanHead.add(face);
			theSnowmanHead.add(hat);

			theSnowman.add(base);
			theSnowman.add(theSnowmanTorso);
			theSnowman.add(theSnowmanHead);

			var baseWidth = base.getWidth();
			var baseHeight = base.getHeight();
			base.left = -.5 * baseWidth;

			theSnowmanTorso.originX = 'center';
			theSnowmanTorso.originY = 'center';
			var torsoHeight = torso.getHeight();
			var torsoWidth = torso.getWidth();
			theSnowmanTorso.top = -.75 * torsoHeight;
			theSnowmanTorso.left = -.5 * torsoWidth;

			var leftArmWidth = leftArm.getWidth();
			var leftArmHeight = leftArm.getHeight();
			var rightArmWidth = rightArm.getWidth();
			var rightArmHeight = rightArm.getHeight();


			// MODIFY HEAD

			theSnowmanHead.forEachObject(function(i){
				i.setScaleX(.2);
				i.setScaleY(.2);
			});

			var headHeight = head.getHeight();
			var headWidth = head.getWidth();
			var faceHeight = face.getHeight();
			var faceWidth = snowman.snowmanElements.face[snowman.current.face].getWidth();	

			face.top = (headHeight / 2) - (faceHeight / 2);
			face.left = -1 * (faceWidth / 2);

			var hatHeight = hat.getHeight();
			var hatWidth = hat.getWidth();
			if (snowman.current.hat === 0){
				switch (snowman.current.head) {
					case 0:
						hat.top = -1 * ((headHeight / 2.5) + (hatHeight / 2));
						hat.left = -1 * (hatWidth / 2.1);
					break;
					case 1:
						hat.top = -1 * ((headHeight / 2.85) + (hatHeight / 2));
						hat.left = -1 * (hatWidth / 2.15);
					break;
					case 2:
						hat.top = -1 * ((headHeight / 2.75) + (hatHeight / 2));
						hat.left = -1 * (hatWidth / 2.3);
					break;
					default:
				}
			}
			else {
				hat.top = -1 * ((headHeight / 2.1) + (hatHeight / 2));
				hat.left = -1 * (hatWidth / 2.1);
			}

			theSnowmanHead.originX = 'center';
			theSnowmanHead.originY = 'center';
			head.left = -.5 * headWidth;
			theSnowmanHead.top = -1 * ((torsoHeight * .75) + (headHeight * .75));


			// SPECIAL CASES 

			switch (snowman.current.torso) {
				case 0:
					leftArm.top = -1 * (torsoHeight / 1.4);
					leftArm.left = -1 * ((torsoWidth / 2) + (leftArmWidth / 2));
					rightArm.top = -1 * (torsoHeight / 2);
					rightArm.left = (torsoWidth / 1.2);
					if (snowman.current.head ===1) {
						theSnowmanHead.left = 6;
						theSnowmanHead.top = -1 * ((torsoHeight * .75) + (headHeight * .75)) - 8;
					}
				break;
				case 1:
					leftArm.top = -1 * (torsoHeight / 2);
					leftArm.left = -1 * (torsoWidth - (leftArmWidth / 9));
					rightArm.top = -1 * (torsoHeight / 2.75);
					rightArm.left = (torsoWidth / 1.2);
					if (snowman.current.head === 1) {
						theSnowmanHead.top =  -1 * ((torsoHeight * .75) + (headHeight * .92));
					}
					else {
						theSnowmanHead.top =  -1 * ((torsoHeight * .75) + (headHeight * .8));
					}
				break;
				case 2:
					if (snowman.current.arms === 1) {
						leftArm.top = -1 * (torsoHeight / 1.8);
						leftArm.left = -1 * (torsoWidth / 1.05);
						rightArm.top = -1 * (torsoHeight / 2.75);
					}
					else {
						leftArm.top = -1 * (torsoHeight / 2);
						leftArm.left = -1 * torsoWidth;
						rightArm.top = -1 * (torsoHeight / 2.75);
					}
					rightArm.left = (torsoWidth / 1.3);
					if (snowman.current.head != 1) {
						theSnowmanHead.top =  -1 * ((torsoHeight * .75) + (headHeight * .6));
					}
					else {
						theSnowmanHead.top =  -1 * ((torsoHeight * .75) + (headHeight * .7));
					}
				break;
				default:
			}

			if (snowman.current.arms === 1) {
				leftArm.bringToFront(theSnowmanTorso);
			}

			if (snowman.current.head === 1) {
				theSnowmanHead.sendToBack(theSnowman);
			}

			totalSnowmanHeight = (baseHeight + torsoHeight + headHeight + hatHeight) / 1.1;

			// PLACE SNOWMAN

			scaleSnowman();

			theSnowman.originX = 'center';
			theSnowman.originY = 'bottom';
			theSnowman.selectable = false;
			theSnowman.top = getHeightInPercentage(52);

			canvas.add(theSnowman);
			theSnowman.centerH();
		}

		function scaleSnowman() {
			snowman.scale = (canvasHeight * .85) / totalSnowmanHeight;
			TweenMax.to(theSnowman, 1, {scaleY: snowman.scale, scaleX: snowman.scale, onUpdate: render});	
		}


		function setupSnowmanElement(element, index, sourceToPullOne, sourceToPullTwo) {

			if (element === 'base' || element === 'torso' || element === 'head') {
				snowman.snowmanElements[element][index] = new Object();
				snowman.snowmanElements[element][index].image = new fabric.Image(sourceToPullOne[index]);
				snowman.snowmanElements[element][index].image.selectable = false;
				snowman.snowmanElements[element][index].image.setOpacity(0);
				snowman.snowmanElements[element][index].image.OriginY = 'center';
				snowman.snowmanElements[element][index].image.OriginX = 'center';
				snowman.snowmanElements[element][index].image.setScaleX(.2);
				snowman.snowmanElements[element][index].image.setScaleY(.2);

				if (element === 'base'){
					snowman.snowmanElements[element][index].strength = $(sourceToPullOne[index]).data('strength');
				}
				else {
					snowman.snowmanElements[element][index].weight = $(sourceToPullOne[index]).data('weight');
				}

				snowman.snowmanElements[element][index].image.newOpacity = 0;
				snowman.snowmanElements[element][0].image.setOpacity(1);
			}
			else {
				if (element === 'arms') {
					snowman.snowmanElements[element][index] = new Object();
					snowman.snowmanElements[element][index].left = new fabric.Image(sourceToPullOne[index]);
					snowman.snowmanElements[element][index].left.selectable = false;
					snowman.snowmanElements[element][index].left.setOpacity(0);
					snowman.snowmanElements[element][index].left.OriginY = 'center';
					snowman.snowmanElements[element][index].left.OriginX = 'center';
					snowman.snowmanElements[element][index].left.setScaleX(.2);
					snowman.snowmanElements[element][index].left.setScaleY(.2);

					snowman.snowmanElements[element][index].left.newOpacity = 0;
					snowman.snowmanElements[element][0].left.setOpacity(1);

					snowman.snowmanElements[element][index].right = new fabric.Image(sourceToPullTwo[index]);
					snowman.snowmanElements[element][index].right.selectable = false;
					snowman.snowmanElements[element][index].right.setOpacity(0);
					snowman.snowmanElements[element][index].right.OriginY = 'center';
					snowman.snowmanElements[element][index].right.OriginX = 'center';
					snowman.snowmanElements[element][index].right.setScaleX(.2);
					snowman.snowmanElements[element][index].right.setScaleY(.2);

					snowman.snowmanElements[element][index].right.newOpacity = 0;
					snowman.snowmanElements[element][0].right.setOpacity(1);
				}
				else {
					snowman.snowmanElements[element][index] = new fabric.Image(sourceToPullOne[index]);
					snowman.snowmanElements[element][index].selectable = false;
					snowman.snowmanElements[element][index].setOpacity(0);
					snowman.snowmanElements[element][index].OriginY = 'center';
					snowman.snowmanElements[element][index].OriginX = 'center';
					snowman.snowmanElements[element][index].setScaleX(.2);
					snowman.snowmanElements[element][index].setScaleY(.2);

					snowman.snowmanElements[element][index].newOpacity = 0;
					snowman.snowmanElements[element][0].setOpacity(1);
				}
			}

		}


		// GENERATE SCENES

		function generateScenes() {
			$('.background-slide').each(function(index){
				snowman.snowmanElements.scene[index] = $(this);
			});
			snowman.snowmanElements.scene[0].css({
				'opacity': 1,
				'visibility': 'visible'
			});
		}


		// GENERATE BASES

		var baseClassic = document.getElementById('base-classic');
		var baseFuture = document.getElementById('base-future');
		var baseWestern = document.getElementById('base-western');

		var baseSources = [baseClassic, baseFuture, baseWestern];

		function generateBases() {
			for (i = 0; i < baseSources.length; i++) {
				setupSnowmanElement('base', i, baseSources);
			}
		}


		// GENERATE ARMS

		var leftArmClassic = document.getElementById('left-arm-classic');
		var leftArmFuture = document.getElementById('left-arm-future');
		var leftArmWestern = document.getElementById('left-arm-western');

		var rightArmClassic = document.getElementById('right-arm-classic');
		var rightArmFuture = document.getElementById('right-arm-future');
		var rightArmWestern = document.getElementById('right-arm-western');

		var leftArmSources = [leftArmClassic, leftArmFuture, leftArmWestern];
		var rightArmSources = [rightArmClassic, rightArmFuture, rightArmWestern];

		function generateArms() {
			for (i = 0; i < leftArmSources.length; i++) {
				setupSnowmanElement('arms', i, leftArmSources, rightArmSources);
			}
		}


		// GENERATE TORSOS

		var torsoClassic = document.getElementById('torso-classic');
		var torsoFuture = document.getElementById('torso-future');
		var torsoWestern = document.getElementById('torso-western');

		var torsoSources = [torsoClassic, torsoFuture, torsoWestern];

		function generateTorsos() {

			for (i = 0; i < torsoSources.length; i++) {
				setupSnowmanElement('torso', i, torsoSources);
			}
		}


		// GENERATE HEADS

		var headClassic = document.getElementById('head-classic');
		var headFuture = document.getElementById('head-future');
		var headWestern = document.getElementById('head-western');

		var headSources = [headClassic, headFuture, headWestern];

		function generateHeads() {
			for (i = 0; i < headSources.length; i++) {
				setupSnowmanElement('head', i, headSources);
			}
		}


		// GENERATE FACES

		var faceClassic = document.getElementById('face-classic');
		var faceFuture = document.getElementById('face-future');
		var faceWestern = document.getElementById('face-western');

		var faceSources = [faceClassic, faceFuture, faceWestern];

		function generateFaces() {
			for (i = 0; i < faceSources.length; i++) {
				setupSnowmanElement('face', i, faceSources);
			}
		}

		// GENERATE HATS

		var hatClassic = document.getElementById('hat-classic');
		var hatFuture = document.getElementById('hat-future');
		var hatWestern = document.getElementById('hat-western');

		var hatSources = [hatClassic, hatFuture, hatWestern];

		function generateHats() {
			for (i = 0; i < hatSources.length; i++) {
				setupSnowmanElement('hat', i, hatSources);
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

		function removeOld(element, snowmanElement) {
			switch (snowmanElement.toString()) {
				case 'hat':
					theSnowmanHead.remove(element);
				break;
				case 'face':
					theSnowmanHead.remove(element);
				break;
				case 'head':
					theSnowmanHead.remove(element.image);
				break;
				case 'torso':
					theSnowmanTorso.remove(element.image);
				break;
				case 'arms':
					theSnowmanTorso.remove(element.left);
					theSnowmanTorso.remove(element.right);
				break;
				case 'base':
					theSnowman.remove(element.image);
				break;
				case 'scene':
					canvas.remove(element);
				break;
				default:
			}
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

			snowman.current[element] = toIndex;

			if (element === 'scene') {
				TweenMax.to(snowman.snowmanElements[element][currentIndex], .75, {autoAlpha: 0});
				TweenMax.to(snowman.snowmanElements[element][toIndex], .75, {autoAlpha: 1});
			}
			else if (element === 'arms') {
				TweenMax.to(snowman.snowmanElements[element][currentIndex].left, .75, {opacity: 0, onUpdate: render ,  onComplete: removeOld, onCompleteParams: [snowman.snowmanElements[element][currentIndex], element]});
				TweenMax.to(snowman.snowmanElements[element][toIndex].left, .75, {opacity: 1});
				TweenMax.to(snowman.snowmanElements[element][currentIndex].right, .75, {opacity: 0, onComplete: removeOld, onCompleteParams: [snowman.snowmanElements[element][currentIndex], element]});
				TweenMax.to(snowman.snowmanElements[element][toIndex].right, .75, {opacity: 1});
			}
			else if (element != 'base' && element != 'torso' && element != 'head') {
				TweenMax.to(snowman.snowmanElements[element][currentIndex], .75, {opacity: 0, onUpdate: render, onComplete: removeOld, onCompleteParams: [snowman.snowmanElements[element][currentIndex], element]});
				TweenMax.to(snowman.snowmanElements[element][toIndex], .75, {opacity: 1});
			}
			else {
				TweenMax.to(snowman.snowmanElements[element][currentIndex].image, .75, {opacity: 0, onUpdate: render, onComplete: removeOld, onCompleteParams: [snowman.snowmanElements[element][currentIndex], element]});
				TweenMax.to(snowman.snowmanElements[element][toIndex].image, .75, {opacity: 1});
			}
			buildSnowman();
		}


		// GENERATE FUNCTION CALLS

		generateScenes();
		generateBases();
		generateArms();
		generateTorsos();
		generateHeads();
		generateFaces();
		generateHats();
		buildSnowman();
		scaleSnowman();
		

		$('.build-button').click(function(event){
			var direction = $(this).data('direction');
			switch (snowman.toModify) {
				case 'hat':
					changeElement('hat', direction);
				break;
				case 'face':
					changeElement('face', direction);
				break;
				case 'head':
					changeElement('head', direction);
				break;
				case 'torso':
					changeElement('torso', direction);
				break;
				case 'arms':
					changeElement('arms', direction);
				break;
				case 'base':
					changeElement('base', direction);
				break;
				case 'scene':
					changeElement('scene', direction);
				break;
			}
					
		});


		$('.js-to-share-mode').click(function(event){
			snowman.isSharePosition = true;
			testSnowman();
		});

		function testSnowman() {

			$('#build-scene').addClass('build-scene-inactive');
			$('#build-toolbar').addClass('build-toolbar-inactive');
			$('.js-to-share-mode').addClass('cta-hidden');

			var strength = snowman.snowmanElements.base[snowman.current.base].strength;
			var torsoWeight = snowman.snowmanElements.torso[snowman.current.torso].weight;
			var headWeight = snowman.snowmanElements.head[snowman.current.head].weight;

			if (strength >= (torsoWeight + headWeight)) {
				survive();
			}
			else {
				console.log('die');
			}
		}

		function dieHorribly() {

			var fall = new TimelineMax({onUpdate: render, onComplete: toEndCondition, onCompleteParams: ['fail']});
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
				fall.onUpdate = render;
		}

		function survive() {
			var survive = new TimelineMax({onUpdate: render, onComplete: toEndCondition, onCompleteParams: ['success']});
			survive.to(theSnowman, 3, {angle: 15, repeat: 1, yoyo: true, ease: Elastic.easeIn.config(.8,.2)})
			       .staggerTo([theSnowmanTorso,theSnowmanHead], 2.8, {left: '+=15', repeat: 1, yoyo: true, ease: Elastic.easeIn.config(.8,.2)}, .1, '-=6');
		}

		function toEndCondition(condition) {

			$('.js-back-to-build-mode').removeClass('cta-hidden');
			$('#build-toolbar').addClass('build-toolbar-excels-cta');
			$('#build-toolbar').removeClass('build-toolbar-inactive');

			function toSuccess() {
				snowman.isSharePosition = true;
				TweenMax.to(theSnowman, .75, {left: getWidthInPercentage(15) + (base.width * base.scaleX / 2), ease: Back.easeInOut, onUpdate: render});
				$('#success-scene-title').removeClass('success-title-inactive');
			}

			function toFailure() {

			}

			if (condition === 'success') {
				toSuccess();
			}
			else {
				toFail();
			}

			$('.js-back-to-build-mode').one('click', function(event){
				$('#build-scene').removeClass('build-scene-inactive');
				$('#build-toolbar').removeClass('build-toolbar-inactive build-toolbar-excels-cta');
				$('.js-to-share-mode').removeClass('cta-hidden');
				$('.js-back-to-build-mode').addClass('cta-hidden');
				$('#success-scene-title').addClass('success-title-inactive');
				snowman.isSharePosition = false;
				TweenMax.to(theSnowman, .75, {left: getWidthInPercentage(50), ease: Back.easeInOut, onUpdate: render});
			});

		}

		function render() {
			canvas.renderAll();
		}

		$(window).resize(function(event){

			// SIZE CANVAS
			canvasHeight = window.innerHeight - ($('header').height() + $('#build-toolbar').height());
			canvas.setDimensions({width: window.innerWidth, height: canvasHeight});

			// PLACE SNOWMAN
			if (snowman.isSharePosition) {
				theSnowman.left = getWidthInPercentage(15) + (base.width * base.scaleX / 2);
			}
			else {
				theSnowman.centerH();
			}
			theSnowman.top = getHeightInPercentage(52);
			scaleSnowman();

		});

		render();

		$('.js-to-build-mode').click(function(event){
			$('header').removeClass('header-intro');
			TweenMax.to('#intro-scene', .5, {autoAlpha: 0});
			snowmanHistory.object.title = 'build';
			snowmanHistory.fire();
		});

		window.addEventListener('popstate', function(event){
			event.preventDefault();
			$('#leave-modal').addClass('leave-modal-active');
			if (snowmanHistory.currentState.title) {
				if(snowmanHistory.currentState.title === 'build') {
					$('#leave-modal').addClass('leave-modal-active');
					$('#leave').click(function(){
						history.go(-1);
					});
					$('#stay').click(function(){
						$('#leave-modal').removeClass('leave-modal-active');
						history.forward();
						$('#leave').unbind('click');
						$('#stay').unbind('click');
					});
				}
				else {
					return true;
				}
			}
			else {
				return true;
			}
		});
	},

	//---------- END SNOWMAN DRAW FUNCTIONS --------------------------//



	//---------- SNOWMAN HISTORY FUNCTIONS ----------------------//


	toBuildMode: {

		backToBuildMode: function() {
			snowman.isSharePosition = true;
			$('#build-scene').toggleClass('build-scene-inactive');
			$('#build-toolbar').removeClass('build-toolbar-excels-cta build-toolbar-inactive');
			$('.js-to-share-mode').toggleClass('cta-hidden');
			$('.js-back-to-build-mode').toggleClass('cta-hidden');
			$('.js-back-to-build-mode').unbind('click');
			$('#success-scene-title').addClass('success-title-inactive');
			$('#failure-scene-title').addClass('failure-title-inactive');
		}
	},
}

//===========================================================//
//========== GLOBAL FUNCTIONS ===============================//
//===========================================================//

var snowmanHistory = {

	object: {
		title: 'initial'
	},


	url: '',

	currentState: history.state,

	fire: function() {
		window.history.pushState(history.object, '', snowmanHistory.url);
		snowmanHistory.currentState = snowmanHistory.object;
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
});





