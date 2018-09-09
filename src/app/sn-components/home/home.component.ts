/**
 * @author R Systems Inc.
 * Home Component, responsible for Participants list and Video Chat UI.
 */
import {Observable, of} from "rxjs";

// This statement will load the home component first, so that video container div element is available.
declare const require: any;

import {Component, OnInit, AfterViewInit, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig} from "@angular/material";

// library to generate auth token
declare var jsSHA: any;

// A data transfer object
import {VidyoParticipant} from "./dto/VidyoParticipant";
import {tap} from "rxjs/operators";

/**
 * Interface to be used to obtain username and room id
 */
export interface DialogData {
  userName: string;
  roomName: string;
}

/**
 * Home Component
 */
@Component({
  selector: '`app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  private key = "e4405bc75d744a03badbd7521d346743"; // application key
  private appID = "801b52.vidyo.io"; // application id
  private expiresInSeconds = 86400; // token expire time in seconds
  private host = "prod.vidyo.io";

  public userName = "RSystems"; // default username
  public roomName = "VidyoConfRoom"; // default room id

  // Modal Dialog
  private dialog: MatDialog;

  // Not supporting text chat in this version
  // private messages: VidyoChatMessage[];

  /* Participant list */
  public participants: VidyoParticipant[] = [];

  /* Preview button display toggle control */
  public preview: boolean = true;

  /* Mute button display toggle control */
  public muted: boolean = false;

  /* Call Connect button display toggle control */
  public connected: boolean = false;

  /**
   * Constructor
   *
   * @param matDialog, material modal dialog
   */
  constructor(private matDialog: MatDialog) {
    this.dialog = matDialog;
  }

  ngOnInit() {

  }

  /**
   * Open dialog after 2 seconds, have to added delay due to an issue with material dialog.
   */
  ngAfterViewInit() {
    setTimeout(() => this.openDialog(), 2000)
  }

  /**
   * Generate Auth token required to connect to VidyoConnector
   *
   * @param key
   * @param appID
   * @param userName
   * @param expiresInSeconds
   * @param vCard
   */
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

  /**
   * Open the modal dialog to accept usernamd and room id/name.
   */
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

  /**
   * It will connect to the video call using VidyoConnector#Connect api.
   */
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
          this.connected = false;
          console.error("Connection Failed : ", reason);
        },
        onDisconnected: reason => {
          this.connected = false;
          this.removeAllParticipants();
          console.log("Connection Disconnected - " + reason);
        }
      }).then(status => {
        if (status) {
          this.connected = true;
          this.registerParticipantEventListener();

          // this.registerMessageEventListener(); // UI not ready yet.
        }
      }).catch(() => {
        console.log('Connect Error');
      });
    }
  }

  /**
   * Register for Participant add/join events.
   */
  private registerParticipantEventListener() {
    console.log("Registering for Participant's events");
    let that = this; // can use .bind() as well.

    vidyoConnector.RegisterParticipantEventListener(
      {
        onJoined: (participant) => {
          console.log('Joined', participant);
          that.addNewParticipant(participant.id, participant.name);
        },
        onLeft: (participant) => {
          console.log('Left', participant);
          that.removeParticipant(participant.id);
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

  /**
   * TODO: Not being utilized as of now, since UI isn't ready.
   * Register for message events.
   */
  private registerMessageEventListener() {
    console.log("Registering for Chat Messages events");
    vidyoConnector.RegisterMessageEventListener({
      onChatMessageReceived: (participant, chatMessage) => {
        console.log(`message received for participant ${participant.id}:${participant.name} - ${chatMessage.body}`);
        // this.messages.push(new VidyoChatMessage(participant.id, participant.name, chatMessage.body));
      }
    }).then(() => {
      console.log("Registered with Message Events Listener");
    }).catch(() => {
      console.log("Error while registering with Message Events Listener");
    });
  }

  /**
   * Toggles the preview button/functionality
   */
  togglePreview() {
    this.preview = !this.preview;
    console.log(`Toggle Preview to: ${this.preview}`);
    vidyoConnector.ShowPreview(this.preview);
  }

  /**
   * Toggles the mic button/functionality
   */
  toggleMic() {
    this.muted = !this.muted;
    console.log(`Toggle mic muted to: ${this.muted}`);
    vidyoConnector.SetMicrophonePrivacy(this.muted);
  }

  /**
   * Toggles the video call button/functionality
   */
  toggleConnect() {
    if (this.connected) {
      console.debug("Disconnecting video call");
      vidyoConnector.Disconnect();
      this.connected = false;
    } else {
      this.startVideoCall();
    }
  }

  /**
   * Adds a new participant to the list.
   * @param participantId participant id
   * @param participantName participant name
   */
  private addNewParticipant(participantId: String, participantName: String) {
    this.participants.push(new VidyoParticipant(participantId, participantName));
  }

  /**
   * Remove participant from the list
   * @param deletedParticipantId id of the deleted participant
   */
  private removeParticipant(deletedParticipantId: String) {
    this.participants.filter(vidyoParticipant => vidyoParticipant.participantId !== deletedParticipantId);
  }

  /**
   * Get Participant abbreviation to display in list, get first char, uppercase
   * @param pt
   */
  getParticipantAbbr(pt: VidyoParticipant) {
    return pt.participantName.match(/\b(\w)/g).join('').toUpperCase();
  }

  /**
   * Clears the participants list on disconnect.
   */
  private removeAllParticipants() {
    of().subscribe(data => this.participants = []);
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
