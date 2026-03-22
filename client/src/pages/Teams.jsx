import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useSearchParams } from 'react-router-dom';
import { Button, InputAdornment, TextField, Tooltip } from '@mui/material';
import { createSelector } from '@reduxjs/toolkit';
import { Check, Copy, KeyRound, PlusCircle, Share2, UsersIcon } from 'lucide-react';
import tokens from '../theme/tokens';
import { TeamsPageSkeleton } from '../components/ui';
import CreateTeamForm from '../components/team/CreateTeamForm';
import { 
    selectAllTeams, 
    selectTeamsLoading, 
    selectTeamsError,
    joinTeamByInviteCode,
    fetchTeams,
    selectCurrentUserId,
    selectAllProjects,
} from '../store';

export const Teams = () => {
    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();
    const currentUserId = useSelector(selectCurrentUserId);
    const userTeams = useSelector(selectAllTeams);
    const teamsLoading = useSelector(selectTeamsLoading);
    const serverError = useSelector(selectTeamsError);

    const selectProjectsCountByTeam = useMemo(
        () =>
            createSelector([selectAllProjects], (projects) => {
                const countByTeam = {};
                projects.forEach((project) => {
                    const teamId = project.teamId;
                    countByTeam[teamId] = (countByTeam[teamId] || 0) + 1;
                });
                return countByTeam;
            }),
        []
    );

    const projectsByTeam = useSelector(selectProjectsCountByTeam);

    const [joinIdentifier, setJoinIdentifier] = useState('');
    const [isJoining, setIsJoining] = useState(false);
    const [joinError, setJoinError] = useState('');
    const [copiedTeamId, setCopiedTeamId] = useState(null);

    const teamsWithProjectCount = useMemo(
        () =>
            userTeams.map((team) => ({
                ...team,
                projectsCount: projectsByTeam[team.id] || 0,
            })),
        [userTeams, projectsByTeam]
    );

    // Pre-fill join form if invite code is provided in the URL
    useEffect(() => {
        const inviteCode = searchParams.get('invite');
        if (inviteCode) {
            setJoinIdentifier(inviteCode);
            setSearchParams({}, { replace: true });
        }
    }, [searchParams, setSearchParams]);

    const handleJoinTeam = async (e) => {
        e.preventDefault();

        if (!joinIdentifier.trim()) return;
        if (!currentUserId) return;

        setIsJoining(true);
        setJoinError('');

        try {
            await dispatch(joinTeamByInviteCode(joinIdentifier.trim())).unwrap();
            setJoinIdentifier('');
        } catch (error) {
            setJoinError(error || 'Failed to join team');
        } finally {
            setIsJoining(false);
        }
    };

    const handleCopyInviteCode = async (e, inviteCode) => {
        e.preventDefault();
        e.stopPropagation();
        if (!inviteCode) return;
        try {
            await navigator.clipboard.writeText(inviteCode);
            setCopiedTeamId(inviteCode);
            setTimeout(() => setCopiedTeamId(null), 2000);
        } catch {
            // clipboard access denied or failed silently
        }
    };

    const handleShareInvite = async (e, team) => {
        e.preventDefault();
        e.stopPropagation();
        if (!team.inviteCode) return;
        const inviteUrl = `${window.location.origin}/teams?invite=${team.inviteCode}`;
        const shareMessage = `Join my team "${team.name}" on Heed! Click the link to join: ${inviteUrl}`;
        if (navigator.share) {
            try {
                await navigator.share({ title: `Join ${team.name} on Heed`, text: shareMessage, url: inviteUrl });
            } catch {
                // user cancelled or share failed
            }
        } else {
            try {
                await navigator.clipboard.writeText(shareMessage);
            } catch {
                // clipboard access denied or failed silently
            }
        }
    };

    const handleRefresh = () => {
        dispatch(fetchTeams());
    };

    if (teamsLoading) {
        return <TeamsPageSkeleton />;
    }

    return (
        <div className="space-y-6 max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                <div>
                    <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-1">Teams</h1>
                    <p className="text-gray-500 dark:text-zinc-400 text-sm">
                        Teams where you are a member
                    </p>
                </div>
                <CreateTeamForm onTeamCreated={handleRefresh} />
            </div>

            <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 p-4">
                <form onSubmit={handleJoinTeam} className="flex flex-col md:flex-row gap-3 md:items-end">
                    <div className="flex-1">
                        <label className="text-sm text-zinc-700 dark:text-zinc-300">Join Existing Team</label>
                        <TextField
                            value={joinIdentifier}
                            onChange={(e) => setJoinIdentifier(e.target.value)}
                            placeholder="Enter team ID or invite code"
                            sx={{ mt: 1 }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <KeyRound className="size-4" />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </div>
                    <Button
                        type="submit"
                        disabled={isJoining || !joinIdentifier.trim()}
                        variant="contained"
                    >
                        {isJoining ? 'Joining...' : 'Join Team'}
                    </Button>
                </form>
                {joinError && <p className="text-sm text-red-500 mt-2">{joinError}</p>}
            </div>

            {teamsWithProjectCount.length === 0 ? (
                <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 p-12 text-center space-y-3">
                    <UsersIcon className="size-10 mx-auto text-zinc-400 mb-3" />
                    <p className="text-zinc-600 dark:text-zinc-400">You are not part of any team yet.</p>
                    <div className="flex justify-center">
                        <CreateTeamForm onTeamCreated={handleRefresh} />
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {teamsWithProjectCount.map((team) => (
                        <Link
                            key={team.id}
                            to={`/teams/${team.id}`}
                            className={tokens.cardBgClass}
                        >
                            <div className="flex items-start justify-between gap-3">
                                <div>
                                    <h3 className="font-semibold text-zinc-900 dark:text-zinc-200">{team.name}</h3>
                                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 line-clamp-2">
                                        {team.description || 'No description'}
                                    </p>
                                </div>
                                <PlusCircle className="size-4 text-zinc-400" />
                            </div>
                            <div className="mt-4 space-y-1 text-xs text-zinc-600 dark:text-zinc-400">
                                <p>Members: {team.members?.length || 0}</p>
                                <p>Projects: {team.projectsCount}</p>
                                <div className="flex items-center gap-2 mt-2">
                                    <span className="font-mono bg-zinc-100 dark:bg-white/5 px-1.5 py-0.5 rounded select-all flex-1 truncate">
                                        {team.inviteCode || 'N/A'}
                                    </span>
                                    {team.inviteCode && (
                                        <>
                                            <Tooltip title={copiedTeamId === team.inviteCode ? 'Copied!' : 'Copy invite code'}>
                                                <button
                                                    type="button"
                                                    onClick={(e) => handleCopyInviteCode(e, team.inviteCode)}
                                                    className="p-1 rounded hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-500 dark:text-zinc-400"
                                                >
                                                    {copiedTeamId === team.inviteCode ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                                                </button>
                                            </Tooltip>
                                            <Tooltip title="Share invite link">
                                                <button
                                                    type="button"
                                                    onClick={(e) => handleShareInvite(e, team)}
                                                    className="p-1 rounded hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-500 dark:text-zinc-400"
                                                >
                                                    <Share2 className="size-3.5" />
                                                </button>
                                            </Tooltip>
                                        </>
                                    )}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Teams;
