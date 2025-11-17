import type { ReactNode } from 'react';

interface ApplicationShellProps {
  sidebar: ReactNode;
  content: ReactNode;
}

const ApplicationShell = ({ sidebar, content }: ApplicationShellProps) => {
  return (
    <div className="app-shell">
      <aside className="sidebar" aria-label="navigation sidebar">
        {sidebar}
      </aside>
      <main className="content" aria-live="polite">
        {content}
      </main>
    </div>
  );
};

export default ApplicationShell;
