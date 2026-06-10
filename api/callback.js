export default async function handler(req, res) {
  const { code } = req.query;

  if (!code) {
    return res.status(400).send("Erro: código de autorização não recebido.");
  }

  try {
    const response = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      }),
    });

    const data = await response.json();

    if (!data.access_token) {
      return res.status(500).send(`
        <h1>Erro ao autenticar com GitHub</h1>
        <pre>${JSON.stringify(data, null, 2)}</pre>
      `);
    }

    const message = `authorization:github:success:${JSON.stringify({
      token: data.access_token,
      provider: "github",
    })}`;

    res.setHeader("Content-Type", "text/html");

    return res.send(`
      <!doctype html>
      <html>
        <head>
          <meta charset="utf-8" />
          <title>Login realizado</title>
        </head>
        <body style="font-family: Arial, sans-serif; padding: 30px;">
          <h2>Login recebido. Aguarde...</h2>
          <p>Se esta janela não fechar sozinha, pode fechar manualmente em alguns segundos.</p>

          <script>
            const message = ${JSON.stringify(message)};

            function sendToken() {
              if (window.opener) {
                window.opener.postMessage(message, "*");
              }
            }

            sendToken();
            setTimeout(sendToken, 500);
            setTimeout(sendToken, 1000);
            setTimeout(sendToken, 2000);
            setTimeout(sendToken, 3000);

            setTimeout(function() {
              window.close();
            }, 6000);
          </script>
        </body>
      </html>
    `);
  } catch (error) {
    return res.status(500).send(`
      <h1>Erro interno no callback</h1>
      <pre>${error.message}</pre>
    `);
  }
}
