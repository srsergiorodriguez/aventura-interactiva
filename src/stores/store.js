import { writable } from 'svelte/store';

export const rerender = writable(true);

export const currentWiring = writable(undefined);

export const options = writable({
  typewriterSpeed: 20,
  adventureSlide: false,
  adventureScroll: false,
  evalTags: false,
  backBtn: false,
  restartBtn: false,
  prevScene: undefined,
  topScene: undefined,
  defaultCSS: true,
  sceneCallback: function(e) {
    if (this.prevScene === undefined) this.prevScene = [];
    const backSymbol = "<--";
    const restartSymbol = "Reiniciar";
    if (this.backBtn && this.prevScene.length > 0 && this.topScene !== e.key) {
      if (this.prevScene[this.prevScene.length - 2] === e.key) {
        this.prevScene = this.prevScene.slice(0, - 2);
      }
      if (e.options !== undefined) {
        // Ya hay lista de botones
        const found = e.options.find(d => d.btn === backSymbol);
        if (found === undefined) {
          e.options.push({btn: backSymbol, scene: this.prevScene[this.prevScene.length - 1]}); // Añadir un nuevo botón
        } else {
          // Actualizar el botón que ya existe
          found.scene = this.prevScene[this.prevScene.length - 1];
        }
      } else {
        // No hay lista de opciones, crear una nueva
        e.options = [];
        e.options.push({btn: backSymbol, scene: this.prevScene[this.prevScene.length - 1]});
      }
    }
    this.prevScene.push(e.key);
    
    if (this.topScene === undefined) { this.topScene = e.key }
    if (this.restartBtn && (this.topScene !== undefined) && this.topScene !== e.key) {
      if (e.options !== undefined) {
        if (e.options.filter(d => d.btn === restartSymbol).length < 1) {
          e.options.push({btn: restartSymbol, scene: this.topScene});
        }
      } else {
        e.options = [];
        e.options.push({btn: restartSymbol, scene: this.topScene});
      }
    }
  }
})

export const scenes = writable({
  inicio: {
    text: "Érase una vez un círculo...",
    display: {
      x: 150,
      y: 90,
    },
    options: [
      {
        btn: "dejar tranquilo",
        scene: "final1"
      },
      {
        btn: "aplastar",
        scene: "final2"
      }
    ]
  },
  final1: {
    text: "Perfecto, un final redondo",
    deadEnd: true,
    display: {
      x: 50,
      y: 300,
    }
  },
  final2: {
    text: "Parece que la historia formó una elipsis",
    deadEnd: true,
    display: {
      x: 230,
      y: 300,
    },
  }
})