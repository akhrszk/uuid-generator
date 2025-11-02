import { useCallback, useState } from "react";

function App() {
  const [uuids, setUuids] = useState<string[]>([]);
  const [copied, setCopied] = useState<string | undefined>();

  const genUUID = useCallback(() => {
    if (typeof crypto === "undefined" || !crypto.randomUUID) {
      return;
    }
    const newUUID = crypto.randomUUID();
    setUuids((prev) => [...prev, newUUID]);
  }, []);

  const copyUUID = useCallback(
    (uuid: string) => {
      if (typeof navigator === "undefined" || !navigator.clipboard) {
        return;
      }
      navigator.clipboard.writeText(uuid);
      setCopied(uuid);
    },
    [setCopied],
  );

  return (
    <div className="p-4 flex flex-col gap-4">
      <div>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer"
          onClick={genUUID}
        >
          UUID生成
        </button>
      </div>
      <div>
        <ul className="inline-block">
          {uuids.map((uuid) => (
            <li
              key={uuid}
              className="py-1 flex justify-between items-center gap-1"
            >
              <div className="flex-1">{uuid}</div>
              {copied === uuid ? (
                <>
                  <button
                    className="ml-4 px-2 py-1 rounded border border-white hover:border-slate-500 text-slate-400 hover:text-slate-500 cursor-pointer"
                    onClick={() => copyUUID(uuid)}
                  >
                    copied
                  </button>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6 text-green-700"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m4.5 12.75 6 6 9-13.5"
                    />
                  </svg>
                </>
              ) : (
                <>
                  <button
                    className="ml-4 px-2 py-1 bg-green-600 text-white rounded hover:bg-green-700 cursor-pointer"
                    onClick={() => copyUUID(uuid)}
                  >
                    copy
                  </button>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6 invisible"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m4.5 12.75 6 6 9-13.5"
                    />
                  </svg>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
