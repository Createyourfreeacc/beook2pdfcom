#!/bin/bash

# Deployment script for Beook2PDF website
# This script helps automate the deployment process

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
DOMAIN="yourdomain.com"
WEB_DIR="/var/www/beook2pdfcom"
NGINX_SITE="beook2pdfcom"

echo -e "${GREEN}Beook2PDF Website Deployment Script${NC}"
echo "=========================================="
echo ""

# Check if running as root
if [ "$EUID" -ne 0 ]; then 
    echo -e "${RED}Please run as root or with sudo${NC}"
    exit 1
fi

# Step 1: Build the application
echo -e "${YELLOW}Step 1: Building Angular application...${NC}"
npm install
npm run build:prod

if [ ! -d "dist/beook2pdfcom/browser" ]; then
    echo -e "${RED}Build failed! dist/beook2pdfcom/browser directory not found.${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Build completed successfully${NC}"
echo ""

# Step 2: Create web directory
echo -e "${YELLOW}Step 2: Creating web directory...${NC}"
mkdir -p $WEB_DIR
echo -e "${GREEN}✓ Web directory created${NC}"
echo ""

# Step 3: Copy files
echo -e "${YELLOW}Step 3: Copying files to web directory...${NC}"
cp -r dist/beook2pdfcom/browser/* $WEB_DIR/
chown -R www-data:www-data $WEB_DIR
echo -e "${GREEN}✓ Files copied and permissions set${NC}"
echo ""

# Step 4: Configure Nginx
echo -e "${YELLOW}Step 4: Configuring Nginx...${NC}"
if [ -f "nginx.conf" ]; then
    # Replace domain placeholder
    sed "s/yourdomain.com/$DOMAIN/g" nginx.conf > /tmp/nginx_beook2pdfcom.conf
    
    cp /tmp/nginx_beook2pdfcom.conf /etc/nginx/sites-available/$NGINX_SITE
    
    # Create symlink if it doesn't exist
    if [ ! -L "/etc/nginx/sites-enabled/$NGINX_SITE" ]; then
        ln -s /etc/nginx/sites-available/$NGINX_SITE /etc/nginx/sites-enabled/
    fi
    
    # Test Nginx configuration
    if nginx -t; then
        echo -e "${GREEN}✓ Nginx configuration is valid${NC}"
    else
        echo -e "${RED}✗ Nginx configuration test failed${NC}"
        exit 1
    fi
else
    echo -e "${RED}nginx.conf file not found!${NC}"
    exit 1
fi
echo ""

# Step 5: Reload Nginx
echo -e "${YELLOW}Step 5: Reloading Nginx...${NC}"
systemctl reload nginx
echo -e "${GREEN}✓ Nginx reloaded${NC}"
echo ""

# Step 6: SSL Certificate reminder
echo -e "${YELLOW}Step 6: SSL Certificate Setup${NC}"
echo "Don't forget to set up SSL certificate with Let's Encrypt:"
echo -e "${GREEN}sudo certbot --nginx -d $DOMAIN -d www.$DOMAIN${NC}"
echo ""

echo -e "${GREEN}=========================================="
echo "Deployment completed successfully!"
echo "==========================================${NC}"
echo ""
echo "Next steps:"
echo "1. Update DNS records to point to this server"
echo "2. Run: sudo certbot --nginx -d $DOMAIN -d www.$DOMAIN"
echo "3. Visit: http://$DOMAIN (or https:// after SSL setup)"
echo ""

