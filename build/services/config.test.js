var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
describe("config tests", function () {
    describe("getConfig", function () {
        var env;
        var getConfig;
        beforeAll(function () {
            env = JSON.stringify(process.env);
        });
        beforeEach(function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        jest.resetModules();
                        return [4 /*yield*/, Promise.resolve().then(function () { return require("./config"); }).then(function (c) { return c.getConfig; })];
                    case 1:
                        getConfig = _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        afterEach(function () {
            process.env = JSON.parse(env);
        });
        describe("redis", function () {
            it("should have a default config", function () { return __awaiter(_this, void 0, void 0, function () {
                var config;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, getConfig()];
                        case 1:
                            config = _a.sent();
                            expect(config.redis).toMatchInlineSnapshot("\n          Object {\n            \"host\": \"localhost\",\n            \"password\": undefined,\n            \"port\": 6379,\n          }\n        ");
                            return [2 /*return*/];
                    }
                });
            }); });
            it("should allow modifications to host", function () { return __awaiter(_this, void 0, void 0, function () {
                var config;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            process.env.REDIS_HOST = "foo";
                            return [4 /*yield*/, getConfig()];
                        case 1:
                            config = _a.sent();
                            expect(config.redis).toMatchInlineSnapshot("\n          Object {\n            \"host\": \"foo\",\n            \"password\": undefined,\n            \"port\": 6379,\n          }\n        ");
                            return [2 /*return*/];
                    }
                });
            }); });
            it("should allow modifications to port", function () { return __awaiter(_this, void 0, void 0, function () {
                var config;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            process.env.REDIS_PORT = "1337";
                            return [4 /*yield*/, getConfig()];
                        case 1:
                            config = _a.sent();
                            expect(config.redis).toMatchInlineSnapshot("\n          Object {\n            \"host\": \"localhost\",\n            \"password\": undefined,\n            \"port\": 1337,\n          }\n        ");
                            return [2 /*return*/];
                    }
                });
            }); });
            it("should allow modifications to password", function () { return __awaiter(_this, void 0, void 0, function () {
                var config;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            process.env.REDIS_PASSWORD = "bestpassever";
                            return [4 /*yield*/, getConfig()];
                        case 1:
                            config = _a.sent();
                            expect(config.redis).toMatchInlineSnapshot("\n          Object {\n            \"host\": \"localhost\",\n            \"password\": \"bestpassever\",\n            \"port\": 6379,\n          }\n        ");
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        describe("db", function () {
            it("should have a default config", function () { return __awaiter(_this, void 0, void 0, function () {
                var config;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, getConfig()];
                        case 1:
                            config = _a.sent();
                            expect(config.db).toMatchInlineSnapshot("\n          Object {\n            \"cli\": Object {\n              \"entitiesDir\": \"src/entity\",\n              \"migrationsDir\": \"src/migration\",\n              \"subscribersDir\": \"src/subscriber\",\n            },\n            \"database\": \"pgdb\",\n            \"entities\": Array [\n              \"src/entity/**/*.ts\",\n            ],\n            \"host\": \"localhost\",\n            \"logging\": false,\n            \"migrations\": Array [\n              \"src/migration/**/*.ts\",\n            ],\n            \"password\": \"pgpass\",\n            \"port\": 5432,\n            \"subscribers\": Array [\n              \"src/subscriber/**/*.ts\",\n            ],\n            \"synchronize\": true,\n            \"type\": \"postgres\",\n            \"username\": \"pguser\",\n          }\n        ");
                            return [2 /*return*/];
                    }
                });
            }); });
            it("should allow modifications to host", function () { return __awaiter(_this, void 0, void 0, function () {
                var config;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            process.env.TYPEORM_HOST = "foo";
                            return [4 /*yield*/, getConfig()];
                        case 1:
                            config = _a.sent();
                            expect(config.db).toMatchInlineSnapshot("\n          Object {\n            \"cli\": Object {\n              \"entitiesDir\": \"src/entity\",\n              \"migrationsDir\": \"src/migration\",\n              \"subscribersDir\": \"src/subscriber\",\n            },\n            \"database\": \"pgdb\",\n            \"entities\": Array [\n              \"src/entity/**/*.ts\",\n            ],\n            \"host\": \"foo\",\n            \"logging\": false,\n            \"migrations\": Array [\n              \"src/migration/**/*.ts\",\n            ],\n            \"password\": \"pgpass\",\n            \"port\": 5432,\n            \"subscribers\": Array [\n              \"src/subscriber/**/*.ts\",\n            ],\n            \"synchronize\": true,\n            \"type\": \"postgres\",\n            \"username\": \"pguser\",\n          }\n        ");
                            return [2 /*return*/];
                    }
                });
            }); });
            it("should allow modifications to username", function () { return __awaiter(_this, void 0, void 0, function () {
                var config;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            process.env.TYPEORM_USERNAME = "runey886";
                            return [4 /*yield*/, getConfig()];
                        case 1:
                            config = _a.sent();
                            expect(config.db).toMatchInlineSnapshot("\n          Object {\n            \"cli\": Object {\n              \"entitiesDir\": \"src/entity\",\n              \"migrationsDir\": \"src/migration\",\n              \"subscribersDir\": \"src/subscriber\",\n            },\n            \"database\": \"pgdb\",\n            \"entities\": Array [\n              \"src/entity/**/*.ts\",\n            ],\n            \"host\": \"localhost\",\n            \"logging\": false,\n            \"migrations\": Array [\n              \"src/migration/**/*.ts\",\n            ],\n            \"password\": \"pgpass\",\n            \"port\": 5432,\n            \"subscribers\": Array [\n              \"src/subscriber/**/*.ts\",\n            ],\n            \"synchronize\": true,\n            \"type\": \"postgres\",\n            \"username\": \"runey886\",\n          }\n        ");
                            return [2 /*return*/];
                    }
                });
            }); });
            it("should allow modifications to password", function () { return __awaiter(_this, void 0, void 0, function () {
                var config;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            process.env.TYPEORM_PASSWORD = "hunter2";
                            return [4 /*yield*/, getConfig()];
                        case 1:
                            config = _a.sent();
                            expect(config.db).toMatchInlineSnapshot("\n          Object {\n            \"cli\": Object {\n              \"entitiesDir\": \"src/entity\",\n              \"migrationsDir\": \"src/migration\",\n              \"subscribersDir\": \"src/subscriber\",\n            },\n            \"database\": \"pgdb\",\n            \"entities\": Array [\n              \"src/entity/**/*.ts\",\n            ],\n            \"host\": \"localhost\",\n            \"logging\": false,\n            \"migrations\": Array [\n              \"src/migration/**/*.ts\",\n            ],\n            \"password\": \"hunter2\",\n            \"port\": 5432,\n            \"subscribers\": Array [\n              \"src/subscriber/**/*.ts\",\n            ],\n            \"synchronize\": true,\n            \"type\": \"postgres\",\n            \"username\": \"pguser\",\n          }\n        ");
                            return [2 /*return*/];
                    }
                });
            }); });
            it("should allow modifications to database", function () { return __awaiter(_this, void 0, void 0, function () {
                var config;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            process.env.TYPEORM_DATABASE = "myfirstdb";
                            return [4 /*yield*/, getConfig()];
                        case 1:
                            config = _a.sent();
                            expect(config.db).toMatchInlineSnapshot("\n          Object {\n            \"cli\": Object {\n              \"entitiesDir\": \"src/entity\",\n              \"migrationsDir\": \"src/migration\",\n              \"subscribersDir\": \"src/subscriber\",\n            },\n            \"database\": \"myfirstdb\",\n            \"entities\": Array [\n              \"src/entity/**/*.ts\",\n            ],\n            \"host\": \"localhost\",\n            \"logging\": false,\n            \"migrations\": Array [\n              \"src/migration/**/*.ts\",\n            ],\n            \"password\": \"pgpass\",\n            \"port\": 5432,\n            \"subscribers\": Array [\n              \"src/subscriber/**/*.ts\",\n            ],\n            \"synchronize\": true,\n            \"type\": \"postgres\",\n            \"username\": \"pguser\",\n          }\n        ");
                            return [2 /*return*/];
                    }
                });
            }); });
            it("should allow modifications to port", function () { return __awaiter(_this, void 0, void 0, function () {
                var config;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            process.env.TYPEORM_PORT = "8080";
                            return [4 /*yield*/, getConfig()];
                        case 1:
                            config = _a.sent();
                            expect(config.db).toMatchInlineSnapshot("\n          Object {\n            \"cli\": Object {\n              \"entitiesDir\": \"src/entity\",\n              \"migrationsDir\": \"src/migration\",\n              \"subscribersDir\": \"src/subscriber\",\n            },\n            \"database\": \"pgdb\",\n            \"entities\": Array [\n              \"src/entity/**/*.ts\",\n            ],\n            \"host\": \"localhost\",\n            \"logging\": false,\n            \"migrations\": Array [\n              \"src/migration/**/*.ts\",\n            ],\n            \"password\": \"pgpass\",\n            \"port\": 8080,\n            \"subscribers\": Array [\n              \"src/subscriber/**/*.ts\",\n            ],\n            \"synchronize\": true,\n            \"type\": \"postgres\",\n            \"username\": \"pguser\",\n          }\n        ");
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        describe("server", function () {
            it("should have a default config", function () { return __awaiter(_this, void 0, void 0, function () {
                var config;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, getConfig()];
                        case 1:
                            config = _a.sent();
                            expect(config.server).toMatchInlineSnapshot("\n          Object {\n            \"port\": 3030,\n          }\n        ");
                            return [2 /*return*/];
                    }
                });
            }); });
            it("should allow modifications to port", function () { return __awaiter(_this, void 0, void 0, function () {
                var config;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            process.env.PORT = "1337";
                            return [4 /*yield*/, getConfig()];
                        case 1:
                            config = _a.sent();
                            expect(config.server).toMatchInlineSnapshot("\n          Object {\n            \"port\": 1337,\n          }\n        ");
                            return [2 /*return*/];
                    }
                });
            }); });
        });
    });
});
//# sourceMappingURL=config.test.js.map