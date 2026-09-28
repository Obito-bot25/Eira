#!/usr/bin/env bash
set -e
if ! command -v ollama >/dev/null 2>&1; then
  echo "Ollama is not installed. Install it from https://ollama.com/download and run this script again."
  exit 1
fi
echo "Pulling Llama 3.2 3B locally (~2 GB)..."
ollama pull llama3.2:3b
echo "Done. Start the app with: npm run dev"
