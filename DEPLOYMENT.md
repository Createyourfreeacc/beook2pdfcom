# Deployment Guide for Beook2PDF Website

This guide will help you deploy the Beook2PDF Angular website on Linux Mint with Nginx and Let's Encrypt SSL certificates.

## Prerequisites

- Linux Mint (or any Debian/Ubuntu-based distribution)
- Domain name configured to point to your server's IP address
- Root or sudo access
- Node.js 18+ installed
- Nginx installed

## Step 1: Install Required Software

### Install Node.js (if not already installed)

```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### Install Nginx

```bash
sudo apt-get update
sudo apt-get install -y nginx
```

### Install Certbot (for Let's Encrypt)

```bash
sudo apt-get install -y certbot python3-certbot-nginx
```

## Step 2: Build the Angular Application

```bash
# Navigate to project directory
cd /path/to/beook2pdfcom

# Install dependencies
npm install

# Build for production
npm run build

# The build output will be in dist/beook2pdfcom/browser/
```

## Step 3: Configure Nginx

1. Copy the nginx configuration file:

```bash
sudo cp nginx.conf /etc/nginx/sites-available/beook2pdfcom
```

2. Edit the configuration file and replace `yourdomain.com` with your actual domain:

```bash
sudo nano /etc/nginx/sites-available/beook2pdfcom
```

Replace:
- `yourdomain.com` with your actual domain name
- Update SSL certificate paths if needed

3. Create a symbolic link to enable the site:

```bash
sudo ln -s /etc/nginx/sites-available/beook2pdfcom /etc/nginx/sites-enabled/
```

4. Remove the default Nginx site (optional):

```bash
sudo rm /etc/nginx/sites-enabled/default
```

5. Test Nginx configuration:

```bash
sudo nginx -t
```

6. Create the web directory and copy files:

```bash
sudo mkdir -p /var/www/beook2pdfcom
sudo cp -r dist/beook2pdfcom/browser/* /var/www/beook2pdfcom/
sudo chown -R www-data:www-data /var/www/beook2pdfcom
```

## Step 4: Configure DNS

Make sure your domain's A record points to your server's IP address:

```
Type: A
Name: @ (or yourdomain.com)
Value: YOUR_SERVER_IP
TTL: 3600
```

Also configure www subdomain:

```
Type: A
Name: www
Value: YOUR_SERVER_IP
TTL: 3600
```

## Step 5: Obtain SSL Certificate with Let's Encrypt

### Option A: Using Certbot with Nginx plugin (Recommended)

```bash
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

Follow the prompts:
- Enter your email address
- Agree to terms of service
- Choose whether to redirect HTTP to HTTPS (recommended: Yes)

### Option B: Manual Certificate Installation

If you need to manually configure certificates:

```bash
sudo certbot certonly --standalone -d yourdomain.com -d www.yourdomain.com
```

Then update the nginx.conf file with the correct certificate paths.

## Step 6: Start and Enable Services

```bash
# Start Nginx
sudo systemctl start nginx

# Enable Nginx to start on boot
sudo systemctl enable nginx

# Check Nginx status
sudo systemctl status nginx
```

## Step 7: Configure Firewall

If you have a firewall enabled, allow HTTP and HTTPS:

```bash
sudo ufw allow 'Nginx Full'
# Or individually:
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
```

## Step 8: Verify Deployment

1. Open your browser and navigate to `https://yourdomain.com`
2. Verify SSL certificate is working (padlock icon in browser)
3. Test all pages and navigation

## Step 9: Set Up Auto-Renewal for SSL Certificates

Let's Encrypt certificates expire after 90 days. Set up automatic renewal:

```bash
# Test renewal
sudo certbot renew --dry-run

# Certbot automatically sets up a systemd timer, but verify it:
sudo systemctl status certbot.timer
```

## Updating the Website

When you need to update the website:

```bash
# Navigate to project directory
cd /path/to/beook2pdfcom

# Pull latest changes (if using git)
git pull

# Install any new dependencies
npm install

# Rebuild the application
npm run build

# Copy new files to web directory
sudo cp -r dist/beook2pdfcom/browser/* /var/www/beook2pdfcom/

# Reload Nginx (no downtime)
sudo systemctl reload nginx
```

## Troubleshooting

### Check Nginx Error Logs

```bash
sudo tail -f /var/log/nginx/beook2pdfcom_error.log
```

### Check Nginx Access Logs

```bash
sudo tail -f /var/log/nginx/beook2pdfcom_access.log
```

### Verify SSL Certificate

```bash
sudo certbot certificates
```

### Test Nginx Configuration

```bash
sudo nginx -t
```

### Restart Nginx

```bash
sudo systemctl restart nginx
```

## Security Recommendations

1. **Keep software updated:**
   ```bash
   sudo apt-get update && sudo apt-get upgrade
   ```

2. **Configure fail2ban** (optional but recommended):
   ```bash
   sudo apt-get install fail2ban
   ```

3. **Regular backups** of your website files and configuration

4. **Monitor logs** regularly for suspicious activity

## Additional Configuration

### Custom Error Pages

You can create custom error pages by adding to nginx.conf:

```nginx
error_page 404 /404.html;
error_page 500 502 503 504 /50x.html;
```

### Rate Limiting

Add rate limiting to prevent abuse:

```nginx
limit_req_zone $binary_remote_addr zone=one:10m rate=10r/s;

server {
    ...
    limit_req zone=one burst=20;
    ...
}
```

## Support

For issues related to:
- **Angular application**: Check the project's GitHub repository
- **Nginx configuration**: Consult Nginx documentation
- **SSL certificates**: Check Certbot documentation

## License

This deployment guide is provided as-is. Please ensure you comply with all applicable laws and regulations when deploying this website.

