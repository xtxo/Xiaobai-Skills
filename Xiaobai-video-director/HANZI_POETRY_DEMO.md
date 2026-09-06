# 汉字诗意动画 Demo

分支：`hanzi-poetry-demo`

这是一个独立的 Remotion 竖屏样片，不修改原来的 `DirectedScore` 入口。

## 当前内容

- 1080×1920
- 30fps
- 约 48 秒
- 已覆盖整段歌词
- 重点动画：
  - 静 → 青 + 争 → 静
  - 稳 → 禾 + 急 → 稳
  - 忙 → 忄 + 亡 → 忙
  - 贪 / 贫关系
  - 名 / 利漂散
  - 得 / 失平衡
  - 念 → 因 → 果
  - 一叹一花落
  - 对 / 错互换
  - 心被锁住后打开
  - 四季快速流逝
  - 苦 / 乐交替
  - 名利得失退场，只剩“我”
  - 秋 + 心 → 愁
  - 松手、不强求

## 1. 切到分支

```bash
git fetch origin
git checkout hanzi-poetry-demo
cd Xiaobai-video-director
```

首次运行安装依赖：

```bash
pnpm install --frozen-lockfile --ignore-scripts
```

## 2. 直接打开预览

```bash
pnpm exec remotion studio assets/HanziPoetryEntry.tsx
```

浏览器里选择：

```text
HanziPoetryDemo
```

此时没有歌曲，按内置 48 秒视觉节奏播放。

## 3. 直接导出无音乐样片

```bash
mkdir -p runs/hanzi-poetry
pnpm exec remotion render assets/HanziPoetryEntry.tsx HanziPoetryDemo runs/hanzi-poetry/demo-v1.mp4
```

## 4. 加入真实歌曲

在 `Xiaobai-video-director` 下创建 `public` 目录，把歌曲文件放进去：

```text
Xiaobai-video-director/
  public/
    song.mp3
```

预览带歌曲版本：

```bash
pnpm exec remotion studio assets/HanziPoetryEntry.tsx --props='{"audioSrc":"song.mp3"}'
```

导出带歌曲版本：

```bash
pnpm exec remotion render assets/HanziPoetryEntry.tsx HanziPoetryDemo runs/hanzi-poetry/demo-with-song.mp4 --props='{"audioSrc":"song.mp3"}'
```

Windows PowerShell 如果单引号参数解析有问题，可以把 props 保存为 `hanzi-props.json`：

```json
{
  "audioSrc": "song.mp3"
}
```

再运行：

```powershell
pnpm exec remotion studio assets/HanziPoetryEntry.tsx --props=hanzi-props.json
```

## 5. 对齐真实歌词

真实歌曲的每句长度大概率和现在的视觉节奏不同。修改：

```text
assets/hanzi-poetry/HanziPoetry.tsx
```

文件开头的 `SEGMENTS`：

```ts
{start: 0.0, end: 2.4, lyric: '静字有个争', kind: 'split-static'}
```

只需要把 `start` / `end` 改成歌曲中这句真实开始和结束秒数，动画会自动按该句时长重新归一化，不需要逐帧重写动画。

## 文件位置

```text
assets/HanziPoetryEntry.tsx
assets/hanzi-poetry/HanziPoetry.tsx
profiles/hanzi-poetry/PROFILE.md
HANZI_POETRY_DEMO.md
```

## 下一阶段建议

先看无音乐样片的视觉方向。如果风格成立，再用真实歌曲时间戳对齐，并进一步做：毛笔笔触遮罩、偏旁路径级拆分、墨迹扩散、节拍点音效、外部古风/真人背景素材混合。
