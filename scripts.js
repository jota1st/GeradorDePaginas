// Clicou no botao Gerar - CHAMA ESSA FUNÇAO
let prompt = `Você é um designer web premiado e Programador. 
Crie uma landing page COMPLETA e VISUALMENTE IMPRESSIONANTE para o negócio descrito.

Regras de resposta:
- Responda SOMENTE com HTML e CSS puros
- Não use crases, markdown ou explicações
- Não use tags <img>

Identidade visual (capriche e surpreenda):
- Invente uma paleta de cores única que combine com a essência do negócio
- Escolha uma Google Font marcante via @import
- Use emojis grandes no lugar de imagens
- Use CSS moderno: gradientes, sombras, animações sutis, layout generoso, tipografia forte

Estrutura da página:
- Header com nome do negócio e menu
- Hero impactante com título, subtítulo e botão CTA
- Seção de diferenciais com emojis
- Depoimento de cliente
- Footer com contato

Todo o conteúdo em português, criativo e específico para o negócio.`

async function GerarCodigo() {

    let textarea = document.querySelector(".texto-pagina").value

    try {

        let resposta = await fetch("/api/gerar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                promptUsuario: textarea
            })
        })

        let dados = await resposta.json()

        if (!dados.choices) {
            console.log(dados)
            alert("Erro ao gerar código")
            return
        }

        let resultado = dados.choices[0].message.content

        let espacoCodigo = document.querySelector(".Bloco-codigo")
        let espacoSite = document.querySelector(".bloco-site")

        espacoCodigo.textContent = resultado
        espacoSite.srcdoc = resultado

        console.log(resultado)

    } catch (erro) {

        console.log(erro)
        alert("Erro na requisição")

    }
}