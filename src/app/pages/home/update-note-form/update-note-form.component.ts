import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Note, NoteService } from '../../service/note.service';

@Component({
  selector: 'app-update-note-form',
  templateUrl: './update-note-form.component.html',
  styleUrls: ['./update-note-form.component.css']
})
export class UpdateNoteFormComponent implements OnInit{
  public noteForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<UpdateNoteFormComponent>, private noteService: NoteService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private data: { note: Note },
  ) {}

  ngOnInit(): void {
    this.noteForm = this.formBuilder.group({
      title: [this.data.note.title, [Validators.required]],
      description: [this.data.note.description, [Validators.required]]
    })
  }

  cancel(): void {
    this.dialogRef.close();
  }

  updateNote() {
    const {title, description, tags} = this.noteForm.value;
    this.noteService.updateNote({id: this.data.note.id, title, description, tags}).subscribe(() => this.cancel())
  }
}
