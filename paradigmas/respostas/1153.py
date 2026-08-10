a = int(input())
s = 1

# Multiplicamos todos os inteiros de 1 até a; para zero, o laço não executa
# e o elemento neutro 1 produz corretamente 0! = 1.
for i in range(a):
    s = s*(i+1)
    
print(s)
