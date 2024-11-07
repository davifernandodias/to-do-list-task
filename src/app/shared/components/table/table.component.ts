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
  sortDescending: boolean = false; // Estado do checkbox

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
        // Checkbox está marcado, ordena de menor para maior (crescente)
        return a.serialOrdernacao - b.serialOrdernacao;
      } else {
        // Checkbox não está marcado, ordena de maior para menor (decrescente)
        return b.serialOrdernacao - a.serialOrdernacao;
      }
    });
  }

  // Método chamado quando o estado do checkbox muda
  toggleSort(event: Event) {
    // Atualiza o estado de sortDescending de acordo com o checkbox
    this.sortDescending = (event.target as HTMLInputElement).checked;
    this.applyFilter(); // Reaplica o filtro e a ordenação
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
