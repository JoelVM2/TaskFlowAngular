import { Component, Input, inject } from '@angular/core';
import { TaskColumn, TaskItem } from '../../../services/board.service';
import { TaskCard } from "../../task/task-card/task-card";
import { TaskService } from '../../../services/task.service';
import { TaskModal } from "../../task/task-modal/task-modal";
import { Output, EventEmitter } from '@angular/core';
import { ColumnService } from '../../../services/column.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-column',
  imports: [TaskCard, TaskModal,FormsModule],
  templateUrl: './column.html',
  styleUrl: './column.css',
})
export class Column {
  @Input() column!: TaskColumn;
  @Output() columnDeleted = new EventEmitter<number>();
  @Output() columnUpdated = new EventEmitter<{
    id: number;
    name: string;
  }>();

  private taskService = inject(TaskService);
  private columnService = inject(ColumnService);

  showModal = false;
  selectedTask: TaskItem | null = null;
  modalMode: 'create' | 'edit' | 'view' = 'create';
  editing = false;
  editName = '';
  openCreateModal() {
    this.selectedTask = null;
    this.modalMode = 'create';
    this.showModal = true;
  }

  openEditModal(task: TaskItem) {
    this.selectedTask = task;
    this.modalMode = 'edit';
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  handleSave(data: { title: string; description: string }) {

    if (this.modalMode === 'create') {

      this.taskService.createTask({
        columnId: this.column.id,
        title: data.title,
        description: data.description
      }).subscribe(task => {

        this.column.tasks = [...this.column.tasks, task];
        this.closeModal();
      });

    } else if (this.modalMode === 'edit' && this.selectedTask) {

      this.taskService.updateTask(this.selectedTask.id, {
        title: data.title,
        description: data.description
      }).subscribe(updated => {

        this.column.tasks = this.column.tasks.map(t =>
          t.id === updated.id ? updated : t
        );

        this.closeModal();
      });
    }
  }

  deleteTask(taskId: number) {
    this.taskService.deleteTask(taskId).subscribe({
      next: () => {
        this.column.tasks = this.column.tasks.filter(t => t.id !== taskId);
      },
      error: err => console.error(err)
    });
  }

  startEdit() {
  this.editing = true;
  this.editName = this.column.name;
  }

  cancelEdit() {
    this.editing = false;
  }

  saveEdit() {
    if (!this.editName.trim()) return;

    this.columnService.updateColumn(this.column.id, this.editName)
      .subscribe(updated => {

        this.columnUpdated.emit({
          id: updated.id,
          name: updated.name
        });

        this.editing = false;
      });
  }

  deleteColumn() {

    if (!confirm('¿Eliminar columna?')) return;

    this.columnService.deleteColumn(this.column.id)
      .subscribe(() => {
        this.columnDeleted.emit(this.column.id);
      });
  }


}
