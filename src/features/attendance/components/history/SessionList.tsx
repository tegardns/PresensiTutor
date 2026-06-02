import type { Session } from "../../types";
import EmptySessionState from "./EmptySessionState";
import SessionCard from "./SessionCard";

interface SessionListProps {
  sessions: Session[];
  onViewDetail: (session: Session) => void;
}

export default function SessionList({
  sessions,
  onViewDetail,
}: SessionListProps) {
  return (
    <div className="px-5 py-4">
      {sessions.length === 0 ? (
        <EmptySessionState />
      ) : (
        <div className="space-y-3">
          {sessions.map((session) => (
            <SessionCard
              key={session.id}
              session={session}
              onViewDetail={onViewDetail}
            />
          ))}
        </div>
      )}
    </div>
  );
}