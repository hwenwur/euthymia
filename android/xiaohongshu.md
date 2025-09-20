## 隐藏首页 “发现“ tab

基于MT管理器 安卓逆向

防止无意识刷信息流，首页中间的信息流tab改为白屏状态，只能看自己关注的账号。

操作步骤：
1. MT管理器提取 小红书 安装包
2. 选中apk文件，点击去除签名校验
3. 在dex++编辑器中，打开`com/xingin/xhs/homepage/container/homenew/IndexHomeFragmentNew`
4. 将字符 EXPLORE_FEED 替换为 FOLLOW_FEED
5. 签名，卸载原来的程序，安装修改后的apk文件

**注意**，修改apk后与其他程序交互的部分功能会不可用，例如：微信登录、分享到微信朋友圈

![xiaohongshu home](preview/426ee39af20c56ab7783a20fd358ef59.jpg)