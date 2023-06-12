import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreateNoteFormComponent } from '../home/create-note-form/create-note-form.component';
import { MatDialog } from '@angular/material/dialog';
import { UpdateNoteFormComponent } from '../home/update-note-form/update-note-form.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface Note {
  id: number;
  title: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})

export class NoteService {

  private httpClient: HttpClient;
  public dialog: MatDialog;

  notes: Note[] = [];

  constructor(dialog: MatDialog, httpClient: HttpClient, @Inject(MAT_DIALOG_DATA) private data: { note: Note }) {
    this.httpClient = httpClient;
    this.dialog = dialog;

    this.title.setValue(data.note.title);
    this.description.setValue(data.note.description);
  }

  createNote() {
    return this.httpClient.post('http://localhost:3333/notes/5', {title:this.title.value, description:this.description.value});
  }

  getNotes() {
    return this.httpClient.get<Note[]>('http://localhost:3333/notes?user_id=5')
  };

  deleteNote(id: number) {
    return this.httpClient.delete(`http://localhost:3333/notes/${id}`)
  }

  updateNote(data: Note) {
    return this.httpClient.put(`http://localhost:3333/notes/${this.data.note.id}`, { title: this.title.value, description: this.description.value });
  }
}


