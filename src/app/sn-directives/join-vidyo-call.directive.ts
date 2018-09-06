declare function generateToken(key, appID, userName, expiresInSeconds, vcard);

declare var vidyoConnector: any;

import {Directive, ElementRef, Renderer, HostListener, style} from '@angular/core';
import * as jsSHA from "jssha";

@Directive({
  selector: '[appJoinVidyoCall]',
})
export class JoinVidyoCallDirective {

  public userName: string = "ac";
  public roomName: string = "demoRoom";
  public key = "e1630d5961d34afaad28b6a3fbf1e601";
  public appID = "6eb383.vidyo.io";
  public expiresInSeconds = 86400;
  public userInfo: any;

  constructor(private el: ElementRef) {
  }

  @HostListener('click', ['$event']) onclick($event) {
    this.userInfo = this.el.nativeElement.getAttribute('data-userinfo').toString().split('|');
    if (this.userInfo.length == 2) {
      this.userName = this.userInfo[0].toString();
      this.roomName = this.userInfo[1].toString();
    }

    const generateTokenValue = generateToken(this.key, this.appID, this.userName, this.expiresInSeconds, "");

    if (this.userName != "" && this.roomName != "") {
      vidyoConnector.Connect({
        host: "prod.vidyo.io",
        token: generateTokenValue,
        displayName: this.userName,
        resourceId: this.roomName,
        onSuccess: function () {
          console.log("Connected");
        },
        onFailure: function (reason) {
          console.error("Connection Failed : ", reason);
        },
        onDisconnected: function (reason) {
          console.log("Connection Disconnected - " + reason);
        }
      });
    }
    else {
      $(".sn-vidyo-user-details").fadeIn();
    }
  }

  generateToken(key, appID, userName, expiresInSeconds, vCard) {
    var EPOCH_SECONDS = 62167219200;
    var expires = Math.floor(Date.now() / 1000) + expiresInSeconds + EPOCH_SECONDS;
    var shaObj = new jsSHA("SHA-384", "TEXT");
    shaObj.setHMACKey(key, "TEXT");
    var jid = userName + '@' + appID;
    var body = 'provision' + '\x00' + jid + '\x00' + expires + '\x00' + vCard;
    shaObj.update(body);
    var mac = shaObj.getHMAC("HEX");
    var serialized = body + '\0' + mac;
    console.log("\nGenerated Token: \n" + btoa(serialized));
    return btoa(serialized);
  }
}
