# SEPT Infrastructure

## Table of Contents
- [SEPT Infrastructure](#sept-infrastructure)
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
  - [Building Application Artifacts](#building-application-artifacts)
    - [Frontend](#frontend)
    - [Backend](#backend)
  - [Deploying Core Infrastructure](#deploying-core-infrastructure)
    - [Locally](#locally)
    - [Pipeline](#pipeline)
  - [Deploying Application Infrastructure](#deploying-application-infrastructure)
    - [Locally](#locally-1)
  - [Pipeline](#pipeline-1)

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
This project was implemented with **[Terragrunt v0.25.0](https://github.com/gruntwork-io/terragrunt/releases/download/v{0}/terragrunt_linux_amd64)** which is also the present version commited into the `binaries/<operatingSystem>` directory as of 18/10/20.

### Terraform
This project was implemented with **[Terraform v0.13.3](https://releases.hashicorp.com/terraform/{0}/terraform_{0}_linux_amd64.zip)** which is also the present version commited into the `binaries/<operatingSystem>` directory as of 18/10/20.

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
The environment variable `TF_VAR_ENVIRONMENT` is **optional**. It represents what *environment* you want to deploy your infrastructure into and must match one of the directories specified under `configuration` in the root directory. By **default** this is set to `development` which is associated with an environment that is known to never remain consistent due to it constantly changing.

## Building Application Artifacts
An application artifact can be automatically build for each backed solution using the provided Publish-Application.ps1 script within the scripts directory.

This currently publishes the application you provided as an argument input into the appropriate artifact directory so that it can be automatically deployed through CI/CD or manually on a local machine by issuing the appropriate Terragrunt commands after configuring environment variables.

### Frontend
You can follow the steps below to publish all of the artifacts required for frontend deployment:

1. Optionally navigate to the `Infrastructure\scripts` directory in your terminal session or include the path before the script name.
2. Run the `Publish-Website.ps1` script with the `-ApplicationInfrastructureName` argument against the value `website` (which is the default) to build the artifacts for publishing the website.

You *don't* need to run these commands at all if you're using the **[pipelines in Azure DevOps](https://dev.azure.com/s3539747/SEPT/_build)** since all of these steps are completely automated end-to-end with various approval gates.

### Backend
You can follow the instructions underneath each of the applications to build their artifacts as this is controlled by the developer responsible for building the component. Although, just to paraphrase the deployment steps required:

1. Optionally navigate to the `BackEnd/sept-<componentName>` directory in your terminal session or include the path before any scripts/commands.
2. Run a `mvn build` against the backend component you want to publish.
3. Run a `mvn package` against the backend component you want to publish.
4. Use the `Dockerfile` to build the container image.
5. Authenticate against the `<component>` AWS ECR container registry; this is automatically done for you in the pipeline.
6. Push the container into the registry with a unique tag in the format of `1.YYYMMDD.R` where `R` is the revision you're publishing.

You *don't* need to run any of these commands at all if you're using the **[pipelines in Azure DevOps](https://dev.azure.com/s3539747/SEPT/_build)** since all of the backend steps are completely automated end-to-end with various approval gates.

## Deploying Core Infrastructure
The core infrastructure will automatically provision all of the essential cloud resources into your designated AWS account based on the environment variables set for programmatic access into AWS via IAM.

### Locally
The deployment steps locally are farily straightforward and use the binaries committed into the repository, so long as you've used git lfs to retrieve them out of GitHub you won't need to download anything. Otherwise, you can always refer to the instructions under [Versioning](#versioning) to install the appropriate binaries to your system.

The following steps will provision the necessary core resources into your AWS account:
1. Navigate to the `Infrastructure/core/dns` directory in your preferred terminal window.
2. Execute the command `terragrunt plan` directly in your terminal to preview the **DNS resources** about to be provisioned.
3. Once you're happy with the changes, you can now proceed with deployment using the `terragrunt apply -auto-approve` command.
4. Navigate into the `Infrastructure/core/orchestration` direcyory in the same terminal window.
5. Execute the command `terragrunt plan` directly in your terminal to preview the **EKS resources** about to be provisioned.
6. Once you're happy with the changes, you can now proceed with deployment using the `terragrunt apply -auto-approve` command.
7. This will setup a managed Kubernetes cluster for you with autoscaling and load balancing automatically which you can query using `kubectl` after running `aws eks --region ap-southeast-2 update-kubeconfig --name sept` to obtain the context.

Once you're finished with the resources you can clean them all up by repeating the directory navigation and executing `terragrunt destroy -auto-approve` in the opposite order you deployed them *(Orchestration first then DNS second)* to ensure they're cleaned up properly.

### Pipeline
The deployment steps are completely automated in this instance and controlled through **[Azure DevOps Pipelines](https://dev.azure.com/s3539747/SEPT/_build)** using the following steps:

1. Login to your **RMIT account** against Office 365 or when navigating to [Azure DevOps](https://dev.azure.com/).
2. Navigate to the **[Infrastructure Pipeline](https://dev.azure.com/s3539747/SEPT/_build?definitionId=7)** and select **Run Pipeline** in the top right section.
3. You can leave all the defaults in the side popup modal which will deploy the latest changes against `master`.
4. Wait for the build to finish then you can proceed to **approving the stages** for *planning* then *applying* the resources to **DNS**.
5. After you've deployed *DNS* you can then proceed to **approving the stages** for *planning* then *applying* the resources to **Orchestration**.

Once you're finished with the resources you can automatically clean them up by approving the *destroying* stage in the opposite order you deployed them *(Orchestration first then DNS second)* to ensure they're cleaned up properly.

## Deploying Application Infrastructure
The application infrastructure will automatically provision all of the application resources into your AWS EKS (Kubernets) instance as well as retrieve any secrets required by the applications for connecting into essential resources such as SQL databases or encrypting sensitive customer information.

### Locally
The deployment steps for applications are also completely automated so long as you've followed all of the aforementioned steps. Each of these steps will need to be **repeated for each application** inside of the `Infrastructure/components` directory in **any order** as none of them have dependencies on each other.

1. Navigate to the `Infrastructure/components/<applicationName>` directory in your preferred terminal window.
2. Execute the command `terragrunt plan` directly in your terminal to preview the changes about to be applied into Kubernetes for your selected application.
3. Once you're happy with the changes, you can proceed with deploying them inside of Kubernetes using the `terragrunt apply -auto-approve` command.
4. *Optionally* repeat the aforementioned steps for each of the applications you want to deploy inside of the Kubernetes cluster.

Once you're finished with the application you can remove them all from the cluster by iterating though each directory and executing the `terragrunt destroy -auto-approve` command in any order.

**Note:** *If you prefer a quicker approach, you can also run the `terragrunt apply-all -auto-approve` command inside of the `Infrastructure/components` directory to manage the dependencies automatically and deploy every component inside of the Kubernetes cluster.*

## Pipeline
The deployment steps for applications through the pipeline is identical to how we deployed *Infrastructure*, it's completelt controlled through **[Azure DevOps Pipelines](https://dev.azure.com/s3539747/SEPT/_build)** using the following steps:

1. *Optionally*, if you haven't already logged into your **RMIT account** against Office 365 or when navigating to [Azure DevOps](https://dev.azure.com/) do so now.
2. Navigate to one of the **[application pipelines in the list](https://dev.azure.com/s3539747/SEPT/_build)**.
3. Select **Run Pipeline** in the top right section of the screen then select the checkbox labeled **Skip Build** as we've already got the production image persisted in the configuration files.
4. Proceed with the deployment against the `master` branch *(the default)* by Selecting **Run** in the bottom right corner of the popup modal.
5. Wait for the build to finish then you can proceed to **approving the stages** for *planning* to see what's going to be applied inside of the cluster.
6. After the *plan* has completed you will be able to proceed with **approving the staged** for *applying* the changes inside of the Kubernetes cluster.
7. You will need to releat all of the above steps for **each application you want to deploy** inside of the Kubernetes cluster for functionality against the website.

Once you're finished with the resources you can automatically clean them up by approving the *destroying* stage in any order as there's no dependencies between any of the functional components; but you must ensure they're removed prior to any *core infrastructure* deployments otherwise the state will need to be manually cleaned up.