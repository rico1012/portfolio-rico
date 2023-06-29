import { Component } from '@angular/core';
import {ContactService} from "../services/contact-service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  email: string = '';
  message: string = '';

  constructor(
    private _contactService: ContactService,
    private _snackBar: MatSnackBar
  ) {
  }

  openMail() {
    window.open('mailto:ricovossestein@gmail.com?subject=Contact%20from%20website');
  }

  openInstagram() {
    window.open('http://ig.me/m/ricovossestein');
  }

  sendEmail(event: any) {
    const data = {
      email: event.target.email.value,
      message: event.target.message.value
    };
    const regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

    if (regexp.test(data.email)) {
      this._contactService.sendEmail(data).subscribe((data) => {
        console.log(data);
      });
      this._snackBar.open('Email sent successfully', 'Close', {
        duration: 10000,
        panelClass: ['green-snackbar']
      });
      return;
    }

    if (data.email === '' || data.message === '') {
      this._snackBar.open('Email and message are required', 'Close', {
        duration: 10000,
        panelClass: ['red-snackbar']
      });
      return;
    }

    this._snackBar.open('Invalid email', 'Close', {
      duration: 10000,
      panelClass: ['red-snackbar']
    });
  }

}
