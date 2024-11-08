import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button-deafult',
  standalone: true,
  imports: [ CommonModule],
  templateUrl: './button-deafult.component.html',
  styleUrl: './button-deafult.component.scss'
})
export class ButtonDeafultComponent {
  btnClass: string = 'btn-secudary'; // Classe padrão, você pode alterar conforme necessário

  onClick() {
    console.log('Button clicked!');
  }

}
