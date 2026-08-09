import math


def is_perfect_square(num):
    root = math.isqrt(num)
    return root * root == num


def max_balls(n):
    rods = [0] * n
    ball = 1

    while True:
        placed = False

        for i in range(n):
            if rods[i] == 0 or is_perfect_square(rods[i] + ball):
                rods[i] = ball
                placed = True
                break

        if not placed:
            break

        ball += 1

    return ball - 1


t = int(input())

for _ in range(t):
    n = int(input())
    print(max_balls(n))