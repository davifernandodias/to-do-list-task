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
  // Controle dos estados de animação
  isCircleMoved = false;  // Para controlar o movimento do círculo
  isButtonShrunk = false;  // Para controlar a diminuição do botão

  constructor(private renderer: Renderer2) {}

  // Controle do estado de animação da imagem
  isIllustreFaded = false; // Para controlar o desaparecimento da imagem

  // Função chamada ao clicar no botão
  toggleIllustreFade() {
    this.isIllustreFaded = !this.isIllustreFaded;

    const illustreImg = document.querySelector('.illustre-img');

    // Se a imagem existir, alterna a classe fade-out
    if (illustreImg) {
      if (this.isIllustreFaded) {
        this.renderer.addClass(illustreImg, 'fade-out'); // Aplica a classe de desaparecimento
      } else {
        this.renderer.removeClass(illustreImg, 'fade-out'); // Remove a classe para reverter o efeito
      }
    }
  }

  // Função chamada ao clicar no botão
  moveCircleAndShrinkButton() {
    // Alterna os estados do círculo e do botão
    this.isCircleMoved = !this.isCircleMoved;
    this.isButtonShrunk = !this.isButtonShrunk;

    // Obtém os elementos do círculo e do botão
    const circleContainer = document.querySelector('.circle-container');
    const button = document.querySelector('.button');

    // Se o círculo existir, alterna as classes para movimento
    if (circleContainer) {
      if (this.isCircleMoved) {
        this.renderer.addClass(circleContainer, 'move-center'); // Move para o centro e encolhe
        setTimeout(() => {
          this.renderer.removeClass(circleContainer, 'move-center');
          this.renderer.addClass(circleContainer, 'move-expanded'); // Expande o círculo para a direita inferior
        }, 1000); // Espera 1 segundo antes de expandir
      } else {
        this.renderer.removeClass(circleContainer, 'move-expanded'); // Retorna ao estado inicial
      }
    }

    // Se o botão existir, alterna a classe para encolher
    if (button) {
      if (this.isButtonShrunk) {
        this.renderer.addClass(button, 'shrink'); // Diminui o botão
      } else {
        this.renderer.removeClass(button, 'shrink'); // Retorna o botão
      }
    }
  }
}
