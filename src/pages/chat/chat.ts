import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html'
})
export class ChatPage {

  servers: any;

  constructor(public navCtrl: NavController, storage: Storage) {
    this.servers = [];
    storage.ready().then(() => {
      storage.get("servers").then((val) => {
        this.servers = val;
        console.log("Loaded Servers: ", val);
      });
    });
  }

}
