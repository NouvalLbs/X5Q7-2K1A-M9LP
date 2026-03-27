<template>
    <div v-if="Display.HudVisible" class="webview-container">
        <div class="footer-container">
            <div v-if="Display.IsInVehicle" class="left-speedo-conatiner">
                <div class="speedo-layer">
                    <div class="speedo-gear">
                        <div class="gear">3</div>
                        <div class="gearicon">
                            <img src="/img/empty/gearbox.png" style="width: 24px; height: 24px;">
                        </div>
                    </div>
                    <div class="speedo-speed">
                        <div class="kmh"> <div class="title">KMH</div> </div>
                        <div class="speed"> <div class="text">234</div> </div>
                    </div>
                </div>
            </div>

            <div class="needs-container">
                <div v-for="(item, index) in visibleHudItems" :key="index" class="hud-box">
                    <svg class="hud-svg" :viewBox="`0 0 ${size} ${size}`">
                        <rect 
                            :x="strokeWidth" 
                            :y="strokeWidth" 
                            :width="size - strokeWidth * 2" 
                            :height="size - strokeWidth * 2" 
                            fill="#1f2937" 
                        />
                        <rect 
                            :x="strokeWidth" 
                            :y="strokeWidth" 
                            :width="size - strokeWidth * 2" 
                            :height="size - strokeWidth * 2" 
                            :fill="item.color" 
                            fill-opacity="0.15" 
                        />
                        <path :d="path" stroke="#1f2937" :stroke-width="strokeWidth" fill="none" />
                        <path
                            :d="path"
                            :stroke="item.color"
                            :stroke-width="strokeWidth"
                            fill="none"
                            :stroke-dasharray="perimeter"
                            :stroke-dashoffset="getOffset(item.value)"
                            stroke-linecap="square"
                            style="transition: stroke-dashoffset 0.5s ease"
                        />
                    </svg>
                    <div class="hud-icon">
                        <component :is="item.icon" :size="20" :color="item.color" :stroke-width="2" />
                    </div>
                </div>
            </div>

            <div v-if="Display.IsInVehicle" class="right-speedo-container">
                <div class="speedo-layer">
                    <div class="fuel-info">
                        <img class="icon" src="/img/empty/gas.svg">
                        <div class="indicator">
                            <div class="fuel-bar" :style="{ width: fuel + '%' }"></div>
                            <div class="fuel-text">{{ fuel }}%</div>
                        </div>
                    </div>
                    <div class="vehicle-info">
                        <div class="vehname-txtbox">ROADTRAIN</div>
                        <div class="veh-compass">W</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { DisplayStores } from '@/stores/DisplayStores';
import { storeToRefs } from 'pinia';
import { ref, computed } from 'vue';
import { Heart, Shield, Utensils, Droplet, Brain } from 'lucide-vue-next';

const Display = DisplayStores();
const { Hud } = storeToRefs(Display);

const size = 56;
const strokeWidth = 4;
const innerSize = size - strokeWidth * 2;
const perimeter = innerSize * 4;

const path = `
  M ${strokeWidth} ${strokeWidth}
  L ${size - strokeWidth} ${strokeWidth}
  L ${size - strokeWidth} ${size - strokeWidth}
  L ${strokeWidth} ${size - strokeWidth}
  Z
`;

const getOffset = (value) => {
    return perimeter - (value / 100) * perimeter;
};

const stats = computed(() => ({
    health: Display.Hud.HealthValue,
    armor: Display.Hud.ArmourValue,
    hunger: Display.Hud.HungerValue,
    hydration: Display.Hud.ThirstValue,
    focus: Display.Hud.StressValue
}));

const fuel = ref(68);

const visibleHudItems = computed(() => {
    return [
        { visible: Hud.value.ShowHealth, icon: Heart, value: stats.value.health, color: '#ef4444' },
        { visible: Hud.value.ShowArmour, icon: Shield, value: stats.value.armor, color: '#06b6d4' },
        { visible: Hud.value.ShowHunger, icon: Utensils, value: stats.value.hunger, color: '#f59e0b' },
        { visible: Hud.value.ShowThirst, icon: Droplet, value: stats.value.hydration, color: '#3b82f6' },
        { visible: Hud.value.ShowStress, icon: Brain, value: stats.value.focus, color: '#a855f7' }
    ].filter(item => item.visible);
});
</script>

