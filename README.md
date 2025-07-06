[![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/smoketurner/sam-cdn/master/LICENSE)
[![build status](https://github.com/smoketurner/sam-cdn/workflows/Node%20CI/badge.svg)](https://github.com/smoketurner/sam-cdn/actions?query=workflow%3A%22Node+CI%22)
[![Launch Stack](https://s3.amazonaws.com/cloudformation-examples/cloudformation-launch-stack.png)](https://console.aws.amazon.com/lambda/home?#/create/app?applicationId=arn:aws:serverlessrepo:us-east-1:860114833029:applications/cloudfront-cdn)

A project that deploys a content delivery network (CDN) using AWS CloudFront for static assets hosted in a private S3 bucket.

This project creates the following resources:

- `AWS::CertificateManager::Certificate` - `*.<domain>` SSL certificate
- `AWS::CloudFront::Distribution` - `[http|https]://<domain>` distribution
- `AWS::CloudFront::Distribution` - `[http|https]://www.<domain>` redirect distribution
- `AWS::CloudFront::CloudFrontOriginAccessIdentity`
- `AWS::Route53::RecordSet` - `<domain>` IPv4 DNS entry
- `AWS::Route53::RecordSet` - `<domain>` IPv6 DNS entry
- `AWS::Route53::RecordSet` - `<domain>` HTTPS DNS entry
- `AWS::Route53::RecordSet` - `www.<domain>` IPv4 DNS entry
- `AWS::Route53::RecordSet` - `www.<domain>` IPv6 DNS entry
- `AWS::Route53::RecordSet` - `www.<domain>` HTTPS DNS entry
- `AWS::S3::Bucket` - private access log bucket
- `AWS::S3::Bucket` - private static asset bucket
- `AWS::S3::Bucket` - private bucket to redirect requests to `https://<domain>`
- `AWS::S3::BucketPolicy` - only allow CloudFront to access static asset bucket
- `AWS::CloudFront::Function` - CloudFront Function for single page applications to redirect requests to `/index.html`
- `AWS::CloudFront::Function` - CloudFront Function to add various web security HTTP response headers

## Installation

```
git clone https://github.com/smoketurner/sam-cdn.git
cd sam-cdn
npm install
```

## Deploy

```
npm run build
npm run deploy
```

You can upload your static assets into the S3 bucket and Route53 and CloudFront will take care of any redirections and content serving for you.

## HTTPS DNS Records

This project now supports HTTPS DNS records (Type 65) for CloudFront distributions with custom domain names. HTTPS DNS records provide the following benefits:

- **Improved Performance**: Reduces connection setup time by eliminating the need for separate DNS lookups and connection upgrades
- **Enhanced Security**: Provides secure connection information directly through DNS
- **Optimized Connection Setup**: Clients can obtain connection information (including HTTPS parameters) in a single DNS lookup

HTTPS DNS records are automatically configured for both the main domain and any redirect subdomains when you provide a custom domain name.

## References

- https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/example-function-add-index.html
- https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/example-function-add-security-headers.html
- https://www.awsadvent.com/2018/12/03/vanquishing-cors-with-cloudfront-and-lambdaedge/
- https://medium.com/faun/hardening-the-http-security-headers-with-aws-lambda-edge-and-cloudfront-2e2da1ae4d83
- https://aws.amazon.com/blogs/networking-and-content-delivery/boost-application-performance-amazon-cloudfront-enables-https-record/
