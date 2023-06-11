import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Note } from '../home.component';

@Component({
  selector: 'app-update-note-form',
  templateUrl: './update-note-form.component.html',
  styleUrls: ['./update-note-form.component.css']
})
export class UpdateNoteFormComponent {
  title = new FormControl('', [Validators.required]);
  description = new FormControl('', [Validators.required]);

  constructor(
    public dialogRef: MatDialogRef<UpdateNoteFormComponent>, private httpClient: HttpClient,
    @Inject(MAT_DIALOG_DATA) private data: { note: Note }
  ) {
    this.title.setValue(data.note.title);
    this.description.setValue(data.note.description);
   }

  cancel(): void {
    this.dialogRef.close();
  }

  updateNote() {
    this.httpClient.put(`http://localhost:3333/notes/${this.data.note.id}`, { title: this.title.value, description: this.description.value }).subscribe(() => this.cancel())
  }
}