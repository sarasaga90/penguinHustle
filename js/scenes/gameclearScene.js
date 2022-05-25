var gameclearScene = new Phaser.Scene('gameclearScene');

gameclearScene.create = function(){
{
	//Imatge
	this.add.image(this.sys.game.config.width/2, 350, 'gameclearBg');

      bg.on('pointerdown', function(){
         this.scene.start('homeScene');

	}, this);

}
}
