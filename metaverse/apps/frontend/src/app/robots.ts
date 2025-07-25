import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/dashboard',
          '/signin',
          '/signup',
          '/space/',
          '/admin',
          '/api/',
        ],
      },
    ],
    sitemap: 'https://orbitone.cloud/sitemap.xml',
  }
} 