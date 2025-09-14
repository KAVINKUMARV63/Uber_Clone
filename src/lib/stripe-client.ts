// Client-side Stripe config: publishable key and appearance options

export const stripeConfig = {
  publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
  appearance: {
    theme: 'stripe' as const,
    variables: {
      colorPrimary: '#3b82f6',
      colorBackground: '#ffffff',
      colorText: '#1f2937',
      fontFamily: 'Inter, system-ui, sans-serif',
      borderRadius: '8px',
    },
  },
  clientSecret: '', // To be set dynamically on client-side
}
