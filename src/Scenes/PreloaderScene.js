import 'phaser';
import config from '../Config/config';

export default class PreloaderScene extends Phaser.Scene {
  preload () {
    let width = config.scale.width;
    let height = config.scale.height;

    let progressBox = this.add.graphics();
    let progressBar = this.add.graphics();
    progressBox.fillStyle(0x222222, 1);
    progressBox.fillRect(width/2 - 75, height/2 - 15, 150, 24);

    let loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 30,
      text: 'Loading ...',
      style: {
        font: '15px monospace',
        fill: '#ffffff'
      }
    });
    loadingText.setOrigin(0.5, 0.5);

    let percentText = this.make.text({
      x: width/2,
      y: height / 2 - 4,
      text: '0%',
      style: {
        font:'14px monospace',
        fill: '#ffffff'
      }
    });
    percentText.setOrigin(0.5, 0.5);

    var assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 30,
      text: '',
      style: {
        font: '14px monospace',
        fill: '#ffffff'
      }
    });
    assetText.setOrigin(0.5, 0.5);

    this.load.on('progress', function (value) {
      percentText.setText(parseInt(value* 100) + '%');
      progressBar.clear();
      progressBar.fillStyle(0x159cef, 1);
      progressBar.fillRect(width/2 + 2.5 - 75, height/2 + 2 -15, 145 * value, 20);
    });

    this.load.on('fileprogress', function (file) {
      assetText.setText('Loading asset: ' + file.key);
    });

    this.load.on('complete', () => {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
    });


    this.load.image('tiles', 'assets/map/spritesheet.png');

    // map in json format
    this.load.tilemapTiledJSON('map', 'assets/map/map.json');

    // our two characters
    this.load.spritesheet('player', 'assets/RPG_assets.png', { frameWidth: 16, frameHeight: 16})

    this.load.image('blueButton1', 'assets/ui/blue_button02.png');
    this.load.image('blueButton2', 'assets/ui/blue_button03.png');
    this.load.image('blueDragon', 'assets/dragonblue.png');
    this.load.image('orangeDragon', 'assets/dragonorange.png');
  }

  create () {
    this.scene.start('Title');
  }
}
