import 'phaser';

export default class PreloaderScene extends Phaser.Scene {
  preload () {
    let progressBar = this.add.graphics();
    let progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(240, 270, 320, 50);

    let width = this.cameras.main.width;
    let height = this.cameras.main.height;

    let loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: 'Loading ...',
      style: {
        font: '20px monospace',
        fill: '#ffffff'
      }
    });
    loadingText.setOrigin(0.5, 0.5);

    let percentText = this.make.text({
      x: width/2,
      y: height / 2 - 5,
      text: '0%',
      style: {
        font:'18px monospace',
        fill: '#ffffff'
      }
    });
    percentText.setOrigin(0.5, 0.5);

    var assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: '',
      style: {
        font: '18px monospace',
        fill: '#ffffff'
      }
    });
    assetText.setOrigin(0.5, 0.5);

    this.load.on('progress', function (value) {
      percentText.setText(parseInt(value* 100) + '%');
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(250, 280, 300 * value, 30);
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
    this.load.spritesheet('player', 'assets/RPG_assets.png', { frameWidth: 16, frameHeight: 1})
  }

  create () {
    this.scene.start('Title');
  }
}
