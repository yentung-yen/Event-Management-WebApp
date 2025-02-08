import { Component, OnInit } from '@angular/core';
import { io } from 'socket.io-client';


@Component({
  selector: 'app-speech-bot',
  templateUrl: './speech-bot.component.html',
  styleUrls: ['./speech-bot.component.css']
})
export class SpeechBotComponent implements OnInit {
  audioList: any[] = [];
  socket: any; 
  audio: string = " ";

  constructor(){
    this.socket = io(); 
  }

  submitBtn(){
    let obj = {
      inputText: this.audio,
  
    }
  
    this.socket.emit('textToSpeech', obj)

  }
  getAudio(){
    this.socket.on("speechResult", (data:any) => {
      this.audioList = data; 
      })
  }
  ngOnInit(){
    this.getAudio()
  }

}
