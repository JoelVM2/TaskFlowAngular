import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BoardService, Board } from '../../../services/board.service';

@Component({
  selector: 'app-board-list-page',
  imports: [CommonModule],
  templateUrl: './board-list-page.html',
  styleUrls: ['./board-list-page.css']
})
export class BoardListPage implements OnInit {

  private boardService = inject(BoardService);
  private router = inject(Router);

  boards: Board[] = [];

  ngOnInit(): void {
    this.boardService.getMyBoards().subscribe({
      next: data => this.boards = data,
      error: err => console.error(err)
    });
  }

  openBoard(id: number) {
    this.router.navigate(['/boards', id]);
  }
}
