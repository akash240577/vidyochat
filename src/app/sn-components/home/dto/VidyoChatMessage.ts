import {VidyoParticipant} from "./VidyoParticipant";

export class VidyoChatMessage {
  participant: VidyoParticipant;
  message: String;


  constructor(participantId: String, participantName: String, message: String) {
    this.participant = new VidyoParticipant(participantId, participantName);
    this.message = message;
  }
}
