### Speak it 是什么

"Speak it" 是一个简单的 VSCode 插件,它只有一个功能:将选中的单词朗读出来。开发这个插件的目的是让用户在使用 VSCode 编辑代码时,无需移动鼠标或切换应用程序,就能快速学习单词的发音。

### 如何使用

- 方法一：为插件设置激活快捷键，选中文字后按下快捷键
- 方法二：选中文字后使用 ctrl+shift+p 打开 vscode 命令面板，输入 speak it，按下回车
- 方法三：选中文字后按下鼠标右键，选择 speak it

### Speak it 是如何工作的

调用发音 api，将你选中的文字转换为 mp3 文件，然后使用 sound-play 库播放，因此目前 Speak it 需要联网使用。 如果有更好的离线 Text-to-Speech 方案还望指点

### 故障排查

**1. 插件无响应**

- 检查系统音量是否打开
- 检查发音 api 是否可以正常访问

**2. 发音不准确**
目前默认的有道 api 会将所有字符组合为一个单词，因此想要获得更准确的发音需要将单词拆分开来，例如将`hello world`拆分为`hello`和`world`，然后分别发音

### 修改发音 api

感谢以下公司、组织和个人提供的 api
- https://dict.youdao.com/dictvoice?type=0&audio=$content$ //type=0 为美式发音，type=1 为英式发音
- https://sensearch.baidu.com/gettts?lan=en&spd=3&source=alading&text=$content$ //lan=uk 为英式发音，lan=us 为美式发音,spd 为语速

ctrl+, 打开设置面板，搜索 speakit，修改 api 即可（目前仅支持 response 为音频文件的 api）

**Enjoy!**
