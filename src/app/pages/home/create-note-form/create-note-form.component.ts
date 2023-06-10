import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-create-note-form',
  templateUrl: './create-note-form.component.html',
  styleUrls: ['./create-note-form.component.css']
})
export class CreateNoteFormComponent {
  title = new FormControl('', [Validators.required]);
  description = new FormControl('', [Validators.required]);

  constructor(
    public dialogRef: MatDialogRef<CreateNoteFormComponent>, private httpClient: HttpClient
  ) {}

  cancel(): void {
    this.dialogRef.close();
  }

  createNote() {
    this.httpClient.post('http://localhost:3333/notes/5', {title:this.title.value, description:this.description.value}).subscribe(() => this.cancel());
  }

}
