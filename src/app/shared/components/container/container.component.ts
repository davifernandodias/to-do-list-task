import { Component, Renderer2 } from '@angular/core';
import { TaskComponent } from "../task/task.component";

@Component({
  selector: 'app-container',
  standalone: true,
  imports: [TaskComponent],
  templateUrl: './container.component.html',
  styleUrl: './container.component.scss'
})
export class ContainerComponent {

  isCircleMoved = false;
  isButtonShrunk = false;

  constructor(private renderer: Renderer2) {}


  isIllustreFaded = false;


  toggleIllustreFade() {
    this.isIllustreFaded = !this.isIllustreFaded;

    const illustreImg = document.querySelector('.illustre-img');


    if (illustreImg) {
      if (this.isIllustreFaded) {
        this.renderer.addClass(illustreImg, 'fade-out');
      } else {
        this.renderer.removeClass(illustreImg, 'fade-out');
      }
    }
  }


  moveCircleAndShrinkButton() {

    this.isCircleMoved = !this.isCircleMoved;
    this.isButtonShrunk = !this.isButtonShrunk;


    const circleContainer = document.querySelector('.circle-container');
    const button = document.querySelector('.button');


    if (circleContainer) {
      if (this.isCircleMoved) {
        this.renderer.addClass(circleContainer, 'move-center');
        setTimeout(() => {
          this.renderer.removeClass(circleContainer, 'move-center');
          this.renderer.addClass(circleContainer, 'move-expanded');
        }, 1000);
      } else {
        this.renderer.removeClass(circleContainer, 'move-expanded');
      }
    }


    if (button) {
      if (this.isButtonShrunk) {
        this.renderer.addClass(button, 'shrink');
      } else {
        this.renderer.removeClass(button, 'shrink');
      }
    }
  }
}
