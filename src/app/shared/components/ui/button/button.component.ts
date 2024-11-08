import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  btnClass: string = 'btn-danger'; // Classe padrão, você pode alterar conforme necessário

  onClick() {
    console.log('Button clicked!');
  }
}
