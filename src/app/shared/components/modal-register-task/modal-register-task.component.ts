import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TaskService } from '../../../services/task.service';
import { Tarefa } from '../../../../Tarefa';
import { FormsModule } from '@angular/forms';  // Importe o FormsModule


@Component({
  selector: 'app-modal-register-task',
  standalone: true,
  imports: [CommonModule, FormsModule],  // Importando CommonModule para usar *ngIf, se necessário
  templateUrl: './modal-register-task.component.html',
  styleUrls: ['./modal-register-task.component.scss']
})
export class ModalRegisterTaskComponent {
  @Input() task: string = '';  // Recebe a task
  @Input() isVisible: boolean = false;  // Controle de visibilidade do modal
  @Output() closeModal = new EventEmitter<void>();  // Evento para fechar o modal

  cost: number = 0;           // Valor da tarefa (custo)
  dueDate: string = '';       // Data de vencimento (dataMaxima)

  constructor(private taskService: TaskService) {}

  // Método para fechar o modal
  onClose() {
    this.closeModal.emit();
  }

  generateRandomId(): string {
    const randomId = Math.floor(Math.random() * 100000); // Gera um número aleatório entre 0 e 99999
    return randomId.toString(); // Converte o número para string
  }

  createTask() {
    const newTask: Tarefa = {
      tarefaNome: this.task,  // Nome da tarefa
      valor: this.cost,        // Valor da tarefa
      dataMaxima: this.dueDate,  // Data máxima de vencimento
      serialOrdernacao: 0,     // O valor de serialOrdernacao será atribuído no serviço
    };

    this.taskService.addTask(newTask).subscribe(() => {
      this.taskService.refreshTasks();  // Atualiza a lista de tarefas
      this.onClose();  // Fecha o modal
    });
  }
}
