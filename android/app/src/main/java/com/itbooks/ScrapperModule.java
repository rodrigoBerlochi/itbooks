package com.itbooks;

import android.util.Log;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.module.annotations.ReactModule;

import java.nio.charset.StandardCharsets;

import javax.annotation.Nonnull;

import goScrapper.GoScrapper;

@ReactModule(name = ScrapperModule.NAME)
public class ScrapperModule extends ReactContextBaseJavaModule {
    static final String NAME = "Scrapper";

    ScrapperModule(@Nonnull ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @ReactMethod
    @SuppressWarnings("unused")
    public void fetchQueueBooks(Promise promise) {
        byte[] data = GoScrapper.fetchQueueBooks();
        Log.d(NAME, new String(data, StandardCharsets.UTF_8));
        promise.resolve(new String(data, StandardCharsets.UTF_8));
    }

    @Nonnull
    @Override
    public String getName() {
        return NAME;
    }
}
