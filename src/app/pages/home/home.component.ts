import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { CreateNoteFormComponent } from './create-note-form/create-note-form.component';

interface Note {
  id: number;
  title: string;
  description: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  longText = `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog
  from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was
  originally bred for hunting.`;

  notes: Note[] = [];

  public dialog: MatDialog;
  private httpClient: HttpClient;

  constructor(dialog: MatDialog, httpClient: HttpClient) {
    this.dialog = dialog;
    this.httpClient = httpClient;
  }

  ngOnInit(): void {
    this.getNotes();
  }

  createNote(): void {
    const dialogRef = this.dialog.open(CreateNoteFormComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getNotes();
    });
  }

  getNotes() {
    this.httpClient.get<Note[]>('http://localhost:3333/notes?user_id=5').subscribe((data) => {
      this.notes = data;
    });
  }

  deleteNote(id: number) {
    this.httpClient.delete(`http://localhost:3333/notes/${id}`).subscribe(() => this.getNotes())
  }
}

