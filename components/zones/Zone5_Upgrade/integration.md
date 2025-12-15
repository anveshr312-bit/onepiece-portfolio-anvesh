# Zone 5 Advanced Upgrade Integration Guide

This guide details how to integrate the new Zone 5 animation variants and assets.

## 1. Asset Placement
Ensure the following assets are present in `public/images/zone5/upgrade/`:
- `[elder]-base.png` (Base character images)
- `[elder]-yokai.png` (Yokai form images)
- `panel-frame.png` (Optional: CSS fallback is provided)
- `panel-grain.png` (Optional: CSS fallback is provided)

## 2. Usage
Import the `Zone5Card` component and use the `variant` prop to switch between animations.

```tsx
import Zone5Card from '@/components/zones/Zone5_Upgrade/Zone5Card';

// Example Usage
<Zone5Card 
  variant="rise" // Options: "rise", "lunge", "pulse"
  base="/images/zone5/upgrade/saturn-base.png"
  yokai="/images/zone5/upgrade/saturn-yokai.png"
  name="SATURN"
  weakness="OVERTHINKING"
/>
```

## 3. Variants

### Variant A: RISE (`variant="rise"`)
- **Behavior**: Yokai rises from behind the card on hover.
- **Best for**: Dramatic reveals, emphasizing the "monster within".
- **Performance**: Moderate (Transform + Opacity).

### Variant B: LUNGE (`variant="lunge"`)
- **Behavior**: Yokai lunges forward with a spring animation and light swipe.
- **Best for**: Aggressive, impactful interactions.
- **Performance**: Moderate (Spring physics).

### Variant C: PULSE (`variant="pulse"`)
- **Behavior**: Subtle ambient pulse and lateral yokai drift.
- **Best for**: Atmospheric, low-intensity visuals.
- **Performance**: High (Simple transforms).

## 4. Accessibility & Performance
- **Reduced Motion**: All variants respect `prefers-reduced-motion`. Animations are simplified or disabled.
- **Mobile**: Heavy transforms are disabled on mobile breakpoints. Use the `isActive` prop to trigger animations programmatically if needed (e.g., on tap).
- **Keyboard Focus**: The `whileFocus` prop ensures keyboard users see the same effects as hover users.

## 5. Z-Index Layering
1. **Background/Frame**: z-index 10
2. **Yokai (Behind)**: z-index 0 (visually behind due to stacking context)
3. **Base Character**: z-index 20
4. **Text/UI**: z-index 30
5. **Overlays/Particles**: z-index 40

## 6. Troubleshooting
- **Missing Assets**: If images fail to load, check the paths in `public/images/zone5/upgrade/`.
- **Jank/Stutter**: Switch to `variant="pulse"` for lower-end devices.
