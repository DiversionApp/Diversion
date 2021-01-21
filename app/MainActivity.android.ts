import * as application from "@nativescript/core/application";
import * as frame from "@nativescript/core/ui/frame";
import {Color} from "@nativescript/core/color"
import colors from "@nativescript/core/color/known-colors"

declare const android: any;
declare const androidx: any;
declare const console: any;

const superProto = androidx.appcompat.app.AppCompatActivity.prototype;
androidx.appcompat.app.AppCompatActivity.extend("org.myApp.MainActivity", {
    onCreate: function (savedInstanceState) {
        // Set the isNativeScriptActivity in onCreate (as done in the original NativeScript activity code)
        // The JS constructor might not be called because the activity is created from Android.
        this.isNativeScriptActivity = true;
        if (!this._callbacks) {
            frame.setActivityCallbacks(this);
        }
        // Modules will take care of calling super.onCreate, do not call it here
        this._callbacks.onCreate(this, savedInstanceState, this.getIntent(), superProto.onCreate);

        // Add custom initialization logic here
    },
    onSaveInstanceState: function (outState) {
        this._callbacks.onSaveInstanceState(this, outState, superProto.onSaveInstanceState);
    },
    onStart: function () {
        this._callbacks.onStart(this, superProto.onStart);
    },
    onStop: function () {
        this._callbacks.onStop(this, superProto.onStop);
    },
    onDestroy: function () {
        this._callbacks.onDestroy(this, superProto.onDestroy);
    },
    onBackPressed: function () {
        this._callbacks.onBackPressed(this, superProto.onBackPressed);
    },
    onRequestPermissionsResult: function (requestCode, permissions, grantResults) {
        this._callbacks.onRequestPermissionsResult(this, requestCode, permissions, grantResults, undefined);
    },
    onActivityResult: function (requestCode, resultCode, data) {
        this._callbacks.onActivityResult(this, requestCode, resultCode, data, superProto.onActivityResult);
    },
    dispatchKeyEvent: function (event): boolean {
        const focusedElm = this.getCurrentFocus()

        if (focusedElm && focusedElm !== this.highlightedElement) {

            if (this.highlightedElement) {
                this.highlightedElement.setBackgroundColor(android.graphics.Color.parseColor("#00E9E9E9"))
                this.highlightedElement.setTextColor && this.highlightedElement.setTextColor(android.graphics.Color.parseColor("#FFAAAAAA"))
                if (focusedElm.getId() === -1) {
                    this.highlightedElement.setTextColor && this.highlightedElement.setTextColor(android.graphics.Color.parseColor("#FFE4E4E4"))
                }
            }

            if (focusedElm.getId() !== -1) {
                focusedElm.setBackgroundColor(android.graphics.Color.parseColor("#FFE9E9E9"))
                focusedElm.setTextColor && focusedElm.setTextColor(android.graphics.Color.parseColor("#FF181818"))
                this.highlightedElement = focusedElm;
            }

            application.notify({
                eventName: 'NAVIGATED',
                id: focusedElm.getId(),
                element: focusedElm
            })
        }
        return superProto.dispatchKeyEvent.call(this, event);
    }
});