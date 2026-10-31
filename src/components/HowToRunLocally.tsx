import React, { useState } from 'react';
import { Laptop, Terminal as TerminalIcon, Check, Copy, AlertTriangle, Sparkles } from 'lucide-react';

export const HowToRunLocally: React.FC = () => {
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);

  const handleCopy = async (cmd: string) => {
    try {
      await navigator.clipboard.writeText(cmd);
      setCopiedCmd(cmd);
      setTimeout(() => setCopiedCmd(null), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <div className="space-y-6">
      {/* Introduction Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 shrink-0 mt-0.5">
            <Laptop className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-slate-100">
              Como Executar a Calculadora no seu Próprio Computador
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
              Rodar seus próprios programas na máquina local é um rito de passagem para todo
              programador! Siga o passo a passo de 3 etapas abaixo.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Step 1 */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-md flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-mono text-amber-400 uppercase tracking-wider font-semibold">
                Etapa 1
              </span>
              <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                Instalação
              </span>
            </div>
            <h4 className="text-sm font-semibold text-slate-100">Instalar o Python</h4>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Acesse o site oficial <strong className="text-amber-300">python.org</strong> e baixe a
              versão mais recente para seu sistema (Windows, macOS ou Linux).
            </p>

            <div className="mt-3 p-3 rounded-lg bg-amber-950/40 border border-amber-800/40 text-[11px] text-amber-200 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>
                <strong>Atenção no Windows:</strong> Marque a caixinha{' '}
                <em>"Add python.exe to PATH"</em> no instalador! Isso permite usar o comando python
                no terminal.
              </span>
            </div>
          </div>
        </div>

        {/* Step 2 */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-md flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-mono text-amber-400 uppercase tracking-wider font-semibold">
                Etapa 2
              </span>
              <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                Arquivo .py
              </span>
            </div>
            <h4 className="text-sm font-semibold text-slate-100">Criar o Arquivo</h4>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Abra seu editor preferido (como <strong>VS Code</strong>, <strong>IDLE</strong> ou até
              o Bloco de Notas) e salve o código com o nome:
            </p>

            <div className="mt-3 p-3 bg-slate-950 rounded-lg border border-slate-800 font-mono text-xs text-slate-200">
              calculadora.py
            </div>

            <p className="text-[11px] text-slate-400 mt-2">
              Você pode clicar no botão <strong>"Baixar .py"</strong> aqui nesta página para baixar
              o arquivo pronto direto na sua pasta Downloads!
            </p>
          </div>
        </div>

        {/* Step 3 */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-md flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-mono text-amber-400 uppercase tracking-wider font-semibold">
                Etapa 3
              </span>
              <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                Execução
              </span>
            </div>
            <h4 className="text-sm font-semibold text-slate-100">Executar no Terminal</h4>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Abra o Terminal (macOS/Linux) ou Prompt de Comando / PowerShell (Windows), navegue até
              a pasta do arquivo e digite:
            </p>

            <div className="mt-3 p-2.5 bg-slate-950 rounded-lg border border-slate-800 flex items-center justify-between font-mono text-xs text-emerald-400">
              <span>python calculadora.py</span>
              <button
                type="button"
                onClick={() => handleCopy('python calculadora.py')}
                className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
                title="Copiar comando"
              >
                {copiedCmd === 'python calculadora.py' ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>

            <p className="text-[11px] text-slate-400 mt-2">
              No macOS ou Linux, pode ser necessário usar <code>python3 calculadora.py</code>.
            </p>
          </div>
        </div>
      </div>

      {/* Editor recommendations */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg">
        <h4 className="text-sm font-semibold text-slate-200 mb-2 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          Dica de Ferramentas Recomendadas para Iniciantes:
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
            <strong className="text-slate-100 block mb-1">Visual Studio Code (VS Code)</strong>
            <span>
              O editor mais popular do mundo. Instale a extensão oficial 'Python' da Microsoft para
              ter auto-complete, destaque de cores e um botão 'Play' para rodar com um clique.
            </span>
          </div>
          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
            <strong className="text-slate-100 block mb-1">IDLE (Incluso com Python)</strong>
            <span>
              Já vem instalado automaticamente com o Python. É simples, leve e ótimo para os
              primeiros passos sem precisar configurar nada extra.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
