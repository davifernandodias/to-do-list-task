import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-modal-edit-task',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './modal-edit-task.component.html',
  styleUrls: ['./modal-edit-task.component.scss'],
})
export class ModalEditTaskComponent {
  @Input() task: any;  // A tarefa selecionada
  @Input() isVisible: boolean = false;  // Visibilidade do modal
  @Output() closeModal = new EventEmitter<void>();  // Evento para fechar o modal

  matSnackBar = inject(MatSnackBar);

  // Método para fechar o modal
  onClose() {
    this.closeModal.emit();  // Emite o evento para fechar o modal
  }

  // Método para salvar as alterações da tarefa
  saveChanges() {
    // Lógica para salvar a tarefa editada

    this.matSnackBar.open('Tarefa salva com sucesso', 'Ok', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['custom-snackbar']  // Adiciona a classe personalizada
    });
    this.onClose();  // Fecha o modal após salvar
  }
}
