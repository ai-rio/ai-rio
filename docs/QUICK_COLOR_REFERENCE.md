# Quick Color Reference Card

## Most Common Colors

### Primary (Turquoise)
```
bg-primary              #81E3EE   Main brand color
bg-primary-500          #1bcde0   Hover state
text-primary-foreground #ffffff   Text on primary
```

### Backgrounds
```
bg-dark-page            #121212   Page background
bg-dark                 #161a1a   Default dark
bg-mixed-surface-200    #1f2626   Cards
bg-mixed-surface-300    #2d3333   Elevated cards
```

### Text
```
text-text               #ffffff   Primary text
text-foreground         #ffffff   Same as text
text-muted-foreground   #96a8a8   Secondary text
text-muted              #4f5c5c   Tertiary text
```

### Borders
```
border-mixed-surface-300 #2d3333  Default border
border-primary          #81E3EE   Highlighted border
border-mixed-surface-400 #3d4747  Stronger border
```

### Semantic
```
bg-positive             #21BA45   Success/Green
bg-negative             #C10015   Error/Red
bg-info                 #31CCEC   Info/Cyan
bg-warning              #F2C037   Warning/Yellow
```

## Common Patterns

### Button (Primary)
```tsx
className="bg-primary hover:bg-primary-500 text-primary-foreground px-6 py-3 rounded-button"
```

### Button (Secondary)
```tsx
className="bg-mixed-surface-200 hover:bg-mixed-surface-300 text-text px-6 py-3 rounded-button"
```

### Card
```tsx
className="bg-mixed-surface-200 border border-mixed-surface-300 rounded-card p-6"
```

### Input
```tsx
className="bg-dark-surface-100 border border-mixed-surface-300 text-text rounded-input px-4 py-3"
```

### Badge (Success)
```tsx
className="bg-positive/10 text-positive px-3 py-1 rounded-full text-sm"
```

### Link
```tsx
className="text-primary hover:text-primary-500"
```

## Opacity Modifiers

```
bg-primary/10    10% opacity
bg-primary/20    20% opacity
bg-primary/50    50% opacity
bg-primary/90    90% opacity
```

## Surface Shades (Quick)

### Dark Surfaces (Grayscale)
```
100 #121212  Darkest
300 #282828  Cards
500 #5d5d5d  Mid
700 #9d9d9d  Light
900 #dbdbdb  Lightest
```

### Mixed Surfaces (Teal-tinted)
```
100 #161a1a  Darkest
200 #1f2626  Cards
300 #2d3333  Borders
500 #4f5c5c  Mid
700 #7c9191  Light
```

## Animation Classes

```
animate-glow       Pulsing glow effect
animate-float      Floating animation
animate-fade-in    Fade in on mount
animate-slide-up   Slide up on mount
```

## Border Radius

```
rounded-button   8px
rounded-input    6px
rounded-card     12px
rounded-card-lg  16px
```

## Shadows

```
shadow-brand     Brand elevation
shadow-glow      Glowing effect
shadow-card      Card elevation
```

## Focus States

```tsx
focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-dark
```

---

**Print this page and keep it by your keyboard!**
