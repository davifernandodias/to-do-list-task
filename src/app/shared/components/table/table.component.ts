import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ModalEditTaskComponent } from '../modal-edit-task/modal-edit-task.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TaskService } from '../../../services/task.service';
import { Tarefa } from '../../../../Tarefa';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';  // Importando o DragDropModule

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [FormsModule, CommonModule, ModalEditTaskComponent, DragDropModule],  // Adicionando DragDropModule
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  matSnackBar = inject(MatSnackBar);

  searchText: string = '';
  data: Tarefa[] = [];
  filteredTasks: Tarefa[] = [];
  sortDescending: boolean = false;
  isEditModalVisible: boolean = false;
  selectedTask: Tarefa | null = null;
  isDeleteModalVisible: boolean = false;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    // Carregar as tarefas ao iniciar
    this.taskService.refreshTasks();

    // Inscrever-se para as atualizações de tarefas
    this.taskService.tasks$.subscribe((tasks) => {
      this.data = tasks;
      this.applyFilter();
    });
  }

  applyFilter() {
    let filtered = this.data.filter(
      (item) =>
        item.tarefaNome.toLowerCase().includes(this.searchText.toLowerCase()) ||
        (item.id && item.id.toString().includes(this.searchText))
    );

    this.filteredTasks = this.sortTasks(filtered);
  }

  sortTasks(tasks: Tarefa[]): Tarefa[] {
    return tasks.sort((a, b) => {
      if (this.sortDescending) {
        return a.serialOrdernacao - b.serialOrdernacao;
      } else {
        return b.serialOrdernacao - a.serialOrdernacao;
      }
    });
  }

  toggleSort(event: Event) {
    this.sortDescending = (event.target as HTMLInputElement).checked;
    this.applyFilter();
  }

  onDeleteConfirmation(tarefa: Tarefa) {
    this.selectedTask = tarefa;
    this.isDeleteModalVisible = true;
  }

  deleteTask(tarefa: Tarefa | null) {
    if (tarefa) {
      this.taskService.deleteTask(tarefa).subscribe({
        next: () => {
          this.taskService.refreshTasks();
          this.closeDeleteModal();
          this.matSnackBar.open('Tarefa removida com sucesso', 'Ok', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['success-snackbar']
          });
        },
        error: (err) => {
          console.error('Erro ao excluir tarefa:', err);
        }
      });
    }
  }

  closeDeleteModal() {
    this.isDeleteModalVisible = false;
    this.selectedTask = null;
  }

  openEditModal(task: Tarefa): void {
    this.selectedTask = task;
    this.isEditModalVisible = true;
  }

  closeEditModal(): void {
    this.isEditModalVisible = false;
    this.selectedTask = null;
  }

  // Função para manipular o rearranjo das tarefas
  drop(event: CdkDragDrop<Tarefa[]>) {
    const prevIndex = this.filteredTasks.findIndex((task) => task.id === event.item.data.id);
    const currentIndex = event.currentIndex;

    // Rearranjando a lista de tarefas localmente
    this.filteredTasks.splice(prevIndex, 1);
    this.filteredTasks.splice(currentIndex, 0, event.item.data);

    // Atualizando o campo de ordem de cada tarefa após o rearranjo
    this.filteredTasks.forEach((task, index) => {
      task.serialOrdernacao = index + 1; // Atualizando o serialOrdernacao com base na nova posição
    });

    // Atualizando a ordem das tarefas no servidor (db.json)
    this.taskService.updateTasksOrder(this.filteredTasks).subscribe({
      next: (updatedTasks) => {
        // Atualizando localmente após a resposta do backend
        this.filteredTasks = updatedTasks;

        // Mensagem de sucesso
        this.matSnackBar.open('Ordem das tarefas atualizada com sucesso!', 'Ok', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['success-snackbar']
        });
      },
      error: (err) => {
        console.error('Erro ao atualizar a ordem das tarefas:', err);
      }
    });
  }
}
