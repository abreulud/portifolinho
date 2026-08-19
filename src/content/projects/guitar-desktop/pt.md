## Visão geral

Guitar Desktop é uma experiência web inspirada nos desktops do Windows 98, Windows XP e início dos anos 2000. O projeto cria um espaço separado para apoiar gravações de guitarra sem perder o clima visual dos computadores daquela época.

A aplicação não grava o vídeo diretamente. Ela organiza câmera, backing tracks e referências em uma única tela, pronta para ser capturada por um gravador de tela externo.

## Funcionalidades

- **Webcam:** solicita permissão do navegador e exibe a câmera sem capturar áudio.
- **Player:** aceita faixas escolhidas pela pessoa usuária, cria uma playlist e oferece controles de reprodução, volume e navegação.
- **Guitar Tabs:** abre uma área de navegador para consultar referências durante a sessão.
- **Setlist:** disponibiliza um bloco de notas para organizar as músicas.
- **Aparência:** permite alternar entre temas retrô, escolher papéis de parede predefinidos ou usar uma imagem personalizada.
- **Desktop:** janelas podem ser abertas, focadas, minimizadas, maximizadas e reposicionadas.

## Decisões de implementação

A interface foi dividida em aplicativos independentes que compartilham a área de trabalho e o gerenciamento de janelas. O estado do desktop é salvo em `localStorage`, incluindo preferências visuais e organização da sessão.

Arquivos de áudio e imagem escolhidos permanecem no navegador. A webcam só é ativada após a permissão da pessoa usuária.

## Tecnologias

- React
- Vite
- JavaScript
- CSS
- MediaDevices API
- localStorage

## Executar localmente

```bash
npm install
npm run dev
```
