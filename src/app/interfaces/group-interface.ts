import {UserInterface} from "./user-interface";

export interface GroupInterface{
  id: string;
  name: string;
  members: {
    User: UserInterface;
    pictures: string[];
  }[];
  maxPictures: number;
  endDate: number;
}
