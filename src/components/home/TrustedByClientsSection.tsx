import React from 'react';
import { getStorageUrl } from '../../services/api';
import { Client } from '../../types';

interface Props {
  clients: Client[];
}

export const TrustedByClientsSection: React.FC<Props> = ({ clients }) => {
  if (clients.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <p className="text-center text-xs font-bold uppercase tracking-wider text-slate-400 mb-8">
        Trusted by leading institutions & enterprises
      </p>
      <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
        {clients.map((client) => (
          <div
            key={client.id}
            className="flex items-center gap-2.5 grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all"
            title={client.name}
          >
            {client.logo ? (
              <img
                src={getStorageUrl(client.logo)}
                alt={client.name}
                className="h-8 w-auto object-contain"
              />
            ) : (
              <span className="text-sm font-bold text-slate-500">{client.name}</span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
