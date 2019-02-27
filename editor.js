'use strict';

const electron = require('electron');
const remote = electron.remote;
const editor = require('./editorLib/editorLoad');
// NOTE: Quillの関係なのかremoteによるrequireでのモジュール読み込みは出来ない（？）

editor.editorLoad('editor');
