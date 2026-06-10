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
    const token = data.access_token;
    const message = `authorization:github:success:${JSON.stringify({
      token: token,
      provider: "github",
    })}`;
    res.setHeader("Content-Type", "text/html");
    return res.send(`<!doctype html>
<html>
<head><meta charset="utf-8" /><title>Login realizado</title></head>
<body>
<p>Autenticando...</p>
<script>
var message = ${JSON.stringify(message)};
var targetOrigin = "https://jardimsecretopenedo.vercel.app";
var attempts = 0;
var timer = setInterval(function() {
  attempts++;
  if (window.opener) {
    try {
      window.opener.postMessage(message, targetOrigin);
      window.opener.postMessage(message, "*");
    } catch(e) {}
  }
  if (attempts >= 20) {
    clearInterval(timer);
    window.close();
  }
}, 300);
</script>
</body>
</html>`);
  } catch (error) {
    return res.status(500).send(`<h1>Erro</h1><pre>${error.message}</pre>`);
  }
}
