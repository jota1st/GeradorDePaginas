export default async function handler(req, res) {

    if (req.method !== "POST") {
        return res.status(405).json({
            erro: "Método não permitido"
        })
    }

    try {

        const resposta = await fetch("https://api.groq.com/openai/v1/chat/completions", {
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
                        content: `Você é um designer web premiado e programador.

Crie uma landing page COMPLETA e VISUALMENTE IMPRESSIONANTE.

Regras:
- Responda SOMENTE com HTML e CSS
- Não use markdown
- Não use crases
- Não use imagens
- Use visual moderno
- Use gradientes
- Use animações suaves
- Use emojis

Estrutura:
- Header
- Hero
- Benefícios
- Depoimento
- Footer`
                    },
                    {
                        role: "user",
                        content: req.body.promptUsuario
                    }
                ]
            })
        })

        const dados = await resposta.json()

        return res.status(200).json(dados)

    } catch (erro) {

        return res.status(500).json({
            erro: erro.message
        })

    }
}