// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var isON = false;

function updateIcon() {

  var xmlhttp=new XMLHttpRequest();
  xmlhttp.onreadystatechange=function(){
      if (xmlhttp.readyState==4 && xmlhttp.status==200){
          var data = JSON.parse(xmlhttp.responseText);
          if(data.stream != null){
            if(!isON) {
              isON = true;
              chrome.browserAction.setIcon({path:"qag_on.png"});
              var opt = {
                type: "basic",
                title: "LaViePublique",
                message: "La Vie Publique est en live",
                iconUrl: "qag_on.png"
              };
              chrome.notifications.create('notifyON', opt, function(id) { });
            }
          }else if(isON){
            isON = false;
            chrome.browserAction.setIcon({path:"qag_off.png"});
          }
      }
  }
  xmlhttp.open("GET","https://api.twitch.tv/kraken/streams/zerator",true);
  xmlhttp.send();
}

function goIt(){
  if(isON){
    chrome.tabs.create({url:"http://laviepublique.com/"},function(tab){});
  }
}

chrome.browserAction.onClicked.addListener(goIt);
setInterval(updateIcon,120000);
updateIcon();
