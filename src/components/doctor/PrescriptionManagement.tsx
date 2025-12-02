import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { ResponsiveLayout } from '../ResponsiveLayout';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import {
  ArrowLeft,
  Pill,
  Plus,
  X,
  User,
  Calendar,
  FileText,
  Send,
  Clock,
  CheckCircle,
  AlertCircle,
  Search,
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { toast } from 'sonner';

interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
}

interface Prescription {
  id: string;
  patientName: string;
  patientId: string;
  date: string;
  medications: Medication[];
  diagnosis: string;
  notes?: string;
  status: 'active' | 'completed' | 'cancelled';
}

const mockPrescriptions: Prescription[] = [
  {
    id: '1',
    patientName: 'John Smith',
    patientId: 'P001',
    date: '2025-11-25',
    diagnosis: 'Upper Respiratory Tract Infection',
    medications: [
      {
        id: 'm1',
        name: 'Amoxicillin',
        dosage: '500mg',
        frequency: '3 times daily',
        duration: '7 days',
        instructions: 'Take after meals',
      },
      {
        id: 'm2',
        name: 'Paracetamol',
        dosage: '500mg',
        frequency: 'Every 6 hours',
        duration: '5 days',
        instructions: 'As needed for fever',
      },
    ],
    notes: 'Patient should rest and drink plenty of fluids',
    status: 'active',
  },
  {
    id: '2',
    patientName: 'Sarah Johnson',
    patientId: 'P002',
    date: '2025-11-24',
    diagnosis: 'Hypertension',
    medications: [
      {
        id: 'm3',
        name: 'Amlodipine',
        dosage: '5mg',
        frequency: 'Once daily',
        duration: '30 days',
        instructions: 'Take in the morning',
      },
    ],
    notes: 'Follow up in 2 weeks for blood pressure monitoring',
    status: 'active',
  },
  {
    id: '3',
    patientName: 'Michael Chen',
    patientId: 'P003',
    date: '2025-11-20',
    diagnosis: 'Allergic Rhinitis',
    medications: [
      {
        id: 'm4',
        name: 'Cetirizine',
        dosage: '10mg',
        frequency: 'Once daily',
        duration: '14 days',
        instructions: 'Take before bedtime',
      },
    ],
    status: 'completed',
  },
];

const commonMedications = [
  { name: 'Amoxicillin', defaultDosage: '500mg' },
  { name: 'Paracetamol', defaultDosage: '500mg' },
  { name: 'Ibuprofen', defaultDosage: '400mg' },
  { name: 'Cetirizine', defaultDosage: '10mg' },
  { name: 'Omeprazole', defaultDosage: '20mg' },
  { name: 'Metformin', defaultDosage: '500mg' },
  { name: 'Amlodipine', defaultDosage: '5mg' },
  { name: 'Losartan', defaultDosage: '50mg' },
];

