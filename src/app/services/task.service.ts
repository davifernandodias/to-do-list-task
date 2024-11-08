import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, switchMap } from 'rxjs';
import { Tarefa } from '../../Tarefa';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'https://db-processo-seletivo-task-processo-dfc.vercel.app/tasks'; // URL da API hospedada
  private taskSubject = new BehaviorSubject<Tarefa[]>([]);
  tasks$ = this.taskSubject.asObservable();

  constructor(private http: HttpClient) {}

  // Método para obter as tarefas
  getTasks(): Observable<Tarefa[]> {
    return this.http.get<Tarefa[]>(this.apiUrl); // Fazendo GET para a API remota
  }

  // Método para verificar se a tarefa já existe
  checkTaskExists(taskName: string): Observable<boolean> {
    return this.http.get<Tarefa[]>(`${this.apiUrl}?tarefaNome=${taskName}`).pipe(  // Corrigido a interpolação
      switchMap((tasks) => {
        return new Observable<boolean>((observer) => {
          observer.next(tasks.length > 0); // Retorna true se existir pelo menos uma tarefa com o mesmo nome
          observer.complete();
        });
      })
    );
  }

  // Método para adicionar uma tarefa
  addTask(task: Tarefa): Observable<Tarefa> {
    return this.getTasks().pipe(
      switchMap((tasks) => {
        const nextSerialOrder = tasks.length === 0 ? 1 : Math.max(...tasks.map(t => t.serialOrdernacao)) + 1;
        const newTask = { ...task, serialOrdernacao: nextSerialOrder };
        return this.http.post<Tarefa>(this.apiUrl, newTask); // Fazendo POST para a API remota
      })
    );
  }

  // Método para excluir uma tarefa
  deleteTask(tarefa: Tarefa): Observable<Tarefa> {
    return this.http.delete<Tarefa>(`${this.apiUrl}/${tarefa.id}`); // Corrigido a interpolação
  }

  // Método para atualizar uma tarefa
  updateTask(tarefa: Tarefa): Observable<Tarefa> {
    return this.http.put<Tarefa>(`${this.apiUrl}/${tarefa.id}`, tarefa); // Corrigido a interpolação
  }

  // Método para atualizar a ordem das tarefas
  updateTasksOrder(tasks: Tarefa[]): Observable<Tarefa[]> {
    return this.http.put<Tarefa[]>(this.apiUrl, tasks).pipe(
      switchMap(() => {
        return this.getTasks(); // Obtendo as tarefas após atualização
      })
    );
  }

  // Método para atualizar o estado local de tarefas
  refreshTasks(): void {
    this.getTasks().subscribe((tasks) => {
      this.taskSubject.next(tasks); // Atualiza o comportamento de tarefas
    });
  }
}
