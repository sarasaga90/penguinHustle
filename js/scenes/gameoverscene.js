/*

T'HO COMENTO TOT, DONCS FALTA CODI EN LA ESCENA, AQUESTA NO T'ANIRÀ, HA D TENIR EL FORMAT DE LA HOMESCENE O DE LA GAMESCENE01,
DONCS ÉS POT FER DE LES DUES MANERES. JO PREFEREIXO EL FORMAT GAMESCENE01, DONCS ÉS VEU MÉS CLAR TOT PLEGAT.

gameScene.updateStats = function(statDiff) {
 
    var isGameOver = false;
     
    for (stat in statDiff) {
    if (statDiff.hasOwnProperty(stat)) {
    this.stats[stat] += statDiff[stat];
     
    if(this.stats[stat] < 0) {
    isGameOver = true;
    this.stats[stat] = 0;
    }
    }
    }
     
    this.refreshHud();
     
    if(isGameOver) this.gameOver();
    };
     
    gameScene.gameOver = function() {
    console.log('Game over');
    };

*/