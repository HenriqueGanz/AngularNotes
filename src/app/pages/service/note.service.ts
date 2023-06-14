import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

export interface Note {
  id: number;
  title: string;
  description: string;
  tags: string[];
}

@Injectable({
  providedIn: 'root'
})

export class NoteService {

  private httpClient: HttpClient;
  public dialog: MatDialog;

  public notes: Note[] = [];

  httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json'
    })
  };

  constructor(dialog: MatDialog, httpClient: HttpClient,) {
    this.httpClient = httpClient;
    this.dialog = dialog;
  }

  public postNote(note: any) {
    return this.httpClient.post<any>('http://localhost:3333/notes/5', note, this.httpOptions);
  }

  public getNotes() {
    return this.httpClient.get<Note[]>('http://localhost:3333/notes?user_id=5')
  };

  public deleteNote(id: number) {
    return this.httpClient.delete(`http://localhost:3333/notes/${id}`)
  }

  public updateNote(note: Note) {
    return this.httpClient.put(`http://localhost:3333/notes/${note.id}`, note, this.httpOptions);
  }

}


