import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class ContactService {
  constructor(private http: HttpClient) { }

  sendEmail(data : any): Observable<any> {
    return this.http.post('https://formspree.io/f/xwkdenle', data);
  }
}
