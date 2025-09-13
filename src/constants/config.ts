export const CONFIG = {
  USE_MOCKS: process.env.NEXT_PUBLIC_USE_MOCKS === 'true' || process.env.NODE_ENV === 'development',
  MOCK_DELAY: 1000,
};