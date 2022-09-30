import { writable } from 'svelte/store';

export const scenes = writable({
  inicio: {
    texto: "Érase una vez un círculo...",
    display: {
      ops: [],
      areas: [],
      x: 40,
      y: 40,
    },
    opciones: [
      {
        btn: "dejar tranquilo",
        escena: "final1"
      },
      {
        btn: "aplastar",
        escena: "final2"
      }
    ]
  },
  final1: {
    texto: "Perfecto, un final redondo",
    sinSalida: true,
    display: {
      ops: [],
      areas: [],
      x: 40,
      y: 250,
    }
  },
  final2: {
    texto: "Parece que la historia formó una elipsis",
    sinSalida: true,
    display: {
      ops: [],
      areas: [],
      x: 220,
      y: 250,
    },
  }
})