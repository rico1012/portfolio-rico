import { Component } from '@angular/core';
import {GroupService} from "../services/group.service";
import {GroupInterface} from "../interfaces/group-interface";

@Component({
  selector: 'app-pictures',
  templateUrl: './pictures.component.html',
  styleUrl: './pictures.component.scss'
})
export class PicturesComponent {

  group: GroupInterface | null = null;

  photos: {url: string, photographer: string}[]  = [];

  constructor(private groupService: GroupService) {
    this.groupService.getCurrentGroup().then(r => {
      this.group = r;

      r?.members.forEach(member => {
        member.pictures.forEach(picture => {
          this.photos.push({url: picture, photographer: member.User.username});
        })
      })
    })
  }

}
