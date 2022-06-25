declare interface Window {
  electronAPI: {
    newton: {
      navigate: (view: string) => Promise<Object>
    }
  }
}
