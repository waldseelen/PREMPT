const fs = require('fs');
let content = fs.readFileSync('context/prempt_13_domain_30_module_dataset_part_2.md', 'utf8');
content = content.replace('name"SIEM ve', 'name: "SIEM ve');
const match = content.match(/export const premptDomainsData: Record<string, DomainData> = (\{[\s\S]*?\});?\s*$/);
const data = eval('(' + match[1] + ')');
fs.writeFileSync('scratch_blog.txt', Object.keys(data['blog']).join(', '));
