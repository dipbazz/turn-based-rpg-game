import config from './Config/config';
import BattleScene from './Scenes/BattleScene';
import BootScene from './Scenes/BootScene';
import GameScene from './Scenes/GameScene';
import PreloaderScene from './Scenes/PreloaderScene';
import TitleScene from './Scenes/TitleScene';
import UIScene from './Scenes/UIScene';

class Game extends Phaser.Game {
  constructor () {
    super(config);
    this.scene.add('Boot', BootScene);
    this.scene.add('Preloader', PreloaderScene);
    this.scene.add('Title', TitleScene);
    this.scene.add('Game', GameScene);
    this.scene.add('Battle', BattleScene);
    this.scene.add('UI', UIScene);

    this.scene.start('Boot');
  }
}

window.game = new Game();
