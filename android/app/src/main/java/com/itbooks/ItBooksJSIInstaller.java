package com.itbooks;

import android.os.Build;
import android.util.Log;

import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

import goScrapper.GoScrapper;

public class ItBooksJSIInstaller {
    public native void installBinding(long javaScriptContextHolder);

    public static String fetchQueueBooks(int page) {
        String x;
        ExecutorService es = Executors.newSingleThreadExecutor();
        Future<String> result = es.submit((Callable<String>) () -> {
            byte[] data = GoScrapper.fetchQueueBooks(page);
            String result1 = null;
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
                Log.d("JSI METHOD", new String(data, StandardCharsets.UTF_8));
                result1 = new String(data, StandardCharsets.UTF_8);
            }
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.JELLY_BEAN) {
                Log.d("JSI METHOD", new String(data, Charset.forName("UTF-8")));
                result1 = new String(data, Charset.forName("UTF-8"));
            }

            return result1;
        });
        try {
            x = result.get();
            es.shutdown();
            return x;
        } catch (Exception e) {
            // failed
            es.shutdown();
            return null;
        }
    }
}
