"use strict";
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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
var node_server_1 = require("@hono/node-server");
var hono_1 = require("hono");
var ws_1 = require("ws");
var client_1 = require("@prisma/client");
var extension_accelerate_1 = require("@prisma/extension-accelerate");
var prisma = new client_1.PrismaClient().$extends((0, extension_accelerate_1.withAccelerate)());
var app = new hono_1.Hono();
// Debounce function
function debounce(func, wait) {
    var timeout;
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (timeout)
            clearTimeout(timeout);
        timeout = setTimeout(function () { return func.apply(void 0, args); }, wait);
    };
}
// Assuming serve returns a ServerType
var server = (0, node_server_1.serve)(app, function (info) {
    console.log("Listening on http://localhost:".concat(info.port));
});
// Create WebSocket server using the server instance
var wss = new ws_1.WebSocketServer({ server: server });
var changesLog = [];
var logChange = debounce(function (id, type, value) { return __awaiter(void 0, void 0, void 0, function () {
    var error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, prisma.changeLog.create({
                        data: {
                            postId: id,
                            author: "author",
                            line: 0,
                            text: value,
                            timestamp: new Date(),
                        },
                    })];
            case 1:
                _a.sent();
                console.log("Change log entry created successfully");
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                console.error('Failed to create change log entry', error_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); }, 10000); // 10 seconds debounce
wss.on("connection", function connection(ws) {
    var _this = this;
    console.log("Client connected");
    ws.on("error", function (error) {
        console.error("WebSocket error:", error);
    });
    ws.on("close", function () {
        console.log("Client disconnected");
    });
    ws.on("message", function (data) { return __awaiter(_this, void 0, void 0, function () {
        var message, id, type, value, updatedPost, broadcastMessage_1, broadcastPromises_1, error_2, error_3;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 6, , 7]);
                    message = JSON.parse(data.toString());
                    console.log("Received message:", message);
                    id = message.id, type = message.type, value = message.value;
                    // Validate message fields
                    if (!id || !type || value === undefined) {
                        console.error("Invalid message format:", message);
                        return [2 /*return*/];
                    }
                    console.log("Updating post with id:", id);
                    console.log("Field to update:", type);
                    console.log("New value:", value);
                    return [4 /*yield*/, prisma.realTimePost.update({
                            where: { id: id },
                            data: (_a = {}, _a[type] = value, _a),
                        })];
                case 1:
                    updatedPost = _b.sent();
                    console.log("Post updated successfully:", updatedPost);
                    broadcastMessage_1 = JSON.stringify(message);
                    broadcastPromises_1 = [];
                    wss.clients.forEach(function (client) {
                        if (client.readyState === client.OPEN && client !== ws) {
                            broadcastPromises_1.push(new Promise(function (resolve, reject) {
                                client.send(broadcastMessage_1, function (err) {
                                    if (err) {
                                        console.error('Failed to send message:', err);
                                        reject(err);
                                    }
                                    else {
                                        resolve();
                                    }
                                });
                            }));
                        }
                    });
                    _b.label = 2;
                case 2:
                    _b.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, Promise.all(broadcastPromises_1)];
                case 3:
                    _b.sent();
                    console.log('Broadcast completed successfully');
                    return [3 /*break*/, 5];
                case 4:
                    error_2 = _b.sent();
                    console.error('Error during broadcasting:', error_2);
                    return [3 /*break*/, 5];
                case 5:
                    // Log the change with debounce
                    logChange(id, type, value);
                    return [3 /*break*/, 7];
                case 6:
                    error_3 = _b.sent();
                    console.error('Failed to process message or update database', error_3);
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    }); });
});
app.get('/changes-log', function (c) {
    return c.json(changesLog);
});
