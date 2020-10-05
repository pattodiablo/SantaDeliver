
window.addEventListener('load', function () {

	var game = new Phaser.Game({
		width: 640, 
		height: 960,
		type: Phaser.AUTO,
        backgroundColor: "#000000",
		scale: {
			mode: Phaser.Scale.FIT,
			autoCenter: Phaser.Scale.CENTER_BOTH
		}
	});
	
	game.scene.add("Boot", Boot, true);

});

class Boot extends Phaser.Scene {

	preload() {
		
		this.load.pack("pack", "assets/asset-pack.json"); 
	}

	create() {
		
		this.scene.start("Level");
	}

}