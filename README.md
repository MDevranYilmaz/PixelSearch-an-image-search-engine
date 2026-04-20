# PixelSearch - Image Search Engine

A modern, fast, and intuitive image search engine built with Next.js and Unsplash API. Search millions of free, high-quality images and save your favorites.

## Features

- 🔍 **Fast Image Search** - Search millions of images from Unsplash
- ❤️ **Favorites** - Save and manage your favorite images with notes
- 🎨 **Modern UI** - Beautiful, responsive interface with dark/light mode support
- 📱 **Mobile Friendly** - Fully responsive design works on all devices
- ⚡ **Performance** - Optimized for speed and smooth user experience
- 🎯 **Intuitive** - Simple and easy-to-use search interface

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) - React framework for production
- **Language**: [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- **UI Components**: [Radix UI](https://www.radix-ui.com/) - Unstyled, accessible components
- **Package Manager**: [pnpm](https://pnpm.io/) - Fast, disk space efficient package manager
- **API**: [Unsplash API](https://unsplash.com/api) - Free high-quality image API

## Project Structure

```
├── app/                      # Next.js app directory
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Home page with search logic
│   └── globals.css          # Global styles
├── components/              # React components
│   ├── ui/                  # Reusable UI components
│   ├── hero-section.tsx     # Hero section component
│   ├── image-grid.tsx       # Image grid display
│   ├── image-card.tsx       # Individual image card
│   ├── search-header.tsx    # Search input header
│   └── theme-provider.tsx   # Theme management
├── hooks/                   # Custom React hooks
│   ├── use-favorites.ts     # Manage favorite images
│   ├── use-mobile.ts        # Mobile detection
│   └── use-toast.ts         # Toast notifications
├── lib/                     # Utility functions
│   └── utils.ts             # Helper utilities
├── public/                  # Static files
├── styles/                  # Additional styles
└── package.json             # Project dependencies
```

## Getting Started

### Prerequisites

- Node.js 18+ installed
- pnpm package manager (or npm/yarn)
- An Unsplash API key (free)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd PixelSearch-an-image-search-engine
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   # or
   yarn install
   ```

## API Key Setup

### Getting Your Unsplash API Key

1. **Create an Unsplash Developer Account**
   - Go to [Unsplash Developers](https://unsplash.com/oauth/applications)
   - Sign up for a free account (or sign in if you already have one)

2. **Create a New Application**
   - Click "Create a new application"
   - Accept the terms and click "Create application"
   - Fill in the application name and description
   - Accept the API terms and submit

3. **Get Your Access Key**
   - You'll be redirected to your application dashboard
   - Copy the **Access Key** from the "Keys" section

4. **Set Up Environment Variables**
   - Create a `.env.local` file in the project root:
   ```bash
   touch .env.local
   ```
   - Add your Unsplash API key:
   ```env
   NEXT_PUBLIC_UNSPLASH_ACCESS_KEY=your_access_key_here
   ```
   - Replace `your_access_key_here` with your actual Unsplash Access Key

### Environment Variables

| Variable | Type | Description |
|----------|------|-------------|
| `NEXT_PUBLIC_UNSPLASH_ACCESS_KEY` | Public | Your Unsplash API Access Key (required) |

**Note**: The `NEXT_PUBLIC_` prefix makes this variable accessible in the browser. This is safe because Unsplash API keys are meant to be public and rate-limited per IP/key.

## Running the Application

### Development Mode
```bash
pnpm dev
# or
npm run dev
```
The application will be available at `http://localhost:3000`

### Production Build
```bash
pnpm build
pnpm start
# or
npm run build
npm start
```

### Linting
```bash
pnpm lint
# or
npm run lint
```

## Usage

1. **Search Images**
   - Enter a search query in the search bar
   - Press Enter or click the search button
   - Results will load and display in a grid

2. **View Image Details**
   - Click on any image to view it in full resolution
   - See photographer information and attribution

3. **Save Favorites**
   - Click the heart icon on any image to save it to favorites
   - Add personal notes to your favorite images
   - Access your favorites from the favorites view

4. **Theme Toggle**
   - Switch between dark and light mode using the theme toggle
   - Your preference is saved locally

## API Rate Limits

The Unsplash API has the following rate limits for free tier:
- **50 requests per hour** for free tier applications
- Higher limits available with paid plans

Make sure to respect these limits when using the application.

## License

This project is open source and available under the MIT License.

## Contributing

Contributions are welcome! Feel free to submit a pull request or open an issue.

## Support

For issues related to:
- **This application**: Create an issue in the repository
- **Unsplash API**: Visit [Unsplash API Documentation](https://unsplash.com/documentation)

## Acknowledgments

- Images provided by [Unsplash](https://unsplash.com)
- UI components by [Radix UI](https://www.radix-ui.com)
- Icons by [Lucide React](https://lucide.dev)
- Built with [Next.js](https://nextjs.org)

---

**Happy searching! 🔍**
