import { useState, useRef, useCallback } from 'react';
import {
  UploadCloud, CheckCircle, Sparkles, FileText, Download,
  Mail, Linkedin, MessageSquare,
  RotateCcw, Palette, Briefcase, GraduationCap, Award
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

type Step = 'upload' | 'generate' | 'preview';

const templates = [
  { id: 'modern', name: 'Modern', primary: '#2E6AD2', accent: '#7C4DFE' },
  { id: 'classic', name: 'Classic', primary: '#111827', accent: '#6B7280' },
  { id: 'creative', name: 'Creative', primary: '#EC4899', accent: '#D85CFF' },
  { id: 'minimal', name: 'Minimal', primary: '#10B981', accent: '#34D399' },
];

const colorThemes = [
  { name: 'Blue', primary: '#2E6AD2', accent: '#7C4DFE' },
  { name: 'Dark', primary: '#111827', accent: '#6B7280' },
  { name: 'Rose', primary: '#EC4899', accent: '#D85CFF' },
  { name: 'Emerald', primary: '#10B981', accent: '#34D399' },
  { name: 'Orange', primary: '#F59E0B', accent: '#FBBF24' },
];

const sampleResumeData = {
  name: 'Jane Smith',
  title: 'Senior Product Manager',
  email: 'jane.smith@email.com',
  phone: '+1 (555) 123-4567',
  linkedin: 'linkedin.com/in/janesmith',
  summary: 'Results-driven Product Manager with 8+ years of experience leading cross-functional teams to deliver innovative SaaS products. Proven track record of increasing revenue by 40% and improving user engagement by 65%.',
  experience: [
    {
      company: 'TechCorp Inc.',
      role: 'Senior Product Manager',
      period: '2021 - Present',
      bullets: [
        'Led product strategy for a $50M SaaS platform, resulting in 40% revenue growth',
        'Managed a team of 12 engineers and designers to ship 24 major features',
        'Implemented data-driven decision making, improving user retention by 65%',
      ],
    },
    {
      company: 'StartupXYZ',
      role: 'Product Manager',
      period: '2018 - 2021',
      bullets: [
        'Launched MVP from concept to market in 6 months, acquiring 10K users',
        'Conducted 200+ user interviews to inform product roadmap',
        'Increased conversion rates by 35% through A/B testing initiatives',
      ],
    },
  ],
  education: [
    { degree: 'MBA, Technology Management', school: 'Stanford University', year: '2018' },
    { degree: 'BS Computer Science', school: 'UC Berkeley', year: '2015' },
  ],
  skills: ['Product Strategy', 'Agile/Scrum', 'Data Analytics', 'User Research', 'A/B Testing', 'Stakeholder Management', 'SQL', 'Figma'],
};

export default function ResumeBuilder() {
  const [step, setStep] = useState<Step>('upload');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0]);
  const [selectedColor, setSelectedColor] = useState(colorThemes[0]);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    summary: '',
    experience: [{ company: '', role: '', period: '', description: '' }],
    education: [{ degree: '', school: '', year: '' }],
    skills: '',
  });
  const [manualMode, setManualMode] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && (file.type.includes('pdf') || file.type.includes('word') || file.type.includes('text'))) {
      setUploadedFile(file);
      toast.success(`File "${file.name}" uploaded successfully!`);
    } else {
      toast.error('Please upload a PDF, DOCX, or TXT file.');
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      toast.success(`File "${file.name}" uploaded successfully!`);
    }
  };

  const startGeneration = async () => {
    setStep('generate');
    setGenerationProgress(0);

    const steps = [
      { progress: 25, message: 'Analyzing your experience...' },
      { progress: 50, message: 'Optimizing for your industry...' },
      { progress: 75, message: 'Formatting for ATS compliance...' },
      { progress: 100, message: 'Adding professional styling...' },
    ];

    for (const s of steps) {
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setGenerationProgress(s.progress);
      toast.success(s.message);
    }

    await new Promise((resolve) => setTimeout(resolve, 500));
    setStep('preview');
    toast.success('Your resume is ready!');
  };

  const handleDownload = () => {
    toast.success('Resume downloaded as PDF!');
  };

  const addExperience = () => {
    setFormData((prev) => ({
      ...prev,
      experience: [...prev.experience, { company: '', role: '', period: '', description: '' }],
    }));
  };

  const addEducation = () => {
    setFormData((prev) => ({
      ...prev,
      education: [...prev.education, { degree: '', school: '', year: '' }],
    }));
  };

  // ─── Upload Step ───
  if (step === 'upload') {
    return (
      <div className="pt-[72px] min-h-screen bg-[var(--color-bg-light)] dark:bg-[var(--color-primary-dark)]">
        {/* Progress Header */}
        <div className="py-8 gradient-dark-section">
          <div className="max-w-[800px] mx-auto px-6">
            <div className="flex items-center justify-center gap-4 mb-6">
              {['Upload', 'Generate', 'Download'].map((s, i) => (
                <div key={s} className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-heading font-semibold text-sm ${
                    i === 0 ? 'gradient-primary text-white' : 'bg-[var(--color-surface-dark)] text-[var(--color-text-muted)] border border-[var(--color-border-dark)]'
                  }`}>
                    {i === 0 ? <CheckCircle size={18} /> : i + 1}
                  </div>
                  <span className={`font-heading text-sm hidden sm:block ${i === 0 ? 'text-[var(--color-text-light)]' : 'text-[var(--color-text-muted)]'}`}>
                    {s}
                  </span>
                  {i < 2 && <div className={`w-12 h-0.5 ${i === 0 ? 'gradient-primary' : 'bg-[var(--color-border-dark)]'}`} />}
                </div>
              ))}
            </div>
            <h1 className="font-display text-[28px] md:text-[36px] font-medium text-[var(--color-text-light)] text-center">
              Upload your CV
            </h1>
            <p className="font-body text-[var(--color-text-muted)] text-center mt-2">
              Our AI will analyze your experience and create a professional resume.
            </p>
          </div>
        </div>

        <div className="max-w-[800px] mx-auto px-6 py-12">
          {/* Upload Zone */}
          {!manualMode ? (
            <>
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-[20px] py-20 px-8 text-center cursor-pointer transition-all duration-200 ${
                  isDragging
                    ? 'border-[var(--color-primary-blue)] bg-[rgba(46,106,210,0.05)]'
                    : uploadedFile
                    ? 'border-[var(--color-success)] bg-[var(--color-success)]/5'
                    : 'border-[var(--color-border-light)] dark:border-[var(--color-border-dark)] hover:border-[var(--color-primary-blue)]'
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.docx,.txt"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                {uploadedFile ? (
                  <>
                    <div className="w-16 h-16 rounded-full bg-[var(--color-success)]/10 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle size={32} className="text-[var(--color-success)]" />
                    </div>
                    <p className="font-heading text-lg font-semibold text-[var(--color-text-dark)] dark:text-[var(--color-text-light)] mb-1">
                      {uploadedFile.name}
                    </p>
                    <p className="text-sm text-[var(--color-success)]">
                      File uploaded successfully
                    </p>
                  </>
                ) : (
                  <>
                    <div className="w-16 h-16 rounded-full bg-[var(--color-primary-blue)]/10 flex items-center justify-center mx-auto mb-4">
                      <UploadCloud size={32} className="text-[var(--color-primary-blue)]" />
                    </div>
                    <h3 className="font-heading text-xl font-semibold text-[var(--color-text-dark)] dark:text-[var(--color-text-light)] mb-2">
                      Drop your CV here or click to upload
                    </h3>
                    <p className="text-sm text-[var(--color-text-gray)]">
                      Supports PDF, DOCX, TXT
                    </p>
                  </>
                )}
              </div>

              <div className="text-center mt-6">
                <button
                  onClick={() => setManualMode(true)}
                  className="text-[var(--color-primary-blue)] font-heading font-medium hover:underline"
                >
                  Or enter your details manually
                </button>
              </div>
            </>
          ) : (
            <div className="bg-[var(--color-surface-light)] dark:bg-[var(--color-surface-dark)] rounded-[20px] p-8 border border-[var(--color-border-light)] dark:border-[var(--color-border-dark)]">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-heading text-xl font-semibold text-[var(--color-text-dark)] dark:text-[var(--color-text-light)]">
                  Enter Your Details
                </h3>
                <button
                  onClick={() => setManualMode(false)}
                  className="text-sm text-[var(--color-primary-blue)] hover:underline"
                >
                  Switch to upload
                </button>
              </div>

              <div className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-heading text-sm font-medium text-[var(--color-text-dark)] dark:text-[var(--color-text-light)] mb-1.5">
                      Full Name
                    </label>
                    <Input
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="John Doe"
                      className="py-5 bg-[var(--color-bg-light)] dark:bg-[var(--color-primary-dark)] border-[var(--color-border-light)] dark:border-[var(--color-border-dark)] rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block font-heading text-sm font-medium text-[var(--color-text-dark)] dark:text-[var(--color-text-light)] mb-1.5">
                      Email
                    </label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john@example.com"
                      className="py-5 bg-[var(--color-bg-light)] dark:bg-[var(--color-primary-dark)] border-[var(--color-border-light)] dark:border-[var(--color-border-dark)] rounded-xl"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-heading text-sm font-medium text-[var(--color-text-dark)] dark:text-[var(--color-text-light)] mb-1.5">
                    Phone
                  </label>
                  <Input
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1 (555) 123-4567"
                    className="py-5 bg-[var(--color-bg-light)] dark:bg-[var(--color-primary-dark)] border-[var(--color-border-light)] dark:border-[var(--color-border-dark)] rounded-xl"
                  />
                </div>

                <div>
                  <label className="block font-heading text-sm font-medium text-[var(--color-text-dark)] dark:text-[var(--color-text-light)] mb-1.5">
                    Professional Summary
                  </label>
                  <Textarea
                    value={formData.summary}
                    onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                    placeholder="Brief overview of your professional background..."
                    rows={3}
                    className="bg-[var(--color-bg-light)] dark:bg-[var(--color-primary-dark)] border-[var(--color-border-light)] dark:border-[var(--color-border-dark)] rounded-xl resize-none"
                  />
                </div>

                {/* Experience */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="font-heading text-sm font-medium text-[var(--color-text-dark)] dark:text-[var(--color-text-light)] flex items-center gap-2">
                      <Briefcase size={16} />
                      Work Experience
                    </label>
                    <Button type="button" onClick={addExperience} variant="ghost" className="text-[var(--color-primary-blue)] text-sm h-auto py-1">
                      + Add Experience
                    </Button>
                  </div>
                  {formData.experience.map((exp, i) => (
                    <div key={i} className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3 p-4 rounded-xl bg-[var(--color-bg-light)] dark:bg-[var(--color-primary-dark)]">
                      <Input placeholder="Company" value={exp.company} onChange={(e) => {
                        const newExp = [...formData.experience];
                        newExp[i].company = e.target.value;
                        setFormData({ ...formData, experience: newExp });
                      }} className="bg-[var(--color-surface-light)] dark:bg-[var(--color-surface-dark)]" />
                      <Input placeholder="Role" value={exp.role} onChange={(e) => {
                        const newExp = [...formData.experience];
                        newExp[i].role = e.target.value;
                        setFormData({ ...formData, experience: newExp });
                      }} className="bg-[var(--color-surface-light)] dark:bg-[var(--color-surface-dark)]" />
                      <Input placeholder="Period (e.g., 2020 - 2023)" value={exp.period} onChange={(e) => {
                        const newExp = [...formData.experience];
                        newExp[i].period = e.target.value;
                        setFormData({ ...formData, experience: newExp });
                      }} className="bg-[var(--color-surface-light)] dark:bg-[var(--color-surface-dark)]" />
                      <Textarea placeholder="Key responsibilities and achievements..." value={exp.description} onChange={(e) => {
                        const newExp = [...formData.experience];
                        newExp[i].description = e.target.value;
                        setFormData({ ...formData, experience: newExp });
                      }} className="bg-[var(--color-surface-light)] dark:bg-[var(--color-surface-dark)] resize-none" rows={2} />
                    </div>
                  ))}
                </div>

                {/* Education */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="font-heading text-sm font-medium text-[var(--color-text-dark)] dark:text-[var(--color-text-light)] flex items-center gap-2">
                      <GraduationCap size={16} />
                      Education
                    </label>
                    <Button type="button" onClick={addEducation} variant="ghost" className="text-[var(--color-primary-blue)] text-sm h-auto py-1">
                      + Add Education
                    </Button>
                  </div>
                  {formData.education.map((edu, i) => (
                    <div key={i} className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3 p-4 rounded-xl bg-[var(--color-bg-light)] dark:bg-[var(--color-primary-dark)]">
                      <Input placeholder="Degree" value={edu.degree} onChange={(e) => {
                        const newEdu = [...formData.education];
                        newEdu[i].degree = e.target.value;
                        setFormData({ ...formData, education: newEdu });
                      }} className="bg-[var(--color-surface-light)] dark:bg-[var(--color-surface-dark)]" />
                      <Input placeholder="School" value={edu.school} onChange={(e) => {
                        const newEdu = [...formData.education];
                        newEdu[i].school = e.target.value;
                        setFormData({ ...formData, education: newEdu });
                      }} className="bg-[var(--color-surface-light)] dark:bg-[var(--color-surface-dark)]" />
                      <Input placeholder="Year" value={edu.year} onChange={(e) => {
                        const newEdu = [...formData.education];
                        newEdu[i].year = e.target.value;
                        setFormData({ ...formData, education: newEdu });
                      }} className="bg-[var(--color-surface-light)] dark:bg-[var(--color-surface-dark)]" />
                    </div>
                  ))}
                </div>

                <div>
                  <label className="block font-heading text-sm font-medium text-[var(--color-text-dark)] dark:text-[var(--color-text-light)] mb-1.5 flex items-center gap-2">
                    <Award size={16} />
                    Skills (comma-separated)
                  </label>
                  <Input
                    value={formData.skills}
                    onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                    placeholder="Product Management, Agile, SQL, Data Analysis..."
                    className="py-5 bg-[var(--color-bg-light)] dark:bg-[var(--color-primary-dark)] border-[var(--color-border-light)] dark:border-[var(--color-border-dark)] rounded-xl"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-4 mt-8">
            <Button
              onClick={startGeneration}
              className="rounded-full px-8 py-6 gradient-primary text-white font-heading font-semibold text-lg hover:shadow-glow-blue transition-all hover:scale-[1.02]"
            >
              <Sparkles size={18} className="mr-2" />
              Generate Resume
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // ─── Generate Step ───
  if (step === 'generate') {
    return (
      <div className="pt-[72px] min-h-screen flex items-center justify-center bg-[var(--color-bg-light)] dark:bg-[var(--color-primary-dark)]">
        <div className="text-center px-6">
          {/* Pulsing Glow */}
          <div className="relative w-[200px] h-[200px] mx-auto mb-8">
            <div className="absolute inset-0 gradient-primary rounded-full blur-[60px] animate-pulse-glow" />
            <div className="absolute inset-8 gradient-primary rounded-full blur-[30px] opacity-60" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Sparkles size={48} className="text-white" />
            </div>
          </div>

          <h2 className="font-display text-[28px] md:text-[36px] font-medium text-[var(--color-text-dark)] dark:text-[var(--color-text-light)] mb-2">
            AI is crafting your resume...
          </h2>
          <p className="font-body text-[var(--color-text-gray)] mb-8">
            This usually takes less than a minute.
          </p>

          {/* Progress Bar */}
          <div className="max-w-md mx-auto mb-6">
            <div className="w-full h-2 bg-[var(--color-border-light)] dark:bg-[var(--color-border-dark)] rounded-full overflow-hidden">
              <div
                className="h-full gradient-primary rounded-full transition-all duration-500"
                style={{ width: `${generationProgress}%` }}
              />
            </div>
            <p className="text-sm text-[var(--color-text-gray)] mt-2">{generationProgress}% complete</p>
          </div>

          {/* Animated Checklist */}
          <div className="max-w-sm mx-auto space-y-3">
            {[
              { label: 'Analyzing your experience', done: generationProgress >= 25 },
              { label: 'Optimizing for your industry', done: generationProgress >= 50 },
              { label: 'Formatting for ATS compliance', done: generationProgress >= 75 },
              { label: 'Adding professional styling', done: generationProgress >= 100 },
            ].map((item) => (
              <div key={item.label} className={`flex items-center gap-3 text-sm transition-all duration-500 ${
                item.done ? 'text-[var(--color-success)]' : 'text-[var(--color-text-gray)]'
              }`}>
                <CheckCircle size={16} className={`transition-all duration-500 ${item.done ? 'opacity-100' : 'opacity-0'}`} />
                <span className={item.done ? '' : 'opacity-50'}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ─── Preview Step ───
  return (
    <div className="pt-[72px] min-h-screen bg-[var(--color-bg-light)] dark:bg-[var(--color-primary-dark)]">
      {/* Progress Header */}
      <div className="py-6 gradient-dark-section">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex items-center justify-center gap-4 mb-4">
            {['Upload', 'Generate', 'Download'].map((s, i) => (
              <div key={s} className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-heading font-semibold text-sm ${
                  i <= 2 ? 'gradient-primary text-white' : 'bg-[var(--color-surface-dark)] text-[var(--color-text-muted)]'
                }`}>
                  <CheckCircle size={18} />
                </div>
                <span className={`font-heading text-sm hidden sm:block ${i <= 2 ? 'text-[var(--color-text-light)]' : 'text-[var(--color-text-muted)]'}`}>
                  {s}
                </span>
                {i < 2 && <div className="w-12 h-0.5 gradient-primary" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Customization Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Success Message */}
            <div className="bg-[var(--color-surface-light)] dark:bg-[var(--color-surface-dark)] rounded-[14px] p-6 border border-[var(--color-success)]/30 text-center">
              <div className="w-16 h-16 rounded-full bg-[var(--color-success)]/10 flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={32} className="text-[var(--color-success)]" />
              </div>
              <h3 className="font-display text-[24px] font-medium text-[var(--color-text-dark)] dark:text-[var(--color-text-light)] mb-2">
                Your resume is ready!
              </h3>
              <p className="text-sm text-[var(--color-text-gray)]">
                Professional, ATS-optimized, and tailored to your target role.
              </p>
            </div>

            {/* Template Selection */}
            <div className="bg-[var(--color-surface-light)] dark:bg-[var(--color-surface-dark)] rounded-[14px] p-6 border border-[var(--color-border-light)] dark:border-[var(--color-border-dark)]">
              <h4 className="font-heading text-[16px] font-semibold text-[var(--color-text-dark)] dark:text-[var(--color-text-light)] mb-4 flex items-center gap-2">
                <FileText size={16} />
                Template
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {templates.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setSelectedTemplate(t)}
                    className={`p-3 rounded-xl border text-sm font-heading font-medium transition-all duration-200 ${
                      selectedTemplate.id === t.id
                        ? 'border-[var(--color-border-accent)] bg-[var(--color-primary-blue)]/5 text-[var(--color-primary-blue)]'
                        : 'border-[var(--color-border-light)] dark:border-[var(--color-border-dark)] text-[var(--color-text-gray)] hover:border-[var(--color-border-accent)]'
                    }`}
                  >
                    {t.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Theme */}
            <div className="bg-[var(--color-surface-light)] dark:bg-[var(--color-surface-dark)] rounded-[14px] p-6 border border-[var(--color-border-light)] dark:border-[var(--color-border-dark)]">
              <h4 className="font-heading text-[16px] font-semibold text-[var(--color-text-dark)] dark:text-[var(--color-text-light)] mb-4 flex items-center gap-2">
                <Palette size={16} />
                Color Theme
              </h4>
              <div className="flex flex-wrap gap-2">
                {colorThemes.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-full border text-sm font-medium transition-all duration-200 ${
                      selectedColor.name === color.name
                        ? 'border-[var(--color-border-accent)]'
                        : 'border-[var(--color-border-light)] dark:border-[var(--color-border-dark)]'
                    }`}
                  >
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: color.primary }} />
                    <span className="text-[var(--color-text-dark)] dark:text-[var(--color-text-light)]">{color.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Download Actions */}
            <div className="space-y-3">
              <Button
                onClick={handleDownload}
                className="w-full rounded-full py-5 gradient-primary text-white font-heading font-semibold hover:shadow-glow-blue transition-all hover:scale-[1.02]"
              >
                <Download size={18} className="mr-2" />
                Download as PDF
              </Button>
              <Button
                className="w-full rounded-full py-5 bg-transparent border border-[var(--color-border-light)] dark:border-[var(--color-border-dark)] text-[var(--color-text-dark)] dark:text-[var(--color-text-light)] font-heading font-medium hover:border-[var(--color-border-accent)] transition-all"
              >
                <Mail size={18} className="mr-2" />
                Generate Cover Letter
              </Button>
              <Button
                onClick={() => { setStep('upload'); setUploadedFile(null); }}
                className="w-full rounded-full py-5 bg-transparent border border-[var(--color-border-light)] dark:border-[var(--color-border-dark)] text-[var(--color-text-dark)] dark:text-[var(--color-text-light)] font-heading font-medium hover:border-[var(--color-border-accent)] transition-all"
              >
                <RotateCcw size={18} className="mr-2" />
                Start Over
              </Button>
            </div>

            {/* Next Steps */}
            <div className="bg-[var(--color-surface-light)] dark:bg-[var(--color-surface-dark)] rounded-[14px] p-6 border border-[var(--color-border-light)] dark:border-[var(--color-border-dark)]">
              <h4 className="font-heading text-[16px] font-semibold text-[var(--color-text-dark)] dark:text-[var(--color-text-light)] mb-4">
                What&apos;s next?
              </h4>
              <div className="space-y-3">
                {[
                  { icon: Mail, label: 'Generate Cover Letter', desc: 'Tailored for any job' },
                  { icon: MessageSquare, label: 'Prepare for Interview', desc: 'AI-generated Q\&A' },
                  { icon: Linkedin, label: 'Optimize LinkedIn', desc: 'Attract recruiters' },
                ].map((action) => {
                  const Icon = action.icon;
                  return (
                    <button key={action.label} className="w-full flex items-start gap-3 p-3 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-left">
                      <div className="w-9 h-9 rounded-lg bg-[var(--color-primary-blue)]/10 flex items-center justify-center flex-shrink-0">
                        <Icon size={16} className="text-[var(--color-primary-blue)]" />
                      </div>
                      <div>
                        <p className="font-heading text-sm font-semibold text-[var(--color-text-dark)] dark:text-[var(--color-text-light)]">
                          {action.label}
                        </p>
                        <p className="text-xs text-[var(--color-text-gray)]">{action.desc}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Resume Preview */}
          <div className="lg:col-span-2">
            <div className="bg-[var(--color-surface-light)] dark:bg-[var(--color-surface-dark)] rounded-[14px] border border-[var(--color-border-light)] dark:border-[var(--color-border-dark)] overflow-hidden shadow-elevated">
              {/* Resume Document */}
              <div className="p-8 md:p-12 max-w-[800px] mx-auto bg-white">
                {/* Header */}
                <div className="border-b-2 pb-6 mb-6" style={{ borderColor: selectedColor.primary }}>
                  <h1 className="font-display text-[36px] md:text-[42px] font-medium text-[#111827] mb-2">
                    {sampleResumeData.name}
                  </h1>
                  <p className="text-[18px] text-[var(--color-text-gray)] mb-3">{sampleResumeData.title}</p>
                  <div className="flex flex-wrap gap-4 text-sm text-[var(--color-text-gray)]">
                    <span>{sampleResumeData.email}</span>
                    <span>{sampleResumeData.phone}</span>
                    <span>{sampleResumeData.linkedin}</span>
                  </div>
                </div>

                {/* Summary */}
                <div className="mb-6">
                  <h2 className="font-heading text-[14px] font-semibold uppercase tracking-wider mb-3" style={{ color: selectedColor.primary }}>
                    Professional Summary
                  </h2>
                  <p className="text-[15px] text-[#374151] leading-relaxed">{sampleResumeData.summary}</p>
                </div>

                {/* Experience */}
                <div className="mb-6">
                  <h2 className="font-heading text-[14px] font-semibold uppercase tracking-wider mb-3" style={{ color: selectedColor.primary }}>
                    Experience
                  </h2>
                  {sampleResumeData.experience.map((exp, i) => (
                    <div key={i} className="mb-4">
                      <div className="flex items-baseline justify-between mb-1">
                        <h3 className="font-heading text-[16px] font-semibold text-[#111827]">{exp.role}</h3>
                        <span className="text-sm text-[var(--color-text-gray)]">{exp.period}</span>
                      </div>
                      <p className="text-[15px] text-[var(--color-text-gray)] mb-2">{exp.company}</p>
                      <ul className="space-y-1">
                        {exp.bullets.map((bullet, j) => (
                          <li key={j} className="text-[14px] text-[#374151] leading-relaxed flex items-start gap-2">
                            <span className="w-1 h-1 rounded-full bg-[var(--color-text-gray)] mt-2 flex-shrink-0" />
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* Education */}
                <div className="mb-6">
                  <h2 className="font-heading text-[14px] font-semibold uppercase tracking-wider mb-3" style={{ color: selectedColor.primary }}>
                    Education
                  </h2>
                  {sampleResumeData.education.map((edu, i) => (
                    <div key={i} className="flex items-baseline justify-between mb-1">
                      <div>
                        <p className="font-heading text-[15px] font-semibold text-[#111827]">{edu.degree}</p>
                        <p className="text-[14px] text-[var(--color-text-gray)]">{edu.school}</p>
                      </div>
                      <span className="text-sm text-[var(--color-text-gray)]">{edu.year}</span>
                    </div>
                  ))}
                </div>

                {/* Skills */}
                <div>
                  <h2 className="font-heading text-[14px] font-semibold uppercase tracking-wider mb-3" style={{ color: selectedColor.primary }}>
                    Skills
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {sampleResumeData.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 rounded-full text-sm font-medium"
                        style={{
                          backgroundColor: `${selectedColor.primary}15`,
                          color: selectedColor.primary,
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
