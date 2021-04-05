import 'phaser';
import Enemy from '../Objects/Enemy';
import Player from '../Objects/Player';

export default class BattleScene extends Phaser.Scene {
  constructor () {
    super('Battle')
  }

  create () {
    this.cameras.main.setBackgroundColor('rgba(0, 200, 0, 0.5)');
    this.startBattle();
    this.sys.events.on('wake', this.startBattle, this);

    // let timeEvent = this.time.addEvent({delay: 2000, callback: this.exitBattle, callbackScope: this})

  }

  nextTurn () {
    if(this.checkEndBattle()) {
      this.exitBattle();
      return;
    }

    do {
      this.index ++;

      if(this.index >= this.units.length)
        this.index = 0;
    } while(!this.units[this.index].living);

    // if player
    if(this.units[this.index] instanceof Player) {
      this.events.emit('PlayerSelect', this.index);
    } else { // if enemy
      let r;
      do {
        r = Math.floor(Math.random() * this.heroes.length);
      } while(!this.heroes[r].living)

      this.units[this.index].attack(this.heroes[r]);

      this.time.addEvent({delay: 3000, callback: this.nextTurn, callbackScope: this});
    }
  }

  receivePlayerSelection(action, target) {
    if(action == 'attack') {
      this.units[this.index].attack(this.enemies[target]);
    }
    this.time.addEvent({delay: 3000, callback: this.nextTurn, callbackScope: this})
  }

  exitBattle() {
    this.heroes.length = 0;
    this.enemies.length = 0;

    this.units.forEach( unit => {
      unit.destroy();
    })
    this.units.length = 0;

    this.scene.sleep('UI');
    this.scene.switch('Game');
  }

  wake () {
    this.scene.run('UI');
    this.time.addEvent({delay: 2000, callback: this.exitBattle, callbackScope: this});
  }

  checkEndBattle () {
    let victory = true;

    for (let i=0; i<this.enemies.length; i++) {
      if(this.enemies[i].living) {
        victory = false;
      }
    }

    let gameOver = true;

    for(let i=0; i<this.heroes.length; i++) {
      if(this.heroes[i].living)
        gameOver = false;
    }

    return victory || gameOver;
  }

  startBattle () {
    let warrior = new Player(this, 250, 50, 'player', 1, 'Warrior', 100, 20);
    this.add.existing(warrior);

    let mage = new Player(this, 250, 100, 'player', 4, 'Mage', 80, 8);
    this.add.existing(mage);

    let dragonblue = new Enemy(this, 50, 50, 'blueDragon', null, 'Dragon', 50, 3);
    this.add.existing(dragonblue);

    let dragonorange = new Enemy(this, 50, 100, 'orangeDragon', null, 'Dragon2', 50, 3);
    this.add.existing(dragonorange);

    this.heroes = [warrior, mage];
    this.enemies = [dragonblue, dragonorange];
    this.units = this.heroes.concat(this.enemies);

    this.index = -1;

    this.scene.launch('UI');
  }
}
