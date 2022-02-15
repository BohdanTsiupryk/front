import {Note} from "./interface";

const mockDate: Date = new Date("February 4, 2016 10:13:00")

let text = "texttexttextt exttexttexttext texttextte xttexttextte xttexttex ttexttexttextt exttextt xttexttext";
export const NOTES: Note[] = [
  {id: 1, text: text, date: mockDate, deadline: mockDate, checked: false},
  {id: 2, text: text, date: mockDate, deadline: mockDate, checked: false},
  {id: 3, text: text, date: mockDate, deadline: mockDate, checked: true},
  {id: 4, text: text, date: mockDate, deadline: mockDate, checked: true},
  {id: 5, text: text, date: mockDate, deadline: mockDate, checked: false},
  {id: 6, text: text, date: mockDate, deadline: mockDate, checked: false}
]
