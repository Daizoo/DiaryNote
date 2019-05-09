'use strict';

const electron = require('electron');
const remote = electron.remote;
const editorSetup = require('./editorLib/editorLoad');
// NOTE: Quillの関係なのかremoteによるrequireでのモジュール読み込みは出来ない（？）

let editor = editorSetup.editorLoad();

