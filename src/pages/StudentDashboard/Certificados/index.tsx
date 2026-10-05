import React, { useState, useRef, useEffect } from 'react';
import { Award, Lock, ExternalLink, Download, Search, ChevronDown, Check } from 'lucide-react';
import {
  CertificadosContainer,
  CertificadoCard,
  CardHeader,
  StatusTag,
  ProgressArea,
  ProgressBar,
  ProgressFill,
  CardFooter,
  Button,
  FilterBar,
  SearchInput,
  CustomDropdown
} from './style';
import CertificateViewer from './CertificateViewer';

const MOCK_COURSES = [
  { id: 1, name: 'English Intermediate B', status: 'in-progress', progress: 72 },
  { id: 2, name: 'English Intermediate A', status: 'completed', progress: 100 },
];

const STATUS_OPTIONS = [
  { value: 'all', label: 'Todos os Status' },
  { value: 'completed', label: 'Concluídos' },
  { value: 'in-progress', label: 'Em andamento' }
];

const Certificados: React.FC = () => {
  const [viewState, setViewState] = useState<'list' | 'viewer'>('list');
  const [selectedCourse, setSelectedCourse] = useState<string>('');
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredCourses = MOCK_COURSES.filter(course => {
    const matchesSearch = course.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || course.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleOpenCertificate = (courseName: string) => {
    setSelectedCourse(courseName);
    setViewState('viewer');
  };

  const selectedStatusLabel = STATUS_OPTIONS.find(opt => opt.value === filterStatus)?.label;

  if (viewState === 'viewer') {
    return (
      <CertificateViewer 
        courseName={selectedCourse} 
        onBack={() => setViewState('list')} 
      />
    );
  }

  return (
    <CertificadosContainer>
      <FilterBar>
        <SearchInput>
          <Search size={18} />
          <input 
            type="text" 
            placeholder="Busque por cursos que você interagiu..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchInput>
        
        <CustomDropdown ref={dropdownRef}>
          <div 
            className={`dropdown-header ${isDropdownOpen ? 'open' : ''}`}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <span>Status: {selectedStatusLabel}</span>
            <ChevronDown size={16} style={{ transform: isDropdownOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
          </div>
          
          {isDropdownOpen && (
            <div className="dropdown-list">
              {STATUS_OPTIONS.map(option => (
                <div 
                  key={option.value}
                  className={`dropdown-item ${filterStatus === option.value ? 'active' : ''}`}
                  onClick={() => {
                    setFilterStatus(option.value);
                    setIsDropdownOpen(false);
                  }}
                >
                  {filterStatus === option.value ? <Check size={14} /> : <div style={{width: 14}} />}
                  {option.label}
                </div>
              ))}
            </div>
          )}
        </CustomDropdown>
      </FilterBar>

      {filteredCourses.map(course => (
        <CertificadoCard key={course.id}>
          <CardHeader>
            <div className={`badge-icon ${course.status}`}>
              <Award />
            </div>
            <div className="course-info">
              <h3>{course.name}</h3>
              <StatusTag $status={course.status as any}>
                {course.status === 'completed' ? 'Concluído' : 'Em andamento'}
              </StatusTag>
            </div>
          </CardHeader>
          
          <ProgressArea>
            <div className="progress-header">
              <span>Progresso do nível</span>
              <strong>{course.progress}%</strong>
            </div>
            <ProgressBar>
              <ProgressFill $percent={course.progress} $color={course.status === 'completed' ? '#1F2B45' : '#C57A67'} />
            </ProgressBar>
          </ProgressArea>

          <CardFooter>
            {course.status === 'in-progress' ? (
              <>
                <div className="warning-text">
                  <Lock size={14} />
                  Conclua o curso para liberar seu certificado
                </div>
                <div className="buttons">
                  <Button $variant="outline" disabled style={{ opacity: 0.6, cursor: "not-allowed", backgroundColor: "white" }}>
                    <ExternalLink size={14} /> Ver Dossiê Completo
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div className="warning-text" style={{ visibility: 'hidden' }}></div>
                <div className="buttons">
                  <Button $variant="outline" onClick={() => handleOpenCertificate(course.name)}>
                    <ExternalLink size={14} /> Ver Dossiê Completo
                  </Button>
                  <Button onClick={() => alert('Iniciando download do certificado...')}>
                    <Download size={14} /> Baixar Certificado
                  </Button>
                </div>
              </>
            )}
          </CardFooter>
        </CertificadoCard>
      ))}

      {filteredCourses.length === 0 && (
        <div style={{ textAlign: 'center', padding: '80px 20px', color: '#64748B', backgroundColor: 'white', borderRadius: '8px', border: '1px dashed #E2E8F0' }}>
          <Search size={32} style={{ opacity: 0.2, marginBottom: '12px' }} />
          <h3 style={{ margin: '0 0 6px 0', color: '#1E293B', fontSize: '1rem' }}>Nenhum curso encontrado</h3>
          <p style={{ margin: 0, fontSize: '0.85rem' }}>Tente buscar por um nome diferente ou limpar os filtros.</p>
        </div>
      )}
    </CertificadosContainer>
  );
};

export default Certificados;
