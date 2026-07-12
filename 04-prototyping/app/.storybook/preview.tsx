import type { Preview } from '@storybook/react-vite'

const preview: Preview = {
  // Platform-theme toolbar: placeholder until WALLET-001 lands the token layer
  // and PlatformProvider. Every design-system component must render clean in
  // all three platform themes (iOS/HIG, Android/M3, web).
  globalTypes: {
    platform: {
      description: 'Platform theme (iOS / Android / web)',
      toolbar: {
        title: 'Platform',
        icon: 'mobile',
        items: [
          { value: 'ios', title: 'iOS (HIG)' },
          { value: 'android', title: 'Android (M3)' },
          { value: 'web', title: 'Web' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    platform: 'ios',
  },
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo'
    }
  },
};

export default preview;
