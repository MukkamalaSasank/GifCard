# GifCard - Greeting Card Creator

A modern web application for creating personalized greeting cards with GIF integration.

## Technologies Used

- **Frontend**: React, TypeScript, Vite
- **Styling**: Tailwind CSS, shadcn/ui components
- **Routing**: React Router
- **Icons**: Lucide React
- **GIF APIs**: Giphy and Tenor integration

## Features

- Create custom greeting cards
- GIF search and integration
- Responsive design
- Modern UI with dark theme support

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd GifCard
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:
   Create a `.env` file in the root directory with your API keys:

```env
VITE_GIPHY_API_KEY=your_giphy_api_key
VITE_TENOR_API_KEY=your_tenor_api_key
```

4. Start the development server:

```bash
npm run dev
```

5. Open [http://localhost:8080] in your browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/              # Page components
├── assets/             # Static assets
└── index.css           # Global styles
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
