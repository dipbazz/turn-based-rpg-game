import 'phaser';
import config from '../Config/config';
import Button from '../Objects/Button';

export default class TitleScene extends Phaser.Scene {
  constructor () {
    super('Title');
  }

  create () {
    this.playButton = new Button(this, config.scale.width/2, config.scale.height/2, 'blueButton1', 'blueButton2', 'Play', 'Game');
  }
}
