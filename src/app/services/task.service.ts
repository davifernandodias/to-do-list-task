import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, take, switchMap } from 'rxjs';
import { Tarefa } from '../../Tarefa';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'http://localhost:3000/tasks';
  private taskSubject = new BehaviorSubject<Tarefa[]>([]);  // Comportamento observável
  tasks$ = this.taskSubject.asObservable();  // Expose the observable

  constructor(private http: HttpClient) {}

  // Método para obter as tarefas
  getTasks(): Observable<Tarefa[]> {
    return this.http.get<Tarefa[]>(this.apiUrl);
  }

  // Método para adicionar uma nova tarefa com serialOrdernacao sequencial
  addTask(task: Tarefa): Observable<Tarefa> {
    return this.getTasks().pipe(
      take(1),  // Garantir que estamos pegando os dados mais recentes
      switchMap((tasks) => {
        // Determina o próximo valor de serialOrdernacao
        const nextSerialOrder = tasks.length === 0 ? 1 : Math.max(...tasks.map(t => t.serialOrdernacao)) + 1;

        // Atribui o serialOrdernacao à nova tarefa
        const newTask = { ...task, serialOrdernacao: nextSerialOrder };

        return this.http.post<Tarefa>(this.apiUrl, newTask);
      })
    );
  }

  // Método para excluir uma tarefa pelo ID
  deleteTask(tarefa: Tarefa): Observable<Tarefa> {
    return this.http.delete<Tarefa>(`${this.apiUrl}/${tarefa.id}`);
  }

  // Método para atualizar a lista de tarefas após qualquer alteração
  refreshTasks(): void {
    this.getTasks().subscribe((tasks) => {
      this.taskSubject.next(tasks);  // Atualiza o valor do BehaviorSubject
    });
  }
}
