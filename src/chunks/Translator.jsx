import React, { useState } from "react";
import translateText from "./ translateText";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "../components/ui/select";
import { Kbd, KbdGroup } from "../components/ui/kbd";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "../components/ui/button";
import Loader from "../components/ui/loader";


function Translator() {
  const [input, setInput] = useState("");
  // Store translations as an array of { source, translated }
  const [translations, setTranslations] = useState([]);
  const [sourceLang, setSourceLang] = useState("en");
  const [targetLang, setTargetLang] = useState("te");
  const [isTranslating, setIsTranslating] = useState(false);
  

  const handleTranslate = async () => {
    if (!input || !input.trim()) return;

    // Split input into paragraphs separated by one or more blank lines.
    const paragraphs = input
      .split(/\n\s*\n+/)
      .map((p) => p.trim())
      .filter(Boolean);

    if (paragraphs.length === 0) return;

  // Clear previous translations so a fresh Translate replaces the earlier output
  setTranslations([]);

  setIsTranslating(true);
    try {
        // Translate each paragraph sequentially to preserve order and append
        for (const para of paragraphs) {
          const translated = await translateText(para, sourceLang, targetLang);

          // Append new translation block
          setTranslations((prev) => [...prev, { source: para, translated }]);
        }
    } finally {
      setIsTranslating(false);
      // Optionally clear the input after translating; comment out if you prefer to keep it
      // setInput("");
    }
  };

  // Keyboard handler: allow Cmd/Ctrl+Enter to trigger translation without
  // preventing normal Enter (newline) behavior.
  const handleKeyDown = (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault();
      // Call translate only if not already translating
      if (!isTranslating) handleTranslate();
    }
    // (Clear shortcut removed) — Ctrl/Cmd+Delete handler removed to avoid conflicts.
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-6 bg-gray-100">
      <Loader visible={isTranslating} text="Translating..." />
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Language Translator</h2>

      <div className="w-full max-w-6xl flex flex-col md:flex-row gap-6 items-start">
        {/* Left: input */}
        <div className="w-full md:w-1/2 flex flex-col">
          <div className="flex gap-3 mb-4">
            <div>
              <label className="text-sm text-gray-600 block mb-1">Source</label>
              <Select value={sourceLang} onValueChange={(v) => setSourceLang(v)}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Source" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="hi">Hindi</SelectItem>
                  <SelectItem value="te">Telugu</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                  <SelectItem value="de">German</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm text-gray-600 block mb-1">Target</label>
              <Select value={targetLang} onValueChange={(v) => setTargetLang(v)}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Target" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="hi">Hindi</SelectItem>
                  <SelectItem value="te">Telugu</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                  <SelectItem value="de">German</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter text"
            className="w-full h-64 p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 bg-white"
          />

          {/* <div className="text-xs text-gray-500 mb-3">
            Shortcut:
            <span className="ml-2 inline-block">
              <KbdGroup>
                <Kbd className="bg-gray-800 w-[15px] text-white">^</Kbd>
                <span className="mx-1 text-xs text-gray-400">/</span>
                <Kbd className="bg-gray-800 text-white">Cmd</Kbd>
                <span className="mx-2 text-xs text-gray-400">+</span>
                <Kbd className="bg-gray-800 text-white">Enter</Kbd>
              </KbdGroup>
            </span>
          </div> */}

          <p className="text-sm text-gray-500 mb-4">Paste multiple paragraphs (separated by blank lines) or multiple inputs; click Translate once to translate all paragraphs — results will be appended on the right. Use Clear to reset.</p>

          <div className="flex gap-3 items-center">
            {/* Translate button with hover tooltip showing shortcut (Ctrl/Cmd + Enter). */}
            <div className="relative group inline-block">
              <button
                onClick={handleTranslate}
                disabled={isTranslating}
                className={"px-6 py-2 text-white font-semibold rounded-lg shadow transition " + (isTranslating ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700")}
              >
                {isTranslating ? "Translating..." : "Translate"}
              </button>

              {/* Tooltip: appears on hover or focus of the button (group) */}
              <div className="pointer-events-none absolute left-1/2 -bottom-10 z-50 -translate-x-1/2 transform opacity-0 scale-95 transition-all duration-150 group-hover:opacity-100 group-focus-within:opacity-100 group-hover:scale-100">
                <div className="bg-white border border-gray-200 text-sm text-gray-700 rounded-md px-2 py-1 shadow-md flex items-center gap-2">

                  <KbdGroup>
                    <Kbd className="bg-gray-800 w-5 text-white">⌃</Kbd>
                    <span className="mx-1 text-xs text-gray-400">/</span>
                    <Kbd className="bg-gray-800 text-white">⌘</Kbd>
                    <span className="mx-2 text-xs text-gray-400">+</span>
                    <Kbd className="bg-gray-800 text-white">⏎</Kbd>
                  </KbdGroup>
                </div>
              </div>
            </div>

            {input && input.trim() ? (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <button
                    disabled={isTranslating}
                    className={"px-4 py-2 text-gray-800 font-medium rounded-lg shadow transition " + (isTranslating ? "bg-gray-200 cursor-not-allowed" : "bg-gray-300 hover:bg-gray-400")}
                  >
                    Clear
                  </button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Clear translations?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will remove all translated output. This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => setTranslations([])}>Continue</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            ) : (
              <button
                onClick={() => setTranslations([])}
                disabled={isTranslating}
                className={"px-4 py-2 text-gray-800 font-medium rounded-lg shadow transition " + (isTranslating ? "bg-gray-200 cursor-not-allowed" : "bg-gray-300 hover:bg-gray-400")}
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Right: output */}
        <div className="w-full md:w-1/2">
          <h3 className="text-xl font-semibold text-gray-700 mb-13">Output</h3>
          <div className="w-full p-4 bg-white border border-gray-300 rounded-lg shadow-sm min-h-64">
            {translations.length > 0 ? (
              translations.map((t, i) => (
                <div key={i} className="mb-4 whitespace-pre-wrap">
                  {t.translated}
                </div>
              ))
            ) : (
              <div className="text-gray-400">No translations yet.</div>
            )}
          </div>
          <Button>Button</Button>
         
        </div>
      </div>
    </div>
  );
}

export default Translator;