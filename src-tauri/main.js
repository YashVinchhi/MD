const { app } = require('@tauri-apps/api');
const { Command } = require('@tauri-apps/api/shell');

async function startServer() {
  // Path to your packaged server binary
  const command = Command.sidecar('server.exe');
  await command.spawn();
}

app.whenReady().then(() => {
  startServer();
});
