"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProgress } from '@/hooks/useProgress';
import { useNotification } from '@/contexts/NotificationContext';
import DDLCButton from '@/components/Common/Buttons/Button';

interface AddGoalDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onGoalCreated: () => void;
}

export function AddGoalDialog({ isOpen, onClose, onGoalCreated }: AddGoalDialogProps) {
  const { addGoal } = useProgress();
  const { showNotification } = useNotification();
  const [title, setTitle] = useState('');
  const [targetHours, setTargetHours] = useState('');
  const [deadline, setDeadline] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsSubmitting(true);
      
      // Validate inputs
      if (!title.trim()) {
        showNotification({
          message: "Please enter a goal title",
          type: "system",
          icon: "⚠️"
        });
        return;
      }
      
      if (!targetHours || parseInt(targetHours) <= 0) {
        showNotification({
          message: "Please enter a valid number of hours",
          type: "system",
          icon: "⚠️"
        });
        return;
      }
      
      if (!deadline) {
        showNotification({
          message: "Please select a deadline",
          type: "system",
          icon: "⚠️"
        });
        return;
      }
      
      // Create a valid Date object
      const deadlineDate = new Date(deadline);
      
      // Check if the date is valid
      if (isNaN(deadlineDate.getTime())) {
        showNotification({
          message: "Invalid deadline date",
          type: "system",
          icon: "⚠️"
        });
        return;
      }
      
      // Set to end of day (23:59:59)
      deadlineDate.setHours(23, 59, 59, 999);
      
      await addGoal({
        title,
        targetMinutes: parseInt(targetHours) * 60,
        deadline: deadlineDate.toISOString(),
        currentMinutes: 0
      });

      setTitle('');
      setTargetHours('');
      setDeadline('');
      onGoalCreated();
      onClose();
    } catch (error) {
      console.error('Error adding goal:', error);
      showNotification({
        message: "Failed to add goal. Please try again.",
        type: "system",
        icon: "❌"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClassName = `
    w-full p-3 rounded-lg bg-white/50 border border-pink-100 
    focus:border-pink-300 focus:outline-none text-center
    text-black font-['Halogen'] placeholder:text-pink-300
  `;

  const today = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white/80 backdrop-blur-sm rounded-lg p-6 w-full max-w-md"
            onClick={e => e.stopPropagation()}
          >
            <h2 className="text-2xl font-[Riffic] text-pink-700 mb-4">Set New Goal</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-pink-700 mb-1 font-[Halogen]">Goal Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className={inputClassName}
                  placeholder="Enter goal title"
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label className="block text-pink-700 mb-1 font-[Halogen]">Target Hours</label>
                <input
                  type="number"
                  value={targetHours}
                  onChange={e => setTargetHours(e.target.value)}
                  className={inputClassName}
                  placeholder="Enter target hours"
                  min="1"
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label className="block text-pink-700 mb-1 font-[Halogen]">Deadline</label>
                <input
                  type="date"
                  value={deadline}
                  onChange={e => setDeadline(e.target.value)}
                  className={inputClassName}
                  min={today}
                  disabled={isSubmitting}
                />
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <DDLCButton label="Cancel" onClick={onClose} disabled={isSubmitting} />
                <DDLCButton 
                  label={isSubmitting ? "Adding..." : "Add Goal"} 
                  onClick={handleSubmit} 
                  disabled={isSubmitting}
                />
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 