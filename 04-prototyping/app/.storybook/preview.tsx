import type { Preview, Decorator } from '@storybook/react-vite'
import { useEffect } from 'react'
import '../src/design-system/generated/tokens.css'
import '../src/index.css'

// Platform-theme toolbar (WALLET-001): wired to the same [data-platform]
// mechanism the app's PlatformProvider uses — stories render through the
// identical token override blocks generated from tokens.seed.json.
const withPlatform: Decorator = (Story, context) => {
  const platform = (context.globals.platform as string) ?? 'ios'
  useEffect(() => {
    document.documentElement.setAttribute('data-platform', platform)
  }, [platform])
  return <Story />
}

const preview: Preview = {
  decorators: [withPlatform],
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
