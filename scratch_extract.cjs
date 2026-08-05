const fs = require('fs');

let content = fs.readFileSync('context/prempt_13_domain_30_module_dataset_part_2.md', 'utf8');

// Fix syntax error in file
content = content.replace('name"SIEM ve', 'name: "SIEM ve');

const match = content.match(/export const premptDomainsData: Record<string, DomainData> = (\{[\s\S]*?\});?\s*$/);

if (match) {
    const dataStr = match[1];
    // Evaluate the object
    const data = eval('(' + dataStr + ')');
    const domains = Object.keys(data);
    
    for (const domain of domains) {
        if (!data[domain].tr) console.error(`Missing tr for ${domain}`);
        if (!data[domain].en) console.error(`Missing en for ${domain}`);
        fs.writeFileSync(`src/data/modules_${domain}_tr.json`, JSON.stringify(data[domain].tr || [], null, 2), 'utf8');
        fs.writeFileSync(`src/data/modules_${domain}_en.json`, JSON.stringify(data[domain].en || [], null, 2), 'utf8');
        console.log(`Saved modules for ${domain}`);
    }
} else {
    console.error('Could not match premptDomainsData');
}
