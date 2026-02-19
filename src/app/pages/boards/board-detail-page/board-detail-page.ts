import { Component, signal, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BoardService, Board, TaskItem } from '../../../services/board.service';
import { Column } from "../../../components/column/column/column";
import { FormsModule } from '@angular/forms';
import { ColumnService } from '../../../services/column.service';

@Component({
  selector: 'app-board-detail-page',
  imports: [Column, FormsModule],
  templateUrl: './board-detail-page.html',
  styleUrl: './board-detail-page.css',
})
export class BoardDetailPage implements OnInit {
  
  private route = inject(ActivatedRoute);
  private boardService = inject(BoardService);
  private columnService = inject(ColumnService);
  
  board = signal<Board | null>(null);

  showColumnForm = false;
  newColumnName = '';

  ngOnInit() {

  this.route.paramMap.subscribe(params => {

    const id = params.get('id');
    if (!id) return;

    this.board.set(null);

    this.boardService.getBoard(id).subscribe(board => {
      this.board.set(board);
    });

  });

}


  toggleColumnForm() {
    this.showColumnForm = !this.showColumnForm;
  }

  createColumn() {
    if (!this.newColumnName.trim()) return;
    if (!this.board()) return;

    this.columnService.createColumn({
      boardId: this.board()!.id,
      name: this.newColumnName
    }).subscribe(column => {

      this.board.update(b => {
        if (!b) return b;

        return {
          ...b,
          columns: [
            ...b.columns,
            { ...column, tasks: [] }
          ]
        };
      });

      this.newColumnName = '';
      this.showColumnForm = false;
    });
  }

  handleTaskCreated(event: { columnId: number; task: TaskItem }) {
    this.board.update(b => {
      if (!b) return b;

      return {
        ...b,
        columns: b.columns.map(c =>
          c.id === event.columnId
            ? { ...c, tasks: [...c.tasks, event.task] }
            : c
        )
      };
    });
  }

  handleTaskUpdated(event: { columnId: number; task: TaskItem }) {
    this.board.update(b => {
      if (!b) return b;

      return {
        ...b,
        columns: b.columns.map(c =>
          c.id === event.columnId
            ? {
                ...c,
                tasks: c.tasks.map(t =>
                  t.id === event.task.id ? event.task : t
                )
              }
            : c
        )
      };
    });
  }

  handleTaskDeleted(event: { columnId: number; taskId: number }) {
    this.board.update(b => {
      if (!b) return b;

      return {
        ...b,
        columns: b.columns.map(c =>
          c.id === event.columnId
            ? {
                ...c,
                tasks: c.tasks.filter(t => t.id !== event.taskId)
              }
            : c
        )
      };
    });
  }

  handleColumnDelete(columnId: number) {
    this.board.update(b => {
      if (!b) return b;

      return {
        ...b,
        columns: b.columns.filter(c => c.id !== columnId)
      };
    });
  }

  handleColumnUpdate(event: { id: number; name: string }) {
    this.board.update(b => {
      if (!b) return b;

      return {
        ...b,
        columns: b.columns.map(c =>
          c.id === event.id
            ? { ...c, name: event.name }
            : c
        )
      };
    });
  }

  getConnectedColumns(): string[] {
  const b = this.board();
  if (!b) return [];

  return b.columns.map(c => c.id.toString());
  }

}
