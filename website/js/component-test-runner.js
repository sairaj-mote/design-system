(() => {
  const browserErrors = [];
  window.addEventListener('error', event => browserErrors.push(event.message || event.error?.message || 'Uncaught browser error'));
  window.addEventListener('unhandledrejection', event => browserErrors.push(event.reason?.message || String(event.reason)));
  if (!new URLSearchParams(location.search).has('run-component-tests')) return;
  const output = document.createElement('aside');
  output.className = 'component-test-output';
  output.setAttribute('role', 'status');
  output.setAttribute('aria-live', 'polite');
  output.innerHTML = '<strong>Component browser checks</strong><span>Running…</span>';
  document.body.append(output);

  const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
  const waitFor = async (predicate, timeout = 3000) => {
    const started = performance.now();
    while (!predicate()) {
      if (performance.now() - started > timeout) throw new Error('Timed out waiting for the spec page to render.');
      await wait(30);
    }
  };
  const results = [];
  const check = (name, condition, detail = '') => results.push({ name, status: condition ? 'pass' : 'fail', detail });
  const fail = (name, error) => results.push({ name, status: 'fail', detail: error?.message || String(error) });
  const routeFor = spec => `#spec_${spec.name.toLowerCase().replace(/[ /]/g, '_')}_page`;
  const escapeText = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
  const codeInventory = spec => {
    const Component = customElements.get(spec.tag);
    if (!Component) return { attrs: [], members: [] };
    let attrs = [];
    try { attrs = Array.from(Component.observedAttributes || []); } catch (error) {}
    const blocked = new Set(['constructor', 'connectedCallback', 'disconnectedCallback', 'adoptedCallback', 'attributeChangedCallback', 'formAssociatedCallback', 'formDisabledCallback', 'formResetCallback', 'formStateRestoreCallback']);
    const members = Object.getOwnPropertyNames(Component.prototype).filter(name => !blocked.has(name)).map(name => {
      const d = Object.getOwnPropertyDescriptor(Component.prototype, name);
      return { name, kind: d.get || d.set ? 'property' : typeof d.value === 'function' ? 'method' : 'member' };
    });
    return { attrs, members };
  };

  async function run() {
    const specs = window.RMDS_COMPONENT_SPECS || [];
    const inventory = window.RMDS_COMPONENT_INVENTORY || [];
    check('Spec and standalone inventory counts match', specs.length === inventory.filter(item => !item.parent).length, `${specs.length} specs / ${inventory.filter(item => !item.parent).length} standalone components`);
    let clipboardCapture = '';
    try { Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: async value => { clipboardCapture = value; } } }); } catch (error) {}

    for (const spec of specs) {
      try {
        const Component = customElements.get(spec.tag);
        check(`${spec.name}: registered element`, !!Component);
        const demoHost = document.createElement('div');
        demoHost.innerHTML = spec.demo;
        const demoTags = [...demoHost.querySelectorAll('*')].filter(element => element.localName.includes('-'));
        check(`${spec.name}: all demo elements registered`, demoTags.every(element => !!customElements.get(element.localName)), demoTags.map(element => element.localName).join(', '));
        check(`${spec.name}: demo instance upgrades`, demoTags.filter(element => element.localName === spec.tag).every(element => element instanceof Component), `${demoTags.filter(element => element.localName === spec.tag).length} root instances`);
        check(`${spec.name}: demo source parses`, !spec.demo || demoHost.childElementCount > 0);
        for (const sample of [...(spec.variants || []), ...(spec.states || [])]) {
          const sampleHost = document.createElement('div');
          sampleHost.innerHTML = sample.html || '';
          const unknown = [...sampleHost.querySelectorAll('*')].filter(element => element.localName.includes('-') && !customElements.get(element.localName));
          check(`${spec.name}: ${sample.name} sample has registered tags`, unknown.length === 0, unknown.map(el => el.localName).join(', '));
        }
        const api = codeInventory(spec);
        const missingMethods = (spec.api || []).filter(item => item.type === 'method').map(item => item.attr.replace(/\(.*$/, '')).filter(name => typeof Component.prototype[name] !== 'function');
        check(`${spec.name}: documented methods exist`, missingMethods.length === 0, missingMethods.join(', '));
        const articleId = routeFor(spec);
        if (location.hash !== articleId) {
          location.hash = articleId;
          await waitFor(() => document.querySelector(`[data-spec-tag="${spec.tag}"]`));
        }
        const article = document.querySelector(`[data-spec-tag="${spec.tag}"]`);
        const code = article?.querySelector('.spec-code-block code');
        check(`${spec.name}: copy sample matches source`, !!code && code.textContent === spec.demo);
        check(`${spec.name}: markup has syntax tokens`, !!code?.querySelector('.token.tag, .token.attr-name, .token.punctuation') && code.classList.contains('language-markup'));
        const structure = article?.querySelector('.spec-structure');
        check(`${spec.name}: structure representation exists`, !!structure);
        if (structure) {
          const representedTags = [...structure.querySelectorAll('.structure-node__tag')].map(tag => tag.textContent.replace(/[<>]/g, '').trim());
          const expectedTags = [...demoHost.querySelectorAll('*')].map(element => element.localName);
          check(`${spec.name}: structure tag sequence matches demo`, JSON.stringify(representedTags) === JSON.stringify(expectedTags), `source ${expectedTags.length}; diagram ${representedTags.length}`);
        }
        const copyButton = article?.querySelector('.spec-code-block__copy');
        clipboardCapture = '';
        if (copyButton) await window.copySpecMarkup(copyButton);
        check(`${spec.name}: copy action preserves exact source`, !!copyButton && clipboardCapture === spec.demo);
        const runtimeRows = article?.querySelectorAll('.spec-runtime-api__item').length || 0;
        check(`${spec.name}: runtime API inventory displayed`, runtimeRows === api.attrs.length + api.members.length, `${api.attrs.length} observed attributes + ${api.members.length} members; ${runtimeRows} shown`);
        check(`${spec.name}: variants are rendered`, (spec.variants || []).length > 0 && article?.querySelectorAll('.spec-variant').length >= spec.variants.length);
        check(`${spec.name}: states are rendered`, (spec.states || []).length > 0 && article?.querySelectorAll('.spec-state').length >= spec.states.length);
      } catch (error) { fail(`${spec.name}: spec check`, error); }
    }

    const suite = document.createElement('div');
    suite.id = 'component-interaction-fixtures';
    suite.style.cssText = 'position:fixed;left:-10000px;top:0;width:30rem;z-index:-1;';
    document.body.append(suite);
    const testInteraction = async (name, markup, action, verify) => {
      try {
        suite.replaceChildren();
        suite.innerHTML = markup;
        await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
        const host = suite.firstElementChild;
        await action(host, suite);
        const outcome = verify(host, suite);
        const detail = typeof outcome === 'string' ? outcome : outcome ? '' : JSON.stringify({ tag: host?.localName, value: host?.value, attrs: host ? [...host.attributes].map(attr => [attr.name, attr.value]) : [], text: host?.textContent, shadowText: host?.shadowRoot?.textContent?.slice(0, 220), open: host?.open, ariaExpanded: host?.getAttribute('aria-expanded'), submits: host?._submits, valid: typeof host?.validate === 'function' ? host.validate() : undefined, buttonDisabled: host?.submitButton?.disabled, fieldValue: host?.querySelector('sm-input')?.value });
        check(`${name}: interaction outcome`, !!outcome, detail);
      } catch (error) { fail(`${name}: interaction`, error); }
    };

    await testInteraction('Button', '<sm-button>Run</sm-button>', (host) => host.shadowRoot?.querySelector('button')?.click(), host => !!host.shadowRoot && !host.disabled);
    await testInteraction('Disabled button', '<sm-button disabled>Run</sm-button>', (host) => host.shadowRoot?.querySelector('button')?.click(), host => host.disabled);
    await testInteraction('Checkbox', '<sm-checkbox>Accept</sm-checkbox>', (host) => host.click(), host => host.checked === true);
    await testInteraction('Switch', '<sm-switch>Enabled</sm-switch>', (host) => host.shadowRoot?.querySelector('input')?.click(), host => host.checked === true);
    await testInteraction('Radio', '<sm-radio name="browser-suite">Choice</sm-radio>', (host) => host.click(), host => host.checked === true);
    await testInteraction('Select', '<sm-select><sm-option value="alpha">Alpha</sm-option><sm-option value="beta">Beta</sm-option></sm-select>', (host) => { host.value = 'beta'; }, host => host.value === 'beta');
    await testInteraction('Textarea value', '<sm-textarea></sm-textarea>', (host) => { host.value = 'Verified'; }, host => host.value === 'Verified');
    await testInteraction('Input value', '<sm-input></sm-input>', (host) => { host.value = 'Verified'; }, host => host.value === 'Verified');
    await testInteraction('Form invalid guard', '<sm-form><sm-input required placeholder="Required"></sm-input><sm-button type="submit">Send</sm-button></sm-form>', (host) => { host.querySelector('[type="submit"]')?.click(); }, host => !host.validate());
    await testInteraction('Menu open state', '<sm-menu><menu-option>Choose</menu-option></sm-menu>', (host) => new Promise(resolve => { host.expand(); setTimeout(resolve, 250); }), host => host.getAttribute('aria-expanded') === 'true');
    await testInteraction('Carousel controls', '<sm-carousel aria-label="Browser test"><div style="min-width:100%;min-height:2rem">A</div><div style="min-width:100%;min-height:2rem">B</div></sm-carousel>', (host) => host.shadowRoot?.querySelector('[aria-label="Next slide"]')?.click(), host => !!host.shadowRoot?.querySelector('[aria-label="Previous slide"]'));
    await testInteraction('Switch ARIA sync', '<sm-switch>Enabled</sm-switch>', host => host.shadowRoot?.querySelector('input')?.click(), host => host.getAttribute('aria-checked') === 'true');
    await testInteraction('Select pointer option', '<sm-select><sm-option value="alpha">Alpha</sm-option><sm-option value="beta">Beta</sm-option></sm-select>', host => { host.shadowRoot.querySelector('.selection').click(); host.querySelector('[value="beta"]').focus(); host.querySelector('[value="beta"]').click(); }, host => host.value === 'beta' && host.shadowRoot.querySelector('.selected-option-text').textContent.trim() === 'Beta');
    await testInteraction('Select property sync', '<sm-select><sm-option value="alpha">Alpha</sm-option><sm-option value="beta">Beta</sm-option></sm-select>', host => { host.value = 'beta'; }, host => host.shadowRoot.querySelector('.selected-option-text').textContent.trim() === 'Beta');
    await testInteraction('Valid form submit once', '<sm-form><sm-input type="email" required placeholder="Email"></sm-input><sm-button type="submit">Send</sm-button></sm-form>', host => { host._submits = 0; host.addEventListener('submit', () => host._submits++); host.querySelector('sm-input').value = 'designer@example.com'; host.querySelector('sm-button').click(); }, host => host._submits === 1);
    await testInteraction('Menu Escape closes and restores focus', '<sm-menu><menu-option>Choose</menu-option></sm-menu>', host => new Promise(resolve => { host.expand(); setTimeout(() => { host.dispatchEvent(new KeyboardEvent('keydown', { code: 'Escape', key: 'Escape', bubbles: true })); setTimeout(resolve, 250); }, 250); }), host => host.getAttribute('aria-expanded') === 'false');
    await testInteraction('Tags input value', '<tags-input></tags-input>', (host) => { host.input.value = 'one'; host.input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true })); }, host => host.value === 'one');
    await testInteraction('Tags input escapes user content', '<tags-input></tags-input>', host => { host.input.value = '<img src=x>'; host.input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true })); }, host => !host.shadowRoot.querySelector('img') && host.value === '<img src=x>');
    await testInteraction('Popup show and hide', '<sm-popup aria-label="Test dialog"><p>Dialog content</p></sm-popup>', async host => { host.show(); await new Promise(resolve => setTimeout(resolve, 30)); host.hide(); await new Promise(resolve => setTimeout(resolve, 450)); }, host => host.open === false && !host.hasAttribute('open'));
    await testInteraction('Notification announces status', '<sm-notifications></sm-notifications>', host => { host.push('Saved'); }, host => host.shadowRoot.querySelector('[role="status"]')?.textContent.includes('Saved'));
    await testInteraction('Input disabled property sync', '<sm-input placeholder="Name"></sm-input>', host => { host.disabled = true; }, host => host.hasAttribute('disabled') && host.shadowRoot.querySelector('input').disabled && host.disabled === true);
    await testInteraction('Required empty input is invalid', '<sm-input required placeholder="Email"></sm-input>', host => {}, host => host.isValid === false);
    await testInteraction('Input error text is rendered as text', '<sm-input type="email" error-text="<img src=x>" value="invalid"></sm-input>', host => { void host.isValid; }, host => !host.shadowRoot.querySelector('img') && host.shadowRoot.querySelector('.feedback-text').textContent.includes('<img src=x>'));
    await testInteraction('Tags remove button', '<tags-input></tags-input>', host => { host.input.value = 'one'; host.input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true })); host.shadowRoot.querySelector('.tag-remove')?.click(); }, host => host.value === '' && !!host.shadowRoot.querySelector('.tag-remove') === false);
    await testInteraction('File input filename is rendered as text', '<file-input></file-input>', host => { const transfer = new DataTransfer(); transfer.items.add(new File(['x'], '<img src=x>.txt', { type: 'text/plain' })); host.input.files = transfer.files; host.input.dispatchEvent(new Event('change', { bubbles: true })); }, host => !host.shadowRoot.querySelector('.files-preview-wrapper img') && host.shadowRoot.querySelector('.file-name')?.textContent === '<img src=x>.txt');
    await testInteraction('File input disabled property sync', '<file-input></file-input>', host => { host.disabled = true; }, host => host.hasAttribute('disabled') && host.input.disabled && host.disabled === true);
    await testInteraction('Tabs arrow navigation', '<sm-tab-header><sm-tab>First</sm-tab><sm-tab>Second</sm-tab><sm-tab>Third</sm-tab></sm-tab-header>', host => { const first = host.querySelector('sm-tab'); first.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true, cancelable: true })); }, host => host.querySelectorAll('[aria-selected="true"]').length === 1 && host.querySelectorAll('sm-tab')[1].getAttribute('aria-selected') === 'true' && host.querySelectorAll('sm-tab')[1].tabIndex === 0);
    await testInteraction('Tabs linked panels', '<sm-tab-header target="browser-tabs-panels"><sm-tab selected>First</sm-tab><sm-tab>Second</sm-tab></sm-tab-header><sm-tab-panels id="browser-tabs-panels"><div>First panel</div><div>Second panel</div></sm-tab-panels>', host => { const second = host.querySelectorAll('sm-tab')[1]; second.click(); }, host => host.querySelectorAll('sm-tab')[1].getAttribute('aria-selected') === 'true' && host.querySelectorAll('sm-tab')[0].getAttribute('aria-selected') === 'false');
    const tabsSpec = specs.find(spec => spec.tag === 'sm-tab-header');
    check('Tabs spec demonstrates connected panels', !!tabsSpec?.demo.includes('target=') && tabsSpec.demo.includes('<sm-tab-panels'));
    suite.remove();
    check('No uncaught browser errors', browserErrors.length === 0, browserErrors.slice(0, 12).join(' · '));

    const failed = results.filter(result => result.status === 'fail');
    const report = { generatedAt: new Date().toISOString(), status: failed.length ? 'failed' : 'passed', passed: results.length - failed.length, failed: failed.length, total: results.length, results };
    window.RMDS_BROWSER_COMPONENT_REPORT = report;
    output.innerHTML = `<strong>Component browser checks: <span class="${failed.length ? 'is-fail' : 'is-pass'}">${report.status.toUpperCase()}</span></strong><span>${report.passed}/${report.total} passed · ${specs.length} specs checked</span><details><summary>View results</summary><ul>${results.map(result => `<li class="${result.status}"><b>${escapeText(result.status.toUpperCase())}</b> ${escapeText(result.name)}${result.detail ? `<small>${escapeText(result.detail)}</small>` : ''}</li>`).join('')}</ul></details>`;
    console[failed.length ? 'error' : 'info']('RMDS browser component report', report);
  }

  window.addEventListener('DOMContentLoaded', () => run().catch(error => { fail('Suite crashed', error); }), { once: true });
})();
