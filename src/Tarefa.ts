export interface Tarefa {
  id?: string;               // O id é opcional, pois será gerado automaticamente pelo JSON Server.
  tarefaNome: string;        // Nome da tarefa (string).
  valor: number;             // Custo ou valor da tarefa (número).
  dataMaxima: string;       // Data máxima de vencimento (string no formato 'YYYY-MM-DD').
  serialOrdernacao: number; // Ordem sequencial (número).
}
