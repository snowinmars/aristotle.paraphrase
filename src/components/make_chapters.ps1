$notesTemplate = 'const notes = `

<sup>(1)</sup> 

`;

export default notes;
'

$chapterTemplate = 'const notes = `



`;

export default notes;
'

function Get-NewFilename () {
    param (
        [string]$folder,
        [bool]$incrementBook = $false
    )

    $lastFilename = (Get-ChildItem $folder | Where-Object -Property Name -Match 'b\d+_c\d+.*\.js' | Sort-Object Name | Select-Object -Last 1 -Property Name).Name
    $regex = [regex]::match($lastFilename, 'b(\d+)_c(\d+)(.*)')
    $lastBookVersion = +$regex.Groups[1].Value
    $lastChapterVersion = +$regex.Groups[2].Value
    $postfix = $regex.Groups[3].Value

    if ($incrementBook) {
        $newNotesPrefix = "b$($lastBookVersion + 1)_c$($lastChapterVersion + 1)"
    } else {
        $newNotesPrefix = "b$($lastBookVersion)_c$($lastChapterVersion + 1)"
    }

    $newFilename = "$newNotesPrefix$postfix"

    return $newFilename
}

$newFilename = Get-NewFilename -folder 'Notes'
$notesTemplate | Out-File -Filepath "Notes\$newFilename"
Write-Host "Notes scaffolded to $newFilename"

$newFilename = Get-NewFilename -folder 'Origin'
$chapterTemplate | Out-File -Filepath "Origin\$newFilename"
Write-Host "Origin scaffolded to $newFilename"

$newFilename = Get-NewFilename -folder 'Paraphrase'
$chapterTemplate | Out-File -Filepath "Paraphrase\$newFilename"
Write-Host "Paraphrase scaffolded to $newFilename"