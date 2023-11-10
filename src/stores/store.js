import { writable } from 'svelte/store';

export const rerender = writable(true);

export const currentWiring = writable(undefined);

export const scenes = writable({
  inicio: {
    texto: "Érase una vez un círculo...",
    display: {
      x: 150,
      y: 90,
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
      x: 50,
      y: 300,
    }
  },
  final2: {
    texto: "Parece que la historia formó una elipsis",
    sinSalida: true,
    display: {
      x: 230,
      y: 300,
    },
  }
})