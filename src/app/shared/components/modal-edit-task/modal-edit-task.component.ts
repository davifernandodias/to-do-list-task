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

  // Variável para armazenar a cópia temporária dos dados da tarefa
  tempTask: any = {};

  matSnackBar = inject(MatSnackBar);

  // Método para fechar o modal
  onClose() {
    this.closeModal.emit();  // Emite o evento para fechar o modal
  }

  // Método para salvar as alterações da tarefa
  saveChanges() {
    // Aqui você salva as alterações de `tempTask` de volta para `task`
    this.task = { ...this.tempTask };

    this.matSnackBar.open('Tarefa salva com sucesso', 'Ok', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['custom-snackbar']  // Adiciona a classe personalizada
    });

    this.onClose();  // Fecha o modal após salvar
  }

  // Método para quando o modal for aberto: cria uma cópia dos dados
  ngOnChanges() {
    // Cria uma cópia dos dados da tarefa para manipulação temporária
    if (this.task) {
      this.tempTask = { ...this.task };
    }
  }

  // Método para restaurar os dados quando o modal é fechado
  resetTask() {
    this.tempTask = { ...this.task };  // Restaura os dados originais
  }
}
