$content = [IO.File]::ReadAllText("C:\Users\bugra\DEV\PREMPT\context\prempt_13_domain_30_module_dataset_part_2.md", [Text.Encoding]::UTF8)
$content = $content -replace '(?s)^.*?export const premptDomainsData: Record<string, DomainData> = ', ''
$content = $content -replace '(?s);\s*$', ''

# Remove all single line comments
$content = $content -replace '(?m)^\s*//.*$', ''

# Quote the keys (e.g., id: -> "id":)
$content = $content -replace '(?m)^\s*([a-zA-Z0-9_-]+)\s*:', '"$1":'

$content = $content -replace ',\s*\}', '}'
$content = $content -replace ',\s*\]', ']'

# Try to parse
try {
    $jsonObj = $content | ConvertFrom-Json
    Write-Host "Success parsing JSON!"
    
    foreach ($domain in $jsonObj.psobject.properties.name) {
        $trData = $jsonObj.$domain.tr | ConvertTo-Json -Depth 10 -Compress
        $enData = $jsonObj.$domain.en | ConvertTo-Json -Depth 10 -Compress
        
        $trPath = "src/data/modules_${domain}_tr.json"
        $enPath = "src/data/modules_${domain}_en.json"
        
        $utf8NoBom = New-Object System.Text.UTF8Encoding $false
        [IO.File]::WriteAllText("C:\Users\bugra\DEV\PREMPT\" + $trPath, $trData, $utf8NoBom)
        [IO.File]::WriteAllText("C:\Users\bugra\DEV\PREMPT\" + $enPath, $enData, $utf8NoBom)
        Write-Host "Written $domain data."
    }
} catch {
    Write-Host "Error parsing JSON:"
    Write-Host $_.Exception.Message
}
