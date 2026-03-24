import { Box, AvatarGroup, Avatar, Tooltip, Typography } from '@mui/material';
import { useProjectPresence } from '../../hooks/useProjectPresence';

const getDisplayName = (user) => {
  if (typeof user === 'string') return user;
  return user?.fullName || user?.username || user?.id || 'Unknown';
};

const getInitial = (user) => {
  const displayName = getDisplayName(user).trim();
  return displayName ? displayName.charAt(0).toUpperCase() : '?';
};

const getPresenceKey = (user) => {
  if (typeof user === 'string') return user;
  return user?.id || user?.username || user?.fullName || 'presence-user';
};

export default function PresenceIndicator({ projectId }) {
  const { count, users } = useProjectPresence(projectId);

  if (count === 0) {
    return null;
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Typography variant="caption" sx={{ color: 'var(--color-text-secondary)' }}>
        {count} viewing
      </Typography>
      <AvatarGroup max={3} sx={{ '& .MuiAvatar-root': { width: 24, height: 24, fontSize: '0.75rem' } }}>
        {users.map((user, index) => (
          <Tooltip key={`${getPresenceKey(user)}-${index}`} title={getDisplayName(user)}>
            <Avatar sx={{ width: 24, height: 24, fontSize: '0.75rem', backgroundColor: '#64748b' }}>
              {getInitial(user)}
            </Avatar>
          </Tooltip>
        ))}
      </AvatarGroup>
    </Box>
  );
}
