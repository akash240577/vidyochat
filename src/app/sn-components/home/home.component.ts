import {Component, OnInit, AfterViewInit, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig} from "@angular/material";
import * as jsSHA from "jssha";
import {VidyoChatMessage} from './dto/VidyoChatMessage';
import {VidyoParticipant} from "./dto/VidyoParticipant";

export interface DialogData {
  userName: string;
  roomName: string;
}

@Component({
  selector: '`app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  private key = "e4405bc75d744a03badbd7521d346743";
  private appID = "801b52.vidyo.io";
  private expiresInSeconds = 86400;
  private host = "prod.vidyo.io";

  private userName = "RSystems";
  private roomName = "VidyoConfRoom";
  private dialog: MatDialog;
  private messages: VidyoChatMessage[];
  public participants: VidyoParticipant[];

  private preview: boolean = true;
  private muted: boolean = false;
  public connected: boolean = false;

  constructor(private matDialog: MatDialog) {
    this.dialog = matDialog;

  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    setTimeout(() => this.openDialog(), 2000)
  }


  generateToken(key, appID, userName, expiresInSeconds, vCard) {
    const EPOCH_SECONDS = 62167219200;
    const expires = Math.floor(Date.now() / 1000) + expiresInSeconds + EPOCH_SECONDS;
    const shaObj = new jsSHA("SHA-384", "TEXT");
    shaObj.setHMACKey(key, "TEXT");
    const jid = userName + '@' + appID;
    const body = 'provision' + '\x00' + jid + '\x00' + expires + '\x00' + vCard;
    shaObj.update(body);
    const mac = shaObj.getHMAC("HEX");
    const serialized = body + '\0' + mac;
    console.log("\nGenerated Token: \n" + btoa(serialized));
    return btoa(serialized);
  }

  openDialog(): void {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      userName: this.userName,
      roomName: this.roomName
    };

    const dialogRef = this.dialog.open(VidyoRoomDialog, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      this.userName = data.userName;
      this.roomName = data.roomName;
    });
  }

  startVideoCall() {

    //TODO need to generate token every time, we should check the token expiry
    const generateTokenValue = this.generateToken(this.key, this.appID, this.userName, this.expiresInSeconds, "");

    if (this.userName != "" && this.roomName != "") {
      vidyoConnector.Connect({
        host: this.host,
        token: generateTokenValue,
        displayName: this.userName,
        resourceId: this.roomName,
        onSuccess: () => {
          console.log("Connected");
          this.connected = true;
        },
        onFailure: reason => {
          console.error("Connection Failed : ", reason);
        },
        onDisconnected: reason => {
          console.log("Connection Disconnected - " + reason);
        }
      }).then(status => {
        if (status) {
          this.connected = true;
          this.registerParticipantEventListener();
          this.registerMessageEventListener();
        }
      }).catch(() => {
        console.log('Connect Error');
      });
    }
  }


  private registerParticipantEventListener() {
    console.log("Registering for Participant's events");

    vidyoConnector.RegisterParticipantEventListener(
      {
        onJoined: (participant) => {
          console.log('Joined', participant);
          this.addNewParticipant(new VidyoParticipant(participant.id, participant.name));
        },
        onLeft: (participant) => {
          console.log('Left', participant);
          this.removeParticipant(new VidyoParticipant(participant.id, participant.name));
        },
        onDynamicChanged: (participants, cameras) => {
        },
        onLoudestChanged: (participant, audioOnly) => {
        }
      }
    ).then(() => {
      console.log("Registered with Participant Events Listener");
    }).catch((e) => {
      console.log(`Error while registering with Participant Events Listener ${e}`);
    });

  }

  private registerMessageEventListener() {
    console.log("Registering for Chat Messages events");
    vidyoConnector.RegisterMessageEventListener({
      onChatMessageReceived: (participant, chatMessage) => {
        console.log(`message received for participant ${participant.id}:${participant.name} - ${chatMessage.body}`);
        this.messages.push(new VidyoChatMessage(participant.id, participant.name, chatMessage.body));
      }
    }).then(() => {
      console.log("Registered with Message Events Listener");
    }).catch(() => {
      console.log("Error while registering with Message Events Listener");
    });
  }

  togglePreview() {
    this.preview = !this.preview;
    console.log(`Toggle Preview to: ${this.preview}`);
    vidyoConnector.ShowPreview(this.preview);
  }

  toggleMic() {
    this.muted = !this.muted;
    console.log(`Toggle mic muted to: ${this.muted}`);
    vidyoConnector.SetMicrophonePrivacy(this.muted);
  }

  toggleConnect() {
    if (this.connected) {
      console.debug("Disconnecting video call");
      vidyoConnector.Disconnect();
      this.connected = false;
    } else {
      this.startVideoCall();
    }
  }

  private addNewParticipant(vidyoParticipant: VidyoParticipant) {
    this.participants.push(vidyoParticipant);
  }

  private removeParticipant(deletedParticipant: VidyoParticipant) {
    this.participants.filter(vidyoParticipant => vidyoParticipant.participantId !== deletedParticipant.participantId);
  }
}

@Component({
  selector: 'vidyo-room-dialog',
  templateUrl: 'vidyo-room-dialog.html',
})
export class VidyoRoomDialog {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }
}
