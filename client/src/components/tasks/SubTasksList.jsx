import { Box, Checkbox, Typography, LinearProgress, Chip } from '@mui/material';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { useState, useMemo } from 'react';

export default function SubTasksList({ subTasks }) {
  const [isExpanded, setIsExpanded] = useState(true);

  const stats = useMemo(() => {
    const total = subTasks?.length || 0;
    const done = subTasks?.filter((st) => st.status === 'DONE').length || 0;
    return {
      total,
      done,
      percent: total > 0 ? Math.round((done / total) * 100) : 0,
    };
  }, [subTasks]);

  if (!subTasks || subTasks.length === 0) {
    return null;
  }

  return (
    <Box className="mt-4 p-3 bg-zinc-50 dark:bg-white/5 rounded-lg border border-zinc-200 dark:border-zinc-800">
      <Box
        className="flex items-center gap-2 cursor-pointer mb-3"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? (
          <ChevronDown className="w-4 h-4" />
        ) : (
          <ChevronRight className="w-4 h-4" />
        )}
        <Typography variant="subtitle2" className="font-medium">
          Sub-tasks ({stats.done}/{stats.total})
        </Typography>
      </Box>

      {isExpanded && (
        <>
          <LinearProgress
            variant="determinate"
            value={stats.percent}
            sx={{ mb: 2, height: 6, borderRadius: 1 }}
          />
          <Box className="space-y-2">
            {subTasks.map((subTask) => (
              <Box
                key={subTask.id}
                className="flex items-center gap-2 p-2 rounded hover:bg-zinc-100 dark:hover:bg-zinc-900/50 transition-colors"
              >
                <Checkbox
                  size="small"
                  checked={subTask.status === 'DONE'}
                  disabled
                  sx={{ cursor: 'default' }}
                />
                <div className="flex-1 min-w-0">
                  <Typography
                    variant="body2"
                    className="truncate"
                    sx={{
                      textDecoration: subTask.status === 'DONE' ? 'line-through' : 'none',
                      color:
                        subTask.status === 'DONE'
                          ? 'var(--color-text-secondary)'
                          : 'inherit',
                    }}
                  >
                    {subTask.title}
                  </Typography>
                </div>
                <Box className="flex items-center gap-1">
                  {subTask.assignee && (
                    <Typography variant="caption" color="textSecondary">
                      {subTask.assignee.fullName || subTask.assignee.username}
                    </Typography>
                  )}
                  <Chip
                    label={subTask.status.replace('_', ' ')}
                    size="small"
                    variant="outlined"
                  />
                </Box>
              </Box>
            ))}
          </Box>
        </>
      )}
    </Box>
  );
}
