import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TaskItem } from './board.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {

  private http = inject(HttpClient);
  private apiUrl = 'https://localhost:7057/api/task';

  createTask(data: { title: string; columnId: number; description?: string }) {
  return this.http.post<TaskItem>(this.apiUrl, data);
  }

  deleteTask(id: number) {
  return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updateTask(id: number, data: { title: string; description: string }) {
  return this.http.put<TaskItem>(`${this.apiUrl}/${id}`, data);
  }


}
