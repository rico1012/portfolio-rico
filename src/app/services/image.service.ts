import {Injectable} from "@angular/core";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {ref, Storage, uploadBytesResumable} from "@angular/fire/storage";
import { v4 as uuid } from 'uuid';
import {GroupService} from "./group.service";

@Injectable( { providedIn: 'root' })
export class ImageService {

  constructor(public firestorage: AngularFireStorage,
              private groupService: GroupService) {
  }

  b64ToBlob(b64Data: string): Blob{
    const byteCharacters = atob(b64Data);
    const byteArrays = [];
    const sliceSize = 512;

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, {type: 'image/png'});
    return blob;
  }

  uploadImage(blob: string){
    this.firestorage.upload('pictures/'+uuid(), this.b64ToBlob(blob.split("data:image/png;base64,").pop() ?? '')).then(async (r) => {
      await this.groupService.addPictureToGroup(await r.ref.getDownloadURL())
    });
  }
}
