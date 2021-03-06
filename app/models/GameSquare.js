/*
 * Copyright (c) 2014. 
 *
 * @author Andy Tang
 */
(function GameSquareModel(angular, clazz) {
    'use strict';

    var app = angular.module('jsWars');

    app.factory('GameSquare', function GameSquareFactory(Character) {
        return clazz(function GameSquare() {

            this.private = {
                x: {
                    getSet: null
                },
                y: {
                    getSet: null
                },
                gameObject: {
                    getSet: null
                },
                isOpened: false,
                isSelectingAttack: false,
                inMoveMode: false,
                inAttackMode: false,
                selectedSkill: {
                    get: null
                },
                getActionList: function getActionList() {
                    var list = [];
                    if (this.private.gameObject === null || !this.private.isOpened || !this.
                        private.gameObject.isActive()) {

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
                    if (!this.private.isSelectingAttack) {
                        return list;
                    }
                    if (gameObject.hasMoves()) {
                        list = gameObject.getMoves();
                    }
                    return list;
                }
            };

            this.public = {
                isOccupied: function isOccupied() {
                    return this.private.gameObject !== null;
                },
                isOpened: function isOpened() {
                    return this.private.isOpened;
                },
                hasAttacked: function hasAttacked() {
                    var gameObject = this.private.gameObject;
                    if (gameObject instanceof Character) {
                        return gameObject.hasAttacked();
                    }
                    return false;
                },
                hasMoved: function hasMoved() {
                    var gameObject = this.private.gameObject;
                    if (gameObject instanceof  Character) {
                        return gameObject.hasMoved();
                    }
                    return false;
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
                    var gameObject = this.private.gameObject;
                    if (gameObject instanceof Character && !gameObject.hasMoved()) {
                        this.private.inMoveMode = true;
                    } else {
                        this.private.inMoveMode = false;
                    }
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
                    var gameObject = this.private.gameObject;
                    if (gameObject instanceof Character && !gameObject.hasAttacked()) {
                        this.private.isSelectingAttack = true;
                    } else {
                        this.private.isSelectingAttack = false;
                    }
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
                resolveAction: function resolveAction(action) {
                    if (action === 'move') {
                        this.public.startMoveMode();
                    } else if (action === 'attack') {
                        this.public.startSelectingAttack();
                    } else {
                        this.public.closeActionPanel();
                    }
                },
                shouldDisable: function shouldDisable(action) {
                    if (action === 'attack') {
                        return this.public.hasAttacked();
                    } else if (action === 'move') {
                        return this.public.hasMoved();
                    }
                    return false;
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