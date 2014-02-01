/*
 * Copyright (c) 2014. 
 *
 * @author Andy Tang
 */
(function GameSquareModel(angular, clazz) {
    'use strict';

    var app = angular.module('jsWars');

    app.factory('GameSquare', function GameSquareFactory() {
        return clazz(function GameSquare() {

            this.private = {
                x: null,
                y: null,
                gameObject: null,
                isOpened: false,
                isSelectingAttack: false,
                inMoveMode: false,
                inAttackMode: false,
                selectedSkill: null,
                getActionList: function getActionList() {
                    var list = [];
                    if (this.private.gameObject === null || !this.private.isOpened) {
                        return list;
                    }
                    if (this.private.gameObject.canMove()) {
                        list.push('move');
                    }
                    if (this.private.gameObject.canAttack()) {
                        list.push('attack');
                    }
                    return list;
                },
                getAttackList: function getAttackList() {
                    var list = [];
                    var gameObject = this.private.gameObject;
                    if (gameObject === null || !this.private.isSelectingAttack) {
                        return list;
                    }
                    if (gameObject.hasMoves()) {
                        list = gameObject.getMoves();
                    }
                    return list;
                }
            };

            this.public = {
                getX: function getX() {
                    return this.private.x;
                },
                getY: function getY() {
                    return this.private.y;
                },
                isOccupied: function isOccupied() {
                    return this.private.gameObject !== null;
                },
                getGameObject: function getGameObject() {
                    return this.private.gameObject;
                },
                setGameObject: function setGameObject(gameObject) {
                    this.private.gameObject = gameObject;
                },
                isOpened: function isOpened() {
                    return this.private.isOpened;
                },
                isSelectingAttack: function isSelectingAttack() {
                    return this.private.isSelectingAttack;
                },
                isInMoveMode: function isInMoveMode() {
                    return this.private.inMoveMode;
                },
                isInAttackMode: function isInAttackMode() {
                    return this.private.inAttackMode;
                },
                openActionPanel: function openActionPanel() {
                    this.private.isOpened = true;
                    return this.private.getActionList();
                },
                closeActionPanel: function closeActionPanel() {
                    this.private.isOpened = false;
                    this.public.stopMoveMode();
                    this.public.stopAttackMode();
                    this.public.stopSelectingAttack();
                },
                startMoveMode: function startMoveMode() {
                    this.private.inMoveMode = true;
                },
                stopMoveMode: function stopMoveMode() {
                    this.private.inMoveMode = false;
                },
                startAttackMode: function startAttackMode() {
                    this.private.inAttackMode = true;
                },
                stopAttackMode: function stopAttackMode() {
                    this.private.inAttackMode = false;
                },
                startSelectingAttack: function startSelectingAttack() {
                    this.private.isSelectingAttack = true;
                },
                stopSelectingAttack: function stopSelectingAttack() {
                    this.private.isSelectingAttack = false;
                },
                getActionList: function getActionList() {
                    return this.private.getActionList();
                },
                getAttackList: function getAttackList() {
                    return this.private.getAttackList();
                },
                selectSkill: function selectSkill(skillIndex) {
                    this.private.selectedSkill = this.private.getAttackList()[skillIndex] || null;
                    this.private.inAttackMode = true;
                    this.private.isSelectingAttack = false;
                },
                getSelectedSkill: function getSelectedSkill() {
                    return this.private.selectedSkill;
                },
                resolveAction: function resolveAction(action) {
                    if (action === 'move') {
                        this.public.startMoveMode();
                    } else if (action === 'attack') {
                        this.public.startSelectingAttack();
                    } else {
                        this.public.closeActionPanel();
                    }
                }
            };

            this.constructor = function constructor(x, y, gameObject) {
                this.private.x = x;
                this.private.y = y;
                this.private.gameObject = gameObject || null;
            };
        });
    });
}(window.angular, window.clazz));