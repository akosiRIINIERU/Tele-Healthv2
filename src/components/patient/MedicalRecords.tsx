import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ResponsiveLayout } from '../ResponsiveLayout';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import {
  ArrowLeft,
  FileText,
  Activity,
  Pill,
  ClipboardList,
  Download,
  Eye,
  Upload,
  Calendar,
  User,
  Heart,
  Droplet,
  Weight,
  Ruler,
  Thermometer,
  Stethoscope,
  Plus,
  AlertCircle,
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { toast } from 'sonner';

interface MedicalRecord {
  id: string;
  type: 'appointment' | 'prescription' | 'lab' | 'vital';
  title: string;
  date: string;
  doctor?: string;
  notes?: string;
  attachments?: string[];
  status?: string;
}

interface VitalSign {
  type: string;
  value: string;
  unit: string;
  date: string;
  icon: React.ElementType;
  color: string;
}

const mockRecords: MedicalRecord[] = [
  {
    id: '1',
    type: 'appointment',
    title: 'General Checkup',
    date: '2025-11-20',
    doctor: 'Dr. Sarah Johnson',
    notes: 'Patient presenting with mild cold symptoms. Prescribed medication and advised rest.',
    status: 'Completed',
  },
  {
    id: '2',
    type: 'prescription',
    title: 'Amoxicillin 500mg',
    date: '2025-11-20',
    doctor: 'Dr. Sarah Johnson',
    notes: 'Take 1 capsule 3 times daily for 7 days',
    attachments: ['prescription-001.pdf'],
  },
  {
    id: '3',
    type: 'lab',
    title: 'Complete Blood Count (CBC)',
    date: '2025-11-15',
    doctor: 'Dr. Michael Chen',
    notes: 'All values within normal range',
    attachments: ['lab-report-cbc.pdf'],
    status: 'Normal',
  },
  {
    id: '4',
    type: 'appointment',
    title: 'Dermatology Consultation',
    date: '2025-11-10',
    doctor: 'Dr. Emily Davis',
    notes: 'Skin allergy. Prescribed antihistamines and topical cream.',
    status: 'Completed',
  },
  {
    id: '5',
    type: 'lab',
    title: 'Blood Sugar Test',
    date: '2025-11-05',
    doctor: 'Dr. Michael Chen',
    notes: 'Fasting glucose: 95 mg/dL (Normal)',
    attachments: ['lab-report-glucose.pdf'],
    status: 'Normal',
  },
];

const vitalSigns: VitalSign[] = [
  {
    type: 'Blood Pressure',
    value: '120/80',
    unit: 'mmHg',
    date: '2025-11-20',
    icon: Heart,
    color: 'text-red-500',
  },
  {
    type: 'Heart Rate',
    value: '72',
    unit: 'bpm',
    date: '2025-11-20',
    icon: Activity,
    color: 'text-pink-500',
  },
  {
    type: 'Temperature',
    value: '36.8',
    unit: '°C',
    date: '2025-11-20',
    icon: Thermometer,
    color: 'text-orange-500',
  },
  {
    type: 'Weight',
    value: '68',
    unit: 'kg',
    date: '2025-11-20',
    icon: Weight,
    color: 'text-blue-500',
  },
  {
    type: 'Height',
    value: '170',
    unit: 'cm',
    date: '2025-11-20',
    icon: Ruler,
    color: 'text-green-500',
  },
  {
    type: 'Blood Type',
    value: 'O+',
    unit: '',
    date: '2025-01-10',
    icon: Droplet,
    color: 'text-red-600',
  },
];

const allergies = [
  { name: 'Penicillin', severity: 'High', reaction: 'Skin rash' },
  { name: 'Peanuts', severity: 'Medium', reaction: 'Breathing difficulty' },
];

const medications = [
  { name: 'Vitamin D3', dosage: '1000 IU', frequency: 'Daily', startDate: '2025-10-01' },
  { name: 'Omega-3', dosage: '1000mg', frequency: 'Daily', startDate: '2025-10-01' },
];

const getRecordIcon = (type: string) => {
  switch (type) {
    case 'appointment':
      return Calendar;
    case 'prescription':
      return Pill;
    case 'lab':
      return ClipboardList;
    case 'vital':
      return Activity;
    default:
      return FileText;
  }
};

const getRecordColor = (type: string) => {
  switch (type) {
    case 'appointment':
      return 'bg-pink-100 text-pink-500 dark:bg-pink-900/20 dark:text-pink-400';
    case 'prescription':
      return 'bg-blue-100 text-blue-500 dark:bg-blue-900/20 dark:text-blue-400';
    case 'lab':
      return 'bg-purple-100 text-purple-500 dark:bg-purple-900/20 dark:text-purple-400';
    case 'vital':
      return 'bg-green-100 text-green-500 dark:bg-green-900/20 dark:text-green-400';
    default:
      return 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400';
  }
};

export const MedicalRecords: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('records');
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [uploadType, setUploadType] = useState('lab');

  const handleUpload = () => {
    toast.success('Record uploaded successfully!');
    setIsUploadOpen(false);
  };

  const filterRecords = (type?: string) => {
    if (!type) return mockRecords;
    return mockRecords.filter(r => r.type === type);
  };

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
                <FileText className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-white mb-1">Medical Records</h1>
                <p className="text-pink-100">Your complete health history</p>
              </div>
            </div>
            <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
              <DialogTrigger asChild>
                <Button
                  size="sm"
                  className="bg-white text-pink-500 hover:bg-pink-50"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Upload Medical Record</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="record-type">Record Type</Label>
                    <select
                      id="record-type"
                      value={uploadType}
                      onChange={(e) => setUploadType(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    >
                      <option value="lab">Lab Report</option>
                      <option value="prescription">Prescription</option>
                      <option value="xray">X-Ray</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="record-title">Title</Label>
                    <Input id="record-title" placeholder="e.g., Blood Test Results" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="record-date">Date</Label>
                    <Input id="record-date" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="record-notes">Notes (Optional)</Label>
                    <Textarea
                      id="record-notes"
                      placeholder="Add any additional notes..."
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="record-file">Upload File</Label>
                    <Input id="record-file" type="file" accept=".pdf,.jpg,.jpeg,.png" />
                  </div>
                  <Button onClick={handleUpload} className="w-full bg-pink-500 hover:bg-pink-600">
                    Upload Record
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full justify-start overflow-x-auto bg-transparent border-0 h-auto p-0">
              <TabsTrigger
                value="records"
                className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-pink-500 rounded-none px-4 py-3"
              >
                <FileText className="w-4 h-4 mr-2" />
                All Records
              </TabsTrigger>
              <TabsTrigger
                value="vitals"
                className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-pink-500 rounded-none px-4 py-3"
              >
                <Activity className="w-4 h-4 mr-2" />
                Vital Signs
              </TabsTrigger>
              <TabsTrigger
                value="medications"
                className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-pink-500 rounded-none px-4 py-3"
              >
                <Pill className="w-4 h-4 mr-2" />
                Medications
              </TabsTrigger>
              <TabsTrigger
                value="allergies"
                className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-pink-500 rounded-none px-4 py-3"
              >
                <AlertCircle className="w-4 h-4 mr-2" />
                Allergies
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Content */}
        <div className="px-4 py-6 space-y-4">
          {activeTab === 'records' && (
            <>
              {/* Filter Buttons */}
              <div className="flex gap-2 overflow-x-auto pb-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="shrink-0"
                  onClick={() => setActiveTab('records')}
                >
                  All
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="shrink-0"
                >
                  Appointments
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="shrink-0"
                >
                  Lab Reports
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="shrink-0"
                >
                  Prescriptions
                </Button>
              </div>

              {mockRecords.map(record => {
                const Icon = getRecordIcon(record.type);
                return (
                  <Card key={record.id} className="p-4 hover:shadow-lg transition-shadow">
                    <div className="flex gap-4">
                      <div className={`p-3 rounded-xl ${getRecordColor(record.type)} shrink-0`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div className="flex-1">
                            <h3 className="text-gray-900 dark:text-white mb-1">
                              {record.title}
                            </h3>
                            {record.doctor && (
                              <p className="text-gray-500 dark:text-gray-400 flex items-center gap-1">
                                <User className="w-3 h-3" />
                                {record.doctor}
                              </p>
                            )}
                          </div>
                          {record.status && (
                            <Badge
                              variant="secondary"
                              className={
                                record.status === 'Normal'
                                  ? 'bg-green-100 text-green-600 dark:bg-green-900/20'
                                  : 'bg-blue-100 text-blue-600 dark:bg-blue-900/20'
                              }
                            >
                              {record.status}
                            </Badge>
                          )}
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 mb-3">
                          {record.notes}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400 dark:text-gray-500 flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(record.date).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })}
                          </span>
                          <div className="flex gap-2">
                            {record.attachments && record.attachments.length > 0 && (
                              <Button variant="ghost" size="sm">
                                <Download className="w-4 h-4 mr-1" />
                                Download
                              </Button>
                            )}
                            <Button variant="ghost" size="sm">
                              <Eye className="w-4 h-4 mr-1" />
                              View
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </>
          )}

          {activeTab === 'vitals' && (
            <>
              <div className="grid grid-cols-2 gap-3">
                {vitalSigns.map((vital, index) => {
                  const Icon = vital.icon;
                  return (
                    <Card key={index} className="p-4">
                      <div className={`mb-3 ${vital.color}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <p className="text-gray-500 dark:text-gray-400 mb-1">
                        {vital.type}
                      </p>
                      <div className="flex items-baseline gap-1 mb-2">
                        <span className="text-gray-900 dark:text-white">
                          {vital.value}
                        </span>
                        {vital.unit && (
                          <span className="text-gray-500 dark:text-gray-400">
                            {vital.unit}
                          </span>
                        )}
                      </div>
                      <p className="text-gray-400 dark:text-gray-500 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(vital.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                        })}
                      </p>
                    </Card>
                  );
                })}
              </div>

              <Card className="p-6 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                <div className="flex items-start gap-3">
                  <Stethoscope className="w-5 h-5 text-blue-500 shrink-0 mt-1" />
                  <div>
                    <h3 className="text-gray-900 dark:text-white mb-2">Track Your Health</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-3">
                      Regular monitoring of vital signs helps detect health changes early.
                    </p>
                    <Button size="sm" className="bg-blue-500 hover:bg-blue-600">
                      <Plus className="w-4 h-4 mr-1" />
                      Log New Vitals
                    </Button>
                  </div>
                </div>
              </Card>
            </>
          )}

          {activeTab === 'medications' && (
            <>
              {medications.map((med, index) => (
                <Card key={index} className="p-4">
                  <div className="flex gap-4">
                    <div className="p-3 bg-blue-100 text-blue-500 dark:bg-blue-900/20 dark:text-blue-400 rounded-xl shrink-0">
                      <Pill className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-gray-900 dark:text-white mb-1">{med.name}</h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-2">
                        {med.dosage} • {med.frequency}
                      </p>
                      <p className="text-gray-400 dark:text-gray-500 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        Started {new Date(med.startDate).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge variant="secondary" className="bg-green-100 text-green-600 dark:bg-green-900/20 h-fit">
                      Active
                    </Badge>
                  </div>
                </Card>
              ))}

              <Button variant="outline" className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Add Medication
              </Button>
            </>
          )}

          {activeTab === 'allergies' && (
            <>
              <Card className="p-4 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
                <div className="flex items-start gap-3 mb-3">
                  <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-1" />
                  <div>
                    <h3 className="text-gray-900 dark:text-white mb-1">Important</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Always inform your doctor about your allergies before treatment.
                    </p>
                  </div>
                </div>
              </Card>

              {allergies.map((allergy, index) => (
                <Card key={index} className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-gray-900 dark:text-white">{allergy.name}</h3>
                        <Badge
                          variant="secondary"
                          className={
                            allergy.severity === 'High'
                              ? 'bg-red-100 text-red-600 dark:bg-red-900/20'
                              : 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/20'
                          }
                        >
                          {allergy.severity} Risk
                        </Badge>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300">
                        Reaction: {allergy.reaction}
                      </p>
                    </div>
                    <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
                  </div>
                </Card>
              ))}

              <Button variant="outline" className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Add Allergy
              </Button>
            </>
          )}
        </div>
      </div>
    </ResponsiveLayout>
  );
};
