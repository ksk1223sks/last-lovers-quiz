/* LastLoversQuiz.jsx
-------------------------------------------------------
React single-file component for
"栗林みな実 3連シングル『恋の順番占い』" Web診断
（免責文をフッターに組み込んだバージョン）
------------------------------------------------------- */

import React, { useState } from "react";
import { motion } from "framer-motion";

const ITEMS = [
  { id: "heart", icon: "♥", title: "LAST LOVERS" },
  { id: "hourglass", icon: "⏳", title: "透明な砂時計" },
  { id: "star", icon: "🌟", title: "ふたりのデスティネーション" },
];

const RESULTS = {
  "heart+hourglass+star": {
    title: "王道ラブストーリータイプ",
    desc: "“♥ LAST LOVERS”の胸躍る出会いで始まり、“⏳ 透明な砂時計”の一途な想いが積み重なり、最後に“🌟 ふたりのデスティネーション”で二人の物語が結ばれる流れ。恋の高揚と静かな想い、そして運命の終着点までを体感できる、ドラマチックで幸せな恋です。",
  },
  "hourglass+heart+star": {
    title: "心の絆タイプ",
    desc: "“⏳ 透明な砂時計”で静かに想いを育み、“♥ LAST LOVERS”のときめきで恋が加速し、最後に“🌟 ふたりのデスティネーション”で互いの想いを確認する。純粋さと喜び、安心感が融合した、深い絆を感じる恋の物語です。",
  },
  "star+hourglass+heart": {
    title: "再生の恋タイプ",
    desc: "“🌟 ふたりのデスティネーション”での終点から過去を振り返り、“⏳ 透明な砂時計”で想いを整理し、最後に“♥ LAST LOVERS”で新たな恋の始まりへ。終わりと再生を経て前向きに進む、あなたの成長と新しい恋の兆しを描く物語です。",
  },
  "heart+star+hourglass": {
    title: "大人の恋タイプ",
    desc: "“♥ LAST LOVERS”で恋の楽しさを味わい、“🌟 ふたりのデスティネーション”で想いを深め、最後に“⏳ 透明な砂時計”で静かに愛を育む。感情の高揚と落ち着きのバランスが取れた、成熟した大人の恋の形を示しています。",
  },
  "hourglass+star+heart": {
    title: "運命の再会タイプ",
    desc: "“⏳ 透明な砂時計”での静かな想いが、“🌟 ふたりのデスティネーション”の葛藤と成長を経て、“♥ LAST LOVERS”のドキドキで再び花開く。時間を越えた縁、その先にある再会と新たな始まりを感じる恋です。",
  },
  "star+heart+hourglass": {
    title: "リスタートタイプ",
    desc: "“🌟 ふたりのデスティネーション”の終わりが、“♥ LAST LOVERS”の出会いへとつながり、そして“⏳ 透明な砂時計”で想いをじっくり育む。過去を糧に新しい恋へ踏み出す、前向きで心温まるストーリーです。",
  },
};

const musicLinks = {
  heart: "https://linkco.re/2Mt22FZT?lang=ja",
  hourglass: "https://linkco.re/ydEfzZbB?lang=ja",
  star: "https://linkco.re/XmnUZ5Se?lang=ja",
};

