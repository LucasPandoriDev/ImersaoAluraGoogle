/**
 * Python execution utility.
 * Supports both standard Pyodide WebAssembly (when available)
 * and an instant deterministic interactive calculator interpreter.
 */

declare global {
  interface Window {
    loadPyodide?: (config: { indexURL?: string }) => Promise<any>;
    pyodideInstance?: any;
  }
}

export interface TerminalMessage {
  id: string;
  type: 'system' | 'input' | 'output' | 'error' | 'success';
  text: string;
  timestamp: Date;
}

export class CalculatorInteractiveSession {
  private state: 'READY' | 'AWAITING_OPTION' | 'AWAITING_NUM1' | 'AWAITING_NUM2' | 'FINISHED' = 'READY';
  private selectedOp: string = '';
  private num1: number | null = null;
  private onOutput: (msg: TerminalMessage) => void;
  private onPrompt: (promptText: string) => void;

  constructor(
    onOutput: (msg: TerminalMessage) => void,
    onPrompt: (promptText: string) => void
  ) {
    this.onOutput = onOutput;
    this.onPrompt = onPrompt;
  }

  public start() {
    this.state = 'AWAITING_OPTION';
    this.emit('========================================', 'system');
    this.emit('      CALCULADORA SIMPLES EM PYTHON     ', 'system');
    this.emit('========================================', 'system');
    this.emit('\nSelecione a operação desejada:', 'output');
    this.emit('  1 -> Adição (+)', 'output');
    this.emit('  2 -> Subtração (-)', 'output');
    this.emit('  3 -> Multiplicação (*)', 'output');
    this.emit('  4 -> Divisão (/)', 'output');
    this.emit('  0 -> Sair do programa', 'output');
    this.onPrompt('Digite a opção desejada (0 a 4): ');
  }

  public handleInput(rawInput: string) {
    const input = rawInput.trim();
    this.emit(`> ${rawInput}`, 'input');

    if (this.state === 'AWAITING_OPTION') {
      if (input === '0') {
        this.emit('\nObrigado por usar a calculadora! Bons estudos em Python.', 'success');
        this.state = 'FINISHED';
        this.onPrompt('');
        return;
      }

      if (!['1', '2', '3', '4'].includes(input)) {
        this.emit('Opção inválida! Escolha apenas entre 0, 1, 2, 3 ou 4.', 'error');
        this.onPrompt('Digite a opção desejada (0 a 4): ');
        return;
      }

      this.selectedOp = input;
      this.state = 'AWAITING_NUM1';
      this.onPrompt('Digite o primeiro número: ');
      return;
    }

    if (this.state === 'AWAITING_NUM1') {
      const sanitized = input.replace(',', '.');
      const parsed = parseFloat(sanitized);
      if (isNaN(parsed)) {
        this.emit('Erro: Você precisa digitar números válidos!', 'error');
        this.emit('\nVoltando ao menu...', 'system');
        this.resetToMenu();
        return;
      }
      this.num1 = parsed;
      this.state = 'AWAITING_NUM2';
      this.onPrompt('Digite o segundo número: ');
      return;
    }

    if (this.state === 'AWAITING_NUM2') {
      const sanitized = input.replace(',', '.');
      const num2 = parseFloat(sanitized);
      if (isNaN(num2)) {
        this.emit('Erro: Você precisa digitar números válidos!', 'error');
        this.emit('\nVoltando ao menu...', 'system');
        this.resetToMenu();
        return;
      }

      const n1 = this.num1!;
      let resultado: number | string = 0;
      let operador = '';

      if (this.selectedOp === '1') {
        resultado = n1 + num2;
        operador = '+';
      } else if (this.selectedOp === '2') {
        resultado = n1 - num2;
        operador = '-';
      } else if (this.selectedOp === '3') {
        resultado = n1 * num2;
        operador = '*';
      } else if (this.selectedOp === '4') {
        operador = '/';
        if (num2 === 0) {
          resultado = 'Erro: Divisão por zero não é permitida!';
        } else {
          resultado = n1 / num2;
        }
      }

      this.emit('----------------------------------------', 'system');
      if (typeof resultado === 'string') {
        this.emit(`Resultado: ${resultado}`, 'error');
      } else {
        const n1Fmt = Number.isInteger(n1) ? n1.toString() : n1.toString();
        const n2Fmt = Number.isInteger(num2) ? num2.toString() : num2.toString();
        const resFmt = Number.isInteger(resultado)
          ? resultado.toString()
          : parseFloat(resultado.toFixed(4)).toString();
        this.emit(`Conta: ${n1Fmt} ${operador} ${n2Fmt} = ${resFmt}`, 'success');
      }
      this.emit('----------------------------------------', 'system');

      this.resetToMenu();
      return;
    }

    if (this.state === 'FINISHED') {
      this.emit('A sessão foi finalizada. Clique em "Reiniciar" para executar novamente.', 'system');
    }
  }

