import {execFile} from 'node:child_process';
import {promisify} from 'node:util';
import {writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';

const run = promisify(execFile);
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const version = process.argv[2] ?? '03';
if (!['03', '04', '05', '06', '07', '08', '09', '10', '11'].includes(version)) throw new Error('Expected launch version 03 through 11');
const duration = ['06', '07', '08', '09', '10', '11'].includes(version) ? '64.8' : version === '05' ? '57.6' : '60';
const review = process.argv[3] === '--review';
const audioMux = process.argv[3] === '--audio-mux';
if (review && version !== '05') throw new Error('Review audio suffix is supported for V5 only.');
if (audioMux && version !== '05') throw new Error('Lossless sound-only mux is supported for V5 only.');
if (process.argv[3] && !review && !audioMux) throw new Error('Unknown mastering mode.');
const suffix = review ? '-motion-review' : '';
const input = path.join(root, `out/agentic-office-launch-${version}${suffix}-unmastered.${audioMux ? 'mov' : 'mp4'}`);
const output = path.join(root, `out/agentic-office-launch-${version}${suffix}.mp4`);
const measure = await run('ffmpeg', ['-hide_banner', '-i', input, '-vn', '-af',
  'loudnorm=I=-16:TP=-1.5:LRA=7:print_format=json', '-f', 'null', '-'], {maxBuffer: 8 * 1024 * 1024});
const match = measure.stderr.match(/\{\s*"input_i"[\s\S]*?\}/);
if (!match) throw new Error('Could not measure audio loudness');
const measured = JSON.parse(match[0]);
const filter = `loudnorm=I=-16:TP=-1.5:LRA=7:measured_I=${measured.input_i}:measured_TP=${measured.input_tp}:measured_LRA=${measured.input_lra}:measured_thresh=${measured.input_thresh}:offset=${measured.target_offset}:linear=true:print_format=json,aresample=48000`;
const result = await run('ffmpeg', ['-hide_banner', '-y', '-i', input,
  '-map', '0:v:0', '-map', '0:a:0', '-c:v', 'copy', '-af', filter,
  '-c:a', 'aac', '-b:a', '320k', '-movflags', '+faststart', '-t', duration, output], {maxBuffer: 8 * 1024 * 1024});
const masteredMatch = result.stderr.match(/\{\s*"input_i"[\s\S]*?\}/);
await writeFile(path.join(root, `out/audio-master-v${Number(version)}${suffix}.json`), JSON.stringify({
  source: input, output, target: {integrated_lufs: -16, true_peak_dbtp: -1.5, lra_lu: 7},
  measured, mastered: masteredMatch ? JSON.parse(masteredMatch[0]) : null,
}, null, 2));
console.log(`Saved mastered launch film: ${output}`);
