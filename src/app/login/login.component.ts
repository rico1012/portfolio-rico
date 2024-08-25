import {Component, CUSTOM_ELEMENTS_SCHEMA, HostListener} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import { GoogleAuthProvider } from "@firebase/auth";
import {ActivatedRoute, Router} from "@angular/router";
import {first} from "rxjs";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loggedIn: boolean = false
  constructor(public authService: AuthService, private router: Router, private route: ActivatedRoute,) {
  }

  async ngOnInit() {
    this.authService.user$.subscribe((user) =>{
      if (user){
        this.loggedIn = true
      }
      }
    );
  }

  logOut() {
    this.authService.signOut().then(r => {
      this.loggedIn = false;
    })
  }

  async onClick() {
    await this.authService.signIn()
    this.authService.user$.subscribe(async (user) => {
        if (user) {
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || ['/'];
          await this.router.navigateByUrl(returnUrl);
        }
      }
    );

    this.loggedIn = true;




  }
}
