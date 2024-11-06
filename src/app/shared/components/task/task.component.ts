import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ModalRegisterTaskComponent } from "../modal-register-task/modal-register-task.component";
import { TableComponent } from '../table/table.component';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [FormsModule, CommonModule, ModalRegisterTaskComponent, TableComponent],
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent {
  taskDescription: string = '';  // Variável para armazenar o texto da tarefa
  isModalVisible: boolean = false;  // Controle de visibilidade do modal

  // Método para abrir o modal
  openModal(): void {
    if (this.taskDescription.trim() !== '') {
      this.isModalVisible = true;
    } else {
      alert('Please enter a task!');
    }
  }

  // Método para fechar o modal
  closeModal(): void {
    this.isModalVisible = false;
    this.taskDescription = '';  // Limpa a tarefa quando o modal é fechado
  }
}
