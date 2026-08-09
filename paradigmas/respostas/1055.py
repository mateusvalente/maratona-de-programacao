import sys
import re
from collections import deque

# Lê toda a entrada e extrai somente números inteiros
dados = list(map(int, re.findall(r'-?\d+', sys.stdin.read())))

pos = 0

n = dados[pos]
pos += 1

for caso in range(1, n + 1):

    q = dados[pos]
    pos += 1

    resp = dados[pos:pos + q]
    pos += q

    resp.sort()

    x = 0
    y = len(resp) - 1

    ans = deque()

    for _ in range(len(resp)):

        if not ans:
            ans.append(resp[y])
            y -= 1

        else:
            candidatos = [
                # (distância, tipo, índice)
                (abs(resp[x] - ans[0]), 1, x),
                (abs(resp[x] - ans[-1]), 2, x),
                (abs(resp[y] - ans[0]), 3, y),
                (abs(resp[y] - ans[-1]), 4, y)
            ]

            _, tipo, indice = max(candidatos)

            if tipo == 1:
                ans.appendleft(resp[indice])
                x += 1

            elif tipo == 2:
                ans.append(resp[indice])
                x += 1

            elif tipo == 3:
                ans.appendleft(resp[indice])
                y -= 1

            else:
                ans.append(resp[indice])
                y -= 1

    soma = 0

    for i in range(len(ans) - 1):
        soma += abs(ans[i] - ans[i + 1])

    print(f"Case {caso}: {soma}")