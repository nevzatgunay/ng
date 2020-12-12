#!/usr/bin/env node
'use strict';
var c = require('chalk');
var link = require('terminal-link');
var img = require('terminal-image');
var got = require('got');
var ww = require('word-wrap');
var iq = require('inquirer');
var opn = require('open');

got(
  'https://avatars2.githubusercontent.com/u/4747302?s=400&u=2389703f58c542159151ae2bc1c88d72f70b446e&v=4',
  { responseType: 'buffer' }
)
  .then(function (image) {
    return img.buffer(image.body, { width: '33%' });
  })
  .then(function (image) {
    console.log(image);
    console.log(
      ww(
        `
Hello, I am ${c.blue.bold('Nevzat')}!

I'm a passionate ${c.bgRed.white.bold('frontend engineer')} living in ${c.bold(
          'Istanbul, Turkey'
        )}, working for ${link(c.hex('#3858A2').bold('Lifemote Networks'), 'https://lifemote.com')}.
I love being part of development of web technologies and ${c.bold.yellow('JavaScript')}.

`.trim(),
        { width: 200, trim: true }
      )
    );

    console.log('\n\n');
    iq.prompt([
      {
        type: 'list',
        message: 'Do you want to learn more about me?',
        name: 'open',
        choices: [
          {
            name: c.gray(`💻  What am I doing about development? (${c.bold('GitHub')})`),
            value: 'https://github.com/nevzatgunay',
          },
          {
            name: c.cyan(`🐦  What do I think? (${c.bold('Twitter')})`),
            value: 'https://twitter.com/nevzatgunay',
          },
          {
            name: c.blue(`🏹  Curriculum vitae, the path of my life (${c.bold('LinkedIn')})`),
            value: 'https://linkedin.com/in/nevzatgunay',
          },
          { name: c.red('👋  Nope. Bye.\n'), value: false },
        ],
      },
    ])
      .then(function (a) {
        opn(a.open);
        process.exit();
      })
      .catch(function () {});
  })
  .catch(function (e) {
    console.log(e);
  });
