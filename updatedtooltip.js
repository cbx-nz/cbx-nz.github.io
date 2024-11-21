fetch('https://cbgames-xyz.vercel.app/updatedtooltip.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('content-placeholder').innerHTML = data;
    });