import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {Meta} from "@angular/platform-browser";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  standalone: true,
  imports: [MatCardModule],
})
export class AboutComponent {
  public _age = 0;

  constructor(private meta: Meta) {}

  ngOnInit(): void {
    const birthday = new Date(2003, 12, 1);
    const today = new Date();
    this._age = today.getFullYear() - birthday.getFullYear();
    const m = today.getMonth() - birthday.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthday.getDate())) {
      this._age--;
    }

    this.meta.addTags([
      { name: 'title', content: 'Rico Vossestein - About me' },
      { name: 'description', content: 'Rico Vossestein is an'+this._age+' year old HBO-ICT student at the Hogeschool Utrecht. He is a front-end developer and has a passion for web development.' },
      { name: 'keywords', content: 'Rico Vossestein, student, webdeveloper, front-end' }
    ]);
  }

}
