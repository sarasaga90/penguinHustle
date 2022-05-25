var gameclearScene = new Phaser.Scene('gameclearScene');

gameclearScene.create = function(){

	var bg = this.add.sprite(0, 0, 'gameclearBg').setInteractive();
	bg.setOrigin(0, 0);

	var gameW = this.sys.game.config.width;
	var gameH = this.sys.game.config.height;

	bg.on('pointerdown', function(){
		this.scene.start('homeScene');
	}, this);
}