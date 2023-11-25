import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  BASE = "http://localhost:8080"

  chatHistory: any = false
  jsonData: any = false

  chatForm = new FormGroup({
    question: new FormControl(''),
  });

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getChatHistory()
    this.getJsonData()
  }

  getChatHistory(){
    this.http.get(this.BASE+'/history', this.httpOptions).subscribe(
      resp => {
        this.chatHistory = resp
      },
      err => {
        console.log(err)
      }
    ); 
  }

  getJsonData(){
    this.http.get(this.BASE+'/data', this.httpOptions).subscribe(
      resp => {
        this.jsonData = resp
      },
      err => {
        console.log(err)
      }
    ); 
  }

  doChat(){
    let data = this.chatForm.value
    this.http.post(this.BASE+'/chat', data, this.httpOptions).subscribe(
      resp => {
        this.chatHistory.push(resp)
        this.chatForm.reset()
      },
      err => {
        console.log(err)
      }
    ); 

  }

}
