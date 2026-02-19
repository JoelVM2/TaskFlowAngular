import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BoardService, BoardSummary } from '../../../services/board.service';
import { ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ConfirmModal } from '../../../components/ui/confirm-modal/confirm-modal';

@Component({
  selector: 'app-board-list-page',
  imports: [CommonModule,FormsModule, ConfirmModal],
  templateUrl: './board-list-page.html',
  styleUrls: ['./board-list-page.css']
})
export class BoardListPage implements OnInit {
  private cdr = inject(ChangeDetectorRef);
  private boardService = inject(BoardService);
  private router = inject(Router);
  editingBoardId: number | null = null;
  editName = '';
  showConfirmModal = false;
  boardToDelete: number | null = null;


  boards: BoardSummary[] = [];

  isLoading = true;

  ngOnInit(): void {
    this.boardService.getMyBoards().subscribe({
      next: data => {
        this.boards = data;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: err => {
        console.error(err);
        this.isLoading = false;
      }
    });
  }

  openBoard(id: number) {
    this.router.navigate(['/boards', id]);
  }

  startEdit(board: BoardSummary, event: Event) {
  event.stopPropagation();
  this.editingBoardId = board.id;
  this.editName = board.name;
  }

  cancelEdit() {
  this.editingBoardId = null;
  this.editName = '';
}

  saveEdit(id: number, event: Event) {
    event.stopPropagation();

    const name = this.editName.trim();
    if (!name) return;

    this.boardService.updateBoard(id, name)
      .subscribe(updated => {

        this.boards = this.boards.map(b =>
          b.id === id ? { ...b, name: updated.name } : b
        );

        this.cancelEdit();
        this.cdr.detectChanges();
      });
  }

  deleteBoard(id: number, event: Event) {
    event.stopPropagation();

    this.boardToDelete = id;
    this.showConfirmModal = true;
  }

  confirmDelete() {
    if (!this.boardToDelete) return;

    this.boardService.deleteBoard(this.boardToDelete)
      .subscribe(() => {
        this.boards = this.boards.filter(b => b.id !== this.boardToDelete);
        this.showConfirmModal = false;
        this.boardToDelete = null;
        this.cdr.detectChanges();
      });
  }

  cancelDelete() {
    this.showConfirmModal = false;
    this.boardToDelete = null;
  }


}
