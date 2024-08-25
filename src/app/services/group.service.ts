import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Injectable } from "@angular/core";
import { GroupInterface } from "../interfaces/group-interface";
import { UserInterface } from "../interfaces/user-interface";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { ActivatedRoute, Router } from "@angular/router";

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  currentGroup: GroupInterface | null = null;
  private groupInitialized: Promise<void>;

  constructor(
    private afs: AngularFirestore,
    private fireAuth: AngularFireAuth,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.groupInitialized = this.initializeGroup();
  }

  private async initializeGroup(): Promise<void> {
    try {
      const groupId = this.route.snapshot.queryParamMap.get('id');
      if (!groupId) {
        this.router.navigateByUrl('/');
        return;
      }

      const groupDoc = await this.afs.collection('groups').doc(groupId).ref.get();
      if (groupDoc.exists) {
        this.currentGroup = {
          ...(groupDoc.data() as GroupInterface),
          id: groupDoc.id,
        };
      } else {
        this.router.navigateByUrl('/');
      }
    } catch (error) {
      console.error('Error initializing group:', error);
      this.router.navigateByUrl('/');
    }
  }

  async addPictureToGroup(picturePath: string): Promise<void> {
    await this.groupInitialized; // Zorgt ervoor dat de groep is geïnitialiseerd.

    const currentUser = await this.fireAuth.currentUser;
    if (!currentUser) {
      return;
    }

    const picturesLeft = await this.picturesLeftToTake(currentUser.email!);
    if (picturesLeft <= 0 || !this.currentGroup) {
      return;
    }

    const member = this.currentGroup.members?.find(
      (m) => m.User.email === currentUser.email
    );

    if (member) {
      member.pictures.push(picturePath);
    } else {
      const newUser: UserInterface = {
        email: currentUser.email!,
        username: currentUser.displayName || 'Unknown',
      };
      this.currentGroup.members?.push({ User: newUser, pictures: [picturePath] });
    }

    try {
      await this.afs.collection('groups').doc(this.currentGroup.id).update(this.currentGroup);
    } catch (error) {
      console.error('Error updating group:', error);
    }
  }

  async getCurrentGroup(): Promise<GroupInterface | null> {
    await this.groupInitialized;

    if (!this.currentGroup) return null;

    if (this.currentGroup.endDate > Math.floor(Date.now() / 1000)){
      await this.router.navigateByUrl('/disposable?id=' + this.currentGroup.id)
    }
    return this.currentGroup;
  }

  async picturesLeftToTake(currentUserEmail: string): Promise<number> {
    await this.groupInitialized;

    if (!this.currentGroup) return 0;

    if (this.currentGroup.members.length === 0) return this.currentGroup.maxPictures;

    if (this.currentGroup.endDate < Math.floor(Date.now() / 1000)){
      await this.router.navigateByUrl('/pictures?id=' + this.currentGroup.id)
    }


    const member = this.currentGroup.members?.find(
      (m) => m.User.email === currentUserEmail
    );

    return member
      ? (this.currentGroup.maxPictures ?? 0) - member.pictures.length
      : this.currentGroup.maxPictures ?? 25;
  }
}


