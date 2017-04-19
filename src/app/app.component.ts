import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Storage } from '@ionic/storage';

import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, storage: Storage) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    storage.ready().then(() => {
      storage.get("servers").then((val) => {
        if (val == null || val === false) {
          storage.set("servers", [
            {
              name: "ECHO Official",
              ip: "194.135.84.73",
              port: 6666,
              username: "Pulse" + (Math.floor(Math.random() * (Math.floor(99999) - Math.ceil(11111))) + Math.ceil(11111))
            }
          ]);
        }
      });
    });
  }
}
