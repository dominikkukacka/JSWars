/*
 * Copyright (c) 2014. 
 *
 * @author Andy Tang
 */
(function characterSpec(whereIt) {
    'use strict';

    describe('Character Model', function characterModelSpec() {

        var GameObjectModel;

        beforeEach(module('jsWars'));

        beforeEach(inject(function injection(GameObject) {
            GameObjectModel = GameObject;
        }));

        whereIt('should be able to retrieve the stats of an game object',
            function retrieveStats(hp, defence, sizeX, sizeY) {
                var gameObject = new GameObjectModel(hp, defence, sizeX, sizeY);
                expect(gameObject.getHp()).toEqual(hp);
                expect(gameObject.getDefence()).toEqual(defence);
                expect(gameObject.getSizeX()).toEqual(sizeX);
                expect(gameObject.getSizeY()).toEqual(sizeY);
            }, [
                {
                    hp: 100,
                    defence: 10,
                    sizeX: 1,
                    sizeY: 1
                },
                {
                    hp: 1000,
                    defence: 50,
                    sizeX: 5,
                    sizeY: 5
                }
            ]);

        it('should not be able to attack or move', function checkAttackAndMovement() {
            var gameObject = new GameObjectModel();
            expect(gameObject.canMove()).toEqual(false);
            expect(gameObject.canAttack()).toEqual(false);
        });
    });
}(window.whereIt));