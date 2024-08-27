import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {ImageService} from "../services/image.service";
import {GroupService} from "../services/group.service";
import {AngularFireAuth} from "@angular/fire/compat/auth";

@Component({
  selector: 'app-disposible',
  templateUrl: './disposable.component.html',
  styleUrls: ['./disposable.component.scss']
})
export class DisposableComponent implements AfterViewInit {
  @ViewChild('video') video!: ElementRef<HTMLVideoElement>;
  @ViewChild('imageCanvas') imageCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('lutCanvas') lutCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('resultCanvas') resultCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('gradientCanvas') gradientCanvas!: ElementRef<HTMLCanvasElement>;

  constructor(
    private imageService: ImageService,
    private groupservice: GroupService,
    private fireAuth: AngularFireAuth,
  ) {
    this.fireAuth.user.subscribe(async currentUser => {
      this.currentEmail = currentUser?.email ?? '';
      this.picturesLeft = await this.groupservice.picturesLeftToTake(currentUser?.email ?? 'no email found')
    });
    const element = document.getElementById('counter');
    if (element)
      element.scrollTop = element.scrollHeight;
  }

  picturesLeft = 0;
  currentEmail = ''

  currentposition = "user";


  ngAfterViewInit() {
    this.setupCamera();
    this.loadLUT('assets/lut.png', 'assets/GRAINOVERLAY.png'); // Load your LUT file
  }

  setupCamera() {
    const videoElement = this.video.nativeElement;

    navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: {
          exact: "user"
        }
      }
    })
      .then((stream) => {
        videoElement.srcObject = stream;
        videoElement.play();
      })
      .catch((err) => {
        console.error("Error accessing the camera: " + err);
      });
  }

  flipCamera() {
    const videoElement = this.video.nativeElement;
    let value = '';

    if (this.currentposition === 'user') {
      value = 'environment'
    } else {
      value = 'user'
    }

    this.currentposition = value;
    navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: {
          exact: value
        }
      }
    })
      .then((stream) => {
        videoElement.srcObject = stream;
        videoElement.play();
      })
      .catch((err) => {
        console.error("Error accessing the camera: " + err);
      });

  }

  async captureAndApplyLUT() {
    const videoElement = this.video.nativeElement;
    const canvasElement = this.imageCanvas.nativeElement;
    const ctx = canvasElement.getContext('2d')!;

    // Capture the current video frame to the canvas
    ctx.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);

    // Apply the LUT effect to the captured image
    this.applyLUT('imageCanvas', 'lutCanvas', 'resultCanvas');
    this.video.nativeElement.classList.add('flash');
    setTimeout(() => {
      this.video.nativeElement.classList.remove('flash');
    }, 100);
    this.imageService.uploadImage(this.resultCanvas.nativeElement.toDataURL());
    this.picturesLeft -= 1;


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
      const gradientCanvas = this.gradientCanvas.nativeElement;
      const gradientContext = gradientCanvas.getContext('2d')!;
      gradientContext.drawImage(gradient, 0, 0, gradientCanvas.width, gradientCanvas.height);
    };
  }


  applyLUT(imageID: string, lutID: string, resultID: string) {
    const imageCanvas = document.getElementById(imageID) as HTMLCanvasElement;
    const lutCanvas = document.getElementById(lutID) as HTMLCanvasElement;
    const resultCanvas = document.getElementById(resultID) as HTMLCanvasElement;

    const imageContext = imageCanvas.getContext("2d")!;
    const lutContext = lutCanvas.getContext('2d')!;
    const resultContext = resultCanvas.getContext('2d')!;

    const imageData = imageContext.getImageData(0, 0, imageCanvas.width, imageCanvas.height);
    const lutData = lutContext.getImageData(0, 0, lutCanvas.width, lutCanvas.height);

    if (imageData) {
      for (let i = 0; i < imageData.data.length; i += 4) {
        const r = Math.floor(imageData.data[i] / 4);
        const g = Math.floor(imageData.data[i + 1] / 4);
        const b = Math.floor(imageData.data[i + 2] / 4);

        const lutX = (b % 8) * 64 + r;
        const lutY = Math.floor(b / 8) * 64 + g;
        const lutIndex = (lutY * lutCanvas.width + lutX) * 4;

        imageData.data[i] = lutData.data[lutIndex];
        imageData.data[i + 1] = lutData.data[lutIndex + 1];
        imageData.data[i + 2] = lutData.data[lutIndex + 2];
      }

      // Draw the LUT-applied image to resultCanvas
      resultContext.putImageData(imageData, 0, 0);

      // Draw the gradient overlay from the gradientCanvas onto the resultCanvas
      resultContext.globalAlpha = 0.5; // Adjust the opacity as needed
      resultContext.drawImage(this.gradientCanvas.nativeElement, 0, 0, resultCanvas.width, resultCanvas.height);
    }


  // Optional: Process or save the resulting image
    // const encoded64 = this.resultCanvas.nativeElement.toDataURL();
    // console.log('Encoded image:', encoded64);
  }
}
