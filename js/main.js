let config = {
    type: Phaser.AUTO,
    //width: 800,
    //height: 600,
    width: 960,
    height: 320,
    // VIGILA!!!! SI ET DEIXES PART DLE CODI, LES PROPIETATS NO CARREGUEN!!!!
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    //scene: [loadingScene, homeScene, gameScene01, gameScene02, gameoverScene],
    scene: [loadingScene, homeScene, gameScene01],
    title: 'Penguin Hustle',
    backgroundColor: 'ffffff'
};
     
let game = new Phaser.Game(config);

/*Config música
var musicConfig = {
    mute: false,
    volume: 1,
    rate: 1,
    detune: 0,
    seek: 0,
    loop: true,
    delay: false,
}

//Variables d'escena
var gameOver;
var startGame;*/

/* 
ENLLOC D'UTILITZAR VARIABLES, SOC MÉS FAN D'UTILITZAR EL THIS. COM VEURÀS EN EL CODI, 
EN AQUELLES ESCENES EN QUE AQUESTA VARIABLE S'UTILITZA MÉS DUN COP 
*/

/*
var player;
var stars;
var bombs;
var platforms;
var cursors;
var score = 0;
var gameOver = false;
var scoreText;
//extra disparar
var bullets;
var lastFired = 0;
var cursors;
var fire;
*/