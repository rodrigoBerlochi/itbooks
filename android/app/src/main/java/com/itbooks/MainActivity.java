package com.itbooks;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactRootView;
import com.facebook.react.bridge.ReactContext;
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;

public class MainActivity extends ReactActivity implements ReactInstanceManager.ReactInstanceEventListener {
    static {
        System.loadLibrary("itbooks-jsi"); // this loads the library when the class is loaded
    }

    @Override
    public void onResume() {
        super.onResume();
        getReactInstanceManager().addReactInstanceEventListener(this);
    }

    @Override
    public void onPause() {
        super.onPause();
        getReactInstanceManager().removeReactInstanceEventListener(this);
    }

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "itbooks";
    }

    @Override
    protected ReactActivityDelegate createReactActivityDelegate() {
        return new ReactActivityDelegate(this, getMainComponentName()) {
            @Override
            protected ReactRootView createRootView() {
                return new RNGestureHandlerEnabledRootView(MainActivity.this);
            }
        };
    }

    @Override
    public void onReactContextInitialized(ReactContext context) {
        new ItBooksJSIInstaller().installBinding(context.getJavaScriptContextHolder().get());
    }
}
