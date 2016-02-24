---
layout: post
title: template.cpp
category: maratona
tags: template copy'n'paste base-code
excerpt: "Um template (em progresso) para meus códigos de competitive programming."
---

> Disclaimer: esses últimos 15 dias não foram tão produtivos quanto eu esperava. Assim, produzi um post mais simples do que o planejado, para não quebrar totalmente com a [meta que defini]({% post_url 2016-02-07-welcome-to-my-blog %})

# Reflexões (WTF?)
Nesse post, vou apresentar um "_template_" que estou incrementalmente desenvolvendo para me orientar na escrita de códigos para _contests_. Esse _template_ não é apenas um _snippet_ para eu copiar e colar sempre que possível. Mais que isso, ele é o resultado de reflexões e decisões que surgem quando você _coda_ o mesmo trecho de código várias e várias vezes.

Com o tempo, você melhora o seu _writing_ com pequenos detalhes que surgem, principalmente, após sessões de _debug_ do seu código ou do código de outras pessoas. Assim, escolhi documentar essas "boas práticas" e esses "_coding styles_" conforme eu for aderindo a eles, para não correr o risco de esquecer que um dia descrobri dicas tão legais.

# O ~~gist~~ template

{% gist falcaopetri/b3904bd614f3304b1684 template.cpp %}

# Explicações

## Includes
{% gist falcaopetri/b3904bd614f3304b1684 includes.cpp %}

Sim. Só isso. Em qualquer código que eu faça.

Resisti por muito tempo ao uso desse único _header_. Achava absurdo dar _include_ em (quase) todos os _headers_ existentes na linguagem só para usar uma pequena porcentagem das suas funcionalidades.

Preferia inserir cada _header_ _on demand_. Caso esquesesse de algum, sempre poderia contar com o compilador para reclamar de que alguma coisa não foi declarada, guiando-me a dar os _includes_ necessários.

Porém, assim como me acostumei em declarar arrays globais com $$10^8$$ posições, acostumei-me também com a ideia de um _super-header_. Isso porque, no contexto de _competitive programming_, tal operação é ***aceitável***.

