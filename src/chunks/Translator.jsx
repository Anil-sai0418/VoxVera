import React, { useState, useRef, useEffect } from "react";
import translateText from "../chunks/ translateText";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "../components/ui/select";
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
import { ArrowLeftRight, ArrowUp, ArrowDown } from "lucide-react";
import { Maximize2, Minimize2, Copy } from "lucide-react";
import Loader from "../components/ui/loader";

function Translator() {
  const [input, setInput] = useState("");
  const [translations, setTranslations] = useState([]);
  const [sourceLang, setSourceLang] = useState("en");
  const [targetLang, setTargetLang] = useState("te");
  const [isTranslating, setIsTranslating] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef(null);

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // Fullscreen logic
  const handleFullscreenToggle = () => {
    const el = containerRef.current;
    if (!el) return;
    if (!isFullscreen) {
      if (el.requestFullscreen) el.requestFullscreen();
      else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
      else if (el.mozRequestFullScreen) el.mozRequestFullScreen();
      else if (el.msRequestFullscreen) el.msRequestFullscreen();
    } else {
      if (document.exitFullscreen) document.exitFullscreen();
      else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
      else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
      else if (document.msExitFullscreen) document.msExitFullscreen();
    }
  };

  useEffect(() => {
    const onFullscreenChange = () => {
      const fsElement = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement;
      setIsFullscreen(!!fsElement);
    };
    document.addEventListener("fullscreenchange", onFullscreenChange);
    document.addEventListener("webkitfullscreenchange", onFullscreenChange);
    document.addEventListener("mozfullscreenchange", onFullscreenChange);
    document.addEventListener("MSFullscreenChange", onFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", onFullscreenChange);
      document.removeEventListener("webkitfullscreenchange", onFullscreenChange);
      document.removeEventListener("mozfullscreenchange", onFullscreenChange);
      document.removeEventListener("MSFullscreenChange", onFullscreenChange);
    };
  }, []);

  const handleTranslate = async () => {
    if (!input || !input.trim()) return;
    const paragraphs = input.split(/\n\s*\n+/).map((p) => p.trim()).filter(Boolean);
    if (paragraphs.length === 0) return;

    setTranslations([]);
    setIsTranslating(true);

    try {
      for (const para of paragraphs) {
        const translated = await translateText(para, sourceLang, targetLang);
        setTranslations((prev) => [...prev, { source: para, translated }]);
      }
    } finally {
      setIsTranslating(false);
    }
  };

  const handleSwap = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
  };

  const handleKeyDown = (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault();
      if (!isTranslating) handleTranslate();
    }
  };

  const clearAll = () => {
    setInput("");
    setTranslations([]);
  };

  // Copy all translated text as a single block
  const handleCopyAll = () => {
    if (translations.length === 0) return;

    const allText = translations
      .map((t) => t.translated.trim())
      .join("\n\n");

    navigator.clipboard.writeText(allText);

    setToastMessage("All translated text copied!");
    setShowToast(true);

    setTimeout(() => setShowToast(false), 2000);
  };

  // Copy a single translated paragraph
  const handleCopyOne = (text) => {
    navigator.clipboard.writeText(text);

    setToastMessage("Translation copied!");
    setShowToast(true);

    setTimeout(() => setShowToast(false), 2000);
  };

  return (
    <div
      ref={containerRef}
      className={`min-h-screen bg-linear-to-br from-slate-50 to-blue-50 py-8 px-4 sm:px-6 lg:px-8 relative transition-all duration-300 ${isFullscreen ? "z-50 fixed inset-0 w-screen h-screen overflow-auto flex items-center justify-center" : ""}`}
    >
      <Loader visible={isTranslating} text="Translating paragraphs..." />
  <div className={`max-w-7xl mx-auto relative ${isFullscreen ? 'w-full' : ''}`}>
        <div className="text-center mb-8 px-2 sm:px-0">
          <h1 className="text-4xl sm:text-5xl font-semibold text-blue-800 mb-3">VoxVera</h1>
          <p className="hidden lg:block text-md lg:text-lg text-gray-600 max-w-2xl mx-auto">
            Easily translate text between multiple languages. Paste your paragraphs, and get them translated all at once.
          </p>
        </div>

    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch ${isFullscreen ? "lg:h-[80vh]" : ""}`}>
          {/* Input Panel */}
          <div className={`bg-white h-[500px] rounded-lg border border-gray-200 p-5 flex flex-col transition-all duration-300 ${isFullscreen ? 'lg:min-h-[500px]' : ''}`}> 
            <div className="flex flex-col sm:flex-row gap-6 mb-6 sm:items-center justify-between">
              <div className="flex-1 bg-white p-4 rounded-lg border border-gray-300">
                <label className="text-sm font-medium text-gray-700 block mb-2">Source Language</label>
                <Select value={sourceLang} onValueChange={setSourceLang}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
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

              <div className="flex justify-center items-center">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleSwap}
                  className="p-2 bg-white rounded-full border border-gray-300 hover:bg-gray-100 transition"
                  disabled={sourceLang === targetLang}
                >
                  {/* Show left-right arrow on sm+ screens, up-down on xs */}
                  <span className="hidden sm:inline">
                    <ArrowLeftRight className="h-5 w-5" />
                  </span>
                  <span className="sm:hidden flex flex-col items-center justify-center">
                    <ArrowUp className="h-4 w-4" />
                    <ArrowDown className="h-4 w-4 -mt-1" />
                  </span>
                </Button>
              </div>

              <div className="flex-1 bg-white p-4 rounded-lg border border-gray-300">
                <label className="text-sm font-medium text-gray-700 block mb-2">Target Language</label>
                <Select value={targetLang} onValueChange={setTargetLang}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
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
              placeholder="Enter your text here... Use blank lines to separate paragraphs."
              className={`w-full p-4 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-1 focus:ring-gray-400 text-sm bg-white transition-all duration-300 ${isFullscreen ? 'h-80 sm:h-96' : 'h-52 sm:h-64'}`}
            />

            <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row gap-3 justify-between items-start sm:items-center">
              <p className="hidden lg:block text-xs text-gray-500 flex-1">
                <kbd className="bg-gray-200 px-1.5 py-0.5 rounded text-xs font-mono mr-1">⌘</kbd> +{" "}
                <kbd className="bg-gray-200 px-1.5 py-0.5 rounded text-xs font-mono">Enter</kbd> to translate
              </p>
              <div className="flex gap-3 flex-wrap sm:flex-nowrap">
                <Button
                  onClick={handleTranslate}
                  disabled={isTranslating || !input.trim()}
                  className="px-5 py-2 font-medium"
                  variant={isTranslating ? "secondary" : "default"}
                >
                  {isTranslating ? "Translating..." : "Translate"}
                </Button>
                {(input.trim() || translations.length > 0) && (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" disabled={isTranslating}>
                        Clear All
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Clear everything?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This will remove your input and all translations. This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={clearAll}>Clear</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                )}
              </div>
            </div>
          </div>

          {/* Output Panel */}
         <div className="bg-white h-[500px] rounded-lg border border-gray-200 p-5 flex flex-col">

    <div className="flex items-center justify-between mb-4 gap-2 flex-wrap">
      <h2 className="text-lg sm:text-xl font-semibold text-gray-900 flex items-center">
        Translations
        {translations.length > 0 && (
          <span className="ml-2 text-sm sm:text-base text-gray-500 font-normal">
            ({translations.length} paragraphs)
          </span>
        )}
      </h2>

      <div className="flex items-center gap-2">
        {translations.length > 0 && (
          <button
            onClick={handleCopyAll}
            disabled={translations.length === 0}
            className="bg-white/80 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed rounded-full p-2 shadow border border-gray-200 transition"
            aria-label="Copy all translations"
            type="button"
          >
            <Copy className="w-5 h-5 text-blue-700" />
          </button>
        )}

        <button
          onClick={handleFullscreenToggle}
          className="bg-white/80 hover:bg-white rounded-full p-2 shadow border border-gray-200 transition"
          aria-label={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
          type="button"
        >
          {isFullscreen ? (
            <Minimize2 className="w-5 h-5 text-blue-700" />
          ) : (
            <Maximize2 className="w-5 h-5 text-blue-700" />
          )}
        </button>
      </div>
    </div>

  <div className="flex-1 overflow-y-auto bg-gray-50 rounded-lg p-3 sm:p-4 border border-gray-200">
    {translations.length > 0 ? (
      <div className="space-y-4 sm:space-y-6">
        {translations.map((t, i) => (
          <div key={i} className="space-y-2">
            <div className="bg-gray-100 p-3 rounded-md border border-gray-200">
              <p className="text-sm sm:text-base text-gray-800 whitespace-pre-wrap">{t.source}</p>
            </div>
            <div className="bg-gray-100 p-3 rounded-md border border-gray-300 flex items-center justify-between">
              <p className="text-sm sm:text-base text-gray-800 whitespace-pre-wrap font-medium flex-1">{t.translated}</p>
              <button
                onClick={() => handleCopyOne(t.translated)}
                className="ml-2 bg-white/80 hover:bg-white rounded-full p-1 shadow border border-gray-200 transition"
                aria-label="Copy this translation"
                type="button"
              >
                <Copy className="w-4 h-4 text-blue-700" />
              </button>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <div className="flex flex-col items-center justify-center h-full text-gray-400">
        <p className="text-sm sm:text-base">No translations yet.</p>
        <p className="text-xs sm:text-sm mt-1">Translate some text on the left to get started.</p>
      </div>
    )}
  </div>
</div>

        </div>
      </div>
      {showToast && (
        <div className="fixed top-6 right-6 z-[100] bg-black text-white px-4 py-2 rounded-md shadow-lg text-sm animate-fade-in">
          {toastMessage}
        </div>
      )}
    </div>
  );
}

export default Translator;
