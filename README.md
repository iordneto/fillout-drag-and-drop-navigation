# 🧭 Fillout Drag & Drop Navigation

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-Visit_Now-blue?style=for-the-badge)](https://fillout-drag-and-drop-navigation-iord-j1py1a6mn.vercel.app/)

A modern, accessible drag-and-drop navigation component built with React, TypeScript, and Tailwind CSS.

## 🌟 Live Demo

🔥 **[Try the Interactive Demo](https://fillout-drag-and-drop-navigation-iord-j1py1a6mn.vercel.app/)** - Experience the drag-and-drop functionality live!

> Experience the full drag-and-drop functionality with intelligent constraints, smooth animations, and responsive design.

## 📋 Assignment Reference

- **🚀 [Live Demo](https://fillout-drag-and-drop-navigation-iord-j1py1a6mn.vercel.app/)** - Interactive demonstration
- **📋 [Assignment Instructions](https://recruiting.fillout.com/frontend-take-home)** - Original take-home requirements
- **🎨 [Figma Design Reference](https://www.figma.com/design/ed3Q3i07AsMXevtcN5dYKX/Fillout-Frontend-Take-home---July-2025--Community-?node-id=1-107&t=8W3nbcfALIiObsEv-1)** - Visual design specifications
- **💾 [GitHub Repository](https://github.com/iordneto/fillout-drag-and-drop-navigation)** - Complete source code

![Navigation Demo](https://via.placeholder.com/800x200/f3f4f6/6b7280?text=Navigation+Component+Demo)

## ✨ Features

- **🎯 Fixed & Movable Pages**: Info (first) and Ending (last) pages are fixed, others are draggable
- **🖱️ Drag & Drop**: Smooth drag-and-drop reordering with visual feedback
- **➕ Dynamic Page Addition**: Insert pages anywhere between movable items
- **📱 Responsive Design**: Horizontal scrolling with arrow navigation
- **♿ Accessibility**: Keyboard navigation and screen reader support
- **🎨 Modern UI**: Clean design with smooth animations and hover states
- **🔧 Context Menu**: Right-click actions for page management

## 🏗️ Architecture & Technical Decisions

### **Project Configuration**

#### **Development Tools**
- **🔧 Biome**: Chosen over ESLint + Prettier for unified tooling, faster performance, and zero configuration
- **🐕 Husky**: Git hooks for code quality enforcement with `pre-commit` linting
- **📦 pnpm**: Package manager for faster installs and better disk efficiency

#### **Testing Strategy**
- **⚡ Vitest**: Modern test runner with native ESM support and excellent TypeScript integration
- **🧪 Testing Library**: Component testing with focus on user behavior
- **🎯 Focused Testing**: Only critical business logic tested (store), avoiding UI-heavy hooks
- **⚙️ Smart Test Setup**: Automatic PostCSS management during test runs

```json
{
  "test:run": "mv postcss.config.mjs postcss.config.mjs.bak 2>/dev/null || true && vitest run && mv postcss.config.mjs.bak postcss.config.mjs 2>/dev/null || true"
}
```

### **State Management Strategy**

#### **When to Use Local State vs Zustand**

**Local State (useState)**:
```typescript
// Simple UI state, component-specific
const [activeId, setActiveId] = useState<string | null>(null);
const [canScrollLeft, setCanScrollLeft] = useState(false);
```

**Zustand Store**:
```typescript
// Business logic, shared across components, complex state updates
const useNavigationStore = create<NavigationStore>((set, get) => ({
  items: DEFAULT_NAVIGATION_ITEMS,
  reorderItems: (newItems) => { /* complex logic */ },
  isValidDropPosition: (activeId, overId) => { /* business rules */ }
}));
```

**Decision Criteria**:
- ✅ **Zustand**: Business logic, data persistence, complex state updates
- ✅ **Local State**: UI state, animations, temporary interactions

### **Directory Organization**

```
src/components/navigation/
├── __tests__/           # Co-located tests
├── hooks/               # Reusable logic hooks
│   ├── use-drag-and-drop.tsx
│   ├── use-navigation-items.tsx
│   └── use-scroll-navigation.tsx
├── components.tsx       # Main components
├── store.ts            # Zustand store
├── types.ts            # TypeScript definitions
└── constants.ts        # Configuration values
```

**Benefits**:
- **🎯 Feature-based**: All navigation logic in one place
- **🔧 Co-location**: Tests next to source code
- **♻️ Reusability**: Hooks extract reusable logic
- **📝 Clear contracts**: Explicit types and interfaces

### **Component Architecture**

#### **Single Responsibility Principle**

**Container Component**:
```typescript
// StepNavigation.tsx - Orchestrates everything
const StepNavigation = () => {
  const navigationItems = useNavigationItems();
  const scrolling = useScrollNavigation(); 
  const dragAndDrop = useDragAndDrop();
  // Combines all concerns
};
```

**Pure Components**:
```typescript
// NavigationItem.tsx - Single item rendering
// ScrollArrowButton.tsx - Scroll button logic
// InsertButton.tsx - Page insertion UI
```

**Custom Hooks**:
```typescript
// useNavigationItems.tsx - Store integration wrapper
// useDragAndDrop.tsx - Drag & drop logic
// useScrollNavigation.tsx - Scroll detection logic
```

## 🎨 Design System & Styling

### **Tailwind CSS Approach**

#### **CSS Variables for Theming**
```css
:root {
  --navigation-item-active-bg: oklch(1 0 0);
  --navigation-item-active-text: oklch(0.145 0 0);
  --navigation-item-active-icon: oklch(0.739 0.152 71.555);
}
```

#### **Hardcoded Values Elimination**
- **Before**: `"px-2.5 py-1.5 gap-1.5"` (repeated 4x)
- **After**: Tailwind config tokens for consistency

#### **Component-Specific Patterns**
```typescript
const getButtonStyles = () => {
  const baseStyles = "group flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg cursor-pointer transition-all duration-200";
  
  if (item.isActive) {
    return `${baseStyles} bg-[var(--navigation-item-active-bg)] text-[var(--navigation-item-active-text)] shadow-[inset_0_0_0_0.5px_#E1E1E1,0_1px_1px_rgba(0,0,0,0.02),0_1px_3px_rgba(0,0,0,0.04)]`;
  }

  return `${baseStyles} bg-[var(--navigation-item-inactive-bg)] text-[var(--navigation-item-inactive-text)] hover:bg-[var(--navigation-item-inactive-hover)]`;
};
```

## 🚀 Core Features Deep Dive

### **Fixed Pages Logic**

> **💡 Design Inspiration**: The fixed first/last page concept mirrors Fillout's current form builder pattern, where certain pages (like intro/ending pages) maintain fixed positions. This was implemented as an **overdelivery** beyond the basic drag-and-drop requirements to match real-world usage patterns.

#### **The Business Rules**
```typescript
/**
 * Validates if a drag-drop operation is allowed.
 * Fixed items (Info/Ending) cannot be moved or be drop targets.
 * Items cannot be dropped at first (0) or last position to preserve fixed items.
 */
isValidDropPosition: (activeId: string, overId: string) => {
  // INFO is always first, ENDING is always last
  // Only movable items can be reordered between them
}
```

#### **Automatic Correction**
```typescript
/**
 * Reorders items while ensuring fixed items stay in correct positions.
 * If Info is not first or Ending is not last, automatically corrects the order.
 */
reorderItems: (newItems: NavigationItem[]) => {
  if (infoIndex !== 0 || endingIndex !== newItems.length - 1) {
    // Auto-fix: [Info, ...movableItems, Ending]
  }
}
```

### **Page Insertion System**

#### **Smart Positioning**
```typescript
/**
 * Inserts a new page at the specified index.
 * Always inserts before the Ending item, even if index is beyond it.
 */
insertPageAt: (index: number) => {
  const endingIndex = items.findIndex(item => item.id === FIXED_PAGE_IDS.ENDING);
  const finalIndex = index >= endingIndex ? endingIndex : index;
  // Insert at finalIndex, never after Ending
}
```

### **Drag & Drop Implementation**

#### **Why @dnd-kit?**
- **🎯 Accessibility**: Built-in keyboard navigation and screen reader support
- **📱 Touch Support**: Works on mobile devices out of the box
- **🎨 Customizable**: Full control over drag overlays and animations
- **⚡ Performance**: Optimized for React with minimal re-renders
- **🛡️ Type Safety**: Excellent TypeScript support

#### **Smart Drag Activation**
```typescript
const sensors = useSensors(
  useSensor(PointerSensor, {
    /**
     * Prevents accidental drags - user must drag 8px before drag starts.
     * This allows for normal clicks without triggering drag operations.
     */
    activationConstraint: {
      distance: 8,
    },
  }),
);
```

### **Scroll Navigation**

#### **Intersection Observer Pattern**
```typescript
/**
 * Determines scroll button visibility based on sentinel elements.
 * When first/last items go OUT OF VIEW, their respective scroll buttons appear.
 */
const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
  entries.forEach((entry) => {
    if (entry.target.id === "first-nav-item") {
      setCanScrollLeft(!entry.isIntersecting); // Not visible = can scroll left
    } else if (entry.target.id === "last-nav-item") {
      setCanScrollRight(!entry.isIntersecting); // Not visible = can scroll right
    }
  });
}, []);
```

### **Context Menu System**

#### **Why Shadcn/ui?**
- **🎨 Consistent Design**: Matches modern design systems
- **♿ Accessibility**: ARIA compliant out of the box  
- **🔧 Customizable**: Easy to modify styles and behavior
- **📦 Tree Shakeable**: Only imports what you use

#### **Minimal Implementation**
```typescript
// Only DELETE action is implemented for demonstration
// Shows the full context menu structure for future features
const actions = ["setFirst", "rename", "copy", "duplicate", "delete"];
// ✅ delete: Fully functional
// 🚧 others: UI ready, logic can be added when needed
```

> **🚧 Implementation Note**: Only the **delete** action is fully implemented in the context menu to demonstrate the complete interaction flow. The other menu options (rename, copy, duplicate, set as first) are present in the UI to show the complete design pattern, making it easy to add functionality when needed. This demonstrates a **pragmatic development approach** - building the complete UI structure while implementing only the essential functionality first.

## 🧪 Testing Philosophy

### **What We Test**
```typescript
describe("Navigation Store - Critical Logic", () => {
  // ✅ Business logic: Page insertion rules
  // ✅ Complex behavior: Fixed items positioning  
  // ✅ Edge cases: Drop validation
});
```

### **What We DON'T Test**
- **❌ UI Components**: Too brittle, low business value
- **❌ Drag & Drop Interactions**: Complex to mock, covered by manual testing
- **❌ Scroll Behavior**: Browser-specific, hard to test meaningfully
- **❌ Hook Wrappers**: Simple pass-through logic

### **Test Coverage Strategy**
- **🎯 12 focused tests** covering critical business logic
- **⚡ 400ms execution time** for fast feedback loops
- **🔄 Automatic runs** via Husky pre-push hooks

## 📚 Documentation Strategy

### **JSDoc for Complex Logic Only**
```typescript
/**
 * Validates if a drag-drop operation is allowed.
 * Fixed items (Info/Ending) cannot be moved or be drop targets.
 * Items cannot be dropped at first (0) or last position to preserve fixed items.
 */
isValidDropPosition: (activeId: string, overId: string) => boolean;
```

**Documentation Criteria**:
- ✅ **Complex business rules** that aren't obvious
- ✅ **Edge case handling** that might confuse developers  
- ✅ **Performance considerations** (like drag activation constraint)
- ❌ Self-explanatory code (TypeScript provides enough context)

## 🚀 Getting Started

### **Installation**
```bash
# Clone the repository
git clone <repository-url>

# Install dependencies
pnpm install

# Start development server
pnpm dev

# Run tests
pnpm test

# Run linting
pnpm lint
```

### **Development Scripts**
```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm test         # Run tests in watch mode
pnpm test:run     # Run tests once
pnpm lint         # Run Biome linting
pnpm format       # Format code with Biome
```

## 🔧 Configuration Files

### **Key Configuration**
- **`biome.json`**: Linting and formatting rules
- **`vitest.config.ts`**: Test configuration
- **`tailwind.config.ts`**: Design system tokens
- **`tsconfig.json`**: TypeScript configuration

## 🤝 Contributing

1. Follow the established patterns for component organization
2. Add JSDoc only for non-obvious business logic
3. Test critical business logic, not UI interactions
4. Use Biome for consistent formatting
5. Ensure all tests pass before submitting PRs

## 📄 License

MIT License - see LICENSE file for details.

---

