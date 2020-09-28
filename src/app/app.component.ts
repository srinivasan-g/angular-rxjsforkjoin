import { Component, OnInit } from '@angular/core';
import { of, forkJoin, Observable, Subject } from 'rxjs';
import { mergeMap, delay, takeUntil, tap, map } from 'rxjs/operators';
export class SonDetails {
  name?: string;
  id?: number;
}
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})


export class AppComponent implements OnInit  {
  name = 'Angular';
destroyed = new Subject<boolean>();
obj ={
  id:Number,
  name:String,
  fatherName:String,
  motherName:String
}
ngOnInit(){


console.log(this.getData());

}
//[{id: pv.id,name: pv.name,momName: cv.name}]: null
getData(){
  const response1 = this.getFirstApi();
  const response2 = this.getSecoundApi();
  const response3 = this.getThirdApi();
   forkJoin(response1,response2, response3).pipe(
     map((f => {
       return f.reduce((pv, cv)=> {
         return pv.id == cv.id ? 
        'yes id' : 'no id'
       },this.obj)
       console.log('f',f)
     })),
     takeUntil(this.destroyed)
   ).subscribe(data=> console.log(data))
}

  getFirstApi():Observable<SonDetails>{
    return of({
      id: 1,
      name:'kaushik'
    },
    {
      id: 1,
      name:'dhakasha'
    }).pipe(
      delay(500)
    )
  }
  getSecoundApi():Observable<any>{
    return of({
      id: 1,
      motherName:'Anitha'
    },
    {
      id: 1,
      motherName:'Jothi'
    }).pipe(
      delay(1000)
    )
  }
   getThirdApi():Observable<any>{
    return of({
      id: 1,
      fatherName:'Srinivasan'
    },
    {
      id: 1,
      fatherName:'Senthil'
    }).pipe(
      delay(1000)
    )
  }
}
