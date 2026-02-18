import { Component, signal, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BoardService, Board } from '../../../services/board.service';
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
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;

    this.boardService.getBoard(id).subscribe(b => {
      this.board.set(b);
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

}
