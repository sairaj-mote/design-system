const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const read = relativePath => fs.readFileSync(path.join(root, relativePath), 'utf8');
const documentation = read('design-system/js/design-system.js');
const index = read('design-system/index.html');
const componentSource = read('components/components.js');
const utilitySource = read('main_UI.js');
const failures = [];
const check = (condition, message) => { if (!condition) failures.push(message); };

const componentBlock = documentation.match(/const components = \[([\s\S]*?)\n  \];/);
const specBlock = documentation.match(/const specs = \[([\s\S]*?)\n  \];/);
check(componentBlock, 'Could not locate the component inventory.');
check(specBlock, 'Could not locate the spec inventory.');

const components = componentBlock ? [...componentBlock[1].matchAll(/name:\s*'([^']+)'[^\n]*tag:\s*'([^']+)'[^\n]*cat:\s*'([^']+)'(?:[^\n]*parent:\s*'([^']+)')?/g)].map(match => ({ name: match[1], tag: match[2], cat: match[3], parent: match[4] || null })) : [];
const specTags = specBlock ? [...specBlock[1].matchAll(/tag:\s*['"]([^'"]+)['"]/g)].map(match => match[1]) : [];
const registeredTags = new Set([...componentSource.matchAll(/customElements\.define\(['"]([^'"]+)/g)].map(match => match[1]));
const standaloneComponents = components.filter(component => !component.parent);
const childComponents = components.filter(component => component.parent);
const demos = specBlock ? (specBlock[1].match(/\bdemo:/g) || []).length : 0;
const specHas = token => documentation.includes(token);
const source = `${componentSource}\n${utilitySource}\n${index}`;

const families = {
    Actions: {
        cases: ['default activation', 'keyboard Enter', 'keyboard Space', 'disabled activation is blocked', 'focus-visible state'],
        evidence: ['click()', 'handleKeyDown', 'disabled', 'focus-visible'],
    },
    Inputs: {
        cases: ['initial value', 'focus and blur', 'change/input event', 'keyboard entry', 'disabled state', 'validation or empty state'],
        evidence: ['change', 'disabled', 'focus'],
    },
    Navigation: {
        cases: ['default destination or selection', 'keyboard navigation', 'active/selected state', 'escape or close path', 'narrow viewport behavior'],
        evidence: ['keydown', 'selected', 'close'],
    },
    Feedback: {
        cases: ['open or start state', 'success or completion state', 'error or unavailable state', 'dismiss/escape path', 'announcement or live-region output'],
        evidence: ['aria-live', 'close', 'hide'],
    },
    Media: {
        cases: ['initial content state', 'next/previous interaction', 'keyboard interaction', 'empty or loading state', 'responsive content bounds'],
        evidence: ['keydown', 'resize', 'slotchange'],
    },
};

const rows = standaloneComponents.map(component => {
    const family = families[component.cat] || families.Media;
    const documented = specTags.includes(component.tag);
    const sourcePresent = source.includes(component.tag);
    const demoPresent = specBlock?.[1].includes(`tag: '${component.tag}'`) || specBlock?.[1].includes(`tag: "${component.tag}"`);
    const evidencePresent = family.evidence.filter(token => source.includes(token));
    const result = {
        name: component.name,
        tag: component.tag,
        category: component.cat,
        demo: demoPresent ? 'present' : 'missing',
        spec: documented ? 'present' : 'missing',
        sourceReference: registeredTags.has(component.tag) && sourcePresent ? 'present' : 'missing',
        expectedCases: family.cases,
        evidenceTokensFound: evidencePresent,
        status: documented && demoPresent ? 'covered' : 'gap',
    };
    check(registeredTags.has(component.tag), `${component.name} (${component.tag}) is listed but not registered with customElements.define.`);
    check(documented, `${component.name} (${component.tag}) is missing from the spec inventory.`);
    check(demoPresent, `${component.name} (${component.tag}) is missing a live demo.`);
    return result;
});

specTags.filter(tag => tag !== '—').forEach(tag => check(registeredTags.has(tag), `Spec tag <${tag}> is not registered with customElements.define.`));
check(specTags.filter(tag => tag !== '—').length === standaloneComponents.length, `Standalone spec count (${specTags.filter(tag => tag !== '—').length}) must match standalone component count (${standaloneComponents.length}).`);
childComponents.forEach(child => {
    check(registeredTags.has(child.tag), `Child component <${child.tag}> is not registered.`);
    check(components.some(component => component.tag === child.parent), `Child component <${child.tag}> references missing parent <${child.parent}>.`);
    check(!specTags.includes(child.tag), `Child component <${child.tag}> must not have a standalone spec route.`);
});
const demoTags = new Set([...((specBlock && specBlock[1]) || '').matchAll(/<([a-z][\w-]*-[\w-]+)(?:\s|>)/gi)].map(match => match[1]));
[...demoTags].filter(tag => !registeredTags.has(tag)).forEach(tag => check(false, `Demo markup contains unregistered custom element <${tag}>.`));

const requiredSpecSections = [
    ['design intent', 'intent'],
    ['anatomy', 'anatomy'],
    ['variants', 'variants'],
    ['states', 'states'],
    ['API', 'api'],
    ['design tokens', 'tokens'],
    ['accessibility', 'a11y'],
    ['interaction contract', 'interaction'],
    ['responsive behavior', 'responsive'],
    ['Design QA checklist', 'testing'],
    ['markup', 'spec-code-block'],
];
requiredSpecSections.forEach(([label, token]) => check(specHas(token), `Spec renderer is missing the ${label} contract.`));
check(demos >= standaloneComponents.length, `Only ${demos} spec demos were found for ${standaloneComponents.length} standalone components.`);
check(specHas('specs.forEach(enrichSpec)'), 'Specs are not normalized through the rich coverage layer.');
check(specHas('copySpecMarkup'), 'Copyable markup behavior is not covered by the spec renderer.');
check(/prefers-reduced-motion/i.test(componentSource) || /prefers-reduced-motion/i.test(read('design-system/css/main.css')), 'No reduced-motion contract is present in component or documentation styles.');
check(/:focus-visible/.test(componentSource) && /:focus-visible/.test(read('design-system/css/main.css')), 'Focus-visible contracts are not present in both component and documentation styles.');
check(/aria-live/.test(componentSource), 'Live-region behavior is not present in component source.');
check(/popupopened|popupclosed/.test(componentSource), 'Popup lifecycle events are not present in component source.');
check(/navigator\.clipboard|clipboard\.writeText/.test(source), 'Clipboard outcome is not represented in the source or demos.');
check(/if \(e\.code === 'ArrowLeft'\)\s*this\.scrollLeft\(\)/.test(componentSource), 'Carousel ArrowLeft must move toward the previous slide.');
check(/<sm-carousel[^>]*indicator[^>]*aria-label=/.test(specBlock?.[1] || ''), 'Carousel demo must enable indicators and provide an accessible region label.');
check(/classList\.add\('indicator'\)[\s\S]*setAttribute\('aria-label', `Go to slide/.test(componentSource), 'Carousel indicators must be labeled keyboard controls.');
check(/class="carousel__button carousel__button--left hide" aria-label="Previous slide"/.test(componentSource), 'Carousel previous control must have an accessible name.');
check(/class="carousel__button carousel__button--right hide" aria-label="Next slide"/.test(componentSource), 'Carousel next control must have an accessible name.');
check(/this\.setAttribute\('role', 'region'\)/.test(componentSource), 'Carousel host must expose region semantics.');
check(/name: 'Text field',[\s\S]*?demo: '<text-field value=/.test(specBlock?.[1] || ''), 'Text field demo must use the registered value API.');
check(!/name: 'Text field',[\s\S]*?demo:[\s\S]*?<sm-input/.test(specBlock?.[1] || ''), 'Text field demo must not nest the unrelated sm-input component.');
check(/demoTarget: 'notification_drawer'/.test(specBlock?.[1] || '') && index.includes('id="notification_drawer"'), 'Notifications demo must point to the live notification drawer.');
check(/spec\.states = spec\.states\?\.length >= 3 \? spec\.states/.test(documentation), 'Incomplete state arrays must receive the shared state contract.');
check(/'sm-checkbox': \[[\s\S]*?checked>Accept terms<\/sm-checkbox>[\s\S]*?disabled>Accept terms<\/sm-checkbox>/.test(documentation), 'Checkbox states must include real checked and disabled attributes.');
check(/name: 'Disabled action',[\s\S]*?sm-input required placeholder=/.test(documentation), 'Form disabled state must be produced by an invalid required field.');
check(/validate\(\)[\s\S]*?return this\.allRequiredValid/.test(componentSource), 'Form.validate() must exist because it is documented in the API.');
check(/window\.RMDS_COMPONENT_CONTRACT_REPORT = verifyComponentContracts\(\)/.test(documentation), 'Runtime component contract results must be persisted for browser review.');
check(/'sm-menu': \[[\s\S]*?<sm-menu open>[\s\S]*?<menu-option disabled>/.test(documentation), 'Menu disabled state must render an open menu with a visible disabled option.');
check(/aria-disabled/.test(componentSource) && /attributeChangedCallback\(name\)[\s\S]*?name === 'disabled'/.test(componentSource), 'Menu options must expose and update disabled semantics.');
check(/name === 'open'[\s\S]*?this\.expand\(\)/.test(componentSource), 'Menu open attribute must control the visible menu state.');
check(!/(?<!\.)navButtonLeft\.removeEventListener/.test(componentSource), 'Component lifecycle cleanup must not reference a local navButtonLeft variable.');
check(!/(?<!\.)intersectionObserver\.disconnect\(\)/.test(componentSource), 'Tab-panel lifecycle cleanup must use an instance-owned IntersectionObserver.');

// --- Mechanical doc-vs-code contract checks ---
// Documented events must be dispatched by the component source.
const eventClaims = [...((specBlock && specBlock[1]) || '').matchAll(/attr:\s*'([^']*)',\s*type:\s*'event'/g)].map(match => match[1]);
const dispatchedEvents = new Set([...componentSource.matchAll(/new CustomEvent\(['"`]([^'"`]+)/g)].map(match => match[1]));
eventClaims.forEach(eventName => {
    const baseName = eventName.replace(/\{[^}]*\}/g, '');
    const dynamicMatch = [...dispatchedEvents].some(dispatched => dispatched.includes(baseName) || baseName.includes(dispatched.replace(/\{[^}]*\}/g, '')));
    check(dispatchedEvents.has(baseName) || dynamicMatch, `Documented event "${eventName}" is never dispatched in component source.`);
});

// Documented tokens must appear in the component source CSS.
const tokenClaims = [...((specBlock && specBlock[1]) || '').matchAll(/var:\s*'(--[\w-]+)'/g)].map(match => match[1]);
tokenClaims.forEach(token => {
    check(componentSource.includes(token), `Documented token ${token} is not consumed by any component source.`);
});

// Documented boolean attributes must be observed or styled by the component.
const booleanAttrClaims = [...((specBlock && specBlock[1]) || '').matchAll(/attr:\s*'(\w[\w-]*)',\s*type:\s*'boolean'/g)].map(match => match[1]);
booleanAttrClaims.forEach(attr => {
    const observed = componentSource.includes(`'${attr}'`);
    const styled = componentSource.includes(`[disabled]`) || componentSource.includes(`[${attr}]`);
    check(observed || styled, `Documented boolean attribute "${attr}" is neither observed nor styled in component source.`);
});

// Spinner width must use the real token, not a typo.
check(!componentSource.includes('var(--weight)'), 'Spinner must not reference the nonexistent --weight token.');
check(!componentSource.includes("'mutiple'"), 'File input must not set the misspelled mutiple attribute.');
check(/removeEventListener\('click', this\.handleClick\)/.test(componentSource), 'Checkbox cleanup must remove the click listener it added.');
check(/role', 'switch'/.test(componentSource), 'Switch must expose role="switch" for assistive technology.');
check(/pauseAutoPlay/.test(componentSource) && /focusin/.test(componentSource), 'Carousel autoplay must pause on hover and focus as documented.');

const report = {
    generatedAt: new Date().toISOString(),
    status: failures.length ? 'failed' : 'passed',
    coverage: {
        shippedComponents: components.length,
        standaloneComponents: standaloneComponents.length,
        childComponents: childComponents.length,
        registeredComponents: registeredTags.size,
        specEntries: specTags.length,
        liveSpecDemos: demos,
        expectedCasesPerComponent: Object.fromEntries(Object.entries(families).map(([category, family]) => [category, family.cases.length])),
        totalExpectedCases: rows.reduce((total, row) => total + row.expectedCases.length, 0),
        coveredComponents: rows.filter(row => row.status === 'covered').length,
    },
    reviewerTracks: ['demo inventory', 'keyboard outcomes', 'state outcomes', 'events', 'accessibility', 'responsive behavior', 'motion/reduced motion', 'markup/documentation'],
    components: rows,
    failures,
    limitations: [
        'This Node runner verifies coverage contracts and source evidence. Browser execution of every action requires Playwright or the VS Code browser harness.',
        'Visual pixel approval remains evidence-based through browser screenshots, not a CSS string check.',
        'Carousel browser assertions must verify assigned slide count, slide overflow/width, visible indicators, named controls, and ArrowLeft/ArrowRight scroll direction.',
    ],
};

const outputPath = path.join(root, 'design-system/evidence/verification/interaction-coverage.json');
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify(report, null, 2));
process.exitCode = failures.length ? 1 : 0;
