export default async function handler(req, res) {

    let prompt = `Você é um designer web premiado e Programador. 
Crie uma landing page COMPLETA e VISUALMENTE IMPRESSIONANTE para o negócio descrito.

Regras de resposta:
- Responda SOMENTE com HTML e CSS puros
- Não use crases, markdown ou explicações
- Não use tags <img>

Identidade visual:
- Invente uma paleta de cores única
- Escolha uma Google Font marcante via @import
- Use emojis grandes
- Use CSS moderno

Estrutura:
- Header
- Hero
- Diferenciais
- Depoimento
- Footer`

    try {

        let resposta = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
            },
            body: JSON.stringify({
                model: "llama-3.3-70b-versatile",
                messages: [
                    {
                        role: "system",
                        content: prompt
                    },
                    {
                        role: "user",
                        content: req.body.promptUsuario
                    }
                ]
            })
        })

        let dados = await resposta.json()

        res.status(200).json(dados)

    } catch (erro) {

        res.status(500).json({
            erro: erro.message
        })

    }
}