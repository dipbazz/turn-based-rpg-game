import 'phaser';

export default class MenuItem extends Phaser.GameObjects.Text {
  constructor(x, y, text, scene) {
    super(scene, x, y, text, {color: '#fff', align: 'left', fontSize: 15});
  }

  select () {
    this.setColor('#f8ff38');
  }

  deselect () {
    this.setColor('#fff');
  }

  unitKilled () {
    this.active = false;
    this.visible = false;
  }
}
