## 隐藏消息列表中的 “公众号“
基于 https://github.com/gkd-kit

基本原理：自动长按 “公众号“，点击按钮”不显示该聊天”

```json
{
  key: 2,
  name: '不显示 订阅号',
  desc: '不显示 订阅号',
  rules: [
    {
      key: 2000,
      action: 'longClick',
      matches: [
        'View[vid="kbq"][text="公众号"]'
      ],
      actionCd: 2000,
      actionDelay: 1000,
      fastQuery: true,
      activityIds: [
        'com.tencent.mm.ui.LauncherUI'
      ]
    },
    {
      key: 2001,
      preKeys: [
        2000
      ],
      matches: [
        'TextView[text="不显示该聊天"]'
      ],
      fastQuery: true,
      activityIds: [
        'com.tencent.mm.ui.LauncherUI'
      ]
    },
    {
      preKeys: [
        2001
      ],
      matches: [
        'Button[text="不显示"]'
      ],
      fastQuery: true,
      activityIds: [
        'com.tencent.mm.ui.LauncherUI'
      ]
    }
  ]
}
```