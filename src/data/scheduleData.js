import { gradePairRows, gradeSchedules } from './gradeWorkbook.js';

export const gradeDays = [
  { key: 'segunda', label: 'Seg' },
  { key: 'terca', label: 'Ter' },
  { key: 'quarta', label: 'Qua' },
  { key: 'quinta', label: 'Qui' },
  { key: 'sexta', label: 'Sex' }
];

const timeSlots = {
  Matutino: ['07:10', '07:55', '08:40', '09:45', '10:30', '11:15'],
  Vespertino: ['13:00', '13:45', '14:30', '15:35', '16:20', '17:05']
};

const courseNames = {
  ADM: 'Administração',
  LOG: 'Logística',
  INF: 'Informática',
  MANUT: 'Manutenção',
  REDES: 'Redes'
};

const teacherAliases = {
  Carolina: 'Carolina Lopes',
  'Fenando': 'Fernando',
  'Alan bezerra': 'Alan Bezerra',
  'Moises Oliveira': 'Moisés Oliveira',
  'SP- Lingua Portuguesa': 'SP- Língua Portuguesa'
};

const subjectAliases = {
  'Lingua Inglesa': 'Língua Inglesa'
};

const getClassInfo = (code) => {
  const match = code.match(/^(ADM|LOG|INF|MANUT|REDES)([1-3])([MV])([A-C])$/);
  if (!match) return null;

  const [, prefix, year, shift, section] = match;
  const curso = courseNames[prefix];
  const turno = shift === 'M' ? 'Matutino' : 'Vespertino';
  const turma = `${prefix} ${year}${shift}${section}`;

  return {
    codigo: code,
    curso,
    ano: `${year}º Ano`,
    turno,
    nome_completo: `${curso} ${year}${shift}${section}`,
    turma
  };
};

const getLesson = (code, dayIndex, timeIndex) => {
  const encodedSchedule = gradeSchedules[code];
  const slotIndex = dayIndex * 6 + timeIndex;
  const pairIndex = Number.parseInt(encodedSchedule.slice(slotIndex * 2, slotIndex * 2 + 2), 36);
  const [rawDisciplina, rawProfessor] = gradePairRows[pairIndex] ?? ['-', ''];
  const disciplina = subjectAliases[rawDisciplina] ?? rawDisciplina;
  const professor = teacherAliases[rawProfessor] ?? rawProfessor;

  return { disciplina, professor };
};

export const turmas = Object.keys(gradeSchedules)
  .map(getClassInfo)
  .filter(Boolean);

export const grades = Object.fromEntries(turmas.map((turma) => {
  const horarios = timeSlots[turma.turno].map((horario, timeIndex) => {
    const row = { horario };
    gradeDays.forEach(({ key }, dayIndex) => {
      row[key] = getLesson(turma.codigo, dayIndex, timeIndex);
    });
    return row;
  });

  return [turma.codigo, {
    nome: turma.nome_completo,
    curso: turma.curso,
    ano: turma.ano,
    turno: turma.turno,
    horarios
  }];
}));

const professorMap = new Map();
turmas.forEach((turma) => {
  const encodedSchedule = gradeSchedules[turma.codigo];
  for (let slotIndex = 0; slotIndex < encodedSchedule.length / 2; slotIndex += 1) {
    const pairIndex = Number.parseInt(encodedSchedule.slice(slotIndex * 2, slotIndex * 2 + 2), 36);
    const [rawDisciplina, rawProfessor] = gradePairRows[pairIndex] ?? ['-', ''];
    const disciplina = subjectAliases[rawDisciplina] ?? rawDisciplina;
    const nome = teacherAliases[rawProfessor] ?? rawProfessor;
    if (!nome || disciplina === '-') continue;

    if (!professorMap.has(nome)) {
      professorMap.set(nome, { nome, disciplinas: new Set(), turmas: new Set() });
    }
    const professor = professorMap.get(nome);
    professor.disciplinas.add(disciplina);
    professor.turmas.add(turma.codigo);
  }
});

export const professores = [...professorMap.values()]
  .sort((left, right) => left.nome.localeCompare(right.nome, 'pt-BR'))
  .map((professor, index) => ({
    id: index + 1,
    nome: professor.nome,
    disciplinas: [...professor.disciplinas].sort((left, right) => left.localeCompare(right, 'pt-BR')),
    turmas: [...professor.turmas].sort((left, right) => left.localeCompare(right, 'pt-BR'))
  }));
