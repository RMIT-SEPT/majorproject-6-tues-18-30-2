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

.PARAMETER EnvironmentName
The name of the environment being published to change the configuration.

.PARAMETER ImageTag
The latest image tag to update the component with.

.INPUTS
None. You cannot pipe objects into Patch-Configuration.

.OUTPUTS
Artifact (files). Publish-Website creates and updates frontend artifacts.

.EXAMPLE
PS> Patch-Configuration -ApplicationInfrastructureName authentication -ImageTag 1.20201027.1

.NOTES
Version: 1.0
Author: Nicholas Mladenov
Creation Date: 16/10/20
Purpose/Change: Implemented the initial script to overcome development pains.
Usage: Ad-hoc invocation from a local machine or cloud CD instance.
#>
Param(
  [Parameter(Mandatory, Position=0)]
  [ValidateNotNullOrEmpty()]
  [Alias("InfrastructureName")]
  [string] $ApplicationInfrastructureName,
  [Parameter(Mandatory=$False)]
  [ValidateNotNullOrEmpty()]
  [string] $EnvironmentName = "development",
  [Parameter(Mandatory, Position=1)]
  [ValidateNotNullOrEmpty()]
  [Alias("Tag")]
  [string] $ImageTag
)

# Precursor: Validate Component Infrastructure Exists
$ApplicationInfrastructureDirectory = "$PSScriptRoot\..\components\$ApplicationInfrastructureName"
Write-Host "> Verifying application infrastructure exists... " -ForegroundColor Yellow -NoNewLine
if (-Not(Test-Path -Path $ApplicationInfrastructureDirectory)) {
  Write-Host "Failed." -ForegroundColor Red
  Write-Error "The application infrastructure `"$ApplicationInfrastructureName`" associated with the project `"$ApplicationProjectDirectory`" does not exist at `"$ApplicationInfrastructureDirectory`"."
  return
}
Write-Host "Succeeded." -ForegroundColor Green

# Precursor: Validate Component Configuration Exists
$ApplicationConfigurationFilePath = "$PSScriptRoot\..\configuration\$EnvironmentName\components\$ApplicationInfrastructureName.tfvars"
Write-Host "> Verifying application configuration exists... " -ForegroundColor Yellow -NoNewLine
if (-Not(Test-Path -Path $ApplicationConfigurationFilePath)) {
  Write-Host "Failed." -ForegroundColor Red
  Write-Error "The configuration associated with the $ApplicationInfrastructureName component does not exist at `"$ApplicationConfigurationFilePath`"."
  return
}
Write-Host "Succeeded." -ForegroundColor Green

# Reading Component Configuration
Write-Host "> Reading application configuration... " -ForegroundColor Yellow -NoNewLine
$ApplicationConfiguration = Get-Content -Path $ApplicationConfigurationFilePath -Encoding UTF8
Write-Host "Succeeded." -ForegroundColor Green

# Update Image Tag
Write-Host "> Updating application image tag... " -ForegroundColor Yellow -NoNewLine
for ($Index = 0; $Index -lt $ApplicationConfiguration.Length; $Index++) {
  # Precursor: Skip Unnecessary Line(s)
  if (-Not($ApplicationConfiguration[$Index] -Match "tag")) {
    continue
  }

  # Update Tag Value
  $ConfigurationTag = $ApplicationConfiguration[$Index].Split("=")
  $UpdatedImage = " `"$ImageTag`""
  $ConfigurationTag[1] = $UpdatedImage
  $ApplicationConfiguration[$Index] = $ConfigurationTag -Join "="
}
Set-Content -Path $ApplicationConfigurationFilePath -Value ($ApplicationConfiguration -Join "`n") -Encoding ASCII -NoNewline -Force
Write-Host "Succeeded." -ForegroundColor Green