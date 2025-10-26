'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { EntityDetail } from '@/components/entities/entity-detail';

function EntityPageContent() {
  const [selectedEntityId, setSelectedEntityId] = useState<string>('');
  const [entities, setEntities] = useState<Array<{ id: string; name: string; entityId: string }>>([]);
  const searchParams = useSearchParams();

  useEffect(() => {
    fetchEntities();
    
    // Get entity ID from URL parameter
    const entityId = searchParams.get('id');
    if (entityId) {
      setSelectedEntityId(entityId);
    }
  }, [searchParams]);

  const fetchEntities = async () => {
    try {
      const response = await fetch('/api/entities');
      const data = await response.json();
      setEntities(data);
    } catch (error) {
      console.error('Error fetching entities:', error);
    }
  };

  if (selectedEntityId) {
    return <EntityDetail entityId={selectedEntityId} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold">Select Entity</h1>
          <p className="text-muted-foreground">Choose an entity to view detailed information</p>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="space-y-2">
            {entities.map((entity) => (
              <button
                key={entity.id}
                onClick={() => setSelectedEntityId(entity.id)}
                className="block w-full text-left p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="font-semibold">{entity.name}</div>
                <div className="text-sm text-muted-foreground">{entity.entityId}</div>
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default function EntityPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    }>
      <EntityPageContent />
    </Suspense>
  );
}