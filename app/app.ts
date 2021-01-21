/*
In NativeScript, the app.ts file is the entry point to your application.
You can use this file to perform app-level initialization, but the primary
purpose of the file is to pass control to the app’s first module.
*/

import { svelteNative } from "svelte-native";
import App from  "./App.svelte";
import * as utils from "@nativescript/core/utils/utils";
import * as frame from "@nativescript/core/ui/frame";
import { ViewBase } from "@nativescript/core/ui/core/view-base";

declare const android: any;

if (utils.ad) {
    // Android: Load either the TV or phone UI
    const uiModeManager = utils.ad.getApplicationContext().getSystemService(android.content.Context.UI_MODE_SERVICE);
    if (uiModeManager.getCurrentModeType() === android.content.res.Configuration.UI_MODE_TYPE_TELEVISION) {
        svelteNative(App, { isAndroidTv: true });
    } else {
        svelteNative(App, { isAndroid: true });
    }
} else {
    // iOS
    svelteNative(App, { isIos: true});
}
