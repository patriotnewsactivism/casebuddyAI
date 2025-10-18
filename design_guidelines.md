# Case Buddy Design Guidelines

## Design Approach: Professional Legal Tech System

**Selected Framework:** Fluent Design principles adapted for legal professionals
**Rationale:** Case management requires information density, clear hierarchy, and professional credibility. The interface must inspire trust while handling complex legal data efficiently.

**Core Principles:**
- Authority & Trust: Design conveys professional legal expertise
- Clarity Over Flash: Information hierarchy prioritizes function
- Intelligent Density: Maximum information without overwhelming users
- Contextual AI: AI features feel integrated, not gimmicky

---

## Color Palette

### Dark Mode (Primary)
**Primary Brand Colors:**
- Deep Legal Blue: 220 65% 25% (primary actions, navigation)
- Judicial Navy: 220 50% 15% (backgrounds, cards)
- Slate Surface: 220 15% 20% (secondary surfaces)

**Accent Colors:**
- Trust Gold: 42 85% 55% (premium features, highlights - use sparingly)
- Evidence Green: 142 65% 45% (success states, verified items)
- Alert Crimson: 355 75% 55% (urgent deadlines, critical items)

**Neutral Scale:**
- Text Primary: 220 10% 95%
- Text Secondary: 220 10% 70%
- Border Subtle: 220 15% 30%
- Background Deep: 220 25% 10%

### Light Mode
**Primary Brand Colors:**
- Legal Blue: 220 75% 42%
- Crisp White: 0 0% 100%
- Cool Gray: 220 10% 96%

**Accent Colors:**
- Professional Gold: 42 75% 48%
- Success Green: 142 55% 38%
- Warning Red: 355 65% 48%

---

## Typography

**Font Stack:**
- **Primary:** Inter (via Google Fonts CDN) - Clean, highly legible for legal text
- **Display/Headers:** "DM Serif Display" - Authoritative legal aesthetic for headlines
- **Monospace:** "JetBrains Mono" - Code blocks, case numbers, citations

**Type Scale:**
- Hero/Display: text-5xl to text-6xl, font-serif
- Page Headers: text-3xl to text-4xl, font-semibold
- Section Titles: text-xl to text-2xl, font-semibold  
- Body Text: text-base, font-normal, leading-relaxed
- Case Numbers/Citations: text-sm, font-mono
- Metadata/Labels: text-xs to text-sm, uppercase tracking-wide

---

## Layout System

**Spacing Primitives:** Tailwind units of 2, 4, 6, 8, 12, 16, 20 (p-4, m-8, gap-6, etc.)

**Grid Structure:**
- Dashboard: 12-column grid with 280px fixed sidebar
- Case Detail: 8-column content + 4-column metadata/timeline sidebar
- Document View: Full-width with floating action toolbar
- Analytics: Responsive grid-cols-1 md:grid-cols-2 lg:grid-cols-4

**Container Strategy:**
- Max Width: max-w-7xl for main content areas
- Sidebar Width: w-72 (288px) for navigation
- Metadata Panels: w-80 to w-96 (320-384px)
- Modal Overlays: max-w-4xl centered

---

## Component Library

### Navigation & Structure
- **Top Bar:** Fixed header with case switcher, global search, user menu
- **Sidebar:** Collapsible navigation with icon+text, organized by workflow
- **Breadcrumbs:** Case hierarchy display (Organization > Case > Document)
- **Tabs:** Underline style for case sections (Overview, Documents, Timeline, Research)

### Data Display
- **Case Cards:** Shadow-lg cards with status badge, key metrics, quick actions
- **Timeline:** Vertical with connecting lines, event nodes with icons and dates
- **Evidence Grid:** Masonry layout for mixed media with AI classification tags
- **Document List:** Table view with preview, metadata columns, batch actions
- **Analytics Dashboard:** Card-based KPI displays with trend indicators

### AI Features Presentation
- **AI Insights Panel:** Floating card with gradient border (blue to gold), icon indicators
- **Analysis Results:** Expandable sections with confidence scores and citations
- **Risk Assessment:** Progress bars with color-coded severity levels
- **Research Citations:** Clean citation format with jurisdiction badges

### Forms & Input
- **Search:** Prominent global search with AI suggestions dropdown
- **Filters:** Chip-based multi-select with clear visual feedback
- **Document Upload:** Drag-drop zone with OCR processing indicator
- **Rich Text Editor:** Toolbar with legal formatting (citations, references)

### Interactive Elements
- **Buttons:** Solid primary (blue), outline secondary, ghost tertiary
- **Status Badges:** Rounded-full with semantic colors and icons
- **Tooltips:** Dark background with precise positioning on legal terms
- **Modals:** Centered overlay with backdrop blur, escape to close

### Subscription Tiers Visual Distinction
- Free: Basic blue outline styling
- Pro Se: Single gold accent element
- Attorney: Premium card elevation with subtle gold borders
- Law Firm: Exclusive gradient headers with team collaboration badges

---

## Animations & Transitions

**Minimal & Purposeful:**
- Page transitions: Crossfade 200ms
- Card hovers: Subtle lift with shadow-xl transition 150ms
- Sidebar collapse: Smooth width transition 250ms
- AI processing: Gentle pulse on analysis indicator
- NO decorative animations, spinning icons only for loading states

---

## Images & Visual Assets

### Icons
**Library:** Heroicons (via CDN) - professional, legal-appropriate iconography
- Scale icons: Legal (balance), document types, evidence categories
- Status icons: Checkmarks, alerts, warnings with semantic meaning
- AI indicators: Sparkle/brain icons for AI-powered features

### Imagery Strategy
**Hero Section (Marketing/Landing):**
- Professional courtroom or legal office environment
- Subtle overlay to ensure text readability
- Focus on technology + legal profession intersection

**In-App Imagery:**
- Document previews with thumbnails
- Team member avatars (circular, consistent sizing)
- Evidence photos in grid layout with metadata overlays
- NO stock legal photos in the application interface

---

## Accessibility & Dark Mode

**Consistent Implementation:**
- All form inputs have dark mode styling (bg-slate-800, border-slate-600)
- Text fields maintain 4.5:1 contrast ratio minimum
- Focus states: 2px ring-offset with brand color ring
- Keyboard navigation: Visible focus indicators on all interactive elements
- Screen reader labels on all icon-only buttons
- High contrast mode support with semantic color variables

**Form Styling Dark Mode:**
- Input backgrounds: bg-slate-800
- Input borders: border-slate-600 focus:border-blue-500
- Labels: text-slate-300
- Placeholders: text-slate-500

---

## Professional Legal UI Patterns

**Case Header Pattern:**
- Case name + number prominent
- Status badge (Active, Pending, Closed) with color coding
- Key dates display (Filed, Deadline, Court Date)
- Quick action buttons (Add Document, Schedule Event, Generate Report)

**Document Workspace:**
- Split view: PDF preview left, AI analysis right
- Annotation toolbar with legal-specific tools
- Version history with diff comparison
- Citation extraction with automatic formatting

**AI Feature Integration:**
- Always show confidence scores (0-100%)
- Include "Why?" explanation buttons for AI decisions
- Provide manual override options for all AI suggestions
- Clear visual distinction between AI-generated and user-created content

**Subscription Gates:**
- Blurred preview of premium features
- Clear upgrade CTAs with feature comparison
- Usage meters for tiered limits (e.g., "3/10 AI analyses this month")
- Graceful degradation for free tier users