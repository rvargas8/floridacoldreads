# JavaScript Guide for Florida Cold Reads

This guide explains how JavaScript is organized and how to add new features.

## File Structure

```
readready/
├── js/
│   ├── main.js          # Core functionality and utilities
│   └── features.js       # Additional features and helpers
└── index.html            # Includes both JS files
```

## How to Add JavaScript

### Method 1: External JavaScript Files (Recommended)

1. **Add to existing file** (`js/main.js` or `js/features.js`):
   ```javascript
   function myNewFeature() {
       // Your code here
   }
   ```

2. **Or create a new file** (`js/custom.js`):
   ```javascript
   // Your custom JavaScript
   ```

3. **Include in HTML** (before `</body>`):
   ```html
   <script src="js/custom.js"></script>
   ```

### Method 2: Inline JavaScript

Add directly in your HTML file:
```html
<script>
    // Your JavaScript code here
    console.log('Hello from inline script!');
</script>
```

## Available Functions

### Utility Functions (from `main.js`)

- `smoothScrollTo(elementId)` - Smooth scroll to element
- `showLoading(button, text)` - Show loading state
- `hideLoading(button)` - Hide loading state
- `showToast(message, type, duration)` - Show notification
- `copyToClipboard(text)` - Copy text to clipboard
- `formatDate(date)` - Format date nicely

### Progress Tracking

- `trackProgress(passageId, score)` - Save progress
- `getProgress(passageId)` - Get progress for passage
- `getAllProgress()` - Get all progress
- `clearAllProgress()` - Clear all progress

### Reading Timer

- `startReadingTimer()` - Start timer
- `stopReadingTimer()` - Stop timer
- `getReadingTime()` - Get elapsed time

### Sharing

- `sharePage()` - Share current page
- `copyToClipboard(text)` - Copy to clipboard

## Examples

### Example 1: Add a Button Click Handler

```javascript
document.addEventListener('DOMContentLoaded', function() {
    const myButton = document.getElementById('myButton');
    if (myButton) {
        myButton.addEventListener('click', function() {
            showToast('Button clicked!', 'success');
        });
    }
});
```

### Example 2: Track User Interaction

```javascript
// Track when user clicks a passage
document.querySelectorAll('.passage-link').forEach(link => {
    link.addEventListener('click', function() {
        trackEvent('passage_clicked', {
            passage: this.textContent,
            url: this.href
        });
    });
});
```

### Example 3: Add Form Validation

```javascript
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm('contactForm')) {
            showLoading(this.querySelector('button[type="submit"]'));
            // Submit form data
            // ...
        } else {
            showToast('Please fill in all required fields', 'error');
        }
    });
}
```

### Example 4: Add Dark Mode Toggle Button

In HTML:
```html
<button id="darkModeToggle" class="dark-mode-btn">🌙 Dark Mode</button>
```

The dark mode functionality is already included in `main.js` - just add the button!

### Example 5: Add Progress Display

```javascript
// Show progress on page load
document.addEventListener('DOMContentLoaded', function() {
    const allProgress = getAllProgress();
    const progressCount = Object.keys(allProgress).length;
    
    if (progressCount > 0) {
        const progressDisplay = document.getElementById('progressDisplay');
        if (progressDisplay) {
            progressDisplay.textContent = `Completed: ${progressCount} passages`;
        }
    }
});
```

## Adding External Libraries

### Example: Add jQuery

1. Add before `</body>`:
```html
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
```

2. Use jQuery:
```javascript
$(document).ready(function() {
    // Your jQuery code
});
```

### Example: Add Chart.js for Analytics

1. Add before `</body>`:
```html
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
```

2. Create a chart:
```javascript
const ctx = document.getElementById('myChart').getContext('2d');
const chart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Grade 2', 'Grade 3', 'Grade 4', 'Grade 5'],
        datasets: [{
            label: 'Passages Completed',
            data: [5, 5, 5, 5]
        }]
    }
});
```

## Best Practices

1. **Always check if element exists** before using it:
   ```javascript
   const element = document.getElementById('myElement');
   if (element) {
       // Use element
   }
   ```

2. **Use DOMContentLoaded** for initialization:
   ```javascript
   document.addEventListener('DOMContentLoaded', function() {
       // Your initialization code
   });
   ```

3. **Use the provided utility functions** instead of reinventing:
   - Use `showToast()` instead of `alert()`
   - Use `showLoading()` for buttons
   - Use `trackEvent()` for analytics

4. **Store data in localStorage** for persistence:
   ```javascript
   localStorage.setItem('key', JSON.stringify(data));
   const data = JSON.parse(localStorage.getItem('key'));
   ```

5. **Handle errors gracefully**:
   ```javascript
   try {
       // Risky code
   } catch (error) {
       console.error('Error:', error);
       showToast('Something went wrong', 'error');
   }
   ```

## Testing Your JavaScript

1. Open browser console (F12 or Cmd+Option+I)
2. Check for errors
3. Test your functions:
   ```javascript
   // In console:
   FloridaColdReads.showToast('Test message', 'success');
   ```

## Common Tasks

### Add a New Feature

1. Add function to `js/features.js`
2. Export it: `window.MyFeature = { myFunction };`
3. Use it in HTML or other scripts

### Add Event Listeners

```javascript
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('myButton').addEventListener('click', function() {
        // Handle click
    });
});
```

### Make API Calls

```javascript
async function fetchData() {
    try {
        const response = await fetch('/api/data');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        showToast('Failed to load data', 'error');
    }
}
```

## Need Help?

- Check browser console for errors
- Use `console.log()` to debug
- Test functions in browser console
- Check existing code in `js/main.js` for examples

