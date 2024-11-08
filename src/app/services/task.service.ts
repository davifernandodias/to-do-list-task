import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, switchMap } from 'rxjs';
import { Tarefa } from '../../Tarefa';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'http://localhost:3000/tasks';
  private taskSubject = new BehaviorSubject<Tarefa[]>([]);
  tasks$ = this.taskSubject.asObservable();

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Tarefa[]> {
    return this.http.get<Tarefa[]>(this.apiUrl);
  }

  checkTaskExists(taskName: string): Observable<boolean> {
    return this.http.get<Tarefa[]>(`${this.apiUrl}?tarefaNome=${taskName}`).pipe(
      switchMap((tasks) => {
        return new Observable<boolean>((observer) => {
          observer.next(tasks.length > 0); // Retorna true se existir pelo menos uma tarefa com o mesmo nome
          observer.complete();
        });
      })
    );
  }

  addTask(task: Tarefa): Observable<Tarefa> {
    return this.getTasks().pipe(
      switchMap((tasks) => {
        const nextSerialOrder = tasks.length === 0 ? 1 : Math.max(...tasks.map(t => t.serialOrdernacao)) + 1;
        const newTask = { ...task, serialOrdernacao: nextSerialOrder };
        return this.http.post<Tarefa>(this.apiUrl, newTask);
      })
    );
  }

  deleteTask(tarefa: Tarefa): Observable<Tarefa> {
    return this.http.delete<Tarefa>(`${this.apiUrl}/${tarefa.id}`);
  }

  updateTask(tarefa: Tarefa): Observable<Tarefa> {
    return this.http.put<Tarefa>(`${this.apiUrl}/${tarefa.id}`, tarefa);
  }

  updateTasksOrder(tasks: Tarefa[]): Observable<Tarefa[]> {
    return this.http.put<Tarefa[]>(this.apiUrl, tasks).pipe(
      switchMap(() => {
        return this.getTasks();
      })
    );
  }


  refreshTasks(): void {
    this.getTasks().subscribe((tasks) => {
      this.taskSubject.next(tasks);
    });
  }
}
