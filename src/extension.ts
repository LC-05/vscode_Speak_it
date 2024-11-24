import * as vscode from "vscode";
const sound = require("sound-play");
const fs = require("fs");
const path = require("path");
const request = require("request");
const os = require("os");
const tmpPath = path.join(os.tmpdir(), "vscode_speak_it"); // 系统临时文件路径
const filePath = tmpPath + "/tmp.mp3";
const replaceSign = "$content$"; // 占位符
let api = "";
//备用api https://api.dictionaryapi.dev/api/v2/entries/en/$content$ 

export function activate(context: vscode.ExtensionContext) {
  cleanTmpFile();
  const disposable = vscode.commands.registerCommand("speak.speakit", () => {
    api =
      vscode.workspace
        .getConfiguration()
        .get("speakit.speakItPronunciationApi") || "";
    if (api === "") {
      showErrorMessage("speakit.speakItPronunciationApi is empty");
      return;
    }
    const text = getSelectedText();
    if (text) {
      isExists(tmpPath)
        .then((res) => {
          playVoice(text);
        })
        .catch((rej) => {
          fs.mkdirSync(tmpPath);
          playVoice(text);
        });
    }
  });
  context.subscriptions.push(disposable);
}
/**
 * 播放语音
 * @param {string} text - 要播放的文本
 */
function playVoice(text: string) {
  //todo 过滤非英文字符
  const filteredText = text.replace(/[^a-zA-Z]/g, "").substring(0, 50); // 过滤非英文字符并截取前50个字符
  const stream = fs.createWriteStream(filePath);
  const fullApi = api.replace(replaceSign, filteredText); // 替换占位符
  request(fullApi)
    .pipe(stream)
    .on("close", () => {
      sound
        .play(filePath)
        .then(() => {
          console.log(`play ${filteredText} done`);
          cleanTmpFile();
        })
        .catch((error: any) => {
          console.log(error);
          showErrorMessage(error);
        });
    })
    .on("error", (error: any) => {
      showErrorMessage(error);
      console.log(error);
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
          showErrorMessage("delete file faild:" + err);
          console.log("delete file faild:" + err);
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
function showErrorMessage(message: string) {
  vscode.window.showErrorMessage(message);
}
export function deactivate() {}
