import {
  Component,
  HostListener,
  OnInit,
  computed,
  signal,
} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  screenWidth = signal(0);
  screenHeight = signal(0);
  aspectRatio = computed(() => this.screenWidth() / this.screenHeight());
  heightRatio = computed(() => this.screenHeight() / this.screenWidth());

  aspectRatioSimplified = computed(
    () =>
      `${this.simplifyAspectRatio(
        this.screenWidth(),
        this.screenHeight()
      )} ${this.aspectRatio().toFixed(2)}`
  );

  screenSize = computed(() => `${this.screenWidth()}x${this.screenHeight()}`);

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.screenHeight.set(window.innerHeight);
    this.screenWidth.set(window.innerWidth);
  }

  ngOnInit(): void {
    this.onResize();
  }

  // Function to calculate the greatest common divisor (GCD) using the Euclidean algorithm
  gcd(a: number, b: number) {
    while (b !== 0) {
      let temp = b;
      b = a % b;
      a = temp;
    }
    return a;
  }

  // Function to simplify the aspect ratio
  simplifyAspectRatio(width: number, height: number) {
    const divisor = this.gcd(width, height);
    const simplifiedWidth = width / divisor;
    const simplifiedHeight = height / divisor;
    return `${simplifiedWidth}:${simplifiedHeight}`;
  }
}
