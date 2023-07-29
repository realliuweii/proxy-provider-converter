import Head from "next/head";
import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { SelectorIcon, DuplicateIcon } from "@heroicons/react/outline";
import toast, { Toaster } from "react-hot-toast";

let host = "";
if (typeof window !== "undefined") {
  host = window.location.origin;
}

export default function Home() {
  const [url, setUrl] = useState("");
  const [target, setTarget] = useState("clash");

  const convertedUrl = `${host}/api/convert?url=${encodeURIComponent(
    url
  )}&target=${target}`;

  let urlHost = "";
  try {
    urlHost = new URL(url).hostname;
  } catch (error) {
    // Ignore
  }

  const copiedToast = () =>
    toast("已复制", {
      position: "bottom-center",
    });

  const clashConfig = `# 🤡 配置格式

proxy-groups:
  - name: UseProvider
    type: select
    use:
      - ${urlHost || "provider1"}
    proxies:
      - Proxy
      - DIRECT

proxy-providers:
  ${urlHost || "provider1"}:
    type: http
    url: ${convertedUrl}
    interval: 3600
    path: ./${urlHost || "provider1"}.yaml
    health-check:
      enable: true
      interval: 600
      # lazy: true
      url: http://www.gstatic.com/generate_204
`;

  const surgeConfig = `# 🤡🤡配置格式

[Proxy Group]
${urlHost || "egroup"} = select, policy-path=${convertedUrl}
`;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Head>
        <title>Proxy Provider Converter</title>
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>

      <main className="flex flex-col items-start flex-1 max-w-4xl px-4 py-8 md:py-12">
        <div className="flex flex-col items-start md:items-center md:flex-row">
          <img src="/logo.svg" alt="Logo" className="md:mr-4 h-28" />
          <div>
            <h1 className="text-2xl font-extrabold text-black md:text-5xl">
              Proxy Provider Converter
            </h1>
            
          </div>
        </div>
        <div className="mt-12 text-gray-900">
        </div>
        <div className="w-full text-gray-900 mt-14">
          <h3 className="text-lg md:text-xl font-bold">开始使用</h3>
          <div className="flex w-full gap-4 mt-4 flex-col md:flex-row">
            <input
              className="w-full h-full p-4 text-lg bg-white rounded-lg shadow-sm focus:outline-none"
              placeholder="粘贴 🤡 订阅链接到这里"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <div className="relative">
              <select
                className="w-full md:w-max py-3 pl-4 pr-10 text-lg bg-white rounded-lg shadow-sm appearance-none focus:outline-none"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
              >
                <option value="clash">转换到🤡</option>
                <option value="surge">转换到 🤡🤡</option>
              </select>
              <SelectorIcon className="absolute h-6 top-3.5 right-3 text-gray-400" />
            </div>
          </div>
        </div>
        {url && (
          <div className="break-all p-3 mt-4 rounded-lg text-gray-100 bg-gray-900 shadow-sm w-full">
            {convertedUrl}

            <CopyToClipboard text={convertedUrl} onCopy={() => copiedToast()}>
              <div className="flex items-center text-sm mt-4 text-gray-400  cursor-pointer  hover:text-gray-300 transition duration-200 select-none">
                <DuplicateIcon className="h-5 w-5 mr-1 inline-block" />
                点击复制
              </div>
            </CopyToClipboard>
          </div>
        )}
        {url && (
          <div className="w-full p-4 mt-4 text-gray-100 bg-gray-900 rounded-lg hidden md:block">
            {/* prettier-ignore */}
            {target !== "surge" && (
              <pre className="whitespace-pre-wrap">{clashConfig}</pre>
            )}

            {target === "surge" && <pre>{surgeConfig}</pre>}
            {/* prettier-ignore */}

            <CopyToClipboard
              text={target === "surge" ? surgeConfig : clashConfig}
              onCopy={() => copiedToast()}
            >
              <div className="flex items-center text-sm mt-4 text-gray-400 cursor-pointer hover:text-gray-300 transition duration-200 select-none">
                <DuplicateIcon className="h-5 w-5 mr-1 inline-block" />
                点击复制
              </div>
            </CopyToClipboard>
          </div>
        )}
       
      </main>

      <footer className="w-full p-4 max-w-4xl md:py-8">
        <a
          className="flex items-center"
          href="https://vercel.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by
          <img src="/vercel.svg" alt="Vercel Logo" className="h-4 ml-2" />
        </a>
      </footer>

      <Toaster />
    </div>
  );
}
