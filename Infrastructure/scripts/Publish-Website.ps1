<#
.SYNOPSIS
Publishes application artifacts for a website.

.DESCRIPTION
A continuous delivery assistant which is intended to publish application
artifacts associated with the website into its appropriate infrastructure
application artifact directory for deploying infrastructure into any
environment.

.PARAMETER ApplicationInfrastructureName
The associated infrastructure application directory name which is located
inside the apps infrastructure/apps directory of the repository; it is
important to consistently maintain character case-sensitivity.

.PARAMETER ApplicationArtifactName
The artifact name to publish the website into.

.INPUTS
None. You cannot pipe objects into Publish-Website.

.OUTPUTS
Artifact (files). Publish-Website creates and updates frontend artifacts.

.EXAMPLE
PS> Publish-Website

.NOTES
Version: 1.3
Author: Nicholas Mladenov
Creation Date: 24/05/20
Purpose/Change: Modifications to cater the SEPT project directory structure.
Usage: Ad-hoc invocation from a local machine or cloud CD instance.
#>
Param(
  [Parameter(Mandatory=$False, Position=0)]
  [ValidateNotNullOrEmpty()]
  [Alias("InfrastructureName")]
  [string] $ApplicationInfrastructureName = "website",
  [Parameter(Mandatory=$False, Position=1)]
  [ValidateNotNullOrEmpty()]
  [Alias("ArtifactName")]
  [string] $ApplicationArtifactName = "distributable"
)

# Precursor: Validate Frontend Project Exists
$ApplicationProjectDirectory = "$PSScriptRoot\..\..\FrontEnd"
Write-Host "> Verifying frontend project exists... " -ForegroundColor Yellow -NoNewLine
if (-Not(Test-Path -Path $ApplicationProjectDirectory)) {
  Write-Host "Failed." -ForegroundColor Red
  Write-Error "The solution associated with the frontend project does not exist at `"$ApplicationProjectDirectory`"."
  return
}
Write-Host "Succeeded." -ForegroundColor Green

# Precursor: Validate Component Infrastructure Exists
$ApplicationInfrastructureDirectory = "$PSScriptRoot\..\components\$ApplicationInfrastructureName"
Write-Host "> Verifying application infrastructure exists... " -ForegroundColor Yellow -NoNewLine
if (-Not(Test-Path -Path $ApplicationInfrastructureDirectory)) {
  Write-Host "Failed." -ForegroundColor Red
  Write-Error "The application infrastructure `"$ApplicationInfrastructureName`" associated with the project `"$ApplicationProjectDirectory`" does not exist at `"$ApplicationInfrastructureDirectory`"."
  return
}
Write-Host "Succeeded." -ForegroundColor Green

# Precursor: Ensure Artifact Directory Exists
$ApplicationArtifactDirectory = "$ApplicationInfrastructureDirectory\artifacts\$ApplicationArtifactName"
Write-Host "> Preparing a suitable location for the application artifact... " -ForegroundColor Yellow -NoNewLine
if (-Not(Test-Path -Path $ApplicationArtifactDirectory)) {
  New-Item -Path "$ApplicationInfrastructureDirectory\artifacts" -Name $ApplicationArtifactName -ItemType "Directory" -Force | Out-Null
}
Write-Host "Succeeded." -ForegroundColor Green

# Navigate Application Directory
Write-Host "> Navigating to the frontend solution directory... " -ForegroundColor Yellow -NoNewLine
Push-Location -Path $ApplicationProjectDirectory
Write-Host "Succeeded." -ForegroundColor Green

# Install Application Dependencies
Write-Host "> Installing the application dependencies... " -ForegroundColor Yellow -NoNewLine
& yarn install | Out-Null
Write-Host "Succeeded." -ForegroundColor Green

# Publish Application Artifact
$ApplicationArtifactPublishDirectory = "$ApplicationProjectDirectory\dist"
Write-Host "> Publishing the application artifact... " -ForegroundColor Yellow -NoNewLine
& yarn run build:ci | Out-Null
Write-Host "Succeeded." -ForegroundColor Green

# Navigate Old Directory
Write-Host "> Navigating back to the previous directory... " -ForegroundColor Yellow -NoNewLine
Pop-Location
Write-Host "Succeeded." -ForegroundColor Green

# Copy Application Artifact
Write-Host "> Copying application distributable artifact... " -ForegroundColor Yellow -NoNewLine
Copy-Item -Path "$ApplicationArtifactPublishDirectory\*" -Destination "$ApplicationArtifactDirectory\" -Recurse -Force
Write-Host "Succeeded." -ForegroundColor Green