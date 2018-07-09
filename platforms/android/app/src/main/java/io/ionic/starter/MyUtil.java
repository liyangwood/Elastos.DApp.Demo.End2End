package io.ionic.starter;

import android.content.Context;
import android.content.pm.ApplicationInfo;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.content.pm.PackageManager.NameNotFoundException;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.os.Bundle;
import android.os.Looper;
import android.telephony.TelephonyManager;
import android.text.TextUtils;
import android.widget.Toast;

import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import com.elastos.spvcore.MasterWalletManager;

import cn.jpush.android.api.JPushInterface;

public class MyUtil {
    public static final String PREFS_NAME = "JPUSH_EXAMPLE";
    public static final String PREFS_DAYS = "JPUSH_EXAMPLE_DAYS";
    public static final String PREFS_START_TIME = "PREFS_START_TIME";
    public static final String PREFS_END_TIME = "PREFS_END_TIME";
    public static final String KEY_APP_KEY = "JPUSH_APPKEY";

    public static boolean isEmpty(String s) {
        if (null == s)
            return true;
        if (s.length() == 0)
            return true;
        if (s.trim().length() == 0)
            return true;
        return false;
    }
    /**
     * 只能以 “+” 或者 数字开头；后面的内容只能包含 “-” 和 数字。
     * */
    private final static String MOBILE_NUMBER_CHARS = "^[+0-9][-0-9]{1,}$";
    public static boolean isValidMobileNumber(String s) {
        if(TextUtils.isEmpty(s)) return true;
        Pattern p = Pattern.compile(MOBILE_NUMBER_CHARS);
        Matcher m = p.matcher(s);
        return m.matches();
    }
    // 校验Tag Alias 只能是数字,英文字母和中文
    public static boolean isValidTagAndAlias(String s) {
        Pattern p = Pattern.compile("^[\u4E00-\u9FA50-9a-zA-Z_!@#$&*+=.|]+$");
        Matcher m = p.matcher(s);
        return m.matches();
    }

    // 取得AppKey
    public static String getAppKey(Context context) {
        Bundle metaData = null;
        String appKey = null;
        try {
            ApplicationInfo ai = context.getPackageManager().getApplicationInfo(
                    context.getPackageName(), PackageManager.GET_META_DATA);
            if (null != ai)
                metaData = ai.metaData;
            if (null != metaData) {
                appKey = metaData.getString(KEY_APP_KEY);
                if ((null == appKey) || appKey.length() != 24) {
                    appKey = null;
                }
            }
        } catch (NameNotFoundException e) {

        }
        return appKey;
    }

    // 取得版本号
    public static String GetVersion(Context context) {
		try {
			PackageInfo manager = context.getPackageManager().getPackageInfo(
					context.getPackageName(), 0);
			return manager.versionName;
		} catch (NameNotFoundException e) {
			return "Unknown";
		}
	}

    public static void showToast(final String toast, final Context context)
    {
    	new Thread(new Runnable() {

			@Override
			public void run() {
				Looper.prepare();
				Toast.makeText(context, toast, Toast.LENGTH_SHORT).show();
				Looper.loop();
			}
		}).start();
    }

    public static boolean isConnected(Context context) {
        ConnectivityManager conn = (ConnectivityManager) context.getSystemService(Context.CONNECTIVITY_SERVICE);
        NetworkInfo info = conn.getActiveNetworkInfo();
        return (info != null && info.isConnected());
    }

	public static String getImei(Context context, String imei) {
        String ret = null;
		try {

//            int permissionCheck = ContextCompat.checkSelfPermission(context, Manifest.permission.READ_PHONE_STATE);
//
//            if (permissionCheck != PackageManager.PERMISSION_GRANTED) {
//                ActivityCompat.requestPermissions(context, new String[]{Manifest.permission.READ_PHONE_STATE}, REQUEST_READ_PHONE_STATE);
//            } else {
//                //TODO
//            }

			TelephonyManager telephonyManager = (TelephonyManager) context.getSystemService(Context.TELEPHONY_SERVICE);
            ret = telephonyManager.getDeviceId();
		} catch (Exception e) {
			Logger.e(MyUtil.class.getSimpleName(), e.getMessage());
		}
		if (isReadableASCII(ret)){
            return ret;
        } else {
            return imei;
        }
	}

    private static boolean isReadableASCII(CharSequence string){
        if (TextUtils.isEmpty(string)) return false;
        try {
            Pattern p = Pattern.compile("[\\x20-\\x7E]+");
            return p.matcher(string).matches();
        } catch (Throwable e){
            return true;
        }
    }

    public static String getDeviceId(Context context) {
        return JPushInterface.getUdid(context);
    }

    private static Context sApplicationContext = null;
    public static void setApplicationContext(Context context) {
        sApplicationContext = context;
    }

    public static String getRootPath() {
        return sApplicationContext.getFilesDir().getParent();
    }

    private static MasterWalletManager mCurrentMasterWalletManager = null;
    public static void SetCurrentMasterWalletManager(MasterWalletManager currentMasterWalletManager) {
        mCurrentMasterWalletManager = currentMasterWalletManager;
    }
    public static MasterWalletManager GetCurrentMasterWalletManager() {
        return mCurrentMasterWalletManager;
    }

    public static void moveConfigFiles2RootPath(Context context) {
        String rootPath = context.getFilesDir().getParent();
        String[] names={"CoinConfig.json",
                "mnemonic_chinese.txt",
                "mnemonic_french.txt",
                "mnemonic_italian.txt",
                "mnemonic_japanese.txt",
                "mnemonic_spanish.txt"};

        for (int i = 0; i < names.length; i++) {
            InputStream is = context.getClass().getClassLoader().getResourceAsStream("assets/config/" + names[i]);
            try
            {
                OutputStream fosto = new FileOutputStream(rootPath+"/"+names[i]);
                byte bt[] = new byte[1024];
                int c = 0;
                while ((c = is.read(bt)) > 0) {
                    fosto.write(bt, 0, c);
                }
                is.close();
                fosto.close();

            } catch (Exception ex) {
                ex.printStackTrace();
            }
        }
    }
}
