/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useMemo } from "react";
import { Search, Plus, Users } from "lucide-react";
import {
  Container,
  HeaderActions,
  SearchWrapper,
  RightActions,
  AddButton,
  Title,
  ClassesGrid,
  ClassCard,
  ClassCardHeader,
  LevelBadge,
  ClassCardBody,
  ClassCardInfo,
} from "./style";
import CreateClassModal from "./CreateClassModal";
import ClassDetail from "./ClassDetail";
import { useClasses } from "../../../contexts/Classes";
import useToast from "../../../contexts/Toast/useToast";

const ClassesTab = () => {
  const { classes, addClass, isAdding } = useClasses();
  const { addToast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedClass, setSelectedClass] = useState<any>(null);

  const filteredClasses = useMemo(() => {
    return classes.filter((c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [classes, searchQuery]);

  // Turma de demonstração só no front, para visualizar o novo layout sem alterar o banco.
  const visibleClasses =
    filteredClasses.length > 0
      ? filteredClasses
      : [
          {
            id: -1,
            name: "Turma Intermediate A",
            level_id: 2,
            vip: false,
            status: "active" as const,
          },
        ];

  const handleCreateClass = (data: { name: string; level: string }) => {
    // data.level agora é o ID do nível (string), não o nome
    const levelId = parseInt(data.level, 10);

    addClass(
      {
        name: data.name,
        level_id: levelId,
        vip: false,
        status: "active",
      },
      {
        onSuccess: () => {
          addToast("Turma criada com sucesso!", "success");
          setShowCreateModal(false);
        },
        onError: () => {
          addToast("Erro ao criar turma. Tente novamente.", "error");
        },
      },
    );
  };

  if (selectedClass) {
    return (
      <ClassDetail
        classData={selectedClass}
        onBack={() => setSelectedClass(null)}
      />
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  return (
    <Container>
      <HeaderActions>
        <Title>Gerenciar Turmas</Title>
        <RightActions>
          <SearchWrapper>
            <Search size={18} />
            <input
              type="text"
              placeholder="Pesquisar por nome da turma..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </SearchWrapper>
          <AddButton
            onClick={() => setShowCreateModal(true)}
            disabled={isAdding}
          >
            <Plus size={18} /> {isAdding ? "Criando..." : "Nova Turma"}
          </AddButton>
        </RightActions>
      </HeaderActions>

      <ClassesGrid variants={containerVariants} initial="hidden" animate="show">
        {visibleClasses.map((c) => (
          <ClassCard
            key={c.id}
            onClick={() => setSelectedClass(c)}
            whileHover={{ y: -4, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
          >
            <ClassCardHeader $level={c.level_id?.toString() || "1"}>
              <h3>{c.name}</h3>
              <LevelBadge>{c.level_id || 1}</LevelBadge>
            </ClassCardHeader>
            <ClassCardBody>
              <ClassCardInfo>
                <Users size={16} />
                <span>Turma ativa</span>
              </ClassCardInfo>
            </ClassCardBody>
          </ClassCard>
        ))}
      </ClassesGrid>

      {showCreateModal && (
        <CreateClassModal
          onClose={() => setShowCreateModal(false)}
          onSave={handleCreateClass}
          isLoading={isAdding}
        />
      )}
    </Container>
  );
};

export default ClassesTab;
