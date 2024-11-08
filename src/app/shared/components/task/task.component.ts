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
  taskDescription: string = '';
  isModalVisible: boolean = false;


  openModal(): void {
    if (this.taskDescription.trim() !== '') {
      this.isModalVisible = true;
    } else {
      alert('Please enter a task!');
    }
  }


  closeModal(): void {
    this.isModalVisible = false;
    this.taskDescription = '';
  }
}
