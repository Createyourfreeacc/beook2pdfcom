# Beook2PDF Website

A modern, responsive website for the Beook2PDF project built with Angular.

## Features

- 🎨 Modern, beautiful UI design
- 📱 Fully responsive layout
- ⚡ Fast and optimized
- 🔒 HTTPS ready with Let's Encrypt
- 🚀 Production-ready deployment configuration

## Development

### Prerequisites

- Node.js 18+ 
- npm 9+

### Installation

```bash
npm install
```

### Development Server

```bash
npm start
```

Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Build for Production

```bash
npm run build:prod
```

The build artifacts will be stored in the `dist/` directory.

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions on Linux Mint with Nginx and Let's Encrypt.

### Quick Deployment Steps

1. Build the application: `npm run build:prod`
2. Configure Nginx (see `nginx.conf`)
3. Set up SSL with Let's Encrypt: `sudo certbot --nginx -d yourdomain.com`
4. Deploy files to `/var/www/beook2pdfcom/`

## Project Structure

```
src/
├── app/
│   ├── home/           # Homepage component
│   ├── app.ts          # Root component
│   ├── app.routes.ts   # Routing configuration
│   └── app.css         # App styles
├── index.html          # Main HTML file
└── styles.css          # Global styles
```

## Technologies Used

- Angular 21
- TypeScript
- CSS3 with modern features
- Nginx (for production)

## License

This project is for educational purposes only. Please respect the intellectual property rights of content creators and publishers.

## Related Project

This website is for the [Beook2PDF](https://github.com/Createyourfreeacc/beook2pdf) project - a Windows application that exports content from the DRM-protected Beook e-learning platform to PDF format.
