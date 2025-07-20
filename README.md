# Finance Flow

Finance Flow is a comprehensive personal finance management web application built with modern technologies. This project combines the power of Next.js, TypeScript, and Tailwind CSS with Firebase backend services and Google Genkit AI integration to deliver an intelligent, real-time financial tracking experience.

## ✨ Features

- **Modern UI:** Built with Next.js 15, Tailwind CSS, and TypeScript for optimal performance and developer experience
- **AI-Powered Chat:** Integrated chatbot using Google Genkit AI for financial insights and assistance
- **Comprehensive Finance Management:** Track income, expenses, budgets, and generate detailed reports
- **Real-Time Data:** Firebase integration for live data synchronization
- **Responsive Design:** Fully responsive UI optimized for desktop and mobile devices
- **Component Library:** Built with Radix UI primitives and shadcn/ui components
- **Data Visualization:** Interactive charts and graphs using Recharts
- **Form Validation:** Robust form handling with React Hook Form and Zod validation

## 🛠️ Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) with Turbopack
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [Radix UI](https://www.radix-ui.com/) + [shadcn/ui](https://ui.shadcn.com/)
- **Backend:** [Firebase](https://firebase.google.com/)
- **AI Integration:** [Google Genkit](https://firebase.google.com/docs/genkit)
- **Charts:** [Recharts](https://recharts.org/)
- **Forms:** [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **Icons:** [Lucide React](https://lucide.dev/)

## 🏁 Getting Started

### Prerequisites
- Node.js (version 18 or higher)
- npm or yarn package manager
- Firebase account and project setup

### Installation

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/abhaysingh-22/Finance_Flow.git
   cd Finance_Flow
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Set Up Environment Variables:**
   - Create a `.env.local` file in the root directory
   - Add your Firebase configuration and Google AI API keys
   ```bash
   # Firebase Config
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   # Add other Firebase config variables

   # Google AI (for Genkit)
   GOOGLE_GENAI_API_KEY=your_google_ai_api_key
   ```

4. **Run the Development Server:**
   ```bash
   npm run dev
   ```
   The application will start on `http://localhost:9002`

5. **Development with AI Features (Optional):**
   For AI chatbot development:
   ```bash
   npm run genkit:dev
   ```

### Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking
- `npm run genkit:dev` - Start Genkit AI development server
- `npm run genkit:watch` - Start Genkit AI with file watching

## 📂 Project Structure

```
Finance_Flow/
├── src/
│   ├── ai/                      # AI integration and flows
│   │   ├── dev.ts              # Development AI setup
│   │   ├── genkit.ts           # Genkit configuration
│   │   └── flows/              # AI conversation flows
│   ├── app/                    # Next.js app directory
│   │   ├── page.tsx            # Main dashboard page
│   │   ├── layout.tsx          # Root layout
│   │   ├── globals.css         # Global styles
│   │   ├── budgets/            # Budget management pages
│   │   ├── expenses/           # Expense tracking pages
│   │   ├── income/             # Income management pages
│   │   └── reports/            # Financial reports pages
│   ├── components/             # Reusable React components
│   │   ├── budgets/            # Budget-related components
│   │   ├── charts/             # Data visualization components
│   │   ├── chatbot/            # AI chatbot components
│   │   ├── dashboard/          # Dashboard components
│   │   ├── forms/              # Form components
│   │   ├── layout/             # Layout components
│   │   ├── providers/          # Context providers
│   │   └── ui/                 # shadcn/ui base components
│   ├── hooks/                  # Custom React hooks
│   └── lib/                    # Utility functions and types
├── docs/
│   └── blueprint.md            # Project documentation
├── public/                     # Static assets
├── package.json                # Dependencies and scripts
├── tailwind.config.ts          # Tailwind CSS configuration
├── next.config.ts              # Next.js configuration
├── tsconfig.json               # TypeScript configuration
└── README.md                   # Project documentation
```

## 💡 Key Features & Pages

- **Dashboard:** Overview of financial status with summary cards and recent transactions
- **Income Management:** Track and categorize income sources
- **Expense Tracking:** Monitor and categorize expenses with detailed insights
- **Budget Planning:** Create and manage budgets with progress tracking
- **Financial Reports:** Generate comprehensive financial reports and analytics
- **AI Chatbot:** Get financial advice and insights through AI-powered conversations

## 📱 Application Structure

- **Main Entry Point:** [`src/app/page.tsx`](src/app/page.tsx) - Dashboard homepage
- **AI Integration:** [`src/ai/`](src/ai/) - Google Genkit AI configuration and flows
- **Component Library:** [`src/components/ui/`](src/components/ui/) - Reusable UI components

## 🔧 Configuration Files

- **Next.js:** [`next.config.ts`](next.config.ts) - Framework configuration
- **TypeScript:** [`tsconfig.json`](tsconfig.json) - Type checking configuration  
- **Tailwind:** [`tailwind.config.ts`](tailwind.config.ts) - Styling configuration
- **Components:** [`components.json`](components.json) - shadcn/ui configuration

## 🚀 Deployment

The application can be deployed to various platforms:
- **Vercel:** Recommended for Next.js applications
- **Firebase Hosting:** Integrated with Firebase backend
- **Netlify:** Alternative hosting platform

## 💡 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Google Genkit Documentation](https://firebase.google.com/docs/genkit)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com/)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!  
Feel free to open an issue or submit a pull request.

## 📝 License

This project is licensed under the MIT License.

---

Feel free to customize further based on your project’s specifics!
