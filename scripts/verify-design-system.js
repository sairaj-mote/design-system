const assert = require('assert');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const read = relativePath => fs.readFileSync(path.join(root, relativePath), 'utf8');
const hash = content => crypto.createHash('sha256').update(content).digest('hex');
const failures = [];
const check = (condition, message) => { if (!condition) failures.push(message); };

const tokensText = read('website/tokens/tokens.json');
const tokens = JSON.parse(tokensText);
const css = read('website/tokens/tokens.css');
const runtime = read('website/js/tokens-runtime.js');
const components = read('website/js/components.js');
const sourceComponents = read('components/components.js');
const docsRuntime = read('website/js/docs-runtime.js');
const sharedRuntime = read('main_UI.js');
const index = read('website/index.html');
const style = read('website/css/main.css');
const documentation = read('website/js/design-system.js');
const evidence = JSON.parse(read('website/evidence/case-study.json'));
const tokenHash = hash(tokensText);

check(/href="tokens\/tokens\.css(?:\?[^\"]*)?"/.test(index), 'index.html must load generated tokens/tokens.css.');
check(/src="js\/tokens-runtime\.js(?:\?[^\"]*)?"/.test(index), 'index.html must load generated tokens-runtime.js before design-system.js.');
check(/src="js\/components\.js(?:\?[^\"]*)?"/.test(index), 'index.html must load generated components.js.');
check(!index.includes('class="hide-completely"'), 'index.html must preserve documentation content when JavaScript fails.');
check(!documentation.includes('const tokens = {'), 'design-system.js must use generated runtime tokens, not a duplicated token object.');
check(documentation.includes('const tokens = window.RMDS_TOKENS'), 'design-system.js must consume window.RMDS_TOKENS.');
check(!documentation.includes('window.routeTo'), 'design-system.js must not overwrite shared global routing APIs.');
check(!style.includes('rgba(var(--green)'), 'main.css must use RGB token variables for green alpha colors.');
check(!style.includes('rgba(var(--danger-color)'), 'main.css must use RGB token variables for danger alpha colors.');
check(!style.includes('::before { content: "↳"'), 'main.css must not inject decorative accessibility text.');
check(!style.includes('::before { content: "—"'), 'main.css must not inject decorative accessibility text.');
check(css.includes(`token-source-sha256: ${tokenHash}`), 'tokens.css must be generated from the current tokens.json.');
check(runtime.includes(`token-source-sha256: ${tokenHash}`), 'tokens-runtime.js must be generated from the current tokens.json.');
check(components.includes(`component-source-sha256: ${hash(sourceComponents)}`), 'components.js must be generated from the current component source.');
check(read('components/components.min.js').includes(`component-source-sha256: ${hash(sourceComponents)}`), 'components.min.js must be synchronized with the component source.');
check(read('main_UI.min.js').includes(`utility-source-sha256: ${hash(sharedRuntime)}`), 'main_UI.min.js must be synchronized with the utility source.');
[
    'Layouts/boxes layout/js',
    'Layouts/many sections layout/js',
    'Layouts/sidebar layout/js',
    'Layouts/tabs layout/js'
].forEach(layoutPath => {
    check(read(`${layoutPath}/components.min.js`).includes(`component-source-sha256: ${hash(sourceComponents)}`), `${layoutPath} components must be synchronized with the component source.`);
    check(read(`${layoutPath}/main_UI.js`).includes(`utility-source-sha256: ${hash(sharedRuntime)}`), `${layoutPath} utilities must be synchronized with the utility source.`);
});
check(tokens.$schema === undefined, 'tokens.json must not point to an unmaintained external schema.');
check(tokens.color?.brand?.primary?.['600']?.hex, 'tokens.json must define primary.600.');
check(tokens.typography?.scale?.length >= 8, 'tokens.json must define the type scale.');
check(sourceComponents.includes("this.notificationPanel.setAttribute('aria-live', 'polite')"), 'Notifications must expose a polite live region.');
check(sourceComponents.includes("this.popup.setAttribute('aria-modal', 'true')"), 'Popups must expose aria-modal=true.');
check(sourceComponents.includes("this.popup.setAttribute('role', 'dialog')"), 'Popups must expose dialog semantics.');
check(docsRuntime.includes("popup.addEventListener('popupclosed', onClose, { once: true })"), 'Docs confirmations and prompts must resolve when a popup closes externally.');
check(docsRuntime.includes("input.setAttribute('type', isPassword ? 'password' : 'text')"), 'Docs prompts must reset input type between password and text prompts.');
check(!sharedRuntime.includes('const { opened, closed } = openPopup'), 'Shared confirmations must not expect an unsupported popup return contract.');
check(sharedRuntime.includes("input.setAttribute(\"type\", isPassword ? \"password\" : \"text\")"), 'Shared prompts must reset input type between password and text prompts.');
check(sharedRuntime.includes("popup.addEventListener('popupclosed', () => settle(result), { once: true })"), 'Shared prompts and confirmations must resolve when a popup closes externally.');
check(documentation.includes('activeSurfaceColor()'), 'Color contrast must use the active surface color.');
check(documentation.includes("attributeFilter: ['data-theme']"), 'Color contrast evidence must refresh when the theme changes.');
check(documentation.includes('return contrast(hex, darkInk) >= contrast(hex, lightInk)'), 'Swatch foregrounds must choose the higher-contrast ink color.');
check(!style.includes('rgba(var(--green,'), 'Dark status backgrounds must use RGB token variables, not hex values inside rgba().');
check(style.includes('--theme-foreground-rgb) !important'), 'Live component demos must override internal light defaults with the active theme surface.');
check(sourceComponents.includes('background: rgba(var(--background-color, 255, 255, 255), 1);'), 'Popups must inherit theme backgrounds with a standalone fallback.');
check(/\.tr,\s*\.type-row,\s*\.space-row,\s*\.motion-row,\s*\.bp-row\s*\{/.test(style) && style.includes('grid-template-columns: 1fr;'), 'Mobile documentation tables and rows must collapse to one column.');
check(/\.space-row__bar\s*\{[\s\S]*?max-width:\s*calc\(100%\s*-\s*3rem\)/.test(style), 'The largest spacing visualization must fit within the mobile column.');
check(style.includes('min-height: 2rem;') && style.includes('.resource-card a {'), 'Component and resource-card links must have a 32px touch target.');
check((sourceComponents.match(/min-height: 1\.5rem;/g) || []).length >= 3, 'Checkbox, radio, and switch components must expose a 24px minimum touch target.');
check(evidence.claims.every(claim => ['verified', 'planned', 'needs-evidence'].includes(claim.status)), 'Evidence claims must declare an allowed status.');
check(evidence.claims.every(claim => claim.status !== 'verified' || claim.evidence.length > 0), 'Verified evidence claims must link to concrete evidence.');

const report = {
    generatedAt: new Date().toISOString(),
    status: failures.length ? 'failed' : 'passed',
    checks: 48,
    failures,
    evidenceSummary: evidence.claims.reduce((summary, claim) => {
        summary[claim.status] = (summary[claim.status] || 0) + 1;
        return summary;
    }, {})
};

fs.mkdirSync(path.join(root, 'website/evidence/verification'), { recursive: true });
fs.writeFileSync(path.join(root, 'website/evidence/verification/latest.json'), `${JSON.stringify(report, null, 2)}\n`);
if (failures.length) {
    console.error(failures.map(message => `FAIL: ${message}`).join('\n'));
    process.exit(1);
}
console.log(JSON.stringify(report, null, 2));
