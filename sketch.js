let sound;
let fft;
let amp;
let waveform;
let angle = 0;

function preload(){
    sound = loadSound('../../asset/sound/sample.mp3');
}

function setup(){
    createCanvas(windowWidth, windowHeight,WEBGL);

    angleMode(DEGREES);

    fft = new p5.FFT(0.8, 32);

    //音量制限
    sound.amp(0.2);

    noStroke();
}

function draw(){
    background(240);

     //60度かたむける（X軸）
     rotateX(60);

    waveform = fft.waveform();

    let angle = 360 / waveform.length;

    for (let i = 0; i < waveform.length; i++){
        rotateZ(angle);

        //一旦保存
        push();

        //座標の基準を移動する
        translate(150, 0, 0);

        //大きさ
        let size = waveform[i] *60;

        if(size>50){
            fill(0,220,220);
        }
        else{
            fill(0,220,220);
        }

        sphere(size, 100,100);

        //一時保存を呼び出す
        pop();
    }
}

function mouseClicked(){
    if (sound.isPlaying()) {
        sound.pause();
    }
    else {
        sound.loop();
    }
}

// ウィンドウサイズが変更されたときにキャンバスのサイズを変更する
function windowResized(){
    resizeCanvas(windowWidth, windowHeight);
}

// space キーを押すとフルスクリーンになる
// space キーをもう一度押すとフルスクリーンが解除される
// フルスクリーンの状態を切り替える
function keyPressed(){
    if (keyCode === 32) {
        let fs = fullscreen();
        fullscreen(!fs);
    }
}