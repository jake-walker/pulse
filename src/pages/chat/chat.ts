import { Content } from 'ionic-angular';
import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';

@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html'
})
export class ChatPage {
  server: any;
  messages: any;
  scrollOn: boolean;
  socketId: any;

  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController) {
    this.server = navParams.get("server");
    this.messages = [];

    this.scrollOn = true;

    /*for (let i = 0; i < 50; i++) {
      this.messages.push({
        "message": "Look, kid... I've got enough on my plate as it is",
        "author": "Han Solo",
        "time": "2017-04-18 14:33:09.211000",
        "channel": "#star-wars"
      });
    }

    this.messages.push({
      "message": "This is a super long message that goes on and on to test the word wrapping functionality for when people send long messages on ECHO.",
      "author": "Pancake Man",
      "time": "2017-04-19 14:33:09.211000",
      "channel": "#star-wars"
    });*/

    (<any>window).chrome.sockets.tcp.create({}, function(createInfo) {
      (<any>window).chrome.sockets.tcp.connect(createInfo.socketId, this.server.ip, this.server.port, function() {
        this.socketId = createInfo.socketId;
        console.log("Connected!");
      });
    });

    (<any>window).chrome.sockets.tcp.onReceive.addListener((info) => {
      if (info.socketId != this.socketId)
        return;

      console.log(info.data);
    })
  }

  public ionViewDidEnter() {
    if (this.scrollOn) {
      this.content.scrollToBottom(300);
    }
  }

  scroll() {
    if (this.scrollOn) {
      this.content.scrollToBottom(300);
    }
  }

  toggleScroll() {
    if (this.scrollOn) {
      let toast = this.toastCtrl.create({
        message: "Turned off auto scroll",
        duration: 1000
      });
      toast.present();
      this.scrollOn = false;
    } else {
      let toast = this.toastCtrl.create({
        message: "Turned on auto scroll",
        duration: 1000
      });
      toast.present();
      this.scrollOn = true;
    }
  }
}
