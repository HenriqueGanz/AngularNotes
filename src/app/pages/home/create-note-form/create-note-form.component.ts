import { Component, Inject, OnInit, forwardRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Note, NoteService } from '../../service/note.service';


@Component({
  selector: 'app-create-note-form',
  templateUrl: './create-note-form.component.html',
  styleUrls: ['./create-note-form.component.css'],
})
export class CreateNoteFormComponent implements OnInit {
  public toppings = new FormControl('');

  toppingList: string[] = ['Node.js', 'React.js', 'ReactNative', 'Angular', 'TypeScript', 'JavaScript'];

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

  createNote() {
    const tags = this.toppings.value;
    
    const {title, description} = this.noteForm.value;
    this.noteService.postNote({title, description, tags}).subscribe(() => this.cancel());
    console.log(tags)
  }

  cancel(): void {
    this.dialogRef.close();
    this.noteForm.reset();
  }


}
