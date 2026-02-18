import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Board {
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

  getMyBoards(): Observable<Board[]> {
    return this.http.get<Board[]>(`${this.apiUrl}/my`);
  }
}
