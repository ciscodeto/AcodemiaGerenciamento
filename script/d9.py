n = int(input())
soma = 0
lista1 = list(map(int, input().split()))
lista2 = list(map(int, input().split()))
if lista2[0] <= lista2[1]:
    i = lista2[0]
    j = lista2[1]
else:
    i = lista2[1]
    j = lista2[0]
if i > (n-1) or j > (n-1):
    print('INVALIDO')
else:
    while i <= j:
        soma += lista1[i]
        print(soma)
        i += 1
    print(soma)