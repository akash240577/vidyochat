var require;
var vidyoConnector;

function onVidyoClientLoaded(status) {
  // console.log("VidyoClient load state - " + status.state);
  // console.log("Renderer Controller : " + $("#sn-vidyo-container").length)
  if (status.state == "READY") {
    VC.CreateVidyoConnector({
      viewId: "vidyo-container",
      viewStyle: "VIDYO_CONNECTORVIEWSTYLE_Default",
      remoteParticipants: 10,
      logFileFilter: "error",
      logFileName: "",
      userData: ""
    }).then(function (vc) {
      console.log("VidyoClient Success", vc);
      vidyoConnector = vc;
    }).catch(function (error) {
      console.log("VidyoClient failed", error);
      onVidyoClientLoaded(status);
    });
  }
}
