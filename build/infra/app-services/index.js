"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var aws = require("@pulumi/aws");
var k8s = require("@pulumi/kubernetes");
var pulumi = require("@pulumi/pulumi");
var random = require("@pulumi/random");
var config_1 = require("./config");
var projectName = pulumi.getProject();
var privateSubnetIds = config_1.config.privateSubnetIds;
var securityGroupIds = config_1.config.securityGroupIds;
var clusterName = config_1.config.clusterName;
// Generate a strong password for the Postgres DB.
var password = new random.RandomPassword(projectName + "-password", {
    length: 16,
    overrideSpecial: "_%@",
    special: true,
}).result;
// Create a Postgres DB instance of RDS.
var dbSubnets = new aws.rds.SubnetGroup(projectName + "-subnets", {
    subnetIds: privateSubnetIds
});
var db = new aws.rds.Instance("postgresdb", {
    engine: "postgres",
    instanceClass: "db.t2.micro",
    allocatedStorage: 20,
    engineVersion: "10.21",
    dbSubnetGroupName: dbSubnets.id,
    vpcSecurityGroupIds: securityGroupIds,
    name: "backenddb",
    username: "serviceaccount",
    password: password,
    skipFinalSnapshot: true,
});
// Create a Secret from the DB connection information.
var provider = new k8s.Provider("provider", { kubeconfig: config_1.config.kubeconfig });
var dbConn = new k8s.core.v1.Secret("postgres-db-conn", {
    data: {
        host: db.address.apply(function (addr) { return Buffer.from(addr).toString("base64"); }),
        port: db.port.apply(function (port) { return Buffer.of(port).toString("base64"); }),
        username: db.username.apply(function (user) { return Buffer.from(user).toString("base64"); }),
        password: password.apply(function (pass) { return Buffer.from(pass).toString("base64"); }),
    },
    metadata: {
        namespace: config_1.config.appsNamespaceName
    },
}, { provider: provider });
// Create a Redis instance.
var cacheSubnets = new aws.elasticache.SubnetGroup(projectName + "-cache-subnets", {
    subnetIds: privateSubnetIds,
});
var cacheCluster = new aws.elasticache.Cluster("cachecluster", {
    engine: "redis",
    nodeType: "cache.t2.micro",
    numCacheNodes: 1,
    subnetGroupName: cacheSubnets.id,
    securityGroupIds: securityGroupIds,
});
// Create a ConfigMap from the cache connection information.
var cacheConn = new k8s.core.v1.ConfigMap("redis-cache-conn", {
    data: {
        host: cacheCluster.cacheNodes[0].address.apply(function (addr) { return Buffer.from(addr).toString("base64"); }),
    },
    metadata: {
        namespace: config_1.config.appsNamespaceName
    },
}, { provider: provider });
//# sourceMappingURL=index.js.map