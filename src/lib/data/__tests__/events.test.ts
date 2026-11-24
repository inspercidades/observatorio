import { describe, expect, it } from "vitest";
import audit from "./fixtures/sexta-da-mobilidade-2026-11-02.json";
import { eventsData, getEventById, getEventHref, getPastEvents, getEventSections, getUpcomingEvents, isVideoPending, type EventData } from "@/lib/data/events";

const mockEvents: EventData[] = [
  { id: "dezembro", title: "Dezembro", description: "", showInHome: false, date: "05/12/2026" },
  { id: "novembro", title: "Novembro", description: "", showInHome: false, date: "27/11/2026" },
  { id: "setembro", title: "Setembro", description: "", showInHome: false, date: "10/09/2026" },
];

describe("getUpcomingEvents", () => {
  it("mostra primeiro o evento mais próximo", () => {
    const ids = getUpcomingEvents(new Date(2026, 9, 27), mockEvents).map((e) => e.id);
    expect(ids).toEqual(["novembro", "dezembro"]);
  });
});

describe("getEventById", () => {
  it("encontra o evento publicado pelo id", () => {
    expect(getEventById("novembro", mockEvents)?.title).toBe("Novembro");
  });

  it("devolve undefined para id inexistente ou não publicado", () => {
    const hidden: EventData[] = [{ ...mockEvents[0], published: false }];
    expect(getEventById("dezembro", hidden)).toBeUndefined();
    expect(getEventById("nada", mockEvents)).toBeUndefined();
  });
});

describe("getEventHref", () => {
  it("leva à página interna quando há sessões, mesmo com link externo", () => {
    const event: EventData = {
      id: "csc",
      title: "CSC",
      description: "",
      showInHome: false,
      date: "16/11/2026",
      href: "https://evento.example",
      sessions: [{ stage: "Palco", title: "Mesa", date: "17/11/2026", time: "10h", onms: [] }],
    };
    expect(getEventHref(event)).toBe("/eventos/csc");
  });
});

describe("datas cadastradas", () => {
  it("interpreta eventos publicados sem rejeitar o ano solto das gravações", () => {
    expect(() => getUpcomingEvents()).not.toThrow();
    expect(() => getPastEvents()).not.toThrow();
  });
});

describe("getUpcomingEvents com eventos de vários dias", () => {
  it("mantém na agenda o evento que já começou e ainda não terminou", () => {
    const multi: EventData[] = [
      { id: "festival", title: "Festival", description: "", showInHome: false, date: "25/10/2026", endDate: "28/10/2026" },
    ];
    expect(getUpcomingEvents(new Date(2026, 9, 27), multi).map((e) => e.id)).toEqual(["festival"]);
    expect(getUpcomingEvents(new Date(2026, 9, 29), multi)).toHaveLength(0);
  });
});


describe("classificação da Sexta da Mobilidade", () => {
  const today = new Date(2026, 10, 2);

  it("move a edição realizada sem gravação para a série e preserva o link do evento", () => {
    const series = getEventSections(today).sexta;
    const event = series.find((item) => item.id === "sexta-da-mobilidade-seguranca-viaria-2026");
    expect(event?.href).toContain("insper.edu.br/pt/eventos/2026/10/");
    expect(getEventSections(today).past.map((item) => item.id)).not.toContain(event?.id);
    expect(getPastEvents(today).map((item) => item.id)).toContain(event?.id);
  });

  it("mantém a edição futura somente na agenda", () => {
    const id = "sexta-da-mobilidade-novembro-2026";
    expect(getUpcomingEvents(today).map((item) => item.id)).toContain(id);
    expect(getEventSections(today).sexta.map((item) => item.id)).not.toContain(id);
  });

  it("ordena as edições realizadas da mais recente para a mais antiga", () => {
    const series = getEventSections(today).sexta;
    expect(series[0].id).toBe("sexta-da-mobilidade-seguranca-viaria-2026");
  });

  it("não perde nem duplica eventos publicados entre as três seções", () => {
    const ids = [...getEventSections(today).upcoming, ...getEventSections(today).past, ...getEventSections(today).sexta].map((item) => item.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect([...ids].sort()).toEqual(eventsData.filter((item) => item.published !== false).map((item) => item.id).sort());
  });
});


describe("seções por data e disponibilidade da gravação", () => {
  const sexta: EventData = { id: "sexta", title: "Sexta", description: "", date: "30/10/2026", series: "sexta-da-mobilidade", showInHome: false, href: "https://insper.edu.br/evento" };

  it("mantém o evento na agenda no próprio dia e o move no dia seguinte", () => {
    expect(getEventSections(new Date(2026, 9, 30), [sexta]).upcoming).toEqual([sexta]);
    expect(getEventSections(new Date(2026, 9, 30), [sexta]).sexta).toEqual([]);
    expect(getEventSections(new Date(2026, 9, 31), [sexta]).sexta).toEqual([sexta]);
  });

  it("remove o aviso quando a gravação é cadastrada", () => {
    expect(isVideoPending(sexta)).toBe(true);
    expect(isVideoPending({ ...sexta, videoUrl: "https://youtu.be/video" })).toBe(false);
    expect(isVideoPending({ ...sexta, isTransmitted: true })).toBe(false);
  });

  it("oculta eventos não publicados, inclusive gravações", () => {
    const hidden = [
      { ...sexta, published: false },
      { ...sexta, id: "gravado", isTransmitted: true, published: false },
    ];
    expect(getEventSections(new Date(2026, 10, 2), hidden)).toEqual({ upcoming: [], sexta: [], past: [] });
  });
});

describe("inventário público da Sexta da Mobilidade em 02/11/2026", () => {
  it("inclui as 15 gravações públicas da série sem duplicatas", () => {
    const expected = ["IfodUOjixfk", "81MLQuaW0aY", "rAv5NNZWByQ", "wWF66SLgErs", "z8mLOna5ry4", "yk3ffu7kuys", "-J_Ol823NFc", "uhPqjkp7DKo", "_5J9ZKNlcCI", "KC3H6yN_wvQ", "z-SlSZB8umQ", "OsVRaGqENIc", "-qAvQx0YvJA", "D0EivrvXzj0", "NDYDMJvKzbw"];
    const recorded = getEventSections(new Date(2026, 10, 2)).sexta.filter((event) => event.isTransmitted || event.videoUrl);
    const ids = recorded.map((event) => {
      const url = new URL(event.videoUrl ?? event.href!);
      return url.hostname === "youtu.be" ? url.pathname.slice(1) : url.searchParams.get("v");
    });
    expect(ids.sort()).toEqual(expected.sort());
  });
});


it("preserva as datas dos encontros conferidas nas fontes do inventário", () => {
  for (const video of audit.videos) {
    const event = eventsData.find((item) => (item.videoUrl ?? item.href)?.includes(video.id));
    expect(event?.date, video.title).toBe(video.eventDate);
  }
});

describe("títulos em caixa de frase", () => {
  const titles = eventsData.flatMap((event) => [event.title, ...(event.sessions ?? []).map((s) => s.title)]);

  it("começam com letra maiúscula", () => {
    const lowercase = titles.filter((title) => /^\p{Ll}/u.test(title));
    expect(lowercase).toEqual([]);
  });

});
