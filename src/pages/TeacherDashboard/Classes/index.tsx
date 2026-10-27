/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  useState,
  useMemo,
  useRef,
  useEffect,
  useCallback,
} from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Search,
  Plus,
  Users,
  Calendar,
  ArrowRight,
  MoreHorizontal,
  ArrowDownAZ,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { listLevels } from "../services/level";
import CustomDropdown from "../../../components/CustomDropdown";
import {
  Container,
  PageHeader,
  PageHeaderLeft,
  HeaderIconCircle,
  HeaderTitleArea,
  NewClassBtn,
  FilterBar,
  FilterSearchInput,
  FilterCarouselWrapper,
  FilterCarouselViewport,
  CarouselArrowBtn,
  FilterControlsGroup,
  StatusFilterDot,
  ClearFiltersLink,
  ClassesGrid,
  TurmaCard,
  TurmaCardHeader,
  LevelBadgeSolid,
  TurmaStudentsRow,
  AvatarStack,
  StackedAvatar,
  StudentsCountText,
  TurmaStatusBadge,
  TurmaProgressSection,
  TurmaProgressBarTrack,
  TurmaProgressBarFill,
  TurmaNextLessonRow,
  TurmaCardFooter,
  ClassesPagination,
  PaginationSelector,
  PaginationButtonsGroup,
  PageBtn,
  EmptyClassesState,
} from "./style";
import CreateClassModal from "./CreateClassModal";
import ClassDetail from "./ClassDetail";
import { useClasses } from "../../../contexts/Classes";
import { useStudents } from "../../../contexts/Students/hooks/useStudents";
import { getInitials } from "../../../utils/avatar";
import useToast from "../../../contexts/Toast/useToast";

interface TurmaItem {
  id: number;
  name: string;
  level_id?: number;
  level_code: string;
  level_color: string;
  description: string;
  students_count: number;
  avatars: Array<{ initials: string; bg: string; color: string }>;
  status: "active" | "paused";
  progress: number;
  next_lesson: string;
  vip?: boolean;
}

const extractCefr = (name?: string): string => {
  if (!name) return "A2";
  const upper = name.toUpperCase();
  const match = upper.match(/\b(A1|A2|B1|B2|C1|C2)\b/);
  if (match) return match[1];
  if (upper.includes("INIC") || upper.includes("BÁS")) return "A1";
  if (upper.includes("INTER")) return "B1";
  if (upper.includes("AVAN")) return "C1";
  return name.slice(0, 3).toUpperCase();
};

const getCefrColor = (code: string): string => {
  switch (code) {
    case "A1":
      return "#0d9488";
    case "A2":
      return "#059669";
    case "B1":
      return "#7c3aed";
    case "B2":
      return "#2563eb";
    case "C1":
      return "#0891b2";
    case "C2":
      return "#db2777";
    default:
      return "#2563eb";
  }
};

interface ClassesTabProps {
  onNavigateStudent?: (studentId: number, studentData?: any) => void;
  onNavigateRegisterStudent?: (
    turmaId?: number | string,
    turmaName?: string,
  ) => void;
}

