import { Component, Renderer2 } from '@angular/core';
import { TaskComponent } from "../task/task.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-container',
  standalone: true,
  imports: [TaskComponent, CommonModule],
  templateUrl: './container.component.html',
  styleUrl: './container.component.scss'
})
export class ContainerComponent {
  isVisible: boolean = false;
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
    this.isVisible = !this.isVisible;
    this.isCircleMoved = !this.isCircleMoved;
    this.isButtonShrunk = !this.isButtonShrunk;

    const circleContainer = document.querySelector('.circle-container');
    const button = document.querySelector('.button');
    const title = document.querySelector('.title');
    const titleTwo = document.querySelector('.title-two');

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

    // Fade out the title and title-two
    if (title && titleTwo && circleContainer) {
      this.renderer.addClass(title, 'fade-out');
      this.renderer.addClass(titleTwo, 'fade-out');
      this.renderer.addClass(circleContainer, 'fade-out');

      // Opcionalmente, podemos remover o z-index para "sumir" do plano
      this.renderer.setStyle(title, 'z-index', '0');
      this.renderer.setStyle(titleTwo, 'z-index', '0');
     // Define um delay de 2 segundos (2000ms)
    setTimeout(() => {
      // Após 2 segundos, altera o 'z-index' do elemento
      this.renderer.setStyle(circleContainer, 'z-index', '0');
    }, 2000);

    }

    // Chama a função de fade-out na imagem
    this.toggleIllustreFade();
  }

}
