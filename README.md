# LibrasQuest - Protótipo Educacional

Um protótipo interativo para o ensino de LIBRAS e sua história através de gamificação. Desenvolvido como projeto para a Universidade de Pernambuco (UPE) - Campus Garanhuns.

## ✨ Funcionalidades do Projeto

O LibrasQuest inclui as seguintes telas, gerenciadas pelo componente `App.tsx`:

* **Início (`HOME`)**: Tela principal com acesso rápido ao Quiz de História e ao Jogo de Sinais.
* **Quiz de História (`QUIZ`)**: Testa conhecimentos sobre a história da LIBRAS com perguntas baseadas na Apostila Libras Básico I.
* **Jogo de Sinais (`GAME`)**: Desafio de associação para aumentar o vocabulário de LIBRAS.
* **Sobre (`ABOUT`)**: Detalhes sobre a instituição (UPE Campus Garanhuns), a equipe de desenvolvimento (Luíz Tenório, Melissa Rêgo, Paula Beatriz, Pedro Ricardo), e a fonte do material.

## 💻 Configuração e Execução Local

Este projeto requer o Node.js instalado.

### 1. Pré-requisitos

1.  Clone este repositório.
2.  Instale as dependências:
    ```bash
    npm install
    ```

### 2. Configuração da API Key

1.  Obtenha sua chave de API do Gemini.
2.  Edite o arquivo `.env.local` e defina a chave:
    ```
    GEMINI_API_KEY=SUA_CHAVE_AQUI
    ```

### 3. Execução

Rode o aplicativo em modo de desenvolvimento:

```bash
npm run dev
