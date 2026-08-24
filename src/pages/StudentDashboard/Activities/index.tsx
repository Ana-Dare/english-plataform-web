import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ClipboardList, Clock, CheckCircle2, FileEdit, HelpCircle } from 'lucide-react';
import {
  Container, Header, TabsContainer, Tab, ListContainer,
  ActivityCard, ActivityInfo, IconBox, TextDetails, StatusTag, ActionSection, ActionButton, GradeBadge
} from './style';

// Mock Data
const pendingTasks = [
  { id: 1, title: 'Análise e Produção Textual', type: 'essay', date: 'Vence Hoje às 23:59', status: 'urgent' },
  { id: 2, title: 'Exercícios de Gramática (Unit 4)', type: 'exercise', date: 'Vence em 2 dias', status: 'pending' },
  { id: 3, title: 'Questionário de Vocabulário', type: 'quiz', date: 'Vence em 5 dias', status: 'pending' },
];

const completedTasks = [
  { id: 4, title: 'Prova do 1º Bimestre', type: 'exam', date: 'Entregue em 24/05/2026', status: 'graded', grade: '9.5 / 10' },
  { id: 5, title: 'Redação: My Future Career', type: 'essay', date: 'Entregue em 15/05/2026', status: 'graded', grade: '8.0 / 10' },
  { id: 6, title: 'Simulado de Escuta (Listening)', type: 'quiz', date: 'Entregue em 10/05/2026', status: 'graded', grade: '10 / 10' },
];

const Activities: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'pending' | 'completed'>('pending');
  const [submittingIds, setSubmittingIds] = useState<number[]>([]);
  const [submittedIds, setSubmittedIds] = useState<number[]>([]);

  const handleDelivery = (id: number) => {
    setSubmittingIds(prev => [...prev, id]);
    
    // Simulate API upload/delivery
    setTimeout(() => {
      setSubmittingIds(prev => prev.filter(i => i !== id));
      setSubmittedIds(prev => [...prev, id]);
    }, 1500);
  };

  const getIconForType = (type: string, status: string) => {
    if (status === 'urgent') return <Clock size={24} />;
    switch (type) {
      case 'essay': return <FileEdit size={24} />;
      case 'quiz': return <HelpCircle size={24} />;
      default: return <ClipboardList size={24} />;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, x: -10 },
    show: { opacity: 1, x: 0, transition: { staggerChildren: 0.1 } },
    exit: { opacity: 0, x: 10, transition: { duration: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
    >
      <Container>
        <Header>
          <h2>Atividades e Avaliações</h2>
          <p>Gerencie suas pendências acadêmicas e acompanhe o seu histórico de notas.</p>
        </Header>

        <TabsContainer>
          <Tab $active={activeTab === 'pending'} onClick={() => setActiveTab('pending')}>
            Para Fazer ({pendingTasks.length})
          </Tab>
          <Tab $active={activeTab === 'completed'} onClick={() => setActiveTab('completed')}>
            Concluídas
          </Tab>
        </TabsContainer>

        <ListContainer>
          <AnimatePresence mode="wait">
            {activeTab === 'pending' && (
              <motion.div
                key="pending"
                variants={containerVariants}
                initial="hidden"
                animate="show"
                exit="exit"
                style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
              >
                {pendingTasks.map(task => {
                  const isSubmitting = submittingIds.includes(task.id);
                  const isSubmitted = submittedIds.includes(task.id);

                  return (
                    <ActivityCard key={task.id} as={motion.div} variants={itemVariants}>
                      <ActivityInfo>
                        <IconBox $type={task.status as 'urgent' | 'normal'}>
                          {getIconForType(task.type, task.status)}
                        </IconBox>
                        <TextDetails>
                          {isSubmitted ? (
                            <StatusTag $status="submitted">Enviado para Correção</StatusTag>
                          ) : (
                            task.status === 'urgent' && <StatusTag $status="urgent">Urgente</StatusTag>
                          )}
                          <h4>{task.title}</h4>
                          <span><Clock size={14} /> {task.date}</span>
                        </TextDetails>
                      </ActivityInfo>
                      
                      <ActionSection>
                        <ActionButton 
                          $primary={!isSubmitted}
                          onClick={() => handleDelivery(task.id)}
                          disabled={isSubmitting || isSubmitted}
                        >
                          {isSubmitting ? 'Enviando...' : isSubmitted ? <><CheckCircle2 size={18} /> Entregue</> : 'Entregar Tarefa'}
                        </ActionButton>
                      </ActionSection>
                    </ActivityCard>
                  );
                })}
              </motion.div>
            )}

            {activeTab === 'completed' && (
              <motion.div
                key="completed"
                variants={containerVariants}
                initial="hidden"
                animate="show"
                exit="exit"
                style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
              >
                {completedTasks.map(task => (
                  <ActivityCard key={task.id} as={motion.div} variants={itemVariants}>
                    <ActivityInfo>
                      <IconBox $type="done">
                        <CheckCircle2 size={24} />
                      </IconBox>
                      <TextDetails>
                        <StatusTag $status="graded">Avaliador por Professor</StatusTag>
                        <h4>{task.title}</h4>
                        <span><Clock size={14} /> {task.date}</span>
                      </TextDetails>
                    </ActivityInfo>
                    
                    <ActionSection>
                      <GradeBadge>{task.grade}</GradeBadge>
                      <span style={{ fontSize: '0.8rem', color: '#666' }}>Nota Final</span>
                    </ActionSection>
                  </ActivityCard>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </ListContainer>
      </Container>
    </motion.div>
  );
};

export default Activities;
