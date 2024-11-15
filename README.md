## Speak it 是什么

Speak it 是 vscode 的一个插件，它可以将你选中的文字朗读出来。

## 如何使用

方法一：为插件设置激活快捷键，选中文字后按下快捷键
方法二：选中文字后使用 ctrl+shift+p 打开 vscode 命令面板，输入 speak it，按下回车
方法三：选中文字后按下鼠标右键，选择 speak it

## Speak it 是如何工作的

调用有道词典 api，将你选中的文字转换为 mp3 文件，然后使用 sound-play 库播放，因此目前 Speak it 需要联网使用。 如果有更好的离线 Text-to-Speech 方案还望指点。

## 故障排查

目前 api 为有道公开 url：https://dict.youdao.com/dictvoice?type=0&audio=，存在失效风险，如果插件不能正常使用可以优先排查api是否可以正常访问，如果api已失效可将仓库克隆，修改为有效api后在本地打包为.vsix文件重新安装。

**Enjoy!**
