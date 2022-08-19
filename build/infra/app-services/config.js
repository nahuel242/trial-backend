"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
var pulumi = require("@pulumi/pulumi");
var pulumiConfig = new pulumi.Config();
// Existing Pulumi stack reference in the format:
// <organization>/<project>/<stack> e.g. "myUser/myProject/dev"
var infraStackRef = new pulumi.StackReference(pulumiConfig.require("infraStackRef"));
var clusterStackRef = new pulumi.StackReference(pulumiConfig.require("clusterStackRef"));
exports.config = {
    // Infra
    privateSubnetIds: infraStackRef.getOutput("privateSubnetIds"),
    publicSubnetIds: infraStackRef.getOutput("publicSubnetIds"),
    // Cluster
    kubeconfig: clusterStackRef.getOutput("kubeconfig"),
    clusterName: clusterStackRef.getOutput("clusterName"),
    securityGroupIds: clusterStackRef.getOutput("securityGroupIds"),
    clusterSvcsNamespaceName: clusterStackRef.getOutput("clusterSvcsNamespaceName"),
    appSvcsNamespaceName: clusterStackRef.getOutput("appSvcsNamespaceName"),
    appsNamespaceName: clusterStackRef.getOutput("appsNamespaceName"),
};
//# sourceMappingURL=config.js.map