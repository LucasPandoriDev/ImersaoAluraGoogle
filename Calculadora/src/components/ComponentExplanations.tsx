import React, { useState } from 'react';
import { BookOpen, AlertCircle, CheckCircle, Code2, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import { CODE_COMPONENTS, PYTHON_OPERATORS_TABLE, CodeComponentExplanation } from '../data/pythonCode';

interface ComponentExplanationsProps {
  onHighlightInCode: (range: [number, number]) => void;
}

export const ComponentExplanations: React.FC<ComponentExplanationsProps> = ({
  onHighlightInCode,
}) => {
  const [selectedCompId, setSelectedCompId] = useState<string>(CODE_COMPONENTS[0].id);
  const [showOperators, setShowOperators] = useState<boolean>(true);

  const selectedComp =
    CODE_COMPONENTS.find((c) => c.id === selectedCompId) || CODE_COMPONENTS[0];

  return (
    <div className="space-y-6">
      {/* Overview Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 shrink-0 mt-0.5">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-slate-100">
              Guia Completo dos Componentes da Calculadora
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
              Programar em Python é como montar blocos de Lego. Cada parte do código tem uma
              responsabilidade única. Explore abaixo como as funções, laços, condicionais e
              tratamentos de erro trabalham juntos.
            </p>
          </div>
        </div>
      </div>

      {/* Two Column Layout: Navigation tabs on left, rich card on right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Navigation list */}
        <div className="lg:col-span-4 space-y-2">
          <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block px-1">
            Componentes Fundamentais:
          </span>
          {CODE_COMPONENTS.map((comp) => {
            const isSelected = comp.id === selectedCompId;
            return (
              <button
                key={comp.id}
                type="button"
                onClick={() => setSelectedCompId(comp.id)}
                className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer flex flex-col gap-1 ${
                  isSelected
                    ? 'bg-amber-500/10 border-amber-500/80 text-amber-200 shadow-md'
                    : 'bg-slate-900/80 hover:bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold">{comp.title}</span>
                  <span className="text-[10px] font-mono text-slate-500">
                    L{comp.lineRange[0]}-{comp.lineRange[1]}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 line-clamp-1">{comp.summary}</p>
              </button>
            );
          })}
        </div>

        {/* Selected Component Details */}
        <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest block mb-1">
                Linhas {selectedComp.lineRange[0]} a {selectedComp.lineRange[1]} do código
              </span>
              <h4 className="text-base font-bold text-slate-100">{selectedComp.title}</h4>
            </div>

            <button
              type="button"
              onClick={() => onHighlightInCode(selectedComp.lineRange)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-amber-300 border border-slate-700 transition-colors cursor-pointer"
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Ver no Código</span>
            </button>
          </div>

          {/* O que é e por que usamos */}
          <div className="space-y-2">
            <h5 className="text-xs font-semibold text-slate-200 uppercase tracking-wider font-mono">
              Para que serve este componente:
            </h5>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-950/60 p-3.5 rounded-lg border border-slate-800/80">
              {selectedComp.role}
            </p>
          </div>

          {/* Code snippet */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-mono text-[11px]">Trecho de exemplo:</span>
            </div>
            <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-800 font-mono text-xs text-amber-200 whitespace-pre overflow-x-auto leading-relaxed border-l-4 border-l-purple-400">
              {selectedComp.snippet}
            </div>
          </div>

          {/* Pontos Chave para Iniciantes */}
          <div className="space-y-2">
            <h5 className="text-xs font-semibold text-slate-200 uppercase tracking-wider font-mono">
              Pontos-Chave para Entender:
            </h5>
            <div className="space-y-2">
              {selectedComp.details.map((detail, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{detail}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Armadilhas de Iniciantes */}
          {selectedComp.beginnerPitfalls && selectedComp.beginnerPitfalls.length > 0 && (
            <div className="bg-rose-950/30 border border-rose-900/50 rounded-lg p-3.5 space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-rose-300">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                <span>Armadilhas Frequentes de Quem Está Começando:</span>
              </div>
              <ul className="space-y-1.5 pl-6 list-disc text-xs text-rose-200/90 leading-relaxed">
                {selectedComp.beginnerPitfalls.map((pitfall, idx) => (
                  <li key={idx}>{pitfall}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Python Operators Cheat Sheet */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg">
        <button
          type="button"
          onClick={() => setShowOperators(!showOperators)}
          className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-slate-800/40 transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <span className="text-amber-400 font-mono font-bold text-sm">+ - * /</span>
            <div>
              <h4 className="text-sm font-semibold text-slate-100">
                Tabela de Operadores Matemáticos em Python
              </h4>
              <p className="text-xs text-slate-400">
                Entenda a diferença entre divisão real (/), divisão inteira (//), resto (%) e potência (**)
              </p>
            </div>
          </div>
          {showOperators ? (
            <ChevronUp className="w-4 h-4 text-slate-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-400" />
          )}
        </button>

        {showOperators && (
          <div className="p-4 border-t border-slate-800 overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-mono">
                  <th className="py-2 px-3">Operador</th>
                  <th className="py-2 px-3">Nome</th>
                  <th className="py-2 px-3">Exemplo</th>
                  <th className="py-2 px-3">Resultado</th>
                  <th className="py-2 px-3">Explicação</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-850">
                {PYTHON_OPERATORS_TABLE.map((op) => (
                  <tr key={op.simbolo} className="hover:bg-slate-800/40">
                    <td className="py-2.5 px-3 font-mono font-bold text-amber-300">
                      {op.simbolo}
                    </td>
                    <td className="py-2.5 px-3 font-medium text-slate-200">{op.nome}</td>
                    <td className="py-2.5 px-3 font-mono text-slate-300">{op.exemplo}</td>
                    <td className="py-2.5 px-3 font-mono font-semibold text-emerald-400">
                      {op.resultado}
                    </td>
                    <td className="py-2.5 px-3 text-slate-400">{op.explicacao}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
