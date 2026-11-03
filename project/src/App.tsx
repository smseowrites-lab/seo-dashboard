import React, { useState } from 'react';
import { 
  INITIAL_TASKS, 
  COMPETITOR_EVENTS, 
  AEO_OPPORTUNITIES, 
  GEO_OPPORTUNITIES, 
  TECHNICAL_SEO_ISSUES, 
  INITIAL_AUDIT_LOGS, 
  ABM_ACCOUNTS, 
  INITIAL_UTM_LINKS 
} from './data/mockData';
import { 
  INITIAL_MEMORY_ITEMS, 
  INITIAL_UPLOADED_FILES, 
  StoredMemoryItem, 
  UploadedFile 
} from './data/knowledgeBase';
import { 
  TaskRecommendation, 
  CompetitorEvent, 
  AeoOpportunity, 
  GeoOpportunity, 
  TechnicalSeoIssue, 
  AuditLogEntry, 
  AbmAccount, 
  UtmLinkItem 
} from './types';

import { Sidebar, ViewType } from './components/Sidebar';
import { Header } from './components/Header';
import { OverviewView } from './components/OverviewView';
import { SocialBookmarkingView } from './components/SocialBookmarkingView';
import { SeoOptimizationView } from './components/SeoOptimizationView';
import { AeoOptimizationView } from './components/AeoOptimizationView';
import { CrossIntelligenceView } from './components/CrossIntelligenceView';
import { BlogPromotionView } from './components/BlogPromotionView';
import { ContentDistributionView } from './components/ContentDistributionView';
import { CompetitorIntelligenceView } from './components/CompetitorIntelligenceView';
import { AnalyticsView } from './components/AnalyticsView';
import { AiAssistantView } from './components/AiAssistantView';
import { CreativeStudioView } from './components/CreativeStudioView';
import { MemoryCenterView } from './components/MemoryCenterView';
import { ReportsView } from './components/ReportsView';
import { ActivityLogView } from './components/ActivityLogView';
import { SettingsView } from './components/SettingsView';

