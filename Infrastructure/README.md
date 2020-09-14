# Infrastructure

## Table of Contents
- [Infrastructure](#infrastructure)
  - [Table of Contents](#table-of-contents)
  - [Contributors](#contributors)
  - [Prerequisites](#prerequisites)
  - [Versioning](#versioning)
    - [Terragrunt](#terragrunt)
    - [Terraform](#terraform)
  - [Environment Configuration](#environment-configuration)
    - [Access Key Identifier](#access-key-identifier)
    - [Access Key Secret](#access-key-secret)
    - [Environment Name](#environment-name)

## Contributors
The following project members are contributors to the infrastructure solution.
- **[Nick Mladenov](https://github.com/s3539747) - [s3539747](mailto:s3539747@student.rmit.edu.au)**

## Prerequisites
The following applications need to be installed prior to any deployment made against infrastructure.
- The thin wrapper **[Terragrunt](https://github.com/gruntwork-io/terragrunt/releases)** that provides additional tools for keeping configuration DRY, working with multiple Terraform modules, and managing remote state.
- The infrastructure as code (IaC) software **[Terraform](https://www.terraform.io/downloads.html)** is a tool for building, changing, and versioning infrastructure safely and efficiently.
- *Optionally a code editor such as **[Visual Studio Code](https://code.visualstudio.com)** for making development changes if any are necessary.*

When using *Visual Studio Code* as your Integrated Development Environment (IDE) the following extensions are recommended for installation.
- **[Terraform](https://marketplace.visualstudio.com/items?itemName=mauve.terraform)** provides you with the appropriate language modes for the IDE for intellisense support which is currently not extensively defined so be precautious.
- **[TODO Highlight](https://marketplace.visualstudio.com/items?itemName=wayou.vscode-todo-highlight)** is useful for quickly navigating to unimplemented features to ensure they're corrected prior to releasing any infrastructure depending on it.

## Versioning
The version is extremely important to keep consistent when it comes to management of persistent state due to a variety of changes which can corrupt the state when read and written to with conflicting versions.

### Terragrunt
TBC

### Terraform
TBC

## Environment Configuration
These environment variables are used by Terraform to successfully deploy into any given environment.

You can set the by using the following commands depending on your operating system.
- **Bash** = `export VARIABLE_NAME=value`
- **Powershell** = `$Env:VARIABLE_NAME="value"`
- **CMD** = `set VARIABLE_NAME=value`

### Access Key Identifier
The environment variable `AWS_ACCESS_KEY_ID` is **mandatory**. It represents the *AWS Access Key* from the credentials generated in the *AWS Console*.

### Access Key Secret
The environment variable `AWS_SECRET_ACCESS_KEY` is **mandatory**. It represents the *AWS Secret Key* from the credentials generated in the *AWS Console*.

### Environment Name
The environment variable `TF_VAR_ENVIRONMENT` is **optional**. It represents what *environment* you want to deploy your infrastructure into and must match one of the directories specified under `configuration` in the root directory. By **default** this is set to `development` which is associated with an environment that is known to never remain consistent due to it constantly changing