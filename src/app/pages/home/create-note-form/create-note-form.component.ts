import { Component } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-create-note-form',
  templateUrl: './create-note-form.component.html',
  styleUrls: ['./create-note-form.component.css']
})
export class CreateNoteFormComponent {

  constructor(
    public dialogRef: MatDialogRef<CreateNoteFormComponent>,
  ) {}

  cancel(): void {
    this.dialogRef.close();
  }

}
