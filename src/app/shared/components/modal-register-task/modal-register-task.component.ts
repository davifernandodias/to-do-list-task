import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { TaskService } from '../../../services/task.service';
import { Tarefa } from '../../../../Tarefa';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-modal-register-task',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modal-register-task.component.html',
  styleUrls: ['./modal-register-task.component.scss']
})
export class ModalRegisterTaskComponent {
  @Input() task: string = '';
  @Input() isVisible: boolean = false;
  @Output() closeModal = new EventEmitter<void>();

  cost: number = 0;
  dueDate: string = '';

  matSnackBar = inject(MatSnackBar);

  constructor(private taskService: TaskService) {}

  // Método para fechar o modal
  onClose() {
    this.closeModal.emit();
  }

  generateRandomId(): string {
    const randomId = Math.floor(Math.random() * 100000);
    return randomId.toString();
  }

  // Método de criação da tarefa
  createTask(form: any) {
    if (form.valid) {
      // Verifica se já existe uma tarefa com o mesmo nome
      this.taskService.checkTaskExists(this.task).subscribe((exists) => {
        if (exists) {
          this.matSnackBar.open('Não é possível criar tarefas com o mesmo nome!', 'Ok', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['error-snackbar']
          });
        } else {
          const newTask: Tarefa = {
            tarefaNome: this.task,
            valor: this.cost,
            dataMaxima: this.dueDate,
            serialOrdernacao: 0,
          };

          this.taskService.addTask(newTask).subscribe(() => {
            this.taskService.refreshTasks();
            this.onClose();

            // Limpar os campos após salvar a tarefa
            this.task = '';
            this.cost = 0;
            this.dueDate = '';
            form.reset();

            // Exibe a mensagem de sucesso
            this.matSnackBar.open('Tarefa salva com sucesso', 'Ok', {
              duration: 3000,
              horizontalPosition: 'right',
              verticalPosition: 'top',
              panelClass: ['success-snackbar']
            });
          });
        }
      });
    }
  }
}
