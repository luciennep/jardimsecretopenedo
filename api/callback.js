export default async function handler(req, res) {
  const { code } = req.query;

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
    return res.status(500).send(JSON.stringify(data, null, 2));
  }

  const message = `authorization:github:success:${JSON.stringify({
    token: data.access_token,
    provider: "github",
  })}`;

  res.setHeader("Content-Type", "text/html");
  res.send(`
    <!doctype html>
    <html>
      <body>
        <h2>Login realizado. Aguarde...</h2>
        <script>
          const message = ${JSON.stringify(message)};
          if (window.opener) {
            window.opener.postMessage(message, "*");
          }
          setTimeout(() => window.close(), 3000);
        </script>
      </body>
    </html>
  `);
}
