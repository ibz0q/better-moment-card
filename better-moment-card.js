import dayjs from "./dayjs.min.js";
class BetterMomentCard extends HTMLElement {
    set hass(hass) {
        if (!this.content) {
            this.innerHTML = `<ha-card><div class="card-content" ${this.config.parentStyle ? 'style="' + this.config.parentStyle + '"' : ""}></div></ha-card>`;
            this.content = this.querySelector("div");
            var config = this.config, elm = [], dayjsObj = config.locale ? dayjs.locale(config.locale) : dayjs()
            if (config.moment !== null && config.moment[0]) {
                Object.keys(this.config.moment).forEach(k => {
                    elm[k] = document.createElement('div');
                    elm[k].setAttribute("id", "moment-" + k);
                    this.config.moment[k].style ? elm[k].style.cssText = this.config.moment[k].style : null;
                    this.content.appendChild(elm[k]);
                });
                let updateDom = () => {
                    Object.keys(config.moment).forEach(k => {
                        var format = config.moment[k].format ? config.moment[k].format : "HH:mm:ss"
                        var time = dayjsObj.format(format)
                        elm[k].innerHTML = config.moment[k].template ? (config.moment[k].template).replace(/{{moment}}/g, time) : time
                        console.log("track")
                    })
                };
                updateDom();
                window.__global_minterval = window.__global_minterval == null ? setInterval(updateDom, 1000) : clearInterval(window.__global_minterval);
            }
        }
    }
    setConfig(config) {
        this.config = config;
    }
    getCardSize() {
        return 1;
    }
}
customElements.define('better-moment-card', BetterMomentCard);