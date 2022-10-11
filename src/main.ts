/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log("Script started successfully");

let currentPopup: any = undefined;

// Waiting for the API to be ready
WA.onInit()
  .then(() => {
    console.log("Scripting API ready");
    console.log("Player tags: ", WA.player.tags);

    const today = new Date();

    WA.room.onEnterLayer("clockZone").subscribe(() => {
      const time = today.getHours() + ":" + today.getMinutes();
      currentPopup = WA.ui.openPopup("clockPopup", "It's " + time, []);
    });

    WA.room.onLeaveLayer("clockZone").subscribe(closePopUp);

    if (today.getHours() < 12 || today.getHours() > 14) {
      WA.controls.disablePlayerControls();
      WA.ui.openPopup("Welcome", "Ouverture des portes à midi !!", []);
    }

    // The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
    bootstrapExtra()
      .then(() => {
        console.log("Scripting API Extra ready");
      })
      .catch((e) => console.error(e));
  })
  .catch((e) => console.error(e));

function closePopUp() {
  if (currentPopup !== undefined) {
    currentPopup.close();
    currentPopup = undefined;
  }
}

export {};
