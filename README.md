[Uploading README.md…]()
# AI 智能体选型讲义

面向中国学生的一份 AI 智能体选型对比静态站。对比五款主流 AI 智能体，帮学生快速判断「哪个适合我」。

线上地址：<https://ai-agents-handbook-10800.app.workbuddy.host/>

## 对比对象

| 产品 | 出品方 | 定位 |
|---|---|---|
| WorkBuddy | 腾讯 | 全场景 AI 办公工作台 |
| TraeWork | 字节跳动 | AI 原生工作台（三端同步） |
| ZCode | 智谱 Z.ai | 编程 ADE（Agentic 开发环境） |
| Codex | OpenAI | ChatGPT 内置编程智能体 |
| 码道CodeArts | 华为云 | 智能编码产品（代码智能体） |

## 站点结构（10 页）

```
.
├── index.html        工具图鉴首页
├── compare.html      对比矩阵（可筛选/排序/十字定位）
├── quadrant.html     能力立方图（3D 可旋转）
├── practice.html     选型决策器
├── pk.html           双雄 PK
└── agents/
    ├── workbuddy.html
    ├── traework.html
    ├── zcode.html
    ├── codex.html
    └── codearts.html
```

| 页面 | 用途 |
|---|---|
| `index.html` | hero + 数据块 + 5 款速览 + 三类卡片区（通用 / 编程 / 研发与数字创造）+ 三步走导航 |
| `compare.html` | 5 列横向对比表：点列名收起/展开、按关注点筛行、按评分排序、鼠标十字定位 |
| `quadrant.html` | 三维评分立方图：拖动旋转、滚轮缩放、自动自转、点击节点看分项依据 |
| `practice.html` | 勾条件实时出推荐 + 6 张场景对照卡 + 掌握度自查 |
| `pk.html` | 选两名选手 + 多选维度，逐项打分 + 综合胜负 |
| `agents/*.html` | 每款工具一页详解：目标 / 规格 / 核心能力 / 价格 / 优缺点 / 上手步骤 / 自检 |

## 本地运行

纯静态站，浏览器直接打开 `index.html` 即可，无需服务器、无需安装依赖。

需要本地预览服务器的话：

```bash
# Python
python -m http.server 8000

# 或 Node
npx serve
```

然后访问 <http://localhost:8000>。

## 技术栈

- 纯 HTML + CSS + 原生 JS，零构建步骤、零运行时依赖
- 雾面玻璃蓝设计系统（`assets/css/style.css`），暗色模式 + 移动端响应式
- 3D 立方图用纯 SVG + 透视投影实现（`quadrant.html` 内联 JS）
- 每款工具配官方截图（`assets/screens/`），alt 写明图中内容

## 数据口径

- 数据更新 2026-09-30，价格为公开信息，以官网为准
- 评分为本站按公开信息做的相对评分（0–100，非跑分），打分依据写在立方图与 PK 页每一条下面
- Codex 口径分层：官方路径（需代理 + 美元）与自行改 config.toml 换国产模型（非官方承诺、用不了 Codex Cloud）分开表述

## 目录说明

```
.
├── index.html ~ quadrant.html  # 网页主体（5 个根目录页）
├── agents/                       # 5 个详解页
├── assets/
│   ├── css/style.css             # 全站样式
│   ├── js/site.js                # 全站脚本
│   └── screens/                  # 官方截图
└── .gitignore
```

## 许可

本站为教学对比用途，图片资源部分来自网络，版权归原作者所有。
