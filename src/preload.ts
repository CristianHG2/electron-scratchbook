import {contextBridge, ipcRenderer} from 'electron';

window.addEventListener('DOMContentLoaded', async () => {
  const script = document.createElement('script');
  script.src = 'react-app/index.js';

  document.body.appendChild(script);
});

contextBridge.exposeInMainWorld('electronAPI', {
  newton: {
    navigate: (view: string) => ipcRenderer.invoke('newton:navigate', view),
  }
})

export {};
