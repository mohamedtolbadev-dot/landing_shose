# Tolba Store - إصلاح مشكلة الصور في Vercel

## التعديلات المنفذة:

### 1. مسارات الصور
✅ تم تغيير جميع المسارات من `images/` إلى `./images/`
✅ إضافة النقطة (.) قبل المسار لجعله نسبي صحيح

### 2. معالجة الأخطاء
✅ إضافة fallback SVG عند فشل تحميل الصورة
✅ عرض placeholder بدلاً من إخفاء الصورة

### 3. إعدادات Vercel
✅ تحديث vercel.json بإعدادات Cache أفضل
✅ إضافة CORS headers للصور
✅ إضافة route مخصص لـ logo.png

### 4. ملفات إضافية
✅ .htaccess - لتحسين Apache servers
✅ _headers - لتحسين Vercel CDN

## خطوات النشر على Vercel:

```bash
# 1. تأكد من رفع جميع الصور
git add images/
git add logo.png
git commit -m "fix: image paths for vercel"
git push

# 2. أو استخدم Vercel CLI
vercel --prod
```

## التحقق من الصور:

افتح Developer Tools (F12) → Network → Images
- تأكد أن الصور تُحمّل بكود 200 (OK)
- تأكد من المسارات الصحيحة

## المسارات المحدثة:

- Hero Slideshow: `./images/tolba-brown-1.png`
- Logo: `./logo.png`
- Product Images: `./images/tolba-*.png`

## ملاحظات:

- جميع الصور الآن بصيغة .png (تم تصحيح .jpg إلى .png)
- تم إزالة `loading="lazy"` من الشعار
- تم إضافة onerror handlers لجميع الصور

---

✅ **جاهز للنشر الآن!**
