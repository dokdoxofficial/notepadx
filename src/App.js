import { useEffect, useState } from "react";
import './App.css';

export default function App() {
  const params = new URLSearchParams(window.location.search);
  const initialMemo = params.get("memo") ? decodeURIComponent(params.get("memo")) : "";

  const [memo, setMemo] = useState(initialMemo);

  useEffect(() => {
    const encoded = encodeURIComponent(memo);
    const newUrl = `${window.location.pathname}?memo=${encoded}`;
    window.history.replaceState(null, "", newUrl);
  }, [memo]);

  const copyUrl = async () => {
    await navigator.clipboard.writeText(window.location.href);
    alert("현재 메모 URL이 복사되었습니다!");
  };

  return (
    <div className="p-6 max-w-2xl mx-auto font-sans">
      <h1 className="text-2xl font-bold mb-2">URL 기반 메모장 (React)</h1>
      <p className="mb-4 text-gray-700">메모가 자동으로 URL에 저장됩니다.</p>

      <textarea
        value={memo}
        onChange={(e) => setMemo(e.target.value)}
        placeholder="여기에 메모를 입력하세요..."
        className="w-full h-64 p-3 border rounded-md text-lg"
      />

      <button
        onClick={copyUrl}
        className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        메모 URL 복사
      </button>
    </div>
  );
}
