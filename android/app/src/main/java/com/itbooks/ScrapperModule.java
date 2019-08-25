package com.itbooks;

import android.os.Build;
import android.util.Log;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.module.annotations.ReactModule;

import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.util.concurrent.LinkedBlockingQueue;
import java.util.concurrent.ThreadPoolExecutor;
import java.util.concurrent.TimeUnit;

import javax.annotation.Nonnull;

import goScrapper.GoScrapper;

@ReactModule(name = ScrapperModule.NAME)
public class ScrapperModule extends ReactContextBaseJavaModule {
    static final String NAME = "Scrapper";

    private static LinkedBlockingQueue<Runnable> taskQueue = new LinkedBlockingQueue<>();
    private static ThreadPoolExecutor threadPool = new ThreadPoolExecutor(
            5, 10, 5000, TimeUnit.MILLISECONDS, taskQueue);


    ScrapperModule(@Nonnull ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @ReactMethod
    @SuppressWarnings("unused")
    public void fetchQueueBooks(Integer page, Promise promise) {
        Runnable fn = () -> {
            byte[] data = GoScrapper.fetchQueueBooks(page);
            String result = null;
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
                Log.d(NAME, new String(data, StandardCharsets.UTF_8));
                result = new String(data, StandardCharsets.UTF_8);
            }
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.JELLY_BEAN) {
                Log.d(NAME, new String(data, Charset.forName("UTF-8")));
                result = new String(data, Charset.forName("UTF-8"));
            }
            promise.resolve(result);
        };
        threadPool.execute(fn);
    }

    @Nonnull
    @Override
    public String getName() {
        return NAME;
    }
}
