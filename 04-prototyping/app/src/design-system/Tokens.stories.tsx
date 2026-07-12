import type { Meta, StoryObj } from '@storybook/react-vite';

/**
 * Living token documentation — reads the CSS custom properties at render time,
 * so this page always reflects tokens.seed.json via the generator (never a copy).
 */
const meta = {
  title: 'Design System/Tokens',
  parameters: { layout: 'padded' },
} satisfies Meta;

export default meta;

const SEMANTIC_COLOR_TOKENS = [
  'surface-page', 'surface-sheet', 'surface-raised', 'surface-tint', 'surface-chip', 'surface-disabled', 'surface-success',
  'text-heading', 'text-primary', 'text-label', 'text-secondary', 'text-muted', 'text-disabled', 'text-link',
  'action-primary-bg', 'action-primary-bg-hover', 'action-accent-bg', 'action-accent-bg-hover', 'action-secondary-bg',
  'feedback-error', 'feedback-success', 'feedback-success-bg',
  'border-default', 'border-input', 'border-divider', 'border-dashed-accent',
];

const RADIUS_TOKENS = ['radius-input', 'radius-button', 'radius-card-sm', 'radius-card', 'radius-sheet', 'radius-checkbox'];

function read(token: string) {
  return getComputedStyle(document.documentElement).getPropertyValue(`--${token}`).trim();
}

export const Colors: StoryObj = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))', gap: 'var(--space-3)', fontFamily: 'var(--font-body)' }}>
      {SEMANTIC_COLOR_TOKENS.map((t) => (
        <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', background: 'var(--surface-raised)', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-card-sm)', padding: 'var(--space-3)' }}>
          <span style={{ width: 'var(--size-icon-chip)', height: 'var(--size-icon-chip)', borderRadius: 'var(--radius-input)', background: `var(--${t})`, border: '1px solid var(--border-default)', flexShrink: 0 }} />
          <span style={{ display: 'flex', flexDirection: 'column' }}>
            <code style={{ fontSize: 'var(--type-body-sm-size)', color: 'var(--text-primary)' }}>--{t}</code>
            <code style={{ fontSize: 'var(--type-caption-size)', color: 'var(--text-secondary)' }}>{read(t)}</code>
          </span>
        </div>
      ))}
    </div>
  ),
};

export const RadiiAndType: StoryObj = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', fontFamily: 'var(--font-body)', color: 'var(--text-primary)' }}>
      <section style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
        {RADIUS_TOKENS.map((t) => (
          <div key={t} style={{ textAlign: 'center' }}>
            <div style={{ width: 'calc(var(--space-8) * 2)', height: 'var(--size-control-h)', borderRadius: `var(--${t})`, background: 'var(--surface-tint)', border: '1px solid var(--border-default)' }} />
            <code style={{ fontSize: 'var(--type-caption-size)' }}>--{t}: {read(t)}</code>
          </div>
        ))}
      </section>
      <section style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--type-title-xl-size)', fontWeight: 800, color: 'var(--text-heading)' }}>Title XL — Nunito 800</span>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--type-title-lg-size)', fontWeight: 800, color: 'var(--text-heading)' }}>Title LG — screen titles</span>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--type-balance-size)', fontWeight: 800, color: 'var(--text-heading)' }}>
          €24,850<span style={{ fontSize: 'var(--type-balance-decimals-size)', color: 'var(--type-balance-decimals-color)', fontWeight: 700 }}>.00</span>
        </span>
        <span style={{ fontSize: 'var(--type-body-lg-size)', fontWeight: 600 }}>Body LG — buttons, inputs (Open Sans 600)</span>
        <span style={{ fontSize: 'var(--type-body-size)' }}>Body — standard text</span>
        <span style={{ fontSize: 'var(--type-body-sm-size)', color: 'var(--text-secondary)' }}>Body SM — secondary text</span>
        <span style={{ fontSize: 'var(--type-caption-size)', color: 'var(--text-secondary)' }}>Caption — helper lines</span>
      </section>
    </div>
  ),
};
