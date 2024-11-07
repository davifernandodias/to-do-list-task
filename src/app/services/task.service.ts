import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, switchMap } from 'rxjs';
import { Tarefa } from '../../Tarefa';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'http://localhost:3000/tasks';  // URL da API
  private taskSubject = new BehaviorSubject<Tarefa[]>([]);  // Comportamento observável para as tarefas
  tasks$ = this.taskSubject.asObservable();  // Expondo o observable

  constructor(private http: HttpClient) {}

  // Método para obter as tarefas
  getTasks(): Observable<Tarefa[]> {
    return this.http.get<Tarefa[]>(this.apiUrl);
  }

  // Método para adicionar uma nova tarefa
  addTask(task: Tarefa): Observable<Tarefa> {
    return this.getTasks().pipe(
      switchMap((tasks) => {
        const nextSerialOrder = tasks.length === 0 ? 1 : Math.max(...tasks.map(t => t.serialOrdernacao)) + 1;
        const newTask = { ...task, serialOrdernacao: nextSerialOrder };
        return this.http.post<Tarefa>(this.apiUrl, newTask);
      })
    );
  }

  // Método para excluir uma tarefa
  deleteTask(tarefa: Tarefa): Observable<Tarefa> {
    return this.http.delete<Tarefa>(`${this.apiUrl}/${tarefa.id}`);
  }

  // Método para atualizar uma tarefa
  updateTask(tarefa: Tarefa): Observable<Tarefa> {
    return this.http.put<Tarefa>(`${this.apiUrl}/${tarefa.id}`, tarefa);
  }

  // Método para atualizar a lista de tarefas
  refreshTasks(): void {
    this.getTasks().subscribe((tasks) => {
      this.taskSubject.next(tasks);  // Atualiza o valor do BehaviorSubject
    });
  }
}
