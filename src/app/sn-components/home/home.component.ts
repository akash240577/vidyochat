declare var $: any;
import { Component, OnInit, AfterContentInit } from '@angular/core';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterContentInit {

  constructor( ) { }

  public userName: string = "";
  public roomName: string = "";

  ngOnInit() {

    if (this.userName == "" || parseInt(this.roomName) <= 0) {
      $(".sn-vidyo-user-details").fadeIn();
    }

    $(".btn-sn-vidyo-user-details-submit").on("click", function () {

      $(".sn-modal-error").hide();

      var hasError = false;
      this.userName = $(".txt-user-details-name").val();
      this.roomName = $(".txt-user-details-room option:selected").text();

      if (this.userName == "") {
        hasError = true;
        $(".sn-modal-error.user-name").fadeIn();
      }
      if (parseInt(this.roomName) <= 0) {
        hasError = true;
        $(".sn-modal-error.user-room").fadeIn();
      }

      if (hasError) {
        return;
      }
      else {
        $(".sn-vidyo-user-details").fadeOut();
        $(".sn-vidyo-videocam").attr("data-userinfo", this.userName + "|" + this.roomName );
       // $(".sn-vidyo-videocam").attr('onclick', 'joinVidyoCall(\'' + this.userName + '\', \'' + this.roomName + '\')');        
      }
    });

  }

  ngAfterContentInit() {
    try {
      
    }
    catch (err) { console.log(err); }
  }
}
