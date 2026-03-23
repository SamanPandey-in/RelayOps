import { Autocomplete, TextField } from '@mui/material';
import { useMemo } from 'react';

export default function ParentTaskSelector({ tasks, projectId, value, onChange }) {
  const availableTasks = useMemo(() => {
    return tasks.filter((task) => task.projectId === projectId && !task.parentId);
  }, [tasks, projectId]);

  const selectedTask = useMemo(() => {
    return availableTasks.find((t) => t.id === value) || null;
  }, [value, availableTasks]);

  return (
    <Autocomplete
      options={availableTasks}
      getOptionLabel={(option) => option?.title || ''}
      value={selectedTask}
      onChange={(_, task) => onChange(task?.id || null)}
      renderInput={(params) => <TextField {...params} label="Parent Task (Optional)" />}
      isOptionEqualToValue={(option, val) => option?.id === val?.id}
      noOptionsText="No available parent tasks"
    />
  );
}
