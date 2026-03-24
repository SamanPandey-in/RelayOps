import { useEffect, useMemo, useRef, useState } from 'react';
import { Button } from '@mui/material';
import { Clock3, Pause, Play, Square } from 'lucide-react';
import toast from 'react-hot-toast';

import { useUpdateTaskMutation } from '../../store/slices/apiSlice';

const formatDuration = (seconds) => {
  const totalSeconds = Math.max(0, Number(seconds) || 0);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;

  return [hours, minutes, secs].map((value) => String(value).padStart(2, '0')).join(':');
};

export default function TaskTimer({ taskId, initialSeconds = 0, onFlushed }) {
  const [updateTask] = useUpdateTaskMutation();
  const [elapsedSeconds, setElapsedSeconds] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const [isFlushing, setIsFlushing] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    setElapsedSeconds(Number(initialSeconds) || 0);
    setIsRunning(false);
  }, [initialSeconds, taskId]);

  useEffect(() => {
    if (!isRunning) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      return;
    }

    intervalRef.current = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  const elapsedLabel = useMemo(() => formatDuration(elapsedSeconds), [elapsedSeconds]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleStop = async () => {
    setIsRunning(false);

    if (!taskId || isFlushing) return;

    try {
      setIsFlushing(true);
      await updateTask({
        id: taskId,
        timeSpent: elapsedSeconds,
      }).unwrap();
      toast.success('Time logged.');
      if (onFlushed) {
        onFlushed(elapsedSeconds);
      }
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to log time');
    } finally {
      setIsFlushing(false);
    }
  };

  return (
    <div className="rounded-md border border-zinc-200 dark:border-zinc-700 p-3">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0">
          <Clock3 className="size-4 text-zinc-500" />
          <div>
            <p className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">Timer</p>
            <p className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">{elapsedLabel}</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:justify-end">
          <Button size="small" variant="outlined" onClick={handleStart} disabled={isRunning || isFlushing} startIcon={<Play className="size-3.5" />}>
            Start
          </Button>
          <Button size="small" variant="outlined" onClick={handlePause} disabled={!isRunning || isFlushing} startIcon={<Pause className="size-3.5" />}>
            Pause
          </Button>
          <Button size="small" variant="contained" onClick={handleStop} disabled={isFlushing} startIcon={<Square className="size-3.5" />}>
            {isFlushing ? 'Saving...' : 'Stop'}
          </Button>
        </div>
      </div>
    </div>
  );
}
