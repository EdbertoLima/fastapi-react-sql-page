# SSL Certificates for HTTPS

This directory contains SSL certificates for enabling HTTPS in development.

## Quick Start

Generate self-signed certificates for development:

```bash
cd nginx/certs
python generate_cert.py
```

Or using Python 3:
```bash
cd nginx/certs
python3 generate_cert.py
```

**Requirements:** The `cryptography` Python package
```bash
pip install cryptography
```

## What This Does

The script generates:
- `selfsigned.crt` - SSL certificate (valid for 365 days)
- `selfsigned.key` - Private key

These files are automatically ignored by git (see `.gitignore`).

## Using HTTPS

After generating certificates and starting the services:

- **HTTPS (recommended):** `https://localhost:8443/`
- **HTTP (redirects to HTTPS):** `http://localhost:8000/`

Your browser will show a security warning because this is a self-signed certificate. Click "Advanced" and "Accept the Risk" to proceed.

## Production

⚠️ **Important:** Self-signed certificates are for development only!

For production, use:
- [Let's Encrypt](https://letsencrypt.org/) (free, automated)
- Commercial Certificate Authority
- Cloud provider's certificate service (AWS ACM, GCP, etc.)

Replace `selfsigned.crt` and `selfsigned.key` with your production certificates.
