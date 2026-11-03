import React from 'react';
import { TodayActionsView } from './TodayActionsView';
import { TaskRecommendation, CompetitorEvent, AuditLogEntry } from '../types';

interface OverviewViewProps {
  tasks: TaskRecommendation[];
  competitorEvents: CompetitorEvent[];
  auditLogs: AuditLogEntry[];
  onExecuteTask: (task: TaskRecommendation) => void;
  onApproveTask: (taskId: string) => void;
  onSkipTask: (taskId: string) => void;
  onCreateCarousel: (task: TaskRecommendation) => void;
  onNavigateToView: (view: any) => void;
}

export const OverviewView: React.FC<OverviewViewProps> = ({
  tasks,
  onExecuteTask,
  onApproveTask,
  onSkipTask,
  onCreateCarousel
}) => {
  return (
    <TodayActionsView
      tasks={tasks}
      onExecuteTask={onExecuteTask}
      onApproveTask={onApproveTask}
      onSkipTask={onSkipTask}
      onCreateCarousel={onCreateCarousel}
    />
  );
};
