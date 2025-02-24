"use client";

import { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { useUserData } from '@/hooks/useUserData';
import { formatDistanceToNow } from 'date-fns';
import DDLCButton from '@/components/Common/Buttons/Button';
import { AddGoalDialog } from './AddGoalDialog';
import { Goal } from '@/types/user';

export function Goals() {
  const { userData, refreshUserData, loading } = useUserData();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeGoals, setActiveGoals] = useState<Goal[]>([]);

  // Update active goals whenever userData changes
  useEffect(() => {
    if (userData?.stats?.goals) {
      // Filter only incomplete goals and take the 3 most recent
      const incomplete = userData.stats.goals
        .filter(goal => !goal.completed)
        .slice(0, 3);
      setActiveGoals(incomplete);
    }
  }, [userData]);

  const handleGoalCreated = async () => {
    setIsDialogOpen(false);
    await refreshUserData();
  };

  if (loading) {
    return <div className="animate-pulse p-4 bg-pink-100/50 rounded-lg h-40"></div>;
  }

  if (!userData || !userData.stats) {
    return <div className="text-center p-4">Loading goals...</div>;
  }

  const canAddGoal = activeGoals.length < 3;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-[Riffic] text-pink-700">Study Goals</h2>
        <DDLCButton 
          label="Add Goal" 
          onClick={() => setIsDialogOpen(true)}
          disabled={!canAddGoal}
          tooltip={!canAddGoal ? "Complete existing goals first" : undefined}
        />
      </div>
      
      {activeGoals.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white/50 p-6 rounded-lg text-center"
        >
          <div className="text-4xl mb-3">🎯</div>
          <h3 className="font-[Halogen] text-pink-800 mb-2">No Active Goals</h3>
          <p className="text-pink-600 text-sm mb-4">
            Set study goals to track your progress and earn rewards
          </p>
          <DDLCButton 
            label="Create Your First Goal" 
            onClick={() => setIsDialogOpen(true)}
          />
        </motion.div>
      ) : (
        <div className="space-y-3">
          {activeGoals.map((goal, index) => (
            <motion.div
              key={goal.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/50 p-4 rounded-lg"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-[Halogen] text-pink-800">{goal.title}</h3>
                <span className="text-sm text-pink-600">
                  Due {formatDistanceToNow(new Date(goal.deadline), { 
                    addSuffix: true,
                    includeSeconds: false 
                  })}
                </span>
              </div>
              <div className="w-full h-2 bg-pink-100 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-pink-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min((goal.currentMinutes / goal.targetMinutes) * 100, 100)}%` }}
                />
              </div>
              <div className="flex justify-between text-sm mt-2">
                <span className="text-pink-700">
                  {Math.floor(goal.currentMinutes / 60)}h / {Math.floor(goal.targetMinutes / 60)}h
                </span>
                <span className="text-pink-600">
                  {Math.round((goal.currentMinutes / goal.targetMinutes) * 100)}%
                </span>
              </div>
            </motion.div>
          ))}

          {canAddGoal && (
            <div className="text-center mt-2">
              <p className="text-pink-600 text-sm">
                You can add {3 - activeGoals.length} more goal{activeGoals.length === 2 ? '' : 's'}
              </p>
            </div>
          )}
        </div>
      )}

      <AddGoalDialog 
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onGoalCreated={handleGoalCreated}
      />
    </div>
  );
} 