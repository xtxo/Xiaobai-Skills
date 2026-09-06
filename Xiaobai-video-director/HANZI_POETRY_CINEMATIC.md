# 汉字诗意动画 · 实拍背景版

分支：`hanzi-poetry-demo`

这个版本在原来的拆字动画上增加了一层诗意实拍背景。前景仍然是 Remotion 程序化汉字动画；背景按歌词段落自动切换，并统一做压暗、降饱和、轻微暗角和颗粒，让字始终是主角。

## 画面结构

```text
歌曲音轨（可选）
      ↓
实拍背景视频（6 段）
      ↓
统一调色 / 暗角 / 颗粒
      ↓
汉字拆解动画（视觉透明叠加）
      ↓
歌词字幕
```

> 说明：当前是“视觉透明叠加”，通过 blend mode 让原来的纸色底融进实拍背景，不是单独导出带 Alpha 通道的透明 ProRes 文件。这样本地预览和 MP4 导出最稳定。

## 1. 下载 6 个背景素材

下载后统一放到：

```text
Xiaobai-video-director/public/bg/
```

并重命名为以下文件名。

### 01 静 / 稳 — 雾湖

文件名：

```text
01-misty-lake.mp4
```

Pexels：Video Footage of a Misty Lake

https://www.pexels.com/video/video-footage-of-a-misty-lake-8745444/

用途：0–9 秒；对应“静字有个争 / 稳字有个急 / 争时要静 / 急时稳住心”。

### 02 忙 / 贪 / 名利 / 得失 — 城市人流

文件名：

```text
02-busy-city.mp4
```

Pexels：People Walking in City

https://www.pexels.com/video/people-walking-in-city-11745560/

用途：9–18.2 秒。

### 03 因果 / 花落 / 对错 / 心锁 — 落花

文件名：

```text
03-falling-petals.mp4
```

Pixabay：Flowers, Petals, Falling

https://pixabay.com/videos/flowers-petals-falling-scattered-175057/

用途：18.2–28.3 秒。

### 04 洒脱 / 半生 / 苦乐 / 我 — 山巅独处

文件名：

```text
04-mountain-self.mp4
```

Pexels：Silhouette of Man Enjoying a Mountain Sunset

https://www.pexels.com/video/silhouette-of-man-enjoying-a-mountain-sunset-34421873/

用途：28.3–38 秒。

### 05 愁 / 秋 / 思绪 — 秋叶

文件名：

```text
05-autumn-leaves.mp4
```

Pexels：Close up of Leaves in Autumn

https://www.pexels.com/video/close-up-of-leaves-in-autumn-13971735/

用途：38–43 秒。

### 06 命里无时 / 莫须强求 — 湖边日落

文件名：

```text
06-release-lake.mp4
```

Pexels：Serene Boat on Misty Mountain Lake at Sunset

https://www.pexels.com/video/a-boat-on-the-shore-at-sunset-12631364/

用途：43–48 秒。

## 2. 预览没有素材的版本

即使还没下载背景也可以先运行，会自动显示一个深色渐变背景：

```bash
pnpm exec remotion studio assets/HanziPoetryCinematicEntry.tsx
```

在 Studio 中选择：

```text
HanziPoetryCinematic
```

## 3. 开启真实背景素材

6 个视频都放好后：

```bash
pnpm exec remotion studio assets/HanziPoetryCinematicEntry.tsx --props='{"backgroundEnabled":true}'
```

## 4. 加歌曲

把歌曲放到：

```text
Xiaobai-video-director/public/song.mp3
```

然后：

```bash
pnpm exec remotion studio assets/HanziPoetryCinematicEntry.tsx --props='{"backgroundEnabled":true,"audioSrc":"song.mp3"}'
```

当前歌词时间轴仍是约 48 秒的设计时间轴。真实歌曲如果不是这个节奏，需要再按歌曲实际时间调整 `assets/hanzi-poetry/HanziPoetry.tsx` 里的 `SEGMENTS`。

## 5. 导出 MP4

```bash
mkdir -p runs/hanzi-poetry

pnpm exec remotion render \
  assets/HanziPoetryCinematicEntry.tsx \
  HanziPoetryCinematic \
  runs/hanzi-poetry/cinematic-v1.mp4 \
  --props='{"backgroundEnabled":true,"audioSrc":"song.mp3"}'
```

输出：

```text
runs/hanzi-poetry/cinematic-v1.mp4
```

## 6. 调整背景强弱

可以从命令行改：

```json
{
  "backgroundEnabled": true,
  "audioSrc": "song.mp3",
  "overlayOpacity": 0.96,
  "backgroundOpacity": 1,
  "vignette": 0.42,
  "grain": 0.13
}
```

推荐：

- 字不够突出：`backgroundOpacity` 降到 `0.78–0.9`
- 画面太黑：`vignette` 降到 `0.25–0.32`
- 太像普通素材拼接：`grain` 保留 `0.08–0.15`
- 字与背景融合太弱：`overlayOpacity` 调到 `0.92–1`

## 许可提醒

Pexels / Pixabay 的素材页面都提供免费使用许可，但素材里若出现可识别人物、商标、品牌或特殊建筑/作品，仍可能涉及额外权利。这个 Demo 特意优先选择自然景观、远景剪影和抽象环境，降低这类风险。发布前仍以对应素材页面当时显示的许可为准。
