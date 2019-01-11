'use strict';

const task = require(`./task${process.argv[2]}`);
task.task.run();