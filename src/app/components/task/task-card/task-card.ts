import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TaskItem } from '../../../services/board.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-card',
  imports: [CommonModule],
  templateUrl: './task-card.html',
  styleUrl: './task-card.css',
})
export class TaskCard {

  @Input() task!: TaskItem;

  @Output() delete = new EventEmitter<number>();

  onDelete(event: Event) {
  event.stopPropagation();
  this.delete.emit();
}

}
