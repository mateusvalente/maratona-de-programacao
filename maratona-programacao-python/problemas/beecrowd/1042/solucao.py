a, b, c = map(int, input().split())

original_a = a
original_b = b
original_c = c

if a > b:
    a, b = b, a
if a > c:
    a, c = c, a
if b > c:
    b, c = c, b

print(a)
print(b)
print(c)

print()

print(original_a)
print(original_b)
print(original_c)
