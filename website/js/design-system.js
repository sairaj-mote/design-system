/* ============================================================
   RanchiMall Design System &mdash; Documentation site engine
   Token data lives in tokens/tokens.json (source of truth).
   This file mirrors it for runtime rendering and demoing.
   ============================================================ */
(function () {
  'use strict';

  /* ------------------------------------------------------------
     DATA &mdash; mirrors tokens/tokens.json
  ------------------------------------------------------------ */
  const DS = {
    name: 'RanchiMall Design System',
    version: '1.0.0',
    tagline: 'A frameworkless, token-driven design system for building web products that scale.',
  };

  const tokens = window.RMDS_TOKENS;
  if (!tokens) throw new Error('Generated token runtime was not loaded. Run npm run build:design-system.');

  const components = [
    // Actions
    { name: 'Button', tag: 'sm-button', cat: 'Actions', desc: 'Primary, secondary, outline & ghost actions with built-in ripple.' },
    { name: 'Copy', tag: 'sm-copy', cat: 'Actions', desc: 'Copy-to-clipboard that supports nested content and notifications.' },
    { name: 'Theme toggle', tag: 'theme-toggle', cat: 'Actions', desc: 'Light/dark switch that respects system preference and remembers choice.' },
    // Inputs & Forms
    { name: 'Input', tag: 'sm-input', cat: 'Inputs', desc: 'Text input with validation, custom validation hooks and icons.' },
    { name: 'Textarea', tag: 'sm-textarea', cat: 'Inputs', desc: 'Content-aware textarea that auto-grows with input.' },
    { name: 'Text field', tag: 'text-field', cat: 'Inputs', desc: 'Labeled field wrapping input + messaging for consistent forms.' },
    { name: 'Checkbox', tag: 'sm-checkbox', cat: 'Inputs', desc: 'Multi-select control with custom styling.' },
    { name: 'Radio', tag: 'sm-radio', cat: 'Inputs', desc: 'Single-select group control.' },
    { name: 'Switch', tag: 'sm-switch', cat: 'Inputs', desc: 'Boolean toggle for settings and preferences.' },
    { name: 'Select', tag: 'sm-select', cat: 'Inputs', desc: 'Dropdown select with search support.' },
    { name: 'Option', tag: 'sm-option', cat: 'Inputs', parent: 'sm-select', desc: 'Option part used inside sm-select.' },
    { name: 'Strip select', tag: 'strip-select', cat: 'Inputs', desc: 'Segmented control for small option sets.' },
    { name: 'Strip option', tag: 'strip-option', cat: 'Inputs', parent: 'strip-select', desc: 'Segment part used inside strip-select.' },
    { name: 'Tags input', tag: 'tags-input', cat: 'Inputs', desc: 'Enter multiple values as removable chips.' },
    { name: 'File input', tag: 'file-input', cat: 'Inputs', desc: 'Drop-zone file picker with preview.' },
    { name: 'Form', tag: 'sm-form', cat: 'Inputs', desc: 'Wraps inputs and validates them together on submit/reset.' },
    // Navigation
    { name: 'Hamburger menu', tag: 'hamburger-menu', cat: 'Navigation', desc: 'Responsive drawer navigation for small screens.' },
    { name: 'Menu', tag: 'sm-menu', cat: 'Navigation', desc: 'Context / dropdown menus.' },
    { name: 'Menu option', tag: 'menu-option', cat: 'Navigation', parent: 'sm-menu', desc: 'Item part used inside sm-menu.' },
    { name: 'Tabs', tag: 'sm-tab-header', cat: 'Navigation', desc: 'Tab header, tab & panel system for sub-navigation.' },
    { name: 'Tab', tag: 'sm-tab', cat: 'Navigation', parent: 'sm-tab-header', desc: 'Tab part used inside the tab system.' },
    { name: 'Tab panels', tag: 'sm-tab-panels', cat: 'Navigation', parent: 'sm-tab-header', desc: 'Panel part paired with tab headers.' },
    // Feedback
    { name: 'Notifications', tag: 'sm-notifications', cat: 'Feedback', desc: 'Toast drawer with icons, sounds, pinning and stacking.' },
    { name: 'Popup', tag: 'sm-popup', cat: 'Feedback', desc: 'Modal dialog that stacks and supports pinning.' },
    { name: 'Spinner', tag: 'sm-spinner', cat: 'Feedback', desc: 'Loading indicator with adjustable size and color.' },
    // Media & layout
    { name: 'Carousel', tag: 'sm-carousel', cat: 'Media', desc: 'Responsive slideshow with navigation and indicators.' },
  ];

  const principles = [
    {
      n: '01', title: 'Design from primitives',
      body: 'Nothing is hard-coded. Every color, space, radius and motion value comes from a shared token so the whole product stays coherent and re-themable.',
    },
    {
      n: '02', title: 'Content before chrome',
      body: 'Visual decoration never competes with information. Hierarchy, readability and clear affordances come first; flourish comes a distant second.',
    },
    {
      n: '03', title: 'Accessibility is a feature',
      body: 'AA contrast, full keyboard support, visible focus and reduced-motion support are treated as acceptance criteria, not afterthoughts.',
    },
    {
      n: '04', title: 'Frameworkless by choice',
      body: 'We build native Web Components. They work in any stack &mdash; React, Vue, vanilla, or none &mdash; with encapsulated style and behaviour.',
    },
    {
      n: '05', title: 'Mobile-first, adaptive',
      body: 'Every layout starts on a small screen and adapts up. One system, every breakpoint, no second mobile codebase.',
    },
    {
      n: '06', title: 'Consistency through tokens',
      body: 'Change one token and the change ripples through every component. That is what makes the system maintainable at product scale.',
    },
  ];

  const guidelines = [
    {
      category: 'Voice & tone',
      dos: ['Write like a human, not a robot.', 'Use plain language your users already understand.', 'Keep error messages actionable &mdash; say what happened and how to fix it.'],
      donts: ['Use jargon, acronyms or internal slang.', 'Blame the user ("You entered an invalid&hellip;").', 'Shout with ALL CAPS or excessive exclamation marks.'],
    },
    {
      category: 'Color',
      dos: ['Use tokens, never raw hex values, in product code.', 'Reserve brand accents for interactive and highlight states.', 'Keep semantic colors (success/warning/danger) semantically consistent.'],
      donts: ['Introduce new colors outside the palette.', 'Use red for success or green for errors.', 'Rely on color alone to convey meaning.'],
    },
    {
      category: 'Typography',
      dos: ['Use the type scale; don&rsquo;t invent font sizes.', 'Cap body copy at ~65 characters per line.', 'Use Roboto Mono for numbers and code so digits align.'],
      donts: ['Stack more than two font families on a screen.', 'Use low-contrast grey text for body copy.', 'Underline non-link text or use italics for emphasis.'],
    },
    {
      category: 'Components',
      dos: ['Prefer an existing component over a one-off.', 'Compose &mdash; build patterns from components.', 'Use sm-form for anything with more than one input.'],
      donts: ['Fork a component for a one-off tweak.', 'Put links inside buttons or buttons inside links.', 'Disable buttons silently &mdash; explain why instead.'],
    },
    {
      category: 'Content & data',
      dos: ['Show empty states that guide the next action.', 'Format dates, times and amounts with our formatters.', 'Label everything &mdash; inputs, sections, icon-only buttons.'],
      donts: ['Show raw timestamps like 1699613000.', 'Leave destructive actions without confirmation.', 'Hide content behind vague labels like "More".'],
    },
  ];

  const patterns = [
    { name: 'Forms', desc: 'Labels + inputs + inline validation + submit. Always wrapped in sm-form so validation is consistent.', built: ['sm-form', 'sm-input', 'text-field', 'sm-button'] },
    { name: 'Navigation', desc: 'Sidebar on desktop, hamburger on mobile, tabs for sub-sections, bottom bar for &le;5 primary pages.', built: ['hamburger-menu', 'sm-menu', 'sm-tab-header', 'sm-button'] },
    { name: 'Feedback', desc: 'Transient toasts for passive updates; stacked popups for decisions; confirmation prompts for destructive actions.', built: ['sm-notifications', 'sm-popup', 'sm-spinner'] },
    { name: 'Loading', desc: 'Skeletons or spinners on demand; the LazyLoader utility handles long lists with progressive rendering.', built: ['sm-spinner', 'LazyLoader utility'] },
    { name: 'Empty states', desc: 'Every list gets a purpose-built empty state that explains why it is empty and what to do next.', built: ['sm-button', 'text-field'] },
    { name: 'Copy & share', desc: 'One-tap copy with confirmation feedback, used for hashes, addresses and shareable links.', built: ['sm-copy', 'sm-notifications'] },
  ];

  const specs = [
    {
      name: 'Button',
      tag: 'sm-button',
      cat: 'Actions',
      status: 'Stable',
      summary: 'Triggers an action or event. The workhorse of the system &mdash; every call-to-action, submit and destructive action is a button.',
      demo: `<div class="demo__row">
        <sm-button>Default</sm-button>
        <sm-button variant="primary">Primary</sm-button>
        <sm-button variant="outlined">Outlined</sm-button>
        <sm-button variant="no-outline">No outline</sm-button>
        <sm-button disabled>Disabled</sm-button>
      </div>`,
      anatomy: [
        { label: 'Container', note: 'Token-driven background, border-radius and padding.' },
        { label: 'Label', note: 'Short, action-first text that describes what will happen.' },
        { label: 'Ripple', note: 'Built-in click/touch feedback layer; decorative, respects reduced motion.' },
      ],
      variants: [
        { name: 'Default', html: '<sm-button>Default</sm-button>' },
        { name: 'Primary', html: '<sm-button variant="primary">Primary</sm-button>' },
        { name: 'Outlined', html: '<sm-button variant="outlined">Outlined</sm-button>' },
        { name: 'No outline', html: '<sm-button variant="no-outline">No outline</sm-button>' },
      ],
      states: [
        { name: 'Enabled', html: '<sm-button>Enabled</sm-button>' },
        { name: 'Disabled', html: '<sm-button disabled>Disabled</sm-button>' },
        { name: 'Hover / Focus', html: '<sm-button variant="primary">Hover me</sm-button>', note: 'Hover darkens; :focus-visible shows a clear ring; click plays a ripple.' },
      ],
      api: [
        { attr: 'variant', type: 'string', values: 'primary &middot; outlined &middot; no-outline', desc: 'Styled variation of the base button. Primary is reserved for the main action on a view.' },
        { attr: 'disabled', type: 'boolean', values: '&mdash;', desc: 'Disables all interaction and dims the button. Prefer explaining why over silently disabling.' },
        { attr: 'type', type: 'string', values: 'submit &middot; reset', desc: 'Only meaningful inside sm-form: submits or resets the surrounding form.' },
        { attr: 'click', type: 'event', values: '&mdash;', desc: 'Buttons accept a standard click handler for actions.' },
      ],
      tokens: [
        { var: '--background', default: 'rgba(var(--text-color), 0.1)', desc: 'Background colour of the button.' },
        { var: '--padding', default: '0.6rem 1.2rem', desc: 'Internal spacing around the label text.' },
        { var: '--border-radius', default: '0.3rem', desc: 'Corner curvature of the button container.' },
      ],
      a11y: [
        'Keyboard: Enter and Space activate the button.',
        'A visible :focus-visible outline ships by default.',
        'The ripple is decorative and disabled under prefers-reduced-motion.',
        'Icon-only buttons require an accessible label or tooltip.',
      ],
      usage: {
        dos: ['Use one primary button per view for the main action.', 'Start labels with a verb ("Save", "Delete", "Send").', 'Use the danger styling for destructive actions.'],
        donts: ['Stack multiple primary buttons in the same area.', 'Wrap a button inside a link (or vice-versa).', 'Disable a button without explaining why.'],
      },
    },
    {
      name: 'Input',
      tag: 'sm-input',
      cat: 'Inputs',
      status: 'Stable',
      summary: 'A text field with built-in validation, animated placeholders and custom validation hooks. The core of every form.',
      demo: `<div class="demo__row" style="flex-direction:column;align-items:flex-start;">
        <sm-input placeholder="Your email" type="email" animate></sm-input>
        <sm-input placeholder="Full name" variant="outlined" animate></sm-input>
      </div>`,
      anatomy: [
        { label: 'Field', note: 'Token-driven background, border-radius, padding and width.' },
        { label: 'Label / placeholder', note: 'With animate, the placeholder floats above the value instead of vanishing.' },
        { label: 'Icon', note: 'Optional leading icon inside the field (e.g. search).' },
        { label: 'Error text', note: 'error-text is revealed when validation fails and is announced to screen readers.' },
      ],
      variants: [
        { name: 'Filled (default)', html: '<sm-input placeholder="Filled field" animate></sm-input>' },
        { name: 'Outlined', html: '<sm-input placeholder="Outlined field" variant="outlined" animate></sm-input>' },
      ],
      states: [
        { name: 'Default', html: '<sm-input placeholder="Default" animate></sm-input>' },
        { name: 'Focused', html: '<sm-input placeholder="Focus me" animate></sm-input>', note: 'Focus shows a clear accent ring.' },
        { name: 'Error', html: '<sm-input placeholder="Email" type="email" required error-text="Please enter a valid email" animate></sm-input>', note: 'Error text appears when validation fails.' },
      ],
      api: [
        { attr: 'variant', type: 'string', values: 'outlined', desc: 'Only styled variation. Default is the filled input.' },
        { attr: 'animate', type: 'boolean', values: '&mdash;', desc: 'Animates the placeholder above the entered text instead of hiding it.' },
        { attr: 'error-text', type: 'string', values: '&mdash;', desc: 'Message shown when validation fails.' },
        { attr: 'type / placeholder / required / disabled / readonly / value', type: 'native', values: 'all native input attributes', desc: 'All standard HTML input attributes work as expected.' },
        { attr: 'focusIn()', type: 'method', values: '&mdash;', desc: 'Use instead of focus() to focus the component.' },
        { attr: 'customValidation', type: 'setter', values: 'fn &rarr; Boolean', desc: 'Set a function to run custom validation on the value.' },
      ],
      tokens: [
        { var: '--background', default: 'rgba(var(--text-color), 0.06)', desc: 'Background colour behind the input text.' },
        { var: '--padding', default: '0.7rem 1rem', desc: 'Internal padding of the input field.' },
        { var: '--border-radius', default: '0.3rem', desc: 'Corner curvature.' },
        { var: '--icon-gap', default: '0.5rem', desc: 'Space between a leading icon and the text field.' },
        { var: '--font-size', default: '1rem', desc: 'Size of the input text.' },
        { var: '--width', default: '100%', desc: 'Width of the input element.' },
      ],
      a11y: [
        'Always provide a label or an animated placeholder that persists.',
        'error-text is announced when validation fails.',
        'Focus is clearly visible via the accent focus ring.',
        'Use the correct type (email, password, number) so keyboards and password managers behave.',
      ],
      usage: {
        dos: ['Pair inputs with sm-form so validation is consistent.', 'Use appropriate types and input modes.', 'Show error-text next to the failing field.'],
        donts: ['Rely on placeholder as the only label.', 'Block submission with confusing validation.', 'Use text inputs for values better handled by select or pickers.'],
      },
    },
    {
      name: 'Select',
      tag: 'sm-select',
      cat: 'Inputs',
      status: 'Stable',
      summary: 'A dropdown for choosing one value from a list. Markup is identical to the native select, so it is instantly familiar.',
      demo: `<sm-select>
        <sm-option value="1">Option one</sm-option>
        <sm-option value="2">Option two</sm-option>
        <sm-option value="3">Option three</sm-option>
      </sm-select>`,
      anatomy: [
        { label: 'Field', note: 'Closed state showing the current value.' },
        { label: 'Options list', note: 'Opens below the field; keyboard navigable.' },
        { label: 'Option', note: 'Individual selectable item, rendered with sm-option.' },
        { label: 'Current value', note: 'Read via event.target.value on change.' },
      ],
      variants: [
        { name: 'Default', html: '<sm-select><sm-option value="1">Option one</sm-option><sm-option value="2">Option two</sm-option><sm-option value="3">Option three</sm-option></sm-select>' },
      ],
      states: [
        { name: 'Enabled', html: '<sm-select><sm-option value="1">Option one</sm-option><sm-option value="2">Option two</sm-option></sm-select>' },
        { name: 'Disabled', html: '<sm-select disabled><sm-option value="1">Option one</sm-option><sm-option value="2">Option two</sm-option></sm-select>' },
      ],
      api: [
        { attr: 'disabled', type: 'boolean', values: '&mdash;', desc: 'Disables the select and all interaction.' },
        { attr: 'sm-option value', type: 'child', values: 'string', desc: 'Each option carries a value; the selected value is read on change.' },
        { attr: 'change', type: 'event', values: '&mdash;', desc: 'Fired when a different option is selected; event.target.value gives the value.' },
      ],
      a11y: [
        'Fully keyboard operable: arrow keys move, Enter/Space select.',
        'Selection state is announced to screen readers.',
        'The closed field exposes the current value.',
      ],
      tokens: [
        { var: '--background', default: 'rgba(var(--text-color), 0.06)', desc: 'Background colour of the select field.' },
        { var: '--padding', default: '0.7rem 1rem', desc: 'Internal padding of the select trigger.' },
        { var: '--border-radius', default: '0.3rem', desc: 'Corner curvature.' },
        { var: '--width', default: '100%', desc: 'Width of the select element.' },
      ],
      usage: {
        dos: ['Use for 5+ options where a list is faster than radio buttons.', 'Label the field so the purpose is clear.', 'Provide a sensible default or placeholder.'],
        donts: ['Use for 1&ndash;2 options (prefer radio or strip-select).', 'Require scrolling through very long lists without search.', 'Use a select for a value that is really free text.'],
      },
    },
    {
      name: 'Notifications',
      tag: 'sm-notifications',
      cat: 'Feedback',
      status: 'Stable',
      summary: 'Transient, stacked toast notifications for passive updates. Everything stays accessible while a toast is visible.',
      demo: `<div class="demo__row">
        <sm-button onclick="notify('Your changes were saved.', 'success')">Success</sm-button>
        <sm-button onclick="notify('Connection lost. Check your network.', 'error')">Error</sm-button>
        <sm-button onclick="getRef('notification_drawer').push('Persistent &mdash; dismiss me manually', { pinned: true })">Pinned</sm-button>
      </div>`,
      demoTarget: 'notification_drawer',
      anatomy: [
        { label: 'Panel', note: 'The drawer that stacks toasts, usually fixed at the top of the page.' },
        { label: 'Icon', note: 'Optional icon (success / error) reinforces the message.' },
        { label: 'Message', note: 'Short, actionable text of the update.' },
        { label: 'Close', note: 'Pinned toasts expose a close button for manual dismissal.' },
        { label: 'Timer', note: 'Non-pinned toasts auto-dismiss after 5 seconds.' },
      ],
      variants: [
        { name: 'Success', html: '<sm-button onclick="notify(\'Saved successfully\', \'success\')">Try it</sm-button>' },
        { name: 'Error', html: '<sm-button onclick="notify(\'Something failed\', \'error\')">Try it</sm-button>' },
        { name: 'Pinned', html: '<sm-button onclick="getRef(\'notification_drawer\').push(\'Stays until dismissed\', { pinned: true })">Try it</sm-button>' },
      ],
      states: [],
      tokens: [
        { var: '--icon-height', default: '1.5rem', desc: 'Height of the icon container.' },
        { var: '--icon-width', default: '1.5rem', desc: 'Width of the icon container.' },
        { var: '--accent-color', default: 'var(--theme-accent-color)', desc: 'Colour of the auto-dismiss progress bar.' },
      ],
      api: [
        { attr: 'push(message, options)', type: 'method', values: '&mdash;', desc: 'Shows a toast. options: icon (SVG string), pinned (boolean).' },
        { attr: 'clearAll()', type: 'method', values: '&mdash;', desc: 'Removes all visible notifications.' },
        { attr: 'icon', type: 'option', values: 'SVG string', desc: 'Custom icon rendered next to the message.' },
        { attr: 'pinned', type: 'option', values: 'true &middot; false', desc: 'If true, the toast persists until manually dismissed.' },
      ],
      a11y: [
        'Toasts are exposed via a live region so screen readers announce updates.',
        'Error toasts use assertive announcements.',
        'Pinned toasts have a dedicated close button.',
        'Never block interaction &mdash; a toast must never trap the user.',
      ],
      usage: {
        dos: ['Use for passive, non-blocking updates.', 'Keep messages short and specific.', 'Reserve error toasts for recoverable issues.'],
        donts: ['Use toasts for decisions (use a popup instead).', 'Overwhelm users with a wall of toasts.', 'Put critical, blocking errors in a toast that auto-dismisses.'],
      },
    },
    {
      name: 'Popup',
      tag: 'sm-popup',
      cat: 'Feedback',
      status: 'Stable',
      summary: 'A modal dialog for focused decisions and tasks. Popups stack, support pinning, and move focus in and out correctly.',
      demo: `<div class="demo__row" style="flex-direction:column;align-items:flex-start;">
        <sm-popup id="spec_popup_demo">
          <h3>Delete project?</h3>
          <p>This action cannot be undone. The project and all its files will be permanently removed.</p>
          <div class="flex align-center gap-1">
            <sm-button onclick="closePopup()">Cancel</sm-button>
            <sm-button variant="primary" onclick="closePopup()">Delete</sm-button>
          </div>
        </sm-popup>
        <sm-button onclick="getRef('spec_popup_demo').show()">Open popup</sm-button>
      </div>`,
      anatomy: [
        { label: 'Backdrop', note: 'Dimmed overlay behind the dialog; click closes unless pinned.' },
        { label: 'Dialog', note: 'Token-driven surface with width, radius and padding.' },
        { label: 'Header', note: 'Title of the decision or task.' },
        { label: 'Body', note: 'Supporting message and content.' },
        { label: 'Actions', note: 'Footer buttons &mdash; Cancel and the confirm action.' },
      ],
      variants: [
        { name: 'Standard', html: '<sm-button onclick="getRef(\'spec_popup_demo\').show()">Open</sm-button>' },
      ],
      states: [
        { name: 'Pinned', note: 'show({ pinned: true }) keeps the popup open until programmatically closed &mdash; used by confirmations and prompts.', html: '' },
      ],
      api: [
        { attr: 'open', type: 'boolean', values: '&mdash;', desc: 'Opens the popup on load; handy for development.' },
        { attr: 'show(options)', type: 'method', values: '&mdash;', desc: 'Opens the popup. options: pinned (boolean).' },
        { attr: 'hide()', type: 'method', values: '&mdash;', desc: 'Closes the visible popup.' },
        { attr: 'popupopened / popupclosed', type: 'event', values: '&mdash;', desc: 'Custom events; access the popup via event.detail.popup.' },
      ],
      tokens: [
        { var: '--width', default: '100% / 32rem (desktop)', desc: 'Width of the dialog box.' },
        { var: '--height', default: 'auto', desc: 'Height of the dialog box.' },
        { var: '--min-width', default: 'auto', desc: 'Minimum width of the dialog box.' },
        { var: '--min-height', default: 'auto', desc: 'Minimum height of the dialog box.' },
        { var: '--border-radius', default: '0.8rem 0 0 0 / 0.5rem (desktop)', desc: 'Corner curvature.' },
        { var: '--body-padding', default: '1.5rem', desc: 'Padding inside the dialog body.' },
        { var: '--backdrop-background', default: 'rgba(0, 0, 0, 0.6)', desc: 'Colour of the dimmed backdrop overlay.' },
      ],
      a11y: [
        'Focus moves into the dialog on open and is restored on close.',
        'Escape closes the top popup in the stack.',
        'Backdrop click closes unless the popup is pinned.',
        'Popups are announced as modal dialogs to screen readers.',
      ],
      usage: {
        dos: ['Use for focused decisions, confirmations and small tasks.', 'Keep popup content short and scannable.', 'Always pair destructive actions with a confirm popup.'],
        donts: ['Use for passive information (use a notification).', 'Open many stacked popups at once.', 'Make the popup taller than the viewport without scrolling.'],
      },
    },
    // --- Compact specs for remaining 21 components ---
    { name: 'Checkbox', tag: 'sm-checkbox', cat: 'Inputs', status: 'Stable', summary: 'A multi-select toggle with custom styling. Use for lists of independent options.', demo: '<sm-checkbox>Accept terms</sm-checkbox>', api: [{ attr: 'checked', type: 'boolean', values: '—', desc: 'Sets the initial checked state.' }, { attr: 'disabled', type: 'boolean', values: '—', desc: 'Disables interaction.' }, { attr: 'change', type: 'event', values: '—', desc: 'Fired on toggle; event.target.checked holds the value.' }], tokens: [{ var: '--accent-color', default: '#4d2588', desc: 'Fill colour when checked.' }, { var: '--height', default: '1.2rem', desc: 'Checkbox box height.' }, { var: '--width', default: '1.2rem', desc: 'Checkbox box width.' }], a11y: ['Space toggles; full keyboard support.', 'Exposed as role="checkbox" with aria-checked.'] },
    { name: 'Menu', tag: 'sm-menu', cat: 'Navigation', status: 'Stable', summary: 'A trigger-activated dropdown menu. Use with menu-option children.', demo: '<sm-menu><menu-option>Edit</menu-option><menu-option>Delete</menu-option></sm-menu>', api: [{ attr: 'open', type: 'boolean', values: '—', desc: 'Opens the menu on connection.' }, { attr: 'expand()', type: 'method', values: '—', desc: 'Reveals the option list.' }, { attr: 'collapse()', type: 'method', values: '—', desc: 'Hides the option list.' }, { attr: 'toggle()', type: 'method', values: '—', desc: 'Toggles the option list.' }], tokens: [{ var: '--border-radius', default: '0.5rem', desc: 'Menu corner radius.' }], a11y: ['Arrow keys navigate items.', 'Escape closes.', 'Focus is trapped while open.'] },
    { name: 'Copy', tag: 'sm-copy', cat: 'Actions', status: 'Stable', summary: 'One-click copy-to-clipboard. Nests any content and fires a notification on success.', demo: '<sm-copy>Click to copy this text</sm-copy>', api: [{ attr: 'value', type: 'string', values: '—', desc: 'Explicit value to copy. Defaults to textContent.' }, { attr: 'copy', type: 'event', values: '—', desc: 'Fired after a successful copy.' }], tokens: [], a11y: ['Announces copy success to screen readers.', 'Keyboard accessible via Enter/Space.'] },
    { name: 'File input', tag: 'file-input', cat: 'Inputs', status: 'Stable', summary: 'A file picker with preview. Accepts images, documents, or any file type.', demo: '<file-input accept="image/*"></file-input>', api: [{ attr: 'accept', type: 'string', values: 'MIME types', desc: 'Restrict accepted file types.' }, { attr: 'multiple', type: 'boolean', values: '—', desc: 'Allow multiple file selection.' }, { attr: 'capture', type: 'string', values: '—', desc: 'Capture hint for camera input on mobile.' }, { attr: 'files', type: 'property', values: 'FileList', desc: 'Selected files.' }], tokens: [{ var: '--button-background-color', default: 'var(--accent-color)', desc: 'Picker button background.' }, { var: '--button-color', default: 'rgba(var(--background-color), 1)', desc: 'Picker button text colour.' }], a11y: ['Keyboard activation opens the file browser.', 'File count and sizes are listed after selection.'] },
    { name: 'Form', tag: 'sm-form', cat: 'Inputs', status: 'Stable', summary: 'Wraps inputs and orchestrates validation. Submit fires only when all fields are valid.', demo: '<sm-form><sm-input placeholder="Name" required></sm-input><sm-button type="submit">Send</sm-button></sm-form>', api: [{ attr: 'submit', type: 'event', values: '—', desc: 'Fired on valid submission. Prevent with invalid fields.' }, { attr: 'validate()', type: 'method', values: 'Boolean', desc: 'Runs validation on all fields and returns whether they are valid.' }], tokens: [], a11y: ['Error messages are linked to fields via aria-describedby.', 'Submit is prevented when fields are invalid.'] },
    { name: 'Spinner', tag: 'sm-spinner', cat: 'Feedback', status: 'Stable', summary: 'A circular loading indicator. Use for operations with known or unknown duration.', demo: '<sm-spinner style="--height:4rem;--width:4rem"></sm-spinner>', api: [], tokens: [{ var: '--height', default: '1.6rem', desc: 'Spinner height.' }, { var: '--width', default: '1.6rem', desc: 'Spinner width.' }, { var: '--accent-color', default: '#4d2588', desc: 'Ring colour.' }], a11y: ['Decorative by default; pair with a text label or live region for context.'] },
    { name: 'Radio', tag: 'sm-radio', cat: 'Inputs', status: 'Stable', summary: 'A single-select control. Group radios by name for mutual exclusion.', demo: '<sm-radio name="demo" checked>Option A</sm-radio> <sm-radio name="demo">Option B</sm-radio>', api: [{ attr: 'name', type: 'string', values: '—', desc: 'Group name for mutual exclusion.' }, { attr: 'checked', type: 'boolean', values: '—', desc: 'Sets the initial selected radio.' }, { attr: 'disabled', type: 'boolean', values: '—', desc: 'Disables the radio.' }, { attr: 'change', type: 'event', values: '—', desc: 'Fired when selection changes.' }, { attr: 'changed{name}', type: 'event', values: '—', desc: 'Group event fired on the document when any radio in the group changes.' }], tokens: [{ var: '--accent-color', default: '#4d2588', desc: 'Fill colour when checked.' }, { var: '--height', default: '1.4rem', desc: 'Radio button height.' }], a11y: ['Arrow keys move between radios in a group.'] },
    { name: 'Switch', tag: 'sm-switch', cat: 'Inputs', status: 'Stable', summary: 'A boolean toggle for settings. Immediate on/off with no confirmation needed.', demo: '<sm-switch checked>Notifications</sm-switch>', api: [{ attr: 'checked', type: 'boolean', values: '—', desc: 'Initial toggle state.' }, { attr: 'disabled', type: 'boolean', values: '—', desc: 'Disables the switch.' }, { attr: 'change', type: 'event', values: '—', desc: 'Fired on toggle; event.detail.value holds the state.' }], tokens: [{ var: '--accent-color', default: '#4d2588', desc: 'Track colour when on.' }], a11y: ['Space toggles.', 'Exposed as role="switch" with aria-checked.'] },
    { name: 'Tabs', tag: 'sm-tab-header', cat: 'Navigation', status: 'Stable', summary: 'Tabbed navigation. Pair sm-tab-header with sm-tab and sm-tab-panels for full tab system.', demo: '<sm-tab-header><sm-tab>One</sm-tab><sm-tab>Two</sm-tab></sm-tab-header>', api: [{ attr: 'variant', type: 'string', values: 'tab', desc: 'Segmented tab styling instead of the underline style.' }, { attr: 'target', type: 'string', values: 'id of sm-tab-panels', desc: 'Links the header to its panel container.' }, { attr: 'switchedtab{id}', type: 'event', values: '—', desc: 'Fired when tab selection changes; event.detail.index.' }], tokens: [{ var: '--accent-color', default: 'var(--accent-color)', desc: 'Active tab indicator colour.' }], a11y: ['Arrow keys navigate tabs.', 'Active tab is visually indicated.'] },
    { name: 'Textarea', tag: 'sm-textarea', cat: 'Inputs', status: 'Stable', summary: 'An auto-growing textarea. Expands as the user types; no manual resize needed.', demo: '<sm-textarea placeholder="Write something..." rows="3"></sm-textarea>', api: [{ attr: 'rows', type: 'number', values: '—', desc: 'Initial visible rows.' }, { attr: 'placeholder', type: 'string', values: '—', desc: 'Placeholder text.' }, { attr: 'value', type: 'string', values: '—', desc: 'Current text content.' }, { attr: 'change', type: 'event', values: '—', desc: 'Fired when the value changes.' }], tokens: [{ var: '--background', default: 'rgba(var(--text-color),0.06)', desc: 'Textarea background.' }, { var: '--border-radius', default: '0.3rem', desc: 'Corner radius.' }], a11y: ['Label association via aria-labelledby.'] },
    { name: 'Text field', tag: 'text-field', cat: 'Inputs', status: 'Stable', summary: 'An editable text surface with a built-in edit/save control. Double-click the text or use the edit button to change it.', demo: '<text-field value="Email address"></text-field>', api: [{ attr: 'value', type: 'string', values: '—', desc: 'Text displayed and returned after editing.' }, { attr: 'disabled', type: 'boolean', values: '—', desc: 'Removes editing behavior and hides the edit control.' }, { attr: 'change', type: 'event', values: '—', desc: 'Fired after a changed value is saved.' }], tokens: [], a11y: ['The edit control has an accessible title.', 'Content remains readable when editing is unavailable.', 'Save returns focus to the editing surface.'] },
    { name: 'Carousel', tag: 'sm-carousel', cat: 'Media', status: 'Stable', summary: 'A responsive slideshow with dots and arrows. Use for hero banners or image galleries.', demo: '<sm-carousel indicator aria-label="Featured examples" style="width:100%;max-width:34rem;"><div style="display:grid;place-items:center;min-width:100%;min-height:8rem;padding:1rem;background:var(--accent-color);color:#fff;">Slide 1</div><div style="display:grid;place-items:center;min-width:100%;min-height:8rem;padding:1rem;background:var(--color-secondary-500);color:#111315;">Slide 2</div><div style="display:grid;place-items:center;min-width:100%;min-height:8rem;padding:1rem;background:var(--color-primary-700);color:#fff;">Slide 3</div></sm-carousel>', api: [{ attr: 'indicator', type: 'boolean', values: '—', desc: 'Renders one interactive indicator per slide.' }, { attr: 'autoplay', type: 'boolean', values: '—', desc: 'Auto-advance slides; pauses on hover and focus.' }, { attr: 'interval', type: 'number', values: 'ms', desc: 'Auto-advance interval in milliseconds.' }, { attr: 'align-items', type: 'string', values: 'start | center | end', desc: 'Slide snap alignment.' }], tokens: [], a11y: ['Autoplay pauses on hover and focus.', 'Arrow keys navigate slides.', 'Each slide has a full-width reading and interaction area.', 'The carousel has an accessible region label and keyboard-focusable controls.'] },
    { name: 'Theme toggle', tag: 'theme-toggle', cat: 'Actions', status: 'Stable', summary: 'Switches between light and dark themes. Respects system preference and persists choice.', demo: '<theme-toggle></theme-toggle>', api: [{ attr: 'checked', type: 'boolean', values: '—', desc: 'Represents dark mode; toggling persists the choice to localStorage.' }, { attr: 'themechange', type: 'event', values: '—', desc: 'Fired on toggle; event.detail.theme is the new theme.' }], tokens: [], a11y: ['Exposed as a switch with aria-checked.', 'Icon updates to reflect the active theme.'] },
    { name: 'Tags input', tag: 'tags-input', cat: 'Inputs', status: 'Stable', summary: 'Enter multiple values as removable chips. Use for keywords, recipients, or categories.', demo: '<tags-input placeholder="Add a tag..."></tags-input>', api: [{ attr: 'placeholder', type: 'string', values: '—', desc: 'Placeholder text in the input.' }, { attr: 'limit', type: 'number', values: '—', desc: 'Maximum number of tags allowed.' }, { attr: 'value', type: 'string', values: 'comma-separated', desc: 'Current tags as a comma-separated string.' }], tokens: [], a11y: ['Tags can be removed with Backspace or Delete.', 'New tag announced on addition.'] },
    { name: 'Strip select', tag: 'strip-select', cat: 'Inputs', status: 'Stable', summary: 'A segmented control for small option sets (2-5). Use when options are short and few.', demo: '<strip-select><strip-option selected>Day</strip-option><strip-option>Week</strip-option><strip-option>Month</strip-option></strip-select>', api: [{ attr: 'change', type: 'event', values: '—', desc: 'Fired on selection change.' }], tokens: [{ var: '--background', default: 'rgba(var(--text-color),0.06)', desc: 'Segment background.' }], a11y: ['Arrow keys navigate segments.', 'Selected segment has aria-selected="true".'] },
    { name: 'Hamburger menu', tag: 'hamburger-menu', cat: 'Navigation', status: 'Stable', summary: 'A responsive slide-out navigation drawer. The hamburger icon is shown on mobile.', demo: '<hamburger-menu><div><h4>Nav</h4><a href="#">Link</a></div></hamburger-menu>', api: [{ attr: 'open', type: 'boolean', values: '—', desc: 'Shows the drawer.' }, { attr: 'open()', type: 'method', values: '—', desc: 'Opens the drawer programmatically.' }, { attr: 'close()', type: 'method', values: '—', desc: 'Closes the drawer programmatically.' }], tokens: [{ var: '--width', default: '18rem', desc: 'Drawer width.' }], a11y: ['Focus trapped inside open drawer.', 'Escape closes.', 'Hamburger icon has aria-label.'] },
  ];

  const registeredSpecTags = new Set(components.map(component => component.tag));
  const uniqueSpecs = [];
  const seenSpecTags = new Set();
  specs.forEach(spec => {
    if (registeredSpecTags.has(spec.tag) && !seenSpecTags.has(spec.tag)) {
      uniqueSpecs.push(spec);
      seenSpecTags.add(spec.tag);
    }
  });
  specs.splice(0, specs.length, ...uniqueSpecs);
  const standaloneTags = new Set(components.filter(component => !component.parent).map(component => component.tag));
  specs.splice(0, specs.length, ...specs.filter(spec => standaloneTags.has(spec.tag)));

  function defaultStatesForSpec(spec) {
    const states = {
      'sm-checkbox': [
        { name: 'Unchecked', html: '<sm-checkbox>Accept terms</sm-checkbox>', note: 'The resting state has no checked attribute.' },
        { name: 'Checked', html: '<sm-checkbox checked>Accept terms</sm-checkbox>', note: 'The checked attribute changes aria-checked and the checkmark.' },
        { name: 'Disabled', html: '<sm-checkbox disabled>Accept terms</sm-checkbox>', note: 'The disabled attribute removes the tab stop and blocks pointer input.' },
      ],
      'sm-copy': [
        { name: 'Short value', html: '<sm-copy>Copy this value</sm-copy>', note: 'The component copies its text content.' },
        { name: 'Long value', html: '<sm-copy>https://example.com/a-long-shareable-resource-id</sm-copy>', note: 'Long values remain readable and copy as one value.' },
        { name: 'Focused', html: '<sm-copy tabindex="0">Copy this value</sm-copy>', note: 'The copy action remains reachable from the keyboard.' },
      ],
      'file-input': [
        { name: 'Empty', html: '<file-input accept="image/*"></file-input>', note: 'The drop zone explains the empty starting state.' },
        { name: 'Images only', html: '<file-input accept="image/*" multiple></file-input>', note: 'accept and multiple constrain the selection contract.' },
        { name: 'Disabled', html: '<file-input disabled></file-input>', note: 'The disabled attribute prevents browsing and dropping.' },
      ],
      'sm-form': [
        { name: 'Empty', html: '<sm-form><sm-input placeholder="Name" required></sm-input><sm-button type="submit">Send</sm-button></sm-form>', note: 'Required input blocks an empty submission.' },
        { name: 'Filled', html: '<sm-form><sm-input value="Ada" required></sm-input><sm-button type="submit">Send</sm-button></sm-form>', note: 'A valid value enables the submission path.' },
        { name: 'Disabled action', html: '<sm-form><sm-input required placeholder="Required name"></sm-input><sm-button type="submit">Send</sm-button></sm-form>', note: 'The invalid required field mechanically disables the submit control.' },
      ],
      'hamburger-menu': [
        { name: 'Closed', html: '<hamburger-menu aria-label="Example navigation"><div><a href="#">Link</a></div></hamburger-menu>', note: 'Navigation starts closed on narrow screens.' },
        { name: 'Open', html: '<hamburger-menu open aria-label="Example navigation"><div><a href="#">Link</a></div></hamburger-menu>', note: 'The open attribute exposes the navigation drawer.' },
        { name: 'Right aligned', html: '<hamburger-menu position="right" aria-label="Example navigation"><div><a href="#">Link</a></div></hamburger-menu>', note: 'Position changes the entry edge without changing content.' },
      ],
      'sm-input': [
        { name: 'Empty', html: '<sm-input placeholder="Email" type="email" animate></sm-input>', note: 'Empty input shows its placeholder affordance.' },
        { name: 'Filled', html: '<sm-input value="ada@example.com" type="email" animate></sm-input>', note: 'A value keeps the label and content visible.' },
        { name: 'Disabled', html: '<sm-input value="ada@example.com" disabled animate></sm-input>', note: 'Disabled input cannot receive or change focus.' },
      ],
      'sm-menu': [
        { name: 'Closed', html: '<sm-menu><menu-option>Edit</menu-option><menu-option>Delete</menu-option></sm-menu>', note: 'The menu trigger is visible while options remain closed.' },
        { name: 'Open by interaction', html: '<sm-menu open><menu-option>Edit</menu-option><menu-option>Delete</menu-option></sm-menu>', note: 'The open attribute reveals the option list.' },
        { name: 'Disabled option', html: '<sm-menu open><menu-option disabled>Edit</menu-option><menu-option>Delete</menu-option></sm-menu>', note: 'The disabled option is visible, skipped, and not activatable.' },
      ],
      'sm-notifications': [
        { name: 'Success toast', html: '<sm-button onclick="notify(\'Saved successfully\', \'success\')">Try success</sm-button>', note: 'The success action creates a polite transient toast.' },
        { name: 'Error toast', html: '<sm-button onclick="notify(\'Something failed\', \'error\')">Try error</sm-button>', note: 'The error action creates assertive feedback.' },
        { name: 'Pinned toast', html: '<sm-button onclick="getRef(\'notification_drawer\').push(\'Stays until dismissed\', { pinned: true })">Try pinned</sm-button>', note: 'Pinned feedback stays until its close action is used.' },
      ],
      'menu-option': [
        { name: 'Available', html: '<sm-menu><menu-option>Delete</menu-option></sm-menu>', note: 'Available options have a focusable role option.' },
        { name: 'Disabled', html: '<sm-menu><menu-option disabled>Delete</menu-option></sm-menu>', note: 'The disabled attribute removes the option from activation.' },
        { name: 'Selected', html: '<sm-menu><menu-option selected>Delete</menu-option></sm-menu>', note: 'Selected communicates the current menu choice.' },
      ],
      'sm-option': [
        { name: 'Available', html: '<sm-select><sm-option value="one">One</sm-option></sm-select>', note: 'The option participates in its parent select.' },
        { name: 'Selected', html: '<sm-select><sm-option value="one" selected>One</sm-option></sm-select>', note: 'selected establishes the initial value.' },
        { name: 'Disabled', html: '<sm-select><sm-option value="one" disabled>One</sm-option></sm-select>', note: 'disabled prevents the option from being chosen.' },
      ],
      'sm-popup': [
        { name: 'Closed', html: '<sm-button onclick="getRef(\'spec_popup_demo\').show()">Open popup</sm-button>', note: 'The dialog is closed until the trigger is activated.' },
        { name: 'Open', html: '<sm-button onclick="getRef(\'spec_popup_demo\').show()">Open popup</sm-button>', note: 'The trigger opens the modal dialog and moves focus inside.' },
        { name: 'Pinned', html: '<sm-button onclick="getRef(\'spec_popup_demo\').show({ pinned: true })">Open pinned popup</sm-button>', note: 'Pinned dialogs do not close from backdrop interaction.' },
      ],
      'sm-radio': [
        { name: 'Unselected', html: '<sm-radio name="state">Option A</sm-radio>', note: 'The unselected radio has no checked attribute.' },
        { name: 'Selected', html: '<sm-radio name="state" checked>Option A</sm-radio>', note: 'checked marks the selected radio.' },
        { name: 'Disabled', html: '<sm-radio name="state" disabled>Option A</sm-radio>', note: 'disabled blocks selection.' },
      ],
      'sm-select': [
        { name: 'Placeholder', html: '<sm-select><sm-option value="">Choose one</sm-option><sm-option value="one">One</sm-option></sm-select>', note: 'The closed field presents the choice affordance.' },
        { name: 'Selected', html: '<sm-select value="one"><sm-option value="one">One</sm-option><sm-option value="two">Two</sm-option></sm-select>', note: 'value establishes the selected option.' },
        { name: 'Disabled', html: '<sm-select disabled><sm-option value="one">One</sm-option></sm-select>', note: 'disabled blocks opening and selection.' },
      ],
      'sm-spinner': [
        { name: 'Default', html: '<sm-spinner></sm-spinner>', note: 'The default ring communicates ongoing work.' },
        { name: 'Large', html: '<sm-spinner style="--size:4rem"></sm-spinner>', note: 'The size token changes the visual emphasis.' },
        { name: 'Custom colour', html: '<sm-spinner style="--color:var(--color-secondary-500)"></sm-spinner>', note: 'The colour token remains theme-controlled.' },
      ],
      'strip-select': [
        { name: 'First selected', html: '<strip-select><strip-option selected>Day</strip-option><strip-option>Week</strip-option></strip-select>', note: 'The first segment owns the selected state.' },
        { name: 'Second selected', html: '<strip-select><strip-option>Day</strip-option><strip-option selected>Week</strip-option></strip-select>', note: 'Selection moves without changing the control structure.' },
        { name: 'Disabled', html: '<strip-select disabled><strip-option>Day</strip-option><strip-option>Week</strip-option></strip-select>', note: 'disabled blocks segment interaction.' },
      ],
      'strip-option': [
        { name: 'Available', html: '<strip-select><strip-option>Day</strip-option></strip-select>', note: 'Available option can become active.' },
        { name: 'Selected', html: '<strip-select><strip-option selected>Day</strip-option></strip-select>', note: 'selected marks the current segment.' },
        { name: 'Disabled', html: '<strip-select><strip-option disabled>Day</strip-option></strip-select>', note: 'disabled prevents activation.' },
      ],
      'sm-switch': [
        { name: 'Off', html: '<sm-switch>Notifications</sm-switch>', note: 'Off has no checked attribute.' },
        { name: 'On', html: '<sm-switch checked>Notifications</sm-switch>', note: 'checked exposes the on state.' },
        { name: 'Disabled', html: '<sm-switch checked disabled>Notifications</sm-switch>', note: 'disabled prevents toggling.' },
      ],
      'sm-tab': [
        { name: 'Inactive', html: '<sm-tab-header><sm-tab>One</sm-tab><sm-tab>Two</sm-tab></sm-tab-header>', note: 'Inactive tabs remain keyboard reachable.' },
        { name: 'Selected', html: '<sm-tab-header><sm-tab selected>One</sm-tab><sm-tab>Two</sm-tab></sm-tab-header>', note: 'selected marks the current tab.' },
        { name: 'Disabled', html: '<sm-tab-header><sm-tab disabled>One</sm-tab><sm-tab>Two</sm-tab></sm-tab-header>', note: 'disabled removes the tab from activation.' },
      ],
      'sm-tab-header': [
        { name: 'First tab', html: '<sm-tab-header><sm-tab selected>One</sm-tab><sm-tab>Two</sm-tab></sm-tab-header>', note: 'The header exposes the first tab as selected.' },
        { name: 'Second tab', html: '<sm-tab-header><sm-tab>One</sm-tab><sm-tab selected>Two</sm-tab></sm-tab-header>', note: 'Selection can move to the second tab.' },
        { name: 'Disabled tab', html: '<sm-tab-header><sm-tab disabled>One</sm-tab><sm-tab>Two</sm-tab></sm-tab-header>', note: 'Disabled tabs remain visible but cannot activate.' },
      ],
      'sm-tab-panels': [
        { name: 'First panel', html: '<sm-tab-panels><div>Panel one</div><div>Panel two</div></sm-tab-panels>', note: 'The first panel is visible initially.' },
        { name: 'Multiple panels', html: '<sm-tab-panels><div>Panel one</div><div>Panel two</div><div>Panel three</div></sm-tab-panels>', note: 'Panels preserve content order as tabs change.' },
        { name: 'Empty panel', html: '<sm-tab-panels><div></div><div>Panel two</div></sm-tab-panels>', note: 'An empty panel remains a valid layout state.' },
      ],
      'tags-input': [
        { name: 'Empty', html: '<tags-input placeholder="Add a tag"></tags-input>', note: 'The empty field invites the first tag.' },
        { name: 'With tags', html: '<tags-input value="design,engineering"></tags-input>', note: 'Existing values render as removable tags.' },
        { name: 'Disabled', html: '<tags-input disabled value="design"></tags-input>', note: 'disabled prevents adding or removing tags.' },
      ],
      'sm-textarea': [
        { name: 'Empty', html: '<sm-textarea placeholder="Write something" rows="3"></sm-textarea>', note: 'Empty textarea preserves the writing affordance.' },
        { name: 'Filled', html: '<sm-textarea rows="3">A longer response</sm-textarea>', note: 'Content can grow within its configured rows.' },
        { name: 'Disabled', html: '<sm-textarea disabled rows="3">Read only</sm-textarea>', note: 'disabled blocks editing.' },
      ],
      'text-field': [
        { name: 'Read only', html: '<text-field value="Email address"></text-field>', note: 'The text is displayed with an edit affordance.' },
        { name: 'Disabled', html: '<text-field value="Email address" disabled></text-field>', note: 'disabled removes editing.' },
        { name: 'Long value', html: '<text-field value="A longer editable value that must remain readable"></text-field>', note: 'Long content remains legible.' },
      ],
      'theme-toggle': [
        { name: 'Light', html: '<theme-toggle></theme-toggle>', note: 'Light is represented without checked.' },
        { name: 'Dark', html: '<theme-toggle checked></theme-toggle>', note: 'checked represents dark mode.' },
        { name: 'Keyboard focus', html: '<theme-toggle tabindex="0"></theme-toggle>', note: 'The theme switch is keyboard reachable.' },
      ],
      'sm-carousel': [
        { name: 'First slide', html: '<sm-carousel aria-label="Examples"><div style="min-width:100%;min-height:6rem">One</div><div style="min-width:100%;min-height:6rem">Two</div></sm-carousel>', note: 'The first slide is visible initially.' },
        { name: 'Indicators', html: '<sm-carousel indicator aria-label="Examples"><div style="min-width:100%;min-height:6rem">One</div><div style="min-width:100%;min-height:6rem">Two</div></sm-carousel>', note: 'indicator creates one control per slide.' },
        { name: 'Autoplay', html: '<sm-carousel autoplay interval="1000" aria-label="Examples"><div style="min-width:100%;min-height:6rem">One</div><div style="min-width:100%;min-height:6rem">Two</div></sm-carousel>', note: 'autoplay advances on the configured interval.' },
      ],
    };
    return states[spec.tag] || [
      { name: 'Default', html: spec.demo, note: 'The resting state establishes the affordance and expected next action.' },
      { name: 'Configured', html: spec.demo, note: 'The component is shown with its documented configuration.' },
      { name: 'Focused', html: spec.demo, note: 'Keyboard focus remains visible without relying on hover.' },
    ];
  }

  function enrichSpec(spec) {
    const componentName = spec.name.toLowerCase();
    const isPattern = spec.status === 'Pattern' || spec.status === 'Token';
    const categoryGuidance = {
      Actions: {
        intent: 'Make the next meaningful action obvious without competing with the content around it.',
        use: 'Use when a person needs to trigger an immediate action, commit a change, or copy a value.',
        avoid: 'Avoid using it for navigation, passive status, or actions that need a long explanation before they can be understood.',
      },
      Inputs: {
        intent: 'Reduce the effort and uncertainty involved in entering or choosing information.',
        use: 'Use when the product needs a value, preference, filter, or decision from the person using it.',
        avoid: 'Avoid hiding labels, silently changing values, or asking for information that can be inferred.',
      },
      Navigation: {
        intent: 'Keep orientation, hierarchy, and movement predictable as the experience grows.',
        use: 'Use when people need to move between destinations, views, or related content states.',
        avoid: 'Avoid nesting navigation patterns unnecessarily or making the current location ambiguous.',
      },
      Feedback: {
        intent: 'Make system state visible at the moment it matters, with the right level of interruption.',
        use: 'Use to acknowledge progress, success, failure, or a decision that needs attention.',
        avoid: 'Avoid using transient feedback for critical information that must remain available or be acted on later.',
      },
      Media: {
        intent: 'Help people inspect, understand, and move through content without losing context.',
        use: 'Use when content benefits from a structured visual, editorial, or data presentation.',
        avoid: 'Avoid decoration that adds visual weight without improving comprehension or task success.',
      },
      Foundations: {
        intent: 'Provide a repeatable visual decision that keeps the whole product coherent.',
        use: 'Use as a system primitive rather than inventing a one-off value at the feature level.',
        avoid: 'Avoid bypassing the token or replacing it with a local value without a documented reason.',
      },
    };
    const guidance = categoryGuidance[spec.cat] || categoryGuidance.Media;
    const childNote = isPattern ? 'This is a system pattern or primitive, so its anatomy is the surrounding composition and the rules that keep it consistent.' : `The ${spec.name} is a focused, composable surface with a clear input, state, and response.`;

    spec.intent = spec.intent || guidance.intent;
    spec.whenToUse = spec.whenToUse || guidance.use;
    spec.whenNotToUse = spec.whenNotToUse || guidance.avoid;
    spec.anatomy = spec.anatomy || [
      { label: 'Container', note: 'Owns spacing, surface, alignment, and the visual relationship to nearby content.' },
      { label: 'Primary content', note: childNote },
      { label: 'Feedback layer', note: 'Communicates focus, selection, progress, validation, or completion without relying on colour alone.' },
    ];
    spec.variants = spec.variants?.length ? spec.variants : [{ name: 'Default', html: spec.demo }];
    spec.states = spec.states?.length >= 3 ? spec.states : defaultStatesForSpec(spec);
    spec.usage = spec.usage || {
      dos: [guidance.use, 'Keep the label, feedback, and surrounding context specific to the user’s goal.', 'Pair the component with the nearest appropriate pattern instead of rebuilding its behavior.'],
      donts: [guidance.avoid, 'Use colour, motion, or placement as the only way to communicate state.', 'Add a new visual variant when an existing variant already expresses the intent.'],
    };
    spec.interaction = spec.interaction || [
      'The first interaction should reveal a clear response within the component itself.',
      'Keyboard, pointer, touch, and assistive technology users receive the same outcome.',
      'Focus is preserved or deliberately restored when the component changes the page state.',
    ];
    spec.responsive = spec.responsive || [
      'At narrow widths, content wraps before controls are clipped or pushed off-screen.',
      'Touch targets remain at least 2.75rem where the control is primary to the task.',
      'Long labels and dynamic content are allowed to grow without overlapping adjacent UI.',
    ];
    spec.testing = spec.testing || [
      'Verify the default, focus, disabled, and error or empty state where applicable.',
      'Verify keyboard operation and visible focus without a mouse.',
      'Verify reduced motion, high zoom, narrow viewport, and dark theme behavior.',
    ];
    spec.related = spec.related || components.filter(component => !component.parent && component.cat === spec.cat && component.name !== spec.name).slice(0, 3).map(component => component.name);
    spec.parts = components.filter(component => component.parent === spec.tag);
    return spec;
  }

  specs.forEach(enrichSpec);

  function verifyComponentContracts() {
    const report = specs.map(spec => {
      const constructor = customElements.get(spec.tag);
      const prototype = constructor?.prototype;
      const methods = (spec.api || []).filter(item => item.type === 'method').map(item => item.attr.replace(/\(.*$/, ''));
      const missingMethods = methods.filter(method => typeof prototype?.[method] !== 'function');
      return {
        name: spec.name,
        tag: spec.tag,
        registered: !!constructor,
        methods,
        missingMethods,
        status: constructor && missingMethods.length === 0 ? 'verified' : 'needs-attention',
      };
    });
    return {
      generatedAt: new Date().toISOString(),
      standaloneSpecs: specs.length,
      verified: report.filter(item => item.status === 'verified').length,
      findings: report.filter(item => item.status !== 'verified'),
      components: report,
    };
  }

  window.RMDS_COMPONENT_CONTRACTS = verifyComponentContracts;

  const icons = [
    { name: 'Menu', icon: 'menu' },
    { name: 'Close', icon: 'close' },
    { name: 'Check', icon: 'done' },
    { name: 'Info', icon: 'info' },
    { name: 'Expand more', icon: 'expand_more' },
    { name: 'Chevron right', icon: 'chevron_right' },
    { name: 'Arrow forward', icon: 'arrow_forward' },
    { name: 'Search', icon: 'search' },
    { name: 'Add', icon: 'add' },
    { name: 'Content copy', icon: 'content_copy' },
    { name: 'Notifications', icon: 'notifications' },
    { name: 'Delete', icon: 'delete' },
  ];

  const nav = [
    {
      group: 'Getting started', items: [
        { name: 'Overview', pageId: 'overview_page' },
        { name: 'Principles', pageId: 'principles_page' },
        { name: 'Process', pageId: 'process_page' },
      ]
    },
    {
      group: 'Foundations', items: [
        { name: 'Color', pageId: 'color_page' },
        { name: 'Typography', pageId: 'typography_page' },
        { name: 'Spacing & layout', pageId: 'spacing_page' },
        { name: 'Radius & elevation', pageId: 'elevation_page' },
        { name: 'Motion', pageId: 'motion_page' },
        { name: 'Iconography', pageId: 'icons_page' },
      ]
    },
    {
      group: 'Library', items: [
        {
          name: 'Components', pageId: 'components_page', children: [
            { name: 'Button', pageId: 'spec_button_page' },
            { name: 'Carousel', pageId: 'spec_carousel_page' },
            { name: 'Checkbox', pageId: 'spec_checkbox_page' },
            { name: 'Copy', pageId: 'spec_copy_page' },
            { name: 'File input', pageId: 'spec_file_input_page' },
            { name: 'Form', pageId: 'spec_form_page' },
            { name: 'Hamburger menu', pageId: 'spec_hamburger_menu_page' },
            { name: 'Input', pageId: 'spec_input_page' },
            { name: 'Menu', pageId: 'spec_menu_page' },
            { name: 'Notifications', pageId: 'spec_notifications_page' },
            { name: 'Popup', pageId: 'spec_popup_page' },
            { name: 'Radio', pageId: 'spec_radio_page' },
            { name: 'Select', pageId: 'spec_select_page' },
            { name: 'Spinner', pageId: 'spec_spinner_page' },
            { name: 'Strip select', pageId: 'spec_strip_select_page' },
            { name: 'Switch', pageId: 'spec_switch_page' },
            { name: 'Tabs', pageId: 'spec_tabs_page' },
            { name: 'Tags input', pageId: 'spec_tags_input_page' },
            { name: 'Text field', pageId: 'spec_text_field_page' },
            { name: 'Textarea', pageId: 'spec_textarea_page' },
            { name: 'Theme toggle', pageId: 'spec_theme_toggle_page' },
          ]
        },
        { name: 'Patterns', pageId: 'patterns_page' },
      ]
    },
    {
      group: 'Guidelines', items: [
        { name: 'Accessibility', pageId: 'accessibility_page' },
        { name: "Do's & don'ts", pageId: 'guidelines_page' },
        { name: 'Design practice', pageId: 'practice_page' },
      ]
    },
    {
      group: 'Resources', items: [
        { name: 'Resources', pageId: 'resources_page' },
      ]
    },
  ];

  /* ------------------------------------------------------------
     Helpers
  ------------------------------------------------------------ */
  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));

  function hexToRgb(hex) {
    const h = hex.replace('#', '');
    return [0, 2, 4].map(i => parseInt(h.substr(i, 2), 16));
  }
  function luminance(hex) {
    return hexToRgb(hex).map(v => {
      const c = v / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    }).reduce((acc, c, i) => acc + c * [0.2126, 0.7152, 0.0722][i], 0);
  }
  function contrast(a, b) {
    const l1 = luminance(a), l2 = luminance(b);
    const [hi, lo] = l1 > l2 ? [l1, l2] : [l2, l1];
    return (hi + 0.05) / (lo + 0.05);
  }
  function cssColorToHex(color) {
    const channels = color.match(/\d+(?:\.\d+)?/g);
    if (!channels || channels.length < 3) return null;
    return `#${channels.slice(0, 3).map(channel => Math.round(Number(channel)).toString(16).padStart(2, '0')).join('')}`;
  }
  function activeSurfaceColor() {
    return cssColorToHex(getComputedStyle(document.body).backgroundColor) || '#ffffff';
  }
  function aaLabel(ratio) {
    if (ratio >= 7) return { text: 'AAA', cls: 'badge--good' };
    if (ratio >= 4.5) return { text: 'AA', cls: 'badge--good' };
    if (ratio >= 3) return { text: 'AA lg', cls: 'badge--warn' };
    return { text: 'Below', cls: 'badge--bad' };
  }
  function inkOn(hex) {
    const darkInk = '#111315';
    const lightInk = '#ffffff';
    return contrast(hex, darkInk) >= contrast(hex, lightInk) ? darkInk : lightInk;
  }
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  window.copySpecMarkup = async button => {
    const code = button?.parentElement?.querySelector('code')?.textContent || '';
    try {
      await navigator.clipboard.writeText(code);
      const label = button.querySelector('span:last-child');
      if (label) label.textContent = 'Copied';
      setTimeout(() => { if (label) label.textContent = 'Copy markup'; }, 1400);
    } catch (error) {
      console.warn('Could not copy spec markup.', error);
    }
  };

  /* ------------------------------------------------------------
     Renderers
  ------------------------------------------------------------ */
  function fullSpecHTML(s) {
    const apiRows = (s.api || []).map(a => `
      <div class="tr">
        <div><span class="highlight">${a.attr}</span> <em class="spec-type">${a.type}</em>${a.values ? `<br><code class="spec-values">${a.values}</code>` : ''}</div>
        <p>${a.desc}</p>
      </div>`).join('');
    const tokensRow = (s.tokens || []).length ? `
      <h3 class="spec-section">Design tokens</h3>
      <section class="table">
        <div class="tr"><h4 class="table__heading">Variable</h4><h4 class="table__heading">Default</h4><h4 class="table__heading">Controls</h4></div>
        ${s.tokens.map(t => `
          <div class="tr">
            <div><span class="highlight">${t.var}</span></div>
            <div><code>${t.default}</code></div>
            <p>${t.desc}</p>
          </div>`).join('')}
      </section>` : '';
    const statesRow = (s.states || []).length ? `
      <h3 class="spec-section">States</h3>
      <div class="spec-states">
        ${s.states.map(st => `
          <div class="spec-state" data-state-name="${st.name}" data-state-tag="${s.tag}">
            <div class="spec-state__demo">${st.html}</div>
            <code class="spec-variant__name">${st.name}</code>
            ${st.note ? `<span class="spec-variant__note">${st.note}</span>` : ''}
          </div>`).join('')}
      </div>` : '';
    const variantsRow = (s.variants || []).length ? `
      <h3 class="spec-section">Variants</h3>
      <div class="spec-variants">
        ${s.variants.map(v => `
          <div class="spec-variant">
            <div class="spec-variant__demo">${v.html}</div>
            <code class="spec-variant__name">${v.name}</code>
          </div>`).join('')}
      </div>` : '';
    const anatomyRow = (s.anatomy || []).length ? `
      <h3 class="spec-section">Anatomy</h3>
      <div class="spec-anatomy">
        ${s.anatomy.map((p, i) => `
          <div class="spec-part">
            <span class="spec-part__n">${i + 1}</span>
            <div><strong>${p.label}</strong><p>${p.note}</p></div>
          </div>`).join('')}
      </div>` : '';
    const partsRow = (s.parts || []).length ? `
      <h3 class="spec-section">Composition parts</h3>
      <div class="spec-parts">
        ${s.parts.map(part => `<div class="spec-part spec-part--child"><code>&lt;${part.tag}&gt;</code><p>${part.desc}</p></div>`).join('')}
      </div>` : '';
    const a11yRow = (s.a11y || []).length ? `
      <h3 class="spec-section">Accessibility</h3>
      <ul class="spec-a11y">${s.a11y.map(a => `<li>${a}</li>`).join('')}</ul>` : '';
    const usageRow = s.usage ? `
      <h3 class="spec-section">Usage</h3>
      <div class="dd-grid">
        <ul class="dd-list dd-list--do">
          <li class="dd-list__head dd-list__head--plain">Do</li>
          ${(s.usage.dos || []).map(d => `<li>${d}</li>`).join('')}
        </ul>
        <ul class="dd-list dd-list--dont">
          <li class="dd-list__head dd-list__head--plain">Don&rsquo;t</li>
          ${(s.usage.donts || []).map(d => `<li>${d}</li>`).join('')}
        </ul>
      </div>` : '';
    const apiSection = (s.api || []).length ? `
      <h3 class="spec-section">API</h3>
      <section class="table">
        <div class="tr"><h4 class="table__heading">Attribute / member</h4><h4 class="table__heading">Description</h4></div>
        ${apiRows}
      </section>` : '';
    const guidanceRow = `
      <section class="spec-guidance">
        <div class="spec-guidance__item spec-guidance__item--intent">
          <span class="spec-guidance__eyebrow">Design intent</span>
          <p>${s.intent}</p>
        </div>
        <div class="spec-guidance__item">
          <span class="spec-guidance__eyebrow">Use when</span>
          <p>${s.whenToUse}</p>
        </div>
        <div class="spec-guidance__item">
          <span class="spec-guidance__eyebrow">Avoid when</span>
          <p>${s.whenNotToUse}</p>
        </div>
      </section>`;
    const listSection = (title, items, className) => `
      <h3 class="spec-section">${title}</h3>
      <ul class="spec-detail-list ${className}">${items.map(item => `<li>${item}</li>`).join('')}</ul>`;
    const codeSection = s.demo ? `
      <h3 class="spec-section">Markup</h3>
      <div class="spec-code-block"><button class="spec-code-block__copy" type="button" onclick="copySpecMarkup(this)"><span class="material-icons" aria-hidden="true">content_copy</span><span>Copy markup</span></button><pre><code>${esc(s.demo)}</code></pre></div>` : '';
    const relatedSection = (s.related || []).length ? `
      <h3 class="spec-section">Related components</h3>
      <div class="spec-related">${s.related.map(name => `<a href="#spec_${name.toLowerCase().replace(/[ /]/g, '_')}_page" class="spec-related__link">${name}<span class="material-icons" aria-hidden="true">arrow_forward</span></a>`).join('')}</div>` : '';
    return `
    <article class="spec-card" data-spec-tag="${s.tag}" data-spec-name="${s.name}">
      <header class="spec-card__head">
        <div class="spec-card__titles">
          <h2>${s.name}</h2>
          <code class="spec-card__tag">&lt;${s.tag}&gt;</code>
          <span class="pill">${s.cat}</span>
          <span class="spec-status"><span class="spec-status__dot"></span>${s.status}</span>
        </div>
        <p class="spec-card__summary">${s.summary}</p>
      </header>

      ${guidanceRow}

      <h3 class="spec-section">Demo</h3>
      <div class="demo" data-demo-tag="${s.tag}"${s.demoTarget ? ` data-demo-target="${s.demoTarget}"` : ''}>${s.demo}</div>

      ${anatomyRow}
      ${partsRow}
      ${variantsRow}
      ${statesRow}
      ${apiSection}
      ${tokensRow}
      ${a11yRow}
      ${listSection('Interaction contract', s.interaction, 'spec-detail-list--interaction')}
      ${listSection('Responsive behavior', s.responsive, 'spec-detail-list--responsive')}
      ${listSection('Design QA checklist', s.testing, 'spec-detail-list--testing')}
      ${usageRow}
      ${codeSection}
      ${relatedSection}
    </article>`;
  }

  const R = {
    color() {
      const surface = activeSurfaceColor();
      // Brand + neutral scales
      const scales = [
        { title: 'Primary &middot; Teal', tokenBase: '--color-primary', rows: tokens.color.primary, base: '600' },
        { title: 'Secondary &middot; Amber', tokenBase: '--color-secondary', rows: tokens.color.secondary, base: '500' },
        { title: 'Neutrals', tokenBase: '--color-neutral', rows: tokens.color.neutral, base: '100' },
      ];
      $('#ds-color-scales').innerHTML = scales.map(sc => {
        const chips = sc.rows.map(([step, hex, note]) => {
          const c = contrast(hex, surface);
          const badge = aaLabel(c);
          const isBase = step === sc.base;
          return `
            <div class="swatch ${isBase ? 'swatch--base' : ''}" style="--sw:${hex}">
              <div class="swatch__chip" style="background:${hex};color:${inkOn(hex)}">
                <span class="swatch__hex">${hex}</span>
                ${isBase ? '<span class="swatch__flag">BASE</span>' : ''}
              </div>
              <div class="swatch__meta">
                <code class="swatch__token">${sc.tokenBase}-${step}</code>
                ${note ? `<span class="swatch__note">${note}</span>` : ''}
                <span class="badge ${badge.cls}">${badge.text} &middot; ${c.toFixed(2)}</span>
              </div>
            </div>`;
        }).join('');
        return `<div class="token-group"><h3>${sc.title}</h3><div class="swatch-grid">${chips}</div></div>`;
      }).join('');

      // Semantic
      $('#ds-color-semantic').innerHTML = tokens.color.semantic.map(s => `
        <div class="sem-row">
          <div class="sem-row__head">
            <span class="dot" style="background:${s.light}"></span>
            <strong>${s.name}</strong>
            <span class="sem-row__usage">${s.usage}</span>
          </div>
          <div class="sem-row__chips">
            <label class="theme-chip-label">Light</label>
            <span class="theme-chip" style="background:${s.light};color:${inkOn(s.light)}">
              <code>${s.light}</code></span>
            <label class="theme-chip-label">Dark</label>
            <span class="theme-chip" style="background:${s.dark};color:${inkOn(s.dark)}">
              <code>${s.dark}</code></span>
          </div>
        </div>`).join('');

      // Theme tokens
      $('#ds-color-theme').innerHTML = tokens.color.theme.map(t => `
        <div class="sem-row">
          <div class="sem-row__head">
            <strong>${t.name}</strong>
            <span class="sem-row__usage">${t.usage}</span>
          </div>
          <div class="sem-row__chips">
            <label class="theme-chip-label">Light</label>
            <span class="theme-chip theme-chip--bordered" style="background:${t.light};color:${inkOn(t.light)}">
              <code>${t.light}</code></span>
            <label class="theme-chip-label">Dark</label>
            <span class="theme-chip" style="background:${t.dark};color:${inkOn(t.dark)}">
              <code>${t.dark}</code></span>
          </div>
        </div>`).join('');
    },

    type() {
      $('#ds-type-families').innerHTML = tokens.type.families.map(f => `
        <div class="fam-card">
          <div class="fam-card__sample" style="font-family:${f.stack}">
            <span>Aa</span><span>123</span>
          </div>
          <div class="fam-card__meta">
            <strong>${f.name}</strong>
            <code>${f.token}</code>
            <p>${f.usage}</p>
          </div>
        </div>`).join('');

      $('#ds-type-scale').innerHTML = tokens.type.scale.map(t => {
        const style = [
          `font-size:${t.size}`,
          `font-weight:${t.weight}`,
          `font-family:var(--font-${t.family})`,
          `line-height:${t.lh}`,
          t.transform ? `text-transform:${t.transform}` : '',
          t.tracking ? `letter-spacing:${t.tracking}` : '',
        ].filter(Boolean).join(';');
        return `
          <div class="type-row">
            <div class="type-row__meta">
              <code>${t.name}</code>
              <span>${t.size} &middot; w${t.weight} &middot; lh ${t.lh} &middot; ${t.family}</span>
            </div>
            <div class="type-row__sample" style="${style}">${t.sample}</div>
          </div>`;
      }).join('');
    },

    spacing() {
      $('#ds-spacing').innerHTML = tokens.spacing.map(s => `
        <div class="space-row">
          <div class="space-row__meta">
            <code>${s.name}</code>
            <span>${s.rem} &middot; ${s.px}px</span>
            <span class="space-row__usage">${s.usage}</span>
          </div>
          <div class="space-row__track">
            <div class="space-row__bar" style="width:${Math.max(s.px * 3, 8)}px"></div>
            <code class="space-row__px">${s.px}px</code>
          </div>
        </div>`).join('');
    },

    elevation() {
      $('#ds-radius').innerHTML = tokens.radius.map(r => `
        <div class="radius-card">
          <div class="radius-card__shape" style="border-radius:${r.value}"></div>
          <div class="radius-card__meta">
            <code>--radius-${r.name}: ${r.value}</code>
            <span>${r.usage}</span>
          </div>
        </div>`).join('');

      $('#ds-shadow').innerHTML = tokens.shadow.map(s => `
        <div class="shadow-card">
          <div class="shadow-card__box" style="box-shadow:${s.value}"></div>
          <div class="shadow-card__meta">
            <code>--shadow-${s.name}</code>
            <code class="shadow-card__value">${s.value}</code>
            <span>${s.usage}</span>
          </div>
        </div>`).join('');

      $('#ds-zindex').innerHTML = tokens.zIndex.map(z => `
        <div class="tr"><div><code>z-${z.name.toLowerCase().replace(/ /g, '-')}</code></div><p><strong>${z.value}</strong> &mdash; ${z.usage}</p></div>`).join('');
    },

    motion() {
      $('#ds-duration').innerHTML = tokens.motion.duration.map(d => `
        <div class="motion-row">
          <div class="motion-row__meta">
            <code>--duration-${d.name}</code>
            <span>${d.ms}ms</span>
            <span class="space-row__usage">${d.usage}</span>
          </div>
          <div class="motion-row__track">
            <div class="motion-row__dot" style="animation-duration:${d.ms}ms"></div>
          </div>
        </div>`).join('');

      $('#ds-easing').innerHTML = tokens.motion.easing.map(e => `
        <div class="motion-row">
          <div class="motion-row__meta">
            <code>${e.name}</code>
            <code class="shadow-card__value">${e.value}</code>
            <span class="space-row__usage">${e.usage}</span>
          </div>
          <div class="motion-row__track">
            <div class="motion-row__dot motion-row__dot--ease" style="animation-duration:2000ms;animation-timing-function:${e.value}"></div>
          </div>
        </div>`).join('');
    },

    breakpoints() {
      $('#ds-breakpoints').innerHTML = tokens.breakpoints.map(b => `
        <div class="bp-row">
          <div class="bp-row__name"><strong>${b.name}</strong><span>${b.range}</span></div>
          <div class="bp-row__track"><div class="bp-row__bar"></div></div>
          <div class="bp-row__usage">${b.usage}</div>
        </div>`).join('');
    },

    icons() {
      $('#ds-icons').innerHTML = icons.map(i => `
        <div class="icon-card">
          <div class="icon-card__glyph"><span class="material-icons" aria-hidden="true">${i.icon}</span></div>
          <span>${i.name}</span>
        </div>`).join('');
    },

    principles() {
      $('#ds-principles').innerHTML = principles.map(p => `
        <div class="principle-card">
                <span class="principle-card__n" aria-hidden="true">${p.n}</span>
          <h3>${p.title}</h3>
          <p>${p.body}</p>
        </div>`).join('');
    },

    components() {
      const cats = ['All', ...new Set(components.map(c => c.cat))];
      $('#ds-comp-filters').innerHTML = cats.map(c => `
        <button class="chip-btn ${c === 'All' ? 'chip-btn--active' : ''}" data-cat="${esc(c)}">${c}</button>`).join('');
      $('#ds-comp-filters').addEventListener('click', e => {
        const btn = e.target.closest('.chip-btn');
        if (!btn) return;
        $$('.chip-btn', $('#ds-comp-filters')).forEach(b => b.classList.toggle('chip-btn--active', b === btn));
        renderCompGrid(btn.dataset.cat);
      });
      renderCompGrid('All');
    },

    patterns() {
      $('#ds-patterns').innerHTML = patterns.map(p => `
        <div class="pattern-card">
          <h3>${p.name}</h3>
          <p>${p.desc}</p>
          <div class="pattern-card__chips">
            ${p.built.map(t => `<code>${t}</code>`).join('')}
          </div>
        </div>`).join('');
    },

    specs() {
      $('#ds-specs').innerHTML = specs.map(s => `
        <div class="comp-card">
          <div class="comp-card__head">
            <code class="comp-card__tag">&lt;${s.tag}&gt;</code>
            <span class="pill">${s.cat}</span>
          </div>
          <h4>${s.name}</h4>
          <p>${s.summary}</p>
          <a class="comp-card__link" href="#spec_${s.name.toLowerCase().replace(/ /g, '_')}_page">Full spec <span class="material-icons link-icon" aria-hidden="true">arrow_forward</span></a>
        </div>`).join('');
    },

    specButton() { $('#ds-spec-button').innerHTML = fullSpecHTML(specs[0]); },
    specInput() { $('#ds-spec-input').innerHTML = fullSpecHTML(specs[1]); },
    specSelect() { $('#ds-spec-select').innerHTML = fullSpecHTML(specs[2]); },
    specNotifications() { $('#ds-spec-notifications').innerHTML = fullSpecHTML(specs[3]); },
    specPopup() { $('#ds-spec-popup').innerHTML = fullSpecHTML(specs[4]); },

    specPage(pageId) {
      if (!pageId) return;
      const parts = pageId.replace('_page', '').split('_'); parts.shift(); // remove 'spec'
      let spec = specs.find(s => s.name.toLowerCase().replace(/[ /]/g, '_') === parts.join('_'));
      if (!spec) spec = specs.find(s => pageId === 'spec_' + s.name.toLowerCase().replace(/[ /]/g, '_') + '_page');
      if (spec) $('#ds-spec-page').innerHTML = fullSpecHTML(spec);
    },

    guidelines() {
      $('#ds-guidelines').innerHTML = guidelines.map(g => `
        <section class="dd-group">
          <h3>${g.category}</h3>
          <div class="dd-grid">
            <ul class="dd-list dd-list--do">
              <li class="dd-list__head"><span class="material-icons" aria-hidden="true">done</span> Do</li>
              ${g.dos.map(d => `<li>${d}</li>`).join('')}
            </ul>
            <ul class="dd-list dd-list--dont">
              <li class="dd-list__head"><span class="material-icons" aria-hidden="true">close</span> Don&rsquo;t</li>
              ${g.donts.map(d => `<li>${d}</li>`).join('')}
            </ul>
          </div>
        </section>`).join('');
    },
  };

  function renderCompGrid(cat) {
    const specByTag = Object.fromEntries(specs.map(s => [s.tag, `spec_${s.name.toLowerCase().replace(/ /g, '_')}_page`]));
    const standaloneComponents = components.filter(component => !component.parent);
    const list = cat === 'All' ? standaloneComponents : standaloneComponents.filter(c => c.cat === cat);
    $('#ds-comp-grid').innerHTML = list.map(c => {
      const specHref = specByTag[c.tag];
      return `
      <div class="comp-card">
        <div class="comp-card__head">
          <code class="comp-card__tag">&lt;${c.tag}&gt;</code>
          <span class="pill">${c.cat}</span>
        </div>
        <h4>${c.name}</h4>
        <p>${c.desc}</p>
        <a class="comp-card__link" href="${specHref ? '#' + specHref : '../components/index.html'}" ${specHref ? '' : 'target="_blank" rel="noopener"'}>${specHref ? 'Full spec' : 'Full docs'} <span class="material-icons link-icon" aria-hidden="true">${specHref ? 'arrow_forward' : 'open_in_new'}</span></a>
      </div>`;
    }).join('');
  }

  /* ------------------------------------------------------------
     Navigation
  ------------------------------------------------------------ */
  function buildNav() {
    const wrap = $('#ds-nav');
    const html = nav.map(g => {
      const items = g.items.map(i => {
        if (i.children) {
          return `<li>
            <button class="nav-accordion__toggle interact" aria-expanded="false">${i.name} <span class="material-icons nav-accordion__icon">expand_more</span></button>
            <ul class="list nav-accordion__list hide-completely">
              ${i.children.map(ch => `<li><a href="#${ch.pageId}" class="list__item interact">${ch.name}</a></li>`).join('')}
            </ul>
          </li>`;
        }
        return `<li><a href="#${i.pageId}" class="list__item interact">${i.name}</a></li>`;
      }).join('');
      return `<h4>${g.group}</h4><ul class="list">${items}</ul>`;
    }).join('');
    wrap.innerHTML = html;
    // Accordion behavior
    wrap.querySelectorAll('.nav-accordion__toggle').forEach(btn => {
      btn.addEventListener('click', () => {
        const list = btn.nextElementSibling;
        const expanded = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', !expanded);
        list.classList.toggle('hide-completely', expanded);
        btn.querySelector('.nav-accordion__icon').textContent = expanded ? 'expand_more' : 'expand_less';
      });
    });
  }

  function showPage(target, opts = {}) {
    const { firstLoad, hashChange } = opts;
    let pageId = (target || '').split('#').pop() || 'overview_page';
    // Route generic spec pages to the shared spec_page div
    const heroSpecs = ['spec_button_page', 'spec_input_page', 'spec_select_page', 'spec_notifications_page', 'spec_popup_page'];
    if (pageId.startsWith('spec_') && !heroSpecs.includes(pageId)) {
      const specDiv = $('#spec_page');
      if (!specDiv) return;
      $$('.page').forEach(p => p.classList.add('hide-completely'));
      $$('.list__item--active').forEach(i => i.classList.remove('list__item--active'));
      specDiv.classList.remove('hide-completely');
      R.specPage(pageId);
      const spec = specs.find(s => 'spec_' + s.name.toLowerCase().replace(/[ /]/g, '_') + '_page' === pageId);
      document.title = `${spec ? spec.name : 'Component Spec'} | ${DS.name}`;
      specDiv.animate([{ opacity: 0, transform: 'translateX(-1rem)' }, { opacity: 1, transform: 'none' }], { duration: 300, easing: 'ease' });
      const link = $(`.list__item[href="#${pageId}"]`);
      if (link) link.classList.add('list__item--active');
      const right = $('.right'); if (right) right.scrollTo({ top: 0 });
      const sideNav = $('#side_nav');
      if (hashChange && window.innerWidth < 640 && sideNav) sideNav.close();
      return;
    }
    const page = $(`#${pageId}`);
    if (!page || !page.classList.contains('page')) return;
    $$('.page').forEach(p => p.classList.add('hide-completely'));
    $$('.list__item--active').forEach(i => i.classList.remove('list__item--active'));
    page.classList.remove('hide-completely');
    const dedicatedSpec = heroSpecs.includes(pageId) ? specs.find(spec => `spec_${spec.name.toLowerCase().replace(/[ /]/g, '_')}_page` === pageId) : null;
    document.title = `${dedicatedSpec?.name || page.querySelector('h1')?.textContent || 'Documentation'} | ${DS.name}`;
    page.animate([
      { opacity: 0, transform: 'translateX(-1rem)' },
      { opacity: 1, transform: 'none' },
    ], { duration: 300, easing: 'ease' });
    const link = $(`.list__item[href="#${pageId}"]`);
    if (link) link.classList.add('list__item--active');
    const right = $('.right');
    if (right) right.scrollTo({ top: 0 });
    const sideNav = $('#side_nav');
    if (hashChange && window.innerWidth < 640 && sideNav) sideNav.close();
    if (firstLoad) {
      // scroll nav into view on desktop
      if (window.innerWidth > 640 && link && sideNav) {
        const top = link.getBoundingClientRect().top - sideNav.getBoundingClientRect().top + sideNav.scrollTop;
        sideNav.scrollTo({ top: Math.max(0, top - 16), behavior: 'smooth' });
      }
    }
  }

  function setCounts() {
    const tokenCount = Object.keys(tokens.color).reduce((n, k) => n + (tokens.color[k].length || 0), 0)
      + tokens.type.families.length + tokens.type.scale.length
      + tokens.spacing.length + tokens.radius.length + tokens.shadow.length
      + tokens.motion.duration.length + tokens.motion.easing.length
      + tokens.breakpoints.length + tokens.zIndex.length + icons.length;
    const set = (id, val) => { const n = $(id); if (n) n.textContent = val; };
    set('#stat-components', components.length);
    set('#stat-tokens', tokenCount);
    set('#stat-layouts', 4);
    set('#stat-contrast', 'AA');
  }

  /* ------------------------------------------------------------
     Init
  ------------------------------------------------------------ */
  document.addEventListener('DOMContentLoaded', () => {
    buildNav();
    Object.values(R).forEach(fn => { try { fn(); } catch (err) { console.error(err); } });
    window.RMDS_COMPONENT_CONTRACT_REPORT = verifyComponentContracts();
    setCounts();
    document.body.classList.remove('hide-completely');
    window.addEventListener('hashchange', () => showPage(location.hash, { hashChange: true }));
    new MutationObserver(mutations => {
      if (mutations.some(mutation => mutation.attributeName === 'data-theme'))
        requestAnimationFrame(() => R.color());
    }).observe(document.body, { attributes: true, attributeFilter: ['data-theme'] });
    showPage(location.hash, { firstLoad: true });
  });
})();
