
// You can write more code here

/* START OF COMPILED CODE */

class Portal extends Phaser.GameObjects.Image {
	
	constructor(scene, x, y, texture, frame) {
		super(scene, x, y, texture || "portal", frame);
		
		this.setOrigin(0.5, 1);
		
		/* START-USER-CTR-CODE */
	
		this.scene.events.once(Phaser.Scenes.Events.UPDATE, this.start, this);
		this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.updateEvent, this);
		this.currentChimney = null;
		this.setBlendMode(Phaser.BlendModes.SCREEN);
		this.scaleY=0.5;
		this.giftsDelivered = 0;
		/* END-USER-CTR-CODE */
	}
	
	/* START-USER-CODE */

	start(){
		this.giftSound = this.scene.sound.add('giftDelivered');
		this.growAnim();
		const arcade = this.scene.physics;
		arcade.add.existing(this);
		const body = this.body;
		arcade.add.overlap(this, this.scene.santaBullets, this.getGift, null, this);

	}

	getGift(portal,gift){
		this.giftSound.play();
		this.scene.giftsNumber.text++;

		console.log('gif delivered');
		this.giftsDelivered++;
		if(typeof gift !=='undefined'){

			const timesHitText = this.scene.add.text(this.x-30, this.y-30, "X"+this.giftsDelivered, {"fontFamily":"Arial","fontSize":"40px","fontStyle":"bold"});
			
			this.growAnim = this.scene.tweens.add({
				targets: timesHitText,
				y: '-=60',
				alpha: 0,
				duration: 400,
				scaleY:'1.8',
				scaleX:'1.5',
				ease: 'Bounce.easeOut',
				onComplete: function () {
					timesHitText.destroy();
				},
				loop: false
			});
		
			

			portal.currentChimney.y+=2;
			portal.currentChimney.chimneyLife--;
			if(portal.currentChimney.chimneyLife<=0){
				portal.body.enable = false;
				portal.visible = false;
				portal.currentChimney.growTimer.remove();
				//portal.currentChimney.growTween.stop();
				portal.currentChimney.setTint(0xe9d2d2,0.1);
				portal.currentChimney.body.gravity.y = 300;
				

			}
			if(typeof gift !== 'undefined'){
			//	gift.updateTimer.remove();	
				gift.destroy();
				this.getGiftAnim();
			}
			
		}
	}

	growAnim(){

		this.growAnim = this.scene.tweens.add({
			targets: this,
			y: '-=40',
			duration: 100,
			ease: 'Bounce.easeOut',
			yoyo: true,
			loop: true
		});
		
		
	}

	getGiftAnim(){

		this.growAnim = this.scene.tweens.add({
			targets: this,
			scaleY: { from: 0.1, to: 0.5 },
			duration: 50,
			ease: 'Bounce.easeOut',
			yoyo: false,
			loop: true
		});
		
		
	}

	updateEvent(){

			if(this.currentChimney !== null){

				this.y = this.currentChimney.y-this.currentChimney.width*3+93	;
			}
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
