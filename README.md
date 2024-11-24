### Speak it 是什么

Speak it 是 vscode 的一个插件，它可以将你选中的单词朗读出来，让你更方便地学习单词发音

### 如何使用

- 方法一：为插件设置激活快捷键，选中文字后按下快捷键
- 方法二：选中文字后使用 ctrl+shift+p 打开 vscode 命令面板，输入 speak it，按下回车
- 方法三：选中文字后按下鼠标右键，选择 speak it

### Speak it 是如何工作的

调用发音 api，将你选中的文字转换为 mp3 文件，然后使用 sound-play 库播放，因此目前 Speak it 需要联网使用。 如果有更好的离线 Text-to-Speech 方案还望指点

### 故障排查
**1. 插件无响应**
- 检查系统音量是否打开
- 检查发音api是否可以正常访问

**2. 发音不准确**
目前默认的有道api会将所有字符组合为一个单词，因此想要获得更准确的发音需要将单词拆分开来，例如将``hello world``拆分为``hello``和``world``，然后分别发音

### 修改发音api
**感谢以下公司、组织和个人提供的api**
- https://dict.youdao.com/dictvoice?type=0&audio=$content$ //type=0为美式发音，type=1为英式发音
- https://sensearch.baidu.com/gettts?lan=en&spd=3&source=alading&text=$content$   //lan=uk为英式发音，lan=us为美式发音,spd为语速

ctrl+, 打开设置面板，搜索speakit，修改api即可

**Enjoy!**
