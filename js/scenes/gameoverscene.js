var gameoverScene = new Phaser.Scene('gameoverScene');

lose_Scene.create = function()
{
	//Imatge
	this.add.image(this.sys.game.config.width/2, 350, 'bgGameover');

    //boto reintentar
    this.gameButton = this.add.image(670, 590, 'startButton').setInteractive().setScale(.80);

	this.gameButton.on('pointerdown', function (pointer) {
	this.click.play();
    this.scene.pause();
  	this.scene.start('gameScene01');

	}, this);


	//Botó menu
	this.gameButton = this.add.image(670, 490, 'startButton').setInteractive().setScale(.80);
	this.gameButton.on('pointerdown', function (pointer) {
	this.click.play();
	this.scene.start('homeScene');


	}, this);

};
