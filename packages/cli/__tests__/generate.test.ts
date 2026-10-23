import path from 'node:path';
import { runCommand } from 'citty';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { generate } from '../src/commands/generate.js';
import { runTransform } from '../src/run-transform.js';
import { watchAndRebuild } from '../src/watch.js';

vi.mock('../src/run-transform.js', () => ({
  runTransform: vi.fn(),
  runTransformLibrary: vi.fn(),
  logOutcome: vi.fn(),
  logLibraryOutcome: vi.fn(),
}));

vi.mock('../src/watch.js', () => ({ watchAndRebuild: vi.fn() }));

describe('generate command argument parsing', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(runTransform).mockResolvedValue({
      success: true,
      result: { code: '', outputPath: '', components: [], warnings: [] },
      durationMs: 0,
    });
  });

  it('uses app defaults and leaves watch disabled', async () => {
    await runCommand(generate, { rawArgs: [] });

    expect(runTransform).toHaveBeenCalledWith({
      tsConfigPath: path.resolve('tsconfig.json'),
      outputPath: path.resolve('src/__generated__/context.ts'),
      scanScopes: undefined,
      configDir: undefined,
    });
    expect(watchAndRebuild).not.toHaveBeenCalled();
  });

  it('preserves string flags, hyphenated options, and boolean negation', async () => {
    await runCommand(generate, {
      rawArgs: [
        '--tsconfig',
        'config/tsconfig.json',
        '--output=src/generated.ts',
        '--config-dir',
        'config',
        '--scan',
        '@goodie-ts, @acme',
        '--no-watch',
      ],
    });

    expect(runTransform).toHaveBeenCalledWith({
      tsConfigPath: path.resolve('config/tsconfig.json'),
      outputPath: path.resolve('src/generated.ts'),
      scanScopes: ['@goodie-ts', '@acme'],
      configDir: path.resolve('config'),
    });
    expect(watchAndRebuild).not.toHaveBeenCalled();
  });
});
