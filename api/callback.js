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
      return res.status(500).send(`<h1>Erro</h1><pre>${JSON.stringify(data, null, 2)}</pre>`);
    }
    const token = data.access_token;
    const successMsg = `authorization:github:success:${JSON.stringify({ token, provider: "github" })}`;
    res.setHeader("Content-Type", "text/html");
    return res.send(`<!doctype html>
<html>
<head><meta charset="utf-8" /><title>Autenticando...</title></head>
<body>
<p>Autenticando...</p>
<script>
(function() {
  var message = ${JSON.stringify(successMsg)};

  function receiveMessage(e) {
    console.log("receiveMessage", e);
    window.opener.postMessage(message, e.origin);
    window.opener.postMessage(message, "*");
  }

  window.addEventListener("message", receiveMessage, false);

  // Inicia o handshake — CMS responde com uma mensagem, aí enviamos o token
  window.opener.postMessage("authorizing:github", "*");

  // Fallback: envia mesmo sem resposta do CMS
  setTimeout(function() {
    window.opener.postMessage(message, "*");
  }, 1000);
  setTimeout(function() {
    window.opener.postMessage(message, "*");
    window.close();
  }, 3000);
})();
</script>
</body>
</html>`);
  } catch (error) {
    return res.status(500).send(`<h1>Erro</h1><pre>${error.message}</pre>`);
  }
}
