#!/usr/bin/env python3
"""
Generate self-signed SSL certificates for development use.
For production, use Let's Encrypt or another Certificate Authority.
"""
from cryptography import x509
from cryptography.x509.oid import NameOID
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.asymmetric import rsa
from cryptography.hazmat.primitives import serialization
import datetime

# Generate private key
private_key = rsa.generate_private_key(
    public_exponent=65537,
    key_size=2048,
)

# Generate certificate
subject = issuer = x509.Name([
    x509.NameAttribute(NameOID.COUNTRY_NAME, "US"),
    x509.NameAttribute(NameOID.STATE_OR_PROVINCE_NAME, "State"),
    x509.NameAttribute(NameOID.LOCALITY_NAME, "City"),
    x509.NameAttribute(NameOID.ORGANIZATION_NAME, "Organization"),
    x509.NameAttribute(NameOID.COMMON_NAME, "localhost"),
])

cert = x509.CertificateBuilder().subject_name(
    subject
).issuer_name(
    issuer
).public_key(
    private_key.public_key()
).serial_number(
    x509.random_serial_number()
).not_valid_before(
    datetime.datetime.now(datetime.UTC)
).not_valid_after(
    datetime.datetime.now(datetime.UTC) + datetime.timedelta(days=365)
).add_extension(
    x509.SubjectAlternativeName([
        x509.DNSName("localhost"),
        x509.DNSName("*.localhost"),
    ]),
    critical=False,
).sign(private_key, hashes.SHA256())

# Write private key
with open("selfsigned.key", "wb") as f:
    f.write(private_key.private_bytes(
        encoding=serialization.Encoding.PEM,
        format=serialization.PrivateFormat.TraditionalOpenSSL,
        encryption_algorithm=serialization.NoEncryption()
    ))

# Write certificate
with open("selfsigned.crt", "wb") as f:
    f.write(cert.public_bytes(serialization.Encoding.PEM))

print("✓ Certificate generated successfully!")
print("  - selfsigned.crt")
print("  - selfsigned.key")
print("\nNote: This is a self-signed certificate for development use only.")
print("For production, use Let's Encrypt or another Certificate Authority.")
