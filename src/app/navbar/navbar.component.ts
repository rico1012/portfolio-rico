import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  lastSelectedTab: string = 'home';

  constructor(
    private _router: Router,
  ) {
  }



  ngOnInit(): void {
    this.changeTabColor();
  }

  goToTab(tab: string): void {
    this.changeTabColor();
    this._router.navigate([`/${tab}`]);
  }

  changeTabColor(): void {
    this._router.events.subscribe(() => {
      let tab =  this._router.url.split('/')[1];
      let lastSelectedTabElement = document.getElementById(this.lastSelectedTab + '-tab');
      // @ts-ignore
      lastSelectedTabElement.style.color = 'black';

      if (tab === '') {
        tab = 'home';
      }

      let selectedTabElement = document.getElementById(tab + '-tab');
      // @ts-ignore
      selectedTabElement.style.color = '#FB8500';
      this.lastSelectedTab = tab;
    });

  }

}
