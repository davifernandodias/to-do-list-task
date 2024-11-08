import { Component } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  btnClass: string = 'btn-warning btn-sm edit-btn'; // Classe padrão, você pode alterar conforme necessário

  onClick() {
    console.log('Button clicked!');
  }
}
