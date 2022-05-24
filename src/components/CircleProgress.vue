<template>
  <div ref="elem" v-bind="wrapAttr" class="vue3-circular-progressbar">
    <svg v-bind="svgAttr">
      <linearGradient v-if="isGradient" v-bind="gradientAttr">
        <stop v-bind="gradientStartAttr" />
        <stop v-bind="gradientStopAttr" />
      </linearGradient>
      <circle v-bind="circleBgAttr" />
      <circle v-bind="circleFgAttr" />

      <template v-if="isShadow">
        <filter v-if="shadow.inset === false" v-bind="shadowAttr">
          <feDropShadow v-bind="feShadowAttr" />
        </filter>
        <filter v-else v-bind="shadowAttr">
          <feOffset :dx="feShadowAttr.dx" :dy="feShadowAttr.dy" />
          <feGaussianBlur :stdDeviation="feShadowAttr.stdDeviation" />
          <feComposite operator="out" in="SourceGraphic" result="inverse" />
          <feFlood
            :flood-color="feShadowAttr.floodColor"
            :flood-opacity="feShadowAttr.floodOpacity"
            result="color"
          />
          <feComposite operator="in" in="color" in2="inverse" result="shadow" />
          <feComposite operator="over" in="shadow" in2="SourceGraphic" />
        </filter>
      </template>

      <template v-if="bgShadow">
        <filter v-if="bgShadow.inset === false" v-bind="bgShadowAttr">
          <feDropShadow v-bind="feBgShadowAttr" />
        </filter>
        <filter v-else v-bind="bgShadowAttr">
          <feOffset :dx="feBgShadowAttr.dx" :dy="feBgShadowAttr.dy" />
          <feGaussianBlur :stdDeviation="feBgShadowAttr.stdDeviation" />
          <feComposite operator="out" in="SourceGraphic" result="inverse" />
          <feFlood
            :floodColor="feBgShadowAttr.floodColor"
            :floodOpacity="feBgShadowAttr.floodOpacity"
            result="color"
          />
          <feComposite operator="in" in="color" in2="inverse" result="shadow" />
          <feComposite operator="over" in="shadow" in2="SourceGraphic" />
        </filter>
      </template>
    </svg>
    <span v-if="showPercent" class="current-counter"
      >{{ currentPercent }} {{ unit }}</span
    >
  </div>
</template>

<script>
import { computed, ref, onMounted, onBeforeUnmount, watch } from "vue";
import { GRADIENT, SHADOW, BG_SHADOW } from "@/default";

function uuid(prefix = "", suffix = "") {
  return (
    prefix +
    Math.random()
      .toString(36)
      .substring(2, 8) +
    Math.random()
      .toString(36)
      .substring(2, 8) +
    suffix
  );
}

