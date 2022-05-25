let config = {
    type: Phaser.AUTO,
    width: 960,
    height: 320,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 350 },
            debug: false
        }
    },
    scene: [loadingScene, homeScene, gameScene01, gameScene02, /*gameclearScene, PER QUE EM PETA SI AFEGEIXO AQUEST?*/ gameoverScene],
    title: 'Penguin Hustle',
    backgroundColor: 'ffffff'
};
     
let game = new Phaser.Game(config);

//Variables
var gameOver;
var isLevelComplete;
var gameClear;