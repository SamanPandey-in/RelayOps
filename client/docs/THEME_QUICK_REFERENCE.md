# Vercel B&W Theme - Quick Reference Guide

## 🎨 Color Palette

### Core Variables
```
Light Mode          Dark Mode
─────────────────────────────────────
#ffffff (bg)       #000000 (bg)
#000000 (text)     #ffffff (text)
#e5e5e5 (border)   #262626 (border)
#fafafa (surface)  #0a0a0a (surface)
```

## 📝 Most Used CSS Variables

```css
/* Backgrounds */
--color-bg                    /* Page background */
--color-surface              /* Card/component background */
--color-surface-variant      /* Alternate surface */

/* Text Colors */
--color-text                 /* Primary text */
--color-text-secondary       /* Secondary text */
--color-text-tertiary        /* Tertiary text */

/* Components */
--color-border               /* Border color */
--color-divider              /* Divider color */
--color-shadow               /* Shadow color */

/* Interactive */
--color-primary              /* Primary color (black/white) */
--color-btn-bg               /* Button background */
--color-btn-text             /* Button text */
--color-btn-bg-hover         /* Button hover */

/* Forms */
--color-input-bg             /* Input background */
--color-input-text           /* Input text */
--color-input-border         /* Input border */
--color-input-border-focus   /* Input focus border */
--color-input-placeholder    /* Input placeholder */

/* Status */
--color-success, --color-error, --color-warning, --color-info
```

## 💡 Common Usage Patterns

### Background & Text
```jsx
<div style={{
  backgroundColor: 'var(--color-surface)',
  color: 'var(--color-text)',
  borderColor: 'var(--color-border)'
}}>
```

### Button
```jsx
<button style={{
  backgroundColor: 'var(--color-btn-bg)',
  color: 'var(--color-btn-text)'
}}>
```

### Input Field
```jsx
<input style={{
  backgroundColor: 'var(--color-input-bg)',
  color: 'var(--color-input-text)',
  borderColor: 'var(--color-input-border)'
}}/>
```

### Card/Container
```jsx
<div style={{
  backgroundColor: 'var(--color-surface)',
  border: `1px solid var(--color-border)`,
  boxShadow: 'var(--shadow-card)'
}}>
```

## 🏷️ Status & Priority Classes

### Available Utility Classes
```css
.status-ACTIVE              /* Status badges */
.status-COMPLETED
.status-ON_HOLD
.status-CANCELLED
.status-IN_PROGRESS
.status-DONE

.priority-HIGH              /* Priority badges */
.priority-MEDIUM
.priority-LOW

.type-BUG                   /* Type badges */
.type-FEATURE
.type-TASK
.type-IMPROVEMENT
.type-OTHER

.stat-completed             /* Stat cards */
.stat-in-progress
.stat-at-risk
.stat-team
```

### Usage Example
```jsx
<span className={`status-${status} px-2 py-1 rounded text-xs`}>
  {status}
</span>
```

## 🌓 Light & Dark Mode

### Automatic Switching
- CSS automatically applies based on system preference
- Or use `.dark` class on root element

### Testing Dark Mode
```javascript
// In browser console
document.documentElement.classList.add('dark')    // Enable dark mode
document.documentElement.classList.remove('dark')  // Disable dark mode
```

### Manual Theme
```jsx
const isDark = localStorage.getItem('theme') === 'dark';
document.documentElement.classList.toggle('dark', isDark);
```

## ⚡ Performance Tips

### ✅ DO
- Use CSS variables for dynamic colors
- Use Tailwind classes for static styles
- Reference variables instead of hex codes
- Cache computed styles

### ❌ DON'T
- Hardcode hex colors in components
- Create new color values outside variables
- Calculate colors at runtime
- Mix variable systems

## 🔧 Troubleshooting

### Variables Not Working?
```jsx
// ❌ Wrong - might not work in all contexts
color: var(--color-text)

// ✅ Correct - with fallback
color: var(--color-text, #000000)

// ✅ Correct - for inline styles
style={{ color: 'var(--color-text)' }}
```

### Dark Mode Not Appearing?
```javascript
// Check if dark class is applied
console.log(document.documentElement.classList.contains('dark'))

// Manually apply
document.documentElement.classList.add('dark')

// Check computed style
getComputedStyle(document.documentElement).getPropertyValue('--color-text')
```

## 📊 Color Hierarchy

```
gray-0    (Lightest)    ─┐
gray-50                   │
gray-100                  ├── Light mode spectrum
gray-200                  │
gray-300                  │
gray-400                  │
gray-500  (Mid-tone)      ├── Accessible & contrast-optimized
gray-600                  │
gray-700                  │
gray-800                  │
gray-900                  │
gray-1000 (Darkest)      ─┘
```

## 🎯 Real-World Examples

### Card Component
```jsx
<div style={{
  backgroundColor: 'var(--color-surface)',
  border: `1px solid var(--color-border)`,
  borderRadius: '8px',
  padding: '16px',
  boxShadow: 'var(--shadow-card)'
}}>
  <h3 style={{ color: 'var(--color-text)' }}>Title</h3>
  <p style={{ color: 'var(--color-text-secondary)' }}>
    Subtitle
  </p>
</div>
```

### Form Input
```jsx
<div>
  <label style={{ color: 'var(--color-text)' }}>
    Email
  </label>
  <input
    type="email"
    style={{
      backgroundColor: 'var(--color-input-bg)',
      color: 'var(--color-input-text)',
      border: `1px solid var(--color-input-border)`,
      borderRadius: '6px',
      padding: '8px 12px'
    }}
    placeholder="Enter email"
  />
</div>
```

### Status Badge
```jsx
<span className={`status-${task.status} px-3 py-1 rounded-full text-sm`}>
  {task.status}
</span>

/* CSS */
.status-ACTIVE {
  background-color: var(--color-surface-variant);
  color: var(--color-text);
}
```

### Button Group
```jsx
<div style={{ display: 'flex', gap: '8px' }}>
  <button style={{
    backgroundColor: 'var(--color-btn-bg)',
    color: 'var(--color-btn-text)',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '6px',
    cursor: 'pointer'
  }}>
    Primary
  </button>
  <button style={{
    backgroundColor: 'transparent',
    color: 'var(--color-text)',
    border: `1px solid var(--color-border)`,
    padding: '8px 16px',
    borderRadius: '6px',
    cursor: 'pointer'
  }}>
    Secondary
  </button>
</div>
```

## 📚 Full File References

- Theme Configuration: `client/src/index.css`
- Material-UI Theme: `client/src/styles/muiTheme.js`
- Full Documentation: `THEME_SYSTEM_DOCUMENTATION.md`

## 🚀 Getting Started

1. **Use CSS variables** in new components
2. **Reference THEME_SYSTEM_DOCUMENTATION.md** for complete list
3. **Test in both light & dark modes**
4. **Check contrast** with browser DevTools
5. **Deploy with confidence** - theme is production-ready!

---

**Need help?** Check the full documentation or review component examples in the codebase.
