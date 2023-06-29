import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {emaildata} from "../interfaces/email-interface";


@Injectable( { providedIn: 'root' })
export class ContactService {
  constructor(private http: HttpClient) { }

  sendEmail(data : emaildata): Observable<any> {
    return this.http.post('https://formspree.io/f/xwkdenle', data);
  }
}
