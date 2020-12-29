function Document({ html, htmlAttributes, scripts, head }) {
  return `<!DOCTYPE html>
    <html ${htmlAttributes}>
      <head>
        ${head}
      </head>
      <body>
        <div id="root">${html}</div>
        ${scripts}
      </body>
    </html>
  `;
}

export default Document;
