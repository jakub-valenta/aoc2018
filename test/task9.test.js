'use strict';

const task = require('../src/task9.js');


test('first star example 1', () => {
  const game = new task.Game();
  game.parse('9 players; last marble is worth 25 points');
  expect(game.play(1)).toBe(32);
});

test('first star example 2', () => {
  const game = new task.Game();
  game.parse('10 players; last marble is worth 1618 points');
  expect(game.play(1)).toBe(8317);
});

test('first star example 3', () => {
  const game = new task.Game();
  game.parse('13 players; last marble is worth 7999 points');
  expect(game.play(1)).toBe(146373);
});

test('first star example 4', () => {
  const game = new task.Game();
  game.parse('17 players; last marble is worth 1104 points');
  expect(game.play(1)).toBe(2764);
});

test('first star example 5', () => {
  const game = new task.Game();
  game.parse('21 players; last marble is worth 6111 points');
  expect(game.play(1)).toBe(54718);
});

test('first star example 6', () => {
  const game = new task.Game();
  game.parse('30 players; last marble is worth 5807 points');
  expect(game.play(1)).toBe(37305);
});