import React, { useState } from 'react';
import { Copy, Check, Download, Play, Info } from 'lucide-react';
import { PYTHON_CALCULATOR_CODE } from '../data/pythonCode';

interface CodeViewerProps {
  highlightedRange?: [number, number] | null;
  onSelectComponent?: (id: string) => void;
  onRunInTerminal: () => void;
}

export const CodeViewer: React.FC<CodeViewerProps> = ({
  highlightedRange,
  onRunInTerminal,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(PYTHON_CALCULATOR_CODE);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  const handleDownload = () => {
    const blob = new Blob([PYTHON_CALCULATOR_CODE], { type: 'text/x-python;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'calculadora.py';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const lines = PYTHON_CALCULATOR_CODE.split('\n');

  // Syntax highlighting helper for individual tokens
  const highlightLine = (text: string) => {
    // Check if line is a comment
    const commentIndex = text.indexOf('#');
    if (commentIndex === 0) {
      return <span className="text-emerald-400 italic">{text}</span>;
    }

    let codePart = text;
    let commentPart = '';
    if (commentIndex > 0) {
      codePart = text.slice(0, commentIndex);
      commentPart = text.slice(commentIndex);
    }

    // Process codePart tokens
    // Replace Python strings first, then keywords
    const parts: React.ReactNode[] = [];
    let remaining = codePart;
    let keyIdx = 0;

    const regex = /("""[\s\S]*?"""|f?"[^"\\]*(?:\\.[^"\\]*)*"|f?'[^'\\]*(?:\\.[^'\\]*)*'|\b(?:def|return|while|True|False|break|continue|if|elif|else|try|except|import|from|in|not|is|as)\b|\b(?:print|input|float|int|isinstance|round|strip|ValueError|len)\b|\b\d+(?:\.\d+)?\b|[+\-*/=<>!%]+|[()[\],:])/g;

    let match;
    let lastIndex = 0;

    while ((match = regex.exec(remaining)) !== null) {
      const matchIndex = match.index;
      const token = match[0];

      // Add plain text before match
      if (matchIndex > lastIndex) {
        parts.push(
          <span key={`txt-${keyIdx++}`} className="text-slate-200">
            {remaining.slice(lastIndex, matchIndex)}
          </span>
        );
      }

      // Categorize token
      if (token.startsWith('#')) {
        parts.push(
          <span key={`tok-${keyIdx++}`} className="text-emerald-400 italic">
            {token}
          </span>
        );
      } else if (token.startsWith('"') || token.startsWith("'") || token.startsWith('f"') || token.startsWith("f'")) {
        parts.push(
          <span key={`tok-${keyIdx++}`} className="text-amber-300">
            {token}
          </span>
        );
      } else if (['def', 'return', 'while', 'True', 'False', 'break', 'continue', 'if', 'elif', 'else', 'try', 'except', 'import', 'from', 'in', 'not', 'is', 'as'].includes(token)) {
        parts.push(
          <span key={`tok-${keyIdx++}`} className="text-purple-400 font-semibold">
            {token}
          </span>
        );
      } else if (['print', 'input', 'float', 'int', 'isinstance', 'round', 'strip', 'ValueError', 'len'].includes(token)) {
        parts.push(
          <span key={`tok-${keyIdx++}`} className="text-sky-300">
            {token}
          </span>
        );
      } else if (/^\d+(?:\.\d+)?$/.test(token)) {
        parts.push(
          <span key={`tok-${keyIdx++}`} className="text-orange-300">
            {token}
          </span>
        );
      } else if (/[+\-*/=<>!%]+/.test(token)) {
        parts.push(
          <span key={`tok-${keyIdx++}`} className="text-pink-400">
            {token}
          </span>
        );
      } else {
        parts.push(
          <span key={`tok-${keyIdx++}`} className="text-slate-300">
            {token}
          </span>
        );
      }

      lastIndex = regex.lastIndex;
    }

    if (lastIndex < remaining.length) {
      parts.push(
        <span key={`txt-${keyIdx++}`} className="text-slate-200">
          {remaining.slice(lastIndex)}
        </span>
      );
    }

    return (
      <>
        {parts}
        {commentPart && (
          <span className="text-emerald-400 italic">{commentPart}</span>
        )}
      </>
    );
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl flex flex-col">
      {/* Top action toolbar */}
      <div className="bg-slate-950/80 px-4 py-3 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="w-3 h-3 rounded-full bg-rose-500/80"></span>
            <span className="w-3 h-3 rounded-full bg-amber-500/80"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-500/80"></span>
          </div>
          <span className="text-xs font-mono font-medium text-slate-300 tracking-wide">
            calculadora.py
          </span>
          <span className="text-xs text-slate-500 hidden sm:inline">· Python 3 · 92 linhas</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onRunInTerminal}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white text-xs font-medium shadow-sm transition-colors cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Executar no Terminal</span>
          </button>

          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-medium border border-slate-700 transition-colors cursor-pointer"
            title="Copiar código completo"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-semibold">Copiado!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copiar</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleDownload}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-medium border border-slate-700 transition-colors cursor-pointer"
            title="Baixar arquivo calculadora.py"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Baixar .py</span>
          </button>
        </div>
      </div>

      {highlightedRange && (
        <div className="bg-amber-500/10 border-b border-amber-500/20 px-4 py-2 text-xs text-amber-300 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 shrink-0" />
            <span>
              Destacando linhas <strong>{highlightedRange[0]} a {highlightedRange[1]}</strong>
            </span>
          </div>
          <span className="text-slate-400 text-[11px]">Veja a explicação abaixo</span>
        </div>
      )}

      {/* Code contents with line numbers */}
      <div className="overflow-x-auto max-h-[640px] p-4 text-xs sm:text-[13px] font-mono leading-relaxed bg-slate-900 selection:bg-amber-500/20">
        <table className="w-full border-collapse">
          <tbody>
            {lines.map((line, idx) => {
              const lineNum = idx + 1;
              const isHighlighted =
                highlightedRange &&
                lineNum >= highlightedRange[0] &&
                lineNum <= highlightedRange[1];

              return (
                <tr
                  key={lineNum}
                  id={`code-line-${lineNum}`}
                  className={`transition-colors duration-150 ${
                    isHighlighted
                      ? 'bg-amber-500/15 border-l-2 border-amber-400'
                      : 'hover:bg-slate-800/40'
                  }`}
                >
                  <td className="w-10 pr-4 text-right select-none text-slate-600 font-mono text-[11px] align-top py-0.5">
                    {lineNum}
                  </td>
                  <td className="whitespace-pre font-mono py-0.5 pl-2">
                    {highlightLine(line)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer hint */}
      <div className="bg-slate-950 px-4 py-2 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
        <span>Dica: O Python usa indentação (4 espaços) para organizar blocos de código.</span>
        <span className="text-slate-500">calculadora.py pronto para rodar</span>
      </div>
    </div>
  );
};