<style lang="scss" scoped>
    @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200..1000;1,200..1000&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Quicksand:wght@300..700&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300..900;1,300..900&display=swap');

    .webview-container {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: center;
        height: 100vh;
        width: 100%;
        position: absolute;
        top: 0;
        right: 0;
        overflow: hidden;
        pointer-events: none;
        background: transparent !important;
    }

    .footer-container {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;

        width: 100vw;
        height: 66px;

        background-color: transparent !important;
        color: black;
    }

    .left-speedo-conatiner {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;

        width: 160px;
        height: 100%;

        background-color: transparent !important;

        .speedo-layer {
            display: flex;
            
            width: 100%;
            height: 56px;
            
            background-color: rgba(0, 0, 0, 0.6);

            .speedo-gear {
                display: flex;
                flex-direction: column;

                width: 56px;
                height: 56px;

                background-color: #C3FF43;

                .gear {
                    display: flex;
                    justify-content: center;

                    font-family: Kanit;
                    font-size: 20px;
                    font-weight: 400;
                    
                    width: 100%;
                    height: 22px;
                    
                    background-color: transparent !important;
                }

                .gearicon {
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    width: 100%;
                    height: 34px;

                    background-color: transparent !important;
                }
            }

            .speedo-speed {
                display: flex;
                flex-direction: column;

                width: 104px;
                height: 56px;

                background-color: transparent !important;

                .kmh {
                    display: flex;
                    justify-content: flex-end;

                    width: 100%;
                    height: 13px;

                    color: white;
                    background-color: transparent !important;

                    .title {
                        position: relative;

                        top: -3px;
                        right: 2px;

                        font-family: Roboto;
                        font-weight: bold;
                        font-size: 13px;
                    }
                }

                .speed {
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    width: 100%;
                    height: 43px;

                    color: white;
                    background-color: transparent !important;

                    .text {
                        position: relative;

                        top: -2px;

                        font-family: Roboto;
                        font-weight: bold;
                        font-size: 36px;
                    }
                }
            }
        }
    }

    .needs-container {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;

        width: fit-content;
        height: 100%;

        background-color: transparent !important;

        .hud-box {
            position: relative;
            display: flex;
            flex-shrink: 0;
            width: 56px;
            height: 56px;

            &:first-child {
                margin-left: 5px;
            }

            &:last-child {
                margin-right: 5px;
            }

            .hud-svg {
                width: 56px;
                height: 56px;
            }

            .hud-icon {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
            }
        }
    }

    .right-speedo-container {
        display: flex;
        justify-content: flex-end;
        align-items: center;

        width: fit-content;
        height: 100%;

        background-color: transparent !important;

        .speedo-layer {
            display: flex;
            flex-direction: column;

            width: fit-content;
            height: 56px;

            background-color: transparent !important;

            .fuel-info {
                display: flex;
                flex-direction: row;

                width: 100%;
                height: 16px;

                background-color: transparent !important;

                .icon {
                    display: flex;

                    width: 13px;
                    height: 13px;

                    margin-right: 3px;
                    filter: brightness(0) invert(1);
                }

                .indicator {
                    position: relative;
                    display: flex;

                    width: 122px;
                    height: 13px;

                    border-radius: 3px;
                    overflow: hidden;

                    background-color: rgba(0, 0, 0, 0.3);

                    .fuel-bar {
                        position: absolute;
                        top: 0;
                        left: 0;
                        height: 100%;
                        background-color: #D2691E;
                        transition: width 0.5s ease;
                    }

                    .fuel-text {
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-family: Roboto;
                        font-weight: bold;
                        font-size: 11px;
                        color: white;
                        z-index: 1;
                    }
                }
            }

            .vehicle-info {
                display: flex;
                align-items: center;

                width: fit-content;
                height: 40px;

                color: white;
                background-color: transparent !important;

                .vehname-txtbox {
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    min-width: 138px;
                    height: 100%;

                    padding-left: 10px;
                    padding-right: 10px;

                    font-family: Roboto;
                    font-weight: bold;
                    font-size: 20px;

                    background-color: rgba(0, 0, 0, 0.6);
                }

                .veh-compass {
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    width: 42px;
                    height: 40px;

                    font-family: Roboto;
                    font-weight: bold;
                    font-size: 32px;

                    color: black;
                    background-color: #FFD700;
                }
            }
        }
    }
</style>