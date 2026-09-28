@echo off
where ollama >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
  echo Ollama is not installed. Download from https://ollama.com/download/windows and run again.
  pause
  exit /b 1
)
echo Pulling Llama 3.2 3B locally (~2 GB)...
ollama pull llama3.2:3b
echo Done. Start the app with: npm run dev
pause
