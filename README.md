This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


# 🍕 Seagoville Pizza - Premium Pizza Ordering App

A fully-featured, production-ready pizza ordering platform built with Next.js 16, React 19, TypeScript, Tailwind CSS v4, and TanStack Query.

## Features

### 🎨 Perfect Design & UX
- **Premium Brand Colors**: Red/warm palette matching pizza aesthetics
- **Responsive Design**: Mobile-first approach with perfect desktop experience
- **Smooth Animations**: Hover effects, transitions, and interactive elements
- **Accessible**: Semantic HTML, ARIA attributes, screen reader support

### 🛠️ Architecture & Best Practices
- **Component-Based**: Reusable, single-responsibility components
- **Custom Hooks**: `usePizzaBuilder`, `useCart`, `usePizzasQuery`, `useOrdersMutation`
- **Type-Safe**: Complete TypeScript interfaces for all data models
- **State Management**: Local state with hooks, cart persistence via localStorage
- **Optimized Data Fetching**: TanStack Query with stale-while-revalidate patterns

### 📄 Pages & Features

#### Home Page (`/`)
- Hero section with CTA buttons
- Featured pizzas showcase
- Key metrics display (delivery time, menu items, ingredient quality)
- Beautiful gradient backgrounds and imagery

#### Menu Page (`/menu`)
- Browse all pizzas with category filtering
- Real-time filtering with TanStack Query
- Pizza cards with ratings and quick-add to cart
- Responsive grid layout

#### Pizza Builder (`/builder`)
- 6-step multi-step wizard (Size → Crust → Sauce → Cheese → Toppings → Review)
- Progress indicator with smooth transitions
- Real-time price calculation
- Topping limit enforcement (max 10)
- Live pizza preview with customization summary
- Add to cart with customizations

#### Shopping Cart (`/cart`)
- View all items with quantity controls
- Item-level price calculations
- Remove items functionality
- Order summary with tax calculation
- Empty state with helpful CTAs
- Persistent storage via localStorage

#### Checkout (`/checkout`)
- Multi-field delivery form (name, email, phone, address, city, zip)
- Payment method selection (Card/Cash)
- Order confirmation page with order number
- Delivery time estimates
- Demo mode with simulated payment processing

### 🎣 Data Management

#### Custom Hooks
- **`usePizzaBuilder`**: Manage pizza customization state
- **`useCart`**: Shopping cart operations with localStorage persistence
- **`usePizzasQuery`**: Fetch all pizzas (TanStack Query)
- **`usePizzaQuery`**: Fetch single pizza (TanStack Query)
- **`useFeaturedPizzasQuery`**: Fetch featured pizzas (TanStack Query)
- **`usePizzasByCategoryQuery`**: Filter pizzas by category (TanStack Query)
- **`useCreateOrderMutation`**: Create order mutation (TanStack Query)
- **`useUpdateOrderMutation`**: Update order status (TanStack Query)

#### TanStack Query Integration
- Configured QueryClient with optimal defaults
- Stale-time: 5 minutes for queries
- Cache time: 10 minutes for garbage collection
- Easy migration to real API endpoints
- Automatic request deduplication and caching

### 🔧 Code Structure

\`\`\`
app/
├── layout.tsx              # Root layout with Query Provider
├── globals.css             # Theme variables and Tailwind config
├── page.tsx                # Home page
├── menu/
│   └── page.tsx            # Menu with category filtering
├── builder/
│   └── page.tsx            # Pizza builder wizard
├── cart/
│   └── page.tsx            # Shopping cart
├── checkout/
│   └── page.tsx            # Checkout & order confirmation
└── providers.tsx           # TanStack Query provider

components/
├── header.tsx              # Main navigation
├── footer.tsx              # Footer with links
├── pizza-card.tsx          # Reusable pizza card
├── pizza-filter-tabs.tsx   # Category filter tabs
├── step-indicator.tsx      # Multi-step wizard progress
├── pizza-builder-preview.tsx # Real-time customization preview
├── cart-item-card.tsx      # Cart item with quantity controls
└── selection-grid.tsx      # Reusable selection grid component
└── ui/*                    # shadcn/ui components

hooks/
├── use-pizza-builder.ts    # Pizza customization state
├── use-cart.ts             # Shopping cart logic
├── use-pizzas-query.ts     # Pizza data fetching (Query)
└── use-orders-mutation.ts  # Order operations (Mutations)

lib/
├── types.ts                # TypeScript interfaces
└── constants.ts            # Static data & configuration
\`\`\`

### 🚀 Getting Started

1. **Clone & Install**
   \`\`\`bash
   git clone <repo>
   cd seagoville-pizza
   npm install
   \`\`\`

2. **Run Development Server**
   \`\`\`bash
   npm run dev
   \`\`\`

3. **Build for Production**
   \`\`\`bash
   npm run build
   npm start
   \`\`\`

### 🔌 API Integration (Ready for Implementation)

The app is designed to easily connect to real APIs:

\`\`\`typescript
// In hooks/use-pizzas-query.ts
queryFn: async () => {
  const response = await fetch('/api/pizzas')
  return response.json()
}

// In hooks/use-orders-mutation.ts
mutationFn: async (input) => {
  const response = await fetch('/api/orders', {
    method: 'POST',
    body: JSON.stringify(input),
  })
  return response.json()
}
\`\`\`

### 📦 Dependencies

- **Next.js 16**: React framework with SSR and optimization
- **React 19**: Latest React version with latest features
- **TypeScript**: Type safety and better DX
- **Tailwind CSS v4**: Utility-first styling
- **shadcn/ui**: High-quality component library
- **TanStack Query v5**: Data fetching and caching
- **lucide-react**: Beautiful icon library

### 🎯 Performance Optimizations

- Image optimization with Next.js Image component
- Component code splitting
- Query caching and deduplication
- localStorage for cart persistence
- Lazy loading for non-critical components
- Semantic HTML and accessibility

### 📱 Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile-first responsive design
- Touch-friendly interactions
- Works without JavaScript (graceful degradation)

### 🔒 Security

- XSS protection via React's built-in escaping
- CSRF token support ready
- Secure localStorage usage
- Input validation on forms
- Environment variables for sensitive data

### 🎨 Design System

**Color Palette**
- Primary: Warm red (#CD3E3E) - Pizza brand color
- Secondary: Light gray (95% brightness) - Neutral backgrounds
- Accent: Warm orange (60% brightness) - CTA highlights
- Neutrals: White, grays, near-black - Text and borders

**Typography**
- Font Family: Geist (Google Font)
- Heading: Bold weights, large sizes
- Body: Regular weight, 16px base size
- Line Height: 1.5-1.6 for readability

**Spacing Scale**
- 4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px
- Uses Tailwind spacing utilities consistently

## 🤝 Contributing

1. Create a feature branch
2. Make changes with tests
3. Submit pull request

## 📄 License

MIT License - feel free to use this project

## 📞 Support

For issues, feature requests, or questions, please open an issue or contact support.

---

Built with ❤️ for pizza lovers everywhere
