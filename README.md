### Speak it 是什么

Speak it 是 vscode 的一个插件，它可以将你选中的文字朗读出来

### 如何使用

- 方法一：为插件设置激活快捷键，选中文字后按下快捷键
- 方法二：选中文字后使用 ctrl+shift+p 打开 vscode 命令面板，输入 speak it，按下回车
- 方法三：选中文字后按下鼠标右键，选择 speak it

### Speak it 是如何工作的

调用有道词典 api，将你选中的文字转换为 mp3 文件，然后使用 sound-play 库播放，因此目前 Speak it 需要联网使用。 如果有更好的离线 Text-to-Speech 方案还望指点

### 故障排查

检查 url https://dict.youdao.com/dictvoice?type=0&audio=speak 是否可以正常访问，如果 url 已失效将代码克隆到本地，修改/src/extension.ts中api值为有效 url 后使用``vsce package``命令打包为.vsix文件重新安装

**Enjoy!**
