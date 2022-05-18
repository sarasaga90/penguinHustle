let config = {
    type: Phaser.AUTO,
    width: 360,
    height: 640,
    scene: [loadingScene, homeScene, gameScene01, gameScene02, gameoverScene],
    title: 'Penguin Hustle',
    backgroundColor: 'ffffff'
    };
     
    let game = new Phaser.Game(config);