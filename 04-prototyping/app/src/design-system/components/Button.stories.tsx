import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';

const meta = {
  title: 'Design System/Button',
  component: Button,
  parameters: { layout: 'centered' },
  args: { children: 'Continue' },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = { args: { variant: 'primary' } };

/** Amber is reserved for ONE conversion moment per journey (DDR-002). */
export const Accent: Story = { args: { variant: 'accent', children: 'New wallet' } };

/** Equal-citizenship alternative action — e.g. Decline on the consent screen. */
export const Secondary: Story = { args: { variant: 'secondary', children: 'Decline' } };

/** Wizard CTAs disable until the step is valid (never hidden). */
export const Disabled: Story = { args: { disabled: true } };

/** Async money actions show inline progress — no optimistic UI. */
export const Loading: Story = { args: { loading: true, children: 'Linking card…' } };

export const FullWidth: Story = {
  args: { fullWidth: true },
  parameters: { layout: 'padded' },
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', width: '320px' }}>
      <Button variant="primary" fullWidth>Continue</Button>
      <Button variant="accent" fullWidth>New wallet</Button>
      <Button variant="secondary" fullWidth>Decline</Button>
      <Button variant="primary" fullWidth disabled>Continue</Button>
      <Button variant="primary" fullWidth loading>Linking card…</Button>
    </div>
  ),
};
