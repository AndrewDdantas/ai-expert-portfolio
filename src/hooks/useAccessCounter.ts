import { useState, useEffect } from "react";

interface AccessCounter {
  totalVisits: number;
  uniqueVisits: number;
  lastVisit: string;
  todayVisits: number;
}

const STORAGE_KEY = "portfolio_access_counter";
const VISITOR_ID_KEY = "portfolio_visitor_id";

export const useAccessCounter = () => {
  const [counter, setCounter] = useState<AccessCounter>({
    totalVisits: 0,
    uniqueVisits: 0,
    lastVisit: "",
    todayVisits: 0,
  });

  const [isLoading, setIsLoading] = useState(true);

  // Gera um ID único para o visitante se não existir
  const getOrCreateVisitorId = (): string => {
    let visitorId = localStorage.getItem(VISITOR_ID_KEY);
    if (!visitorId) {
      visitorId = `visitor_${Date.now()}_${Math.random()
        .toString(36)
        .substr(2, 9)}`;
      localStorage.setItem(VISITOR_ID_KEY, visitorId);
    }
    return visitorId;
  };

  // Verifica se é uma nova visita do mesmo visitante
  const isNewVisit = (lastVisit: string): boolean => {
    if (!lastVisit) {
      console.log("📊 Primeira visita (sem lastVisit)");
      return true;
    }

    const lastVisitDate = new Date(lastVisit);
    const now = new Date();

    // Considera nova visita se passou mais de 30 minutos (ou 10 segundos em desenvolvimento)
    const timeThreshold = import.meta.env.DEV ? 10 * 1000 : 30 * 60 * 1000; // 10s em dev, 30min em prod
    const timeDiff = now.getTime() - lastVisitDate.getTime();
    const isNew = timeDiff > timeThreshold;

    console.log("📊 Verificação de nova visita:", {
      lastVisit,
      now: now.toISOString(),
      timeDiffMinutes: Math.round(timeDiff / (60 * 1000)),
      isNew,
    });

    return isNew;
  };

  // Verifica se é uma visita do mesmo dia
  const isSameDay = (date1: string, date2: string): boolean => {
    if (!date1 || !date2) return false;

    const d1 = new Date(date1).toDateString();
    const d2 = new Date(date2).toDateString();

    return d1 === d2;
  };

  // Incrementa o contador (usado apenas pelo resetCounter para testar)
  const incrementCounter = () => {
    const now = new Date().toISOString();

    setCounter((prevCounter) => {
      const isNewVisitSession = isNewVisit(prevCounter.lastVisit);
      const isTodayVisit = isSameDay(prevCounter.lastVisit, now);

      const newCounter: AccessCounter = {
        totalVisits: prevCounter.totalVisits + 1,
        uniqueVisits: prevCounter.uniqueVisits + 1,
        lastVisit: now,
        todayVisits: isTodayVisit ? prevCounter.todayVisits + 1 : 1,
      };

      // Salva no localStorage
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newCounter));

      return newCounter;
    });
  };

  // Carrega dados do localStorage
  useEffect(() => {
    try {
      const savedCounter = localStorage.getItem(STORAGE_KEY);
      let currentCounter: AccessCounter = {
        totalVisits: 0,
        uniqueVisits: 0,
        lastVisit: "",
        todayVisits: 0,
      };

      if (savedCounter) {
        currentCounter = JSON.parse(savedCounter);
        console.log("📊 Dados carregados do localStorage:", currentCounter);
      } else {
        console.log("📊 Primeira visita - sem dados salvos");
      }

      // Verifica se deve incrementar o contador
      const now = new Date().toISOString();
      const shouldIncrement = isNewVisit(currentCounter.lastVisit);
      const isTodayVisit = isSameDay(currentCounter.lastVisit, now);

      console.log("📊 Verificações:", {
        shouldIncrement,
        isTodayVisit,
        lastVisit: currentCounter.lastVisit,
        now,
      });

      if (shouldIncrement || !savedCounter) {
        // Atualiza o contador
        const newCounter: AccessCounter = {
          totalVisits: currentCounter.totalVisits + 1,
          uniqueVisits: currentCounter.uniqueVisits + 1,
          lastVisit: now,
          todayVisits: isTodayVisit ? currentCounter.todayVisits + 1 : 1,
        };

        console.log("📊 Incrementando contador:", newCounter);

        // Salva no localStorage
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newCounter));
        setCounter(newCounter);
      } else {
        console.log("📊 Mantendo contador atual (sem incrementar)");
        // Apenas carrega os dados existentes
        setCounter(currentCounter);
      }

      // Gera/recupera ID do visitante
      getOrCreateVisitorId();

      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Erro ao carregar contador de acessos:", error);
      setIsLoading(false);
    }
  }, []);

  // Função para resetar contador (útil para desenvolvimento)
  const resetCounter = () => {
    const resetData: AccessCounter = {
      totalVisits: 0,
      uniqueVisits: 0,
      lastVisit: "",
      todayVisits: 0,
    };

    setCounter(resetData);
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(VISITOR_ID_KEY);
  };

  return {
    counter,
    isLoading,
    resetCounter,
    forceIncrement: incrementCounter, // Para teste durante desenvolvimento
  };
};
