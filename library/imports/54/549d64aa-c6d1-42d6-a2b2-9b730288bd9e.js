"use strict";
cc._RF.push(module, '549d6SqxtFC1qKym3MCiL2e', 'turnleft');
// scripts/turnleft.js

'use strict';

// Learn cc.Class:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/class/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html

cc.Class({
    extends: cc.Component,

    properties: {
        player: {
            default: null,
            type: cc.Node
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        var self = this;
        var tstart = function tstart(event) {
            self.player.getComponent('player').accLeft = true;
            self.player.getComponent('player').accRight = false;
        };
        var tend = function tend(event) {
            self.player.getComponent('player').accLeft = false;
            console.log(" yeqinfu touch end");
        };

        this.node.on(cc.Node.EventType.TOUCH_END, tend, this);

        this.node.on(cc.Node.EventType.TOUCH_START, tstart, this);
    },
    start: function start() {}
}

// update (dt) {},
);

cc._RF.pop();