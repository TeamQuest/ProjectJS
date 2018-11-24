var chai = require('chai'),
expect = chai.expect,
path = require('path');


// Tell chai that we'll be using the "should" style assertions.
chai.should();

// Import the Player & Phaser class.
var Character = require(path.join(__dirname, '../src/', 'player'));

describe('Player', () => {
	describe('#name', () => {
		let player;
		let playerName = 'Bob'

		beforeEach(() => {
			// Create a new Player object before every test.
			player = new Character(playerName);
		});

		it('return player name', () => {
			// This will fail if "player.name" does
			// not equal to Bob.
			player.name = playerName;
			player.name.should.equal(playerName);
		});

		it('player name can be changed', () => {
			// Assert that the width can be changed.
			let playerName = 'Tom'
			player.name = playerName;
			player.name.should.equal(playerName);
		});
	});

	describe('#hp', () => {
		let player;
		let playerName = 'Bob'
		let playerDefaultHp = 100;

		beforeEach(() => {
			player = new Character(playerName);
		});

		it('check default hp', () => {
			player.hp.should.equal(playerDefaultHp);
		});

	});

	describe('#speed', () => {
		let player;
		let playerName = 'Bob'
		let playerDefaultSpeed = 100;

		beforeEach(() => {
			player = new Character(playerName);
		});

		it('check default speed', () => {
			player._speed.should.equal(playerDefaultSpeed);
		});
	});

});
