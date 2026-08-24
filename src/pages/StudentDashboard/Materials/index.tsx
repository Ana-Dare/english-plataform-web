import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Download, CheckCircle2 } from 'lucide-react';
import {
  Container, Header, FilterContainer, FilterButton,
  MaterialsGrid, PdfCard, IconWrapper, FileInfo, DownloadButton, Tag
} from './style';

type Category = 'Todos' | 'Gramática' | 'Vocabulário' | 'Exercícios' | 'Leitura';

const mockMaterials = [
  { id: 1, title: 'Grammar Workbook B2', category: 'Gramática', size: '2.4 MB', tag: 'Novo' },
  { id: 2, title: 'Vocabulary List - Unit 1', category: 'Vocabulário', size: '850 KB', tag: '' },
  { id: 3, title: 'Simple Past vs Present Perfect', category: 'Gramática', size: '1.2 MB', tag: 'Essencial' },
  { id: 4, title: 'Reading Comprehension Test', category: 'Leitura', size: '3.1 MB', tag: '' },
  { id: 5, title: 'Business English Phrasal Verbs', category: 'Vocabulário', size: '1.8 MB', tag: '' },
  { id: 6, title: 'Conversation Starters', category: 'Exercícios', size: '500 KB', tag: '' },
  { id: 7, title: 'Advanced Articles Practice', category: 'Gramática', size: '900 KB', tag: '' },
  { id: 8, title: 'Short Stories Collection', category: 'Leitura', size: '4.5 MB', tag: '' },
];

const Materials: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('Todos');
  const [downloadingId, setDownloadingId] = useState<number | null>(null);

  const categories: Category[] = ['Todos', 'Gramática', 'Vocabulário', 'Exercícios', 'Leitura'];

  const filteredMaterials = activeCategory === 'Todos' 
    ? mockMaterials 
    : mockMaterials.filter(m => m.category === activeCategory);

  const handleDownload = (id: number, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevents card click if we had one
    setDownloadingId(id);
    
    // Simulate download delay
    setTimeout(() => {
      setDownloadingId(null);
      // Aqui entraria a lógica real de download de arquivo
    }, 1500);
  };

  // Variantes de animação para o grid (Stagger effect)
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.4 }}
      style={{ height: '100%' }}
    >
      <Container>
        <Header>
          <h2>Biblioteca de Materiais</h2>
          <p>Acesse e faça o download de arquivos de apoio, gramática e exercícios complementares.</p>
        </Header>

        <FilterContainer>
          {categories.map(cat => (
            <FilterButton 
              key={cat} 
              $active={activeCategory === cat}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </FilterButton>
          ))}
        </FilterContainer>

        <MaterialsGrid
          as={motion.div}
          variants={containerVariants}
          initial="hidden"
          animate="show"
          key={activeCategory} // Force re-render animation when category changes
        >
          {filteredMaterials.map((material) => (
            <PdfCard 
              key={material.id}
              as={motion.div}
              variants={itemVariants}
            >
              {material.tag && <Tag>{material.tag}</Tag>}
              
              <IconWrapper>
                <FileText size={32} />
              </IconWrapper>
              
              <FileInfo>
                <h4 title={material.title}>{material.title}</h4>
                <span>{material.category} • PDF • {material.size}</span>
              </FileInfo>

              <DownloadButton 
                className="download-btn"
                onClick={(e) => handleDownload(material.id, e)}
                disabled={downloadingId === material.id}
              >
                {downloadingId === material.id ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                  >
                    <CheckCircle2 size={18} /> Baixado
                  </motion.div>
                ) : (
                  <>
                    <Download size={18} /> Baixar Arquivo
                  </>
                )}
              </DownloadButton>
            </PdfCard>
          ))}
        </MaterialsGrid>

        {filteredMaterials.length === 0 && (
          <div style={{ textAlign: 'center', color: '#888', marginTop: '40px' }}>
            Nenhum material encontrado para esta categoria.
          </div>
        )}

      </Container>
    </motion.div>
  );
};

export default Materials;
