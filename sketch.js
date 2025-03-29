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

   
}

function draw(){
    background(0);

    ambientLight(60);

    ambientLight(0, 0, 60);
    pointLight(0, 255, 255, -250, 0, 250);
    directionalLight(255, 255, 0, 0, 0, -1);
    

      // カメラの設定
        camera(
            // カメラの位置（x, y, z）
            cos(frameCount * 0.5) * 650, // x軸方向に動く
            sin(frameCount * 0.3) * 600, // y軸方向に動く
            sin(frameCount * 0.3) * 1000, // z軸方向に動く
            // カメラが写す画面の中心となる位置（x, y, z）
            0, 0, 0,
            // カメラ自身の向き（x, y, z）
            0, 1, 0
        );


    // X軸に回転させる
    rotateX(frameCount * 0.01);

    // Y軸に回転させる
    rotateY(frameCount * 0.01);

    waveform = fft.waveform();

    let angle = 360 / waveform.length;

    for (let i = 0; i < waveform.length; i++){
        rotateZ(angle);

        //一旦保存
        push();


        //大きさ
        let scaledWaveform = map(waveform[i], -1, 1, 0.1, 0.6); // 値を0.4〜0.6にスケール
        let size = max(scaledWaveform * 450);


        //土星本体
        sphere(size, 100,100);

        //土星の輪
        push()
        noStroke()
        fill(255);
        torus(size+150, 10);
        fill(200);
        torus(size+130, 10);
        pop()

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