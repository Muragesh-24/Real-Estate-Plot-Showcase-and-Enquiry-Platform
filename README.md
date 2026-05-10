
#  Real estate plot showcase and enquiry platform

> A polished real estate plot showcase and enquiry platform for residential plots, layouts,
> completed projects, image galleries, location details, and customer enquiries.

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=nextdotjs)
![React](https://img.shields.io/badge/React-19-61dafb?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?style=for-the-badge&logo=typescript)
![AWS Lambda](https://img.shields.io/badge/AWS%20Lambda-Serverless-f59e0b?style=for-the-badge&logo=awslambda)
![Cloudflare Turnstile](https://img.shields.io/badge/Cloudflare-Turnstile-f38020?style=for-the-badge&logo=cloudflare)
![Amazon SES](https://img.shields.io/badge/Amazon%20SES-Email-ff9900?style=for-the-badge&logo=amazonses)
![Amazon DynamoDB](https://img.shields.io/badge/Amazon%20DynamoDB-Database-4053d6?style=for-the-badge&logo=amazondynamodb)

## Overview

This project helps visitors explore available plots and layouts, review completed and ongoing
projects, browse image galleries, and submit enquiries for site visits, pricing details, callbacks,
or general questions.

The architecture uses a lightweight serverless backend so the platform stays cost-efficient and
easy to maintain without a dedicated server.

## Highlights

- Responsive, mobile-friendly UI
- Plot and layout showcase pages
- Completed project and gallery sections
- Enquiry form with site visit, pricing, and callback options
- Cloudflare Turnstile bot protection
- DynamoDB-backed enquiry storage and rate limiting
- Amazon SES notifications for new enquiries

## Tech Stack

| Layer | Tools |
| --- | --- |
| Frontend | Next.js, React, TypeScript, Tailwind CSS |
| Backend | AWS Lambda Function URL, Amazon SES, Amazon DynamoDB |
| Security | Cloudflare Turnstile, IAM, server-side validation |

## How It Works

1. A user submits an enquiry form.
2. Cloudflare Turnstile verifies the request.
3. Next.js sends the request to the backend endpoint.
4. AWS Lambda validates the payload and checks rate limits.
5. The enquiry is saved in DynamoDB.
6. Amazon SES sends a notification email.
7. The user receives a success response.

## Security

The enquiry flow includes practical protection layers for production use:

- Turnstile token verification on the server
- DynamoDB-based rate limiting
- Restricted CORS configuration
- Server-side request validation
- IAM-scoped AWS permissions

## Data Storage

DynamoDB is used for:

- Storing valid enquiries
- Tracking rate-limit counters
- Supporting future admin dashboard features

Main tables:

```text
plot_enquiries
plot_enquiry_rate_limits
```

## Email Notifications

Amazon SES sends enquiry notifications to the site owner. Each email includes fields such as name,
phone number, selected plot or layout, preferred date, purpose, and message.

## Environment Variables

Frontend:

```bash
NEXT_PUBLIC_TURNSTILE_SITE_KEY=your_cloudflare_turnstile_site_key
NEXT_PUBLIC_ENQUIRY_API_URL=https://your-lambda-function-url.on.aws/
```

Lambda:

```bash
AWS_REGION=your_aws_region
ALLOWED_ORIGIN=https://your-domain.com
TURNSTILE_SECRET_KEY=your_cloudflare_turnstile_secret_key
SES_FROM_EMAIL=your_verified_email@example.com
OWNER_EMAIL=owner_email@example.com
ENQUIRIES_TABLE=plot_enquiries
RATE_LIMIT_TABLE=plot_enquiry_rate_limits
```

## Local Development

The app lives in the `frontend/` folder.

```bash
cd frontend
npm install
npm run dev
```

Open:

```text
http://localhost:3000
```

Useful scripts:

```bash
npm run build
npm run start
npm run lint
```


## Current Status

- Responsive frontend
- Plot and layout showcase
- Image gallery
- Enquiry form
- Cloudflare Turnstile integration
- AWS Lambda backend
- Amazon SES notifications
- DynamoDB enquiry storage
- DynamoDB rate limiting

## Future Improvements

- Admin dashboard for enquiries
- Enquiry status tracking
- Filters by date, layout, and purpose
- CSV export
- Professional domain email setup
- Analytics for layout and page interest
- adding more security layers

## Why Serverless

This project uses a serverless backend because enquiry-driven real estate sites usually have low to
medium traffic.

- No always-on server
- Lower operating cost
- Automatic scaling
- Easier maintenance
- Pay mostly per request
- Good fit for contact and enquiry forms

## Developer

Developed by **Muragesh Nyamagoud** for **C. M. Nyamagoud**.

