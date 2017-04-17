import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Storage } from '@ionic/storage';

import { ChatPage } from '../chat/chat';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

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

  connect(server) {
    console.log("Connect to " + server.ip + ":" + server.port + " as " + server.username);
    this.navCtrl.push(ChatPage, {
      server: server
    });
  }

}
