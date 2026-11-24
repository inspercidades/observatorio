import { describe, expect, it } from "vitest"
import { liveStreamStatus, liveStreamWhen } from "@/lib/live-stream-status"

const stream = {
  url: "https://youtube.com/live/abc",
  startsAt: "2026-11-27T12:00:00-03:00",
  endsAt: "2026-11-27T14:00:00-03:00",
}

describe("liveStreamStatus", () => {
  it("esconde a transmissão sem link", () => {
    expect(liveStreamStatus(null, new Date())).toBe("hidden")
    expect(liveStreamStatus({ url: "" }, new Date())).toBe("hidden")
  })

  it("anuncia a transmissão antes do início", () => {
    expect(liveStreamStatus(stream, new Date("2026-11-22T10:00:00-03:00"))).toBe("upcoming")
  })

  it("marca ao vivo a partir de 15 minutos antes do início", () => {
    expect(liveStreamStatus(stream, new Date("2026-11-27T11:50:00-03:00"))).toBe("live")
    expect(liveStreamStatus(stream, new Date("2026-11-27T13:59:00-03:00"))).toBe("live")
  })

  it("esconde a transmissão depois do fim", () => {
    expect(liveStreamStatus(stream, new Date("2026-11-27T14:01:00-03:00"))).toBe("hidden")
  })

  it("trata como ao vivo um link sem horário cadastrado", () => {
    expect(liveStreamStatus({ url: stream.url }, new Date())).toBe("live")
  })
})

describe("liveStreamWhen", () => {
  it("mostra dia e hora de início no fuso de São Paulo", () => {
    expect(liveStreamWhen(stream)).toBe("27/11, 12h")
  })

  it("mostra os minutos quando não é hora cheia", () => {
    expect(liveStreamWhen({ ...stream, startsAt: "2026-11-27T12:30:00-03:00" })).toBe("27/11, 12h30")
  })

  it("usa a descrição livre quando não há horário", () => {
    expect(liveStreamWhen({ url: stream.url, description: "27/11 · 12h" })).toBe("27/11 · 12h")
  })
})
