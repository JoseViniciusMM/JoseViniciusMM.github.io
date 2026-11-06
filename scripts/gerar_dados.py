"""
Gera os dados sintéticos dos painéis demo do portfólio.

Empresa fictícia: Norte Máquinas, concessionária com seis filiais inventadas.
Nada aqui vem de dado real: nomes, chassis e números são sorteados com semente
fixa, então rodar de novo gera exatamente os mesmos arquivos.

Uso:
    python scripts/gerar_dados.py

Saída:
    public/demos/data/oleo.json  -> painel de saúde da frota por análise de óleo
    public/demos/data/nps.json   -> painel de pesquisas de satisfação (NPS)
"""

from __future__ import annotations

import json
import random
from datetime import date, timedelta
from pathlib import Path

SEED = 42
HOJE = date(2026, 11, 6)
SAIDA = Path(__file__).resolve().parent.parent / "public" / "demos" / "data"

FILIAIS = [
    # (nome, supervisor, peso no parque)
    ("Serra Azul", "Ana Ribeiro", 1.4),
    ("Rio Claro", "Ana Ribeiro", 0.9),
    ("Campo Verde", "Bruno Taveira", 1.2),
    ("Porto Novo", "Bruno Taveira", 0.8),
    ("Vale Alto", "Carla Mendes", 1.0),
    ("Boa Esperança", "Carla Mendes", 0.7),
]

FAMILIAS = [
    # (família, segmento, prefixo do modelo, peso)
    ("Trator", "Agrícola", "TR", 3.0),
    ("Colheitadeira", "Agrícola", "CH", 1.4),
    ("Pulverizador", "Agrícola", "PV", 1.0),
    ("Escavadeira", "Construção", "EX", 1.6),
    ("Pá carregadeira", "Construção", "PC", 1.0),
    ("Motoniveladora", "Construção", "MN", 0.7),
]

COMPARTIMENTOS = [("Motor", 4), ("Hidráulico", 3), ("Transmissão", 2), ("Eixo dianteiro", 1)]
STATUS = [("Normal", 55), ("Atenção", 20), ("Anormal", 17), ("Crítico", 8)]
CLIENTES = [
    "Fazenda Santa Luzia", "Agropecuária Três Rios", "Construtora Vale Norte", "Fazenda Boa Vista",
    "Grupo Cerrado Verde", "Mineração Pedra Alta", "Sítio Recanto", "Terraplenagem Horizonte",
    "Fazenda Água Limpa", "Cooperativa Planalto", "Usina Rio Doce", "Agro Sol Nascente",
    "Fazenda Primavera", "Pavimentadora Estrada Real", "Fazenda São Jorge", "Agrícola Ponte Nova",
]


def pick(opcoes):
    """Sorteio ponderado: lista de (valor, peso) ou (..., peso no fim)."""
    pesos = [o[-1] for o in opcoes]
    return random.choices(opcoes, weights=pesos, k=1)[0]


def gerar_parque(n: int = 420) -> list[dict]:
    parque = []
    for i in range(n):
        filial = pick(FILIAIS)
        fam, seg, pref, _ = pick(FAMILIAS)
        serie = random.choice([2, 3, 5, 6, 7, 8])
        parque.append(
            {
                "chassi": f"NM{pref}{serie}{random.randint(100, 999)}{chr(65 + i % 26)}{i:04d}",
                "modelo": f"{pref}-{serie}{random.choice(['10', '30', '50', '70'])}",
                "familia": fam,
                "segmento": seg,
                "filial": filial[0],
                "cliente": random.choice(CLIENTES),
            }
        )
    return parque


def gerar_oleo(parque: list[dict]) -> dict:
    inicio = date(2024, 11, 1)
    dias = (HOJE - inicio).days
    laudos = []
    for maq in parque:
        # cada máquina manda de 2 a 14 amostras no período
        for _ in range(random.randint(2, 14)):
            coleta = inicio + timedelta(days=random.randint(0, dias - 14))
            prazo = random.choice([3, 4, 5, 5, 6, 7, 8, 9, 12])
            resultado = coleta + timedelta(days=prazo)
            if resultado > HOJE:
                continue
            status = pick(STATUS)[0]
            atendido = None
            if status in ("Anormal", "Crítico"):
                chance = 0.72 if status == "Crítico" else 0.5
                if (HOJE - resultado).days > 90:
                    chance = 0.96  # laudo antigo quase sempre já foi tratado
                if random.random() < chance:
                    atendido = random.randint(1, 45)
            laudos.append(
                {
                    "chassi": maq["chassi"],
                    "coleta": coleta.isoformat(),
                    "resultado": resultado.isoformat(),
                    "compartimento": pick(COMPARTIMENTOS)[0],
                    "status": status,
                    "diasAteOS": atendido,
                }
            )
    laudos.sort(key=lambda l: l["resultado"])
    abertas = [
        {"chassi": random.choice(parque)["chassi"], "coleta": (HOJE - timedelta(days=random.randint(1, 20))).isoformat()}
        for _ in range(64)
    ]
    return {"geradoEm": HOJE.isoformat(), "parque": parque, "laudos": laudos, "amostrasAbertas": abertas}


def gerar_nps() -> dict:
    respostas = []
    mes = date(2025, 11, 1)
    while mes <= HOJE.replace(day=1):
        for filial, supervisor, peso in FILIAIS:
            enviadas = int(random.randint(28, 52) * peso)
            # cada filial tem um "perfil" de satisfação, com leve melhora no tempo
            base = {"Serra Azul": 8.6, "Rio Claro": 7.9, "Campo Verde": 8.3, "Porto Novo": 7.4, "Vale Alto": 8.8, "Boa Esperança": 7.8}[filial]
            meses_passados = (mes.year - 2025) * 12 + mes.month - 11
            for _ in range(enviadas):
                envio = mes + timedelta(days=random.randint(0, 27))
                if envio > HOJE:
                    continue
                respondeu = random.random() < 0.62
                nota = None
                if respondeu:
                    nota = round(min(10, max(0, random.gauss(base + meses_passados * 0.03, 1.6))))
                respostas.append({"filial": filial, "supervisor": supervisor, "envio": envio.isoformat(), "nota": nota})
        mes = (mes.replace(day=28) + timedelta(days=4)).replace(day=1)
    return {"geradoEm": HOJE.isoformat(), "filiais": [{"filial": f, "supervisor": s} for f, s, _ in FILIAIS], "respostas": respostas}


def main() -> None:
    random.seed(SEED)
    SAIDA.mkdir(parents=True, exist_ok=True)
    parque = gerar_parque()
    oleo = gerar_oleo(parque)
    nps = gerar_nps()
    (SAIDA / "oleo.json").write_text(json.dumps(oleo, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
    (SAIDA / "nps.json").write_text(json.dumps(nps, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
    print(f"oleo.json: {len(oleo['parque'])} máquinas, {len(oleo['laudos'])} laudos")
    print(f"nps.json: {len(nps['respostas'])} pesquisas enviadas")


if __name__ == "__main__":
    main()
