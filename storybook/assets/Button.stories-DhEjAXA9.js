import{i as e}from"./preload-helper-BdFrVu1K.js";import{t}from"./iframe-Q_ScZxU5.js";var n=e((()=>{}));function r({variant:e=`primary`,fullWidth:t,loading:n,disabled:r,children:a,...o}){return(0,i.jsxs)(`button`,{className:`mb-button`,"data-variant":e,"data-full-width":t||void 0,"data-loading":n||void 0,disabled:r||n,...o,children:[n&&(0,i.jsx)(`span`,{className:`mb-button__spinner`,"aria-hidden":`true`}),(0,i.jsx)(`span`,{className:`mb-button__label`,children:a})]})}var i,a=e((()=>{n(),i=t(),r.__docgenInfo={description:`Design-system Button. Consumes semantic tokens only; platform divergence
(radius, height, motion) arrives via [data-platform] CSS overrides.
Variants map to the locked direction (DDR-002):
 - primary: blue, the default flow action
 - accent: amber, ONE conversion moment per journey (DDR-002 scarcity rule)
 - secondary: tinted, equal-citizenship alternatives (e.g. consent Decline)`,methods:[],displayName:`Button`,props:{variant:{required:!1,tsType:{name:`union`,raw:`'primary' | 'accent' | 'secondary'`,elements:[{name:`literal`,value:`'primary'`},{name:`literal`,value:`'accent'`},{name:`literal`,value:`'secondary'`}]},description:``,defaultValue:{value:`'primary'`,computed:!1}},fullWidth:{required:!1,tsType:{name:`boolean`},description:``},loading:{required:!1,tsType:{name:`boolean`},description:``},children:{required:!0,tsType:{name:`ReactNode`},description:``}},composes:[`ButtonHTMLAttributes`]}})),o,s,c,l,u,d,f,p,m,h;e((()=>{a(),o=t(),s={title:`Design System/Button`,component:r,parameters:{layout:`centered`},args:{children:`Continue`}},c={args:{variant:`primary`}},l={args:{variant:`accent`,children:`New wallet`}},u={args:{variant:`secondary`,children:`Decline`}},d={args:{disabled:!0}},f={args:{loading:!0,children:`Linking card…`}},p={args:{fullWidth:!0},parameters:{layout:`padded`}},m={render:()=>(0,o.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`var(--space-3)`,width:`320px`},children:[(0,o.jsx)(r,{variant:`primary`,fullWidth:!0,children:`Continue`}),(0,o.jsx)(r,{variant:`accent`,fullWidth:!0,children:`New wallet`}),(0,o.jsx)(r,{variant:`secondary`,fullWidth:!0,children:`Decline`}),(0,o.jsx)(r,{variant:`primary`,fullWidth:!0,disabled:!0,children:`Continue`}),(0,o.jsx)(r,{variant:`primary`,fullWidth:!0,loading:!0,children:`Linking card…`})]})},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'primary'
  }
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'accent',
    children: 'New wallet'
  }
}`,...l.parameters?.docs?.source},description:{story:`Amber is reserved for ONE conversion moment per journey (DDR-002).`,...l.parameters?.docs?.description}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'secondary',
    children: 'Decline'
  }
}`,...u.parameters?.docs?.source},description:{story:`Equal-citizenship alternative action — e.g. Decline on the consent screen.`,...u.parameters?.docs?.description}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    disabled: true
  }
}`,...d.parameters?.docs?.source},description:{story:`Wizard CTAs disable until the step is valid (never hidden).`,...d.parameters?.docs?.description}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    loading: true,
    children: 'Linking card…'
  }
}`,...f.parameters?.docs?.source},description:{story:`Async money actions show inline progress — no optimistic UI.`,...f.parameters?.docs?.description}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    fullWidth: true
  },
  parameters: {
    layout: 'padded'
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-3)',
    width: '320px'
  }}>
      <Button variant="primary" fullWidth>Continue</Button>
      <Button variant="accent" fullWidth>New wallet</Button>
      <Button variant="secondary" fullWidth>Decline</Button>
      <Button variant="primary" fullWidth disabled>Continue</Button>
      <Button variant="primary" fullWidth loading>Linking card…</Button>
    </div>
}`,...m.parameters?.docs?.source}}},h=[`Primary`,`Accent`,`Secondary`,`Disabled`,`Loading`,`FullWidth`,`AllStates`]}))();export{l as Accent,m as AllStates,d as Disabled,p as FullWidth,f as Loading,c as Primary,u as Secondary,h as __namedExportsOrder,s as default};