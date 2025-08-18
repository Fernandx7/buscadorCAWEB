from flask import Flask, render_template, request
import requests
import re
from datetime import datetime

app = Flask(__name__)

API_URL = "http://131.163.96.121:8000/buscar?codigo_rastreio="
CA_API_URL = "http://131.163.96.121:8000/buscar_ca?"

@app.route("/", methods=["GET", "POST"])
def index():
    resultado = None
    if request.method == "POST":
        codigo = request.form.get("codigo", "").strip().upper()
        if codigo:
            try:
                response = requests.get(API_URL, params={"codigo_rastreio": codigo})
                data = response.json()
                if "encontrado_em" in data and data["encontrado_em"]:
                    resultado = data["encontrado_em"][0]
                else:
                    resultado = "not_found"
            except Exception as e:
                resultado = f"erro: {e}"
    return render_template("index.html", resultado=resultado)

@app.route("/lote", methods=["GET", "POST"])
def lote():
    resultados = []
    if request.method == "POST":
        codigos = request.form.get("codigos", "").strip().upper().splitlines()
        codigos_validos = [c for c in codigos if re.match(r"^[A-Z]{2}\d{9}BR$", c)]

        for codigo in codigos_validos:
            try:
                response = requests.get(API_URL, params={"codigo_rastreio": codigo})
                data = response.json()
                if "encontrado_em" in data and data["encontrado_em"]:
                    resultados.append((codigo, data["encontrado_em"][0], None))
                else:
                    resultados.append((codigo, None, "NÃO ENCONTRADO"))
            except Exception as e:
                resultados.append((codigo, None, f"ERRO: {e}"))
    return render_template("lote.html", resultados=resultados)

@app.route("/ca", methods=["GET", "POST"])
def ca():
    resultados = []
    erro = None
    data_str = ""
    if request.method == "POST":
        data_str = request.form.get("data", "")
        try:
            data_obj = datetime.strptime(data_str, "%Y-%m-%d")
            if data_obj.weekday() >= 5:
                erro = "A data selecionada é um fim de semana."
            else:
                data_formatada = data_obj.strftime("%d/%m/%Y")
                response = requests.get(CA_API_URL, params={"data": data_formatada})
                data = response.json()
                encontrados = data.get("resultados", [])
                if encontrados: 
                    resultados = encontrados 
                else: 
                    erro = "objetos não encontrados na data especificada."
        except ValueError:
            erro = "Formato de data inválido."
        except Exception as e:
            erro = str(e) 
    return render_template("ca.html", resultados=resultados, erro=erro, data_str=data_str)

if __name__ == "__main__":
    app.run(debug=True)




