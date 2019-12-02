import { Injectable } from '@angular/core';

import { Item } from '../../models/item';

@Injectable()
export class Items {
  items: Item[] = [];

  // private happsCollection: AngularFirestoreCollection<Happs>;

  defaultItem: any = {
    "name": "Burt Bear",
    "profilePic": "assets/img/speakers/1.jpg",
    "about": "This is bar 1.",
  };


  constructor() {
    let items = [
      {
        "name": "Burt Bear",
        "profilePic": "assets/img/speakers/1.jpg",
        "about": "This is bar 1."
      },
      {
        "name": "Charlie Cheetah",
        "profilePic": "assets/img/speakers/2.jpg",
        "about": "This is bar 2."
      },
      {
        "name": "Donald Duck",
        "profilePic": "assets/img/speakers/3.jpg",
        "about": "This is bar 3."
      },
      {
        "name": "",
        "profilePic": "assets/img/speakers/4.jpg",
        "about": "This is bar 4."
      }
    ];

    for (let item of items) {
      this.items.push(new Item(item));
    }
  }

  query(params?: any) {
    if (!params) {
      return this.items;
    }

    return this.items.filter((item) => {
      for (let key in params) {
        let field = item[key];
        if (typeof field == 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
          return item;
        } else if (field == params[key]) {
          return item;
        }
      }
      return null;
    });
  }

  add(item: Item) {
    // console.log(this.happsCollection);
    this.items.push(item);
  }

  delete(item: Item) {
    this.items.splice(this.items.indexOf(item), 1);
  }
}
