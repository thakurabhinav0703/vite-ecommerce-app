# AuraCart - Premium React.js E-Commerce Application

AuraCart is a highly responsive, modern, and visually stunning e-commerce catalog application built with **React.js (Vite)**, **React Router**, **Context API**, and custom **CSS styling**.

## 🚀 Features

- **Dynamic Product Catalog (Task 1)**: Listing of 194 products fetched from DummyJSON. Displays high-resolution image cards containing Title, Brand, Category, Rating, Price, Discount Badge, "View Details", and "Add to Cart" actions.
- **Product Details View (Task 2)**: Detailed view on `/product/:id` showing images gallery, complete description, stock status (In stock / Low Stock / Out of Stock alerts), warranty details, shipping speed, return policies, and specifications grid.
- **Shopping Bag Management (Task 3)**: Beautiful shopping cart `/cart` demonstrating inline quantity increments, decrements, item deletion, empty cart view with redirect CTA, and interactive order checkout simulation.
- **Professional Bill Summary (Task 3)**: Precise calculation of subtotal, saving discounts, 18% GST surcharge, delivery fee dynamics (FREE on orders above $100, otherwise flat $15), and grand total.
- **State Persistence (Cart Features)**: Full context-bound cart functions (`addToCart`, `removeFromCart`, `increaseQuantity`, `decreaseQuantity`, `clearCart`) synced seamlessly with browser `localStorage`.
- **Cosmic 404 Route (Routing)**: Custom page showing beautiful cosmos illustration and single-click home redirect.
- **WOW Premium Aesthetics (UI/UX)**: Dark glassmorphic interfaces, hover translation scaling, pulsing indicators, smooth slide-ins, and unified design parameters.
- **Bonus Capabilities**:
  - Full catalog search (matches text on title, brand, or categories).
  - Categorization filter showing dynamically populated lists based on available inventory.
  - Sorting criteria (Price: Low to High, Price: High to Low, Rating, Discount level).
  - Seamless numeric pagination with smooth page scrolling.
  - Floating HTML5 Toast message notifications for item updates.
  - Shimmering page skeleton loaders and rotating progress indicators.

---

## 📂 Project Directory Structure

```
src/
├── components/
│   ├── Navbar.jsx         # App header, navigation links, and dynamic badge
│   ├── Navbar.css
│   ├── ProductCard.jsx    # Responsive grid card with hover transformations
│   ├── ProductCard.css
│   ├── CartItem.jsx       # Item row with quantity buttons and remove trigger
│   ├── CartItem.css
│   ├── BillSummary.jsx    # Calculations for tax, shipping, discount, checkout
│   ├── BillSummary.css
│   ├── Loader.jsx         # Rotating page spinner and shimmering cards
│   ├── Loader.css
│   ├── Toast.jsx          # Bottom right notification card
│   └── Toast.css
│
├── pages/
│   ├── Home.jsx           # Main listing view with search, filter, sorting, and page controls
│   ├── Home.css
│   ├── ProductDetails.jsx # Detailed gallery, spec grid, and shipping details
│   ├── ProductDetails.css
│   ├── Cart.jsx           # Cart page wrapper and empty shopping bag view
│   ├── Cart.css
│   ├── NotFound.jsx       # Custom themed 404 router mismatch view
│   └── NotFound.css
│
├── context/
│   └── CartContext.jsx    # Cart bag actions, localstorage syncing, toast state
│
├── services/
│   └── api.js             # API integration calls
│
├── App.jsx                # Router config, Layout container, Context hook bind
├── main.jsx               # Render initialization
└── index.css              # Typography setup, CSS Variables design system
```

---

## 🛠️ Getting Started

### Prerequisites

You need **Node.js** (v18 or higher) and **npm** installed on your computer.

### Installation

1. Clone or download this project workspace.
2. Open your terminal in the `vite-ecommerce-app` project root directory.
3. Install the dependencies:
   ```bash
   npm install
   ```

### Execution

To run the application locally in development mode:
```bash
npm run dev
```
The application will start, and you can open [http://localhost:3000](http://localhost:3000) in your web browser.

### Build Compilation

To compile a highly optimized static bundle for production deployment:
```bash
npm run build
```
The compiled output will be generated inside the `dist/` directory.
