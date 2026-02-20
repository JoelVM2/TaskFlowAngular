import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { TaskColumn, TaskItem } from '../../../services/board.service';
import { TaskCard } from "../../task/task-card/task-card";
import { TaskService } from '../../../services/task.service';
import { TaskModal } from "../../task/task-modal/task-modal";
import { ColumnService } from '../../../services/column.service';
import { FormsModule } from '@angular/forms';
import { ConfirmModal } from '../../ui/confirm-modal/confirm-modal';
import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-column',
  imports: [TaskCard, TaskModal, FormsModule, ConfirmModal, CdkDropList, CdkDrag],
  templateUrl: './column.html',
  styleUrl: './column.css',
})
export class Column {

  @Input() column!: TaskColumn;
  @Input() connectedTo: string[] = [];

  @Output() taskCreated = new EventEmitter<{ columnId: number; task: TaskItem }>();
  @Output() taskUpdated = new EventEmitter<{ columnId: number; task: TaskItem }>();
  @Output() taskDeleted = new EventEmitter<{ columnId: number; taskId: number }>();

  @Output() columnDeleted = new EventEmitter<number>();
  @Output() columnUpdated = new EventEmitter<{ id: number; name: string }>();

  private taskService = inject(TaskService);
  private columnService = inject(ColumnService);
  private cdr = inject(ChangeDetectorRef);

  showModal = false;
  selectedTask: TaskItem | null = null;
  modalMode: 'create' | 'edit' | 'view' = 'create';
  showConfirmModal = false;

  editing = false;
  editName = '';
  errorMessage = '';
  
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
      }).subscribe({
        next: task => {

          this.taskCreated.emit({
            columnId: this.column.id,
            task
          });

          this.closeModal();
        },
        error: err => console.error(err)
      });

    } else if (this.modalMode === 'edit' && this.selectedTask) {

      this.taskService.updateTask(this.selectedTask.id, {
        title: data.title,
        description: data.description
      }).subscribe({
        next: updated => {

          this.taskUpdated.emit({
            columnId: this.column.id,
            task: updated
          });

          this.closeModal();
        },
        error: err => console.error(err)
      });
    }
  }


  deleteTask(taskId: number) {
    this.taskService.deleteTask(taskId).subscribe(() => {
      this.taskDeleted.emit({
        columnId: this.column.id,
        taskId
      });
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
  this.showConfirmModal = true;
  }

 confirmDeleteColumn() {
  this.columnService.deleteColumn(this.column.id)
    .subscribe({
      next: () => {
        this.columnDeleted.emit(this.column.id);
        this.showConfirmModal = false;
        this.errorMessage = '';
        this.cdr.detectChanges();
      },
      error: err => {
        if (err.status === 403) {
          this.errorMessage = 'No tienes permisos para eliminar esta columna.';
        } else if (err.status === 404) {
          this.errorMessage = 'La columna no existe.';
        } else {
          this.errorMessage = 'Error al eliminar la columna.';
        }

        this.cdr.detectChanges();
      }
    });
}

  cancelDelete() {
    this.showConfirmModal = false;
  }

  drop(event: CdkDragDrop<TaskItem[]>) {

    const movedTask = event.item.data as TaskItem;

    if (event.previousContainer === event.container) {

      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      this.taskService.moveTask(movedTask.id, {
        newColumnId: this.column.id,
        newPosition: event.currentIndex
      }).subscribe();

    } else {

      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      this.taskService.moveTask(movedTask.id, {
        newColumnId: this.column.id,
        newPosition: event.currentIndex
      }).subscribe();
    }
  }
}
