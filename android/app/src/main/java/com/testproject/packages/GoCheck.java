package com.testproject.packages;

import android.app.ActivityManager;
import android.content.Context;
import android.os.Build;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class GoCheck extends ReactContextBaseJavaModule {

    private final Context context;
    private ActivityManager manager;

    public GoCheck(ReactApplicationContext context) {
        super(context);
        this.context = context;
    }

    @NonNull
    @Override
    public String getName() {
        return "GoCheck";
    }

    @ReactMethod
    public boolean isAndroidGoDevice() {
        return Build.VERSION.SDK_INT > Build.VERSION_CODES.Q && manager(context).isLowRamDevice();
    }

    private ActivityManager manager(Context context) {
        if (manager == null) {
            manager = (ActivityManager) context.getSystemService(Context.ACTIVITY_SERVICE);
        }
        return manager;
    }
}
