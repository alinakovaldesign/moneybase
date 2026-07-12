import type { Meta, StoryObj } from '@storybook/react-vite';
import { Flag } from './Flag';
import { Chip } from './Chip';
import { ConsentCheckbox } from './ConsentCheckbox';
import { CircleAction } from './CircleAction';
import { Skeleton } from './Skeleton';
import { TextField } from './TextField';
import { useState } from 'react';

const meta = {
  title: 'Design System/Flow Components',
  parameters: { layout: 'padded' },
} satisfies Meta;
export default meta;

const PlusIcon = (
  <svg width="20" height="20" viewBox="0 0 18 18">
    <path d="M9 2v14M2 9h14" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
  </svg>
);

export const CurrencyChips: StoryObj = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
      <Chip badge="BASE"><Flag code="EUR" /> EUR</Chip>
      <Chip><Flag code="USD" /> USD</Chip>
      <Chip><Flag code="GBP" /> GBP</Chip>
      <Chip variant="dashed">+ Add currency</Chip>
    </div>
  ),
};

export const TextFieldStates: StoryObj = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', maxWidth: 'var(--layout-content-max)' }}>
      <TextField label="Wallet name" defaultValue="Operating — EUR" helper="Balances and reports default to this currency." />
      <TextField
        label="Wallet name"
        defaultValue="Operating Wallet"
        error={<>You already have a wallet called ‘Operating Wallet’. Try <button className="mb-field__suggestion">‘Operating — EUR’</button>?</>}
      />
    </div>
  ),
};

export const Consent: StoryObj = {
  render: function ConsentStory() {
    const [checked, setChecked] = useState(false);
    return (
      <div style={{ maxWidth: 'var(--layout-content-max)' }}>
        <ConsentCheckbox checked={checked} onChange={setChecked} label="I agree Moneybase may charge this card to fund Operating Wallet" />
      </div>
    );
  },
};

export const CircleActions: StoryObj = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--space-6)' }}>
      <CircleAction emphasis="primary" icon={PlusIcon} label="Add funds" />
      <CircleAction icon={PlusIcon} label="Exchange" />
      <CircleAction icon={PlusIcon} label="Details" disabled />
    </div>
  ),
};

export const Flags: StoryObj = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
      {['EUR', 'USD', 'GBP', 'CHF', 'PLN', 'AED'].map((c) => <Flag key={c} code={c} />)}
    </div>
  ),
};

export const Skeletons: StoryObj = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', maxWidth: 'var(--layout-content-max)' }}>
      <Skeleton height="var(--space-8)" />
      <Skeleton />
      <Skeleton width="60%" />
    </div>
  ),
};
