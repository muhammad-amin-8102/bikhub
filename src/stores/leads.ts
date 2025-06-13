import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface Lead {
  id: string
  name: string
  email: string
  phone: string
  interestedBike?: string
  source: 'Website' | 'Phone' | 'Walk-in' | 'Referral'
  status: 'New' | 'Contacted' | 'Qualified' | 'Converted' | 'Lost'
  priority: 'High' | 'Medium' | 'Low'
  assignedTo?: string
  notes: string
  createdAt: string
  lastContact?: string
  budget: number
  location: string
}

export const useLeadsStore = defineStore('leads', () => {
  const leads = ref<Lead[]>([
    {
      id: '1',
      name: 'Rajesh Sharma',
      email: 'rajesh@example.com',
      phone: '+91 9876543210',
      interestedBike: 'Honda CB Shine',
      source: 'Website',
      status: 'New',
      priority: 'High',
      assignedTo: 'Sales Team 1',
      notes: 'Looking for a reliable commuter bike',
      createdAt: '2024-01-15T10:30:00Z',
      budget: 70000,
      location: 'Mumbai'
    },
    {
      id: '2',
      name: 'Priya Patel',
      email: 'priya@example.com',
      phone: '+91 9876543211',
      interestedBike: 'TVS Jupiter',
      source: 'Phone',
      status: 'Contacted',
      priority: 'Medium',
      assignedTo: 'Sales Team 2',
      notes: 'Prefers scooter for daily office commute',
      createdAt: '2024-01-14T14:20:00Z',
      lastContact: '2024-01-15T09:15:00Z',
      budget: 60000,
      location: 'Pune'
    }
  ])

  const addLead = (lead: Omit<Lead, 'id' | 'createdAt'>) => {
    const newLead: Lead = {
      ...lead,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    }
    leads.value.unshift(newLead)
  }

  const updateLeadStatus = (id: string, status: Lead['status']) => {
    const lead = leads.value.find(l => l.id === id)
    if (lead) {
      lead.status = status
      lead.lastContact = new Date().toISOString()
    }
  }

  return {
    leads,
    addLead,
    updateLeadStatus
  }
})