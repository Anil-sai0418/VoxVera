import React, { useState } from "react";
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
import { ArrowLeftRight } from "lucide-react";
import Loader from "../components/ui/loader";

function Translator() {
  const [input, setInput] = useState("");
  const [translations, setTranslations] = useState([]);
  const [sourceLang, setSourceLang] = useState("en");
  const [targetLang, setTargetLang] = useState("te");
  const [isTranslating, setIsTranslating] = useState(false);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
      <Loader visible={isTranslating} text="Translating paragraphs..." />
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 px-2 sm:px-0">
          <h1 className="text-4xl sm:text-5xl font-bold text-blue-700 mb-2">VoxVera</h1>
          <p className="text-md sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Easily translate text between multiple languages. Paste your paragraphs, and get them translated all at once.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Input Panel */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 flex flex-col">
            <div className="flex flex-col sm:flex-row gap-4 mb-4 sm:items-end">
              <div className="flex-1">
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

              <div className="flex justify-center sm:flex-none">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleSwap}
                  className="p-2 sm:mt-7 -mt-2"
                  disabled={sourceLang === targetLang}
                >
                  <ArrowLeftRight className="h-5 w-5" />
                </Button>
              </div>

              <div className="flex-1">
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
              className="w-full h-52 sm:h-64 p-3 sm:p-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />

            <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row gap-3 justify-between items-start sm:items-center">
              <p className="text-xs text-gray-500 flex-1 sm:flex-none">
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
         <div className="bg-white h-[500px] rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 flex flex-col">
  <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 flex items-center">
    Translations
    {translations.length > 0 && (
      <span className="ml-2 text-sm sm:text-base text-gray-500 font-normal">
        ({translations.length} paragraphs)
      </span>
    )}
  </h2>

  <div className="flex-1 overflow-y-auto bg-gray-50 rounded-lg p-3 sm:p-4 border border-gray-200">
    {translations.length > 0 ? (
      <div className="space-y-4 sm:space-y-6">
        {translations.map((t, i) => (
          <div key={i} className="space-y-2">
            <div className="bg-white p-2 sm:p-3 rounded-md border-l-4 border-blue-500">
              <p className="text-sm sm:text-base text-gray-800 whitespace-pre-wrap">{t.source}</p>
            </div>
            <div className="bg-white p-2 sm:p-3 rounded-md border-l-4 border-green-500">
              <p className="text-sm sm:text-base text-gray-800 whitespace-pre-wrap font-medium">{t.translated}</p>
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
    </div>
  );
}

export default Translator;
