# Cafe Elaichi Website

This is a modern, responsive website for Cafe Elaichi, built with Next.js, Tailwind CSS, and ShadCN UI.

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:9002](http://localhost:9002) with your browser to see the result.

## Customization

### Adding a Logo

1.  Place your logo file (e.g., `logo.svg` or `logo.png`) in the `public/` directory.
2.  Open `src/components/header.tsx`.
3.  Locate the comment `<!-- Add your logo here -->`.
4.  Replace the `<span>Cafe Elaichi</span>` with an `<img>` or Next.js `<Image>` component pointing to your logo file. For example:

```jsx
import Image from 'next/image';

// ... inside the component
<Link href="/" className="flex items-center gap-2">
  <Image src="/logo.svg" alt="Cafe Elaichi Logo" width={40} height={40} />
  <span className="hidden font-bold sm:inline-block">
    Cafe Elaichi
  </span>
</Link>
```

### Adding a Favicon

1.  Generate your favicon files (e.g., `favicon.ico`, `apple-touch-icon.png`, etc.). You can use a service like [favicon.io](https://favicon.io/).
2.  Place the generated files in the `public/` directory.
3.  Open `src/app/layout.tsx`.
4.  Add the appropriate `<link>` tags for your favicon inside the `<head>` element. For example:

```jsx
<head>
  // ... other head elements
  <link rel="icon" href="/favicon.ico" sizes="any" />
  <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
</head>
```

### Environment Variables

This project does not require any environment variables for its core functionality. If you integrate with third-party services (like a real email sending service for the contact form), you will need to add them to a `.env.local` file.

## Deploying to Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details. The project is configured to build cleanly and deploy to Vercel without any extra configuration.
