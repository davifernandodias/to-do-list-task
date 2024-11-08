import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ModalEditTaskComponent } from '../modal-edit-task/modal-edit-task.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TaskService } from '../../../services/task.service';
import { Tarefa } from '../../../../Tarefa';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { InputSwitchComponent } from "../ui/input-switch/input-switch.component";
import { InputSearchComponent } from "../ui/input-search/input-search.component";
import { ButtonComponent } from "../ui/button/button.component";
import { ButtonDeafultComponent } from "../ui/button-deafult/button-deafult.component";
import { ButtonEditComponent } from "../ui/button-edit/button-edit.component";  // Importando o novo componente de botão

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [FormsModule, CommonModule, ModalEditTaskComponent, DragDropModule, InputSwitchComponent, InputSearchComponent, ButtonComponent, ButtonDeafultComponent, ButtonEditComponent],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  matSnackBar = inject(MatSnackBar);

  searchText: string = '';
  data: Tarefa[] = [];
  filteredTasks: Tarefa[] = [];
  sortDescending: boolean = false; // Flag de ordenação
  isEditModalVisible: boolean = false;
  selectedTask: Tarefa | null = null;
  isDeleteModalVisible: boolean = false;  // Variável para controle da visibilidade do modal de exclusão

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
    this.sortDescending = (event.target as HTMLInputElement).checked; // Altera a flag de ordenação
    this.applyFilter(); // Aplica o filtro e ordenação
  }

  onCloseButtonClick(item: Tarefa) {
    // Sua lógica para fechar ou fazer algo com a tarefa
    console.log('Fechar tarefa:', item);
    this.isEditModalVisible = false;
    this.selectedTask = null;
  }

  // Função para abrir o modal de exclusão
  openDeleteModal(task: Tarefa): void {
    this.selectedTask = task;  // Armazena a tarefa selecionada
    this.isDeleteModalVisible = true;  // Exibe o modal de exclusão
  }

  // Função para excluir a tarefa
  deleteTask(tarefa: Tarefa | null) {
    if (tarefa) {
      this.taskService.deleteTask(tarefa).subscribe({
        next: () => {
          this.taskService.refreshTasks();
          this.closeDeleteModal();  // Fecha o modal após a exclusão
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

  // Função para fechar o modal de exclusão
  closeDeleteModal() {
    this.isDeleteModalVisible = false;
    this.selectedTask = null;
  }

  // Função para abrir o modal de edição
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

    // Atualizando a ordem das tarefas
    this.filteredTasks.forEach((task, index) => {
      task.serialOrdernacao = index + 1;  // Atualizando o serialOrdernacao
    });

    // Atualizando a ordem das tarefas no servidor (db.json)
    this.taskService.updateTasksOrder(this.filteredTasks).subscribe({
      next: (updatedTasks) => {
        this.filteredTasks = updatedTasks;
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

  onSearchTextChanged(searchText: string) {
    this.searchText = searchText;  // Atualiza o texto de pesquisa
    this.applyFilter();  // Aplica o filtro
  }
}