export default {
  name: "circle-progress",
  props: {
    size: {
      type: Number,
      default: 180
    },
    borderWidth: {
      type: Number,
      default: 15
    },
    borderBgWidth: {
      type: Number,
      default: 15
    },
    fillColor: {
      type: String,
      default: "#288feb"
    },
    emptyColor: {
      type: String,
      default: "#dddddd"
    },
    background: {
      type: String,
      default: "none"
    },
    className: {
      type: String,
      default: ""
    },
    percent: {
      type: Number,
      default: 50
    },
    linecap: {
      type: String,
      default: "round"
    },
    transition: {
      type: Number,
      default: 400
    },
    isGradient: {
      type: Boolean,
      default: false
    },
    gradient: {
      type: Object,
      default: () => GRADIENT
    },
    isShadow: {
      type: Boolean,
      default: false
    },
    shadow: {
      type: Object,
      default: () => SHADOW
    },
    isBgShadow: {
      type: Boolean,
      default: false
    },
    bgShadow: {
      type: Object,
      default: () => BG_SHADOW
    },
    viewport: {
      type: Boolean,
      default: false
    },
    onViewport: {
      type: Function
    },
    class: {
      type: String,
      default: ""
    },
    showPercent: {
      type: Boolean,
      default: false
    },
    unit: {
      type: String,
      default: ""
    }
  },
  setup(props) {
    const uid1 = uuid("grd_");
    const uid2 = uuid("shd1_");
    const uid3 = uuid("shd2_");
    const elem = ref(null);
    const currentPercent = ref(0);

    const gradient = { ...GRADIENT, ...props.gradient };
    const shadow = { ...SHADOW, ...props.shadow };
    const bgShadow = { ...BG_SHADOW, ...props.bgShadow };

    const circleRadiusBg = () => {
      let value = (props.size - props.borderBgWidth) * 0.5;
      if (props.borderWidth > props.borderBgWidth) {
        value -= (props.borderWidth - props.borderBgWidth) * 0.5;
      }
      return value;
    };

    const circleRadiusFg = () => {
      let value = (props.size - props.borderWidth) * 0.5;
      if (props.borderBgWidth > props.borderWidth) {
        value -= (props.borderBgWidth - props.borderWidth) * 0.5;
      }
      return value;
    };

    const circumference = 2 * Math.PI * circleRadiusFg();
    const offset = ref(2 * Math.PI * circleRadiusFg());

    const wrapStyle = {
      height: props.size + "px",
      width: props.size + "px",
      position: "relative"
    };

    const wrapAttr = {
      class: props.class,
      style: wrapStyle
    };

    const svgAttr = {
      style: {
        transform: "rotate(-90deg)",
        overflow: "visible"
      },
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: `${props.size / 2} ${props.size / 2} ${props.size} ${props.size}`
    };

    const circleBgAttr = {
      cx: props.size,
      cy: props.size,
      r: circleRadiusBg(),
      stroke: props.emptyColor,
      "stroke-width": props.borderBgWidth,
      fill: props.background,
      ...(props.isBgShadow && { filter: `url(#${uid3})` })
    };

    const circleFgAttr = computed(() => ({
      cx: props.size,
      cy: props.size,
      r: circleRadiusFg(),
      fill: "none",
      "stroke-width": props.borderWidth,
      "stroke-dasharray": circumference,
      "stroke-dashoffset": offset.value,
      "stroke-linecap": props.linecap,
      stroke: props.isGradient ? `url(#${uid1})` : props.fillColor,
      ...(props.isShadow && { filter: `url(#${uid2})` }),
      ...(props.transition && {
        style: { transition: `stroke-dashoffset ${props.transition}ms` }
      })
    }));

    const gradientAttr = {
      id: uid1,
      x1: "0%",
      y1: "0%",
      x2: "0%",
      y2: "100%",
      gradientTransform: `rotate(${gradient.angle}, .5, .5)`
    };

    const gradientStartAttr = {
      offset: 0,
      "stop-color": gradient.startColor
    };

    const gradientStopAttr = {
      offset: 100,
      "stop-color": gradient.stopColor
    };

    // shadow
    const shadowAttr = {
      id: uid2,
      width: "500%",
      height: "500%",
      x: "-250%",
      y: "-250%"
    };

    const feShadowAttr = {
      dx: shadow.vertical * -1,
      dy: shadow.horizontal,
      stdDeviation: shadow.blur,
      floodColor: shadow.color,
      floodOpacity: shadow.opacity
    };

    const bgShadowAttr = {
      id: uid3,
      width: "500%",
      height: "500%",
      x: "-250%",
      y: "-250%"
    };

    const feBgShadowAttr = {
      dx: bgShadow.vertical * -1,
      dy: bgShadow.horizontal,
      stdDeviation: bgShadow.blur,
      floodColor: bgShadow.color,
      floodOpacity: bgShadow.opacity
    };

    /**
     * Functions
     */

    function inViewport(el) {
      if (el === null) return;
      const rect = el.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <=
          (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <=
          (window.innerWidth || document.documentElement.clientWidth)
      );
    }

    function updatePercent() {
      const circumference = 2 * Math.PI * circleRadiusFg();
      offset.value = circumference - (circumference * props.percent) / 100;
      const newPercent = Math.round(100 - (100 / circumference) * offset.value);
      animateValue(newPercent);
    }

    function animateValue(to) {
      const step = to - currentPercent.value;
      if (step) {
        const delay = props.transition / Math.abs(step);
        const counter = setInterval(() => {
          if (step > 0) {
            currentPercent.value += 1;
            if (currentPercent.value >= to) {
              clearInterval(counter);
            }
          } else {
            currentPercent.value -= 1;
            if (currentPercent.value <= to) {
              clearInterval(counter);
            }
          }
        }, delay);
      }
    }

    function placeOffset() {
      if (!props.viewport) {
        updatePercent();
      } else {
        window.addEventListener("scroll", placeOffset);
        if (elem.value && inViewport(elem.value)) {
          window.removeEventListener("scroll", placeOffset);
          if (props.viewport) {
            updatePercent();
          }
          if (props.onViewport && typeof props.onViewport === "function") {
            props.onViewport();
          }
        }
      }
    }

    /**
     * Lifecycle
     */

    onMounted(() => {
      placeOffset();
    });

    onBeforeUnmount(() => {
      window.removeEventListener("scroll", placeOffset);
    });

    watch(
      () => props.percent,
      () => {
        updatePercent();
      }
    );

    return {
      elem,
      wrapAttr,
      svgAttr,
      gradientAttr,
      gradientStartAttr,
      gradientStopAttr,
      circleBgAttr,
      circleFgAttr,
      shadowAttr,
      feShadowAttr,
      bgShadowAttr,
      feBgShadowAttr,
      currentPercent
    };
  }
};
</script>

<style scoped>
.vue3-circular-progressbar {
  position: relative;
}
.vue3-circular-progressbar .current-counter {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
