import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskItem } from '../../../services/board.service';

@Component({
  selector: 'app-task-modal',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './task-modal.html',
  styleUrl: './task-modal.css',
})
export class TaskModal {

  @Input() task: TaskItem | null = null;
  @Input() mode: 'create' | 'edit' | 'view' = 'create';

  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<{ title: string; description: string }>();

  title = signal('');
  description = signal('');

  ngOnInit() {
    if (this.task) {
      this.title.set(this.task.title);
      this.description.set(this.task.description || '');
    }
  }

  onSave() {
    this.save.emit({
      title: this.title(),
      description: this.description()
    });
  }

  onClose() {
    this.close.emit();
  }
}
