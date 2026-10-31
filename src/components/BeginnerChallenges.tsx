import React, { useState } from 'react';
import { Target, HelpCircle, Eye, EyeOff, Check, Copy, Code2 } from 'lucide-react';
import { BEGINNER_CHALLENGES } from '../data/pythonCode';

export const BeginnerChallenges: React.FC = () => {
  const [revealedSolutions, setRevealedSolutions] = useState<Record<string, boolean>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const toggleSolution = (id: string) => {
    setRevealedSolutions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleCopy = async (id: string, code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 shrink-0 mt-0.5">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-slate-100">
              Desafios Práticos para Fixar o Aprendizado
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
              A melhor maneira de aprender a programar é modificando o código! Tente resolver cada
              desafio no seu próprio código antes de espiar a resposta.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {BEGINNER_CHALLENGES.map((challenge) => {
          const isRevealed = !!revealedSolutions[challenge.id];
          const isCopied = copiedId === challenge.id;

          let badgeColor = 'bg-emerald-950 text-emerald-300 border-emerald-800';
          if (challenge.difficulty === 'Médio') {
            badgeColor = 'bg-amber-950 text-amber-300 border-amber-800';
          } else if (challenge.difficulty === 'Avançado') {
            badgeColor = 'bg-purple-950 text-purple-300 border-purple-800';
          }

          return (
            <div
              key={challenge.id}
              className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-md flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded border font-semibold ${badgeColor}`}
                  >
                    Nível: {challenge.difficulty}
                  </span>
                </div>

                <h4 className="text-sm font-semibold text-slate-100">{challenge.title}</h4>

                <p className="text-xs text-slate-300 leading-relaxed">{challenge.description}</p>

                {/* Hint */}
                <div className="bg-slate-950/80 p-3 rounded-lg border border-slate-800 text-xs text-slate-400 flex items-start gap-2">
                  <HelpCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-slate-300">Dica:</strong> {challenge.hint}
                  </span>
                </div>
              </div>

              {/* Solution toggle */}
              <div className="mt-4 pt-3 border-t border-slate-800 space-y-2">
                <button
                  type="button"
                  onClick={() => toggleSolution(challenge.id)}
                  className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors cursor-pointer"
                >
                  {isRevealed ? (
                    <>
                      <EyeOff className="w-3.5 h-3.5 text-slate-400" />
                      <span>Ocultar Solução</span>
                    </>
                  ) : (
                    <>
                      <Eye className="w-3.5 h-3.5 text-amber-400" />
                      <span>Ver Solução em Python</span>
                    </>
                  )}
                </button>

                {isRevealed && (
                  <div className="relative mt-2">
                    <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 font-mono text-xs text-emerald-300 whitespace-pre overflow-x-auto leading-relaxed">
                      {challenge.solutionCode}
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy(challenge.id, challenge.solutionCode)}
                      className="absolute top-2 right-2 p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                      title="Copiar trecho"
                    >
                      {isCopied ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
