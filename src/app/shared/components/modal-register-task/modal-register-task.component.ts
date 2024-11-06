import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal-register-task',
  standalone: true,
  imports: [CommonModule],  // Importando CommonModule para usar *ngIf, se necessário
  templateUrl: './modal-register-task.component.html',
  styleUrls: ['./modal-register-task.component.scss']
})
export class ModalRegisterTaskComponent {
  @Input() task: string = '';  // Recebe a task
  @Input() isVisible: boolean = false;  // Controle de visibilidade do modal
  @Output() closeModal = new EventEmitter<void>();  // Evento para fechar o modal

  // Método para fechar o modal
  onClose() {
    this.closeModal.emit();
  }
}
