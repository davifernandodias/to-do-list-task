import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../../services/task.service';
import { Tarefa } from '../../../../Tarefa';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  searchText: string = '';   // O texto da pesquisa
  data: Tarefa[] = [];       // Lista de todas as tarefas
  filteredTasks: Tarefa[] = []; // Tarefas filtradas

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    // Assinando para receber as tarefas quando forem carregadas
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
    if (!this.searchText) {
      this.filteredTasks = [...this.data]; // Se não houver pesquisa, mostra todas as tarefas
    } else {
      // Filtra as tarefas que contêm o texto de pesquisa
      this.filteredTasks = this.data.filter(
        (item) =>
          item.tarefaNome.toLowerCase().includes(this.searchText.toLowerCase()) ||
          (item.id && item.id.toString().includes(this.searchText))  // Inclui id, se presente
      );
    }
  }

  // Método para deletar uma tarefa
  onDelete(tarefa: Tarefa) {
    this.taskService.deleteTask(tarefa).subscribe({
      next: () => {
        this.taskService.refreshTasks();  // Atualiza as tarefas após exclusão
      },
      error: (err) => {
        console.error('Erro ao excluir tarefa:', err);
      }
    });
  }
}
