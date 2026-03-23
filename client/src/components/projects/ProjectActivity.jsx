import { useMemo } from 'react';
import { Box, Typography, Skeleton, Chip } from '@mui/material';
import { format } from 'date-fns';
import { useGetProjectActivityQuery } from '../../store/slices/apiSlice';

const actionLabels = {
  TASK_CREATED: 'Created task',
  TASK_UPDATED: 'Updated task',
  TASK_DELETED: 'Deleted task',
  TASK_ASSIGNED: 'Assigned task',
  STATUS_CHANGED: 'Changed status',
};

const actionColors = {
  TASK_CREATED: 'success',
  TASK_UPDATED: 'info',
  TASK_DELETED: 'error',
  TASK_ASSIGNED: 'warning',
  STATUS_CHANGED: 'info',
};

export default function ProjectActivity({ projectId }) {
  const { data, isLoading } = useGetProjectActivityQuery(projectId, {
    skip: !projectId,
  });

  const activityLogs = useMemo(() => data?.activityLogs || [], [data]);

  if (isLoading) {
    return (
      <Box className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Box key={i} className="p-4 border border-zinc-200 dark:border-zinc-800 rounded-lg">
            <Skeleton width="60%" height={20} />
            <Skeleton width="40%" height={16} sx={{ mt: 1 }} />
          </Box>
        ))}
      </Box>
    );
  }

  if (activityLogs.length === 0) {
    return (
      <Box className="text-center py-12">
        <Typography variant="body2" color="textSecondary">
          No activity yet
        </Typography>
      </Box>
    );
  }

  return (
    <Box className="space-y-4">
      {activityLogs.map((log) => (
        <Box
          key={log.id}
          className="p-4 border border-zinc-200 dark:border-zinc-800 rounded-lg hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
        >
          <Box className="flex items-start justify-between mb-2">
            <Box className="flex items-center gap-2">
              <Chip
                label={actionLabels[log.action] || log.action}
                size="small"
                color={actionColors[log.action] || 'default'}
                variant="outlined"
              />
              <Typography variant="caption" color="textSecondary">
                by {log.user?.fullName || log.user?.username}
              </Typography>
            </Box>
            <Typography variant="caption" color="textSecondary">
              {format(new Date(log.createdAt), 'MMM d, HH:mm')}
            </Typography>
          </Box>

          {log.newValue && (
            <Box className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              {log.newValue.title && (
                <Typography variant="body2" className="font-medium">
                  {log.newValue.title}
                </Typography>
              )}
              {log.newValue.status && (
                <Typography variant="caption">
                  Status: {log.newValue.status.replace('_', ' ')}
                </Typography>
              )}
            </Box>
          )}

          {log.oldValue && log.newValue && (
            <Box className="mt-2 text-xs text-zinc-500 dark:text-zinc-500">
              Changed from {JSON.stringify(log.oldValue)} to {JSON.stringify(log.newValue)}
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );
}
