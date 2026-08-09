n = []

for i in range(20):
    n.append(int(input()))

n.reverse()

for i in range(20):
    print(f"N[{i}] = {n[i]}")
