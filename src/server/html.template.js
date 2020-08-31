export const templateHTML = (styles, scripts, html, preloadedState) => {
  return `
     <!doctype html>
     <html lang="en">
     <head>
         <meta charset="UTF-8">
         <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
         <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
         <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
         <title>TO-DO APP</title>
         ${styles
      .map(style => {
        return `<link href="${style.file}" rel="stylesheet" />`;
      })
      .join('\n')}
     </head>
     <body>
         <div id="root">${html}</div>
         ${scripts
      .map(script => {
        return `
           <script src="${script.file}"></script>`;
      })
      .join(' ')}
       <script>window.__PRELOADED_STATE__=${JSON.stringify(preloadedState)}</script>
   
       <script>
         if ('serviceWorker' in navigator) {
             window.addEventListener('load', () => {
                 navigator.serviceWorker.register('/serviceWorker.js');
             });
         }
      </script>
     </body>
     </html>
   `
}