const ClassesTab: React.FC<ClassesTabProps> = ({
  onNavigateStudent,
  onNavigateRegisterStudent,
}) => {
  const { classes, addClass, isAdding } = useClasses();
  const { students } = useStudents();
  const { addToast } = useToast();
  const { data: levelsData } = useQuery({
    queryKey: ["levels"],
    queryFn: listLevels,
  });

  // Filtros e estados
  const [searchQuery, setSearchQuery] = useState("");
  const [filterLevel, setFilterLevel] = useState("todos");
  const [filterStatus, setFilterStatus] = useState("todos");
  const [sortOrder, setSortOrder] = useState("az");
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedClass, setSelectedClass] = useState<any>(null);

  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateCarouselScroll = useCallback(() => {
    const el = carouselRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    updateCarouselScroll();
    window.addEventListener("resize", updateCarouselScroll);
    return () => window.removeEventListener("resize", updateCarouselScroll);
  }, [updateCarouselScroll, filterLevel, filterStatus, sortOrder]);

  const scrollCarousel = (dir: "left" | "right") => {
    const el = carouselRef.current;
    if (!el) return;
    el.scrollBy({
      left: dir === "left" ? -160 : 160,
      behavior: "smooth",
    });
  };

  // Mapa level_id -> nome do nível
  const levelNameMap = useMemo(() => {
    const map: Record<number, string> = {};
    (levelsData?.levels ?? []).forEach((l) => {
      map[l.id] = l.name;
    });
    return map;
  }, [levelsData]);

  const allTurmas: TurmaItem[] = useMemo(() => {
    const validApiClasses = classes.filter((c) => c.id !== -1);

    return validApiClasses.map((c) => {
      const classStudents = students.filter((s) => s.classId === c.id);
      const levelName = c.level_id
        ? levelNameMap[c.level_id] || `Nível ${c.level_id}`
        : "A2";
      const levelCode = extractCefr(levelName);
      const color = getCefrColor(levelCode);

      return {
        id: c.id,
        name: c.name,
        level_id: c.level_id,
        level_code: levelCode,
        level_color: color,
        description:
          (c as any).description ||
          "Aulas em grupo focadas no desenvolvimento e fluência da língua inglesa.",
        students_count:
          (c as any).students_count ||
          (c as any).students?.length ||
          classStudents.length,
        avatars: classStudents.slice(0, 3).map((s) => ({
          initials: getInitials(s.name),
          bg: s.avatarColor || "#4A72FF",
          color: "#ffffff",
        })),
        status: (c.status as any) === "paused" ? "paused" : "active",
        progress: (c as any).progress ?? 0,
        next_lesson: (c as any).next_lesson || "Sem aulas agendadas",
        vip: c.vip,
      };
    });
  }, [classes, levelNameMap, students]);

  // Filtragem e ordenação
  const filteredClasses = useMemo(() => {
    return allTurmas
      .filter((turma) => {
        // Busca textual por nome ou descrição
        const matchesSearch =
          searchQuery.trim() === "" ||
          turma.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          turma.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          turma.level_code.toLowerCase().includes(searchQuery.toLowerCase());

        // Filtro por Nível CEFR
        const matchesLevel =
          filterLevel === "todos" ||
          turma.level_code.toUpperCase() === filterLevel.toUpperCase();

        // Filtro por Status
        const matchesStatus =
          filterStatus === "todos" ||
          (filterStatus === "ativas" && turma.status === "active") ||
          (filterStatus === "pausadas" && turma.status === "paused");

        return matchesSearch && matchesLevel && matchesStatus;
      })
      .sort((a, b) => {
        if (sortOrder === "az") {
          return a.name.localeCompare(b.name);
        }
        if (sortOrder === "za") {
          return b.name.localeCompare(a.name);
        }
        if (sortOrder === "recent") {
          return b.id - a.id;
        }
        if (sortOrder === "progress") {
          return b.progress - a.progress;
        }
        return 0;
      });
  }, [allTurmas, searchQuery, filterLevel, filterStatus, sortOrder]);

  // Paginação
  const totalPages = Math.max(
    1,
    Math.ceil(filteredClasses.length / itemsPerPage),
  );
  const validCurrentPage = Math.min(currentPage, totalPages);

  const paginatedClasses = useMemo(() => {
    const startIndex = (validCurrentPage - 1) * itemsPerPage;
    return filteredClasses.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredClasses, validCurrentPage, itemsPerPage]);

  const hasActiveFilters =
    searchQuery.trim() !== "" ||
    filterLevel !== "todos" ||
    filterStatus !== "todos" ||
    sortOrder !== "az";

  const handleClearFilters = () => {
    setSearchQuery("");
    setFilterLevel("todos");
    setFilterStatus("todos");
    setSortOrder("az");
    setCurrentPage(1);
  };

  const handleCreateClass = (data: { name: string; level: string }) => {
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

  // Se uma turma foi selecionada para ver detalhes
  if (selectedClass) {
    return (
      <ClassDetail
        classData={selectedClass}
        onBack={() => setSelectedClass(null)}
        onNavigateStudent={onNavigateStudent}
        onNavigateRegisterStudent={onNavigateRegisterStudent}
      />
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.06 },
    },
  };

  return (
    <Container>
      {/* 1. Cabeçalho Principal */}
      <PageHeader>
        <PageHeaderLeft>
          <HeaderIconCircle>
            <Users size={24} />
          </HeaderIconCircle>
          <HeaderTitleArea>
            <h2>Gerenciar Turmas</h2>
            <p>Acompanhe suas turmas, alunos e níveis de aprendizagem</p>
          </HeaderTitleArea>
        </PageHeaderLeft>

        <NewClassBtn
          onClick={() => setShowCreateModal(true)}
          disabled={isAdding}
        >
          <Plus size={18} /> Nova turma
        </NewClassBtn>
      </PageHeader>

      {/* 2. Barra de Filtros e Busca */}
      <FilterBar>
        <FilterSearchInput>
          <Search size={18} />
          <input
            type="text"
            placeholder="Pesquisar turma ou aluno..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
          />
        </FilterSearchInput>

        <FilterCarouselWrapper>
          <CarouselArrowBtn
            type="button"
            $active={canScrollLeft}
            onClick={() => scrollCarousel("left")}
            aria-label="Deslizar filtros para a esquerda"
            title="Anterior"
          >
            <ChevronLeft size={16} strokeWidth={2.4} />
          </CarouselArrowBtn>

          <FilterCarouselViewport
            $canScrollLeft={canScrollLeft}
            $canScrollRight={canScrollRight}
          >
            <FilterControlsGroup
              ref={carouselRef}
              onScroll={updateCarouselScroll}
            >
              {/* Dropdown de Nível */}
              <CustomDropdown
                value={filterLevel}
                onChange={(val) => {
                  setFilterLevel(val);
                  setCurrentPage(1);
                }}
                leadingIcon={<Users size={15} strokeWidth={2} />}
                options={[
                  { value: "todos", label: "Todos os níveis" },
                  { value: "A1", label: "A1 - Iniciante" },
                  { value: "A2", label: "A2 - Básico" },
                  { value: "B1", label: "B1 - Intermediário" },
                  { value: "B2", label: "B2 - Intermediário Superior" },
                  { value: "C1", label: "C1 - Avançado" },
                  { value: "C2", label: "C2 - Fluente" },
                ]}
              />

              {/* Dropdown de Status */}
              <CustomDropdown
                value={filterStatus}
                onChange={(val) => {
                  setFilterStatus(val);
                  setCurrentPage(1);
                }}
                leadingIcon={
                  <StatusFilterDot
                    $color={filterStatus === "pausadas" ? "#f59e0b" : "#10b981"}
                    $ring={filterStatus === "pausadas" ? "#fef3c7" : "#dcfce7"}
                  />
                }
                options={[
                  { value: "todos", label: "Status: Todas" },
                  { value: "ativas", label: "Ativas" },
                  { value: "pausadas", label: "Pausadas" },
                ]}
              />

              {/* Dropdown de Ordenação */}
              <CustomDropdown
                value={sortOrder}
                onChange={(val) => setSortOrder(val)}
                leadingIcon={<ArrowDownAZ size={15} strokeWidth={2} />}
                menuAlign="right"
                options={[
                  { value: "az", label: "Ordenar: A-Z" },
                  { value: "za", label: "Ordenar: Z-A" },
                  { value: "recent", label: "Mais recentes" },
                  { value: "progress", label: "Maior progresso" },
                ]}
              />
            </FilterControlsGroup>
          </FilterCarouselViewport>

          <CarouselArrowBtn
            type="button"
            $active={canScrollRight}
            onClick={() => scrollCarousel("right")}
            aria-label="Deslizar filtros para a direita"
            title="Próximo"
          >
            <ChevronRight size={16} strokeWidth={2.4} />
          </CarouselArrowBtn>
        </FilterCarouselWrapper>

        {/* Link Limpar Filtro automático */}
        {hasActiveFilters && (
          <ClearFiltersLink type="button" onClick={handleClearFilters}>
            Limpar filtro
          </ClearFiltersLink>
        )}
      </FilterBar>

      {/* 3. Grid de Cards de Turmas (Sem Capa, com Usuários) */}
      <ClassesGrid variants={containerVariants} initial="hidden" animate="show">
        {paginatedClasses.length > 0 ? (
          paginatedClasses.map((turma) => (
            <TurmaCard
              key={turma.id}
              onClick={() => setSelectedClass(turma)}
              whileHover={{ y: -4, scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              {/* Topo do Card: Nome e Selo de Nível Sólido */}
              <TurmaCardHeader>
                <div className="title-row">
                  <h3>{turma.name}</h3>
                  <LevelBadgeSolid $levelColor={turma.level_color}>
                    {turma.level_code}
                  </LevelBadgeSolid>
                </div>
                <p className="description">{turma.description}</p>
              </TurmaCardHeader>

              {/* Linha dos Usuários / Alunos e Status */}
              <TurmaStudentsRow>
                <div className="left-area">
                  <AvatarStack>
                    {turma.avatars.map((av, index) => (
                      <StackedAvatar
                        key={index}
                        $bg={av.bg}
                        $color={av.color}
                        $index={index}
                      >
                        {av.initials}
                      </StackedAvatar>
                    ))}
                  </AvatarStack>
                  <StudentsCountText>
                    <Users size={15} />
                    <span>{turma.students_count} alunos</span>
                  </StudentsCountText>
                </div>

                <TurmaStatusBadge $active={turma.status === "active"}>
                  {turma.status === "active" ? "Ativa" : "Pausada"}
                </TurmaStatusBadge>
              </TurmaStudentsRow>

              {/* Progresso da Turma */}
              <TurmaProgressSection>
                <div className="progress-info">
                  <span className="progress-label">Progresso da turma</span>
                  <span className="progress-value">{turma.progress}%</span>
                </div>
                <TurmaProgressBarTrack>
                  <TurmaProgressBarFill $width={turma.progress} />
                </TurmaProgressBarTrack>
              </TurmaProgressSection>

              {/* Próxima Aula */}
              <TurmaNextLessonRow>
                <Calendar size={15} />
                <span>{turma.next_lesson}</span>
              </TurmaNextLessonRow>

              {/* Rodapé do Card */}
              <TurmaCardFooter>
                <span
                  className="view-link"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedClass(turma);
                  }}
                >
                  Ver turma <ArrowRight size={15} />
                </span>
                <button
                  type="button"
                  className="more-btn"
                  title="Mais opções"
                  onClick={(e) => {
                    e.stopPropagation();
                    addToast(`Opções da turma: ${turma.name}`, "info");
                  }}
                >
                  <MoreHorizontal size={18} />
                </button>
              </TurmaCardFooter>
            </TurmaCard>
          ))
        ) : (
          <EmptyClassesState>
            <div className="icon-wrapper">
              <Search size={26} />
            </div>
            <h4>Nenhuma turma encontrada</h4>
            <p>
              Não encontramos nenhuma turma com os filtros aplicados. Tente
              redefinir a busca ou os filtros para ver mais resultados.
            </p>
            <ClearFiltersLink
              type="button"
              onClick={handleClearFilters}
              style={{ fontSize: "0.95rem", textDecoration: "underline" }}
            >
              Limpar todos os filtros
            </ClearFiltersLink>
          </EmptyClassesState>
        )}
      </ClassesGrid>

      {/* 4. Paginação Responsiva */}
      {filteredClasses.length > 0 && (
        <ClassesPagination>
          <PaginationSelector>
            <span>Mostrar</span>
            <CustomDropdown
              size="compact"
              menuDirection="up"
              minWidth="56px"
              value={String(itemsPerPage)}
              onChange={(val) => {
                setItemsPerPage(Number(val));
                setCurrentPage(1);
              }}
              options={[
                { value: "6", label: "6" },
                { value: "12", label: "12" },
                { value: "18", label: "18" },
                { value: "24", label: "24" },
              ]}
            />
            <span>por página</span>
          </PaginationSelector>

          <PaginationButtonsGroup>
            <PageBtn
              type="button"
              disabled={validCurrentPage <= 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            >
              <ChevronLeft size={16} style={{ marginRight: 2 }} /> Anterior
            </PageBtn>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PageBtn
                key={page}
                type="button"
                $active={page === validCurrentPage}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </PageBtn>
            ))}

            <PageBtn
              type="button"
              disabled={validCurrentPage >= totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            >
              Próxima <ChevronRight size={16} style={{ marginLeft: 2 }} />
            </PageBtn>
          </PaginationButtonsGroup>
        </ClassesPagination>
      )}

      {/* Modal de Criação de Turma */}
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
