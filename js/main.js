let config = {
    type: Phaser.AUTO,
    width: 960,
    height: 320,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: [loadingScene, homeScene, gameScene01, gameScene02, gameoverScene],
    title: 'Penguin Hustle',
    backgroundColor: 'ffffff'
};
     
let game = new Phaser.Game(config);

//Variables d'escena
var gameOver;
var isLevelComplete;
var gameClear;