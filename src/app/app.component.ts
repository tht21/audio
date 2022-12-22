import { Component } from '@angular/core';
import { observable, Observable, switchMap } from 'rxjs';
import * as moment from "moment";
import* as xml2js from 'xml2js'; 
import { HttpClient,HttpHeaders } from '@angular/common/http';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
  
})
export class AppComponent {
  title = 'audio';
  audioObj = new Audio();
  audioEvents = [
    "ended",
    "error",
    "play",
    "playing",
    "pause",
    "timeupdate",
    "canplay",
    "loadedmetadata",
    "loadstart"
  ];

  
  
  public xmlItems: any;
  constructor(private http:HttpClient) {
 //this.getEmployees();
    // this.loadXML(); 

  }
  // getEmployees() {
    
  //   this.http.get('https://storage.googleapis.com/ikara-storage/ikara/lyrics.xml', { responseType: 'text' }).subscribe(response => {
  //     console.log(response);
  //   });
      
   
 // }
 
   //getting data function
 loadXML()
 {
   /*Read Data*/
   this.http.get('https://storage.googleapis.com/ikara-storage/ikara/lyrics.xml',  
   {  
     headers: new HttpHeaders()  
       .set('Content-Type', 'text/xml')  
       .append('Access-Control-Allow-Methods', 'GET')  
       .append('Access-Control-Allow-Origin', '*')  
       .append('Access-Control-Allow-Headers', "Access-Control-Allow-Headers, Access-Control-Allow-Origin, Access-Control-Request-Method"),  
     responseType: 'text'  
    
     
   })  
   .subscribe((data) => {  

     this.parseXML(data)

       .then((data) => {  
         this.xmlItems = data;  
   
       });  
   });  
   /*Read Data*/
 
 }

 parseXML(data:any) {  
  return new Promise(resolve => {  
    var k: string | number,  
      arr :any[],  
      parser = new xml2js.Parser(  
        {  
          strict: false,  
          trim: true  
        });  
    parser.parseString(data, function (err, result) {  
console.log(1222);

    console.log(result);
    
      // for (k in obj.param) {  
      //   var item = obj.param[k];        
      //   console.log(588555, item.i);
      //   for (const o in  item.i) {
      //     console.log(5,  item.i);
      //    }
 
      //   // arr.push({  ,  
          
      //   // });  
      // }  
      resolve(arr);  
    });  
  });  
}  
  files = [{
    url: '../assets/beat.mp3',
    name: 'm1'
  }]
  currentTime = 0
  duration = 0
  seek = 0
  streamObserver(url: any) {
    return new Observable(observable => {
      this.audioObj.src = url;
      this.audioObj.load();
      this.audioObj.play();


      const handler = (event: Event) => {
      console.log(event);
        this.seek =  this.audioObj.currentTime;
        this.duration = this.audioObj.duration;
        this.currentTime = this.audioObj.currentTime;

      };

      this.addEvents(this.audioObj, this.audioEvents, handler);
      return () => {
        this.audioObj.pause();
        this.audioObj.currentTime = 0;
        this.removeEvents(this.audioObj, this.audioEvents, handler);

      }
    })
  }

  setvolume(ev: any) {
    this.audioObj.volume = ev.target.value;
    console.log(ev.target.value);

  }

  openFile(url: any) {
    let event: Event

    console.log(url);

  }
  play() {
    console.log(1111);
    const url: any = '../assets/beat.mp3'
    this.streamObserver(url).subscribe(event => { })
    this.audioObj.play();
  }
  pause() {
    this.audioObj.pause();
    console.log(2222);

  }
  stop() {
    this.audioObj.pause();
    this.audioObj.currentTime = 0;
    console.log(3333);

  }
  addEvents(obj: any, events: any[], handler: any) {
    events.forEach(event => {
      obj.addEventListener(event, handler);
    });
  }

  removeEvents(obj: any, events: any[], handler: any) {
    events.forEach(event => {
      obj.removeEventListener(event, handler);
    });
  }
  setSeekTo(ev: any) {
    this.audioObj.currentTime = ev.target.value;
  }

  formatTime(time: number, format: string = "HH:mm:ss") {
    const momentTime = time * 1000;
    return moment.utc(momentTime).format(format);
  }


}
