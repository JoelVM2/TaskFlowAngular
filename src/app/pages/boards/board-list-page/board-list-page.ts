import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BoardService, BoardSummary } from '../../../services/board.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-board-list-page',
  imports: [CommonModule],
  templateUrl: './board-list-page.html',
  styleUrls: ['./board-list-page.css']
})
export class BoardListPage implements OnInit {
  private cdr = inject(ChangeDetectorRef);
  private boardService = inject(BoardService);
  private router = inject(Router);

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
}