import { ExecutionModal } from './components/ExecutionModal';
import { CanvaModal } from './components/CanvaModal';
import { QuoraRedditModal } from './components/QuoraRedditModal';
import { UploadFileDialog } from './components/UploadFileDialog';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewType>('overview');

  // Core Data States
  const [tasks, setTasks] = useState<TaskRecommendation[]>(INITIAL_TASKS);
  const [competitorEvents, setCompetitorEvents] = useState<CompetitorEvent[]>(COMPETITOR_EVENTS);
  const [aeoOpportunities, setAeoOpportunities] = useState<AeoOpportunity[]>(AEO_OPPORTUNITIES);
  const [geoOpportunities, setGeoOpportunities] = useState<GeoOpportunity[]>(GEO_OPPORTUNITIES);
  const [technicalIssues, setTechnicalIssues] = useState<TechnicalSeoIssue[]>(TECHNICAL_SEO_ISSUES);
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(INITIAL_AUDIT_LOGS);
  const [abmAccounts, setAbmAccounts] = useState<AbmAccount[]>(ABM_ACCOUNTS);
  const [utmLinks, setUtmLinks] = useState<UtmLinkItem[]>(INITIAL_UTM_LINKS);

  // Persistent Memory & Ingested Files States
  const [memoryItems, setMemoryItems] = useState<StoredMemoryItem[]>(INITIAL_MEMORY_ITEMS);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>(INITIAL_UPLOADED_FILES);

  // Modals States
  const [selectedTask, setSelectedTask] = useState<TaskRecommendation | null>(null);
  const [isExecutionModalOpen, setIsExecutionModalOpen] = useState(false);
  const [isCanvaModalOpen, setIsCanvaModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [quoraRedditModal, setQuoraRedditModal] = useState<{ isOpen: boolean; type: 'quora' | 'reddit' }>({
    isOpen: false,
    type: 'quora'
  });
  const [isSyncing, setIsSyncing] = useState(false);

  // Handler: Execute Task Wizard
  const handleExecuteTask = (task: TaskRecommendation) => {
    setSelectedTask(task);
    setIsExecutionModalOpen(true);
  };

  // Handler: Approve Task from Card
  const handleApproveTask = (taskId: string) => {
    setTasks(prev => prev.map(t => {
      if (t.id !== taskId) return t;
      return { ...t, status: 'approved' };
    }));

    const task = tasks.find(t => t.id === taskId);
    if (task) {
      const newLog: AuditLogEntry = {
        id: `log-${Date.now()}`,
        timestamp: 'Just now',
        taskName: task.taskName,
        category: task.category,
        dataUsed: ['Search Console Impression Signals', 'Human Approval Check'],
        recommendation: task.recommendedAction,
        reason: task.reason,
        aiOutputSnippet: `Approved by Minakshi Kushwaha: ${task.expectedOutcome}`,
        userApproval: 'Approved by Minakshi',
        status: 'approved',
        timeSavedMinutes: task.timeSavedMinutes
      };
      setAuditLogs(prev => [newLog, ...prev]);
    }
  };

  // Handler: Skip Task
  const handleSkipTask = (taskId: string) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: 'skipped' } : t));
  };

  // Handler: Complete Task from Wizard
  const handleCompleteTask = (taskId: string, outputSummary: string) => {
    setTasks(prev => prev.map(t => {
      if (t.id !== taskId) return t;
      return { ...t, status: 'completed', outputSummary };
    }));

    const task = tasks.find(t => t.id === taskId);
    if (task) {
      const newLog: AuditLogEntry = {
        id: `log-${Date.now()}`,
        timestamp: 'Just now',
        taskName: task.taskName,
        category: task.category,
        dataUsed: ['GSC Metrics', 'Competitor Gap', 'Content Audit'],
        recommendation: task.recommendedAction,
        reason: task.reason,
        aiOutputSnippet: outputSummary,
        userApproval: 'Approved by Minakshi',
        status: 'completed',
        timeSavedMinutes: task.timeSavedMinutes
      };
      setAuditLogs(prev => [newLog, ...prev]);

      // Record completion into persistent working memory
      const memoryEntry: StoredMemoryItem = {
        id: `mem-${Date.now()}`,
        category: 'working_memory',
        title: `Task Completed: ${task.taskName}`,
        content: `Executed and verified on ${new Date().toLocaleDateString()}. Output Summary: ${outputSummary}`,
        tags: [task.category, 'Completed Task'],
        lastUpdated: 'Just now',
        source: 'AI Execution Wizard'
      };
      setMemoryItems(prev => [memoryEntry, ...prev]);
    }
  };

  // Handler: Open Canva Carousel
  const handleCreateCarousel = (task: TaskRecommendation) => {
    setSelectedTask(task);
    setIsCanvaModalOpen(true);
  };

  // Handler: Open Quora Modal
  const handleOpenQuora = () => {
    setQuoraRedditModal({ isOpen: true, type: 'quora' });
  };

  // Handler: Open Reddit Modal
  const handleOpenReddit = () => {
    setQuoraRedditModal({ isOpen: true, type: 'reddit' });
  };

  // Handler: Apply Technical Fix
  const handleApplyTechnicalFix = (issueId: string) => {
    setTechnicalIssues(prev => prev.map(i => i.id === issueId ? { ...i, status: 'resolved' } : i));
  };

  // Handler: Optimize AEO Question
  const handleOptimizeAeo = (opp: AeoOpportunity) => {
    setAeoOpportunities(prev => prev.map(o => o.id === opp.id ? { ...o, status: 'optimized' } : o));
    const matchingTask = tasks.find(t => t.category === 'AEO') || tasks[1];
    handleExecuteTask(matchingTask);
  };

  // Handler: Sync all data sources
  const handleSyncAll = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
    }, 1500);
  };

  // Handler: Ingest Uploaded File
  const handleFileUpload = (file: UploadedFile) => {
    setUploadedFiles(prev => [file, ...prev]);

    if (file.usageScope === 'Save to mFilterIt Knowledge' || file.usageScope === 'Save as Permanent Brand Resource') {
      const memoryEntry: StoredMemoryItem = {
        id: `mem-${Date.now()}`,
        category: file.usageScope === 'Save as Permanent Brand Resource' ? 'permanent_brand' : 'uploaded_resource',
        title: `Document Knowledge: ${file.name}`,
        content: file.summary,
        tags: ['Uploaded File', file.type, file.usageScope],
        lastUpdated: 'Just now',
        source: file.name
      };
      setMemoryItems(prev => [memoryEntry, ...prev]);
    }

    const log: AuditLogEntry = {
      id: `log-${Date.now()}`,
      timestamp: 'Just now',
      taskName: `Uploaded Document: ${file.name}`,
      category: 'Knowledge Ingestion',
      dataUsed: [file.name, file.type, `${file.recordCount || 0} rows`],
      recommendation: `Ingest into marketing brain with scope: [${file.usageScope}]`,
      reason: 'User uploaded research file for automated cross-referencing.',
      aiOutputSnippet: file.summary,
      userApproval: 'Approved by Minakshi',
      status: 'completed',
      timeSavedMinutes: 45
    };
    setAuditLogs(prev => [log, ...prev]);
  };

  // Handler: Delete Uploaded File
  const handleDeleteFile = (fileId: string) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== fileId));
  };

  // Handler: Update File Category
  const handleUpdateFileCategory = (fileId: string, category: UploadedFile['category']) => {
    setUploadedFiles(prev => prev.map(f => f.id === fileId ? { ...f, category } : f));
  };

  // Handler: Save custom snippet to memory
  const handleSaveToMemory = (item: StoredMemoryItem) => {
    setMemoryItems(prev => [item, ...prev]);
  };

  // Handler: Delete custom memory
  const handleDeleteMemoryItem = (id: string) => {
    setMemoryItems(prev => prev.filter(m => m.id !== id));
  };

  // Handler: Global Search
  const handleGlobalSearch = (term: string) => {
    setCurrentView('ai_assistant');
  };

  const pendingCount = tasks.filter(t => t.status === 'awaiting_approval' || t.status === 'ai_recommended').length;

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#F5F0FA] text-[#17131C]">
      {/* Sidebar Navigation */}
      <Sidebar
        currentView={currentView}
        onSelectView={setCurrentView}
        pendingCount={pendingCount}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Sticky Header */}
        <Header
          onOpenAssistant={() => setCurrentView('ai_assistant')}
          onSyncAll={handleSyncAll}
          isSyncing={isSyncing}
          onSearchGlobal={handleGlobalSearch}
        />

        {/* Scrollable View Container */}
        <main className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-purple-200">
          <div className="max-w-7xl mx-auto pb-12">
            {currentView === 'overview' && (
              <OverviewView
                tasks={tasks}
                competitorEvents={competitorEvents}
                auditLogs={auditLogs}
                onExecuteTask={handleExecuteTask}
                onApproveTask={handleApproveTask}
                onSkipTask={handleSkipTask}
                onCreateCarousel={handleCreateCarousel}
                onNavigateToView={setCurrentView}
              />
            )}

            {currentView === 'today_actions' && (
              <SocialBookmarkingView onFileUpload={handleFileUpload} />
            )}

            {currentView === 'seo' && (
              <SeoOptimizationView
                tasks={tasks}
                onExecuteTask={handleExecuteTask}
                onApproveTask={handleApproveTask}
                onSkipTask={handleSkipTask}
                onCreateCarousel={handleCreateCarousel}
                onFileUpload={handleFileUpload}
                onNavigateToView={setCurrentView}
              />
            )}

            {currentView === 'aeo' && (
              <AeoOptimizationView
                opportunities={aeoOpportunities}
                tasks={tasks}
                onExecuteTask={handleExecuteTask}
                onOptimizeAeo={handleOptimizeAeo}
              />
            )}

            {currentView === 'cross_intelligence' && (
              <BlogPromotionView onFileUpload={handleFileUpload} />
            )}

            {currentView === 'content_distribution' && (
              <ContentDistributionView
                tasks={tasks}
                utmLinks={utmLinks}
                onCreateCarousel={handleCreateCarousel}
                onOpenQuoraModal={handleOpenQuora}
                onOpenRedditModal={handleOpenReddit}
              />
            )}

            {currentView === 'competitor_intelligence' && (
              <CompetitorIntelligenceView
                events={competitorEvents}
                tasks={tasks}
                onExecuteAction={handleExecuteTask}
              />
            )}

            {currentView === 'canva_studio' && (
              <CreativeStudioView
                tasks={tasks}
                onCreateCarousel={handleCreateCarousel}
              />
            )}

            {currentView === 'analytics' && (
              <AnalyticsView />
            )}

            {currentView === 'ai_assistant' && (
              <AiAssistantView
                tasks={tasks}
                competitorEvents={competitorEvents}
                memoryItems={memoryItems}
                uploadedFiles={uploadedFiles}
                onExecuteTask={handleExecuteTask}
                onCreateCarousel={handleCreateCarousel}
                onOpenUploadModal={() => setIsUploadModalOpen(true)}
                onSaveToMemory={handleSaveToMemory}
              />
            )}

            {currentView === 'memory_center' && (
              <MemoryCenterView
                memoryItems={memoryItems}
                uploadedFiles={uploadedFiles}
                onOpenUpload={() => setIsUploadModalOpen(true)}
                onAddMemoryItem={handleSaveToMemory}
                onDeleteMemoryItem={handleDeleteMemoryItem}
                onUpdateFileCategory={handleUpdateFileCategory}
                onDeleteFile={handleDeleteFile}
              />
            )}

            {currentView === 'reports' && (
              <ReportsView />
            )}

            {currentView === 'activity_log' && (
              <ActivityLogView
                logs={auditLogs}
              />
            )}

            {currentView === 'settings' && (
              <SettingsView />
            )}
          </div>
        </main>
      </div>

      {/* Global Interactive Modals */}
      <ExecutionModal
        task={selectedTask}
        isOpen={isExecutionModalOpen}
        onClose={() => setIsExecutionModalOpen(false)}
        onComplete={handleCompleteTask}
      />

      <CanvaModal
        task={selectedTask}
        isOpen={isCanvaModalOpen}
        onClose={() => setIsCanvaModalOpen(false)}
      />

      <QuoraRedditModal
        isOpen={quoraRedditModal.isOpen}
        type={quoraRedditModal.type}
        onClose={() => setQuoraRedditModal({ ...quoraRedditModal, isOpen: false })}
      />

      <UploadFileDialog
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onFileUpload={handleFileUpload}
      />
    </div>
  );
}
