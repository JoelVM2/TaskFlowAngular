import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface TaskItem {
  id: number;
  title: string;
  description: string;
}

export interface TaskColumn {
  id: number;
  name: string;
  tasks: TaskItem[];
}

export interface Board {
  id: number;
  name: string;
  joinCode: string;
  columns: TaskColumn[];
}

export interface BoardSummary {
  id: number;
  name: string;
  joinCode: string;
}

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  private http = inject(HttpClient);
  private apiUrl = 'https://localhost:7057/api/board';

 getMyBoards(): Observable<BoardSummary[]> {
  return this.http.get<BoardSummary[]>(`${this.apiUrl}/my`);
 }

 getBoard(id: string): Observable<Board> {
  return this.http.get<Board>(`${this.apiUrl}/${id}`);
 }

 createBoard(data: { name: string }) {
  return this.http.post<BoardSummary>(
    `${this.apiUrl}`,
    data
  );
 }

 deleteBoard(id: number) {
  return this.http.delete(`${this.apiUrl}/${id}`);
 }

 updateBoard(id: number, name: string) {
  return this.http.put<BoardSummary>(`${this.apiUrl}/${id}`, {
    name
  });
 }

 joinBoard(data: { joinCode: string }) {
  return this.http.post<BoardSummary>(
    `${this.apiUrl}/join`,
    data
  );
}

}
