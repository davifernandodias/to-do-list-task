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
  isIllustreFaded = false;

  constructor(private renderer: Renderer2) {}

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

    // Move circle and shrink button
    if (circleContainer) {
      if (this.isCircleMoved) {
        this.renderer.addClass(circleContainer, 'move-center');
        setTimeout(() => {
          this.renderer.removeClass(circleContainer, 'move-center');
          this.renderer.addClass(circleContainer, 'move-expanded');
        }, 1000); // Delay de 1 segundo para a animação
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

    // Chama a função de fade-out na imagem
    this.toggleIllustreFade();
  }
}
