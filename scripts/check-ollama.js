#!/usr/bin/env node

import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

async function checkOllama() {
  console.log('Checking Ollama installation...\n');

  try {
    const { stdout } = await execAsync('ollama --version');
    console.log('✓ Ollama is installed');
    console.log(`  Version: ${stdout.trim()}\n`);

    try {
      const { stdout: listOutput } = await execAsync('ollama list');
      console.log('✓ Available models:');
      console.log(listOutput);
    } catch (error) {
      console.log('⚠ No models installed yet');
      console.log('  Run: ollama pull llama2\n');
    }

    try {
      await execAsync('curl -s http://localhost:11434/api/tags');
      console.log('✓ Ollama service is running\n');
    } catch (error) {
      console.log('⚠ Ollama service is not running');
      console.log('  Run: ollama serve\n');
    }

  } catch (error) {
    console.log('✗ Ollama is not installed\n');
    console.log('Installation instructions:');
    console.log('  macOS:   brew install ollama');
    console.log('  Linux:   curl -fsSL https://ollama.com/install.sh | sh');
    console.log('  Windows: Download from https://ollama.com/download\n');
    process.exit(1);
  }
}

checkOllama();
