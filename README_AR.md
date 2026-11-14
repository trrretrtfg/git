# مشروع ذِكرى ZIKRA — Android / Expo

هذه حزمة تأسيسية أولية لتطبيق Android مبنية على Expo SDK 52، وتضم نسخة HTML التجريبية الأخيرة داخل WebView، مع تهيئة OneSignal.

## الهوية المعتمدة
- Android package: `com.zikra.app`
- OneSignal App ID: `7629f762-8d70-4f11-b1c9-0c96903331a6`
- Firebase Project ID: `zikra-544f6`

## مهم قبل البناء
1. انسخ ملف `google-services.json` الخاص بتطبيق Android المسجل باسم `com.zikra.app` إلى جذر المشروع.
2. لا تضع ملف Service Account JSON داخل المشروع. هذا المفتاح مخصص لرفعه داخل لوحة OneSignal فقط، ولا يجب تضمينه في APK أو ZIP.
3. افتح `app.json` واستبدل `REPLACE_WITH_YOUR_EAS_PROJECT_ID` بمعرّف مشروع EAS بعد إنشاء/ربط مشروع EAS. لا تستخدم Firebase Project ID مكانه.
4. ثبّت الاعتماديات بالأوامر الموضحة أدناه، ثم نفّذ فحوص Expo قبل البناء.

## التثبيت والفحص
```bash
npm install
npx expo install --check
npx expo-doctor
```

## ربط EAS وبناء APK
```bash
npx eas-cli login
npx eas-cli build:configure
npx eas-cli build --platform android --profile preview
```

## ما تم تضمينه
- نسخة HTML التجريبية `ZIKRA_Minimal` مضمّنة في `src/zikraHtml.js`.
- غلاف Expo Router.
- WebView لعرض النسخة التجريبية.
- تهيئة OneSignal باستخدام App ID.
- زر يطلب إذن الإشعارات من المستخدم.

## حدود هذه الحزمة — يرجى قراءتها
- هذه ليست إعادة كتابة Native كاملة لواجهات HTML؛ إنها حزمة Android أولية تعرض نسخة الاختبار داخل WebView.
- لم يتم تشغيل `npm install` أو `expo prebuild` أو بناء APK في بيئة الإنشاء هذه؛ لذلك لا أزعم أن البناء اجتاز الاختبار.
- يجب اختبار تسجيل الجهاز في OneSignal والإشعار الفعلي على هاتف Android بعد البناء.
- HTML يعتمد على Supabase Edge Functions وSupabase Storage/Database الموجودة مسبقاً. لم يتم تعديل قاعدة البيانات أو Edge Functions.
- قد تتطلب بعض خصائص HTML (مثل رفع الملفات أو فتح روابط خارجية أو تشغيل الصوت) ضبطاً إضافياً داخل WebView بعد الاختبار على الجهاز.
- لا توجد مفاتيح Service Account أو أسرار خاصة مضمّنة في الحزمة.
