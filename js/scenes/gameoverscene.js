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