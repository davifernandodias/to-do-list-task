import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../../services/task.service';
import { Tarefa } from '../../../../Tarefa';
import { ModalEditTaskComponent } from "../modal-edit-task/modal-edit-task.component";

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [FormsModule, CommonModule, ModalEditTaskComponent],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  searchText: string = '';   // O texto da pesquisa
  data: Tarefa[] = [];       // Lista de todas as tarefas
  filteredTasks: Tarefa[] = []; // Tarefas filtradas
  sortDescending: boolean = false; // Estado do checkbox
  isEditModalVisible: boolean = false;  // Controla a visibilidade do modal de edição
  selectedTask: Tarefa | null = null;  // Tarefa selecionada para edição

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.tasks$.subscribe((tasks) => {
      this.data = tasks;
      this.applyFilter();  // Aplica o filtro logo após atualizar a lista de tarefas
    });

    // Carregar as tarefas ao inicializar
    this.taskService.getTasks().subscribe((tasks) => {
      this.data = tasks;
      this.applyFilter();  // Aplica o filtro inicial
    });
  }

  // Método para aplicar o filtro baseado no texto de pesquisa
  applyFilter() {
    let filtered = this.data.filter(
      (item) =>
        item.tarefaNome.toLowerCase().includes(this.searchText.toLowerCase()) ||
        (item.id && item.id.toString().includes(this.searchText))  // Inclui id, se presente
    );

    // Aplica a ordenação com base no estado do checkbox
    this.filteredTasks = this.sortTasks(filtered);
  }

  // Função que ordena as tarefas com base no estado do checkbox
  sortTasks(tasks: Tarefa[]): Tarefa[] {
    return tasks.sort((a, b) => {
      if (this.sortDescending) {
        return a.serialOrdernacao - b.serialOrdernacao;
      } else {
        return b.serialOrdernacao - a.serialOrdernacao;
      }
    });
  }

  // Método chamado quando o estado do checkbox muda
  toggleSort(event: Event) {
    this.sortDescending = (event.target as HTMLInputElement).checked;
    this.applyFilter();
  }

  // Método para deletar uma tarefa
  onDelete(tarefa: Tarefa) {
    this.taskService.deleteTask(tarefa).subscribe({
      next: () => {
        this.taskService.refreshTasks();
      },
      error: (err) => {
        console.error('Erro ao excluir tarefa:', err);
      }
    });
  }

  // Método para abrir o modal de edição
  openEditModal(task: Tarefa): void {
    this.selectedTask = task;  // Armazena a tarefa a ser editada
    this.isEditModalVisible = true;  // Torna o modal visível
  }

  // Método para fechar o modal de edição
  closeEditModal(): void {
    this.isEditModalVisible = false;  // Torna o modal invisível
    this.selectedTask = null;  // Limpa a tarefa selecionada
  }
}
