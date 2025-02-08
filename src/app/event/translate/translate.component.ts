import { Component, OnInit } from '@angular/core';
import { io } from 'socket.io-client';

interface Output {
  inputText: string;
  language: string;
  translatedText: string
}

@Component({
  selector: 'app-translate',
  templateUrl: './translate.component.html',
  styleUrls: ['./translate.component.css']
})
export class TranslateComponent implements OnInit {
  socket: any;    // initialize "socket" to hold the Socket.IO client instance.
  output: Output = {
    inputText: '',
    language: '',
    translatedText: ''
  }

  // variables that hold the strings that we want to show/output
  showText: string = '';
  showLanguage: string = '';
  showTranslatedText: string = '';

  // var to set view of output box in html. 
  // If a text has been translated, this will be set to true and view will appear in html.
  translated: boolean = false;

  constructor() {
    this.socket = io();   // creates a Socket.IO client instance and assigns it "socket"
  }

  // Angular lifecycle hook [ngOnInit()] - it's called after Angular has initialized all data-bound properties
  ngOnInit() {
    this.listen2Events();
  }
  
  // sets up event listeners for the Socket.IO events "onResult" and "onOperation"
  listen2Events() {
    // listener 
    this.socket.on("onTranslate", (data: Output) => {
      this.showText = data.inputText;
      this.showTranslatedText = data.translatedText;

      if (data.language == 'ko'){
        this.showLanguage = "Korean";
      } else if (data.language == 'zh'){
        this.showLanguage = "Chinese";
      } else if (data.language == 'ms'){
        this.showLanguage = "Malay";
      }
      
      this.translated = true;
    });
  }

  saveData() {
    this.socket.emit("translate", this.output);
  }
}

