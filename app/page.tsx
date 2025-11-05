'use client';

import { useState } from 'react';

type Contact = {
  id: number;
  name: string;
  email: string;
  company: string;
  status: 'lead' | 'customer' | 'inactive';
};

type Deal = {
  id: number;
  title: string;
  value: number;
  contactId: number;
  stage: 'prospecting' | 'negotiation' | 'closed-won' | 'closed-lost';
};

const initialContacts: Contact[] = [
  { id: 1, name: 'John Smith', email: 'john@example.com', company: 'Acme Corp', status: 'lead' },
  { id: 2, name: 'Sarah Johnson', email: 'sarah@techco.com', company: 'TechCo', status: 'customer' },
  { id: 3, name: 'Mike Wilson', email: 'mike@startup.io', company: 'Startup Inc', status: 'lead' },
];

const initialDeals: Deal[] = [
  { id: 1, title: 'Q1 Enterprise Deal', value: 50000, contactId: 1, stage: 'negotiation' },
  { id: 2, title: 'Annual Subscription', value: 12000, contactId: 2, stage: 'closed-won' },
  { id: 3, title: 'Pilot Project', value: 8000, contactId: 3, stage: 'prospecting' },
];

export default function Dashboard() {
  const [contacts, setContacts] = useState<Contact[]>(initialContacts);
  const [deals, setDeals] = useState<Deal[]>(initialDeals);
  const [activeTab, setActiveTab] = useState<'contacts' | 'deals' | 'stats'>('contacts');

  const stats = {
    totalContacts: contacts.length,
    activeLeads: contacts.filter(c => c.status === 'lead').length,
    customers: contacts.filter(c => c.status === 'customer').length,
    totalDeals: deals.length,
    totalValue: deals.reduce((sum, d) => sum + d.value, 0),
    wonDeals: deals.filter(d => d.stage === 'closed-won').length,
  };

  const getContactName = (contactId: number) => {
    return contacts.find(c => c.id === contactId)?.name || 'Unknown';
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      lead: 'bg-blue-100 text-blue-800',
      customer: 'bg-green-100 text-green-800',
      inactive: 'bg-gray-100 text-gray-800',
      prospecting: 'bg-yellow-100 text-yellow-800',
      negotiation: 'bg-orange-100 text-orange-800',
      'closed-won': 'bg-green-100 text-green-800',
      'closed-lost': 'bg-red-100 text-red-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <h1 className="text-2xl font-bold text-gray-900">CRM Dashboard</h1>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('stats')}
                className={`${
                  activeTab === 'stats'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('contacts')}
                className={`${
                  activeTab === 'contacts'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Contacts
              </button>
              <button
                onClick={() => setActiveTab('deals')}
                className={`${
                  activeTab === 'deals'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Deals
              </button>
            </nav>
          </div>
        </div>

        {activeTab === 'stats' && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-1">
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Contacts</dt>
                    <dd className="mt-1 text-3xl font-semibold text-gray-900">{stats.totalContacts}</dd>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-1">
                    <dt className="text-sm font-medium text-gray-500 truncate">Active Leads</dt>
                    <dd className="mt-1 text-3xl font-semibold text-gray-900">{stats.activeLeads}</dd>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-1">
                    <dt className="text-sm font-medium text-gray-500 truncate">Customers</dt>
                    <dd className="mt-1 text-3xl font-semibold text-gray-900">{stats.customers}</dd>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-1">
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Deals</dt>
                    <dd className="mt-1 text-3xl font-semibold text-gray-900">{stats.totalDeals}</dd>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-1">
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Pipeline Value</dt>
                    <dd className="mt-1 text-3xl font-semibold text-gray-900">
                      ${stats.totalValue.toLocaleString()}
                    </dd>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-1">
                    <dt className="text-sm font-medium text-gray-500 truncate">Won Deals</dt>
                    <dd className="mt-1 text-3xl font-semibold text-gray-900">{stats.wonDeals}</dd>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'contacts' && (
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Contacts</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Company
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {contacts.map((contact) => (
                      <tr key={contact.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {contact.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {contact.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {contact.company}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                              contact.status
                            )}`}
                          >
                            {contact.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'deals' && (
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Deals</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Title
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Contact
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Value
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Stage
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {deals.map((deal) => (
                      <tr key={deal.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {deal.title}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {getContactName(deal.contactId)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          ${deal.value.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                              deal.stage
                            )}`}
                          >
                            {deal.stage}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
