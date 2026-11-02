import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, AlertTriangle, Play, RefreshCw, Cpu, Layers } from 'lucide-react';

export const VisualSimulator: React.FC = () => {
  const [num1, setNum1] = useState<number>(10);
  const [num2, setNum2] = useState<number>(5);
  const [operation, setOperation] = useState<'adicao' | 'subtracao' | 'multiplicacao' | 'divisao'>('adicao');
  const [currentStep, setCurrentStep] = useState<number>(0);

  const operationsMeta = {
    adicao: {
      name: 'Adição',
      symbol: '+',
      optionNumber: '1',
      funcName: 'adicao',
      codeSnippet: 'def adicao(a, b):\n    return a + b',
      calc: (a: number, b: number) => a + b,
      isZeroError: false,
    },
    subtracao: {
      name: 'Subtração',
      symbol: '-',
      optionNumber: '2',
      funcName: 'subtracao',
      codeSnippet: 'def subtracao(a, b):\n    return a - b',
      calc: (a: number, b: number) => a - b,
      isZeroError: false,
    },
    multiplicacao: {
      name: 'Multiplicação',
      symbol: '*',
      optionNumber: '3',
      funcName: 'multiplicacao',
      codeSnippet: 'def multiplicacao(a, b):\n    return a * b',
      calc: (a: number, b: number) => a * b,
      isZeroError: false,
    },
    divisao: {
      name: 'Divisão',
      symbol: '/',
      optionNumber: '4',
      funcName: 'divisao',
      codeSnippet: 'def divisao(a, b):\n    if b == 0:\n        return "Erro: Divisão por zero não é permitida!"\n    return a / b',
      calc: (a: number, b: number) => (b === 0 ? 'Erro: Divisão por zero não é permitida!' : a / b),
      isZeroError: num2 === 0,
    },
  };

  const meta = operationsMeta[operation];
  const isDivZero = operation === 'divisao' && num2 === 0;
  const result = meta.calc(num1, num2);

  const steps = [
    {
      title: 'Passo 1: Entrada do Usuário & Conversão de Tipo',
      badge: 'input() + float()',
      description:
        'O teclado do usuário enviou os textos digitados. O Python não pode somar textos como números, então float() converte a string para número real.',
      variables: [
        { name: 'opcao', value: `"${meta.optionNumber}"`, type: 'str' },
        { name: 'num1', value: `${num1}`, type: 'float' },
        { name: 'num2', value: `${num2}`, type: 'float' },
      ],
      codeHighlight: `try:\n    num1 = float(input("Digite o primeiro número: "))  # -> ${num1}\n    num2 = float(input("Digite o segundo número: "))  # -> ${num2}`,
    },
    {
      title: 'Passo 2: Decisão Condicional no Menu',
      badge: 'if / elif',
      description: `O Python avalia a variável 'opcao'. A condição 'opcao == "${meta.optionNumber}"' resulta em True (Verdadeiro), direcionando o fluxo para a operação de ${meta.name}.`,
      variables: [
        { name: 'opcao == "1"', value: String(operation === 'adicao'), type: 'bool' },
        { name: 'opcao == "2"', value: String(operation === 'subtracao'), type: 'bool' },
        { name: 'opcao == "3"', value: String(operation === 'multiplicacao'), type: 'bool' },
        { name: 'opcao == "4"', value: String(operation === 'divisao'), type: 'bool' },
      ],
      codeHighlight: `elif opcao == "${meta.optionNumber}":\n    resultado = ${meta.funcName}(num1, num2)\n    operador = "${meta.symbol}"`,
    },
    {
      title: 'Passo 3: Execução da Função & Verificação Interna',
      badge: `def ${meta.funcName}(a, b)`,
      description: isDivZero
        ? 'Atenção! Dentro da função de divisão, a verificação "if b == 0:" foi acionada porque o segundo número é zero!'
        : `A função ${meta.funcName} recebe os parâmetros locais a = ${num1} e b = ${num2}, executando o cálculo 'a ${meta.symbol} b'.`,
      variables: [
        { name: 'parametro a', value: `${num1}`, type: 'float' },
        { name: 'parametro b', value: `${num2}`, type: 'float' },
        {
          name: 'retorno da conta',
          value: typeof result === 'number' ? `${result}` : `"${result}"`,
          type: typeof result === 'number' ? 'float' : 'str (erro)',
        },
      ],
      codeHighlight: meta.codeSnippet,
    },
    {
      title: 'Passo 4: Retorno com return e Exibição na Tela',
      badge: 'return & print()',
      description: isDivZero
        ? 'A função retornou a mensagem de erro. O bloco print() identifica que o resultado é texto e avisa o usuário sem travar o programa.'
        : `O comando 'return' devolveu o valor para a variável 'resultado'. Em seguida, print() exibe a conta formatada com f-strings.`,
      variables: [
        {
          name: 'resultado final',
          value: typeof result === 'number' ? `${result}` : `"${result}"`,
          type: typeof result === 'number' ? 'float' : 'str',
        },
      ],
      codeHighlight: `print(f"Conta: {num1} ${meta.symbol} {num2} = {resultado}")\n# Saída na tela: ${num1} ${meta.symbol} ${num2} = ${result}`,
    },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
  };

  return (
    <div className="space-y-6">
      {/* Intro box */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div>
            <h3 className="text-base font-semibold text-slate-100 flex items-center gap-2">
              <Cpu className="w-5 h-5 text-amber-400" />
              Simulador Visual de Execução: Como o Python pensa
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Veja por dentro da memória do computador a cada linha de código executada.
            </p>
          </div>

          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300 transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reiniciar Passo</span>
          </button>
        </div>

        {/* Inputs selector */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 bg-slate-950 rounded-lg border border-slate-800/80">
          <div>
            <label className="block text-[11px] font-medium text-slate-400 mb-1">
              Primeiro Número (num1)
            </label>
            <input
              type="number"
              value={num1}
              onChange={(e) => {
                setNum1(parseFloat(e.target.value) || 0);
                setCurrentStep(0);
              }}
              className="w-full bg-slate-900 border border-slate-700 rounded-md px-3 py-1.5 text-xs font-mono text-slate-100 focus:outline-none focus:border-amber-400"
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium text-slate-400 mb-1">
              Operação Desejada
            </label>
            <select
              value={operation}
              onChange={(e) => {
                setOperation(e.target.value as any);
                setCurrentStep(0);
              }}
              className="w-full bg-slate-900 border border-slate-700 rounded-md px-3 py-1.5 text-xs font-medium text-slate-100 focus:outline-none focus:border-amber-400"
            >
              <option value="adicao">1 - Adição (+)</option>
              <option value="subtracao">2 - Subtração (-)</option>
              <option value="multiplicacao">3 - Multiplicação (*)</option>
              <option value="divisao">4 - Divisão (/)</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-medium text-slate-400 mb-1 flex items-center justify-between">
              <span>Segundo Número (num2)</span>
              {operation === 'divisao' && num2 === 0 && (
                <span className="text-rose-400 text-[10px] font-semibold">Divisão por zero!</span>
              )}
            </label>
            <input
              type="number"
              value={num2}
              onChange={(e) => {
                setNum2(parseFloat(e.target.value) || 0);
                setCurrentStep(0);
              }}
              className={`w-full bg-slate-900 border rounded-md px-3 py-1.5 text-xs font-mono text-slate-100 focus:outline-none ${
                operation === 'divisao' && num2 === 0
                  ? 'border-rose-500 text-rose-300'
                  : 'border-slate-700 focus:border-amber-400'
              }`}
            />
          </div>
        </div>
      </div>

      {/* Stepper Progress Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {steps.map((s, idx) => {
          const isActive = idx === currentStep;
          const isDone = idx < currentStep;

          return (
            <button
              key={s.badge}
              type="button"
              onClick={() => setCurrentStep(idx)}
              className={`text-left p-3 rounded-lg border transition-all cursor-pointer ${
                isActive
                  ? 'bg-amber-500/10 border-amber-500 text-amber-300 shadow-md'
                  : isDone
                  ? 'bg-slate-900/90 border-slate-700 text-slate-300'
                  : 'bg-slate-950 border-slate-800 text-slate-500'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-mono uppercase tracking-wider">
                  Passo {idx + 1}
                </span>
                {isDone ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <span className="text-[10px] font-mono text-slate-500">
                    {idx + 1}/{steps.length}
                  </span>
                )}
              </div>
              <p className="text-xs font-medium truncate">{s.badge}</p>
            </button>
          );
        })}
      </div>

      {/* Active Step Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-amber-400" />
            <h4 className="text-sm font-semibold text-slate-100">
              {steps[currentStep].title}
            </h4>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-md bg-slate-800 font-mono text-slate-300 border border-slate-700">
            {steps[currentStep].badge}
          </span>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          {steps[currentStep].description}
        </p>

        {/* Variables in memory inspector */}
        <div>
          <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block mb-2">
            Estado da Memória (Variáveis ativas neste instante):
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {steps[currentStep].variables.map((v) => (
              <div
                key={v.name}
                className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 font-mono text-xs"
              >
                <div className="text-[10px] text-slate-400 truncate">{v.name}</div>
                <div className="text-amber-300 font-bold mt-0.5 truncate">{v.value}</div>
                <div className="text-[9px] text-slate-500 mt-0.5">tipo: {v.type}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Code Snippet Highlight */}
        <div>
          <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block mb-2">
            Linhas de Código em Ação:
          </span>
          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 font-mono text-xs text-slate-200 whitespace-pre overflow-x-auto leading-relaxed border-l-4 border-l-amber-400">
            {steps[currentStep].codeHighlight}
          </div>
        </div>

        {/* Navigation buttons */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-800">
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentStep === 0}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              currentStep === 0
                ? 'bg-slate-800/40 text-slate-600 cursor-not-allowed'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200 cursor-pointer'
            }`}
          >
            ← Passo Anterior
          </button>

          <div className="text-xs text-slate-400 font-mono">
            {currentStep + 1} de {steps.length}
          </div>

          {currentStep < steps.length - 1 ? (
            <button
              type="button"
              onClick={handleNext}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-slate-950 text-xs font-semibold shadow-sm transition-colors cursor-pointer"
            >
              <span>Próximo Passo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setCurrentStep(0)}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium shadow-sm transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Simular Novamente</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
