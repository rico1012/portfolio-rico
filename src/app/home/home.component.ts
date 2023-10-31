import { Component } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(private meta: Meta) {}

  ngOnInit(): void {
    this.meta.addTags([
      { name: 'title', content: 'Rico Vossestein - Front-end developer' },
      { name: 'description', content: 'The portfolio of front-end developer Rico Vossestein. An 19 year old HBO-ICT student at the Hogeschool Utrecht.' },
      { name: 'keywords', content: 'Rico Vossestein, portfolio, developer, front-end' }
    ]);
  }
}
