import * as vscode from "vscode";
const sound = require("sound-play");
const fs = require("fs");
const path = require("path");
const request = require("request");
const os = require("os");
const tmpPath = path.join(os.tmpdir(), "vscode_speak_it"); // 系统临时文件路径
const filePath = tmpPath + "/tmp.mp3";
const youdaoUrl = "https://dict.youdao.com/dictvoice?type=0&audio=";

export function activate(context: vscode.ExtensionContext) {
  cleanTmpFile();
  const disposable = vscode.commands.registerCommand("speak.speakit", () => {
    const text = getSelectedText();
    if (text) {
      isExists(tmpPath)
        .then((res) => {
          getVoice(text);
        })
        .catch((rej) => {
          fs.mkdirSync(tmpPath);
          getVoice(text);
        });
    }
  });
  context.subscriptions.push(disposable);
}

function getVoice(text: string) {
  const stream = fs.createWriteStream(filePath);
  request(youdaoUrl + text)
    .pipe(stream)
    .on("close", () => {
      sound
        .play(filePath)
        .then(() => {
          console.log(`play ${text} done`);
          cleanTmpFile();
        })
        .catch((error: any) => {
          console.log(error);
        });
    });
}
/**
 * 异步清理临时文件
 */
function cleanTmpFile() {
  isExists(tmpPath).then((res) => {
    isExists(filePath).then((res) => {
      fs.unlink(filePath, (err: any) => {
        if (err) {
          console.error("delete file faild", err);
        } else {
          console.log("delete file done");
        }
      });
    });
  });
}
/**
 * 检查文件或目录是否存在
 * @param {string} path - 要检查的文件或目录的路径
 * @returns {Promise<boolean>} 如果文件或目录存在，则返回 true，否则返回 false
 */
function isExists(path: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    fs.access(path, fs.constants.F_OK, (err: any) => {
      err ? reject(false) : resolve(true);
    });
  });
}
/**
 * 获取当前选中的文本
 * @returns {string | undefined} 如果有选中的文本，则返回选中的文本，否则返回 undefined
 */
function getSelectedText(): string | undefined {
  const editor = vscode.window.activeTextEditor;
  if (editor) {
    const selectedText = editor.selection;
    return editor.document.getText(selectedText);
  }
}
export function deactivate() {}
