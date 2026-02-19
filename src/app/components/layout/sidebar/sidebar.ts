import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { BoardService, BoardSummary } from '../../../services/board.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, RouterLink],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar implements OnInit {

  private boardService = inject(BoardService);
  private router = inject(Router);
  private authService = inject(AuthService);
  private cdr = inject(ChangeDetectorRef);

  boards = signal<BoardSummary[]>([]);
  activeBoardId = signal<number | null>(null);
  showCreate = false;
  newBoardName = '';
  showJoin = false;
  joinCode = '';

  ngOnInit() {
    this.loadBoards();

    this.router.events.subscribe(() => {
      const url = this.router.url;
      const match = url.match(/boards\/(\d+)/);
      this.cdr.detectChanges();
      this.activeBoardId.set(match ? +match[1] : null);
    });
  }

  loadBoards() {
    this.boardService.getMyBoards().subscribe(data => {
      this.boards.set(data);
    });
  }

  goToBoard(id: number) {
    this.router.navigate(['/boards', id]);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  toggleCreate() {
    this.showCreate = !this.showCreate;
  }

  createBoard() {
    const name = this.newBoardName.trim();
    if (!name) return;

    this.boardService.createBoard({ name })
      .subscribe({
        next: board => {

          this.boards.update(list => [...list, board]);

          this.newBoardName = '';
          this.showCreate = false;

          this.router.navigate(['/boards', board.id]);
        },
        error: err => {
          console.error(err);
        }
      });
  }

  cancelCreate() {
    this.showCreate = false;
    this.newBoardName = '';
  }

  toggleJoin() {
    this.showJoin = !this.showJoin;
    this.showCreate = false;
  }

  cancelJoin() {
    this.showJoin = false;
    this.joinCode = '';
  }

  joinBoard() {
    const code = this.joinCode.trim();
    if (!code) return;

    this.boardService.joinBoard({ joinCode: code })
      .subscribe({
        next: board => {

          this.boards.update(list => [...list, board]);

          this.joinCode = '';
          this.showJoin = false;

          this.router.navigate(['/boards', board.id]);
        },
        error: err => console.error(err)
      });
  }
}
