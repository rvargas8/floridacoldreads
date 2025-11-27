# Google Analytics Verification Checklist

## ✅ Code Verification

The Google Analytics code is correctly installed on **39 HTML files**:
- ✅ All main pages (index, parents, fast-test, grades 2-5)
- ✅ All 30 passage pages
- ✅ 404 error page

## 🔍 Step-by-Step Verification

### 1. **Verify Code is Live on Your Site**

Visit: `https://www.floridacoldreads.com`

**Method 1: View Page Source**
1. Right-click on your homepage → "View Page Source" (or Ctrl+U / Cmd+U)
2. Search for: `G-9RZNHMY95P`
3. You should see the Google Analytics code in the `<head>` section

**Method 2: Browser Console**
1. Visit your site
2. Press F12 (or right-click → Inspect)
3. Go to Console tab
4. Type: `typeof gtag`
   - ✅ Should return: `"function"`
   - ❌ If returns: `"undefined"` → Code not loading

5. Type: `dataLayer`
   - ✅ Should show: `Array` with tracking data
   - ❌ If shows: `undefined` → Code not working

### 2. **Check Network Requests**

1. Open DevTools (F12)
2. Go to **Network** tab
3. Refresh the page
4. Filter by: `gtag` or `analytics`
5. You should see requests to:
   - `googletagmanager.com/gtag/js?id=G-9RZNHMY95P`
   - `google-analytics.com/g/collect`

### 3. **Use Google Tag Assistant**

1. Install Chrome Extension: **"Tag Assistant Legacy (by Google)"**
2. Visit: `https://www.floridacoldreads.com`
3. Click the Tag Assistant icon
4. It will show:
   - ✅ Green = Working
   - ⚠️ Yellow = Warning
   - ❌ Red = Error

### 4. **Check Google Analytics Real-Time**

1. Go to: https://analytics.google.com
2. Select your property
3. Go to: **Reports** → **Realtime**
4. Visit your site in another tab
5. Within 30 seconds, you should see:
   - Active users: 1
   - Page views increasing
   - Your location/city

### 5. **Verify Measurement ID**

1. Go to: https://analytics.google.com
2. Click **Admin** (gear icon, bottom left)
3. Under **Property**, click **Data Streams**
4. Click on your web stream
5. Verify **Measurement ID** matches: `G-9RZNHMY95P`
6. Verify **Website URL** includes: `www.floridacoldreads.com`

## 🐛 Common Issues & Solutions

### Issue 1: Ad Blockers
**Symptom**: Code loads but no data in GA
**Solution**: 
- Test in incognito mode
- Disable ad blockers
- Test in different browsers

### Issue 2: Wrong Domain in GA4
**Symptom**: Code works but data not showing
**Solution**:
- Go to GA4 → Admin → Data Streams
- Edit your stream
- Update Website URL to: `https://www.floridacoldreads.com`

### Issue 3: Data Delay
**Symptom**: Code works but no data yet
**Solution**:
- Use **Realtime** reports (shows data immediately)
- Standard reports take 24-48 hours

### Issue 4: JavaScript Errors
**Symptom**: Console shows errors
**Solution**:
- Check browser console for red errors
- Fix any JavaScript errors that might block GA

### Issue 5: HTTPS/HTTP Mismatch
**Symptom**: Mixed content warnings
**Solution**:
- Ensure site is fully HTTPS
- Check for any HTTP resources blocking the page

## 📋 Current Implementation

**Code Location**: Right after `<meta name="viewport">` in `<head>`

**Code Format**:
```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-9RZNHMY95P"></script>
<script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-9RZNHMY95P');
</script>
```

**Measurement ID**: `G-9RZNHMY95P`
**Domain**: `www.floridacoldreads.com`

## 🧪 Quick Test

1. Visit: `https://www.floridacoldreads.com/test-analytics.html`
2. Open browser console
3. Check for any errors
4. Type: `gtag` and `dataLayer`
5. Check GA4 Realtime reports

## 📞 Still Not Working?

If after all these checks it's still not working:

1. **Double-check Measurement ID**:
   - Verify `G-9RZNHMY95P` is correct in your GA4 account
   - Make sure you're looking at the right GA4 property

2. **Check Property Settings**:
   - GA4 → Admin → Property Settings
   - Ensure property is active
   - Check timezone settings

3. **Verify Domain Configuration**:
   - GA4 → Admin → Data Streams → Your Stream
   - Website URL should be: `https://www.floridacoldreads.com`
   - If it shows `floridacoldreads.com` (without www), update it

4. **Test with Google Tag Assistant**:
   - This will show exactly what's happening
   - Install the Chrome extension
   - It provides detailed diagnostics

5. **Check for Filters**:
   - GA4 → Admin → Data Settings → Data Filters
   - Make sure no filters are blocking your traffic

## ✅ Success Indicators

You'll know it's working when:
- ✅ Browser console shows `gtag` as a function
- ✅ Network tab shows requests to googletagmanager.com
- ✅ Tag Assistant shows green tags
- ✅ GA4 Realtime shows your visit within 30 seconds
- ✅ Standard reports show data after 24-48 hours

