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
  aspectRatio = computed(() =>
    ((this.screenWidth() / this.screenHeight()) * 100).toFixed(2)
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
}
