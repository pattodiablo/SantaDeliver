
// You can write more code here

/* START OF COMPILED CODE */

class EnemyShield extends Phaser.GameObjects.Sprite {
	
	constructor(scene, x, y, texture, frame) {
		super(scene, x, y, texture || "enemyShield", frame);
		
		/* START-USER-CTR-CODE */
		this.start();
		/* END-USER-CTR-CODE */
	}
	
	/* START-USER-CODE */

	start(){

		this.shieldHitSound = this.scene.sound.add('shieldHit');
		this.shieldDestroySound = this.scene.sound.add('shieldDestroy');
		this.enemyUser = null;
		this.canDebre = true;
		this.glowAnimation();
		this.scale -= 0.1;
		this.currentTint = 0xffebd3;
		this.currenAlphaPower = 0.8;
		this.updateTimer = this.scene.time.addEvent({
			delay: 10,       // ms
			callback: this.customUpdate,
			//args: [],
			callbackScope: this,
			loop: true
		});

	}

	customUpdate(){
		
		if(this.enemyUser !== null){
			this.x = this.enemyUser.x;
			this.y = this.enemyUser.y;
		}
	}	

	hit(){
		this.shieldHitSound.play();
		
		this.setTintFill(0xf6a352,this.currenAlphaPower);
		this.normalTint();
		this.scaleX-=0.1;
	if(this.canDebre){
		for(var i = 0; i<=4; i++){

			const bullet = new Debree(this.scene, this.x+40-20*i, this.y-60);
			this.scene.add.existing(bullet);
			bullet.setScale(0.3);
		}
		}	
	}
		
	setColor(color,alphaPower){
		
		this.currentTint = color;
		this.currenAlphaPower = alphaPower;
	}

	returnTint(){


		this.setTintFill(this.currentTint,this.currenAlphaPower);
		
	}

	beginReload(){
		if(typeof this.scene !== 'undefined'){
			this.canDebre = false;
			this.visible = false;
			this.shieldDestroySound.play();

			
			this.reloadTimer = this.scene.time.addEvent({
				delay: 10000,       // ms
				callback: this.reloadShield,
				//args: [],
				callbackScope: this,
				loop: false
			});
		}
	}

	removeShield(){
		
		this.reloadTimer.remove();
		this.updateTimer.remove();
		this.destroy();
	}

	reloadShield(){
		this.canDebre = true;
		this.visible =  true;
		this.currentTint = 0xffebd3;
		this.enemyUser.enemyLife = 20;
	}

	normalTint(){
		if(typeof this.scene !== 'undefined'){
		this.tinteBack = this.scene.time.addEvent({
			delay: 100,       // ms
			callback: this.returnTint,
			//args: [],
			callbackScope: this,
			loop: false
		});

	}
	}

	glowAnimation(){

		
		this.glowTween = this.scene.tweens.add({
			targets: this,
			scaleX: '+=0.03',
			scaleY: '+=0.03',
			duration: 125,
			repeat: -1,
			yoyo: true,
			loop: true,
			
		});
	

	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