export default function LastLoversQuiz() {
  const [selected, setSelected] = useState([]);
  const [revealed, setRevealed] = useState(false);

  const handleSelect = (id) => {
    if (selected.includes(id) || selected.length >= 3 || revealed) return;
    setSelected((prev) => [...prev, id]);
  };

  const handleReset = () => {
    setSelected([]);
    setRevealed(false);
  };

  const handleReveal = () => {
    if (selected.length === 3) setRevealed(true);
  };

  const key = selected.join("+");
  const result = RESULTS[key];

  return (
    <div className="max-w-md mx-auto p-4 min-h-screen flex flex-col items-center bg-gradient-to-b from-pink-50 to-sky-50">
      <header className="w-full text-center mb-4">
        <h1 className="text-2xl font-bold">栗林みな実『恋の3連シングル』順番占い</h1>
        <p className="text-sm text-gray-600 mt-2">
          直感で3つのアイコンを順番にタップして、あなたの恋の物語を診断しよう💞
        </p>
      </header>

      <main className="w-full bg-white/80 rounded-2xl shadow-lg p-4">
        <section className="grid grid-cols-3 gap-3 mb-4">
          {ITEMS.map((item) => {
            const idx = selected.indexOf(item.id);
            const picked = idx !== -1;
            return (
              <motion.button
                key={item.id}
                onClick={() => handleSelect(item.id)}
                whileTap={{ scale: 0.96 }}
                className={`relative flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${
                  picked ? "bg-pink-100 border-pink-300" : "bg-white border-gray-200"
                }`}
                aria-pressed={picked}
                aria-label={item.title}
              >
                <span className="text-3xl mb-2">{item.icon}</span>
                <span className="text-xs text-gray-700 text-center">{item.title}</span>
                {picked && (
                  <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                    {idx + 1}
                  </span>
                )}
              </motion.button>
            );
          })}
        </section>

        <div className="flex items-center justify-between mb-4">
          <button onClick={handleReset} className="px-3 py-2 bg-gray-100 rounded-md text-sm hover:bg-gray-200">
            最初からやり直す
          </button>

          <button
            onClick={handleReveal}
            disabled={selected.length !== 3 || revealed}
            className={`px-6 py-3 rounded-md text-base font-medium shadow-sm transition ${
              selected.length === 3 && !revealed ? "bg-pink-500 text-white hover:scale-[1.02]" : "bg-gray-200 text-gray-600 cursor-not-allowed"
            }`}
          >
            診断する
          </button>
        </div>

        <div className="min-h-[120px]">
          {!revealed && (
            <p className="text-sm text-gray-600">
              選んだ順番：{" "}
              {selected.length > 0
                ? selected.map((id) => ITEMS.find((it) => it.id === id).icon).join(" → ")
                : "まだ選ばれていません"}
            </p>
          )}

          {revealed && result && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3 p-4 rounded-lg bg-gradient-to-r from-pink-50 to-sky-50 border border-pink-100"
            >
              <h2 className="text-lg font-semibold">
                あなたの恋の順番：{" "}
                {selected.map((id) => ITEMS.find((it) => it.id === id).icon).join(" → ")}
              </h2>

              <h3 className="mt-2 text-pink-600 font-medium">{result.title}</h3>
              <p className="mt-2 text-gray-700">{result.desc}</p>

              {/* 縦並びリンク＆ボタン（曲名表示） */}
              <div className="mt-4 flex flex-col gap-3">
                <a
                  href={musicLinks[selected[0]]}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm px-3 py-2 rounded-md border bg-white hover:bg-gray-50 text-gray-700 break-words"
                >
                  1曲目を聴く — {ITEMS.find((it) => it.id === selected[0]).title}
                </a>

                <a
                  href={musicLinks[selected[1]]}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm px-3 py-2 rounded-md border bg-white hover:bg-gray-50 text-gray-700 break-words"
                >
                  2曲目を聴く — {ITEMS.find((it) => it.id === selected[1]).title}
                </a>

                <a
                  href={musicLinks[selected[2]]}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm px-3 py-2 rounded-md border bg-white hover:bg-gray-50 text-gray-700 break-words"
                >
                  3曲目を聴く — {ITEMS.find((it) => it.id === selected[2]).title}
                </a>

                <button
                  onClick={() => {
                    const text = `私の恋の順番は ${selected
                      .map((id) => ITEMS.find((it) => it.id === id).icon)
                      .join(" → ")} — ${result.title}。栗林みな実の3連シングルで占ったよ！`;
                    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
                    window.open(url, "_blank", "noopener");
                  }}
                  className="px-3 py-2 rounded-md bg-blue-500 text-white text-sm"
                >
                  結果をシェア
                </button>

                <button onClick={handleReset} className="px-3 py-2 rounded-md bg-white border text-sm">
                  もう一度占う
                </button>
              </div>
            </motion.div>
          )}

          {revealed && !result && (
            <div className="mt-3 p-3 bg-yellow-50 rounded-md border border-yellow-100">
              <p className="text-sm text-yellow-800">選んだ組み合わせに対する結果がまだ設定されていません。</p>
            </div>
          )}
        </div>
      </main>

      <footer className="w-full text-center mt-4 text-xs text-gray-500 space-y-2">
        <p>
          🎵 楽曲リンク：
          <a href="https://www.tunecore.co.jp/artists/minamikuribayashi" target="_blank" rel="noreferrer" className="text-pink-500 hover:underline font-medium">
            栗林みな実 - TuneCore Japan
          </a>
        </p>

        {/* ここから免責文 */}
        <div className="mt-2 bg-white/60 p-3 rounded-md border border-gray-200 text-left text-xs text-gray-600">
          <strong className="text-sm">【免責事項】</strong>
          <p className="mt-1">
            本サイトは、栗林みな実さんおよび関係各社とは一切関係のない、個人のファンによる非公式コンテンツです。掲載されている説明文はすべて独自に作成したものであり、著作権・商標権を侵害する意図はありません。歌詞・ジャケット画像など著作権のある素材は使用しておらず、外部サイトへのリンクのみを掲載しています。記載内容に問題がある場合は、お手数ですがご連絡いただければ速やかに修正・削除いたします。
          </p>
        </div>
        {/* ここまで免責文 */}
      </footer>
    </div>
  );
}
