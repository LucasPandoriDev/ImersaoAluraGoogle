/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Code2,
  Terminal as TerminalIcon,
  BookOpen,
  Cpu,
  Target,
  Laptop,
  Copy,
  Check,
  Download,
  CheckCircle2,
} from 'lucide-react';
import { CodeViewer } from './components/CodeViewer';
import { Terminal } from './components/Terminal';
import { ComponentExplanations } from './components/ComponentExplanations';
import { VisualSimulator } from './components/VisualSimulator';
import { BeginnerChallenges } from './components/BeginnerChallenges';
import { HowToRunLocally } from './components/HowToRunLocally';
import { PYTHON_CALCULATOR_CODE } from './data/pythonCode';

type TabType = 'code_terminal' | 'explanations' | 'simulator' | 'challenges' | 'run_local';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('code_terminal');
  const [highlightedRange, setHighlightedRange] = useState<[number, number] | null>(null);
  const [headerCopied, setHeaderCopied] = useState(false);

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(PYTHON_CALCULATOR_CODE);
      setHeaderCopied(true);
      setTimeout(() => setHeaderCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  const handleDownloadPy = () => {
    const blob = new Blob([PYTHON_CALCULATOR_CODE], {
      type: 'text/x-python;charset=utf-8',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'calculadora.py';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleHighlightInCode = (range: [number, number]) => {
    setHighlightedRange(range);
    setActiveTab('code_terminal');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Header */}
      <header className="border-b border-slate-800/80 bg-slate-900/60 backdrop-blur sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-mono font-bold text-base shadow-sm">
              Py
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-bold text-slate-100 tracking-tight">
                  Calculadora Simples em Python
                </h1>
                <span className="text-[11px] text-slate-400 hidden sm:inline">
                  · 4 Operações Básicas
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Guia didático, código limpo e terminal interativo para iniciantes
              </p>
            </div>
          </div>

          {/* Quick Header Actions */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopyCode}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors cursor-pointer"
            >
              {headerCopied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-semibold">Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copiar Código</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleDownloadPy}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-semibold shadow-sm transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Baixar calculadora.py</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <nav className="flex space-x-1 sm:space-x-2 overflow-x-auto py-1 text-xs font-medium border-t border-slate-800/60">
            <button
              type="button"
              onClick={() => {
                setActiveTab('code_terminal');
                setHighlightedRange(null);
              }}
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'code_terminal'
                  ? 'bg-slate-800 text-amber-300 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Code2 className="w-4 h-4" />
              <span>Código & Terminal</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('explanations')}
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'explanations'
                  ? 'bg-slate-800 text-amber-300 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Explicação dos Componentes</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('simulator')}
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'simulator'
                  ? 'bg-slate-800 text-amber-300 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Cpu className="w-4 h-4" />
              <span>Simulador Passo a Passo</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('challenges')}
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'challenges'
                  ? 'bg-slate-800 text-amber-300 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Target className="w-4 h-4" />
              <span>Desafios Práticos</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('run_local')}
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'run_local'
                  ? 'bg-slate-800 text-amber-300 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Laptop className="w-4 h-4" />
              <span>Como Rodar no seu Computador</span>
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6">
        {activeTab === 'code_terminal' && (
          <div className="space-y-6">
            {/* Quick summary strip for beginners */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-slate-100">
                    Código estruturado em 4 Funções + Menu Interativo + Tratamento de Erros
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Você pode ler o código à esquerda e interagir com o programa em tempo real no
                    terminal à direita!
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setActiveTab('explanations')}
                className="text-xs text-amber-400 hover:text-amber-300 font-medium underline underline-offset-4 cursor-pointer"
              >
                Ver explicação detalhada de cada linha →
              </button>
            </div>

            {/* Split layout: Code Editor on Left/Top, Terminal on Right */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-7">
                <CodeViewer
                  highlightedRange={highlightedRange}
                  onRunInTerminal={() => {
                    const el = document.getElementById('terminal-container');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                />
              </div>

              <div id="terminal-container" className="lg:col-span-5 sticky top-24">
                <Terminal />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'explanations' && (
          <ComponentExplanations onHighlightInCode={handleHighlightInCode} />
        )}

        {activeTab === 'simulator' && <VisualSimulator />}

        {activeTab === 'challenges' && <BeginnerChallenges />}

        {activeTab === 'run_local' && <HowToRunLocally />}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span>Python 3 · Guia didático para iniciantes em programação</span>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setActiveTab('explanations')}
              className="hover:text-slate-300 transition-colors cursor-pointer"
            >
              Componentes
            </button>
            <span>·</span>
            <button
              type="button"
              onClick={() => setActiveTab('simulator')}
              className="hover:text-slate-300 transition-colors cursor-pointer"
            >
              Simulador
            </button>
            <span>·</span>
            <button
              type="button"
              onClick={() => setActiveTab('run_local')}
              className="hover:text-slate-300 transition-colors cursor-pointer"
            >
              Guia Local
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
