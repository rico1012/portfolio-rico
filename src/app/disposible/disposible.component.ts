import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';

@Component({
  selector: 'app-disposible',
  templateUrl: './disposible.component.html',
  styleUrls: ['./disposible.component.scss']
})
export class DisposibleComponent implements AfterViewInit {
  @ViewChild('video') video!: ElementRef<HTMLVideoElement>;
  @ViewChild('imageCanvas') imageCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('lutCanvas') lutCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('resultCanvas') resultCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('gradientCanvas') gradientCanvas!: ElementRef<HTMLCanvasElement>;

  ngAfterViewInit() {
    this.setupCamera();
    this.loadLUT('assets/lut.png', 'assets/GRAINOVERLAY.png'); // Load your LUT file
  }

  setupCamera() {
    const videoElement = this.video.nativeElement;

    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        videoElement.srcObject = stream;
        videoElement.play();
      })
      .catch((err) => {
        console.error("Error accessing the camera: " + err);
      });
  }

  captureAndApplyLUT() {
    const videoElement = this.video.nativeElement;
    const canvasElement = this.imageCanvas.nativeElement;
    const ctx = canvasElement.getContext('2d')!;

    // Capture the current video frame to the canvas
    ctx.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);

    // Apply the LUT effect to the captured image
    this.applyLUT('imageCanvas', 'lutCanvas', 'resultCanvas');
  }

  loadLUT(lutPath: string, gradientPath: string) {
    const lut = new Image();
    lut.src = lutPath;
    lut.onload = () => {
      const canvas = this.lutCanvas.nativeElement;
      const context = canvas.getContext('2d')!;
      context.drawImage(lut, 0, 0, canvas.width, canvas.height);
    };

    const gradient = new Image();
    gradient.src = gradientPath;
    gradient.onload = () => {
      const canvas = this.gradientCanvas.nativeElement;
      const context = canvas.getContext('2d')!;
      context.drawImage(lut, 0, 0, canvas.width, canvas.height);
    };
  }

  applyLUT(imageID: string, lutID: string, resultID: string) {
    const imageContext = (document.getElementById(imageID) as HTMLCanvasElement)!.getContext("2d");
    const lutContext = (document.getElementById(lutID) as HTMLCanvasElement)!.getContext('2d')!;
    const resultContext = (document.getElementById(resultID) as HTMLCanvasElement)!.getContext('2d')!;
    const imageData = imageContext?.getImageData(0, 0, 640, 480); // Assuming the video frame size
    const lutData = lutContext.getImageData(0, 0, 512, 512);

    if (imageData){
      for (let i = 0; i < imageData.data.length; i += 4) {
        const r = Math.floor(imageData.data[i] / 4);
        const g = Math.floor(imageData.data[i + 1] / 4);
        const b = Math.floor(imageData.data[i + 2] / 4);

        const lutX = (b % 8) * 64 + r;
        const lutY = Math.floor(b / 8) * 64 + g;
        const lutIndex = (lutY * 512 + lutX) * 4;

        imageData.data[i] = lutData.data[lutIndex];
        imageData.data[i + 1] = lutData.data[lutIndex + 1];
        imageData.data[i + 2] = lutData.data[lutIndex + 2];
      }

      resultContext.putImageData(imageData, 0, 0);
    }

    // Optional: Process or save the resulting image
    // const encoded64 = this.resultCanvas.nativeElement.toDataURL();
    // console.log('Encoded image:', encoded64);
  }
}
