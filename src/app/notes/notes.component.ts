import {Component, OnInit} from '@angular/core';
import {Note} from "../interface";
import {NOTES} from "../mocks";
import {FormBuilder, FormControl} from "@angular/forms";
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

  modal = new FormControl('')

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
    this.modal.setValue(this.currentNote?.text)
  }

  check(id: number | undefined, check: boolean | undefined) {

    this.notes.forEach(n => {
      if (n.id == id && check != undefined) {
        console.log(check)
        n.checked = !check

        this.httpClient.saveRecord(n).subscribe(
          d => { this.loadNotes() }
        )
      
      } 
    })
  }

  toogle() {
    this.checked = !this.checked
    this.loadNotes()
  }

  saveEdit() {
    if (this.currentNote) {
      this.currentNote.text = this.modal.value
      this.httpClient.saveRecord(this.currentNote).subscribe(
        d => this.loadNotes()
      )
    }
  }
}
