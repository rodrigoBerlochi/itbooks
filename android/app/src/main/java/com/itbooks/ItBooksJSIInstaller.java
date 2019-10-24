package com.itbooks;

import android.os.Build;
import android.util.Log;

import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;

import goScrapper.GoScrapper;

public class ItBooksJSIInstaller {
    public native void installBinding(long javaScriptContextHolder);

    public static String fetchQueueBooks(int page) {
        byte[] data = GoScrapper.fetchQueueBooks(page);
        String result = null;
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
            Log.d("JSI METHOD", new String(data, StandardCharsets.UTF_8));
            result = new String(data, StandardCharsets.UTF_8);
        }
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.JELLY_BEAN) {
            Log.d("JSI METHOD", new String(data, Charset.forName("UTF-8")));
            result = new String(data, Charset.forName("UTF-8"));
        }

        return result;
    }
}
