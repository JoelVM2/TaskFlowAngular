import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Column {
  id: number;
  name: string;
  position: number;
  boardId: number;
}

@Injectable({
  providedIn: 'root'
})
export class ColumnService {

  private http = inject(HttpClient);
  private apiUrl = 'https://localhost:7057/api/column';

  createColumn(data: { boardId: number; name: string }): Observable<Column> {
    return this.http.post<Column>(this.apiUrl, data);
  }

  updateColumn(id: number, name: string): Observable<Column> {
    return this.http.put<Column>(`${this.apiUrl}/${id}`, { name });
  }

  deleteColumn(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  moveColumn(id: number, newPosition: number): Observable<Column> {
    return this.http.put<Column>(`${this.apiUrl}/${id}/move`, {
      newPosition
    });
  }
}
