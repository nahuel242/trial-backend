# Trial-backend

Trial-backend is a simple TypeScript API used for demonstration purposes. It deploys into a Kubernetes Cluster and communicates with two datastores (PostgreSQL / Redis) to store sample information.

## Installation

Use the package manager [yarn](https://classic.yarnpkg.com/lang/en/docs/install/)
```bash
yarn install
yarn start
```

## Infrastructure dependencies

Dependant infrastructure declaration can be found in the following directories:

**infra/app-services** -> Supporting infrastructure for the trial-backend service (PostgreSQL db, Redis cache) defined with [Pulumi](https://www.pulumi.com/). Managed by the trial-backend team.

**infra/manifests** -> Application deployment files, defined with [Kustomize](https://kustomize.io/). Managed by the trial-backend team.

Base layer infrastructure (Networking, Kubernetes cluster, etc) is defined in the [trial-infra](https://github.com/nahuel242/trial-infra) repository. Managed by the platform team.



## Deployment workflows

### Infrastructure

Changes in the dependant infrastructure (**infra/app-services**) are managed by the following GitHub Actions:
- [infra-preview](https://github.com/nahuel242/trial-backend/blob/main/.github/workflows/infra-preview.yml): Runs with every Pull request to preview the infrastructure changes. The Pulumi bot  post back the result of the preview in the PR.
- [infra-staging-deploy](https://github.com/nahuel242/trial-backend/blob/main/.github/workflows/infra-staging-deploy.yml): Runs with every merge into the main branch, deploy the changes into the infrastructure.

There is an open [issue](https://github.com/nahuel242/trial-backend/issues/30) to improve this workflow by implementing the [Pulumi Kubernetes operator](https://www.pulumi.com/docs/guides/continuous-delivery/pulumi-kubernetes-operator/). This will provide an ArgoCD like experience for infrastructure deployments. 




### Trial-backend API

[ArgoCD](https://argoproj.github.io/cd/) takes care of reconciling the desired state of the service  by monitoring the **infra/manifests** folder.

This workflow has multiple triggers:

- Every change that requires a new image version triggers the [build](https://github.com/nahuel242/trial-backend/blob/main/.github/workflows/build.yml) workflow, which after testing, building and uploading a new image into the ERC repository, it commits a new image tag into the **infra/manifests/overlays/staging/kustomization.yaml** file, at which point ArgoCD takes care of applying that desired state.

- Changes in the **infra/manifests** folder (not associated with a new image tag) are automatically applied into the cluster by ArgoCD.

The ArgoCD self-healing feature prevents configuration drifts done  manually, by syncing the live cluster state with the desired configuration.


## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.


Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)