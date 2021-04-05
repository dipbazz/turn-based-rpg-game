import 'phaser';
import Enemy from '../Objects/Enemy';
import Player from '../Objects/Player';

export default class BattleScene extends Phaser.Scene {
  constructor () {
    super('Battle')
  }

  create () {
    this.cameras.main.setBackgroundColor('rgba(0, 200, 0, 0.5)');

    let warrior = new Player(this, 250, 50, 'player', 1, 'Warrior', 100, 20);
    this.add.existing(warrior);

    let mage = new Player(this, 250, 100, 'player', 4, 'Mage', 80, 8);
    this.add.existing(mage);

    let dragonblue = new Enemy(this, 50, 50, 'blueDragon', null, 'Dragon', 50, 3);
    this.add.existing(dragonblue);

    let dragonorange = new Enemy(this, 50, 100, 'orangeDragon', null, 'Dragon2', 50, 3);
    this.add.existing(dragonorange);

    this.heroes = [warrior, mage];
    this.ememies = [dragonblue, dragonorange];
    this.units = this.heroes.concat(this.enemies);

    this.scene.launch('UI');
  }
}
