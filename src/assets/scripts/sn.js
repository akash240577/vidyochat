// //function Name : arguments.callee.toString().match(/function ([^\(]+)/)[1]
//
// var
//     sn_top_wrapper_height = 50,
//     sn_top_wrapper_min_height = 0,
//     sn_top_wrapper_max_height = 50,
//     sn_left_wrapper_width = 40,
//     sn_left_wrapper_min_width = 0,
//     sn_left_wrapper_max_width = 40,
//     sn_left_wrapper_right_margin = 1,
//     sn_page_content_top_height = 40,
//     sn_page_content_bottom_height = 40,
//     sn_menu_icon_dimension = 18;
//
//
// $(window).resize(snResize);
//
// $(document).ready(function () {
//     try {
//         snResize();
//     }
//     catch (err) {
//         console.log("app-err : $(document).ready()", err);
//     }
// });
//
// function snResize() {
//     var html_width = $("html").width();
//     var html_height = $("html").height();
//
//
//     try {
//         $("#sn-top-wrapper").css({
//             "width": html_width + "px",
//             "height": sn_top_wrapper_height + "px",
//         });
//
//         $("#sn-left-wrapper").css({
//             "width": sn_left_wrapper_width + "px",
//             "height": html_height - sn_top_wrapper_height + "px",
//             "top": sn_top_wrapper_height + "px",
//             "margin-right": sn_left_wrapper_right_margin + "px",
//         });
//
//         $("#sn-main-wrapper").css({
//             "width": html_width - sn_left_wrapper_width + "px",
//             "height": html_height - sn_top_wrapper_height + "px",
//             "top": sn_top_wrapper_height + "px",
//             "left": sn_left_wrapper_width + sn_left_wrapper_right_margin + "px",
//         });
//
//         $(".sn-modal").css({
//             "width": html_width + "px",
//             "height": html_height + "px",
//         });
//
//         setAutoHeight();
//         setAutoMargin();
//     }
//     catch (err) { console.log("app-err : snResize", err); }
// }
//
// function setAutoHeight() {
//     var html_width = $("html").width();
//     var html_height = $("html").height();
//     try {
//         // $(".sn-page-content").each(function () {
//         //     $(this).css({
//         //         "width": $("#sn-main-wrapper").width() + "px",
//         //         "height": $("#sn-main-wrapper").height() + "px",
//         //     });
//         //
//         //     var this_width = $(this).width();
//         //     var this_height = $(this).height();
//         //
//         //     $(this).find($(".sn-page-content-top")).css({
//         //         "width": this_width + "px",
//         //         "height": sn_page_content_top_height + "px",
//         //     });
//         //
//         //     var content_top_height = $(this).find($(".sn-page-content-top")).height();
//         //     var content_bottom_height = 0;
//         //
//         //     if ($(this).find($(".sn-page-content-bottom")).length > 0) {
//         //         $(this).find($(".sn-page-content-bottom")).css({
//         //             "width": this_width + "px",
//         //             "height": sn_page_content_bottom_height + "px",
//         //         });
//         //         content_bottom_height = $(this).find($(".sn-page-content-bottom")).height();
//         //     }
//         //
//         //     $(this).find($(".sn-page-content-container")).css({
//         //         "width": this_width + "px",
//         //         "height": this_height - content_top_height - content_bottom_height + "px",
//         //     });
//         // });
//
//         $(".sn-inner-wrapper").each(function () {
//             var parentWidth = $(this).parent().width();
//             var parentHeight = $(this).parent().height();
//
//             var thisPadding = getIntSafe($(this).attr("data-sn-padding"));
//
//             $(this).css({
//                 "width": parentWidth + "px",
//                 "height": parentHeight + "px",
//                 "padding": thisPadding + "px",
//             });
//
//             //Set Page Content Top style details :
//             if ($(this).parent().hasClass("sn-page-content-top")) {
//                 var contentHeader = $(this).find($(".sn-content-header"));
//                 if (contentHeader.length > 0) {
//                     contentHeader.each(function () {
//                         $(this).css({
//                             "height": parentHeight - (2 * thisPadding) + "px",
//                         });
//                     });
//                 }
//
//                 var menuItem = $(this).find($(".sn-menu-item"));
//                 if (menuItem.length > 0) {
//                     menuItem.each(function () {
//                         $(this).css({
//                             "height": parentHeight - (2 * thisPadding) + "px",
//                             "width": parentHeight + "px",
//                             "margin-right": thisPadding + "px",
//                         });
//                     });
//                 }
//             }
//
//             //Set Page Content Bottom style details :
//             if ($(this).parent().hasClass("sn-page-content-bottom")) {
//                 var bottomMenuItem = $(this).find($(".sn-menu-item"));
//                 if (bottomMenuItem.length > 0) {
//                     bottomMenuItem.each(function () {
//                         var dataSnPadding = getIntSafe($(this).attr("data-sn-padding"));
//                         $(this).css({
//                             "height": parentHeight - (2 * thisPadding) + "px",
//                             "width": (dataSnPadding > 0) ? ("auto") : (parentHeight - (2 * thisPadding)) + "px",
//                             "padding": (dataSnPadding > 0) ? ("0px " + dataSnPadding + "px") : ("0px"),
//                         });
//                     });
//                 }
//             }
//
//             //Set Left Menu Icon details :
//             if ($(this).parent().hasClass("sn-left-wrapper")) {
//                 var menuItem = $(this).find($(".sn-menu-item"));
//                 if (menuItem.length > 0) {
//                     menuItem.each(function () {
//                         $(this).css({
//                             "width": sn_left_wrapper_max_width - (2 * thisPadding) + "px",
//                             "height": sn_left_wrapper_max_width - (2 * thisPadding) + "px",
//                         });
//                     });
//                 }
//             }
//
//             //Set Top Menu Icon details :
//             if ($(this).parent().hasClass("sn-top-wrapper")) {
//                 var topMenuItem = $(this).find($(".sn-menu-item"));
//                 if (topMenuItem.length > 0) {
//                     topMenuItem.each(function () {
//                         $(this).css({
//                             "height": parentHeight + "px",
//                             "width": sn_left_wrapper_max_width + "px",
//                         });
//
//                         //Menu Button Settings
//                         if ($(this).hasClass("sn-menu-item-main")) {
//                             $(this).off().on("click", function () {
//                                 var leftWrapperWidth = $("#sn-left-wrapper").width();
//                                 if (leftWrapperWidth == sn_left_wrapper_max_width) {
//                                     sn_left_wrapper_width = sn_left_wrapper_min_width;
//                                     sn_left_wrapper_right_margin = 0;
//                                     $("#sn-left-wrapper").css({
//                                         "overflow": "hidden"
//                                     })
//                                 }
//                                 else if (leftWrapperWidth == sn_left_wrapper_min_width) {
//                                     sn_left_wrapper_right_margin = 1;
//                                     sn_left_wrapper_width = sn_left_wrapper_max_width;
//                                     $("#sn-left-wrapper").css({
//                                         "overflow": "inherit"
//                                     })
//                                 }
//                                 snResize();
//                             });
//                         }
//                     });
//                 }
//
//                 var topLogoItem = $(this).find($(".sn-logo-item"));
//                 if (topLogoItem.length > 0) {
//                     topLogoItem.each(function () {
//                         var dataSnPadding = getIntSafe($(this).attr("data-sn-padding"));
//                         $(this).css({
//                             "height": parentHeight + "px",
//                             "width": "auto",
//                             "padding": "0px " + dataSnPadding + "px",
//                         });
//                     });
//                 }
//             }
//
//         });
//
//         $(".sn-block-td").each(function () {
//             $(this).css({
//                 "height": $(this).parent().height() + "px",
//             });
//         });
//
//         if (!isMobileDevice()) {
//             $(".sn-tooltip").each(function () {
//                 var snTooltip = $(this).find($(".sn-tooltip-text"));
//                 if (snTooltip.length == 0) {
//                     var thisHtml = $(this).html();
//                     var spntoolTip = "<span class='sn-tooltip-text'>" + $(this).attr("data-sn-tooltip") + "</span>"
//                     $(this).html(thisHtml + spntoolTip);
//                 }
//                 else if (snTooltip.length > 1) {
//                     snTooltip.each(function () {
//                         $(this).remove();
//                     });
//                 }
//             });
//         }
//         else {
//             $(".sn-tooltip-text").each(function () {
//                 $(this).remove();
//             });
//         }
//     }
//     catch (err) { console.log("app-err : setAutoHeight", err); }
// }
//
// function setAutoMargin() {
//     try {
//         $(".sn-menu-icon").each(function () {
//             $(this).css({
//                 "width": "18px",
//                 "height": "18px",
//                 "margin": ((($(this).parent().height() - sn_menu_icon_dimension) / 2).toFixed()) + "px " + ((($(this).parent().width() - sn_menu_icon_dimension) / 2).toFixed()) + "px"
//             });
//         });
//
//         var html_width = $("html").width();
//         var html_height = $("html").height();
//
//
//         $(".sn-modal-container").each(function () {
//             $(this).css({
//                 "top": ($(this).parent().height() - $(this).height()) / 2 + "px",
//                 "left": ($(this).parent().width() - $(this).width()) / 2 + "px",
//             });
//         });
//     }
//     catch (err) { console.log("app-err : setAutoMargin", err); }
// }
//
// function isMobileDevice() {
//     var isMobile = false; //initiate as false
//     // device detection
//     if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
//         || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) isMobile = true;
//     return isMobile;
// }
//
// function getIntSafe(value) {
//     var returnValue = 0;
//     try {
//         if (parseInt(value) > 0) {
//             returnValue = parseInt(value);
//         }
//     }
//     catch (err) { console.log("app-err : getIntSafe", err); }
//     return returnValue;
// }
