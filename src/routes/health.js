'use strict';

const express = require('express');

const router = express.Router();

/**
 * GET /health
 *
 * Health check endpoint for the proxy.
 */
router.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'opencode-zen-proxy',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

/**
 * GET /ping
 *
 * Simple ping endpoint to keep the service alive 24/7 (avoids cold starts).
 */
router.get('/ping', (_req, res) => {
  res.send('pong');
});

/**
 * GET /
 *
 * Root endpoint with basic info.
 */
router.get('/', (_req, res) => {
  res.json({
    name: 'OpenCode Zen Proxy',
    version: '1.0.0',
    description: 'OpenAI-compatible proxy for OpenCode Zen API',
    documentation: '/docs',
    health: '/health',
    models: '/v1/models',
    chat: '/v1/chat/completions (POST)',
  });
});

/**
 * GET /docs
 *
 * Quick documentation in JSON format.
 */
router.get('/docs', (_req, res) => {
  res.json({
    service: 'OpenCode Zen Proxy',
    usage: {
      'List Models': {
        method: 'GET',
        endpoint: '/v1/models',
      },
      'Chat Completions (non-streaming)': {
        method: 'POST',
        endpoint: '/v1/chat/completions',
        body: {
          model: 'opencode/deepseek-v4-flash-free',
          messages: [{ role: 'user', content: 'Hello!' }],
        },
      },
      'Chat Completions (streaming)': {
        method: 'POST',
        endpoint: '/v1/chat/completions',
        body: {
          model: 'opencode/deepseek-v4-flash-free',
          messages: [{ role: 'user', content: 'Hello!' }],
          stream: true,
        },
      },
    },
    'Model Aliases': 'You can omit the "opencode/" prefix. E.g., "deepseek-v4-flash-free" works.',
    authentication: 'Keyless. The proxy forwards "public" to Zen for free-tier models. Set CLIENT_API_KEY to gate client access.',
    'Free Models': [
      'opencode/deepseek-v4-flash-free',
      'opencode/big-pickle',
      'opencode/mimo-v2.5-free',
      'opencode/nemotron-3-ultra-free',
      'opencode/north-mini-code-free',
    ],
  });
});

module.exports = router;
