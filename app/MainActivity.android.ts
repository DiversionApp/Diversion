import * as application from "@nativescript/core/application";
import * as frame from "@nativescript/core/ui/frame";

declare const android: any;
declare const androidx: any;
declare const console: any;

const superProto = androidx.appcompat.app.AppCompatActivity.prototype;
androidx.appcompat.app.AppCompatActivity.extend("org.Diversion.MainActivity", {
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
        application.on('NAVIGATE', (args) => {
            const focusedElm = args.element

            if (this.lastHighlightedElement) {
                setHighlight(this.lastHighlightedElement, false)
            }

            if (focusedElm.getContentDescription().startsWith('nav')) {
                if (this.currentNav) {
                    setHighlight(this.currentNav, false)
                }
                setHighlight(focusedElm, true)
                this.currentNav = focusedElm
            }

            this.lastHighlightedElement = focusedElm

            application.notify({
                eventName: 'NAVIGATED',
                id: focusedElm.getId(),
                element: focusedElm
            })
        });

        application.on('CLEAR_HIGHLIGHTED_NAV', (args) => {
            setHighlight(this.currentNav, false)
        });
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
        let focusedElm = this.getCurrentFocus()
        let shouldNavigate = true

        if (focusedElm && focusedElm !== this.lastHighlightedElement) {
            if (this.lastHighlightedElement) {
                setHighlight(this.lastHighlightedElement, false)
            }
            if (focusedElm.getContentDescription().startsWith('nav')) {
                if (this.currentNav && this.lastHighlightedElement && this.lastHighlightedElement.getContentDescription().startsWith('poster')) {
                    this.currentNav.requestFocus()
                    focusedElm = this.currentNav
                    shouldNavigate = false
                }
                if (shouldNavigate) {
                    application.notify({
                        eventName: 'NAVIGATED',
                        id: focusedElm.getId(),
                        element: focusedElm
                    })
                }
                this.currentNav = focusedElm
            }
            setHighlight(focusedElm, true)
            console.log(this.lastHighlightedElement && this.lastHighlightedElement.getId(), '->', focusedElm.getId())
            this.lastHighlightedElement = focusedElm
        }

        return superProto.dispatchKeyEvent.call(this, event);
    }
});

function setHighlight(element, isHighlighted) {
    // nav buttons
    if (element.getContentDescription().startsWith('nav')) {
        if (!isHighlighted) {
            element.setBackgroundColor(android.graphics.Color.parseColor("#00E9E9E9"))
            element.setTextColor && element.setTextColor(android.graphics.Color.parseColor("#FFAAAAAA"))
        } else {
            element.setBackgroundColor(android.graphics.Color.parseColor("#FFE9E9E9"))
            element.setTextColor && element.setTextColor(android.graphics.Color.parseColor("#FF181818"))
        }
    } else if (element.getContentDescription().startsWith('poster')) {
        application.notify({
            eventName: 'POSTER_HIGHLIGHT',
            id: element.getId(),
            element,
            isHighlighted
        })
    }
}