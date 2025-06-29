# Frontend - Metaverse 2D

This is the frontend application for the Metaverse 2D project, built with Next.js, React, and PixiJS.

## Features

- **Virtual Space Canvas**: A multiplayer 2D virtual space using ~~PixiJS~~ or Phaser (TBD)
- **Real-time Communication**: WebSocket-based chat and movement synchronization
- **User Authentication**: JWT-based authentication system
- **Responsive Design**: Modern UI with Tailwind CSS

## Virtual Space Canvas

The virtual space canvas is a core feature that allows multiple users to:

- **Move around**: Use WASD or Arrow keys to navigate the 2D space
- **Chat**: Send real-time messages to other users in the space
- **See other users**: View avatars and names of other connected users
- **Real-time synchronization**: All movements and chat messages are synchronized across all connected users

### How to Use

1. **Navigate to a space**: Visit `/space/[spaceId]` where `[spaceId]` is the ID of the space you want to join
2. **Authentication**: Make sure you're signed in (the app will check for a JWT token)
3. **Controls**:
   - **WASD** or **Arrow Keys**: Move your avatar around the space
   - **Enter**: Send a chat message (type in the chat input first)
   - **Mouse**: Click and drag to look around (if implemented)

### Technical Implementation

The virtual space canvas is built using:

- **PixiJS**: For 2D graphics rendering and sprite management
- **WebSocket**: For real-time communication with the server
- **GSAP**: For smooth animations and transitions
- **React**: For UI components and state management

### WebSocket Messages

The canvas communicates with the WebSocket server using these message types:

- `join`: Join a space with authentication
- `move`: Send movement updates
- `chat`: Send chat messages
- `space-joined`: Confirmation of joining a space
- `user-joined`: Notification when a new user joins
- `movement`: Movement updates from other users
- `chat`: Chat messages from other users
- `user-left`: Notification when a user leaves
- `movement-rejected`: Server rejection of invalid movement

## Development

### Prerequisites

- Node.js 18+ 
- pnpm

### Installation

```bash
# Install dependencies
pnpm install

# Start the development server
pnpm dev
```

The frontend will run on `http://localhost:3001`

### Environment Variables

Create a `.env.local` file in the frontend directory:

```env
JWT_PASSWORD=your-secret-key
```

### Dependencies

- **Next.js 15**: React framework
- **React 19**: UI library
- **PixiJS 8**: 2D graphics library
- **GSAP**: Animation library
- **Tailwind CSS**: Utility-first CSS framework
- **jsonwebtoken**: JWT handling

## Architecture

The frontend follows a modular architecture:

```
src/
├── app/                    # Next.js app router
│   ├── api/               # API routes
│   ├── space/             # Space pages
│   └── ...
├── components/            # React components
│   └── virtual-space-canvas.tsx  # Main canvas component
├── lib/                   # Utilities and types
└── ...
```

## Integration with Backend

The frontend integrates with:

- **HTTP API** (`apps/http`): For authentication and space management
- **WebSocket Server** (`apps/ws`): For real-time communication
- **Database** (`packages/db`): For user and space data

## Contributing

1. Follow the existing code style
2. Add proper TypeScript types
3. Test your changes thoroughly
4. Update documentation as needed

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