  private resetToMenu() {
    this.state = 'AWAITING_OPTION';
    this.selectedOp = '';
    this.num1 = null;
    this.emit('\nSelecione a operação desejada:', 'output');
    this.emit('  1 -> Adição (+)', 'output');
    this.emit('  2 -> Subtração (-)', 'output');
    this.emit('  3 -> Multiplicação (*)', 'output');
    this.emit('  4 -> Divisão (/)', 'output');
    this.emit('  0 -> Sair do programa', 'output');
    this.onPrompt('Digite a opção desejada (0 a 4): ');
  }

  private emit(text: string, type: TerminalMessage['type']) {
    this.onOutput({
      id: Math.random().toString(36).substring(2, 9),
      type,
      text,
      timestamp: new Date(),
    });
  }

  public isFinished() {
    return this.state === 'FINISHED';
  }
}

/**
 * Evaluates single line expressions or Python function calls
 */
export function evaluatePythonExpression(expr: string): { success: boolean; result: string } {
  try {
    const trimmed = expr.trim();
    if (!trimmed) return { success: false, result: 'Expressão vazia.' };

    // Support basic Python math operators
    let jsExpr = trimmed
      .replace(/\*\*/g, ' ** ') // power
      .replace(/\/\//g, ' // '); // floor division

    // If adicao(x, y), subtracao, etc.
    const addMatch = trimmed.match(/^adicao\s*\(\s*(-?\d+\.?\d*)\s*,\s*(-?\d+\.?\d*)\s*\)$/i);
    if (addMatch) {
      return { success: true, result: (parseFloat(addMatch[1]) + parseFloat(addMatch[2])).toString() };
    }
    const subMatch = trimmed.match(/^subtracao\s*\(\s*(-?\d+\.?\d*)\s*,\s*(-?\d+\.?\d*)\s*\)$/i);
    if (subMatch) {
      return { success: true, result: (parseFloat(subMatch[1]) - parseFloat(subMatch[2])).toString() };
    }
    const mulMatch = trimmed.match(/^multiplicacao\s*\(\s*(-?\d+\.?\d*)\s*,\s*(-?\d+\.?\d*)\s*\)$/i);
    if (mulMatch) {
      return { success: true, result: (parseFloat(mulMatch[1]) * parseFloat(mulMatch[2])).toString() };
    }
    const divMatch = trimmed.match(/^divisao\s*\(\s*(-?\d+\.?\d*)\s*,\s*(-?\d+\.?\d*)\s*\)$/i);
    if (divMatch) {
      const b = parseFloat(divMatch[2]);
      if (b === 0) return { success: true, result: '"Erro: Divisão por zero não é permitida!"' };
      return { success: true, result: (parseFloat(divMatch[1]) / b).toString() };
    }

    // Handle standard math expressions safely
    if (/^[0-9+\-*/().%\s^]+$/.test(trimmed)) {
      // safe arithmetic evaluator
      const sanitized = trimmed.replace(/\^/g, '**');
      // eslint-disable-next-line no-new-func
      const func = new Function(`return (${sanitized});`);
      const val = func();
      return { success: true, result: String(val) };
    }

    return { success: false, result: `Comando não reconhecido: "${trimmed}". Teste contas como 12 + 4 ou adicao(10, 5)` };
  } catch (err: any) {
    return { success: false, result: `SyntaxError / Erro: ${err.message}` };
  }
}
