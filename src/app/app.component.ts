import { Component } from '@angular/core';
import {CovidService} from './service/covid.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-trackerproject';
  countries:any=[];
country:any

confirmed:any
recovered:any
death:any
active:any

mydate:any

loader=false

constructor(private service:CovidService)  {

}

ngOnInit()
{
   this.service.getCountry().subscribe(data=>{
    // console.log(data);
    this.countries=data.sort((a,b) => a.Country.localeCompare(b.Country));
    this.mydate=new Date();
    
   })
   this.loader=true
   this.service.getData("Afghanistan").subscribe(data=>{
     // console.log(data);
     this.loader=false
     var index=data.length -1;
     this.confirmed=data[index].Confirmed;
     this.recovered=data[index].Recovered;
     this.death=data[index].Deaths;
     this.active=data[index].Active;
   })  
   
}

getCountry(c:any)
{
  //  console.log(c);
this.country=c  
}

getDetails() 
{
  this.loader=true
this.service.getData(this.country).subscribe(data=>{
  // console.log(data);
  this.loader=false
  var index=data.length -1;
  this.confirmed=data[index].Confirmed;
  this.recovered=data[index].Recovered;
  this.death=data[index].Deaths;
})  
}


}
