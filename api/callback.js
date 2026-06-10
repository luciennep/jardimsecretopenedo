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

    res.setHeader("Content-Type", "text/html");

    return res.send(`
      <!doctype html>
      <html>
        <body>
          <h2>Login recebido. Aguarde...</h2>
          <script>
            window.opener.postMessage(
              'authorization:github:success:${JSON.stringify({
                token: data.access_token,
                provider: "github"
              }).replace(/'/g, "\\'")}',
              '*'
            );

            setTimeout(function() {
              window.close();
            }, 5000);
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
