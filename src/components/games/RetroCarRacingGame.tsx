import { useEffect, useMemo, useState } from 'react';

const lanes = [0, 1, 2] as const;
const boardRows = 12;

type Enemy = { row: number; lane: number };

export function RetroCarRacingGame() {
  const [playerLane, setPlayerLane] = useState(1);
  const [enemies, setEnemies] = useState<Enemy[]>([{ row: 0, lane: 0 }]);
  const [running, setRunning] = useState(false);
  const [score, setScore] = useState(0);
  const [crashed, setCrashed] = useState(false);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') setPlayerLane((lane) => Math.max(0, lane - 1));
      if (event.key === 'ArrowRight') setPlayerLane((lane) => Math.min(2, lane + 1));
      if (event.key === ' ' && !running) setRunning(true);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [running]);

  useEffect(() => {
    if (!running || crashed) return;
    const timer = setInterval(() => {
      setEnemies((prev) => {
        const moved = prev.map((enemy) => ({ ...enemy, row: enemy.row + 1 })).filter((enemy) => enemy.row < boardRows);
        if (Math.random() > 0.55) moved.push({ row: 0, lane: lanes[Math.floor(Math.random() * lanes.length)] });
        return moved;
      });
      setScore((v) => v + 5);
    }, 220);

    return () => clearInterval(timer);
  }, [running, crashed]);

  useEffect(() => {
    if (!running || crashed) return;
    const collision = enemies.some((enemy) => enemy.row === boardRows - 2 && enemy.lane === playerLane);
    if (collision) {
      setCrashed(true);
      setRunning(false);
    }
  }, [enemies, playerLane, running, crashed]);

  const reset = () => {
    setPlayerLane(1);
    setEnemies([{ row: 0, lane: 0 }]);
    setRunning(false);
    setScore(0);
    setCrashed(false);
  };

  const cells = useMemo(() => {
    const matrix: Array<{ row: number; lane: number; player: boolean; enemy: boolean }> = [];
    for (let row = 0; row < boardRows; row += 1) {
      for (let lane = 0; lane < 3; lane += 1) {
        matrix.push({
          row,
          lane,
          player: row === boardRows - 2 && lane === playerLane,
          enemy: enemies.some((enemy) => enemy.row === row && enemy.lane === lane),
        });
      }
    }
    return matrix;
  }, [playerLane, enemies]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-sm">
        <p>Score: <span className="font-semibold">{score}</span></p>
        <p className="text-muted">{crashed ? 'Crash! Restart to race again.' : running ? 'Use ← → to avoid traffic' : 'Press Space or Start'}</p>
      </div>

      <div className="mx-auto grid max-w-[360px] grid-cols-3 gap-1 rounded-2xl border border-emerald-300/25 bg-slate-950/80 p-2">
        {cells.map((cell) => (
          <div key={`${cell.row}-${cell.lane}`} className="aspect-[1/1.3] rounded-md border border-white/5 bg-slate-900/80">
            {cell.player && <div className="mx-auto mt-1 h-8 w-8 rounded-md bg-cyan-300" />}
            {cell.enemy && <div className="mx-auto mt-1 h-8 w-8 rounded-md bg-rose-400" />}
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        {!running && !crashed && <button onClick={() => setRunning(true)} className="rounded-lg bg-cyan-500/20 px-3 py-2 text-xs">Start</button>}
        <button onClick={reset} className="rounded-lg bg-white/10 px-3 py-2 text-xs">Restart</button>
      </div>
    </div>
  );
}
