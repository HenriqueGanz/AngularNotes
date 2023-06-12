import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NoteService } from '../service/note.service';
import { CreateNoteFormComponent } from './create-note-form/create-note-form.component';
import { UpdateNoteFormComponent } from './update-note-form/update-note-form.component';

export interface Note {
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
  longText = ``;

  notes: Note[] = [];

  public dialog: MatDialog;
  private noteService: NoteService;

  constructor(dialog: MatDialog, noteService: NoteService) {
    this.noteService = noteService;
    this.dialog = dialog;
  }

  ngOnInit(): void {
    this.noteService.getNotes();
  }

  createNote(): void {
    const dialogRef = this.dialog.open(CreateNoteFormComponent, {
      width: '450px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.noteService.getNotes();
    });
  }

  getNotes() {
    this.noteService.getNotes().subscribe((data) => {
      this.notes = data;
      console.log(data)
    });
  }

  deleteNote(id: number) {
    this.noteService.deleteNote(id).subscribe(() => this.getNotes())
  }

  updateNote(note: Note) {
    const dialogRef = this.dialog.open(UpdateNoteFormComponent, {
      width: '450px',
      data: {
        note
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getNotes();
    });
  }
}