É importante notar que esse _header_ não é (ironicamente) _stantard-C++_ (muito menos _stantard-C_). Ele é distribuído apenas no [GCC (GNU Compiler Collection)](https://gcc.gnu.org/). Assim, ele não vai funcionar se você estiver utilizando o MSVC, XCode ou qualquer outro compilador, o que é muito pouco provável no ambiente da Maratona ou dos principais _Judges Online_ existentes.

> Vale a pena ter ao menos uma noção sobre o que tem dentro desse header (que tem tudo!). Confira [nesse link](https://gcc.gnu.org/onlinedocs/libstdc++/latest-doxygen/a01494_source.html) o conteúdo desse arquivo na última versão do GCC disponível no momento da sua leitura (que atualmente corresponde à versão 5.3)

No geral, esse header é uma imensa má prática. Ele provavelmente aumentará o tempo de compilação e o tamanho do executável final. Pior ainda, ele poluirá o namespace global com um monte de coisas que você nunca vai usar, e só vai saber que existem caso o compilador reclame da redeclaração de alguma variável/função (fica a dica!).

> Na verdade, esse header, se bem utilizado, até poderia acelerar o tempo de compilação e diminuir o tamanho do executável. Isso porque trata-se de um header pré-compilado - uma _feature_ disponível no GCC: [Using Precompiled Headers](https://gcc.gnu.org/onlinedocs/gcc/Precompiled-Headers.html)

Para nós, isso não importa. Executável maior? Whatever. Tempo de compilação? Só alguns milisegundos.

Usar ou não esse _header_ é questão de **preferência** e **aceitação**. Apenas tome o cuidado de analisar o tempo que você gasta tomando **Compilation Error** na sua máquina local ou digitando `#include <iostream>` e `#include <vector>`.

> Leia essa pergunta no stackoverflow para alguns outros comentários gerais: [How does #include <bits/stdc++.h> work in C++?]( http://stackoverflow.com/questions/25311011/how-does-include-bits-stdc-h-work-in-c)

Por fim, e bem menos importante, a seção de `includes` termina com um `using namespace std;`, o que evita vários _keystrokes_ de `std::` depois.

## Typedefs
{% gist falcaopetri/b3904bd614f3304b1684 typedefs.cpp %}

Parece bobeira querer salvar alguns _keystrokes_ na definição de variáveis (isso por que você nem chegou na seção de [shortenings](#shortenings)). Tais palavras correspondem a um pedaço minúsculo se comparado com o algoritmo que você está implementando, certo? Normalmente, você só vai usar um `pair<int, int>` no seu código inteiro, certo?.

Talvez.

Assim que uso um desses tipos uma vez, crio o `typedef` correspondente, pois sei que vou precisar usá-lo de novo logo logo. Ou melhor, na incerteza de se vou usar ou não, prefiro dar o `typedef`.

Isso deixa a linha de código levemente menor, mas principalmente, permite uma fluidez maior ao se digitar.

O `typedef` de _long long_, em especial, serve também para me lembrar de que $$[-2^{64-1}, 2^{64-1}-1]$$ é uma realidade que eu posso usar. Sempre tomo WA nesses problemas.

## Shortenings
{% gist falcaopetri/b3904bd614f3304b1684 shortenings.cpp %}

Preguiça? Novamente invoco a **fluidez**. `push_back` é muito verborrágico e `make_pair`, que normalmente é parâmetro de alguma função, ocupa muito espaço na linha.

Mas nada do que vi até hoje se compara com esse FOR. Aderi a esse `#define` recementente, pois demorei muito tempo para perceber como um simples `for` pode ser tão recorrente. Estava tão automatizado à escrever meus `for's` "por extenso", que nem percebi que chegava a escrever 10 deles percorrendo o intervalo [0, $$x_i$$).

Além disso, acho a sintaxe do `for` um pouco suja demais. Ter um código com um simples `FOR(i,0,n)` parece feio no início, mas vale a pena.

Mais um ponto positivo: a declaração desse `FOR` "exige" que você estude um pouco o poder das [macros e do pré-processamento](http://www.cplusplus.com/doc/tutorial/preprocessor/)!

## "Consts"
{% gist falcaopetri/b3904bd614f3304b1684 consts.cpp %}

A constante INF é interessante. Por muito tempo utilizei o `INT_MAX` do _header_ `limits.h`. O problema é que `INT_MAX+1` causa _overflow_, gerando _bugs_ muito bizarros. Cansei de me preocupar em pensar se em algum lugar do código eu daria `x++;` em uma possível variável _setata_ para `INT_MAX`.

Assim, passei a usar o valor `0x7FFFFFFF`, que é o maior inteiro positivo possível com 32 bits. Grande _improvement_, não?

> 7FFFFFFF$$_{16} \equiv$$ 0111 1111 1111 1111 1111 1111 1111 1111$$_2 \equiv$$ INT_MAX $$\equiv$$ 2.147.483.647$$_{10}$$

Pois bem, assim me rendi à constante `1.061.109.567` utilizada por vários maratonistas. Por que esse número? Pois em hexadecimal, ele se contrai para a bonita representação 0x3F3F3F3F:


- 0x3F3F3F3F + 1 = 0x3F3F3F40 < 0x7FFFFFFF;
- 0x3F3F3F3F + 0x3F3F3F3F = 0x7E7E7E7E < 0x7FFFFFFF;
- 0x3F3F3F3F é 0x3F repetido 4 vezes, o que é fácil de digitar;
- 0x3F3F3F3F = 0x3F é 1 byte repetido 4 vezes, o que é fácil de dar memset: memset(v, 0x3F, sizeof v) seta todos os elementos de v para INF!

> 3F3F3F3F$$_{16} \equiv$$ 0011 1111 0011 1111 0011 1111 0011 1111$$_2 \equiv$$ 1.061.109.567$$ _{10} \equiv$$ 49% de 7FFFFFFF$$_{16}$$

> Leia (um pouco) mais sobre isso [aqui](http://stackoverflow.com/a/30615614)


Por fim, a maioria dos problemas define algum valor máximo que será utilizado para alocar todas as estruturas de dados ou talvez servir de _bounding_ em algum _FOR_. Assim, mantenho um _define_ com o valor MAX. Caso exista mais do que um máximo no exercício (o que é muito raro), eu invento alguma distinção na hora.

(Prefiro usar `#defines` no lugar de `const int`, mas _whatever_...).

## Debugging (experimental)
{% gist falcaopetri/b3904bd614f3304b1684 debugging.cpp %}

Na verdade, ainda não tive a chance de usar a linha 2. Uso a linha 1 sempre que vou submeter um problema que passou por muito _debug_, e não tenho certeza se ele vai passar de primeira. Assim, posso interromper e retomar o _debugging_ facilmente.

> Encontrei a linha 2 olhando o código de alguma submissão no CF, mas não lembro quem era o usuário para poder "creditá-lo" <i class="fa fa-frown-o"></i>

## iostream (experimental)
{% gist falcaopetri/b3904bd614f3304b1684 main.cpp %}

É fato que usar **cin/cout** é muito mais custoso do que usar **scanf/printf**. Mesmo assim, prefiro a versão C++ de input/output para a maioria dos problemas. Isso porque a sintaxe costuma ficar mais simples, sem ter que especificar o formato das variáveis sendo manipuladas.

Assim, nada mais justo do que tentar otimizar um pouco o preço que se paga por essa preferência. Existem vários métodos que tornam o input/output menos ["seguro"](http://codeforces.com/blog/entry/5217), mas que são 0K de se usar em _contests_.

A mais simples de todas é retirar a necessidade de sincronizar os inputs/outputs do C e os do C++ (uma vez que seremos concisos e só usaremos um deles em nosso código) por meio da chamada [ios:sync_with_stdio()](http://www.cplusplus.com/reference/ios/ios_base/sync_with_stdio/).

> Algumas discussões pertinentes no [CF](http://codeforces.com/): [#5217](http://codeforces.com/blog/entry/5217) and [#925](http://codeforces.com/blog/entry/925)

> Ainda uso scanf/printf quando preciso de um "fast input" (apesar de terem funções muito mais rápidas) e, principalmente, quando preciso formatar o output

# Ending

E você, tem algum _trick_ interessante para compartilhar? Achou as dicas dadas um _improvement_ para seu _base code_? Deixe um comentário!
