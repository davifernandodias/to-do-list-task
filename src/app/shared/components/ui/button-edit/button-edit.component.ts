import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-button-edit',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './button-edit.component.html',
  styleUrl: './button-edit.component.scss'
})
export class ButtonEditComponent {
  btnClass: string = 'btn-warning btn-sm edit-btn'; // Classe padrão, você pode alterar conforme necessário

  onClick() {
    console.log('Button clicked!');
  }
}
