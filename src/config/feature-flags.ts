export const featureFlags = {
  auth: true,
  shell: true,
  dashboard: true,
  clients: false,
  vendors: false,
  services: false,
  os: false,
  products: false,
  orders: false,
  finance: {
    ar: false, // accounts receivable
    ap: false, // accounts payable
    cash: false,
  },
} as const

export type FeatureFlag = keyof typeof featureFlags
