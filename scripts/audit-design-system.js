const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const read = relativePath => fs.readFileSync(path.join(root, relativePath), 'utf8');
const index = read('design-system/index.html');
const style = read('design-system/css/main.css');
const documentation = read('design-system/js/design-system.js');
const sourceComponents = read('components/components.js');
const findings = [];

const finding = (severity, lens, message, evidence) => findings.push({ severity, lens, message, evidence });
const lineOf = (text, offset) => text.slice(0, offset).split('\n').length;
const ids = [...index.matchAll(/\bid=["']([^"']+)["']/g)].map(match => ({ value: match[1], line: lineOf(index, match.index) }));
const hrefs = [...index.matchAll(/\bhref=["']([^"']+)["']/g)].map(match => ({ value: match[1], line: lineOf(index, match.index) }));
const headings = [...index.matchAll(/<h([1-6])\b[^>]*>([\s\S]*?)<\/h[1-6]>/gi)].map(match => ({
    level: Number(match[1]),
    text: match[2].replace(/<[^>]+>/g, '').replace(/&[^;]+;/g, '').trim().slice(0, 60),
    line: lineOf(index, match.index),
}));

const duplicateIds = ids.filter((item, index, all) => all.findIndex(candidate => candidate.value === item.value) !== index);
duplicateIds.forEach(item => finding('high', 'mechanical', `Duplicate id "${item.value}" can break labels, focus targets, and route selection.`, `design-system/index.html:${item.line}`));

const idSet = new Set(ids.map(item => item.value));
hrefs.filter(link => link.value.startsWith('#') && link.value.length > 1).forEach(link => {
    const target = link.value.slice(1);
    if (!idSet.has(target) && !target.startsWith('spec_')) finding('high', 'mechanical', `Hash link "${link.value}" has no static target.`, `design-system/index.html:${link.line}`);
});

hrefs.filter(link => link.value === '#' || link.value.trim() === '').forEach(link => finding('medium', 'interaction', 'Empty link target creates a dead or confusing interaction.', `design-system/index.html:${link.line}`));

