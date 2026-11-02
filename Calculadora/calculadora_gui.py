# ==============================================================
# CALCULADORA COM INTERFACE GRÁFICA (GUI) EM PYTHON
# Desenvolvida com Tkinter | Imersão Alura + Google
# ==============================================================

import os
import sys
import tkinter as tk
from tkinter import messagebox

# Garante que o diretório atual esteja no caminho de busca para importar calculadora.py
DIRETORIO_ATUAL = os.path.dirname(os.path.abspath(__file__))
if DIRETORIO_ATUAL not in sys.path:
    sys.path.insert(0, DIRETORIO_ATUAL)

# Importação das funções matemáticas do arquivo original (Separação Lógica x Visual)
try:
    from calculadora import (
        adicao,
        subtracao,
        multiplicacao,
        divisao,
        porcentagem,
        potencia,
        resto_divisao,
    )
except ImportError as erro:
    print(f"Erro ao importar as operações de calculadora.py: {erro}")
    sys.exit(1)


class CalculadoraGUI:
    """Controlador da Interface Gráfica da Calculadora."""

    def __init__(self, root):
        self.root = root
        self.root.title("Calculadora Python - Alura + Google")
        self.root.geometry("360x540")
        self.root.resizable(False, False)
        self.root.configure(bg="#181824")

        # Estado da calculadora
        self.expressao_anterior = ""
        self.valor_atual = "0"
        self.primeiro_numero = None
        self.operador = None
        self.novo_numero = True

        # Paleta de Cores
        self.CORES = {
            "fundo": "#181824",
            "visor_fundo": "#11111a",
            "texto_visor": "#ffffff",
            "texto_historico": "#7b849b",
            "btn_numero": "#252839",
            "btn_numero_hover": "#353950",
            "btn_operador": "#3d5afe",
            "btn_operador_hover": "#536dfe",
            "btn_especial": "#5e35b1",
            "btn_especial_hover": "#7e57c2",
            "btn_limpar": "#e53935",
            "btn_limpar_hover": "#ef5350",
            "btn_igual": "#00c853",
            "btn_igual_hover": "#00e676",
            "texto_branco": "#ffffff",
        }

        self.centralizar_janela()
        self.criar_visor()
        self.criar_botoes()
        self.configurar_teclado()

    def centralizar_janela(self):
        """Centraliza a janela na tela do usuário."""
        self.root.update_idletasks()
        largura = 360
        altura = 540
        x = (self.root.winfo_screenwidth() // 2) - (largura // 2)
        y = (self.root.winfo_screenheight() // 2) - (altura // 2)
        self.root.geometry(f"{largura}x{altura}+{x}+{y}")

    def criar_visor(self):
        """Cria a área superior da tela com histórico e visor numérico principal."""
        frame_visor = tk.Frame(self.root, bg=self.CORES["visor_fundo"], padx=18, pady=16)
        frame_visor.pack(fill="x", padx=14, pady=(16, 10))

        # Linha superior: mostra a operação em andamento (ex: 15 + 25)
        self.label_historico = tk.Label(
            frame_visor,
            text="",
            font=("Segoe UI", 11),
            bg=self.CORES["visor_fundo"],
            fg=self.CORES["texto_historico"],
            anchor="e",
        )
        self.label_historico.pack(fill="x")

        # Linha principal: mostra o número digitado ou resultado
        self.label_visor = tk.Label(
            frame_visor,
            text="0",
            font=("Segoe UI", 28, "bold"),
            bg=self.CORES["visor_fundo"],
            fg=self.CORES["texto_visor"],
            anchor="e",
        )
        self.label_visor.pack(fill="x", pady=(4, 0))

    def criar_botoes(self):
        """Monta a grade de botões com as 4 operações básicas + novas operações."""
        frame_botoes = tk.Frame(self.root, bg=self.CORES["fundo"])
        frame_botoes.pack(fill="both", expand=True, padx=14, pady=(0, 14))

        # Configura as 4 colunas para se expandirem por igual
        for col in range(4):
            frame_botoes.columnconfigure(col, weight=1)
        for lin in range(6):
            frame_botoes.rowconfigure(lin, weight=1)

        # Definição dos botões: (texto, linha, coluna, tipo, comando)
        botoes = [
            # Linha 0: Limpar, Apagar, Potência, Resto
            ("C", 0, 0, "limpar", self.limpar_tudo),
            ("⌫", 0, 1, "limpar", self.apagar_ultimo),
            ("^", 0, 2, "especial", lambda: self.definir_operador("^")),
            ("mod", 0, 3, "especial", lambda: self.definir_operador("mod")),

            # Linha 1: 7, 8, 9, Divisão
            ("7", 1, 0, "numero", lambda: self.inserir_digito("7")),
            ("8", 1, 1, "numero", lambda: self.inserir_digito("8")),
            ("9", 1, 2, "numero", lambda: self.inserir_digito("9")),
            ("÷", 1, 3, "operador", lambda: self.definir_operador("÷")),

            # Linha 2: 4, 5, 6, Multiplicação
            ("4", 2, 0, "numero", lambda: self.inserir_digito("4")),
            ("5", 2, 1, "numero", lambda: self.inserir_digito("5")),
            ("6", 2, 2, "numero", lambda: self.inserir_digito("6")),
            ("×", 2, 3, "operador", lambda: self.definir_operador("×")),

            # Linha 3: 1, 2, 3, Subtração
            ("1", 3, 0, "numero", lambda: self.inserir_digito("1")),
            ("2", 3, 1, "numero", lambda: self.inserir_digito("2")),
            ("3", 3, 2, "numero", lambda: self.inserir_digito("3")),
            ("-", 3, 3, "operador", lambda: self.definir_operador("-")),

            # Linha 4: Ponto, 0, Porcentagem, Adição
            (".", 4, 0, "numero", self.inserir_ponto),
            ("0", 4, 1, "numero", lambda: self.inserir_digito("0")),
            ("%", 4, 2, "especial", lambda: self.definir_operador("%")),
            ("+", 4, 3, "operador", lambda: self.definir_operador("+")),

            # Linha 5: Botão de Igual (Ocupa as 4 colunas)
            ("=", 5, 0, "igual", self.calcular_resultado),
        ]

        for item in botoes:
            texto, lin, col, tipo, cmd = item

            # Define cor base e hover conforme a categoria do botão
            if tipo == "numero":
                bg = self.CORES["btn_numero"]
                bg_hover = self.CORES["btn_numero_hover"]
                fonte = ("Segoe UI", 14, "bold")
            elif tipo == "operador":
                bg = self.CORES["btn_operador"]
                bg_hover = self.CORES["btn_operador_hover"]
                fonte = ("Segoe UI", 15, "bold")
            elif tipo == "especial":
                bg = self.CORES["btn_especial"]
                bg_hover = self.CORES["btn_especial_hover"]
                fonte = ("Segoe UI", 12, "bold")
            elif tipo == "limpar":
                bg = self.CORES["btn_limpar"]
                bg_hover = self.CORES["btn_limpar_hover"]
                fonte = ("Segoe UI", 13, "bold")
            elif tipo == "igual":
                bg = self.CORES["btn_igual"]
                bg_hover = self.CORES["btn_igual_hover"]
                fonte = ("Segoe UI", 16, "bold")

            btn = tk.Button(
                frame_botoes,
                text=texto,
                bg=bg,
                fg=self.CORES["texto_branco"],
                activebackground=bg_hover,
                activeforeground=self.CORES["texto_branco"],
                font=fonte,
                bd=0,
                relief="flat",
                cursor="hand2",
                command=cmd,
            )

            # Efeito visual de hover ao passar o mouse
            btn.bind("<Enter>", lambda e, b=btn, c=bg_hover: b.configure(bg=c))
            btn.bind("<Leave>", lambda e, b=btn, c=bg: b.configure(bg=c))

            # Posicionamento no grid
            if tipo == "igual":
                btn.grid(row=lin, column=col, columnspan=4, sticky="nsew", padx=3, pady=3)
            else:
                btn.grid(row=lin, column=col, sticky="nsew", padx=3, pady=3)

    def configurar_teclado(self):
        """Permite que o usuário use o teclado físico para calcular."""
        self.root.bind("<Key>", self.tratar_tecla)

    def tratar_tecla(self, evento):
        """Mapeia teclas físicas para os comandos da calculadora."""
        char = evento.char
        keysym = evento.keysym

        if char in "0123456789":
            self.inserir_digito(char)
        elif char in [".", ","]:
            self.inserir_ponto()
        elif char == "+":
            self.definir_operador("+")
        elif char == "-":
            self.definir_operador("-")
        elif char in ["*", "x", "X"]:
            self.definir_operador("×")
        elif char == "/":
            self.definir_operador("÷")
        elif char == "^":
            self.definir_operador("^")
        elif char == "%":
            self.definir_operador("%")
        elif keysym in ["Return", "KP_Enter"] or char == "=":
            self.calcular_resultado()
        elif keysym == "BackSpace":
            self.apagar_ultimo()
        elif keysym == "Escape" or char.lower() == "c":
            self.limpar_tudo()

    # ==============================================================
    # LÓGICA DE INTERAÇÃO E CÁLCULO
    # ==============================================================

    def formatar_numero(self, valor):
        """Converte números para formato legível (ex: 5.0 -> 5)."""
        if isinstance(valor, (int, float)):
            if float(valor).is_integer():
                return str(int(valor))
            # Arredonda dízimas longas para manter o visor limpo
            return str(round(valor, 6)).rstrip("0").rstrip(".") if "." in str(round(valor, 6)) else str(round(valor, 6))
        return str(valor)

    def atualizar_visor(self):
        """Atualiza o texto dos labels do visor."""
        # Ajusta tamanho da fonte dinamicamente se o número for longo
        tamanho = len(self.valor_atual)
        if tamanho > 14:
            self.label_visor.configure(font=("Segoe UI", 16, "bold"))
        elif tamanho > 10:
            self.label_visor.configure(font=("Segoe UI", 20, "bold"))
        else:
            self.label_visor.configure(font=("Segoe UI", 28, "bold"))

        self.label_visor.configure(text=self.valor_atual)
        self.label_historico.configure(text=self.expressao_anterior)

    def inserir_digito(self, digito):
        """Adiciona um dígito numérico ao visor."""
        if self.novo_numero or self.valor_atual == "Erro":
            self.valor_atual = str(digito)
            self.novo_numero = False
        else:
            if self.valor_atual == "0":
                self.valor_atual = str(digito)
            else:
                self.valor_atual += str(digito)
        self.atualizar_visor()

    def inserir_ponto(self):
        """Adiciona o ponto decimal ao número atual."""
        if self.novo_numero or self.valor_atual == "Erro":
            self.valor_atual = "0."
            self.novo_numero = False
        elif "." not in self.valor_atual:
            self.valor_atual += "."
        self.atualizar_visor()

    def apagar_ultimo(self):
        """Apaga o último dígito inserido (tecla Backspace)."""
        if self.novo_numero or self.valor_atual in ["0", "Erro"]:
            return

        self.valor_atual = self.valor_atual[:-1]
        if not self.valor_atual or self.valor_atual == "-":
            self.valor_atual = "0"
            self.novo_numero = True
        self.atualizar_visor()

    def limpar_tudo(self):
        """Reseta toda a calculadora para o estado inicial."""
        self.expressao_anterior = ""
        self.valor_atual = "0"
        self.primeiro_numero = None
        self.operador = None
        self.novo_numero = True
        self.atualizar_visor()

    def definir_operador(self, operador_escolhido):
        """Armazena o operador e prepara para receber o segundo número."""
        # Se o usuário já digitou uma conta e escolhe outro operador sem apertar igual, calcula antes
        if self.operador is not None and not self.novo_numero:
            self.calcular_resultado()

        try:
            self.primeiro_numero = float(self.valor_atual)
        except ValueError:
            self.primeiro_numero = 0.0

        self.operador = operador_escolhido
        simbolo_fmt = operador_escolhido
        self.expressao_anterior = f"{self.formatar_numero(self.primeiro_numero)} {simbolo_fmt}"
        self.novo_numero = True
        self.atualizar_visor()

    def calcular_resultado(self):
        """Aciona as funções matemáticas de calculadora.py e exibe o resultado."""
        if self.operador is None or self.primeiro_numero is None:
            return

        try:
            segundo_numero = float(self.valor_atual)
        except ValueError:
            segundo_numero = 0.0

        num1 = self.primeiro_numero
        num2 = segundo_numero
        op = self.operador

        # Histórico completo da conta
        self.expressao_anterior = f"{self.formatar_numero(num1)} {op} {self.formatar_numero(num2)} ="

        # ----------------------------------------------------------
        # Conexão com as funções de calculadora.py
        # ----------------------------------------------------------
        if op == "+":
            resultado = adicao(num1, num2)
        elif op == "-":
            resultado = subtracao(num1, num2)
        elif op == "×":
            resultado = multiplicacao(num1, num2)
        elif op == "÷":
            resultado = divisao(num1, num2)
        elif op == "%":
            resultado = porcentagem(num1, num2)
        elif op == "^":
            resultado = potencia(num1, num2)
        elif op == "mod":
            resultado = resto_divisao(num1, num2)
        else:
            resultado = num2

        # Tratamento de erro (ex: divisão ou resto por zero)
        if isinstance(resultado, str) and "Erro" in resultado:
            self.valor_atual = "Erro: Divisão por 0"
            self.primeiro_numero = None
            self.operador = None
            self.novo_numero = True
        else:
            self.valor_atual = self.formatar_numero(resultado)
            # Permite encadear o próximo cálculo usando o resultado atual
            self.primeiro_numero = resultado
            self.operador = None
            self.novo_numero = True

        self.atualizar_visor()


# ==============================================================
# PONTO DE ENTRADA DA APLICAÇÃO VISUAL
# ==============================================================
if __name__ == "__main__":
    janela = tk.Tk()
    app = CalculadoraGUI(janela)
    janela.mainloop()
