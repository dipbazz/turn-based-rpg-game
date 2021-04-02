import config from './Config/config';
import BootScene from './Scenes/BootScene';
import PreloaderScene from './Scenes/PreloaderScene';

class Game extends Phaser.Game {
  constructor () {
    super(config);
    this.scene.add('Boot', BootScene);
    this.scene.add('Preloader', PreloaderScene);

    this.scene.start('Boot');
  }
}

window.game = new Game();
