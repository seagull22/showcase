import { Component, inject, OnInit, signal } from '@angular/core';
import { TodosService } from '../services/todos-service';
import { Todo } from '../model/todo.type';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [],
  templateUrl: './todos.html',
  styleUrl: './todos.scss',
})
export class Todos implements OnInit {
[x: string]: any;
  todoService = inject(TodosService);
  todoItems = signal<Array<Todo>>([]);

  ngOnInit(): void {
    this.todoService
      .getTodosFromApi()
      .pipe(
        catchError((err) => {
          console.error('Error fetching todos:', err);
          throw err;
        })
      )
      .subscribe(todos => {
      this.todoItems.set(todos);
    });
  }
}