[...index.matchAll(/<img\b([^>]*)>/gi)].forEach(match => {
    if (!/\balt=["']/i.test(match[1])) finding('high', 'accessibility', 'Image is missing an alt attribute.', `design-system/index.html:${lineOf(index, match.index)}`);
});

[...index.matchAll(/<button\b([^>]*)>([\s\S]*?)<\/button>/gi)].forEach(match => {
    const attrs = match[1];
    const content = match[2].replace(/<[^>]+>/g, '').replace(/&[^;]+;/g, '').trim();
    if (!content && !/\baria-label=["'][^"']+/i.test(attrs) && !/\btitle=["'][^"']+/i.test(attrs)) {
        finding('high', 'accessibility', 'Icon-only button has no accessible name.', `design-system/index.html:${lineOf(index, match.index)}`);
    }
});

[...index.matchAll(/<a\b([^>]*)>/gi)].forEach(match => {
    const attrs = match[1];
    if (/target=["']_blank["']/i.test(attrs) && !/rel=["'][^"']*noopener/i.test(attrs)) finding('high', 'security', 'New-tab link is missing rel="noopener".', `design-system/index.html:${lineOf(index, match.index)}`);
});

const headingJumpIndex = headings.findIndex((heading, index) => index > 0 && heading.level - headings[index - 1].level > 1);
if (headingJumpIndex > -1) {
    const previous = headings[headingJumpIndex - 1];
    const current = headings[headingJumpIndex];
    finding('medium', 'accessibility', `Heading hierarchy jumps from h${previous.level} "${previous.text}" to h${current.level} "${current.text}".`, `design-system/index.html:${current.line}`);
}
if (!/<main\b/i.test(index)) finding('high', 'accessibility', 'Documentation pages need a main landmark.', 'design-system/index.html');
if (!/prefers-reduced-motion/i.test(style)) finding('high', 'motion', 'Motion styles have no prefers-reduced-motion override.', 'design-system/css/main.css');
if (!/:focus-visible/i.test(style)) finding('high', 'accessibility', 'Keyboard focus styles are not declared with :focus-visible.', 'design-system/css/main.css');
if (!/button:focus-visible/i.test(style)) finding('high', 'accessibility', 'Native documentation buttons need a visible keyboard focus treatment.', 'design-system/css/main.css');
if (!/data-theme/.test(index) || !/data-theme/.test(style)) finding('medium', 'visual', 'Theme state is not represented consistently in markup and CSS.', 'index.html / main.css');

const rawHex = [...style.matchAll(/#[0-9a-f]{3,8}\b/gi)].filter(match => !/#[0-9a-f]{3,8}\b/i.test(match[0]) || !match[0].startsWith('#0')).length;
if (rawHex > 12) finding('medium', 'visual', `${rawHex} raw colour literals remain in documentation CSS; token usage should be reviewable.`, 'design-system/css/main.css');

const componentBlock = documentation.match(/const components = \[([\s\S]*?)\n  \];/);
const specBlock = documentation.match(/const specs = \[([\s\S]*?)\n  \];/);
const componentEntries = componentBlock ? [...componentBlock[1].matchAll(/name:\s*'([^']+)'[^\n]*tag:\s*'([^']+)'[^\n]*cat:\s*'([^']+)'(?:[^\n]*parent:\s*'([^']+)')?/g)].map(match => ({ name: match[1], tag: match[2], parent: match[4] || null })) : [];
const specEntries = specBlock ? [...specBlock[1].matchAll(/tag:\s*['"]([^'"]+)['"]/g)].map(match => ({ tag: match[1] })) : [];
const specTags = new Set(specEntries.map(entry => entry.tag));
const registeredTags = new Set([...sourceComponents.matchAll(/customElements\.define\(['"]([^'"]+)/g)].map(match => match[1]));
const standaloneEntries = componentEntries.filter(entry => !entry.parent);
const childEntries = componentEntries.filter(entry => entry.parent);
standaloneEntries.filter(entry => !specTags.has(entry.tag)).forEach(entry => finding('high', 'documentation', `Component "${entry.name}" has no matching full spec entry.`, `tag: ${entry.tag}`));
componentEntries.filter(entry => !registeredTags.has(entry.tag)).forEach(entry => finding('high', 'mechanical', `Component "${entry.name}" is listed but not registered with customElements.define.`, `tag: ${entry.tag}`));
specEntries.filter(entry => entry.tag !== '—' && !registeredTags.has(entry.tag)).forEach(entry => finding('high', 'mechanical', `Spec tag <${entry.tag}> is not registered with customElements.define.`, `tag: ${entry.tag}`));
childEntries.filter(entry => specTags.has(entry.tag)).forEach(entry => finding('high', 'documentation', `Child component "${entry.name}" must be documented inside its parent, not as a standalone spec.`, `tag: ${entry.tag}`));
childEntries.filter(entry => !componentEntries.some(candidate => candidate.tag === entry.parent)).forEach(entry => finding('high', 'mechanical', `Child component "${entry.name}" references missing parent <${entry.parent}>.`, `tag: ${entry.tag}`));
const demoTags = new Set([...documentation.matchAll(/demo:\s*['"`]([\s\S]*?)['"`]/g)].flatMap(match => [...match[1].matchAll(/<([a-z][\w-]*-[\w-]+)(?:\s|>)/gi)].map(tag => tag[1])));
[...demoTags].filter(tag => !registeredTags.has(tag)).forEach(tag => finding('high', 'mechanical', `Demo markup contains unregistered custom element <${tag}>.`, 'design-system/js/design-system.js'));
if (standaloneEntries.length && specEntries.length < standaloneEntries.length) finding('high', 'documentation', `Standalone spec coverage is ${specEntries.length}/${standaloneEntries.length}.`, 'design-system/js/design-system.js');

const specFeatures = [
    ['design intent', 'intent'],
    ['interaction contract', 'interaction'],
    ['responsive behavior', 'responsive'],
    ['QA checklist', 'testing'],
    ['markup', 'spec-code-block'],
];
const featureChecks = specFeatures.map(([label, token]) => ({ label, present: documentation.includes(token) }));
featureChecks.filter(check => !check.present).forEach(check => finding('high', 'documentation', `All specs should expose a ${check.label} section.`, 'design-system/js/design-system.js'));

const report = {
    generatedAt: new Date().toISOString(),
    status: findings.some(item => ['critical', 'high'].includes(item.severity)) ? 'needs-attention' : 'reviewed',
    reviewerLenses: ['mechanical', 'visual', 'interaction', 'motion', 'accessibility', 'security', 'documentation'],
    metrics: {
        staticIds: ids.length,
        staticHashLinks: hrefs.filter(link => link.value.startsWith('#')).length,
        headingCount: headings.length,
        components: componentEntries.length,
        standaloneComponents: standaloneEntries.length,
        childComponents: childEntries.length,
        registeredComponents: registeredTags.size,
        specs: specEntries.length,
        rawColourLiterals: rawHex,
    },
    findings,
    evidence: {
        sourceFiles: ['design-system/index.html', 'design-system/css/main.css', 'design-system/js/design-system.js', 'components/components.js'],
        method: 'Static source inspection with line-level evidence. Pair with browser screenshots and keyboard interaction checks for visual and motion sign-off.',
    },
};

const outputPath = path.join(root, 'design-system/evidence/verification/audit-latest.json');
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify(report, null, 2));
process.exitCode = report.status === 'needs-attention' ? 1 : 0;
