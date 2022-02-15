import {Component, OnInit} from '@angular/core';
import {Note} from "../interface";
import {NOTES} from "../mocks";
import {FormBuilder} from "@angular/forms";
import {HttpClientService} from "../http-client.service";

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  notes: Note[] = NOTES
  currentNote?: Note
  checked = false

  form = this.fb.group({
    text: [''],
    deadline: ['']
  })

  constructor(private fb: FormBuilder, private httpClient: HttpClientService) {
    this.loadNotes()
  }

  ngOnInit(): void {
  }

  loadNotes() {
    this.httpClient.getRecords(this.checked).subscribe(data => {
      this.notes = data
    })
  }

  removeNote(id: number | undefined) {

    if (id) {
      this.httpClient.deleteRecord(id).subscribe()
      this.notes.forEach((n, i) => {
        if (n.id === id) this.notes.slice(i, 1)
      });
    }

    this.loadNotes()
  }

  add() {
    
    this.httpClient.addRecord({
      text: this.form.get('text')?.value,
      deadline: new Date(this.form.get('deadline')?.value),
      checked: false
    }).subscribe(data => {
      this.notes.push()
      this.loadNotes()
    })
  }

  details(id: number | undefined) {
    this.currentNote = this.notes.find(n => n.id == id);
  }

  check(id: number | undefined) {
    this.notes.forEach(n => {
      if (n.id == id) n.checked = true
    })
    //todo
  }

  toogle() {
    this.checked = !this.checked
    this.loadNotes()
  }
}
