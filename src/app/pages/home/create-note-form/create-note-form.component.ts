import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Note, NoteService } from '../../service/note.service';


@Component({
  selector: 'app-create-note-form',
  templateUrl: './create-note-form.component.html',
  styleUrls: ['./create-note-form.component.css']
})
export class CreateNoteFormComponent implements OnInit {
  public noteForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<CreateNoteFormComponent>,
    private noteService: NoteService
  ) { }

  ngOnInit(): void {
    this.noteForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]]
    })
  }

  cancel(): void {
    this.dialogRef.close();
    this.noteForm.reset();
  }

  createNote() {
    this.noteService.postNote(this.noteForm.value).subscribe(() => this.cancel());
  }

}
