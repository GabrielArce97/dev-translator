# Dev Translator

An intelligent code translation tool built with Next.js and Vercel AI SDK. Translate code snippets between different programming languages seamlessly using Google's Gemini AI.

## Features

- **Smart Translation**: Leverages Google Gemini to accurately translate code logic, not just syntax.
- **Language Support**: Supports popular languages including Python, JavaScript, TypeScript, Java, C++, Go, and Rust.
- **Modern UI**: Clean, responsive interface built with Tailwind CSS and React.
- **Real-time Feedback**: Instant translation with streaming responses.
- **Syntax Highlighting**: Beautiful code visualization for both input and output.

## Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **AI Integration**: [Vercel AI SDK](https://sdk.vercel.ai/docs)
- **Model Provider**: [Google Generative AI](https://ai.google.dev/) (Gemini)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Validation**: [Zod](https://zod.dev/)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- A Google AI Studio API Key

### Installation

1.  **Clone the repository**

    ```bash
    git clone https://github.com/GabrielArce97/dev-translator.git
    cd dev-translator
    ```

2.  **Install dependencies**

    ```bash
    npm install
    ```

3.  **Set up environment variables**

    Create a `.env.local` file in the root directory and add your Google API key:

    ```env
    GOOGLE_GENERATIVE_AI_API_KEY=your_api_key_here
    ```

4.  **Run the development server**

    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Usage

1.  Paste or type the code you want to translate in the left panel.
2.  Select the **Target Language** from the dropdown menu (default is Python).
3.  Click **Translate** (or `Cmd+Enter` / `Ctrl+Enter`).
4.  View the translated code in the right panel.
