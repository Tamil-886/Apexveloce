# APEX VELOCE | Bespoke Vehicle Wrap & Custom Motorstudio

![APEX VELOCE](https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80)

**APEX VELOCE** is a high-end, luxury automotive customization and vehicle restyling web application built with modern HTML5, CSS3 (Custom Properties & Responsive Grid/Flexbox), and Vanilla JavaScript.

Designed specifically to reflect the surgical precision and bold aesthetic of world-class automotive studios (XPEL, Inozetek, 3M, Mansory, TopCar, Protective Film Solutions).

---

## 🏎️ Complete Project Structure

```text
Car project/
│
├── index.html                         # Home 1 — Flagship Studio Landing Page
├── home-2.html                        # Home 2 — Wrap & Custom Modification Studio
├── about.html                         # Studio Story, Master Team & Quality Standards
├── services.html                      # All Services Categorized Directory & Cart Additions
├── service-details.html               # Individual Conversion-Focused Service Page
├── gallery.html                       # Filterable Portfolio Showcase with Lightbox
├── pricing.html                       # Transparent Packages, Add-to-Cart & Price Estimator
├── blog.html                          # Automotive Journal & Technical Guides
├── blog-details.html                  # In-depth Article Layout
├── contact.html                       # Bespoke Design Consultation
├── payment.html                       # 2-Column Automotive Checkout & Cleanroom Bay Reservation
├── payment-success.html               # VIP Order Receipt & Build Confirmation Page
│
├── login.html                         # Client Login with Instant Validation & Redirect
├── register.html                      # VIP Customer Account Registration
│
├── 404.html                           # "Drifted Off Track" 404 Error Screen
├── coming-soon.html                   # Launch Countdown & VIP Notification Signup
├── maintenance.html                   # Scheduled Pit-Stop Maintenance Screen
│
├── assets/
│   ├── css/
│   │   ├── style.css                  # Core design tokens, typography, navbar, cart, payment suite, footer
│   │   ├── responsive.css             # Granular breakpoints (1400px down to 380px)
│   │   ├── dark-mode.css              # Obsidian dark theme & cyber glow effects
│   │   ├── light-mode.css             # Refined pearl ceramic light theme
│   │   └── animations.css             # Keyframe animations & sheen hover effects
│   │
│   └── js/
│       ├── main.js                    # Global initializer & Before/After slider engine
│       ├── navigation.js              # Sticky navbar, mobile drawer, active links
│       ├── theme.js                   # Dual-theme switcher with localStorage sync
│       ├── animations.js              # IntersectionObserver scroll reveals & counters
│       ├── cart.js                    # Studio Shopping Cart Drawer engine & localStorage sync
│       ├── auth.js                    # Client Authentication, registration, login & user menu
│       ├── gallery.js                 # Category filters & fullscreen lightbox modal
│       ├── pricing.js                 # Interactive custom quote calculator & package cart
│       ├── payment.js                 # Payment method switcher, coupon engine & receipt generator
│       └── forms.js                   # Form validation, drag & drop dropzone, toasts
│
└── README.md
```

---

## 💎 Key Features & Interactive Components

1. **Client Authentication & VIP Profiles (`auth.js`)**:
   - Client registration with Name, Email, Password, and Confirm Password validation.
   - Secure client login with instant session persistence (`localStorage`).
   - Dynamic navbar user profile pill (e.g. `Cart | Tamil`) replacing Login/Register when authenticated.
   - Interactive profile dropdown menu with user email and single-click **Logout** action.
   - Default demo account: `tamil@apexveloce.com` / `password123`.

2. **Luxury Shopping Cart Drawer (`cart.js`)**:
   - Cart trigger icon on the desktop navbar and mobile drawer with real-time numerical badge.
   - Smooth slide-out cart drawer with backdrop overlay.
   - Add packages and custom services directly from **Services**, **Service Details**, and **Pricing**.
   - Item quantity adjustments, instant deletion, live subtotal & total computation, and persistence in `localStorage`.
   - Direct link to **Proceed to Studio Checkout** and **Continue Shopping**.

3. **Dual-Theme Engine (Dark / Light)**:
   - Persistent theme stored in `localStorage`.
   - Dark Mode: Deep obsidian black `#0B0D12`, Cyber Vivid Crimson `#FF2A54`, Electric Cyan `#00E5FF`, Metallic Gold `#D4AF37`.
   - Light Mode: Crisp ceramic white `#FFFFFF` and pearl slate `#F8FAFC` with high-contrast typography.

4. **Interactive Before / After Comparison Slider**:
   - Smooth mouse drag and mobile touch swipe functionality.
   - Compares stock OEM silver paint to bespoke Satin Vivid Crimson.

5. **Filterable Portfolio Showcase & Fullscreen Lightbox**:
   - Filter tabs: *All Projects*, *Vehicle Wraps*, *XPEL PPF*, *Custom Builds*, *Interiors*, *Detailing*.
   - Dynamic popup lightbox modal with high-res zoom, metadata, and quick inquiry buttons.

6. **Interactive Custom Quote & Build Price Estimator**:
   - Step 1: Select vehicle class (Sports Coupe, Mid-Size SUV, Full-Size SUV, Exotic Hypercar).
   - Step 2: Select finish (Satin/Gloss Wrap, Chameleon Flip, Track Pack PPF, Full Stealth PPF).
   - Step 3: Select optional add-ons (Ceramic coat, Window tint, Caliper paint, De-chrome blackout).
   - Live dynamic price computation.

7. **Bespoke Sticky Footer**:
   - Standardized 4-column luxury layout across every page with brand bio, quick navigation, specialties, and concierge contacts.
   - True sticky footer architecture (`min-height: 100vh; display: flex; flex-direction: column;` and `margin-top: auto;`) guaranteeing clean layout positioning on both short and long pages.

---

## 🚀 How to Run Locally

Since this is a pure client-side application with vanilla JavaScript and modern CSS:
1. Open `index.html` directly in any modern browser (Chrome, Edge, Safari, Firefox).
2. Or serve using any static server (e.g., Python `python -m http.server 8000` or VSCode Live Server).

---

## 🛡️ License
© 2026 APEX VELOCE BESPOKE MOTORSTUDIO. All Rights Reserved.
