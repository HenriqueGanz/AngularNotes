import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NoteService } from '../service/note.service';
import { CreateNoteFormComponent } from './create-note-form/create-note-form.component';
import { UpdateNoteFormComponent } from './update-note-form/update-note-form.component';
import { Note } from '../service/note.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  longText = ``;

  notes: Note[];

  public dialog: MatDialog;
  private noteService: NoteService;

  constructor(dialog: MatDialog, noteService: NoteService) {
    this.noteService = noteService;
    this.dialog = dialog;
  }

  ngOnInit(): void {
    this.updateNotes();
  }

  private updateNotes() {
    this.noteService.getNotes().subscribe((data) => {
      this.notes = data;
    });
  }

  public openCreateNoteForm(): void {
    const dialogRef = this.dialog.open(CreateNoteFormComponent, {
      minWidth: '450px',
    });

    dialogRef.afterClosed().subscribe(result => { this.updateNotes() });
  }

  public deleteNote(id: number) {
    this.noteService.deleteNote(id).subscribe(() => { this.updateNotes() });
  }

  public openUpdateNoteForm(note: Note) {
    const dialogRef = this.dialog.open(UpdateNoteFormComponent, {
      width: '450px',
      data: {
        note
      }
    });

    dialogRef.afterClosed().subscribe(result => { this.updateNotes() });
  }
}


