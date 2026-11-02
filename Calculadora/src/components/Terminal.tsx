import React, { useState, useEffect, useRef } from 'react';
import { Terminal as TerminalIcon, RotateCcw, Trash2, Send, CornerDownLeft, Sparkles } from 'lucide-react';
import { CalculatorInteractiveSession, TerminalMessage, evaluatePythonExpression } from '../utils/pythonRunner';

interface TerminalProps {
  onHighlightComponent?: (componentId: string) => void;
}

export const Terminal: React.FC<TerminalProps> = () => {
  const [messages, setMessages] = useState<TerminalMessage[]>([]);
  const [promptLabel, setPromptLabel] = useState<string>('');
  const [inputValue, setInputValue] = useState<string>('');
  const [mode, setMode] = useState<'interactive' | 'eval'>('interactive');
  const [evalInput, setEvalInput] = useState<string>('adicao(12, 8)');
  const [session, setSession] = useState<CalculatorInteractiveSession | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const initSession = () => {
    setMessages([]);
    const newSession = new CalculatorInteractiveSession(
      (msg) => {
        setMessages((prev) => [...prev, msg]);
      },
      (pText) => {
        setPromptLabel(pText);
      }
    );
    newSession.start();
    setSession(newSession);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  useEffect(() => {
    initSession();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, promptLabel]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() && !promptLabel) return;

    if (session && !session.isFinished()) {
      session.handleInput(inputValue);
      setInputValue('');
    } else {
      // Finished, restart
      initSession();
    }
  };

  const handleClear = () => {
    setMessages([]);
  };

  const handleQuickTest = (type: 'soma' | 'divZero' | 'erroLetra' | 'sair') => {
    if (!session || session.isFinished()) {
      initSession();
    }

    if (type === 'soma') {
      setTimeout(() => session?.handleInput('1'), 150);
      setTimeout(() => session?.handleInput('15'), 400);
      setTimeout(() => session?.handleInput('27.5'), 650);
    } else if (type === 'divZero') {
      setTimeout(() => session?.handleInput('4'), 150);
      setTimeout(() => session?.handleInput('42'), 400);
      setTimeout(() => session?.handleInput('0'), 650);
    } else if (type === 'erroLetra') {
      setTimeout(() => session?.handleInput('1'), 150);
      setTimeout(() => session?.handleInput('olamundo'), 400);
    } else if (type === 'sair') {
      setTimeout(() => session?.handleInput('0'), 150);
    }
  };

  const handleEvalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!evalInput.trim()) return;

    const query = evalInput.trim();
    const evaluated = evaluatePythonExpression(query);

    setMessages((prev) => [
      ...prev,
      {
        id: Math.random().toString(36).substring(2, 9),
        type: 'input',
        text: `>>> ${query}`,
        timestamp: new Date(),
      },
      {
        id: Math.random().toString(36).substring(2, 9),
        type: evaluated.success ? 'output' : 'error',
        text: evaluated.result,
        timestamp: new Date(),
      },
    ]);

    setEvalInput('');
  };

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-2xl flex flex-col h-[520px]">
      {/* Terminal Titlebar */}
      <div className="bg-slate-900 px-4 py-3 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <TerminalIcon className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-mono font-medium text-slate-200">
            Terminal Python 3.12 (Console Interativo)
          </span>
          <span className="text-xs text-slate-500 hidden sm:inline">· calculadora.py</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Mode Switcher */}
          <div className="flex items-center bg-slate-950 p-0.5 rounded-lg border border-slate-800 text-xs">
            <button
              type="button"
              onClick={() => setMode('interactive')}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                mode === 'interactive'
                  ? 'bg-slate-800 text-white'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Programa Completo
            </button>
            <button
              type="button"
              onClick={() => setMode('eval')}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                mode === 'eval'
                  ? 'bg-slate-800 text-white'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Console Rápido (REPL)
            </button>
          </div>

          <button
            type="button"
            onClick={initSession}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
            title="Reiniciar Execução"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
            title="Limpar Tela"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Quick Test bar */}
      <div className="bg-slate-900/60 px-4 py-2 border-b border-slate-800/80 flex items-center gap-2 overflow-x-auto text-[11px]">
        <span className="text-slate-400 font-medium shrink-0 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-amber-400" /> Testes Rápidos:
        </span>
        <button
          type="button"
          onClick={() => handleQuickTest('soma')}
          className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white whitespace-nowrap transition-colors cursor-pointer"
        >
          Somar 15 + 27.5
        </button>
        <button
          type="button"
          onClick={() => handleQuickTest('divZero')}
          className="px-2.5 py-1 rounded bg-rose-950/60 hover:bg-rose-900/60 text-rose-300 whitespace-nowrap transition-colors cursor-pointer border border-rose-800/40"
        >
          Dividir por Zero (42 / 0)
        </button>
        <button
          type="button"
          onClick={() => handleQuickTest('erroLetra')}
          className="px-2.5 py-1 rounded bg-amber-950/60 hover:bg-amber-900/60 text-amber-300 whitespace-nowrap transition-colors cursor-pointer border border-amber-800/40"
        >
          Simular Letra no Input
        </button>
        <button
          type="button"
          onClick={() => handleQuickTest('sair')}
          className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white whitespace-nowrap transition-colors cursor-pointer"
        >
          Opção Sair (0)
        </button>
      </div>

      {/* Terminal Output Area */}
      <div className="flex-1 overflow-y-auto p-4 font-mono text-xs sm:text-[13px] space-y-1 bg-slate-950 select-text">
        {messages.map((m) => {
          let colorClass = 'text-slate-200';
          if (m.type === 'system') colorClass = 'text-sky-400';
          if (m.type === 'input') colorClass = 'text-amber-300 font-semibold';
          if (m.type === 'error') colorClass = 'text-rose-400 font-semibold';
          if (m.type === 'success') colorClass = 'text-emerald-400 font-semibold';

          return (
            <div key={m.id} className={`whitespace-pre-wrap leading-relaxed ${colorClass}`}>
              {m.text}
            </div>
          );
        })}

        {/* Active prompt row for interactive session */}
        {mode === 'interactive' && promptLabel && (
          <div className="text-amber-400 font-medium whitespace-pre-wrap flex items-center gap-1">
            <span>{promptLabel}</span>
            <span className="inline-block w-2 h-4 bg-amber-400 animate-pulse ml-0.5"></span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input bar at bottom */}
      <div className="p-3 bg-slate-900 border-t border-slate-800">
        {mode === 'interactive' ? (
          <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <span className="text-xs font-mono text-amber-400 font-bold shrink-0">
              {promptLabel ? 'input >' : 'cmd >'}
            </span>
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={promptLabel || 'Digite aqui e pressione Enter...'}
              className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs font-mono text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-colors"
            />
            <button
              type="submit"
              className="inline-flex items-center gap-1 px-3 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-slate-950 text-xs font-semibold transition-colors cursor-pointer shadow-sm shrink-0"
            >
              <span>Enviar</span>
              <CornerDownLeft className="w-3.5 h-3.5" />
            </button>
          </form>
        ) : (
          <form onSubmit={handleEvalSubmit} className="flex items-center gap-2">
            <span className="text-xs font-mono text-emerald-400 font-bold shrink-0">&gt;&gt;&gt;</span>
            <input
              type="text"
              value={evalInput}
              onChange={(e) => setEvalInput(e.target.value)}
              placeholder="Ex: adicao(25, 15) ou 100 / 4"
              className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs font-mono text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-colors"
            />
            <button
              type="submit"
              className="inline-flex items-center gap-1 px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white text-xs font-medium transition-colors cursor-pointer shadow-sm shrink-0"
            >
              <span>Avaliar</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
