import { useState } from "react";

const songs = [
  {
    id: "heart",
    title: "LAST LOVERS",
    icon: "♥",
    description:
      "最後で最高の恋を綴った一曲。ワクワク感やドキドキする瞬間をぎゅっと詰め込んだキャッチーで爽やかな仕上がり。",
    musicLink: "https://linkco.re/2Mt22FZT?lang=ja",
  },
  {
    id: "hourglass",
    title: "透明な砂時計",
    icon: "⏳",
    description:
      "透明な心で彼を好きでいたいという一途な想いを歌った幻想的な楽曲。砂時計のようにゆったりと時間が流れていく心地よさ。",
    musicLink: "https://linkco.re/ydEfzZbB?lang=ja",
  },
  {
    id: "star",
    title: "ふたりのデスティネーション",
    icon: "🌟",
    description:
      "ふたりの物語の終着点を描くラブソング。懐かしく儚いサウンドに乗せ、揺るがぬ「彼」への想いを歌い上げた一曲。",
    musicLink: "https://linkco.re/XmnUZ5Se?lang=ja",
  },
];

// 占い結果
const results = {
  "heart-hourglass-star":
    "あなたの恋はワクワクと穏やかさ、そして結末の美しさが揃う理想的なストーリー。",
  "heart-star-hourglass":
    "最初に情熱があり、終盤でじっくり考える恋。感情の起伏が大きくドラマチック。",
  "hourglass-heart-star":
    "まず穏やかに始まり、ドキドキを経て、最終的に幸せにたどり着く恋。",
  "hourglass-star-heart":
    "静かに心を育てた後、試練を経て情熱的に終わる恋。",
  "star-heart-hourglass":
    "懐かしい思い出や過去を経て、新たなワクワクと静けさを感じる恋。",
  "star-hourglass-heart":
    "運命的な出会いから、落ち着きと情熱が交差する恋の旅。",
};

export default function LastLoversQuiz() {
  const [selection, setSelection] = useState([]);
  const [result, setResult] = useState("");

  // 曲を選択
  const handleSelect = (songId) => {
    if (!selection.includes(songId)) {
      setSelection([...selection, songId]);
    }
  };

  // リセット
  const handleReset = () => {
    setSelection([]);
    setResult("");
  };

  // 占い結果を表示
  const handleShowResult = () => {
    if (selection.length === 3) {
      const key = selection.join("-");
      setResult(results[key] || "あなたの恋は予想外の展開かも…！");
    } else {
      alert("3曲すべてを選んでください！");
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", fontFamily: "sans-serif" }}>

      <h1>栗林みな実 3連シングル 恋の順番占い</h1>

      <p>曲の順番を選んで、あなたの恋の物語を占おう！</p>

      <div style={{ display: "flex", justifyContent: "space-around", marginBottom: 20 }}>
        {songs.map((song) => (
          <button
            key={song.id}
            onClick={() => handleSelect(song.id)}
            disabled={selection.includes(song.id)}
            style={{
              padding: "10px 20px",
              fontSize: 18,
              cursor: selection.includes(song.id) ? "not-allowed" : "pointer",
            }}
          >
            {song.icon} {song.title}
          </button>
        ))}
      </div>

      <div>
        <h2>選択中の順番：</h2>
        <p>
          {selection.length > 0
            ? selection.map((id) => songs.find((s) => s.id === id).icon).join(" → ")
            : "まだ選ばれていません"}
        </p>
      </div>

      <div style={{ marginTop: 20 }}>
        <button
          onClick={handleShowResult}
          style={{ marginRight: 10, padding: "8px 16px" }}
        >
          占う
        </button>

        <button
          onClick={handleReset}
          style={{ padding: "8px 16px" }}
        >
          リセット
        </button>
      </div>

      {result && (
        <div
          style={{
            marginTop: 20,
            padding: 15,
            border: "1px solid #ccc",
            borderRadius: 8,
          }}
        >
          <h2>占い結果</h2>
          <p>{result}</p>
        </div>
      )}

    </div>
  );
}
