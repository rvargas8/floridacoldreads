# Google Analytics Troubleshooting Guide

## Common Issues and Solutions

### 1. **Code Placement**
✅ **Correct**: Google Analytics code should be in the `<head>` section, as high as possible (right after viewport meta tag)
✅ **Current Status**: Code is correctly placed in all pages

### 2. **Verification Steps**

#### Check if code is loaded:
1. Open your website in a browser
2. Right-click → "Inspect" or press F12
3. Go to "Network" tab
4. Refresh the page
5. Look for requests to:
   - `googletagmanager.com/gtag/js`
   - `google-analytics.com/g/collect`

#### Check browser console:
1. Open browser console (F12)
2. Type: `gtag`
3. If it shows a function, the code is loaded
4. Type: `dataLayer`
5. Should show an array with tracking data

#### Use Google Tag Assistant:
1. Install Chrome extension: "Tag Assistant Legacy"
2. Visit your site
3. Click the extension icon
3. It will show if tags are firing correctly

### 3. **Common Reasons It's Not Tracking**

#### A. Site Not Live Yet
- **Issue**: If testing locally (file://), Google Analytics won't work
- **Solution**: Make sure site is deployed to GitHub Pages
- **Check**: Visit `https://rvargas8.github.io/floridacoldreads/`

#### B. Ad Blockers
- **Issue**: Browser extensions block tracking scripts
- **Solution**: 
  - Test in incognito/private mode
  - Disable ad blockers temporarily
  - Test in different browsers

#### C. Data Delay
- **Issue**: Google Analytics can take 24-48 hours to show data
- **Solution**: 
  - Use Real-Time reports (shows data within minutes)
  - Check GA4 → Reports → Realtime

#### D. Wrong Property/Measurement ID
- **Issue**: Measurement ID doesn't match your GA4 property
- **Solution**: 
  - Verify ID: `G-9RZNHMY95P`
  - Check in Google Analytics: Admin → Data Streams → Your Stream → Measurement ID

#### E. Filters Blocking Data
- **Issue**: Internal traffic filters might be blocking your visits
- **Solution**: 
  - Check GA4 → Admin → Data Settings → Data Filters
  - Temporarily disable filters to test

### 4. **Testing Checklist**

- [ ] Site is live on GitHub Pages
- [ ] Code is in `<head>` section
- [ ] Measurement ID is correct: `G-9RZNHMY95P`
- [ ] Testing in browser without ad blockers
- [ ] Checked browser console for errors
- [ ] Used Tag Assistant extension
- [ ] Checked Real-Time reports in GA4
- [ ] Waited 24-48 hours for standard reports

### 5. **Quick Test Commands**

Open browser console on your site and run:

```javascript
// Check if gtag is loaded
typeof gtag

// Check dataLayer
window.dataLayer

// Manually send a test event
gtag('event', 'test_event', {
  'event_category': 'test',
  'event_label': 'manual_test'
});
```

### 6. **Verify in Google Analytics**

1. Go to https://analytics.google.com
2. Select your property
3. Go to **Reports** → **Realtime**
4. Visit your site in another tab
5. You should see yourself as an active user within 30 seconds

### 7. **If Still Not Working**

1. **Double-check Measurement ID**:
   - Go to GA4 → Admin → Data Streams
   - Click on your web stream
   - Verify the Measurement ID matches: `G-9RZNHMY95P`

2. **Check for JavaScript Errors**:
   - Open browser console
   - Look for red error messages
   - Fix any JavaScript errors that might prevent GA from loading

3. **Test with Google Tag Assistant**:
   - Install the extension
   - It will show exactly what's happening with your tags

4. **Contact Support**:
   - Google Analytics Help Center
   - Google Analytics Community Forum

### 8. **Current Implementation**

All pages have the code correctly placed:
- ✅ index.html
- ✅ parents.html
- ✅ fast-test.html
- ✅ grade2.html through grade5.html
- ✅ All 30 passage files
- ✅ 404.html

Code location: Right after `<meta name="viewport">` in the `<head>` section.

### 9. **Next Steps**

1. Deploy to GitHub Pages (if not already done)
2. Visit the live site
3. Check Real-Time reports in GA4
4. Use Tag Assistant to verify tags are firing
5. Wait 24-48 hours for standard reports to populate


