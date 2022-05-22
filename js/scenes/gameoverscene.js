
var gameoverScene = new Phaser.Scene('gameoverScene');

lose_Scene.create = function()
{
	//Imatge
	this.add.image(this.sys.game.config.width/2, 350, 'pantalla_gameover');


	/*So
	this.losemusic = this.sound.add('music_loser');
	this.losemusic.play({ loop: true }); */


	//Botó Interactiu
   // this.click = this.sound.add('music_click');

    this.gameButton = this.add.image(670, 590, 'startButton').setInteractive().setScale(.80);

	this.gameButton.on('pointerdown', function (pointer) {

		this.click.play();
	//	this.losemusic.stop();
    this.scene.pause();
  	this.scene.start('gameScene01');


	}, this);

	//Botó Interactiu2
	//	this.click = this.sound.add('music_click');

		this.gameButton = this.add.image(670, 490, 'startButton').setInteractive().setScale(.80);

		this.gameButton.on('pointerdown', function (pointer) {

		this.click.play();
		this.losemusic.stop();

		this.scene.start('homeScene');


		}, this);

};