export const PrescriptionManagement: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('all');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [newPrescription, setNewPrescription] = useState({
    patientName: '',
    diagnosis: '',
    notes: '',
  });

  const [medications, setMedications] = useState<Medication[]>([
    {
      id: '1',
      name: '',
      dosage: '',
      frequency: '',
      duration: '',
      instructions: '',
    },
  ]);

  const addMedication = () => {
    setMedications([
      ...medications,
      {
        id: Date.now().toString(),
        name: '',
        dosage: '',
        frequency: '',
        duration: '',
        instructions: '',
      },
    ]);
  };

  const removeMedication = (id: string) => {
    setMedications(medications.filter(m => m.id !== id));
  };

  const updateMedication = (id: string, field: keyof Medication, value: string) => {
    setMedications(
      medications.map(m => (m.id === id ? { ...m, [field]: value } : m))
    );
  };

  const handleCreatePrescription = () => {
    if (!newPrescription.patientName || !newPrescription.diagnosis) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (medications.some(m => !m.name || !m.dosage || !m.frequency || !m.duration)) {
      toast.error('Please complete all medication details');
      return;
    }

    toast.success('Prescription created successfully!', {
      description: 'The prescription has been sent to the patient.',
    });

    setIsCreateOpen(false);
    setNewPrescription({ patientName: '', diagnosis: '', notes: '' });
    setMedications([
      {
        id: '1',
        name: '',
        dosage: '',
        frequency: '',
        duration: '',
        instructions: '',
      },
    ]);
  };

  const filterPrescriptions = () => {
    let filtered = mockPrescriptions;

    if (activeTab !== 'all') {
      filtered = filtered.filter(p => p.status === activeTab);
    }

    if (searchTerm) {
      filtered = filtered.filter(
        p =>
          p.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.diagnosis.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  };

  const filteredPrescriptions = filterPrescriptions();

  return (
    <ResponsiveLayout>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Header */}
        <div className="bg-gradient-to-br from-pink-500 to-pink-600 px-4 py-6 text-white">
          <button
            onClick={() => navigate(-1)}
            className="mb-4 p-2 hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
                <Pill className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-white mb-1">Prescriptions</h1>
                <p className="text-pink-100">Manage patient prescriptions</p>
              </div>
            </div>
            <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
              <DialogTrigger asChild>
                <Button
                  size="sm"
                  className="bg-white text-pink-500 hover:bg-pink-50"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  New
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Create New Prescription</DialogTitle>
                </DialogHeader>
                <div className="space-y-6 py-4">
                  {/* Patient Information */}
                  <div className="space-y-4">
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      Patient Information
                    </h3>
                    <div className="space-y-2">
                      <Label htmlFor="patient-name">Patient Name *</Label>
                      <Input
                        id="patient-name"
                        value={newPrescription.patientName}
                        onChange={e =>
                          setNewPrescription({ ...newPrescription, patientName: e.target.value })
                        }
                        placeholder="Enter patient name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="diagnosis">Diagnosis *</Label>
                      <Input
                        id="diagnosis"
                        value={newPrescription.diagnosis}
                        onChange={e =>
                          setNewPrescription({ ...newPrescription, diagnosis: e.target.value })
                        }
                        placeholder="e.g., Upper Respiratory Tract Infection"
                      />
                    </div>
                  </div>

                  {/* Medications */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-900 dark:text-white">Medications</h3>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={addMedication}
                      >
                        <Plus className="w-4 h-4 mr-1" />
                        Add Medicine
                      </Button>
                    </div>

                    {medications.map((med, index) => (
                      <Card key={med.id} className="p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-gray-900 dark:text-white">
                            Medicine {index + 1}
                          </h4>
                          {medications.length > 1 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeMedication(med.id)}
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          )}
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-2">
                            <Label>Medicine Name *</Label>
                            <Input
                              value={med.name}
                              onChange={e => updateMedication(med.id, 'name', e.target.value)}
                              placeholder="e.g., Amoxicillin"
                              list={`medications-${med.id}`}
                            />
                            <datalist id={`medications-${med.id}`}>
                              {commonMedications.map(m => (
                                <option key={m.name} value={m.name} />
                              ))}
                            </datalist>
                          </div>
                          <div className="space-y-2">
                            <Label>Dosage *</Label>
                            <Input
                              value={med.dosage}
                              onChange={e => updateMedication(med.id, 'dosage', e.target.value)}
                              placeholder="e.g., 500mg"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Frequency *</Label>
                            <Input
                              value={med.frequency}
                              onChange={e => updateMedication(med.id, 'frequency', e.target.value)}
                              placeholder="e.g., 3 times daily"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Duration *</Label>
                            <Input
                              value={med.duration}
                              onChange={e => updateMedication(med.id, 'duration', e.target.value)}
                              placeholder="e.g., 7 days"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label>Special Instructions</Label>
                          <Input
                            value={med.instructions}
                            onChange={e =>
                              updateMedication(med.id, 'instructions', e.target.value)
                            }
                            placeholder="e.g., Take after meals"
                          />
                        </div>
                      </Card>
                    ))}
                  </div>

                  {/* Additional Notes */}
                  <div className="space-y-2">
                    <Label htmlFor="notes">Additional Notes</Label>
                    <Textarea
                      id="notes"
                      value={newPrescription.notes}
                      onChange={e =>
                        setNewPrescription({ ...newPrescription, notes: e.target.value })
                      }
                      placeholder="Any additional instructions for the patient..."
                      rows={3}
                    />
                  </div>

                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => setIsCreateOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      className="flex-1 bg-pink-500 hover:bg-pink-600"
                      onClick={handleCreatePrescription}
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Create Prescription
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Search Bar */}
        <div className="px-4 py-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search by patient name or diagnosis..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full justify-start bg-transparent border-0 h-auto p-0">
              <TabsTrigger
                value="all"
                className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-pink-500 rounded-none px-6 py-4"
              >
                All
              </TabsTrigger>
              <TabsTrigger
                value="active"
                className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-pink-500 rounded-none px-6 py-4"
              >
                <Clock className="w-4 h-4 mr-2" />
                Active
              </TabsTrigger>
              <TabsTrigger
                value="completed"
                className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-pink-500 rounded-none px-6 py-4"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Completed
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Prescriptions List */}
        <div className="px-4 py-6 space-y-4">
          {filteredPrescriptions.length === 0 ? (
            <Card className="p-8 text-center">
              <Pill className="w-16 h-16 mx-auto mb-4 text-gray-300 dark:text-gray-600" />
              <h3 className="text-gray-900 dark:text-white mb-2">No prescriptions found</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                {searchTerm
                  ? 'Try adjusting your search'
                  : 'Create your first prescription to get started'}
              </p>
              {!searchTerm && (
                <Button
                  onClick={() => setIsCreateOpen(true)}
                  className="bg-pink-500 hover:bg-pink-600"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create Prescription
                </Button>
              )}
            </Card>
          ) : (
            filteredPrescriptions.map(prescription => (
              <Card key={prescription.id} className="p-4 hover:shadow-lg transition-shadow">
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-gray-900 dark:text-white">
                          {prescription.patientName}
                        </h3>
                        <Badge
                          variant="secondary"
                          className={
                            prescription.status === 'active'
                              ? 'bg-green-100 text-green-600 dark:bg-green-900/20'
                              : prescription.status === 'completed'
                              ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/20'
                              : 'bg-gray-100 text-gray-600 dark:bg-gray-800'
                          }
                        >
                          {prescription.status}
                        </Badge>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 mb-1">
                        <span className="font-medium">Diagnosis:</span> {prescription.diagnosis}
                      </p>
                      <p className="text-gray-500 dark:text-gray-400 flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(prescription.date).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </p>
                    </div>
                  </div>

                  {/* Medications */}
                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      Prescribed Medications:
                    </h4>
                    {prescription.medications.map(med => (
                      <Card key={med.id} className="p-3 bg-gray-50 dark:bg-gray-800/50">
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-blue-100 text-blue-500 dark:bg-blue-900/20 rounded-lg">
                            <Pill className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h5 className="text-gray-900 dark:text-white mb-1">
                              {med.name} - {med.dosage}
                            </h5>
                            <p className="text-gray-600 dark:text-gray-300">
                              {med.frequency} for {med.duration}
                            </p>
                            {med.instructions && (
                              <p className="text-gray-500 dark:text-gray-400 flex items-start gap-1 mt-1">
                                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                                {med.instructions}
                              </p>
                            )}
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>

                  {/* Notes */}
                  {prescription.notes && (
                    <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                      <p className="text-gray-600 dark:text-gray-300">
                        <span className="font-medium">Notes:</span> {prescription.notes}
                      </p>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <FileText className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Send className="w-4 h-4 mr-2" />
                      Resend
                    </Button>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </ResponsiveLayout>
  );
};
