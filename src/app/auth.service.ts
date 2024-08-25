import {Injectable} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {GoogleAuthProvider} from "@firebase/auth";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Observable} from "rxjs";



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public fireAuth: AngularFireAuth, public afs: AngularFirestore){}

  user$ = this.fireAuth.authState;


  get isAuthenticated(): boolean {
    let userBool = false;
    this.fireAuth.authState
    return userBool;
  }


  async signIn() {
    const creds = await this.fireAuth.signInWithPopup(
      new GoogleAuthProvider(),
    );
    await this.afs.collection('users').add({
      username: creds.user?.displayName,
      email: creds.user?.email,
    })

  }


  signOut(){
    return this.fireAuth.signOut();
  }



}
