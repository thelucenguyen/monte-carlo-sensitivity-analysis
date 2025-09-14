import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Monte Carlo Sensitivity Analysis | Data Science Portfolio',
  description: 'Interactive demonstration of Monte Carlo approach to sensitivity analysis for multi-criteria decision making in engineering and operations research.',
  keywords: ['Monte Carlo', 'sensitivity analysis', 'data science', 'operations research', 'multi-criteria decision making'],
  authors: [{ name: 'Lucille E. Nguyen' }],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
