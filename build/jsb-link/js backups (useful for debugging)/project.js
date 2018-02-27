require = function t(e, c, n) {
function i(a, s) {
if (!c[a]) {
if (!e[a]) {
var r = "function" == typeof require && require;
if (!s && r) return r(a, !0);
if (o) return o(a, !0);
var u = new Error("Cannot find module '" + a + "'");
throw u.code = "MODULE_NOT_FOUND", u;
}
var p = c[a] = {
exports: {}
};
e[a][0].call(p.exports, function(t) {
var c = e[a][1][t];
return i(c || t);
}, p, p.exports, t, e, c, n);
}
return c[a].exports;
}
for (var o = "function" == typeof require && require, a = 0; a < n.length; a++) i(n[a]);
return i;
}({
game: [ function(t, e, c) {
"use strict";
cc._RF.push(e, "57eb4arpWxEf7V9yWQtmR3n", "game");
cc.Class({
extends: cc.Component,
properties: {
starPrefab: {
default: null,
type: cc.Prefab
},
maxStarDuration: 0,
minStarDuration: 0,
ground: {
default: null,
type: cc.Node
},
turnleft: {
default: null,
type: cc.Node
},
turnright: {
default: null,
type: cc.Node
},
player: {
default: null,
type: cc.Node
},
scoreDisplay: {
default: null,
type: cc.Label
},
scoreAudio: {
default: null,
url: cc.AudioClip
}
},
onLoad: function() {
this.groundY = this.ground.y + this.ground.height / 2;
this.spawnNewStar();
this.timer = 0;
this.starDuration = 0;
this.spawnNewStar();
this.score = 0;
},
spawnNewStar: function() {
var t = cc.instantiate(this.starPrefab);
this.node.addChild(t);
t.setPosition(this.getNewStarPosition());
t.getComponent("star").game = this;
this.starDuration = this.minStarDuration + cc.random0To1() * (this.maxStarDuration - this.minStarDuration);
this.timer = 0;
},
getNewStarPosition: function() {
var t = 0, e = this.groundY + cc.random0To1() * this.player.getComponent("player").jumpHeight + 50, c = this.node.width / 2;
t = cc.randomMinus1To1() * c;
return cc.p(t, e);
},
gainScore: function() {
this.score += 1;
this.scoreDisplay.string = "Score: " + this.score.toString();
cc.audioEngine.playEffect(this.scoreAudio, !1);
},
update: function(t) {
this.timer > this.starDuration ? this.gameOver() : this.timer += t;
},
gameOver: function() {
this.player.stopAllActions();
cc.director.loadScene("game");
}
});
cc._RF.pop();
}, {} ],
player: [ function(t, e, c) {
"use strict";
cc._RF.push(e, "8d6e4DjGLRMlot92ZwA0H56", "player");
cc.Class({
extends: cc.Component,
properties: {
jumpHeight: 0,
jumpDuration: 0,
maxMoveSpeed: 0,
accel: 0,
jumpAudio: {
default: null,
url: cc.AudioClip
},
scoreAudio: {
default: null,
url: cc.AudioClip
}
},
setJumpAction: function() {
var t = cc.moveBy(this.jumpDuration, cc.p(0, this.jumpHeight)).easing(cc.easeCubicActionOut()), e = cc.moveBy(this.jumpDuration, cc.p(0, -this.jumpHeight)).easing(cc.easeCubicActionIn()), c = cc.callFunc(this.playJumpSound, this);
return cc.repeatForever(cc.sequence(t, e, c));
},
playJumpSound: function() {
cc.audioEngine.playEffect(this.jumpAudio, !1);
},
setInputControl: function() {
var t = this;
cc.eventManager.addListener({
event: cc.EventListener.KEYBOARD,
onKeyPressed: function(e, c) {
switch (e) {
case cc.KEY.a:
t.accLeft = !0;
t.accRight = !1;
break;

case cc.KEY.d:
t.accLeft = !1;
t.accRight = !0;
}
},
onKeyReleased: function(e, c) {
switch (e) {
case cc.KEY.a:
t.accLeft = !1;
break;

case cc.KEY.d:
t.accRight = !1;
}
}
}, t.node);
},
onLoad: function() {
this.jumpAction = this.setJumpAction();
this.node.runAction(this.jumpAction);
this.accLeft = !1;
this.accRight = !1;
this.xSpeed = 0;
console.log("normal");
this.setInputControl();
},
start: function() {},
update: function(t) {
this.accLeft ? this.xSpeed -= this.accel * t : this.accRight && (this.xSpeed += this.accel * t);
Math.abs(this.xSpeed) > this.maxMoveSpeed && (this.xSpeed = this.maxMoveSpeed * this.xSpeed / Math.abs(this.xSpeed));
this.node.x += this.xSpeed * t;
}
});
cc._RF.pop();
}, {} ],
star: [ function(t, e, c) {
"use strict";
cc._RF.push(e, "b6c0684DYNAeYjofmiXuPww", "star");
cc.Class({
extends: cc.Component,
properties: {
pickRadius: 0
},
getPlayerDistance: function() {
var t = this.game.player.getPosition();
return cc.pDistance(this.node.position, t);
},
onPicked: function() {
this.game.spawnNewStar();
this.game.gainScore();
this.node.destroy();
},
update: function(t) {
if (this.getPlayerDistance() < this.pickRadius) this.onPicked(); else {
var e = 1 - this.game.timer / this.game.starDuration;
this.node.opacity = 50 + Math.floor(205 * e);
}
},
start: function() {}
});
cc._RF.pop();
}, {} ],
turnleft: [ function(t, e, c) {
"use strict";
cc._RF.push(e, "549d6SqxtFC1qKym3MCiL2e", "turnleft");
cc.Class({
extends: cc.Component,
properties: {
player: {
default: null,
type: cc.Node
}
},
onLoad: function() {
var t = this;
this.node.on(cc.Node.EventType.TOUCH_END, function(e) {
t.player.getComponent("player").accLeft = !1;
console.log(" yeqinfu touch end");
}, this);
this.node.on(cc.Node.EventType.TOUCH_START, function(e) {
t.player.getComponent("player").accLeft = !0;
t.player.getComponent("player").accRight = !1;
}, this);
},
start: function() {}
});
cc._RF.pop();
}, {} ],
turnright: [ function(t, e, c) {
"use strict";
cc._RF.push(e, "ee91cW/Vp9MKYpwuVZBiOl3", "turnright");
cc.Class({
extends: cc.Component,
properties: {
player: {
default: null,
type: cc.Node
}
},
onLoad: function() {
var t = this;
this.node.on(cc.Node.EventType.TOUCH_END, function(e) {
t.player.getComponent("player").accRight = !1;
console.log(" yeqinfu touch end");
}, this);
this.node.on(cc.Node.EventType.TOUCH_START, function(e) {
t.player.getComponent("player").accLeft = !1;
t.player.getComponent("player").accRight = !0;
}, this);
},
start: function() {}
});
cc._RF.pop();
}, {} ]
}, {}, [ "game", "player", "star", "turnleft", "turnright" ]);