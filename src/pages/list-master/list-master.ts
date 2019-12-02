import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController } from 'ionic-angular';

import { Item } from '../../models/item';
import { Items } from '../../providers';

import { Settings } from '../../providers';


@IonicPage()
@Component({
  selector: 'page-list-master',
  templateUrl: 'list-master.html'
})


export class ListMasterPage {
  currentItems: Item[];
  currentHapp: string = "";
  currentUserName: string = "";

  constructor(public navCtrl: NavController, public items: Items, public modalCtrl: ModalController, public settings: Settings) {
    this.currentItems = this.items.query();
    console.log("this happened again constructor");
    this.settings.load();

    console.log(this.settings.allSettings);
  }

  /**
   * The view loaded, let's query our items for the list
   */
  ionViewDidLoad() {

    console.log("This is ionViewDidLoad");
    
    this.settings.load().then(() => {
      this.currentUserName = this.settings.allSettings['option1'];

      if (this.currentUserName.length == 0) {
        this.navCtrl.setRoot(ListMasterPage);  
      }

    });

  }

  /**
   * Prompt the user to add a new item. This shows our ItemCreatePage in a
   * modal and then adds the new item to our data source if the user created one.
   */
  addItem() {
    let addModal = this.modalCtrl.create('ItemCreatePage');
    addModal.onDidDismiss(item => {
      if (item) {
        console.log(item);
        this.items.add(item);
      }
    })
    addModal.present();
  }

  addItemDirectlyFrompage() {
    var item = {'about': this.currentHapp, 'profilePic': ""};
    if (this.currentHapp) {
      this.items.add(item);
    }
    this.currentHapp = "";
  }

  /**
   * Delete an item from the list of items.
   */
  deleteItem(item) {
    this.items.delete(item);
  }

  /**
   * Navigate to the detail page for this item.
   */
  openItem(item: Item) {
    this.navCtrl.push('ItemDetailPage', {
      item: item
    });
  }
}
