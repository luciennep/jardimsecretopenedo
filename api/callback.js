export default async function handler(req, res) {
  const { code } = req.query;
  if (!code) {
    return res.status(400).send("Erro: código de autorização não recebido.");
  }
  try {
    const response = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
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
<head><meta charset="utf-8"/><title>Autenticando...</title></head>
<body><p>Autenticando...</p>
<script>
(function() {
  var message = ${JSON.stringify(successMsg)};
  var origins = [
    "https://jardimsecretopenedo.vercel.app",
    "*"
  ];
  
  // Tenta enviar o token para o CMS a cada 200ms por 10 segundos
  var count = 0;
  var interval = setInterval(function() {
    count++;
    try {
      if (window.opener) {
        origins.forEach(function(origin) {
          window.opener.postMessage(message, origin);
        });
      }
    } catch(e) {}
    if (count >= 50) {
      clearInterval(interval);
      window.close();
    }
  }, 200);
})();
</script>
</body>
</html>`);
  } catch (error) {
    return res.status(500).send(`<h1>Erro</h1><pre>${error.message}</pre>`);
  }
}
